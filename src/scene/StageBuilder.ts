import * as THREE from 'three';
import { PlatformTier, StageIntruderState, StageSpec } from '../types';

export interface BuiltStage {
  root: THREE.Group;
  skyColor: THREE.Color;
  fogColor: THREE.Color;
  update(dt: number, elapsedTime: number): void;
  syncIntruder(intruder: StageIntruderState, dt: number, elapsedTime: number): void;
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
  isShrineStyle: boolean,
): void {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (!isShrineStyle) {
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
  } else {
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
  }

  ctx.restore();
}

function createBoardFallbackTexture(
  res: StageResourceTracker,
  accentHex: string,
  isShrineStyle: boolean,
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

    paintBoardCalligraphy(ctx, 512, 512, isShrineStyle);
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

function buildLighting(parent: THREE.Group, isWedding: boolean): void {
  // Bright cheerful hemisphere ambient bounce
  const hemi = new THREE.HemisphereLight(
    '#c8ecff',
    isWedding ? '#d6e8a8' : '#edd5be',
    0.96,
  );
  parent.add(hemi);

  // Warm afternoon key sun (positioned front-right-high so faces are evenly lit!)
  const sun = new THREE.DirectionalLight('#fff5de', 1.78);
  sun.position.set(6.5, 11.5, 8.2);
  sun.castShadow = true;
  const shadowSize =
    typeof window !== 'undefined' && window.innerWidth < 800 ? 1024 : 2048;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.top = 7;
  sun.shadow.camera.bottom = -7;
  sun.shadow.camera.near = 1.0;
  sun.shadow.camera.far = 30.0;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.024;
  parent.add(sun);

  // Soft pastel rim/fill light from behind-left for toy-like edge separation
  const fill = new THREE.DirectionalLight(isWedding ? '#d9f2ff' : '#ffdbe8', 0.48);
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
  isShrineStyle: boolean,
): THREE.Group {
  const easel = new THREE.Group();
  const woodMat = res.stdMat(isShrineStyle ? '#7c4d2f' : '#c8925a', 0.68);
  const darkWoodMat = res.stdMat(isShrineStyle ? '#5c361e' : '#a87442', 0.72);

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
  const frame = new THREE.Mesh(frameGeo, isShrineStyle ? darkWoodMat : res.stdMat('#fffbf5', 0.58));
  frame.castShadow = true;
  frame.receiveShadow = true;
  boardGroup.add(frame);

  // Artwork canvas with immediate warm cream fallback & async composited calligraphy upgrade
  const fallbackTex = createBoardFallbackTexture(res, accentColor, isShrineStyle);
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
        paintBoardCalligraphy(ctx, 512, 512, isShrineStyle);
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

  // Charming topper accent: symmetrical floral garland for wedding, sloped timber eave for shrine
  if (isShrineStyle) {
    const roofGeo = res.geo(new THREE.BoxGeometry(1.32, 0.07, 0.34));
    const roof = new THREE.Mesh(roofGeo, res.stdMat('#3b3e47', 0.75));
    roof.position.set(0, 0.48, 0.03);
    roof.rotation.x = 0.2;
    roof.castShadow = true;
    boardGroup.add(roof);
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
    false,
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
    true,
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
// Public Entry Point
// ============================================================================

export function buildStage(stage: StageSpec): BuiltStage {
  const res = new StageResourceTracker();
  const root = new THREE.Group();
  root.name = `stage_${stage.id}`;

  const isWedding = stage.id === 'wedding';
  const horizonHex = isWedding ? '#fff0d2' : '#ffe5df';
  const skyColor = new THREE.Color(isWedding ? '#aee4ff' : '#c6e2ff');
  const fogColor = new THREE.Color(horizonHex);

  // Shared sunlit sky dome, clouds, distant rolling hills/treeline, lighting, and dust puff pool
  const skyDome = buildSkyDome(
    res,
    isWedding ? '#4aa9f2' : '#5ca3e8',
    isWedding ? '#a6e2ff' : '#c3e2ff',
    horizonHex,
  );
  root.add(skyDome);

  const clouds: DriftingCloud[] = [];
  buildClouds(res, root, clouds);
  buildHorizonHillsAndTreeline(res, root, isWedding);
  buildLighting(root, isWedding);

  const dust = createDustPool(res, root);
  const petals: FloatingPetal[] = [];
  const swayTargets: SwayTarget[] = [];

  if (isWedding) {
    buildWeddingStage(stage, res, root, petals, swayTargets);
  } else {
    buildSchoolTripStage(stage, res, root, petals, swayTargets);
  }

  // Stage-specific slapstick 3D intruder rig (wedding -> 暴走ハト, school_trip -> 暴走奈良のシカ!)
  const intruderRig = isWedding
    ? buildDoveIntruder(res, root)
    : buildDeerIntruder(res, root);

  const update = (dt: number, elapsedTime: number): void => {
    const safeDt = Math.min(dt, 0.1);

    // 1. Gently drifting clouds
    for (const c of clouds) {
      c.group.position.x += c.speed * safeDt;
      if (c.group.position.x > c.maxX) c.group.position.x = c.minX;
      c.group.position.y = c.baseY + Math.sin(elapsedTime * 0.55 + c.bobPhase) * 0.22;
    }

    // 2. Breezy swaying bunting flags / shrine paper lanterns
    for (const s of swayTargets) {
      const rot = s.baseRot + Math.sin(elapsedTime * s.speed + s.phase) * s.amp;
      if (s.axis === 'x') s.obj.rotation.x = rot;
      else s.obj.rotation.z = rot;
    }

    // 3. Drifting sunlit rose / sakura petals
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
    spawnDustPuff: dust.spawn,
    dispose: () => res.disposeAll(),
  };
}
