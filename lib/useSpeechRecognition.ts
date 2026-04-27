"use client";
import { useRef, useState } from "react";

export type RecognitionState = "idle" | "listening" | "done" | "unsupported";

interface UseSpeechRecognitionResult {
  state: RecognitionState;
  transcript: string;
  start: () => void;
  reset: () => void;
}

// SpeechRecognition is not in the standard TS lib — declare it minimally
interface SRAlternative { transcript: string }
interface SRResult { [index: number]: SRAlternative; length: number }
interface SRResultList { [index: number]: SRResult; length: number }
interface SREvent { results: SRResultList }

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  abort(): void;
  onresult: ((e: SREvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

export function useSpeechRecognition(): UseSpeechRecognitionResult {
  const [state, setState] = useState<RecognitionState>(() => {
    if (typeof window === "undefined") return "idle";
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window
      ? "idle"
      : "unsupported";
  });
  const [transcript, setTranscript] = useState("");
  const recRef = useRef<SpeechRecognitionInstance | null>(null);

  function start() {
    if (state === "unsupported") return;

    const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.lang = "ja-JP";
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    recRef.current = rec;

    setState("listening");
    setTranscript("");

    rec.onresult = (e: SREvent) => {
      const best = Array.from(e.results[0])
        .map((alt) => alt.transcript.trim())
        .join("|");
      setTranscript(best);
      setState("done");
    };

    rec.onerror = () => setState("done");
    rec.onend = () => setState((s) => (s === "listening" ? "done" : s));

    rec.start();
  }

  function reset() {
    recRef.current?.abort();
    setTranscript("");
    setState((s) => (s === "unsupported" ? "unsupported" : "idle"));
  }

  return { state, transcript, start, reset };
}
