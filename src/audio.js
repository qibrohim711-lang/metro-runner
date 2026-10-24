let ctx;
export function unlock(){try{ctx??=new AudioContext();ctx.resume()}catch{}}
export function sound(kind,enabled){if(!enabled||!ctx)return;const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);const t=ctx.currentTime;const f={coin:980,jump:320,hit:95,button:540,power:650}[kind]||440;o.type=kind==='hit'?'sawtooth':'sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(kind==='hit'?40:f*1.7,t+.12);g.gain.setValueAtTime(.055,t);g.gain.exponentialRampToValueAtTime(.001,t+.18);o.start();o.stop(t+.2)}
