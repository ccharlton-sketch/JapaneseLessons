let cachedVoice: SpeechSynthesisVoice | null = null;

function getJapaneseVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferred = [
    "com.apple.voice.enhanced.ja-JP.Kyoko",
    "com.apple.voice.enhanced.ja-JP.Otoya",
    "com.apple.ttsbundle.Kyoko-compact",
    "com.apple.ttsbundle.Otoya-compact",
    "Microsoft Haruka Desktop - Japanese",
    "Google 日本語",
  ];

  for (const name of preferred) {
    const match = voices.find((v) => v.voiceURI === name || v.name === name);
    if (match) { cachedVoice = match; return match; }
  }

  // Fall back to any ja-JP voice
  const fallback = voices.find((v) => v.lang === "ja-JP") ?? null;
  cachedVoice = fallback;
  return fallback;
}

export function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.8;

  const voice = getJapaneseVoice();
  if (voice) utterance.voice = voice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// Voices load async on first page load — reset cache so next speak() re-selects
if (typeof window !== "undefined") {
  window.speechSynthesis.onvoiceschanged = () => { cachedVoice = null; };
}
