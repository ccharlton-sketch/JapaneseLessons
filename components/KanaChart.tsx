"use client";
import { useState } from "react";
import { speak } from "@/lib/speech";
import { useTTSPreference } from "@/lib/useTTSPreference";

const HIRAGANA: [string, string][] = [
  ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
  ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
  ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
  ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
  ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
  ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
  ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
  ["や","ya"],["ゆ","yu"],["よ","yo"],
  ["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
  ["わ","wa"],["を","wo"],["ん","n"],
];

const KATAKANA: [string, string][] = [
  ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
  ["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
  ["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
  ["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
  ["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
  ["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
  ["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
  ["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
  ["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
  ["ワ","wa"],["ヲ","wo"],["ン","n"],
];

export default function KanaChart() {
  const [tab, setTab] = useState<"hiragana" | "katakana">("hiragana");
  const { enabled: ttsEnabled, toggle: toggleTTS } = useTTSPreference();
  const data = tab === "hiragana" ? HIRAGANA : KATAKANA;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        {(["hiragana", "katakana"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t === "hiragana" ? "ひらがな Hiragana" : "カタカナ Katakana"}
          </button>
        ))}
        <button
          onClick={toggleTTS}
          title={ttsEnabled ? "Mute pronunciation" : "Unmute pronunciation"}
          className={`ml-auto text-lg leading-none transition-opacity ${ttsEnabled ? "opacity-100" : "opacity-30"}`}
        >
          🔊
        </button>
      </div>
      {ttsEnabled && (
        <p className="text-xs text-muted-foreground mb-3">Click any character to hear it spoken.</p>
      )}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
        {data.map(([kana, romaji]) => (
          <button
            key={kana}
            onClick={() => ttsEnabled && speak(kana)}
            className={`flex flex-col items-center rounded-lg border bg-card py-2 px-1 transition-all ${
              ttsEnabled
                ? "hover:border-primary hover:bg-primary/5 active:scale-95 cursor-pointer"
                : "cursor-default"
            }`}
            title={ttsEnabled ? `Pronounce: ${romaji}` : romaji}
          >
            <span className="text-xl font-japanese">{kana}</span>
            <span className="text-xs text-muted-foreground mt-0.5">{romaji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
