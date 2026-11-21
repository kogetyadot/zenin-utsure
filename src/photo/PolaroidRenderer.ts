import { PhotoRank, PhotoScoreBreakdown } from '../types';

const CARD_W = 760;
const CARD_H = 880;
const PHOTO_X = 40;
const PHOTO_Y = 40;
const PHOTO_W = 680;
const PHOTO_H = 510; // Exact 4:3 print aspect ratio

const FONT_SANS =
  '"Zen Maru Gothic", "Hiragino Maru Gothic ProN", "Yu Gothic", "Noto Sans JP", "Meiryo", sans-serif';
const FONT_MONO =
  '"SF Mono", "Menlo", "Consolas", "Noto Sans JP", monospace';

interface RankPalette {
  ring: string;
  fill: string;
  accent: string;
  stars: number;
}

const RANK_PALETTES: Record<PhotoRank, RankPalette> = {
  'S+': {
    ring: '#d62847',
    fill: 'rgba(255, 248, 232, 0.92)',
    accent: '#f59e0b',
    stars: 3,
  },
  S: {
    ring: '#d63447',
    fill: 'rgba(255, 250, 240, 0.91)',
    accent: '#e85d04',
    stars: 2,
  },
  A: {
    ring: '#e06d1f',
    fill: 'rgba(255, 251, 242, 0.90)',
    accent: '#f4a261',
    stars: 1,
  },
  B: {
    ring: '#2a77a8',
    fill: 'rgba(248, 252, 255, 0.90)',
    accent: '#48cae4',
    stars: 0,
  },
  C: {
    ring: '#6f5c7e',
    fill: 'rgba(252, 249, 255, 0.90)',
    accent: '#9f86c0',
    stars: 0,
  },
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  const radius = Math.min(r, w * 0.5, h * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawPaperCard(ctx: CanvasRenderingContext2D): void {
  // Base warm cream instant-film paper
  const grad = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
  grad.addColorStop(0, '#fdfaf3');
  grad.addColorStop(0.55, '#f8f2e6');
  grad.addColorStop(1, '#efe6d5');

  drawRoundedRectPath(ctx, 1, 1, CARD_W - 2, CARD_H - 2, 12);
  ctx.fillStyle = grad;
  ctx.fill();

  // Subtle deterministic paper grain & fibers (lightweight, authentic instant-film stock)
  ctx.save();
  drawRoundedRectPath(ctx, 1, 1, CARD_W - 2, CARD_H - 2, 12);
  ctx.clip();

  let seed = 13379;
  const nextRand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < 1600; i++) {
    const gx = nextRand() * CARD_W;
    const gy = nextRand() * CARD_H;
    // Skip bulk inside photo window for speed
    if (
      gx > PHOTO_X + 6 &&
      gx < PHOTO_X + PHOTO_W - 6 &&
      gy > PHOTO_Y + 6 &&
      gy < PHOTO_Y + PHOTO_H - 6
    ) {
      continue;
    }
    const dark = nextRand() > 0.45;
    const alpha = 0.018 + nextRand() * 0.028;
    ctx.fillStyle = dark
      ? `rgba(125, 102, 74, ${alpha.toFixed(3)})`
      : `rgba(255, 255, 255, ${(alpha * 1.4).toFixed(3)})`;
    const sz = nextRand() > 0.85 ? 2 : 1.2;
    ctx.fillRect(gx, gy, sz, sz);
  }

  // Subtle top-left paper sheen & bottom-right warm aging edge
  const edgeGrad = ctx.createRadialGradient(
    CARD_W * 0.3,
    CARD_H * 0.25,
    120,
    CARD_W * 0.5,
    CARD_H * 0.5,
    CARD_H * 0.72,
  );
  edgeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
  edgeGrad.addColorStop(0.75, 'rgba(255, 255, 255, 0)');
  edgeGrad.addColorStop(1, 'rgba(130, 104, 72, 0.09)');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  ctx.restore();

  // Tactile outer border & subtle inner highlight
  drawRoundedRectPath(ctx, 1.5, 1.5, CARD_W - 3, CARD_H - 3, 12);
  ctx.strokeStyle = 'rgba(145, 125, 98, 0.35)';
  ctx.lineWidth = 2;
  ctx.stroke();

  drawRoundedRectPath(ctx, 3.5, 3.5, CARD_W - 7, CARD_H - 7, 10);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawPhotoPrint(
  ctx: CanvasRenderingContext2D,
  imgSource: HTMLCanvasElement | HTMLImageElement | null,
): void {
  // Recessed well shadow behind photo
  ctx.save();
  ctx.fillStyle = '#ddd3c0';
  ctx.fillRect(PHOTO_X - 3, PHOTO_Y - 3, PHOTO_W + 6, PHOTO_H + 6);

  ctx.beginPath();
  ctx.rect(PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);
  ctx.clip();

  if (imgSource) {
    const srcW =
      imgSource instanceof HTMLCanvasElement
        ? imgSource.width
        : imgSource.naturalWidth || imgSource.width;
    const srcH =
      imgSource instanceof HTMLCanvasElement
        ? imgSource.height
        : imgSource.naturalHeight || imgSource.height;

    if (srcW > 0 && srcH > 0) {
      // Center-crop ("cover") into 4:3 print area
      const targetAspect = PHOTO_W / PHOTO_H;
      const srcAspect = srcW / srcH;
      let sx = 0;
      let sy = 0;
      let sw = srcW;
      let sh = srcH;

      if (srcAspect > targetAspect) {
        sw = srcH * targetAspect;
        sx = (srcW - sw) * 0.5;
      } else {
        sh = srcW / targetAspect;
        sy = (srcH - sh) * 0.5;
      }

      ctx.drawImage(imgSource, sx, sy, sw, sh, PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);
    }
  } else {
    // Graceful warm fallback backdrop if image failed to load
    const fallbackGrad = ctx.createLinearGradient(
      PHOTO_X,
      PHOTO_Y,
      PHOTO_X,
      PHOTO_Y + PHOTO_H,
    );
    fallbackGrad.addColorStop(0, '#9bd4f5');
    fallbackGrad.addColorStop(1, '#f4e4c1');
    ctx.fillStyle = fallbackGrad;
    ctx.fillRect(PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);
  }

  // Subtle Kodak/Fuji warm film lift (keeps vibrant 3D colors lively)
  ctx.fillStyle = 'rgba(255, 241, 210, 0.055)';
  ctx.fillRect(PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);

  // Soft optical lens vignette
  const cx = PHOTO_X + PHOTO_W * 0.5;
  const cy = PHOTO_Y + PHOTO_H * 0.5;
  const vig = ctx.createRadialGradient(
    cx,
    cy,
    PHOTO_W * 0.3,
    cx,
    cy,
    PHOTO_W * 0.66,
  );
  vig.addColorStop(0, 'rgba(30, 18, 10, 0)');
  vig.addColorStop(0.7, 'rgba(30, 18, 10, 0.05)');
  vig.addColorStop(1, 'rgba(26, 15, 8, 0.24)');
  ctx.fillStyle = vig;
  ctx.fillRect(PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);

  // Subtle glossy sheen across top-left corner of print
  const gloss = ctx.createLinearGradient(
    PHOTO_X,
    PHOTO_Y,
    PHOTO_X + PHOTO_W * 0.5,
    PHOTO_Y + PHOTO_H * 0.45,
  );
  gloss.addColorStop(0, 'rgba(255, 255, 255, 0.09)');
  gloss.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gloss;
  ctx.fillRect(PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);

  ctx.restore();

  // Crisp inner hairline border around the print
  ctx.strokeStyle = 'rgba(42, 31, 22, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(PHOTO_X + 0.5, PHOTO_Y + 0.5, PHOTO_W - 1, PHOTO_H - 1);
}

function drawRankStamp(
  ctx: CanvasRenderingContext2D,
  rank: PhotoRank,
  totalScore: number,
): void {
  const palette = RANK_PALETTES[rank];
  const cx = PHOTO_X + PHOTO_W - 76;
  const cy = PHOTO_Y + 76;
  const outerR = 57;
  const innerR = 48;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((-11.5 * Math.PI) / 180);

  // Soft shadow under stamp badge
  ctx.shadowColor = 'rgba(25, 16, 10, 0.26)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 3;

  // Translucent cream seal disc for rock-solid legibility on any photo
  ctx.beginPath();
  ctx.arc(0, 0, outerR + 3, 0, Math.PI * 2);
  ctx.fillStyle = palette.fill;
  ctx.fill();

  ctx.shadowColor = 'transparent';

  // Outer rubber-stamp ring
  ctx.beginPath();
  ctx.arc(0, 0, outerR, 0, Math.PI * 2);
  ctx.strokeStyle = palette.ring;
  ctx.lineWidth = 4.2;
  ctx.stroke();

  // Inner decorative dashed ring
  ctx.beginPath();
  ctx.setLineDash([4, 3]);
  ctx.arc(0, 0, innerR, 0, Math.PI * 2);
  ctx.strokeStyle = palette.ring;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.setLineDash([]);

  // Decorative stars at top for S+ / S / A
  if (palette.stars > 0) {
    ctx.fillStyle = palette.accent;
    ctx.font = `700 13px ${FONT_SANS}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const starText = '★'.repeat(palette.stars);
    ctx.fillText(starText, 0, -34);
  }

  // Big bold Rank letter
  ctx.fillStyle = palette.ring;
  ctx.font = `900 ${rank === 'S+' ? 40 : 44}px ${FONT_SANS}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(rank, 0, -4);

  // Horizontal divider bar
  ctx.beginPath();
  ctx.moveTo(-28, 17);
  ctx.lineTo(28, 17);
  ctx.strokeStyle = palette.ring;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Numeric score
  ctx.fillStyle = palette.ring;
  ctx.font = `800 18px ${FONT_MONO}`;
  ctx.fillText(`${totalScore} pt`, 0, 31);

  // Subtle ink-stamp distress speckles for authentic rubber-stamp vibe
  ctx.globalCompositeOperation = 'source-atop';
  let s = 4219;
  for (let i = 0; i < 42; i++) {
    s = (s * 48271) % 2147483647;
    const rx = ((s % 120) - 60);
    s = (s * 48271) % 2147483647;
    const ry = ((s % 120) - 60);
    ctx.fillStyle = 'rgba(255, 250, 240, 0.25)';
    ctx.fillRect(rx, ry, 2.5, 1.5);
  }

  ctx.restore();
}

function drawComedySticker(
  ctx: CanvasRenderingContext2D,
  badge: string,
): void {
  ctx.save();
  const anchorX = PHOTO_X + 18;
  const anchorY = PHOTO_Y + PHOTO_H - 18;
  ctx.translate(anchorX, anchorY);
  ctx.rotate((-3.2 * Math.PI) / 180);

  ctx.font = `800 22px ${FONT_SANS}`;
  const textWidth = ctx.measureText(badge).width;
  const padX = 22;
  const pillW = Math.min(PHOTO_W - 60, textWidth + padX * 2);
  const pillH = 44;

  // Sticker drop shadow
  ctx.shadowColor = 'rgba(28, 18, 10, 0.3)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 4;

  // White die-cut vinyl sticker outline
  drawRoundedRectPath(ctx, -4, -pillH + 4, pillW + 8, pillH + 8, 26);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.shadowColor = 'transparent';

  // Warm sunshine sticker gradient
  const grad = ctx.createLinearGradient(0, -pillH, pillW, 8);
  grad.addColorStop(0, '#ffe156');
  grad.addColorStop(1, '#ffb703');
  drawRoundedRectPath(ctx, 0, -pillH + 8, pillW, pillH, 22);
  ctx.fillStyle = grad;
  ctx.fill();

  // Inner crisp dashed stitching accent
  drawRoundedRectPath(ctx, 4, -pillH + 12, pillW - 8, pillH - 8, 18);
  ctx.strokeStyle = 'rgba(130, 62, 0, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Sticker text
  ctx.fillStyle = '#3b2004';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(badge, padX, -pillH * 0.5 + 9, pillW - padX * 2);

  ctx.restore();
}

function wrapJapaneseText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const lines: string[] = [];
  let current = '';

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = current + ch;
    if (ctx.measureText(next).width > maxWidth && current.length > 0) {
      lines.push(current);
      current = ch;
      if (lines.length === maxLines - 1) {
        // Put remaining text on final line (clamped by fillText maxWidth)
        current = text.slice(i);
        break;
      }
    } else {
      current = next;
    }
  }
  if (current.length > 0) {
    lines.push(current);
  }
  return lines;
}

function drawCaptionAndFooter(
  ctx: CanvasRenderingContext2D,
  score: PhotoScoreBreakdown,
  stageTitle: string,
  shotIndex: number,
): void {
  const centerX = CARD_W * 0.5;
  const maxTextW = PHOTO_W - 20;

  // Main handwritten-style caption (30px bold, dark charcoal ink)
  ctx.save();
  let captionSize = 30;
  ctx.font = `800 ${captionSize}px ${FONT_SANS}`;
  while (ctx.measureText(score.caption).width > maxTextW && captionSize > 22) {
    captionSize -= 2;
    ctx.font = `800 ${captionSize}px ${FONT_SANS}`;
  }

  ctx.fillStyle = '#221a14';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(score.caption, centerX, 602, maxTextW);

  // Decorative hand-drawn underline accent beneath caption
  const capW = Math.min(maxTextW * 0.72, ctx.measureText(score.caption).width * 0.62);
  ctx.beginPath();
  ctx.moveTo(centerX - capW * 0.5, 629);
  ctx.quadraticCurveTo(centerX, 633, centerX + capW * 0.5, 628);
  ctx.strokeStyle = 'rgba(214, 122, 68, 0.52)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Sub-caption commentary (21px, generous 32px line-height, crisp dark-sepia ink)
  ctx.font = `600 21px ${FONT_SANS}`;
  ctx.fillStyle = '#473a2f';
  const subLines = wrapJapaneseText(ctx, score.subCaption, maxTextW, 2);
  const subStartY = subLines.length === 1 ? 674 : 663;
  for (let i = 0; i < subLines.length; i++) {
    ctx.fillText(subLines[i], centerX, subStartY + i * 32, maxTextW);
  }

  // Compact memory stat summary (19px bold, clear contrast)
  const statItems = [
    `写り ${score.visibleCount}/${score.totalCount}`,
    `笑顔 ${score.smilingCount}人`,
    `構図 ${score.compositionScore}/20`,
    `瞬間 ${score.momentScore}/10`,
  ];
  const statsLine = statItems.join('  •  ');
  ctx.font = `700 19px ${FONT_SANS}`;
  ctx.fillStyle = '#5f4f41';
  ctx.fillText(statsLine, centerX, 752, maxTextW);

  // Dotted souvenir divider line
  ctx.beginPath();
  ctx.setLineDash([3, 5]);
  ctx.moveTo(PHOTO_X, 794);
  ctx.lineTo(PHOTO_X + PHOTO_W, 794);
  ctx.strokeStyle = 'rgba(128, 108, 86, 0.5)';
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.setLineDash([]);

  // Metadata footer (18px, crisp contrast)
  ctx.font = `700 18px ${FONT_MONO}`;
  ctx.fillStyle = '#625243';
  ctx.textAlign = 'left';
  ctx.fillText(`SHOT #${shotIndex} • ${stageTitle}`, PHOTO_X + 4, 834, PHOTO_W - 165);

  ctx.font = `800 18px ${FONT_SANS}`;
  ctx.fillStyle = '#4f4034';
  ctx.textAlign = 'right';
  ctx.fillText('全員、写れ！', PHOTO_X + PHOTO_W - 4, 834);

  ctx.restore();
}

/**
 * Renders a tactile 760×880 Polaroid souvenir PNG data URL from a canvas or image data URL.
 */
export async function renderPolaroid(
  source: HTMLCanvasElement | string,
  score: PhotoScoreBreakdown,
  stageTitle: string,
  shotIndex: number,
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return typeof source === 'string' ? source : '';
  }

  let imgSource: HTMLCanvasElement | HTMLImageElement | null = null;
  if (typeof source === 'string') {
    try {
      imgSource = await loadImage(source);
    } catch {
      imgSource = null;
    }
  } else {
    imgSource = source;
  }

  // 1. Warm textured Polaroid paper card
  drawPaperCard(ctx);

  // 2. Cropped 4:3 photo print with warm film finish & vignette
  drawPhotoPrint(ctx, imgSource);

  // 3. Angled rubber-stamp Rank Seal + numeric score
  drawRankStamp(ctx, score.rank, score.totalScore);

  // 4. Optional tilted Comedy Award sticker ribbon
  if (score.comedyAward) {
    drawComedySticker(ctx, score.comedyAward.badge);
  }

  // 5. Handwritten Japanese caption, commentary & metadata footer
  drawCaptionAndFooter(ctx, score, stageTitle, shotIndex);

  return canvas.toDataURL('image/png');
}
