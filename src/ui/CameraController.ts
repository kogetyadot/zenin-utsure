import * as THREE from 'three';
import { StageSpec } from '../types';

interface PointerSample {
  x: number;
  y: number;
  mode: 'orbit' | 'pan';
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export class CameraController {
  private readonly canvas: HTMLCanvasElement;
  private readonly camera: THREE.PerspectiveCamera;
  private stage: StageSpec;

  private enabled = true;

  // Target values driven by player input
  private targetAzimuth = 0;
  private targetElevation = 0.16;
  private targetFov = 40;
  private targetLookX = 0;
  private targetLookY = 1.2;
  private targetLookZ = -0.25;

  // Optional direct pan offsets (Right-Drag / Shift+Drag)
  private panOffsetX = 0;
  private panOffsetY = 0;

  // Current spring-damped values
  private azimuth = 0;
  private elevation = 0.16;
  private fov = 40;
  private lookX = 0;
  private lookY = 1.2;
  private lookZ = -0.25;

  // Stage baseline camera metrics
  private distance = 8.6;
  private baseElevation = 0.16;
  private baseTargetX = 0;
  private baseTargetY = 1.2;
  private baseTargetZ = -0.25;

  // Track discrete zoom detents & aspect changes
  private lastZoomBucket = -1;
  private lastAppliedAspect = 0;

  // Handheld organic micro-sway
  private breathTime = 0;
  private steadyTimer = 0;
  private breathWeight = 1;

  // Active input tracking
  private readonly activePointers = new Map<number, PointerSample>();
  private lastPinchDistance = 0;
  private lastPinchMidX = 0;
  private lastPinchMidY = 0;
  private readonly pressedKeys = new Set<string>();
  private isDragging = false;

  // Reusable lookAt target vector to avoid per-frame allocations
  private readonly lookAtVec = new THREE.Vector3();

  // Bound event listeners for clean disposal
  private readonly handlePointerDown: (e: PointerEvent) => void;
  private readonly handlePointerMove: (e: PointerEvent) => void;
  private readonly handlePointerUp: (e: PointerEvent) => void;
  private readonly handleWheel: (e: WheelEvent) => void;
  private readonly handleKeyDown: (e: KeyboardEvent) => void;
  private readonly handleKeyUp: (e: KeyboardEvent) => void;
  private readonly handleWindowBlur: () => void;
  private readonly handleContextMenu: (e: Event) => void;

  constructor(
    canvas: HTMLCanvasElement,
    camera: THREE.PerspectiveCamera,
    stage: StageSpec,
  ) {
    this.canvas = canvas;
    this.camera = camera;
    this.stage = stage;

    // Prevent browser native pan/zoom gestures on touchscreens
    this.canvas.style.touchAction = 'none';

    this.handlePointerDown = this.onPointerDown.bind(this);
    this.handlePointerMove = this.onPointerMove.bind(this);
    this.handlePointerUp = this.onPointerUp.bind(this);
    this.handleWheel = this.onWheel.bind(this);
    this.handleKeyDown = this.onKeyDown.bind(this);
    this.handleKeyUp = this.onKeyUp.bind(this);
    this.handleWindowBlur = this.onWindowBlur.bind(this);
    this.handleContextMenu = (e: Event) => e.preventDefault();

    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('pointermove', this.handlePointerMove, { passive: false });
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);
    this.canvas.addEventListener('wheel', this.handleWheel, { passive: false });
    this.canvas.addEventListener('contextmenu', this.handleContextMenu);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleWindowBlur);

    this.configureForStage(stage);
  }

  public configureForStage(stage: StageSpec): void {
    this.stage = stage;
    const def = stage.defaultCamera;

    this.distance = def.distance;
    this.baseElevation = def.elevation;
    this.baseTargetX = def.target.x;
    this.baseTargetY = def.target.y;
    this.baseTargetZ = def.target.z;

    this.panOffsetX = 0;
    this.panOffsetY = 0;

    this.targetAzimuth = def.azimuth;
    this.targetElevation = def.elevation;
    this.targetFov = def.fov;
    this.targetLookX = def.target.x;
    this.targetLookY = def.target.y;
    this.targetLookZ = def.target.z;

    this.azimuth = def.azimuth;
    this.elevation = def.elevation;
    this.fov = def.fov;
    this.lookX = def.target.x;
    this.lookY = def.target.y;
    this.lookZ = def.target.z;

    this.lastZoomBucket = Math.round(this.getZoomNormalized() * 16);
    this.lastAppliedAspect = 0;

    this.activePointers.clear();
    this.pressedKeys.clear();
    this.isDragging = false;
    this.lastPinchDistance = 0;
    this.steadyTimer = 0;

    this.applyCameraTransform(0, 0, true);
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.activePointers.clear();
      this.pressedKeys.clear();
      this.isDragging = false;
      this.lastPinchDistance = 0;
      this.canvas.classList.remove('is-dragging');
    }
  }

  public setZoomNormalized(t: number): void {
    const norm = clamp(t, 0, 1);
    const { minFov, maxFov } = this.stage.cameraLimits;
    // 0 = maxFov (wide), 1 = minFov (telephoto)
    this.targetFov = maxFov - norm * (maxFov - minFov);
  }

  public getZoomNormalized(): number {
    const { minFov, maxFov } = this.stage.cameraLimits;
    const span = Math.max(0.001, maxFov - minFov);
    return clamp((maxFov - this.targetFov) / span, 0, 1);
  }

  public getCameraState(): { azimuth: number; elevation: number; fov: number } {
    return {
      azimuth: this.azimuth,
      elevation: this.elevation,
      fov: this.fov,
    };
  }

  public nudgeAim(dAzimuth: number, dElevation: number): void {
    const lim = this.stage.cameraLimits;
    this.targetAzimuth = clamp(
      this.targetAzimuth + dAzimuth,
      lim.minAzimuth,
      lim.maxAzimuth,
    );
    this.targetElevation = clamp(
      this.targetElevation + dElevation,
      lim.minElevation,
      lim.maxElevation,
    );
    this.updateLinkedLookTarget();
    // Briefly steady handheld breathing during crisp camera nudges / shutter impulse
    this.steadyTimer = Math.max(this.steadyTimer, 0.32);
  }

  public update(dt: number): { angularSpeed: number; zoomChanged: boolean } {
    const clampedDt = Math.min(Math.max(dt, 0), 0.1);
    if (!this.enabled) {
      return { angularSpeed: 0, zoomChanged: false };
    }

    // 1. Apply continuous keyboard orbit / zoom input
    this.applyKeyboardInput(clampedDt);

    // 2. Smooth exponential spring damping (frame-rate independent)
    const prevAzimuth = this.azimuth;
    const prevElevation = this.elevation;

    const orbitAlpha = 1 - Math.exp(-12.5 * clampedDt);
    const fovAlpha = 1 - Math.exp(-11.0 * clampedDt);
    const lookAlpha = 1 - Math.exp(-10.5 * clampedDt);

    this.azimuth += (this.targetAzimuth - this.azimuth) * orbitAlpha;
    this.elevation += (this.targetElevation - this.elevation) * orbitAlpha;
    this.fov += (this.targetFov - this.fov) * fovAlpha;
    this.lookX += (this.targetLookX - this.lookX) * lookAlpha;
    this.lookY += (this.targetLookY - this.lookY) * lookAlpha;
    this.lookZ += (this.targetLookZ - this.lookZ) * lookAlpha;

    // 3. Compute angular speed (rad/s) and discrete zoom step feedback
    const dAz = this.azimuth - prevAzimuth;
    const dEl = this.elevation - prevElevation;
    const angularSpeed = clampedDt > 0.0001 ? Math.hypot(dAz, dEl) / clampedDt : 0;

    const { minFov, maxFov } = this.stage.cameraLimits;
    const fovSpan = Math.max(0.001, maxFov - minFov);
    const currentZoomNorm = clamp((maxFov - this.fov) / fovSpan, 0, 1);
    const zoomBucket = Math.round(currentZoomNorm * 16);
    const zoomChanged = zoomBucket !== this.lastZoomBucket;
    if (zoomChanged) {
      this.lastZoomBucket = zoomBucket;
    }

    // 4. Subtle handheld camera breathing (calms gently while steadying or dragging fast)
    this.breathTime += clampedDt;
    if (this.steadyTimer > 0) {
      this.steadyTimer = Math.max(0, this.steadyTimer - clampedDt);
    }

    const desiredBreath =
      this.steadyTimer > 0 ? 0.0 : this.isDragging ? 0.25 : 1.0;
    this.breathWeight +=
      (desiredBreath - this.breathWeight) * (1 - Math.exp(-6.0 * clampedDt));

    const breathAz =
      (Math.sin(this.breathTime * 0.85) * 0.0026 +
        Math.cos(this.breathTime * 1.47) * 0.0012) *
      this.breathWeight;
    const breathEl =
      (Math.cos(this.breathTime * 0.72) * 0.0021 +
        Math.sin(this.breathTime * 1.21) * 0.001) *
      this.breathWeight;

    // 5. Apply final position, target, and responsive FOV to Three.js PerspectiveCamera
    this.applyCameraTransform(breathAz, breathEl, false);

    return { angularSpeed, zoomChanged };
  }

  public dispose(): void {
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
    this.canvas.removeEventListener('wheel', this.handleWheel);
    this.canvas.removeEventListener('contextmenu', this.handleContextMenu);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleWindowBlur);
    this.activePointers.clear();
    this.pressedKeys.clear();
    this.canvas.classList.remove('is-dragging');
  }

  private applyCameraTransform(
    breathAz: number,
    breathEl: number,
    forceProjection: boolean,
  ): void {
    const az = this.azimuth + breathAz;
    const el = this.elevation + breathEl;

    // Preserve horizontal crowd framing on portrait / narrow viewports without fisheye distortion
    const aspect = Math.max(0.35, this.camera.aspect || 1.33);
    const refAspect = 4 / 3; // 4:3 photo aspect
    const narrowFactor = aspect < refAspect ? refAspect / aspect : 1.0;
    const distScale = Math.min(1.82, Math.pow(narrowFactor, 0.58));
    const fovScale = Math.min(1.36, Math.pow(narrowFactor, 0.34));
    const effectiveDist = this.distance * distScale;
    const effectiveFov = Math.min(72, this.fov * fovScale);

    const horizDist = effectiveDist * Math.cos(el);
    const camX = this.lookX + horizDist * Math.sin(az);
    const camY = this.lookY + effectiveDist * Math.sin(el);
    const camZ = this.lookZ + horizDist * Math.cos(az);

    this.camera.position.set(camX, camY, camZ);
    this.lookAtVec.set(this.lookX, this.lookY, this.lookZ);
    this.camera.lookAt(this.lookAtVec);

    const aspectChanged = Math.abs(aspect - this.lastAppliedAspect) > 0.002;
    if (
      forceProjection ||
      aspectChanged ||
      Math.abs(this.camera.fov - effectiveFov) > 0.005
    ) {
      this.lastAppliedAspect = aspect;
      this.camera.fov = effectiveFov;
      this.camera.updateProjectionMatrix();
    }
  }

  private updateLinkedLookTarget(): void {
    const lim = this.stage.cameraLimits;
    // Strong horizontal look-target sweep so orbiting left/right shifts the lens spotlight
    // cleanly off central showoffs and lures them sideways!
    this.targetLookX = clamp(
      this.baseTargetX + this.targetAzimuth * 2.15 + this.panOffsetX,
      lim.minTargetX,
      lim.maxTargetX,
    );
    // Gentle vertical composition tracking when raising to bird's-eye or lowering
    const elOffset = this.targetElevation - this.baseElevation;
    this.targetLookY = clamp(
      this.baseTargetY - elOffset * 0.24 + this.panOffsetY,
      lim.minTargetY,
      lim.maxTargetY,
    );
  }

  private applyKeyboardInput(dt: number): void {
    if (this.pressedKeys.size === 0) return;

    const orbitSpeed = 1.08; // rad/s
    const elevSpeed = 0.72; // rad/s
    const fovSpeed = 28.0; // deg/s

    let azDir = 0;
    let elDir = 0;
    let zoomDir = 0;

    if (this.pressedKeys.has('KeyA') || this.pressedKeys.has('ArrowLeft')) {
      azDir -= 1;
    }
    if (this.pressedKeys.has('KeyD') || this.pressedKeys.has('ArrowRight')) {
      azDir += 1;
    }
    if (this.pressedKeys.has('KeyW') || this.pressedKeys.has('ArrowUp')) {
      elDir += 1;
    }
    if (this.pressedKeys.has('KeyS') || this.pressedKeys.has('ArrowDown')) {
      elDir -= 1;
    }
    if (
      this.pressedKeys.has('KeyE') ||
      this.pressedKeys.has('Equal') ||
      this.pressedKeys.has('NumpadAdd')
    ) {
      zoomDir += 1; // zoom in (tighter FOV)
    }
    if (
      this.pressedKeys.has('KeyQ') ||
      this.pressedKeys.has('Minus') ||
      this.pressedKeys.has('NumpadSubtract')
    ) {
      zoomDir -= 1; // zoom out (wider FOV)
    }

    const lim = this.stage.cameraLimits;

    if (azDir !== 0 || elDir !== 0) {
      this.targetAzimuth = clamp(
        this.targetAzimuth + azDir * orbitSpeed * dt,
        lim.minAzimuth,
        lim.maxAzimuth,
      );
      this.targetElevation = clamp(
        this.targetElevation + elDir * elevSpeed * dt,
        lim.minElevation,
        lim.maxElevation,
      );
      this.updateLinkedLookTarget();
    }

    if (zoomDir !== 0) {
      this.targetFov = clamp(
        this.targetFov - zoomDir * fovSpeed * dt,
        lim.minFov,
        lim.maxFov,
      );
    }
  }

  private onPointerDown(e: PointerEvent): void {
    if (!this.enabled) return;

    let mode: 'orbit' | 'pan' = 'orbit';
    if (e.pointerType === 'mouse') {
      if (e.button === 2) {
        mode = 'pan';
      } else if (e.button === 0) {
        mode = e.shiftKey ? 'pan' : 'orbit';
      } else {
        return;
      }
    }

    this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY, mode });

    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch {
      // Ignore synthetic events without active browser pointer id
    }

    if (this.activePointers.size === 1) {
      this.isDragging = true;
      this.canvas.classList.add('is-dragging');
    } else if (this.activePointers.size === 2) {
      const [p1, p2] = Array.from(this.activePointers.values());
      this.lastPinchDistance = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      this.lastPinchMidX = (p1.x + p2.x) * 0.5;
      this.lastPinchMidY = (p1.y + p2.y) * 0.5;
    }
  }

  private onPointerMove(e: PointerEvent): void {
    if (!this.enabled) return;
    const prev = this.activePointers.get(e.pointerId);
    if (!prev) return;

    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    prev.x = e.clientX;
    prev.y = e.clientY;

    const lim = this.stage.cameraLimits;
    const minDim = Math.max(320, Math.min(window.innerWidth, window.innerHeight));

    if (this.activePointers.size === 1) {
      const fovFactor = this.fov / Math.max(1, this.stage.defaultCamera.fov);

      if (prev.mode === 'pan') {
        // Direct lens pan (Right-Drag or Shift+Drag) to sweep spotlight cleanly sideways/up-down
        const panSens = (3.4 / minDim) * (0.65 + 0.35 * fovFactor);
        const orbitX = this.baseTargetX + this.targetAzimuth * 2.15;
        const elOffset = this.targetElevation - this.baseElevation;
        const orbitY = this.baseTargetY - elOffset * 0.24;

        const nextLookX = clamp(
          orbitX + this.panOffsetX - dx * panSens,
          lim.minTargetX,
          lim.maxTargetX,
        );
        const nextLookY = clamp(
          orbitY + this.panOffsetY + dy * panSens * 0.72,
          lim.minTargetY,
          lim.maxTargetY,
        );
        this.panOffsetX = nextLookX - orbitX;
        this.panOffsetY = nextLookY - orbitY;
        this.updateLinkedLookTarget();
      } else {
        // Orbit drag (Left-Drag / 1-finger touch)
        const azSensitivity = (1.65 / minDim) * (0.65 + 0.35 * fovFactor);
        const elSensitivity = (1.28 / minDim) * (0.65 + 0.35 * fovFactor);

        this.targetAzimuth = clamp(
          this.targetAzimuth - dx * azSensitivity,
          lim.minAzimuth,
          lim.maxAzimuth,
        );
        this.targetElevation = clamp(
          this.targetElevation + dy * elSensitivity,
          lim.minElevation,
          lim.maxElevation,
        );
        // Gently recenter any previous manual pan offset while orbiting back
        this.panOffsetX *= 0.94;
        this.panOffsetY *= 0.94;
        this.updateLinkedLookTarget();
      }
    } else if (this.activePointers.size >= 2) {
      e.preventDefault();
      const [p1, p2] = Array.from(this.activePointers.values());
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const midX = (p1.x + p2.x) * 0.5;
      const midY = (p1.y + p2.y) * 0.5;

      if (this.lastPinchDistance > 8) {
        const deltaDist = dist - this.lastPinchDistance;
        const fovDelta = -(deltaDist / minDim) * 44;
        this.targetFov = clamp(this.targetFov + fovDelta, lim.minFov, lim.maxFov);
      }

      // Gentle 2-finger midpoint orbit assist
      const midDx = midX - this.lastPinchMidX;
      const midDy = midY - this.lastPinchMidY;
      this.targetAzimuth = clamp(
        this.targetAzimuth - (midDx / minDim) * 0.85,
        lim.minAzimuth,
        lim.maxAzimuth,
      );
      this.targetElevation = clamp(
        this.targetElevation + (midDy / minDim) * 0.65,
        lim.minElevation,
        lim.maxElevation,
      );
      this.updateLinkedLookTarget();

      this.lastPinchDistance = dist;
      this.lastPinchMidX = midX;
      this.lastPinchMidY = midY;
    }
  }

  private onPointerUp(e: PointerEvent): void {
    if (!this.activePointers.has(e.pointerId)) return;
    this.activePointers.delete(e.pointerId);

    try {
      if (this.canvas.hasPointerCapture(e.pointerId)) {
        this.canvas.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore synthetic events
    }

    if (this.activePointers.size < 2) {
      this.lastPinchDistance = 0;
    }
    if (this.activePointers.size === 0) {
      this.isDragging = false;
      this.canvas.classList.remove('is-dragging');
    }
  }

  private onWheel(e: WheelEvent): void {
    if (!this.enabled) return;
    e.preventDefault();

    const lim = this.stage.cameraLimits;
    // Normalize wheel delta across trackpad and notched mouse wheels
    const clampedDelta = clamp(e.deltaY, -140, 140);
    const fovStep = clampedDelta * 0.032;
    this.targetFov = clamp(this.targetFov + fovStep, lim.minFov, lim.maxFov);
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (!this.enabled) return;
    const activeEl = document.activeElement;
    if (
      activeEl &&
      (activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT')
    ) {
      return;
    }

    switch (e.code) {
      case 'KeyW':
      case 'KeyA':
      case 'KeyS':
      case 'KeyD':
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'KeyQ':
      case 'KeyE':
      case 'Minus':
      case 'Equal':
      case 'NumpadAdd':
      case 'NumpadSubtract':
        this.pressedKeys.add(e.code);
        if (e.code.startsWith('Arrow')) {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.pressedKeys.delete(e.code);
  }

  private onWindowBlur(): void {
    this.pressedKeys.clear();
    this.activePointers.clear();
    this.isDragging = false;
    this.lastPinchDistance = 0;
    this.canvas.classList.remove('is-dragging');
  }
}
