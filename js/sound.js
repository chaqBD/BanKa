// Tiny synthesized sound effects via the Web Audio API — no audio files,
// keeps BanKa a single shareable link. Muted state persists in localStorage.

const SoundFX = {
  ctx: null,
  muted: false,
  MUTE_KEY: 'banka_muted',

  init() {
    try { this.muted = localStorage.getItem(this.MUTE_KEY) === '1'; } catch (e) { this.muted = false; }
  },

  ensureContext() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  },

  toggleMute() {
    this.muted = !this.muted;
    try { localStorage.setItem(this.MUTE_KEY, this.muted ? '1' : '0'); } catch (e) { /* ignore */ }
    return this.muted;
  },

  tone(freq, startTime, duration, type, gain) {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    amp.gain.setValueAtTime(0, ctx.currentTime + startTime);
    amp.gain.linearRampToValueAtTime(gain || 0.15, ctx.currentTime + startTime + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration);
    osc.connect(amp).connect(ctx.destination);
    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration + 0.02);
  },

  playClick() {
    this.tone(320, 0, 0.05, 'square', 0.08);
  },

  // A short low thud, like a rubber stamp hitting paper.
  playStamp() {
    this.tone(90, 0, 0.12, 'square', 0.25);
    this.tone(70, 0.02, 0.15, 'triangle', 0.2);
  },

  playRating(rating) {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    if (rating === 'A') {
      this.tone(523.25, 0, 0.18, 'sine', 0.15); // C5
      this.tone(659.25, 0.12, 0.25, 'sine', 0.15); // E5
    } else if (rating === 'B') {
      this.tone(440, 0, 0.2, 'sine', 0.15); // A4
    } else if (rating === 'C') {
      this.tone(330, 0, 0.1, 'sawtooth', 0.1);
      this.tone(311, 0.1, 0.18, 'sawtooth', 0.1);
    } else {
      this.tone(196, 0, 0.3, 'sawtooth', 0.15); // G3
      this.tone(146.8, 0.15, 0.35, 'sawtooth', 0.15); // D3
    }
  },

  playPromotion() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, i * 0.09, 0.2, 'sine', 0.14));
  }
};

SoundFX.init();
