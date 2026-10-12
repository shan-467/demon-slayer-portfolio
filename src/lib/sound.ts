// Procedural ambient wind + low drone via WebAudio (no external files).
let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function build() {
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const len = ctx.sampleRate * 4;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
  const noise = ctx.createBufferSource();
  noise.buffer = buf; noise.loop = true;
  const filt = ctx.createBiquadFilter();
  filt.type = "lowpass"; filt.frequency.value = 500;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.08;
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 300;
  lfo.connect(lfoGain).connect(filt.frequency);
  noise.connect(filt).connect(master);

  const drone = ctx.createOscillator(); drone.type = "sine"; drone.frequency.value = 55;
  const dg = ctx.createGain(); dg.gain.value = 0.18;
  drone.connect(dg).connect(master);
  noise.start(); lfo.start(); drone.start();
}

export function setSound(on: boolean) {
  if (on && !ctx) build();
  if (!ctx || !master) return;
  if (on) ctx.resume();
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.linearRampToValueAtTime(on ? 0.35 : 0, ctx.currentTime + 1.2);
}
