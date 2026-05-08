"use client";
import { useState, useCallback, useEffect } from "react";
import { KanaCard, ALL_KANA, sampleKana, katakanaToHiragana } from "@/data/kana";
import { speak } from "@/lib/speech";
import { useTTSPreference } from "@/lib/useTTSPreference";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuestionCountPicker from "@/components/QuestionCountPicker";
import { Volume2, VolumeX, Mic, Trophy, BookOpen } from "lucide-react";
import { useGamificationCtx } from "@/components/GamificationProvider";
import StatsBar from "@/components/StatsBar";

type Script = "hiragana" | "katakana";
type QuizMode = "multiple-choice" | "speak";
type Section = KanaCard["section"];

const SECTION_LABELS: Record<Section, string> = {
  basic: "Basic (清音)",
  voiced: "Voiced (濁音)",
  combinations: "Combos (拗音)",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(card: KanaCard, pool: KanaCard[]): string[] {
  const distractors = shuffle(pool.filter((c) => c.id !== card.id).map((c) => c.romaji)).slice(0, 3);
  return shuffle([card.romaji, ...distractors]);
}

function checkSpoken(transcript: string, card: KanaCard): boolean {
  const candidates = transcript.split("|").map((s) => s.trim().toLowerCase());
  const targets = [card.hiragana, katakanaToHiragana(card.katakana), card.romaji.toLowerCase()];
  return candidates.some((c) => targets.some((t) => t === c || t.includes(c) || c.includes(t)));
}

function poolForSections(sections: Set<Section>): KanaCard[] {
  return ALL_KANA.filter((k) => sections.has(k.section));
}

export default function KanaQuiz() {
  const [script, setScript] = useState<Script>("hiragana");
  const [quizMode, setQuizMode] = useState<QuizMode>("multiple-choice");
  const [sections, setSections] = useState<Set<Section>>(new Set(["basic"]));
  const [started, setStarted] = useState(false);
  const { recordAnswer: recordGamAnswer, completeQuiz, state: gamState } = useGamificationCtx();

  const currentPool = poolForSections(sections);
  const maxQuestions = currentPool.length;
  const [questionCount, setQuestionCount] = useState(Math.min(10, maxQuestions));

  // Quiz state
  const [cards, setCards] = useState<KanaCard[]>([]);
  const [pool, setPool] = useState<KanaCard[]>([]);
  const [index, setIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const { enabled: ttsEnabled, toggle: toggleTTS } = useTTSPreference();
  const { state: recState, transcript, start: startListening, reset: resetRec } = useSpeechRecognition();

  const currentCard = cards[index];
  const choices = currentCard ? buildChoices(currentCard, pool) : [];
  const displayKana = currentCard ? (script === "hiragana" ? currentCard.hiragana : currentCard.katakana) : "";

  // Keep questionCount in bounds when sections change
  useEffect(() => {
    setQuestionCount((prev) => Math.min(prev, poolForSections(sections).length));
  }, [sections]);

  function toggleSection(s: Section) {
    setSections((prev) => {
      const next = new Set(prev);
      if (next.has(s) && next.size === 1) return prev;
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  }

  function startQuiz() {
    const sectionArr = [...sections] as Section[];
    const newPool = ALL_KANA.filter((k) => sectionArr.includes(k.section));
    // sampleKana already shuffles and slices — guaranteed no duplicates
    const newCards = sampleKana(questionCount, sectionArr);
    setCards(newCards);
    setPool(newPool);
    setIndex(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setSubmitted(false);
    setCorrect(false);
    setDone(false);
    resetRec();
    setStarted(true);
  }

  const handleSubmit = useCallback((isCorrect: boolean) => {
    setCorrect(isCorrect);
    setSubmitted(true);
    recordGamAnswer(isCorrect);
    if (ttsEnabled) speak(currentCard.hiragana);
  }, [currentCard, ttsEnabled, recordGamAnswer]);

  const handleNext = useCallback(() => {
    const newCorrect = sessionCorrect + (correct ? 1 : 0);
    const newTotal = sessionTotal + 1;
    setSessionCorrect(newCorrect);
    setSessionTotal(newTotal);
    setSubmitted(false);
    setCorrect(false);
    resetRec();
    if (index + 1 >= cards.length) {
      completeQuiz(newCorrect, newTotal);
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  }, [correct, index, cards.length, resetRec, sessionCorrect, sessionTotal, completeQuiz]);

  useEffect(() => {
    if (quizMode === "speak" && recState === "done" && transcript && !submitted && currentCard) {
      handleSubmit(checkSpoken(transcript, currentCard));
    }
  }, [recState, transcript, quizMode, submitted, currentCard, handleSubmit]);

  // ── Setup / config screen ─────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="space-y-5">
        {/* Script + mode toggles */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex rounded-lg border overflow-hidden text-sm">
            <button onClick={() => setScript("hiragana")}
              className={`px-3 py-1.5 transition-colors ${script === "hiragana" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
              ひらがな
            </button>
            <button onClick={() => setScript("katakana")}
              className={`px-3 py-1.5 transition-colors ${script === "katakana" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
              カタカナ
            </button>
          </div>
          <div className="flex rounded-lg border overflow-hidden text-sm">
            <button onClick={() => setQuizMode("multiple-choice")}
              className={`px-3 py-1.5 transition-colors ${quizMode === "multiple-choice" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
              Multiple choice
            </button>
            <button onClick={() => setQuizMode("speak")}
              className={`px-3 py-1.5 transition-colors flex items-center gap-1 ${quizMode === "speak" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
              <Mic className="size-3.5" strokeWidth={1.5} /> Speak
            </button>
          </div>
          <button onClick={toggleTTS} title={ttsEnabled ? "Mute" : "Unmute"}
            className={`leading-none ml-auto transition-opacity duration-200 ${ttsEnabled ? "opacity-100" : "opacity-30"}`}>
            {ttsEnabled ? <Volume2 className="size-5" strokeWidth={1.5} /> : <VolumeX className="size-5" strokeWidth={1.5} />}
          </button>
        </div>

        {/* Section filter */}
        <div className="space-y-1">
          <p className="text-sm font-medium">Sections</p>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(SECTION_LABELS) as [Section, string][]).map(([s, label]) => (
              <button key={s} onClick={() => toggleSection(s)}
                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                  sections.has(s) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Question count */}
        <div className="space-y-1">
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
      <div className="max-w-sm mx-auto text-center flex flex-col gap-4 py-8 animate-fade-up">
        <div className="flex justify-center">
          {pct >= 70
            ? <Trophy className="size-12 text-primary" strokeWidth={1.5} />
            : <BookOpen className="size-12 text-muted-foreground" strokeWidth={1.5} />
          }
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Kana quiz complete</h2>
        <p className="text-muted-foreground">
          You got <strong className="tabular-nums">{sessionCorrect}/{sessionTotal}</strong> correct (<span className="tabular-nums">{pct}%</span>).
        </p>
        <StatsBar state={gamState} />
        <div className="flex flex-col gap-2 mt-2">
          <Button onClick={startQuiz}>Practice Again</Button>
          <Button variant="outline" onClick={() => setStarted(false)}>Change Settings</Button>
        </div>
      </div>
    );
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* In-quiz controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex rounded-lg border overflow-hidden text-sm">
          <button onClick={() => setScript("hiragana")}
            className={`px-3 py-1.5 transition-colors ${script === "hiragana" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
            ひらがな
          </button>
          <button onClick={() => setScript("katakana")}
            className={`px-3 py-1.5 transition-colors ${script === "katakana" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
            カタカナ
          </button>
        </div>
        <div className="flex rounded-lg border overflow-hidden text-sm">
          <button onClick={() => setQuizMode("multiple-choice")}
            className={`px-3 py-1.5 transition-colors ${quizMode === "multiple-choice" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
            Multiple choice
          </button>
          <button onClick={() => setQuizMode("speak")}
            className={`px-3 py-1.5 transition-colors flex items-center gap-1 ${quizMode === "speak" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}>
            <Mic className="size-3.5" strokeWidth={1.5} /> Speak
          </button>
        </div>
        <button onClick={toggleTTS} title={ttsEnabled ? "Mute" : "Unmute"}
          className={`leading-none ml-auto transition-opacity duration-200 ${ttsEnabled ? "opacity-100" : "opacity-30"}`}>
          {ttsEnabled ? <Volume2 className="size-5" strokeWidth={1.5} /> : <VolumeX className="size-5" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Gamification stats */}
      <StatsBar state={gamState} compact />

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress value={(index / cards.length) * 100} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap">{index + 1} / {cards.length}</span>
      </div>

      {/* Card */}
      <Card className="text-center card-elevated rounded-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent pointer-events-none" />
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            {quizMode === "speak" ? "Pronounce this character" : "What sound does this make?"}
          </div>
          <button
            onClick={() => ttsEnabled && speak(currentCard.hiragana)}
            className={`font-japanese text-8xl font-bold block w-full mb-2 transition-all select-none ${
              ttsEnabled ? "cursor-pointer hover:opacity-70 active:scale-95" : "cursor-default"
            }`}
          >
            {displayKana}
          </button>
          {ttsEnabled && <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Volume2 className="size-3" strokeWidth={1.5} /> tap to hear</p>}
        </CardContent>
      </Card>

      {/* Answer area */}
      {!submitted ? (
        quizMode === "speak" ? (
          <div className="flex flex-col items-center gap-3">
            {recState === "unsupported" ? (
              <p className="text-sm text-destructive text-center">
                Speech recognition not supported. Try Chrome or Edge.
              </p>
            ) : (
              <>
                <button
                  onClick={startListening}
                  disabled={recState === "listening"}
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all shadow-md ${
                    recState === "listening"
                      ? "border-red-500 bg-red-50 dark:bg-red-950/30 animate-pulse scale-110"
                      : "border-primary bg-background hover:bg-primary/5 active:scale-95"
                  }`}
                >
                  <Mic className="size-8" strokeWidth={1.5} />
                </button>
                <p className="text-sm text-muted-foreground">
                  {recState === "listening" ? "Listening…" : "Tap to speak"}
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {choices.map((c, i) => (
              <button key={c} onClick={() => handleSubmit(c === currentCard.romaji)}
                className={`animate-fade-up stagger-${Math.min(i + 1, 10)} rounded-2xl border bg-card py-4 px-4 text-lg font-medium card-elevated hover:card-elevated-hover hover:border-primary/40 hover-lift active:scale-[0.96] transition-all text-center`}>
                {c}
              </button>
            ))}
          </div>
        )
      ) : (
        <Card className={`text-center rounded-2xl border ${correct ? "border-green-500/40 bg-gradient-to-b from-green-50 to-card dark:from-green-950/30 dark:to-card" : "border-red-400/40 bg-gradient-to-b from-red-50 to-card dark:from-red-950/30 dark:to-card"}`}>
          <CardContent className="py-5">
            <div className={`text-xl font-bold mb-2 ${correct ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>{correct ? "Correct" : "Incorrect"}</div>
            {quizMode === "speak" && transcript && (
              <p className="text-xs text-muted-foreground mb-1">
                You said: <span className="font-japanese">{transcript.split("|")[0]}</span>
              </p>
            )}
            <p className="text-sm text-muted-foreground mb-3">
              <span className="font-japanese text-lg font-semibold">{displayKana}</span>
              {" = "}
              <span className="font-semibold">{currentCard.romaji}</span>
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <button onClick={() => speak(currentCard.hiragana)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-muted active:scale-[0.97] transition-press">
                <Volume2 className="size-4" strokeWidth={1.5} /> Listen
              </button>
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
