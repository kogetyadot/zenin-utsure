import * as THREE from 'three';
import { ExpressionId } from '../types';

const TEX_SIZE = 256;
// Equirectangular spherical degree mapping onto a 256x256 texture.
// When the head SphereGeometry has rotation.y = -Math.PI / 2,
// u = 0.5 (x = 128) points directly forward (+Z), with x < 128 on the viewer's left (-X)
// and x > 128 on the viewer's right (+X).
const FACE_CENTER_X = TEX_SIZE * 0.5;
const FACE_CENTER_Y = TEX_SIZE * 0.525; // Just below equator for cute chibi proportions
const DEG_TO_PX_X = TEX_SIZE / 360;
const DEG_TO_PX_Y = TEX_SIZE / 180;

function darkenHex(hex: string, amount: number): string {
  const c = new THREE.Color(hex);
  c.multiplyScalar(1 - amount);
  return `#${c.getHexString()}`;
}

function drawBlush(
  ctx: CanvasRenderingContext2D,
  intensity: number,
  extraWide = false,
): void {
  if (intensity <= 0.01) return;
  const rx = extraWide ? 11.5 : 9.5;
  const ry = extraWide ? 6.8 : 5.8;
  for (const side of [-1, 1]) {
    const cx = side * 24.5;
    const cy = 9.5;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(rx, ry);
    const grad = ctx.createRadialGradient(0, 0, 0.08, 0, 0, 1);
    grad.addColorStop(0, `rgba(255, 108, 134, ${intensity})`);
    grad.addColorStop(0.6, `rgba(255, 128, 150, ${intensity * 0.5})`);
    grad.addColorStop(1, 'rgba(255, 138, 160, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawCuteNose(ctx: CanvasRenderingContext2D, skinColor: string): void {
  ctx.save();
  ctx.fillStyle = darkenHex(skinColor, 0.13);
  ctx.beginPath();
  ctx.ellipse(0, 5.2, 2.3, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawShinyEye(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  pupilShiftX = 0,
  pupilShiftY = 0,
): void {
  ctx.save();
  // Dark espresso iris/pupil oval
  ctx.fillStyle = '#241816';
  ctx.beginPath();
  ctx.ellipse(cx + pupilShiftX, cy + pupilShiftY, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  // Warm lower-iris glow crescent for lively anime/Nintendo toy feel
  ctx.fillStyle = '#5c3828';
  ctx.beginPath();
  ctx.ellipse(
    cx + pupilShiftX,
    cy + pupilShiftY + ry * 0.36,
    rx * 0.62,
    ry * 0.34,
    0,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  // Upper lash accent arc
  ctx.strokeStyle = '#1a100e';
  ctx.lineWidth = 2.0;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 0.5, rx + 0.9, ry + 0.5, 0, Math.PI * 1.12, Math.PI * 1.88);
  ctx.stroke();

  // Primary bright white catchlight (top-left)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(
    cx + pupilShiftX - rx * 0.28,
    cy + pupilShiftY - ry * 0.3,
    rx * 0.36,
    ry * 0.34,
    -0.25,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  // Secondary tiny sparkle dot (bottom-right)
  ctx.beginPath();
  ctx.arc(
    cx + pupilShiftX + rx * 0.3,
    cy + pupilShiftY + ry * 0.32,
    rx * 0.16,
    0,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.restore();
}

function drawEyebrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  cx: number,
  cy: number,
  x2: number,
  y2: number,
  width = 2.4,
): void {
  ctx.save();
  ctx.strokeStyle = '#3d281f';
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cx, cy, x2, y2);
  ctx.stroke();
  ctx.restore();
}

function drawSpiralEye(ctx: CanvasRenderingContext2D, cx: number, cy: number, dir: number): void {
  ctx.save();
  // Bright white circular backing so spiral pops clearly from afar
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#241816';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(cx, cy, 8.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Bold concentric spiral
  ctx.strokeStyle = '#241816';
  ctx.lineWidth = 2.1;
  ctx.lineCap = 'round';
  ctx.beginPath();
  const turns = 2.45;
  const steps = 44;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = dir * t * turns * Math.PI * 2;
    const r = t * 7.2;
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
}

function drawSweatdrop(ctx: CanvasRenderingContext2D, cx: number, cy: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(0.18);

  // Teardrop outline & vibrant sky-cyan gradient fill
  const grad = ctx.createLinearGradient(0, -8, 0, 8);
  grad.addColorStop(0, '#c8f4ff');
  grad.addColorStop(0.55, '#5ad2ff');
  grad.addColorStop(1, '#269be8');
  ctx.fillStyle = grad;
  ctx.strokeStyle = '#1b5d99';
  ctx.lineWidth = 1.6;

  ctx.beginPath();
  ctx.moveTo(0, -8.5);
  ctx.bezierCurveTo(4.2, -2, 6.2, 2.5, 4.5, 6.2);
  ctx.arc(0, 4.8, 4.6, 0.25, Math.PI - 0.25);
  ctx.bezierCurveTo(-6.2, 2.5, -4.2, -2, 0, -8.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Crisp glossy highlight
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(-1.4, 2.4, 1.3, 2.4, -0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function paintExpression(
  ctx: CanvasRenderingContext2D,
  expression: ExpressionId,
  skinColor: string,
  rosyCheeks: boolean,
): void {
  // 1. Base skin fill with ultra-subtle soft toy shading
  const bgGrad = ctx.createLinearGradient(0, 0, 0, TEX_SIZE);
  bgGrad.addColorStop(0, skinColor);
  bgGrad.addColorStop(0.7, skinColor);
  bgGrad.addColorStop(1, darkenHex(skinColor, 0.08));
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  // 2. Transform into spherical degree space centered on +Z face
  ctx.save();
  ctx.translate(FACE_CENTER_X, FACE_CENTER_Y);
  ctx.scale(DEG_TO_PX_X, DEG_TO_PX_Y);

  const baseBlush = rosyCheeks ? 0.56 : 0.24;

  switch (expression) {
    case 'smile': {
      drawBlush(ctx, Math.max(baseBlush, 0.42), false);
      drawCuteNose(ctx, skinColor);
      drawShinyEye(ctx, -16, -2, 6.4, 7.6);
      drawShinyEye(ctx, 16, -2, 6.4, 7.6);
      drawEyebrow(ctx, -23, -14.5, -16, -18.5, -9, -15, 2.3);
      drawEyebrow(ctx, 9, -15, 16, -18.5, 23, -14.5, 2.3);

      // Warm cheerful U-smile
      ctx.strokeStyle = '#3d1e1c';
      ctx.lineWidth = 2.7;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-10.5, 12.5);
      ctx.quadraticCurveTo(0, 22.8, 10.5, 12.5);
      ctx.stroke();
      break;
    }

    case 'cheese': {
      drawBlush(ctx, Math.max(baseBlush + 0.22, 0.68), true);
      drawCuteNose(ctx, skinColor);

      // Happy laughing curved ^ ^ eyes
      ctx.strokeStyle = '#241816';
      ctx.lineWidth = 3.6;
      ctx.lineCap = 'round';
      for (const side of [-1, 1]) {
        const cx = side * 16.5;
        ctx.beginPath();
        ctx.moveTo(cx - 7.8, 1.5);
        ctx.quadraticCurveTo(cx, -10.5, cx + 7.8, 1.5);
        ctx.stroke();
      }

      // High joyful brows
      drawEyebrow(ctx, -23.5, -15.5, -16.5, -20.5, -9, -16, 2.3);
      drawEyebrow(ctx, 9, -16, 16.5, -20.5, 23.5, -15.5, 2.3);

      // Wide beaming open D-mouth with teeth & tongue
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-13.5, 10.8);
      ctx.quadraticCurveTo(0, 9.2, 13.5, 10.8);
      ctx.quadraticCurveTo(13, 27.5, 0, 27.5);
      ctx.quadraticCurveTo(-13, 27.5, -13.5, 10.8);
      ctx.closePath();
      ctx.fillStyle = '#c43b49';
      ctx.fill();
      ctx.save();
      ctx.clip();

      // Crisp white upper teeth band
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-15, 9.2, 30, 5.2);

      // Cute pink tongue hint at bottom
      ctx.fillStyle = '#ff8599';
      ctx.beginPath();
      ctx.ellipse(0, 25.8, 9.5, 6.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = '#3a1a1c';
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.restore();
      break;
    }

    case 'neutral': {
      drawBlush(ctx, baseBlush * 0.75, false);
      drawCuteNose(ctx, skinColor);
      drawShinyEye(ctx, -16, -1.5, 5.9, 6.8);
      drawShinyEye(ctx, 16, -1.5, 5.9, 6.8);
      drawEyebrow(ctx, -22, -13.5, -16, -15.5, -9.5, -13.8, 2.2);
      drawEyebrow(ctx, 9.5, -13.8, 16, -15.5, 22, -13.5, 2.2);

      // Small gentle attentive smile
      ctx.strokeStyle = '#3d1e1c';
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-6.8, 14.5);
      ctx.quadraticCurveTo(0, 18.8, 6.8, 14.5);
      ctx.stroke();
      break;
    }

    case 'nervous': {
      drawBlush(ctx, Math.max(baseBlush + 0.14, 0.52), true);
      drawCuteNose(ctx, skinColor);

      // White sclera ovals with glancing-aside dark pupils
      for (const side of [-1, 1]) {
        const cx = side * 16;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#241816';
        ctx.lineWidth = 1.9;
        ctx.beginPath();
        ctx.ellipse(cx, -1.5, 7.2, 7.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Glancing to the left
        ctx.fillStyle = '#241816';
        ctx.beginPath();
        ctx.ellipse(cx - 2.3, -1.0, 4.1, 4.9, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx - 3.6, -2.8, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Upturned worried eyebrows
      drawEyebrow(ctx, -23.5, -11.5, -16, -14.2, -9.5, -18.2, 2.3);
      drawEyebrow(ctx, 9.5, -18.2, 16, -14.2, 23.5, -11.5, 2.3);

      // Wavy shy mouth
      ctx.strokeStyle = '#3d1e1c';
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-8.5, 16.2);
      ctx.quadraticCurveTo(-4.2, 12.6, 0, 16.0);
      ctx.quadraticCurveTo(4.2, 19.2, 8.5, 15.6);
      ctx.stroke();

      // Cute blue sweatdrop on temple
      drawSweatdrop(ctx, 30.5, -12);
      break;
    }

    case 'surprised': {
      drawBlush(ctx, baseBlush * 0.65, false);
      drawCuteNose(ctx, skinColor);

      // Wide white sclera eyes with tiny shocked pupils
      for (const side of [-1, 1]) {
        const cx = side * 16.5;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#241816';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.ellipse(cx, -2, 8.2, 9.0, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#1e1412';
        ctx.beginPath();
        ctx.arc(cx, -1.8, 2.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx - 1.1, -3.0, 0.95, 0, Math.PI * 2);
        ctx.fill();
      }

      // High raised shocked brows
      drawEyebrow(ctx, -23, -17.5, -16.5, -23, -10, -17.5, 2.3);
      drawEyebrow(ctx, 10, -17.5, 16.5, -23, 23, -17.5, 2.3);

      // Big round O mouth
      ctx.fillStyle = '#c43b49';
      ctx.strokeStyle = '#3a1a1c';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(0, 17.2, 7.6, 9.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    }

    case 'blink_warn': {
      // Clear visual telegraph right before blinking: heavy half-drooped eyelids!
      drawBlush(ctx, baseBlush * 0.55, false);
      drawCuteNose(ctx, skinColor);

      const lidShade = darkenHex(skinColor, 0.14);
      for (const side of [-1, 1]) {
        const cx = side * 16;
        // Draw lower peeking eye first
        drawShinyEye(ctx, cx, 0.5, 6.2, 6.2);

        // Cover upper 62% with heavy drooping eyelid
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.rect(cx - 9, -10.5, 18, 10.6);
        ctx.fill();

        // Subtle sleepy eyelid crease shadow
        ctx.fillStyle = lidShade;
        ctx.beginPath();
        ctx.rect(cx - 8.2, -3.2, 16.4, 3.2);
        ctx.fill();

        // Thick heavy droopy horizontal lid line
        ctx.strokeStyle = '#241816';
        ctx.lineWidth = 3.1;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx - 8.2, -0.3);
        ctx.quadraticCurveTo(cx, 1.3, cx + 8.2, -0.3);
        ctx.stroke();
      }

      // Slightly lowered drowsy brows
      drawEyebrow(ctx, -23, -11.8, -16, -12.8, -9.5, -11.2, 2.2);
      drawEyebrow(ctx, 9.5, -11.2, 16, -12.8, 23, -11.8, 2.2);

      // Slightly slack neutral/open mouth
      ctx.fillStyle = '#b94c57';
      ctx.strokeStyle = '#3d1e1c';
      ctx.lineWidth = 2.1;
      ctx.beginPath();
      ctx.ellipse(0, 16, 4.4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    }

    case 'blink': {
      // Unmistakable thick closed eyelids (u u / downward closed arcs)
      drawBlush(ctx, baseBlush * 0.65, false);
      drawCuteNose(ctx, skinColor);

      ctx.strokeStyle = '#201412';
      ctx.lineWidth = 3.8;
      ctx.lineCap = 'round';
      for (const side of [-1, 1]) {
        const cx = side * 16.5;
        ctx.beginPath();
        ctx.moveTo(cx - 8.2, -2.5);
        ctx.quadraticCurveTo(cx, 5.8, cx + 8.2, -2.5);
        ctx.stroke();

        // Cute tiny outer lash tick so closed state reads instantly
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(cx + side * 6.8, -0.6);
        ctx.lineTo(cx + side * 9.8, 1.6);
        ctx.stroke();
        ctx.lineWidth = 3.8;
      }

      // Relaxed brows
      drawEyebrow(ctx, -22.5, -12.5, -16, -14.2, -9.5, -12.5, 2.1);
      drawEyebrow(ctx, 9.5, -12.5, 16, -14.2, 22.5, -12.5, 2.1);

      // Calm flat/slightly awkward closed mouth
      ctx.strokeStyle = '#3d1e1c';
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-6.5, 15.8);
      ctx.quadraticCurveTo(0, 17.5, 6.5, 15.8);
      ctx.stroke();
      break;
    }

    case 'dizzy': {
      drawBlush(ctx, Math.max(baseBlush, 0.45), true);
      drawCuteNose(ctx, skinColor);

      drawSpiralEye(ctx, -16.5, -1.5, 1);
      drawSpiralEye(ctx, 16.5, -1.5, -1);

      // Mismatched dazed eyebrows
      drawEyebrow(ctx, -24, -13, -16.5, -16, -9.5, -18.5, 2.4);
      drawEyebrow(ctx, 9.5, -14.5, 16.5, -18, 24, -15.5, 2.4);

      // Comical wavy dazed mouth
      ctx.strokeStyle = '#3d1e1c';
      ctx.lineWidth = 2.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-11, 16.5);
      ctx.bezierCurveTo(-7, 11, -3.5, 22, 0, 16.2);
      ctx.bezierCurveTo(3.5, 11, 7, 22, 11, 15.8);
      ctx.stroke();
      break;
    }

    case 'smug': {
      drawBlush(ctx, baseBlush * 0.75, false);
      drawCuteNose(ctx, skinColor);

      // Left eye: confident sparkling eye with cool angled upper lid
      drawShinyEye(ctx, -16, -1, 6.4, 6.8);
      ctx.fillStyle = skinColor;
      ctx.beginPath();
      ctx.moveTo(-25, -10);
      ctx.lineTo(-7, -10);
      ctx.lineTo(-7, -3.2);
      ctx.lineTo(-25, -5.8);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#241816';
      ctx.lineWidth = 2.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-23.5, -5.6);
      ctx.lineTo(-9, -3.2);
      ctx.stroke();

      // Right eye: cheeky playful wink!
      ctx.strokeStyle = '#241816';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(9.2, -3.8);
      ctx.quadraticCurveTo(16.5, -8.8, 23.8, -1.5);
      ctx.stroke();

      // Confident asymmetrical brows (one cocked high!)
      drawEyebrow(ctx, -23.5, -14.8, -16, -13.2, -9.2, -10.8, 2.6);
      drawEyebrow(ctx, 9.2, -14.5, 16.5, -19.8, 24, -15.2, 2.6);

      // Cheeky asymmetrical toothy grin
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-11.5, 14.5);
      ctx.quadraticCurveTo(2, 11.8, 13.5, 9.2);
      ctx.quadraticCurveTo(11.5, 22.8, -1.5, 22.2);
      ctx.quadraticCurveTo(-9.5, 21.6, -11.5, 14.5);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#3a1a1c';
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.restore();
      break;
    }

    case 'sneeze': {
      // Intense pink flushed cheeks + extra cute red nose flush!
      drawBlush(ctx, Math.max(baseBlush + 0.36, 0.84), true);

      // Cute slightly flushed nose
      ctx.save();
      ctx.fillStyle = '#e87882';
      ctx.beginPath();
      ctx.ellipse(0, 5.2, 3.0, 2.0, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Tightly scrunched comic > < eyes!
      ctx.strokeStyle = '#201412';
      ctx.lineWidth = 3.9;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Left eye: '>' pointing inward toward nose bridge
      ctx.beginPath();
      ctx.moveTo(-24.5, -8.5);
      ctx.lineTo(-9.5, -1.5);
      ctx.lineTo(-24.5, 5.2);
      ctx.stroke();

      // Right eye: '<' pointing inward toward nose bridge
      ctx.beginPath();
      ctx.moveTo(24.5, -8.5);
      ctx.lineTo(9.5, -1.5);
      ctx.lineTo(24.5, 5.2);
      ctx.stroke();

      // Tiny scrunch-wrinkle stress ticks beside outer corners
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = darkenHex(skinColor, 0.32);
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(side * 27.5, -4.5);
        ctx.lineTo(side * 31.2, -5.8);
        ctx.moveTo(side * 27.5, 1.8);
        ctx.lineTo(side * 31.2, 3.2);
        ctx.stroke();
      }

      // Tightly furrowed brows pulled down toward center
      drawEyebrow(ctx, -25.5, -16.2, -16.5, -12.5, -8.2, -9.8, 2.8);
      drawEyebrow(ctx, 8.2, -9.8, 16.5, -12.5, 25.5, -16.2, 2.8);

      // Wide open explosive "ACHOO!!" mouth
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-12.5, 13.5);
      ctx.bezierCurveTo(-11.5, 8.2, 11.5, 8.2, 12.5, 13.5);
      ctx.bezierCurveTo(15.5, 21.5, 10.5, 31.5, 0, 31.5);
      ctx.bezierCurveTo(-10.5, 31.5, -15.5, 21.5, -12.5, 13.5);
      ctx.closePath();
      ctx.fillStyle = '#c43245';
      ctx.fill();

      ctx.save();
      ctx.clip();
      // Upper white teeth band
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-15, 8.0, 30, 5.4);
      // Animated quivering tongue at bottom
      ctx.fillStyle = '#ff7b96';
      ctx.beginPath();
      ctx.ellipse(0, 29.5, 9.8, 7.0, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = '#3a181c';
      ctx.lineWidth = 2.6;
      ctx.stroke();
      ctx.restore();

      // Tiny crisp white-and-sky comic sneeze puff marks bursting outward from mouth!
      ctx.save();
      for (const side of [-1, 1]) {
        const px = side * 19.5;
        const py = 22.5;
        // Little puffy cloud burst
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#5bbce8';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(px, py, 3.8, 0, Math.PI * 2);
        ctx.arc(px + side * 3.6, py + 1.8, 2.8, 0, Math.PI * 2);
        ctx.arc(px + side * 1.4, py - 2.6, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Speed burst wind ticks
        ctx.strokeStyle = '#6ec8f2';
        ctx.lineWidth = 1.9;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(side * 14.5, 17.8);
        ctx.lineTo(side * 22.0, 14.5);
        ctx.moveTo(side * 15.2, 26.8);
        ctx.lineTo(side * 23.2, 29.8);
        ctx.stroke();
      }
      ctx.restore();
      break;
    }

    case 'hen_gao': {
      // アッカンベー変顔! Hilarious cross-eyed goofy face with sideways tongue!
      drawBlush(ctx, Math.max(baseBlush + 0.24, 0.7), true);
      drawCuteNose(ctx, skinColor);

      // Left eye: huge wild wide-open sclera with BIG pupil looking sharply inward-up
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#201412';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(-16.5, -2.5, 9.6, 10.2, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Big manic left pupil looking inward & slightly up
      ctx.fillStyle = '#1e1412';
      ctx.beginPath();
      ctx.ellipse(-12.2, -4.8, 5.2, 5.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-13.8, -6.8, 1.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-10.4, -2.8, 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Right eye: slightly smaller quirky sclera with TINY pupil looking outward-down!
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#201412';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(16.8, -0.8, 7.6, 8.2, 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Tiny derpy right pupil drifting outward-down
      ctx.fillStyle = '#1e1412';
      ctx.beginPath();
      ctx.arc(20.0, 2.2, 2.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(19.0, 1.0, 1.0, 0, Math.PI * 2);
      ctx.fill();

      // Cheeky pink lower-lid pull hint under right eye (classic アッカンベー!)
      ctx.fillStyle = '#ff859d';
      ctx.beginPath();
      ctx.ellipse(16.8, 6.2, 4.6, 2.1, 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Hilarious wiggly asymmetric eyebrows (left sky-high wavy, right squished low & crooked!)
      ctx.save();
      ctx.strokeStyle = '#3d281f';
      ctx.lineWidth = 2.8;
      ctx.lineCap = 'round';
      // Left sky-high wiggly arch
      ctx.beginPath();
      ctx.moveTo(-26.5, -16.5);
      ctx.bezierCurveTo(-21.5, -24.5, -14.5, -15.5, -8.5, -22.2);
      ctx.stroke();
      // Right crooked squiggly low brow
      ctx.beginPath();
      ctx.moveTo(8.5, -12.0);
      ctx.bezierCurveTo(13.5, -16.5, 18.5, -8.5, 25.5, -14.5);
      ctx.stroke();
      ctx.restore();

      // Wide cheeky open mouth
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-14.5, 13.8);
      ctx.quadraticCurveTo(0, 9.2, 14.8, 12.6);
      ctx.quadraticCurveTo(14.5, 24.5, 0.5, 24.8);
      ctx.quadraticCurveTo(-13.8, 25.0, -14.5, 13.8);
      ctx.closePath();
      ctx.fillStyle = '#a8283b';
      ctx.fill();

      ctx.save();
      ctx.clip();
      // Crisp goofy upper teeth
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-16, 9.0, 32, 5.0);
      ctx.restore();

      ctx.strokeStyle = '#3a181c';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      // Bright pink cheeky tongue sticking WAY out sideways!
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-2.0, 17.5);
      ctx.bezierCurveTo(3.5, 15.2, 13.8, 16.5, 15.8, 23.2);
      ctx.bezierCurveTo(17.6, 29.8, 11.2, 35.8, 4.5, 33.6);
      ctx.bezierCurveTo(-1.2, 31.6, -5.2, 24.2, -2.0, 17.5);
      ctx.closePath();

      const tongueGrad = ctx.createLinearGradient(0, 16, 14, 34);
      tongueGrad.addColorStop(0, '#ff7aa8');
      tongueGrad.addColorStop(1, '#ff4d88');
      ctx.fillStyle = tongueGrad;
      ctx.fill();

      ctx.strokeStyle = '#5c1931';
      ctx.lineWidth = 2.3;
      ctx.stroke();

      // Tongue center crease line
      ctx.strokeStyle = '#c42b5e';
      ctx.lineWidth = 1.9;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(4.0, 18.8);
      ctx.quadraticCurveTo(8.5, 23.5, 9.6, 28.8);
      ctx.stroke();

      // Glossy wet highlight dot on tongue
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.ellipse(3.6, 25.2, 1.9, 3.2, -0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }
  }

  ctx.restore();
}

export function createFaceTexture(
  expression: ExpressionId,
  skinColor: string,
  rosyCheeks = false,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    paintExpression(ctx, expression, skinColor, rosyCheeks);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

export class FaceTextureCache {
  private readonly cache = new Map<string, THREE.CanvasTexture>();

  public getTexture(
    expression: ExpressionId,
    skinColor: string,
    rosyCheeks = false,
  ): THREE.CanvasTexture {
    const key = `${expression}|${skinColor.toLowerCase()}|${rosyCheeks ? '1' : '0'}`;
    let tex = this.cache.get(key);
    if (!tex) {
      tex = createFaceTexture(expression, skinColor, rosyCheeks);
      this.cache.set(key, tex);
    }
    return tex;
  }

  public dispose(): void {
    for (const tex of this.cache.values()) {
      tex.dispose();
    }
    this.cache.clear();
  }
}
