import * as THREE from 'three';
import {
  PlatformTier,
  StageHazardState,
  StageId,
  StageIntruderState,
  StageSpec,
} from '../types';

export interface BuiltStage {
  root: THREE.Group;
  skyColor: THREE.Color;
  fogColor: THREE.Color;
  update(dt: number, elapsedTime: number): void;
  syncIntruder(intruder: StageIntruderState, dt: number, elapsedTime: number): void;
  syncHazard(hazard: StageHazardState, dt: number, elapsedTime: number): void;
  spawnDustPuff(pos: THREE.Vector3, count?: number): void;
  dispose(): void;
}

interface DustParticle {
  mesh: THREE.Mesh;
  mat: THREE.MeshStandardMaterial;
  velocity: THREE.Vector3;
  age: number;
  maxAge: number;
  baseScale: number;
  spinSpeed: number;
  active: boolean;
}

interface FloatingPetal {
  mesh: THREE.Mesh;
  speedY: number;
  driftX: number;
  driftZ: number;
  swayPhase: number;
  swayAmp: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  maxY: number;
}

interface DriftingCloud {
  group: THREE.Group;
  speed: number;
  minX: number;
  maxX: number;
  baseY: number;
  bobPhase: number;
}

interface SwayTarget {
  obj: THREE.Object3D;
  axis: 'x' | 'z';
  baseRot: number;
  amp: number;
  speed: number;
  phase: number;
}

class StageResourceTracker {
  public readonly geometries: THREE.BufferGeometry[] = [];
  public readonly materials: THREE.Material[] = [];
  public readonly textures: THREE.Texture[] = [];
  public disposed = false;

  public geo<T extends THREE.BufferGeometry>(g: T): T {
    this.geometries.push(g);
    return g;
  }

  public mat<T extends THREE.Material>(m: T): T {
    this.materials.push(m);
    return m;
  }

  public tex<T extends THREE.Texture>(t: T): T {
    this.textures.push(t);
    return t;
  }

  public stdMat(
    color: string | number,
    roughness = 0.72,
    metalness = 0.04,
    extra?: Partial<THREE.MeshStandardMaterialParameters>,
  ): THREE.MeshStandardMaterial {
    return this.mat(
      new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        ...extra,
      }),
    );
  }

  public disposeAll(): void {
    if (this.disposed) return;
    this.disposed = true;
    for (const g of this.geometries) g.dispose();
    for (const m of this.materials) m.dispose();
    for (const t of this.textures) t.dispose();
    this.geometries.length = 0;
    this.materials.length = 0;
    this.textures.length = 0;
  }
}

// ============================================================================
// Procedural Canvas Textures (zero external deps, crisp stylized toy finish)
// ============================================================================

function createLawnTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Soft manicured alternating sunlit garden lawn stripes
    const stripeCount = 8;
    const stripeW = size / stripeCount;
    for (let i = 0; i < stripeCount; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#7ed162' : '#71c456';
      ctx.fillRect(i * stripeW, 0, stripeW, size);
    }

    // Subtle painterly grass blades & tiny spring clovers/daisies
    let seed = 1337;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < 650; i++) {
      const x = rand() * size;
      const y = rand() * size;
      ctx.fillStyle = rand() > 0.5 ? 'rgba(164, 232, 114, 0.38)' : 'rgba(84, 158, 62, 0.25)';
      ctx.beginPath();
      ctx.ellipse(x, y, 2.5 + rand() * 3.5, 1.2 + rand() * 1.8, rand() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    // Tiny cheerful white/yellow garden daisies
    for (let i = 0; i < 36; i++) {
      const x = rand() * size;
      const y = rand() * size;
      ctx.fillStyle = 'rgba(255, 253, 245, 0.85)';
      ctx.beginPath();
      ctx.arc(x, y, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd166';
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  tex.anisotropy = 4;
  return tex;
}

function createWoodPlankTexture(res: StageResourceTracker, baseColor = '#fcf8f2'): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, size, size);

    const planks = 6;
    const h = size / planks;
    for (let i = 0; i < planks; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(210, 195, 178, 0.14)' : 'rgba(255, 255, 255, 0.22)';
      ctx.fillRect(0, i * h, size, h);
      // Plank seam
      ctx.fillStyle = 'rgba(175, 158, 142, 0.42)';
      ctx.fillRect(0, i * h, size, 2);
    }
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  return tex;
}

function createGravelTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#e5dac6';
    ctx.fillRect(0, 0, size, size);

    // Subtle raked Zen/shrine sand ripples
    ctx.strokeStyle = 'rgba(202, 188, 164, 0.35)';
    ctx.lineWidth = 3;
    for (let y = 8; y < size; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }

    let seed = 4242;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 1200; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const r = 1 + rand() * 2.2;
      ctx.fillStyle =
        rand() > 0.55 ? 'rgba(255, 250, 240, 0.55)' : 'rgba(166, 150, 128, 0.35)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(7, 7);
  tex.anisotropy = 4;
  return tex;
}

function createGraniteStepTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#d3cec4';
    ctx.fillRect(0, 0, size, size);

    // Granite block seams
    const cols = 4;
    const rows = 2;
    const cw = size / cols;
    const rh = size / rows;
    for (let r = 0; r < rows; r++) {
      const offset = r % 2 === 0 ? 0 : cw * 0.5;
      for (let c = -1; c <= cols; c++) {
        const shade = (r * 7 + c * 13) % 3 === 0 ? '#cbc6bc' : '#d8d3c9';
        ctx.fillStyle = shade;
        ctx.fillRect(c * cw + offset + 3, r * rh + 3, cw - 6, rh - 6);
      }
    }

    // Fine granite mineral speckles
    let seed = 8891;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 900; i++) {
      const x = rand() * size;
      const y = rand() * size;
      ctx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.28)' : 'rgba(105,100,94,0.25)';
      ctx.fillRect(x, y, 2.5, 2.5);
    }

    // Subtle warm moss wisps near corners
    ctx.fillStyle = 'rgba(118, 166, 92, 0.16)';
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.arc(rand() * size, rand() * size, 8 + rand() * 14, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  tex.anisotropy = 4;
  return tex;
}

function paintBoardCalligraphy(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  stageId: StageId,
): void {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (stageId === 'wedding') {
    // Soft translucent ivory vignette behind center text so calligraphy reads crisply
    const plateGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.04, w * 0.5, h * 0.5, w * 0.36);
    plateGrad.addColorStop(0, 'rgba(255, 251, 245, 0.88)');
    plateGrad.addColorStop(0.75, 'rgba(255, 250, 242, 0.52)');
    plateGrad.addColorStop(1, 'rgba(255, 250, 242, 0)');
    ctx.fillStyle = plateGrad;
    ctx.fillRect(0, 0, w, h);

    // Warm gold & rose cursive/serif-inspired title
    ctx.shadowColor = 'rgba(255, 250, 244, 0.9)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = '#c48636';
    ctx.font = 'italic 700 50px "Georgia", "Times New Roman", serif';
    ctx.fillText('Happy Wedding', w * 0.5, h * 0.41);

    // Delicate gold-rose floral divider
    ctx.strokeStyle = '#e58aa0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.28, h * 0.51);
    ctx.lineTo(w * 0.44, h * 0.51);
    ctx.moveTo(w * 0.56, h * 0.51);
    ctx.lineTo(w * 0.72, h * 0.51);
    ctx.stroke();

    ctx.fillStyle = '#e87a96';
    ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.fillText('♥', w * 0.5, h * 0.512);

    ctx.fillStyle = '#b95370';
    ctx.font = '700 44px "Hiragino Mincho ProN", "Yu Mincho", "Hiragino Maru Gothic ProN", serif';
    ctx.fillText('記念撮影', w * 0.5, h * 0.63);
  } else if (stageId === 'school_trip') {
    // Soft warm washi cream glow behind traditional ink calligraphy
    const plateGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.05, w * 0.5, h * 0.5, w * 0.38);
    plateGrad.addColorStop(0, 'rgba(255, 249, 236, 0.9)');
    plateGrad.addColorStop(0.76, 'rgba(255, 248, 234, 0.56)');
    plateGrad.addColorStop(1, 'rgba(255, 248, 234, 0)');
    ctx.fillStyle = plateGrad;
    ctx.fillRect(0, 0, w, h);

    // Traditional vermilion top banner line
    ctx.strokeStyle = '#c93326';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.24, h * 0.32);
    ctx.lineTo(w * 0.76, h * 0.32);
    ctx.moveTo(w * 0.24, h * 0.69);
    ctx.lineTo(w * 0.76, h * 0.69);
    ctx.stroke();

    // Crisp brush-style ink title + vermilion sub-line
    ctx.shadowColor = 'rgba(255, 250, 240, 0.85)';
    ctx.shadowBlur = 5;
    ctx.fillStyle = '#2a1d17';
    ctx.font = '900 50px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';
    ctx.fillText('祝・修学旅行', w * 0.5, h * 0.44);

    ctx.fillStyle = '#c93326';
    ctx.font = '700 36px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';
    ctx.fillText('3年2組 記念写真', w * 0.5, h * 0.59);

    // Traditional square vermilion hanko seal on lower-right
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#d13426';
    ctx.fillRect(w * 0.76, h * 0.54, 34, 34);
    ctx.strokeStyle = '#fff8ec';
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.76 + 3, h * 0.54 + 3, 28, 28);
    ctx.fillStyle = '#fff8ec';
    ctx.font = 'bold 18px serif';
    ctx.fillText('古', w * 0.76 + 17, h * 0.54 + 18);
  } else if (stageId === 'sports_day') {
    // Bright crisp festival backdrop glow for high-energy sports day calligraphy
    const plateGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.06, w * 0.5, h * 0.5, w * 0.42);
    plateGrad.addColorStop(0, 'rgba(255, 253, 244, 0.93)');
    plateGrad.addColorStop(0.75, 'rgba(255, 250, 236, 0.64)');
    plateGrad.addColorStop(1, 'rgba(255, 250, 236, 0)');
    ctx.fillStyle = plateGrad;
    ctx.fillRect(0, 0, w, h);

    // Red-and-gold festive sports banner rules
    ctx.strokeStyle = '#d62828';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(w * 0.16, h * 0.31);
    ctx.lineTo(w * 0.84, h * 0.31);
    ctx.moveTo(w * 0.16, h * 0.69);
    ctx.lineTo(w * 0.84, h * 0.69);
    ctx.stroke();

    ctx.strokeStyle = '#f4b400';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.22, h * 0.335);
    ctx.lineTo(w * 0.78, h * 0.335);
    ctx.moveTo(w * 0.22, h * 0.665);
    ctx.lineTo(w * 0.78, h * 0.665);
    ctx.stroke();

    ctx.shadowColor = 'rgba(255, 255, 255, 0.92)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = '#1b263b';
    ctx.font = '900 40px "Hiragino Kaku Gothic ProN", "Hiragino Maru Gothic ProN", "Noto Sans JP", sans-serif';
    ctx.fillText('第32回 社内大運動会', w * 0.5, h * 0.44);

    ctx.fillStyle = '#d62828';
    ctx.font = '900 42px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';
    ctx.fillText('優勝記念撮影', w * 0.5, h * 0.58);
  } else {
    // Tropical beach sunlit cream vignette with vibrant turquoise & coral accents
    const plateGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.06, w * 0.5, h * 0.5, w * 0.42);
    plateGrad.addColorStop(0, 'rgba(255, 252, 240, 0.92)');
    plateGrad.addColorStop(0.75, 'rgba(255, 250, 236, 0.6)');
    plateGrad.addColorStop(1, 'rgba(255, 250, 236, 0)');
    ctx.fillStyle = plateGrad;
    ctx.fillRect(0, 0, w, h);

    // Playful wavy turquoise ocean divider
    ctx.strokeStyle = '#00b4d8';
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let x = w * 0.2; x <= w * 0.8; x += 6) {
      const y = h * 0.525 + Math.sin((x / w) * Math.PI * 10) * 6;
      if (x === w * 0.2) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.shadowColor = 'rgba(255, 255, 255, 0.92)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = '#0077b6';
    ctx.font = '900 42px "Hiragino Maru Gothic ProN", "Rounded Mplus 1c", "Noto Sans JP", sans-serif';
    ctx.fillText('南国サマーバカンス', w * 0.5, h * 0.42);

    ctx.fillStyle = '#ff595e';
    ctx.font = '900 44px "Hiragino Maru Gothic ProN", "Rounded Mplus 1c", "Noto Sans JP", sans-serif';
    ctx.fillText('記念撮影', w * 0.5, h * 0.63);
  }

  ctx.restore();
}

function createBoardFallbackTexture(
  res: StageResourceTracker,
  accentHex: string,
  stageId: StageId,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#fff9f0';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 14;
    ctx.strokeRect(22, 22, 468, 468);

    paintBoardCalligraphy(ctx, 512, 512, stageId);
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createToriiPlaqueTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Dark lacquered wooden tablet
    ctx.fillStyle = '#1b1d24';
    ctx.fillRect(0, 0, 128, 256);

    // Crisp gilded double border
    ctx.strokeStyle = '#f5ca47';
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, 112, 240);
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, 92, 220);

    // Vertical gold kanji calligraphy: 古 都 神 社
    ctx.fillStyle = '#ffe066';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 44px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';
    const chars = ['古', '都', '神', '社'];
    chars.forEach((ch, idx) => {
      ctx.fillText(ch, 64, 54 + idx * 49);
    });
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ============================================================================
// Shared Sky Dome, Clouds, Lighting & Dust Puff Particle System
// ============================================================================

function buildSkyDome(
  res: StageResourceTracker,
  zenithHex: string,
  midHex: string,
  horizonHex: string,
): THREE.Mesh {
  const skyGeo = res.geo(new THREE.SphereGeometry(68, 32, 20));
  const skyMat = res.mat(
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uZenith: { value: new THREE.Color(zenithHex) },
        uMid: { value: new THREE.Color(midHex) },
        uHorizon: { value: new THREE.Color(horizonHex) },
        uSunDir: { value: new THREE.Vector3(0.45, 0.65, 0.55).normalize() },
      },
      vertexShader: `
        varying vec3 vWorldDir;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldDir = normalize(position);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 uZenith;
        uniform vec3 uMid;
        uniform vec3 uHorizon;
        uniform vec3 uSunDir;
        varying vec3 vWorldDir;
        void main() {
          vec3 d = normalize(vWorldDir);
          float h = clamp(d.y, 0.0, 1.0);
          vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.34, h));
          col = mix(col, uZenith, smoothstep(0.30, 0.88, h));
          float sunAmt = max(dot(d, uSunDir), 0.0);
          col += vec3(1.0, 0.96, 0.84) * pow(sunAmt, 14.0) * 0.28;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    }),
  );
  return new THREE.Mesh(skyGeo, skyMat);
}

function buildClouds(
  res: StageResourceTracker,
  parent: THREE.Group,
  cloudsOut: DriftingCloud[],
): void {
  const cloudMat = res.stdMat('#ffffff', 0.92, 0.0, {
    emissive: '#fff4e6',
    emissiveIntensity: 0.22,
  });
  const puffGeo = res.geo(new THREE.SphereGeometry(1, 14, 10));

  const configs = [
    { x: -16, y: 12.5, z: -26, s: 1.5, speed: 0.32 },
    { x: -5, y: 14.2, z: -30, s: 1.9, speed: 0.24 },
    { x: 9, y: 11.8, z: -24, s: 1.45, speed: 0.38 },
    { x: 21, y: 15.0, z: -32, s: 2.1, speed: 0.21 },
    { x: -24, y: 10.5, z: -20, s: 1.25, speed: 0.42 },
    { x: 2, y: 10.8, z: -22, s: 1.35, speed: 0.35 },
  ];

  configs.forEach((cfg, idx) => {
    const g = new THREE.Group();
    g.position.set(cfg.x, cfg.y, cfg.z);

    const lobes: Array<[number, number, number, number]> = [
      [0, 0.25, 0, 1.25],
      [-1.1, -0.05, 0.1, 0.95],
      [1.15, -0.05, -0.05, 1.0],
      [-0.55, 0.45, -0.25, 0.85],
      [0.6, 0.38, 0.2, 0.88],
    ];
    for (const [lx, ly, lz, r] of lobes) {
      const m = new THREE.Mesh(puffGeo, cloudMat);
      m.position.set(lx * cfg.s, ly * cfg.s, lz * cfg.s);
      m.scale.set(r * cfg.s * 1.15, r * cfg.s * 0.72, r * cfg.s * 0.85);
      g.add(m);
    }

    parent.add(g);
    cloudsOut.push({
      group: g,
      speed: cfg.speed,
      minX: -32,
      maxX: 32,
      baseY: cfg.y,
      bobPhase: idx * 1.3,
    });
  });
}

function buildLighting(parent: THREE.Group, stageId: StageId): void {
  // Bright cheerful hemisphere ambient bounce tailored per stage biome
  const groundBounce =
    stageId === 'wedding'
      ? '#d6e8a8'
      : stageId === 'school_trip'
        ? '#edd5be'
        : stageId === 'sports_day'
          ? '#b8e49a'
          : '#ffe6b0';
  const skyBounce = stageId === 'tropical_beach' ? '#d4f7ff' : '#c8ecff';
  const hemi = new THREE.HemisphereLight(
    skyBounce,
    groundBounce,
    stageId === 'tropical_beach' ? 1.04 : 0.96,
  );
  parent.add(hemi);

  // Warm afternoon key sun (positioned front-right-high so faces are evenly lit!)
  const sunIntensity =
    stageId === 'tropical_beach' ? 1.86 : stageId === 'sports_day' ? 1.82 : 1.78;
  const sun = new THREE.DirectionalLight('#fff5de', sunIntensity);
  sun.position.set(6.5, 11.5, 8.2);
  sun.castShadow = true;
  const shadowSize =
    typeof window !== 'undefined' && window.innerWidth < 800 ? 1024 : 2048;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  sun.shadow.camera.left = -7.5;
  sun.shadow.camera.right = 7.5;
  sun.shadow.camera.top = 7.5;
  sun.shadow.camera.bottom = -7.5;
  sun.shadow.camera.near = 1.0;
  sun.shadow.camera.far = 30.0;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.024;
  parent.add(sun);

  // Soft pastel rim/fill light from behind-left for toy-like edge separation
  const fillColor =
    stageId === 'school_trip'
      ? '#ffdbe8'
      : stageId === 'tropical_beach'
        ? '#9cf3ff'
        : '#d9f2ff';
  const fill = new THREE.DirectionalLight(fillColor, 0.5);
  fill.position.set(-6.5, 5.2, -5.5);
  parent.add(fill);
}

function buildHorizonHillsAndTreeline(
  res: StageResourceTracker,
  parent: THREE.Group,
  isWedding: boolean,
): void {
  // Soft rolling distant hills encircling the diorama so the ground never terminates in a sharp cut
  const hillGeo = res.geo(new THREE.SphereGeometry(1, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.52));
  const nearHillMat = res.stdMat(isWedding ? '#89cf72' : '#7cb06f', 0.9, 0.0);
  const farHillMat = res.stdMat(isWedding ? '#a9d89c' : '#9cc29a', 0.92, 0.0);
  const treeCanopyMat = res.stdMat(isWedding ? '#68ba64' : '#73a86b', 0.86, 0.0);
  const blossomAccentMat = res.stdMat(isWedding ? '#ffd2df' : '#ffc2d9', 0.78, 0.0);
  const treeGeo = res.geo(new THREE.IcosahedronGeometry(1.5, 1));

  // Inner rolling hills
  const innerCount = 14;
  for (let i = 0; i < innerCount; i++) {
    const ang = (i / innerCount) * Math.PI * 2 + 0.15;
    const dist = 25 + (i % 3) * 3.5;
    const hill = new THREE.Mesh(hillGeo, nearHillMat);
    hill.position.set(Math.sin(ang) * dist, -0.5, Math.cos(ang) * dist - 2);
    hill.scale.set(9.5 + (i % 3) * 2.5, 2.8 + (i % 4) * 0.75, 8.5 + (i % 2) * 2.0);
    parent.add(hill);
  }

  // Far misty-pastel hills rising behind the stage horizon
  const farCount = 12;
  for (let i = 0; i < farCount; i++) {
    const ang = (i / farCount) * Math.PI * 2;
    const dist = 36 + (i % 2) * 4;
    const hill = new THREE.Mesh(hillGeo, farHillMat);
    hill.position.set(Math.sin(ang) * dist, -0.6, Math.cos(ang) * dist - 4);
    hill.scale.set(13.5 + (i % 3) * 3.0, 4.8 + (i % 3) * 1.4, 11.0);
    parent.add(hill);
  }

  // Soft distant treeline silhouettes tucked around the back & side horizon
  const treeCount = 28;
  for (let i = 0; i < treeCount; i++) {
    const t = i / (treeCount - 1);
    const ang = THREE.MathUtils.lerp(-Math.PI * 0.82, Math.PI * 0.82, t);
    const dist = 17.5 + (i % 4) * 2.4;
    const mat = i % 5 === 0 ? blossomAccentMat : treeCanopyMat;
    const puff = new THREE.Mesh(treeGeo, mat);
    const sc = 0.95 + (i % 3) * 0.35;
    puff.position.set(Math.sin(ang) * dist, 1.15 * sc, -2.5 - Math.cos(ang) * dist);
    puff.scale.set(1.15 * sc, 1.05 * sc, 1.0 * sc);
    parent.add(puff);
  }
}

function createDustPool(
  res: StageResourceTracker,
  parent: THREE.Group,
): { particles: DustParticle[]; spawn: (pos: THREE.Vector3, count?: number) => void } {
  const puffGeo = res.geo(new THREE.IcosahedronGeometry(0.13, 1));
  const starGeo = res.geo(new THREE.OctahedronGeometry(0.085, 0));

  const particles: DustParticle[] = [];
  const total = 56;

  for (let i = 0; i < total; i++) {
    const isStar = i % 4 === 0;
    const mat = res.stdMat(isStar ? '#ffe066' : '#fffbf2', 0.75, 0.0, {
      transparent: true,
      opacity: 0.9,
      emissive: isStar ? '#ffb703' : '#fff5e4',
      emissiveIntensity: isStar ? 0.35 : 0.12,
    });
    const mesh = new THREE.Mesh(isStar ? starGeo : puffGeo, mat);
    mesh.visible = false;
    parent.add(mesh);
    particles.push({
      mesh,
      mat,
      velocity: new THREE.Vector3(),
      age: 0,
      maxAge: 0.6,
      baseScale: isStar ? 0.85 : 1.0,
      spinSpeed: (i % 2 === 0 ? 1 : -1) * 4.5,
      active: false,
    });
  }

  let cursor = 0;
  const spawn = (pos: THREE.Vector3, count = 7): void => {
    const clamped = Math.min(count, 16);
    for (let i = 0; i < clamped; i++) {
      const p = particles[cursor];
      cursor = (cursor + 1) % particles.length;

      const angle = (i / clamped) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const radialSpeed = 0.8 + Math.random() * 1.35;
      p.mesh.position.set(
        pos.x + (Math.random() - 0.5) * 0.24,
        pos.y + 0.08 + Math.random() * 0.16,
        pos.z + (Math.random() - 0.5) * 0.24,
      );
      p.velocity.set(
        Math.cos(angle) * radialSpeed,
        1.15 + Math.random() * 1.25,
        Math.sin(angle) * radialSpeed,
      );
      p.age = 0;
      p.maxAge = 0.45 + Math.random() * 0.3;
      p.baseScale = 0.65 + Math.random() * 0.7;
      p.active = true;
      p.mesh.visible = true;
      p.mesh.scale.setScalar(0.1);
      p.mat.opacity = 0.92;
    }
  };

  return { particles, spawn };
}

function buildWoodenEaselBoard(
  res: StageResourceTracker,
  imageUrl: string,
  accentColor: string,
  stageId: StageId,
): THREE.Group {
  const easel = new THREE.Group();
  const isShrineStyle = stageId === 'school_trip';
  const woodColor =
    stageId === 'school_trip'
      ? '#7c4d2f'
      : stageId === 'tropical_beach'
        ? '#d8b482'
        : stageId === 'sports_day'
          ? '#c4834b'
          : '#c8925a';
  const darkWoodColor =
    stageId === 'school_trip'
      ? '#5c361e'
      : stageId === 'tropical_beach'
        ? '#b8905c'
        : '#a06a3a';
  const woodMat = res.stdMat(woodColor, 0.68);
  const darkWoodMat = res.stdMat(darkWoodColor, 0.72);

  // Three sturdy A-frame easel legs
  const legGeo = res.geo(new THREE.CylinderGeometry(0.032, 0.038, 1.85, 8));
  const leftLeg = new THREE.Mesh(legGeo, woodMat);
  leftLeg.position.set(-0.34, 0.88, 0.04);
  leftLeg.rotation.set(-0.14, 0, -0.15);
  leftLeg.castShadow = true;
  easel.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, woodMat);
  rightLeg.position.set(0.34, 0.88, 0.04);
  rightLeg.rotation.set(-0.14, 0, 0.15);
  rightLeg.castShadow = true;
  easel.add(rightLeg);

  const backLeg = new THREE.Mesh(legGeo, darkWoodMat);
  backLeg.position.set(0, 0.86, -0.34);
  backLeg.rotation.set(0.36, 0, 0);
  backLeg.castShadow = true;
  easel.add(backLeg);

  // Horizontal ledge shelf
  const shelfGeo = res.geo(new THREE.BoxGeometry(1.18, 0.06, 0.14));
  const shelf = new THREE.Mesh(shelfGeo, darkWoodMat);
  shelf.position.set(0, 0.72, 0.12);
  shelf.rotation.x = -0.14;
  shelf.castShadow = true;
  easel.add(shelf);

  // Framed board panel
  const boardGroup = new THREE.Group();
  boardGroup.position.set(0, 1.18, 0.04);
  boardGroup.rotation.x = -0.14;
  easel.add(boardGroup);

  const frameGeo = res.geo(new THREE.BoxGeometry(1.12, 0.86, 0.06));
  const frameMat =
    stageId === 'school_trip'
      ? darkWoodMat
      : stageId === 'sports_day'
        ? res.stdMat('#e63946', 0.5)
        : stageId === 'tropical_beach'
          ? res.stdMat('#f6e4c4', 0.62)
          : res.stdMat('#fffbf5', 0.58);
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.castShadow = true;
  frame.receiveShadow = true;
  boardGroup.add(frame);

  // Artwork canvas with immediate warm cream fallback & async composited calligraphy upgrade
  const fallbackTex = createBoardFallbackTexture(res, accentColor, stageId);
  const artMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: fallbackTex,
      roughness: 0.55,
      metalness: 0.0,
    }),
  );
  const artGeo = res.geo(new THREE.PlaneGeometry(0.98, 0.72));
  const art = new THREE.Mesh(artGeo, artMat);
  art.position.z = 0.034;
  boardGroup.add(art);

  const loader = new THREE.TextureLoader();
  loader.load(
    imageUrl,
    (loadedTex) => {
      if (res.disposed) {
        loadedTex.dispose();
        return;
      }
      // Composite crisp Japanese calligraphy title onto the loaded JPG art in a 512x512 CanvasTexture
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx && loadedTex.image) {
        ctx.drawImage(loadedTex.image as CanvasImageSource, 0, 0, 512, 512);
        paintBoardCalligraphy(ctx, 512, 512, stageId);
      }
      loadedTex.dispose();

      const compositedTex = res.tex(new THREE.CanvasTexture(canvas));
      compositedTex.colorSpace = THREE.SRGBColorSpace;
      compositedTex.anisotropy = 4;
      artMat.map = compositedTex;
      artMat.needsUpdate = true;
    },
    undefined,
    () => {
      // Gracefully keep warm cream fallback texture if image is unavailable
    },
  );

  // Stage-specific charming topper accent!
  if (isShrineStyle) {
    const roofGeo = res.geo(new THREE.BoxGeometry(1.32, 0.07, 0.34));
    const roof = new THREE.Mesh(roofGeo, res.stdMat('#3b3e47', 0.75));
    roof.position.set(0, 0.48, 0.03);
    roof.rotation.x = 0.2;
    roof.castShadow = true;
    boardGroup.add(roof);
  } else if (stageId === 'sports_day') {
    // Festive miniature red-white-gold sports pennant garland across top of board!
    const miniFlagGeo = res.geo(new THREE.ConeGeometry(0.06, 0.13, 3));
    const colors = ['#e63946', '#ffffff', '#ffd166', '#3a86ff', '#e63946', '#ffffff', '#ffd166'];
    for (let i = 0; i < colors.length; i++) {
      const t = i / (colors.length - 1);
      const x = THREE.MathUtils.lerp(-0.48, 0.48, t);
      const sag = Math.sin(t * Math.PI) * 0.035;
      const flag = new THREE.Mesh(miniFlagGeo, res.stdMat(colors[i], 0.48));
      flag.position.set(x, 0.47 - sag, 0.045);
      flag.rotation.z = Math.PI;
      boardGroup.add(flag);
    }
  } else if (stageId === 'tropical_beach') {
    // Bright tropical hibiscus blossoms & palm leaf topper!
    const leafGeo = res.geo(new THREE.SphereGeometry(0.08, 8, 8));
    const leafMat = res.stdMat('#38b000', 0.62);
    const hibGeo = res.geo(new THREE.DodecahedronGeometry(0.082, 0));
    const hibColors = ['#ff595e', '#ffca3a', '#00bbf9', '#ff595e', '#ffca3a'];
    for (let i = 0; i < 5; i++) {
      const t = i / 4;
      const x = THREE.MathUtils.lerp(-0.42, 0.42, t);
      const arch = Math.sin(t * Math.PI) * 0.04;
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(x, 0.44 + arch, 0.04);
      leaf.scale.set(1.4, 0.48, 0.55);
      boardGroup.add(leaf);

      const hib = new THREE.Mesh(hibGeo, res.stdMat(hibColors[i], 0.48));
      hib.position.set(x, 0.47 + arch, 0.064);
      boardGroup.add(hib);
    }
  } else {
    const roseGeo = res.geo(new THREE.DodecahedronGeometry(0.078, 0));
    const leafGeo = res.geo(new THREE.SphereGeometry(0.075, 8, 8));
    const leafMat = res.stdMat('#67bc70', 0.65);
    const corsageColors = ['#ff8fab', '#ffe0b5', '#fff0f5', '#ffb3c6', '#fff0f5', '#ffe0b5', '#ff8fab'];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = THREE.MathUtils.lerp(-0.46, 0.46, t);
      const arch = Math.sin(t * Math.PI) * 0.035;

      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(x, 0.44 + arch, 0.04);
      leaf.scale.set(1.2, 0.55, 0.6);
      boardGroup.add(leaf);

      const rose = new THREE.Mesh(roseGeo, res.stdMat(corsageColors[i], 0.55));
      rose.position.set(x, 0.465 + arch, 0.062);
      boardGroup.add(rose);
    }
  }

  return easel;
}

function buildFloatingPetals(
  res: StageResourceTracker,
  parent: THREE.Group,
  petalsOut: FloatingPetal[],
  palette: string[],
  count: number,
): void {
  const petalGeo = res.geo(new THREE.CircleGeometry(0.055, 6));
  const mats = palette.map((hex) =>
    res.stdMat(hex, 0.5, 0.0, {
      side: THREE.DoubleSide,
      emissive: hex,
      emissiveIntensity: 0.15,
    }),
  );

  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(petalGeo, mats[i % mats.length]);
    mesh.scale.set(1.15, 0.72, 1);
    const minX = -6.5;
    const maxX = 6.5;
    const minZ = -4.2;
    const maxZ = 3.2;
    const maxY = 5.4;

    mesh.position.set(
      minX + Math.random() * (maxX - minX),
      0.5 + Math.random() * maxY,
      minZ + Math.random() * (maxZ - minZ),
    );
    mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    parent.add(mesh);

    petalsOut.push({
      mesh,
      speedY: 0.28 + Math.random() * 0.34,
      driftX: 0.22 + Math.random() * 0.26,
      driftZ: (Math.random() - 0.5) * 0.18,
      swayPhase: Math.random() * Math.PI * 2,
      swayAmp: 0.35 + Math.random() * 0.35,
      spinX: (Math.random() - 0.5) * 2.2,
      spinY: (Math.random() - 0.5) * 2.4,
      spinZ: (Math.random() - 0.5) * 2.0,
      minX,
      maxX,
      minZ,
      maxZ,
      maxY,
    });
  }
}

// ============================================================================
// Stage 1: Wedding Garden (ガーデンウェディング)
// ============================================================================

function buildWeddingStage(
  stage: StageSpec,
  res: StageResourceTracker,
  root: THREE.Group,
  petalsOut: FloatingPetal[],
  swayTargets: SwayTarget[],
): void {
  // 1. Lush sunlit garden lawn with striped grass texture
  const lawnTex = createLawnTexture(res);
  const lawnMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: lawnTex,
      roughness: 0.85,
      metalness: 0.0,
    }),
  );
  const lawnGeo = res.geo(new THREE.CircleGeometry(38, 48));
  const lawn = new THREE.Mesh(lawnGeo, lawnMat);
  lawn.rotation.x = -Math.PI / 2;
  lawn.receiveShadow = true;
  root.add(lawn);

  // Soft cream stone garden path leading in front of the group
  const stoneMat = res.stdMat('#f6efe2', 0.82);
  const stoneGeo = res.geo(new THREE.CylinderGeometry(0.45, 0.48, 0.03, 12));
  const stones: Array<[number, number, number, number]> = [
    [-1.4, 1.35, 1.2, 0.8],
    [-0.1, 1.55, 1.35, 0.88],
    [1.3, 1.38, 1.2, 0.82],
    [-0.75, 2.5, 1.15, 0.78],
    [0.65, 2.65, 1.25, 0.82],
    [0.0, 3.7, 1.4, 0.9],
  ];
  for (const [sx, sz, rx, rz] of stones) {
    const stone = new THREE.Mesh(stoneGeo, stoneMat);
    stone.position.set(sx, 0.008, sz);
    stone.scale.set(rx, 1, rz);
    stone.receiveShadow = true;
    root.add(stone);
  }

  // 2. White wooden 2-tier photo riser EXACTLY matching stage.platforms
  const plankTex = createWoodPlankTexture(res, '#fffdf9');
  const riserTopMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: plankTex,
      roughness: 0.62,
      metalness: 0.02,
    }),
  );
  const whiteWoodMat = res.stdMat('#fcfaf5', 0.62);
  const trimWoodMat = res.stdMat('#efe7dc', 0.66);

  for (const p of stage.platforms) {
    buildWeddingRiser(p, res, root, riserTopMat, whiteWoodMat, trimWoodMat);
  }

  // 3. Grand white floral wedding arch directly behind the riser
  buildWeddingArch(res, root);

  // 4. Charming wooden welcome board easel displaying ./assets/wedding-board.jpg
  const easel = buildWoodenEaselBoard(
    res,
    './assets/wedding-board.jpg',
    '#f2849e',
    'wedding',
  );
  easel.position.set(3.95, 0, -0.35);
  easel.rotation.y = -0.44;
  root.add(easel);

  // 5. White picket fence curving gracefully around the garden
  buildPicketFenceArc(res, root, whiteWoodMat);

  // 6. Stylized Animal Crossing pastel blooming trees & tall cypresses
  buildGardenTreesAndBushes(res, root);

  // 7. Cheerful triangular pastel bunting garlands swaying gently in the breeze
  buildBuntingGarlands(res, root, whiteWoodMat, swayTargets);

  // 8. Drifting sunlit rose petals
  buildFloatingPetals(
    res,
    root,
    petalsOut,
    ['#ffb3c6', '#ffe5ec', '#ffd6a5', '#fff5f7'],
    38,
  );
}

function buildWeddingRiser(
  p: PlatformTier,
  res: StageResourceTracker,
  root: THREE.Group,
  topMat: THREE.Material,
  whiteWoodMat: THREE.Material,
  trimMat: THREE.Material,
): void {
  const width = p.maxX - p.minX;
  const depth = p.maxZ - p.minZ;
  const cx = (p.minX + p.maxX) * 0.5;
  const cz = (p.minZ + p.maxZ) * 0.5;
  const deckThick = 0.07;
  const bodyH = p.height - deckThick;

  const group = new THREE.Group();
  group.position.set(cx, 0, cz);
  root.add(group);

  // Lower white painted skirt base (recessed slightly for crisp 2-tier visual shadow line)
  const baseGeo = res.geo(new THREE.BoxGeometry(width - 0.1, bodyH, depth - 0.08));
  const base = new THREE.Mesh(baseGeo, trimMat);
  base.position.y = bodyH * 0.5;
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  // Top planked deck whose top surface sits at EXACT y = p.height!
  const deckGeo = res.geo(new THREE.BoxGeometry(width, deckThick, depth));
  const deck = new THREE.Mesh(deckGeo, topMat);
  deck.position.y = p.height - deckThick * 0.5;
  deck.castShadow = true;
  deck.receiveShadow = true;
  group.add(deck);

  // Chamfered front edge lip molding
  const lipGeo = res.geo(new THREE.CylinderGeometry(0.032, 0.032, width, 10));
  const lip = new THREE.Mesh(lipGeo, whiteWoodMat);
  lip.rotation.z = Math.PI / 2;
  lip.position.set(0, p.height - 0.032, depth * 0.5);
  lip.castShadow = true;
  group.add(lip);

  // Decorative white vertical panel posts across front fascia
  const postGeo = res.geo(new THREE.BoxGeometry(0.08, bodyH, 0.06));
  const postCount = 6;
  for (let i = 0; i < postCount; i++) {
    const px = -width * 0.46 + (i / (postCount - 1)) * width * 0.92;
    const post = new THREE.Mesh(postGeo, whiteWoodMat);
    post.position.set(px, bodyH * 0.5, depth * 0.5 - 0.03);
    post.castShadow = true;
    group.add(post);
  }

  // Subtle decorative lower front molding baseboard
  const trimGeo = res.geo(new THREE.BoxGeometry(width + 0.04, 0.06, depth + 0.04));
  const trim = new THREE.Mesh(trimGeo, whiteWoodMat);
  trim.position.y = 0.03;
  trim.receiveShadow = true;
  group.add(trim);
}

function buildWeddingArch(res: StageResourceTracker, root: THREE.Group): void {
  const archGroup = new THREE.Group();
  archGroup.position.set(0, 0, -2.65);
  root.add(archGroup);

  const whiteMat = res.stdMat('#ffffff', 0.55);
  const creamMat = res.stdMat('#f7f0e6', 0.6);
  const spanX = 2.65;
  const pillarH = 2.55;

  // Twin fluted pillars + square pedestals
  const pedGeo = res.geo(new THREE.BoxGeometry(0.46, 0.34, 0.46));
  const pillarGeo = res.geo(new THREE.CylinderGeometry(0.14, 0.16, pillarH, 16));
  const capGeo = res.geo(new THREE.BoxGeometry(0.42, 0.14, 0.42));

  for (const s of [-1, 1]) {
    const ped = new THREE.Mesh(pedGeo, creamMat);
    ped.position.set(s * spanX, 0.17, 0);
    ped.castShadow = true;
    ped.receiveShadow = true;
    archGroup.add(ped);

    const pillar = new THREE.Mesh(pillarGeo, whiteMat);
    pillar.position.set(s * spanX, 0.34 + pillarH * 0.5, 0);
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    archGroup.add(pillar);

    const cap = new THREE.Mesh(capGeo, creamMat);
    cap.position.set(s * spanX, 0.34 + pillarH, 0);
    cap.castShadow = true;
    archGroup.add(cap);
  }

  // Grand semicircular overhead arch + inner trellis ring
  const outerArcGeo = res.geo(new THREE.TorusGeometry(spanX, 0.14, 12, 36, Math.PI));
  const outerArc = new THREE.Mesh(outerArcGeo, whiteMat);
  outerArc.position.y = 0.34 + pillarH;
  outerArc.scale.set(1, 0.72, 1);
  outerArc.castShadow = true;
  archGroup.add(outerArc);

  const innerArcGeo = res.geo(new THREE.TorusGeometry(spanX - 0.28, 0.06, 10, 32, Math.PI));
  const innerArc = new THREE.Mesh(innerArcGeo, creamMat);
  innerArc.position.y = 0.34 + pillarH;
  innerArc.scale.set(1, 0.7, 1);
  archGroup.add(innerArc);

  // Abundant green ivy clusters + pink/peach/ivory roses draped across the arch!
  const vineMats = [
    res.stdMat('#52ad63', 0.68),
    res.stdMat('#6ec473', 0.65),
    res.stdMat('#3f9152', 0.72),
  ];
  const roseMats = [
    res.stdMat('#ff8fab', 0.52),
    res.stdMat('#ffb3c6', 0.52),
    res.stdMat('#ffd6a5', 0.52),
    res.stdMat('#fff4f6', 0.52),
    res.stdMat('#f76e92', 0.52),
  ];
  const leafGeo = res.geo(new THREE.DodecahedronGeometry(0.24, 1));
  const roseGeo = res.geo(new THREE.DodecahedronGeometry(0.15, 0));

  const arcCenterY = 0.34 + pillarH;
  const flowerCount = 26;
  for (let i = 0; i <= flowerCount; i++) {
    const t = i / flowerCount;
    const ang = t * Math.PI;
    const ax = Math.cos(ang) * spanX;
    const ay = arcCenterY + Math.sin(ang) * spanX * 0.72;
    const jitterZ = Math.sin(i * 2.7) * 0.14;

    const leaf = new THREE.Mesh(leafGeo, vineMats[i % vineMats.length]);
    leaf.position.set(ax, ay, jitterZ);
    leaf.scale.set(1.2, 0.9, 1.0);
    leaf.castShadow = true;
    archGroup.add(leaf);

    // Denser floral bouquet near the top crown & shoulders
    if (i % 2 === 0 || (t > 0.35 && t < 0.65)) {
      const rose = new THREE.Mesh(roseGeo, roseMats[i % roseMats.length]);
      rose.position.set(
        ax + Math.cos(i * 1.9) * 0.14,
        ay + Math.sin(i * 2.3) * 0.12,
        0.18 + Math.abs(jitterZ) * 0.5,
      );
      rose.castShadow = true;
      archGroup.add(rose);
    }
  }

  // Lush pillar-top floral corsages
  for (const s of [-1, 1]) {
    for (let j = 0; j < 5; j++) {
      const a = (j / 5) * Math.PI * 2;
      const rose = new THREE.Mesh(roseGeo, roseMats[(j + (s > 0 ? 2 : 0)) % roseMats.length]);
      rose.position.set(
        s * spanX + Math.cos(a) * 0.24,
        arcCenterY - 0.08 + Math.sin(a) * 0.16,
        0.22,
      );
      archGroup.add(rose);
    }
  }
}

function buildPicketFenceArc(
  res: StageResourceTracker,
  root: THREE.Group,
  whiteMat: THREE.Material,
): void {
  const fenceGroup = new THREE.Group();
  root.add(fenceGroup);

  const picketGeo = res.geo(new THREE.BoxGeometry(0.11, 0.92, 0.04));
  const tipGeo = res.geo(new THREE.ConeGeometry(0.075, 0.14, 4));
  const railGeo = res.geo(new THREE.BoxGeometry(0.62, 0.07, 0.05));

  const radius = 8.4;
  const count = 34;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const angle = THREE.MathUtils.lerp(-Math.PI * 0.68, Math.PI * 0.68, t);
    const x = Math.sin(angle) * radius;
    const z = -1.2 - Math.cos(angle) * radius;

    const pGroup = new THREE.Group();
    pGroup.position.set(x, 0, z);
    pGroup.rotation.y = -angle;

    const picket = new THREE.Mesh(picketGeo, whiteMat);
    picket.position.y = 0.46;
    picket.castShadow = true;
    picket.receiveShadow = true;
    pGroup.add(picket);

    const tip = new THREE.Mesh(tipGeo, whiteMat);
    tip.position.y = 0.99;
    tip.rotation.y = Math.PI / 4;
    pGroup.add(tip);

    if (i < count - 1) {
      for (const ry of [0.28, 0.72]) {
        const rail = new THREE.Mesh(railGeo, whiteMat);
        rail.position.set(0.28, ry, -0.02);
        pGroup.add(rail);
      }
    }

    fenceGroup.add(pGroup);
  }
}

function buildGardenTreesAndBushes(res: StageResourceTracker, root: THREE.Group): void {
  const trunkMat = res.stdMat('#9c6b43', 0.8);
  const foliageGreen = res.stdMat('#5dbb63', 0.75);
  const foliageBright = res.stdMat('#7dd46f', 0.72);
  const cypressMat = res.stdMat('#3d8b59', 0.78);
  const blossomPink = res.stdMat('#ffb3c6', 0.64);
  const blossomCream = res.stdMat('#fff0d4', 0.64);

  const trunkGeo = res.geo(new THREE.CylinderGeometry(0.22, 0.34, 2.2, 10));
  const crownGeo = res.geo(new THREE.IcosahedronGeometry(1.2, 2));
  const cypressGeo = res.geo(new THREE.ConeGeometry(0.75, 4.2, 12));
  const bushGeo = res.geo(new THREE.DodecahedronGeometry(0.62, 1));

  // Stylized round Animal Crossing trees flanking background
  const trees: Array<[number, number, number, THREE.Material]> = [
    [-6.6, -4.8, 1.15, blossomPink],
    [6.8, -5.0, 1.2, blossomPink],
    [-8.5, -1.6, 1.05, foliageBright],
    [8.6, -1.8, 1.1, foliageBright],
    [-4.2, -7.8, 1.35, foliageGreen],
    [4.6, -7.6, 1.3, blossomCream],
  ];

  for (const [tx, tz, sc, crownMat] of trees) {
    const g = new THREE.Group();
    g.position.set(tx, 0, tz);
    g.scale.setScalar(sc);

    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.1;
    trunk.castShadow = true;
    g.add(trunk);

    const c1 = new THREE.Mesh(crownGeo, crownMat);
    c1.position.set(0, 2.75, 0);
    c1.castShadow = true;
    g.add(c1);

    const c2 = new THREE.Mesh(crownGeo, crownMat);
    c2.position.set(-0.78, 2.25, 0.35);
    c2.scale.setScalar(0.68);
    g.add(c2);

    const c3 = new THREE.Mesh(crownGeo, crownMat);
    c3.position.set(0.75, 2.3, -0.25);
    c3.scale.setScalar(0.72);
    g.add(c3);

    root.add(g);
  }

  // Mediterranean cypress accents behind the wedding arch
  const cypressCoords: Array<[number, number, number]> = [
    [-4.4, -4.9, 1.05],
    [-3.5, -5.8, 0.92],
    [3.8, -5.7, 0.98],
    [4.9, -4.8, 1.1],
  ];
  for (const [cx, cz, sc] of cypressCoords) {
    const c = new THREE.Mesh(cypressGeo, cypressMat);
    c.position.set(cx, 2.1 * sc, cz);
    c.scale.set(sc, sc, sc);
    c.castShadow = true;
    root.add(c);
  }

  // Cheerful blooming bushes framing the lawn edges
  const flowerDotGeo = res.geo(new THREE.SphereGeometry(0.11, 8, 8));
  const dotColors = ['#ff85a2', '#ffd166', '#ffffff', '#ff9f68'];
  const bushCoords: Array<[number, number, number]> = [
    [-5.2, -1.9, 1.05],
    [-5.5, 0.2, 0.9],
    [5.4, -2.0, 1.1],
    [5.6, 0.5, 0.88],
    [-3.6, -3.5, 0.95],
    [3.6, -3.5, 0.95],
  ];
  bushCoords.forEach(([bx, bz, sc], idx) => {
    const bGroup = new THREE.Group();
    bGroup.position.set(bx, 0, bz);
    const bush = new THREE.Mesh(bushGeo, idx % 2 === 0 ? foliageGreen : foliageBright);
    bush.position.y = 0.42 * sc;
    bush.scale.set(1.25 * sc, 0.85 * sc, 1.05 * sc);
    bush.castShadow = true;
    bush.receiveShadow = true;
    bGroup.add(bush);

    const dMat = res.stdMat(dotColors[idx % dotColors.length], 0.55);
    for (let j = 0; j < 4; j++) {
      const a = j * 1.6 + idx;
      const dot = new THREE.Mesh(flowerDotGeo, dMat);
      dot.position.set(Math.cos(a) * 0.48 * sc, (0.55 + (j % 2) * 0.2) * sc, Math.sin(a) * 0.42 * sc);
      bGroup.add(dot);
    }
    root.add(bGroup);
  });
}

function buildBuntingGarlands(
  res: StageResourceTracker,
  root: THREE.Group,
  whiteMat: THREE.Material,
  swayTargets: SwayTarget[],
): void {
  const poleGeo = res.geo(new THREE.CylinderGeometry(0.055, 0.065, 3.6, 10));
  const finialGeo = res.geo(new THREE.SphereGeometry(0.11, 10, 8));
  const poles: Array<[number, number]> = [
    [-5.3, -2.65],
    [5.3, -2.65],
  ];

  for (const [px, pz] of poles) {
    const pole = new THREE.Mesh(poleGeo, whiteMat);
    pole.position.set(px, 1.8, pz);
    pole.castShadow = true;
    root.add(pole);

    const finial = new THREE.Mesh(finialGeo, whiteMat);
    finial.position.set(px, 3.65, pz);
    root.add(finial);
  }

  // Two pastel pennant garlands connecting left pole -> arch -> right pole
  const flagColors = ['#ff8fab', '#ffe066', '#95e1d3', '#a0c4ff', '#fff0f5'];
  const flagMats = flagColors.map((hex) =>
    res.stdMat(hex, 0.58, 0.0, { side: THREE.DoubleSide }),
  );
  const flagShape = new THREE.Shape();
  flagShape.moveTo(-0.14, 0);
  flagShape.lineTo(0.14, 0);
  flagShape.lineTo(0, -0.32);
  flagShape.closePath();
  const flagGeo = res.geo(new THREE.ShapeGeometry(flagShape));
  const ropeMat = res.stdMat('#ffffff', 0.7);

  const spans: Array<[THREE.Vector3, THREE.Vector3]> = [
    [new THREE.Vector3(-5.3, 3.45, -2.65), new THREE.Vector3(-2.65, 3.15, -2.65)],
    [new THREE.Vector3(2.65, 3.15, -2.65), new THREE.Vector3(5.3, 3.45, -2.65)],
  ];

  spans.forEach(([start, end], sIdx) => {
    const mid = start.clone().lerp(end, 0.5);
    mid.y -= 0.52;
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const ropeGeo = res.geo(new THREE.TubeGeometry(curve, 18, 0.015, 6, false));
    root.add(new THREE.Mesh(ropeGeo, ropeMat));

    const flags = 7;
    for (let i = 1; i <= flags; i++) {
      const t = i / (flags + 1);
      const pt = curve.getPoint(t);
      const flag = new THREE.Mesh(flagGeo, flagMats[(i + sIdx * 2) % flagMats.length]);
      flag.position.copy(pt);
      root.add(flag);
      swayTargets.push({
        obj: flag,
        axis: 'x',
        baseRot: 0.06,
        amp: 0.22,
        speed: 2.6 + (i % 3) * 0.35,
        phase: i * 0.7 + sIdx,
      });
    }
  });
}

// ============================================================================
// Stage 2: School Trip Shrine Steps (修学旅行・古都の石段)
// ============================================================================

function buildSchoolTripStage(
  stage: StageSpec,
  res: StageResourceTracker,
  root: THREE.Group,
  petalsOut: FloatingPetal[],
  swayTargets: SwayTarget[],
): void {
  // 1. Traditional raked shrine gravel plaza + outer mossy greenery border
  const gravelTex = createGravelTexture(res);
  const gravelMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: gravelTex,
      roughness: 0.9,
      metalness: 0.0,
    }),
  );
  const plazaGeo = res.geo(new THREE.CircleGeometry(14, 40));
  const plaza = new THREE.Mesh(plazaGeo, gravelMat);
  plaza.rotation.x = -Math.PI / 2;
  plaza.receiveShadow = true;
  root.add(plaza);

  // Outer lush Kyoto hillside greenery surrounding the gravel courtyard
  const hillMat = res.stdMat('#67a85d', 0.88);
  const outerGeo = res.geo(new THREE.RingGeometry(13.5, 42, 40));
  const outer = new THREE.Mesh(outerGeo, hillMat);
  outer.rotation.x = -Math.PI / 2;
  outer.position.y = -0.02;
  outer.receiveShadow = true;
  root.add(outer);

  // Central stone approach slabs (sandō) leading up to the stairs
  const graniteTex = createGraniteStepTexture(res);
  const graniteMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: graniteTex,
      roughness: 0.82,
      metalness: 0.03,
    }),
  );
  const stoneTrimMat = res.stdMat('#c4beb3', 0.8);
  const darkStoneMat = res.stdMat('#8f8b84', 0.84);

  const approachGeo = res.geo(new THREE.BoxGeometry(2.8, 0.04, 4.2));
  const approach = new THREE.Mesh(approachGeo, graniteMat);
  approach.position.set(0, 0.01, 2.2);
  approach.receiveShadow = true;
  root.add(approach);

  // 2. Granite Stone Steps EXACTLY matching stage.platforms (step_1=0.36, step_2=0.72)
  let maxStepY = 0.72;
  let backZ = -2.45;
  let maxStepX = 4.1;
  for (const p of stage.platforms) {
    buildGraniteStep(p, res, root, graniteMat, stoneTrimMat);
    if (p.height > maxStepY) maxStepY = p.height;
    if (p.minZ < backZ) backZ = p.minZ;
    if (p.maxX > maxStepX) maxStepX = p.maxX;
  }

  // Upper shrine terrace behind the top step at y = maxStepY (supports Torii & shrine hall at z=-12!)
  const terraceDepth = 13.5;
  const terraceGeo = res.geo(new THREE.BoxGeometry(16, maxStepY, terraceDepth));
  const terrace = new THREE.Mesh(terraceGeo, graniteMat);
  terrace.position.set(0, maxStepY * 0.5, backZ - terraceDepth * 0.5);
  terrace.receiveShadow = true;
  root.add(terrace);

  // Carved stone side balustrades cleanly outside |x| > maxStepX (zero NPC clipping!)
  const cheekGeo = res.geo(new THREE.BoxGeometry(0.42, maxStepY + 0.35, 2.7));
  const capGeo = res.geo(new THREE.BoxGeometry(0.5, 0.1, 2.8));
  const postCapGeo = res.geo(new THREE.SphereGeometry(0.22, 12, 10));
  for (const s of [-1, 1]) {
    const bx = s * (maxStepX + 0.28);
    const cheek = new THREE.Mesh(cheekGeo, stoneTrimMat);
    cheek.position.set(bx, (maxStepY + 0.35) * 0.5, -1.25);
    cheek.castShadow = true;
    cheek.receiveShadow = true;
    root.add(cheek);

    const cap = new THREE.Mesh(capGeo, darkStoneMat);
    cap.position.set(bx, maxStepY + 0.4, -1.25);
    cap.castShadow = true;
    root.add(cap);

    // Rounded stone newel orb at front of balustrade
    const orb = new THREE.Mesh(postCapGeo, darkStoneMat);
    orb.position.set(bx, maxStepY + 0.56, 0.02);
    orb.castShadow = true;
    root.add(orb);
  }

  // 3. Iconic grand Vermilion Torii Gate + wooden shrine roof eaves silhouette behind it
  buildToriiAndShrine(res, root, maxStepY);

  // 4. Lush pink cherry blossom (sakura) trees flanking both sides
  buildSakuraTrees(res, root, maxStepY);

  // 5. Traditional stone lanterns (tōrō) & swaying festival paper lanterns (chōchin)
  buildShrineLanterns(res, root, stoneTrimMat, darkStoneMat, swayTargets);

  // 6. Wooden commemorative signboard easel displaying ./assets/shrine-board.jpg
  const easel = buildWoodenEaselBoard(
    res,
    './assets/shrine-board.jpg',
    '#d93829',
    'school_trip',
  );
  easel.position.set(4.35, 0, 1.05);
  easel.rotation.y = -0.48;
  root.add(easel);

  // 7. Swirling spring sakura petals
  buildFloatingPetals(
    res,
    root,
    petalsOut,
    ['#ffb7d5', '#ffd6e7', '#fff0f6', '#ffa3c8'],
    52,
  );
}

function buildGraniteStep(
  p: PlatformTier,
  res: StageResourceTracker,
  root: THREE.Group,
  graniteMat: THREE.Material,
  trimMat: THREE.Material,
): void {
  const width = p.maxX - p.minX;
  const depth = p.maxZ - p.minZ;
  const cx = (p.minX + p.maxX) * 0.5;
  const cz = (p.minZ + p.maxZ) * 0.5;
  const nosingH = 0.08;

  // Main granite step block reaching exact height = p.height
  const mainGeo = res.geo(new THREE.BoxGeometry(width, p.height - nosingH, depth));
  const main = new THREE.Mesh(mainGeo, trimMat);
  main.position.set(cx, (p.height - nosingH) * 0.5, cz);
  main.castShadow = true;
  main.receiveShadow = true;
  root.add(main);

  // Top dressed granite slab with crisp slight front nosing overhang
  const topGeo = res.geo(new THREE.BoxGeometry(width + 0.04, nosingH, depth + 0.05));
  const top = new THREE.Mesh(topGeo, graniteMat);
  top.position.set(cx, p.height - nosingH * 0.5, cz + 0.015);
  top.castShadow = true;
  top.receiveShadow = true;
  root.add(top);
}

function buildToriiAndShrine(
  res: StageResourceTracker,
  root: THREE.Group,
  baseY: number,
): void {
  const torii = new THREE.Group();
  // Positioned cleanly so the iconic curved kasagi top fits inside the camera frame
  torii.position.set(0, baseY, -3.85);
  root.add(torii);

  const vermilionMat = res.stdMat('#e03b26', 0.48, 0.05);
  const darkCapMat = res.stdMat('#2a2c33', 0.65, 0.08);
  const goldMat = res.stdMat('#f6c945', 0.32, 0.48);

  const halfSpan = 2.65;
  const pillarH = 3.55;

  // Black stone base pedestals (kamebara) + slightly battered vermilion pillars (hashira)
  const plinthGeo = res.geo(new THREE.CylinderGeometry(0.28, 0.34, 0.5, 16));
  const pillarGeo = res.geo(new THREE.CylinderGeometry(0.185, 0.23, pillarH, 16));

  for (const s of [-1, 1]) {
    const plinth = new THREE.Mesh(plinthGeo, darkCapMat);
    plinth.position.set(s * halfSpan, 0.25, 0);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    torii.add(plinth);

    const pillar = new THREE.Mesh(pillarGeo, vermilionMat);
    pillar.position.set(s * (halfSpan - 0.08), pillarH * 0.5 + 0.12, 0);
    pillar.rotation.z = s * 0.035;
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    torii.add(pillar);
  }

  // Lower horizontal tie beam (nuki) with protruding ends
  const nukiGeo = res.geo(new THREE.BoxGeometry(halfSpan * 2 + 1.5, 0.22, 0.22));
  const nuki = new THREE.Mesh(nukiGeo, vermilionMat);
  nuki.position.set(0, pillarH - 0.68, 0);
  nuki.castShadow = true;
  torii.add(nuki);

  // Upper lintel (kasagi) + dark curved slate cap (shimaki) with iconic upturned wing tips
  const lintelGeo = res.geo(new THREE.BoxGeometry(halfSpan * 2 + 1.85, 0.26, 0.34));
  const lintel = new THREE.Mesh(lintelGeo, vermilionMat);
  lintel.position.set(0, pillarH + 0.06, 0);
  lintel.castShadow = true;
  torii.add(lintel);

  const capCenterGeo = res.geo(new THREE.BoxGeometry(halfSpan * 2 + 1.76, 0.13, 0.44));
  const capCenter = new THREE.Mesh(capCenterGeo, darkCapMat);
  capCenter.position.set(0, pillarH + 0.24, 0);
  capCenter.castShadow = true;
  torii.add(capCenter);

  const wingGeo = res.geo(new THREE.BoxGeometry(0.92, 0.22, 0.4));
  const wingCapGeo = res.geo(new THREE.BoxGeometry(0.98, 0.11, 0.46));
  for (const s of [-1, 1]) {
    const wing = new THREE.Mesh(wingGeo, vermilionMat);
    wing.position.set(s * (halfSpan + 1.22), pillarH + 0.22, 0);
    wing.rotation.z = s * 0.28;
    wing.castShadow = true;
    torii.add(wing);

    const wCap = new THREE.Mesh(wingCapGeo, darkCapMat);
    wCap.position.set(s * (halfSpan + 1.23), pillarH + 0.38, 0);
    wCap.rotation.z = s * 0.28;
    torii.add(wCap);
  }

  // Center gilded shrine plaque (gakuzuka) with crisp vertical gold kanji 「古都神社」
  const plaqueFrameGeo = res.geo(new THREE.BoxGeometry(0.54, 0.72, 0.14));
  const plaque = new THREE.Mesh(plaqueFrameGeo, darkCapMat);
  plaque.position.set(0, pillarH - 0.3, 0.06);
  plaque.castShadow = true;
  torii.add(plaque);

  const plaqueTex = createToriiPlaqueTexture(res);
  const plaqueFaceMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: plaqueTex,
      roughness: 0.42,
      metalness: 0.18,
    }),
  );
  const plaqueFaceGeo = res.geo(new THREE.PlaneGeometry(0.46, 0.64));
  const plaqueFace = new THREE.Mesh(plaqueFaceGeo, plaqueFaceMat);
  plaqueFace.position.set(0, pillarH - 0.3, 0.135);
  torii.add(plaqueFace);

  // Traditional warm cedar shrine pavilion set cleanly back at z = -12 with horizontal layered roof eaves
  const shrine = new THREE.Group();
  shrine.position.set(0, baseY, -12.0);
  root.add(shrine);

  const cedarWallMat = res.stdMat('#b88354', 0.78);
  const plasterMat = res.stdMat('#fbf4e6', 0.84);
  const timberMat = res.stdMat('#7a4528', 0.72);
  const eaveTileMat = res.stdMat('#474f5e', 0.72);
  const upperTileMat = res.stdMat('#3b4250', 0.74);

  // Stone foundation deck
  const baseDeckGeo = res.geo(new THREE.BoxGeometry(11.6, 0.45, 4.8));
  const baseDeck = new THREE.Mesh(baseDeckGeo, res.stdMat('#cbc5ba', 0.84));
  baseDeck.position.y = 0.225;
  shrine.add(baseDeck);

  // Warm cedar lower wainscoting + bright cream shikkui plaster upper walls
  const hallLowerGeo = res.geo(new THREE.BoxGeometry(10.6, 1.55, 3.8));
  const hallLower = new THREE.Mesh(hallLowerGeo, cedarWallMat);
  hallLower.position.y = 1.22;
  shrine.add(hallLower);

  const hallUpperGeo = res.geo(new THREE.BoxGeometry(10.5, 1.55, 3.74));
  const hallUpper = new THREE.Mesh(hallUpperGeo, plasterMat);
  hallUpper.position.y = 2.75;
  shrine.add(hallUpper);

  // Vertical cedar veranda pillars & warm timber beams
  const beamGeo = res.geo(new THREE.BoxGeometry(0.24, 3.2, 0.24));
  for (let i = -3; i <= 3; i++) {
    const b = new THREE.Mesh(beamGeo, timberMat);
    b.position.set(i * 1.65, 2.0, 1.98);
    shrine.add(b);
  }
  const lintelBeamGeo = res.geo(new THREE.BoxGeometry(10.8, 0.22, 0.26));
  const lintelBeam = new THREE.Mesh(lintelBeamGeo, timberMat);
  lintelBeam.position.set(0, 3.45, 1.98);
  shrine.add(lintelBeam);

  // Clean horizontal wide layered roof eaves (no harsh diagonal pyramid slicing across the Torii!)
  const lowerEaveGeo = res.geo(new THREE.BoxGeometry(12.6, 0.36, 5.2));
  const lowerEave = new THREE.Mesh(lowerEaveGeo, eaveTileMat);
  lowerEave.position.set(0, 3.75, 0.15);
  shrine.add(lowerEave);

  const midRoofGeo = res.geo(new THREE.BoxGeometry(11.4, 0.52, 4.3));
  const midRoof = new THREE.Mesh(midRoofGeo, upperTileMat);
  midRoof.position.set(0, 4.18, 0.05);
  shrine.add(midRoof);

  const topRoofGeo = res.geo(new THREE.BoxGeometry(9.8, 0.56, 3.1));
  const topRoof = new THREE.Mesh(topRoofGeo, upperTileMat);
  topRoof.position.set(0, 4.72, 0);
  shrine.add(topRoof);

  const ridgeGeo = res.geo(new THREE.BoxGeometry(10.4, 0.28, 0.42));
  const ridge = new THREE.Mesh(ridgeGeo, darkCapMat);
  ridge.position.set(0, 5.12, 0);
  shrine.add(ridge);

  const finialGeo = res.geo(new THREE.BoxGeometry(0.28, 0.42, 0.46));
  for (const s of [-1, 1]) {
    const fin = new THREE.Mesh(finialGeo, goldMat);
    fin.position.set(s * 5.1, 5.26, 0);
    shrine.add(fin);
  }
}

function buildSakuraTrees(
  res: StageResourceTracker,
  root: THREE.Group,
  terraceY: number,
): void {
  const barkMat = res.stdMat('#5d4137', 0.82);
  const sakuraLight = res.stdMat('#ffd1e3', 0.65);
  const sakuraMid = res.stdMat('#ffabc9', 0.65);
  const sakuraSoft = res.stdMat('#fff0f6', 0.64);

  const trunkGeo = res.geo(new THREE.CylinderGeometry(0.24, 0.38, 2.7, 10));
  const branchGeo = res.geo(new THREE.CylinderGeometry(0.12, 0.2, 1.6, 8));
  const cloudGeo = res.geo(new THREE.IcosahedronGeometry(1.15, 2));

  const placements: Array<[number, number, number, number]> = [
    [-5.4, terraceY, -3.4, 1.18],
    [5.5, terraceY, -3.3, 1.22],
    [-6.9, 0, -0.4, 1.02],
    [6.9, 0, -0.6, 1.05],
    [-4.8, terraceY, -6.5, 1.3],
    [4.9, terraceY, -6.4, 1.28],
  ];

  placements.forEach(([x, y, z, sc], idx) => {
    const tree = new THREE.Group();
    tree.position.set(x, y, z);
    tree.scale.setScalar(sc);

    const trunk = new THREE.Mesh(trunkGeo, barkMat);
    trunk.position.y = 1.3;
    trunk.rotation.z = x < 0 ? -0.14 : 0.14;
    trunk.castShadow = true;
    tree.add(trunk);

    // Reaching flowering branches leaning gracefully inward to frame the shot
    const b1 = new THREE.Mesh(branchGeo, barkMat);
    b1.position.set(x < 0 ? 0.65 : -0.65, 2.35, 0.1);
    b1.rotation.z = x < 0 ? -0.65 : 0.65;
    tree.add(b1);

    const puffs: Array<[number, number, number, number, THREE.Material]> = [
      [0, 3.15, 0, 1.12, sakuraMid],
      [x < 0 ? 1.15 : -1.15, 2.85, 0.25, 0.92, sakuraLight],
      [x < 0 ? -0.9 : 0.9, 2.75, -0.2, 0.86, sakuraSoft],
      [0.15, 3.65, -0.35, 0.85, sakuraSoft],
      [x < 0 ? 0.55 : -0.55, 2.45, 0.72, 0.72, sakuraLight],
    ];
    for (const [px, py, pz, ps, mat] of puffs) {
      const puff = new THREE.Mesh(cloudGeo, mat);
      puff.position.set(px, py, pz);
      puff.scale.set(ps * 1.15, ps * 0.82, ps * 1.05);
      puff.castShadow = idx < 4;
      tree.add(puff);
    }

    root.add(tree);
  });
}

function buildShrineLanterns(
  res: StageResourceTracker,
  root: THREE.Group,
  stoneMat: THREE.Material,
  darkStoneMat: THREE.Material,
  swayTargets: SwayTarget[],
): void {
  // 1. Pair of traditional carved stone lanterns (tōrō) flanking the front steps
  const glowMat = res.stdMat('#fff2b2', 0.4, 0.0, {
    emissive: '#ffb703',
    emissiveIntensity: 0.75,
  });
  const baseGeo = res.geo(new THREE.CylinderGeometry(0.32, 0.42, 0.24, 6));
  const shaftGeo = res.geo(new THREE.CylinderGeometry(0.14, 0.18, 0.85, 6));
  const trayGeo = res.geo(new THREE.CylinderGeometry(0.32, 0.22, 0.16, 6));
  const fireboxGeo = res.geo(new THREE.CylinderGeometry(0.19, 0.19, 0.34, 6));
  const roofGeo = res.geo(new THREE.ConeGeometry(0.48, 0.36, 6));
  const jewelGeo = res.geo(new THREE.SphereGeometry(0.09, 10, 8));

  for (const s of [-1, 1]) {
    const toro = new THREE.Group();
    toro.position.set(s * 4.55, 0, 0.32);

    const b = new THREE.Mesh(baseGeo, darkStoneMat);
    b.position.y = 0.12;
    b.castShadow = true;
    toro.add(b);

    const sh = new THREE.Mesh(shaftGeo, stoneMat);
    sh.position.y = 0.64;
    sh.castShadow = true;
    toro.add(sh);

    const tr = new THREE.Mesh(trayGeo, darkStoneMat);
    tr.position.y = 1.12;
    tr.castShadow = true;
    toro.add(tr);

    const fb = new THREE.Mesh(fireboxGeo, glowMat);
    fb.position.y = 1.36;
    toro.add(fb);

    const rf = new THREE.Mesh(roofGeo, darkStoneMat);
    rf.position.y = 1.68;
    rf.castShadow = true;
    toro.add(rf);

    const jw = new THREE.Mesh(jewelGeo, stoneMat);
    jw.position.y = 1.9;
    toro.add(jw);

    root.add(toro);
  }

  // 2. Swaying red-and-cream festival paper lanterns (chōchin) hung on wooden poles
  const poleMat = res.stdMat('#6e4228', 0.75);
  const poleGeo = res.geo(new THREE.CylinderGeometry(0.06, 0.07, 3.2, 8));
  const armGeo = res.geo(new THREE.BoxGeometry(0.75, 0.08, 0.08));
  const lanternBodyGeo = res.geo(new THREE.SphereGeometry(0.24, 14, 12));
  const lanternCapGeo = res.geo(new THREE.CylinderGeometry(0.13, 0.13, 0.07, 12));
  const capMat = res.stdMat('#222228', 0.5);
  const redLanternMat = res.stdMat('#ff5447', 0.45, 0.0, {
    emissive: '#ff4233',
    emissiveIntensity: 0.3,
  });
  const creamLanternMat = res.stdMat('#fff5d6', 0.45, 0.0, {
    emissive: '#ffd166',
    emissiveIntensity: 0.35,
  });

  const posts: Array<[number, number, number]> = [
    [-4.85, 0.36, -1.6],
    [4.85, 0.36, -1.6],
  ];

  posts.forEach(([px, py, pz], idx) => {
    const dir = px < 0 ? 1 : -1;
    const stand = new THREE.Group();
    stand.position.set(px, py, pz);

    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 1.6;
    pole.castShadow = true;
    stand.add(pole);

    const arm = new THREE.Mesh(armGeo, poleMat);
    arm.position.set(dir * 0.32, 3.05, 0);
    stand.add(arm);

    const lanternPivot = new THREE.Group();
    lanternPivot.position.set(dir * 0.62, 3.02, 0);
    stand.add(lanternPivot);

    const body = new THREE.Mesh(
      lanternBodyGeo,
      idx % 2 === 0 ? redLanternMat : creamLanternMat,
    );
    body.position.y = -0.34;
    body.scale.set(0.88, 1.28, 0.88);
    body.castShadow = true;
    lanternPivot.add(body);

    const topCap = new THREE.Mesh(lanternCapGeo, capMat);
    topCap.position.y = -0.05;
    lanternPivot.add(topCap);

    const botCap = new THREE.Mesh(lanternCapGeo, capMat);
    botCap.position.y = -0.63;
    lanternPivot.add(botCap);

    root.add(stand);

    swayTargets.push({
      obj: lanternPivot,
      axis: 'z',
      baseRot: 0,
      amp: 0.14,
      speed: 2.2 + idx * 0.4,
      phase: idx * 1.5,
    });
  });
}

// ============================================================================
// Comical 3D Stage Intruder Rigs (暴走ハト & 暴走奈良のシカ with 鹿せんべい!)
// ============================================================================

interface IntruderRig {
  root: THREE.Group;
  sync(intruder: StageIntruderState, dt: number, elapsedTime: number): void;
}

function createSenbeiTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const cx = size * 0.5;
    const cy = size * 0.5;
    const r = size * 0.48;

    // Warm toasted golden-brown 鹿せんべい cracker gradient
    const grad = ctx.createRadialGradient(cx, cy, r * 0.12, cx, cy, r);
    grad.addColorStop(0, '#eab66e');
    grad.addColorStop(0.72, '#d69545');
    grad.addColorStop(0.92, '#b8732a');
    grad.addColorStop(1, '#9c5c1e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Subtle crisp pressed wafer ring
    ctx.strokeStyle = 'rgba(138, 78, 22, 0.35)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.78, 0, Math.PI * 2);
    ctx.stroke();

    // Authentic crispy toasted bran speckles & tiny blister dots
    let seed = 7719;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 95; i++) {
      const ang = rand() * Math.PI * 2;
      const dist = Math.sqrt(rand()) * r * 0.9;
      const x = cx + Math.cos(ang) * dist;
      const y = cy + Math.sin(ang) * dist;
      ctx.fillStyle =
        rand() > 0.45 ? 'rgba(128, 68, 20, 0.42)' : 'rgba(255, 226, 178, 0.38)';
      ctx.beginPath();
      ctx.arc(x, y, 1.4 + rand() * 2.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function buildDoveIntruder(res: StageResourceTracker, parent: THREE.Group): IntruderRig {
  const root = new THREE.Group();
  root.name = 'intruder_dove';
  root.visible = false;
  parent.add(root);

  const bodyGroup = new THREE.Group();
  root.add(bodyGroup);

  const whiteMat = res.stdMat('#fffdf9', 0.56);
  const softGreyMat = res.stdMat('#dce5f0', 0.62);
  const beakMat = res.stdMat('#ff942e', 0.42);
  const bowMat = res.stdMat('#f43f5e', 0.45);
  const scleraMat = res.stdMat('#ffffff', 0.24);
  const pupilMat = res.stdMat('#141218', 0.12);
  const blushMat = res.stdMat('#ff9eb5', 0.65);

  // Plump comical wedding dove torso (+Z forward)
  const torsoGeo = res.geo(new THREE.SphereGeometry(0.24, 18, 14));
  const torso = new THREE.Mesh(torsoGeo, whiteMat);
  torso.scale.set(0.95, 0.88, 1.38);
  torso.castShadow = true;
  bodyGroup.add(torso);

  // Proud puffy chest crop
  const chestGeo = res.geo(new THREE.SphereGeometry(0.185, 14, 12));
  const chest = new THREE.Mesh(chestGeo, whiteMat);
  chest.position.set(0, -0.02, 0.2);
  chest.scale.set(0.96, 0.92, 0.92);
  chest.castShadow = true;
  bodyGroup.add(chest);

  // Articulated bobbing head group
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.23, 0.24);
  bodyGroup.add(headGroup);

  const headGeo = res.geo(new THREE.SphereGeometry(0.165, 16, 12));
  const head = new THREE.Mesh(headGeo, whiteMat);
  head.castShadow = true;
  headGroup.add(head);

  // Cute swept feather tuft on crown
  const tuftGeo = res.geo(new THREE.ConeGeometry(0.04, 0.12, 8));
  const tuft1 = new THREE.Mesh(tuftGeo, whiteMat);
  tuft1.position.set(0, 0.17, -0.02);
  tuft1.rotation.x = -0.45;
  headGroup.add(tuft1);
  const tuft2 = new THREE.Mesh(tuftGeo, softGreyMat);
  tuft2.position.set(0, 0.15, -0.07);
  tuft2.rotation.x = -0.82;
  tuft2.scale.setScalar(0.8);
  headGroup.add(tuft2);

  // Big round googly eyes with hilariously mismatched goofy pupils!
  const eyeGeo = res.geo(new THREE.SphereGeometry(0.068, 12, 10));
  const pupilGeo = res.geo(new THREE.SphereGeometry(0.036, 10, 8));
  const glintGeo = res.geo(new THREE.SphereGeometry(0.013, 8, 6));
  const cheekGeo = res.geo(new THREE.SphereGeometry(0.036, 8, 8));

  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(eyeGeo, scleraMat);
    eye.position.set(s * 0.115, 0.045, 0.105);
    headGroup.add(eye);

    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    // Slightly asymmetric googly pupil placement for maximum slapstick comedy
    pupil.position.set(
      s * 0.135,
      s < 0 ? 0.068 : 0.028,
      0.158,
    );
    pupil.scale.setScalar(s < 0 ? 1.08 : 0.82);
    headGroup.add(pupil);

    const glint = new THREE.Mesh(glintGeo, scleraMat);
    glint.position.set(s * 0.128, s < 0 ? 0.082 : 0.04, 0.188);
    headGroup.add(glint);

    const cheek = new THREE.Mesh(cheekGeo, blushMat);
    cheek.position.set(s * 0.125, -0.03, 0.095);
    cheek.scale.set(0.85, 0.55, 0.55);
    headGroup.add(cheek);
  }

  // Cute slightly-open orange beak mid-squawk pointing +Z
  const upperBeakGeo = res.geo(new THREE.ConeGeometry(0.056, 0.16, 10));
  const upperBeak = new THREE.Mesh(upperBeakGeo, beakMat);
  upperBeak.position.set(0, 0.005, 0.21);
  upperBeak.rotation.x = Math.PI / 2 - 0.08;
  upperBeak.scale.set(1.0, 1.0, 0.78);
  upperBeak.castShadow = true;
  headGroup.add(upperBeak);

  const lowerBeakGeo = res.geo(new THREE.ConeGeometry(0.042, 0.12, 8));
  const lowerBeak = new THREE.Mesh(lowerBeakGeo, beakMat);
  lowerBeak.position.set(0, -0.045, 0.195);
  lowerBeak.rotation.x = Math.PI / 2 + 0.34;
  lowerBeak.scale.set(0.95, 1.0, 0.65);
  headGroup.add(lowerBeak);

  // Tiny jaunty red bow tie on its neck!
  const bowGroup = new THREE.Group();
  bowGroup.position.set(0, 0.08, 0.31);
  bodyGroup.add(bowGroup);

  const bowWingGeo = res.geo(new THREE.ConeGeometry(0.046, 0.095, 6));
  for (const s of [-1, 1]) {
    const bw = new THREE.Mesh(bowWingGeo, bowMat);
    bw.position.x = s * 0.052;
    bw.rotation.z = s * (Math.PI / 2);
    bw.scale.set(1, 1, 0.45);
    bw.castShadow = true;
    bowGroup.add(bw);
  }
  const bowKnotGeo = res.geo(new THREE.SphereGeometry(0.028, 8, 8));
  bowGroup.add(new THREE.Mesh(bowKnotGeo, bowMat));

  // Articulated flapping wings (layered fan of stylized feathers!)
  const wingBaseGeo = res.geo(new THREE.SphereGeometry(0.18, 12, 10));
  const featherGeo = res.geo(new THREE.CapsuleGeometry(0.048, 0.26, 6, 8));

  const buildWing = (side: -1 | 1): THREE.Group => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.18, 0.06, 0.02);
    bodyGroup.add(pivot);

    const upper = new THREE.Mesh(wingBaseGeo, whiteMat);
    upper.position.set(side * 0.18, 0.02, 0.01);
    upper.scale.set(1.35, 0.26, 0.95);
    upper.castShadow = true;
    pivot.add(upper);

    // Three layered primary feathers fanning out
    const featherConfigs: Array<[number, number, number, THREE.Material]> = [
      [0.36, 0.05, 0.18, whiteMat],
      [0.38, -0.05, -0.05, softGreyMat],
      [0.32, -0.14, -0.32, softGreyMat],
    ];
    for (const [fx, fz, yaw, mat] of featherConfigs) {
      const f = new THREE.Mesh(featherGeo, mat);
      f.position.set(side * fx, 0.01, fz);
      f.rotation.z = Math.PI / 2;
      f.rotation.y = side * yaw;
      f.scale.set(1, 1, 0.42);
      f.castShadow = true;
      pivot.add(f);
    }

    return pivot;
  };

  const leftWingPivot = buildWing(-1);
  const rightWingPivot = buildWing(1);

  // Fluttering fan tail
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, -0.01, -0.28);
  bodyGroup.add(tailPivot);

  const tailFeatherGeo = res.geo(new THREE.CapsuleGeometry(0.052, 0.22, 6, 8));
  for (let i = -1; i <= 1; i++) {
    const tf = new THREE.Mesh(tailFeatherGeo, i === 0 ? whiteMat : softGreyMat);
    tf.position.set(i * 0.075, 0.02, -0.13);
    tf.rotation.x = Math.PI / 2 - 0.15;
    tf.rotation.z = -i * 0.34;
    tf.scale.set(1, 1, 0.35);
    tf.castShadow = true;
    tailPivot.add(tf);
  }

  // Cute tucked dangling orange feet
  const feetPivot = new THREE.Group();
  feetPivot.position.set(0, -0.2, -0.04);
  bodyGroup.add(feetPivot);

  const footStemGeo = res.geo(new THREE.CylinderGeometry(0.018, 0.018, 0.11, 8));
  const toeGeo = res.geo(new THREE.ConeGeometry(0.036, 0.09, 6));
  for (const s of [-1, 1]) {
    const stem = new THREE.Mesh(footStemGeo, beakMat);
    stem.position.set(s * 0.075, -0.04, 0);
    feetPivot.add(stem);

    const foot = new THREE.Mesh(toeGeo, beakMat);
    foot.position.set(s * 0.075, -0.1, 0.03);
    foot.rotation.x = -Math.PI / 2;
    foot.scale.set(1.2, 1, 0.35);
    feetPivot.add(foot);
  }

  const sync = (intruder: StageIntruderState, _dt: number, elapsedTime: number): void => {
    root.visible = intruder.active;
    if (!intruder.active) return;

    root.position.copy(intruder.position);
    root.rotation.y = intruder.facingYaw;

    const flapPhase = elapsedTime * 22 + intruder.phase;
    const flap = Math.sin(flapPhase);

    leftWingPivot.rotation.z = flap * 0.95 + 0.16;
    rightWingPivot.rotation.z = -flap * 0.95 - 0.16;
    leftWingPivot.rotation.y = Math.cos(flapPhase) * 0.24;
    rightWingPivot.rotation.y = -Math.cos(flapPhase) * 0.24;

    bodyGroup.position.y = -flap * 0.07;
    bodyGroup.rotation.x = 0.14 + Math.sin(elapsedTime * 11 + intruder.phase) * 0.09;
    bodyGroup.rotation.z = Math.sin(elapsedTime * 8 + intruder.phase) * 0.14;

    headGroup.position.z = 0.24 + Math.sin(elapsedTime * 18) * 0.035;
    headGroup.rotation.z = Math.cos(elapsedTime * 10) * 0.12;

    tailPivot.rotation.x = 0.18 + Math.cos(flapPhase) * 0.28;
    feetPivot.rotation.x = -0.55 + Math.sin(flapPhase * 0.5) * 0.22;
  };

  return { root, sync };
}

function buildDeerIntruder(res: StageResourceTracker, parent: THREE.Group): IntruderRig {
  const root = new THREE.Group();
  root.name = 'intruder_deer';
  root.visible = false;
  parent.add(root);

  const bodyGroup = new THREE.Group();
  root.add(bodyGroup);

  const coatMat = res.stdMat('#c88546', 0.72);
  const creamMat = res.stdMat('#f6e4c4', 0.76);
  const hoofMat = res.stdMat('#2e201a', 0.48);
  const antlerMat = res.stdMat('#ebd8b7', 0.6);
  const whiteTailMat = res.stdMat('#fffdf8', 0.8);
  const scleraMat = res.stdMat('#ffffff', 0.22);
  const pupilMat = res.stdMat('#141218', 0.12);
  const senbeiTex = createSenbeiTexture(res);
  const senbeiMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: senbeiTex,
      roughness: 0.72,
      metalness: 0.02,
    }),
  );

  // Chunky adorable caramel-brown barrel torso (+Z forward)
  const torsoGeo = res.geo(new THREE.CapsuleGeometry(0.24, 0.46, 10, 16));
  const torso = new THREE.Mesh(torsoGeo, coatMat);
  torso.position.set(0, 0.58, 0);
  torso.rotation.x = Math.PI / 2;
  torso.scale.set(1.02, 1.05, 0.96);
  torso.castShadow = true;
  torso.receiveShadow = true;
  bodyGroup.add(torso);

  // Soft cream underside belly patch
  const bellyGeo = res.geo(new THREE.SphereGeometry(0.2, 12, 10));
  const belly = new THREE.Mesh(bellyGeo, creamMat);
  belly.position.set(0, 0.45, 0.01);
  belly.scale.set(0.88, 0.52, 1.75);
  bodyGroup.add(belly);

  // Signature Nara fawn cream spots on both flanks & back!
  const spotGeo = res.geo(new THREE.SphereGeometry(0.044, 8, 8));
  const spotCoords: Array<[number, number, number, number]> = [
    [-0.22, 0.65, 0.14, 1.0],
    [-0.23, 0.58, -0.02, 0.85],
    [-0.21, 0.66, -0.18, 0.95],
    [-0.17, 0.74, 0.02, 0.78],
    [-0.15, 0.72, -0.26, 0.82],
    [0.22, 0.65, 0.14, 1.0],
    [0.23, 0.58, -0.02, 0.85],
    [0.21, 0.66, -0.18, 0.95],
    [0.17, 0.74, 0.02, 0.78],
    [0.15, 0.72, -0.26, 0.82],
  ];
  for (const [sx, sy, sz, sc] of spotCoords) {
    const spot = new THREE.Mesh(spotGeo, creamMat);
    spot.position.set(sx, sy, sz);
    spot.scale.set(0.45 * sc, 0.9 * sc, 1.05 * sc);
    bodyGroup.add(spot);
  }

  // Four briskly trotting legs with dark espresso hooves touching y = 0
  const legGeo = res.geo(new THREE.CylinderGeometry(0.052, 0.04, 0.42, 10));
  const hoofGeo = res.geo(new THREE.CylinderGeometry(0.044, 0.052, 0.085, 10));

  const buildLeg = (x: number, z: number): THREE.Group => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0.48, z);
    bodyGroup.add(pivot);

    const leg = new THREE.Mesh(legGeo, coatMat);
    leg.position.y = -0.21;
    leg.castShadow = true;
    pivot.add(leg);

    const hoof = new THREE.Mesh(hoofGeo, hoofMat);
    hoof.position.y = -0.438;
    hoof.castShadow = true;
    pivot.add(hoof);

    return pivot;
  };

  const flLeg = buildLeg(-0.14, 0.25);
  const frLeg = buildLeg(0.14, 0.25);
  const blLeg = buildLeg(-0.145, -0.24);
  const brLeg = buildLeg(0.145, -0.24);

  // White fluffy tail on rump
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, 0.68, -0.42);
  bodyGroup.add(tailPivot);

  const tailPuffGeo = res.geo(new THREE.SphereGeometry(0.095, 12, 10));
  const tailPuff = new THREE.Mesh(tailPuffGeo, whiteTailMat);
  tailPuff.position.set(0, 0.05, -0.05);
  tailPuff.scale.set(0.88, 1.28, 0.92);
  tailPuff.castShadow = true;
  tailPivot.add(tailPuff);

  // Upright neck rising into chunky adorable head
  const neckGeo = res.geo(new THREE.CylinderGeometry(0.115, 0.155, 0.34, 12));
  const neck = new THREE.Mesh(neckGeo, coatMat);
  neck.position.set(0, 0.77, 0.34);
  neck.rotation.x = 0.26;
  neck.castShadow = true;
  bodyGroup.add(neck);

  // Cream chest bib on front of neck
  const bibGeo = res.geo(new THREE.SphereGeometry(0.125, 10, 8));
  const bib = new THREE.Mesh(bibGeo, creamMat);
  bib.position.set(0, 0.68, 0.42);
  bib.scale.set(0.85, 1.15, 0.55);
  bodyGroup.add(bib);

  // Articulated deer head pivot
  const headPivot = new THREE.Group();
  headPivot.position.set(0, 0.96, 0.43);
  bodyGroup.add(headPivot);

  const headGeo = res.geo(new THREE.SphereGeometry(0.19, 16, 14));
  const head = new THREE.Mesh(headGeo, coatMat);
  head.scale.set(0.98, 0.94, 1.12);
  head.castShadow = true;
  headPivot.add(head);

  // Cream muzzle/snout pointing +Z + shiny dark nose button
  const snoutGeo = res.geo(new THREE.SphereGeometry(0.118, 14, 10));
  const snout = new THREE.Mesh(snoutGeo, creamMat);
  snout.position.set(0, -0.055, 0.19);
  snout.scale.set(1.06, 0.82, 1.18);
  snout.castShadow = true;
  headPivot.add(snout);

  const noseGeo = res.geo(new THREE.SphereGeometry(0.045, 10, 8));
  const nose = new THREE.Mesh(noseGeo, hoofMat);
  nose.position.set(0, -0.015, 0.31);
  nose.scale.set(1.18, 0.85, 0.78);
  headPivot.add(nose);

  // Cute floppy-perky deer ears with cream inner accent
  const earOuterGeo = res.geo(new THREE.SphereGeometry(0.095, 10, 8));
  const earInnerGeo = res.geo(new THREE.SphereGeometry(0.064, 8, 8));
  for (const s of [-1, 1]) {
    const earGroup = new THREE.Group();
    earGroup.position.set(s * 0.175, 0.11, -0.02);
    earGroup.rotation.set(-0.1, s * 0.25, s * -0.52);
    headPivot.add(earGroup);

    const outer = new THREE.Mesh(earOuterGeo, coatMat);
    outer.scale.set(0.55, 1.25, 0.42);
    outer.castShadow = true;
    earGroup.add(outer);

    const inner = new THREE.Mesh(earInnerGeo, creamMat);
    inner.position.z = 0.022;
    inner.scale.set(0.52, 1.12, 0.3);
    earGroup.add(inner);
  }

  // Branching cute antlers!
  const antlerStemGeo = res.geo(new THREE.CapsuleGeometry(0.024, 0.22, 5, 8));
  const antlerTineGeo = res.geo(new THREE.CapsuleGeometry(0.018, 0.12, 5, 8));
  for (const s of [-1, 1]) {
    const antlerGroup = new THREE.Group();
    antlerGroup.position.set(s * 0.088, 0.16, -0.02);
    antlerGroup.rotation.set(-0.18, 0, s * -0.34);
    headPivot.add(antlerGroup);

    const stem = new THREE.Mesh(antlerStemGeo, antlerMat);
    stem.position.y = 0.11;
    stem.castShadow = true;
    antlerGroup.add(stem);

    // Front-inner tine fork
    const tine1 = new THREE.Mesh(antlerTineGeo, antlerMat);
    tine1.position.set(s * -0.035, 0.14, 0.055);
    tine1.rotation.set(0.65, 0, s * 0.42);
    tine1.castShadow = true;
    antlerGroup.add(tine1);

    // Upper-outer tine fork
    const tine2 = new THREE.Mesh(antlerTineGeo, antlerMat);
    tine2.position.set(s * 0.055, 0.23, -0.02);
    tine2.rotation.set(-0.22, 0, s * -0.62);
    tine2.castShadow = true;
    antlerGroup.add(tine2);
  }

  // Huge deadpan eyes staring straight ahead (+Z)!
  const eyeGeo = res.geo(new THREE.SphereGeometry(0.068, 12, 10));
  const pupilGeo = res.geo(new THREE.SphereGeometry(0.029, 10, 8));
  const glintGeo = res.geo(new THREE.SphereGeometry(0.011, 8, 6));
  const lidGeo = res.geo(new THREE.BoxGeometry(0.12, 0.026, 0.055));

  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(eyeGeo, scleraMat);
    eye.position.set(s * 0.112, 0.048, 0.142);
    headPivot.add(eye);

    // Dead-center forward-staring deadpan pupil
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.set(s * 0.116, 0.046, 0.204);
    headPivot.add(pupil);

    const glint = new THREE.Mesh(glintGeo, scleraMat);
    glint.position.set(s * 0.106, 0.058, 0.228);
    headPivot.add(glint);

    // Flat horizontal deadpan upper eyelid bar
    const lid = new THREE.Mesh(lidGeo, coatMat);
    lid.position.set(s * 0.114, 0.098, 0.172);
    lid.rotation.y = s * 0.2;
    headPivot.add(lid);
  }

  // Round crispy 鹿せんべい (Nara deer cracker) clamped proudly in its mouth!!
  const senbeiGeo = res.geo(new THREE.CylinderGeometry(0.145, 0.145, 0.024, 20));
  const senbei = new THREE.Mesh(senbeiGeo, senbeiMat);
  senbei.position.set(0.01, -0.092, 0.315);
  senbei.rotation.set(0.18, 0.14, -0.08);
  senbei.castShadow = true;
  headPivot.add(senbei);

  const sync = (intruder: StageIntruderState, _dt: number, elapsedTime: number): void => {
    root.visible = intruder.active;
    if (!intruder.active) return;

    root.position.copy(intruder.position);
    root.rotation.y = intruder.facingYaw;

    const trot = elapsedTime * 18 + intruder.phase;
    const stride = Math.sin(trot) * 0.78;

    flLeg.rotation.x = stride;
    brLeg.rotation.x = stride;
    frLeg.rotation.x = -stride;
    blLeg.rotation.x = -stride;

    bodyGroup.position.y = Math.abs(Math.sin(trot)) * 0.085;
    bodyGroup.rotation.x = 0.06 + Math.sin(trot * 2) * 0.045;
    bodyGroup.rotation.z = Math.sin(trot) * 0.075;

    headPivot.rotation.x = -0.04 + Math.cos(trot * 2) * 0.055;
    headPivot.rotation.z = -Math.sin(trot) * 0.06;

    tailPivot.rotation.z = Math.sin(trot * 1.6) * 0.45;
    tailPivot.rotation.x = -0.32 + Math.cos(trot * 2) * 0.16;
  };

  return { root, sync };
}

// ============================================================================
// Stage 3: Sports Day Wobbly Podium (社内運動会・グラグラ表彰台)
// ============================================================================

interface HazardController {
  sync(hazard: StageHazardState, dt: number, elapsedTime: number): void;
}

function createSportsFieldTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Vibrant sunlit athletic grass lawn background
    const stripes = 14;
    const sw = size / stripes;
    for (let i = 0; i < stripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#69c452' : '#5eb948';
      ctx.fillRect(i * sw, 0, sw, size);
    }

    // Terracotta stadium oval running track framing the podium & sweeping right across the front bowling lane (z ≈ +0.25..+3.2)!
    // PlaneGeometry(36, 36) centered at (0, 0, -1.8) => 1m = 28.44px; cy = 472 corresponds to world z = -3.2
    const cx = size * 0.5;
    const cy = 472;
    const drawStadiumOval = (rx: number, ry: number): void => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    };

    // Outer white chalk track edge
    ctx.save();
    ctx.fillStyle = '#f8fafc';
    drawStadiumOval(296, 188);
    ctx.fill();

    // Rich terracotta clay running track oval
    ctx.fillStyle = '#d4683f';
    drawStadiumOval(289, 182);
    ctx.fill();

    // Subtle alternating clay lane bands
    ctx.strokeStyle = 'rgba(182, 74, 38, 0.24)';
    ctx.lineWidth = 18;
    drawStadiumOval(266, 159);
    ctx.stroke();
    drawStadiumOval(225, 118);
    ctx.stroke();

    // Crisp concentric white lane stripes (4 lanes!)
    ctx.strokeStyle = 'rgba(255, 253, 248, 0.94)';
    ctx.lineWidth = 4;
    for (const [rx, ry] of [
      [268, 161],
      [247, 140],
      [226, 119],
      [205, 98],
    ]) {
      drawStadiumOval(rx, ry);
      ctx.stroke();
    }

    // Lush manicured green athletic infield inside the oval (under podium!)
    ctx.save();
    drawStadiumOval(202, 95);
    ctx.clip();
    for (let i = 0; i < 16; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#74cf59' : '#66c24d';
      ctx.fillRect(0, i * (size / 16), size, size / 16);
    }
    // Crisp white athletic infield chalk frame & center circle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.lineWidth = 4.5;
    ctx.strokeRect(cx - 140, cy - 58, 280, 116);
    ctx.beginPath();
    ctx.arc(cx, cy, 34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Crisp start/finish checkered chalk ticks across front bowling track lane
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(cx - 7, cy + 104 + i * 16, 14, 7);
    }

    // Subtle organic lawn & clay speckles for commercial tactile polish
    let seed = 31415;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 1200; i++) {
      const x = rand() * size;
      const y = rand() * size;
      ctx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.14)' : 'rgba(52,32,20,0.08)';
      ctx.fillRect(x, y, 2.5, 2.5);
    }
    ctx.restore();
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function createPodiumNumberTexture(
  res: StageResourceTracker,
  rank: 1 | 2 | 3,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Glossy pearl-white wooden podium fascia
    ctx.fillStyle = '#fffdf8';
    ctx.fillRect(0, 0, 512, 256);

    // Subtle recessed wood panel trim border
    const trimColor = rank === 1 ? '#f5c542' : rank === 2 ? '#b8c4d4' : '#d68c54';
    const badgeOuter = rank === 1 ? '#f5b700' : rank === 2 ? '#94a3b8' : '#c6733b';
    const badgeInner = rank === 1 ? '#ffe066' : rank === 2 ? '#e2e8f0' : '#efb07a';
    const textStroke = rank === 1 ? '#9e6200' : rank === 2 ? '#334155' : '#6c3412';

    ctx.strokeStyle = trimColor;
    ctx.lineWidth = 14;
    ctx.strokeRect(14, 14, 484, 228);

    // Festive metallic medal badge circle in center!
    const cx = 256;
    const cy = 128;
    const r = 84;

    ctx.save();
    ctx.shadowColor = 'rgba(30, 20, 10, 0.22)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = badgeOuter;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = badgeInner;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 11, 0, Math.PI * 2);
    ctx.fill();

    // Inner sparkle ring
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 17, 0, Math.PI * 2);
    ctx.stroke();

    // Flanking stars on 1st place!
    if (rank === 1) {
      ctx.fillStyle = '#f5b700';
      ctx.font = 'bold 42px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', 112, cy);
      ctx.fillText('★', 400, cy);
    }

    // Bold champion numeral
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 124px "Arial Black", "Hiragino Kaku Gothic ProN", system-ui, sans-serif';
    ctx.lineWidth = 10;
    ctx.strokeStyle = textStroke;
    ctx.strokeText(String(rank), cx, cy + 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(String(rank), cx, cy + 6);
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function createKohakuCurtainTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Classic Japanese 紅白幕 (red-and-white vertical striped festival curtain) with gentle fabric pleats
    const stripes = 12;
    const sw = canvas.width / stripes;
    for (let i = 0; i < stripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#d92626' : '#fffdf8';
      ctx.fillRect(i * sw, 0, sw + 1, canvas.height);

      // Soft vertical cloth pleat shading
      const pleatGrad = ctx.createLinearGradient(i * sw, 0, (i + 1) * sw, 0);
      pleatGrad.addColorStop(0, 'rgba(30, 10, 10, 0.16)');
      pleatGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.12)');
      pleatGrad.addColorStop(0.7, 'rgba(20, 10, 10, 0.05)');
      pleatGrad.addColorStop(1, 'rgba(30, 10, 10, 0.18)');
      ctx.fillStyle = pleatGrad;
      ctx.fillRect(i * sw, 0, sw, canvas.height);
    }
    // Crisp dark top hem & soft bottom shadow
    ctx.fillStyle = 'rgba(40, 10, 10, 0.18)';
    ctx.fillRect(0, 0, canvas.width, 10);
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  tex.anisotropy = 4;
  return tex;
}

function createKusudamaBannerTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 192;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Gleaming cream-white festive silk scroll with crimson & gold trim
    ctx.fillStyle = '#fffdf5';
    ctx.fillRect(0, 0, 192, 640);

    // Outer crimson border + inner metallic gold border
    ctx.strokeStyle = '#d62828';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, 178, 626);
    ctx.strokeStyle = '#f5b700';
    ctx.lineWidth = 5;
    ctx.strokeRect(20, 20, 152, 600);

    // Decorative festive gold confetti dots inside scroll
    ctx.fillStyle = 'rgba(245, 183, 0, 0.32)';
    const dots: Array<[number, number, number]> = [
      [42, 66, 8],
      [150, 92, 7],
      [38, 250, 6],
      [154, 340, 8],
      [44, 490, 7],
      [148, 560, 8],
    ];
    for (const [dx, dy, dr] of dots) {
      ctx.beginPath();
      ctx.arc(dx, dy, dr, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bold vertical celebratory calligraphy: 祝 ・ 優 勝 ！
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const chars = ['祝', '・', '優', '勝', '！'];
    chars.forEach((ch, idx) => {
      const y = 96 + idx * 112;
      ctx.font =
        idx === 1
          ? '900 58px "Hiragino Mincho ProN", "Yu Mincho", serif'
          : '900 84px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#ffd166';
      ctx.strokeText(ch, 96, y);
      ctx.fillStyle = idx === 0 || idx === 4 ? '#d62828' : '#1b1b24';
      ctx.fillText(ch, 96, y);
    });
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function createInternationalFlagTextures(res: StageResourceTracker): THREE.CanvasTexture[] {
  const specs: Array<(ctx: CanvasRenderingContext2D, w: number, h: number) => void> = [
    // Japan (Hinomaru)
    (ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#e62e36';
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, h * 0.3, 0, Math.PI * 2);
      ctx.fill();
    },
    // Tricolor Blue-White-Red
    (ctx, w, h) => {
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(0, 0, w / 3, h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w / 3, 0, w / 3, h);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect((w * 2) / 3, 0, w / 3, h);
    },
    // Green-Yellow Diamond
    (ctx, w, h) => {
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.moveTo(w * 0.5, h * 0.12);
      ctx.lineTo(w * 0.88, h * 0.5);
      ctx.lineTo(w * 0.5, h * 0.88);
      ctx.lineTo(w * 0.12, h * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, h * 0.2, 0, Math.PI * 2);
      ctx.fill();
    },
    // Nordic Blue + Yellow Cross
    (ctx, w, h) => {
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(w * 0.28, 0, w * 0.16, h);
      ctx.fillRect(0, h * 0.4, w, h * 0.2);
    },
    // Red-White-Green Tricolor
    (ctx, w, h) => {
      ctx.fillStyle = '#10b981';
      ctx.fillRect(0, 0, w / 3, h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w / 3, 0, w / 3, h);
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect((w * 2) / 3, 0, w / 3, h);
    },
    // Sunny Horizontal Stripes + Star
    (ctx, w, h) => {
      ctx.fillStyle = '#ff595e';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ffca3a';
      ctx.fillRect(0, h * 0.25, w, h * 0.5);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, h * 0.16, 0, Math.PI * 2);
      ctx.fill();
    },
  ];

  return specs.map((paint) => {
    const canvas = document.createElement('canvas');
    canvas.width = 96;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) paint(ctx, 96, 64);
    const tex = res.tex(new THREE.CanvasTexture(canvas));
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  });
}

function buildSportsPodiumBlock(
  p: PlatformTier,
  rank: 1 | 2 | 3,
  res: StageResourceTracker,
  root: THREE.Group,
): void {
  const width = p.maxX - p.minX;
  const depth = p.maxZ - p.minZ;
  const cx = (p.minX + p.maxX) * 0.5;
  const cz = (p.minZ + p.maxZ) * 0.5;

  const group = new THREE.Group();
  group.position.set(cx, 0, cz);
  root.add(group);

  const whiteGlossMat = res.stdMat('#fffdf9', 0.34, 0.06);
  const goldTrimMat = res.stdMat('#f5c542', 0.24, 0.52);
  const carpetColor = rank === 1 ? '#e63946' : rank === 2 ? '#3b82f6' : '#10b981';
  const carpetMat = res.stdMat(carpetColor, 0.78, 0.02);

  const topSlabH = 0.055;
  const bodyH = Math.max(0.1, p.height - topSlabH);

  // Main glossy white painted podium box
  const bodyGeo = res.geo(new THREE.BoxGeometry(width - 0.02, bodyH, depth - 0.02));
  const body = new THREE.Mesh(bodyGeo, whiteGlossMat);
  body.position.y = bodyH * 0.5;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Gold-trimmed top podium deck whose top surface sits at EXACT y = p.height!
  const deckGeo = res.geo(new THREE.BoxGeometry(width, topSlabH, depth));
  const deck = new THREE.Mesh(deckGeo, goldTrimMat);
  deck.position.y = p.height - topSlabH * 0.5;
  deck.castShadow = true;
  deck.receiveShadow = true;
  group.add(deck);

  // Inset colored championship carpet runner flush at y = p.height
  const carpetGeo = res.geo(new THREE.BoxGeometry(width - 0.14, 0.012, depth - 0.14));
  const carpet = new THREE.Mesh(carpetGeo, carpetMat);
  carpet.position.y = p.height - 0.004;
  carpet.receiveShadow = true;
  group.add(carpet);

  // Subtle gold base plinth molding
  const baseTrimGeo = res.geo(new THREE.BoxGeometry(width + 0.03, 0.04, depth + 0.03));
  const baseTrim = new THREE.Mesh(baseTrimGeo, goldTrimMat);
  baseTrim.position.y = 0.02;
  baseTrim.receiveShadow = true;
  group.add(baseTrim);

  // Bold front medallion numeral panel (1 Gold / 2 Silver / 3 Bronze)
  const badgeTex = createPodiumNumberTexture(res, rank);
  const badgeMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: badgeTex,
      roughness: 0.34,
      metalness: 0.08,
    }),
  );
  const panelW = width - 0.12;
  const panelH = Math.max(0.22, bodyH - 0.08);
  const badgeGeo = res.geo(new THREE.PlaneGeometry(panelW, panelH));
  const badge = new THREE.Mesh(badgeGeo, badgeMat);
  badge.position.set(0, bodyH * 0.5 + 0.01, depth * 0.5 - 0.004);
  group.add(badge);
}

function buildKusudamaHazard(
  res: StageResourceTracker,
  root: THREE.Group,
): HazardController {
  // Overhead hanging golden 3D Kusudama suspended cleanly above podium center (0, 4.15, -0.9)
  const kusudamaAnchor = new THREE.Group();
  kusudamaAnchor.position.set(0, 4.15, -0.9);
  root.add(kusudamaAnchor);

  const goldShellMat = res.stdMat('#ffd147', 0.24, 0.54, {
    emissive: '#ffaa00',
    emissiveIntensity: 0.12,
  });
  const innerSatinMat = res.stdMat('#e63946', 0.55, 0.12, { side: THREE.DoubleSide });
  const ropeMat = res.stdMat('#f8fafc', 0.65);
  const redTrimMat = res.stdMat('#e63946', 0.48);

  // Vertical suspension rope rising cleanly up to overhead festival cable at y = 5.5 (local +1.35)
  const ropeGeo = res.geo(new THREE.CylinderGeometry(0.022, 0.022, 0.88, 8));
  const rope = new THREE.Mesh(ropeGeo, ropeMat);
  rope.position.y = 0.92;
  kusudamaAnchor.add(rope);

  // Decorative red-and-gold top crown cap
  const capGeo = res.geo(new THREE.CylinderGeometry(0.14, 0.19, 0.12, 12));
  const cap = new THREE.Mesh(capGeo, redTrimMat);
  cap.position.y = 0.52;
  kusudamaAnchor.add(cap);

  // Split golden sphere hemispheres hinged cleanly at top (0, +0.46, 0)
  const sphereR = 0.5;
  const leftHalfPivot = new THREE.Group();
  leftHalfPivot.position.set(0, 0.46, 0);
  kusudamaAnchor.add(leftHalfPivot);

  const rightHalfPivot = new THREE.Group();
  rightHalfPivot.position.set(0, 0.46, 0);
  kusudamaAnchor.add(rightHalfPivot);

  // Left half (x <= 0): phi in [-PI/2, +PI/2]; Right half (x >= 0): phi in [+PI/2, +3PI/2]
  const leftGeo = res.geo(
    new THREE.SphereGeometry(sphereR, 20, 16, -Math.PI / 2, Math.PI, 0, Math.PI),
  );
  const rightGeo = res.geo(
    new THREE.SphereGeometry(sphereR, 20, 16, Math.PI / 2, Math.PI, 0, Math.PI),
  );
  const innerDiscGeo = res.geo(new THREE.CircleGeometry(sphereR * 0.96, 20));
  const rosetteGeo = res.geo(new THREE.DodecahedronGeometry(0.095, 0));
  const rosetteWhiteMat = res.stdMat('#fffdf8', 0.52);

  const buildHalf = (
    pivot: THREE.Group,
    geo: THREE.BufferGeometry,
    side: -1 | 1,
  ): void => {
    const shell = new THREE.Mesh(geo, goldShellMat);
    shell.position.y = -0.46;
    shell.castShadow = true;
    pivot.add(shell);

    // Crimson satin interior backing disc so open halves look plush & solid
    const inner = new THREE.Mesh(innerDiscGeo, innerSatinMat);
    inner.position.set(side * 0.008, -0.46, 0);
    inner.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
    pivot.add(inner);

    // Festive paper flower rosettes glued along the kusudama rim
    for (let i = 0; i < 4; i++) {
      const ang = -0.75 + (i / 3) * 1.5;
      const ros = new THREE.Mesh(rosetteGeo, i % 2 === 0 ? redTrimMat : rosetteWhiteMat);
      ros.position.set(
        side * Math.cos(ang) * (sphereR + 0.02),
        -0.46 + Math.sin(ang) * sphereR * 0.72,
        Math.cos(ang) * 0.24,
      );
      pivot.add(ros);
    }
  };

  buildHalf(leftHalfPivot, leftGeo, -1);
  buildHalf(rightHalfPivot, rightGeo, 1);

  // Pull cord tassel hanging under closed kusudama
  const tasselGroup = new THREE.Group();
  tasselGroup.position.set(0, -0.52, 0);
  kusudamaAnchor.add(tasselGroup);
  const pullCordGeo = res.geo(new THREE.CylinderGeometry(0.015, 0.015, 0.45, 6));
  const pullCord = new THREE.Mesh(pullCordGeo, redTrimMat);
  pullCord.position.y = -0.22;
  tasselGroup.add(pullCord);
  const tasselBallGeo = res.geo(new THREE.ConeGeometry(0.06, 0.14, 10));
  const tasselBall = new THREE.Mesh(tasselBallGeo, goldShellMat);
  tasselBall.position.y = -0.48;
  tasselGroup.add(tasselBall);

  // Vertical festive celebration banner unfurling downward: 「祝・優勝！」
  const bannerPivot = new THREE.Group();
  bannerPivot.position.set(0, 0.18, 0.02);
  bannerPivot.visible = false;
  kusudamaAnchor.add(bannerPivot);

  const bannerTex = createKusudamaBannerTexture(res);
  const bannerMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: bannerTex,
      roughness: 0.45,
      metalness: 0.06,
      side: THREE.DoubleSide,
    }),
  );
  const bannerH = 1.88;
  const bannerGeo = res.geo(new THREE.PlaneGeometry(0.58, bannerH));
  const bannerMesh = new THREE.Mesh(bannerGeo, bannerMat);
  bannerMesh.position.y = -bannerH * 0.5;
  bannerMesh.castShadow = true;
  bannerPivot.add(bannerMesh);

  // Golden weighted roller bar at bottom of banner
  const barGeo = res.geo(new THREE.CylinderGeometry(0.026, 0.026, 0.66, 10));
  const bar = new THREE.Mesh(barGeo, goldShellMat);
  bar.rotation.z = Math.PI / 2;
  bar.position.y = -bannerH;
  bannerPivot.add(bar);

  // Dedicated vibrant metallic Kusudama Confetti rain particles!
  interface ConfettiBit {
    mesh: THREE.Mesh;
    vel: THREE.Vector3;
    spin: THREE.Vector3;
    age: number;
    maxAge: number;
    active: boolean;
  }
  const confettiGeo = res.geo(new THREE.PlaneGeometry(0.11, 0.075));
  const confettiPalette = ['#ffd166', '#ff4d6d', '#00bbf9', '#52b788', '#ffffff', '#ff9f1c'];
  const confettiMats = confettiPalette.map((hex) =>
    res.stdMat(hex, 0.32, 0.28, {
      side: THREE.DoubleSide,
      emissive: hex,
      emissiveIntensity: 0.16,
    }),
  );

  const confettiBits: ConfettiBit[] = [];
  for (let i = 0; i < 64; i++) {
    const m = new THREE.Mesh(confettiGeo, confettiMats[i % confettiMats.length]);
    m.visible = false;
    root.add(m);
    confettiBits.push({
      mesh: m,
      vel: new THREE.Vector3(),
      spin: new THREE.Vector3(),
      age: 0,
      maxAge: 2.2,
      active: false,
    });
  }

  let confettiCursor = 0;
  let burstTriggered = false;
  let drizzleAccum = 0;

  const spawnConfetti = (count: number, burstSpeed: number): void => {
    for (let i = 0; i < count; i++) {
      const bit = confettiBits[confettiCursor];
      confettiCursor = (confettiCursor + 1) % confettiBits.length;
      const ang = Math.random() * Math.PI * 2;
      const spd = (0.55 + Math.random() * 1.4) * burstSpeed;
      bit.mesh.position.set(
        (Math.random() - 0.5) * 0.65,
        3.95 + (Math.random() - 0.5) * 0.25,
        -0.9 + (Math.random() - 0.5) * 0.45,
      );
      bit.vel.set(Math.cos(ang) * spd, 0.4 + Math.random() * 1.15 * burstSpeed, Math.sin(ang) * spd * 0.75);
      bit.spin.set(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 9,
      );
      bit.age = 0;
      bit.maxAge = 1.9 + Math.random() * 1.35;
      bit.active = true;
      bit.mesh.visible = true;
      bit.mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    }
  };

  const sync = (hazard: StageHazardState, dt: number, elapsedTime: number): void => {
    const safeDt = Math.min(dt, 0.1);
    const open = THREE.MathUtils.clamp(hazard.kusudamaOpen, 0, 1);

    // Gentle festive sway of suspended kusudama
    kusudamaAnchor.rotation.z = Math.sin(elapsedTime * 1.8) * 0.045;
    kusudamaAnchor.rotation.x = Math.cos(elapsedTime * 1.3) * 0.025;

    // Dramatic outward split of left & right hemispheres!
    leftHalfPivot.rotation.z = -open * 1.18;
    rightHalfPivot.rotation.z = open * 1.18;
    tasselGroup.visible = open < 0.25;

    // Unfurl 「祝・優勝！」 silk banner downward when open > 0
    if (open > 0.04) {
      bannerPivot.visible = true;
      const unfurl = THREE.MathUtils.clamp(open * 1.18, 0.05, 1.0);
      bannerPivot.scale.set(1, unfurl, 1);
      bannerPivot.rotation.x = Math.sin(elapsedTime * 3.8) * 0.07;
      bannerPivot.rotation.z = Math.cos(elapsedTime * 2.9) * 0.045;
    } else {
      bannerPivot.visible = false;
    }

    // Trigger celebratory confetti explosion & continuous fluttering shower!
    const celebrating = open > 0.12 || hazard.kusudamaTimer > 0;
    if (celebrating) {
      if (!burstTriggered) {
        burstTriggered = true;
        spawnConfetti(36, 1.45);
      }
      drizzleAccum += safeDt;
      if (drizzleAccum >= 0.085) {
        drizzleAccum = 0;
        spawnConfetti(4, 0.72);
      }
    } else {
      burstTriggered = false;
    }

    // Update fluttering confetti particles
    for (const bit of confettiBits) {
      if (!bit.active) continue;
      bit.age += safeDt;
      if (bit.age >= bit.maxAge || bit.mesh.position.y < 0.06) {
        bit.active = false;
        bit.mesh.visible = false;
        continue;
      }
      bit.vel.y = Math.max(-1.45, bit.vel.y - 2.4 * safeDt);
      bit.vel.x *= Math.exp(-1.2 * safeDt);
      bit.vel.z *= Math.exp(-1.2 * safeDt);
      bit.mesh.position.x += (bit.vel.x + Math.sin(elapsedTime * 5 + bit.age * 4) * 0.35) * safeDt;
      bit.mesh.position.y += bit.vel.y * safeDt;
      bit.mesh.position.z += bit.vel.z * safeDt;
      bit.mesh.rotation.x += bit.spin.x * safeDt;
      bit.mesh.rotation.y += bit.spin.y * safeDt;
      bit.mesh.rotation.z += bit.spin.z * safeDt;
    }
  };

  return { sync };
}

function buildSportsDayStage(
  stage: StageSpec,
  res: StageResourceTracker,
  root: THREE.Group,
  petalsOut: FloatingPetal[],
  swayTargets: SwayTarget[],
): HazardController {
  // 1. Lush sunlit green athletic field + terracotta oval running track border with crisp white lane stripes!
  const fieldTex = createSportsFieldTexture(res);
  const fieldMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: fieldTex,
      roughness: 0.86,
      metalness: 0.0,
    }),
  );
  const fieldGeo = res.geo(new THREE.PlaneGeometry(36, 36));
  const field = new THREE.Mesh(fieldGeo, fieldMat);
  field.rotation.x = -Math.PI / 2;
  field.position.set(0, 0, -1.8);
  field.receiveShadow = true;
  root.add(field);

  // Seamless outer green stadium park lawn extending out to distant hills
  const outerLawnMat = res.stdMat('#67be50', 0.9);
  const outerLawnGeo = res.geo(new THREE.CircleGeometry(54, 48));
  const outerLawn = new THREE.Mesh(outerLawnGeo, outerLawnMat);
  outerLawn.rotation.x = -Math.PI / 2;
  outerLawn.position.y = -0.025;
  outerLawn.receiveShadow = true;
  root.add(outerLawn);

  // 2. Asymmetric 1st / 2nd / 3rd Podium EXACTLY matching stage.platforms
  for (const p of stage.platforms) {
    const rank: 1 | 2 | 3 =
      p.id === 'podium_1' ? 1 : p.id === 'podium_2' ? 2 : 3;
    buildSportsPodiumBlock(p, rank, res, root);
  }

  // 3. Festive Red-and-White Striped Festival Curtain (紅白幕) backdrop!
  const kohakuTex = createKohakuCurtainTexture(res);
  const kohakuMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: kohakuTex,
      roughness: 0.68,
      metalness: 0.02,
      side: THREE.DoubleSide,
    }),
  );
  const curtainW = 9.8;
  const curtainH = 2.35;
  const curtainGeo = res.geo(new THREE.PlaneGeometry(curtainW, curtainH));
  const curtain = new THREE.Mesh(curtainGeo, kohakuMat);
  curtain.position.set(0, curtainH * 0.5 + 0.05, -3.45);
  curtain.castShadow = true;
  curtain.receiveShadow = true;
  root.add(curtain);

  // Sturdy bamboo/metal support posts + festive braided red-and-white top cord (紅白紐)
  const poleMat = res.stdMat('#f1f5f9', 0.45, 0.25);
  const redRopeMat = res.stdMat('#e63946', 0.6);
  const postGeo = res.geo(new THREE.CylinderGeometry(0.055, 0.062, 2.75, 10));
  for (const px of [-4.95, -2.5, 0, 2.5, 4.95]) {
    const post = new THREE.Mesh(postGeo, poleMat);
    post.position.set(px, 1.375, -3.52);
    post.castShadow = true;
    root.add(post);
  }
  const topCordGeo = res.geo(new THREE.CylinderGeometry(0.042, 0.042, curtainW + 0.3, 10));
  const topCord = new THREE.Mesh(topCordGeo, redRopeMat);
  topCord.rotation.z = Math.PI / 2;
  topCord.position.set(0, curtainH + 0.06, -3.42);
  root.add(topCord);

  // 4. Tall stadium poles + swaying International Bunting Flags (万国旗) + Kusudama overhead suspension line!
  const tallPoleGeo = res.geo(new THREE.CylinderGeometry(0.072, 0.088, 5.7, 10));
  const finialGeo = res.geo(new THREE.SphereGeometry(0.14, 12, 10));
  const goldMat = res.stdMat('#f5c542', 0.28, 0.52);
  const polePositions: Array<[number, number]> = [
    [-5.6, -3.4],
    [5.6, -3.4],
    [-5.3, -0.9],
    [5.3, -0.9],
  ];
  for (const [px, pz] of polePositions) {
    const p = new THREE.Mesh(tallPoleGeo, poleMat);
    p.position.set(px, 2.85, pz);
    p.castShadow = true;
    root.add(p);

    const f = new THREE.Mesh(finialGeo, goldMat);
    f.position.set(px, 5.75, pz);
    root.add(f);
  }

  // Overhead horizontal cable supporting the hanging Kusudama at (0, 5.5, -0.9)
  const kusuCableGeo = res.geo(new THREE.CylinderGeometry(0.02, 0.02, 10.6, 8));
  const kusuCable = new THREE.Mesh(kusuCableGeo, poleMat);
  kusuCable.rotation.z = Math.PI / 2;
  kusuCable.position.set(0, 5.5, -0.9);
  root.add(kusuCable);

  // Crisscrossing International Bunting Flag ropes (万国旗) swaying cheerfully!
  const flagTextures = createInternationalFlagTextures(res);
  const flagMats = flagTextures.map((tex) =>
    res.mat(
      new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.56,
        metalness: 0.02,
        side: THREE.DoubleSide,
      }),
    ),
  );
  const rectFlagGeo = res.geo(new THREE.PlaneGeometry(0.42, 0.29));
  const ropeLineMat = res.stdMat('#ffffff', 0.65);

  const buntingSpans: Array<[THREE.Vector3, THREE.Vector3, number]> = [
    [new THREE.Vector3(-5.6, 5.35, -3.4), new THREE.Vector3(5.6, 5.35, -3.4), 0.72],
    [new THREE.Vector3(-5.3, 5.35, -0.9), new THREE.Vector3(5.6, 5.15, -3.4), 0.55],
    [new THREE.Vector3(5.3, 5.35, -0.9), new THREE.Vector3(-5.6, 5.15, -3.4), 0.55],
  ];

  buntingSpans.forEach(([start, end, sag], sIdx) => {
    const mid = start.clone().lerp(end, 0.5);
    mid.y -= sag;
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const tubeGeo = res.geo(new THREE.TubeGeometry(curve, 22, 0.014, 6, false));
    root.add(new THREE.Mesh(tubeGeo, ropeLineMat));

    const flagCount = 13;
    for (let i = 1; i <= flagCount; i++) {
      const t = i / (flagCount + 1);
      const pt = curve.getPoint(t);
      const tangent = curve.getTangent(t);
      const pivot = new THREE.Group();
      pivot.position.copy(pt);
      pivot.rotation.y = Math.atan2(tangent.z, tangent.x) * -1;
      root.add(pivot);

      const flag = new THREE.Mesh(rectFlagGeo, flagMats[(i + sIdx * 2) % flagMats.length]);
      flag.position.y = -0.16;
      pivot.add(flag);

      swayTargets.push({
        obj: pivot,
        axis: 'x',
        baseRot: 0.06,
        amp: 0.26,
        speed: 2.8 + (i % 4) * 0.35,
        phase: i * 0.65 + sIdx * 1.4,
      });
    }
  });

  // 5. Classic Japanese sports-day cheering tents (本部テント) flanking background!
  const tentRoofMat = res.stdMat('#ffffff', 0.64);
  const tentFrameMat = res.stdMat('#cbd5e1', 0.42, 0.35);
  const redTeamMat = res.stdMat('#ef4444', 0.58);
  const whiteTeamMat = res.stdMat('#3b82f6', 0.58);
  const tentLegGeo = res.geo(new THREE.CylinderGeometry(0.05, 0.05, 2.35, 8));
  const tentRoofGeo = res.geo(new THREE.ConeGeometry(2.55, 1.15, 4));
  const valanceGeo = res.geo(new THREE.BoxGeometry(3.6, 0.38, 0.08));

  const tents: Array<[number, number, number, THREE.Material]> = [
    [-7.3, -5.0, 0.28, redTeamMat],
    [7.3, -5.0, -0.28, whiteTeamMat],
  ];
  for (const [tx, tz, rotY, teamMat] of tents) {
    const tent = new THREE.Group();
    tent.position.set(tx, 0, tz);
    tent.rotation.y = rotY;
    root.add(tent);

    for (const lx of [-1.65, 1.65]) {
      for (const lz of [-1.25, 1.25]) {
        const leg = new THREE.Mesh(tentLegGeo, tentFrameMat);
        leg.position.set(lx, 1.175, lz);
        leg.castShadow = true;
        tent.add(leg);
      }
    }

    const roof = new THREE.Mesh(tentRoofGeo, tentRoofMat);
    roof.position.y = 2.88;
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(1.06, 1.0, 0.85);
    roof.castShadow = true;
    tent.add(roof);

    // Colorful team valence banner on front of tent
    const val = new THREE.Mesh(valanceGeo, teamMat);
    val.position.set(0, 2.18, 1.32);
    tent.add(val);
  }

  // 6. Wooden festival signboard easel composited onto ./assets/sports-board.jpg
  const easel = buildWoodenEaselBoard(
    res,
    './assets/sports-board.jpg',
    '#e63946',
    'sports_day',
  );
  easel.position.set(4.25, 0, 0.55);
  easel.rotation.y = -0.5;
  root.add(easel);

  // 7. Ambient sunny stadium confetti sparkles gently drifting in the air
  buildFloatingPetals(
    res,
    root,
    petalsOut,
    ['#ffd166', '#ff6b6b', '#4cc9f0', '#ffffff'],
    28,
  );

  // 8. Overhead Hanging 3D Kusudama hazard controller!
  return buildKusudamaHazard(res, root);
}

// ============================================================================
// Stage 4: Tropical Beach Crashing Wave (南国ビーチ・大波サマー)
// ============================================================================

function createGoldenSandTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Warm sunlit golden tropical sand base
    ctx.fillStyle = '#f6d897';
    ctx.fillRect(0, 0, size, size);

    // Gentle wind-swept beach sand ripples
    ctx.strokeStyle = 'rgba(222, 178, 102, 0.34)';
    ctx.lineWidth = 6;
    for (let y = 12; y < size; y += 26) {
      ctx.beginPath();
      for (let x = 0; x <= size; x += 32) {
        const wy = y + Math.sin((x / size) * Math.PI * 4 + y * 0.05) * 4;
        if (x === 0) ctx.moveTo(x, wy);
        else ctx.lineTo(x, wy);
      }
      ctx.stroke();
    }

    // Sparkling quartz sand grains & tiny coral/shell flecks
    let seed = 9001;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 1400; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const r = 1 + rand() * 2.1;
      ctx.fillStyle =
        rand() > 0.55 ? 'rgba(255, 251, 232, 0.55)' : 'rgba(204, 158, 86, 0.32)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 4);
  tex.anisotropy = 4;
  return tex;
}

function createBeachParasolTexture(
  res: StageResourceTracker,
  colorA: string,
  colorB: string,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const panels = 8;
    const pw = canvas.width / panels;
    for (let i = 0; i < panels; i++) {
      ctx.fillStyle = i % 2 === 0 ? colorA : colorB;
      ctx.fillRect(i * pw, 0, pw, canvas.height);
    }
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

function createSurfboardTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Sunny yellow-coral gradient surfboard with turquoise center racing stripe
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#ffca3a');
    grad.addColorStop(0.5, '#ff7f51');
    grad.addColorStop(1, '#ff595e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 512);

    ctx.fillStyle = '#00bbf9';
    ctx.fillRect(104, 0, 48, 512);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(96, 0, 8, 512);
    ctx.fillRect(152, 0, 8, 512);

    // Cute tropical white hibiscus emblem in center
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(128 + Math.cos(a) * 28, 220 + Math.sin(a) * 28, 20, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#ffbe0b';
    ctx.beginPath();
    ctx.arc(128, 220, 14, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function createWaveFoamTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Rich translucent tropical turquoise -> frothy white crest gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
    grad.addColorStop(0.22, 'rgba(218, 252, 255, 0.92)');
    grad.addColorStop(0.52, 'rgba(24, 202, 220, 0.88)');
    grad.addColorStop(0.85, 'rgba(0, 168, 204, 0.78)');
    grad.addColorStop(1, 'rgba(0, 150, 199, 0.28)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Lace-like frothy sea foam bubbles across upper wave face
    let seed = 5511;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 160; i++) {
      const x = rand() * 512;
      const y = rand() * 145;
      const r = 4 + rand() * 16;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.22 + (1 - y / 150) * 0.48})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(3, 1);
  return tex;
}

function buildCoconutPalmTree(
  res: StageResourceTracker,
  root: THREE.Group,
  x: number,
  y: number,
  z: number,
  scale: number,
  leanX: number,
  leanZ: number,
  swayTargets: SwayTarget[],
  phase: number,
): void {
  const tree = new THREE.Group();
  tree.position.set(x, y, z);
  tree.scale.setScalar(scale);
  root.add(tree);

  const trunkMat = res.stdMat('#9c6b43', 0.82);
  const trunkRingMat = res.stdMat('#7d5130', 0.85);
  const coconutMat = res.stdMat('#5c381f', 0.56);
  const frondMat = res.stdMat('#36b34a', 0.62, 0.02, { side: THREE.DoubleSide });
  const frondLightMat = res.stdMat('#57cc59', 0.6, 0.02, { side: THREE.DoubleSide });

  // Segmented graceful curving palm trunk
  const segments = 7;
  let curX = 0;
  let curY = 0;
  let curZ = 0;
  const segH = 0.62;
  for (let i = 0; i < segments; i++) {
    const t = i / (segments - 1);
    const rBot = THREE.MathUtils.lerp(0.24, 0.11, t);
    const rTop = THREE.MathUtils.lerp(0.21, 0.1, t);
    const segGeo = res.geo(new THREE.CylinderGeometry(rTop, rBot, segH + 0.06, 9));
    const seg = new THREE.Mesh(segGeo, i % 2 === 0 ? trunkMat : trunkRingMat);
    const bendX = leanX * (0.14 + t * 0.34);
    const bendZ = leanZ * (0.14 + t * 0.34);
    seg.position.set(curX + bendX * 0.45, curY + segH * 0.5, curZ + bendZ * 0.45);
    seg.rotation.z = -bendX * 0.85;
    seg.rotation.x = bendZ * 0.85;
    seg.castShadow = true;
    tree.add(seg);

    curX += bendX;
    curY += segH * 0.94;
    curZ += bendZ;
  }

  // Swaying crown canopy pivot at top of curved trunk
  const crownPivot = new THREE.Group();
  crownPivot.position.set(curX, curY, curZ);
  tree.add(crownPivot);

  // Cluster of 3 glossy brown coconuts under the fronds!
  const cocoGeo = res.geo(new THREE.SphereGeometry(0.15, 10, 8));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.4;
    const coco = new THREE.Mesh(cocoGeo, coconutMat);
    coco.position.set(Math.cos(a) * 0.17, -0.1, Math.sin(a) * 0.17);
    coco.castShadow = true;
    crownPivot.add(coco);
  }

  // 7 lush arching fan palm fronds radiating around the crown!
  const frondGeo = res.geo(new THREE.PlaneGeometry(0.68, 2.15, 3, 6));
  const posAttr = frondGeo.attributes.position;
  for (let vi = 0; vi < posAttr.count; vi++) {
    const vx = posAttr.getX(vi);
    const vy = posAttr.getY(vi); // -1.075 .. +1.075
    const u = THREE.MathUtils.clamp((vy + 1.075) / 2.15, 0, 1); // 0 = base, 1 = tip
    // Taper to pointed frond tip & droop gracefully outward!
    const widthTaper = Math.sin(Math.pow(u, 0.72) * Math.PI);
    const droop = -Math.pow(u, 2.0) * 0.92;
    const ribV = -Math.abs(vx) * 0.22;
    posAttr.setXYZ(vi, vx * widthTaper, u * 2.1, droop + ribV);
  }
  frondGeo.computeVertexNormals();

  const frondCount = 7;
  for (let i = 0; i < frondCount; i++) {
    const yaw = (i / frondCount) * Math.PI * 2 + phase * 0.3;
    const fHolder = new THREE.Group();
    fHolder.rotation.y = yaw;
    crownPivot.add(fHolder);

    const f = new THREE.Mesh(frondGeo, i % 2 === 0 ? frondMat : frondLightMat);
    f.rotation.x = Math.PI * 0.36 + (i % 2) * 0.12;
    f.castShadow = true;
    fHolder.add(f);
  }

  swayTargets.push({
    obj: crownPivot,
    axis: 'z',
    baseRot: 0,
    amp: 0.085,
    speed: 1.55 + (phase % 1.0) * 0.4,
    phase,
  });
}

function buildTropicalIslandsHorizon(
  res: StageResourceTracker,
  root: THREE.Group,
): void {
  // Distant tropical volcanic island silhouettes & coral atolls across the emerald horizon!
  const islandNearMat = res.stdMat('#4db39c', 0.88);
  const islandFarMat = res.stdMat('#75c9bd', 0.92);
  const sandRimMat = res.stdMat('#f2dda6', 0.85);
  const peakGeo = res.geo(new THREE.ConeGeometry(1, 1, 14));
  const domeGeo = res.geo(new THREE.SphereGeometry(1, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.5));

  const islands: Array<[number, number, number, number, boolean]> = [
    [-22, -28, 7.5, 5.2, true],
    [-11, -34, 9.2, 6.8, false],
    [13, -31, 8.4, 5.8, true],
    [25, -26, 6.8, 4.4, false],
    [2, -40, 12.0, 4.2, false],
  ];

  for (const [ix, iz, rad, h, isNear] of islands) {
    const isl = new THREE.Group();
    isl.position.set(ix, -0.2, iz);
    root.add(isl);

    const rim = new THREE.Mesh(domeGeo, sandRimMat);
    rim.scale.set(rad * 1.15, 0.55, rad * 0.85);
    isl.add(rim);

    const volcano = new THREE.Mesh(peakGeo, isNear ? islandNearMat : islandFarMat);
    volcano.position.y = h * 0.48;
    volcano.scale.set(rad * 0.82, h, rad * 0.72);
    isl.add(volcano);

    const shoulder = new THREE.Mesh(domeGeo, isNear ? islandNearMat : islandFarMat);
    shoulder.position.set(rad * 0.42, 0, 0.4);
    shoulder.scale.set(rad * 0.55, h * 0.45, rad * 0.5);
    isl.add(shoulder);
  }
}

function buildBeachWaveHazard(
  res: StageResourceTracker,
  root: THREE.Group,
): HazardController {
  // Multi-layered frothy turquoise-and-white curved shoreline wave surging z: +2.8 -> -0.35!
  const waveGroup = new THREE.Group();
  waveGroup.position.set(0, 0, 2.8);
  root.add(waveGroup);

  const waveW = 12.2;
  const foamTex = createWaveFoamTexture(res);
  const waveSheetMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: foamTex,
      roughness: 0.24,
      metalness: 0.05,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    }),
  );

  // Curved curling barrel wave sheet facing -Z (toward the crowd & camera!)
  const sheetGeo = res.geo(new THREE.PlaneGeometry(waveW, 1.55, 24, 8));
  const sPos = sheetGeo.attributes.position;
  for (let i = 0; i < sPos.count; i++) {
    const vx = sPos.getX(i);
    const vy = sPos.getY(i); // -0.775 .. +0.775
    const t = THREE.MathUtils.clamp((vy + 0.775) / 1.55, 0, 1); // 0 = base at sand, 1 = curling lip crest
    const ripple = Math.sin(vx * 1.1) * 0.09;
    const archY = Math.sin(t * Math.PI * 0.72) * 1.05 + ripple * t;
    const curlZ = (1 - t) * 1.15 - Math.pow(t, 1.8) * 0.48 + ripple;
    sPos.setXYZ(i, vx, Math.max(0.02, archY), curlZ);
  }
  sheetGeo.computeVertexNormals();
  const waveSheet = new THREE.Mesh(sheetGeo, waveSheetMat);
  waveGroup.add(waveSheet);

  // Rolling white frothy foam crest cylinder + bubbly spray puffs along the leading lip!
  const foamMat = res.stdMat('#ffffff', 0.42, 0.02, {
    emissive: '#dff9ff',
    emissiveIntensity: 0.28,
    transparent: true,
    opacity: 0.94,
  });
  const crestRollPivot = new THREE.Group();
  crestRollPivot.position.set(0, 0.82, -0.34);
  waveGroup.add(crestRollPivot);

  const crestCylGeo = res.geo(new THREE.CylinderGeometry(0.16, 0.16, waveW, 14, 1, false));
  const crestCyl = new THREE.Mesh(crestCylGeo, foamMat);
  crestCyl.rotation.z = Math.PI / 2;
  crestRollPivot.add(crestCyl);

  const foamPuffs: THREE.Mesh[] = [];
  const puffGeo = res.geo(new THREE.IcosahedronGeometry(0.24, 1));
  const puffCount = 22;
  for (let i = 0; i < puffCount; i++) {
    const t = i / (puffCount - 1);
    const px = THREE.MathUtils.lerp(-waveW * 0.48, waveW * 0.48, t);
    const puff = new THREE.Mesh(puffGeo, foamMat);
    puff.position.set(px, (i % 2 === 0 ? 0.06 : -0.05), (i % 3 - 1) * 0.09);
    puff.scale.set(1.15, 0.85, 0.95);
    crestRollPivot.add(puff);
    foamPuffs.push(puff);
  }

  // Trailing shallow turquoise surf wash sheet gliding smoothly across the wet beach!
  const washMat = res.stdMat('#35d6e6', 0.22, 0.04, {
    transparent: true,
    opacity: 0.62,
  });
  const washGeo = res.geo(new THREE.PlaneGeometry(waveW + 0.6, 3.6));
  const washMesh = new THREE.Mesh(washGeo, washMat);
  washMesh.rotation.x = -Math.PI / 2;
  washMesh.position.set(0, 0.035, 1.9);
  waveGroup.add(washMesh);

  // Leading frothy white surf lace edge right on the sand!
  const laceGeo = res.geo(new THREE.CylinderGeometry(0.085, 0.11, waveW + 0.2, 12));
  const laceMesh = new THREE.Mesh(laceGeo, foamMat);
  laceMesh.rotation.z = Math.PI / 2;
  laceMesh.position.set(0, 0.07, -0.45);
  waveGroup.add(laceMesh);

  const sync = (hazard: StageHazardState, _dt: number, elapsedTime: number): void => {
    foamTex.offset.x = (elapsedTime * 0.18) % 1;

    if (hazard.waveActive) {
      // Surges dramatically inward across the shoreline (z: +2.8 -> -0.35) & recedes!
      const p = THREE.MathUtils.clamp(hazard.waveProgress, 0, 1);
      const surge = Math.sin(p * Math.PI);
      const waveZ = THREE.MathUtils.lerp(2.8, -0.35, surge);
      const waveHeight = 0.42 + surge * 0.92;

      waveGroup.position.set(0, 0, waveZ);
      waveSheet.scale.set(1, waveHeight, 1 + surge * 0.22);
      crestRollPivot.position.set(0, 0.78 * waveHeight, -0.36 - surge * 0.14);
      crestRollPivot.rotation.x = -elapsedTime * 11.5;
      washMat.opacity = 0.42 + surge * 0.34;
      laceMesh.scale.set(1, 1 + surge * 0.45, 1);

      for (let i = 0; i < foamPuffs.length; i++) {
        const sc = 0.92 + Math.sin(elapsedTime * 14 + i * 1.3) * 0.26;
        foamPuffs[i].scale.set(1.15 * sc, 0.9 * sc, 0.95 * sc);
      }
    } else if (hazard.waveWarningTimer > 0) {
      // Rising ominously on warning telegraph at the front edge!
      const swell = THREE.MathUtils.clamp(1 - hazard.waveWarningTimer / 2.2, 0.15, 1);
      const pulse = Math.sin(elapsedTime * 10) * 0.08;
      const waveHeight = 0.45 + swell * 0.72 + pulse;

      waveGroup.position.set(0, 0, THREE.MathUtils.lerp(2.85, 2.42, swell));
      waveSheet.scale.set(1, waveHeight, 1.0);
      crestRollPivot.position.set(0, 0.78 * waveHeight, -0.34);
      crestRollPivot.rotation.x = -elapsedTime * 6.5;
      washMat.opacity = 0.44;
      laceMesh.scale.set(1, 1.15, 1);
    } else {
      // Calm gentle shoreline lapping at front edge
      const lap = Math.sin(elapsedTime * 2.1);
      const waveHeight = 0.26 + lap * 0.05;
      waveGroup.position.set(0, 0, 2.85 + lap * 0.18);
      waveSheet.scale.set(1, waveHeight, 0.85);
      crestRollPivot.position.set(0, 0.75 * waveHeight, -0.25);
      crestRollPivot.rotation.x = -elapsedTime * 1.8;
      washMat.opacity = 0.32;
      laceMesh.scale.set(1, 0.72, 1);
    }
  };

  return { sync };
}

function buildTropicalBeachStage(
  stage: StageSpec,
  res: StageResourceTracker,
  root: THREE.Group,
  petalsOut: FloatingPetal[],
  swayTargets: SwayTarget[],
  oceanUniformsOut: Array<{ uTime: { value: number } }>,
): HazardController {
  // 1. Sparkling animated turquoise ocean extending seamlessly to the tropical horizon!
  const oceanUniforms = {
    uTime: { value: 0 },
    uShallowColor: { value: new THREE.Color('#27dce8') },
    uDeepColor: { value: new THREE.Color('#008dc4') },
    uFoamColor: { value: new THREE.Color('#f4feff') },
  };
  oceanUniformsOut.push(oceanUniforms);

  const oceanMat = res.mat(
    new THREE.ShaderMaterial({
      uniforms: oceanUniforms,
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uShallowColor;
        uniform vec3 uDeepColor;
        uniform vec3 uFoamColor;
        varying vec3 vWorldPos;
        void main() {
          vec2 p = vWorldPos.xz;
          float dist = length(p * vec2(0.75, 1.0));
          float depthT = smoothstep(5.0, 28.0, dist);
          vec3 col = mix(uShallowColor, uDeepColor, depthT);

          // Layered sunny tropical wave caustics & glints
          float w1 = sin(p.x * 0.85 + uTime * 1.4 + sin(p.y * 0.55) * 1.2);
          float w2 = cos(p.y * 1.15 - uTime * 1.9 + sin(p.x * 0.45));
          float crest = smoothstep(0.65, 1.0, (w1 + w2) * 0.5);
          col = mix(col, uFoamColor, crest * 0.28);

          // Shimmering sun sparkles across the turquoise water
          float sp = pow(max(0.0, sin(p.x * 3.1 + uTime * 2.6) * cos(p.y * 2.8 - uTime * 2.1)), 10.0);
          col += vec3(1.0, 0.98, 0.88) * sp * 0.55;

          // Soft foamy surf halo hugging the sandbar perimeter
          float shoreHalo = smoothstep(8.2, 4.2, dist);
          float foamBand = smoothstep(0.2, 0.9, sin(dist * 3.2 - uTime * 2.4) * 0.5 + 0.5) * shoreHalo;
          col = mix(col, uFoamColor, foamBand * 0.45);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    }),
  );
  const oceanGeo = res.geo(new THREE.CircleGeometry(66, 48));
  const ocean = new THREE.Mesh(oceanGeo, oceanMat);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.y = -0.08;
  root.add(ocean);

  // 2. Warm golden tropical sand beach cove + wet sand shoreline edge!
  const sandTex = createGoldenSandTexture(res);
  const sandMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: sandTex,
      roughness: 0.88,
      metalness: 0.0,
    }),
  );
  const wetSandMat = res.stdMat('#dfb672', 0.48, 0.04);

  // Gently sculpted sandy beach shore (play area sits flat at y = 0)
  const beachGeo = res.geo(new THREE.CylinderGeometry(7.2, 8.6, 0.24, 36));
  const beach = new THREE.Mesh(beachGeo, sandMat);
  beach.position.set(0, -0.12, -0.55);
  beach.scale.set(1.22, 1, 0.72);
  beach.receiveShadow = true;
  root.add(beach);

  // Slightly darker wet shoreline strip right in the front splash zone (z = +0.5..+2.8)
  const wetStripGeo = res.geo(new THREE.BoxGeometry(10.8, 0.014, 2.35));
  const wetStrip = new THREE.Mesh(wetStripGeo, wetSandMat);
  wetStrip.position.set(0, 0.002, 1.65);
  wetStrip.receiveShadow = true;
  root.add(wetStrip);

  // 3. Dry Sand Dune Shelf EXACTLY matching stage.platforms (sand_dune: height 0.24)
  const drySandMat = res.stdMat('#fae3a7', 0.88);
  for (const p of stage.platforms) {
    const width = p.maxX - p.minX;
    const depth = p.maxZ - p.minZ;
    const cx = (p.minX + p.maxX) * 0.5;
    const cz = (p.minZ + p.maxZ) * 0.5;

    // Flat playable golden sand dune deck with exact top surface at y = p.height
    const duneGeo = res.geo(new THREE.BoxGeometry(width, p.height, depth));
    const dune = new THREE.Mesh(duneGeo, sandMat);
    dune.position.set(cx, p.height * 0.5, cz);
    dune.castShadow = true;
    dune.receiveShadow = true;
    root.add(dune);

    // Soft rounded sandbank berm bevel along front & side edges so it looks organic & sandy!
    const frontBermGeo = res.geo(new THREE.CylinderGeometry(p.height * 0.62, p.height * 0.95, width + 0.16, 12));
    const frontBerm = new THREE.Mesh(frontBermGeo, drySandMat);
    frontBerm.rotation.z = Math.PI / 2;
    frontBerm.position.set(cx, p.height * 0.36, p.maxZ + 0.02);
    frontBerm.scale.set(1, 1, 1.4);
    frontBerm.receiveShadow = true;
    root.add(frontBerm);

    const backBerm = new THREE.Mesh(frontBermGeo, drySandMat);
    backBerm.rotation.z = Math.PI / 2;
    backBerm.position.set(cx, p.height * 0.36, p.minZ - 0.02);
    backBerm.scale.set(1, 1, 1.4);
    root.add(backBerm);
  }

  // Cheerful striped beach towel mat & pastel starfish accent on sand
  const towelTex = createBeachParasolTexture(res, '#ff6b6b', '#fff5e4');
  const towelMat = res.mat(new THREE.MeshStandardMaterial({ map: towelTex, roughness: 0.82 }));
  const towelGeo = res.geo(new THREE.BoxGeometry(1.45, 0.02, 0.88));
  const towel = new THREE.Mesh(towelGeo, towelMat);
  towel.position.set(-4.95, 0.02, -1.55);
  towel.rotation.y = 0.25;
  towel.receiveShadow = true;
  root.add(towel);

  // Cute coral starfish & seashells along sand edges
  const starfishGeo = res.geo(new THREE.OctahedronGeometry(0.11, 0));
  const starfishMat = res.stdMat('#ff6b6b', 0.58);
  for (const [sx, sz, sy] of [
    [-3.7, 1.2, 0.03],
    [3.5, 1.35, 0.03],
    [-4.2, -0.6, 0.04],
  ]) {
    const sf = new THREE.Mesh(starfishGeo, starfishMat);
    sf.position.set(sx, sy, sz);
    sf.scale.set(1.2, 0.35, 1.2);
    root.add(sf);
  }

  // 4. Swaying curved Coconut Palm Trees framing the tropical cove!
  const palms: Array<[number, number, number, number, number, number]> = [
    [-5.6, -2.5, 1.15, 0.72, 0.25, 0.0],
    [5.8, -2.6, 1.2, -0.78, 0.2, 1.3],
    [-7.1, -0.2, 1.02, 0.65, -0.18, 2.5],
    [7.2, -0.5, 1.05, -0.68, -0.14, 3.7],
    [-3.9, -4.1, 1.28, 0.45, 0.35, 4.9],
    [4.2, -4.2, 1.24, -0.48, 0.32, 5.8],
  ];
  for (const [px, pz, sc, lx, lz, ph] of palms) {
    buildCoconutPalmTree(res, root, px, -0.04, pz, sc, lx, lz, swayTargets, ph);
  }

  // 5. Colorful striped Beach Parasols planted cleanly on the flanks!
  const poleMat = res.stdMat('#fffdf8', 0.55);
  const paraPoleGeo = res.geo(new THREE.CylinderGeometry(0.042, 0.048, 2.55, 10));
  const paraConeGeo = res.geo(new THREE.ConeGeometry(1.45, 0.56, 16));
  const parasols: Array<[number, number, number, string, string]> = [
    [-4.95, -1.75, 0.16, '#ff595e', '#ffffff'],
    [5.15, -1.95, -0.18, '#00bbf9', '#ffca3a'],
    [-6.2, -3.45, 0.12, '#ff85a2', '#fffdf8'],
  ];
  for (const [ux, uz, tiltZ, colA, colB] of parasols) {
    const pGroup = new THREE.Group();
    pGroup.position.set(ux, 0, uz);
    pGroup.rotation.z = tiltZ;
    root.add(pGroup);

    const pole = new THREE.Mesh(paraPoleGeo, poleMat);
    pole.position.y = 1.24;
    pole.castShadow = true;
    pGroup.add(pole);

    const pTex = createBeachParasolTexture(res, colA, colB);
    const pMat = res.mat(
      new THREE.MeshStandardMaterial({
        map: pTex,
        roughness: 0.55,
        side: THREE.DoubleSide,
      }),
    );
    const canopy = new THREE.Mesh(paraConeGeo, pMat);
    canopy.position.y = 2.48;
    canopy.castShadow = true;
    pGroup.add(canopy);
  }

  // 6. Bright tropical Surfboard planted upright in the sand!
  const surfGroup = new THREE.Group();
  surfGroup.position.set(-4.55, 0.0, 0.45);
  surfGroup.rotation.set(0.1, 0.52, -0.14);
  root.add(surfGroup);

  const surfTex = createSurfboardTexture(res);
  const surfMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: surfTex,
      roughness: 0.22,
      metalness: 0.06,
    }),
  );
  const surfGeo = res.geo(new THREE.CapsuleGeometry(0.32, 1.35, 10, 18));
  const surfBoard = new THREE.Mesh(surfGeo, surfMat);
  surfBoard.position.y = 0.92;
  surfBoard.scale.set(1.0, 1.0, 0.18);
  surfBoard.castShadow = true;
  surfGroup.add(surfBoard);

  // Dorsal surf fin on back
  const finGeo = res.geo(new THREE.ConeGeometry(0.12, 0.28, 4));
  const fin = new THREE.Mesh(finGeo, res.stdMat('#00bbf9', 0.35));
  fin.position.set(0, 0.36, -0.1);
  fin.rotation.x = -Math.PI / 2 - 0.35;
  surfGroup.add(fin);

  // 7. Distant tropical volcanic island silhouettes across the ocean horizon!
  buildTropicalIslandsHorizon(res, root);

  // 8. Wooden beach signboard easel composited onto ./assets/beach-board.jpg
  const easel = buildWoodenEaselBoard(
    res,
    './assets/beach-board.jpg',
    '#00bbf9',
    'tropical_beach',
  );
  easel.position.set(4.25, 0, 0.52);
  easel.rotation.y = -0.5;
  root.add(easel);

  // 9. Floating sunny sea-breeze sparkles!
  buildFloatingPetals(
    res,
    root,
    petalsOut,
    ['#fffbe0', '#a8f9ff', '#ffe066', '#ffffff'],
    32,
  );

  // 10. Animated Crashing Shoreline Wave hazard controller!
  return buildBeachWaveHazard(res, root);
}

// ============================================================================
// Stage 3 & 4 Comical 3D Intruder Rigs (暴走大玉 & 巨大ビーチボール!)
// ============================================================================

function createOodamaTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Classic Japanese Sports Day Giant Ball: top crimson red, bottom glossy white!
    ctx.fillStyle = '#e62e36';
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = '#fffdf9';
    ctx.fillRect(0, 128, 512, 128);

    // Crisp equatorial seam band + vertical inflatable vinyl panel lines
    ctx.fillStyle = 'rgba(40, 20, 20, 0.14)';
    ctx.fillRect(0, 124, 512, 8);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      const x = (i / 8) * 512;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function buildOodamaIntruder(res: StageResourceTracker, parent: THREE.Group): IntruderRig {
  const radius = 0.88;
  const root = new THREE.Group();
  root.name = 'intruder_oodama';
  root.visible = false;
  parent.add(root);

  const oodamaTex = createOodamaTexture(res);
  const oodamaMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: oodamaTex,
      roughness: 0.24,
      metalness: 0.04,
    }),
  );

  const ballGeo = res.geo(new THREE.SphereGeometry(radius, 32, 24));
  const ballMesh = new THREE.Mesh(ballGeo, oodamaMat);
  ballMesh.castShadow = true;
  ballMesh.receiveShadow = true;
  root.add(ballMesh);

  // Soft dark ground contact shadow disc right underneath the giant ball
  const shadowMat = res.mat(
    new THREE.MeshBasicMaterial({
      color: '#1b1426',
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    }),
  );
  const shadowGeo = res.geo(new THREE.CircleGeometry(radius * 0.92, 24));
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  root.add(shadow);

  const sync = (intruder: StageIntruderState, _dt: number, elapsedTime: number): void => {
    root.visible = intruder.active;
    if (!intruder.active) return;

    const centerY = Math.max(radius, intruder.position.y);
    root.position.set(intruder.position.x, centerY, intruder.position.z);

    // Physically exact horizontal rolling rotation.z as it charges across the bowling lane!
    ballMesh.rotation.z = -intruder.position.x / radius;
    ballMesh.rotation.x = Math.sin(intruder.position.x * 1.4) * 0.16;

    // Subtle rubbery inflatable bounce wobble while rolling
    const bounceSq = 1 + Math.sin(elapsedTime * 14) * 0.035;
    ballMesh.scale.set(1 / Math.sqrt(bounceSq), bounceSq, 1 / Math.sqrt(bounceSq));

    // Anchor shadow neatly to ground y = 0.02
    shadow.position.y = -centerY + 0.025;
  };

  return { root, sync };
}

function createBeachBallTexture(res: StageResourceTracker): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Classic iconic 6-panel colorful striped beach ball!
    const panelColors = ['#ff4d5a', '#ffffff', '#ffca3a', '#ffffff', '#00a8e8', '#ffffff'];
    const pw = canvas.width / panelColors.length;
    panelColors.forEach((hex, idx) => {
      ctx.fillStyle = hex;
      ctx.fillRect(idx * pw, 0, pw + 1, canvas.height);
    });

    // Crisp panel seam lines
    ctx.strokeStyle = 'rgba(20, 30, 50, 0.14)';
    ctx.lineWidth = 3;
    for (let i = 0; i < panelColors.length; i++) {
      ctx.beginPath();
      ctx.moveTo(i * pw, 0);
      ctx.lineTo(i * pw, canvas.height);
      ctx.stroke();
    }

    // Glossy white polar cap circles at top & bottom poles
    ctx.fillStyle = '#fffdf8';
    ctx.fillRect(0, 0, canvas.width, 30);
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
  }
  const tex = res.tex(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function buildBeachBallIntruder(res: StageResourceTracker, parent: THREE.Group): IntruderRig {
  const radius = 0.72;
  const root = new THREE.Group();
  root.name = 'intruder_beach_ball';
  root.visible = false;
  parent.add(root);

  const ballTex = createBeachBallTexture(res);
  const ballMat = res.mat(
    new THREE.MeshStandardMaterial({
      map: ballTex,
      roughness: 0.16,
      metalness: 0.04,
    }),
  );

  const squashPivot = new THREE.Group();
  root.add(squashPivot);

  const ballGeo = res.geo(new THREE.SphereGeometry(radius, 30, 22));
  const ballMesh = new THREE.Mesh(ballGeo, ballMat);
  ballMesh.castShadow = true;
  ballMesh.receiveShadow = true;
  squashPivot.add(ballMesh);

  // Soft ground contact shadow shrinking as the giant beach ball bounces high!
  const shadowMat = res.mat(
    new THREE.MeshBasicMaterial({
      color: '#142230',
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    }),
  );
  const shadowGeo = res.geo(new THREE.CircleGeometry(radius * 0.88, 22));
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  root.add(shadow);

  let spinX = 0;
  let spinY = 0;
  let spinZ = 0;

  const sync = (intruder: StageIntruderState, dt: number, _elapsedTime: number): void => {
    root.visible = intruder.active;
    if (!intruder.active) return;

    const safeDt = Math.min(dt, 0.1);
    const centerY = Math.max(radius, intruder.position.y);
    root.position.set(intruder.position.x, centerY, intruder.position.z);

    // Lively multi-axis beach ball spin as it bounces across the beach!
    spinZ -= (intruder.velocity.x / radius) * safeDt * 1.15;
    spinX += safeDt * 3.1;
    spinY += safeDt * 2.2;
    ballMesh.rotation.set(spinX, spinY, spinZ);

    // Cartoonish squash on sand impact & vertical stretch mid-bounce!
    const airH = Math.max(0, intruder.position.y - radius);
    const impactSquash = airH < 0.22 ? 0.82 + (airH / 0.22) * 0.18 : 1.0;
    const airStretch = Math.min(0.16, Math.abs(intruder.velocity.y) * 0.025);
    const sy = THREE.MathUtils.clamp(impactSquash + (airH >= 0.22 ? airStretch : 0), 0.78, 1.18);
    const sxz = 1 / Math.sqrt(sy);
    squashPivot.scale.set(sxz, sy, sxz);

    // Shadow anchored cleanly on the sand, shrinking softly when high in the air
    shadow.position.y = -centerY + 0.025;
    const shScale = Math.max(0.38, 1 - airH * 0.24);
    shadow.scale.set(shScale, shScale, 1);
    shadowMat.opacity = Math.max(0.12, 0.34 - airH * 0.08);
  };

  return { root, sync };
}

// ============================================================================
// Public Entry Point
// ============================================================================

export function buildStage(stage: StageSpec): BuiltStage {
  const res = new StageResourceTracker();
  const root = new THREE.Group();
  root.name = `stage_${stage.id}`;

  let zenithHex = '#4aa9f2';
  let midHex = '#a6e2ff';
  let horizonHex = '#fff0d2';
  let skyHex = '#aee4ff';

  if (stage.id === 'school_trip') {
    zenithHex = '#5ca3e8';
    midHex = '#c3e2ff';
    horizonHex = '#ffe5df';
    skyHex = '#c6e2ff';
  } else if (stage.id === 'sports_day') {
    zenithHex = '#2c8ef4';
    midHex = '#93d5ff';
    horizonHex = '#eef6ff';
    skyHex = '#7cc8ff';
  } else if (stage.id === 'tropical_beach') {
    zenithHex = '#1ca3ec';
    midHex = '#7ce0ff';
    horizonHex = '#dff8ff';
    skyHex = '#5ed5ff';
  }

  const skyColor = new THREE.Color(skyHex);
  const fogColor = new THREE.Color(horizonHex);

  // Shared sunlit sky dome, drifting clouds, lighting, and dust puff pool
  const skyDome = buildSkyDome(res, zenithHex, midHex, horizonHex);
  root.add(skyDome);

  const clouds: DriftingCloud[] = [];
  buildClouds(res, root, clouds);
  if (stage.id !== 'tropical_beach') {
    buildHorizonHillsAndTreeline(res, root, stage.id !== 'school_trip');
  }
  buildLighting(root, stage.id);

  const dust = createDustPool(res, root);
  const petals: FloatingPetal[] = [];
  const swayTargets: SwayTarget[] = [];
  const oceanUniformsList: Array<{ uTime: { value: number } }> = [];

  let hazardController: HazardController = { sync: () => {} };

  if (stage.id === 'wedding') {
    buildWeddingStage(stage, res, root, petals, swayTargets);
  } else if (stage.id === 'school_trip') {
    buildSchoolTripStage(stage, res, root, petals, swayTargets);
  } else if (stage.id === 'sports_day') {
    hazardController = buildSportsDayStage(stage, res, root, petals, swayTargets);
  } else {
    hazardController = buildTropicalBeachStage(
      stage,
      res,
      root,
      petals,
      swayTargets,
      oceanUniformsList,
    );
  }

  // Stage-specific slapstick 3D intruder rig
  const intruderRig: IntruderRig =
    stage.id === 'wedding'
      ? buildDoveIntruder(res, root)
      : stage.id === 'school_trip'
        ? buildDeerIntruder(res, root)
        : stage.id === 'sports_day'
          ? buildOodamaIntruder(res, root)
          : buildBeachBallIntruder(res, root);

  const update = (dt: number, elapsedTime: number): void => {
    const safeDt = Math.min(dt, 0.1);

    // 0. Animated tropical ocean water ripples & sun glints
    for (const u of oceanUniformsList) {
      u.uTime.value = elapsedTime;
    }

    // 1. Gently drifting clouds
    for (const c of clouds) {
      c.group.position.x += c.speed * safeDt;
      if (c.group.position.x > c.maxX) c.group.position.x = c.minX;
      c.group.position.y = c.baseY + Math.sin(elapsedTime * 0.55 + c.bobPhase) * 0.22;
    }

    // 2. Breezy swaying bunting flags / shrine paper lanterns / palm fronds
    for (const s of swayTargets) {
      const rot = s.baseRot + Math.sin(elapsedTime * s.speed + s.phase) * s.amp;
      if (s.axis === 'x') s.obj.rotation.x = rot;
      else s.obj.rotation.z = rot;
    }

    // 3. Drifting sunlit rose / sakura petals / stadium confetti / beach sparkles
    for (const p of petals) {
      p.mesh.position.y -= p.speedY * safeDt;
      p.mesh.position.x +=
        (p.driftX + Math.sin(elapsedTime * 1.6 + p.swayPhase) * p.swayAmp) * safeDt;
      p.mesh.position.z +=
        (p.driftZ + Math.cos(elapsedTime * 1.2 + p.swayPhase) * p.swayAmp * 0.45) * safeDt;

      p.mesh.rotation.x += p.spinX * safeDt;
      p.mesh.rotation.y += p.spinY * safeDt;
      p.mesh.rotation.z += p.spinZ * safeDt;

      if (p.mesh.position.y < 0.08 || p.mesh.position.x > p.maxX) {
        p.mesh.position.y = p.maxY + Math.random() * 0.8;
        p.mesh.position.x = p.minX + Math.random() * (p.maxX - p.minX) * 0.75;
        p.mesh.position.z = p.minZ + Math.random() * (p.maxZ - p.minZ);
      }
    }

    // 4. Comic dust puffs & impact stars
    for (const d of dust.particles) {
      if (!d.active) continue;
      d.age += safeDt;
      if (d.age >= d.maxAge) {
        d.active = false;
        d.mesh.visible = false;
        continue;
      }
      const progress = d.age / d.maxAge;
      d.mesh.position.addScaledVector(d.velocity, safeDt);
      d.velocity.multiplyScalar(Math.exp(-3.8 * safeDt));
      d.velocity.y -= 1.6 * safeDt;
      d.mesh.rotation.y += d.spinSpeed * safeDt;
      d.mesh.rotation.x += d.spinSpeed * 0.6 * safeDt;

      // Snappy pop-in then smooth puff fade
      const scaleCurve =
        progress < 0.22
          ? THREE.MathUtils.lerp(0.2, 1.18, progress / 0.22)
          : THREE.MathUtils.lerp(1.18, 0.05, (progress - 0.22) / 0.78);
      d.mesh.scale.setScalar(d.baseScale * scaleCurve);
      d.mat.opacity = Math.max(0, 0.92 * (1 - progress * progress));
    }
  };

  return {
    root,
    skyColor,
    fogColor,
    update,
    syncIntruder: intruderRig.sync,
    syncHazard: hazardController.sync,
    spawnDustPuff: dust.spawn,
    dispose: () => res.disposeAll(),
  };
}
