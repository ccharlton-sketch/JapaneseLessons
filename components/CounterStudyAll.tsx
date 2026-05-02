"use client";
import { useState } from "react";
import { COUNTER_GROUPS, getCardsByGroup } from "@/data/counters";
import { speak } from "@/lib/speech";
import { useTTSPreference } from "@/lib/useTTSPreference";
import { Volume2, VolumeX } from "lucide-react";

function groupByCounter(cards: ReturnType<typeof getCardsByGroup>) {
  const map = new Map<string, { usedFor: string; cards: typeof cards }>();
  for (const card of cards) {
    if (!map.has(card.counter)) {
      map.set(card.counter, { usedFor: card.usedFor, cards: [] });
    }
    map.get(card.counter)!.cards.push(card);
  }
  return map;
}

export default function CounterStudyAll() {
  const [showReading, setShowReading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<number | "all">("all");
  const { enabled: ttsEnabled, toggle: toggleTTS } = useTTSPreference();

  const groups = activeGroup === "all" ? COUNTER_GROUPS : COUNTER_GROUPS.filter((g) => g.id === activeGroup);
  const allCards = groups.flatMap((g) => getCardsByGroup(g.id));
  const grouped = groupByCounter(allCards);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setShowReading((r) => !r)}
          className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
            showReading ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
          }`}
        >
          {showReading ? "Reading ON" : "Reading OFF"}
        </button>
        <button
          onClick={toggleTTS}
          title={ttsEnabled ? "Mute pronunciation" : "Unmute pronunciation"}
          className={`leading-none ml-auto transition-opacity duration-200 ${ttsEnabled ? "opacity-100" : "opacity-30"}`}
        >
          {ttsEnabled ? <Volume2 className="size-5" strokeWidth={1.5} /> : <VolumeX className="size-5" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Group filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveGroup("all")}
          className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
            activeGroup === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
          }`}
        >
          All
        </button>
        {COUNTER_GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
              activeGroup === g.id ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      {ttsEnabled && (
        <p className="text-xs text-muted-foreground">Click any row to hear it.</p>
      )}

      {/* Counter sections */}
      {[...grouped.entries()].map(([counter, { usedFor, cards: counterCards }]) => (
        <div key={counter}>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-base font-bold font-japanese">{counter}</span>
            <span className="text-xs text-muted-foreground">{usedFor}</span>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-xs text-muted-foreground">
                  <th className="text-left px-3 py-2 font-medium">English</th>
                  <th className="text-left px-3 py-2 font-medium font-japanese">Japanese</th>
                  {showReading && <th className="text-left px-3 py-2 font-medium">Hint</th>}
                </tr>
              </thead>
              <tbody>
                {counterCards.map((card, i) => (
                  <tr
                    key={card.id}
                    onClick={() => ttsEnabled && speak(card.reading)}
                    className={`border-t transition-colors ${
                      ttsEnabled ? "cursor-pointer hover:bg-primary/5" : ""
                    } ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                  >
                    <td className="px-3 py-2.5 text-muted-foreground">{card.question}</td>
                    <td className="px-3 py-2.5 font-japanese text-lg font-medium">{card.answer}</td>
                    {showReading && (
                      <td className="px-3 py-2.5 text-xs text-muted-foreground italic">{card.hint}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
