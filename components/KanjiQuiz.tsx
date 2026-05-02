"use client";
import { useState, useCallback } from "react";
import { ALL_KANJI, KANJI_LEVELS, KanjiCard, sampleKanji } from "@/data/kanji";
import { speak } from "@/lib/speech";
import { useTTSPreference } from "@/lib/useTTSPreference";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuestionCountPicker from "@/components/QuestionCountPicker";
import { Volume2, VolumeX, Trophy, BookOpen } from "lucide-react";

type QuizMode = "meaning" | "reading";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(card: KanjiCard, mode: QuizMode): string[] {
  const correct = mode === "meaning" ? card.meanings[0] : (card.kunyomi[0] || card.onyomi[0]);
  const pool = ALL_KANJI.filter((k) => k.id !== card.id);
  const distractors = shuffle(
    pool.map((k) => mode === "meaning" ? k.meanings[0] : (k.kunyomi[0] || k.onyomi[0]))
  )
    .filter((d) => d !== correct)
    .slice(0, 3);
  return shuffle([correct, ...distractors]);
}

export default function KanjiQuiz() {
  const { enabled: ttsEnabled, toggle: toggleTTS } = useTTSPreference();

  // Config state
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3 | 4 | 5 | "all">("all");
  const [quizMode, setQuizMode] = useState<QuizMode>("meaning");
  const [questionCount, setQuestionCount] = useState(10);
  const [started, setStarted] = useState(false);

  // Quiz state
  const [cards, setCards] = useState<KanjiCard[]>([]);
  const [index, setIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState("");

  const maxQuestions = activeLevel === "all" ? ALL_KANJI.length : KANJI_LEVELS.find((l) => l.level === activeLevel)!.count;

  function startQuiz() {
    setCards(sampleKanji(activeLevel, questionCount));
    setIndex(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setDone(false);
    setSubmitted(false);
    setCorrect(false);
    setChosenAnswer("");
    setStarted(true);
  }

  const currentCard = cards[index];
  const choices = currentCard ? buildChoices(currentCard, quizMode) : [];

  const handleSubmit = useCallback((chosen: string) => {
    const correctAnswer = quizMode === "meaning"
      ? currentCard.meanings[0]
      : (currentCard.kunyomi[0] || currentCard.onyomi[0]);
    const isCorrect = chosen === correctAnswer;
    setCorrect(isCorrect);
    setChosenAnswer(chosen);
    setSubmitted(true);
    if (ttsEnabled) speak(currentCard.kunyomi[0]?.replace(/[()（）]/g, "") || currentCard.onyomi[0] || currentCard.kanji);
  }, [currentCard, quizMode, ttsEnabled]);

  const handleNext = useCallback(() => {
    setSessionCorrect((c) => c + (correct ? 1 : 0));
    setSessionTotal((t) => t + 1);
    setSubmitted(false);
    setCorrect(false);
    setChosenAnswer("");
    if (index + 1 >= cards.length) setDone(true);
    else setIndex((i) => i + 1);
  }, [correct, index, cards.length]);

  // ── Setup screen ──────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="flex flex-col gap-6 animate-fade-up">
        <div className="space-y-2">
          <p className="text-sm font-medium">Quiz type</p>
          <div className="flex rounded-lg border overflow-hidden text-sm">
            <button onClick={() => setQuizMode("meaning")}
              className={`flex-1 px-3 py-2 transition-colors ${quizMode === "meaning" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
              Kanji → Meaning
            </button>
            <button onClick={() => setQuizMode("reading")}
              className={`flex-1 px-3 py-2 transition-colors ${quizMode === "reading" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
              Kanji → Reading
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Level</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveLevel("all")}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                activeLevel === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
              }`}
            >
              All
            </button>
            {KANJI_LEVELS.map(({ level, title }) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                  activeLevel === level ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
                }`}
              >
                {level}. {title}
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
    );
  }

  // ── Done screen ───────────────────────────────────────────────────────────
  if (done) {
    const pct = Math.round((sessionCorrect / sessionTotal) * 100);
    return (
      <div className="max-w-sm mx-auto text-center flex flex-col gap-4 animate-fade-up">
        <div className="flex justify-center">
          {pct >= 70
            ? <Trophy className="size-12 text-primary" strokeWidth={1.5} />
            : <BookOpen className="size-12 text-muted-foreground" strokeWidth={1.5} />
          }
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Kanji quiz complete</h2>
        <p className="text-muted-foreground">
          You got <strong className="tabular-nums">{sessionCorrect}/{sessionTotal}</strong> correct (<span className="tabular-nums">{pct}%</span>).
        </p>
        <div className="flex flex-col gap-2 mt-2">
          <Button onClick={startQuiz}>Practice Again</Button>
          <Button variant="outline" onClick={() => setStarted(false)}>Change Settings</Button>
        </div>
      </div>
    );
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────
  const correctAnswer = quizMode === "meaning"
    ? currentCard.meanings[0]
    : (currentCard.kunyomi[0] || currentCard.onyomi[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress value={(index / cards.length) * 100} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap tabular-nums">{index + 1} / {cards.length}</span>
        <button onClick={toggleTTS} title={ttsEnabled ? "Mute" : "Unmute"}
          className={`leading-none transition-opacity duration-200 ${ttsEnabled ? "opacity-100" : "opacity-30"}`}>
          {ttsEnabled ? <Volume2 className="size-5" strokeWidth={1.5} /> : <VolumeX className="size-5" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Question card */}
      <Card className="text-center card-elevated overflow-hidden animate-fade-in">
        <CardContent className="pt-8 pb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
          <div className="relative">
            <div className="text-xs font-medium text-muted-foreground mb-4 tracking-wide">
              {quizMode === "meaning" ? "What does this kanji mean?" : "How do you read this kanji?"}
            </div>
            <button
              onClick={() => ttsEnabled && speak(currentCard.kunyomi[0]?.replace(/[()（）]/g, "") || currentCard.onyomi[0] || currentCard.kanji)}
              className={`font-japanese text-7xl font-bold block w-full mb-2 transition-press select-none ${
                ttsEnabled ? "cursor-pointer hover:text-primary active:scale-[0.97]" : "cursor-default"
              }`}
            >
              {currentCard.kanji}
            </button>
            {ttsEnabled && (
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Volume2 className="size-3" strokeWidth={1.5} /> tap to hear
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Choices */}
      {!submitted ? (
        <div className="grid grid-cols-2 gap-3">
          {choices.map((c, i) => (
            <button
              key={c}
              onClick={() => handleSubmit(c)}
              className={`animate-fade-up stagger-${Math.min(i + 1, 10)} rounded-xl border bg-card py-3.5 px-4 text-sm font-medium card-elevated hover:card-elevated-hover hover:border-primary/50 hover-lift active:scale-[0.97] text-center ${
                quizMode === "reading" ? "font-japanese text-lg" : ""
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      ) : (
        <Card className={`animate-fade-up text-center border ${correct ? "border-green-500/50 bg-green-50/80 dark:bg-green-950/30" : "border-red-400/50 bg-red-50/80 dark:bg-red-950/30"}`}>
          <CardContent className="py-4">
            <div className="text-2xl mb-2">{correct ? "Correct!" : "Incorrect"}</div>
            {!correct && (
              <div className="text-sm text-muted-foreground mb-2">
                Correct answer: <span className={`font-semibold ${quizMode === "reading" ? "font-japanese text-base" : ""}`}>{correctAnswer}</span>
              </div>
            )}
            <div className="text-xs text-muted-foreground mb-3 space-y-0.5">
              <div className="font-japanese text-lg font-bold">{currentCard.kanji}</div>
              <div>{currentCard.meanings.join(", ")}</div>
              {currentCard.onyomi.length > 0 && <div>On: {currentCard.onyomi.join(", ")}</div>}
              {currentCard.kunyomi.length > 0 && <div>Kun: {currentCard.kunyomi.join(", ")}</div>}
            </div>
            <Button onClick={handleNext} variant={correct ? "default" : "outline"}>Next →</Button>
          </CardContent>
        </Card>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Session: {sessionCorrect}/{sessionTotal} correct
      </div>
    </div>
  );
}
