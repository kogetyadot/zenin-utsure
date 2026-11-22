import { PhotoRank, SimEvent, SimEventType, StageId } from '../types';

type WebkitWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

interface BgmTrackDef {
  baseBpm: number;
  swing: number; // 0..0.25 eighth-note swing ratio
  // 32-step (2-bar or 4-bar 8th-note) MIDI pitches (0 = rest)
  melody: number[];
  bass: number[];
  chords: number[][]; // 8 chords, 1 per 4 steps (half-bar)
  style: StageId;
}

function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Sunny F-major garden swing (Fmaj7 - Dm7 - Gm7 - C9)
const WEDDING_BGM: BgmTrackDef = {
  baseBpm: 118,
  swing: 0.12,
  style: 'wedding',
  melody: [
    // Bar 1 (Fmaj7): jaunty welcoming motif
    77, 0, 81, 79, 77, 0, 72, 74,
    // Bar 2 (Dm7): warm playful bounce
    77, 0, 74, 72, 69, 0, 72, 0,
    // Bar 3 (Gm7): sunny lift
    74, 0, 77, 79, 81, 0, 79, 77,
    // Bar 4 (C9): cheerful turnaround
    79, 0, 76, 72, 74, 76, 79, 0,
  ],
  bass: [
    53, 0, 0, 57, 60, 0, 57, 0,
    50, 0, 0, 53, 57, 0, 53, 0,
    55, 0, 0, 58, 62, 0, 58, 0,
    48, 0, 0, 52, 55, 0, 52, 0,
  ],
  chords: [
    [65, 69, 72, 76], // Fmaj7
    [65, 69, 72, 76],
    [62, 65, 69, 72], // Dm7
    [62, 65, 69, 72],
    [62, 65, 67, 70], // Gm7
    [62, 65, 67, 70],
    [60, 64, 67, 70], // C7
    [60, 64, 67, 70],
  ],
};

// Upbeat G-major school trip march (G - Em7 - Cmaj7 - D7)
const SCHOOL_TRIP_BGM: BgmTrackDef = {
  baseBpm: 128,
  swing: 0.03,
  style: 'school_trip',
  melody: [
    // Bar 1 (G): energetic march hook
    79, 79, 83, 0, 86, 83, 79, 0,
    // Bar 2 (Em7): playful step-down
    83, 0, 81, 79, 76, 0, 79, 0,
    // Bar 3 (C): rising excitement
    76, 79, 84, 0, 83, 81, 79, 76,
    // Bar 4 (D7): cheeky cadence
    78, 0, 81, 84, 83, 81, 78, 0,
  ],
  bass: [
    55, 0, 62, 0, 55, 0, 59, 0,
    52, 0, 59, 0, 52, 0, 55, 0,
    48, 0, 55, 0, 48, 0, 52, 0,
    50, 0, 57, 0, 50, 0, 54, 0,
  ],
  chords: [
    [67, 71, 74], // G
    [67, 71, 74],
    [64, 67, 71, 74], // Em7
    [64, 67, 71, 74],
    [60, 64, 67, 71], // Cmaj7
    [60, 64, 67, 71],
    [62, 66, 69, 72], // D7
    [62, 66, 69, 72],
  ],
};

// Energetic C-major Japanese Sports Day Can-Can / Athletic March (138 BPM)
const SPORTS_DAY_BGM: BgmTrackDef = {
  baseBpm: 138,
  swing: 0.0,
  style: 'sports_day',
  melody: [
    // Bar 1 (C): iconic Can-Can athletic dash motif
    72, 0, 74, 77, 76, 74, 79, 79,
    // Bar 2 (G7): bouncy hurdle cadence
    79, 81, 76, 77, 74, 74, 74, 77,
    // Bar 3 (C -> F): triumphant high-C sprint
    76, 74, 72, 84, 83, 81, 79, 77,
    // Bar 4 (G7 -> C): joyful finish-line fanfare
    76, 74, 72, 74, 76, 79, 84, 0,
  ],
  bass: [
    48, 0, 55, 0, 48, 0, 55, 0,
    55, 0, 50, 0, 55, 0, 59, 0,
    48, 0, 55, 0, 53, 0, 57, 0,
    55, 0, 50, 0, 55, 59, 48, 0,
  ],
  chords: [
    [60, 64, 67], // C
    [60, 64, 67], // C
    [62, 65, 67, 71], // G7
    [62, 65, 67, 71], // G7
    [60, 64, 67], // C
    [60, 65, 69], // F
    [62, 65, 67, 71], // G7
    [60, 64, 67], // C
  ],
};

// Sunny D-major Tropical Steel-Drum & Ukulele Calypso (122 BPM)
const TROPICAL_BEACH_BGM: BgmTrackDef = {
  baseBpm: 122,
  swing: 0.07,
  style: 'tropical_beach',
  melody: [
    // Bar 1 (D): shimmering pentatonic steel-pan hook
    81, 0, 83, 81, 0, 78, 74, 0,
    // Bar 2 (G): sunny ocean lift
    79, 0, 81, 83, 0, 86, 83, 81,
    // Bar 3 (A7): breezy calypso sway
    79, 0, 76, 79, 81, 0, 78, 76,
    // Bar 4 (D -> A7): sparkling turnaround
    74, 78, 81, 0, 86, 0, 83, 81,
  ],
  bass: [
    // Classic 3-3-2 syncopated island calypso bass
    50, 0, 0, 57, 0, 0, 54, 0,
    55, 0, 0, 59, 0, 0, 55, 0,
    57, 0, 0, 52, 0, 0, 57, 0,
    50, 0, 0, 57, 50, 0, 57, 0,
  ],
  chords: [
    [62, 66, 69, 74], // D
    [62, 66, 69, 74], // D
    [67, 71, 74, 79], // G
    [67, 71, 74, 79], // G
    [64, 67, 69, 73], // A7
    [64, 67, 69, 73], // A7
    [62, 66, 69, 74], // D
    [64, 67, 69, 73], // A7
  ],
};

const BGM_TRACKS: Record<StageId, BgmTrackDef> = {
  wedding: WEDDING_BGM,
  school_trip: SCHOOL_TRIP_BGM,
  sports_day: SPORTS_DAY_BGM,
  tropical_beach: TROPICAL_BEACH_BGM,
};

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  private muted = false;
  private disposed = false;

  // BGM lookahead scheduler state
  private currentStage: StageId | null = null;
  private bgmUrgent = false;
  private bgmTimerId: number | null = null;
  private bgmStep = 0;
  private bgmNextNoteTime = 0;

  // Foley throttling timestamps (seconds in AudioContext time or performance.now)
  private lastZoomTickAt = 0;
  private lastSimEventAt: Partial<Record<SimEventType, number>> = {};

  private ensureContext(): AudioContext | null {
    if (this.disposed) return null;
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {
          // Ignore autoplay-policy rejections until user gesture
        });
      }
      return this.ctx;
    }

    try {
      const AudioCtx =
        window.AudioContext || (window as WebkitWindow).webkitAudioContext;
      if (!AudioCtx) return null;

      const ctx = new AudioCtx();
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-14, ctx.currentTime);
      compressor.knee.setValueAtTime(18, ctx.currentTime);
      compressor.ratio.setValueAtTime(4, ctx.currentTime);
      compressor.attack.setValueAtTime(0.004, ctx.currentTime);
      compressor.release.setValueAtTime(0.15, ctx.currentTime);

      const master = ctx.createGain();
      master.gain.setValueAtTime(this.muted ? 0 : 0.92, ctx.currentTime);

      const bgm = ctx.createGain();
      bgm.gain.setValueAtTime(0.18, ctx.currentTime);

      const sfx = ctx.createGain();
      sfx.gain.setValueAtTime(0.82, ctx.currentTime);

      bgm.connect(master);
      sfx.connect(master);
      master.connect(compressor);
      compressor.connect(ctx.destination);

      this.ctx = ctx;
      this.masterGain = master;
      this.bgmGain = bgm;
      this.sfxGain = sfx;
      this.noiseBuffer = this.createNoiseBuffer(ctx);

      return ctx;
    } catch {
      return null;
    }
  }

  private createNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const length = Math.floor(ctx.sampleRate * 1.5);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  public unlock(): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      // Silent micro-buffer to unlock iOS/Safari AudioContext reliably
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    } catch {
      // Safe no-op in restricted environments
    }
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.ctx && this.masterGain) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.92, now, 0.025);
      } catch {
        // Ignore
      }
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public startBgm(stageId: StageId): void {
    if (this.disposed) return;
    this.stopBgm();
    this.currentStage = stageId;
    this.bgmStep = 0;

    const ctx = this.ensureContext();
    if (!ctx) return;

    this.bgmNextNoteTime = ctx.currentTime + 0.06;
    if (this.bgmGain) {
      const now = ctx.currentTime;
      this.bgmGain.gain.cancelScheduledValues(now);
      this.bgmGain.gain.setValueAtTime(0.001, now);
      this.bgmGain.gain.linearRampToValueAtTime(0.18, now + 0.35);
    }

    this.bgmTimerId = window.setInterval(() => {
      this.scheduleBgmTick();
    }, 35);
  }

  public stopBgm(): void {
    if (this.bgmTimerId !== null) {
      window.clearInterval(this.bgmTimerId);
      this.bgmTimerId = null;
    }
    this.currentStage = null;
    if (this.ctx && this.bgmGain) {
      try {
        const now = this.ctx.currentTime;
        this.bgmGain.gain.cancelScheduledValues(now);
        this.bgmGain.gain.setTargetAtTime(0.0001, now, 0.06);
      } catch {
        // Ignore
      }
    }
  }

  public setBgmUrgency(urgent: boolean): void {
    this.bgmUrgent = urgent;
  }

  private scheduleBgmTick(): void {
    if (!this.currentStage || !this.ctx || !this.bgmGain) return;
    if (this.ctx.state !== 'running') {
      // Keep nextNoteTime synced so it doesn't burst notes when resumed
      this.bgmNextNoteTime = this.ctx.currentTime + 0.06;
      return;
    }

    const track = BGM_TRACKS[this.currentStage];
    const bpm = this.bgmUrgent ? track.baseBpm * 1.12 : track.baseBpm;
    const eighthSec = 60 / bpm / 2;
    const lookahead = 0.14;

    while (this.bgmNextNoteTime < this.ctx.currentTime + lookahead) {
      const step = this.bgmStep % 32;
      const isOffbeat = step % 2 === 1;
      const swingOffset = isOffbeat ? eighthSec * track.swing : 0;
      const t = this.bgmNextNoteTime + swingOffset;

      this.scheduleBgmStep(track, step, t, eighthSec);

      this.bgmNextNoteTime += eighthSec;
      this.bgmStep = (this.bgmStep + 1) % 32;
    }
  }

  private scheduleBgmStep(
    track: BgmTrackDef,
    step: number,
    time: number,
    eighthSec: number,
  ): void {
    if (!this.ctx || !this.bgmGain) return;

    const melMidi = track.melody[step];
    const bassMidi = track.bass[step];
    const chordIdx = Math.floor(step / 4) % track.chords.length;
    const chord = track.chords[chordIdx];

    if (track.style === 'sports_day') {
      // 1. Bright bouncy brass + marimba athletic march lead
      if (melMidi > 0) {
        const hz = midiToHz(melMidi);
        this.playMarimbaNote(hz, time, 0.16, 0.28, true, this.bgmGain);
        this.playBrassLeadNote(hz, time, Math.min(0.18, eighthSec * 0.88), 0.14, this.bgmGain);
      }

      // 2. Punchy oom-pah marching bass
      if (bassMidi > 0) {
        this.playBassNote(midiToHz(bassMidi), time, eighthSec * 1.15, 0.44, this.bgmGain);
      }

      // 3. Crisp off-beat athletic horn/chord stabs
      if (step % 2 === 1) {
        this.playWarmChordPluck(chord, time, 0.1, 0.1, this.bgmGain);
      }

      // 4. Marching kick + snare + woodblock cadence
      if (step % 4 === 0) {
        this.playMarchKick(time, 0.24, this.bgmGain);
      }
      if (step % 4 === 2 || step === 15 || step === 30 || step === 31) {
        this.playMarchSnare(time, step % 4 === 2 ? 0.15 : 0.1, this.bgmGain);
      } else if (step % 4 === 1) {
        this.playWoodblock(time, 1040, 0.065, this.bgmGain);
      }
      return;
    }

    if (track.style === 'tropical_beach') {
      // 1. Shimmering pentatonic steel-drum melody
      if (melMidi > 0) {
        this.playSteelDrumNote(midiToHz(melMidi), time, 0.3, 0.32, this.bgmGain);
      }

      // 2. Warm syncopated island bass
      if (bassMidi > 0) {
        this.playBassNote(midiToHz(bassMidi), time, eighthSec * 1.85, 0.4, this.bgmGain);
      }

      // 3. Sunny syncopated ukulele calypso strum
      const barStep = step % 8;
      if (barStep === 0 || barStep === 2 || barStep === 5 || barStep === 7) {
        this.playUkuleleStrum(
          chord,
          time,
          barStep === 0 ? 0.19 : 0.14,
          barStep === 0 ? 0.1 : 0.085,
          this.bgmGain,
        );
      }

      // 4. Breezy tropical shaker groove + clave woodblock
      this.playShaker(time, barStep % 2 === 0 ? 0.055 : 0.032, barStep === 2 || barStep === 6, this.bgmGain);
      if (barStep === 0 || barStep === 3 || barStep === 6) {
        this.playWoodblock(time, 1240, 0.06, this.bgmGain);
      }
      return;
    }

    // 1. Melody (warm marimba / glockenspiel)
    if (melMidi > 0) {
      this.playMarimbaNote(
        midiToHz(melMidi),
        time,
        track.style === 'wedding' ? 0.24 : 0.19,
        0.34,
        track.style === 'school_trip',
        this.bgmGain,
      );
    }

    // 2. Upright / bouncy bass
    if (bassMidi > 0) {
      this.playBassNote(midiToHz(bassMidi), time, eighthSec * 1.6, 0.42, this.bgmGain);
    }

    // 3. Off-beat acoustic strum chord (ukulele / pizzicato feel)
    if (step % 2 === 1) {
      this.playWarmChordPluck(chord, time, 0.14, 0.09, this.bgmGain);
    }

    // 4. Light percussion (brush hi-hat or gentle march woodblock)
    if (track.style === 'wedding') {
      if (step % 2 === 0 || step % 4 === 3) {
        this.playBrushHat(time, step % 4 === 2 ? 0.065 : 0.038, this.bgmGain);
      }
    } else {
      // School trip upbeat march percussion
      if (step % 4 === 2) {
        this.playWoodblock(time, 940, 0.09, this.bgmGain);
      } else if (step % 2 === 0) {
        this.playBrushHat(time, 0.04, this.bgmGain);
      }
    }
  }

  private playMarimbaNote(
    freq: number,
    time: number,
    duration: number,
    volume: number,
    bright: boolean,
    dest: AudioNode,
  ): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const overGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Marimba 4th harmonic (or glockenspiel 3rd/2nd harmonic) for warm woody attack
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * (bright ? 2.0 : 4.0), time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    overGain.gain.setValueAtTime(0.0001, time);
    overGain.gain.linearRampToValueAtTime(volume * (bright ? 0.24 : 0.14), time + 0.005);
    overGain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.38);

    osc.connect(gain);
    overtone.connect(overGain);
    overGain.connect(gain);
    gain.connect(dest);

    osc.start(time);
    overtone.start(time);
    osc.stop(time + duration + 0.03);
    overtone.stop(time + duration + 0.03);
  }

  private playBassNote(
    freq: number,
    time: number,
    duration: number,
    volume: number,
    dest: AudioNode,
  ): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, time);
    filter.frequency.exponentialRampToValueAtTime(170, time + duration);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + duration + 0.03);
  }

  private playWarmChordPluck(
    midis: number[],
    time: number,
    duration: number,
    volume: number,
    dest: AudioNode,
  ): void {
    if (!this.ctx) return;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1550, time);

    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0.0001, time);
    chordGain.gain.linearRampToValueAtTime(volume, time + 0.01);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    filter.connect(chordGain);
    chordGain.connect(dest);

    for (let i = 0; i < midis.length; i++) {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      const strumOffset = i * 0.007;
      osc.frequency.setValueAtTime(midiToHz(midis[i]), time + strumOffset);
      osc.connect(filter);
      osc.start(time + strumOffset);
      osc.stop(time + duration + 0.04);
    }
  }

  private playBrushHat(time: number, volume: number, dest: AudioNode): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(6800, time);
    filter.Q.setValueAtTime(1.4, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.042);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    src.start(time, Math.random() * 0.6, 0.055);
  }

  private playWoodblock(
    time: number,
    freq: number,
    volume: number,
    dest: AudioNode,
  ): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.78, time + 0.035);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.048);

    osc.connect(gain);
    gain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.055);
  }

  private playBrassLeadNote(
    freq: number,
    time: number,
    duration: number,
    volume: number,
    dest: AudioNode,
  ): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(920, time);
    filter.frequency.exponentialRampToValueAtTime(2700, time + 0.025);
    filter.frequency.exponentialRampToValueAtTime(1150, time + duration);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + duration + 0.03);
  }

  private playMarchSnare(time: number, volume: number, dest: AudioNode): void {
    if (!this.ctx) return;
    // Snappy snare wire burst
    if (this.noiseBuffer) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(2400, time);
      bp.Q.setValueAtTime(1.1, time);
      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.0001, time);
      nGain.gain.linearRampToValueAtTime(volume, time + 0.003);
      nGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.085);
      src.connect(bp);
      bp.connect(nGain);
      nGain.connect(dest);
      src.start(time, Math.random() * 0.5, 0.095);
    }
    // Tight drum shell body tone
    const body = this.ctx.createOscillator();
    const bGain = this.ctx.createGain();
    body.type = 'triangle';
    body.frequency.setValueAtTime(220, time);
    body.frequency.exponentialRampToValueAtTime(130, time + 0.045);
    bGain.gain.setValueAtTime(0.0001, time);
    bGain.gain.linearRampToValueAtTime(volume * 0.65, time + 0.003);
    bGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);
    body.connect(bGain);
    bGain.connect(dest);
    body.start(time);
    body.stop(time + 0.065);
  }

  private playMarchKick(time: number, volume: number, dest: AudioNode): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(125, time);
    osc.frequency.exponentialRampToValueAtTime(52, time + 0.075);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.09);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.1);
  }

  private playSteelDrumNote(
    freq: number,
    time: number,
    duration: number,
    volume: number,
    dest: AudioNode,
  ): void {
    if (!this.ctx) return;
    // Fundamental + octave overtone + shimmering slightly detuned metallic 3rd harmonic
    const fund = this.ctx.createOscillator();
    const oct = this.ctx.createOscillator();
    const shimmer = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const octGain = this.ctx.createGain();
    const shimGain = this.ctx.createGain();

    fund.type = 'sine';
    fund.frequency.setValueAtTime(freq * 1.006, time);
    fund.frequency.exponentialRampToValueAtTime(freq, time + 0.018);

    oct.type = 'triangle';
    oct.frequency.setValueAtTime(freq * 2.0, time);

    shimmer.type = 'sine';
    shimmer.frequency.setValueAtTime(freq * 3.015, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    octGain.gain.setValueAtTime(0.0001, time);
    octGain.gain.linearRampToValueAtTime(volume * 0.34, time + 0.005);
    octGain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.55);

    shimGain.gain.setValueAtTime(0.0001, time);
    shimGain.gain.linearRampToValueAtTime(volume * 0.14, time + 0.004);
    shimGain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.32);

    fund.connect(gain);
    oct.connect(octGain);
    shimmer.connect(shimGain);
    octGain.connect(gain);
    shimGain.connect(gain);
    gain.connect(dest);

    fund.start(time);
    oct.start(time);
    shimmer.start(time);
    fund.stop(time + duration + 0.03);
    oct.stop(time + duration + 0.03);
    shimmer.stop(time + duration + 0.03);
  }

  private playUkuleleStrum(
    midis: number[],
    time: number,
    duration: number,
    volume: number,
    dest: AudioNode,
  ): void {
    if (!this.ctx) return;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(340, time);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(2600, time);

    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0.0001, time);
    chordGain.gain.linearRampToValueAtTime(volume, time + 0.008);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    hp.connect(lp);
    lp.connect(chordGain);
    chordGain.connect(dest);

    for (let i = 0; i < midis.length; i++) {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      const strumOffset = i * 0.009;
      osc.frequency.setValueAtTime(midiToHz(midis[i]), time + strumOffset);
      osc.connect(hp);
      osc.start(time + strumOffset);
      osc.stop(time + duration + 0.04);
    }
  }

  private playShaker(
    time: number,
    volume: number,
    accented: boolean,
    dest: AudioNode,
  ): void {
    if (!this.ctx || !this.noiseBuffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(accented ? 7600 : 6200, time);
    bp.Q.setValueAtTime(2.0, time);

    const dur = accented ? 0.055 : 0.034;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    src.connect(bp);
    bp.connect(gain);
    gain.connect(dest);

    src.start(time, Math.random() * 0.7, dur + 0.015);
  }

  // ==================== CAMERA & GAMEPLAY FOLEY ====================

  /**
   * Authentic multi-stage DSLR shutter: mirror slap + metallic curtain click + film-advance whir.
   */
  public playShutter(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || !this.noiseBuffer) return;

    try {
      const now = ctx.currentTime;

      // Stage 1 (0ms): Mirror slap — crisp filtered noise burst + mechanical body thump
      const slapNoise = ctx.createBufferSource();
      slapNoise.buffer = this.noiseBuffer;
      const slapBp = ctx.createBiquadFilter();
      slapBp.type = 'bandpass';
      slapBp.frequency.setValueAtTime(1850, now);
      slapBp.Q.setValueAtTime(1.6, now);
      const slapGain = ctx.createGain();
      slapGain.gain.setValueAtTime(0.001, now);
      slapGain.gain.linearRampToValueAtTime(0.62, now + 0.003);
      slapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.034);
      slapNoise.connect(slapBp);
      slapBp.connect(slapGain);
      slapGain.connect(this.sfxGain);
      slapNoise.start(now, 0.05, 0.045);

      const thump = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      thump.type = 'sine';
      thump.frequency.setValueAtTime(165, now);
      thump.frequency.exponentialRampToValueAtTime(52, now + 0.036);
      thumpGain.gain.setValueAtTime(0.45, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      thump.connect(thumpGain);
      thumpGain.connect(this.sfxGain);
      thump.start(now);
      thump.stop(now + 0.048);

      // Stage 2 (24ms): Crisp metallic shutter click
      const clickT = now + 0.024;
      const clickNoise = ctx.createBufferSource();
      clickNoise.buffer = this.noiseBuffer;
      const clickHp = ctx.createBiquadFilter();
      clickHp.type = 'highpass';
      clickHp.frequency.setValueAtTime(4200, clickT);
      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0.001, clickT);
      clickGain.gain.linearRampToValueAtTime(0.44, clickT + 0.002);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, clickT + 0.02);
      clickNoise.connect(clickHp);
      clickHp.connect(clickGain);
      clickGain.connect(this.sfxGain);
      clickNoise.start(clickT, 0.2, 0.03);

      const ping = ctx.createOscillator();
      const pingGain = ctx.createGain();
      ping.type = 'triangle';
      ping.frequency.setValueAtTime(3450, clickT);
      ping.frequency.exponentialRampToValueAtTime(2100, clickT + 0.022);
      pingGain.gain.setValueAtTime(0.14, clickT);
      pingGain.gain.exponentialRampToValueAtTime(0.0001, clickT + 0.024);
      ping.connect(pingGain);
      pingGain.connect(this.sfxGain);
      ping.start(clickT);
      ping.stop(clickT + 0.03);

      // Stage 3 (120ms): Soft whirring film-advance / mirror-return motor
      const windT = now + 0.12;
      const motor = ctx.createOscillator();
      const motorFilter = ctx.createBiquadFilter();
      const motorGain = ctx.createGain();
      motor.type = 'sawtooth';
      motor.frequency.setValueAtTime(240, windT);
      motor.frequency.linearRampToValueAtTime(345, windT + 0.055);
      motor.frequency.linearRampToValueAtTime(280, windT + 0.125);

      motorFilter.type = 'bandpass';
      motorFilter.frequency.setValueAtTime(980, windT);
      motorFilter.Q.setValueAtTime(2.6, windT);

      motorGain.gain.setValueAtTime(0.0001, windT);
      motorGain.gain.linearRampToValueAtTime(0.11, windT + 0.02);
      motorGain.gain.setValueAtTime(0.095, windT + 0.09);
      motorGain.gain.exponentialRampToValueAtTime(0.0001, windT + 0.135);

      motor.connect(motorFilter);
      motorFilter.connect(motorGain);
      motorGain.connect(this.sfxGain);
      motor.start(windT);
      motor.stop(windT + 0.145);

      // Quiet final mechanical latch click
      const latchT = windT + 0.12;
      this.playWoodblock(latchT, 2400, 0.08, this.sfxGain);
    } catch {
      // Safe no-op
    }
  }

  /**
   * Cheerful rising glockenspiel chime + joyful chord shimmer for "はいチーズ！".
   */
  public playSayCheese(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain) return;

    try {
      const now = ctx.currentTime;
      // Rising playful glockenspiel flourish (G5 -> B5 -> D6 -> G6)
      const notes = [79, 83, 86, 91];
      notes.forEach((midi, idx) => {
        const t = now + idx * 0.052;
        this.playMarimbaNote(
          midiToHz(midi),
          t,
          idx === notes.length - 1 ? 0.42 : 0.2,
          idx === notes.length - 1 ? 0.34 : 0.25,
          true,
          this.sfxGain!,
        );
      });

      // Subtle rising cheerful whistle glide
      const whistle = ctx.createOscillator();
      const wGain = ctx.createGain();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(880, now);
      whistle.frequency.exponentialRampToValueAtTime(1480, now + 0.14);
      wGain.gain.setValueAtTime(0.0001, now);
      wGain.gain.linearRampToValueAtTime(0.11, now + 0.03);
      wGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      whistle.connect(wGain);
      wGain.connect(this.sfxGain);
      whistle.start(now);
      whistle.stop(now + 0.2);

      // Joyful chord shimmer on final note
      this.playWarmChordPluck([71, 74, 79, 83], now + 0.15, 0.38, 0.14, this.sfxGain);
    } catch {
      // Safe no-op
    }
  }

  /**
   * Authentic autofocus lock double-pip beep.
   */
  public playAfBeep(high = false): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain) return;

    try {
      const now = ctx.currentTime;
      const f1 = high ? 2637 : 2093;
      const f2 = high ? 3136 : 2093;
      const freqs = [f1, f2];

      freqs.forEach((freq, i) => {
        const t = now + i * 0.056;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.11, t + 0.004);
        gain.gain.setValueAtTime(0.11, t + 0.022);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.034);
        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(t);
        osc.stop(t + 0.04);
      });
    } catch {
      // Safe no-op
    }
  }

  /**
   * Subtle mechanical lens-ring zoom detent tick.
   */
  public playZoomTick(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;
    if (now - this.lastZoomTickAt < 0.042) return;
    this.lastZoomTickAt = now;

    try {
      this.playWoodblock(now, 1320, 0.065, this.sfxGain);
    } catch {
      // Safe no-op
    }
  }

  /**
   * Countdown timer tick (bright double chime on final tick).
   */
  public playCountdownTick(final = false): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain) return;

    try {
      const now = ctx.currentTime;
      if (final) {
        this.playMarimbaNote(midiToHz(88), now, 0.16, 0.28, true, this.sfxGain);
        this.playMarimbaNote(midiToHz(93), now + 0.075, 0.32, 0.32, true, this.sfxGain);
      } else {
        this.playWoodblock(now, 1080, 0.18, this.sfxGain);
      }
    } catch {
      // Safe no-op
    }
  }

  /**
   * Slapstick NPC foley driven by SimEvents, safely throttled so pileups never clip.
   */
  public playSimEvent(ev: SimEvent): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;
    const minInterval: Record<SimEventType, number> = {
      jump: 0.09,
      shove: 0.1,
      fall: 0.17,
      pileup: 0.24,
      shoulder_mount: 0.18,
      peek_pop: 0.12,
      pose: 0.15,
      get_up: 0.15,
      hat_pop: 0.16,
      sneeze_charge: 0.45,
      sneeze_blast: 0.45,
      intruder_enter: 0.55,
      intruder_bonk: 0.2,
      lens_bomb: 0.45,
      slip: 0.18,
      wave_warning: 0.9,
      wave_crash: 0.7,
      kusudama_pop: 0.6,
      ball_boing: 0.18,
    };

    const prev = this.lastSimEventAt[ev.type] ?? -10;
    if (now - prev < minInterval[ev.type]) return;
    this.lastSimEventAt[ev.type] = now;

    const intensity = Math.max(0.35, Math.min(1.2, ev.intensity || 0.8));

    try {
      switch (ev.type) {
        case 'jump': {
          // Cartoon springy boing
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(210, now);
          osc.frequency.exponentialRampToValueAtTime(590, now + 0.13);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.22 * intensity, now + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.155);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now);
          osc.stop(now + 0.165);
          break;
        }

        case 'shove': {
          // Soft woody cartoon thump
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(175, now);
          osc.frequency.exponentialRampToValueAtTime(68, now + 0.075);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.24 * intensity, now + 0.006);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now);
          osc.stop(now + 0.095);
          break;
        }

        case 'fall': {
          // Descending comedic slide-whistle + soft bonk
          const slide = ctx.createOscillator();
          const sGain = ctx.createGain();
          slide.type = 'sine';
          slide.frequency.setValueAtTime(760, now);
          slide.frequency.exponentialRampToValueAtTime(235, now + 0.17);
          sGain.gain.setValueAtTime(0.001, now);
          sGain.gain.linearRampToValueAtTime(0.15 * intensity, now + 0.018);
          sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.185);
          slide.connect(sGain);
          sGain.connect(this.sfxGain);
          slide.start(now);
          slide.stop(now + 0.195);

          // Bonk landing
          const bonkT = now + 0.145;
          const bonk = ctx.createOscillator();
          const bGain = ctx.createGain();
          bonk.type = 'triangle';
          bonk.frequency.setValueAtTime(205, bonkT);
          bonk.frequency.exponentialRampToValueAtTime(78, bonkT + 0.085);
          bGain.gain.setValueAtTime(0.001, bonkT);
          bGain.gain.linearRampToValueAtTime(0.28 * intensity, bonkT + 0.006);
          bGain.gain.exponentialRampToValueAtTime(0.0001, bonkT + 0.095);
          bonk.connect(bGain);
          bGain.connect(this.sfxGain);
          bonk.start(bonkT);
          bonk.stop(bonkT + 0.11);
          break;
        }

        case 'pileup': {
          // Double comedic bonk + cartoon slide scatter
          const slide = ctx.createOscillator();
          const sGain = ctx.createGain();
          slide.type = 'triangle';
          slide.frequency.setValueAtTime(640, now);
          slide.frequency.exponentialRampToValueAtTime(160, now + 0.22);
          sGain.gain.setValueAtTime(0.001, now);
          sGain.gain.linearRampToValueAtTime(0.18 * intensity, now + 0.015);
          sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
          slide.connect(sGain);
          sGain.connect(this.sfxGain);
          slide.start(now);
          slide.stop(now + 0.25);

          [0.06, 0.14].forEach((offset, idx) => {
            const bt = now + offset;
            const b = ctx.createOscillator();
            const g = ctx.createGain();
            b.type = 'sine';
            b.frequency.setValueAtTime(idx === 0 ? 190 : 145, bt);
            b.frequency.exponentialRampToValueAtTime(62, bt + 0.09);
            g.gain.setValueAtTime(0.001, bt);
            g.gain.linearRampToValueAtTime(0.26 * intensity, bt + 0.005);
            g.gain.exponentialRampToValueAtTime(0.0001, bt + 0.1);
            b.connect(g);
            g.connect(this.sfxGain!);
            b.start(bt);
            b.stop(bt + 0.11);
          });
          break;
        }

        case 'shoulder_mount': {
          // Sparkly upward arpeggio
          [72, 76, 79, 84].forEach((midi, idx) => {
            this.playMarimbaNote(
              midiToHz(midi),
              now + idx * 0.045,
              0.2,
              0.22 * intensity,
              true,
              this.sfxGain!,
            );
          });
          break;
        }

        case 'peek_pop': {
          // Cute bubble pop
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(360, now);
          osc.frequency.exponentialRampToValueAtTime(760, now + 0.055);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.15 * intensity, now + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.068);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now);
          osc.stop(now + 0.075);
          break;
        }

        case 'pose': {
          // Tiny sparkle chime
          this.playMarimbaNote(midiToHz(88), now, 0.12, 0.12 * intensity, true, this.sfxGain);
          this.playMarimbaNote(
            midiToHz(95),
            now + 0.045,
            0.16,
            0.13 * intensity,
            true,
            this.sfxGain,
          );
          break;
        }

        case 'get_up': {
          // Gentle bounce-back pluck
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(260, now);
          osc.frequency.exponentialRampToValueAtTime(430, now + 0.07);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.13 * intensity, now + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now);
          osc.stop(now + 0.095);
          break;
        }

        case 'hat_pop': {
          // Upward cartoon slide-whistle (380Hz -> 1320Hz) + cork-pop onset
          const pop = ctx.createOscillator();
          const popGain = ctx.createGain();
          pop.type = 'sine';
          pop.frequency.setValueAtTime(280, now);
          pop.frequency.exponentialRampToValueAtTime(760, now + 0.032);
          popGain.gain.setValueAtTime(0.001, now);
          popGain.gain.linearRampToValueAtTime(0.24 * intensity, now + 0.005);
          popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);
          pop.connect(popGain);
          popGain.connect(this.sfxGain);
          pop.start(now);
          pop.stop(now + 0.05);

          const whistle = ctx.createOscillator();
          const breath = ctx.createOscillator();
          const wGain = ctx.createGain();
          const bGain = ctx.createGain();
          whistle.type = 'sine';
          whistle.frequency.setValueAtTime(380, now + 0.012);
          whistle.frequency.exponentialRampToValueAtTime(1320, now + 0.23);

          breath.type = 'triangle';
          breath.frequency.setValueAtTime(760, now + 0.012);
          breath.frequency.exponentialRampToValueAtTime(2640, now + 0.23);

          wGain.gain.setValueAtTime(0.0001, now + 0.012);
          wGain.gain.linearRampToValueAtTime(0.22 * intensity, now + 0.035);
          wGain.gain.setValueAtTime(0.2 * intensity, now + 0.17);
          wGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

          bGain.gain.setValueAtTime(0.0001, now + 0.012);
          bGain.gain.linearRampToValueAtTime(0.055 * intensity, now + 0.035);
          bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

          whistle.connect(wGain);
          breath.connect(bGain);
          bGain.connect(wGain);
          wGain.connect(this.sfxGain);
          whistle.start(now + 0.012);
          breath.start(now + 0.012);
          whistle.stop(now + 0.27);
          breath.stop(now + 0.27);
          break;
        }

        case 'slip': {
          // Rapid banana-peel zip whistle + comic thud
          const zip = ctx.createOscillator();
          const zipGain = ctx.createGain();
          zip.type = 'sine';
          zip.frequency.setValueAtTime(620, now);
          zip.frequency.exponentialRampToValueAtTime(1880, now + 0.068);
          zip.frequency.exponentialRampToValueAtTime(410, now + 0.135);
          zipGain.gain.setValueAtTime(0.001, now);
          zipGain.gain.linearRampToValueAtTime(0.21 * intensity, now + 0.012);
          zipGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.145);
          zip.connect(zipGain);
          zipGain.connect(this.sfxGain);
          zip.start(now);
          zip.stop(now + 0.155);

          // Juicy comic landing thud
          const thudT = now + 0.125;
          const thud = ctx.createOscillator();
          const thudGain = ctx.createGain();
          thud.type = 'triangle';
          thud.frequency.setValueAtTime(185, thudT);
          thud.frequency.exponentialRampToValueAtTime(52, thudT + 0.095);
          thudGain.gain.setValueAtTime(0.001, thudT);
          thudGain.gain.linearRampToValueAtTime(0.32 * intensity, thudT + 0.006);
          thudGain.gain.exponentialRampToValueAtTime(0.0001, thudT + 0.11);
          thud.connect(thudGain);
          thudGain.connect(this.sfxGain);
          thud.start(thudT);
          thud.stop(thudT + 0.12);

          if (this.noiseBuffer) {
            const puff = ctx.createBufferSource();
            puff.buffer = this.noiseBuffer;
            const lp = ctx.createBiquadFilter();
            lp.type = 'lowpass';
            lp.frequency.setValueAtTime(650, thudT);
            const pGain = ctx.createGain();
            pGain.gain.setValueAtTime(0.001, thudT);
            pGain.gain.linearRampToValueAtTime(0.18 * intensity, thudT + 0.006);
            pGain.gain.exponentialRampToValueAtTime(0.0001, thudT + 0.07);
            puff.connect(lp);
            lp.connect(pGain);
            pGain.connect(this.sfxGain);
            puff.start(thudT, 0.1, 0.08);
          }
          break;
        }

        case 'sneeze_charge': {
          // Comical double-inhale gasps ("ha... HAAAH...")
          const gasps = [
            { offset: 0, fStart: 350, fEnd: 540, bpStart: 950, bpEnd: 2350, dur: 0.15, vol: 0.16 },
            { offset: 0.21, fStart: 420, fEnd: 690, bpStart: 1200, bpEnd: 2950, dur: 0.18, vol: 0.22 },
          ];
          for (const g of gasps) {
            const t = now + g.offset;
            const osc = ctx.createOscillator();
            const oGain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(g.fStart, t);
            osc.frequency.exponentialRampToValueAtTime(g.fEnd, t + g.dur);
            oGain.gain.setValueAtTime(0.0001, t);
            oGain.gain.linearRampToValueAtTime(g.vol * 0.55 * intensity, t + g.dur * 0.55);
            oGain.gain.exponentialRampToValueAtTime(0.0001, t + g.dur);
            osc.connect(oGain);
            oGain.connect(this.sfxGain);
            osc.start(t);
            osc.stop(t + g.dur + 0.02);

            if (this.noiseBuffer) {
              const nSrc = ctx.createBufferSource();
              nSrc.buffer = this.noiseBuffer;
              const bp = ctx.createBiquadFilter();
              bp.type = 'bandpass';
              bp.frequency.setValueAtTime(g.bpStart, t);
              bp.frequency.exponentialRampToValueAtTime(g.bpEnd, t + g.dur);
              bp.Q.setValueAtTime(2.6, t);
              const nGain = ctx.createGain();
              nGain.gain.setValueAtTime(0.0001, t);
              nGain.gain.linearRampToValueAtTime(g.vol * intensity, t + g.dur * 0.5);
              nGain.gain.exponentialRampToValueAtTime(0.0001, t + g.dur);
              nSrc.connect(bp);
              bp.connect(nGain);
              nGain.connect(this.sfxGain);
              nSrc.start(t, Math.random() * 0.5, g.dur + 0.03);
            }
          }
          break;
        }

        case 'sneeze_blast': {
          // Explosive filtered sneeze burst + downward pitch whoosh ("ACHOO!!")
          if (this.noiseBuffer) {
            // Crisp "CH-" consonant snap
            const chSrc = ctx.createBufferSource();
            chSrc.buffer = this.noiseBuffer;
            const chBp = ctx.createBiquadFilter();
            chBp.type = 'bandpass';
            chBp.frequency.setValueAtTime(3400, now);
            chBp.Q.setValueAtTime(1.8, now);
            const chGain = ctx.createGain();
            chGain.gain.setValueAtTime(0.001, now);
            chGain.gain.linearRampToValueAtTime(0.45 * intensity, now + 0.006);
            chGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
            chSrc.connect(chBp);
            chBp.connect(chGain);
            chGain.connect(this.sfxGain);
            chSrc.start(now, 0.15, 0.065);

            // Explosive "-OOOO!!" gust sweep
            const blastT = now + 0.022;
            const bSrc = ctx.createBufferSource();
            bSrc.buffer = this.noiseBuffer;
            const bFilter = ctx.createBiquadFilter();
            bFilter.type = 'bandpass';
            bFilter.frequency.setValueAtTime(2600, blastT);
            bFilter.frequency.exponentialRampToValueAtTime(380, blastT + 0.31);
            bFilter.Q.setValueAtTime(1.1, blastT);
            const bGain = ctx.createGain();
            bGain.gain.setValueAtTime(0.001, blastT);
            bGain.gain.linearRampToValueAtTime(0.54 * intensity, blastT + 0.018);
            bGain.gain.exponentialRampToValueAtTime(0.0001, blastT + 0.34);
            bSrc.connect(bFilter);
            bFilter.connect(bGain);
            bGain.connect(this.sfxGain);
            bSrc.start(blastT, 0.35, 0.36);
          }

          // Comical downward vocal whoosh
          const voice = ctx.createOscillator();
          const vFilter = ctx.createBiquadFilter();
          const vGain = ctx.createGain();
          voice.type = 'sawtooth';
          voice.frequency.setValueAtTime(640, now + 0.015);
          voice.frequency.exponentialRampToValueAtTime(165, now + 0.28);
          vFilter.type = 'bandpass';
          vFilter.frequency.setValueAtTime(1350, now + 0.015);
          vFilter.frequency.exponentialRampToValueAtTime(340, now + 0.28);
          vFilter.Q.setValueAtTime(2.2, now + 0.015);
          vGain.gain.setValueAtTime(0.001, now + 0.015);
          vGain.gain.linearRampToValueAtTime(0.24 * intensity, now + 0.032);
          vGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
          voice.connect(vFilter);
          vFilter.connect(vGain);
          vGain.connect(this.sfxGain);
          voice.start(now + 0.015);
          voice.stop(now + 0.32);

          // Slapstick shockwave sub-punch
          const punch = ctx.createOscillator();
          const pGain = ctx.createGain();
          punch.type = 'sine';
          punch.frequency.setValueAtTime(160, now + 0.015);
          punch.frequency.exponentialRampToValueAtTime(48, now + 0.14);
          pGain.gain.setValueAtTime(0.001, now + 0.015);
          pGain.gain.linearRampToValueAtTime(0.3 * intensity, now + 0.022);
          pGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.155);
          punch.connect(pGain);
          pGain.connect(this.sfxGain);
          punch.start(now + 0.015);
          punch.stop(now + 0.165);
          break;
        }

        case 'intruder_enter': {
          // Stage-specific intruder entrance SFX (dove, deer, oodama whistle, beach_ball boing)
          const lowerId = ev.npcId.toLowerCase();
          const isOodama =
            lowerId.includes('oodama') ||
            (!lowerId.includes('dove') &&
              !lowerId.includes('deer') &&
              !lowerId.includes('beach') &&
              this.currentStage === 'sports_day');
          const isBeachBall =
            lowerId.includes('beach') ||
            lowerId.includes('ball') ||
            (!lowerId.includes('dove') &&
              !lowerId.includes('deer') &&
              !lowerId.includes('oodama') &&
              this.currentStage === 'tropical_beach');
          const isDeer =
            lowerId.includes('deer') ||
            (!lowerId.includes('dove') &&
              !isOodama &&
              !isBeachBall &&
              this.currentStage === 'school_trip');

          if (isOodama) {
            // Energetic sports-day referee pea-whistle trill ("ピピーーーッ!!")
            const whistle = ctx.createOscillator();
            const pea = ctx.createOscillator();
            const peaGain = ctx.createGain();
            const wGain = ctx.createGain();

            whistle.type = 'sine';
            whistle.frequency.setValueAtTime(2850, now);
            whistle.frequency.setValueAtTime(2950, now + 0.12);

            pea.type = 'sine';
            pea.frequency.setValueAtTime(34, now);
            peaGain.gain.setValueAtTime(95, now);
            pea.connect(peaGain);
            peaGain.connect(whistle.frequency);

            wGain.gain.setValueAtTime(0.0001, now);
            wGain.gain.linearRampToValueAtTime(0.18 * intensity, now + 0.012);
            wGain.gain.linearRampToValueAtTime(0.02 * intensity, now + 0.085);
            wGain.gain.linearRampToValueAtTime(0.22 * intensity, now + 0.125);
            wGain.gain.setValueAtTime(0.2 * intensity, now + 0.28);
            wGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);

            whistle.connect(wGain);
            wGain.connect(this.sfxGain);
            whistle.start(now);
            pea.start(now);
            whistle.stop(now + 0.38);
            pea.stop(now + 0.38);
          } else if (isBeachBall) {
            // Playful bouncy beach-ball arrival boing!
            const osc = ctx.createOscillator();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(165, now);
            osc.frequency.exponentialRampToValueAtTime(490, now + 0.08);
            osc.frequency.exponentialRampToValueAtTime(260, now + 0.28);
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(17, now);
            lfoGain.gain.setValueAtTime(34, now);
            lfoGain.gain.exponentialRampToValueAtTime(6, now + 0.28);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            g.gain.setValueAtTime(0.001, now);
            g.gain.linearRampToValueAtTime(0.28 * intensity, now + 0.012);
            g.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
            osc.connect(g);
            g.connect(this.sfxGain);
            osc.start(now);
            lfo.start(now);
            osc.stop(now + 0.32);
            lfo.stop(now + 0.32);
          } else if (isDeer) {
            // Comical nasal deer bleat with vibrato
            const carrier = ctx.createOscillator();
            const vibrato = ctx.createOscillator();
            const vibGain = ctx.createGain();
            const formant = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            carrier.type = 'sawtooth';
            carrier.frequency.setValueAtTime(405, now);
            carrier.frequency.linearRampToValueAtTime(510, now + 0.09);
            carrier.frequency.exponentialRampToValueAtTime(355, now + 0.34);

            vibrato.type = 'sine';
            vibrato.frequency.setValueAtTime(19, now);
            vibGain.gain.setValueAtTime(24, now);
            vibrato.connect(vibGain);
            vibGain.connect(carrier.frequency);

            formant.type = 'bandpass';
            formant.frequency.setValueAtTime(1320, now);
            formant.frequency.linearRampToValueAtTime(1650, now + 0.12);
            formant.frequency.linearRampToValueAtTime(1080, now + 0.34);
            formant.Q.setValueAtTime(4.2, now);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.28 * intensity, now + 0.025);
            gain.gain.setValueAtTime(0.24 * intensity, now + 0.22);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.37);

            carrier.connect(formant);
            formant.connect(gain);
            gain.connect(this.sfxGain);

            carrier.start(now);
            vibrato.start(now);
            carrier.stop(now + 0.39);
            vibrato.stop(now + 0.39);
          } else {
            // Bubbly dove coo warble ("Kururu-pooo♪") + wing flutter
            const coo = ctx.createOscillator();
            const warble = ctx.createOscillator();
            const warbleGain = ctx.createGain();
            const cGain = ctx.createGain();

            coo.type = 'sine';
            coo.frequency.setValueAtTime(520, now);
            coo.frequency.linearRampToValueAtTime(590, now + 0.13);
            coo.frequency.setValueAtTime(660, now + 0.155);
            coo.frequency.exponentialRampToValueAtTime(505, now + 0.36);

            warble.type = 'sine';
            warble.frequency.setValueAtTime(28, now);
            warbleGain.gain.setValueAtTime(48, now);
            warbleGain.gain.setValueAtTime(48, now + 0.13);
            warbleGain.gain.linearRampToValueAtTime(10, now + 0.17);
            warble.connect(warbleGain);
            warbleGain.connect(coo.frequency);

            cGain.gain.setValueAtTime(0.0001, now);
            cGain.gain.linearRampToValueAtTime(0.22 * intensity, now + 0.025);
            cGain.gain.linearRampToValueAtTime(0.06 * intensity, now + 0.14);
            cGain.gain.linearRampToValueAtTime(0.25 * intensity, now + 0.175);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

            coo.connect(cGain);
            cGain.connect(this.sfxGain);
            coo.start(now);
            warble.start(now);
            coo.stop(now + 0.4);
            warble.stop(now + 0.4);

            // Soft wing-flap bursts
            if (this.noiseBuffer) {
              [0.02, 0.11, 0.2].forEach((offset) => {
                const ft = now + offset;
                const fSrc = ctx.createBufferSource();
                fSrc.buffer = this.noiseBuffer!;
                const fBp = ctx.createBiquadFilter();
                fBp.type = 'bandpass';
                fBp.frequency.setValueAtTime(820, ft);
                fBp.Q.setValueAtTime(1.5, ft);
                const fGain = ctx.createGain();
                fGain.gain.setValueAtTime(0.0001, ft);
                fGain.gain.linearRampToValueAtTime(0.11 * intensity, ft + 0.015);
                fGain.gain.exponentialRampToValueAtTime(0.0001, ft + 0.055);
                fSrc.connect(fBp);
                fBp.connect(fGain);
                fGain.connect(this.sfxGain!);
                fSrc.start(ft, 0.2, 0.065);
              });
            }
          }
          break;
        }

        case 'intruder_bonk': {
          // Cartoon bowling-pin BONK + scatter rattle
          const bonk = ctx.createOscillator();
          const bGain = ctx.createGain();
          bonk.type = 'triangle';
          bonk.frequency.setValueAtTime(340, now);
          bonk.frequency.exponentialRampToValueAtTime(105, now + 0.095);
          bGain.gain.setValueAtTime(0.001, now);
          bGain.gain.linearRampToValueAtTime(0.36 * intensity, now + 0.005);
          bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
          bonk.connect(bGain);
          bGain.connect(this.sfxGain);
          bonk.start(now);
          bonk.stop(now + 0.12);

          // Hollow wooden head-knock resonance
          this.playWoodblock(now, 740, 0.28 * intensity, this.sfxGain);

          // Bowling-pin scatter clatter cascade
          const pins = [
            { t: 0.048, f: 1320, v: 0.22 },
            { t: 0.098, f: 990, v: 0.19 },
            { t: 0.155, f: 1510, v: 0.16 },
            { t: 0.215, f: 1140, v: 0.13 },
          ];
          for (const pin of pins) {
            this.playWoodblock(now + pin.t, pin.f, pin.v * intensity, this.sfxGain);
          }
          break;
        }

        case 'lens_bomb': {
          // Dramatic Japanese variety-show brassy comedy sting ("ジャンッ！！")
          this.playBrassChord([58, 64, 67, 70, 74], now, 0.42, 0.24 * intensity, this.sfxGain);

          // Low dramatic timpani boom
          const boom = ctx.createOscillator();
          const boomGain = ctx.createGain();
          boom.type = 'sine';
          boom.frequency.setValueAtTime(145, now);
          boom.frequency.exponentialRampToValueAtTime(52, now + 0.26);
          boomGain.gain.setValueAtTime(0.001, now);
          boomGain.gain.linearRampToValueAtTime(0.34 * intensity, now + 0.01);
          boomGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.29);
          boom.connect(boomGain);
          boomGain.connect(this.sfxGain);
          boom.start(now);
          boom.stop(now + 0.31);

          // Crisp cymbal splash accent
          if (this.noiseBuffer) {
            const cym = ctx.createBufferSource();
            cym.buffer = this.noiseBuffer;
            const hp = ctx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.setValueAtTime(5200, now);
            const cGain = ctx.createGain();
            cGain.gain.setValueAtTime(0.001, now);
            cGain.gain.linearRampToValueAtTime(0.18 * intensity, now + 0.008);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
            cym.connect(hp);
            hp.connect(cGain);
            cGain.connect(this.sfxGain);
            cym.start(now, 0.4, 0.26);
          }
          break;
        }

        case 'wave_warning': {
          // Rising filtered ocean-swell whoosh warning ("ザザザザーッ…")
          if (this.noiseBuffer) {
            const swell = ctx.createBufferSource();
            swell.buffer = this.noiseBuffer;
            const lp = ctx.createBiquadFilter();
            lp.type = 'bandpass';
            lp.frequency.setValueAtTime(220, now);
            lp.frequency.exponentialRampToValueAtTime(1350, now + 0.82);
            lp.Q.setValueAtTime(1.15, now);

            const sGain = ctx.createGain();
            sGain.gain.setValueAtTime(0.0001, now);
            sGain.gain.linearRampToValueAtTime(0.32 * intensity, now + 0.56);
            sGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.88);

            swell.connect(lp);
            lp.connect(sGain);
            sGain.connect(this.sfxGain);
            swell.start(now, 0.05, 0.92);
          }

          // Low rising ocean-tide rumble
          const tide = ctx.createOscillator();
          const tGain = ctx.createGain();
          tide.type = 'sine';
          tide.frequency.setValueAtTime(68, now);
          tide.frequency.exponentialRampToValueAtTime(118, now + 0.78);
          tGain.gain.setValueAtTime(0.0001, now);
          tGain.gain.linearRampToValueAtTime(0.18 * intensity, now + 0.48);
          tGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
          tide.connect(tGain);
          tGain.connect(this.sfxGain);
          tide.start(now);
          tide.stop(now + 0.88);
          break;
        }

        case 'wave_crash': {
          // Huge frothy ocean splash: bandpass surf crash + white-water foam + bubbly spray!
          if (this.noiseBuffer) {
            // Main breaking wave crash
            const crash = ctx.createBufferSource();
            crash.buffer = this.noiseBuffer;
            const bp = ctx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.setValueAtTime(1550, now);
            bp.frequency.exponentialRampToValueAtTime(320, now + 0.68);
            bp.Q.setValueAtTime(0.85, now);

            const cGain = ctx.createGain();
            cGain.gain.setValueAtTime(0.001, now);
            cGain.gain.linearRampToValueAtTime(0.58 * intensity, now + 0.028);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.74);

            crash.connect(bp);
            bp.connect(cGain);
            cGain.connect(this.sfxGain);
            crash.start(now, 0.1, 0.78);

            // Frothy high-frequency white-water spray
            const foam = ctx.createBufferSource();
            foam.buffer = this.noiseBuffer;
            const hp = ctx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.setValueAtTime(3200, now + 0.02);

            const fGain = ctx.createGain();
            fGain.gain.setValueAtTime(0.0001, now + 0.02);
            fGain.gain.linearRampToValueAtTime(0.24 * intensity, now + 0.075);
            fGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.64);

            foam.connect(hp);
            hp.connect(fGain);
            fGain.connect(this.sfxGain);
            foam.start(now + 0.02, 0.35, 0.66);
          }

          // Water-wall impact boom
          const boom = ctx.createOscillator();
          const bGain = ctx.createGain();
          boom.type = 'sine';
          boom.frequency.setValueAtTime(118, now);
          boom.frequency.exponentialRampToValueAtTime(42, now + 0.25);
          bGain.gain.setValueAtTime(0.001, now);
          bGain.gain.linearRampToValueAtTime(0.36 * intensity, now + 0.015);
          bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
          boom.connect(bGain);
          bGain.connect(this.sfxGain);
          boom.start(now);
          boom.stop(now + 0.3);

          // Bubbly spray droplet pops
          const bubbles = [
            { t: 0.06, f1: 420, f2: 920 },
            { t: 0.12, f1: 580, f2: 1240 },
            { t: 0.19, f1: 480, f2: 1060 },
            { t: 0.27, f1: 660, f2: 1380 },
            { t: 0.36, f1: 520, f2: 1120 },
          ];
          for (const b of bubbles) {
            const bt = now + b.t;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(b.f1, bt);
            osc.frequency.exponentialRampToValueAtTime(b.f2, bt + 0.055);
            g.gain.setValueAtTime(0.0001, bt);
            g.gain.linearRampToValueAtTime(0.11 * intensity, bt + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, bt + 0.065);
            osc.connect(g);
            g.connect(this.sfxGain);
            osc.start(bt);
            osc.stop(bt + 0.075);
          }
          break;
        }

        case 'kusudama_pop': {
          // Crisp party-popper crack + celebratory rising glockenspiel confetti sparkle!
          if (this.noiseBuffer) {
            const crack = ctx.createBufferSource();
            crack.buffer = this.noiseBuffer;
            const bp = ctx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.setValueAtTime(2600, now);
            bp.Q.setValueAtTime(1.2, now);
            const cGain = ctx.createGain();
            cGain.gain.setValueAtTime(0.001, now);
            cGain.gain.linearRampToValueAtTime(0.56 * intensity, now + 0.004);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);
            crack.connect(bp);
            bp.connect(cGain);
            cGain.connect(this.sfxGain);
            crack.start(now, 0.08, 0.075);
          }

          // Punchy cork-pop snap
          const pop = ctx.createOscillator();
          const pGain = ctx.createGain();
          pop.type = 'sine';
          pop.frequency.setValueAtTime(360, now);
          pop.frequency.exponentialRampToValueAtTime(92, now + 0.042);
          pGain.gain.setValueAtTime(0.001, now);
          pGain.gain.linearRampToValueAtTime(0.38 * intensity, now + 0.004);
          pGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.052);
          pop.connect(pGain);
          pGain.connect(this.sfxGain);
          pop.start(now);
          pop.stop(now + 0.06);

          // Celebratory rising glockenspiel confetti sparkle cascade
          const sparkles = [76, 79, 84, 88, 91, 96, 100];
          sparkles.forEach((midi, idx) => {
            this.playMarimbaNote(
              midiToHz(midi),
              now + 0.045 + idx * 0.04,
              idx === sparkles.length - 1 ? 0.45 : 0.2,
              (idx === sparkles.length - 1 ? 0.3 : 0.22) * intensity,
              true,
              this.sfxGain!,
            );
          });
          this.playWarmChordPluck([72, 76, 79, 86], now + 0.16, 0.42, 0.14 * intensity, this.sfxGain);
          break;
        }

        case 'ball_boing': {
          // Giant comical rubbery spring BOING!! (140Hz -> 520Hz -> 240Hz pitch-modulated bounce)
          const main = ctx.createOscillator();
          const harmonic = ctx.createOscillator();
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          const mainGain = ctx.createGain();
          const harmGain = ctx.createGain();

          main.type = 'sine';
          main.frequency.setValueAtTime(140, now);
          main.frequency.exponentialRampToValueAtTime(520, now + 0.075);
          main.frequency.exponentialRampToValueAtTime(240, now + 0.34);

          harmonic.type = 'triangle';
          harmonic.frequency.setValueAtTime(280, now);
          harmonic.frequency.exponentialRampToValueAtTime(1040, now + 0.075);
          harmonic.frequency.exponentialRampToValueAtTime(480, now + 0.34);

          lfo.type = 'sine';
          lfo.frequency.setValueAtTime(19, now);
          lfoGain.gain.setValueAtTime(52, now);
          lfoGain.gain.exponentialRampToValueAtTime(8, now + 0.34);
          lfo.connect(lfoGain);
          lfoGain.connect(main.frequency);
          lfoGain.connect(harmonic.frequency);

          mainGain.gain.setValueAtTime(0.001, now);
          mainGain.gain.linearRampToValueAtTime(0.36 * intensity, now + 0.01);
          mainGain.gain.setValueAtTime(0.3 * intensity, now + 0.14);
          mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

          harmGain.gain.setValueAtTime(0.001, now);
          harmGain.gain.linearRampToValueAtTime(0.12 * intensity, now + 0.012);
          harmGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

          main.connect(mainGain);
          harmonic.connect(harmGain);
          harmGain.connect(mainGain);
          mainGain.connect(this.sfxGain);

          main.start(now);
          harmonic.start(now);
          lfo.start(now);
          main.stop(now + 0.4);
          harmonic.stop(now + 0.4);
          lfo.stop(now + 0.4);

          // Rubber ball impact slap thump
          const slap = ctx.createOscillator();
          const slapGain = ctx.createGain();
          slap.type = 'triangle';
          slap.frequency.setValueAtTime(210, now);
          slap.frequency.exponentialRampToValueAtTime(72, now + 0.055);
          slapGain.gain.setValueAtTime(0.001, now);
          slapGain.gain.linearRampToValueAtTime(0.28 * intensity, now + 0.004);
          slapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);
          slap.connect(slapGain);
          slapGain.connect(this.sfxGain);
          slap.start(now);
          slap.stop(now + 0.075);
          break;
        }
      }
    } catch {
      // Safe no-op
    }
  }

  /**
   * Celebratory rank fanfare tailored to PhotoRank (triumphant S+/S to comedic C wah-wah).
   */
  public playResultFanfare(rank: PhotoRank): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain) return;

    try {
      const now = ctx.currentTime + 0.02;

      if (rank === 'S+') {
        const arp = [72, 76, 79, 84, 88, 91, 96];
        arp.forEach((m, i) => {
          this.playMarimbaNote(
            midiToHz(m),
            now + i * 0.065,
            i === arp.length - 1 ? 0.7 : 0.25,
            0.28,
            true,
            this.sfxGain!,
          );
        });
        this.playBrassChord([60, 64, 67, 71, 74], now + 0.36, 0.85, 0.18, this.sfxGain);
      } else if (rank === 'S') {
        const seq = [72, 76, 79, 84];
        seq.forEach((m, i) => {
          this.playMarimbaNote(
            midiToHz(m),
            now + i * 0.08,
            i === 3 ? 0.6 : 0.24,
            0.28,
            true,
            this.sfxGain!,
          );
        });
        this.playBrassChord([60, 64, 67, 72], now + 0.24, 0.7, 0.16, this.sfxGain);
      } else if (rank === 'A') {
        const seq = [72, 74, 76, 79];
        seq.forEach((m, i) => {
          this.playMarimbaNote(
            midiToHz(m),
            now + i * 0.085,
            i === 3 ? 0.45 : 0.22,
            0.26,
            false,
            this.sfxGain!,
          );
        });
        this.playWarmChordPluck([60, 64, 67, 72], now + 0.26, 0.45, 0.16, this.sfxGain);
      } else if (rank === 'B') {
        const seq = [67, 72, 76];
        seq.forEach((m, i) => {
          this.playMarimbaNote(
            midiToHz(m),
            now + i * 0.1,
            i === 2 ? 0.42 : 0.22,
            0.24,
            false,
            this.sfxGain!,
          );
        });
      } else {
        // C rank: playful comedic wah-wah-wah-waaaah!
        const wahNotes = [62, 61, 60, 59];
        wahNotes.forEach((m, i) => {
          const t = now + i * 0.22;
          const dur = i === 3 ? 0.55 : 0.19;
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          const hz = midiToHz(m);
          osc.frequency.setValueAtTime(hz, t);
          if (i === 3) {
            osc.frequency.linearRampToValueAtTime(hz * 0.92, t + dur);
          }

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1100, t);
          filter.frequency.exponentialRampToValueAtTime(420, t + dur);

          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.linearRampToValueAtTime(0.15, t + 0.025);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(t);
          osc.stop(t + dur + 0.03);
        });
      }
    } catch {
      // Safe no-op
    }
  }

  private playBrassChord(
    midis: number[],
    time: number,
    duration: number,
    volume: number,
    dest: AudioNode,
  ): void {
    if (!this.ctx) return;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, time);
    filter.frequency.exponentialRampToValueAtTime(2400, time + 0.09);
    filter.frequency.exponentialRampToValueAtTime(1200, time + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.045);
    gain.gain.setValueAtTime(volume * 0.85, time + duration * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    filter.connect(gain);
    gain.connect(dest);

    for (const m of midis) {
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(midiToHz(m), time);
      osc.connect(filter);
      osc.start(time);
      osc.stop(time + duration + 0.04);
    }
  }

  public dispose(): void {
    this.disposed = true;
    this.stopBgm();
    if (this.ctx) {
      try {
        this.ctx.close().catch(() => {});
      } catch {
        // Ignore
      }
      this.ctx = null;
    }
    this.masterGain = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.noiseBuffer = null;
  }
}
