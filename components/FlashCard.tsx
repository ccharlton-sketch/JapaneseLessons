"use client";
import { useState, useEffect, useRef } from "react";
import { Word, checkAnswer } from "@/data/words";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import KanaKeyboard from "@/components/KanaKeyboard";
import { speak } from "@/lib/speech";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import { Volume2, Mic } from "lucide-react";

type Mode = "jp-to-en" | "en-to-jp";
type InputMode = "type" | "multiple-choice" | "speak";

interface Props {
  word: Word;
  mode: Mode;
  inputMode: InputMode;
  choices?: string[];
  ttsEnabled: boolean;
  onResult: (correct: boolean) => void;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, "");
}

function checkSpokenAnswer(transcript: string, word: Word): boolean {
  // transcript may contain pipe-separated alternatives from maxAlternatives
  const candidates = transcript.split("|").map(normalize);
  const targets = [normalize(word.japanese), normalize(word.reading)];
  return candidates.some((c) => targets.some((t) => t === c || t.includes(c) || c.includes(t)));
}

export default function FlashCard({ word, mode, inputMode, choices, ttsEnabled, onResult }: Props) {
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { state: recState, transcript, start: startListening, reset: resetRec } = useSpeechRecognition();

  useEffect(() => {
    setShowHint(false);
    setAnswer("");
    setSubmitted(false);
    setCorrect(false);
    setShowKeyboard(false);
    resetRec();
  }, [word.id]);

  // Auto-submit when recognition finishes
  useEffect(() => {
    if (inputMode === "speak" && recState === "done" && transcript && !submitted) {
      const isCorrect = checkSpokenAnswer(transcript, word);
      setCorrect(isCorrect);
      setSubmitted(true);
      if (ttsEnabled) speak(word.reading);
    }
  }, [recState, transcript, inputMode, submitted, word, ttsEnabled]);

  function handleSubmit(chosen?: string) {
    const val = chosen ?? answer;
    if (!val.trim()) return;
    let isCorrect: boolean;
    if (mode === "jp-to-en") {
      isCorrect = checkAnswer(val, word.english);
    } else {
      isCorrect = val.trim() === word.japanese || val.trim() === word.reading;
    }
    setCorrect(isCorrect);
    setSubmitted(true);
    if (ttsEnabled) speak(word.reading);
  }

  function handleNext() {
    onResult(correct);
  }

  function insertKana(char: string) {
    setAnswer((prev) => prev + char);
    inputRef.current?.focus();
  }

  function backspaceKana() {
    setAnswer((prev) => prev.slice(0, -1));
    inputRef.current?.focus();
  }

  const prompt = mode === "jp-to-en" ? word.japanese : word.english[0];
  const promptLabel =
    inputMode === "speak"
      ? "Pronounce this in Japanese"
      : mode === "jp-to-en"
      ? "What does this mean?"
      : "How do you write this in Japanese?";
  const correctAnswer = mode === "jp-to-en" ? word.english[0] : word.japanese;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto animate-fade-in">
      <Card className="text-center card-elevated overflow-hidden">
        <CardContent className="pt-8 pb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
          <div className="relative">
            <div className="text-xs font-medium text-muted-foreground mb-4 tracking-wide">{promptLabel}</div>

            <button
              onClick={() => ttsEnabled && speak(mode === "jp-to-en" ? word.reading : word.english[0])}
              title={ttsEnabled ? "Click to hear pronunciation" : "Pronunciation is muted"}
              className={`font-bold mb-2 select-none transition-press ${
                ttsEnabled ? "cursor-pointer hover:text-primary active:scale-[0.97]" : "cursor-default"
              } ${mode === "jp-to-en" ? "text-6xl font-japanese block w-full" : "text-3xl block w-full"}`}
            >
              {prompt}
              {ttsEnabled && (
                <span className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-3 font-normal normal-case tracking-normal">
                  <Volume2 className="size-3" strokeWidth={1.5} /> tap to hear
                </span>
              )}
            </button>

            {inputMode === "speak" && (
              <p className="text-xs text-muted-foreground mt-1">
                Say <span className="font-japanese font-semibold">{word.japanese}</span> ({word.reading})
              </p>
            )}

            <Badge variant="secondary" className="text-xs capitalize mt-3">{word.category}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Hint */}
      {!submitted && (
        <div className="text-center">
          {showHint ? (
            <p className="text-sm text-muted-foreground italic">Hint: {word.hint}</p>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-xs text-primary underline underline-offset-2"
            >
              Show hint
            </button>
          )}
        </div>
      )}

      {/* Answer area */}
      {!submitted ? (
        inputMode === "speak" ? (
          <div className="flex flex-col items-center gap-3">
            {recState === "unsupported" ? (
              <p className="text-sm text-destructive text-center">
                Speech recognition is not supported in this browser. Try Chrome or Edge.
              </p>
            ) : (
              <>
                <button
                  onClick={startListening}
                  disabled={recState === "listening"}
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-md transition-press ${
                    recState === "listening"
                      ? "border-red-500 bg-red-50 dark:bg-red-950/30 animate-[pulse-mic_1.5s_ease-in-out_infinite]"
                      : "border-primary bg-background hover:bg-primary/5 active:scale-[0.97]"
                  }`}
                >
                  <Mic className="size-8 text-current" strokeWidth={1.5} />
                </button>
                <p className="text-sm text-muted-foreground">
                  {recState === "listening" ? "Listening…" : "Tap to speak"}
                </p>
              </>
            )}
          </div>
        ) : inputMode === "multiple-choice" && choices ? (
          <div className="grid grid-cols-2 gap-3">
            {choices.map((c, i) => (
              <button
                key={c}
                onClick={() => handleSubmit(c)}
                className={`animate-fade-up stagger-${i + 1} rounded-xl border bg-card py-3.5 px-4 text-sm font-medium card-elevated hover:card-elevated-hover hover:border-primary/50 hover-lift active:scale-[0.97] text-left ${
                  mode === "en-to-jp" ? "font-japanese text-center text-lg" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder={mode === "jp-to-en" ? "Type the English meaning…" : "Type in kana…"}
                className={`flex-1 text-lg ${mode === "en-to-jp" ? "font-japanese" : ""}`}
                autoFocus
              />
              {mode === "en-to-jp" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowKeyboard((s) => !s)}
                  title="Open kana keyboard"
                >
                  あ
                </Button>
              )}
            </div>
            {mode === "en-to-jp" && showKeyboard && (
              <KanaKeyboard onInsert={insertKana} onBackspace={backspaceKana} />
            )}
            <Button onClick={() => handleSubmit()} disabled={!answer.trim()}>
              Check Answer
            </Button>
          </div>
        )
      ) : (
        <Card
          className={`animate-fade-up text-center border ${
            correct ? "border-green-500/50 bg-green-50/80 dark:bg-green-950/30" : "border-red-400/50 bg-red-50/80 dark:bg-red-950/30"
          }`}
        >
          <CardContent className="py-4">
            <div className="text-2xl mb-1">{correct ? "✓ Correct!" : "✗ Incorrect"}</div>
            {inputMode === "speak" && transcript && (
              <p className="text-xs text-muted-foreground mb-2">
                You said: <span className="font-japanese">{transcript.split("|")[0]}</span>
              </p>
            )}
            {!correct && (
              <div className="text-sm text-muted-foreground mb-2">
                Correct answer:{" "}
                <button
                  onClick={() => speak(word.reading)}
                  className="font-semibold hover:opacity-70 underline underline-offset-2 cursor-pointer font-japanese"
                  title="Click to hear"
                >
                  {inputMode === "speak" ? word.japanese : correctAnswer}
                </button>
                {mode === "jp-to-en" && word.english.length > 1 && inputMode !== "speak" && (
                  <span className="ml-1 text-xs">(also: {word.english.slice(1).join(", ")})</span>
                )}
              </div>
            )}
            <Button onClick={handleNext} className="mt-3" variant={correct ? "default" : "outline"}>
              Next Card →
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
