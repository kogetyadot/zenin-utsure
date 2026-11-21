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
  style: 'wedding' | 'school_trip';
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

const BGM_TRACKS: Record<StageId, BgmTrackDef> = {
  wedding: WEDDING_BGM,
  school_trip: SCHOOL_TRIP_BGM,
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

    // 1. Melody (warm marimba / glockenspiel)
    const melMidi = track.melody[step];
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
    const bassMidi = track.bass[step];
    if (bassMidi > 0) {
      this.playBassNote(midiToHz(bassMidi), time, eighthSec * 1.6, 0.42, this.bgmGain);
    }

    // 3. Off-beat acoustic strum chord (ukulele / pizzicato feel)
    if (step % 2 === 1) {
      const chordIdx = Math.floor(step / 4) % track.chords.length;
      const chord = track.chords[chordIdx];
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
