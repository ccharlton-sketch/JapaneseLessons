"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadProgress, AppProgress } from "@/lib/progress";
import LessonMap from "@/components/LessonMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KanaChart from "@/components/KanaChart";
import KanaStudy from "@/components/KanaStudy";
import KanaQuiz from "@/components/KanaQuiz";
import CounterGroupMap from "@/components/CounterGroupMap";
import CounterStudyAll from "@/components/CounterStudyAll";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/lib/useAuth";
import { BookOpen, Hash, Languages, FolderOpen, BookText, LayoutGrid, Sparkles } from "lucide-react";

export default function Home() {
  const [progress, setProgress] = useState<AppProgress | null>(null);
  const [activeTab, setActiveTab] = useState<string>("lessons");
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

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

  // Reload local progress after auth state changes (e.g. after merge on login)
  function refreshProgress() {
    setProgress(loadProgress());
  }

  if (!progress) {
    return (
      <main className="min-h-[100dvh] bg-ambient">
        <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-40">
          <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-3">
            <Sparkles className="size-6 text-primary" strokeWidth={1.5} />
            <div className="flex-1">
              <div className="h-5 w-40 rounded bg-muted animate-pulse" />
              <div className="h-3 w-56 rounded bg-muted/60 animate-pulse mt-1.5" />
            </div>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="h-8 w-full rounded-lg bg-muted animate-pulse mb-6" />
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-muted/40 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-ambient">
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-3">
          <Sparkles className="size-6 text-primary" strokeWidth={1.5} />
          <div className="flex-1">
            <h1 className="text-2xl font-bold leading-tight tracking-tight">Japanese Learnings</h1>
            <p className="text-sm text-muted-foreground font-medium">Hiragana · Katakana · Vocabulary</p>
          </div>
          {!authLoading && (
            user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:block truncate max-w-[120px]">{user.email}</span>
                <button
                  onClick={async () => { await signOut(); refreshProgress(); }}
                  className="text-xs text-muted-foreground hover:text-foreground border rounded-md px-2.5 py-1 active:scale-[0.97] transition-press"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-xs border rounded-md px-2.5 py-1 hover:bg-muted active:scale-[0.97] transition-press"
              >
                Sign in
              </button>
            )
          )}
        </div>
      </header>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={refreshProgress}
        />
      )}

      <div className="max-w-2xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); sessionStorage.setItem("jp_active_tab", v); }}>
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="lessons" className="flex-1 gap-1.5"><BookOpen className="size-4" strokeWidth={1.5} /> Lessons</TabsTrigger>
            <TabsTrigger value="counters" className="flex-1 gap-1.5"><Hash className="size-4" strokeWidth={1.5} /> Counters</TabsTrigger>
            <TabsTrigger value="kana" className="flex-1 gap-1.5"><Languages className="size-4" strokeWidth={1.5} /> Kana</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <div className="mb-5">
              <h2 className="text-xl font-bold tracking-tight">Your progress</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Complete a lesson with 70%+ mastery to unlock the next one.
              </p>
              {!user && !authLoading && (
                <p className="text-xs text-muted-foreground mt-1">
                  <button onClick={() => setShowAuth(true)} className="underline hover:text-foreground">
                    Sign up free
                  </button>{" "}to save your progress across devices.
                </p>
              )}
            </div>
            <LessonMap
              lessons={progress.lessons}
              onSelect={(lesson) => router.push(`/flashcards/${lesson}`)}
            />
          </TabsContent>

          <TabsContent value="counters">
            <Tabs defaultValue="groups">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="groups" className="flex-1 gap-1.5"><FolderOpen className="size-4" strokeWidth={1.5} /> Groups</TabsTrigger>
                <TabsTrigger value="study" className="flex-1 gap-1.5"><BookText className="size-4" strokeWidth={1.5} /> Study All</TabsTrigger>
              </TabsList>

              <TabsContent value="groups">
                <div className="mb-5">
                  <h2 className="text-xl font-bold tracking-tight">Japanese counters</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Japanese uses different words depending on what you're counting. All groups are unlocked.
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
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="study" className="flex-1 gap-1.5"><BookText className="size-4" strokeWidth={1.5} /> Study</TabsTrigger>
                <TabsTrigger value="quiz" className="flex-1 gap-1.5"><Sparkles className="size-4" strokeWidth={1.5} /> Quiz</TabsTrigger>
                <TabsTrigger value="chart" className="flex-1 gap-1.5"><LayoutGrid className="size-4" strokeWidth={1.5} /> Chart</TabsTrigger>
              </TabsList>

              <TabsContent value="study">
                <div className="mb-5">
                  <h2 className="text-xl font-bold tracking-tight">Kana alphabet</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    All characters grouped by row. Toggle romaji off to self-test.
                  </p>
                </div>
                <KanaStudy />
              </TabsContent>

              <TabsContent value="quiz">
                <div className="mb-5">
                  <h2 className="text-xl font-bold tracking-tight">Kana quiz</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pick the romaji or say the character aloud.
                  </p>
                </div>
                <KanaQuiz />
              </TabsContent>

              <TabsContent value="chart">
                <div className="mb-5">
                  <h2 className="text-xl font-bold tracking-tight">Quick reference</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Flat grid of all hiragana and katakana.
                  </p>
                </div>
                <KanaChart />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
