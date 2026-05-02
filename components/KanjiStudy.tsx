"use client";
import { useState } from "react";
import { ALL_KANJI, KANJI_LEVELS, KanjiCard } from "@/data/kanji";
import { speak } from "@/lib/speech";
import { useTTSPreference } from "@/lib/useTTSPreference";
import { Volume2, VolumeX } from "lucide-react";

export default function KanjiStudy() {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3 | 4 | 5 | "all">("all");
  const [showReadings, setShowReadings] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { enabled: ttsEnabled, toggle: toggleTTS } = useTTSPreference();

  const cards = activeLevel === "all" ? ALL_KANJI : ALL_KANJI.filter((k) => k.level === activeLevel);

  function handleCardClick(card: KanjiCard) {
    if (expandedId === card.id) {
      setExpandedId(null);
    } else {
      setExpandedId(card.id);
      if (ttsEnabled) speak(card.kunyomi[0]?.replace(/[()（）]/g, "") || card.onyomi[0] || card.kanji);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShowReadings((s) => !s)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            showReadings ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
          }`}
        >
          {showReadings ? "Readings ON" : "Readings OFF"}
        </button>
        <button
          onClick={toggleTTS}
          title={ttsEnabled ? "Mute pronunciation" : "Unmute pronunciation"}
          className={`leading-none ml-auto transition-opacity duration-200 ${ttsEnabled ? "opacity-100" : "opacity-30"}`}
        >
          {ttsEnabled ? <Volume2 className="size-5" strokeWidth={1.5} /> : <VolumeX className="size-5" strokeWidth={1.5} />}
        </button>
      </div>

      {ttsEnabled && (
        <p className="text-xs text-muted-foreground -mt-2">Click any kanji to hear it.</p>
      )}

      {/* Level filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveLevel("all")}
          className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
            activeLevel === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
          }`}
        >
          All ({ALL_KANJI.length})
        </button>
        {KANJI_LEVELS.map(({ level, title, count }) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
              activeLevel === level ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
            }`}
          >
            {title} ({count})
          </button>
        ))}
      </div>

      {/* Kanji grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {cards.map((card) => {
          const isExpanded = expandedId === card.id;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`relative flex flex-col items-center justify-center rounded-xl border p-3 font-japanese transition-all hover-lift active:scale-[0.97] ${
                isExpanded
                  ? "col-span-2 row-span-2 bg-primary/5 border-primary/50 card-elevated-hover"
                  : "bg-card card-elevated hover:card-elevated-hover hover:border-primary/50"
              }`}
            >
              <span className={`font-bold ${isExpanded ? "text-4xl" : "text-2xl"}`}>
                {card.kanji}
              </span>
              {showReadings && !isExpanded && (
                <span className="text-[10px] text-muted-foreground mt-1 leading-tight truncate max-w-full">
                  {card.meanings[0]}
                </span>
              )}
              {isExpanded && (
                <div className="mt-2 text-xs text-center space-y-1">
                  <div className="font-semibold text-sm">{card.meanings.join(", ")}</div>
                  {card.onyomi.length > 0 && (
                    <div className="text-muted-foreground">
                      <span className="font-medium">On:</span> {card.onyomi.join(", ")}
                    </div>
                  )}
                  {card.kunyomi.length > 0 && (
                    <div className="text-muted-foreground">
                      <span className="font-medium">Kun:</span> {card.kunyomi.join(", ")}
                    </div>
                  )}
                  <div className="text-muted-foreground">{card.strokeCount} strokes</div>
                  {card.examples[0] && (
                    <div className="pt-1 border-t border-border/50">
                      <span className="font-japanese font-medium">{card.examples[0].word}</span>
                      <span className="text-muted-foreground ml-1">({card.examples[0].reading})</span>
                      <div className="text-muted-foreground">{card.examples[0].meaning}</div>
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
