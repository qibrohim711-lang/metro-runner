const smooth = x => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };

export class JetpackFlight {
  constructor() { this.reset(); }
  reset() {
    this.state = 'running'; this.remaining = 0; this.clock = 0; this.height = 0;
    this.startHeight = 0; this.alpha = 0; this.startAlpha = 0; this.grace = 0;
  }
  collect(seconds = 8, height = 0) {
    if (this.state === 'running') {
      this.remaining = seconds; this.state = 'transformingToAstronaut';
      this.clock = 0; this.startHeight = height; this.startAlpha = 0;
    } else {
      this.remaining += seconds;
      // A pickup during ordinary flight only extends time, without restarting FX.
      if (this.state === 'transformingBack' || this.state === 'landing') {
        this.state = 'transformingToAstronaut'; this.clock = 0;
        this.startHeight = this.height; this.startAlpha = this.alpha;
      }
    }
  }
  update(dt) {
    this.grace = Math.max(0, this.grace - dt);
    if (!this.active) return;
    this.remaining = Math.max(0, this.remaining - dt); this.clock += dt;
    if (this.state === 'transformingToAstronaut') {
      const t = smooth(this.clock / .8);
      this.height = this.startHeight + (7 - this.startHeight) * t;
      this.alpha = this.startAlpha + (1 - this.startAlpha) * t;
      if (this.clock >= .8) { this.state = 'flying'; this.clock = 0; this.height = 7; this.alpha = 1; }
    } else if (this.state === 'flying') {
      this.height = 7; this.alpha = 1;
      if (this.remaining <= .95) { this.state = 'transformingBack'; this.clock = 0; this.startHeight = this.height; }
    } else if (this.state === 'transformingBack') {
      const t = smooth(this.clock / .95);
      this.height = this.startHeight * (1 - t); this.alpha = 1 - t;
      if (this.clock >= .95) {
        this.state = 'landing'; this.clock = 0; this.height = 0; this.alpha = 0;
        this.remaining = 0; this.grace = 1.5;
      }
    } else if (this.state === 'landing' && this.clock >= .26) {
      this.state = 'running'; this.clock = 0;
    }
  }
  get active() { return this.state !== 'running'; }
  get protected() { return this.active || this.grace > 0; }
  get clearingLanding() { return ['transformingBack', 'landing'].includes(this.state); }
  get energy() {
    return this.state === 'transformingToAstronaut' ? Math.sin(Math.PI * Math.min(1, this.clock / .8))
      : this.state === 'transformingBack' ? Math.sin(Math.PI * Math.min(1, this.clock / .95)) : 0;
  }
  get thrust() {
    return this.state === 'landing' || !this.active ? 0 : this.alpha * Math.min(1, this.remaining / 1.6);
  }
}
