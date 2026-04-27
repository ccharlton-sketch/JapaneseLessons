"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const HIRAGANA_ROWS = [
  ["あ", "い", "う", "え", "お"],
  ["か", "き", "く", "け", "こ"],
  ["さ", "し", "す", "せ", "そ"],
  ["た", "ち", "つ", "て", "と"],
  ["な", "に", "ぬ", "ね", "の"],
  ["は", "ひ", "ふ", "へ", "ほ"],
  ["ま", "み", "む", "め", "も"],
  ["や", "", "ゆ", "", "よ"],
  ["ら", "り", "る", "れ", "ろ"],
  ["わ", "", "を", "", "ん"],
  ["が", "ぎ", "ぐ", "げ", "ご"],
  ["ざ", "じ", "ず", "ぜ", "ぞ"],
  ["だ", "ぢ", "づ", "で", "ど"],
  ["ば", "び", "ぶ", "べ", "ぼ"],
  ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
  ["きゃ", "きゅ", "きょ", "しゃ", "しゅ"],
  ["しょ", "ちゃ", "ちゅ", "ちょ", "にゃ"],
  ["にゅ", "にょ", "ひゃ", "ひゅ", "ひょ"],
  ["みゃ", "みゅ", "みょ", "りゃ", "りゅ"],
  ["りょ", "ぎゃ", "ぎゅ", "ぎょ", "じゃ"],
  ["じゅ", "じょ", "びゃ", "びゅ", "びょ"],
  ["ぴゃ", "ぴゅ", "ぴょ", "っ", "ー"],
];

const KATAKANA_ROWS = [
  ["ア", "イ", "ウ", "エ", "オ"],
  ["カ", "キ", "ク", "ケ", "コ"],
  ["サ", "シ", "ス", "セ", "ソ"],
  ["タ", "チ", "ツ", "テ", "ト"],
  ["ナ", "ニ", "ヌ", "ネ", "ノ"],
  ["ハ", "ヒ", "フ", "ヘ", "ホ"],
  ["マ", "ミ", "ム", "メ", "モ"],
  ["ヤ", "", "ユ", "", "ヨ"],
  ["ラ", "リ", "ル", "レ", "ロ"],
  ["ワ", "", "ヲ", "", "ン"],
  ["ガ", "ギ", "グ", "ゲ", "ゴ"],
  ["ザ", "ジ", "ズ", "ゼ", "ゾ"],
  ["ダ", "ヂ", "ヅ", "デ", "ド"],
  ["バ", "ビ", "ブ", "ベ", "ボ"],
  ["パ", "ピ", "プ", "ペ", "ポ"],
  ["キャ", "キュ", "キョ", "シャ", "シュ"],
  ["ショ", "チャ", "チュ", "チョ", "ニャ"],
  ["ニュ", "ニョ", "ヒャ", "ヒュ", "ヒョ"],
  ["ミャ", "ミュ", "ミョ", "リャ", "リュ"],
  ["リョ", "ギャ", "ギュ", "ギョ", "ジャ"],
  ["ジュ", "ジョ", "ビャ", "ビュ", "ビョ"],
  ["ピャ", "ピュ", "ピョ", "ッ", "ー"],
];

interface Props {
  onInsert: (char: string) => void;
  onBackspace: () => void;
}

export default function KanaKeyboard({ onInsert, onBackspace }: Props) {
  const [tab, setTab] = useState<"hiragana" | "katakana">("hiragana");
  const rows = tab === "hiragana" ? HIRAGANA_ROWS : KATAKANA_ROWS;

  return (
    <div className="rounded-xl border bg-card p-3 shadow-md">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setTab("hiragana")}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            tab === "hiragana"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          ひらがな
        </button>
        <button
          onClick={() => setTab("katakana")}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            tab === "katakana"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          カタカナ
        </button>
        <button
          onClick={onBackspace}
          className="ml-auto px-3 py-1 rounded text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
        >
          ⌫
        </button>
      </div>
      <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-1">
            {row.map((char, ci) =>
              char ? (
                <button
                  key={ci}
                  onClick={() => onInsert(char)}
                  className="flex-1 min-w-0 py-1 text-sm rounded hover:bg-primary/10 active:bg-primary/20 transition-colors font-japanese text-center"
                >
                  {char}
                </button>
              ) : (
                <div key={ci} className="flex-1" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
