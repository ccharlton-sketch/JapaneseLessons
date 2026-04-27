"use client";
import { useState } from "react";
import { speak } from "@/lib/speech";
import { useTTSPreference } from "@/lib/useTTSPreference";

interface KanaCell {
  hiragana: string;
  katakana: string;
  romaji: string;
}

interface KanaRow {
  label: string;
  cells: (KanaCell | null)[];
}

interface KanaSection {
  title: string;
  rows: KanaRow[];
}

const SECTIONS: KanaSection[] = [
  {
    title: "Basic (清音)",
    rows: [
      { label: "あ行", cells: [
        { hiragana: "あ", katakana: "ア", romaji: "a" },
        { hiragana: "い", katakana: "イ", romaji: "i" },
        { hiragana: "う", katakana: "ウ", romaji: "u" },
        { hiragana: "え", katakana: "エ", romaji: "e" },
        { hiragana: "お", katakana: "オ", romaji: "o" },
      ]},
      { label: "か行", cells: [
        { hiragana: "か", katakana: "カ", romaji: "ka" },
        { hiragana: "き", katakana: "キ", romaji: "ki" },
        { hiragana: "く", katakana: "ク", romaji: "ku" },
        { hiragana: "け", katakana: "ケ", romaji: "ke" },
        { hiragana: "こ", katakana: "コ", romaji: "ko" },
      ]},
      { label: "さ行", cells: [
        { hiragana: "さ", katakana: "サ", romaji: "sa" },
        { hiragana: "し", katakana: "シ", romaji: "shi" },
        { hiragana: "す", katakana: "ス", romaji: "su" },
        { hiragana: "せ", katakana: "セ", romaji: "se" },
        { hiragana: "そ", katakana: "ソ", romaji: "so" },
      ]},
      { label: "た行", cells: [
        { hiragana: "た", katakana: "タ", romaji: "ta" },
        { hiragana: "ち", katakana: "チ", romaji: "chi" },
        { hiragana: "つ", katakana: "ツ", romaji: "tsu" },
        { hiragana: "て", katakana: "テ", romaji: "te" },
        { hiragana: "と", katakana: "ト", romaji: "to" },
      ]},
      { label: "な行", cells: [
        { hiragana: "な", katakana: "ナ", romaji: "na" },
        { hiragana: "に", katakana: "ニ", romaji: "ni" },
        { hiragana: "ぬ", katakana: "ヌ", romaji: "nu" },
        { hiragana: "ね", katakana: "ネ", romaji: "ne" },
        { hiragana: "の", katakana: "ノ", romaji: "no" },
      ]},
      { label: "は行", cells: [
        { hiragana: "は", katakana: "ハ", romaji: "ha" },
        { hiragana: "ひ", katakana: "ヒ", romaji: "hi" },
        { hiragana: "ふ", katakana: "フ", romaji: "fu" },
        { hiragana: "へ", katakana: "ヘ", romaji: "he" },
        { hiragana: "ほ", katakana: "ホ", romaji: "ho" },
      ]},
      { label: "ま行", cells: [
        { hiragana: "ま", katakana: "マ", romaji: "ma" },
        { hiragana: "み", katakana: "ミ", romaji: "mi" },
        { hiragana: "む", katakana: "ム", romaji: "mu" },
        { hiragana: "め", katakana: "メ", romaji: "me" },
        { hiragana: "も", katakana: "モ", romaji: "mo" },
      ]},
      { label: "や行", cells: [
        { hiragana: "や", katakana: "ヤ", romaji: "ya" },
        null,
        { hiragana: "ゆ", katakana: "ユ", romaji: "yu" },
        null,
        { hiragana: "よ", katakana: "ヨ", romaji: "yo" },
      ]},
      { label: "ら行", cells: [
        { hiragana: "ら", katakana: "ラ", romaji: "ra" },
        { hiragana: "り", katakana: "リ", romaji: "ri" },
        { hiragana: "る", katakana: "ル", romaji: "ru" },
        { hiragana: "れ", katakana: "レ", romaji: "re" },
        { hiragana: "ろ", katakana: "ロ", romaji: "ro" },
      ]},
      { label: "わ行", cells: [
        { hiragana: "わ", katakana: "ワ", romaji: "wa" },
        null,
        { hiragana: "を", katakana: "ヲ", romaji: "wo" },
        null,
        { hiragana: "ん", katakana: "ン", romaji: "n" },
      ]},
    ],
  },
  {
    title: "Voiced (濁音・半濁音)",
    rows: [
      { label: "が行", cells: [
        { hiragana: "が", katakana: "ガ", romaji: "ga" },
        { hiragana: "ぎ", katakana: "ギ", romaji: "gi" },
        { hiragana: "ぐ", katakana: "グ", romaji: "gu" },
        { hiragana: "げ", katakana: "ゲ", romaji: "ge" },
        { hiragana: "ご", katakana: "ゴ", romaji: "go" },
      ]},
      { label: "ざ行", cells: [
        { hiragana: "ざ", katakana: "ザ", romaji: "za" },
        { hiragana: "じ", katakana: "ジ", romaji: "ji" },
        { hiragana: "ず", katakana: "ズ", romaji: "zu" },
        { hiragana: "ぜ", katakana: "ゼ", romaji: "ze" },
        { hiragana: "ぞ", katakana: "ゾ", romaji: "zo" },
      ]},
      { label: "だ行", cells: [
        { hiragana: "だ", katakana: "ダ", romaji: "da" },
        { hiragana: "ぢ", katakana: "ヂ", romaji: "ji" },
        { hiragana: "づ", katakana: "ヅ", romaji: "zu" },
        { hiragana: "で", katakana: "デ", romaji: "de" },
        { hiragana: "ど", katakana: "ド", romaji: "do" },
      ]},
      { label: "ば行", cells: [
        { hiragana: "ば", katakana: "バ", romaji: "ba" },
        { hiragana: "び", katakana: "ビ", romaji: "bi" },
        { hiragana: "ぶ", katakana: "ブ", romaji: "bu" },
        { hiragana: "べ", katakana: "ベ", romaji: "be" },
        { hiragana: "ぼ", katakana: "ボ", romaji: "bo" },
      ]},
      { label: "ぱ行", cells: [
        { hiragana: "ぱ", katakana: "パ", romaji: "pa" },
        { hiragana: "ぴ", katakana: "ピ", romaji: "pi" },
        { hiragana: "ぷ", katakana: "プ", romaji: "pu" },
        { hiragana: "ぺ", katakana: "ペ", romaji: "pe" },
        { hiragana: "ぽ", katakana: "ポ", romaji: "po" },
      ]},
    ],
  },
  {
    title: "Combinations (拗音)",
    rows: [
      { label: "きゃ", cells: [
        { hiragana: "きゃ", katakana: "キャ", romaji: "kya" },
        { hiragana: "きゅ", katakana: "キュ", romaji: "kyu" },
        { hiragana: "きょ", katakana: "キョ", romaji: "kyo" },
        null, null,
      ]},
      { label: "しゃ", cells: [
        { hiragana: "しゃ", katakana: "シャ", romaji: "sha" },
        { hiragana: "しゅ", katakana: "シュ", romaji: "shu" },
        { hiragana: "しょ", katakana: "ショ", romaji: "sho" },
        null, null,
      ]},
      { label: "ちゃ", cells: [
        { hiragana: "ちゃ", katakana: "チャ", romaji: "cha" },
        { hiragana: "ちゅ", katakana: "チュ", romaji: "chu" },
        { hiragana: "ちょ", katakana: "チョ", romaji: "cho" },
        null, null,
      ]},
      { label: "にゃ", cells: [
        { hiragana: "にゃ", katakana: "ニャ", romaji: "nya" },
        { hiragana: "にゅ", katakana: "ニュ", romaji: "nyu" },
        { hiragana: "にょ", katakana: "ニョ", romaji: "nyo" },
        null, null,
      ]},
      { label: "ひゃ", cells: [
        { hiragana: "ひゃ", katakana: "ヒャ", romaji: "hya" },
        { hiragana: "ひゅ", katakana: "ヒュ", romaji: "hyu" },
        { hiragana: "ひょ", katakana: "ヒョ", romaji: "hyo" },
        null, null,
      ]},
      { label: "みゃ", cells: [
        { hiragana: "みゃ", katakana: "ミャ", romaji: "mya" },
        { hiragana: "みゅ", katakana: "ミュ", romaji: "myu" },
        { hiragana: "みょ", katakana: "ミョ", romaji: "myo" },
        null, null,
      ]},
      { label: "りゃ", cells: [
        { hiragana: "りゃ", katakana: "リャ", romaji: "rya" },
        { hiragana: "りゅ", katakana: "リュ", romaji: "ryu" },
        { hiragana: "りょ", katakana: "リョ", romaji: "ryo" },
        null, null,
      ]},
      { label: "ぎゃ", cells: [
        { hiragana: "ぎゃ", katakana: "ギャ", romaji: "gya" },
        { hiragana: "ぎゅ", katakana: "ギュ", romaji: "gyu" },
        { hiragana: "ぎょ", katakana: "ギョ", romaji: "gyo" },
        null, null,
      ]},
      { label: "じゃ", cells: [
        { hiragana: "じゃ", katakana: "ジャ", romaji: "ja" },
        { hiragana: "じゅ", katakana: "ジュ", romaji: "ju" },
        { hiragana: "じょ", katakana: "ジョ", romaji: "jo" },
        null, null,
      ]},
      { label: "びゃ", cells: [
        { hiragana: "びゃ", katakana: "ビャ", romaji: "bya" },
        { hiragana: "びゅ", katakana: "ビュ", romaji: "byu" },
        { hiragana: "びょ", katakana: "ビョ", romaji: "byo" },
        null, null,
      ]},
      { label: "ぴゃ", cells: [
        { hiragana: "ぴゃ", katakana: "ピャ", romaji: "pya" },
        { hiragana: "ぴゅ", katakana: "ピュ", romaji: "pyu" },
        { hiragana: "ぴょ", katakana: "ピョ", romaji: "pyo" },
        null, null,
      ]},
    ],
  },
];

type Script = "both" | "hiragana" | "katakana";

export default function KanaStudy() {
  const [script, setScript] = useState<Script>("both");
  const [showRomaji, setShowRomaji] = useState(true);
  const { enabled: ttsEnabled, toggle: toggleTTS } = useTTSPreference();

  function handleClick(cell: KanaCell) {
    if (!ttsEnabled) return;
    speak(cell.hiragana);
  }

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Script filter */}
        <div className="flex rounded-lg border overflow-hidden text-sm">
          {(["both", "hiragana", "katakana"] as Script[]).map((s) => (
            <button
              key={s}
              onClick={() => setScript(s)}
              className={`px-3 py-1.5 transition-colors capitalize ${
                script === s ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
              }`}
            >
              {s === "both" ? "Both" : s === "hiragana" ? "ひらがな" : "カタカナ"}
            </button>
          ))}
        </div>

        {/* Romaji toggle */}
        <button
          onClick={() => setShowRomaji((r) => !r)}
          className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
            showRomaji ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
          }`}
          title="Toggle romaji"
        >
          {showRomaji ? "Romaji ON" : "Romaji OFF"}
        </button>

        {/* TTS toggle */}
        <button
          onClick={toggleTTS}
          title={ttsEnabled ? "Mute pronunciation" : "Unmute pronunciation"}
          className={`text-lg leading-none ml-auto transition-opacity ${ttsEnabled ? "opacity-100" : "opacity-30"}`}
        >
          🔊
        </button>
      </div>

      {ttsEnabled && (
        <p className="text-xs text-muted-foreground -mt-3">Click any character to hear it.</p>
      )}

      {/* Sections */}
      {SECTIONS.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            {section.title}
          </h3>
          <div className="space-y-2">
            {section.rows.map((row) => (
              <div key={row.label} className="flex items-center gap-1">
                {/* Row label */}
                <div className="w-8 shrink-0 text-xs text-muted-foreground font-japanese text-right pr-1">
                  {row.label}
                </div>
                {/* Cells */}
                <div className="flex gap-1 flex-1">
                  {row.cells.map((cell, ci) =>
                    cell ? (
                      <button
                        key={ci}
                        onClick={() => handleClick(cell)}
                        className={`flex-1 rounded-lg border bg-card py-2 px-1 text-center transition-all ${
                          ttsEnabled
                            ? "hover:border-primary hover:bg-primary/5 active:scale-95 cursor-pointer"
                            : "cursor-default"
                        }`}
                        title={cell.romaji}
                      >
                        {(script === "both" || script === "hiragana") && (
                          <div className="font-japanese text-lg leading-tight">{cell.hiragana}</div>
                        )}
                        {script === "both" && (
                          <div className="font-japanese text-xs text-muted-foreground leading-tight mt-0.5">
                            {cell.katakana}
                          </div>
                        )}
                        {script === "katakana" && (
                          <div className="font-japanese text-lg leading-tight">{cell.katakana}</div>
                        )}
                        {showRomaji && (
                          <div className="text-xs text-muted-foreground mt-0.5 leading-tight">
                            {cell.romaji}
                          </div>
                        )}
                      </button>
                    ) : (
                      <div key={ci} className="flex-1" />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
