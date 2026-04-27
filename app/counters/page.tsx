"use client";
import { useRouter } from "next/navigation";
import CounterGroupMap from "@/components/CounterGroupMap";

export default function CountersPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            ← Back
          </button>
          <span className="text-2xl">🔢</span>
          <div>
            <h1 className="text-xl font-bold leading-tight">Japanese Counters</h1>
            <p className="text-xs text-muted-foreground">Learn how to count everything</p>
          </div>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-5">
          <p className="text-sm text-muted-foreground">
            Japanese uses different counting words depending on what you're counting — objects, people, animals, time, and more. All groups are unlocked.
          </p>
        </div>
        <CounterGroupMap onSelect={(g) => router.push(`/counters/${g}`)} />
      </div>
    </main>
  );
}
