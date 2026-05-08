"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadProgress, AppProgress } from "@/lib/progress";
import LessonMap from "@/components/LessonMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KanaChart from "@/components/KanaChart";
import KanaStudy from "@/components/KanaStudy";
import KanaQuiz from "@/components/KanaQuiz";
import KanjiStudy from "@/components/KanjiStudy";
import KanjiQuiz from "@/components/KanjiQuiz";
import CounterGroupMap from "@/components/CounterGroupMap";
import CounterStudyAll from "@/components/CounterStudyAll";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/lib/useAuth";
import { BookOpen, Hash, Languages, FolderOpen, BookText, LayoutGrid, Sparkles, Pen, Volume2, VolumeX } from "lucide-react";
import { useGamificationCtx } from "@/components/GamificationProvider";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  const [progress, setProgress] = useState<AppProgress | null>(null);
  const [activeTab, setActiveTab] = useState<string>("lessons");
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const { state: gamState, soundEnabled, toggleSound } = useGamificationCtx();

  // Clean up any OAuth error params from the URL without a page reload
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("error")) {
      params.delete("error");
      const clean = window.location.pathname + (params.toString() ? `?${params}` : "");
      window.history.replaceState({}, "", clean);
    }
  }, []);

  useEffect(() => {
    setProgress(loadProgress());
    const saved = sessionStorage.getItem("jp_active_tab");
    if (saved) setActiveTab(saved);
  }, []);

  // After Google OAuth redirect, merge any pre-signin local progress with server
  useEffect(() => {
    if (!user) return;
    const saved = sessionStorage.getItem("jp_presignin_progress");
    if (!saved) return;
    sessionStorage.removeItem("jp_presignin_progress");
    (async () => {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const { data: serverData } = await res.json();
          const local = JSON.parse(saved);
          const { mergeProgress, saveProgress } = await import("@/lib/progress");
          const merged = serverData ? mergeProgress(local, serverData) : local;
          saveProgress(merged, true);
          setProgress(merged);
        }
      } catch {}
    })();
  }, [user]);

  function refreshProgress() {
    setProgress(loadProgress());
  }

  if (!progress) {
    return (
      <main className="min-h-[100dvh] bg-ambient grain-overlay">
        <header className="glass-header sticky top-0 z-40">
          <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="font-japanese text-primary font-bold text-lg">学</span>
            </div>
            <div className="flex-1">
              <div className="h-5 w-40 rounded-lg bg-muted animate-pulse" />
              <div className="h-3 w-56 rounded bg-muted/60 animate-pulse mt-2" />
            </div>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-5 py-8">
          <div className="h-10 w-full rounded-xl bg-muted animate-pulse mb-8" />
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-muted/40 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-ambient grain-overlay">
      <header className="glass-header sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-4">
          <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="font-japanese text-primary font-bold text-lg select-none">学</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold leading-tight tracking-tight truncate">Japanese Learnings</h1>
            <p className="text-xs text-muted-foreground font-medium">Hiragana · Katakana · Kanji · Vocabulary</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Mute sound effects" : "Unmute sound effects"}
              className={`size-8 rounded-lg flex items-center justify-center transition-all hover:bg-muted active:scale-[0.93] ${soundEnabled ? "opacity-100" : "opacity-40"}`}
            >
              {soundEnabled ? <Volume2 className="size-4" strokeWidth={1.5} /> : <VolumeX className="size-4" strokeWidth={1.5} />}
            </button>
            {!authLoading && (
              user ? (
                <button
                  onClick={async () => { await signOut(); refreshProgress(); }}
                  className="text-xs text-muted-foreground hover:text-foreground border rounded-lg px-3 py-1.5 active:scale-[0.97] transition-press"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="text-xs font-medium border rounded-lg px-3 py-1.5 hover:bg-muted active:scale-[0.97] transition-press"
                >
                  Sign in
                </button>
              )
            )}
          </div>
        </div>
      </header>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={refreshProgress}
        />
      )}

      <div className="max-w-3xl mx-auto px-5 py-8">
        {/* Gamification overview */}
        {gamState.totalAnswered > 0 && (
          <div className="mb-8 animate-fade-up">
            <StatsBar state={gamState} />
          </div>
        )}

        {/* Welcome state for new users */}
        {gamState.totalAnswered === 0 && (
          <div className="mb-8 rounded-2xl border bg-card p-6 card-elevated animate-fade-up">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 animate-float">
                <Sparkles className="size-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">Ready to learn Japanese?</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-[50ch] text-pretty">
                  Start with a lesson to earn XP, level up, and unlock new ranks. Every correct answer counts toward your daily streak.
                </p>
                {!user && !authLoading && (
                  <button onClick={() => setShowAuth(true)} className="text-xs text-primary font-medium mt-3 underline underline-offset-2 hover:opacity-80">
                    Sign up to sync progress across devices
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); sessionStorage.setItem("jp_active_tab", v); }}>
          <TabsList className="mb-8 w-full h-11">
            <TabsTrigger value="lessons" className="flex-1 gap-1.5 text-sm"><BookOpen className="size-4" strokeWidth={1.5} /> Lessons</TabsTrigger>
            <TabsTrigger value="counters" className="flex-1 gap-1.5 text-sm"><Hash className="size-4" strokeWidth={1.5} /> Counters</TabsTrigger>
            <TabsTrigger value="kana" className="flex-1 gap-1.5 text-sm"><Languages className="size-4" strokeWidth={1.5} /> Kana</TabsTrigger>
            <TabsTrigger value="kanji" className="flex-1 gap-1.5 text-sm"><Pen className="size-4" strokeWidth={1.5} /> Kanji</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tighter">Your progress</h2>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-[50ch]">
                Complete a lesson with 70%+ mastery to unlock the next one.
              </p>
            </div>
            <LessonMap
              lessons={progress.lessons}
              onSelect={(lesson) => router.push(`/flashcards/${lesson}`)}
            />
          </TabsContent>

          <TabsContent value="counters">
            <Tabs defaultValue="groups">
              <TabsList className="mb-5 w-full">
                <TabsTrigger value="groups" className="flex-1 gap-1.5"><FolderOpen className="size-4" strokeWidth={1.5} /> Groups</TabsTrigger>
                <TabsTrigger value="study" className="flex-1 gap-1.5"><BookText className="size-4" strokeWidth={1.5} /> Study all</TabsTrigger>
              </TabsList>

              <TabsContent value="groups">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tighter">Japanese counters</h2>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-[55ch]">
                    Japanese uses different words depending on what you count. All groups are unlocked.
                  </p>
                </div>
                <CounterGroupMap onSelect={(g) => router.push(`/counters/${g}`)} />
              </TabsContent>

              <TabsContent value="study">
                <CounterStudyAll />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="kana">
            <Tabs defaultValue="study">
              <TabsList className="mb-5 w-full">
                <TabsTrigger value="study" className="flex-1 gap-1.5"><BookText className="size-4" strokeWidth={1.5} /> Study</TabsTrigger>
                <TabsTrigger value="quiz" className="flex-1 gap-1.5"><Sparkles className="size-4" strokeWidth={1.5} /> Quiz</TabsTrigger>
                <TabsTrigger value="chart" className="flex-1 gap-1.5"><LayoutGrid className="size-4" strokeWidth={1.5} /> Chart</TabsTrigger>
              </TabsList>

              <TabsContent value="study">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tighter">Kana alphabet</h2>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-[50ch]">
                    All characters grouped by row. Toggle romaji off to self-test.
                  </p>
                </div>
                <KanaStudy />
              </TabsContent>

              <TabsContent value="quiz">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tighter">Kana quiz</h2>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-[50ch]">
                    Pick the romaji or say the character aloud.
                  </p>
                </div>
                <KanaQuiz />
              </TabsContent>

              <TabsContent value="chart">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tighter">Quick reference</h2>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-[50ch]">
                    Flat grid of all hiragana and katakana.
                  </p>
                </div>
                <KanaChart />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="kanji">
            <Tabs defaultValue="study">
              <TabsList className="mb-5 w-full">
                <TabsTrigger value="study" className="flex-1 gap-1.5"><BookText className="size-4" strokeWidth={1.5} /> Study</TabsTrigger>
                <TabsTrigger value="quiz" className="flex-1 gap-1.5"><Sparkles className="size-4" strokeWidth={1.5} /> Quiz</TabsTrigger>
              </TabsList>

              <TabsContent value="study">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tighter">Kanji characters</h2>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-[55ch]">
                    145 essential kanji across 5 levels. Click any character to see readings and examples.
                  </p>
                </div>
                <KanjiStudy />
              </TabsContent>

              <TabsContent value="quiz">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tighter">Kanji quiz</h2>
                  <p className="text-sm text-muted-foreground mt-1.5 max-w-[50ch]">
                    Test your kanji knowledge — identify meanings or readings.
                  </p>
                </div>
                <KanjiQuiz />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
