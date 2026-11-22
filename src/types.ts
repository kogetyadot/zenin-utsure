import * as THREE from 'three';

export type StageId = 'wedding' | 'school_trip';

export type ArchetypeId =
  | 'vip'        // 主役 (Bride/Groom or Teacher) — central anchor, gets flustered if shoved
  | 'showoff'    // 目立ちたがり — rushes forward & sprints right into the lens!
  | 'shy'        // 恥ずかしがり — hides behind tall neighbor when directly targeted, peeks when camera shifts slightly away
  | 'peeker'     // ひょっこり — short, jumps/tiptoes/requests wobbly shoulder-ride when occluded
  | 'jumper'     // ジャンパー — charges up & leaps into absurd star/backbend peace jumps when framed
  | 'helper'     // おせっかい — rushes to rescue fallen NPCs, risking comedic bowling pileups
  | 'blinker';   // うっかり — gets distracted, blinks, OR builds up a mega-sneeze shockwave!

export type ExpressionId =
  | 'smile'      // Big happy smile (best score!)
  | 'cheese'     // Extra excited open-mouth smile (after "Say Cheese!" or posing)
  | 'neutral'    // Calm attentive look
  | 'nervous'    // Shy / worried sweat look
  | 'surprised'  // Wide-eyed shock (when pushed or falling)
  | 'blink_warn' // Half-closed sleepy eyelids (telegraph right before blink!)
  | 'blink'      // Fully closed eyes (penalized in photo!)
  | 'dizzy'      // Swirly eyes (fallen / knocked down)
  | 'smug'       // Cheeky show-off grin
  | 'sneeze'     // Hilarious scrunched-up "ACHOO!!" face (>< eyes + wide mouth + comic puff)
  | 'hen_gao';   // Absurd cross-eyed tongue-out goofy face (アッカンベー変顔!)

export type ActionState =
  | 'idle'
  | 'moving'
  | 'shoving'
  | 'hiding'
  | 'peeking'
  | 'tiptoe'
  | 'jump_charge'
  | 'jumping'
  | 'posing'
  | 'staggering'
  | 'fallen'
  | 'getting_up'
  | 'helping'
  | 'riding_shoulders'
  | 'carrying_rider';

export type ReactionIcon =
  | ''
  | '!'
  | '?'
  | '★'
  | '💦'
  | '💢'
  | '💫'
  | '✨'
  | '💤'
  | '✌'
  | '❤'
  | '🤧'
  | '🤪';

export interface CharacterAppearance {
  skinColor: string;
  hairColor: string;
  hairStyle: 'short' | 'bob' | 'bun' | 'spiky' | 'long' | 'curly' | 'ponytail' | 'bald_sides';
  outfitTopColor: string;
  outfitBottomColor: string;
  accentColor: string;
  outfitStyle: 'wedding_dress' | 'tuxedo' | 'party_dress' | 'suit' | 'school_blazer' | 'sailor' | 'teacher_track';
  accessory: 'none' | 'veil' | 'top_hat' | 'sunglasses' | 'beret' | 'headband' | 'glasses' | 'bow_tie' | 'flower_crown' | 'cap' | 'flag' | 'bouquet';
  heightScale: number; // 0.80 (short peeker) .. 1.15 (tall)
  widthScale: number;  // 0.88 .. 1.12
  rosyCheeks?: boolean;
}

export interface NpcSpec {
  id: string;
  name: string;
  roleLabel: string;
  archetype: ArchetypeId;
  isVip: boolean;
  homePos: { x: number; z: number };
  appearance: CharacterAppearance;
}

export interface PlatformTier {
  id: string;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  height: number;
}

export interface StageSpec {
  id: StageId;
  title: string;
  subtitle: string;
  description: string;
  roundDuration: number;
  maxShots: number;
  stageBounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  platforms: PlatformTier[];
  defaultCamera: {
    azimuth: number;
    elevation: number;
    distance: number;
    fov: number;
    target: { x: number; y: number; z: number };
  };
  cameraLimits: {
    minAzimuth: number;
    maxAzimuth: number;
    minElevation: number;
    maxElevation: number;
    minFov: number;
    maxFov: number;
    minTargetX: number;
    maxTargetX: number;
    minTargetY: number;
    maxTargetY: number;
  };
  roster: NpcSpec[];
}

export interface StageIntruderState {
  kind: 'dove' | 'deer';
  active: boolean;
  warningTimer: number; // >0 before entering so player sees comedic warning!
  warningSide: -1 | 0 | 1;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  facingYaw: number;
  phase: number;
  activeTimer: number;
}

export interface NpcRuntimeState {
  spec: NpcSpec;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  groundY: number;
  facingYaw: number;
  headYawOffset: number;
  headPitchOffset: number;
  tiltX: number;
  tiltZ: number;
  squashY: number;
  radius: number;
  height: number;
  headRadius: number;
  headWorldPos: THREE.Vector3;
  headForward: THREE.Vector3;
  action: ActionState;
  actionTimer: number;
  expression: ExpressionId;
  reactionIcon: ReactionIcon;
  reactionTimer: number;
  balance: number;
  excitement: number;
  blinkTimer: number;
  cheeseBuffTimer: number;
  poseIntensity: number;
  walkPhase: number;
  cameraAttention: number;
  isOccludedFromCamera: boolean;
  screenNdc: THREE.Vector3;
  riderId: string | null;
  carrierId: string | null;
  helpTargetId: string | null;
  cooldownTimer: number;
  // Bakage comedy runtime fields!
  hatPopHeight: number;      // >0 when hat/accessory flies sky-high on impact!
  hatPopVel: number;         // Vertical velocity of flying hat
  hatSpin: number;           // Spin angle of flying hat
  sneezeCharge: number;      // 0..1 pre-sneeze inhale shake before mega sneeze!
  lensBombProgress: number;  // 0..1 showoff sprinting right up to the camera lens!
  events: SimEvent[];
}

export type SimEventType =
  | 'jump'
  | 'shove'
  | 'fall'
  | 'pileup'
  | 'shoulder_mount'
  | 'peek_pop'
  | 'pose'
  | 'get_up'
  | 'hat_pop'
  | 'sneeze_charge'
  | 'sneeze_blast'
  | 'intruder_enter'
  | 'intruder_bonk'
  | 'lens_bomb'
  | 'slip';

export interface SimEvent {
  type: SimEventType;
  npcId: string;
  position: THREE.Vector3;
  intensity: number;
}

export interface LiveFaceBox {
  npcId: string;
  name: string;
  isVip: boolean;
  archetype: ArchetypeId;
  screenX: number;
  screenY: number;
  boxSize: number;
  status: 'good' | 'warn' | 'bad' | 'hidden';
  label: string;
  visibleRatio: number;
}

export interface LiveCameraMetrics {
  visibleCount: number;
  smilingCount: number;
  totalCount: number;
  vipVisibleCount: number;
  vipTotalCount: number;
  faceBoxes: LiveFaceBox[];
  estimatedQuality: number;
  intruderAlert?: string; // Short comic live alert banner when dove/deer or sneeze is imminent!
}

export interface NpcPhotoVerdict {
  npcId: string;
  name: string;
  roleLabel: string;
  isVip: boolean;
  archetype: ArchetypeId;
  inFrame: boolean;
  edgeClipped: boolean;
  visibleRatio: number;
  lookingAtCamera: boolean;
  expression: ExpressionId;
  action: ActionState;
  screenX: number;
  screenY: number;
  faceScreenSize: number;
  points: number;
  tag: string;
}

export type PhotoRank = 'S+' | 'S' | 'A' | 'B' | 'C';

export interface ComedyAward {
  id: string;
  badge: string;
  reason: string;
}

export interface PhotoScoreBreakdown {
  totalScore: number;       // 0..100 (写真スコア)
  comedyScore: number;      // 0..100 (🤣 爆笑度 / Bakage Meter!)
  rank: PhotoRank;
  coverageScore: number;    // 0..40 (全員写り)
  expressionScore: number;  // 0..30 (表情・目線)
  compositionScore: number; // 0..20 (構図バランス)
  momentScore: number;      // 0..10 (シャッターチャンス)
  visibleCount: number;
  smilingCount: number;
  totalCount: number;
  vipAllVisible: boolean;
  fallenCount: number;
  jumpingCount: number;
  blinkingCount: number;
  shoulderRideCount: number;
  flyingHatCount: number;
  intruderInFrame: boolean;
  intruderKind: 'dove' | 'deer' | null;
  henGaoCount: number;
  sneezeCount: number;
  lensBombCount: number;
  caption: string;
  subCaption: string;
  comedyAward: ComedyAward | null;
  verdicts: NpcPhotoVerdict[];
}

export interface CapturedPhoto {
  id: number;
  shotIndex: number;
  timestampRemaining: number;
  stageId: StageId;
  stageTitle: string;
  rawDataUrl: string;
  polaroidDataUrl: string;
  score: PhotoScoreBreakdown;
}

export type GamePhase = 'title' | 'playing' | 'result';

export interface GameHudSnapshot {
  phase: GamePhase;
  stageId: StageId;
  timeRemaining: number;
  roundDuration: number;
  shotsUsed: number;
  maxShots: number;
  cheeseCooldown: number;
  cheeseMaxCooldown: number;
  zoomPercent: number;
  muted: boolean;
  liveMetrics: LiveCameraMetrics;
  latestPhoto: CapturedPhoto | null;
  photos: CapturedPhoto[];
  bestScoreByStage: Record<StageId, number>;
}
