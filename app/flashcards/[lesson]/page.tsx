"use client";
import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { sampleWords, getWordsByLesson, Word } from "@/data/words";
import {
  loadProgress,
  saveProgress,
  recordAnswer,
  computeLessonScore,
  maybeUnlockNext,
  AppProgress,
} from "@/lib/progress";
import { useTTSPreference } from "@/lib/useTTSPreference";
import FlashCard from "@/components/FlashCard";
import QuestionCountPicker from "@/components/QuestionCountPicker";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type Mode = "jp-to-en" | "en-to-jp";
type InputMode = "type" | "multiple-choice" | "speak";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(word: Word, pool: Word[], mode: Mode): string[] {
  const correct = mode === "jp-to-en" ? word.english[0] : word.japanese;
  const distractors = shuffle(
    pool.filter((w) => w.id !== word.id).map((w) => (mode === "jp-to-en" ? w.english[0] : w.japanese))
  ).slice(0, 3);
  return shuffle([correct, ...distractors]);
}

export default function FlashcardsPage() {
  const { lesson } = useParams<{ lesson: string }>();
  const lessonNum = Number(lesson);
  const router = useRouter();
  const { enabled: ttsEnabled, toggle: toggleTTS } = useTTSPreference();

  const fullPool = getWordsByLesson(lessonNum);
  const maxQuestions = fullPool.length;

  // Config state
  const [questionCount, setQuestionCount] = useState(Math.min(10, maxQuestions));
  const [mode, setMode] = useState<Mode>("jp-to-en");
  const [inputMode, setInputMode] = useState<InputMode>("multiple-choice");
  const [started, setStarted] = useState(false);

  // Quiz state
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState<AppProgress>(() => loadProgress());
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [done, setDone] = useState(false);

  const effectiveMode: Mode = inputMode === "speak" ? "en-to-jp" : mode;

  function startQuiz() {
    setAllWords(sampleWords(lessonNum, questionCount));
    setIndex(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setDone(false);
    setStarted(true);
  }

  const currentWord = allWords[index];
  const choices = currentWord && inputMode === "multiple-choice"
    ? buildChoices(currentWord, fullPool, effectiveMode)
    : undefined;

  const handleResult = useCallback(
    (correct: boolean) => {
      const newProgress = recordAnswer(progress, currentWord.id, correct);
      const score = computeLessonScore(newProgress, allWords);
      const finalProgress = maybeUnlockNext(newProgress, lessonNum, score);
      finalProgress.lessons[lessonNum] = { ...finalProgress.lessons[lessonNum], score };
      saveProgress(finalProgress);
      setProgress(finalProgress);
      setSessionCorrect((c) => c + (correct ? 1 : 0));
      setSessionTotal((t) => t + 1);
      if (index + 1 >= allWords.length) setDone(true);
      else setIndex((i) => i + 1);
    },
    [progress, currentWord, allWords, lessonNum, index]
  );

  if (!maxQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No words found for lesson {lessonNum}.</p>
      </div>
    );
  }

  // ── Setup screen ──────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground text-sm">
              ← Back
            </button>
            <span className="font-semibold flex-1">Lesson {lessonNum}</span>
            <button
              onClick={toggleTTS}
              title={ttsEnabled ? "Mute pronunciation" : "Unmute pronunciation"}
              className={`text-lg leading-none transition-opacity ${ttsEnabled ? "opacity-100" : "opacity-30"}`}
            >
              🔊
            </button>
          </div>
        </header>
        <div className="max-w-sm mx-auto px-4 py-10 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-center">Quiz Settings</h2>

          <div className="space-y-2">
            <p className="text-sm font-medium">Direction</p>
            <div className="flex rounded-lg border overflow-hidden text-sm">
              {(["jp-to-en", "en-to-jp"] as Mode[]).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex-1 px-3 py-2 transition-colors ${inputMode === "speak" ? "opacity-40 cursor-not-allowed" : ""} ${mode === m && inputMode !== "speak" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
                  disabled={inputMode === "speak"}
                >
                  {m === "jp-to-en" ? "JP → EN" : "EN → JP"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Input mode</p>
            <div className="flex rounded-lg border overflow-hidden text-sm">
              {(["multiple-choice", "type", "speak"] as InputMode[]).map((im) => (
                <button key={im} onClick={() => setInputMode(im)}
                  className={`flex-1 px-3 py-2 transition-colors ${inputMode === im ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
                >
                  {im === "multiple-choice" ? "Choice" : im === "type" ? "Type" : "🎤 Speak"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Number of questions</p>
            <QuestionCountPicker value={questionCount} onChange={setQuestionCount} max={maxQuestions} />
          </div>

          <Button onClick={startQuiz} size="lg" className="w-full">Start Quiz →</Button>
        </div>
      </div>
    );
  }

  // ── Done screen ───────────────────────────────────────────────────────────
  if (done) {
    const pct = Math.round((sessionCorrect / sessionTotal) * 100);
    const score = computeLessonScore(progress, allWords);
    const nextUnlocked = progress.lessons[lessonNum + 1]?.unlocked;
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center flex flex-col gap-4">
          <div className="text-5xl">{pct >= 70 ? "🎉" : "📖"}</div>
          <h2 className="text-2xl font-bold">Lesson {lessonNum} Complete!</h2>
          <p className="text-muted-foreground">
            You got <strong>{sessionCorrect}/{sessionTotal}</strong> correct ({pct}%).
          </p>
          <p className="text-sm text-muted-foreground">Overall mastery: <strong>{score}%</strong></p>
          {nextUnlocked && lessonNum < 10 && (
            <p className="text-green-600 font-medium text-sm">🔓 Lesson {lessonNum + 1} unlocked!</p>
          )}
          <div className="flex flex-col gap-2 mt-2">
            <Button onClick={startQuiz}>Practice Again</Button>
            <Button variant="outline" onClick={() => setStarted(false)}>Change Settings</Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => setStarted(false)} className="text-muted-foreground hover:text-foreground text-sm">
            ← Back
          </button>
          <div className="flex-1">
            <Progress value={(index / allWords.length) * 100} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">{index + 1} / {allWords.length}</span>
          <button
            onClick={toggleTTS}
            title={ttsEnabled ? "Mute pronunciation" : "Unmute pronunciation"}
            className={`text-lg leading-none transition-opacity ${ttsEnabled ? "opacity-100" : "opacity-30"}`}
          >
            🔊
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Mode controls (can still change mid-quiz) */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {inputMode !== "speak" && (
            <div className="flex rounded-lg border overflow-hidden text-sm">
              <button onClick={() => setMode("jp-to-en")}
                className={`px-3 py-1.5 transition-colors ${mode === "jp-to-en" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
                JP → EN
              </button>
              <button onClick={() => setMode("en-to-jp")}
                className={`px-3 py-1.5 transition-colors ${mode === "en-to-jp" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
                EN → JP
              </button>
            </div>
          )}
          <div className="flex rounded-lg border overflow-hidden text-sm">
            <button onClick={() => setInputMode("multiple-choice")}
              className={`px-3 py-1.5 transition-colors ${inputMode === "multiple-choice" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
              Multiple choice
            </button>
            <button onClick={() => setInputMode("type")}
              className={`px-3 py-1.5 transition-colors ${inputMode === "type" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
              Type answer
            </button>
            <button onClick={() => setInputMode("speak")}
              className={`px-3 py-1.5 transition-colors ${inputMode === "speak" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
              🎤 Speak
            </button>
          </div>
        </div>

        <FlashCard
          key={`${currentWord.id}-${effectiveMode}-${inputMode}`}
          word={currentWord}
          mode={effectiveMode}
          inputMode={inputMode}
          choices={choices}
          ttsEnabled={ttsEnabled}
          onResult={handleResult}
        />

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Session: {sessionCorrect}/{sessionTotal} correct
        </div>
      </div>
    </div>
  );
}
