import * as THREE from 'three';
import {
  ActionState,
  ExpressionId,
  NpcRuntimeState,
  NpcSpec,
  ReactionIcon,
} from '../types';
import { FaceTextureCache } from './FaceTextureGenerator';

// Shared ref-counted textures & geometries for 60 FPS performance across 14 characters
interface SharedAssets {
  refCount: number;
  shadowTexture: THREE.CanvasTexture;
  starGeometry: THREE.ExtrudeGeometry;
  reactionTextures: Map<ReactionIcon, THREE.CanvasTexture>;
}

let sharedAssets: SharedAssets | null = null;

function createShadowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.08,
      size / 2,
      size / 2,
      size * 0.48,
    );
    grad.addColorStop(0, 'rgba(30, 24, 42, 0.48)');
    grad.addColorStop(0.55, 'rgba(30, 24, 42, 0.24)');
    grad.addColorStop(1, 'rgba(30, 24, 42, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createStarGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const points = 5;
  const outerR = 0.068;
  const innerR = 0.03;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.018,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
  geo.center();
  return geo;
}

function createReactionIconTexture(icon: ReactionIcon): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2 - 4;

    // Color theme per icon for crisp readability
    let bgFill = '#ffffff';
    let borderStroke = '#ff6b6b';
    let textColor = '#e63946';

    switch (icon) {
      case '!':
        bgFill = '#fff8db';
        borderStroke = '#ff595e';
        textColor = '#e62e3d';
        break;
      case '?':
        bgFill = '#eef8ff';
        borderStroke = '#3a86ff';
        textColor = '#2563eb';
        break;
      case '★':
      case '✨':
        bgFill = '#fffbe0';
        borderStroke = '#ffb703';
        textColor = '#f59e0b';
        break;
      case '💦':
        bgFill = '#e6f7ff';
        borderStroke = '#38bdf8';
        textColor = '#0284c7';
        break;
      case '💢':
        bgFill = '#ffe8ec';
        borderStroke = '#f43f5e';
        textColor = '#e11d48';
        break;
      case '💫':
        bgFill = '#fff7cc';
        borderStroke = '#fb8500';
        textColor = '#f59e0b';
        break;
      case '💤':
        bgFill = '#ede9fe';
        borderStroke = '#7c3aed';
        textColor = '#6d28d9';
        break;
      case '✌':
        bgFill = '#ecfdf5';
        borderStroke = '#10b981';
        textColor = '#059669';
        break;
      case '❤':
        bgFill = '#fff0f5';
        borderStroke = '#ff4d8d';
        textColor = '#f43f5e';
        break;
      case '🤧':
        bgFill = '#e6f9ff';
        borderStroke = '#38bdf8';
        textColor = '#0284c7';
        break;
      case '🤪':
        bgFill = '#fff3d6';
        borderStroke = '#ff6b9d';
        textColor = '#e11d48';
        break;
    }

    // Soft drop shadow
    ctx.save();
    ctx.shadowColor = 'rgba(20, 15, 30, 0.28)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;

    // Cute speech bubble circle with little pointer tail
    ctx.fillStyle = bgFill;
    ctx.beginPath();
    ctx.arc(cx, cy, 42, 0, Math.PI * 2);
    ctx.fill();

    // Pointer triangle at bottom
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy + 35);
    ctx.lineTo(cx, cy + 54);
    ctx.lineTo(cx + 12, cy + 35);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Crisp colored outline ring
    ctx.strokeStyle = borderStroke;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.stroke();

    // Draw bold icon symbol (custom crisp vector art for 🤧 and 🤪)
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (icon === '🤧') {
      // Comic sneeze puff face: yellow round chibi face + > < eyes + burst tissue cloud!
      ctx.save();
      ctx.translate(cx, cy + 1);

      // Cute warm yellow face disc
      ctx.fillStyle = '#ffe066';
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(-4, -2, 23, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Pink flushed cheeks
      ctx.fillStyle = 'rgba(255, 92, 138, 0.65)';
      ctx.beginPath();
      ctx.ellipse(-16, 4, 5.5, 3.6, 0, 0, Math.PI * 2);
      ctx.ellipse(8, 4, 5.5, 3.6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tightly scrunched > < eyes
      ctx.strokeStyle = '#291a16';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(-16, -10);
      ctx.lineTo(-8, -5);
      ctx.lineTo(-16, 0);
      ctx.moveTo(8, -10);
      ctx.lineTo(0, -5);
      ctx.lineTo(8, 0);
      ctx.stroke();

      // Crisp white tissue + puff cloud bursting lower-right
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(-4, 7);
      ctx.quadraticCurveTo(10, 2, 22, 10);
      ctx.quadraticCurveTo(26, 20, 14, 24);
      ctx.quadraticCurveTo(2, 26, -6, 16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Little comic gust lines
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(18, -8);
      ctx.lineTo(27, -14);
      ctx.moveTo(21, 0);
      ctx.lineTo(30, -1);
      ctx.stroke();
      ctx.restore();
    } else if (icon === '🤪') {
      // Zany goofy hen_gao badge: tilted smiley with mismatched eyes & pink sideways tongue!
      ctx.save();
      ctx.translate(cx, cy + 1);
      ctx.rotate(-0.14);

      // Vibrant yellow head
      ctx.fillStyle = '#ffd93d';
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, -1, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Mismatched white eyes (left BIG, right small)
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#241816';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(-9.5, -7, 8.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(10, -5.5, 5.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Wild cross-eyed mismatched pupils
      ctx.fillStyle = '#1f1412';
      ctx.beginPath();
      ctx.arc(-6.2, -9.2, 3.8, 0, Math.PI * 2);
      ctx.arc(12.2, -3.6, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Open cheeky mouth
      ctx.fillStyle = '#9f1239';
      ctx.strokeStyle = '#241816';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(0, 5.5, 11.5, 0.05, Math.PI - 0.05);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Bright pink tongue sticking out sideways!
      ctx.fillStyle = '#ff5d9e';
      ctx.strokeStyle = '#701a3c';
      ctx.lineWidth = 2.3;
      ctx.beginPath();
      ctx.moveTo(1, 9);
      ctx.bezierCurveTo(10, 7, 18, 12, 17, 21);
      ctx.bezierCurveTo(15, 28, 5, 29, 1, 22);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    } else if (icon === '!' || icon === '?') {
      ctx.font = '900 58px "Hiragino Maru Gothic ProN", "Rounded Mplus 1c", system-ui, sans-serif';
      ctx.fillText(icon, cx, cy + 3);
    } else if (icon === '★') {
      ctx.font = '900 54px system-ui, sans-serif';
      ctx.fillText('★', cx, cy + 3);
    } else if (icon === '❤') {
      ctx.font = '900 50px system-ui, sans-serif';
      ctx.fillText('❤', cx, cy + 4);
    } else {
      ctx.font = 'bold 48px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
      ctx.fillText(icon, cx, cy + 3);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function acquireSharedAssets(): SharedAssets {
  if (!sharedAssets) {
    sharedAssets = {
      refCount: 0,
      shadowTexture: createShadowTexture(),
      starGeometry: createStarGeometry(),
      reactionTextures: new Map<ReactionIcon, THREE.CanvasTexture>(),
    };
  }
  sharedAssets.refCount += 1;
  return sharedAssets;
}

function releaseSharedAssets(): void {
  if (!sharedAssets) return;
  sharedAssets.refCount -= 1;
  if (sharedAssets.refCount <= 0) {
    sharedAssets.shadowTexture.dispose();
    sharedAssets.starGeometry.dispose();
    for (const tex of sharedAssets.reactionTextures.values()) {
      tex.dispose();
    }
    sharedAssets.reactionTextures.clear();
    sharedAssets = null;
  }
}

function getSharedReactionTexture(assets: SharedAssets, icon: ReactionIcon): THREE.CanvasTexture {
  let tex = assets.reactionTextures.get(icon);
  if (!tex) {
    tex = createReactionIconTexture(icon);
    assets.reactionTextures.set(icon, tex);
  }
  return tex;
}

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function damp(current: number, target: number, lambda: number, dt: number): number {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * Math.min(dt, 0.1)));
}

export class CharacterMesh {
  public readonly root: THREE.Group;
  public readonly id: string;

  private readonly spec: NpcSpec;
  private readonly faceCache: FaceTextureCache;
  private readonly shared: SharedAssets;

  private readonly ownedGeometries: THREE.BufferGeometry[] = [];
  private readonly ownedMaterials: THREE.Material[] = [];

  // Core hierarchy pivots
  private readonly facingGroup: THREE.Group;
  private readonly bodyPivot: THREE.Group;
  private readonly torsoGroup: THREE.Group;
  private readonly headPivot: THREE.Group;
  private readonly leftArmPivot: THREE.Group;
  private readonly rightArmPivot: THREE.Group;
  private readonly leftLegPivot: THREE.Group;
  private readonly rightLegPivot: THREE.Group;

  // Dynamic subparts
  private readonly headMesh: THREE.Mesh;
  private readonly faceMaterial: THREE.MeshStandardMaterial;
  private readonly contactShadow: THREE.Mesh;
  private readonly contactShadowMat: THREE.MeshBasicMaterial;
  private readonly reactionSprite: THREE.Sprite;
  private readonly reactionSpriteMat: THREE.SpriteMaterial;
  private readonly dizzyStarsGroup: THREE.Group;
  private readonly dizzyStars: THREE.Mesh[] = [];
  private readonly tmpHeadQuat = new THREE.Quaternion();
  private readonly leftPeaceSign: THREE.Group;
  private readonly rightPeaceSign: THREE.Group;
  private readonly hatPivot: THREE.Group;

  private sunglassesGroup: THREE.Group | null = null;
  private ponytailPivot: THREE.Group | null = null;
  private veilPivot: THREE.Group | null = null;
  private flagBannerPivot: THREE.Group | null = null;

  // Proportions & animation state
  private readonly heightScale: number;
  private readonly widthScale: number;
  private readonly headScale: number;
  private readonly headRadius: number;
  private readonly phaseOffset: number;
  private readonly holdsRightProp: boolean;
  private readonly poseVariant: number;

  private currentExpression: ExpressionId = 'neutral';
  private currentReaction: ReactionIcon = '';
  private reactionPopAge = 0;
  private isPhotoMode = false;

  // Smoothed procedural pose values
  private animBodyY = 0;
  private animFallX = 0;
  private animFallZ = 0;
  private animLArmX = 0;
  private animLArmZ = -0.16;
  private animRArmX = 0;
  private animRArmZ = 0.16;
  private animLLegX = 0;
  private animLLegZ = 0;
  private animRLegX = 0;
  private animRLegZ = 0;
  private animSunglassesRaise = 0;
  private disposed = false;

  constructor(spec: NpcSpec, faceCache: FaceTextureCache) {
    this.spec = spec;
    this.id = spec.id;
    this.faceCache = faceCache;
    this.shared = acquireSharedAssets();

    const app = spec.appearance;
    this.heightScale = app.heightScale;
    this.widthScale = app.widthScale;
    // Keep chibi heads delightfully big and readable even on shorter characters
    this.headScale = 0.86 + 0.14 * app.heightScale;
    this.headRadius = 0.255 * this.headScale;
    this.phaseOffset = hashString(spec.id) * Math.PI * 2;
    this.poseVariant = Math.floor(hashString(spec.id + '_pose') * 3);
    this.holdsRightProp = app.accessory === 'flag' || app.accessory === 'bouquet';

    this.root = new THREE.Group();
    this.root.name = `npc_${spec.id}`;

    // 1. Soft contact shadow disc on the ground
    const shadowGeo = this.trackGeo(new THREE.CircleGeometry(0.35 * this.widthScale, 20));
    this.contactShadowMat = this.trackMat(
      new THREE.MeshBasicMaterial({
        map: this.shared.shadowTexture,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
      }),
    );
    this.contactShadow = new THREE.Mesh(shadowGeo, this.contactShadowMat);
    this.contactShadow.rotation.x = -Math.PI / 2;
    this.contactShadow.position.y = 0.015;
    this.root.add(this.contactShadow);

    // 2. Facing group (rotates by state.facingYaw; 0 = +Z)
    this.facingGroup = new THREE.Group();
    this.root.add(this.facingGroup);

    // 3. Body pivot (handles squash/stretch, tiltX, tiltZ, bounce, topple)
    this.bodyPivot = new THREE.Group();
    this.facingGroup.add(this.bodyPivot);

    // Shared character palette materials
    const skinMat = this.makeToyMat(app.skinColor, 0.66);
    const hairMat = this.makeToyMat(app.hairColor, 0.6);
    const topMat = this.makeToyMat(app.outfitTopColor, 0.68);
    const bottomMat = this.makeToyMat(app.outfitBottomColor, 0.72);
    const accentMat = this.makeToyMat(app.accentColor, 0.56);
    const whiteMat = this.makeToyMat('#fffdf8', 0.64);
    const shoeColor =
      app.outfitStyle === 'wedding_dress'
        ? '#fff6f0'
        : app.outfitStyle === 'party_dress'
          ? app.accentColor
          : '#2a2422';
    const shoeMat = this.makeToyMat(shoeColor, 0.5);

    const h = this.heightScale;
    const w = this.widthScale;

    // 4. Legs + cute rounded shoes
    const usesBareLeg =
      app.outfitStyle === 'party_dress' ||
      app.outfitStyle === 'sailor' ||
      app.outfitStyle === 'wedding_dress';
    const legMat = usesBareLeg ? skinMat : bottomMat;

    this.leftLegPivot = this.buildLeg(-1, h, w, legMat, whiteMat, shoeMat, usesBareLeg);
    this.rightLegPivot = this.buildLeg(1, h, w, legMat, whiteMat, shoeMat, usesBareLeg);
    this.bodyPivot.add(this.leftLegPivot, this.rightLegPivot);

    // 5. Torso & styled outfit
    this.torsoGroup = new THREE.Group();
    this.torsoGroup.position.y = 0.36 * h;
    this.bodyPivot.add(this.torsoGroup);
    this.buildOutfit(h, w, topMat, bottomMat, accentMat, whiteMat, skinMat);

    // 6. Articulated Arms + Hands + Peace Signs + Held Props
    const leftArm = this.buildArm(-1, h, w, topMat, skinMat, whiteMat);
    const rightArm = this.buildArm(1, h, w, topMat, skinMat, whiteMat);
    this.leftArmPivot = leftArm.pivot;
    this.rightArmPivot = rightArm.pivot;
    this.leftPeaceSign = leftArm.peaceSign;
    this.rightPeaceSign = rightArm.peaceSign;
    this.bodyPivot.add(this.leftArmPivot, this.rightArmPivot);

    if (app.accessory === 'flag') {
      this.buildFlagProp(this.rightArmPivot, h, accentMat);
    } else if (app.accessory === 'bouquet') {
      this.buildBouquetProp(this.rightArmPivot, h, whiteMat, accentMat);
    }

    // 7. Articulated Head Pivot
    this.headPivot = new THREE.Group();
    this.headPivot.position.y = 0.93 * h;
    this.bodyPivot.add(this.headPivot);

    const headCenterY = this.headRadius * 0.96;
    const headGeo = this.trackGeo(new THREE.SphereGeometry(this.headRadius, 28, 22));
    const initTex = this.faceCache.getTexture('neutral', app.skinColor, app.rosyCheeks);
    this.faceMaterial = this.trackMat(
      new THREE.MeshStandardMaterial({
        map: initTex,
        roughness: 0.66,
        metalness: 0.02,
      }),
    );
    const headMesh = new THREE.Mesh(headGeo, this.faceMaterial);
    this.headMesh = headMesh;
    headMesh.position.y = headCenterY;
    // Rotate sphere by -PI/2 around Y so UV u=0.5 (center of face canvas) points straight toward +Z!
    headMesh.rotation.y = -Math.PI / 2;
    headMesh.castShadow = true;
    headMesh.receiveShadow = true;
    this.headPivot.add(headMesh);

    // Cute rounded ears
    const earGeo = this.trackGeo(new THREE.SphereGeometry(this.headRadius * 0.22, 12, 10));
    for (const side of [-1, 1]) {
      const ear = new THREE.Mesh(earGeo, skinMat);
      ear.position.set(side * this.headRadius * 0.95, headCenterY - 0.015, -0.015);
      ear.scale.set(0.65, 1.0, 0.78);
      ear.castShadow = true;
      this.headPivot.add(ear);
    }

    // Dedicated flying headwear pivot anchored at crown height on headPivot
    const hatAnchor = new THREE.Group();
    hatAnchor.position.y = headCenterY + this.headRadius * 0.82;
    this.headPivot.add(hatAnchor);
    this.hatPivot = new THREE.Group();
    hatAnchor.add(this.hatPivot);

    // Hair & Head Accessories
    this.buildHair(headCenterY, hairMat, accentMat);
    this.buildHeadAccessory(headCenterY, accentMat, whiteMat);

    // 8. Orbiting physical 3D yellow dizzy stars (visible when fallen / dizzy, kept in photo mode!)
    this.dizzyStarsGroup = new THREE.Group();
    this.dizzyStarsGroup.position.y = headCenterY + this.headRadius + 0.12;
    this.dizzyStarsGroup.visible = false;
    const starMat = this.trackMat(
      new THREE.MeshStandardMaterial({
        color: '#ffe033',
        emissive: '#ffaa00',
        emissiveIntensity: 0.42,
        roughness: 0.3,
        metalness: 0.15,
      }),
    );
    for (let i = 0; i < 3; i++) {
      const star = new THREE.Mesh(this.shared.starGeometry, starMat);
      const angle = (i / 3) * Math.PI * 2;
      const orbitR = this.headRadius * 1.15;
      star.position.set(Math.cos(angle) * orbitR, 0, Math.sin(angle) * orbitR);
      star.castShadow = false;
      this.dizzyStarsGroup.add(star);
      this.dizzyStars.push(star);
    }
    this.headPivot.add(this.dizzyStarsGroup);

    // 9. Floating comic reaction sprite above head
    this.reactionSpriteMat = this.trackMat(
      new THREE.SpriteMaterial({
        transparent: true,
        depthTest: true,
        depthWrite: false,
      }),
    );
    this.reactionSprite = new THREE.Sprite(this.reactionSpriteMat);
    this.reactionSprite.position.y = 0.93 * h + headCenterY + this.headRadius + 0.38;
    this.reactionSprite.scale.set(0.3, 0.3, 1);
    this.reactionSprite.visible = false;
    this.root.add(this.reactionSprite);
  }

  private trackGeo<T extends THREE.BufferGeometry>(geo: T): T {
    this.ownedGeometries.push(geo);
    return geo;
  }

  private trackMat<T extends THREE.Material>(mat: T): T {
    this.ownedMaterials.push(mat);
    return mat;
  }

  private makeToyMat(color: string, roughness = 0.65, metalness = 0.04): THREE.MeshStandardMaterial {
    return this.trackMat(
      new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
      }),
    );
  }

  private buildLeg(
    side: -1 | 1,
    h: number,
    w: number,
    legMat: THREE.Material,
    sockMat: THREE.Material,
    shoeMat: THREE.Material,
    addSocks: boolean,
  ): THREE.Group {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.105 * w, 0.38 * h, 0);

    const legLen = 0.28 * h;
    const legGeo = this.trackGeo(
      new THREE.CapsuleGeometry(0.062 * w, Math.max(0.06, legLen - 0.11), 6, 12),
    );
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.y = -legLen * 0.48;
    leg.castShadow = true;
    leg.receiveShadow = true;
    pivot.add(leg);

    if (addSocks) {
      const sockGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.064 * w, 0.058 * w, 0.095 * h, 12),
      );
      const sock = new THREE.Mesh(sockGeo, sockMat);
      sock.position.y = -0.25 * h;
      sock.castShadow = true;
      pivot.add(sock);
    }

    // Cute rounded toy shoe pointing toward +Z
    const shoeGeo = this.trackGeo(new THREE.SphereGeometry(0.08 * w, 14, 10));
    const shoe = new THREE.Mesh(shoeGeo, shoeMat);
    shoe.position.set(0, -0.33 * h, 0.038 * w);
    shoe.scale.set(0.95, 0.62, 1.38);
    shoe.castShadow = true;
    shoe.receiveShadow = true;
    pivot.add(shoe);

    return pivot;
  }

  private buildArm(
    side: -1 | 1,
    h: number,
    w: number,
    sleeveMat: THREE.Material,
    skinMat: THREE.Material,
    cuffMat: THREE.Material,
  ): { pivot: THREE.Group; peaceSign: THREE.Group } {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.245 * w, 0.84 * h, 0);

    // Shoulder puff
    const shoulderGeo = this.trackGeo(new THREE.SphereGeometry(0.072 * w, 12, 10));
    const shoulder = new THREE.Mesh(shoulderGeo, sleeveMat);
    shoulder.castShadow = true;
    pivot.add(shoulder);

    // Sleeve / arm tube
    const armLen = 0.30 * h;
    const armGeo = this.trackGeo(
      new THREE.CapsuleGeometry(0.052 * w, Math.max(0.08, armLen - 0.1), 6, 10),
    );
    const armMesh = new THREE.Mesh(armGeo, sleeveMat);
    armMesh.position.y = -armLen * 0.5;
    armMesh.castShadow = true;
    pivot.add(armMesh);

    // Crisp cuff ring
    const cuffGeo = this.trackGeo(new THREE.TorusGeometry(0.052 * w, 0.012 * w, 8, 12));
    const cuff = new THREE.Mesh(cuffGeo, cuffMat);
    cuff.rotation.x = Math.PI / 2;
    cuff.position.y = -armLen * 0.88;
    pivot.add(cuff);

    // Rounded toy hand
    const handGeo = this.trackGeo(new THREE.SphereGeometry(0.062 * w, 12, 10));
    const hand = new THREE.Mesh(handGeo, skinMat);
    hand.position.y = -armLen - 0.025;
    hand.castShadow = true;
    pivot.add(hand);

    // Peace-sign V fingers (hidden by default, shown on pose / jump / cheese)
    const peaceSign = new THREE.Group();
    peaceSign.position.set(0, -armLen - 0.055, 0.015);
    const fingerGeo = this.trackGeo(new THREE.CapsuleGeometry(0.017 * w, 0.055 * h, 4, 8));
    const f1 = new THREE.Mesh(fingerGeo, skinMat);
    f1.position.set(-0.022 * w, -0.032 * h, 0);
    f1.rotation.z = -0.34;
    const f2 = new THREE.Mesh(fingerGeo, skinMat);
    f2.position.set(0.022 * w, -0.032 * h, 0);
    f2.rotation.z = 0.34;
    peaceSign.add(f1, f2);
    peaceSign.visible = false;
    pivot.add(peaceSign);

    return { pivot, peaceSign };
  }

  private buildOutfit(
    h: number,
    w: number,
    topMat: THREE.Material,
    bottomMat: THREE.Material,
    accentMat: THREE.Material,
    whiteMat: THREE.Material,
    skinMat: THREE.Material,
  ): void {
    const app = this.spec.appearance;
    const style = app.outfitStyle;

    // Neck cylinder
    const neckGeo = this.trackGeo(new THREE.CylinderGeometry(0.072 * w, 0.085 * w, 0.1 * h, 12));
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.y = 0.56 * h;
    neck.castShadow = true;
    this.torsoGroup.add(neck);

    if (style === 'wedding_dress') {
      // Sculpted bodice
      const bodiceGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.155 * w, 0.185 * w, 0.27 * h, 18),
      );
      const bodice = new THREE.Mesh(bodiceGeo, topMat);
      bodice.position.y = 0.38 * h;
      bodice.castShadow = true;
      bodice.receiveShadow = true;
      this.torsoGroup.add(bodice);

      // Flared upper & lower layered wedding gown skirt
      const upperSkirtGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.18 * w, 0.34 * w, 0.34 * h, 22),
      );
      const upperSkirt = new THREE.Mesh(upperSkirtGeo, topMat);
      upperSkirt.position.y = 0.1 * h;
      upperSkirt.castShadow = true;
      upperSkirt.receiveShadow = true;
      this.torsoGroup.add(upperSkirt);

      const hemRuffleGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.32 * w, 0.39 * w, 0.18 * h, 24),
      );
      const hemRuffle = new THREE.Mesh(hemRuffleGeo, bottomMat);
      hemRuffle.position.y = -0.14 * h;
      hemRuffle.castShadow = true;
      hemRuffle.receiveShadow = true;
      this.torsoGroup.add(hemRuffle);

      // Pastel lace waist ribbon + cute back bow
      const sashGeo = this.trackGeo(new THREE.TorusGeometry(0.195 * w, 0.026 * w, 10, 22));
      const sash = new THREE.Mesh(sashGeo, accentMat);
      sash.rotation.x = Math.PI / 2;
      sash.position.y = 0.26 * h;
      this.torsoGroup.add(sash);

      const bowGeo = this.trackGeo(new THREE.SphereGeometry(0.055 * w, 10, 8));
      for (const s of [-1, 1]) {
        const loop = new THREE.Mesh(bowGeo, accentMat);
        loop.position.set(s * 0.055 * w, 0.25 * h, -0.2 * w);
        loop.scale.set(1.25, 0.75, 0.6);
        this.torsoGroup.add(loop);
      }

      // Pearl necklace beads
      const pearlGeo = this.trackGeo(new THREE.SphereGeometry(0.017 * w, 8, 8));
      const pearlMat = this.makeToyMat('#fffaf5', 0.22, 0.15);
      for (let i = 0; i < 9; i++) {
        const ang = ((i - 4) / 4) * 1.15;
        const pearl = new THREE.Mesh(pearlGeo, pearlMat);
        pearl.position.set(Math.sin(ang) * 0.115 * w, 0.515 * h, Math.cos(ang) * 0.11 * w);
        this.torsoGroup.add(pearl);
      }
    } else if (style === 'party_dress') {
      // Fitted pastel bodice
      const bodiceGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.155 * w, 0.175 * w, 0.28 * h, 18),
      );
      const bodice = new THREE.Mesh(bodiceGeo, topMat);
      bodice.position.y = 0.37 * h;
      bodice.castShadow = true;
      bodice.receiveShadow = true;
      this.torsoGroup.add(bodice);

      // Flared bouncy party skirt
      const skirtGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.175 * w, 0.31 * w, 0.32 * h, 20),
      );
      const skirt = new THREE.Mesh(skirtGeo, bottomMat);
      skirt.position.y = 0.09 * h;
      skirt.castShadow = true;
      skirt.receiveShadow = true;
      this.torsoGroup.add(skirt);

      // Waist ribbon sash
      const sashGeo = this.trackGeo(new THREE.TorusGeometry(0.18 * w, 0.024 * w, 8, 20));
      const sash = new THREE.Mesh(sashGeo, accentMat);
      sash.rotation.x = Math.PI / 2;
      sash.position.y = 0.24 * h;
      this.torsoGroup.add(sash);

      // Cute collar trim
      const collarGeo = this.trackGeo(new THREE.TorusGeometry(0.125 * w, 0.02 * w, 8, 18));
      const collar = new THREE.Mesh(collarGeo, whiteMat);
      collar.rotation.x = Math.PI / 2;
      collar.position.y = 0.505 * h;
      this.torsoGroup.add(collar);
    } else if (style === 'tuxedo' || style === 'suit' || style === 'school_blazer') {
      // Rounded tailored jacket torso
      const jacketGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.185 * w, 0.215 * w, 0.44 * h, 18),
      );
      const jacket = new THREE.Mesh(jacketGeo, topMat);
      jacket.position.y = 0.31 * h;
      jacket.castShadow = true;
      jacket.receiveShadow = true;
      this.torsoGroup.add(jacket);

      // Rounded lower hip cap
      const hipGeo = this.trackGeo(new THREE.SphereGeometry(0.21 * w, 16, 12));
      const hip = new THREE.Mesh(hipGeo, bottomMat);
      hip.position.y = 0.08 * h;
      hip.scale.set(1.0, 0.52, 0.96);
      hip.castShadow = true;
      this.torsoGroup.add(hip);

      // Crisp white shirt V-front
      const shirtShape = new THREE.Shape();
      shirtShape.moveTo(-0.085 * w, 0.21 * h);
      shirtShape.lineTo(0.085 * w, 0.21 * h);
      shirtShape.lineTo(0, -0.02 * h);
      shirtShape.closePath();
      const shirtGeo = this.trackGeo(new THREE.ShapeGeometry(shirtShape));
      const shirt = new THREE.Mesh(shirtGeo, whiteMat);
      shirt.position.set(0, 0.31 * h, 0.196 * w);
      this.torsoGroup.add(shirt);

      // Sculpted lapels
      const lapelGeo = this.trackGeo(new THREE.BoxGeometry(0.048 * w, 0.2 * h, 0.022 * w));
      const lapelMat = style === 'tuxedo' ? this.makeToyMat('#151b26', 0.35, 0.15) : topMat;
      for (const s of [-1, 1]) {
        const lapel = new THREE.Mesh(lapelGeo, lapelMat);
        lapel.position.set(s * 0.068 * w, 0.41 * h, 0.194 * w);
        lapel.rotation.z = s * -0.32;
        this.torsoGroup.add(lapel);
      }

      // Necktie (unless wearing a bow_tie accessory)
      if (app.accessory !== 'bow_tie') {
        const tieGeo = this.trackGeo(new THREE.ConeGeometry(0.036 * w, 0.19 * h, 6));
        const tie = new THREE.Mesh(tieGeo, accentMat);
        tie.position.set(0, 0.39 * h, 0.205 * w);
        tie.rotation.z = Math.PI;
        tie.scale.set(1, 1, 0.45);
        this.torsoGroup.add(tie);
      }

      // Pocket square / blazer buttons
      const buttonGeo = this.trackGeo(new THREE.SphereGeometry(0.016 * w, 8, 8));
      const buttonMat = this.makeToyMat(style === 'school_blazer' ? '#f5cb5c' : '#22242c', 0.35, 0.4);
      for (let i = 0; i < 2; i++) {
        const btn = new THREE.Mesh(buttonGeo, buttonMat);
        btn.position.set(0, (0.25 - i * 0.085) * h, 0.21 * w);
        this.torsoGroup.add(btn);
      }

      if (style === 'tuxedo') {
        // Wedding rose boutonniere on left lapel
        const flowerGeo = this.trackGeo(new THREE.DodecahedronGeometry(0.032 * w, 0));
        const flower = new THREE.Mesh(flowerGeo, accentMat);
        flower.position.set(0.095 * w, 0.42 * h, 0.202 * w);
        this.torsoGroup.add(flower);
      }
    } else if (style === 'sailor') {
      // Crisp sailor blouse
      const blouseGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.165 * w, 0.195 * w, 0.3 * h, 18),
      );
      const blouse = new THREE.Mesh(blouseGeo, whiteMat);
      blouse.position.y = 0.37 * h;
      blouse.castShadow = true;
      blouse.receiveShadow = true;
      this.torsoGroup.add(blouse);

      // Iconic navy sailor square collar over shoulders + back
      const backCollarGeo = this.trackGeo(new THREE.BoxGeometry(0.32 * w, 0.16 * h, 0.05 * w));
      const backCollar = new THREE.Mesh(backCollarGeo, topMat);
      backCollar.position.set(0, 0.45 * h, -0.155 * w);
      backCollar.rotation.x = 0.2;
      backCollar.castShadow = true;
      this.torsoGroup.add(backCollar);

      // White stripe trim on back collar
      const stripeGeo = this.trackGeo(new THREE.BoxGeometry(0.28 * w, 0.018 * h, 0.054 * w));
      const stripe = new THREE.Mesh(stripeGeo, whiteMat);
      stripe.position.set(0, 0.4 * h, -0.158 * w);
      stripe.rotation.x = 0.2;
      this.torsoGroup.add(stripe);

      // Front V sailor collar flap
      const frontCollarGeo = this.trackGeo(new THREE.ConeGeometry(0.145 * w, 0.18 * h, 4));
      const frontCollar = new THREE.Mesh(frontCollarGeo, topMat);
      frontCollar.position.set(0, 0.45 * h, 0.115 * w);
      frontCollar.rotation.z = Math.PI;
      frontCollar.rotation.y = Math.PI / 4;
      frontCollar.scale.set(1.05, 1, 0.65);
      this.torsoGroup.add(frontCollar);

      // Bright neckerchief bow in front
      const knotGeo = this.trackGeo(new THREE.SphereGeometry(0.036 * w, 10, 8));
      const knot = new THREE.Mesh(knotGeo, accentMat);
      knot.position.set(0, 0.39 * h, 0.185 * w);
      this.torsoGroup.add(knot);
      const tailGeo = this.trackGeo(new THREE.BoxGeometry(0.032 * w, 0.11 * h, 0.018 * w));
      for (const s of [-1, 1]) {
        const tail = new THREE.Mesh(tailGeo, accentMat);
        tail.position.set(s * 0.025 * w, 0.33 * h, 0.192 * w);
        tail.rotation.z = s * 0.25;
        this.torsoGroup.add(tail);
      }

      // Pleated navy sailor skirt
      const skirtGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.185 * w, 0.275 * w, 0.28 * h, 14),
      );
      const skirt = new THREE.Mesh(skirtGeo, bottomMat);
      skirt.position.y = 0.1 * h;
      skirt.castShadow = true;
      skirt.receiveShadow = true;
      this.torsoGroup.add(skirt);
    } else if (style === 'teacher_track') {
      // Sporty tracksuit jacket
      const jacketGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.195 * w, 0.215 * w, 0.46 * h, 18),
      );
      const jacket = new THREE.Mesh(jacketGeo, topMat);
      jacket.position.y = 0.31 * h;
      jacket.castShadow = true;
      jacket.receiveShadow = true;
      this.torsoGroup.add(jacket);

      // White athletic zipper stripe down the middle
      const zipGeo = this.trackGeo(new THREE.BoxGeometry(0.03 * w, 0.44 * h, 0.03 * w));
      const zip = new THREE.Mesh(zipGeo, whiteMat);
      zip.position.set(0, 0.31 * h, 0.2 * w);
      this.torsoGroup.add(zip);

      // Sporty accent double stripes on sides & chest
      const chestStripeGeo = this.trackGeo(new THREE.TorusGeometry(0.202 * w, 0.018 * w, 8, 22));
      const chestStripe = new THREE.Mesh(chestStripeGeo, accentMat);
      chestStripe.rotation.x = Math.PI / 2;
      chestStripe.position.y = 0.38 * h;
      this.torsoGroup.add(chestStripe);

      // High sporty track collar
      const collarGeo = this.trackGeo(
        new THREE.CylinderGeometry(0.125 * w, 0.145 * w, 0.08 * h, 16),
      );
      const collar = new THREE.Mesh(collarGeo, whiteMat);
      collar.position.y = 0.53 * h;
      this.torsoGroup.add(collar);

      // Coach whistle on lanyard
      const whistleMat = this.makeToyMat('#ffd166', 0.25, 0.55);
      const whistleGeo = this.trackGeo(new THREE.CylinderGeometry(0.018 * w, 0.022 * w, 0.05 * w, 10));
      const whistle = new THREE.Mesh(whistleGeo, whistleMat);
      whistle.rotation.z = Math.PI / 2;
      whistle.position.set(0.03 * w, 0.36 * h, 0.215 * w);
      this.torsoGroup.add(whistle);

      // Hip base
      const hipGeo = this.trackGeo(new THREE.SphereGeometry(0.21 * w, 14, 10));
      const hip = new THREE.Mesh(hipGeo, bottomMat);
      hip.position.y = 0.08 * h;
      hip.scale.set(1, 0.52, 0.96);
      this.torsoGroup.add(hip);
    }

    // Bow tie accessory mounted neatly on collar
    if (app.accessory === 'bow_tie') {
      const bowGroup = new THREE.Group();
      bowGroup.position.set(0, 0.49 * h, 0.195 * w);
      const wingGeo = this.trackGeo(new THREE.ConeGeometry(0.042 * w, 0.085 * w, 6));
      for (const s of [-1, 1]) {
        const wing = new THREE.Mesh(wingGeo, accentMat);
        wing.position.x = s * 0.044 * w;
        wing.rotation.z = s * (Math.PI / 2);
        wing.scale.set(1, 1, 0.45);
        bowGroup.add(wing);
      }
      const knotGeo = this.trackGeo(new THREE.SphereGeometry(0.025 * w, 8, 8));
      bowGroup.add(new THREE.Mesh(knotGeo, accentMat));
      this.torsoGroup.add(bowGroup);
    }
  }

  private buildHair(
    headCenterY: number,
    hairMat: THREE.Material,
    accentMat: THREE.Material,
  ): void {
    const r = this.headRadius;
    const style = this.spec.appearance.hairStyle;
    const hairGroup = new THREE.Group();
    hairGroup.position.y = headCenterY;
    this.headPivot.add(hairGroup);

    const addBaseCap = (phiBackCoverage = Math.PI * 1.18): void => {
      // Back & top helmet cap that leaves front face completely unobstructed
      const capGeo = this.trackGeo(
        new THREE.SphereGeometry(r * 1.075, 22, 16, 0, Math.PI * 2, 0, Math.PI * 0.56),
      );
      const cap = new THREE.Mesh(capGeo, hairMat);
      cap.rotation.x = -0.26;
      cap.castShadow = true;
      hairGroup.add(cap);

      // Rear hair dome covering back of skull (-Z)
      const backGeo = this.trackGeo(
        new THREE.SphereGeometry(
          r * 1.06,
          18,
          14,
          Math.PI * 0.5 - phiBackCoverage * 0.5,
          phiBackCoverage,
          Math.PI * 0.25,
          Math.PI * 0.58,
        ),
      );
      const back = new THREE.Mesh(backGeo, hairMat);
      // Sphere phi=PI*1.5 is -Z, so rotate Y by PI to place phi=PI*0.5 onto -Z
      back.rotation.y = Math.PI;
      back.castShadow = true;
      hairGroup.add(back);
    };

    const addBangs = (
      count: number,
      spread: number,
      tiltForward = 0.28,
      zRadius = 0.88,
      yBase = 0.64,
    ): void => {
      const tuftGeo = this.trackGeo(new THREE.SphereGeometry(r * 0.27, 10, 8));
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0 : (i / (count - 1)) * 2 - 1;
        const ang = t * spread;
        const tuft = new THREE.Mesh(tuftGeo, hairMat);
        tuft.position.set(
          Math.sin(ang) * r * 0.86,
          r * (yBase - Math.abs(t) * 0.1),
          Math.cos(ang) * r * zRadius,
        );
        tuft.scale.set(0.95, 0.62, 0.55);
        tuft.rotation.x = tiltForward;
        tuft.castShadow = true;
        hairGroup.add(tuft);
      }
    };

    switch (style) {
      case 'short': {
        addBaseCap(Math.PI * 1.15);
        addBangs(4, 0.58, 0.24, 0.78, 0.68);
        // Cute sideburns
        const sbGeo = this.trackGeo(new THREE.SphereGeometry(r * 0.22, 8, 8));
        for (const s of [-1, 1]) {
          const sb = new THREE.Mesh(sbGeo, hairMat);
          sb.position.set(s * r * 0.92, 0.04 * r, 0.22 * r);
          sb.scale.set(0.45, 1.35, 0.72);
          hairGroup.add(sb);
        }
        break;
      }

      case 'bob': {
        addBaseCap(Math.PI * 1.28);
        addBangs(5, 0.65);
        // Smooth curved cheek-framing bob sides
        const sideGeo = this.trackGeo(new THREE.CapsuleGeometry(r * 0.26, r * 0.55, 6, 10));
        for (const s of [-1, 1]) {
          const side = new THREE.Mesh(sideGeo, hairMat);
          side.position.set(s * r * 0.95, -0.18 * r, -0.05 * r);
          side.rotation.z = s * -0.12;
          side.scale.set(0.75, 1.0, 1.15);
          side.castShadow = true;
          hairGroup.add(side);
        }
        break;
      }

      case 'bun': {
        addBaseCap(Math.PI * 1.18);
        addBangs(4, 0.58);
        // Big elegant high chignon bun
        const bunGeo = this.trackGeo(new THREE.SphereGeometry(r * 0.46, 16, 12));
        const bun = new THREE.Mesh(bunGeo, hairMat);
        bun.position.set(0, r * 1.12, -r * 0.34);
        bun.castShadow = true;
        hairGroup.add(bun);

        // Decorative hair tie ring
        const tieGeo = this.trackGeo(new THREE.TorusGeometry(r * 0.34, r * 0.075, 8, 16));
        const tie = new THREE.Mesh(tieGeo, accentMat);
        tie.position.set(0, r * 0.94, -r * 0.28);
        tie.rotation.x = Math.PI / 2 - 0.3;
        hairGroup.add(tie);
        break;
      }

      case 'spiky': {
        addBaseCap(Math.PI * 1.12);
        // Dynamic radiating anime hair spikes (lifted slightly above forehead if wearing a headband)
        const hbLift = this.spec.appearance.accessory === 'headband' ? r * 0.09 : 0;
        const spikeGeo = this.trackGeo(new THREE.ConeGeometry(r * 0.27, r * 0.82, 7));
        const spikeConfigs: Array<[number, number, number, number, number]> = [
          [0, r * 1.2 + hbLift, r * 0.14, 0.3, 0],
          [-r * 0.42, r * 1.1 + hbLift, r * 0.16, 0.28, 0.5],
          [r * 0.42, r * 1.1 + hbLift, r * 0.16, 0.28, -0.5],
          [-r * 0.72, r * 0.86 + hbLift * 0.6, -r * 0.12, -0.15, 0.85],
          [r * 0.72, r * 0.86 + hbLift * 0.6, -r * 0.12, -0.15, -0.85],
          [0, r * 1.05, -r * 0.45, -0.55, 0],
          [-r * 0.35, r * 0.92, -r * 0.55, -0.62, 0.42],
          [r * 0.35, r * 0.92, -r * 0.55, -0.62, -0.42],
        ];
        for (const [x, y, z, rx, rz] of spikeConfigs) {
          const spike = new THREE.Mesh(spikeGeo, hairMat);
          spike.position.set(x, y, z);
          spike.rotation.set(rx, 0, rz);
          spike.castShadow = true;
          hairGroup.add(spike);
        }
        break;
      }

      case 'long': {
        addBaseCap(Math.PI * 1.25);
        addBangs(5, 0.62);
        // Flowing layered back hair curtain (behind head & shoulders)
        const curtainGeo = this.trackGeo(
          new THREE.CylinderGeometry(r * 0.96, r * 1.12, r * 1.95, 16, 1, false, Math.PI * 0.58, Math.PI * 0.84),
        );
        const curtain = new THREE.Mesh(curtainGeo, hairMat);
        curtain.position.set(0, -r * 0.82, -r * 0.08);
        curtain.castShadow = true;
        hairGroup.add(curtain);

        // Soft front-framing side locks (behind cheek line so face stays crystal clear)
        const lockGeo = this.trackGeo(new THREE.CapsuleGeometry(r * 0.18, r * 0.95, 6, 10));
        for (const s of [-1, 1]) {
          const lock = new THREE.Mesh(lockGeo, hairMat);
          lock.position.set(s * r * 0.96, -r * 0.48, -r * 0.08);
          lock.castShadow = true;
          hairGroup.add(lock);
        }
        break;
      }

      case 'curly': {
        addBaseCap(Math.PI * 1.2);
        // Adorable bouncy ring of curly puffs (keep front-side puffs raised slightly for glasses clearance)
        const hasGlasses = this.spec.appearance.accessory === 'glasses';
        const puffGeo = this.trackGeo(new THREE.SphereGeometry(r * 0.34, 12, 10));
        const puffCoords: Array<[number, number, number]> = [
          [0, 1.04, 0.24],
          [-0.45, hasGlasses ? 1.0 : 0.95, 0.32],
          [0.45, hasGlasses ? 1.0 : 0.95, 0.32],
          [-0.86, hasGlasses ? 0.78 : 0.65, hasGlasses ? 0.1 : 0.18],
          [0.86, hasGlasses ? 0.78 : 0.65, hasGlasses ? 0.1 : 0.18],
          [-0.98, hasGlasses ? 0.36 : 0.25, hasGlasses ? -0.12 : -0.05],
          [0.98, hasGlasses ? 0.36 : 0.25, hasGlasses ? -0.12 : -0.05],
          [-0.86, -0.18, -0.25],
          [0.86, -0.18, -0.25],
          [-0.45, 0.82, -0.58],
          [0.45, 0.82, -0.58],
          [0, 0.55, -0.92],
          [0, 0.0, -0.95],
        ];
        for (const [px, py, pz] of puffCoords) {
          const puff = new THREE.Mesh(puffGeo, hairMat);
          puff.position.set(px * r, py * r, pz * r);
          puff.castShadow = true;
          hairGroup.add(puff);
        }
        break;
      }

      case 'ponytail': {
        addBaseCap(Math.PI * 1.18);
        addBangs(4, 0.62);

        // Animated bouncy ponytail pivot on back-top of head
        const ponyPivot = new THREE.Group();
        ponyPivot.position.set(0, r * 0.65, -r * 0.92);
        hairGroup.add(ponyPivot);
        this.ponytailPivot = ponyPivot;

        const tieGeo = this.trackGeo(new THREE.TorusGeometry(r * 0.22, r * 0.07, 8, 14));
        const tie = new THREE.Mesh(tieGeo, accentMat);
        tie.rotation.y = Math.PI / 2;
        ponyPivot.add(tie);

        const tailGeo = this.trackGeo(new THREE.CapsuleGeometry(r * 0.26, r * 0.78, 8, 12));
        const tail = new THREE.Mesh(tailGeo, hairMat);
        tail.position.set(0, -r * 0.38, -r * 0.28);
        tail.rotation.x = 0.45;
        tail.castShadow = true;
        ponyPivot.add(tail);
        break;
      }

      case 'bald_sides': {
        // Charming grandpa fluffy tufts on sides & back, leaving shiny crown open!
        const tuftGeo = this.trackGeo(new THREE.SphereGeometry(r * 0.28, 12, 10));
        const sideAngles = [-2.55, -2.15, -1.75, 1.75, 2.15, 2.55, Math.PI];
        for (const ang of sideAngles) {
          const tuft = new THREE.Mesh(tuftGeo, hairMat);
          tuft.position.set(Math.sin(ang) * r * 0.96, r * 0.14, Math.cos(ang) * r * 0.96);
          tuft.scale.set(0.82, 0.92, 0.82);
          tuft.castShadow = true;
          hairGroup.add(tuft);
        }
        break;
      }
    }
  }

  private buildHeadAccessory(
    headCenterY: number,
    accentMat: THREE.Material,
    whiteMat: THREE.Material,
  ): void {
    const acc = this.spec.appearance.accessory;
    const r = this.headRadius;
    const accGroup = new THREE.Group();
    accGroup.position.y = headCenterY;
    this.headPivot.add(accGroup);

    // Wearable headwear mounts inside hatPivot (offset back to headCenterY so resting pose is exact
    // while midair tumble spins cleanly around the hat crown!)
    const hatContent = new THREE.Group();
    hatContent.position.y = -r * 0.82;
    this.hatPivot.add(hatContent);

    switch (acc) {
      case 'veil': {
        // Delicate bridal tiara/comb + translucent gauzy trailing veil
        const tiaraMat = this.makeToyMat('#ffe8a3', 0.24, 0.55);
        const tiaraGeo = this.trackGeo(new THREE.TorusGeometry(r * 0.55, r * 0.045, 8, 18, Math.PI));
        const tiara = new THREE.Mesh(tiaraGeo, tiaraMat);
        tiara.position.set(0, r * 0.92, r * 0.16);
        tiara.rotation.x = -0.35;
        hatContent.add(tiara);

        // Sparkling pearl center gem
        const gemGeo = this.trackGeo(new THREE.OctahedronGeometry(r * 0.095, 0));
        const gem = new THREE.Mesh(gemGeo, whiteMat);
        gem.position.set(0, r * 1.24, r * 0.35);
        hatContent.add(gem);

        const veilPivot = new THREE.Group();
        veilPivot.position.set(0, r * 0.88, -r * 0.36);
        hatContent.add(veilPivot);
        this.veilPivot = veilPivot;

        const veilMat = this.trackMat(
          new THREE.MeshStandardMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.54,
            roughness: 0.5,
            side: THREE.DoubleSide,
            depthWrite: false,
          }),
        );
        const veilGeo = this.trackGeo(
          new THREE.CylinderGeometry(r * 0.42, r * 1.45, r * 2.55, 18, 1, true, Math.PI * 0.42, Math.PI * 1.16),
        );
        const veil = new THREE.Mesh(veilGeo, veilMat);
        veil.position.set(0, -r * 1.15, -r * 0.25);
        veil.rotation.x = 0.22;
        veilPivot.add(veil);
        break;
      }

      case 'top_hat': {
        const hatMat = this.makeToyMat('#252730', 0.45, 0.08);
        const hatGroup = new THREE.Group();
        hatGroup.position.set(0, r * 0.96, -r * 0.02);
        hatGroup.rotation.x = -0.08;
        hatContent.add(hatGroup);

        const brimGeo = this.trackGeo(new THREE.CylinderGeometry(r * 1.15, r * 1.15, 0.025, 22));
        const brim = new THREE.Mesh(brimGeo, hatMat);
        brim.castShadow = true;
        hatGroup.add(brim);

        const crownGeo = this.trackGeo(new THREE.CylinderGeometry(r * 0.78, r * 0.68, r * 0.92, 20));
        const crown = new THREE.Mesh(crownGeo, hatMat);
        crown.position.y = r * 0.46;
        crown.castShadow = true;
        hatGroup.add(crown);

        const bandGeo = this.trackGeo(new THREE.CylinderGeometry(r * 0.73, r * 0.71, r * 0.16, 20));
        const band = new THREE.Mesh(bandGeo, accentMat);
        band.position.y = r * 0.12;
        hatGroup.add(band);
        break;
      }

      case 'sunglasses': {
        const sgGroup = new THREE.Group();
        sgGroup.position.set(0, -r * 0.04, r * 0.98);
        accGroup.add(sgGroup);
        this.sunglassesGroup = sgGroup;

        const frameMat = this.makeToyMat('#1d1f2a', 0.26, 0.32);
        const lensMat = this.trackMat(
          new THREE.MeshStandardMaterial({
            color: '#3a4268',
            roughness: 0.16,
            metalness: 0.22,
            transparent: true,
            opacity: 0.38, // Light tinted shades so eye expressions remain readable
          }),
        );
        const lensGeo = this.trackGeo(new THREE.CylinderGeometry(r * 0.26, r * 0.26, 0.016, 16));
        const rimGeo = this.trackGeo(new THREE.TorusGeometry(r * 0.265, 0.015, 8, 16));
        for (const s of [-1, 1]) {
          const lens = new THREE.Mesh(lensGeo, lensMat);
          lens.rotation.x = Math.PI / 2;
          lens.position.set(s * r * 0.31, 0, 0);
          lens.scale.set(1.12, 1, 0.85);
          sgGroup.add(lens);

          const rim = new THREE.Mesh(rimGeo, frameMat);
          rim.position.set(s * r * 0.31, 0, 0.005);
          rim.scale.set(1.12, 0.85, 1);
          sgGroup.add(rim);
        }
        // Nose bridge
        const bridgeGeo = this.trackGeo(new THREE.BoxGeometry(r * 0.2, 0.018, 0.016));
        sgGroup.add(new THREE.Mesh(bridgeGeo, frameMat));
        break;
      }

      case 'glasses': {
        const gGroup = new THREE.Group();
        gGroup.position.set(0, -r * 0.04, r * 0.98);
        accGroup.add(gGroup);

        const frameMat = this.makeToyMat('#3a2f2a', 0.35, 0.45);
        const glassMat = this.trackMat(
          new THREE.MeshStandardMaterial({
            color: '#eef8ff',
            roughness: 0.1,
            metalness: 0.1,
            transparent: true,
            opacity: 0.22,
          }),
        );
        const rimGeo = this.trackGeo(new THREE.TorusGeometry(r * 0.23, 0.011, 8, 18));
        const paneGeo = this.trackGeo(new THREE.CircleGeometry(r * 0.22, 16));
        for (const s of [-1, 1]) {
          const rim = new THREE.Mesh(rimGeo, frameMat);
          rim.position.set(s * r * 0.29, 0, 0);
          gGroup.add(rim);

          const pane = new THREE.Mesh(paneGeo, glassMat);
          pane.position.set(s * r * 0.29, 0, -0.002);
          gGroup.add(pane);
        }
        const bridgeGeo = this.trackGeo(new THREE.BoxGeometry(r * 0.16, 0.012, 0.012));
        gGroup.add(new THREE.Mesh(bridgeGeo, frameMat));
        break;
      }

      case 'beret': {
        const beretMat = this.makeToyMat(
          this.spec.appearance.accentColor === '#ffffff' ? '#f47292' : this.spec.appearance.accentColor,
          0.7,
        );
        const beretGroup = new THREE.Group();
        beretGroup.position.set(r * 0.16, r * 0.96, -r * 0.05);
        beretGroup.rotation.z = -0.28;
        beretGroup.rotation.x = -0.14;
        hatContent.add(beretGroup);

        const puffGeo = this.trackGeo(new THREE.SphereGeometry(r * 0.88, 18, 12));
        const puff = new THREE.Mesh(puffGeo, beretMat);
        puff.scale.set(1.12, 0.38, 1.08);
        puff.castShadow = true;
        beretGroup.add(puff);

        const stemGeo = this.trackGeo(new THREE.CylinderGeometry(0.014, 0.018, 0.06, 8));
        const stem = new THREE.Mesh(stemGeo, beretMat);
        stem.position.y = r * 0.36;
        beretGroup.add(stem);
        break;
      }

      case 'headband': {
        // Sporty hachimaki / fashion headband seated cleanly below spiky hair cones without clipping
        const isSpiky = this.spec.appearance.hairStyle === 'spiky';
        const bandRadius = isSpiky ? r * 1.02 : r * 0.96;
        const bandTube = isSpiky ? r * 0.082 : r * 0.092;
        const bandGeo = this.trackGeo(new THREE.TorusGeometry(bandRadius, bandTube, 10, 24));
        const band = new THREE.Mesh(bandGeo, accentMat);
        band.position.set(0, isSpiky ? r * 0.44 : r * 0.56, 0);
        band.rotation.x = Math.PI / 2 - (isSpiky ? 0.14 : 0.22);
        band.castShadow = true;
        accGroup.add(band);

        // Cute knot tails fluttering behind
        const tailGeo = this.trackGeo(new THREE.BoxGeometry(0.04, 0.16, 0.015));
        for (const s of [-1, 1]) {
          const tail = new THREE.Mesh(tailGeo, accentMat);
          tail.position.set(s * 0.04, isSpiky ? r * 0.26 : r * 0.32, -r * 1.07);
          tail.rotation.z = s * 0.38;
          tail.rotation.x = 0.25;
          accGroup.add(tail);
        }
        break;
      }

      case 'flower_crown': {
        const crownGroup = new THREE.Group();
        crownGroup.position.set(0, r * 0.82, 0);
        crownGroup.rotation.x = -0.18;
        hatContent.add(crownGroup);

        const vineMat = this.makeToyMat('#58b368', 0.65);
        const vineGeo = this.trackGeo(new THREE.TorusGeometry(r * 0.82, 0.02, 8, 22));
        const vine = new THREE.Mesh(vineGeo, vineMat);
        vine.rotation.x = Math.PI / 2;
        crownGroup.add(vine);

        const flowerPalette = ['#ff85a2', '#ffd166', '#fff5f7', '#c7a2ff', '#ffad85'];
        const blossomGeo = this.trackGeo(new THREE.DodecahedronGeometry(r * 0.17, 0));
        const centerGeo = this.trackGeo(new THREE.SphereGeometry(r * 0.075, 8, 8));
        const centerMat = this.makeToyMat('#ffe066', 0.5);

        for (let i = 0; i < 8; i++) {
          const ang = (i / 8) * Math.PI * 2;
          const fMat = this.makeToyMat(flowerPalette[i % flowerPalette.length], 0.55);
          const f = new THREE.Mesh(blossomGeo, fMat);
          f.position.set(Math.sin(ang) * r * 0.85, 0.02, Math.cos(ang) * r * 0.85);
          f.scale.set(1, 0.68, 1);
          crownGroup.add(f);

          const c = new THREE.Mesh(centerGeo, centerMat);
          c.position.set(Math.sin(ang) * r * 0.85, 0.04, Math.cos(ang) * r * 0.85);
          crownGroup.add(c);
        }
        break;
      }

      case 'cap': {
        const capGroup = new THREE.Group();
        capGroup.position.set(0, r * 0.42, -r * 0.04);
        // Tilted playfully back slightly so the visor NEVER hides the eyes!
        capGroup.rotation.x = -0.32;
        hatContent.add(capGroup);

        const domeGeo = this.trackGeo(
          new THREE.SphereGeometry(r * 1.07, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.48),
        );
        const dome = new THREE.Mesh(domeGeo, accentMat);
        dome.castShadow = true;
        capGroup.add(dome);

        // Contrasting visor brim
        const brimGeo = this.trackGeo(
          new THREE.CylinderGeometry(r * 0.82, r * 0.88, 0.022, 16, 1, false, -Math.PI * 0.36, Math.PI * 0.72),
        );
        const brim = new THREE.Mesh(brimGeo, whiteMat);
        brim.position.set(0, 0.01, r * 0.58);
        brim.scale.set(1.05, 1, 1.0);
        brim.castShadow = true;
        capGroup.add(brim);

        // Top cap button
        const btnGeo = this.trackGeo(new THREE.SphereGeometry(0.026, 8, 8));
        const btn = new THREE.Mesh(btnGeo, whiteMat);
        btn.position.y = r * 1.08;
        capGroup.add(btn);
        break;
      }

      default:
        break;
    }
  }

  private buildFlagProp(
    armPivot: THREE.Group,
    h: number,
    accentMat: THREE.Material,
  ): void {
    const flagGroup = new THREE.Group();
    flagGroup.position.set(0.02, -0.31 * h, 0.04);
    // Positive X-rotation counters the arm's forward lift (rx ~ -0.95..-1.45),
    // pointing the wooden pole cleanly UPWARD and slightly forward/outward above the shoulder!
    flagGroup.rotation.set(1.05, 0, -0.18);
    armPivot.add(flagGroup);

    // Slender wooden tour-guide flagpole extending upward from the hand grip
    const poleMat = this.makeToyMat('#d6a86e', 0.55);
    const poleGeo = this.trackGeo(new THREE.CylinderGeometry(0.014, 0.016, 0.82, 8));
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 0.35;
    pole.castShadow = true;
    flagGroup.add(pole);

    // Golden finial tip at the top of the pole
    const tipGeo = this.trackGeo(new THREE.SphereGeometry(0.03, 10, 8));
    const tip = new THREE.Mesh(tipGeo, this.makeToyMat('#ffd166', 0.3, 0.4));
    tip.position.y = 0.77;
    flagGroup.add(tip);

    // Triangular pennant banner waving outward to the right (+X) above shoulder
    const bannerPivot = new THREE.Group();
    bannerPivot.position.set(0, 0.64, 0);
    flagGroup.add(bannerPivot);
    this.flagBannerPivot = bannerPivot;

    const shape = new THREE.Shape();
    shape.moveTo(0, 0.11);
    shape.lineTo(0.38, 0);
    shape.lineTo(0, -0.11);
    shape.closePath();
    const bannerGeo = this.trackGeo(new THREE.ShapeGeometry(shape));
    const bannerMat = this.trackMat(
      new THREE.MeshStandardMaterial({
        color: this.spec.appearance.accentColor,
        roughness: 0.55,
        side: THREE.DoubleSide,
      }),
    );
    const banner = new THREE.Mesh(bannerGeo, bannerMat);
    banner.castShadow = true;
    bannerPivot.add(banner);
    void accentMat;
  }

  private buildBouquetProp(
    armPivot: THREE.Group,
    h: number,
    whiteMat: THREE.Material,
    accentMat: THREE.Material,
  ): void {
    const bGroup = new THREE.Group();
    bGroup.position.set(-0.02, -0.3 * h, 0.08);
    bGroup.rotation.x = -0.75;
    armPivot.add(bGroup);

    // Crisp white paper cone wrap
    const coneGeo = this.trackGeo(new THREE.ConeGeometry(0.11, 0.24, 12));
    const cone = new THREE.Mesh(coneGeo, whiteMat);
    cone.rotation.x = Math.PI;
    cone.position.y = 0.04;
    cone.castShadow = true;
    bGroup.add(cone);

    // Ribbon tie
    const ribbonGeo = this.trackGeo(new THREE.TorusGeometry(0.052, 0.014, 8, 12));
    const ribbon = new THREE.Mesh(ribbonGeo, accentMat);
    ribbon.rotation.x = Math.PI / 2;
    ribbon.position.y = -0.01;
    bGroup.add(ribbon);

    // Cluster of pastel blossoms + green leaves
    const leafMat = this.makeToyMat('#65b874', 0.6);
    const leafGeo = this.trackGeo(new THREE.SphereGeometry(0.055, 8, 8));
    const roseGeo = this.trackGeo(new THREE.DodecahedronGeometry(0.052, 0));
    const colors = ['#ff8fab', '#ffe5ec', '#ffd6a5', '#d8b4fe', '#ffb3c6'];

    for (let i = 0; i < 5; i++) {
      const ang = (i / 5) * Math.PI * 2;
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(Math.cos(ang) * 0.095, 0.14, Math.sin(ang) * 0.095);
      leaf.scale.set(1, 0.5, 1);
      bGroup.add(leaf);

      const rose = new THREE.Mesh(roseGeo, this.makeToyMat(colors[i], 0.55));
      rose.position.set(Math.cos(ang) * 0.065, 0.175 + (i % 2) * 0.02, Math.sin(ang) * 0.065);
      rose.castShadow = true;
      bGroup.add(rose);
    }
    const centerRose = new THREE.Mesh(roseGeo, this.makeToyMat('#fff0f5', 0.55));
    centerRose.position.set(0, 0.2, 0);
    bGroup.add(centerRose);
  }

  public setPhotoCaptureMode(isPhoto: boolean): void {
    this.isPhotoMode = isPhoto;
    this.updateReactionVisibility();
  }

  private updateReactionVisibility(): void {
    // Always hide ALL 2D reaction bubbles in photo capture mode (physical 3D dizzy stars stay visible)
    if (!this.currentReaction || this.isPhotoMode) {
      this.reactionSprite.visible = false;
      return;
    }
    this.reactionSprite.visible = true;
  }

  public syncFromState(state: NpcRuntimeState, dt: number, elapsedTime: number): void {
    if (this.disposed) return;

    const t = elapsedTime + this.phaseOffset;

    // 1. World position & body facing yaw (0 = +Z)
    this.root.position.copy(state.position);
    this.facingGroup.rotation.y = state.facingYaw;

    // 2. Contact shadow anchored to actual ground/platform surface beneath character
    const airHeight = Math.max(0, state.position.y - state.groundY);
    this.contactShadow.position.y = state.groundY - state.position.y + 0.015;
    const shadowScale = Math.max(0.45, 1 - airHeight * 0.26);
    this.contactShadow.scale.set(shadowScale, shadowScale, 1);
    this.contactShadowMat.opacity = Math.max(0.18, 0.72 - airHeight * 0.28);

    // 3. Facial expression texture swap (cached, zero allocations)
    if (state.expression !== this.currentExpression) {
      this.currentExpression = state.expression;
      this.faceMaterial.map = this.faceCache.getTexture(
        state.expression,
        this.spec.appearance.skinColor,
        this.spec.appearance.rosyCheeks,
      );
      this.faceMaterial.needsUpdate = true;
    }

    // 4. Procedural targets for all 15 ActionStates
    // Note on XYZ Euler kinematics for limbs starting along (0, -L, 0):
    //   x' = +L * cos(rx) * sin(rz),  z' = -L * sin(rx)
    // So when |rx| < PI/2 (cos > 0, hanging/forward): left(-X) outward => rz < 0, right(+X) outward => rz > 0.
    // When |rx| > PI/2 (cos < 0, raised overhead):   left(-X) outward => rz > 0, right(+X) outward => rz < 0.
    let targetBodyY = 0;
    let targetFallX = 0;
    let targetFallZ = 0;
    let targetLArmX = 0.04 * Math.sin(t * 2.2);
    let targetLArmZ = -0.16;
    let targetRArmX = -0.04 * Math.sin(t * 2.2);
    let targetRArmZ = 0.16;
    let targetLLegX = 0;
    let targetLLegZ = 0;
    let targetRLegX = 0;
    let targetRLegZ = 0;
    let showLeftPeace = false;
    let showRightPeace = false;

    const action: ActionState = state.action;

    switch (action) {
      case 'idle': {
        targetBodyY = Math.sin(t * 2.5) * 0.012;
        if (this.holdsRightProp) {
          targetRArmX =
            (this.spec.appearance.accessory === 'flag' ? -0.96 : -0.78) +
            Math.sin(t * 2.4) * 0.08;
          targetRArmZ = 0.24;
        }
        break;
      }

      case 'moving': {
        const w = state.walkPhase;
        const swing = Math.sin(w);
        targetBodyY = Math.abs(Math.sin(w)) * 0.045;
        targetLArmX = swing * 0.72;
        targetRArmX = this.holdsRightProp ? -0.95 + swing * 0.22 : -swing * 0.72;
        targetLArmZ = -0.22;
        targetRArmZ = 0.22;
        targetLLegX = -swing * 0.68;
        targetRLegX = swing * 0.68;
        break;
      }

      case 'shoving': {
        const push = Math.sin(t * 16) * 0.22;
        targetBodyY = -0.04;
        targetLArmX = -1.55 + push;
        targetRArmX = -1.55 - push;
        targetLArmZ = -0.14;
        targetRArmZ = 0.14;
        targetLLegX = 0.35;
        targetRLegX = -0.35;
        break;
      }

      case 'hiding': {
        targetBodyY = -0.16 * this.heightScale;
        targetLArmX = -1.05;
        targetRArmX = -1.05;
        targetLArmZ = 0.26;
        targetRArmZ = -0.26;
        targetLLegX = -0.25;
        targetRLegX = -0.25;
        targetLLegZ = -0.1;
        targetRLegZ = 0.1;
        break;
      }

      case 'peeking': {
        targetBodyY = 0.04 + Math.abs(Math.sin(t * 5.2)) * 0.03;
        targetLArmX = -0.35;
        targetLArmZ = -0.38;
        targetRArmX = -2.45 + Math.sin(t * 9.5) * 0.28;
        targetRArmZ = -0.58;
        showRightPeace = !this.holdsRightProp;
        break;
      }

      case 'tiptoe': {
        targetBodyY = 0.095 + Math.sin(t * 8.5) * 0.025;
        targetLArmX = -2.75 + Math.sin(t * 10) * 0.22;
        targetRArmX = -2.75 - Math.sin(t * 10) * 0.22;
        targetLArmZ = 0.55;
        targetRArmZ = -0.55;
        targetLLegX = 0.14;
        targetRLegX = 0.14;
        showLeftPeace = true;
        showRightPeace = !this.holdsRightProp;
        break;
      }

      case 'jump_charge': {
        const tremble = Math.sin(t * 32) * 0.015;
        targetBodyY = -0.18 * this.heightScale + tremble;
        targetLArmX = 0.85;
        targetRArmX = 0.85;
        targetLArmZ = -0.36;
        targetRArmZ = 0.36;
        targetLLegX = -0.32;
        targetRLegX = -0.32;
        break;
      }

      case 'jumping': {
        targetBodyY = 0.04;
        // Glorious wide V-arm leap!
        targetLArmX = -2.78;
        targetRArmX = -2.78;
        targetLArmZ = 0.62;
        targetRArmZ = -0.62;
        // Cheerful tucked midair legs
        targetLLegX = 0.52;
        targetRLegX = -0.45;
        targetLLegZ = -0.18;
        targetRLegZ = 0.18;
        showLeftPeace = true;
        showRightPeace = !this.holdsRightProp;
        break;
      }

      case 'posing': {
        const p = Math.max(0.5, state.poseIntensity);
        targetBodyY = Math.sin(t * 5.2) * 0.026;
        if (this.poseVariant === 0 || this.holdsRightProp) {
          // Dramatic bakage lean-back + high victory / flag raise + cheek peace sign!
          targetFallX = -0.26 * p;
          targetFallZ = Math.sin(t * 4.2) * 0.08;
          if (this.spec.appearance.accessory === 'flag') {
            targetRArmX = -1.32 - 0.18 * p + Math.sin(t * 5.5) * 0.1;
            targetRArmZ = 0.3;
          } else {
            targetRArmX = -2.62 * p;
            targetRArmZ = -0.52;
          }
          targetLArmX = -1.95 * p;
          targetLArmZ = 0.38;
          targetLLegX = -0.18;
          targetRLegX = 0.22;
          targetLLegZ = -0.1;
          targetRLegZ = 0.1;
          showLeftPeace = true;
          showRightPeace = !this.holdsRightProp;
        } else if (this.poseVariant === 1) {
          // Lopsided wobbly flamingo pose on one leg + double wild peace signs!
          targetBodyY = 0.045 + Math.sin(t * 7.5) * 0.02;
          targetFallZ = 0.15 + Math.sin(t * 7.5) * 0.14;
          targetFallX = -0.12 * p;
          targetLArmX = -2.28 * p + Math.sin(t * 8) * 0.14;
          targetRArmX = -2.28 * p - Math.sin(t * 8) * 0.14;
          targetLArmZ = 0.62;
          targetRArmZ = -0.62;
          // Flamingo leg kicked up & bent jauntily!
          targetLLegX = 0.06;
          targetLLegZ = -0.06;
          targetRLegX = -1.16 + Math.sin(t * 6.5) * 0.12;
          targetRLegZ = 0.36;
          showLeftPeace = true;
          showRightPeace = true;
        } else {
          // Exaggerated dramatic side-lean hip-pop + wild high peace wave!
          targetFallX = -0.2 * p;
          targetFallZ = -0.22 * p + Math.sin(t * 5.5) * 0.07;
          targetLArmX = -0.45;
          targetLArmZ = -0.62;
          targetRArmX = -2.68 * p;
          targetRArmZ = -0.54 + Math.sin(t * 8.5) * 0.18;
          targetLLegX = -0.24;
          targetLLegZ = -0.18;
          targetRLegZ = 0.12;
          showRightPeace = true;
        }
        break;
      }

      case 'staggering': {
        // Wild comical windmilling arms flung wide to the sides!
        const flail = Math.sin(t * 20);
        targetBodyY = 0.02;
        targetLArmX = -0.42 + flail * 0.55;
        targetRArmX = -0.42 - flail * 0.55;
        targetLArmZ = -1.15 - flail * 0.35;
        targetRArmZ = 1.15 + flail * 0.35;
        targetLLegX = flail * 0.55;
        targetRLegX = -flail * 0.55;
        break;
      }

      case 'fallen': {
        // Check if simulation already applies large fall tilt to avoid double-rotating into floor
        const simTilt = Math.hypot(state.tiltX, state.tiltZ);
        targetBodyY = 0.2 * this.heightScale;
        if (simTilt < 0.85) {
          targetFallX = -1.42;
          targetFallZ = Math.sin(this.phaseOffset) * 0.25;
        }
        // Splayed arms & comical kicking legs!
        const kick = Math.sin(t * 14);
        targetLArmX = -0.45;
        targetRArmX = -0.45;
        targetLArmZ = -1.15 - kick * 0.15;
        targetRArmZ = 1.15 + kick * 0.15;
        targetLLegX = -0.55 + kick * 0.38;
        targetRLegX = -0.55 - kick * 0.38;
        targetLLegZ = -0.22;
        targetRLegZ = 0.22;
        break;
      }

      case 'getting_up': {
        const pushPhase = Math.sin(t * 9) * 0.12;
        targetBodyY = -0.08 * this.heightScale;
        targetFallX = 0.35;
        targetLArmX = -1.1 + pushPhase;
        targetRArmX = -1.1 - pushPhase;
        targetLArmZ = -0.38;
        targetRArmZ = 0.38;
        targetLLegX = -0.45;
        targetRLegX = 0.25;
        break;
      }

      case 'helping': {
        targetBodyY = -0.05;
        targetFallX = 0.32;
        targetLArmX = -1.42 + Math.sin(t * 8) * 0.14;
        targetRArmX = -1.42 - Math.sin(t * 8) * 0.14;
        targetLArmZ = 0.12;
        targetRArmZ = -0.12;
        targetLLegX = 0.25;
        targetRLegX = -0.25;
        break;
      }

      case 'riding_shoulders': {
        // Straddling happily & waving arms!
        targetBodyY = Math.sin(t * 5) * 0.025;
        targetLArmX = -2.65 + Math.sin(t * 8.5) * 0.26;
        targetRArmX = -2.65 - Math.sin(t * 8.5) * 0.26;
        targetLArmZ = 0.58;
        targetRArmZ = -0.58;
        targetLLegX = -0.82;
        targetRLegX = -0.82;
        targetLLegZ = -0.48;
        targetRLegZ = 0.48;
        showLeftPeace = true;
        showRightPeace = !this.holdsRightProp;
        break;
      }

      case 'carrying_rider': {
        // Sturdy stance, both hands raised supporting rider's legs with subtle nervous strain
        targetBodyY = -0.03 + Math.sin(t * 9.5) * 0.015;
        targetLArmX = -2.35;
        targetRArmX = -2.35;
        targetLArmZ = 0.26;
        targetRArmZ = -0.26;
        targetLLegZ = -0.16;
        targetRLegZ = 0.16;
        break;
      }
    }

    // Extra bakage flair when pulling a wild アッカンベー hen_gao face!
    let extraHeadRollZ = 0;
    let extraHeadPitchX = 0;
    const isUpright = action !== 'fallen' && action !== 'staggering';

    if (state.expression === 'hen_gao' && isUpright) {
      const sideSign = this.poseVariant === 1 ? -1 : 1;
      extraHeadRollZ += sideSign * 0.28 + Math.sin(t * 7.5) * 0.14;
      extraHeadPitchX -= 0.08;
      if (action === 'idle' || action === 'moving') {
        // Lopsided goofy lean + cheeky flamingo kick / jazz hands even outside posing!
        targetFallZ += sideSign * 0.16 + Math.sin(t * 6.8) * 0.09;
        targetFallX -= 0.14;
        if (action === 'idle') {
          targetRLegX = -0.92;
          targetRLegZ = 0.3;
          targetLArmX = -2.2;
          targetLArmZ = 0.55;
          showLeftPeace = true;
        }
      }
    } else if (action === 'posing') {
      // Playful crooked head tilt during wild bakage poses
      extraHeadRollZ += (this.poseVariant === 1 ? -0.22 : 0.2) + Math.sin(t * 5.2) * 0.08;
    }

    // Lens-bombing photobomber pose: dramatic lean forward + double V peace hands right beside face!
    if (state.lensBombProgress > 0.35 && isUpright) {
      const bombAmt = THREE.MathUtils.clamp((state.lensBombProgress - 0.35) / 0.65, 0, 1);
      const wiggle = Math.sin(t * 14) * 0.14;
      targetFallX = 0.24 + 0.24 * bombAmt;
      targetLArmX = -2.18 + wiggle;
      targetRArmX = -2.18 - wiggle;
      targetLArmZ = 0.32;
      targetRArmZ = -0.32;
      showLeftPeace = true;
      showRightPeace = true;
      // Tilt head up slightly so giant smug/hen_gao face stares straight into the camera lens
      extraHeadPitchX -= 0.16 + 0.14 * bombAmt;
    }

    // Pre-sneeze inhale arm tension
    const sneezeCharge = Math.max(0, state.sneezeCharge || 0);
    if (sneezeCharge > 0 && isUpright) {
      targetLArmX = THREE.MathUtils.lerp(targetLArmX, -0.75, sneezeCharge * 0.7);
      targetRArmX = THREE.MathUtils.lerp(targetRArmX, -0.75, sneezeCharge * 0.7);
      targetLArmZ = THREE.MathUtils.lerp(targetLArmZ, -0.42, sneezeCharge * 0.7);
      targetRArmZ = THREE.MathUtils.lerp(targetRArmZ, 0.42, sneezeCharge * 0.7);
    }

    // Extra peace sign boost when beaming "cheese" with high poseIntensity
    if (
      state.expression === 'cheese' &&
      state.poseIntensity > 0.35 &&
      action !== 'fallen' &&
      action !== 'staggering' &&
      action !== 'hiding'
    ) {
      if (!this.holdsRightProp) {
        targetRArmX = Math.min(targetRArmX, -2.25);
        targetRArmZ = Math.min(targetRArmZ, -0.45);
        showRightPeace = true;
      }
    }

    // Smooth joint damping for buttery 60 FPS toy motion
    const speed = 13;
    this.animBodyY = damp(this.animBodyY, targetBodyY, speed, dt);
    this.animFallX = damp(this.animFallX, targetFallX, 10, dt);
    this.animFallZ = damp(this.animFallZ, targetFallZ, 10, dt);
    this.animLArmX = damp(this.animLArmX, targetLArmX, speed, dt);
    this.animLArmZ = damp(this.animLArmZ, targetLArmZ, speed, dt);
    this.animRArmX = damp(this.animRArmX, targetRArmX, speed, dt);
    this.animRArmZ = damp(this.animRArmZ, targetRArmZ, speed, dt);
    this.animLLegX = damp(this.animLLegX, targetLLegX, speed, dt);
    this.animLLegZ = damp(this.animLLegZ, targetLLegZ, speed, dt);
    this.animRLegX = damp(this.animRLegX, targetRLegX, speed, dt);
    this.animRLegZ = damp(this.animRLegZ, targetRLegZ, speed, dt);

    // Pre-sneeze rapid vibration & chest swell + Jenga-tower carrying wobble
    const sneezeVib = sneezeCharge > 0 ? Math.sin(elapsedTime * 52) * 0.05 * sneezeCharge : 0;
    const jengaTiltZ = action === 'carrying_rider' ? Math.sin(elapsedTime * 9.5) * 0.11 : 0;

    // Apply volume-preserving squash & stretch (with pre-sneeze inhale puff swell!)
    const sqY = THREE.MathUtils.clamp((state.squashY || 1) + sneezeCharge * 0.13, 0.62, 1.5);
    const invSq = (1 / Math.sqrt(sqY)) * (1 + sneezeCharge * 0.09);
    this.bodyPivot.scale.set(invSq, sqY, invSq);
    this.bodyPivot.position.set(sneezeVib, this.animBodyY, 0);
    this.bodyPivot.rotation.set(
      state.tiltX + this.animFallX,
      0,
      state.tiltZ + this.animFallZ + jengaTiltZ,
    );

    // Apply limbs
    this.leftArmPivot.rotation.set(this.animLArmX, 0, this.animLArmZ);
    this.rightArmPivot.rotation.set(this.animRArmX, 0, this.animRArmZ);
    this.leftLegPivot.rotation.set(this.animLLegX, 0, this.animLLegZ);
    this.rightLegPivot.rotation.set(this.animRLegX, 0, this.animRLegZ);

    this.leftPeaceSign.visible = showLeftPeace;
    this.rightPeaceSign.visible = showRightPeace;

    // Head yaw, pitch & roll toward camera / point of interest
    // Negate headPitchOffset so positive pitch tilts +Z headForward UP toward high-angle cameras!
    // Pre-sneeze tilts head dramatically UP/backward (-0.38 * sneezeCharge) with rapid tremble!
    const sneezeHeadPitch = sneezeCharge > 0 ? -0.38 * sneezeCharge : 0;
    const sneezeHeadYaw = sneezeCharge > 0 ? Math.cos(elapsedTime * 61) * 0.04 * sneezeCharge : 0;
    const sneezeHeadRoll = sneezeVib * 1.4;
    this.headPivot.rotation.set(
      -state.headPitchOffset + extraHeadPitchX + sneezeHeadPitch,
      state.headYawOffset + sneezeHeadYaw,
      extraHeadRollZ + sneezeHeadRoll,
    );

    // Flying Hat / Headwear Physics (pop sky-high & tumble-spin on impact!)
    if (state.hatPopHeight > 0.001) {
      this.hatPivot.position.set(0, state.hatPopHeight, 0);
      this.hatPivot.rotation.set(
        state.hatSpin * 0.65,
        state.hatSpin,
        state.hatSpin * 0.45,
      );
    } else {
      this.hatPivot.position.set(0, 0, 0);
      this.hatPivot.rotation.set(0, 0, 0);
    }

    // Secondary motion: ponytail, veil, tour flag, sunglasses surprise/cheese pop!
    if (this.ponytailPivot) {
      this.ponytailPivot.rotation.z = Math.sin(t * 4.5 + state.walkPhase) * 0.14;
      this.ponytailPivot.rotation.x = Math.min(0.4, Math.abs(state.velocity.length()) * 0.12);
    }
    if (this.veilPivot) {
      this.veilPivot.rotation.x = 0.06 + Math.sin(t * 2.1) * 0.07;
      this.veilPivot.rotation.z = Math.cos(t * 1.7) * 0.05;
    }
    if (this.flagBannerPivot) {
      this.flagBannerPivot.rotation.y = Math.sin(t * 7.5) * 0.34;
    }
    if (this.sunglassesGroup) {
      const wantRaise =
        state.expression === 'surprised' ||
        state.expression === 'hen_gao' ||
        state.action === 'staggering' ||
        state.action === 'fallen'
          ? 1
          : state.expression === 'cheese' || state.action === 'posing'
            ? 0.55
            : 0;
      this.animSunglassesRaise = damp(this.animSunglassesRaise, wantRaise, 14, dt);
      const r = this.headRadius;
      this.sunglassesGroup.position.y = -r * 0.04 + this.animSunglassesRaise * r * 0.42;
      this.sunglassesGroup.rotation.x = -this.animSunglassesRaise * 0.42;
    }

    // Physical 3D dizzy stars orbiting above head (always visible when fallen/dizzy, even in photos!)
    const isDizzy = state.action === 'fallen' || state.expression === 'dizzy';
    this.dizzyStarsGroup.visible = isDizzy;
    if (isDizzy) {
      this.dizzyStarsGroup.rotation.y = elapsedTime * 4.4 + this.phaseOffset;
      this.dizzyStarsGroup.rotation.z = Math.sin(elapsedTime * 3.2) * 0.18;
      for (let i = 0; i < this.dizzyStars.length; i++) {
        this.dizzyStars[i].rotation.y = elapsedTime * 5 + i * 2;
        this.dizzyStars[i].position.y = Math.sin(elapsedTime * 6 + i * 2.1) * 0.04;
      }
    }

    // Floating comic reaction icon sprite with bouncy pop-in
    const icon = state.reactionTimer > 0 ? state.reactionIcon : '';
    if (icon !== this.currentReaction) {
      this.currentReaction = icon;
      this.reactionPopAge = 0;
      if (icon) {
        this.reactionSpriteMat.map = getSharedReactionTexture(this.shared, icon);
        this.reactionSpriteMat.needsUpdate = true;
      }
      this.updateReactionVisibility();
    }

    if (this.reactionSprite.visible) {
      this.reactionPopAge += dt;
      // Elastic comic pop-in scale curve
      const pop =
        this.reactionPopAge < 0.25
          ? 1 + Math.sin((this.reactionPopAge / 0.25) * Math.PI) * 0.35
          : 1 + Math.sin(elapsedTime * 6 + this.phaseOffset) * 0.05;
      const baseScale = 0.3;
      this.reactionSprite.scale.set(baseScale * pop, baseScale * pop, 1);

      const headTop =
        state.action === 'fallen'
          ? 0.72 * this.heightScale
          : 0.93 * this.heightScale + this.headRadius * 1.96 + 0.38;
      this.reactionSprite.position.y =
        headTop + Math.sin(elapsedTime * 5 + this.phaseOffset) * 0.04;
    }
  }

  /**
   * Sync exact rendered 3D head world position and face forward vector (+Z of headPivot)
   * back onto NpcRuntimeState so Live Face-AF brackets and PhotoEvaluator occlusion rays
   * match the visible 3D mesh down to the millimeter.
   */
  public syncHeadTransformToState(state: NpcRuntimeState): void {
    this.root.updateMatrixWorld(true);
    this.headMesh.getWorldPosition(state.headWorldPos);
    this.headPivot.getWorldQuaternion(this.tmpHeadQuat);
    state.headForward.set(0, 0, 1).applyQuaternion(this.tmpHeadQuat).normalize();
    state.headRadius = this.headRadius;
  }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;

    for (const geo of this.ownedGeometries) {
      geo.dispose();
    }
    this.ownedGeometries.length = 0;

    for (const mat of this.ownedMaterials) {
      mat.dispose();
    }
    this.ownedMaterials.length = 0;

    releaseSharedAssets();
  }
}
