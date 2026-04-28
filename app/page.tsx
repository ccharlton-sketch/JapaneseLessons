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

export default function Home() {
  const [progress, setProgress] = useState<AppProgress | null>(null);
  const [activeTab, setActiveTab] = useState<string>("lessons");
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setProgress(loadProgress());
    const saved = sessionStorage.getItem("jp_active_tab");
    if (saved) setActiveTab(saved);
  }, []);

  // Reload local progress after auth state changes (e.g. after merge on login)
  function refreshProgress() {
    setProgress(loadProgress());
  }

  if (!progress) return null;

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-3">
          <span className="text-3xl">🌸</span>
          <div className="flex-1">
            <h1 className="text-xl font-bold leading-tight">Japanese Learnings</h1>
            <p className="text-xs text-muted-foreground">Hiragana · Katakana · Vocabulary</p>
          </div>
          {!authLoading && (
            user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:block truncate max-w-[120px]">{user.email}</span>
                <button
                  onClick={async () => { await signOut(); refreshProgress(); }}
                  className="text-xs text-muted-foreground hover:text-foreground border rounded px-2 py-1"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-xs border rounded px-2 py-1 hover:bg-muted"
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
            <TabsTrigger value="lessons" className="flex-1">📚 Lessons</TabsTrigger>
            <TabsTrigger value="counters" className="flex-1">🔢 Counters</TabsTrigger>
            <TabsTrigger value="kana" className="flex-1">🔤 Kana</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Your Progress</h2>
              <p className="text-sm text-muted-foreground">
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
                <TabsTrigger value="groups" className="flex-1">🗂️ Groups</TabsTrigger>
                <TabsTrigger value="study" className="flex-1">📖 Study All</TabsTrigger>
              </TabsList>

              <TabsContent value="groups">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Japanese Counters</h2>
                  <p className="text-sm text-muted-foreground">
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
                <TabsTrigger value="study" className="flex-1">📖 Study</TabsTrigger>
                <TabsTrigger value="quiz" className="flex-1">🃏 Quiz</TabsTrigger>
                <TabsTrigger value="chart" className="flex-1">🗂️ Chart</TabsTrigger>
              </TabsList>

              <TabsContent value="study">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Kana Alphabet</h2>
                  <p className="text-sm text-muted-foreground">
                    All characters grouped by row. Toggle romaji off to self-test.
                  </p>
                </div>
                <KanaStudy />
              </TabsContent>

              <TabsContent value="quiz">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Kana Quiz</h2>
                  <p className="text-sm text-muted-foreground">
                    Pick the romaji or say the character aloud.
                  </p>
                </div>
                <KanaQuiz />
              </TabsContent>

              <TabsContent value="chart">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Quick Reference</h2>
                  <p className="text-sm text-muted-foreground">
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
