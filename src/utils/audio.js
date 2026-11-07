// Web Audio API futuristic sound synthesizer for NASA Mission Control aesthetic
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.ambientOsc = null;
    this.ambientGain = null;
    this.isAmbientPlaying = false;
    this.soundEnabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Futuristic HUD Beep
  playBeep(freq = 880, type = 'sine', duration = 0.08) {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  }

  // Warp trajectory sound
  playWarp() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Silent fallback
    }
  }

  // Subtle ambient cosmic drone toggle (NASA Mission frequency 1420.405 Hz scaled down)
  toggleAmbient(callback) {
    try {
      this.init();
      if (!this.ctx) return false;

      if (this.isAmbientPlaying) {
        if (this.ambientGain) {
          this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
          setTimeout(() => {
            if (this.ambientOsc) {
              this.ambientOsc.stop();
              this.ambientOsc.disconnect();
              this.ambientOsc = null;
            }
            this.isAmbientPlaying = false;
            if (callback) callback(false);
          }, 500);
        }
        return false;
      } else {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(70, this.ctx.currentTime); // Low deep space drone

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.02, this.ctx.currentTime + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        this.ambientOsc = osc;
        this.ambientGain = gain;
        this.isAmbientPlaying = true;
        if (callback) callback(true);
        return true;
      }
    } catch {
      return false;
    }
  }
}

export const sound = new SoundSynthesizer();

