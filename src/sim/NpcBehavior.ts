import * as THREE from 'three';
import { NpcRuntimeState, SimEvent, SimEventType, StageSpec } from '../types';
import { applyExternalBalanceHit, triggerHatPop } from './PhysicsWorld';

export const BEHAVIOR_CONFIG = {
  maxDt: 0.05,
  // Camera attention thresholds (tight localized spotlight!)
  attentionCenterRadius: 0.16,
  attentionOuterRadius: 0.58,
  referenceFov: 42,
  zoomBoostScale: 0.55,

  // Showoff & Lens Photobomb
  showoffChargeAttention: 0.44,
  showoffLoseSpotlightAttention: 0.28,
  showoffTelegraphDuration: 0.8,
  showoffChargeSpeed: 2.75,
  showoffLensBombChargeSpeed: 3.2,
  showoffLensBombRate: 0.55,
  showoffLensBombDecay: 0.65,
  showoffLensBombMaxZOffset: 0.85,
  showoffSlipAngularSpeed: 0.65,
  showoffSlipMinProgress: 0.3,
  showoffDriftSpeed: 1.05,

  // Shy
  shyHideAttention: 0.5,
  shyRelaxAttention: 0.35,
  shyCheeseCalmAttentionMax: 0.62,
  shyHighCameraRelief: 0.18,
  shyHighElevationThreshold: 0.34,
  shyHideSpeed: 1.85,
  shyPeekSpeed: 1.45,

  // Peeker
  peekerOccludedPanicTime: 0.3,
  peekerSeekOccludedTime: 0.3,
  peekerMountOccludedTime: 0.45,
  peekerMountRange: 1.45,
  peekerCarrierSeekRange: 2.3,
  peekerCarrierMinHeightScale: 0.98,
  peekerRideDuration: 5.5,
  peekerTiptoeSpeed: 1.65,
  peekerHopVy: 2.45,

  // Jumper
  jumperAttentionMin: 0.25,
  jumperChargeDuration: 0.45,
  jumperLaunchVy: 6.6,
  jumperCooldown: 2.4,
  jumperCheeseTriggerRemaining: 1.5, // ~0.6s after 2.1s Say Cheese buff starts

  // Helper
  helperDetectRadius: 3.2,
  helperBrakeDistance: 1.3,
  helperRushSpeed: 2.55,
  helperApproachSpeed: 1.05,
  helperRescueDistance: 0.85,
  helperStabilizeTime: 1.1,

  // Blinker & Mega-Sneeze Shockwave
  blinkerSweepWakeSpeed: 0.55,
  blinkerWarnDuration: 0.9,
  blinkerClosedDuration: 1.1,
  sneezeFirstDelayMin: 4.2,
  sneezeFirstDelayMax: 6.0,
  sneezeRepeatDelayMin: 9.0,
  sneezeRepeatDelayMax: 12.0,
  sneezeChargeDuration: 1.65,
  sneezeBlastRadius: 2.2,
  sneezeBlastSpeed: 3.8,
  sneezePostHoldDuration: 0.9,

  // Surprise Hen-Gao & Camera-Shake Dizziness
  henGaoChance: 0.4,
  henGaoDuration: 1.7,
  cameraShakeDizzySpeed: 1.35,

  // Say Cheese global buff
  cheesePostSpikeThreshold: 0.45,
} as const;

interface SneezeScheduleState {
  nextSneezeTimer: number;
  activeSneezerId: string | null;
}

// Per-NPC internal perception/behavior timers (no mutation to shared NpcRuntimeState shape)
const occludedTimerMap = new WeakMap<NpcRuntimeState, number>();
const helpHoldTimerMap = new WeakMap<NpcRuntimeState, number>();
const fallRollSignMap = new WeakMap<NpcRuntimeState, number>();
const jumperCheeseTriggeredMap = new WeakMap<NpcRuntimeState, boolean>();
const postCheeseSpikedMap = new WeakMap<NpcRuntimeState, boolean>();
const showoffBuildupMap = new WeakMap<NpcRuntimeState, number>();
const hopCooldownMap = new WeakMap<NpcRuntimeState, number>();
const lensBombEmittedMap = new WeakMap<NpcRuntimeState, boolean>();
const henGaoTimerMap = new WeakMap<NpcRuntimeState, number>();
const henGaoRolledMap = new WeakMap<NpcRuntimeState, boolean>();
const sneezeHoldTimerMap = new WeakMap<NpcRuntimeState, number>();
const dizzyShakeTimerMap = new WeakMap<NpcRuntimeState, number>();
const slipFallTimerMap = new WeakMap<NpcRuntimeState, number>();
const sneezeScheduleMap = new WeakMap<NpcRuntimeState[], SneezeScheduleState>();

export function resetNpcBehaviorState(npcs: NpcRuntimeState[]): void {
  sneezeScheduleMap.delete(npcs);
}

// Reusable scratch vectors to avoid per-frame allocations
const _camPos = new THREE.Vector3();
const _camForward = new THREE.Vector3();
const _camRight = new THREE.Vector3();
const _camUp = new THREE.Vector3();
const _ndc = new THREE.Vector3();
const _toHead = new THREE.Vector3();
const _rayDir = new THREE.Vector3();
const _otherTorso = new THREE.Vector3();
const _toOther = new THREE.Vector3();
const _closest = new THREE.Vector3();
const _frontFocus = new THREE.Vector3();
const _lensBombFocus = new THREE.Vector3();

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function wrapAngle(a: number): number {
  let r = a;
  while (r > Math.PI) r -= Math.PI * 2;
  while (r < -Math.PI) r += Math.PI * 2;
  return r;
}

function lerpAngle(current: number, target: number, alpha: number): number {
  return wrapAngle(current + wrapAngle(target - current) * clamp(alpha, 0, 1));
}

function emitEvent(
  npc: NpcRuntimeState,
  events: SimEvent[],
  type: SimEventType,
  intensity: number,
): void {
  const evt: SimEvent = {
    type,
    npcId: npc.spec.id,
    position: npc.position.clone(),
    intensity: clamp(intensity, 0.1, 2.0),
  };
  events.push(evt);
  npc.events.push(evt);
}

function steerToward(
  npc: NpcRuntimeState,
  targetX: number,
  targetZ: number,
  speed: number,
  dt: number,
  arrivalRadius = 0.12,
): number {
  const dx = targetX - npc.position.x;
  const dz = targetZ - npc.position.z;
  const dist = Math.hypot(dx, dz);
  if (dist <= arrivalRadius || dist < 1e-5) {
    return dist;
  }
  const desiredSpeed = dist < arrivalRadius * 2.5 ? speed * (dist / (arrivalRadius * 2.5)) : speed;
  const vx = (dx / dist) * desiredSpeed;
  const vz = (dz / dist) * desiredSpeed;
  const blend = 1 - Math.exp(-13.0 * dt);
  npc.velocity.x += (vx - npc.velocity.x) * blend;
  npc.velocity.z += (vz - npc.velocity.z) * blend;
  return dist;
}

function computeCameraVisualFrontPoint(stage: StageSpec): THREE.Vector3 {
  // Intersect camera forward ray with a comfortable front-row Z plane so showoffs charge
  // right into wherever the player is currently aiming the lens!
  const targetFrontZ = stage.id === 'school_trip' ? 0.95 : 0.88;
  const dirZ = Math.abs(_camForward.z) > 0.08 ? _camForward.z : -1;
  const t = clamp((targetFrontZ - _camPos.z) / dirZ, 1.5, 16);
  const hitX = _camPos.x + _camForward.x * t;
  const clampedX = clamp(hitX, stage.stageBounds.minX + 0.7, stage.stageBounds.maxX - 0.7);
  const clampedZ = clamp(targetFrontZ, stage.stageBounds.minZ + 0.7, stage.stageBounds.maxZ - 0.55);
  return _frontFocus.set(clampedX, 0, clampedZ);
}

function computeLensBombTarget(
  stage: StageSpec,
  targetZ: number,
  out: THREE.Vector3,
): THREE.Vector3 {
  const maxAllowedZ = stage.stageBounds.maxZ + BEHAVIOR_CONFIG.showoffLensBombMaxZOffset;
  const clampedZ = clamp(targetZ, stage.stageBounds.minZ + 0.7, maxAllowedZ);
  const dirZ = Math.abs(_camForward.z) > 0.08 ? _camForward.z : -1;
  const t = clamp((clampedZ - _camPos.z) / dirZ, 1.0, 16);
  const hitX = _camPos.x + _camForward.x * t;
  const clampedX = clamp(hitX, stage.stageBounds.minX + 0.6, stage.stageBounds.maxX - 0.6);
  return out.set(clampedX, 0, clampedZ);
}

function updatePerception(
  npcs: NpcRuntimeState[],
  camera: THREE.PerspectiveCamera,
  dt: number,
): void {
  camera.updateMatrixWorld();
  camera.getWorldPosition(_camPos);
  camera.getWorldDirection(_camForward);
  _camRight.setFromMatrixColumn(camera.matrixWorld, 0).normalize();
  _camUp.setFromMatrixColumn(camera.matrixWorld, 1).normalize();

  // Zoom boost: zooming in (lower FOV) amplifies camera attention; zooming out softens it
  const fovDelta = (BEHAVIOR_CONFIG.referenceFov - camera.fov) / 18;
  const zoomMultiplier =
    fovDelta >= 0
      ? 1 + BEHAVIOR_CONFIG.zoomBoostScale * clamp(fovDelta, 0, 1.1)
      : Math.max(0.76, 1 + 0.25 * fovDelta);

  // First pass: screen projection + cameraAttention
  for (const npc of npcs) {
    _toHead.subVectors(npc.headWorldPos, _camPos);
    const forwardDepth = _toHead.dot(_camForward);

    if (forwardDepth <= 0.25) {
      npc.screenNdc.set(0, 0, 2);
      npc.cameraAttention = 0;
      npc.isOccludedFromCamera = true;
      continue;
    }

    _ndc.copy(npc.headWorldPos).project(camera);
    npc.screenNdc.copy(_ndc);

    const radial = Math.hypot(_ndc.x, _ndc.y);
    let baseAttention: number;
    if (radial < BEHAVIOR_CONFIG.attentionCenterRadius) {
      baseAttention = 1.0;
    } else if (radial >= BEHAVIOR_CONFIG.attentionOuterRadius) {
      baseAttention = 0;
    } else {
      baseAttention =
        1 - smoothstep(BEHAVIOR_CONFIG.attentionCenterRadius, BEHAVIOR_CONFIG.attentionOuterRadius, radial);
    }

    npc.cameraAttention = clamp(baseAttention * zoomMultiplier, 0, 1);
  }

  // Second pass: analytical camera-to-head occlusion check against closer standing NPCs
  for (const npc of npcs) {
    if (npc.screenNdc.z > 1.2) {
      npc.isOccludedFromCamera = true;
      continue;
    }

    _toHead.subVectors(npc.headWorldPos, _camPos);
    const distToHead = _toHead.length();
    if (distToHead < 0.2) {
      npc.isOccludedFromCamera = false;
      continue;
    }
    _rayDir.copy(_toHead).divideScalar(distToHead);

    let occluded = false;
    for (const other of npcs) {
      if (other === npc) continue;
      if (other.action === 'fallen') continue;
      // Ignore carrier/rider pair so a shoulder-riding peeker isn't blocked by their own carrier
      if (other.spec.id === npc.carrierId || other.spec.id === npc.riderId) continue;

      // Test other's head sphere
      _toOther.subVectors(other.headWorldPos, _camPos);
      const tHead = _toOther.dot(_rayDir);
      if (tHead > 0.15 && tHead < distToHead - 0.14) {
        _closest.copy(_camPos).addScaledVector(_rayDir, tHead);
        const blockR = other.headRadius * 1.12;
        if (_closest.distanceToSquared(other.headWorldPos) < blockR * blockR) {
          occluded = true;
          break;
        }
      }

      // Test other's upper torso sphere
      _otherTorso.set(
        other.position.x,
        other.position.y + other.height * 0.62 * other.squashY,
        other.position.z,
      );
      _toOther.subVectors(_otherTorso, _camPos);
      const tUpper = _toOther.dot(_rayDir);
      if (tUpper > 0.15 && tUpper < distToHead - 0.14) {
        _closest.copy(_camPos).addScaledVector(_rayDir, tUpper);
        const torsoR = other.radius * 0.98;
        if (_closest.distanceToSquared(_otherTorso) < torsoR * torsoR) {
          occluded = true;
          break;
        }
      }

      // Test other's mid-torso sphere (aligns closely with PhotoEvaluator's torso capsule)
      _otherTorso.set(
        other.position.x,
        other.position.y + other.height * 0.42 * other.squashY,
        other.position.z,
      );
      _toOther.subVectors(_otherTorso, _camPos);
      const tMid = _toOther.dot(_rayDir);
      if (tMid > 0.15 && tMid < distToHead - 0.14) {
        _closest.copy(_camPos).addScaledVector(_rayDir, tMid);
        const torsoR = other.radius * 0.96;
        if (_closest.distanceToSquared(_otherTorso) < torsoR * torsoR) {
          occluded = true;
          break;
        }
      }
    }

    npc.isOccludedFromCamera = occluded;
    const prevOcc = occludedTimerMap.get(npc) ?? 0;
    const airborne = npc.position.y > npc.groundY + 0.06;
    const decayRate = airborne ? 0.45 : 2.2;
    occludedTimerMap.set(npc, occluded ? prevOcc + dt : Math.max(0, prevOcc - dt * decayRate));
  }
}

function isInFrame(npc: NpcRuntimeState): boolean {
  return (
    npc.screenNdc.z >= -1 &&
    npc.screenNdc.z <= 1 &&
    Math.abs(npc.screenNdc.x) <= 0.98 &&
    Math.abs(npc.screenNdc.y) <= 0.98
  );
}

function updateHeadAndBodyOrientation(
  npc: NpcRuntimeState,
  dt: number,
  lookTargetX: number,
  lookTargetY: number,
  lookTargetZ: number,
  yawBias = 0,
  pitchBias = 0,
  faceMoveDirection = false,
): void {
  const horizSpeed = Math.hypot(npc.velocity.x, npc.velocity.z);
  const camYaw = Math.atan2(_camPos.x - npc.position.x, _camPos.z - npc.position.z);

  let desiredBodyYaw = camYaw;
  if (faceMoveDirection && horizSpeed > 0.45) {
    const moveYaw = Math.atan2(npc.velocity.x, npc.velocity.z);
    // Blend body toward movement while still staying readable to camera
    desiredBodyYaw = lerpAngle(camYaw, moveYaw, 0.72);
  }

  const bodyRate = npc.action === 'shoving' || npc.action === 'helping' ? 9.5 : 5.5;
  npc.facingYaw = lerpAngle(npc.facingYaw, desiredBodyYaw, 1 - Math.exp(-bodyRate * dt));

  const dx = lookTargetX - npc.headWorldPos.x;
  const dy = lookTargetY - npc.headWorldPos.y;
  const dz = lookTargetZ - npc.headWorldPos.z;
  const hDist = Math.max(0.25, Math.hypot(dx, dz));
  const targetHeadWorldYaw = Math.atan2(dx, dz);

  const desiredHeadYaw = clamp(wrapAngle(targetHeadWorldYaw - npc.facingYaw) + yawBias, -0.95, 0.95);
  const desiredHeadPitch = clamp(Math.atan2(dy, hDist) + pitchBias, -0.4, 0.52);

  const headRate = npc.cheeseBuffTimer > 0 ? 13.0 : 6.8;
  const headAlpha = 1 - Math.exp(-headRate * dt);
  npc.headYawOffset += (desiredHeadYaw - npc.headYawOffset) * headAlpha;
  npc.headPitchOffset += (desiredHeadPitch - npc.headPitchOffset) * headAlpha;

  // Procedural locomotion phase
  if (horizSpeed > 0.15 && npc.action !== 'jumping' && npc.action !== 'riding_shoulders') {
    npc.walkPhase += horizSpeed * dt * 6.4;
  } else {
    npc.walkPhase += dt * (npc.action === 'tiptoe' ? 5.2 : 1.9);
  }
}

function updateBodyLean(npc: NpcRuntimeState, dt: number): void {
  let targetTiltX = 0;
  let targetTiltZ = 0;

  if (npc.action === 'fallen') {
    let sign = fallRollSignMap.get(npc);
    if (!sign) {
      sign = npc.tiltZ >= 0 ? 1 : -1;
      fallRollSignMap.set(npc, sign);
    }
    targetTiltX = 0.22;
    targetTiltZ = sign * 1.32;
  } else {
    fallRollSignMap.delete(npc);
    if (npc.sneezeCharge > 0) {
      // Comedic dramatic inhale tilt-back & tremble right before ACHOO!!
      targetTiltX = -0.32 * npc.sneezeCharge;
      targetTiltZ = Math.sin(npc.walkPhase * 20) * 0.1 * npc.sneezeCharge;
    } else if (npc.action === 'staggering') {
      targetTiltX = Math.sin(npc.walkPhase * 2.2) * 0.28;
      targetTiltZ = Math.cos(npc.walkPhase * 2.5) * 0.34;
    } else if (npc.action === 'shoving') {
      targetTiltX = 0.22 + npc.lensBombProgress * 0.14;
      targetTiltZ = Math.sin(npc.walkPhase * 1.4) * 0.09;
    } else if (npc.action === 'helping') {
      targetTiltX = 0.26;
      targetTiltZ = Math.sin(npc.walkPhase * 1.2) * 0.06;
    } else if (npc.action === 'hiding') {
      targetTiltX = 0.16;
      targetTiltZ = npc.screenNdc.x >= 0 ? -0.14 : 0.14;
    } else if (npc.action === 'jump_charge') {
      targetTiltX = 0.18;
    } else if (npc.action === 'carrying_rider') {
      targetTiltZ = Math.sin(npc.walkPhase * 1.1) * 0.07;
    } else if (npc.action === 'getting_up') {
      const progress = clamp(1 - npc.actionTimer / 0.75, 0, 1);
      targetTiltX = (1 - progress) * 0.55;
      targetTiltZ = (1 - progress) * 0.45;
    }

    const dizzyRemaining = dizzyShakeTimerMap.get(npc) ?? 0;
    if (dizzyRemaining > 0 && npc.sneezeCharge <= 0) {
      const wobbleAmp = Math.min(1, dizzyRemaining / 0.45);
      targetTiltX += Math.sin(npc.walkPhase * 5.2 + npc.position.x) * 0.2 * wobbleAmp;
      targetTiltZ += Math.cos(npc.walkPhase * 5.8 + npc.position.z) * 0.28 * wobbleAmp;
    }
  }

  const rate = npc.action === 'fallen' ? 9.0 : 7.5;
  const alpha = 1 - Math.exp(-rate * dt);
  npc.tiltX += (targetTiltX - npc.tiltX) * alpha;
  npc.tiltZ += (targetTiltZ - npc.tiltZ) * alpha;
}

export function updateNpcBehaviors(
  npcs: NpcRuntimeState[],
  stage: StageSpec,
  camera: THREE.PerspectiveCamera,
  cameraAngularSpeed: number,
  dt: number,
  rng: () => number,
  events: SimEvent[],
): void {
  if (!Number.isFinite(dt) || dt <= 0) return;
  const safeDt = Math.min(dt, BEHAVIOR_CONFIG.maxDt);

  updatePerception(npcs, camera, safeDt);
  const frontFocus = computeCameraVisualFrontPoint(stage);
  const camElevation = clamp(-_camForward.y, -0.5, 1.0);

  const npcById = new Map<string, NpcRuntimeState>();
  for (const npc of npcs) {
    npcById.set(npc.spec.id, npc);
  }

  // === MEGA-SNEEZE SCHEDULER (blinker / grandpa) ===
  let sneezeSchedule = sneezeScheduleMap.get(npcs);
  if (!sneezeSchedule) {
    sneezeSchedule = {
      nextSneezeTimer:
        BEHAVIOR_CONFIG.sneezeFirstDelayMin +
        rng() * (BEHAVIOR_CONFIG.sneezeFirstDelayMax - BEHAVIOR_CONFIG.sneezeFirstDelayMin),
      activeSneezerId: null,
    };
    sneezeScheduleMap.set(npcs, sneezeSchedule);
  }

  if (sneezeSchedule.activeSneezerId !== null) {
    const active = npcById.get(sneezeSchedule.activeSneezerId);
    if (
      !active ||
      active.sneezeCharge <= 0 ||
      active.action === 'fallen' ||
      active.action === 'staggering' ||
      active.action === 'getting_up'
    ) {
      if (active && active.sneezeCharge > 0) {
        active.sneezeCharge = 0;
      }
      sneezeSchedule.activeSneezerId = null;
      sneezeSchedule.nextSneezeTimer =
        BEHAVIOR_CONFIG.sneezeRepeatDelayMin +
        rng() * (BEHAVIOR_CONFIG.sneezeRepeatDelayMax - BEHAVIOR_CONFIG.sneezeRepeatDelayMin);
    }
  } else {
    sneezeSchedule.nextSneezeTimer -= safeDt;
    if (sneezeSchedule.nextSneezeTimer <= 0) {
      const candidates: NpcRuntimeState[] = [];
      for (const candidate of npcs) {
        if (candidate.spec.archetype !== 'blinker') continue;
        if (
          candidate.action === 'fallen' ||
          candidate.action === 'staggering' ||
          candidate.action === 'getting_up' ||
          candidate.action === 'riding_shoulders'
        ) {
          continue;
        }
        if (candidate.cheeseBuffTimer > 0) continue;
        if ((sneezeHoldTimerMap.get(candidate) ?? 0) > 0) continue;
        candidates.push(candidate);
      }

      if (candidates.length === 0) {
        sneezeSchedule.nextSneezeTimer = 1.0;
      } else {
        // Favor grandpa_blinker when present so players see the iconic grandpa mega-sneeze!
        const grandpa = candidates.find((c) => c.spec.id.includes('grandpa'));
        const chosen =
          grandpa && (candidates.length === 1 || rng() < 0.65)
            ? grandpa
            : candidates[Math.floor(rng() * candidates.length)];

        chosen.sneezeCharge = 0.01;
        chosen.expression = 'sneeze';
        chosen.reactionIcon = '🤧';
        chosen.reactionTimer = 1.8;
        chosen.poseIntensity = 0.25;
        sneezeSchedule.activeSneezerId = chosen.spec.id;
        emitEvent(chosen, events, 'sneeze_charge', 0.95);
      }
    }
  }

  for (const npc of npcs) {
    // Decrement shared timers
    npc.reactionTimer = Math.max(0, npc.reactionTimer - safeDt);
    if (npc.reactionTimer <= 0) {
      npc.reactionIcon = '';
    }
    npc.cooldownTimer = Math.max(0, npc.cooldownTimer - safeDt);
    const prevHopCd = hopCooldownMap.get(npc) ?? 0;
    if (prevHopCd > 0) hopCooldownMap.set(npc, Math.max(0, prevHopCd - safeDt));

    const prevHenGao = henGaoTimerMap.get(npc) ?? 0;
    if (prevHenGao > 0) henGaoTimerMap.set(npc, Math.max(0, prevHenGao - safeDt));

    const prevSneezeHold = sneezeHoldTimerMap.get(npc) ?? 0;
    if (prevSneezeHold > 0) sneezeHoldTimerMap.set(npc, Math.max(0, prevSneezeHold - safeDt));

    const prevDizzy = dizzyShakeTimerMap.get(npc) ?? 0;
    if (prevDizzy > 0) dizzyShakeTimerMap.set(npc, Math.max(0, prevDizzy - safeDt));

    const prevSlipTimer = slipFallTimerMap.get(npc) ?? 0;
    if (prevSlipTimer > 0) slipFallTimerMap.set(npc, Math.max(0, prevSlipTimer - safeDt));

    const prevCheese = npc.cheeseBuffTimer;
    npc.cheeseBuffTimer = Math.max(0, npc.cheeseBuffTimer - safeDt);

    // Reset Say-Cheese cycle flags whenever buff has expired so 2nd/3rd callouts fire cleanly!
    if (npc.cheeseBuffTimer <= 0) {
      jumperCheeseTriggeredMap.set(npc, false);
      postCheeseSpikedMap.set(npc, false);
    }

    // Post-"Say Cheese!" chaos spike as the golden shutter window closes (< 0.45s remaining)
    if (
      prevCheese >= BEHAVIOR_CONFIG.cheesePostSpikeThreshold &&
      npc.cheeseBuffTimer < BEHAVIOR_CONFIG.cheesePostSpikeThreshold &&
      !postCheeseSpikedMap.get(npc)
    ) {
      postCheeseSpikedMap.set(npc, true);
      if (npc.spec.archetype === 'showoff' && npc.action !== 'fallen' && npc.action !== 'staggering') {
        npc.excitement = clamp(npc.excitement + 0.65, 0, 1);
        if (rng() < BEHAVIOR_CONFIG.henGaoChance) {
          henGaoTimerMap.set(npc, BEHAVIOR_CONFIG.henGaoDuration);
          npc.expression = 'hen_gao';
          npc.reactionIcon = '🤪';
          npc.reactionTimer = BEHAVIOR_CONFIG.henGaoDuration;
        } else {
          npc.reactionIcon = '💢';
          npc.reactionTimer = 0.7;
        }
      } else if (npc.spec.archetype === 'jumper' && npc.action !== 'fallen' && npc.action !== 'staggering') {
        npc.excitement = clamp(npc.excitement + 0.55, 0, 1);
        if (rng() < BEHAVIOR_CONFIG.henGaoChance) {
          henGaoTimerMap.set(npc, BEHAVIOR_CONFIG.henGaoDuration);
          npc.expression = 'hen_gao';
          npc.reactionIcon = '🤪';
          npc.reactionTimer = BEHAVIOR_CONFIG.henGaoDuration;
        }
      }
    }

    // === GLOBAL OVERRIDE STATES ===
    if (npc.action === 'fallen') {
      npc.actionTimer -= safeDt;
      npc.sneezeCharge = 0;
      const slipFlash = (slipFallTimerMap.get(npc) ?? 0) > 0;
      npc.expression = slipFlash ? 'surprised' : 'dizzy';
      npc.reactionIcon = slipFlash ? '!' : '💫';
      npc.reactionTimer = Math.max(npc.reactionTimer, 0.2);
      npc.poseIntensity = 0;
      if (npc.actionTimer <= 0) {
        npc.action = 'getting_up';
        npc.actionTimer = 0.75;
        npc.balance = 0.68;
        npc.expression = 'nervous';
        npc.reactionIcon = '💦';
        npc.reactionTimer = 0.7;
        emitEvent(npc, events, 'get_up', 0.7);
      }
      updateBodyLean(npc, safeDt);
      continue;
    }

    if (npc.action === 'getting_up') {
      npc.actionTimer -= safeDt;
      npc.lensBombProgress = Math.max(0, npc.lensBombProgress - safeDt * 1.2);
      npc.poseIntensity = 0;
      if (npc.actionTimer <= 0) {
        npc.action = 'idle';
        npc.balance = Math.max(npc.balance, 0.85);
        npc.expression = 'smile';
        npc.reactionIcon = '✨';
        npc.reactionTimer = 0.5;
      }
      updateHeadAndBodyOrientation(npc, safeDt, _camPos.x, _camPos.y, _camPos.z);
      updateBodyLean(npc, safeDt);
      continue;
    }

    if (npc.action === 'staggering') {
      npc.actionTimer -= safeDt;
      npc.sneezeCharge = 0;
      npc.lensBombProgress = Math.max(0, npc.lensBombProgress - safeDt * 0.9);
      npc.expression = 'surprised';
      npc.poseIntensity = 0;
      if (npc.actionTimer <= 0) {
        // Never orphan a rider when a carrier recovers from a light stagger!
        npc.action = npc.riderId !== null ? 'carrying_rider' : 'idle';
        npc.balance = Math.max(npc.balance, 0.58);
      }
      updateHeadAndBodyOrientation(npc, safeDt, _camPos.x, _camPos.y, _camPos.z);
      updateBodyLean(npc, safeDt);
      continue;
    }

    if (npc.action === 'jump_charge') {
      npc.actionTimer -= safeDt;
      npc.squashY += (0.76 - npc.squashY) * (1 - Math.exp(-14 * safeDt));
      npc.expression = 'smile';
      npc.reactionIcon = '★';
      npc.reactionTimer = Math.max(npc.reactionTimer, 0.2);
      npc.poseIntensity = 0.3;
      if (npc.actionTimer <= 0) {
        npc.action = 'jumping';
        npc.actionTimer = 0.35;
        npc.velocity.y = BEHAVIOR_CONFIG.jumperLaunchVy;
        npc.squashY = 1.24;
        npc.excitement = 0;
        npc.poseIntensity = 1.0;
        if (rng() < BEHAVIOR_CONFIG.henGaoChance) {
          henGaoTimerMap.set(npc, BEHAVIOR_CONFIG.henGaoDuration);
          npc.expression = 'hen_gao';
          npc.reactionIcon = '🤪';
          npc.reactionTimer = BEHAVIOR_CONFIG.henGaoDuration;
        } else {
          npc.expression = 'cheese';
          npc.reactionIcon = '✌';
          npc.reactionTimer = 0.95;
        }
        npc.cooldownTimer = BEHAVIOR_CONFIG.jumperCooldown;
        emitEvent(npc, events, 'jump', 1.0);
      }
      updateHeadAndBodyOrientation(npc, safeDt, _camPos.x, _camPos.y, _camPos.z);
      updateBodyLean(npc, safeDt);
      continue;
    }

    if (npc.action === 'jumping') {
      npc.actionTimer = Math.max(0, npc.actionTimer - safeDt);
      const jumpHenGao = (henGaoTimerMap.get(npc) ?? 0) > 0;
      npc.expression = jumpHenGao ? 'hen_gao' : 'cheese';
      npc.reactionIcon = jumpHenGao ? '🤪' : '✌';
      npc.reactionTimer = Math.max(npc.reactionTimer, 0.25);
      npc.poseIntensity = 1.0;
      // Fallback if grounded without impact trigger
      if (npc.position.y <= npc.groundY + 0.03 && npc.velocity.y <= 0 && npc.actionTimer <= 0) {
        npc.action = 'posing';
        npc.actionTimer = 0.55;
      }
      updateHeadAndBodyOrientation(npc, safeDt, _camPos.x, _camPos.y, _camPos.z);
      updateBodyLean(npc, safeDt);
      continue;
    }

    if (npc.action === 'riding_shoulders') {
      npc.actionTimer -= safeDt;
      const carrier = npc.carrierId ? npcById.get(npc.carrierId) : undefined;
      if (!carrier || carrier.action === 'fallen' || npc.actionTimer <= 0) {
        // Voluntary clean dismount
        if (carrier && carrier.riderId === npc.spec.id) {
          carrier.riderId = null;
          if (carrier.action === 'carrying_rider') carrier.action = 'idle';
        }
        npc.carrierId = null;
        npc.action = 'idle';
        npc.cooldownTimer = 4.6;
        const side = npc.spec.homePos.x >= 0 ? 1 : -1;
        npc.position.x += side * 0.45;
        npc.velocity.set(side * 0.9, 1.8, 0.3);
        npc.reactionIcon = '✨';
        npc.reactionTimer = 0.6;
      } else {
        npc.expression = 'cheese';
        npc.reactionIcon = '✌';
        npc.reactionTimer = Math.max(npc.reactionTimer, 0.25);
        npc.poseIntensity = 1.0;
        updateHeadAndBodyOrientation(npc, safeDt, _camPos.x, _camPos.y, _camPos.z);
        updateBodyLean(npc, safeDt);
        continue;
      }
    }

    if (npc.action === 'carrying_rider') {
      const rider = npc.riderId ? npcById.get(npc.riderId) : undefined;
      if (!rider || rider.carrierId !== npc.spec.id || rider.action !== 'riding_shoulders') {
        npc.riderId = null;
        npc.action = 'idle';
      } else {
        // Stay steady near homePos while proudly carrying the peeker
        const distHome = Math.hypot(npc.spec.homePos.x - npc.position.x, npc.spec.homePos.z - npc.position.z);
        if (distHome > 0.3) {
          steerToward(npc, npc.spec.homePos.x, npc.spec.homePos.z, 0.85, safeDt, 0.15);
        }
        npc.expression = npc.cheeseBuffTimer > 0 ? 'cheese' : 'smile';
        npc.poseIntensity = 0.5;
        updateHeadAndBodyOrientation(npc, safeDt, _camPos.x, _camPos.y, _camPos.z);
        updateBodyLean(npc, safeDt);
        continue;
      }
    }

    // === MEGA-SNEEZE CHARGE & SHOCKWAVE OVERRIDE ===
    if (npc.sneezeCharge > 0) {
      // Calling "はい、チーズ！" interrupts an incoming sneeze early!
      if (npc.cheeseBuffTimer > 0) {
        npc.sneezeCharge = 0;
        npc.reactionIcon = '!';
        npc.reactionTimer = Math.max(npc.reactionTimer, 0.9);
      } else {
        npc.sneezeCharge = clamp(
          npc.sneezeCharge + safeDt / BEHAVIOR_CONFIG.sneezeChargeDuration,
          0,
          1,
        );
        npc.action = 'idle';
        npc.expression = 'sneeze';
        npc.reactionIcon = '🤧';
        npc.reactionTimer = Math.max(npc.reactionTimer, 0.35);
        npc.poseIntensity = 0.25;
        npc.squashY = clamp(
          1.0 + 0.13 * npc.sneezeCharge + Math.sin(npc.walkPhase * 16) * 0.035,
          0.85,
          1.22,
        );

        if (npc.sneezeCharge >= 1.0) {
          // ACHOO!! MEGA-SNEEZE SHOCKWAVE BLAST!
          npc.sneezeCharge = 0;
          sneezeHoldTimerMap.set(npc, BEHAVIOR_CONFIG.sneezePostHoldDuration);
          npc.expression = 'sneeze';
          npc.reactionIcon = '🤧';
          npc.reactionTimer = 1.05;
          npc.squashY = 0.74;
          npc.tiltX = 0.58;
          npc.velocity.z -= 1.35;
          triggerHatPop(npc, events, 5.2, true);
          emitEvent(npc, events, 'sneeze_blast', 1.65);

          const blastR = BEHAVIOR_CONFIG.sneezeBlastRadius;
          for (const other of npcs) {
            if (other === npc) continue;
            if (other.action === 'riding_shoulders') continue;
            const dx = other.position.x - npc.position.x;
            const dz = other.position.z - npc.position.z;
            const dist = Math.hypot(dx, dz);
            if (dist > blastR) continue;

            const dirX = dist > 1e-4 ? dx / dist : 0;
            const dirZ = dist > 1e-4 ? dz / dist : -1;
            let bx = dirX * 0.78;
            let bz = dirZ * 0.78 - 0.35;
            const bLen = Math.hypot(bx, bz);
            if (bLen > 1e-4) {
              bx /= bLen;
              bz /= bLen;
            } else {
              bx = dirX;
              bz = dirZ;
            }

            const falloff = clamp(1 - dist / blastR, 0.25, 1.0);
            const blastVel = BEHAVIOR_CONFIG.sneezeBlastSpeed * (0.68 + 0.32 * falloff);
            other.velocity.x += bx * blastVel;
            other.velocity.z += bz * blastVel;
            other.velocity.y = Math.max(other.velocity.y, 1.65 + 0.9 * falloff);

            const balanceDrop = 0.55 + 0.4 * falloff;
            applyExternalBalanceHit(other, balanceDrop, bx, bz, npcById, events, false);
            triggerHatPop(other, events, 5.0 + falloff * 1.4, true);
          }

          sneezeSchedule.activeSneezerId = null;
          sneezeSchedule.nextSneezeTimer =
            BEHAVIOR_CONFIG.sneezeRepeatDelayMin +
            rng() * (BEHAVIOR_CONFIG.sneezeRepeatDelayMax - BEHAVIOR_CONFIG.sneezeRepeatDelayMin);
        }

        updateHeadAndBodyOrientation(
          npc,
          safeDt,
          _camPos.x,
          _camPos.y,
          _camPos.z,
          0,
          0.34 * npc.sneezeCharge,
        );
        updateBodyLean(npc, safeDt);
        continue;
      }
    }

    // === ARCHETYPE BEHAVIORS ===
    let lookX = _camPos.x;
    let lookY = _camPos.y;
    let lookZ = _camPos.z;
    let headYawBias = 0;
    let headPitchBias = 0;
    let faceMove = false;
    const framed = isInFrame(npc);

    switch (npc.spec.archetype) {
      case 'vip': {
        const distHome = Math.hypot(
          npc.spec.homePos.x - npc.position.x,
          npc.spec.homePos.z - npc.position.z,
        );
        if (distHome > 0.22) {
          npc.action = 'moving';
          steerToward(npc, npc.spec.homePos.x, npc.spec.homePos.z, 1.48, safeDt, 0.14);
          if (distHome > 0.72) {
            npc.expression = 'surprised';
            npc.reactionIcon = '💦';
            npc.reactionTimer = Math.max(npc.reactionTimer, 0.55);
            npc.poseIntensity = 0.15;
          } else {
            npc.expression = 'smile';
            npc.poseIntensity = 0.45;
          }
        } else {
          npc.action = npc.cameraAttention > 0.35 || npc.cheeseBuffTimer > 0 ? 'posing' : 'idle';
          npc.expression =
            npc.cheeseBuffTimer > 0 || npc.cameraAttention > 0.65
              ? 'cheese'
              : framed
                ? 'smile'
                : 'neutral';
          npc.poseIntensity = npc.cheeseBuffTimer > 0 ? 0.95 : framed ? 0.78 : 0.2;
        }
        break;
      }

      case 'showoff': {
        let buildup = showoffBuildupMap.get(npc) ?? 0;

        // SKILLFUL BAKAGE COUNTERPLAY: Whipping/shaking camera sideways while showoff is rushing the lens
        // makes them lose footing, pop their hat, and slide face-first into a wipeout!
        if (
          npc.lensBombProgress > BEHAVIOR_CONFIG.showoffSlipMinProgress &&
          cameraAngularSpeed > BEHAVIOR_CONFIG.showoffSlipAngularSpeed
        ) {
          const slideSide =
            Math.abs(npc.velocity.x) > 0.15
              ? Math.sign(npc.velocity.x)
              : npc.spec.homePos.x >= 0
                ? 1
                : -1;
          npc.action = 'fallen';
          npc.actionTimer = 2.65;
          slipFallTimerMap.set(npc, 0.48);
          npc.balance = 0;
          npc.lensBombProgress = 0;
          lensBombEmittedMap.set(npc, false);
          henGaoRolledMap.set(npc, false);
          showoffBuildupMap.set(npc, 0);
          npc.excitement = 0.15;
          npc.expression = 'surprised';
          npc.reactionIcon = '!';
          npc.reactionTimer = 1.6;
          npc.poseIntensity = 0;
          npc.tiltX = 0.92;
          npc.squashY = 0.82;
          npc.velocity.x = npc.velocity.x * 0.75 + slideSide * 1.45;
          npc.velocity.z = Math.max(npc.velocity.z * 0.85, 2.35);
          npc.velocity.y = Math.max(npc.velocity.y, 1.55);
          triggerHatPop(npc, events, 5.4, true);
          emitEvent(npc, events, 'slip', 1.3);
          break;
        }

        // Tactical Say Cheese: only pauses a showoff who was already calmed/lured away,
        // NOT one actively surging in front of the lens!
        if (
          npc.cheeseBuffTimer > 0.9 &&
          npc.action !== 'shoving' &&
          npc.excitement <= 0.65 &&
          npc.lensBombProgress < 0.3
        ) {
          npc.action = 'posing';
          npc.expression = 'cheese';
          npc.poseIntensity = 1.0;
          break;
        }

        const directSpotlight = npc.cameraAttention > BEHAVIOR_CONFIG.showoffChargeAttention;
        const spotlightOn = directSpotlight || npc.excitement > 0.78;

        if (directSpotlight) {
          const prevLens = npc.lensBombProgress;
          npc.lensBombProgress = clamp(
            npc.lensBombProgress + BEHAVIOR_CONFIG.showoffLensBombRate * safeDt,
            0,
            1,
          );

          // Roll surprise Hen-Gao when getting super hyped near the lens (> 0.55)
          if (npc.lensBombProgress > 0.55 && !henGaoRolledMap.get(npc)) {
            henGaoRolledMap.set(npc, true);
            if (rng() < BEHAVIOR_CONFIG.henGaoChance) {
              henGaoTimerMap.set(npc, BEHAVIOR_CONFIG.henGaoDuration);
            }
          }

          // Emit 'lens_bomb' when crossing 0.7!
          if (prevLens < 0.7 && npc.lensBombProgress >= 0.7 && !lensBombEmittedMap.get(npc)) {
            lensBombEmittedMap.set(npc, true);
            emitEvent(npc, events, 'lens_bomb', 1.3);
          }
        } else {
          npc.lensBombProgress = clamp(
            npc.lensBombProgress - BEHAVIOR_CONFIG.showoffLensBombDecay * safeDt,
            0,
            1,
          );
          if (npc.lensBombProgress < 0.3) {
            lensBombEmittedMap.set(npc, false);
            henGaoRolledMap.set(npc, false);
          }
        }

        if (spotlightOn) {
          npc.excitement = clamp(npc.excitement + 0.48 * safeDt, 0, 1);
          buildup = Math.min(BEHAVIOR_CONFIG.showoffTelegraphDuration, buildup + safeDt);
          showoffBuildupMap.set(npc, buildup);

          // Advance charge target ALL THE WAY forward to stageBounds.maxZ + 0.85 right near the lens!
          const bombBlend = smoothstep(0.12, 0.82, npc.lensBombProgress);
          const maxBombZ = stage.stageBounds.maxZ + BEHAVIOR_CONFIG.showoffLensBombMaxZOffset;
          const desiredZ = frontFocus.z + (maxBombZ - frontFocus.z) * bombBlend;
          computeLensBombTarget(stage, desiredZ, _lensBombFocus);

          const distFocus = Math.hypot(
            _lensBombFocus.x - npc.position.x,
            _lensBombFocus.z - npc.position.z,
          );

          // Clear telegraph (★ -> 💢) before charging so players can read & lure/whiff-slip!
          if (
            buildup < BEHAVIOR_CONFIG.showoffTelegraphDuration &&
            npc.action !== 'shoving' &&
            npc.lensBombProgress < 0.25 &&
            distFocus > 0.45
          ) {
            npc.action = 'posing';
            npc.expression = 'smug';
            npc.reactionIcon = buildup < 0.45 ? '★' : '💢';
            npc.reactionTimer = Math.max(npc.reactionTimer, 0.3);
            npc.poseIntensity = 0.75;
          } else if (distFocus > 0.38) {
            npc.action = 'shoving';
            const chargeSpeed =
              npc.lensBombProgress > 0.3
                ? BEHAVIOR_CONFIG.showoffLensBombChargeSpeed
                : BEHAVIOR_CONFIG.showoffChargeSpeed;
            steerToward(
              npc,
              _lensBombFocus.x,
              _lensBombFocus.z,
              chargeSpeed,
              safeDt,
              0.18,
            );
            faceMove = true;
            npc.expression = 'smug';
            npc.reactionIcon = npc.lensBombProgress >= 0.7 ? '✌' : '💢';
            npc.reactionTimer = Math.max(npc.reactionTimer, 0.35);
            npc.poseIntensity = npc.lensBombProgress >= 0.55 ? 0.9 : 0.4;
          } else {
            const wasShoving = npc.action === 'shoving';
            npc.action = 'posing';
            npc.expression = 'smug';
            npc.reactionIcon = npc.lensBombProgress >= 0.5 ? '✌' : '★';
            npc.reactionTimer = Math.max(npc.reactionTimer, 0.45);
            npc.poseIntensity = 1.0;
            if (wasShoving && npc.cooldownTimer <= 0) {
              npc.cooldownTimer = 1.4;
              emitEvent(npc, events, 'pose', 0.85);
            }
          }
        } else if (npc.cameraAttention < BEHAVIOR_CONFIG.showoffLoseSpotlightAttention) {
          // Counterplay! Lost the spotlight -> confused '?' and drifts back toward home/side
          const wasActive = npc.action === 'shoving' || npc.action === 'posing';
          buildup = Math.max(0, buildup - safeDt * 1.4);
          showoffBuildupMap.set(npc, buildup);
          npc.excitement = clamp(npc.excitement - 0.55 * safeDt, 0, 1);
          if (wasActive) {
            npc.reactionIcon = '?';
            npc.reactionTimer = 0.85;
          }
          const driftTargetX = npc.spec.homePos.x * 0.85 + frontFocus.x * 0.15;
          const driftTargetZ = npc.spec.homePos.z;
          const distDrift = steerToward(
            npc,
            driftTargetX,
            driftTargetZ,
            BEHAVIOR_CONFIG.showoffDriftSpeed,
            safeDt,
            0.22,
          );
          npc.action = distDrift > 0.26 ? 'moving' : 'idle';
          npc.expression = 'neutral';
          npc.poseIntensity = 0.15;
        } else {
          // Middle zone (0.28..0.44): strutting anticipation
          buildup = Math.max(0, buildup - safeDt * 0.5);
          showoffBuildupMap.set(npc, buildup);
          npc.excitement = clamp(npc.excitement + 0.08 * safeDt, 0, 1);
          npc.action = 'idle';
          npc.expression = 'smug';
          npc.poseIntensity = 0.5;
        }
        break;
      }

      case 'shy': {
        const highCamRelief =
          camElevation > BEHAVIOR_CONFIG.shyHighElevationThreshold
            ? BEHAVIOR_CONFIG.shyHighCameraRelief
            : 0;
        const shyPressure = npc.cameraAttention - highCamRelief;
        const braveFromCheese =
          npc.cheeseBuffTimer > 0.45 &&
          npc.cameraAttention < BEHAVIOR_CONFIG.shyCheeseCalmAttentionMax;

        if (shyPressure > BEHAVIOR_CONFIG.shyHideAttention && !braveFromCheese) {
          // Directly stared at -> duck behind nearest taller neighbor!
          npc.action = 'hiding';
          npc.expression = 'nervous';
          npc.reactionIcon = '💦';
          npc.reactionTimer = Math.max(npc.reactionTimer, 0.4);
          npc.poseIntensity = 0;

          let cover: NpcRuntimeState | null = null;
          let bestDistSq = 2.9 * 2.9;
          for (const other of npcs) {
            if (other === npc) continue;
            if (other.action === 'fallen' || other.action === 'riding_shoulders') continue;
            if (other.height < npc.height * 0.94) continue;
            const dSq =
              (other.position.x - npc.position.x) ** 2 +
              (other.position.z - npc.position.z) ** 2;
            if (dSq < bestDistSq) {
              bestDistSq = dSq;
              cover = other;
            }
          }

          if (cover) {
            // Compute point behind cover along ray away from camera
            let awayX = cover.position.x - _camPos.x;
            let awayZ = cover.position.z - _camPos.z;
            const len = Math.hypot(awayX, awayZ);
            if (len > 1e-4) {
              awayX /= len;
              awayZ /= len;
            } else {
              awayX = 0;
              awayZ = -1;
            }
            const hideDist = cover.radius + npc.radius + 0.22;
            const hideX = clamp(
              cover.position.x + awayX * hideDist,
              stage.stageBounds.minX + 0.45,
              stage.stageBounds.maxX - 0.45,
            );
            const hideZ = clamp(
              cover.position.z + awayZ * hideDist,
              stage.stageBounds.minZ + 0.45,
              stage.stageBounds.maxZ - 0.45,
            );
            steerToward(npc, hideX, hideZ, BEHAVIOR_CONFIG.shyHideSpeed, safeDt, 0.14);
          } else {
            // Sidestep away from lens center if no tall neighbor nearby
            const evadeSign = npc.screenNdc.x >= 0 ? 1 : -1;
            steerToward(
              npc,
              npc.position.x + _camRight.x * evadeSign * 0.9,
              npc.position.z + _camRight.z * evadeSign * 0.9 - 0.35,
              BEHAVIOR_CONFIG.shyHideSpeed,
              safeDt,
              0.12,
            );
          }
          // Shyly avert eyes
          headYawBias = npc.screenNdc.x >= 0 ? 0.52 : -0.52;
          headPitchBias = -0.2;
        } else if (shyPressure < BEHAVIOR_CONFIG.shyRelaxAttention || braveFromCheese) {
          // Counterplay! Off-center framing, high camera angle, or Say Cheese -> relaxes & beams!
          const wasHiding = npc.action === 'hiding';
          if (wasHiding) {
            npc.reactionIcon = '✨';
            npc.reactionTimer = 0.95;
            if (npc.cooldownTimer <= 0) {
              npc.cooldownTimer = 1.1;
              emitEvent(npc, events, 'peek_pop', 0.75);
            }
          }
          const distHome = steerToward(
            npc,
            npc.spec.homePos.x,
            npc.spec.homePos.z,
            BEHAVIOR_CONFIG.shyPeekSpeed,
            safeDt,
            0.18,
          );
          npc.action = distHome > 0.22 || wasHiding ? 'peeking' : 'posing';
          npc.expression = braveFromCheese ? 'cheese' : 'smile';
          npc.poseIntensity = braveFromCheese ? 0.85 : 0.65;
        } else {
          // Warning zone (0.35..0.50): nervous telegraph before hiding
          npc.action = 'idle';
          npc.expression = 'nervous';
          npc.poseIntensity = 0.1;
        }
        break;
      }

      case 'peeker': {
        const occludedTime = occludedTimerMap.get(npc) ?? 0;

        if (occludedTime > BEHAVIOR_CONFIG.peekerOccludedPanicTime) {
          npc.expression = 'surprised';
          npc.reactionIcon = '💦';
          npc.reactionTimer = Math.max(npc.reactionTimer, 0.35);

          // Check for shoulder-ride carrier within 1.45m (and seek tall carriers within 2.3m!)
          let bestCarrier: NpcRuntimeState | null = null;
          let bestScore = Infinity;
          let nearbyCarrier: NpcRuntimeState | null = null;
          let nearbyDist: number = BEHAVIOR_CONFIG.peekerCarrierSeekRange;

          for (const other of npcs) {
            if (other === npc) continue;
            if (other.spec.appearance.heightScale < BEHAVIOR_CONFIG.peekerCarrierMinHeightScale) {
              continue;
            }
            if (other.riderId !== null || other.carrierId !== null) continue;
            if (
              other.action === 'fallen' ||
              other.action === 'staggering' ||
              other.action === 'getting_up' ||
              other.action === 'jumping' ||
              other.action === 'shoving' ||
              other.action === 'jump_charge'
            ) {
              continue;
            }
            // Keep wedding dress / bride clear of kids climbing on veil
            if (other.spec.appearance.outfitStyle === 'wedding_dress') continue;

            const d = Math.hypot(
              other.position.x - npc.position.x,
              other.position.z - npc.position.z,
            );
            if (d < nearbyDist) {
              nearbyDist = d;
              nearbyCarrier = other;
            }
            if (d <= BEHAVIOR_CONFIG.peekerMountRange) {
              // Strongly prefer non-VIP tall neighbors
              const score = d + (other.spec.isVip ? 0.55 : 0);
              if (score < bestScore) {
                bestScore = score;
                bestCarrier = other;
              }
            }
          }

          if (
            bestCarrier &&
            occludedTime > BEHAVIOR_CONFIG.peekerMountOccludedTime &&
            npc.cooldownTimer <= 0
          ) {
            // Hop onto shoulders! (npc.cooldownTimer is dedicated strictly to dismount cooldown)
            npc.carrierId = bestCarrier.spec.id;
            bestCarrier.riderId = npc.spec.id;
            npc.action = 'riding_shoulders';
            npc.actionTimer = BEHAVIOR_CONFIG.peekerRideDuration;
            bestCarrier.action = 'carrying_rider';
            npc.expression = 'cheese';
            npc.reactionIcon = '✌';
            npc.reactionTimer = 1.25;
            npc.poseIntensity = 1.0;
            npc.squashY = 1.15;
            emitEvent(npc, events, 'shoulder_mount', 1.0);
            break;
          }

          // Otherwise: tiptoe & hop laterally to find a sightline gap (or seek a tall carrier within 2.3m)
          npc.action = 'tiptoe';
          npc.squashY += (1.1 - npc.squashY) * (1 - Math.exp(-10 * safeDt));
          npc.poseIntensity = 0.45;

          if (
            nearbyCarrier &&
            occludedTime > BEHAVIOR_CONFIG.peekerSeekOccludedTime &&
            npc.cooldownTimer <= 0
          ) {
            steerToward(
              npc,
              nearbyCarrier.position.x,
              nearbyCarrier.position.z,
              BEHAVIOR_CONFIG.peekerTiptoeSpeed,
              safeDt,
              0.2,
            );
          } else {
            // Lateral hop perpendicular to camera view
            const sideSign = npc.position.x <= npc.spec.homePos.x ? 1 : -1;
            const gapX = clamp(
              npc.position.x + _camRight.x * sideSign * 0.85,
              stage.stageBounds.minX + 0.5,
              stage.stageBounds.maxX - 0.5,
            );
            const gapZ = clamp(
              npc.position.z + _camRight.z * sideSign * 0.85,
              stage.stageBounds.minZ + 0.5,
              stage.stageBounds.maxZ - 0.5,
            );
            steerToward(npc, gapX, gapZ, BEHAVIOR_CONFIG.peekerTiptoeSpeed, safeDt, 0.12);
          }

          // Energetic little peek-hop using dedicated hopCooldownMap so it NEVER blocks shoulder_mount!
          const hopCd = hopCooldownMap.get(npc) ?? 0;
          if (npc.position.y <= npc.groundY + 0.03 && hopCd <= 0) {
            npc.velocity.y = BEHAVIOR_CONFIG.peekerHopVy;
            hopCooldownMap.set(npc, 0.85);
            emitEvent(npc, events, 'peek_pop', 0.7);
          }
        } else {
          // Clear sightline! Pop into happy peeking pose
          if (npc.action === 'tiptoe') {
            npc.action = 'peeking';
            npc.actionTimer = 1.2;
            npc.reactionIcon = '✨';
            npc.reactionTimer = 0.85;
            emitEvent(npc, events, 'peek_pop', 0.8);
          } else if (npc.action === 'peeking') {
            npc.actionTimer = Math.max(0, npc.actionTimer - safeDt);
            if (npc.actionTimer <= 0) npc.action = 'idle';
          } else {
            // Gently stay near home without walking right back behind tall folks
            const distHome = Math.hypot(
              npc.spec.homePos.x - npc.position.x,
              npc.spec.homePos.z - npc.position.z,
            );
            if (distHome > 0.95) {
              npc.action = 'moving';
              steerToward(npc, npc.spec.homePos.x, npc.spec.homePos.z, 1.2, safeDt, 0.35);
            } else {
              npc.action = framed ? 'posing' : 'idle';
            }
          }
          npc.expression = npc.cheeseBuffTimer > 0 || npc.action === 'peeking' ? 'cheese' : 'smile';
          npc.poseIntensity = framed ? 0.78 : 0.25;
        }
        break;
      }

      case 'jumper': {
        const grounded = npc.position.y <= npc.groundY + 0.04;

        if (npc.action === 'posing') {
          npc.actionTimer -= safeDt;
          npc.expression = 'cheese';
          npc.poseIntensity = 1.0;
          if (npc.actionTimer <= 0) {
            npc.action = 'idle';
          }
          break;
        }

        if (framed && npc.cameraAttention > BEHAVIOR_CONFIG.jumperAttentionMin) {
          npc.excitement = clamp(
            npc.excitement + (0.21 + 0.3 * npc.cameraAttention) * safeDt,
            0,
            1,
          );
          if (npc.excitement > 0.68) {
            npc.reactionIcon = '★';
            npc.reactionTimer = Math.max(npc.reactionTimer, 0.25);
          }
        } else {
          npc.excitement = clamp(npc.excitement - 0.2 * safeDt, 0, 1);
        }

        const cheeseJumpReady =
          npc.cheeseBuffTimer > 0.6 &&
          npc.cheeseBuffTimer <= BEHAVIOR_CONFIG.jumperCheeseTriggerRemaining &&
          !jumperCheeseTriggeredMap.get(npc) &&
          framed;

        if (grounded && npc.cooldownTimer <= 0 && (npc.excitement >= 1.0 || cheeseJumpReady)) {
          if (cheeseJumpReady) jumperCheeseTriggeredMap.set(npc, true);
          npc.action = 'jump_charge';
          npc.actionTimer = BEHAVIOR_CONFIG.jumperChargeDuration;
          npc.reactionIcon = '★';
          npc.reactionTimer = 0.55;
          npc.expression = 'smile';
          npc.poseIntensity = 0.3;
          break;
        }

        const distHome = Math.hypot(
          npc.spec.homePos.x - npc.position.x,
          npc.spec.homePos.z - npc.position.z,
        );
        if (distHome > 0.36) {
          npc.action = 'moving';
          steerToward(npc, npc.spec.homePos.x, npc.spec.homePos.z, 1.42, safeDt, 0.18);
        } else {
          npc.action = 'idle';
        }
        npc.expression = npc.cheeseBuffTimer > 0 ? 'cheese' : framed ? 'smile' : 'neutral';
        npc.poseIntensity = npc.excitement > 0.6 ? 0.72 : 0.4;
        break;
      }

      case 'helper': {
        // Hold brief celebration pose after rescuing someone
        if (npc.action === 'posing' && npc.actionTimer > 0) {
          npc.actionTimer -= safeDt;
          npc.expression = 'smile';
          npc.poseIntensity = 0.85;
          if (npc.actionTimer <= 0) npc.action = 'idle';
          break;
        }

        // Look for nearest fallen NPC within 3.2m
        let fallenTarget: NpcRuntimeState | null = null;
        let bestDist: number = BEHAVIOR_CONFIG.helperDetectRadius;
        for (const other of npcs) {
          if (other === npc) continue;
          if (other.action !== 'fallen') continue;
          const d = Math.hypot(
            other.position.x - npc.position.x,
            other.position.z - npc.position.z,
          );
          if (d < bestDist) {
            bestDist = d;
            fallenTarget = other;
          }
        }

        if (fallenTarget) {
          npc.action = 'helping';
          npc.helpTargetId = fallenTarget.spec.id;
          npc.reactionIcon = '!';
          npc.reactionTimer = Math.max(npc.reactionTimer, 0.35);
          npc.expression = 'surprised';

          if (bestDist > BEHAVIOR_CONFIG.helperRescueDistance) {
            // Sprint eagerly when far, then smoothly brake inside 1.3m so clean rescues succeed
            // most of the time while reckless collisions into crowded/staggering messes still pileup!
            const brakeSpan =
              BEHAVIOR_CONFIG.helperBrakeDistance - BEHAVIOR_CONFIG.helperRescueDistance;
            const brakeT = clamp(
              (bestDist - BEHAVIOR_CONFIG.helperRescueDistance) / Math.max(0.05, brakeSpan),
              0,
              1,
            );
            const rushSpeed =
              BEHAVIOR_CONFIG.helperApproachSpeed +
              (BEHAVIOR_CONFIG.helperRushSpeed - BEHAVIOR_CONFIG.helperApproachSpeed) * brakeT;
            steerToward(
              npc,
              fallenTarget.position.x,
              fallenTarget.position.z,
              rushSpeed,
              safeDt,
              0.08,
            );
            faceMove = true;
            helpHoldTimerMap.set(npc, 0);
            lookX = fallenTarget.headWorldPos.x;
            lookY = fallenTarget.headWorldPos.y;
            lookZ = fallenTarget.headWorldPos.z;
          } else {
            // Stabilize next to the fallen person for 1.1s to lift them up!
            npc.velocity.x *= Math.exp(-7.5 * safeDt);
            npc.velocity.z *= Math.exp(-7.5 * safeDt);
            npc.poseIntensity = 0.55;
            lookX = fallenTarget.headWorldPos.x;
            lookY = fallenTarget.headWorldPos.y;
            lookZ = fallenTarget.headWorldPos.z;

            const holdTime = (helpHoldTimerMap.get(npc) ?? 0) + safeDt;
            helpHoldTimerMap.set(npc, holdTime);

            if (holdTime >= BEHAVIOR_CONFIG.helperStabilizeTime) {
              // Successful rescue!
              fallenTarget.action = 'getting_up';
              fallenTarget.actionTimer = 0.65;
              fallenTarget.balance = 0.82;
              fallenTarget.expression = 'smile';
              fallenTarget.reactionIcon = '❤';
              fallenTarget.reactionTimer = 1.2;
              emitEvent(fallenTarget, events, 'get_up', 1.0);

              npc.action = 'posing';
              npc.actionTimer = 0.75;
              npc.helpTargetId = null;
              npc.expression = 'smile';
              npc.reactionIcon = '❤';
              npc.reactionTimer = 1.2;
              npc.poseIntensity = 0.9;
              helpHoldTimerMap.set(npc, 0);
            }
          }
        } else {
          npc.helpTargetId = null;
          helpHoldTimerMap.set(npc, 0);
          const distHome = Math.hypot(
            npc.spec.homePos.x - npc.position.x,
            npc.spec.homePos.z - npc.position.z,
          );
          if (distHome > 0.28) {
            npc.action = 'moving';
            steerToward(npc, npc.spec.homePos.x, npc.spec.homePos.z, 1.38, safeDt, 0.16);
          } else {
            npc.action = framed ? 'posing' : 'idle';
          }
          npc.expression = npc.cheeseBuffTimer > 0 ? 'cheese' : framed ? 'smile' : 'neutral';
          npc.poseIntensity = framed ? 0.65 : 0.2;
        }
        break;
      }

      case 'blinker': {
        // Stay calmly near homePos
        const distHome = Math.hypot(
          npc.spec.homePos.x - npc.position.x,
          npc.spec.homePos.z - npc.position.z,
        );
        if (distHome > 0.3) {
          npc.action = 'moving';
          steerToward(npc, npc.spec.homePos.x, npc.spec.homePos.z, 1.15, safeDt, 0.18);
        } else {
          npc.action = 'idle';
        }

        // Counterplay #1: Rapid camera sweep startles them wide awake!
        if (
          cameraAngularSpeed > BEHAVIOR_CONFIG.blinkerSweepWakeSpeed &&
          framed &&
          npc.cooldownTimer <= 0
        ) {
          const wasDrowsy = npc.blinkTimer <= 0.3;
          npc.blinkTimer = 3.2 + rng() * 1.4;
          npc.cooldownTimer = 1.25;
          npc.reactionIcon = '!';
          npc.reactionTimer = 0.9;
          npc.expression = wasDrowsy ? 'surprised' : 'smile';
          npc.poseIntensity = 0.6;
          if (wasDrowsy) {
            emitEvent(npc, events, 'peek_pop', 0.65);
          }
        } else if (npc.cheeseBuffTimer > 0) {
          // Counterplay #2: "Say Cheese!" keeps eyes wide open and beaming
          npc.blinkTimer = Math.max(npc.blinkTimer, 1.9);
          npc.expression = 'cheese';
          npc.poseIntensity = 0.85;
        } else {
          // Visible daydream -> blink_warn (0.9s) -> blink (1.1s) cycle
          npc.blinkTimer -= safeDt;
          const warnEnd = -BEHAVIOR_CONFIG.blinkerWarnDuration;
          const blinkEnd = warnEnd - BEHAVIOR_CONFIG.blinkerClosedDuration;

          if (npc.blinkTimer > 0) {
            // Occasionally gaze off at a butterfly/neighbor while daydreaming
            if (npc.blinkTimer > 0.7 && npc.blinkTimer < 2.0) {
              const driftDir = npc.spec.homePos.x >= 0 ? 1 : -1;
              headYawBias = driftDir * 0.58;
              headPitchBias = 0.16;
              npc.expression = 'neutral';
              npc.poseIntensity = 0.15;
            } else {
              npc.expression = framed ? 'smile' : 'neutral';
              npc.poseIntensity = framed ? 0.5 : 0.15;
            }
          } else if (npc.blinkTimer > warnEnd) {
            // 0.9s clear telegraph right before closing eyes!
            npc.expression = 'blink_warn';
            npc.reactionIcon = '💤';
            npc.reactionTimer = Math.max(npc.reactionTimer, 0.25);
            npc.poseIntensity = 0.1;
            headPitchBias = -0.1;
          } else if (npc.blinkTimer > blinkEnd) {
            // 1.1s eyes closed!
            npc.expression = 'blink';
            npc.reactionIcon = '💤';
            npc.reactionTimer = Math.max(npc.reactionTimer, 0.25);
            npc.poseIntensity = 0.05;
            headPitchBias = -0.14;
          } else {
            // Wake back up for next cycle
            npc.blinkTimer = 2.6 + rng() * 1.7;
            npc.expression = 'smile';
            npc.poseIntensity = 0.45;
          }
        }
        break;
      }
    }

    // === GLOBAL "はい、チーズ！" BUFF OVERRIDE ===
    const shyOverwhelmed =
      npc.spec.archetype === 'shy' &&
      npc.cameraAttention >= BEHAVIOR_CONFIG.shyCheeseCalmAttentionMax;
    const holdingSneezeFace = (sneezeHoldTimerMap.get(npc) ?? 0) > 0;
    const activeHenGao = (henGaoTimerMap.get(npc) ?? 0) > 0;

    if (
      npc.cheeseBuffTimer > 0 &&
      !shyOverwhelmed &&
      npc.action !== 'fallen' &&
      npc.action !== 'shoving' &&
      npc.action !== 'helping' &&
      npc.action !== 'hiding'
    ) {
      lookX = _camPos.x;
      lookY = _camPos.y;
      lookZ = _camPos.z;
      headYawBias = 0;
      headPitchBias = 0;
      if (npc.expression !== 'surprised' && !holdingSneezeFace && !activeHenGao) {
        npc.expression = 'cheese';
      }
      npc.poseIntensity = Math.max(npc.poseIntensity, 0.85);
    }

    // === CAMERA-SHAKE DIZZINESS ===
    if (
      cameraAngularSpeed > BEHAVIOR_CONFIG.cameraShakeDizzySpeed &&
      npc.action !== 'fallen' &&
      npc.action !== 'shoving'
    ) {
      const curDizzy = dizzyShakeTimerMap.get(npc) ?? 0;
      dizzyShakeTimerMap.set(npc, clamp(Math.max(curDizzy, 0.55) + safeDt * 0.45, 0, 0.95));
      npc.balance = Math.max(0.46, npc.balance - 0.14 * safeDt);
    }

    // === COMEDY EXPRESSION OVERRIDES (sneeze hold > hen_gao > camera-shake dizzy) ===
    if (holdingSneezeFace) {
      npc.expression = 'sneeze';
      npc.reactionIcon = '🤧';
      npc.reactionTimer = Math.max(npc.reactionTimer, 0.25);
    } else if (activeHenGao && npc.action !== 'hiding' && npc.action !== 'fallen') {
      npc.expression = 'hen_gao';
      npc.reactionIcon = '🤪';
      npc.reactionTimer = Math.max(npc.reactionTimer, 0.25);
      npc.poseIntensity = Math.max(npc.poseIntensity, 0.95);
    } else if ((dizzyShakeTimerMap.get(npc) ?? 0) > 0 && npc.action !== 'hiding' && npc.action !== 'fallen') {
      npc.expression = 'dizzy';
      npc.reactionIcon = '💫';
      npc.reactionTimer = Math.max(npc.reactionTimer, 0.25);
      headYawBias += Math.sin(npc.walkPhase * 5.2 + npc.position.x) * 0.35;
    }

    updateHeadAndBodyOrientation(
      npc,
      safeDt,
      lookX,
      lookY,
      lookZ,
      headYawBias,
      headPitchBias,
      faceMove,
    );
    updateBodyLean(npc, safeDt);
  }
}
