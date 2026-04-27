export interface CounterQuestion {
  id: string;
  counter: string;       // the counter suffix, e.g. 本
  reading: string;       // hiragana reading of the counter alone
  usedFor: string;       // what it counts
  hint: string;
  examples: CounterExample[];
}

export interface CounterExample {
  number: number;
  japanese: string;      // full form, e.g. 一本
  reading: string;       // hiragana
  english: string;       // "one (long thin object)"
}

export interface CounterQuizCard {
  id: string;
  group: number;
  question: string;      // e.g. "3 birds"
  answer: string;        // the correct Japanese reading
  allAnswers: string[];  // accepted variants
  counter: string;       // for display badge
  usedFor: string;
  hint: string;
  reading: string;       // for TTS
}

// ── GROUP 1: Core everyday counters ───────────────────────────────────────
// つ (general objects), 個 (small objects), 枚 (flat things), 本 (long thin), 冊 (books)

const GENERAL: CounterQuizCard[] = [
  { id: "c001", group: 1, question: "1 (general object)", answer: "ひとつ", allAnswers: ["ひとつ"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "Native Japanese counting — ひ for one", reading: "ひとつ" },
  { id: "c002", group: 1, question: "2 (general objects)", answer: "ふたつ", allAnswers: ["ふたつ"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "ふた sounds like 'futa' (lid/pair)", reading: "ふたつ" },
  { id: "c003", group: 1, question: "3 (general objects)", answer: "みっつ", allAnswers: ["みっつ"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "み — think 'me' (three fingers)", reading: "みっつ" },
  { id: "c004", group: 1, question: "4 (general objects)", answer: "よっつ", allAnswers: ["よっつ"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "よ for four in native counting", reading: "よっつ" },
  { id: "c005", group: 1, question: "5 (general objects)", answer: "いつつ", allAnswers: ["いつつ"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "い repeated — いつつ", reading: "いつつ" },
  { id: "c006", group: 1, question: "6 (general objects)", answer: "むっつ", allAnswers: ["むっつ"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "む for six", reading: "むっつ" },
  { id: "c007", group: 1, question: "7 (general objects)", answer: "ななつ", allAnswers: ["ななつ"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "なな — seven repeated", reading: "ななつ" },
  { id: "c008", group: 1, question: "8 (general objects)", answer: "やっつ", allAnswers: ["やっつ"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "や for eight", reading: "やっつ" },
  { id: "c009", group: 1, question: "9 (general objects)", answer: "ここのつ", allAnswers: ["ここのつ"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "ここの — a longer form for nine", reading: "ここのつ" },
  { id: "c010", group: 1, question: "10 (general objects)", answer: "とお", allAnswers: ["とお"], counter: "〜つ", usedFor: "General objects (native counting)", hint: "とお — no つ at the end for ten!", reading: "とお" },
];

const FLAT: CounterQuizCard[] = [
  { id: "c011", group: 1, question: "1 flat thing (paper, shirt, plate)", answer: "いちまい", allAnswers: ["いちまい"], counter: "〜枚", usedFor: "Flat things: paper, tickets, shirts, plates", hint: "枚 (まい) is for flat, thin objects", reading: "いちまい" },
  { id: "c012", group: 1, question: "2 flat things", answer: "にまい", allAnswers: ["にまい"], counter: "〜枚", usedFor: "Flat things", hint: "に + まい", reading: "にまい" },
  { id: "c013", group: 1, question: "3 flat things", answer: "さんまい", allAnswers: ["さんまい"], counter: "〜枚", usedFor: "Flat things", hint: "さん + まい", reading: "さんまい" },
  { id: "c014", group: 1, question: "5 flat things", answer: "ごまい", allAnswers: ["ごまい"], counter: "〜枚", usedFor: "Flat things", hint: "ご + まい", reading: "ごまい" },
  { id: "c015", group: 1, question: "10 flat things", answer: "じゅうまい", allAnswers: ["じゅうまい"], counter: "〜枚", usedFor: "Flat things", hint: "じゅう + まい", reading: "じゅうまい" },
];

const LONG: CounterQuizCard[] = [
  { id: "c016", group: 1, question: "1 long thin thing (pen, bottle, river)", answer: "いっぽん", allAnswers: ["いっぽん"], counter: "〜本", usedFor: "Long thin objects: pens, bottles, rivers, roads", hint: "本 (ほん/ぽん/ぼん) — one changes to いっぽん", reading: "いっぽん" },
  { id: "c017", group: 1, question: "2 long thin things", answer: "にほん", allAnswers: ["にほん"], counter: "〜本", usedFor: "Long thin objects", hint: "に + ほん (same as the country name!)", reading: "にほん" },
  { id: "c018", group: 1, question: "3 long thin things", answer: "さんぼん", allAnswers: ["さんぼん"], counter: "〜本", usedFor: "Long thin objects", hint: "さん + ぼん (voiced b sound)", reading: "さんぼん" },
  { id: "c019", group: 1, question: "6 long thin things", answer: "ろっぽん", allAnswers: ["ろっぽん"], counter: "〜本", usedFor: "Long thin objects", hint: "ろく → ろっぽん (double p)", reading: "ろっぽん" },
  { id: "c020", group: 1, question: "8 long thin things", answer: "はっぽん", allAnswers: ["はっぽん"], counter: "〜本", usedFor: "Long thin objects", hint: "はち → はっぽん", reading: "はっぽん" },
  { id: "c021", group: 1, question: "10 long thin things", answer: "じゅっぽん", allAnswers: ["じゅっぽん"], counter: "〜本", usedFor: "Long thin objects", hint: "じゅう → じゅっぽん", reading: "じゅっぽん" },
];

const BOOKS: CounterQuizCard[] = [
  { id: "c022", group: 1, question: "1 book / magazine", answer: "いっさつ", allAnswers: ["いっさつ"], counter: "〜冊", usedFor: "Bound books, magazines, notebooks", hint: "冊 (さつ) — one becomes いっさつ", reading: "いっさつ" },
  { id: "c023", group: 1, question: "2 books", answer: "にさつ", allAnswers: ["にさつ"], counter: "〜冊", usedFor: "Books", hint: "に + さつ", reading: "にさつ" },
  { id: "c024", group: 1, question: "3 books", answer: "さんさつ", allAnswers: ["さんさつ"], counter: "〜冊", usedFor: "Books", hint: "さん + さつ", reading: "さんさつ" },
  { id: "c025", group: 1, question: "5 books", answer: "ごさつ", allAnswers: ["ごさつ"], counter: "〜冊", usedFor: "Books", hint: "ご + さつ", reading: "ごさつ" },
];

// ── GROUP 2: People & Animals ──────────────────────────────────────────────
const PEOPLE: CounterQuizCard[] = [
  { id: "c026", group: 2, question: "1 person", answer: "ひとり", allAnswers: ["ひとり"], counter: "〜人", usedFor: "People", hint: "1 person is irregular: ひとり (not いちにん)", reading: "ひとり" },
  { id: "c027", group: 2, question: "2 people", answer: "ふたり", allAnswers: ["ふたり"], counter: "〜人", usedFor: "People", hint: "2 people is also irregular: ふたり", reading: "ふたり" },
  { id: "c028", group: 2, question: "3 people", answer: "さんにん", allAnswers: ["さんにん"], counter: "〜人", usedFor: "People", hint: "From 3 onward it's regular: さん + にん", reading: "さんにん" },
  { id: "c029", group: 2, question: "4 people", answer: "よにん", allAnswers: ["よにん"], counter: "〜人", usedFor: "People", hint: "よ (not し) + にん", reading: "よにん" },
  { id: "c030", group: 2, question: "5 people", answer: "ごにん", allAnswers: ["ごにん"], counter: "〜人", usedFor: "People", hint: "ご + にん", reading: "ごにん" },
  { id: "c031", group: 2, question: "10 people", answer: "じゅうにん", allAnswers: ["じゅうにん"], counter: "〜人", usedFor: "People", hint: "じゅう + にん", reading: "じゅうにん" },
  { id: "c032", group: 2, question: "How many people? (question word)", answer: "なんにん", allAnswers: ["なんにん"], counter: "〜人", usedFor: "People", hint: "なん (how many) + にん", reading: "なんにん" },
];

const SMALL_ANIMALS: CounterQuizCard[] = [
  { id: "c033", group: 2, question: "1 small animal (cat, rabbit, fish)", answer: "いっぴき", allAnswers: ["いっぴき"], counter: "〜匹", usedFor: "Small/medium animals (cats, dogs, fish, insects)", hint: "匹 (ひき/びき/ぴき) — 1 becomes いっぴき", reading: "いっぴき" },
  { id: "c034", group: 2, question: "2 small animals", answer: "にひき", allAnswers: ["にひき"], counter: "〜匹", usedFor: "Small animals", hint: "に + ひき", reading: "にひき" },
  { id: "c035", group: 2, question: "3 small animals", answer: "さんびき", allAnswers: ["さんびき"], counter: "〜匹", usedFor: "Small animals", hint: "さん + びき (voiced)", reading: "さんびき" },
  { id: "c036", group: 2, question: "6 small animals", answer: "ろっぴき", allAnswers: ["ろっぴき"], counter: "〜匹", usedFor: "Small animals", hint: "ろく → ろっぴき", reading: "ろっぴき" },
  { id: "c037", group: 2, question: "10 small animals", answer: "じゅっぴき", allAnswers: ["じゅっぴき"], counter: "〜匹", usedFor: "Small animals", hint: "じゅう → じゅっぴき", reading: "じゅっぴき" },
];

const LARGE_ANIMALS: CounterQuizCard[] = [
  { id: "c038", group: 2, question: "1 large animal (horse, cow, elephant)", answer: "いっとう", allAnswers: ["いっとう"], counter: "〜頭", usedFor: "Large animals: horses, cows, elephants, whales", hint: "頭 (とう) for large animals — 1 becomes いっとう", reading: "いっとう" },
  { id: "c039", group: 2, question: "2 large animals", answer: "にとう", allAnswers: ["にとう"], counter: "〜頭", usedFor: "Large animals", hint: "に + とう", reading: "にとう" },
  { id: "c040", group: 2, question: "3 large animals", answer: "さんとう", allAnswers: ["さんとう"], counter: "〜頭", usedFor: "Large animals", hint: "さん + とう", reading: "さんとう" },
];

const BIRDS: CounterQuizCard[] = [
  { id: "c041", group: 2, question: "1 bird / rabbit (formal)", answer: "いちわ", allAnswers: ["いちわ"], counter: "〜羽", usedFor: "Birds and rabbits", hint: "羽 (わ) — wings! Used for birds (and formally, rabbits)", reading: "いちわ" },
  { id: "c042", group: 2, question: "2 birds", answer: "にわ", allAnswers: ["にわ"], counter: "〜羽", usedFor: "Birds", hint: "に + わ", reading: "にわ" },
  { id: "c043", group: 2, question: "3 birds", answer: "さんわ", allAnswers: ["さんわ"], counter: "〜羽", usedFor: "Birds", hint: "さん + わ", reading: "さんわ" },
];

// ── GROUP 3: Time & Frequency ──────────────────────────────────────────────
const MINUTES: CounterQuizCard[] = [
  { id: "c044", group: 3, question: "1 minute", answer: "いっぷん", allAnswers: ["いっぷん"], counter: "〜分", usedFor: "Minutes", hint: "分 (ふん/ぷん) — 1 min is いっぷん", reading: "いっぷん" },
  { id: "c045", group: 3, question: "2 minutes", answer: "にふん", allAnswers: ["にふん"], counter: "〜分", usedFor: "Minutes", hint: "に + ふん", reading: "にふん" },
  { id: "c046", group: 3, question: "3 minutes", answer: "さんぷん", allAnswers: ["さんぷん"], counter: "〜分", usedFor: "Minutes", hint: "さん + ぷん (p sound)", reading: "さんぷん" },
  { id: "c047", group: 3, question: "5 minutes", answer: "ごふん", allAnswers: ["ごふん"], counter: "〜分", usedFor: "Minutes", hint: "ご + ふん", reading: "ごふん" },
  { id: "c048", group: 3, question: "10 minutes", answer: "じゅっぷん", allAnswers: ["じゅっぷん"], counter: "〜分", usedFor: "Minutes", hint: "じゅう → じゅっぷん", reading: "じゅっぷん" },
  { id: "c049", group: 3, question: "30 minutes / half past", answer: "さんじゅっぷん", allAnswers: ["さんじゅっぷん"], counter: "〜分", usedFor: "Minutes", hint: "さんじゅう + ぷん", reading: "さんじゅっぷん" },
];

const HOURS: CounterQuizCard[] = [
  { id: "c050", group: 3, question: "1 hour", answer: "いちじかん", allAnswers: ["いちじかん"], counter: "〜時間", usedFor: "Duration in hours", hint: "時間 (じかん) = hour duration; いち + じかん", reading: "いちじかん" },
  { id: "c051", group: 3, question: "2 hours", answer: "にじかん", allAnswers: ["にじかん"], counter: "〜時間", usedFor: "Hours", hint: "に + じかん", reading: "にじかん" },
  { id: "c052", group: 3, question: "3 hours", answer: "さんじかん", allAnswers: ["さんじかん"], counter: "〜時間", usedFor: "Hours", hint: "さん + じかん", reading: "さんじかん" },
  { id: "c053", group: 3, question: "half an hour", answer: "さんじゅっぷん", allAnswers: ["さんじゅっぷん", "はんじかん"], counter: "〜時間", usedFor: "Hours/minutes", hint: "30 minutes or はん (half) + じかん", reading: "はんじかん" },
];

const DAYS: CounterQuizCard[] = [
  { id: "c054", group: 3, question: "1 day", answer: "ついたち", allAnswers: ["ついたち", "いちにち"], counter: "〜日", usedFor: "Days (also date of month)", hint: "The 1st of the month / 1 day is irregular: ついたち", reading: "ついたち" },
  { id: "c055", group: 3, question: "2 days", answer: "ふつか", allAnswers: ["ふつか"], counter: "〜日", usedFor: "Days", hint: "ふつか — native Japanese form for 2 days", reading: "ふつか" },
  { id: "c056", group: 3, question: "3 days", answer: "みっか", allAnswers: ["みっか"], counter: "〜日", usedFor: "Days", hint: "みっか — 3 days or the 3rd", reading: "みっか" },
  { id: "c057", group: 3, question: "4 days", answer: "よっか", allAnswers: ["よっか"], counter: "〜日", usedFor: "Days", hint: "よっか — 4 days", reading: "よっか" },
  { id: "c058", group: 3, question: "7 days", answer: "なのか", allAnswers: ["なのか"], counter: "〜日", usedFor: "Days", hint: "なのか — 7 days (also 7th of the month)", reading: "なのか" },
  { id: "c059", group: 3, question: "10 days", answer: "とおか", allAnswers: ["とおか"], counter: "〜日", usedFor: "Days", hint: "とおか — 10 days", reading: "とおか" },
  { id: "c060", group: 3, question: "14 days", answer: "じゅうよっか", allAnswers: ["じゅうよっか"], counter: "〜日", usedFor: "Days", hint: "じゅう + よっか", reading: "じゅうよっか" },
  { id: "c061", group: 3, question: "20 days", answer: "はつか", allAnswers: ["はつか"], counter: "〜日", usedFor: "Days", hint: "はつか — 20 days is its own special form", reading: "はつか" },
];

const WEEKS: CounterQuizCard[] = [
  { id: "c062", group: 3, question: "1 week", answer: "いっしゅうかん", allAnswers: ["いっしゅうかん"], counter: "〜週間", usedFor: "Weeks", hint: "週間 (しゅうかん) = week period; 1 = いっしゅうかん", reading: "いっしゅうかん" },
  { id: "c063", group: 3, question: "2 weeks", answer: "にしゅうかん", allAnswers: ["にしゅうかん"], counter: "〜週間", usedFor: "Weeks", hint: "に + しゅうかん", reading: "にしゅうかん" },
  { id: "c064", group: 3, question: "3 weeks", answer: "さんしゅうかん", allAnswers: ["さんしゅうかん"], counter: "〜週間", usedFor: "Weeks", hint: "さん + しゅうかん", reading: "さんしゅうかん" },
];

const MONTHS: CounterQuizCard[] = [
  { id: "c065", group: 3, question: "1 month (duration)", answer: "いっかげつ", allAnswers: ["いっかげつ"], counter: "〜ヶ月", usedFor: "Month duration", hint: "ヶ月 (かげつ) — 1 month = いっかげつ", reading: "いっかげつ" },
  { id: "c066", group: 3, question: "2 months", answer: "にかげつ", allAnswers: ["にかげつ"], counter: "〜ヶ月", usedFor: "Months", hint: "に + かげつ", reading: "にかげつ" },
  { id: "c067", group: 3, question: "6 months", answer: "ろっかげつ", allAnswers: ["ろっかげつ"], counter: "〜ヶ月", usedFor: "Months", hint: "ろく → ろっかげつ", reading: "ろっかげつ" },
  { id: "c068", group: 3, question: "12 months", answer: "じゅうにかげつ", allAnswers: ["じゅうにかげつ"], counter: "〜ヶ月", usedFor: "Months", hint: "じゅうに + かげつ", reading: "じゅうにかげつ" },
];

// ── GROUP 4: Food, Drinks & Small items ────────────────────────────────────
const CUPS: CounterQuizCard[] = [
  { id: "c069", group: 4, question: "1 cup / glass of drink", answer: "いっぱい", allAnswers: ["いっぱい"], counter: "〜杯", usedFor: "Cups, glasses, bowls of liquid", hint: "杯 (はい/ぱい/ばい) — 1 = いっぱい", reading: "いっぱい" },
  { id: "c070", group: 4, question: "2 cups", answer: "にはい", allAnswers: ["にはい"], counter: "〜杯", usedFor: "Cups", hint: "に + はい", reading: "にはい" },
  { id: "c071", group: 4, question: "3 cups", answer: "さんばい", allAnswers: ["さんばい"], counter: "〜杯", usedFor: "Cups", hint: "さん + ばい (voiced)", reading: "さんばい" },
  { id: "c072", group: 4, question: "6 cups", answer: "ろっぱい", allAnswers: ["ろっぱい"], counter: "〜杯", usedFor: "Cups", hint: "ろく → ろっぱい", reading: "ろっぱい" },
  { id: "c073", group: 4, question: "10 cups", answer: "じゅっぱい", allAnswers: ["じゅっぱい"], counter: "〜杯", usedFor: "Cups", hint: "じゅう → じゅっぱい", reading: "じゅっぱい" },
];

const SMALL_ROUND: CounterQuizCard[] = [
  { id: "c074", group: 4, question: "1 small round object (apple, candy, ball)", answer: "いっこ", allAnswers: ["いっこ"], counter: "〜個", usedFor: "Small round/compact objects: apples, eggs, candies, balls", hint: "個 (こ) — small compact objects; 1 = いっこ", reading: "いっこ" },
  { id: "c075", group: 4, question: "2 small round objects", answer: "にこ", allAnswers: ["にこ"], counter: "〜個", usedFor: "Small round objects", hint: "に + こ", reading: "にこ" },
  { id: "c076", group: 4, question: "3 small round objects", answer: "さんこ", allAnswers: ["さんこ"], counter: "〜個", usedFor: "Small round objects", hint: "さん + こ", reading: "さんこ" },
  { id: "c077", group: 4, question: "5 small round objects", answer: "ごこ", allAnswers: ["ごこ"], counter: "〜個", usedFor: "Small round objects", hint: "ご + こ", reading: "ごこ" },
  { id: "c078", group: 4, question: "10 small round objects", answer: "じゅっこ", allAnswers: ["じゅっこ"], counter: "〜個", usedFor: "Small round objects", hint: "じゅう → じゅっこ", reading: "じゅっこ" },
];

const SLICES: CounterQuizCard[] = [
  { id: "c079", group: 4, question: "1 slice / cut piece (bread, meat)", answer: "いちきれ", allAnswers: ["いちきれ"], counter: "〜切れ", usedFor: "Slices: bread, cake, fish, meat", hint: "切れ (きれ) = a cut piece; いち + きれ", reading: "いちきれ" },
  { id: "c080", group: 4, question: "2 slices", answer: "にきれ", allAnswers: ["にきれ"], counter: "〜切れ", usedFor: "Slices", hint: "に + きれ", reading: "にきれ" },
  { id: "c081", group: 4, question: "3 slices", answer: "さんきれ", allAnswers: ["さんきれ"], counter: "〜切れ", usedFor: "Slices", hint: "さん + きれ", reading: "さんきれ" },
];

// ── GROUP 5: Machines, Buildings & Floors ──────────────────────────────────
const MACHINES: CounterQuizCard[] = [
  { id: "c082", group: 5, question: "1 machine / vehicle (car, bike, TV)", answer: "いちだい", allAnswers: ["いちだい"], counter: "〜台", usedFor: "Machines, vehicles, appliances", hint: "台 (だい) for machines — cars, TVs, computers", reading: "いちだい" },
  { id: "c083", group: 5, question: "2 machines", answer: "にだい", allAnswers: ["にだい"], counter: "〜台", usedFor: "Machines", hint: "に + だい", reading: "にだい" },
  { id: "c084", group: 5, question: "3 machines", answer: "さんだい", allAnswers: ["さんだい"], counter: "〜台", usedFor: "Machines", hint: "さん + だい", reading: "さんだい" },
  { id: "c085", group: 5, question: "5 machines", answer: "ごだい", allAnswers: ["ごだい"], counter: "〜台", usedFor: "Machines", hint: "ご + だい", reading: "ごだい" },
];

const BUILDINGS: CounterQuizCard[] = [
  { id: "c086", group: 5, question: "1 building / house", answer: "いっけん", allAnswers: ["いっけん"], counter: "〜軒", usedFor: "Houses and buildings", hint: "軒 (けん) for buildings; 1 = いっけん", reading: "いっけん" },
  { id: "c087", group: 5, question: "2 buildings", answer: "にけん", allAnswers: ["にけん"], counter: "〜軒", usedFor: "Buildings", hint: "に + けん", reading: "にけん" },
  { id: "c088", group: 5, question: "3 buildings", answer: "さんけん", allAnswers: ["さんけん"], counter: "〜軒", usedFor: "Buildings", hint: "さん + けん", reading: "さんけん" },
];

const FLOORS: CounterQuizCard[] = [
  { id: "c089", group: 5, question: "1st floor / ground floor", answer: "いっかい", allAnswers: ["いっかい", "いちかい"], counter: "〜階", usedFor: "Floor / story of a building", hint: "階 (かい) = floor; 1st floor = いっかい", reading: "いっかい" },
  { id: "c090", group: 5, question: "2nd floor", answer: "にかい", allAnswers: ["にかい"], counter: "〜階", usedFor: "Floors", hint: "に + かい", reading: "にかい" },
  { id: "c091", group: 5, question: "3rd floor", answer: "さんがい", allAnswers: ["さんがい", "さんかい"], counter: "〜階", usedFor: "Floors", hint: "さん + がい (voiced g)", reading: "さんがい" },
  { id: "c092", group: 5, question: "6th floor", answer: "ろっかい", allAnswers: ["ろっかい"], counter: "〜階", usedFor: "Floors", hint: "ろく → ろっかい", reading: "ろっかい" },
  { id: "c093", group: 5, question: "8th floor", answer: "はっかい", allAnswers: ["はっかい"], counter: "〜階", usedFor: "Floors", hint: "はち → はっかい", reading: "はっかい" },
  { id: "c094", group: 5, question: "10th floor", answer: "じゅっかい", allAnswers: ["じゅっかい"], counter: "〜階", usedFor: "Floors", hint: "じゅう → じゅっかい", reading: "じゅっかい" },
];

const TIMES: CounterQuizCard[] = [
  { id: "c095", group: 5, question: "1 time / once", answer: "いっかい", allAnswers: ["いっかい"], counter: "〜回", usedFor: "Number of times / occurrences", hint: "回 (かい) = times; once = いっかい (same sound as 1st floor!)", reading: "いっかい" },
  { id: "c096", group: 5, question: "2 times", answer: "にかい", allAnswers: ["にかい"], counter: "〜回", usedFor: "Times", hint: "に + かい", reading: "にかい" },
  { id: "c097", group: 5, question: "3 times", answer: "さんかい", allAnswers: ["さんかい"], counter: "〜回", usedFor: "Times", hint: "さん + かい", reading: "さんかい" },
  { id: "c098", group: 5, question: "many times", answer: "なんかい", allAnswers: ["なんかい"], counter: "〜回", usedFor: "Times", hint: "なん + かい — the question word for 'how many times'", reading: "なんかい" },
];

export const ALL_COUNTER_CARDS: CounterQuizCard[] = [
  ...GENERAL, ...FLAT, ...LONG, ...BOOKS,
  ...PEOPLE, ...SMALL_ANIMALS, ...LARGE_ANIMALS, ...BIRDS,
  ...MINUTES, ...HOURS, ...DAYS, ...WEEKS, ...MONTHS,
  ...CUPS, ...SMALL_ROUND, ...SLICES,
  ...MACHINES, ...BUILDINGS, ...FLOORS, ...TIMES,
];

export interface CounterGroup {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
}

export const COUNTER_GROUPS: CounterGroup[] = [
  { id: 1, title: "Objects & Shape", subtitle: "General, flat, long, books", emoji: "📦" },
  { id: 2, title: "People & Animals", subtitle: "Humans, small/large animals, birds", emoji: "🐾" },
  { id: 3, title: "Time", subtitle: "Minutes, hours, days, weeks, months", emoji: "⏱️" },
  { id: 4, title: "Food & Drink", subtitle: "Cups, round objects, slices", emoji: "🍜" },
  { id: 5, title: "Buildings & Machines", subtitle: "Vehicles, buildings, floors, times", emoji: "🏢" },
];

export function getCardsByGroup(group: number): CounterQuizCard[] {
  return ALL_COUNTER_CARDS.filter((c) => c.group === group);
}

export function sampleCounterCards(group: number, count = 10): CounterQuizCard[] {
  const pool = getCardsByGroup(group);
  return [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
}
