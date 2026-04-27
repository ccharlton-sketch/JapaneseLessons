"use client";
import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { sampleCounterCards, getCardsByGroup, CounterQuizCard, COUNTER_GROUPS } from "@/data/counters";
import { useTTSPreference } from "@/lib/useTTSPreference";
import { speak } from "@/lib/speech";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QuestionCountPicker from "@/components/QuestionCountPicker";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(card: CounterQuizCard, pool: CounterQuizCard[]): string[] {
  const correct = card.answer;
  const distractors = shuffle(
    pool.filter((c) => c.id !== card.id).map((c) => c.answer)
  ).slice(0, 3);
  return shuffle([correct, ...distractors]);
}

export default function CounterGroupPage() {
  const { group } = useParams<{ group: string }>();
  const groupNum = Number(group);
  const router = useRouter();
  const groupMeta = COUNTER_GROUPS.find((g) => g.id === groupNum);
  const { enabled: ttsEnabled, toggle: toggleTTS } = useTTSPreference();

  const fullPool = getCardsByGroup(groupNum);
  const maxQuestions = fullPool.length;

  // Config state
  const [questionCount, setQuestionCount] = useState(Math.min(10, maxQuestions));
  const [started, setStarted] = useState(false);

  // Quiz state
  const [cards, setCards] = useState<CounterQuizCard[]>([]);
  const [index, setIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function startQuiz() {
    setCards(sampleCounterCards(groupNum, questionCount));
    setIndex(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setDone(false);
    setSubmitted(false);
    setCorrect(false);
    setShowHint(false);
    setStarted(true);
  }

  const currentCard = cards[index];
  const choices = currentCard ? buildChoices(currentCard, fullPool) : [];

  const handleSubmit = useCallback((chosen: string) => {
    const isCorrect = currentCard.allAnswers.includes(chosen);
    setCorrect(isCorrect);
    setSubmitted(true);
    if (ttsEnabled) speak(currentCard.reading);
  }, [currentCard, ttsEnabled]);

  const handleNext = useCallback(() => {
    setSessionCorrect((c) => c + (correct ? 1 : 0));
    setSessionTotal((t) => t + 1);
    setSubmitted(false);
    setCorrect(false);
    setShowHint(false);
    if (index + 1 >= cards.length) setDone(true);
    else setIndex((i) => i + 1);
  }, [correct, index, cards.length]);

  const header = (backFn: () => void) => (
    <header className="border-b">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <button onClick={backFn} className="text-muted-foreground hover:text-foreground text-sm">
          ← Back
        </button>
        <div className="flex-1">
          <span className="font-semibold">{groupMeta?.emoji} {groupMeta?.title}</span>
          <span className="text-xs text-muted-foreground ml-2">{groupMeta?.subtitle}</span>
        </div>
        <button onClick={toggleTTS} title={ttsEnabled ? "Mute" : "Unmute"}
          className={`text-lg leading-none transition-opacity ${ttsEnabled ? "opacity-100" : "opacity-30"}`}>
          🔊
        </button>
      </div>
    </header>
  );

  // ── Setup screen ──────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="min-h-screen bg-background">
        {header(() => router.back())}
        <div className="max-w-sm mx-auto px-4 py-10 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-center">Quiz Settings</h2>
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
    return (
      <div className="min-h-screen bg-background">
        {header(() => setStarted(false))}
        <div className="max-w-sm mx-auto px-4 py-10 text-center flex flex-col gap-4">
          <div className="text-5xl">{pct >= 70 ? "🎉" : "📖"}</div>
          <h2 className="text-2xl font-bold">{groupMeta?.title} Complete!</h2>
          <p className="text-muted-foreground">
            You got <strong>{sessionCorrect}/{sessionTotal}</strong> correct ({pct}%).
          </p>
          <Button onClick={startQuiz}>Practice Again</Button>
          <Button variant="outline" onClick={() => setStarted(false)}>Change Settings</Button>
        </div>
      </div>
    );
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {header(() => setStarted(false))}
      <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Progress value={(index / cards.length) * 100} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">{index + 1} / {cards.length}</span>
        </div>

        <Card className="text-center shadow-lg">
          <CardContent className="pt-8 pb-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              How do you say this in Japanese?
            </div>
            <button
              onClick={() => ttsEnabled && speak(currentCard.reading)}
              className={`text-3xl font-bold mb-3 block w-full ${ttsEnabled ? "cursor-pointer hover:opacity-70 active:scale-95" : "cursor-default"} transition-all select-none`}
            >
              {currentCard.question}
              {ttsEnabled && (
                <span className="block text-xs text-muted-foreground mt-2 font-normal normal-case tracking-normal">
                  🔊 tap to hear
                </span>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge variant="secondary">{currentCard.counter}</Badge>
              <span className="text-xs text-muted-foreground">{currentCard.usedFor}</span>
            </div>
          </CardContent>
        </Card>

        {!submitted && (
          <div className="text-center">
            {showHint ? (
              <p className="text-sm text-muted-foreground italic">Hint: {currentCard.hint}</p>
            ) : (
              <button onClick={() => setShowHint(true)} className="text-xs text-primary underline underline-offset-2">
                Show hint
              </button>
            )}
          </div>
        )}

        {!submitted ? (
          <div className="grid grid-cols-2 gap-2">
            {choices.map((c) => (
              <button key={c} onClick={() => handleSubmit(c)}
                className="rounded-xl border-2 border-border py-3 px-4 font-japanese text-lg font-medium hover:border-primary hover:bg-primary/5 transition-colors text-center">
                {c}
              </button>
            ))}
          </div>
        ) : (
          <Card className={`text-center border-2 ${correct ? "border-green-500 bg-green-50 dark:bg-green-950/30" : "border-red-400 bg-red-50 dark:bg-red-950/30"}`}>
            <CardContent className="py-4">
              <div className="text-2xl mb-2">{correct ? "✓ Correct!" : "✗ Incorrect"}</div>
              {!correct && (
                <div className="text-sm text-muted-foreground mb-2">
                  Correct answer:{" "}
                  <span className="font-japanese font-semibold text-base">{currentCard.answer}</span>
                </div>
              )}
              <div className="flex items-center justify-center gap-2 mb-3">
                <button onClick={() => speak(currentCard.reading)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">
                  🔊 Listen
                </button>
              </div>
              <Button onClick={handleNext} variant={correct ? "default" : "outline"}>Next Card →</Button>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-sm text-muted-foreground">
          Session: {sessionCorrect}/{sessionTotal} correct
        </div>
      </div>
    </div>
  );
}
