import * as THREE from 'three';
import { NpcRuntimeState, SimEvent, SimEventType, StageSpec } from '../types';
import { getGroundHeightAt } from '../game/StageConfig';

export const PHYSICS_CONFIG = {
  maxDt: 0.05,
  gravity: -18.0,
  maxHorizSpeed: 6.2,
  damping: {
    grounded: 4.5,
    shoving: 2.6,
    helping: 2.8,
    staggering: 3.1,
    fallen: 7.4,
    air: 0.85,
  },
  maxStepUpHeight: 0.48,
  riserDropThreshold: 0.14,
  riserStumbleMinSpeed: 1.25,
  riserStumbleBalanceLoss: 0.42,
  staggerBalanceThreshold: 0.45,
  shoveHitCooldown: 0.24,
  baseRestitution: 0.42,
  shoveRestitution: 0.62,
  separationFactor: 0.78,
  carrierVulnerabilityMult: 1.48,
  vipSteadinessMult: 0.85,
  balanceRecoveryRate: 0.24,
  carrierBalanceRecoveryRate: 0.15,
  shoulderHeightRatio: 0.76,
  jumperLandingBumpRadius: 1.08,
  jumperLandingBumpSpeed: 1.15,
  helperTripSpeedThreshold: 1.85,
  boundsBounceDamping: 0.35,
} as const;

// Per-NPC transient hit cooldown (seconds) so contact pairs don't spam impulses every tick.
const hitCooldownMap = new WeakMap<NpcRuntimeState, number>();

function getHitCooldown(npc: NpcRuntimeState): number {
  return hitCooldownMap.get(npc) ?? 0;
}

function setHitCooldown(npc: NpcRuntimeState, value: number): void {
  hitCooldownMap.set(npc, Math.max(0, value));
}

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function safeFinite(v: number, fallback = 0): number {
  return Number.isFinite(v) ? v : fallback;
}

function emitEvent(
  npc: NpcRuntimeState,
  events: SimEvent[],
  type: SimEventType,
  intensity: number,
  pos?: THREE.Vector3,
): void {
  const evt: SimEvent = {
    type,
    npcId: npc.spec.id,
    position: (pos ?? npc.position).clone(),
    intensity: clamp(safeFinite(intensity, 0.5), 0.1, 2.0),
  };
  events.push(evt);
  npc.events.push(evt);
}

function dismountRider(
  carrier: NpcRuntimeState,
  npcById: Map<string, NpcRuntimeState>,
  events: SimEvent[],
  launchDirX: number,
  launchDirZ: number,
  dramatic: boolean,
): void {
  const riderId = carrier.riderId;
  carrier.riderId = null;
  if (!riderId) return;

  const rider = npcById.get(riderId);
  if (!rider) return;

  rider.carrierId = null;
  rider.cooldownTimer = Math.max(rider.cooldownTimer, 3.8);

  // Normalize launch direction safely (fallback to carrier facing direction)
  let lx = launchDirX;
  let lz = launchDirZ;
  const len = Math.hypot(lx, lz);
  if (len > 1e-4) {
    lx /= len;
    lz /= len;
  } else {
    lx = Math.sin(carrier.facingYaw);
    lz = Math.cos(carrier.facingYaw);
  }

  if (dramatic) {
    rider.action = 'staggering';
    rider.actionTimer = 1.05;
    rider.balance = Math.min(rider.balance, 0.32);
    rider.expression = 'surprised';
    rider.reactionIcon = '💫';
    rider.reactionTimer = 1.25;
    rider.poseIntensity = 0;
    rider.velocity.set(lx * 2.1, 2.75, lz * 2.1);
    rider.tiltX = lz * 0.45;
    rider.tiltZ = -lx * 0.45;
    rider.squashY = 1.16;
    emitEvent(rider, events, 'fall', 0.85);
  } else {
    rider.action = 'idle';
    rider.actionTimer = 0.2;
    rider.velocity.set(lx * 0.9, 1.8, lz * 0.9);
  }
}

function applyBalanceHit(
  target: NpcRuntimeState,
  balanceLoss: number,
  dirX: number,
  dirZ: number,
  npcById: Map<string, NpcRuntimeState>,
  events: SimEvent[],
  isPileupTrip = false,
): void {
  if (target.action === 'fallen' || target.action === 'riding_shoulders') {
    return;
  }

  let scaledLoss = balanceLoss;
  if (target.riderId !== null || target.action === 'carrying_rider') {
    scaledLoss *= PHYSICS_CONFIG.carrierVulnerabilityMult;
  }
  if (target.spec.archetype === 'vip') {
    scaledLoss *= PHYSICS_CONFIG.vipSteadinessMult;
  }

  target.balance = clamp(target.balance - scaledLoss, 0, 1);
  target.tiltX = clamp(target.tiltX + dirZ * 0.26, -0.7, 0.7);
  target.tiltZ = clamp(target.tiltZ - dirX * 0.26, -0.7, 0.7);
  target.squashY = Math.min(target.squashY, 0.86);

  if (target.balance <= 0 || isPileupTrip) {
    target.balance = 0;
    target.action = 'fallen';
    target.actionTimer = isPileupTrip ? 2.4 : 2.65;
    target.helpTargetId = null;
    target.expression = 'dizzy';
    target.reactionIcon = '💫';
    target.reactionTimer = 1.8;
    target.poseIntensity = 0;
    target.velocity.x += dirX * 1.15;
    target.velocity.z += dirZ * 1.15;
    target.velocity.y = Math.max(target.velocity.y, 1.35);

    emitEvent(target, events, isPileupTrip ? 'pileup' : 'fall', isPileupTrip ? 1.25 : 1.0);

    if (target.riderId !== null) {
      dismountRider(target, npcById, events, dirX, dirZ, true);
    }
  } else if (target.balance < PHYSICS_CONFIG.staggerBalanceThreshold) {
    target.action = 'staggering';
    target.actionTimer = Math.max(target.actionTimer, 0.85);
    target.helpTargetId = null;
    target.expression = 'surprised';
    target.reactionIcon = '💦';
    target.reactionTimer = Math.max(target.reactionTimer, 0.9);
    target.poseIntensity = 0;
    emitEvent(target, events, 'shove', clamp(scaledLoss * 1.3, 0.4, 1.2));

    // Hard stagger (< 0.30 balance) shakes the rider off with a comedic forward hop;
    // light stagger (>= 0.30) keeps them linked until recovery restores carrying_rider.
    if (target.riderId !== null && target.balance < 0.3) {
      dismountRider(target, npcById, events, dirX, dirZ, true);
    }
  } else {
    emitEvent(target, events, 'shove', clamp(scaledLoss * 1.1, 0.25, 0.8));
    if (target.spec.archetype === 'vip') {
      target.expression = 'surprised';
      target.reactionIcon = '💦';
      target.reactionTimer = Math.max(target.reactionTimer, 0.75);
    }
  }
}

function getEffectiveMass(npc: NpcRuntimeState): number {
  let m = npc.spec.appearance.widthScale * npc.spec.appearance.heightScale;
  if (npc.riderId !== null) m *= 1.22;
  if (npc.action === 'fallen') m *= 1.45;
  if (npc.action === 'shoving') m *= 1.15;
  return Math.max(0.65, m);
}

function triggerJumperLandingBump(
  jumper: NpcRuntimeState,
  npcs: NpcRuntimeState[],
  npcById: Map<string, NpcRuntimeState>,
  events: SimEvent[],
): void {
  const rMax = PHYSICS_CONFIG.jumperLandingBumpRadius;
  const rMaxSq = rMax * rMax;

  for (const other of npcs) {
    if (other === jumper) continue;
    if (other.action === 'riding_shoulders' || other.action === 'fallen') continue;
    if (Math.abs(other.position.y - jumper.position.y) > 0.5) continue;

    const dx = other.position.x - jumper.position.x;
    const dz = other.position.z - jumper.position.z;
    const distSq = dx * dx + dz * dz;
    if (distSq >= rMaxSq || distSq < 1e-6) continue;

    const dist = Math.sqrt(distSq);
    const nx = dx / dist;
    const nz = dz / dist;
    const falloff = 1 - dist / rMax;
    const push = PHYSICS_CONFIG.jumperLandingBumpSpeed * (0.45 + 0.55 * falloff);

    other.velocity.x += nx * push;
    other.velocity.z += nz * push;
    other.squashY = Math.min(other.squashY, 0.9);

    if (falloff > 0.35 && getHitCooldown(other) <= 0) {
      setHitCooldown(other, 0.28);
      applyBalanceHit(other, 0.14 * falloff + 0.08, nx, nz, npcById, events, false);
    }
  }
}

export function stepPhysics(
  npcs: NpcRuntimeState[],
  stage: StageSpec,
  dt: number,
  events: SimEvent[],
): void {
  if (!Number.isFinite(dt) || dt <= 0) return;
  const safeDt = Math.min(dt, PHYSICS_CONFIG.maxDt);

  const npcById = new Map<string, NpcRuntimeState>();
  for (const npc of npcs) {
    npcById.set(npc.spec.id, npc);
    const cd = getHitCooldown(npc);
    if (cd > 0) setHitCooldown(npc, cd - safeDt);
  }

  // Validate shoulder-ride consistency before integration
  for (const npc of npcs) {
    if (npc.carrierId !== null) {
      const carrier = npcById.get(npc.carrierId);
      if (!carrier || carrier.riderId !== npc.spec.id || carrier.action === 'fallen') {
        if (carrier && carrier.riderId === npc.spec.id) {
          dismountRider(carrier, npcById, events, Math.sin(carrier.facingYaw), Math.cos(carrier.facingYaw), true);
        } else {
          npc.carrierId = null;
          if (npc.action === 'riding_shoulders') {
            npc.action = 'idle';
          }
        }
      }
    }
  }

  // 1. Velocity integration, gravity, platform snapping & riser-edge stumble
  for (const npc of npcs) {
    if (npc.action === 'riding_shoulders' && npc.carrierId !== null) {
      continue;
    }

    const prevX = npc.position.x;
    const prevY = npc.position.y;
    const prevZ = npc.position.z;
    const prevGroundY = npc.groundY;
    const wasGrounded = prevY <= prevGroundY + 0.08;

    // Horizontal damping by action state
    let dampRate: number = PHYSICS_CONFIG.damping.grounded;
    if (!wasGrounded || npc.action === 'jumping') {
      dampRate = PHYSICS_CONFIG.damping.air;
    } else if (npc.action === 'fallen') {
      dampRate = PHYSICS_CONFIG.damping.fallen;
    } else if (npc.action === 'staggering') {
      dampRate = PHYSICS_CONFIG.damping.staggering;
    } else if (npc.action === 'shoving') {
      dampRate = PHYSICS_CONFIG.damping.shoving;
    } else if (npc.action === 'helping') {
      dampRate = PHYSICS_CONFIG.damping.helping;
    }

    const damp = Math.exp(-dampRate * safeDt);
    npc.velocity.x *= damp;
    npc.velocity.z *= damp;

    // Clamp horizontal speed
    const hSpeed = Math.hypot(npc.velocity.x, npc.velocity.z);
    if (hSpeed > PHYSICS_CONFIG.maxHorizSpeed) {
      const scale = PHYSICS_CONFIG.maxHorizSpeed / hSpeed;
      npc.velocity.x *= scale;
      npc.velocity.z *= scale;
    }

    // Integrate horizontal position
    const nextX = prevX + npc.velocity.x * safeDt;
    const nextZ = prevZ + npc.velocity.z * safeDt;
    let newGroundY = getGroundHeightAt(stage, nextX, nextZ);

    // Prevent fallen/staggering bodies from sliding UP onto a riser lip; bounce gently off riser wall
    if (
      wasGrounded &&
      newGroundY > prevGroundY + 0.08 &&
      (npc.action === 'fallen' || npc.action === 'staggering')
    ) {
      const testGroundX = getGroundHeightAt(stage, nextX, prevZ);
      const testGroundZ = getGroundHeightAt(stage, prevX, nextZ);
      if (testGroundX <= prevGroundY + 0.08) {
        npc.position.x = nextX;
        npc.velocity.z *= -0.3;
      } else if (testGroundZ <= prevGroundY + 0.08) {
        npc.position.z = nextZ;
        npc.velocity.x *= -0.3;
      } else {
        npc.velocity.x *= -0.3;
        npc.velocity.z *= -0.3;
      }
      newGroundY = getGroundHeightAt(stage, npc.position.x, npc.position.z);
    } else {
      npc.position.x = nextX;
      npc.position.z = nextZ;
    }

    // Gentle step-up vs riser-edge stumble
    if (wasGrounded && newGroundY > prevGroundY + 0.04 && newGroundY - prevGroundY <= PHYSICS_CONFIG.maxStepUpHeight) {
      // Smooth step-up onto riser/granite step
      npc.position.y = Math.max(npc.position.y, newGroundY);
      npc.groundY = newGroundY;
      npc.velocity.x *= 0.88;
      npc.velocity.z *= 0.88;
      npc.squashY = Math.min(npc.squashY, 0.93);
    } else if (
      wasGrounded &&
      newGroundY < prevGroundY - PHYSICS_CONFIG.riserDropThreshold &&
      npc.action !== 'jumping'
    ) {
      // Stepped or shoved off a riser/step edge!
      const edgeSpeed = Math.hypot(npc.velocity.x, npc.velocity.z);
      if (
        (edgeSpeed > PHYSICS_CONFIG.riserStumbleMinSpeed ||
          npc.action === 'staggering' ||
          npc.balance < 0.72) &&
        npc.action !== 'fallen'
      ) {
        const dirLen = edgeSpeed > 1e-4 ? edgeSpeed : 1;
        const dx = edgeSpeed > 1e-4 ? npc.velocity.x / dirLen : Math.sin(npc.facingYaw);
        const dz = edgeSpeed > 1e-4 ? npc.velocity.z / dirLen : Math.cos(npc.facingYaw);
        const extraLoss =
          PHYSICS_CONFIG.riserStumbleBalanceLoss + 0.14 * Math.min(edgeSpeed, 3.0);
        npc.velocity.y = Math.max(npc.velocity.y, 1.35);
        applyBalanceHit(npc, extraLoss, dx, dz, npcById, events, false);
      }
    }

    // Vertical gravity & landing
    if (npc.position.y > newGroundY + 0.004 || npc.velocity.y > 0) {
      npc.velocity.y += PHYSICS_CONFIG.gravity * safeDt;
      npc.position.y += npc.velocity.y * safeDt;
    }

    if (npc.position.y <= newGroundY) {
      const impactSpeed = -npc.velocity.y;
      npc.position.y = newGroundY;
      npc.groundY = newGroundY;
      npc.velocity.y = 0;

      if (impactSpeed > 1.6) {
        npc.squashY = clamp(1 - impactSpeed * 0.035, 0.72, 0.95);

        if (npc.action === 'jumping') {
          npc.action = 'posing';
          npc.actionTimer = 0.65;
          npc.poseIntensity = 1.0;
          npc.expression = 'cheese';
          npc.reactionIcon = '✌';
          npc.reactionTimer = 0.7;
          emitEvent(npc, events, 'pose', 0.65);
          triggerJumperLandingBump(npc, npcs, npcById, events);
        } else if (npc.action === 'staggering' && impactSpeed > 3.1) {
          // Hard landing after tumbling off a riser or carrier's shoulders
          const vLen = Math.hypot(npc.velocity.x, npc.velocity.z);
          const dx = vLen > 1e-4 ? npc.velocity.x / vLen : Math.sin(npc.facingYaw);
          const dz = vLen > 1e-4 ? npc.velocity.z / vLen : Math.cos(npc.facingYaw);
          applyBalanceHit(npc, 0.38, dx, dz, npcById, events, false);
        }
      }
    } else {
      npc.groundY = newGroundY;
    }
  }

  // 2. Pairwise circle-circle collision, shoving impulse, domino chains & helper trips
  const count = npcs.length;
  for (let i = 0; i < count; i++) {
    const a = npcs[i];
    if (a.action === 'riding_shoulders') continue;

    for (let j = i + 1; j < count; j++) {
      const b = npcs[j];
      if (b.action === 'riding_shoulders') continue;

      // Skip if well-separated vertically (e.g., high jumper clearing a fallen person)
      if (Math.abs(a.position.y - b.position.y) > 0.85) continue;

      const rA = a.radius * (a.action === 'fallen' ? 1.18 : 1.0);
      const rB = b.radius * (b.action === 'fallen' ? 1.18 : 1.0);
      const minDist = rA + rB;

      let dx = b.position.x - a.position.x;
      let dz = b.position.z - a.position.z;
      const distSq = dx * dx + dz * dz;
      if (distSq >= minDist * minDist) continue;

      let dist: number;
      let nx: number;
      let nz: number;
      if (distSq < 1e-6) {
        // Deterministic fallback direction to guarantee zero NaNs
        const angle = (i * 1.91 + j * 2.73) % (Math.PI * 2);
        nx = Math.cos(angle);
        nz = Math.sin(angle);
        dist = 0.001;
      } else {
        dist = Math.sqrt(distSq);
        nx = dx / dist;
        nz = dz / dist;
      }

      const overlap = minDist - dist;
      const massA = getEffectiveMass(a);
      const massB = getEffectiveMass(b);
      const invMassA = 1 / massA;
      const invMassB = 1 / massB;
      const invMassSum = invMassA + invMassB;

      // Soft positional separation
      const sep = overlap * PHYSICS_CONFIG.separationFactor;
      const sepA = sep * (invMassA / invMassSum);
      const sepB = sep * (invMassB / invMassSum);
      a.position.x -= nx * sepA;
      a.position.z -= nz * sepA;
      b.position.x += nx * sepB;
      b.position.z += nz * sepB;

      // Approach speeds into each other along normal
      const approachA = a.velocity.x * nx + a.velocity.z * nz;
      const approachB = -(b.velocity.x * nx + b.velocity.z * nz);
      const relNormal = (b.velocity.x - a.velocity.x) * nx + (b.velocity.z - a.velocity.z) * nz;

      if (relNormal < 0) {
        const aggressive =
          a.action === 'shoving' ||
          b.action === 'shoving' ||
          a.action === 'staggering' ||
          b.action === 'staggering';
        const restitution = aggressive
          ? PHYSICS_CONFIG.shoveRestitution
          : PHYSICS_CONFIG.baseRestitution;
        const impulse = (-(1 + restitution) * relNormal) / invMassSum;

        a.velocity.x -= nx * impulse * invMassA;
        a.velocity.z -= nz * impulse * invMassA;
        b.velocity.x += nx * impulse * invMassB;
        b.velocity.z += nz * impulse * invMassB;
      }

      // Check directional slapstick impacts (A -> B and B -> A)
      resolveSlapstickContact(a, b, nx, nz, approachA, massB, npcById, events);
      resolveSlapstickContact(b, a, -nx, -nz, approachB, massA, npcById, events);
    }
  }

  // 3. Stage bounds clamping with gentle bounce damping
  for (const npc of npcs) {
    if (npc.action === 'riding_shoulders') continue;

    const margin = npc.radius + 0.08;
    const minX = stage.stageBounds.minX + margin;
    const maxX = stage.stageBounds.maxX - margin;
    const minZ = stage.stageBounds.minZ + margin;
    const maxZ = stage.stageBounds.maxZ - margin;

    if (npc.position.x < minX) {
      npc.position.x = minX;
      npc.velocity.x = Math.abs(npc.velocity.x) * PHYSICS_CONFIG.boundsBounceDamping;
    } else if (npc.position.x > maxX) {
      npc.position.x = maxX;
      npc.velocity.x = -Math.abs(npc.velocity.x) * PHYSICS_CONFIG.boundsBounceDamping;
    }

    if (npc.position.z < minZ) {
      npc.position.z = minZ;
      npc.velocity.z = Math.abs(npc.velocity.z) * PHYSICS_CONFIG.boundsBounceDamping;
    } else if (npc.position.z > maxZ) {
      npc.position.z = maxZ;
      npc.velocity.z = -Math.abs(npc.velocity.z) * PHYSICS_CONFIG.boundsBounceDamping;
    }

    // Re-sync ground height cleanly after collision separation & bounds clamp
    const finalGround = getGroundHeightAt(stage, npc.position.x, npc.position.z);
    npc.groundY = finalGround;
    if (npc.position.y < finalGround) {
      npc.position.y = finalGround;
      if (npc.velocity.y < 0) npc.velocity.y = 0;
    }
  }

  // 4. Shoulder-ride position sync
  for (const npc of npcs) {
    if (npc.action !== 'riding_shoulders' || npc.carrierId === null) continue;
    const carrier = npcById.get(npc.carrierId);
    if (!carrier || carrier.action === 'fallen' || carrier.riderId !== npc.spec.id) {
      npc.carrierId = null;
      npc.action = 'idle';
      continue;
    }

    // Slight sway transfer from carrier lean so the rider bobs naturally
    const swayX = -Math.sin(carrier.tiltZ) * 0.14;
    const swayZ = Math.sin(carrier.tiltX) * 0.14;
    npc.position.set(
      carrier.position.x + swayX,
      carrier.position.y + carrier.height * PHYSICS_CONFIG.shoulderHeightRatio,
      carrier.position.z + swayZ,
    );
    npc.groundY = carrier.groundY;
    npc.velocity.copy(carrier.velocity);
  }

  // 5. Balance recovery, spring relaxation & zero-NaN guarantee
  const squashLerp = 1 - Math.exp(-10 * safeDt);
  for (const npc of npcs) {
    // Balance recovery
    if (
      npc.action === 'idle' ||
      npc.action === 'moving' ||
      npc.action === 'posing' ||
      npc.action === 'peeking' ||
      npc.action === 'tiptoe' ||
      npc.action === 'hiding' ||
      npc.action === 'helping'
    ) {
      npc.balance = Math.min(1, npc.balance + PHYSICS_CONFIG.balanceRecoveryRate * safeDt);
    } else if (npc.action === 'carrying_rider') {
      npc.balance = Math.min(1, npc.balance + PHYSICS_CONFIG.carrierBalanceRecoveryRate * safeDt);
    } else if (npc.action === 'staggering') {
      npc.balance = Math.min(1, npc.balance + 0.1 * safeDt);
    }

    // Relax squashY toward neutral (tiptoe & jump_charge apply their own targets in behavior)
    if (npc.action !== 'jump_charge' && npc.action !== 'tiptoe') {
      npc.squashY += (1 - npc.squashY) * squashLerp;
    }

    // Zero-NaN safety guard
    npc.position.x = safeFinite(npc.position.x, npc.spec.homePos.x);
    npc.position.y = clamp(safeFinite(npc.position.y, 0), -0.2, 6.0);
    npc.position.z = safeFinite(npc.position.z, npc.spec.homePos.z);
    npc.velocity.x = safeFinite(npc.velocity.x, 0);
    npc.velocity.y = clamp(safeFinite(npc.velocity.y, 0), -25, 16);
    npc.velocity.z = safeFinite(npc.velocity.z, 0);
    npc.groundY = safeFinite(npc.groundY, 0);
    npc.facingYaw = safeFinite(npc.facingYaw, 0);
    npc.headYawOffset = clamp(safeFinite(npc.headYawOffset, 0), -1.35, 1.35);
    npc.headPitchOffset = clamp(safeFinite(npc.headPitchOffset, 0), -0.8, 0.8);
    npc.tiltX = clamp(safeFinite(npc.tiltX, 0), -1.55, 1.55);
    npc.tiltZ = clamp(safeFinite(npc.tiltZ, 0), -1.55, 1.55);
    npc.squashY = clamp(safeFinite(npc.squashY, 1), 0.65, 1.32);
    npc.balance = clamp(safeFinite(npc.balance, 1), 0, 1);
    npc.excitement = clamp(safeFinite(npc.excitement, 0), 0, 1);
  }
}

function resolveSlapstickContact(
  attacker: NpcRuntimeState,
  victim: NpcRuntimeState,
  nx: number,
  nz: number,
  approachSpeed: number,
  victimMass: number,
  npcById: Map<string, NpcRuntimeState>,
  events: SimEvent[],
): void {
  if (approachSpeed <= 0.45) return;

  // Case A: Helper tripping comedically over a fallen or staggering NPC -> PILEUP!
  if (
    attacker.action === 'helping' &&
    (victim.action === 'fallen' || victim.action === 'staggering') &&
    approachSpeed > PHYSICS_CONFIG.helperTripSpeedThreshold &&
    getHitCooldown(attacker) <= 0
  ) {
    setHitCooldown(attacker, 0.6);
    attacker.velocity.x = nx * 1.45;
    attacker.velocity.z = nz * 1.45;
    attacker.velocity.y = 1.9;
    applyBalanceHit(attacker, 1.0, nx, nz, npcById, events, true);
    return;
  }

  if (getHitCooldown(victim) > 0) return;

  // Case B: Showoff / fast charger shoving a standing neighbor
  if (
    (attacker.action === 'shoving' && approachSpeed > 0.65) ||
    (approachSpeed > 1.75 && attacker.action !== 'fallen' && attacker.action !== 'staggering')
  ) {
    if (victim.action !== 'fallen' && victim.action !== 'getting_up') {
      setHitCooldown(victim, PHYSICS_CONFIG.shoveHitCooldown);
      const shoveKick = attacker.action === 'shoving' ? 2.55 : 1.4;
      victim.velocity.x += (nx * shoveKick) / victimMass;
      victim.velocity.z += (nz * shoveKick) / victimMass;

      const baseLoss = attacker.action === 'shoving' ? 0.52 : 0.28;
      const loss = baseLoss * (0.82 + 0.22 * Math.min(approachSpeed, 3.0));
      applyBalanceHit(victim, loss, nx, nz, npcById, events, false);
    }
    return;
  }

  // Case C: Domino chain reaction (staggering or fast-sliding fallen NPC bumping a standing neighbor)
  if (
    (attacker.action === 'staggering' && approachSpeed > 0.62) ||
    (attacker.action === 'fallen' && approachSpeed > 0.95)
  ) {
    if (
      victim.action !== 'fallen' &&
      victim.action !== 'staggering' &&
      victim.action !== 'getting_up' &&
      victim.action !== 'jumping'
    ) {
      setHitCooldown(victim, PHYSICS_CONFIG.shoveHitCooldown + 0.08);
      const dominoKick = 1.65 + 0.42 * Math.min(approachSpeed, 2.5);
      victim.velocity.x += (nx * dominoKick) / victimMass;
      victim.velocity.z += (nz * dominoKick) / victimMass;

      // Attenuate attacker slightly so chains naturally last 2-3 NPCs rather than infinite cascades
      attacker.velocity.x *= 0.62;
      attacker.velocity.z *= 0.62;

      const dominoLoss = attacker.action === 'staggering' ? 0.58 : 0.52;
      applyBalanceHit(victim, dominoLoss, nx, nz, npcById, events, false);
    }
  }
}
