import * as THREE from 'three';
import {
  ComedyAward,
  ExpressionId,
  LiveCameraMetrics,
  LiveFaceBox,
  NpcPhotoVerdict,
  NpcRuntimeState,
  PhotoRank,
  PhotoScoreBreakdown,
  StageHazardState,
  StageIntruderKind,
  StageIntruderState,
  StageSpec,
} from '../types';

interface EvaluatedNpc {
  npc: NpcRuntimeState;
  inFrame: boolean;
  edgeClipped: boolean;
  visibleRatio: number; // 0, 0.33, 0.67, 1.0
  gazeDot: number;
  lookingAtCamera: boolean;
  ndcX: number;
  ndcY: number;
  screenX: number;
  screenY: number;
  faceScreenSize: number;
  distToCamera: number;
  blockedByIds: string[];
}

const EXPRESSION_QUALITY: Record<ExpressionId, number> = {
  cheese: 1.0,
  smile: 0.95,
  smug: 0.78,
  neutral: 0.65,
  nervous: 0.48,
  blink_warn: 0.45,
  surprised: 0.35,
  hen_gao: 0.28,
  sneeze: 0.16,
  blink: 0.1,
  dizzy: 0.05,
};

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

/**
 * Analytical ray-segment vs sphere intersection test.
 * Tests if segment P(t) = origin + dir * t for t in [tMin, tMax] intersects sphere (center, radius).
 */
function raySegmentIntersectsSphere(
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
  tMin: number,
  tMax: number,
  cx: number,
  cy: number,
  cz: number,
  radius: number,
): boolean {
  const ocx = ox - cx;
  const ocy = oy - cy;
  const ocz = oz - cz;
  const b = ocx * dx + ocy * dy + ocz * dz;
  const c = ocx * ocx + ocy * ocy + ocz * ocz - radius * radius;
  const disc = b * b - c;
  if (disc < 0) return false;
  const sqrtDisc = Math.sqrt(disc);
  const t1 = -b - sqrtDisc;
  const t2 = -b + sqrtDisc;
  return t2 > tMin && t1 < tMax;
}

/**
 * Exact minimum squared distance between segment P0-P1 and segment Q0-Q1.
 * Used for exact ray-segment vs capsule intersection (distanceSq <= r^2).
 */
function segmentSegmentDistSq(
  p0x: number,
  p0y: number,
  p0z: number,
  p1x: number,
  p1y: number,
  p1z: number,
  q0x: number,
  q0y: number,
  q0z: number,
  q1x: number,
  q1y: number,
  q1z: number,
): number {
  const d1x = p1x - p0x;
  const d1y = p1y - p0y;
  const d1z = p1z - p0z;
  const d2x = q1x - q0x;
  const d2y = q1y - q0y;
  const d2z = q1z - q0z;
  const rx = p0x - q0x;
  const ry = p0y - q0y;
  const rz = p0z - q0z;

  const a = d1x * d1x + d1y * d1y + d1z * d1z;
  const e = d2x * d2x + d2y * d2y + d2z * d2z;
  const f = d2x * rx + d2y * ry + d2z * rz;

  const EPS = 1e-8;
  let s: number;
  let t: number;

  if (a <= EPS && e <= EPS) {
    return rx * rx + ry * ry + rz * rz;
  }
  if (a <= EPS) {
    s = 0;
    t = clamp(f / e, 0, 1);
  } else {
    const c = d1x * rx + d1y * ry + d1z * rz;
    if (e <= EPS) {
      t = 0;
      s = clamp(-c / a, 0, 1);
    } else {
      const b = d1x * d2x + d1y * d2y + d1z * d2z;
      const denom = a * e - b * b;

      if (denom !== 0) {
        s = clamp((b * f - c * e) / denom, 0, 1);
      } else {
        s = 0;
      }

      t = (b * s + f) / e;
      if (t < 0) {
        t = 0;
        s = clamp(-c / a, 0, 1);
      } else if (t > 1) {
        t = 1;
        s = clamp((b - c) / a, 0, 1);
      }
    }
  }

  const cx = p0x + d1x * s - (q0x + d2x * t);
  const cy = p0y + d1y * s - (q0y + d2y * t);
  const cz = p0z + d1z * s - (q0z + d2z * t);
  return cx * cx + cy * cy + cz * cz;
}

export class PhotoEvaluator {
  // Pre-allocated scratch vectors & buffers for low-GC live evaluation
  private readonly _camPos = new THREE.Vector3();
  private readonly _camRight = new THREE.Vector3();
  private readonly _camForward = new THREE.Vector3();
  private readonly _ndc = new THREE.Vector3();
  private readonly _toCam = new THREE.Vector3();
  private readonly _rayOffsets = [0, -0.55, 0.55] as const;
  private readonly _emptyBlockedIds: string[] = [];
  private readonly _evalById = new Map<string, EvaluatedNpc>();
  private readonly _evalPool: EvaluatedNpc[] = [];
  private readonly _liveClassifyScratch: {
    status: LiveFaceBox['status'];
    label: string;
  } = { status: 'good', label: '' };

  private _scratchCap = 0;
  private _dists = new Float64Array(0);
  private _capAx = new Float64Array(0);
  private _capAy = new Float64Array(0);
  private _capAz = new Float64Array(0);
  private _capBx = new Float64Array(0);
  private _capBy = new Float64Array(0);
  private _capBz = new Float64Array(0);
  private _torsoR = new Float64Array(0);
  private _headR = new Float64Array(0);

  private ensureScratchCapacity(count: number): void {
    if (count <= this._scratchCap) return;
    const cap = Math.max(count, 16);
    this._scratchCap = cap;
    this._dists = new Float64Array(cap);
    this._capAx = new Float64Array(cap);
    this._capAy = new Float64Array(cap);
    this._capAz = new Float64Array(cap);
    this._capBx = new Float64Array(cap);
    this._capBy = new Float64Array(cap);
    this._capBz = new Float64Array(cap);
    this._torsoR = new Float64Array(cap);
    this._headR = new Float64Array(cap);
  }

  /**
   * Real-time lightweight frame evaluator for the viewfinder HUD & AF audio.
   */
  public evaluateLive(
    npcs: NpcRuntimeState[],
    camera: THREE.PerspectiveCamera,
    intruder?: StageIntruderState,
    hazard?: StageHazardState,
  ): LiveCameraMetrics {
    const count = npcs.length;
    const evaluated = this.analyzeNpcs(npcs, camera, false);
    const kusudamaActive = Boolean(hazard && hazard.kusudamaOpen > 0.35);
    const scores = this.computeScores(evaluated, count, kusudamaActive);

    let visibleCount = 0;
    let smilingCount = 0;
    let vipVisibleCount = 0;
    let vipTotalCount = 0;
    let hasSneezeCharge = false;
    let hasLensBomb = false;
    const faceBoxes: LiveFaceBox[] = new Array(count);

    for (let i = 0; i < count; i++) {
      const ev = evaluated[i];
      const npc = ev.npc;
      const isVisible = ev.inFrame && ev.visibleRatio >= 0.67;

      if (npc.sneezeCharge > 0.2) hasSneezeCharge = true;
      if (npc.lensBombProgress > 0.55) hasLensBomb = true;

      if (npc.spec.isVip) {
        vipTotalCount++;
        if (isVisible) vipVisibleCount++;
      }
      if (isVisible) {
        visibleCount++;
        if (
          ev.lookingAtCamera &&
          npc.action !== 'fallen' &&
          (npc.expression === 'smile' ||
            npc.expression === 'cheese' ||
            npc.expression === 'smug')
        ) {
          smilingCount++;
        }
      }

      this.classifyLiveBoxInto(ev, this._liveClassifyScratch);
      faceBoxes[i] = {
        npcId: npc.spec.id,
        name: npc.spec.name,
        isVip: npc.spec.isVip,
        archetype: npc.spec.archetype,
        screenX: ev.screenX,
        screenY: ev.screenY,
        boxSize: ev.faceScreenSize,
        status: this._liveClassifyScratch.status,
        label: this._liveClassifyScratch.label,
        visibleRatio: ev.visibleRatio,
      };
    }

    let intruderAlert: string | undefined;
    if (intruder && (intruder.warningTimer > 0 || intruder.active)) {
      switch (intruder.kind) {
        case 'dove':
          intruderAlert = '🕊️ 暴走ハト接近中！！';
          break;
        case 'deer':
          intruderAlert = '🦌 奈良のシカ乱入！！';
          break;
        case 'oodama':
          intruderAlert = '🔴 暴走大玉が転がってくるぞ！！';
          break;
        case 'beach_ball':
          intruderAlert = '🏐 巨大ビーチボール乱入！！';
          break;
      }
    } else if (hazard?.waveActive) {
      intruderAlert = '🌊 ざっぱーん！！大波直撃中！！';
    } else if (hazard && hazard.waveWarningTimer > 0) {
      intruderAlert = '🌊 大波が来るぞ〜！！前列あぶない！！';
    } else if (hazard && hazard.kusudamaOpen > 0.3) {
      intruderAlert = '🎊 くす玉パッカーン！！紙吹雪フィーバー！';
    } else if (hasSneezeCharge) {
      intruderAlert = '🤧 くしゃみ爆発寸前！！';
    } else if (hasLensBomb) {
      intruderAlert = '😱 目立ちたがりレンズ突撃中！！';
    }

    return {
      visibleCount,
      smilingCount,
      totalCount: count,
      vipVisibleCount,
      vipTotalCount,
      faceBoxes,
      estimatedQuality: scores.totalScore,
      intruderAlert,
    };
  }

  private isWorldPointInFrustum(
    x: number,
    y: number,
    z: number,
    camera: THREE.PerspectiveCamera,
    marginX = 0.98,
    marginY = 0.96,
  ): boolean {
    this._ndc.set(x, y, z).project(camera);
    const forwardDot =
      (x - this._camPos.x) * this._camForward.x +
      (y - this._camPos.y) * this._camForward.y +
      (z - this._camPos.z) * this._camForward.z;
    return (
      forwardDot > 0.15 &&
      this._ndc.z > -1 &&
      this._ndc.z < 1 &&
      Math.abs(this._ndc.x) <= marginX &&
      Math.abs(this._ndc.y) <= marginY
    );
  }

  /**
   * Full transparent photo evaluation with 100-point breakdown, comedy meter, captions, and comedy awards.
   */
  public evaluatePhoto(
    npcs: NpcRuntimeState[],
    camera: THREE.PerspectiveCamera,
    stage: StageSpec,
    intruder?: StageIntruderState,
    hazard?: StageHazardState,
  ): PhotoScoreBreakdown {
    const count = npcs.length;
    const evaluated = this.analyzeNpcs(npcs, camera, true).slice(0, count);
    const waveCrashActive = Boolean(
      hazard?.waveActive && hazard.waveProgress > 0.1 && hazard.waveProgress < 0.8,
    );
    const kusudamaActive = Boolean(hazard && hazard.kusudamaOpen > 0.35);
    const scores = this.computeScores(evaluated, count, kusudamaActive);

    let visibleCount = 0;
    let smilingCount = 0;
    let vipAllVisible = true;
    let fallenCount = 0;
    let jumpingCount = 0;
    let visibleJumpingCount = 0;
    let blinkingCount = 0;
    let shoulderRideCount = 0;
    let visibleShoulderRideCount = 0;
    let flyingHatCount = 0;
    let henGaoCount = 0;
    let sneezeCount = 0;
    let lensBombCount = 0;

    // Check whether active stage intruder (dove / deer / oodama / beach_ball) is captured inside camera frustum
    let intruderInFrame = false;
    let intruderKind: StageIntruderKind | null = null;
    if (intruder && intruder.active) {
      const p = intruder.position;
      const baseVisible = this.isWorldPointInFrustum(p.x, p.y, p.z, camera);
      const upperVisible =
        intruder.kind === 'deer'
          ? this.isWorldPointInFrustum(p.x, p.y + 0.95, p.z, camera)
          : intruder.kind === 'oodama' || intruder.kind === 'beach_ball'
            ? this.isWorldPointInFrustum(p.x, p.y + 0.65, p.z, camera) ||
              this.isWorldPointInFrustum(p.x, p.y - 0.5, p.z, camera)
            : false;
      if (baseVisible || upperVisible) {
        intruderInFrame = true;
        intruderKind = intruder.kind;
      }
    }

    // Track blocker -> set of victim NPC IDs for photobomb comedy detection
    const blockerVictims = new Map<string, Set<string>>();
    const evalById = this._evalById;
    evalById.clear();
    for (let i = 0; i < count; i++) {
      evalById.set(evaluated[i].npc.spec.id, evaluated[i]);
    }

    const verdicts: NpcPhotoVerdict[] = [];

    for (const ev of evaluated) {
      const npc = ev.npc;
      const isVisible = ev.inFrame && ev.visibleRatio >= 0.67;

      if (isVisible) visibleCount++;
      if (npc.spec.isVip && !isVisible) vipAllVisible = false;

      if (npc.action === 'fallen') fallenCount++;
      if (npc.action === 'jumping') {
        jumpingCount++;
        if (isVisible && !ev.edgeClipped) visibleJumpingCount++;
      }
      if (npc.expression === 'blink' && ev.inFrame && ev.visibleRatio >= 0.33) {
        blinkingCount++;
      }
      if (npc.action === 'riding_shoulders') {
        shoulderRideCount++;
        const carrier = npc.carrierId ? evalById.get(npc.carrierId) : undefined;
        if (isVisible && (!carrier || (carrier.inFrame && carrier.visibleRatio >= 0.67))) {
          visibleShoulderRideCount++;
        }
      }

      // Bakage slapstick counters
      if (
        npc.hatPopHeight > 0.16 &&
        (ev.inFrame ||
          this.isWorldPointInFrustum(
            npc.headWorldPos.x,
            npc.headWorldPos.y + npc.hatPopHeight,
            npc.headWorldPos.z,
            camera,
          ))
      ) {
        flyingHatCount++;
      }
      if (npc.expression === 'hen_gao' && ev.inFrame && ev.visibleRatio >= 0.33) {
        henGaoCount++;
      }
      if (npc.expression === 'sneeze' && ev.inFrame && ev.visibleRatio >= 0.33) {
        sneezeCount++;
      }
      if (
        ev.inFrame &&
        ev.visibleRatio >= 0.33 &&
        (npc.lensBombProgress > 0.55 || ev.faceScreenSize > 0.24)
      ) {
        lensBombCount++;
      }

      if (
        isVisible &&
        ev.lookingAtCamera &&
        npc.action !== 'fallen' &&
        (npc.expression === 'smile' ||
          npc.expression === 'cheese' ||
          npc.expression === 'smug')
      ) {
        smilingCount++;
      }

      for (const blockerId of ev.blockedByIds) {
        let victims = blockerVictims.get(blockerId);
        if (!victims) {
          victims = new Set<string>();
          blockerVictims.set(blockerId, victims);
        }
        victims.add(npc.spec.id);
      }

      verdicts.push({
        npcId: npc.spec.id,
        name: npc.spec.name,
        roleLabel: npc.spec.roleLabel,
        isVip: npc.spec.isVip,
        archetype: npc.spec.archetype,
        inFrame: ev.inFrame,
        edgeClipped: ev.edgeClipped,
        visibleRatio: ev.visibleRatio,
        lookingAtCamera: ev.lookingAtCamera,
        expression: npc.expression,
        action: npc.action,
        screenX: ev.screenX,
        screenY: ev.screenY,
        faceScreenSize: ev.faceScreenSize,
        points: this.computeNpcPoints(ev),
        tag: this.computeVerdictTag(ev),
      });
    }

    // Compute 🤣 爆笑度 (comedyScore: 0..100 integer)
    let rawComedy = 0;
    if (intruderInFrame) {
      rawComedy +=
        intruderKind === 'oodama' || intruderKind === 'beach_ball' ? 40 : 38;
    }
    if (waveCrashActive) rawComedy += 32;
    if (kusudamaActive) rawComedy += 16;
    rawComedy += flyingHatCount * 26;
    rawComedy += sneezeCount * 28;
    rawComedy += lensBombCount * 26;
    rawComedy += henGaoCount * 22;
    rawComedy += fallenCount * 18;
    if (fallenCount >= 3) rawComedy += 14;
    rawComedy += shoulderRideCount * 16;
    rawComedy += jumpingCount * 12;
    rawComedy += blinkingCount * 10;
    const comedyScore = Math.round(clamp(rawComedy, 0, 100));

    const rank = this.scoreToRank(scores.totalScore);
    const comedyAward = this.detectComedyAward(
      evaluated,
      blockerVictims,
      fallenCount,
      visibleJumpingCount,
      visibleShoulderRideCount,
      blinkingCount,
      visibleCount,
      smilingCount,
      intruderInFrame,
      intruderKind,
      waveCrashActive,
      kusudamaActive,
      flyingHatCount,
      sneezeCount,
      lensBombCount,
      henGaoCount,
    );

    const { caption, subCaption } = this.generateCaptions(
      evaluated,
      stage,
      rank,
      scores.span,
      visibleCount,
      smilingCount,
      vipAllVisible,
      fallenCount,
      visibleJumpingCount,
      visibleShoulderRideCount,
      blinkingCount,
      blockerVictims,
      comedyAward,
      intruderInFrame,
      intruderKind,
      waveCrashActive,
      kusudamaActive,
      flyingHatCount,
      sneezeCount,
      lensBombCount,
      henGaoCount,
    );

    return {
      totalScore: scores.totalScore,
      comedyScore,
      rank,
      coverageScore: scores.coverageScore,
      expressionScore: scores.expressionScore,
      compositionScore: scores.compositionScore,
      momentScore: scores.momentScore,
      visibleCount,
      smilingCount,
      totalCount: npcs.length,
      vipAllVisible,
      fallenCount,
      jumpingCount,
      blinkingCount,
      shoulderRideCount,
      flyingHatCount,
      intruderInFrame,
      intruderKind,
      waveCrashActive,
      kusudamaActive,
      henGaoCount,
      sneezeCount,
      lensBombCount,
      caption,
      subCaption,
      comedyAward,
      verdicts,
    };
  }

  /**
   * Core analytical 3D ray-sphere + ray-capsule occlusion & NDC projection pass.
   */
  private analyzeNpcs(
    npcs: NpcRuntimeState[],
    camera: THREE.PerspectiveCamera,
    trackBlockers: boolean,
  ): EvaluatedNpc[] {
    camera.updateMatrixWorld(false);
    this._camPos.setFromMatrixPosition(camera.matrixWorld);
    this._camRight.setFromMatrixColumn(camera.matrixWorld, 0).normalize();
    this._camForward.setFromMatrixColumn(camera.matrixWorld, 2).negate().normalize();

    const camX = this._camPos.x;
    const camY = this._camPos.y;
    const camZ = this._camPos.z;
    const rightX = this._camRight.x;
    const rightY = this._camRight.y;
    const rightZ = this._camRight.z;

    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5);

    // Precompute per-NPC distance & torso capsule endpoints in reusable scratch buffers
    const count = npcs.length;
    this.ensureScratchCapacity(count);
    const dists = this._dists;
    const capAx = this._capAx;
    const capAy = this._capAy;
    const capAz = this._capAz;
    const capBx = this._capBx;
    const capBy = this._capBy;
    const capBz = this._capBz;
    const torsoR = this._torsoR;
    const headR = this._headR;

    for (let i = 0; i < count; i++) {
      const n = npcs[i];
      const hx = n.headWorldPos.x;
      const hy = n.headWorldPos.y;
      const hz = n.headWorldPos.z;

      const ddx = hx - camX;
      const ddy = hy - camY;
      const ddz = hz - camZ;
      dists[i] = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

      // Build torso capsule aligned from feet+0.25 to head-0.18 along actual body spine
      const fx = n.position.x;
      const fy = n.position.y;
      const fz = n.position.z;
      const ax = hx - fx;
      const ay = hy - fy;
      const az = hz - fz;
      const spineLen = Math.sqrt(ax * ax + ay * ay + az * az);

      if (spineLen > 0.45) {
        const invLen = 1 / spineLen;
        const ux = ax * invLen;
        const uy = ay * invLen;
        const uz = az * invLen;
        capAx[i] = fx + ux * 0.25;
        capAy[i] = fy + uy * 0.25;
        capAz[i] = fz + uz * 0.25;
        capBx[i] = hx - ux * 0.18;
        capBy[i] = hy - uy * 0.18;
        capBz[i] = hz - uz * 0.18;
      } else {
        // Fallback for severely squashed/compact pose
        const mx = (fx + hx) * 0.5;
        const my = (fy + hy) * 0.5;
        const mz = (fz + hz) * 0.5;
        capAx[i] = mx;
        capAy[i] = my;
        capAz[i] = mz;
        capBx[i] = mx;
        capBy[i] = my;
        capBz[i] = mz;
      }

      torsoR[i] = n.radius * 0.92;
      headR[i] = n.headRadius * 1.05;
    }

    const rayOffsets = this._rayOffsets;
    const results = this._evalPool;

    for (let i = 0; i < count; i++) {
      const target = npcs[i];
      const targetDist = dists[i];
      const tHead = target.headWorldPos;

      // Project head center into NDC
      this._ndc.copy(tHead).project(camera);
      const forwardDot =
        (tHead.x - camX) * this._camForward.x +
        (tHead.y - camY) * this._camForward.y +
        (tHead.z - camZ) * this._camForward.z;
      const inFront = forwardDot > 0.15 && this._ndc.z > -1 && this._ndc.z < 1;
      const inFrame =
        inFront && Math.abs(this._ndc.x) <= 0.94 && Math.abs(this._ndc.y) <= 0.92;
      const edgeClipped =
        inFrame && (Math.abs(this._ndc.x) > 0.86 || Math.abs(this._ndc.y) > 0.85);

      // Apparent face box size (normalized to viewport height)
      const safeDist = Math.max(0.35, forwardDot > 0.2 ? forwardDot : targetDist);
      const halfHeightAtDist = safeDist * tanHalfFov;
      const faceScreenSize = clamp(
        (target.headRadius * 2.2) / (halfHeightAtDist * 2),
        0.03,
        0.48,
      );

      // Gaze dot product
      this._toCam.set(camX - tHead.x, camY - tHead.y, camZ - tHead.z);
      const toCamLen = this._toCam.length();
      if (toCamLen > 1e-5) this._toCam.divideScalar(toCamLen);
      const hfLen = target.headForward.length();
      const gazeDot =
        hfLen > 1e-5
          ? target.headForward.dot(this._toCam) / hfLen
          : 0;
      const lookingAtCamera = target.action !== 'fallen' && gazeDot > 0.62;

      // Cast 3 occlusion rays from camera to target head (center, left, right)
      let unblockedRays = 0;
      const blockedByIds = trackBlockers ? [] : this._emptyBlockedIds;

      if (inFrame) {
        const offsetMag = target.headRadius;
        for (let r = 0; r < 3; r++) {
          const s = rayOffsets[r] * offsetMag;
          const tx = tHead.x + rightX * s;
          const ty = tHead.y + rightY * s;
          const tz = tHead.z + rightZ * s;

          const rx = tx - camX;
          const ry = ty - camY;
          const rz = tz - camZ;
          const rayLen = Math.sqrt(rx * rx + ry * ry + rz * rz);
          if (rayLen <= 1e-4) {
            unblockedRays++;
            continue;
          }
          const invRayLen = 1 / rayLen;
          const dirX = rx * invRayLen;
          const dirY = ry * invRayLen;
          const dirZ = rz * invRayLen;

          const tMin = 0.05;
          const tMax = Math.max(tMin + 0.01, rayLen - target.headRadius * 0.6);
          const segEndX = camX + dirX * tMax;
          const segEndY = camY + dirY * tMax;
          const segEndZ = camZ + dirZ * tMax;
          const segStartX = camX + dirX * tMin;
          const segStartY = camY + dirY * tMin;
          const segStartZ = camZ + dirZ * tMin;

          let blocked = false;

          for (let j = 0; j < count; j++) {
            if (j === i) continue;
            const blocker = npcs[j];

            // Shoulder-riding pair never falsely occludes each other
            if (
              blocker.spec.id === target.carrierId ||
              blocker.spec.id === target.riderId ||
              target.spec.id === blocker.carrierId ||
              target.spec.id === blocker.riderId
            ) {
              continue;
            }

            // Only test blockers closer to the camera than target (with small margin for torso lean)
            if (dists[j] > targetDist + 0.25) continue;

            // 1) Head sphere test
            const bHead = blocker.headWorldPos;
            const hitHead = raySegmentIntersectsSphere(
              camX,
              camY,
              camZ,
              dirX,
              dirY,
              dirZ,
              tMin,
              tMax,
              bHead.x,
              bHead.y,
              bHead.z,
              headR[j],
            );

            // 2) Torso capsule test (exact segment-to-segment distance <= torsoR)
            let hitTorso = false;
            if (!hitHead) {
              const tr = torsoR[j];
              const dSq = segmentSegmentDistSq(
                segStartX,
                segStartY,
                segStartZ,
                segEndX,
                segEndY,
                segEndZ,
                capAx[j],
                capAy[j],
                capAz[j],
                capBx[j],
                capBy[j],
                capBz[j],
              );
              hitTorso = dSq <= tr * tr;
            }

            if (hitHead || hitTorso) {
              blocked = true;
              if (trackBlockers && !blockedByIds.includes(blocker.spec.id)) {
                blockedByIds.push(blocker.spec.id);
              }
              break;
            }
          }

          if (!blocked) {
            unblockedRays++;
          }
        }
      }

      const visibleRatio =
        unblockedRays === 3
          ? 1.0
          : unblockedRays === 2
            ? 0.67
            : unblockedRays === 1
              ? 0.33
              : 0;

      const slot = results[i];
      if (slot) {
        slot.npc = target;
        slot.inFrame = inFrame;
        slot.edgeClipped = edgeClipped;
        slot.visibleRatio = visibleRatio;
        slot.gazeDot = gazeDot;
        slot.lookingAtCamera = lookingAtCamera;
        slot.ndcX = this._ndc.x;
        slot.ndcY = this._ndc.y;
        slot.screenX = (this._ndc.x + 1) * 0.5;
        slot.screenY = (1 - this._ndc.y) * 0.5;
        slot.faceScreenSize = faceScreenSize;
        slot.distToCamera = targetDist;
        slot.blockedByIds = blockedByIds;
      } else {
        results[i] = {
          npc: target,
          inFrame,
          edgeClipped,
          visibleRatio,
          gazeDot,
          lookingAtCamera,
          ndcX: this._ndc.x,
          ndcY: this._ndc.y,
          screenX: (this._ndc.x + 1) * 0.5,
          screenY: (1 - this._ndc.y) * 0.5,
          faceScreenSize,
          distToCamera: targetDist,
          blockedByIds,
        };
      }
    }

    return results;
  }

  private classifyLiveBoxInto(
    ev: EvaluatedNpc,
    out: { status: LiveFaceBox['status']; label: string },
  ): void {
    const { npc, inFrame, edgeClipped, visibleRatio, lookingAtCamera } = ev;

    if (!inFrame || visibleRatio < 0.3) {
      out.status = 'hidden';
      out.label = !inFrame ? '枠外' : '隠れ';
      return;
    }

    if (
      npc.action === 'fallen' ||
      npc.expression === 'sneeze' ||
      npc.expression === 'blink' ||
      npc.expression === 'dizzy' ||
      edgeClipped
    ) {
      out.status = 'bad';
      if (npc.action === 'fallen') out.label = '転倒';
      else if (npc.expression === 'sneeze') out.label = 'くしゃみ';
      else if (npc.expression === 'dizzy') out.label = 'クラクラ';
      else if (npc.expression === 'blink') out.label = 'まばたき';
      else out.label = '見切れ';
      return;
    }

    if (
      visibleRatio < 0.9 ||
      npc.expression === 'hen_gao' ||
      !lookingAtCamera ||
      npc.expression === 'nervous' ||
      npc.expression === 'blink_warn' ||
      npc.expression === 'surprised'
    ) {
      out.status = 'warn';
      if (visibleRatio < 0.9) out.label = 'かぶり';
      else if (npc.expression === 'hen_gao') out.label = '変顔！';
      else if (npc.expression === 'blink_warn') out.label = 'うとうと';
      else if (npc.expression === 'surprised') out.label = 'びっくり';
      else if (!lookingAtCamera) out.label = 'よそ見';
      else out.label = '緊張';
      return;
    }

    out.status = 'good';
    out.label = '';
  }

  private computeScores(
    evaluated: EvaluatedNpc[],
    totalCount: number,
    kusudamaActive = false,
  ): {
    totalScore: number;
    coverageScore: number;
    expressionScore: number;
    compositionScore: number;
    momentScore: number;
    span: number;
  } {
    if (totalCount === 0) {
      return {
        totalScore: 0,
        coverageScore: 0,
        expressionScore: 0,
        compositionScore: 0,
        momentScore: 0,
        span: 0,
      };
    }

    // 1. Coverage Score (0..40)
    let covWeightedSum = 0;
    let covWeightTotal = 0;
    let allVisible = true;
    let allCleanUnclipped = true;
    let vipAllVisible = true;
    let visibleCount = 0;

    // 2. Expression Score (0..30)
    let exprWeightedSum = 0;
    let exprWeightTotal = 0;
    let smilingVisibleCount = 0;

    // 3. Composition metrics (0..20)
    let minNdcX = Infinity;
    let maxNdcX = -Infinity;
    let minNdcY = Infinity;
    let maxNdcY = -Infinity;
    let sumNdcY = 0;
    let framedCount = 0;
    let edgeClippedCount = 0;
    let outOfFrameCount = 0;
    let vipNdcXSum = 0;
    let vipFramedCount = 0;

    // 4. Moment metrics (0..10)
    let cheeseOrPosingVisible = 0;
    let visibleJumpers = 0;
    let visiblePeeking = 0;
    let activeHelpingCount = 0;
    let fallenCount = 0;
    let visibleVipSmiling = 0;
    let totalVipCount = 0;

    const evalById = this._evalById;
    evalById.clear();
    for (let i = 0; i < totalCount; i++) {
      evalById.set(evaluated[i].npc.spec.id, evaluated[i]);
    }

    for (let i = 0; i < totalCount; i++) {
      const ev = evaluated[i];
      const npc = ev.npc;
      const isVisible = ev.inFrame && ev.visibleRatio >= 0.67;

      // Coverage
      const covW = npc.spec.isVip ? 1.6 : 1.0;
      let visCredit = ev.inFrame ? ev.visibleRatio : 0;
      if (ev.edgeClipped) visCredit *= 0.68;
      if (npc.action === 'fallen') visCredit *= 0.55;
      covWeightedSum += covW * visCredit;
      covWeightTotal += covW;

      if (isVisible) {
        visibleCount++;
      } else {
        allVisible = false;
        allCleanUnclipped = false;
        if (npc.spec.isVip) vipAllVisible = false;
      }
      if (ev.edgeClipped) allCleanUnclipped = false;

      // Expression & Gaze
      const exprW = npc.spec.isVip ? 1.5 : 1.0;
      const exprBase = EXPRESSION_QUALITY[npc.expression] ?? 0.5;
      let gazeMult: number;
      if (npc.action === 'fallen') {
        gazeMult = 0.25;
      } else if (ev.gazeDot >= 0.85) {
        gazeMult = 1.0;
      } else if (ev.gazeDot >= 0.62) {
        gazeMult = 0.86 + 0.14 * ((ev.gazeDot - 0.62) / 0.23);
      } else if (ev.gazeDot >= 0.2) {
        gazeMult = 0.45 + 0.41 * ((ev.gazeDot - 0.2) / 0.42);
      } else {
        gazeMult = 0.3;
      }
      const faceVisMult = !ev.inFrame
        ? 0
        : ev.visibleRatio >= 0.67
          ? 1.0
          : ev.visibleRatio * 0.8;
      exprWeightedSum += exprW * exprBase * gazeMult * faceVisMult;
      exprWeightTotal += exprW;

      const isSmiling =
        isVisible &&
        ev.lookingAtCamera &&
        npc.action !== 'fallen' &&
        (npc.expression === 'smile' ||
          npc.expression === 'cheese' ||
          npc.expression === 'smug');
      if (isSmiling) smilingVisibleCount++;

      if (npc.spec.isVip) {
        totalVipCount++;
        if (isSmiling) visibleVipSmiling++;
      }

      // Composition
      if (ev.inFrame) {
        framedCount++;
        if (ev.ndcX < minNdcX) minNdcX = ev.ndcX;
        if (ev.ndcX > maxNdcX) maxNdcX = ev.ndcX;
        if (ev.ndcY < minNdcY) minNdcY = ev.ndcY;
        if (ev.ndcY > maxNdcY) maxNdcY = ev.ndcY;
        sumNdcY += ev.ndcY;
        if (ev.edgeClipped) edgeClippedCount++;
        if (npc.spec.isVip) {
          vipNdcXSum += ev.ndcX;
          vipFramedCount++;
        }
      } else {
        outOfFrameCount++;
      }

      // Moments
      if (npc.action === 'fallen') fallenCount++;
      if (
        isVisible &&
        ev.lookingAtCamera &&
        (npc.expression === 'cheese' || npc.action === 'posing')
      ) {
        cheeseOrPosingVisible++;
      }
      if (npc.action === 'jumping' && isVisible && !ev.edgeClipped) {
        visibleJumpers++;
      }
      if (
        (npc.action === 'peeking' || npc.action === 'tiptoe') &&
        isVisible &&
        !ev.edgeClipped
      ) {
        visiblePeeking++;
      }
      if (npc.action === 'helping' && isVisible) {
        activeHelpingCount++;
      }
    }

    // Coverage score calculation (0..40)
    const covBase = (covWeightedSum / covWeightTotal) * 35;
    let covBonus = 0;
    if (allCleanUnclipped) {
      covBonus = 5;
    } else if (allVisible) {
      covBonus = 3.2;
    } else if (vipAllVisible && visibleCount >= totalCount - 1) {
      covBonus = 1.5;
    }
    const coverageRaw = clamp(covBase + covBonus, 0, 40);

    // Expression score calculation (0..30)
    const expressionRaw = clamp((exprWeightedSum / exprWeightTotal) * 30, 0, 30);

    // Composition score calculation (0..20)
    let compositionRaw = 0;
    let span = 0;
    if (framedCount > 0) {
      span = (maxNdcX - minNdcX) * 0.5; // 0..1 fraction of viewport width

      // Horizontal span (0..6): ideal 0.52..0.84
      let spanScore: number;
      if (span >= 0.52 && span <= 0.84) {
        spanScore = 6.0;
      } else if (span < 0.52) {
        spanScore = 6.0 * clamp((span - 0.14) / (0.52 - 0.14), 0, 1);
      } else {
        spanScore = 6.0 * clamp(1 - (span - 0.84) / 0.22, 0.35, 1);
      }

      // Horizontal centering of group & VIPs (0..5)
      const groupCenterX = (minNdcX + maxNdcX) * 0.5;
      const groupCenterFactor = clamp(1 - Math.abs(groupCenterX) / 0.45, 0, 1);
      let vipCenterFactor = 0.2;
      if (vipFramedCount > 0) {
        const vipCenterX = vipNdcXSum / vipFramedCount;
        vipCenterFactor = clamp(
          1 - Math.max(0, Math.abs(vipCenterX) - 0.08) / 0.45,
          0,
          1,
        );
      }
      const centerScore = 5.0 * (0.55 * groupCenterFactor + 0.45 * vipCenterFactor);

      // Vertical headroom & balance (0..5)
      const avgNdcY = sumNdcY / framedCount;
      const avgYFactor = clamp(
        1 - Math.max(0, Math.abs(avgNdcY - 0.1) - 0.22) / 0.5,
        0,
        1,
      );
      const headroomFactor = clamp(
        1 - Math.max(0, maxNdcY - 0.76) / 0.24,
        0,
        1,
      );
      const bottomFactor = clamp(
        1 - Math.max(0, -0.58 - minNdcY) / 0.36,
        0,
        1,
      );
      const verticalScore =
        5.0 * (0.45 * avgYFactor + 0.35 * headroomFactor + 0.2 * bottomFactor);

      // Edge cleanliness (0..4)
      const badEdgeRatio =
        (edgeClippedCount + outOfFrameCount * 1.35) / totalCount;
      const edgeScore = 4.0 * clamp(1 - badEdgeRatio * 2.4, 0, 1);

      const framedScale = Math.min(1, framedCount / (totalCount * 0.65));
      compositionRaw = clamp(
        (spanScore + centerScore + verticalScore + edgeScore) * framedScale,
        0,
        20,
      );
    }

    // Moment score calculation (0..10)
    let visibleShoulderPairs = 0;
    for (let i = 0; i < totalCount; i++) {
      const ev = evaluated[i];
      if (ev.npc.action === 'riding_shoulders' && ev.inFrame && ev.visibleRatio >= 0.67) {
        const carrier = ev.npc.carrierId ? evalById.get(ev.npc.carrierId) : undefined;
        if (!carrier || (carrier.inFrame && carrier.visibleRatio >= 0.67)) {
          visibleShoulderPairs++;
        }
      }
    }

    let momentRaw = 0;
    // Static synchronized cheese / posing smiles (capped at 3.0 so motionless shots land in S, not free S+)
    momentRaw += Math.min(3.0, (cheeseOrPosingVisible / totalCount) * 3.4);
    // Mid-air jumps (up to 4.5)
    if (visibleJumpers >= 2) {
      momentRaw += 4.5;
    } else if (visibleJumpers === 1) {
      momentRaw += 2.6;
    }
    // Shoulder-ride peek success (up to 4.0)
    if (visibleShoulderPairs > 0) {
      momentRaw += Math.min(4.0, visibleShoulderPairs * 3.0);
    }
    // Shy/peeker pop-out success (up to 2.2)
    if (visiblePeeking > 0) {
      momentRaw += Math.min(2.2, visiblePeeking * 1.2);
    }
    // Active helper rescue while VIPs shine (modest +1.5; stumbles/falls belong to comedy awards)
    if (activeHelpingCount > 0 && totalVipCount > 0 && visibleVipSmiling === totalVipCount) {
      momentRaw += 1.5;
    }
    // Static harmony bonus for full smiling cast (capped at 1.8)
    if (allVisible && smilingVisibleCount >= totalCount - 1 && fallenCount === 0) {
      momentRaw += 1.8;
    }
    // Kusudama confetti celebration bonus (+2 when catching the celebration cleanly)
    if (
      kusudamaActive &&
      vipAllVisible &&
      fallenCount === 0 &&
      visibleCount >= Math.max(1, totalCount - 2) &&
      smilingVisibleCount >= Math.ceil(totalCount * 0.55)
    ) {
      momentRaw += 2.0;
    }
    momentRaw = clamp(momentRaw, 0, 10);

    // Round sub-scores and sum cleanly so breakdown ALWAYS matches totalScore
    const coverageScore = Math.round(coverageRaw);
    const expressionScore = Math.round(expressionRaw);
    const compositionScore = Math.round(compositionRaw);
    const momentScore = Math.round(momentRaw);
    const totalScore = clamp(
      coverageScore + expressionScore + compositionScore + momentScore,
      0,
      100,
    );

    return {
      totalScore,
      coverageScore,
      expressionScore,
      compositionScore,
      momentScore,
      span,
    };
  }

  private computeNpcPoints(ev: EvaluatedNpc): number {
    if (!ev.inFrame) return 0;
    const npc = ev.npc;
    let pts = ev.visibleRatio * 55;
    if (ev.edgeClipped) pts *= 0.72;
    if (npc.action === 'fallen') pts *= 0.4;

    const expr = EXPRESSION_QUALITY[npc.expression] ?? 0.5;
    const gaze = ev.lookingAtCamera ? 1.0 : 0.45;
    pts += expr * gaze * 35 * (ev.visibleRatio >= 0.67 ? 1 : 0.5);

    if (
      ev.visibleRatio >= 0.67 &&
      (npc.action === 'jumping' ||
        npc.action === 'riding_shoulders' ||
        npc.action === 'posing' ||
        npc.expression === 'cheese')
    ) {
      pts += 10;
    }

    return Math.round(clamp(pts, 0, 100));
  }

  private computeVerdictTag(ev: EvaluatedNpc): string {
    const { npc, inFrame, edgeClipped, visibleRatio, lookingAtCamera } = ev;

    if (!inFrame) return 'フレーム外！';
    if (npc.hatPopHeight > 0.16) return '帽子が飛んだ！';
    if (npc.expression === 'sneeze') return '決定的クシャミ！';
    if (npc.lensBombProgress > 0.55) return 'レンズ突撃！';
    if (npc.action === 'fallen') return '転倒中！';
    if (visibleRatio === 0) return '完全に隠れた';
    if (visibleRatio < 0.67) return '後ろに隠れた';
    if (edgeClipped) return '端で見切れ';
    if (npc.expression === 'hen_gao') return '変顔テロ！';
    if (npc.expression === 'dizzy') return '目が回ってる';
    if (npc.expression === 'blink') return '目をつぶった';
    if (visibleRatio < 0.9) return 'ちょっとかぶり';
    if (npc.action === 'riding_shoulders') return '肩車成功！';
    if (npc.action === 'jumping') return '空中ピース！';
    if (npc.action === 'peeking' || npc.action === 'tiptoe') return 'ひょっこり成功！';
    if (npc.action === 'helping') return '救出中！';
    if (npc.action === 'staggering') return 'おっとっと！';
    if (!lookingAtCamera) return 'よそ見中';
    if (npc.expression === 'cheese') return '最高のチーズ！';
    if (npc.expression === 'smile') return 'ベスト笑顔';
    if (npc.expression === 'smug') return 'ドヤ顔キメ！';
    if (npc.expression === 'surprised') return 'びっくり顔';
    if (npc.expression === 'blink_warn') return '眠そう…';
    if (npc.expression === 'nervous') return 'ちょい緊張';
    return 'カメラ目線';
  }

  private scoreToRank(totalScore: number): PhotoRank {
    if (totalScore >= 93) return 'S+';
    if (totalScore >= 84) return 'S';
    if (totalScore >= 72) return 'A';
    if (totalScore >= 56) return 'B';
    return 'C';
  }

  private findShowoffPhotobomber(
    evaluated: EvaluatedNpc[],
    blockerVictims: Map<string, Set<string>>,
  ): { ev: EvaluatedNpc; victimCount: number } | null {
    let best: { ev: EvaluatedNpc; victimCount: number } | null = null;
    for (const ev of evaluated) {
      if (ev.npc.spec.archetype !== 'showoff') continue;
      if (!ev.inFrame || ev.visibleRatio < 0.67) continue;
      const victims = blockerVictims.get(ev.npc.spec.id);
      const victimCount = victims ? victims.size : 0;
      const isHugeInFront = ev.faceScreenSize >= 0.135;
      if (victimCount >= 1 || isHugeInFront) {
        if (
          !best ||
          victimCount > best.victimCount ||
          (victimCount === best.victimCount &&
            ev.faceScreenSize > best.ev.faceScreenSize)
        ) {
          best = { ev, victimCount };
        }
      }
    }
    return best;
  }

  private detectComedyAward(
    evaluated: EvaluatedNpc[],
    blockerVictims: Map<string, Set<string>>,
    fallenCount: number,
    visibleJumpingCount: number,
    visibleShoulderRideCount: number,
    blinkingCount: number,
    visibleCount: number,
    smilingCount: number,
    intruderInFrame: boolean,
    intruderKind: StageIntruderKind | null,
    waveCrashActive: boolean,
    kusudamaActive: boolean,
    flyingHatCount: number,
    sneezeCount: number,
    lensBombCount: number,
    henGaoCount: number,
  ): ComedyAward | null {
    const totalCount = evaluated.length;

    // 0. High-comedy rare bakage captures (top priority!)
    if (intruderInFrame && intruderKind === 'oodama') {
      return {
        id: 'oodama_strike',
        badge: '🔴 人間ボウリング大玉賞',
        reason: '暴走大玉が表彰台の前でド派手に人間ボウリング！',
      };
    }

    if (intruderInFrame && intruderKind === 'beach_ball') {
      return {
        id: 'beach_ball_boing',
        badge: '🏐 ボヨヨン直撃賞',
        reason: '巨大ビーチボールが常夏の記念撮影にボヨヨン直撃！',
      };
    }

    if (intruderInFrame && intruderKind === 'deer') {
      return {
        id: 'nara_deer',
        badge: '🦌 奈良の刺客賞',
        reason: '奈良のシカが記念写真のセンターを堂々ジャック！',
      };
    }

    if (intruderInFrame && intruderKind === 'dove') {
      return {
        id: 'rogue_dove',
        badge: '🕊️ ハト主役賞',
        reason: '暴走ハトがカメラのど真ん中を華麗に強奪！',
      };
    }

    if (waveCrashActive) {
      return {
        id: 'wave_wipeout',
        badge: '🌊 大波ずぶ濡れ賞',
        reason: '波打ち際で大波ざっぱーん直撃の瞬間を完璧キャッチ！',
      };
    }

    if (
      kusudamaActive &&
      smilingCount >= Math.ceil(totalCount * 0.55) &&
      visibleCount >= Math.max(1, totalCount - 3) &&
      fallenCount <= 1
    ) {
      return {
        id: 'kusudama_fever',
        badge: '🎊 優勝パニック賞',
        reason: 'くす玉パッカーン＆紙吹雪フィーバーを満面の笑顔で激写！',
      };
    }

    if (fallenCount >= 3) {
      return {
        id: 'human_bowling',
        badge: '💥 人間ボーリング賞',
        reason: `${fallenCount}人がストライク級に連鎖転倒した歴史的珍場面！`,
      };
    }

    if (sneezeCount >= 1) {
      return {
        id: 'sneeze_blast',
        badge: '🤧 爆風クシャミ賞',
        reason: 'くしゃみ一発で集合写真が吹き飛んだ決定的瞬間！',
      };
    }

    if (flyingHatCount >= 1) {
      return {
        id: 'flying_hat',
        badge: '🎩 決定的ポロリ賞',
        reason: '重力に逆らって宙を舞う帽子を完璧キャッチ！',
      };
    }

    if (lensBombCount >= 1) {
      return {
        id: 'lens_bomb',
        badge: '😱 距離感バグ賞',
        reason: 'カメラレンズ至近距離まで突撃して画面を制圧！',
      };
    }

    if (henGaoCount >= 1) {
      return {
        id: 'hen_gao_terror',
        badge: '🤪 変顔テロ賞',
        reason: '一生残る記念写真に全力の変顔をブチ込んだ勇者！',
      };
    }

    // 1. Domino disaster (2 fallen)
    if (fallenCount >= 2) {
      return {
        id: 'domino_disaster',
        badge: '💥 ドミノ惨事賞',
        reason: `${fallenCount}人が見事にバタバタ転倒した決定的瞬間！`,
      };
    }

    // 2. Showoff photobomb hijack
    const bomber = this.findShowoffPhotobomber(evaluated, blockerVictims);
    if (bomber) {
      return {
        id: 'showoff_hijack',
        badge: '🚀 最前列ジャック賞',
        reason:
          bomber.victimCount > 0
            ? `${bomber.ev.npc.spec.name}が最前列で${bomber.victimCount}人をブロック！`
            : `${bomber.ev.npc.spec.name}がカメラ至近距離を独り占め！`,
      };
    }

    // 3. Synchronized mid-air jump
    if (visibleJumpingCount >= 2) {
      return {
        id: 'miracle_levitation',
        badge: '🦘 奇跡の浮遊賞',
        reason: `${visibleJumpingCount}人同時ジャンプを空中で完璧キャッチ！`,
      };
    }

    // 4. Shoulder ride triumph
    if (visibleShoulderRideCount >= 1) {
      return {
        id: 'shoulder_best',
        badge: '🦒 肩車ベストショット賞',
        reason: '肩車コンビがバッチリ笑顔でフレームイン！',
      };
    }

    // 5. Mass blinking
    if (blinkingCount >= 2) {
      return {
        id: 'mass_blink',
        badge: '😑 全員まばたき賞',
        reason: `${blinkingCount}人が同時に目を閉じた奇跡のシャッター！`,
      };
    }

    // 6. Shy & Peeker miracle visibility
    const shyAndPeekers = evaluated.filter(
      (e) =>
        e.npc.spec.archetype === 'shy' || e.npc.spec.archetype === 'peeker',
    );
    if (
      shyAndPeekers.length >= 2 &&
      shyAndPeekers.every((e) => e.inFrame && e.visibleRatio >= 0.67)
    ) {
      return {
        id: 'miracle_peek',
        badge: '🫣 奇跡のひょっこり賞',
        reason: '恥ずかしがり屋＆ひょっこり組が全員バッチリ登場！',
      };
    }

    // 7. Heroic rescue moment
    const rescuer = evaluated.find(
      (e) =>
        e.npc.action === 'helping' && e.inFrame && e.visibleRatio >= 0.67,
    );
    if (rescuer && fallenCount >= 1) {
      return {
        id: 'hero_rescue',
        badge: '🦸 決定的救出ショット賞',
        reason: `${rescuer.npc.spec.name}の全力レスキューを激写！`,
      };
    }

    // 8. Solo aerial star with full cast
    if (visibleJumpingCount === 1 && visibleCount === evaluated.length) {
      const jumper = evaluated.find(
        (e) =>
          e.npc.action === 'jumping' && e.inFrame && e.visibleRatio >= 0.67,
      );
      if (jumper) {
        return {
          id: 'aerial_star',
          badge: '⭐ 空中ベストポーズ賞',
          reason: `${jumper.npc.spec.name}のジャンプと全員集合が同時成立！`,
        };
      }
    }

    return null;
  }

  private generateCaptions(
    evaluated: EvaluatedNpc[],
    stage: StageSpec,
    rank: PhotoRank,
    span: number,
    visibleCount: number,
    smilingCount: number,
    vipAllVisible: boolean,
    fallenCount: number,
    visibleJumpingCount: number,
    visibleShoulderRideCount: number,
    blinkingCount: number,
    blockerVictims: Map<string, Set<string>>,
    comedyAward: ComedyAward | null,
    intruderInFrame: boolean,
    intruderKind: StageIntruderKind | null,
    waveCrashActive: boolean,
    kusudamaActive: boolean,
    flyingHatCount: number,
    sneezeCount: number,
    lensBombCount: number,
    henGaoCount: number,
  ): { caption: string; subCaption: string } {
    const totalCount = evaluated.length;

    // 0. High-comedy rare bakage headline captures!
    if (intruderInFrame && intruderKind === 'oodama') {
      return {
        caption: '🔴 大玉ストライク！！',
        subCaption: '表彰台の前で人間ボウリングが開幕しました。',
      };
    }

    if (intruderInFrame && intruderKind === 'beach_ball') {
      return {
        caption: '🏐 巨大ビーチボール直撃！',
        subCaption: 'ボヨヨンと吹き飛ぶ常夏メモリー！',
      };
    }

    if (intruderInFrame && intruderKind === 'deer') {
      return {
        caption: '🦌 鹿がセンター奪取！',
        subCaption: '3年2組の新メンバー（奈良県出身）が堂々の主役。',
      };
    }

    if (intruderInFrame && intruderKind === 'dove') {
      return {
        caption: '🕊️ ハト、顔面ドアップ乱入！',
        subCaption: 'もはやハトの宣材写真。新郎新婦は背景です。',
      };
    }

    if (waveCrashActive) {
      return {
        caption: '🌊 ざっぱーん！前列全滅！！',
        subCaption: '波打ち際で撮影するからこうなる！',
      };
    }

    if (
      kusudamaActive &&
      smilingCount >= Math.ceil(totalCount * 0.55) &&
      visibleCount >= Math.max(1, totalCount - 3) &&
      fallenCount <= 1
    ) {
      return {
        caption: '🎊 くす玉パッカーン！優勝最高！！',
        subCaption: '紙吹雪と笑顔が弾ける奇跡の優勝ショット！',
      };
    }

    if (fallenCount >= 3) {
      return {
        caption: '💥 歴史的ドミノ大惨事！',
        subCaption: '記念撮影会場で人間ボーリング大会が開幕しました。',
      };
    }

    if (sneezeCount >= 1) {
      return {
        caption: '🤧 世紀のハクション爆発！',
        subCaption: 'くしゃみ一発で集合写真が戦場と化した瞬間。',
      };
    }

    if (flyingHatCount >= 1) {
      return {
        caption: '🎩 帽子（カツラ？）宙に舞う！！',
        subCaption: '重力に逆らう奇跡の1フレームを激写！',
      };
    }

    if (lensBombCount >= 1) {
      return {
        caption: '😱 レンズに顔面ベッタリ！',
        subCaption: '距離感バグりすぎ！画面の半分がお前だ！',
      };
    }

    if (henGaoCount >= 1) {
      return {
        caption: '🤪 ひとりだけ変顔ガチ勢！',
        subCaption: '一生残る写真でその顔は勇者すぎる。',
      };
    }

    // 1. S+ perfection moments
    if (rank === 'S+') {
      if (visibleJumpingCount >= 2) {
        return {
          caption: '奇跡のパーフェクト・ジャンプ！',
          subCaption: '全員笑顔＋同時ジャンプまで決まった、額縁入りの神ショット！',
        };
      }
      if (visibleShoulderRideCount >= 1) {
        return {
          caption: '肩車まで決まった伝説の一枚！',
          subCaption: 'みんなの笑顔も構図も完璧！一生語られるベストショット。',
        };
      }
      switch (stage.id) {
        case 'wedding':
          return {
            caption: '一生モノの祝福スマイル！',
            subCaption: '新郎新婦もゲストも全員キラキラ！式場パンフレット確定レベル。',
          };
        case 'school_trip':
          return {
            caption: '卒業アルバム表紙、確定！',
            subCaption: '3年2組の全員が最高の笑顔！青春がぜんぶ詰まった神写真。',
          };
        case 'sports_day':
          return {
            caption: '🏆 社内報の表紙、決定！！',
            subCaption: '社長も社員も表彰台で全員満面の笑み！来年の採用パンフ確定！',
          };
        case 'tropical_beach':
          return {
            caption: '🌴 常夏ポスター級ベストショット！',
            subCaption: 'エメラルドの海と最高の笑顔！旅行会社のポスターにそのまま採用！',
          };
      }
    }

    // 2. Domino disaster (2 fallen)
    if (fallenCount >= 2) {
      return {
        caption: 'シャッターの瞬間、大惨事！',
        subCaption: `${fallenCount}人が仲良くゴロゴロ転倒中…笑い話としては100点満点！`,
      };
    }

    // 3. Missing VIP
    if (!vipAllVisible) {
      const missingVip = evaluated.find(
        (e) => e.npc.spec.isVip && (!e.inFrame || e.visibleRatio < 0.67),
      );
      const vipName = missingVip ? missingVip.npc.spec.name : '主役';
      return {
        caption: `あれっ、${vipName}がいない！？`,
        subCaption:
          missingVip && !missingVip.inFrame
            ? '主役がフレーム外に！カメラ位置を少し調整して中央に入れよう。'
            : '主役が後ろに隠れちゃった！角度を少し変えてベストポジションを探そう。',
      };
    }

    // 4. Showoff photobomb
    const bomber = this.findShowoffPhotobomber(evaluated, blockerVictims);
    if (bomber && bomber.victimCount >= 1) {
      return {
        caption: `${bomber.ev.npc.spec.name}、主張が強すぎる！`,
        subCaption: `堂々の最前列ジャックで${bomber.victimCount}人がカゲに…カメラを少し振ってかわそう！`,
      };
    }

    // 5. Mass blink
    if (blinkingCount >= 2) {
      return {
        caption: 'まさかのまばたき大合唱！',
        subCaption: `${blinkingCount}人が同時にスヤァ…「はいチーズ！」で目をバッチリ覚まさせよう。`,
      };
    }

    // 6. Single fall comedy
    if (fallenCount === 1) {
      const fallen = evaluated.find((e) => e.npc.action === 'fallen');
      const name = fallen ? fallen.npc.spec.name : '誰か';
      return {
        caption: `おっと！${name}がすってんころりん`,
        subCaption: '起き上がる瞬間を待つか、このまま思い出の珍写真にするか…！？',
      };
    }

    // 7. Fun highlight moments with good overall quality
    if (visibleJumpingCount >= 2 && visibleCount >= totalCount - 1) {
      return {
        caption: '息ピッタリ！ダブル空中ピース！',
        subCaption: '躍動感バツグンのシャッターチャンスを見事にキャッチ！',
      };
    }

    if (visibleShoulderRideCount >= 1 && visibleCount >= totalCount - 1) {
      return {
        caption: 'ナイス肩車！背伸び大作戦、成功！',
        subCaption: '後ろのキッズもバッチリ見えて、微笑ましさ満点の一枚。',
      };
    }

    // 8. S rank clean success
    if (rank === 'S') {
      if (comedyAward?.id === 'miracle_peek') {
        return {
          caption: '恥ずかしがり屋もバッチリ集合！',
          subCaption: '全員の顔がしっかり写った、あたたかいベストショット！',
        };
      }
      switch (stage.id) {
        case 'wedding':
          return {
            caption: '祝福あふれるベスト集合写真！',
            subCaption: '全員の笑顔が華やか！ちょっとの微調整でS+も狙えそう。',
          };
        case 'school_trip':
          return {
            caption: 'みんな笑顔！ナイス・クラス写真！',
            subCaption: '元気いっぱいの一枚！ジャンプや「はいチーズ！」でさらに高得点へ。',
          };
        case 'sports_day':
          return {
            caption: '熱血ベスト・チーム写真！',
            subCaption: '表彰台も前列もバッチリ笑顔！くす玉やジャンプでS+を狙おう。',
          };
        case 'tropical_beach':
          return {
            caption: 'まぶしい常夏ベストショット！',
            subCaption: '大波をかわして全員ナイススマイル！もう一押しでS+確定！',
          };
      }
    }

    // 9. Zoomed too far out
    if (span > 0 && span < 0.4) {
      return {
        caption: 'ちょっと遠すぎ！？みんな豆粒サイズ',
        subCaption: 'ズームインして主役とみんなの表情をもっと大きく写そう！',
      };
    }

    // 10. Almost everyone visible (1-2 hidden or clipped)
    const missingNpc = evaluated.find(
      (e) => !e.inFrame || e.visibleRatio < 0.67 || e.edgeClipped,
    );
    if (visibleCount >= totalCount - 2 && missingNpc) {
      const reasonText = !missingNpc.inFrame
        ? 'フレーム外に'
        : missingNpc.edgeClipped
          ? '端で見切れちゃった'
          : 'うしろに隠れちゃった';
      return {
        caption: `惜しい！${missingNpc.npc.spec.name}が${reasonText}`,
        subCaption: 'あと一歩で全員バッチリ！カメラの角度を少し変えてみよう。',
      };
    }

    // 11. Many looking away
    const lookingAwayCount = evaluated.filter(
      (e) => e.inFrame && e.visibleRatio >= 0.67 && !e.lookingAtCamera,
    ).length;
    if (lookingAwayCount >= 3) {
      return {
        caption: 'こっち向いて〜！目線バラバラショット',
        subCaption: '「はいチーズ！」を鳴らすと全員がカメラに注目して笑顔になるよ！',
      };
    }

    // 12. Rank fallbacks
    if (rank === 'A') {
      return {
        caption: 'いい雰囲気！あと一歩で大傑作',
        subCaption: `全員${visibleCount}/${totalCount}人・笑顔${smilingCount}人。タイミングを合わせればSランク間違いなし！`,
      };
    }
    if (rank === 'B') {
      return {
        caption: 'ドタバタ感も味がある記念写真',
        subCaption: '全員が重ならない角度を探して、「はいチーズ！」の直後にシャッターを切ろう！',
      };
    }
    return {
      caption: 'ハチャメチャ大乱戦ショット！',
      subCaption: 'カオスすぎて逆に笑える…！次は少し引いて全員の位置を確認してみよう。',
    };
  }
}
