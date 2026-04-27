export interface KanaCard {
  id: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  section: "basic" | "voiced" | "combinations";
}

const BASIC: KanaCard[] = [
  { id: "k001", hiragana: "あ", katakana: "ア", romaji: "a", section: "basic" },
  { id: "k002", hiragana: "い", katakana: "イ", romaji: "i", section: "basic" },
  { id: "k003", hiragana: "う", katakana: "ウ", romaji: "u", section: "basic" },
  { id: "k004", hiragana: "え", katakana: "エ", romaji: "e", section: "basic" },
  { id: "k005", hiragana: "お", katakana: "オ", romaji: "o", section: "basic" },
  { id: "k006", hiragana: "か", katakana: "カ", romaji: "ka", section: "basic" },
  { id: "k007", hiragana: "き", katakana: "キ", romaji: "ki", section: "basic" },
  { id: "k008", hiragana: "く", katakana: "ク", romaji: "ku", section: "basic" },
  { id: "k009", hiragana: "け", katakana: "ケ", romaji: "ke", section: "basic" },
  { id: "k010", hiragana: "こ", katakana: "コ", romaji: "ko", section: "basic" },
  { id: "k011", hiragana: "さ", katakana: "サ", romaji: "sa", section: "basic" },
  { id: "k012", hiragana: "し", katakana: "シ", romaji: "shi", section: "basic" },
  { id: "k013", hiragana: "す", katakana: "ス", romaji: "su", section: "basic" },
  { id: "k014", hiragana: "せ", katakana: "セ", romaji: "se", section: "basic" },
  { id: "k015", hiragana: "そ", katakana: "ソ", romaji: "so", section: "basic" },
  { id: "k016", hiragana: "た", katakana: "タ", romaji: "ta", section: "basic" },
  { id: "k017", hiragana: "ち", katakana: "チ", romaji: "chi", section: "basic" },
  { id: "k018", hiragana: "つ", katakana: "ツ", romaji: "tsu", section: "basic" },
  { id: "k019", hiragana: "て", katakana: "テ", romaji: "te", section: "basic" },
  { id: "k020", hiragana: "と", katakana: "ト", romaji: "to", section: "basic" },
  { id: "k021", hiragana: "な", katakana: "ナ", romaji: "na", section: "basic" },
  { id: "k022", hiragana: "に", katakana: "ニ", romaji: "ni", section: "basic" },
  { id: "k023", hiragana: "ぬ", katakana: "ヌ", romaji: "nu", section: "basic" },
  { id: "k024", hiragana: "ね", katakana: "ネ", romaji: "ne", section: "basic" },
  { id: "k025", hiragana: "の", katakana: "ノ", romaji: "no", section: "basic" },
  { id: "k026", hiragana: "は", katakana: "ハ", romaji: "ha", section: "basic" },
  { id: "k027", hiragana: "ひ", katakana: "ヒ", romaji: "hi", section: "basic" },
  { id: "k028", hiragana: "ふ", katakana: "フ", romaji: "fu", section: "basic" },
  { id: "k029", hiragana: "へ", katakana: "ヘ", romaji: "he", section: "basic" },
  { id: "k030", hiragana: "ほ", katakana: "ホ", romaji: "ho", section: "basic" },
  { id: "k031", hiragana: "ま", katakana: "マ", romaji: "ma", section: "basic" },
  { id: "k032", hiragana: "み", katakana: "ミ", romaji: "mi", section: "basic" },
  { id: "k033", hiragana: "む", katakana: "ム", romaji: "mu", section: "basic" },
  { id: "k034", hiragana: "め", katakana: "メ", romaji: "me", section: "basic" },
  { id: "k035", hiragana: "も", katakana: "モ", romaji: "mo", section: "basic" },
  { id: "k036", hiragana: "や", katakana: "ヤ", romaji: "ya", section: "basic" },
  { id: "k037", hiragana: "ゆ", katakana: "ユ", romaji: "yu", section: "basic" },
  { id: "k038", hiragana: "よ", katakana: "ヨ", romaji: "yo", section: "basic" },
  { id: "k039", hiragana: "ら", katakana: "ラ", romaji: "ra", section: "basic" },
  { id: "k040", hiragana: "り", katakana: "リ", romaji: "ri", section: "basic" },
  { id: "k041", hiragana: "る", katakana: "ル", romaji: "ru", section: "basic" },
  { id: "k042", hiragana: "れ", katakana: "レ", romaji: "re", section: "basic" },
  { id: "k043", hiragana: "ろ", katakana: "ロ", romaji: "ro", section: "basic" },
  { id: "k044", hiragana: "わ", katakana: "ワ", romaji: "wa", section: "basic" },
  { id: "k045", hiragana: "を", katakana: "ヲ", romaji: "wo", section: "basic" },
  { id: "k046", hiragana: "ん", katakana: "ン", romaji: "n", section: "basic" },
];

const VOICED: KanaCard[] = [
  { id: "k047", hiragana: "が", katakana: "ガ", romaji: "ga", section: "voiced" },
  { id: "k048", hiragana: "ぎ", katakana: "ギ", romaji: "gi", section: "voiced" },
  { id: "k049", hiragana: "ぐ", katakana: "グ", romaji: "gu", section: "voiced" },
  { id: "k050", hiragana: "げ", katakana: "ゲ", romaji: "ge", section: "voiced" },
  { id: "k051", hiragana: "ご", katakana: "ゴ", romaji: "go", section: "voiced" },
  { id: "k052", hiragana: "ざ", katakana: "ザ", romaji: "za", section: "voiced" },
  { id: "k053", hiragana: "じ", katakana: "ジ", romaji: "ji", section: "voiced" },
  { id: "k054", hiragana: "ず", katakana: "ズ", romaji: "zu", section: "voiced" },
  { id: "k055", hiragana: "ぜ", katakana: "ゼ", romaji: "ze", section: "voiced" },
  { id: "k056", hiragana: "ぞ", katakana: "ゾ", romaji: "zo", section: "voiced" },
  { id: "k057", hiragana: "だ", katakana: "ダ", romaji: "da", section: "voiced" },
  { id: "k058", hiragana: "で", katakana: "デ", romaji: "de", section: "voiced" },
  { id: "k059", hiragana: "ど", katakana: "ド", romaji: "do", section: "voiced" },
  { id: "k060", hiragana: "ば", katakana: "バ", romaji: "ba", section: "voiced" },
  { id: "k061", hiragana: "び", katakana: "ビ", romaji: "bi", section: "voiced" },
  { id: "k062", hiragana: "ぶ", katakana: "ブ", romaji: "bu", section: "voiced" },
  { id: "k063", hiragana: "べ", katakana: "ベ", romaji: "be", section: "voiced" },
  { id: "k064", hiragana: "ぼ", katakana: "ボ", romaji: "bo", section: "voiced" },
  { id: "k065", hiragana: "ぱ", katakana: "パ", romaji: "pa", section: "voiced" },
  { id: "k066", hiragana: "ぴ", katakana: "ピ", romaji: "pi", section: "voiced" },
  { id: "k067", hiragana: "ぷ", katakana: "プ", romaji: "pu", section: "voiced" },
  { id: "k068", hiragana: "ぺ", katakana: "ペ", romaji: "pe", section: "voiced" },
  { id: "k069", hiragana: "ぽ", katakana: "ポ", romaji: "po", section: "voiced" },
];

const COMBINATIONS: KanaCard[] = [
  { id: "k070", hiragana: "きゃ", katakana: "キャ", romaji: "kya", section: "combinations" },
  { id: "k071", hiragana: "きゅ", katakana: "キュ", romaji: "kyu", section: "combinations" },
  { id: "k072", hiragana: "きょ", katakana: "キョ", romaji: "kyo", section: "combinations" },
  { id: "k073", hiragana: "しゃ", katakana: "シャ", romaji: "sha", section: "combinations" },
  { id: "k074", hiragana: "しゅ", katakana: "シュ", romaji: "shu", section: "combinations" },
  { id: "k075", hiragana: "しょ", katakana: "ショ", romaji: "sho", section: "combinations" },
  { id: "k076", hiragana: "ちゃ", katakana: "チャ", romaji: "cha", section: "combinations" },
  { id: "k077", hiragana: "ちゅ", katakana: "チュ", romaji: "chu", section: "combinations" },
  { id: "k078", hiragana: "ちょ", katakana: "チョ", romaji: "cho", section: "combinations" },
  { id: "k079", hiragana: "にゃ", katakana: "ニャ", romaji: "nya", section: "combinations" },
  { id: "k080", hiragana: "にゅ", katakana: "ニュ", romaji: "nyu", section: "combinations" },
  { id: "k081", hiragana: "にょ", katakana: "ニョ", romaji: "nyo", section: "combinations" },
  { id: "k082", hiragana: "ひゃ", katakana: "ヒャ", romaji: "hya", section: "combinations" },
  { id: "k083", hiragana: "ひゅ", katakana: "ヒュ", romaji: "hyu", section: "combinations" },
  { id: "k084", hiragana: "ひょ", katakana: "ヒョ", romaji: "hyo", section: "combinations" },
  { id: "k085", hiragana: "みゃ", katakana: "ミャ", romaji: "mya", section: "combinations" },
  { id: "k086", hiragana: "みゅ", katakana: "ミュ", romaji: "myu", section: "combinations" },
  { id: "k087", hiragana: "みょ", katakana: "ミョ", romaji: "myo", section: "combinations" },
  { id: "k088", hiragana: "りゃ", katakana: "リャ", romaji: "rya", section: "combinations" },
  { id: "k089", hiragana: "りゅ", katakana: "リュ", romaji: "ryu", section: "combinations" },
  { id: "k090", hiragana: "りょ", katakana: "リョ", romaji: "ryo", section: "combinations" },
  { id: "k091", hiragana: "ぎゃ", katakana: "ギャ", romaji: "gya", section: "combinations" },
  { id: "k092", hiragana: "ぎゅ", katakana: "ギュ", romaji: "gyu", section: "combinations" },
  { id: "k093", hiragana: "ぎょ", katakana: "ギョ", romaji: "gyo", section: "combinations" },
  { id: "k094", hiragana: "じゃ", katakana: "ジャ", romaji: "ja", section: "combinations" },
  { id: "k095", hiragana: "じゅ", katakana: "ジュ", romaji: "ju", section: "combinations" },
  { id: "k096", hiragana: "じょ", katakana: "ジョ", romaji: "jo", section: "combinations" },
  { id: "k097", hiragana: "びゃ", katakana: "ビャ", romaji: "bya", section: "combinations" },
  { id: "k098", hiragana: "びゅ", katakana: "ビュ", romaji: "byu", section: "combinations" },
  { id: "k099", hiragana: "びょ", katakana: "ビョ", romaji: "byo", section: "combinations" },
  { id: "k100", hiragana: "ぴゃ", katakana: "ピャ", romaji: "pya", section: "combinations" },
  { id: "k101", hiragana: "ぴゅ", katakana: "ピュ", romaji: "pyu", section: "combinations" },
  { id: "k102", hiragana: "ぴょ", katakana: "ピョ", romaji: "pyo", section: "combinations" },
];

export const ALL_KANA: KanaCard[] = [...BASIC, ...VOICED, ...COMBINATIONS];

export function sampleKana(
  count: number,
  sections: KanaCard["section"][] = ["basic", "voiced", "combinations"],
): KanaCard[] {
  const pool = ALL_KANA.filter((k) => sections.includes(k.section));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Convert a katakana string to its hiragana equivalent for speech matching
export function katakanaToHiragana(str: string): string {
  return str.replace(/[\u30A1-\u30F6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}
