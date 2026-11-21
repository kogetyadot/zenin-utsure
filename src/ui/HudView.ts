import {
  CapturedPhoto,
  GameHudSnapshot,
  GamePhase,
  LiveCameraMetrics,
  LiveFaceBox,
  NpcPhotoVerdict,
  PhotoRank,
  StageId,
} from '../types';
import { STAGES } from '../game/StageConfig';

export interface HudCallbacks {
  onStartStage(stageId: StageId): void;
  onShutter(): void;
  onSayCheese(): void;
  onZoomChange(zoomNorm: number): void;
  onToggleMute(): void;
  onFinishEarly(): void;
  onReturnTitle(): void;
  onReplay(): void;
}

interface PooledAfBox {
  root: HTMLDivElement;
  tag: HTMLSpanElement;
  active: boolean;
  lastSize: number;
  lastStatus: string;
  lastIsVip: boolean;
  lastLabel: string;
}

const AF_POOL_SIZE = 16;
const TIMER_RING_RADIUS = 16;
const TIMER_RING_CIRC = 2 * Math.PI * TIMER_RING_RADIUS;
const CHEESE_RING_RADIUS = 26;
const CHEESE_RING_CIRC = 2 * Math.PI * CHEESE_RING_RADIUS;

const STAGE_THUMBS: Record<StageId, string> = {
  wedding: './assets/wedding-board.jpg',
  school_trip: './assets/shrine-board.jpg',
};

const STAGE_OVERLAY_COPY: Record<StageId, { top: string; main: string }> = {
  wedding: { top: 'Wedding', main: 'ガーデンウェディング' },
  school_trip: { top: '修学旅行', main: '古都の石段' },
};

const ICON_SOUND_ON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;

const ICON_SOUND_OFF = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

const ICON_CAMERA = `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`;

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;

const ICON_REPLAY = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>`;

const ICON_HOME = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;

function classifyVerdict(v: NpcPhotoVerdict): 'good' | 'warn' | 'bad' {
  if (
    !v.inFrame ||
    v.visibleRatio < 0.34 ||
    v.action === 'fallen' ||
    v.expression === 'blink' ||
    v.expression === 'dizzy'
  ) {
    return 'bad';
  }
  if (
    v.edgeClipped ||
    v.visibleRatio < 0.9 ||
    !v.lookingAtCamera ||
    v.expression === 'blink_warn' ||
    v.expression === 'surprised' ||
    v.expression === 'nervous'
  ) {
    return 'warn';
  }
  return 'good';
}

function rankClassName(rank: PhotoRank): string {
  switch (rank) {
    case 'S+':
      return 'rank-s-plus';
    case 'S':
      return 'rank-s';
    case 'A':
      return 'rank-a';
    case 'B':
      return 'rank-b';
    default:
      return 'rank-c';
  }
}

export class HudView {
  private readonly container: HTMLElement;
  private readonly callbacks: HudCallbacks;

  private readonly root: HTMLDivElement;

  // 3 Screen Layers
  private readonly titleScreen: HTMLElement;
  private readonly hudScreen: HTMLElement;
  private readonly resultScreen: HTMLElement;

  // Title Screen Elements
  private readonly stageCardEls: Record<StageId, HTMLButtonElement>;
  private readonly stageBestEls: Record<StageId, HTMLSpanElement>;
  private readonly startBtn: HTMLButtonElement;
  private selectedStageId: StageId = 'wedding';

  // Live HUD Elements
  private readonly afLayer: HTMLDivElement;
  private readonly afPool: PooledAfBox[] = [];
  private readonly stagePillEl: HTMLSpanElement;
  private readonly timerPillEl: HTMLDivElement;
  private readonly timerRingProgress: SVGCircleElement;
  private readonly timerTextEl: HTMLSpanElement;
  private readonly filmPipsEl: HTMLDivElement;
  private readonly filmPipNodes: HTMLSpanElement[] = [];
  private readonly filmCountTextEl: HTMLSpanElement;
  private readonly faceLockBadgeEl: HTMLDivElement;
  private readonly faceLockCountEl: HTMLSpanElement;
  private readonly faceLockVipEl: HTMLSpanElement;
  private readonly qualityFillEl: HTMLDivElement;
  private readonly tipPillEl: HTMLDivElement;
  private readonly finishEarlyBtn: HTMLButtonElement;
  private readonly muteBtn: HTMLButtonElement;
  private readonly zoomSlider: HTMLInputElement;
  private readonly zoomReadoutEl: HTMLSpanElement;
  private readonly cheeseBtn: HTMLButtonElement;
  private readonly cheeseRingProgress: SVGCircleElement;
  private readonly cheeseCdLabel: HTMLSpanElement;
  private readonly shutterBtn: HTMLButtonElement;
  private readonly shutterRemainEl: HTMLSpanElement;

  // VFX Overlays
  private readonly shutterFlashEl: HTMLDivElement;
  private readonly polaroidToastEl: HTMLDivElement;
  private readonly toastImgEl: HTMLImageElement;
  private readonly toastRankEl: HTMLSpanElement;
  private readonly toastScoreEl: HTMLSpanElement;
  private readonly toastCaptionEl: HTMLDivElement;
  private readonly cheeseWaveEl: HTMLDivElement;

  // Result Album Elements
  private readonly resultStageTitleEl: HTMLSpanElement;
  private readonly resultBestTagEl: HTMLSpanElement;
  private readonly resultPolaroidImg: HTMLImageElement;
  private readonly resultPolaroidWrap: HTMLDivElement;
  private readonly resultEmptyState: HTMLDivElement;
  private readonly filmstripEl: HTMLDivElement;
  private readonly resultRankSeal: HTMLDivElement;
  private readonly resultScoreNum: HTMLSpanElement;
  private readonly resultCaptionEl: HTMLHeadingElement;
  private readonly resultSubCaptionEl: HTMLParagraphElement;
  private readonly comedyAwardBanner: HTMLDivElement;
  private readonly comedyAwardBadge: HTMLSpanElement;
  private readonly comedyAwardReason: HTMLSpanElement;
  private readonly barCoverageFill: HTMLDivElement;
  private readonly barCoverageVal: HTMLSpanElement;
  private readonly barExpressionFill: HTMLDivElement;
  private readonly barExpressionVal: HTMLSpanElement;
  private readonly barCompositionFill: HTMLDivElement;
  private readonly barCompositionVal: HTMLSpanElement;
  private readonly barMomentFill: HTMLDivElement;
  private readonly barMomentVal: HTMLSpanElement;
  private readonly verdictListEl: HTMLDivElement;
  private readonly downloadBtn: HTMLButtonElement;
  private readonly replayBtn: HTMLButtonElement;
  private readonly titleBtn: HTMLButtonElement;

  // Cached values to avoid redundant DOM writes at 60 FPS
  private currentPhase: GamePhase | null = null;
  private lastStageId: StageId | null = null;
  private lastTimerRounded = -1;
  private lastTimerRatioKey = -1;
  private lastShotsUsed = -1;
  private lastMaxShots = -1;
  private lastVisibleCount = -1;
  private lastSmilingCount = -1;
  private lastTotalCount = -1;
  private lastVipOk: boolean | null = null;
  private lastQualityBucket = -1;
  private lastMuted: boolean | null = null;
  private lastZoomInt = -1;
  private lastCheeseActive: boolean | null = null;
  private lastCheeseRatioKey = -1;
  private lastCheeseSec = -1;
  private lastBestSignature = '';
  private lastTipText = '';
  private lastTipTone: 'neutral' | 'good' | 'warn' = 'neutral';
  private lastTipChangeMs = 0;
  private isZoomSliding = false;

  // Accurate NEW BEST tracking across rounds
  private roundStartBestScore = 0;

  // Result state
  private resultPhotos: CapturedPhoto[] = [];
  private resultPhotosRef: CapturedPhoto[] | null = null;
  private resultMaxShots = 5;
  private selectedPhotoIndex = 0;
  private bestPhotoIndex = 0;

  // Timers & cleanup
  private flashTimerId: number | null = null;
  private toastTimerId: number | null = null;
  private cheeseWaveTimerId: number | null = null;
  private readonly handleKeyDown: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement, callbacks: HudCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    this.root = document.createElement('div');
    this.root.className = 'zenin-ui-root';
    this.container.appendChild(this.root);

    // =========================================================================
    // A. TITLE SCREEN OVERLAY
    // =========================================================================
    this.titleScreen = document.createElement('section');
    this.titleScreen.id = 'screen-title';
    this.titleScreen.className = 'ui-layer screen-title';
    this.titleScreen.innerHTML = `
      <div class="title-card">
        <header class="title-header">
          <div class="title-emblem-wrap">
            <img src="./assets/camera-emblem.png" alt="全員、写れ！カメラロゴ" class="title-emblem" />
          </div>
          <div class="title-heading-group">
            <span class="title-kicker">3D ドタバタ集合写真ゲーム</span>
            <h1 class="title-logo">全員、写れ！</h1>
            <p class="title-tagline">カメラを動かして、ドタバタ集合写真を激写しよう！</p>
          </div>
        </header>

        <div class="stage-grid" role="radiogroup" aria-label="ステージ選択">
          ${this.buildStageCardMarkup('wedding')}
          ${this.buildStageCardMarkup('school_trip')}
        </div>

        <div class="title-cta-row">
          <button type="button" id="btn-start" class="btn-primary-coral btn-start">
            <span class="btn-icon">${ICON_CAMERA}</span>
            <span>撮影スタート！</span>
          </button>
        </div>

        <div class="micro-guide" aria-label="あそびかた">
          <div class="guide-step">
            <span class="guide-badge">1</span>
            <span class="guide-text">ドラッグで構図調整</span>
          </div>
          <div class="guide-step">
            <span class="guide-badge">2</span>
            <span class="guide-text">「はい、チーズ！」で目線誘導</span>
          </div>
          <div class="guide-step">
            <span class="guide-badge">3</span>
            <span class="guide-text">5枚のフィルムで最高の一枚を！</span>
          </div>
        </div>
      </div>
    `;
    this.root.appendChild(this.titleScreen);

    const weddingCard = this.titleScreen.querySelector(
      '#stage-card-wedding',
    ) as HTMLButtonElement;
    const schoolCard = this.titleScreen.querySelector(
      '#stage-card-school_trip',
    ) as HTMLButtonElement;
    this.stageCardEls = {
      wedding: weddingCard,
      school_trip: schoolCard,
    };
    this.stageBestEls = {
      wedding: weddingCard.querySelector('.stage-best-badge') as HTMLSpanElement,
      school_trip: schoolCard.querySelector('.stage-best-badge') as HTMLSpanElement,
    };
    this.startBtn = this.titleScreen.querySelector('#btn-start') as HTMLButtonElement;

    weddingCard.addEventListener('click', () => this.selectStage('wedding'));
    schoolCard.addEventListener('click', () => this.selectStage('school_trip'));
    weddingCard.addEventListener('dblclick', () => {
      this.selectStage('wedding');
      this.callbacks.onStartStage('wedding');
    });
    schoolCard.addEventListener('dblclick', () => {
      this.selectStage('school_trip');
      this.callbacks.onStartStage('school_trip');
    });
    this.startBtn.addEventListener('click', () => {
      this.startBtn.blur();
      this.callbacks.onStartStage(this.selectedStageId);
    });

    this.selectStage('wedding');

    // =========================================================================
    // B. LIVE CAMERA VIEWFINDER HUD
    // =========================================================================
    this.hudScreen = document.createElement('section');
    this.hudScreen.id = 'screen-hud';
    this.hudScreen.className = 'ui-layer screen-hud is-hidden';
    this.hudScreen.innerHTML = `
      <div class="viewfinder-chrome" aria-hidden="true">
        <div class="vf-safe-frame">
          <div class="vf-grid-v vf-grid-v1"></div>
          <div class="vf-grid-v vf-grid-v2"></div>
          <div class="vf-grid-h vf-grid-h1"></div>
          <div class="vf-grid-h vf-grid-h2"></div>
          <span class="vf-corner tl"></span>
          <span class="vf-corner tr"></span>
          <span class="vf-corner bl"></span>
          <span class="vf-corner br"></span>
          <span class="vf-ratio-badge">4:3</span>
        </div>
      </div>

      <div class="af-layer" aria-hidden="true"></div>

      <header class="hud-top-bar">
        <div class="hud-top-left">
          <span class="hud-pill stage-pill">ガーデンウェディング</span>

          <div class="hud-pill timer-pill" aria-label="残り時間">
            <svg class="timer-ring" viewBox="0 0 40 40" width="32" height="32" aria-hidden="true">
              <circle class="timer-ring-bg" cx="20" cy="20" r="${TIMER_RING_RADIUS}"></circle>
              <circle class="timer-ring-fg" cx="20" cy="20" r="${TIMER_RING_RADIUS}"
                stroke-dasharray="${TIMER_RING_CIRC.toFixed(2)}"
                stroke-dashoffset="0"></circle>
            </svg>
            <span class="timer-text">42s</span>
          </div>

          <div class="hud-pill film-pill" aria-label="残りフィルム">
            <span class="film-icon" aria-hidden="true">🎞</span>
            <div class="film-pips"></div>
            <span class="film-count-text">5/5</span>
          </div>
        </div>

        <div class="hud-top-center">
          <div class="hud-pill facelock-pill">
            <span class="facelock-emoji" aria-hidden="true">😊</span>
            <span class="facelock-count">0 / 0</span>
            <span class="facelock-vip">★ 主役OK</span>
            <div class="facelock-quality-track" aria-hidden="true">
              <div class="facelock-quality-fill"></div>
            </div>
          </div>
        </div>

        <div class="hud-top-right">
          <button type="button" id="btn-finish-early" class="hud-btn-finish is-hidden">
            現像へ
          </button>
          <button type="button" id="btn-mute" class="hud-btn-icon" aria-label="サウンド切替" title="サウンド切替">
            ${ICON_SOUND_ON}
          </button>
        </div>
      </header>

      <div class="hud-tip-row" aria-live="polite">
        <div class="hud-tip-pill">ドラッグで角度を変えて全員を写そう！</div>
      </div>

      <div class="polaroid-toast" aria-live="polite">
        <div class="toast-photo-frame">
          <img class="toast-img" alt="撮影したプレビュー写真" />
          <span class="toast-rank">S</span>
        </div>
        <div class="toast-meta">
          <span class="toast-score">88 pt</span>
          <div class="toast-caption">ナイスショット！</div>
        </div>
      </div>

      <footer class="hud-bottom-bar">
        <div class="hud-bottom-left">
          <div class="zoom-control-pill">
            <span class="zoom-end-label">WIDE</span>
            <input
              id="zoom-slider"
              class="zoom-slider"
              type="range"
              min="0"
              max="100"
              step="1"
              value="45"
              aria-label="ズーム調整"
            />
            <span class="zoom-end-label">TELE</span>
            <span class="zoom-readout">1.0x</span>
          </div>
        </div>

        <div class="hud-bottom-right">
          <div class="action-cluster">
            <div class="control-stack">
              <button type="button" id="btn-cheese" class="btn-cheese">
                <svg class="cheese-ring" viewBox="0 0 60 60" aria-hidden="true">
                  <circle class="cheese-ring-bg" cx="30" cy="30" r="${CHEESE_RING_RADIUS}"></circle>
                  <circle class="cheese-ring-fg" cx="30" cy="30" r="${CHEESE_RING_RADIUS}"
                    stroke-dasharray="${CHEESE_RING_CIRC.toFixed(2)}"
                    stroke-dashoffset="0"></circle>
                </svg>
                <span class="cheese-inner">
                  <span class="cheese-title">はい、チーズ！</span>
                  <span class="cheese-cd-label">READY</span>
                </span>
              </button>
              <span class="key-hint">Space</span>
            </div>

            <div class="control-stack">
              <button type="button" id="btn-shutter" class="btn-shutter" aria-label="シャッターを切る">
                <span class="shutter-outer-ring">
                  <span class="shutter-inner-dome">
                    ${ICON_CAMERA}
                  </span>
                </span>
                <span class="shutter-remain-badge">5</span>
              </button>
              <span class="key-hint">Enter</span>
            </div>
          </div>
        </div>
      </footer>

      <div class="cheese-wave" aria-hidden="true">
        <div class="cheese-wave-ring"></div>
        <div class="cheese-wave-ring cheese-wave-ring-2"></div>
        <div class="cheese-wave-label">「はい、チーズ！📸」</div>
      </div>

      <div class="shutter-flash" aria-hidden="true"></div>
    `;
    this.root.appendChild(this.hudScreen);

    this.afLayer = this.hudScreen.querySelector('.af-layer') as HTMLDivElement;
    this.stagePillEl = this.hudScreen.querySelector('.stage-pill') as HTMLSpanElement;
    this.timerPillEl = this.hudScreen.querySelector('.timer-pill') as HTMLDivElement;
    this.timerRingProgress = this.hudScreen.querySelector(
      '.timer-ring-fg',
    ) as unknown as SVGCircleElement;
    this.timerTextEl = this.hudScreen.querySelector('.timer-text') as HTMLSpanElement;
    this.filmPipsEl = this.hudScreen.querySelector('.film-pips') as HTMLDivElement;
    this.filmCountTextEl = this.hudScreen.querySelector(
      '.film-count-text',
    ) as HTMLSpanElement;
    this.faceLockBadgeEl = this.hudScreen.querySelector(
      '.facelock-pill',
    ) as HTMLDivElement;
    this.faceLockCountEl = this.hudScreen.querySelector(
      '.facelock-count',
    ) as HTMLSpanElement;
    this.faceLockVipEl = this.hudScreen.querySelector(
      '.facelock-vip',
    ) as HTMLSpanElement;
    this.qualityFillEl = this.hudScreen.querySelector(
      '.facelock-quality-fill',
    ) as HTMLDivElement;
    this.tipPillEl = this.hudScreen.querySelector('.hud-tip-pill') as HTMLDivElement;
    this.finishEarlyBtn = this.hudScreen.querySelector(
      '#btn-finish-early',
    ) as HTMLButtonElement;
    this.muteBtn = this.hudScreen.querySelector('#btn-mute') as HTMLButtonElement;
    this.zoomSlider = this.hudScreen.querySelector('#zoom-slider') as HTMLInputElement;
    this.zoomReadoutEl = this.hudScreen.querySelector(
      '.zoom-readout',
    ) as HTMLSpanElement;
    this.cheeseBtn = this.hudScreen.querySelector('#btn-cheese') as HTMLButtonElement;
    this.cheeseRingProgress = this.hudScreen.querySelector(
      '.cheese-ring-fg',
    ) as unknown as SVGCircleElement;
    this.cheeseCdLabel = this.hudScreen.querySelector(
      '.cheese-cd-label',
    ) as HTMLSpanElement;
    this.shutterBtn = this.hudScreen.querySelector('#btn-shutter') as HTMLButtonElement;
    this.shutterRemainEl = this.hudScreen.querySelector(
      '.shutter-remain-badge',
    ) as HTMLSpanElement;
    this.shutterFlashEl = this.hudScreen.querySelector(
      '.shutter-flash',
    ) as HTMLDivElement;
    this.polaroidToastEl = this.hudScreen.querySelector(
      '.polaroid-toast',
    ) as HTMLDivElement;
    this.toastImgEl = this.hudScreen.querySelector('.toast-img') as HTMLImageElement;
    this.toastRankEl = this.hudScreen.querySelector('.toast-rank') as HTMLSpanElement;
    this.toastScoreEl = this.hudScreen.querySelector('.toast-score') as HTMLSpanElement;
    this.toastCaptionEl = this.hudScreen.querySelector(
      '.toast-caption',
    ) as HTMLDivElement;
    this.cheeseWaveEl = this.hudScreen.querySelector('.cheese-wave') as HTMLDivElement;

    // Pre-allocate reusable pool of 16 Face-AF boxes for zero-churn 60 FPS updates
    for (let i = 0; i < AF_POOL_SIZE; i++) {
      const boxEl = document.createElement('div');
      boxEl.className = 'af-box af-good';
      boxEl.innerHTML = `
        <span class="af-c tl"></span>
        <span class="af-c tr"></span>
        <span class="af-c bl"></span>
        <span class="af-c br"></span>
        <span class="af-vip" aria-hidden="true">★</span>
        <span class="af-tag"></span>
      `;
      this.afLayer.appendChild(boxEl);
      this.afPool.push({
        root: boxEl,
        tag: boxEl.querySelector('.af-tag') as HTMLSpanElement,
        active: false,
        lastSize: 0,
        lastStatus: 'good',
        lastIsVip: false,
        lastLabel: '',
      });
    }

    // Bind Live HUD controls
    this.zoomSlider.addEventListener('pointerdown', () => {
      this.isZoomSliding = true;
    });
    this.zoomSlider.addEventListener('pointerup', () => {
      this.isZoomSliding = false;
      this.zoomSlider.blur();
    });
    this.zoomSlider.addEventListener('pointercancel', () => {
      this.isZoomSliding = false;
    });
    this.zoomSlider.addEventListener('input', () => {
      const val = Number(this.zoomSlider.value);
      this.lastZoomInt = val;
      this.updateZoomReadout(val);
      this.callbacks.onZoomChange(val / 100);
    });

    this.cheeseBtn.addEventListener('click', () => {
      this.cheeseBtn.blur();
      this.callbacks.onSayCheese();
    });

    this.shutterBtn.addEventListener('click', () => {
      this.shutterBtn.blur();
      this.pulseShutterButton();
      this.callbacks.onShutter();
    });

    this.finishEarlyBtn.addEventListener('click', () => {
      this.finishEarlyBtn.blur();
      this.callbacks.onFinishEarly();
    });

    this.muteBtn.addEventListener('click', () => {
      this.muteBtn.blur();
      this.callbacks.onToggleMute();
    });

    // =========================================================================
    // C. RESULT PHOTO ALBUM SCREEN
    // =========================================================================
    this.resultScreen = document.createElement('section');
    this.resultScreen.id = 'screen-result';
    this.resultScreen.className = 'ui-layer screen-result is-hidden';
    this.resultScreen.innerHTML = `
      <div class="album-shell">
        <header class="album-header">
          <div class="album-header-left">
            <span class="album-kicker">PHOTO ALBUM</span>
            <h2 class="album-title">現像アルバム</h2>
            <span class="album-stage-chip">ガーデンウェディング</span>
          </div>
          <div class="album-header-right">
            <span class="album-best-tag is-hidden">★ NEW BEST!</span>
          </div>
        </header>

        <div class="album-workspace">
          <div class="album-left-col">
            <div class="polaroid-stage">
              <div class="polaroid-print-wrap">
                <span class="tape-sticker tape-tl" aria-hidden="true"></span>
                <span class="tape-sticker tape-tr" aria-hidden="true"></span>
                <img class="polaroid-print-img" alt="撮影した記念写真のポラロイドプリント" />
              </div>
              <div class="polaroid-empty-state is-hidden">
                <div class="empty-camera-emoji">📷</div>
                <p class="empty-title">フィルムが空っぽです！</p>
                <p class="empty-sub">もう一度シャッターを切って最高の一枚を残そう。</p>
              </div>
            </div>

            <div class="filmstrip-wrap">
              <div class="filmstrip-header">
                <span class="filmstrip-label">🎞 撮影したフィルム（クリックで切替）</span>
              </div>
              <div class="filmstrip-list" role="listbox" aria-label="撮影した写真一覧"></div>
            </div>
          </div>

          <aside class="album-inspector-card">
            <div class="score-hero">
              <div class="rank-seal rank-a">A</div>
              <div class="score-hero-copy">
                <div class="score-total-row">
                  <span class="score-total-num">0</span>
                  <span class="score-total-denom">/ 100 pt</span>
                </div>
                <h3 class="result-caption">ナイスショット！</h3>
                <p class="result-subcaption">みんなバッチリ写っています！</p>
              </div>
            </div>

            <div class="comedy-award-banner is-hidden">
              <span class="comedy-award-badge"></span>
              <span class="comedy-award-reason"></span>
            </div>

            <div class="breakdown-section">
              <div class="breakdown-row">
                <div class="breakdown-label-row">
                  <span class="breakdown-name">全員写り</span>
                  <span class="breakdown-val val-coverage">0 / 40</span>
                </div>
                <div class="breakdown-track"><div class="breakdown-fill fill-coverage"></div></div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-label-row">
                  <span class="breakdown-name">表情・目線</span>
                  <span class="breakdown-val val-expression">0 / 30</span>
                </div>
                <div class="breakdown-track"><div class="breakdown-fill fill-expression"></div></div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-label-row">
                  <span class="breakdown-name">構図バランス</span>
                  <span class="breakdown-val val-composition">0 / 20</span>
                </div>
                <div class="breakdown-track"><div class="breakdown-fill fill-composition"></div></div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-label-row">
                  <span class="breakdown-name">シャッターチャンス</span>
                  <span class="breakdown-val val-moment">0 / 10</span>
                </div>
                <div class="breakdown-track"><div class="breakdown-fill fill-moment"></div></div>
              </div>
            </div>

            <div class="verdicts-section">
              <div class="verdicts-header">被写体チェック</div>
              <div class="verdicts-list"></div>
            </div>

            <div class="album-actions">
              <button type="button" id="btn-replay" class="btn-primary-coral">
                ${ICON_REPLAY}
                <span>もう一度撮る！</span>
              </button>
              <button type="button" id="btn-download-photo" class="btn-secondary-cream">
                ${ICON_DOWNLOAD}
                <span>写真を保存 (PNG)</span>
              </button>
              <button type="button" id="btn-title" class="btn-ghost-warm">
                ${ICON_HOME}
                <span>ステージ選択</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    `;
    this.root.appendChild(this.resultScreen);

    this.resultStageTitleEl = this.resultScreen.querySelector(
      '.album-stage-chip',
    ) as HTMLSpanElement;
    this.resultBestTagEl = this.resultScreen.querySelector(
      '.album-best-tag',
    ) as HTMLSpanElement;
    this.resultPolaroidWrap = this.resultScreen.querySelector(
      '.polaroid-print-wrap',
    ) as HTMLDivElement;
    this.resultPolaroidImg = this.resultScreen.querySelector(
      '.polaroid-print-img',
    ) as HTMLImageElement;
    this.resultEmptyState = this.resultScreen.querySelector(
      '.polaroid-empty-state',
    ) as HTMLDivElement;
    this.filmstripEl = this.resultScreen.querySelector(
      '.filmstrip-list',
    ) as HTMLDivElement;
    this.resultRankSeal = this.resultScreen.querySelector(
      '.rank-seal',
    ) as HTMLDivElement;
    this.resultScoreNum = this.resultScreen.querySelector(
      '.score-total-num',
    ) as HTMLSpanElement;
    this.resultCaptionEl = this.resultScreen.querySelector(
      '.result-caption',
    ) as HTMLHeadingElement;
    this.resultSubCaptionEl = this.resultScreen.querySelector(
      '.result-subcaption',
    ) as HTMLParagraphElement;
    this.comedyAwardBanner = this.resultScreen.querySelector(
      '.comedy-award-banner',
    ) as HTMLDivElement;
    this.comedyAwardBadge = this.resultScreen.querySelector(
      '.comedy-award-badge',
    ) as HTMLSpanElement;
    this.comedyAwardReason = this.resultScreen.querySelector(
      '.comedy-award-reason',
    ) as HTMLSpanElement;
    this.barCoverageFill = this.resultScreen.querySelector(
      '.fill-coverage',
    ) as HTMLDivElement;
    this.barCoverageVal = this.resultScreen.querySelector(
      '.val-coverage',
    ) as HTMLSpanElement;
    this.barExpressionFill = this.resultScreen.querySelector(
      '.fill-expression',
    ) as HTMLDivElement;
    this.barExpressionVal = this.resultScreen.querySelector(
      '.val-expression',
    ) as HTMLSpanElement;
    this.barCompositionFill = this.resultScreen.querySelector(
      '.fill-composition',
    ) as HTMLDivElement;
    this.barCompositionVal = this.resultScreen.querySelector(
      '.val-composition',
    ) as HTMLSpanElement;
    this.barMomentFill = this.resultScreen.querySelector(
      '.fill-moment',
    ) as HTMLDivElement;
    this.barMomentVal = this.resultScreen.querySelector(
      '.val-moment',
    ) as HTMLSpanElement;
    this.verdictListEl = this.resultScreen.querySelector(
      '.verdicts-list',
    ) as HTMLDivElement;
    this.downloadBtn = this.resultScreen.querySelector(
      '#btn-download-photo',
    ) as HTMLButtonElement;
    this.replayBtn = this.resultScreen.querySelector(
      '#btn-replay',
    ) as HTMLButtonElement;
    this.titleBtn = this.resultScreen.querySelector('#btn-title') as HTMLButtonElement;

    this.downloadBtn.addEventListener('click', () => this.downloadSelectedPhoto());
    this.replayBtn.addEventListener('click', () => this.callbacks.onReplay());
    this.titleBtn.addEventListener('click', () => this.callbacks.onReturnTitle());

    // Keyboard shortcuts during live play: Space -> Say Cheese, Enter -> Shutter
    this.handleKeyDown = this.onKeyDown.bind(this);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  public render(snapshot: GameHudSnapshot): void {
    // 1. Handle phase transitions cleanly
    if (this.currentPhase !== snapshot.phase) {
      const prevPhase = this.currentPhase;
      this.currentPhase = snapshot.phase;

      this.titleScreen.classList.toggle('is-hidden', snapshot.phase !== 'title');
      this.hudScreen.classList.toggle('is-hidden', snapshot.phase !== 'playing');
      this.resultScreen.classList.toggle('is-hidden', snapshot.phase !== 'result');

      if (snapshot.phase === 'title' && prevPhase !== null) {
        this.selectStage(snapshot.stageId);
      }

      if (snapshot.phase === 'playing') {
        // Capture pre-round best score BEFORE any shots in this round update it!
        this.roundStartBestScore = snapshot.bestScoreByStage[snapshot.stageId] ?? 0;
        this.lastTipChangeMs = 0;
      }

      if (snapshot.phase !== 'playing') {
        this.hideAllAfBoxes();
        this.polaroidToastEl.classList.remove('is-visible');
      }

      if (snapshot.phase === 'result') {
        this.populateResultScreen(snapshot);
      }
    }

    // 2. Render active phase
    if (snapshot.phase === 'title') {
      this.updateTitleScores(snapshot.bestScoreByStage);
      return;
    }

    if (snapshot.phase === 'result') {
      if (this.resultPhotosRef !== snapshot.photos) {
        this.populateResultScreen(snapshot);
      }
      return;
    }

    // phase === 'playing'
    this.renderLiveHud(snapshot);
  }

  public triggerShutterFlash(photo: CapturedPhoto): void {
    this.pulseShutterButton();

    // Crisp 220ms camera white flash
    if (this.flashTimerId !== null) {
      window.clearTimeout(this.flashTimerId);
    }
    this.shutterFlashEl.classList.remove('is-flashing');
    void this.shutterFlashEl.offsetWidth;
    this.shutterFlashEl.classList.add('is-flashing');
    this.flashTimerId = window.setTimeout(() => {
      this.shutterFlashEl.classList.remove('is-flashing');
      this.flashTimerId = null;
    }, 240);

    // Mini Polaroid preview toast sliding into bottom-left for 2.6 seconds
    this.toastImgEl.src = photo.rawDataUrl || photo.polaroidDataUrl;
    this.toastRankEl.textContent = photo.score.rank;
    this.toastRankEl.className = `toast-rank ${rankClassName(photo.score.rank)}`;
    this.toastScoreEl.textContent = `${photo.score.totalScore} pt`;
    this.toastCaptionEl.textContent = photo.score.caption;

    if (this.toastTimerId !== null) {
      window.clearTimeout(this.toastTimerId);
    }
    this.polaroidToastEl.classList.remove('is-visible');
    void this.polaroidToastEl.offsetWidth;
    this.polaroidToastEl.classList.add('is-visible');
    this.toastTimerId = window.setTimeout(() => {
      this.polaroidToastEl.classList.remove('is-visible');
      this.toastTimerId = null;
    }, 2600);
  }

  public triggerCheeseWave(): void {
    if (this.cheeseWaveTimerId !== null) {
      window.clearTimeout(this.cheeseWaveTimerId);
    }
    this.cheeseWaveEl.classList.remove('is-bursting');
    void this.cheeseWaveEl.offsetWidth;
    this.cheeseWaveEl.classList.add('is-bursting');
    this.cheeseWaveTimerId = window.setTimeout(() => {
      this.cheeseWaveEl.classList.remove('is-bursting');
      this.cheeseWaveTimerId = null;
    }, 920);
  }

  public dispose(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.flashTimerId !== null) window.clearTimeout(this.flashTimerId);
    if (this.toastTimerId !== null) window.clearTimeout(this.toastTimerId);
    if (this.cheeseWaveTimerId !== null) window.clearTimeout(this.cheeseWaveTimerId);
    this.root.remove();
  }

  // ===========================================================================
  // PRIVATE: TITLE HELPERS
  // ===========================================================================
  private buildStageCardMarkup(stageId: StageId): string {
    const spec = STAGES[stageId];
    const overlay = STAGE_OVERLAY_COPY[stageId];
    return `
      <button
        type="button"
        id="stage-card-${stageId}"
        class="stage-card"
        role="radio"
        aria-checked="false"
      >
        <div class="stage-thumb-wrap">
          <img src="${STAGE_THUMBS[stageId]}" alt="${spec.title}" class="stage-thumb" />
          <div class="stage-thumb-overlay stage-overlay-${stageId}" aria-hidden="true">
            <span class="stage-overlay-top">${overlay.top}</span>
            <span class="stage-overlay-main">${overlay.main}</span>
          </div>
          <span class="stage-count-chip">${spec.roster.length}人</span>
          <span class="stage-best-badge">NEW</span>
        </div>
        <div class="stage-card-body">
          <div class="stage-card-title-row">
            <span class="stage-card-title">${spec.title}</span>
            <span class="stage-check-dot" aria-hidden="true">✓</span>
          </div>
          <span class="stage-card-subtitle">${spec.subtitle}</span>
        </div>
      </button>
    `;
  }

  private selectStage(stageId: StageId): void {
    this.selectedStageId = stageId;
    const ids: StageId[] = ['wedding', 'school_trip'];
    for (const id of ids) {
      const selected = id === stageId;
      this.stageCardEls[id].classList.toggle('is-selected', selected);
      this.stageCardEls[id].setAttribute('aria-checked', selected ? 'true' : 'false');
    }
  }

  private updateTitleScores(bestByStage: Record<StageId, number>): void {
    const sig = `${bestByStage.wedding ?? 0}|${bestByStage.school_trip ?? 0}`;
    if (sig === this.lastBestSignature) return;
    this.lastBestSignature = sig;

    const ids: StageId[] = ['wedding', 'school_trip'];
    for (const id of ids) {
      const score = Math.round(bestByStage[id] ?? 0);
      const badge = this.stageBestEls[id];
      if (score > 0) {
        badge.textContent = `BEST ${score}pt`;
        badge.classList.add('has-score');
      } else {
        badge.textContent = 'NEW';
        badge.classList.remove('has-score');
      }
    }
  }

  // ===========================================================================
  // PRIVATE: LIVE HUD RENDERING (60 FPS ZERO-CHURN)
  // ===========================================================================
  private renderLiveHud(snapshot: GameHudSnapshot): void {
    // Stage pill
    if (this.lastStageId !== snapshot.stageId) {
      this.lastStageId = snapshot.stageId;
      this.stagePillEl.textContent = STAGES[snapshot.stageId].title;
    }

    // Timer numeric + ring
    const secCeil = Math.max(0, Math.ceil(snapshot.timeRemaining));
    if (secCeil !== this.lastTimerRounded) {
      this.lastTimerRounded = secCeil;
      this.timerTextEl.textContent = `${secCeil}s`;
      this.timerPillEl.classList.toggle('is-urgent', secCeil <= 10 && secCeil > 0);
    }

    const duration = Math.max(1, snapshot.roundDuration);
    const ratio = Math.max(0, Math.min(1, snapshot.timeRemaining / duration));
    const ratioKey = Math.round(ratio * 200);
    if (ratioKey !== this.lastTimerRatioKey) {
      this.lastTimerRatioKey = ratioKey;
      const offset = TIMER_RING_CIRC * (1 - ratio);
      this.timerRingProgress.style.strokeDashoffset = offset.toFixed(2);
    }

    // Film roll pips & Shutter remaining badge & Finish Early visibility
    if (
      snapshot.maxShots !== this.lastMaxShots ||
      snapshot.shotsUsed !== this.lastShotsUsed
    ) {
      if (snapshot.maxShots !== this.lastMaxShots) {
        this.rebuildFilmPips(snapshot.maxShots);
        this.lastMaxShots = snapshot.maxShots;
      }
      this.lastShotsUsed = snapshot.shotsUsed;
      const remaining = Math.max(0, snapshot.maxShots - snapshot.shotsUsed);

      for (let i = 0; i < this.filmPipNodes.length; i++) {
        this.filmPipNodes[i].classList.toggle('is-spent', i >= remaining);
      }
      this.filmCountTextEl.textContent = `${remaining}/${snapshot.maxShots}`;
      this.shutterRemainEl.textContent = String(remaining);
      this.shutterBtn.disabled = remaining <= 0;
      this.finishEarlyBtn.classList.toggle('is-hidden', snapshot.shotsUsed < 1);
    }

    // Face-Lock summary badge
    const m = snapshot.liveMetrics;
    if (
      m.visibleCount !== this.lastVisibleCount ||
      m.totalCount !== this.lastTotalCount ||
      m.smilingCount !== this.lastSmilingCount
    ) {
      this.lastVisibleCount = m.visibleCount;
      this.lastTotalCount = m.totalCount;
      this.lastSmilingCount = m.smilingCount;
      this.faceLockCountEl.textContent = `${m.visibleCount} / ${m.totalCount}`;
      const allVisible = m.totalCount > 0 && m.visibleCount >= m.totalCount;
      this.faceLockBadgeEl.classList.toggle('is-all-in', allVisible);
    }

    const vipOk = m.vipTotalCount > 0 && m.vipVisibleCount >= m.vipTotalCount;
    if (vipOk !== this.lastVipOk) {
      this.lastVipOk = vipOk;
      this.faceLockVipEl.textContent = vipOk ? '★ 主役OK' : '★ 主役!';
      this.faceLockVipEl.classList.toggle('is-warn', !vipOk);
    }

    const qBucket = Math.round(Math.max(0, Math.min(100, m.estimatedQuality)) / 2) * 2;
    if (qBucket !== this.lastQualityBucket) {
      this.lastQualityBucket = qBucket;
      this.qualityFillEl.style.width = `${qBucket}%`;
    }

    // Dynamic contextual photographer tip
    this.updateContextualTip(m);

    // Sound mute icon
    if (snapshot.muted !== this.lastMuted) {
      this.lastMuted = snapshot.muted;
      this.muteBtn.innerHTML = snapshot.muted ? ICON_SOUND_OFF : ICON_SOUND_ON;
      this.muteBtn.classList.toggle('is-muted', snapshot.muted);
      this.muteBtn.setAttribute(
        'aria-label',
        snapshot.muted ? 'サウンドONにする' : 'サウンドOFFにする',
      );
    }

    // Zoom slider sync
    const zoomInt = Math.round(Math.max(0, Math.min(100, snapshot.zoomPercent)));
    if (!this.isZoomSliding && zoomInt !== this.lastZoomInt) {
      this.lastZoomInt = zoomInt;
      this.zoomSlider.value = String(zoomInt);
      this.updateZoomReadout(zoomInt);
    }

    // Say Cheese cooldown ring
    const cheeseReady = snapshot.cheeseCooldown <= 0.02;
    if (cheeseReady !== this.lastCheeseActive) {
      this.lastCheeseActive = cheeseReady;
      this.cheeseBtn.classList.toggle('is-cooling', !cheeseReady);
      this.cheeseBtn.disabled = !cheeseReady;
    }

    const maxCd = Math.max(0.1, snapshot.cheeseMaxCooldown);
    const cdProgress = cheeseReady
      ? 1
      : Math.max(0, Math.min(1, 1 - snapshot.cheeseCooldown / maxCd));
    const cdKey = Math.round(cdProgress * 120);
    if (cdKey !== this.lastCheeseRatioKey) {
      this.lastCheeseRatioKey = cdKey;
      const offset = CHEESE_RING_CIRC * (1 - cdProgress);
      this.cheeseRingProgress.style.strokeDashoffset = offset.toFixed(2);
    }

    const cdSec = cheeseReady ? 0 : Math.ceil(snapshot.cheeseCooldown);
    if (cdSec !== this.lastCheeseSec) {
      this.lastCheeseSec = cdSec;
      this.cheeseCdLabel.textContent = cheeseReady ? 'READY' : `${cdSec}s`;
    }

    // Update pooled Face-AF corner brackets
    this.updateFaceAfBoxes(m.faceBoxes);
  }

  private updateContextualTip(m: LiveCameraMetrics): void {
    const now = performance.now();
    // Rate-limit tip swaps slightly so text stays calm and readable
    if (this.lastTipChangeMs > 0 && now - this.lastTipChangeMs < 650) {
      return;
    }

    let nextText = 'ドラッグで構図調整・ズームで全員を収めよう！';
    let nextTone: 'neutral' | 'good' | 'warn' = 'neutral';

    const missingCount = Math.max(0, m.totalCount - m.visibleCount);
    const vipMissing = m.vipTotalCount > 0 && m.vipVisibleCount < m.vipTotalCount;

    let hasBlinker = false;
    let hasFallen = false;
    for (let i = 0; i < m.faceBoxes.length; i++) {
      const lbl = m.faceBoxes[i].label;
      if (!lbl) continue;
      if (lbl.includes('まばたき') || lbl.includes('眠') || lbl.includes('よそ見')) {
        hasBlinker = true;
      }
      if (lbl.includes('転倒') || lbl.includes('ドミノ')) {
        hasFallen = true;
      }
    }

    if (vipMissing) {
      nextText = '★ 主役が隠れています！カメラを動かして写そう！';
      nextTone = 'warn';
    } else if (missingCount >= 2) {
      nextText = 'ドラッグで角度を変えて顔を出そう！';
      nextTone = 'warn';
    } else if (hasBlinker) {
      nextText = '「はい、チーズ！」かカメラ振りで起こそう！';
      nextTone = 'warn';
    } else if (hasFallen) {
      nextText = '転倒発生！起き上がりを待つかネタ写真で激写！';
      nextTone = 'neutral';
    } else if (m.totalCount > 0 && m.visibleCount >= m.totalCount) {
      nextText = '今がシャッターチャンス！📸';
      nextTone = 'good';
    }

    if (nextText !== this.lastTipText || nextTone !== this.lastTipTone) {
      this.lastTipText = nextText;
      this.lastTipTone = nextTone;
      this.lastTipChangeMs = now;
      this.tipPillEl.textContent = nextText;
      this.tipPillEl.classList.toggle('is-good', nextTone === 'good');
      this.tipPillEl.classList.toggle('is-warn', nextTone === 'warn');
    }
  }

  private rebuildFilmPips(maxShots: number): void {
    this.filmPipsEl.innerHTML = '';
    this.filmPipNodes.length = 0;
    for (let i = 0; i < maxShots; i++) {
      const pip = document.createElement('span');
      pip.className = 'film-pip';
      this.filmPipsEl.appendChild(pip);
      this.filmPipNodes.push(pip);
    }
  }

  private updateZoomReadout(zoomInt: number): void {
    // Map 0..100 -> 0.8x..2.2x photographic feel readout
    const mag = 0.8 + (zoomInt / 100) * 1.4;
    this.zoomReadoutEl.textContent = `${mag.toFixed(1)}x`;
  }

  private updateFaceAfBoxes(boxes: LiveFaceBox[]): void {
    const vw = this.container.clientWidth || window.innerWidth;
    const vh = this.container.clientHeight || window.innerHeight;
    const refDim = Math.min(vw, vh);

    const count = Math.min(boxes.length, AF_POOL_SIZE);

    for (let i = 0; i < AF_POOL_SIZE; i++) {
      const pooled = this.afPool[i];
      if (i >= count) {
        if (pooled.active) {
          pooled.active = false;
          pooled.root.classList.remove('is-active');
        }
        continue;
      }

      const b = boxes[i];
      const onScreen =
        b.status !== 'hidden' &&
        b.screenX >= -0.06 &&
        b.screenX <= 1.06 &&
        b.screenY >= -0.06 &&
        b.screenY <= 1.06;

      if (!onScreen) {
        if (pooled.active) {
          pooled.active = false;
          pooled.root.classList.remove('is-active');
        }
        continue;
      }

      const sizePx = Math.max(
        34,
        Math.min(118, Math.round(b.boxSize * refDim * 1.15)),
      );
      const tx = b.screenX * vw - sizePx * 0.5;
      const ty = b.screenY * vh - sizePx * 0.5;

      pooled.root.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;

      if (sizePx !== pooled.lastSize) {
        pooled.lastSize = sizePx;
        pooled.root.style.width = `${sizePx}px`;
        pooled.root.style.height = `${sizePx}px`;
      }

      if (b.status !== pooled.lastStatus) {
        pooled.root.classList.remove('af-good', 'af-warn', 'af-bad');
        pooled.root.classList.add(`af-${b.status}`);
        pooled.lastStatus = b.status;
      }

      if (b.isVip !== pooled.lastIsVip) {
        pooled.lastIsVip = b.isVip;
        pooled.root.classList.toggle('is-vip', b.isVip);
      }

      // Show ultra-compact status pill ONLY for warn & bad boxes (keep good faces clean!)
      const labelText =
        b.status === 'warn' || b.status === 'bad' ? (b.label ?? '') : '';
      if (labelText !== pooled.lastLabel) {
        pooled.lastLabel = labelText;
        pooled.tag.textContent = labelText;
        pooled.root.classList.toggle('has-tag', labelText.length > 0);
      }

      if (!pooled.active) {
        pooled.active = true;
        pooled.root.classList.add('is-active');
      }
    }
  }

  private hideAllAfBoxes(): void {
    for (const pooled of this.afPool) {
      if (pooled.active) {
        pooled.active = false;
        pooled.root.classList.remove('is-active');
      }
    }
  }

  private pulseShutterButton(): void {
    this.shutterBtn.classList.remove('is-pressed');
    void this.shutterBtn.offsetWidth;
    this.shutterBtn.classList.add('is-pressed');
    window.setTimeout(() => {
      this.shutterBtn.classList.remove('is-pressed');
    }, 150);
  }

  // ===========================================================================
  // PRIVATE: RESULT ALBUM RENDERING
  // ===========================================================================
  private populateResultScreen(snapshot: GameHudSnapshot): void {
    this.resultPhotosRef = snapshot.photos;
    this.resultPhotos = snapshot.photos;
    this.resultMaxShots = Math.max(
      snapshot.maxShots || STAGES[snapshot.stageId].maxShots || 5,
      this.resultPhotos.length,
    );

    this.resultStageTitleEl.textContent = STAGES[snapshot.stageId].title;

    if (this.resultPhotos.length === 0) {
      this.resultPolaroidWrap.classList.add('is-hidden');
      this.resultEmptyState.classList.remove('is-hidden');
      this.buildFilmstrip();
      this.resultBestTagEl.classList.add('is-hidden');
      this.downloadBtn.disabled = true;

      this.resultRankSeal.textContent = 'C';
      this.resultRankSeal.className = 'rank-seal rank-c';
      this.resultScoreNum.textContent = '0';
      this.resultCaptionEl.textContent = 'シャッターチャンスを逃した！';
      this.resultSubCaptionEl.textContent =
        '制限時間内にシャッターを切って、みんなを写してみよう！';
      this.comedyAwardBanner.classList.add('is-hidden');
      this.setBreakdownBars(0, 0, 0, 0);
      this.verdictListEl.innerHTML = '';
      return;
    }

    this.resultPolaroidWrap.classList.remove('is-hidden');
    this.resultEmptyState.classList.add('is-hidden');
    this.downloadBtn.disabled = false;

    // Identify highest-scoring photo in this round
    let bestIdx = 0;
    let bestScore = -1;
    for (let i = 0; i < this.resultPhotos.length; i++) {
      const s = this.resultPhotos[i].score.totalScore;
      if (s > bestScore) {
        bestScore = s;
        bestIdx = i;
      }
    }
    this.bestPhotoIndex = bestIdx;
    this.selectedPhotoIndex = bestIdx;

    // Strictly check if this round BEAT the pre-round best score (no false NEW BEST on ties!)
    const isGenuineNewBest =
      bestScore > 0 && bestScore > this.roundStartBestScore;
    this.resultBestTagEl.classList.toggle('is-hidden', !isGenuineNewBest);

    this.buildFilmstrip();
    this.selectResultPhoto(this.selectedPhotoIndex);
  }

  private buildFilmstrip(): void {
    this.filmstripEl.innerHTML = '';
    const slotCount = Math.max(5, this.resultMaxShots);

    for (let idx = 0; idx < slotCount; idx++) {
      if (idx < this.resultPhotos.length) {
        const photo = this.resultPhotos[idx];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filmstrip-item';
        btn.setAttribute('role', 'option');
        btn.dataset.index = String(idx);

        const isBest = idx === this.bestPhotoIndex;
        btn.innerHTML = `
          <div class="filmstrip-thumb-wrap">
            <img src="${photo.rawDataUrl || photo.polaroidDataUrl}" alt="ショット #${photo.shotIndex}" class="filmstrip-thumb" />
            ${isBest ? '<span class="filmstrip-best-star">★ BEST</span>' : ''}
            <span class="filmstrip-shot-num">#${photo.shotIndex}</span>
          </div>
          <div class="filmstrip-foot">
            <span class="filmstrip-rank ${rankClassName(photo.score.rank)}">${photo.score.rank}</span>
            <span class="filmstrip-pts">${photo.score.totalScore}pt</span>
          </div>
        `;

        btn.addEventListener('click', () => this.selectResultPhoto(idx));
        this.filmstripEl.appendChild(btn);
      } else {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'filmstrip-item filmstrip-empty';
        emptySlot.setAttribute('aria-hidden', 'true');
        emptySlot.innerHTML = `
          <div class="filmstrip-empty-frame">
            <span class="filmstrip-empty-num">#${idx + 1}</span>
          </div>
          <div class="filmstrip-foot filmstrip-foot-empty">
            <span>未使用</span>
          </div>
        `;
        this.filmstripEl.appendChild(emptySlot);
      }
    }
  }

  private selectResultPhoto(index: number): void {
    if (index < 0 || index >= this.resultPhotos.length) return;
    this.selectedPhotoIndex = index;
    const photo = this.resultPhotos[index];
    const score = photo.score;

    // Highlight active filmstrip thumbnail
    const items = this.filmstripEl.querySelectorAll('button.filmstrip-item');
    items.forEach((el, i) => {
      const active = i === index;
      el.classList.toggle('is-selected', active);
      el.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // Big Polaroid print
    this.resultPolaroidImg.src = photo.polaroidDataUrl || photo.rawDataUrl;
    this.resultPolaroidImg.alt = `ショット #${photo.shotIndex} ${score.caption}`;

    // Score & Rank Seal
    this.resultRankSeal.textContent = score.rank;
    this.resultRankSeal.className = `rank-seal ${rankClassName(score.rank)}`;
    this.resultScoreNum.textContent = String(score.totalScore);
    this.resultCaptionEl.textContent = score.caption;
    this.resultSubCaptionEl.textContent = score.subCaption;

    // Comedy Award Banner
    if (score.comedyAward) {
      this.comedyAwardBadge.textContent = score.comedyAward.badge;
      this.comedyAwardReason.textContent = score.comedyAward.reason;
      this.comedyAwardBanner.classList.remove('is-hidden');
    } else {
      this.comedyAwardBanner.classList.add('is-hidden');
    }

    // 4-Bar Breakdown
    this.setBreakdownBars(
      score.coverageScore,
      score.expressionScore,
      score.compositionScore,
      score.momentScore,
    );

    // Subject Verdict Chips
    this.renderVerdictChips(score.verdicts);
  }

  private setBreakdownBars(
    coverage: number,
    expression: number,
    composition: number,
    moment: number,
  ): void {
    const cov = Math.max(0, Math.min(40, Math.round(coverage)));
    const exp = Math.max(0, Math.min(30, Math.round(expression)));
    const comp = Math.max(0, Math.min(20, Math.round(composition)));
    const mom = Math.max(0, Math.min(10, Math.round(moment)));

    this.barCoverageVal.textContent = `${cov} / 40`;
    this.barCoverageFill.style.width = `${(cov / 40) * 100}%`;

    this.barExpressionVal.textContent = `${exp} / 30`;
    this.barExpressionFill.style.width = `${(exp / 30) * 100}%`;

    this.barCompositionVal.textContent = `${comp} / 20`;
    this.barCompositionFill.style.width = `${(comp / 20) * 100}%`;

    this.barMomentVal.textContent = `${mom} / 10`;
    this.barMomentFill.style.width = `${(mom / 10) * 100}%`;
  }

  private renderVerdictChips(verdicts: NpcPhotoVerdict[]): void {
    this.verdictListEl.innerHTML = '';

    const sorted = [...verdicts].sort((a, b) => {
      const weight = (v: NpcPhotoVerdict): number => {
        const cls = classifyVerdict(v);
        let w = 0;
        if (v.isVip) w -= 20;
        if (cls === 'bad') w -= 10;
        else if (cls === 'warn') w -= 5;
        return w;
      };
      return weight(a) - weight(b);
    });

    const frag = document.createDocumentFragment();
    for (const v of sorted) {
      const cls = classifyVerdict(v);
      const icon = cls === 'good' ? '✓' : cls === 'warn' ? '⚠' : '✕';
      const chip = document.createElement('span');
      chip.className = `verdict-chip verdict-${cls}`;

      const iconEl = document.createElement('span');
      iconEl.className = 'verdict-icon';
      iconEl.textContent = icon;

      const nameEl = document.createElement('span');
      nameEl.className = 'verdict-name';
      nameEl.textContent = v.isVip ? `★${v.name}` : v.name;

      const tagEl = document.createElement('span');
      tagEl.className = 'verdict-tag';
      tagEl.textContent = v.tag;

      chip.append(iconEl, nameEl, tagEl);
      frag.appendChild(chip);
    }
    this.verdictListEl.appendChild(frag);
  }

  private downloadSelectedPhoto(): void {
    const photo = this.resultPhotos[this.selectedPhotoIndex];
    if (!photo) return;
    const dataUrl = photo.polaroidDataUrl || photo.rawDataUrl;
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `zenin-utsure-shot-${photo.shotIndex}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (this.currentPhase !== 'playing') return;
    if (e.repeat || e.defaultPrevented) return;

    const activeEl = document.activeElement;
    if (
      activeEl &&
      (activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT')
    ) {
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      if (!this.cheeseBtn.disabled) {
        this.callbacks.onSayCheese();
      }
    } else if (e.code === 'Enter') {
      e.preventDefault();
      if (!this.shutterBtn.disabled) {
        this.pulseShutterButton();
        this.callbacks.onShutter();
      }
    }
  }
}
