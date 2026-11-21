import * as THREE from 'three';

export type StageId = 'wedding' | 'school_trip';

export type ArchetypeId =
  | 'vip'        // 主役 (Bride/Groom or Teacher) — central anchor, gets flustered if shoved
  | 'showoff'    // 目立ちたがり — rushes forward & center when camera focuses on them
  | 'shy'        // 恥ずかしがり — hides behind tall neighbor when directly targeted, peeks when camera shifts slightly away
  | 'peeker'     // ひょっこり — short, jumps/tiptoes/requests shoulder-ride when occluded
  | 'jumper'     // ジャンパー — charges up & leaps into peace-sign jump when framed
  | 'helper'     // おせっかい — rushes to rescue fallen NPCs, risking comedic pileups
  | 'blinker';   // うっかり — gets distracted or blinks unless woken by camera sweep or "Say Cheese!"

export type ExpressionId =
  | 'smile'      // Big happy smile (best score!)
  | 'cheese'     // Extra excited open-mouth smile (after "Say Cheese!" or posing)
  | 'neutral'    // Calm attentive look
  | 'nervous'    // Shy / worried sweat look
  | 'surprised'  // Wide-eyed shock (when pushed or falling)
  | 'blink_warn' // Half-closed sleepy eyelids (telegraph right before blink!)
  | 'blink'      // Fully closed eyes (penalized in photo!)
  | 'dizzy'      // Swirly eyes (fallen / knocked down)
  | 'smug';      // Cheeky show-off grin

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
  | '❤';

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
  roleLabel: string; // e.g., "新婦", "目立ちたがり", etc.
  archetype: ArchetypeId;
  isVip: boolean;
  homePos: { x: number; z: number }; // Initial target slot on stage
  appearance: CharacterAppearance;
}

export interface PlatformTier {
  id: string;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  height: number; // Y surface height
}

export interface StageSpec {
  id: StageId;
  title: string;
  subtitle: string;
  description: string;
  roundDuration: number; // seconds (e.g. 40)
  maxShots: number;      // e.g. 5
  stageBounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  platforms: PlatformTier[];
  defaultCamera: {
    azimuth: number;   // radians around Y
    elevation: number; // radians above horizon
    distance: number;  // meters from target
    fov: number;       // degrees
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

export interface NpcRuntimeState {
  spec: NpcSpec;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  groundY: number;
  facingYaw: number;         // Body facing angle (0 = +Z toward default camera)
  headYawOffset: number;     // Relative head yaw toward camera / interest
  headPitchOffset: number;   // Relative head pitch
  tiltX: number;             // Forward/back body lean (radians)
  tiltZ: number;             // Sideways lean / fall roll (radians)
  squashY: number;           // Squash & stretch factor (1 = normal)
  radius: number;            // Collision cylinder radius
  height: number;            // Full character standing height
  headRadius: number;        // Head sphere radius for occlusion checks
  headWorldPos: THREE.Vector3; // Cached world position of head center
  headForward: THREE.Vector3;  // Cached world unit vector of face direction
  action: ActionState;
  actionTimer: number;
  expression: ExpressionId;
  reactionIcon: ReactionIcon;
  reactionTimer: number;
  balance: number;           // 0..1 (drops on shove; <= 0 triggers knockdown!)
  excitement: number;        // 0..1 (builds up for jumpers/showoffs)
  blinkTimer: number;        // Countdown to next blink cycle
  cheeseBuffTimer: number;   // >0 right after "Say Cheese!" call
  poseIntensity: number;     // 0..1 arm pose blend (peace sign, wave, etc.)
  walkPhase: number;         // Procedural locomotion phase
  cameraAttention: number;   // 0..1 how directly the camera is pointed at this NPC
  isOccludedFromCamera: boolean;
  screenNdc: THREE.Vector3;  // Projected head position in NDC
  riderId: string | null;    // ID of peeker sitting on this NPC's shoulders
  carrierId: string | null;  // ID of NPC carrying this peeker
  helpTargetId: string | null;
  cooldownTimer: number;
  // Transient event flags emitted during a sim tick (consumed by Audio/VFX)
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
  | 'get_up';

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
  // Normalized viewport coordinates [0..1]
  screenX: number;
  screenY: number;
  boxSize: number; // Normalized width/height of face box
  status: 'good' | 'warn' | 'bad' | 'hidden';
  label: string;   // Short Japanese tag if warn/bad, e.g. "まばたき" / "隠れ" / "転倒"
  visibleRatio: number;
}

export interface LiveCameraMetrics {
  visibleCount: number;
  smilingCount: number;
  totalCount: number;
  vipVisibleCount: number;
  vipTotalCount: number;
  faceBoxes: LiveFaceBox[];
  estimatedQuality: number; // 0..100 rough live estimate for AF sound/meter
}

export interface NpcPhotoVerdict {
  npcId: string;
  name: string;
  roleLabel: string;
  isVip: boolean;
  archetype: ArchetypeId;
  inFrame: boolean;
  edgeClipped: boolean;
  visibleRatio: number; // 0, 0.33, 0.67, 1.0
  lookingAtCamera: boolean;
  expression: ExpressionId;
  action: ActionState;
  screenX: number; // 0..1
  screenY: number; // 0..1
  faceScreenSize: number;
  points: number;
  tag: string; // e.g. "ベスト笑顔", "見切れ", "後ろに隠れた", "目をつぶった", "転倒中！", "肩車成功！"
}

export type PhotoRank = 'S+' | 'S' | 'A' | 'B' | 'C';

export interface ComedyAward {
  id: string;
  badge: string;  // e.g. "💥 ドミノ惨事賞"
  reason: string;
}

export interface PhotoScoreBreakdown {
  totalScore: number;       // 0..100
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
  caption: string;          // Dynamic Japanese headline for this photo!
  subCaption: string;       // Funny / insightful one-line commentary
  comedyAward: ComedyAward | null;
  verdicts: NpcPhotoVerdict[];
}

export interface CapturedPhoto {
  id: number;
  shotIndex: number; // 1..maxShots
  timestampRemaining: number;
  stageId: StageId;
  stageTitle: string;
  rawDataUrl: string;      // Clean 3D render snapshot
  polaroidDataUrl: string; // Styled souvenir Polaroid with frame, stamp & caption
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
  cheeseCooldown: number;    // 0 = ready
  cheeseMaxCooldown: number;
  zoomPercent: number;       // 0..100
  muted: boolean;
  liveMetrics: LiveCameraMetrics;
  latestPhoto: CapturedPhoto | null;
  photos: CapturedPhoto[];
  bestScoreByStage: Record<StageId, number>;
}
