"use client";
import { useRouter } from "next/navigation";
import { Hash } from "lucide-react";
import CounterGroupMap from "@/components/CounterGroupMap";

export default function CountersPage() {
  const router = useRouter();
  return (
    <main className="min-h-[100dvh] bg-ambient">
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ← Back
          </button>
          <Hash className="size-5 text-primary" strokeWidth={1.5} />
          <div>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Japanese Counters</h1>
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
