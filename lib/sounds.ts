// ── Sound Effects (Web Audio API — no external files needed) ────────────────

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", gain = 0.3) {
  const ctx = getCtx();
  if (!ctx) return;
  // Resume context if suspended (autoplay policy)
  if (ctx.state === "suspended") ctx.resume();

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playChord(freqs: number[], duration: number, type: OscillatorType = "sine", gain = 0.15) {
  for (const f of freqs) playTone(f, duration, type, gain);
}

/** Short satisfying "ding" for correct answers */
export function playCorrect() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  // Rising two-note chime
  playTone(587, 0.12, "sine", 0.25); // D5
  setTimeout(() => playTone(880, 0.2, "sine", 0.2), 80); // A5
}

/** Soft "boop" for incorrect answers */
export function playIncorrect() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  playTone(220, 0.25, "triangle", 0.2); // A3 low
}

/** Celebratory ascending arpeggio for level up */
export function playLevelUp() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.3, "sine", 0.2), i * 100);
  });
  // Final chord
  setTimeout(() => playChord([523, 659, 784, 1047], 0.5, "sine", 0.1), 400);
}

/** Achievement unlock — sparkly descending + chord */
export function playAchievement() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const notes = [1047, 1319, 1568, 2093]; // C6, E6, G6, C7
  notes.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.15, "sine", 0.15), i * 60);
  });
  setTimeout(() => playChord([784, 988, 1175], 0.6, "sine", 0.1), 280);
}

/** Streak continuation — warm rising tone */
export function playStreak() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  playTone(392, 0.15, "sine", 0.2); // G4
  setTimeout(() => playTone(494, 0.15, "sine", 0.2), 100); // B4
  setTimeout(() => playTone(587, 0.25, "sine", 0.2), 200); // D5
}

/** Quiz complete — triumphant fanfare */
export function playQuizComplete() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const melody = [523, 659, 784, 1047, 784, 1047]; // C E G C G C
  melody.forEach((n, i) => {
    setTimeout(() => playTone(n, 0.2, "sine", 0.18), i * 120);
  });
}

/** XP tick sound — subtle pop */
export function playXpTick() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  playTone(1200, 0.06, "sine", 0.12);
}
