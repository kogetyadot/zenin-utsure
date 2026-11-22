import * as THREE from 'three';

export type StageId = 'wedding' | 'school_trip' | 'sports_day' | 'tropical_beach';

export type ArchetypeId =
  | 'vip'        // 主役 (Bride/Groom, Teacher, Captain/CEO, Aloha Boss)
  | 'showoff'    // 目立ちたがり — rushes forward & sprints right into the lens!
  | 'shy'        // 恥ずかしがり — hides behind tall neighbor when directly targeted, peeks when camera shifts slightly away
  | 'peeker'     // ひょっこり — short, jumps/tiptoes/requests wobbly shoulder-ride when occluded
  | 'jumper'     // ジャンパー — charges up & leaps into absurd star/backbend peace jumps when framed
  | 'helper'     // おせっかい — rushes to rescue fallen NPCs, risking comedic bowling pileups
  | 'blinker';   // うっかり — gets distracted, blinks, OR builds up a mega-sneeze shockwave!

export type ExpressionId =
  | 'smile'
  | 'cheese'
  | 'neutral'
  | 'nervous'
  | 'surprised'
  | 'blink_warn'
  | 'blink'
  | 'dizzy'
  | 'smug'
  | 'sneeze'
  | 'hen_gao';

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
  outfitStyle:
    | 'wedding_dress'
    | 'tuxedo'
    | 'party_dress'
    | 'suit'
    | 'school_blazer'
    | 'sailor'
    | 'teacher_track'
    | 'track_jersey'
    | 'mascot_suit'
    | 'aloha_shirt'
    | 'swimwear';
  accessory:
    | 'none'
    | 'veil'
    | 'top_hat'
    | 'sunglasses'
    | 'beret'
    | 'headband'
    | 'glasses'
    | 'bow_tie'
    | 'flower_crown'
    | 'cap'
    | 'flag'
    | 'bouquet'
    | 'trophy'
    | 'straw_hat'
    | 'snorkel'
    | 'swim_ring'
    | 'mascot_ears'
    | 'pom_pom';
  heightScale: number;
  widthScale: number;
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

export type StageIntruderKind = 'dove' | 'deer' | 'oodama' | 'beach_ball';

export interface StageIntruderState {
  kind: StageIntruderKind;
  active: boolean;
  warningTimer: number;
  warningSide: -1 | 0 | 1;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  facingYaw: number;
  phase: number;
  activeTimer: number;
}

export interface StageHazardState {
  // Stage 4: Tropical Beach periodic crashing shoreline wave
  waveWarningTimer: number; // >0 before wave hits
  waveProgress: number;     // 0 = calm, 0..1 = crashing ashore & receding
  waveActive: boolean;
  // Stage 3: Sports Day overhead kusudama confetti ball
  kusudamaOpen: number;     // 0 = closed, 0..1 = cracked open!
  kusudamaTimer: number;    // >0 while celebrating confetti burst
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
  hatPopHeight: number;
  hatPopVel: number;
  hatSpin: number;
  sneezeCharge: number;
  lensBombProgress: number;
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
  | 'slip'
  | 'wave_warning'
  | 'wave_crash'
  | 'kusudama_pop'
  | 'ball_boing';

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
  intruderAlert?: string;
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
  totalScore: number;
  comedyScore: number;
  rank: PhotoRank;
  coverageScore: number;
  expressionScore: number;
  compositionScore: number;
  momentScore: number;
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
  intruderKind: StageIntruderKind | null;
  waveCrashActive: boolean;
  kusudamaActive: boolean;
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
