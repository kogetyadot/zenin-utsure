import * as THREE from 'three';
import {
  NpcRuntimeState,
  NpcSpec,
  SimEvent,
  StageIntruderState,
  StageSpec,
} from '../types';
import { getGroundHeightAt } from '../game/StageConfig';
import { stepPhysics } from './PhysicsWorld';
import {
  BEHAVIOR_CONFIG,
  resetNpcBehaviorState,
  updateNpcBehaviors,
} from './NpcBehavior';

export const SIM_CONFIG = {
  maxDt: 0.05,
  baseHeight: 1.48,
  baseRadius: 0.3,
  baseHeadRadius: 0.24,
  initJitterX: 0.08,
  initJitterZ: 0.05,
  cheeseBuffDuration: 2.1,
  intruderFirstWarningDelay: 4.5,
  intruderRepeatDelay: 11.5,
  intruderWarningDuration: 1.7,
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

function wrapAngle(a: number): number {
  let r = a;
  while (r > Math.PI) r -= Math.PI * 2;
  while (r < -Math.PI) r += Math.PI * 2;
  return r;
}

function lerpAngle(current: number, target: number, alpha: number): number {
  return wrapAngle(current + wrapAngle(target - current) * clamp(alpha, 0, 1));
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
  readonly intruder: StageIntruderState;
  private stage: StageSpec;
  private rng: () => number;
  private intruderCooldown: number = SIM_CONFIG.intruderFirstWarningDelay;
  private intruderStartSide: -1 | 1 = -1;
  private intruderTravelZ = 0.2;

  constructor(stage: StageSpec, seed?: number) {
    this.stage = stage;
    this.rng = createMulberry32(seed ?? hashString(stage.id));
    this.intruder = {
      kind: stage.id === 'wedding' ? 'dove' : 'deer',
      active: false,
      warningTimer: 0,
      warningSide: 0,
      position: new THREE.Vector3(6.5, stage.id === 'wedding' ? 1.65 : 0, stage.id === 'wedding' ? 2.6 : 0.2),
      velocity: new THREE.Vector3(0, 0, 0),
      facingYaw: 0,
      phase: 0,
      activeTimer: 0,
    };
    this.reset(stage, seed);
  }

  reset(stage: StageSpec, seed?: number): void {
    this.stage = stage;
    const effectiveSeed = seed !== undefined ? seed : hashString(stage.id);
    this.rng = createMulberry32(effectiveSeed);

    resetNpcBehaviorState(this.npcs);
    this.npcs.length = 0;

    for (const spec of stage.roster) {
      this.npcs.push(this.createInitialNpcState(spec, stage));
    }

    // Mutate readonly intruder in-place so external renderer/HUD references stay live
    const intruderKind = stage.id === 'wedding' ? 'dove' : 'deer';
    this.intruder.kind = intruderKind;
    this.intruder.active = false;
    this.intruder.warningTimer = 0;
    this.intruder.warningSide = 0;
    this.intruder.position.set(
      6.5,
      intruderKind === 'dove' ? 1.65 : 0,
      intruderKind === 'dove' ? 2.6 : 0.2,
    );
    this.intruder.velocity.set(0, 0, 0);
    this.intruder.facingYaw = 0;
    this.intruder.phase = 0;
    this.intruder.activeTimer = 0;
    this.intruderCooldown = SIM_CONFIG.intruderFirstWarningDelay;
    this.intruderStartSide = -1;
    this.intruderTravelZ = 0.2;

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
          // Interrupt any incoming mega-sneeze early & wake up wide-eyed!
          npc.sneezeCharge = 0;
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

    this.updateIntruder(safeDt, events);
    updateNpcBehaviors(this.npcs, this.stage, camera, safeAngularSpeed, safeDt, this.rng, events);
    stepPhysics(this.npcs, this.stage, safeDt, events, this.intruder);

    for (const npc of this.npcs) {
      updateNpcHeadGeometry(npc);
    }

    return events;
  }

  private updateIntruder(dt: number, events: SimEvent[]): void {
    const intr = this.intruder;

    // 1. Waiting for next warning window
    if (!intr.active && intr.warningTimer <= 0) {
      this.intruderCooldown -= dt;
      if (this.intruderCooldown <= 0) {
        const side: -1 | 1 = this.rng() < 0.5 ? -1 : 1;
        this.intruderStartSide = side;
        intr.warningSide = side;
        intr.warningTimer = SIM_CONFIG.intruderWarningDuration;
        intr.activeTimer = 0;
        intr.velocity.set(0, 0, 0);
        if (intr.kind === 'dove') {
          intr.position.set(side * 5.2, 1.65, 2.6);
        } else {
          this.intruderTravelZ = 0.05 + this.rng() * 0.3;
          const startX = side * 4.8;
          intr.position.set(
            startX,
            getGroundHeightAt(this.stage, startX, this.intruderTravelZ),
            this.intruderTravelZ,
          );
        }
      }
      return;
    }

    // 2. Comedic warning banner countdown before entry
    if (!intr.active && intr.warningTimer > 0) {
      intr.warningTimer = Math.max(0, intr.warningTimer - dt);
      if (intr.warningTimer <= 0) {
        intr.active = true;
        intr.activeTimer = 0;
        intr.phase = 0;

        if (intr.kind === 'dove') {
          intr.position.set(this.intruderStartSide * 5.2, 1.65, 2.6);
          intr.velocity.set(-this.intruderStartSide * 3.8, 0, 0);
          intr.facingYaw = Math.atan2(-this.intruderStartSide, 0.25);
        } else {
          const startX = this.intruderStartSide * 4.8;
          const startY = getGroundHeightAt(this.stage, startX, this.intruderTravelZ);
          intr.position.set(startX, startY, this.intruderTravelZ);
          intr.velocity.set(-this.intruderStartSide * 2.8, 0, 0);
          intr.facingYaw = Math.atan2(-this.intruderStartSide, 0);
        }

        events.push({
          type: 'intruder_enter',
          npcId: intr.kind,
          position: intr.position.clone(),
          intensity: 1.25,
        });
      }
      return;
    }

    // 3. Active stage intruder choreography
    const prevX = intr.position.x;
    const prevY = intr.position.y;
    const prevZ = intr.position.z;
    intr.activeTimer += dt;
    const t = intr.activeTimer;
    const side = this.intruderStartSide;

    let nextX = prevX;
    let nextY = prevY;
    let nextZ = prevZ;
    let targetYaw = intr.facingYaw;

    if (intr.kind === 'dove') {
      // Wedding Dove: swoops across foreground -> pauses cheekily near screen center (z=3.1) for 1.2s -> swoops out!
      intr.phase += dt * 14.5;
      const enterDur = 1.4;
      const pauseDur = 1.2;
      const exitDur = 1.45;
      const pauseEnd = enterDur + pauseDur;
      const totalDur = pauseEnd + exitDur;

      if (t < enterDur) {
        const u = clamp(t / enterDur, 0, 1);
        const e = 1 - (1 - u) * (1 - u);
        nextX = side * 5.2 * (1 - e);
        nextZ = 2.6 + 0.5 * e;
        nextY = 1.65 + Math.sin(intr.phase * 0.55) * 0.22;
        targetYaw = u > 0.72 ? 0 : Math.atan2(-side, 0.35);
      } else if (t < pauseEnd) {
        const hoverT = t - enterDur;
        nextX = Math.sin(hoverT * 5.2) * 0.18;
        nextZ = 3.1 + Math.cos(hoverT * 4.4) * 0.08;
        nextY = 1.68 + Math.sin(intr.phase) * 0.14;
        targetYaw = Math.sin(hoverT * 3.5) * 0.16;
      } else if (t < totalDur) {
        const u = clamp((t - pauseEnd) / exitDur, 0, 1);
        const e = u * u;
        nextX = -side * 5.4 * e;
        nextZ = 3.1 - 0.55 * e;
        nextY = 1.68 + 0.42 * e + Math.sin(intr.phase * 0.65) * 0.18;
        targetYaw = Math.atan2(-side, -0.18);
      } else {
        intr.active = false;
        intr.warningSide = 0;
        intr.velocity.set(0, 0, 0);
        this.intruderCooldown = SIM_CONFIG.intruderRepeatDelay;
        return;
      }
    } else {
      // School Trip Nara Deer: trots boldly across front/middle steps -> pauses near center for 1.0s staring deadpan -> exits!
      intr.phase += dt * 10.5;
      const enterDur = 1.75;
      const pauseDur = 1.0;
      const exitDur = 1.8;
      const pauseEnd = enterDur + pauseDur;
      const totalDur = pauseEnd + exitDur;

      if (t < enterDur) {
        const u = clamp(t / enterDur, 0, 1);
        const e = 1 - Math.pow(1 - u, 1.45);
        nextX = side * 4.8 * (1 - e);
        nextZ = this.intruderTravelZ + Math.sin(t * 2.8) * 0.05;
        nextY = getGroundHeightAt(this.stage, nextX, nextZ);
        targetYaw = u > 0.85 ? 0 : Math.atan2(-side, 0);
      } else if (t < pauseEnd) {
        nextX = 0;
        nextZ = this.intruderTravelZ;
        nextY = getGroundHeightAt(this.stage, nextX, nextZ);
        targetYaw = 0; // Deadpan stare right into the camera!
      } else if (t < totalDur) {
        const u = clamp((t - pauseEnd) / exitDur, 0, 1);
        const e = Math.pow(u, 1.35);
        nextX = -side * 4.8 * e;
        nextZ = this.intruderTravelZ + Math.sin(t * 2.8) * 0.05;
        nextY = getGroundHeightAt(this.stage, nextX, nextZ);
        targetYaw = Math.atan2(-side, 0);
      } else {
        intr.active = false;
        intr.warningSide = 0;
        intr.velocity.set(0, 0, 0);
        this.intruderCooldown = SIM_CONFIG.intruderRepeatDelay;
        return;
      }
    }

    intr.position.set(nextX, nextY, nextZ);
    intr.velocity.set((nextX - prevX) / dt, (nextY - prevY) / dt, (nextZ - prevZ) / dt);
    intr.facingYaw = lerpAngle(intr.facingYaw, targetYaw, 1 - Math.exp(-10.0 * dt));
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
      hatPopHeight: 0,
      hatPopVel: 0,
      hatSpin: 0,
      sneezeCharge: 0,
      lensBombProgress: 0,
      events: [],
    };
  }
}
