import * as THREE from 'three';
import {
  CapturedPhoto,
  GameHudSnapshot,
  GamePhase,
  LiveCameraMetrics,
  StageId,
  StageSpec,
} from '../types';
import { STAGES } from './StageConfig';
import { FaceTextureCache } from '../scene/FaceTextureGenerator';
import { CharacterMesh } from '../scene/CharacterMesh';
import { BuiltStage, buildStage } from '../scene/StageBuilder';
import { CrowdSimulator } from '../sim/CrowdSimulator';
import { PhotoEvaluator } from '../photo/PhotoEvaluator';
import { renderPolaroid } from '../photo/PolaroidRenderer';
import { SoundEngine } from '../audio/SoundEngine';
import { CameraController } from '../ui/CameraController';
import { HudView } from '../ui/HudView';

const BEST_SCORE_STORAGE_KEY = 'zenin_utsure_best_scores_v1';
const CHEESE_COOLDOWN_SEC = 5.0;
const PHOTO_ASPECT = 4 / 3;

export class GameEngine {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly evalCamera: THREE.PerspectiveCamera;
  private readonly faceCache: FaceTextureCache;
  private readonly evaluator: PhotoEvaluator;
  private readonly sound: SoundEngine;
  private readonly cameraController: CameraController;
  private readonly hud: HudView;

  private currentStage: StageSpec = STAGES.wedding;
  private builtStage: BuiltStage | null = null;
  private simulator: CrowdSimulator;
  private characterMeshes: Map<string, CharacterMesh> = new Map();

  private phase: GamePhase = 'title';
  private elapsedTime = 0;
  private lastFrameMs = 0;
  private rafId = 0;

  private timeRemaining = STAGES.wedding.roundDuration;
  private shotsUsed = 0;
  private cheeseCooldown = 0;
  private photos: CapturedPhoto[] = [];
  private latestPhoto: CapturedPhoto | null = null;
  private nextPhotoId = 1;
  private pendingResultTimeout: number | null = null;
  private isCapturingPhoto = false;
  private endingRound = false;
  private roundEpoch = 0;

  private lastCountdownWhole = -1;
  private lastAfBeepTime = -10;
  private lastGoodVisibleCount = 0;
  private lastZoomTickPercent = -1;
  private bestScoreByStage: Record<StageId, number>;

  private liveMetrics: LiveCameraMetrics = {
    visibleCount: 0,
    smilingCount: 0,
    totalCount: 0,
    vipVisibleCount: 0,
    vipTotalCount: 0,
    faceBoxes: [],
    estimatedQuality: 0,
  };

  private readonly handleResizeBound: () => void;

  constructor(canvas: HTMLCanvasElement, uiRoot: HTMLElement) {
    this.canvas = canvas;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.06;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();

    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    this.camera = new THREE.PerspectiveCamera(
      this.currentStage.defaultCamera.fov,
      width / height,
      0.15,
      140,
    );
    this.evalCamera = new THREE.PerspectiveCamera(
      this.currentStage.defaultCamera.fov,
      PHOTO_ASPECT,
      0.15,
      140,
    );
    this.renderer.setSize(width, height, false);

    this.faceCache = new FaceTextureCache();
    this.evaluator = new PhotoEvaluator();
    this.sound = new SoundEngine();
    this.bestScoreByStage = this.loadBestScores();

    this.simulator = new CrowdSimulator(this.currentStage, Date.now() & 0xffff);
    this.cameraController = new CameraController(canvas, this.camera, this.currentStage);
    this.cameraController.setEnabled(false);

    this.hud = new HudView(uiRoot, {
      onStartStage: (stageId) => this.startStage(stageId),
      onSelectStage: (stageId) => {
        if (this.phase === 'title' && stageId !== this.currentStage.id) {
          const nextStage = STAGES[stageId];
          if (nextStage) {
            this.loadStageWorld(nextStage, (Date.now() ^ 0x2468) >>> 0);
            this.pushHud();
          }
        }
      },
      onShutter: () => {
        void this.captureShot();
      },
      onSayCheese: () => this.triggerSayCheese(),
      onZoomChange: (zoomNorm) => {
        this.cameraController.setZoomNormalized(zoomNorm);
        const pct = Math.round(zoomNorm * 100);
        if (Math.abs(pct - this.lastZoomTickPercent) >= 6) {
          this.lastZoomTickPercent = pct;
          this.sound.playZoomTick();
        }
      },
      onToggleMute: () => {
        this.sound.unlock();
        this.sound.setMuted(!this.sound.isMuted());
        this.pushHud();
      },
      onFinishEarly: () => {
        if (this.phase === 'playing' && this.photos.length > 0 && !this.isCapturingPhoto) {
          this.enterResultPhase();
        }
      },
      onReturnTitle: () => this.enterTitlePhase(),
      onReplay: () => this.startStage(this.currentStage.id),
    });

    this.loadStageWorld(this.currentStage, (Date.now() ^ 0x5a3c) >>> 0);

    this.handleResizeBound = () => this.handleResize();
    window.addEventListener('resize', this.handleResizeBound);

    this.pushHud();
    this.lastFrameMs = performance.now();
    this.rafId = requestAnimationFrame((now) => this.loop(now));
  }

  private loadBestScores(): Record<StageId, number> {
    const defaults: Record<StageId, number> = {
      wedding: 0,
      school_trip: 0,
      sports_day: 0,
      tropical_beach: 0,
    };
    try {
      const raw = window.localStorage.getItem(BEST_SCORE_STORAGE_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw) as Partial<Record<StageId, number>>;
      return {
        wedding: typeof parsed.wedding === 'number' ? parsed.wedding : 0,
        school_trip: typeof parsed.school_trip === 'number' ? parsed.school_trip : 0,
        sports_day: typeof parsed.sports_day === 'number' ? parsed.sports_day : 0,
        tropical_beach: typeof parsed.tropical_beach === 'number' ? parsed.tropical_beach : 0,
      };
    } catch {
      return defaults;
    }
  }

  private saveBestScores(): void {
    try {
      window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, JSON.stringify(this.bestScoreByStage));
    } catch {
      // Ignore private-mode storage errors
    }
  }

  private clearStageWorld(): void {
    for (const mesh of this.characterMeshes.values()) {
      this.scene.remove(mesh.root);
      mesh.dispose();
    }
    this.characterMeshes.clear();

    if (this.builtStage) {
      this.scene.remove(this.builtStage.root);
      this.builtStage.dispose();
      this.builtStage = null;
    }
  }

  private loadStageWorld(stage: StageSpec, seed: number): void {
    this.clearStageWorld();
    this.currentStage = stage;

    this.builtStage = buildStage(stage);
    this.scene.add(this.builtStage.root);
    this.scene.background = this.builtStage.skyColor;
    // Match atmospheric fog to the warm horizon tone for a seamless sky-ground blend
    this.scene.fog = new THREE.FogExp2(this.builtStage.fogColor.getHex(), 0.0115);

    this.simulator.reset(stage, seed);
    this.cameraController.configureForStage(stage);
    this.cameraController.update(0.016);

    for (const npc of this.simulator.npcs) {
      const mesh = new CharacterMesh(npc.spec, this.faceCache);
      this.characterMeshes.set(npc.spec.id, mesh);
      this.scene.add(mesh.root);
      mesh.syncFromState(npc, 0.016, this.elapsedTime);
      mesh.syncHeadTransformToState(npc);
    }

    this.builtStage.syncIntruder(this.simulator.intruder, 0.016, this.elapsedTime);
    this.builtStage.syncHazard(this.simulator.hazard, 0.016, this.elapsedTime);
    this.liveMetrics = this.evaluator.evaluateLive(
      this.simulator.npcs,
      this.camera,
      this.simulator.intruder,
      this.simulator.hazard,
    );
  }

  public startStage(stageId: StageId): void {
    this.clearPendingResult();
    this.roundEpoch += 1;
    this.sound.unlock();

    const stage = STAGES[stageId] ?? STAGES.wedding;
    const seed = (Date.now() + Math.floor(Math.random() * 100000)) >>> 0;

    this.loadStageWorld(stage, seed);
    this.phase = 'playing';
    this.timeRemaining = stage.roundDuration;
    this.shotsUsed = 0;
    this.cheeseCooldown = 0;
    this.photos = [];
    this.latestPhoto = null;
    this.lastCountdownWhole = -1;
    this.lastGoodVisibleCount = 0;
    this.isCapturingPhoto = false;
    this.endingRound = false;

    this.cameraController.setEnabled(true);
    this.sound.setBgmUrgency(false);
    this.sound.startBgm(stage.id);
    this.pushHud();
  }

  public enterTitlePhase(): void {
    this.clearPendingResult();
    this.roundEpoch += 1;
    this.phase = 'title';
    this.endingRound = false;
    this.isCapturingPhoto = false;
    this.cameraController.setEnabled(false);
    this.sound.stopBgm();
    this.loadStageWorld(this.currentStage, (Date.now() ^ 0x1337) >>> 0);
    this.pushHud();
  }

  private enterResultPhase(): void {
    this.clearPendingResult();
    this.roundEpoch += 1;
    this.phase = 'result';
    this.endingRound = false;
    this.isCapturingPhoto = false;
    this.cameraController.setEnabled(false);
    this.sound.setBgmUrgency(false);
    this.sound.stopBgm();

    let bestPhoto: CapturedPhoto | null = null;
    for (const p of this.photos) {
      if (!bestPhoto || p.score.totalScore > bestPhoto.score.totalScore) {
        bestPhoto = p;
      }
    }
    if (bestPhoto) {
      const stageId = this.currentStage.id;
      if (bestPhoto.score.totalScore > (this.bestScoreByStage[stageId] ?? 0)) {
        this.bestScoreByStage[stageId] = bestPhoto.score.totalScore;
        this.saveBestScores();
      }
      this.sound.playResultFanfare(bestPhoto.score.rank);
    }
    this.pushHud();
  }

  private clearPendingResult(): void {
    if (this.pendingResultTimeout !== null) {
      window.clearTimeout(this.pendingResultTimeout);
      this.pendingResultTimeout = null;
    }
  }

  private triggerSayCheese(): void {
    if (this.phase !== 'playing' || this.cheeseCooldown > 0 || this.endingRound) return;
    this.sound.unlock();
    this.cheeseCooldown = CHEESE_COOLDOWN_SEC;
    this.simulator.triggerSayCheese(this.camera);
    this.sound.playSayCheese();
    this.hud.triggerCheeseWave();
    this.pushHud();
  }

  /**
   * Build a 4:3 evaluation camera matching the exact center 4:3 crop printed by PolaroidRenderer
   * and framed by .vf-safe-frame across both 16:9 desktop and 9:19.5 mobile portrait screens.
   */
  private syncPhotoEvalCamera(): THREE.PerspectiveCamera {
    this.camera.updateMatrixWorld(true);
    this.evalCamera.position.copy(this.camera.position);
    this.evalCamera.quaternion.copy(this.camera.quaternion);
    this.evalCamera.aspect = PHOTO_ASPECT;

    const curAspect = Math.max(0.3, this.camera.aspect || PHOTO_ASPECT);
    if (curAspect < PHOTO_ASPECT) {
      // Portrait viewport: 4:3 crop keeps horizontal width, trims top & bottom
      const curHalfVFovRad = THREE.MathUtils.degToRad(this.camera.fov * 0.5);
      const cropHalfVFovRad = Math.atan((Math.tan(curHalfVFovRad) * curAspect) / PHOTO_ASPECT);
      this.evalCamera.fov = THREE.MathUtils.radToDeg(cropHalfVFovRad * 2);
    } else {
      // Landscape/wide viewport: 4:3 crop keeps full height, trims left & right
      this.evalCamera.fov = this.camera.fov;
    }
    this.evalCamera.updateProjectionMatrix();
    this.evalCamera.updateMatrixWorld(true);
    return this.evalCamera;
  }

  private async captureShot(): Promise<void> {
    if (this.phase !== 'playing') return;
    if (this.isCapturingPhoto) return;
    if (this.shotsUsed >= this.currentStage.maxShots) return;

    const epoch = this.roundEpoch;
    this.isCapturingPhoto = true;
    this.sound.unlock();
    this.sound.playShutter();

    this.shotsUsed += 1;
    const shotIndex = this.shotsUsed;
    const remainingSnap = Math.max(0, this.timeRemaining);

    // Sync mesh poses & head transforms right now so same-tick Cheese+Shutter is exact
    for (const npc of this.simulator.npcs) {
      const mesh = this.characterMeshes.get(npc.spec.id);
      if (mesh) {
        mesh.syncFromState(npc, 0.001, this.elapsedTime);
        mesh.syncHeadTransformToState(npc);
      }
    }

    if (this.builtStage) {
      this.builtStage.syncIntruder(this.simulator.intruder, 0.001, this.elapsedTime);
      this.builtStage.syncHazard(this.simulator.hazard, 0.001, this.elapsedTime);
    }

    // Evaluate exact 3D score against the 4:3 print frustum
    const photoCam = this.syncPhotoEvalCamera();
    const score = this.evaluator.evaluatePhoto(
      this.simulator.npcs,
      photoCam,
      this.currentStage,
      this.simulator.intruder,
      this.simulator.hazard,
    );

    // Hide all 2D reaction bubbles, render crisp frame, grab directly from WebGL canvas
    for (const mesh of this.characterMeshes.values()) {
      mesh.setPhotoCaptureMode(true);
    }
    this.renderer.render(this.scene, this.camera);

    // Fast JPEG thumbnail + direct-canvas Polaroid render (avoids redundant PNG decode!)
    const rawDataUrl = this.canvas.toDataURL('image/jpeg', 0.9);
    const polaroidPromise = renderPolaroid(
      this.canvas,
      score,
      this.currentStage.title,
      shotIndex,
    );

    for (const mesh of this.characterMeshes.values()) {
      mesh.setPhotoCaptureMode(false);
    }

    let polaroidDataUrl = rawDataUrl;
    try {
      polaroidDataUrl = await polaroidPromise;
    } catch {
      polaroidDataUrl = rawDataUrl;
    }

    // Bail cleanly if player switched screen/replayed while Polaroid rendered
    if (epoch !== this.roundEpoch || this.phase !== 'playing') {
      this.isCapturingPhoto = false;
      return;
    }

    const captured: CapturedPhoto = {
      id: this.nextPhotoId++,
      shotIndex,
      timestampRemaining: remainingSnap,
      stageId: this.currentStage.id,
      stageTitle: this.currentStage.title,
      rawDataUrl,
      polaroidDataUrl,
      score,
    };

    this.photos.push(captured);
    this.latestPhoto = captured;

    this.hud.triggerShutterFlash(captured);
    this.isCapturingPhoto = false;
    this.pushHud();

    // If all film shots are used, hold briefly for shutter flash + Polaroid toast then show album
    if (this.shotsUsed >= this.currentStage.maxShots && !this.endingRound) {
      this.endingRound = true;
      this.clearPendingResult();
      this.pendingResultTimeout = window.setTimeout(() => {
        if (epoch === this.roundEpoch && this.phase === 'playing') {
          this.enterResultPhase();
        }
      }, 1150);
    }
  }

  private handleResize(): void {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private loop(nowMs: number): void {
    this.rafId = requestAnimationFrame((t) => this.loop(t));

    const rawDt = (nowMs - this.lastFrameMs) / 1000;
    this.lastFrameMs = nowMs;
    const dt = Math.min(Math.max(rawDt, 0.001), 0.05);
    this.elapsedTime += dt;

    let angularSpeed = 0;

    if (this.phase === 'title') {
      // Elevated sunny attract camera framing the bustling crowd above the compact title card
      const def = this.currentStage.defaultCamera;
      const aspect = Math.max(0.35, this.camera.aspect || PHOTO_ASPECT);
      const narrowFactor = aspect < PHOTO_ASPECT ? PHOTO_ASPECT / aspect : 1.0;
      const distScale = Math.min(1.82, Math.pow(narrowFactor, 0.58));
      const fovScale = Math.min(1.36, Math.pow(narrowFactor, 0.34));

      const swayAz = Math.sin(this.elapsedTime * 0.34) * 0.22;
      const swayEl = def.elevation + 0.05 + Math.sin(this.elapsedTime * 0.23) * 0.03;
      const dist = (def.distance + 0.7) * distScale;
      const cosEl = Math.cos(swayEl);
      const lookY = def.target.y - 0.35; // Aim slightly lower so crowd sits in upper half of screen!

      this.camera.position.set(
        def.target.x + Math.sin(swayAz) * dist * cosEl,
        def.target.y + 0.2 + Math.sin(swayEl) * dist,
        def.target.z + Math.cos(swayAz) * dist * cosEl,
      );
      this.camera.fov = Math.min(72, def.fov * fovScale);
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(def.target.x, lookY, def.target.z);
      angularSpeed = 0.08;
    } else if (this.phase === 'playing') {
      const camUpdate = this.cameraController.update(dt);
      angularSpeed = camUpdate.angularSpeed;
      if (camUpdate.zoomChanged) {
        this.sound.playZoomTick();
      }

      if (this.cheeseCooldown > 0) {
        this.cheeseCooldown = Math.max(0, this.cheeseCooldown - dt);
      }

      if (!this.endingRound && this.shotsUsed < this.currentStage.maxShots) {
        this.timeRemaining = Math.max(0, this.timeRemaining - dt);

        if (this.timeRemaining <= 10.0) {
          this.sound.setBgmUrgency(true);
        }
        const wholeSec = Math.ceil(this.timeRemaining);
        if (wholeSec <= 5 && wholeSec >= 1 && wholeSec !== this.lastCountdownWhole) {
          this.lastCountdownWhole = wholeSec;
          this.sound.playCountdownTick(wholeSec === 1);
        }

        if (this.timeRemaining <= 0) {
          this.endingRound = true;
          if (this.photos.length === 0 && !this.isCapturingPhoto) {
            const epoch = this.roundEpoch;
            void this.captureShot().then(() => {
              if (epoch !== this.roundEpoch || this.phase !== 'playing') return;
              this.clearPendingResult();
              this.pendingResultTimeout = window.setTimeout(() => {
                if (epoch === this.roundEpoch && this.phase === 'playing') {
                  this.enterResultPhase();
                }
              }, 950);
            });
          } else if (!this.isCapturingPhoto) {
            this.enterResultPhase();
          }
        }
      }
    }

    if (this.builtStage) {
      this.builtStage.update(dt, this.elapsedTime);
    }

    if (this.phase === 'title' || this.phase === 'playing') {
      const events = this.simulator.step(dt, this.camera, angularSpeed);

      for (const npc of this.simulator.npcs) {
        const mesh = this.characterMeshes.get(npc.spec.id);
        if (mesh) {
          mesh.syncFromState(npc, dt, this.elapsedTime);
          mesh.syncHeadTransformToState(npc);
        }
      }

      if (this.builtStage) {
        this.builtStage.syncIntruder(this.simulator.intruder, dt, this.elapsedTime);
        this.builtStage.syncHazard(this.simulator.hazard, dt, this.elapsedTime);
      }

      if (this.phase === 'playing') {
        for (const ev of events) {
          this.sound.playSimEvent(ev);
          if (this.builtStage) {
            if (ev.type === 'sneeze_blast' || ev.type === 'wave_crash' || ev.type === 'kusudama_pop') {
              this.builtStage.spawnDustPuff(ev.position, 16);
            } else if (ev.type === 'pileup' || ev.type === 'intruder_bonk' || ev.type === 'ball_boing') {
              this.builtStage.spawnDustPuff(ev.position, 12);
            } else if (ev.type === 'fall' || ev.type === 'slip') {
              this.builtStage.spawnDustPuff(ev.position, 9);
            } else if (ev.type === 'shove' || ev.type === 'jump' || ev.type === 'hat_pop') {
              this.builtStage.spawnDustPuff(ev.position, 5);
            }
          }
        }

        this.liveMetrics = this.evaluator.evaluateLive(
          this.simulator.npcs,
          this.camera,
          this.simulator.intruder,
          this.simulator.hazard,
        );

        const goodThreshold = Math.max(1, this.liveMetrics.totalCount - 1);
        if (
          this.liveMetrics.visibleCount >= goodThreshold &&
          this.lastGoodVisibleCount < goodThreshold &&
          this.elapsedTime - this.lastAfBeepTime > 2.6
        ) {
          this.lastAfBeepTime = this.elapsedTime;
          this.sound.playAfBeep(this.liveMetrics.visibleCount === this.liveMetrics.totalCount);
        }
        this.lastGoodVisibleCount = this.liveMetrics.visibleCount;

        this.pushHud();
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  private pushHud(): void {
    const snapshot: GameHudSnapshot = {
      phase: this.phase,
      stageId: this.currentStage.id,
      timeRemaining: this.timeRemaining,
      roundDuration: this.currentStage.roundDuration,
      shotsUsed: this.shotsUsed,
      maxShots: this.currentStage.maxShots,
      cheeseCooldown: this.cheeseCooldown,
      cheeseMaxCooldown: CHEESE_COOLDOWN_SEC,
      zoomPercent: Math.round(this.cameraController.getZoomNormalized() * 100),
      muted: this.sound.isMuted(),
      liveMetrics: this.liveMetrics,
      latestPhoto: this.latestPhoto,
      photos: this.photos,
      bestScoreByStage: this.bestScoreByStage,
    };
    this.hud.render(snapshot);
  }

  public dispose(): void {
    cancelAnimationFrame(this.rafId);
    this.clearPendingResult();
    window.removeEventListener('resize', this.handleResizeBound);
    this.clearStageWorld();
    this.cameraController.dispose();
    this.hud.dispose();
    this.sound.dispose();
    this.faceCache.dispose();
    this.renderer.dispose();
  }
}
