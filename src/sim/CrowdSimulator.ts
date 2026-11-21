import * as THREE from 'three';
import { NpcRuntimeState, NpcSpec, SimEvent, StageSpec } from '../types';
import { getGroundHeightAt } from '../game/StageConfig';
import { stepPhysics } from './PhysicsWorld';
import { BEHAVIOR_CONFIG, updateNpcBehaviors } from './NpcBehavior';

export const SIM_CONFIG = {
  maxDt: 0.05,
  baseHeight: 1.48,
  baseRadius: 0.3,
  baseHeadRadius: 0.24,
  initJitterX: 0.08,
  initJitterZ: 0.05,
  cheeseBuffDuration: 2.1,
} as const;

function hashString(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createMulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

/**
 * Computes exact world-space head center and face unit direction from current body/head pose.
 * Accounts for standing lean (`tiltX`, `tiltZ`), squash/stretch, `fallen` posture,
 * and `riding_shoulders` elevated posture.
 */
export function updateNpcHeadGeometry(npc: NpcRuntimeState): void {
  const headLocalY = Math.max(0.35, (npc.height - npc.headRadius * 0.92) * npc.squashY);

  // Rotate body-local head stem (0, headLocalY, 0) by Euler YXZ (facingYaw, tiltX, tiltZ)
  const sinTz = Math.sin(npc.tiltZ);
  const cosTz = Math.cos(npc.tiltZ);
  const sinTx = Math.sin(npc.tiltX);
  const cosTx = Math.cos(npc.tiltX);
  const sinY = Math.sin(npc.facingYaw);
  const cosY = Math.cos(npc.facingYaw);

  const x1 = -headLocalY * sinTz;
  const y1 = headLocalY * cosTz;

  const x2 = x1;
  const y2 = y1 * cosTx;
  const z2 = y1 * sinTx;

  const wx = x2 * cosY + z2 * sinY;
  const wy = y2;
  const wz = -x2 * sinY + z2 * cosY;

  let headY = npc.position.y + wy;
  if (npc.action === 'fallen') {
    headY = Math.max(npc.groundY + npc.headRadius * 0.95, Math.min(headY, npc.groundY + npc.height * 0.34));
  } else if (npc.action !== 'riding_shoulders') {
    headY = Math.max(npc.groundY + npc.headRadius * 0.95, headY);
  }

  npc.headWorldPos.set(npc.position.x + wx, headY, npc.position.z + wz);

  const totalYaw = npc.facingYaw + npc.headYawOffset;
  if (npc.action === 'fallen') {
    // Tipped over looking dizzy toward the sky / sideways away from clean camera eye contact
    npc.headForward
      .set(Math.sin(totalYaw) * 0.35, 0.88, Math.cos(totalYaw) * 0.35)
      .normalize();
  } else {
    const pitch = clamp(npc.headPitchOffset, -0.75, 0.75);
    const cosP = Math.cos(pitch);
    npc.headForward
      .set(Math.sin(totalYaw) * cosP, Math.sin(pitch), Math.cos(totalYaw) * cosP)
      .normalize();
  }
}

export class CrowdSimulator {
  readonly npcs: NpcRuntimeState[] = [];
  private stage: StageSpec;
  private rng: () => number;

  constructor(stage: StageSpec, seed?: number) {
    this.stage = stage;
    this.rng = createMulberry32(seed ?? hashString(stage.id));
    this.reset(stage, seed);
  }

  reset(stage: StageSpec, seed?: number): void {
    this.stage = stage;
    const effectiveSeed = seed !== undefined ? seed : hashString(stage.id);
    this.rng = createMulberry32(effectiveSeed);

    this.npcs.length = 0;

    for (const spec of stage.roster) {
      this.npcs.push(this.createInitialNpcState(spec, stage));
    }

    // Ensure every NPC has exact headWorldPos & headForward ready on frame 1
    for (const npc of this.npcs) {
      updateNpcHeadGeometry(npc);
    }
  }

  triggerSayCheese(camera: THREE.PerspectiveCamera): void {
    camera.updateMatrixWorld();

    for (const npc of this.npcs) {
      if (npc.action === 'fallen') {
        // Flustered scramble to get back up slightly faster
        npc.actionTimer = Math.max(0.25, npc.actionTimer - 0.5);
        npc.reactionIcon = '💦';
        npc.reactionTimer = 0.75;
        continue;
      }

      if (npc.action === 'staggering' || npc.action === 'getting_up') {
        npc.cheeseBuffTimer = Math.max(npc.cheeseBuffTimer, 1.2);
        continue;
      }

      // Let NpcBehavior smoothly snap heads toward the camera over ~0.25s instead of a 1-frame teleport
      npc.cheeseBuffTimer = SIM_CONFIG.cheeseBuffDuration;
      npc.squashY = Math.max(npc.squashY, 1.07);

      switch (npc.spec.archetype) {
        case 'blinker':
          // Wake up wide-eyed for the golden shutter window!
          npc.blinkTimer = Math.max(npc.blinkTimer, 2.5);
          npc.expression = 'cheese';
          npc.poseIntensity = Math.max(npc.poseIntensity, 0.85);
          npc.reactionIcon = '!';
          npc.reactionTimer = 0.85;
          break;
        case 'shy':
          // Only calm shy NPCs if the camera isn't staring directly at them!
          if (npc.cameraAttention < BEHAVIOR_CONFIG.shyCheeseCalmAttentionMax) {
            if (npc.action === 'hiding') {
              npc.action = 'peeking';
            }
            npc.expression = 'cheese';
            npc.poseIntensity = Math.max(npc.poseIntensity, 0.8);
            npc.reactionIcon = '✨';
            npc.reactionTimer = 1.0;
          } else {
            npc.expression = 'nervous';
            npc.reactionIcon = '💦';
            npc.reactionTimer = 0.85;
          }
          break;
        case 'showoff':
          // Never cancel an actively surging showoff — instead fire them up even more unless lured calm first!
          if (npc.action === 'shoving' || npc.excitement > 0.65) {
            npc.excitement = clamp(npc.excitement + 0.25, 0, 1);
            npc.expression = 'smug';
            npc.reactionIcon = '💢';
            npc.reactionTimer = 0.9;
          } else {
            npc.expression = 'cheese';
            npc.poseIntensity = Math.max(npc.poseIntensity, 0.9);
            npc.reactionIcon = '★';
            npc.reactionTimer = 0.9;
          }
          break;
        case 'jumper':
          // Prime jumpers so they telegraph & leap ~0.6s after the callout
          npc.excitement = Math.max(npc.excitement, 0.72);
          npc.cooldownTimer = Math.min(npc.cooldownTimer, 0.45);
          npc.expression = 'cheese';
          npc.poseIntensity = Math.max(npc.poseIntensity, 0.9);
          npc.reactionIcon = '★';
          npc.reactionTimer = 0.8;
          break;
        default:
          npc.expression = 'cheese';
          npc.poseIntensity = Math.max(npc.poseIntensity, 0.9);
          npc.reactionIcon = '✨';
          npc.reactionTimer = 0.85;
          break;
      }

      updateNpcHeadGeometry(npc);
    }
  }

  step(dt: number, camera: THREE.PerspectiveCamera, cameraAngularSpeed: number): SimEvent[] {
    const safeDt = Number.isFinite(dt) ? clamp(dt, 0, SIM_CONFIG.maxDt) : 0;
    const safeAngularSpeed = Number.isFinite(cameraAngularSpeed) ? Math.max(0, cameraAngularSpeed) : 0;

    for (const npc of this.npcs) {
      npc.events.length = 0;
    }

    const events: SimEvent[] = [];
    if (safeDt <= 0) {
      return events;
    }

    updateNpcBehaviors(this.npcs, this.stage, camera, safeAngularSpeed, safeDt, this.rng, events);
    stepPhysics(this.npcs, this.stage, safeDt, events);

    for (const npc of this.npcs) {
      updateNpcHeadGeometry(npc);
    }

    return events;
  }

  private createInitialNpcState(spec: NpcSpec, stage: StageSpec): NpcRuntimeState {
    const baseGroundY = getGroundHeightAt(stage, spec.homePos.x, spec.homePos.z);

    // Subtle seeded jitter while keeping every NPC firmly on their intended platform tier
    let x = spec.homePos.x + (this.rng() * 2 - 1) * SIM_CONFIG.initJitterX;
    let z = spec.homePos.z + (this.rng() * 2 - 1) * SIM_CONFIG.initJitterZ;
    if (Math.abs(getGroundHeightAt(stage, x, z) - baseGroundY) > 0.02) {
      x = spec.homePos.x;
      z = spec.homePos.z;
    }

    const radius = SIM_CONFIG.baseRadius * spec.appearance.widthScale;
    const height = SIM_CONFIG.baseHeight * spec.appearance.heightScale;
    const headRadius = SIM_CONFIG.baseHeadRadius * (0.85 + 0.15 * spec.appearance.heightScale);

    const minX = stage.stageBounds.minX + radius + 0.1;
    const maxX = stage.stageBounds.maxX - radius - 0.1;
    const minZ = stage.stageBounds.minZ + radius + 0.1;
    const maxZ = stage.stageBounds.maxZ - radius - 0.1;
    x = clamp(x, minX, maxX);
    z = clamp(z, minZ, maxZ);

    const groundY = getGroundHeightAt(stage, x, z);

    // Lively opening habits so t=0 feels like a real bustling group photo, not a pre-solved lineup
    const sideSign = spec.homePos.x >= 0 ? 1 : -1;
    const initialBlinkTimer =
      spec.archetype === 'blinker' ? 0.6 + this.rng() * 1.2 : 2.5 + this.rng() * 3.0;
    const initialExcitement =
      spec.archetype === 'showoff'
        ? 0.45
        : spec.archetype === 'jumper'
          ? this.rng() * 0.38
          : 0;
    const initialHeadYaw =
      spec.archetype === 'blinker'
        ? sideSign * (0.45 + this.rng() * 0.25)
        : spec.archetype === 'shy'
          ? sideSign * 0.34
          : 0;
    const initialExpression =
      spec.archetype === 'shy'
        ? 'nervous'
        : spec.archetype === 'showoff'
          ? 'smug'
          : spec.archetype === 'blinker'
            ? 'neutral'
            : 'smile';

    return {
      spec,
      position: new THREE.Vector3(x, groundY, z),
      velocity: new THREE.Vector3(0, 0, 0),
      groundY,
      facingYaw: (this.rng() * 2 - 1) * 0.14,
      headYawOffset: initialHeadYaw,
      headPitchOffset: spec.archetype === 'shy' ? -0.12 : 0.08,
      tiltX: 0,
      tiltZ: 0,
      squashY: 1,
      radius,
      height,
      headRadius,
      headWorldPos: new THREE.Vector3(x, groundY + height - headRadius, z),
      headForward: new THREE.Vector3(0, 0, 1),
      action: 'idle',
      actionTimer: 0,
      expression: initialExpression,
      reactionIcon: '',
      reactionTimer: 0,
      balance: 1,
      excitement: initialExcitement,
      blinkTimer: initialBlinkTimer,
      cheeseBuffTimer: 0,
      poseIntensity: spec.isVip ? 0.65 : spec.archetype === 'showoff' ? 0.55 : spec.archetype === 'shy' ? 0.15 : 0.35,
      walkPhase: this.rng() * Math.PI * 2,
      cameraAttention: 0,
      isOccludedFromCamera: false,
      screenNdc: new THREE.Vector3(0, 0, 0),
      riderId: null,
      carrierId: null,
      helpTargetId: null,
      cooldownTimer: 0,
      events: [],
    };
  }
}
