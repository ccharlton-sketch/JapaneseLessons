export interface KanjiCard {
  id: string;
  kanji: string;
  onyomi: string[];    // Chinese readings (katakana)
  kunyomi: string[];   // Japanese readings (hiragana)
  meanings: string[];
  strokeCount: number;
  level: 1 | 2 | 3 | 4 | 5;
  examples: { word: string; reading: string; meaning: string }[];
}

// ── LEVEL 1: Most common / foundational kanji ──────────────────────────────
const LEVEL_1: KanjiCard[] = [
  { id: "kj001", kanji: "一", onyomi: ["イチ", "イツ"], kunyomi: ["ひと(つ)"], meanings: ["one"], strokeCount: 1, level: 1, examples: [{ word: "一つ", reading: "ひとつ", meaning: "one thing" }, { word: "一人", reading: "ひとり", meaning: "one person" }] },
  { id: "kj002", kanji: "二", onyomi: ["ニ"], kunyomi: ["ふた(つ)"], meanings: ["two"], strokeCount: 2, level: 1, examples: [{ word: "二つ", reading: "ふたつ", meaning: "two things" }, { word: "二人", reading: "ふたり", meaning: "two people" }] },
  { id: "kj003", kanji: "三", onyomi: ["サン"], kunyomi: ["み(つ)"], meanings: ["three"], strokeCount: 3, level: 1, examples: [{ word: "三つ", reading: "みっつ", meaning: "three things" }, { word: "三月", reading: "さんがつ", meaning: "March" }] },
  { id: "kj004", kanji: "四", onyomi: ["シ"], kunyomi: ["よ(つ)", "よん"], meanings: ["four"], strokeCount: 5, level: 1, examples: [{ word: "四つ", reading: "よっつ", meaning: "four things" }, { word: "四月", reading: "しがつ", meaning: "April" }] },
  { id: "kj005", kanji: "五", onyomi: ["ゴ"], kunyomi: ["いつ(つ)"], meanings: ["five"], strokeCount: 4, level: 1, examples: [{ word: "五つ", reading: "いつつ", meaning: "five things" }, { word: "五月", reading: "ごがつ", meaning: "May" }] },
  { id: "kj006", kanji: "六", onyomi: ["ロク"], kunyomi: ["む(つ)"], meanings: ["six"], strokeCount: 4, level: 1, examples: [{ word: "六つ", reading: "むっつ", meaning: "six things" }, { word: "六月", reading: "ろくがつ", meaning: "June" }] },
  { id: "kj007", kanji: "七", onyomi: ["シチ"], kunyomi: ["なな(つ)"], meanings: ["seven"], strokeCount: 2, level: 1, examples: [{ word: "七つ", reading: "ななつ", meaning: "seven things" }, { word: "七月", reading: "しちがつ", meaning: "July" }] },
  { id: "kj008", kanji: "八", onyomi: ["ハチ"], kunyomi: ["や(つ)"], meanings: ["eight"], strokeCount: 2, level: 1, examples: [{ word: "八つ", reading: "やっつ", meaning: "eight things" }, { word: "八月", reading: "はちがつ", meaning: "August" }] },
  { id: "kj009", kanji: "九", onyomi: ["キュウ", "ク"], kunyomi: ["ここの(つ)"], meanings: ["nine"], strokeCount: 2, level: 1, examples: [{ word: "九つ", reading: "ここのつ", meaning: "nine things" }, { word: "九月", reading: "くがつ", meaning: "September" }] },
  { id: "kj010", kanji: "十", onyomi: ["ジュウ", "ジッ"], kunyomi: ["とお"], meanings: ["ten"], strokeCount: 2, level: 1, examples: [{ word: "十", reading: "じゅう", meaning: "ten" }, { word: "十月", reading: "じゅうがつ", meaning: "October" }] },
  { id: "kj011", kanji: "百", onyomi: ["ヒャク"], kunyomi: [], meanings: ["hundred"], strokeCount: 6, level: 1, examples: [{ word: "百", reading: "ひゃく", meaning: "one hundred" }, { word: "三百", reading: "さんびゃく", meaning: "three hundred" }] },
  { id: "kj012", kanji: "千", onyomi: ["セン"], kunyomi: ["ち"], meanings: ["thousand"], strokeCount: 3, level: 1, examples: [{ word: "千", reading: "せん", meaning: "one thousand" }, { word: "三千", reading: "さんぜん", meaning: "three thousand" }] },
  { id: "kj013", kanji: "万", onyomi: ["マン", "バン"], kunyomi: [], meanings: ["ten thousand"], strokeCount: 3, level: 1, examples: [{ word: "一万", reading: "いちまん", meaning: "ten thousand" }, { word: "万年筆", reading: "まんねんひつ", meaning: "fountain pen" }] },
  { id: "kj014", kanji: "日", onyomi: ["ニチ", "ジツ"], kunyomi: ["ひ", "か"], meanings: ["day", "sun"], strokeCount: 4, level: 1, examples: [{ word: "日曜日", reading: "にちようび", meaning: "Sunday" }, { word: "毎日", reading: "まいにち", meaning: "every day" }] },
  { id: "kj015", kanji: "月", onyomi: ["ゲツ", "ガツ"], kunyomi: ["つき"], meanings: ["month", "moon"], strokeCount: 4, level: 1, examples: [{ word: "月曜日", reading: "げつようび", meaning: "Monday" }, { word: "一月", reading: "いちがつ", meaning: "January" }] },
  { id: "kj016", kanji: "火", onyomi: ["カ"], kunyomi: ["ひ"], meanings: ["fire"], strokeCount: 4, level: 1, examples: [{ word: "火曜日", reading: "かようび", meaning: "Tuesday" }, { word: "火事", reading: "かじ", meaning: "fire (disaster)" }] },
  { id: "kj017", kanji: "水", onyomi: ["スイ"], kunyomi: ["みず"], meanings: ["water"], strokeCount: 4, level: 1, examples: [{ word: "水曜日", reading: "すいようび", meaning: "Wednesday" }, { word: "水", reading: "みず", meaning: "water" }] },
  { id: "kj018", kanji: "木", onyomi: ["モク", "ボク"], kunyomi: ["き"], meanings: ["tree", "wood"], strokeCount: 4, level: 1, examples: [{ word: "木曜日", reading: "もくようび", meaning: "Thursday" }, { word: "木", reading: "き", meaning: "tree" }] },
  { id: "kj019", kanji: "金", onyomi: ["キン", "コン"], kunyomi: ["かね"], meanings: ["gold", "money"], strokeCount: 8, level: 1, examples: [{ word: "金曜日", reading: "きんようび", meaning: "Friday" }, { word: "お金", reading: "おかね", meaning: "money" }] },
  { id: "kj020", kanji: "土", onyomi: ["ド", "ト"], kunyomi: ["つち"], meanings: ["earth", "soil"], strokeCount: 3, level: 1, examples: [{ word: "土曜日", reading: "どようび", meaning: "Saturday" }, { word: "土", reading: "つち", meaning: "earth/soil" }] },
  { id: "kj021", kanji: "人", onyomi: ["ジン", "ニン"], kunyomi: ["ひと"], meanings: ["person", "people"], strokeCount: 2, level: 1, examples: [{ word: "日本人", reading: "にほんじん", meaning: "Japanese person" }, { word: "人", reading: "ひと", meaning: "person" }] },
  { id: "kj022", kanji: "大", onyomi: ["ダイ", "タイ"], kunyomi: ["おお(きい)"], meanings: ["big", "large"], strokeCount: 3, level: 1, examples: [{ word: "大きい", reading: "おおきい", meaning: "big" }, { word: "大学", reading: "だいがく", meaning: "university" }] },
  { id: "kj023", kanji: "小", onyomi: ["ショウ"], kunyomi: ["ちい(さい)", "こ"], meanings: ["small", "little"], strokeCount: 3, level: 1, examples: [{ word: "小さい", reading: "ちいさい", meaning: "small" }, { word: "小学校", reading: "しょうがっこう", meaning: "elementary school" }] },
  { id: "kj024", kanji: "中", onyomi: ["チュウ"], kunyomi: ["なか"], meanings: ["middle", "inside"], strokeCount: 4, level: 1, examples: [{ word: "中", reading: "なか", meaning: "inside" }, { word: "中学校", reading: "ちゅうがっこう", meaning: "middle school" }] },
  { id: "kj025", kanji: "山", onyomi: ["サン"], kunyomi: ["やま"], meanings: ["mountain"], strokeCount: 3, level: 1, examples: [{ word: "山", reading: "やま", meaning: "mountain" }, { word: "富士山", reading: "ふじさん", meaning: "Mt. Fuji" }] },
  { id: "kj026", kanji: "川", onyomi: ["セン"], kunyomi: ["かわ"], meanings: ["river"], strokeCount: 3, level: 1, examples: [{ word: "川", reading: "かわ", meaning: "river" }] },
  { id: "kj027", kanji: "田", onyomi: ["デン"], kunyomi: ["た"], meanings: ["rice field"], strokeCount: 5, level: 1, examples: [{ word: "田中", reading: "たなか", meaning: "Tanaka (surname)" }] },
  { id: "kj028", kanji: "上", onyomi: ["ジョウ"], kunyomi: ["うえ", "あ(がる)"], meanings: ["up", "above"], strokeCount: 3, level: 1, examples: [{ word: "上", reading: "うえ", meaning: "above" }, { word: "上手", reading: "じょうず", meaning: "skillful" }] },
  { id: "kj029", kanji: "下", onyomi: ["カ", "ゲ"], kunyomi: ["した", "さ(がる)"], meanings: ["down", "below"], strokeCount: 3, level: 1, examples: [{ word: "下", reading: "した", meaning: "below" }, { word: "下手", reading: "へた", meaning: "unskillful" }] },
  { id: "kj030", kanji: "左", onyomi: ["サ"], kunyomi: ["ひだり"], meanings: ["left"], strokeCount: 5, level: 1, examples: [{ word: "左", reading: "ひだり", meaning: "left" }] },
  { id: "kj031", kanji: "右", onyomi: ["ウ", "ユウ"], kunyomi: ["みぎ"], meanings: ["right"], strokeCount: 5, level: 1, examples: [{ word: "右", reading: "みぎ", meaning: "right" }] },
];

// ── LEVEL 2: Common nouns, verbs, adjectives ─────────────────────────────────
const LEVEL_2: KanjiCard[] = [
  { id: "kj032", kanji: "口", onyomi: ["コウ", "ク"], kunyomi: ["くち"], meanings: ["mouth"], strokeCount: 3, level: 2, examples: [{ word: "口", reading: "くち", meaning: "mouth" }, { word: "入口", reading: "いりぐち", meaning: "entrance" }] },
  { id: "kj033", kanji: "目", onyomi: ["モク"], kunyomi: ["め"], meanings: ["eye"], strokeCount: 5, level: 2, examples: [{ word: "目", reading: "め", meaning: "eye" }] },
  { id: "kj034", kanji: "耳", onyomi: ["ジ"], kunyomi: ["みみ"], meanings: ["ear"], strokeCount: 6, level: 2, examples: [{ word: "耳", reading: "みみ", meaning: "ear" }] },
  { id: "kj035", kanji: "手", onyomi: ["シュ"], kunyomi: ["て"], meanings: ["hand"], strokeCount: 4, level: 2, examples: [{ word: "手", reading: "て", meaning: "hand" }, { word: "上手", reading: "じょうず", meaning: "skillful" }] },
  { id: "kj036", kanji: "足", onyomi: ["ソク"], kunyomi: ["あし", "た(りる)"], meanings: ["foot", "leg", "enough"], strokeCount: 7, level: 2, examples: [{ word: "足", reading: "あし", meaning: "foot/leg" }] },
  { id: "kj037", kanji: "男", onyomi: ["ダン", "ナン"], kunyomi: ["おとこ"], meanings: ["man", "male"], strokeCount: 7, level: 2, examples: [{ word: "男の人", reading: "おとこのひと", meaning: "man" }, { word: "男の子", reading: "おとこのこ", meaning: "boy" }] },
  { id: "kj038", kanji: "女", onyomi: ["ジョ", "ニョ"], kunyomi: ["おんな"], meanings: ["woman", "female"], strokeCount: 3, level: 2, examples: [{ word: "女の人", reading: "おんなのひと", meaning: "woman" }, { word: "女の子", reading: "おんなのこ", meaning: "girl" }] },
  { id: "kj039", kanji: "子", onyomi: ["シ", "ス"], kunyomi: ["こ"], meanings: ["child"], strokeCount: 3, level: 2, examples: [{ word: "子供", reading: "こども", meaning: "child" }, { word: "女の子", reading: "おんなのこ", meaning: "girl" }] },
  { id: "kj040", kanji: "父", onyomi: ["フ"], kunyomi: ["ちち"], meanings: ["father"], strokeCount: 4, level: 2, examples: [{ word: "父", reading: "ちち", meaning: "father" }, { word: "お父さん", reading: "おとうさん", meaning: "father (polite)" }] },
  { id: "kj041", kanji: "母", onyomi: ["ボ"], kunyomi: ["はは"], meanings: ["mother"], strokeCount: 5, level: 2, examples: [{ word: "母", reading: "はは", meaning: "mother" }, { word: "お母さん", reading: "おかあさん", meaning: "mother (polite)" }] },
  { id: "kj042", kanji: "友", onyomi: ["ユウ"], kunyomi: ["とも"], meanings: ["friend"], strokeCount: 4, level: 2, examples: [{ word: "友達", reading: "ともだち", meaning: "friend" }] },
  { id: "kj043", kanji: "先", onyomi: ["セン"], kunyomi: ["さき"], meanings: ["ahead", "previous"], strokeCount: 6, level: 2, examples: [{ word: "先生", reading: "せんせい", meaning: "teacher" }, { word: "先週", reading: "せんしゅう", meaning: "last week" }] },
  { id: "kj044", kanji: "生", onyomi: ["セイ", "ショウ"], kunyomi: ["い(きる)", "う(まれる)"], meanings: ["life", "birth", "raw"], strokeCount: 5, level: 2, examples: [{ word: "先生", reading: "せんせい", meaning: "teacher" }, { word: "学生", reading: "がくせい", meaning: "student" }] },
  { id: "kj045", kanji: "学", onyomi: ["ガク"], kunyomi: ["まな(ぶ)"], meanings: ["study", "learn"], strokeCount: 8, level: 2, examples: [{ word: "学生", reading: "がくせい", meaning: "student" }, { word: "大学", reading: "だいがく", meaning: "university" }] },
  { id: "kj046", kanji: "校", onyomi: ["コウ"], kunyomi: [], meanings: ["school"], strokeCount: 10, level: 2, examples: [{ word: "学校", reading: "がっこう", meaning: "school" }] },
  { id: "kj047", kanji: "花", onyomi: ["カ"], kunyomi: ["はな"], meanings: ["flower"], strokeCount: 7, level: 2, examples: [{ word: "花", reading: "はな", meaning: "flower" }, { word: "花火", reading: "はなび", meaning: "fireworks" }] },
  { id: "kj048", kanji: "雨", onyomi: ["ウ"], kunyomi: ["あめ"], meanings: ["rain"], strokeCount: 8, level: 2, examples: [{ word: "雨", reading: "あめ", meaning: "rain" }] },
  { id: "kj049", kanji: "天", onyomi: ["テン"], kunyomi: ["あめ", "あま"], meanings: ["sky", "heaven"], strokeCount: 4, level: 2, examples: [{ word: "天気", reading: "てんき", meaning: "weather" }] },
  { id: "kj050", kanji: "気", onyomi: ["キ", "ケ"], kunyomi: [], meanings: ["spirit", "air", "mood"], strokeCount: 6, level: 2, examples: [{ word: "天気", reading: "てんき", meaning: "weather" }, { word: "元気", reading: "げんき", meaning: "energetic" }] },
  { id: "kj051", kanji: "空", onyomi: ["クウ"], kunyomi: ["そら", "あ(く)"], meanings: ["sky", "empty"], strokeCount: 8, level: 2, examples: [{ word: "空", reading: "そら", meaning: "sky" }] },
  { id: "kj052", kanji: "白", onyomi: ["ハク", "ビャク"], kunyomi: ["しろ(い)"], meanings: ["white"], strokeCount: 5, level: 2, examples: [{ word: "白い", reading: "しろい", meaning: "white" }] },
  { id: "kj053", kanji: "赤", onyomi: ["セキ", "シャク"], kunyomi: ["あか(い)"], meanings: ["red"], strokeCount: 7, level: 2, examples: [{ word: "赤い", reading: "あかい", meaning: "red" }] },
  { id: "kj054", kanji: "青", onyomi: ["セイ"], kunyomi: ["あお(い)"], meanings: ["blue", "green"], strokeCount: 8, level: 2, examples: [{ word: "青い", reading: "あおい", meaning: "blue" }] },
  { id: "kj055", kanji: "魚", onyomi: ["ギョ"], kunyomi: ["さかな", "うお"], meanings: ["fish"], strokeCount: 11, level: 2, examples: [{ word: "魚", reading: "さかな", meaning: "fish" }] },
  { id: "kj056", kanji: "肉", onyomi: ["ニク"], kunyomi: [], meanings: ["meat"], strokeCount: 6, level: 2, examples: [{ word: "肉", reading: "にく", meaning: "meat" }, { word: "牛肉", reading: "ぎゅうにく", meaning: "beef" }] },
  { id: "kj057", kanji: "犬", onyomi: ["ケン"], kunyomi: ["いぬ"], meanings: ["dog"], strokeCount: 4, level: 2, examples: [{ word: "犬", reading: "いぬ", meaning: "dog" }] },
  { id: "kj058", kanji: "猫", onyomi: ["ビョウ"], kunyomi: ["ねこ"], meanings: ["cat"], strokeCount: 11, level: 2, examples: [{ word: "猫", reading: "ねこ", meaning: "cat" }] },
  { id: "kj059", kanji: "鳥", onyomi: ["チョウ"], kunyomi: ["とり"], meanings: ["bird"], strokeCount: 11, level: 2, examples: [{ word: "鳥", reading: "とり", meaning: "bird" }] },
  { id: "kj060", kanji: "車", onyomi: ["シャ"], kunyomi: ["くるま"], meanings: ["car", "vehicle"], strokeCount: 7, level: 2, examples: [{ word: "車", reading: "くるま", meaning: "car" }, { word: "電車", reading: "でんしゃ", meaning: "train" }] },
];

// ── LEVEL 3: Actions, time, places ─────────────────────────────────────────
const LEVEL_3: KanjiCard[] = [
  { id: "kj061", kanji: "食", onyomi: ["ショク"], kunyomi: ["た(べる)"], meanings: ["eat", "food"], strokeCount: 9, level: 3, examples: [{ word: "食べる", reading: "たべる", meaning: "to eat" }, { word: "食事", reading: "しょくじ", meaning: "meal" }] },
  { id: "kj062", kanji: "飲", onyomi: ["イン"], kunyomi: ["の(む)"], meanings: ["drink"], strokeCount: 12, level: 3, examples: [{ word: "飲む", reading: "のむ", meaning: "to drink" }, { word: "飲み物", reading: "のみもの", meaning: "beverage" }] },
  { id: "kj063", kanji: "見", onyomi: ["ケン"], kunyomi: ["み(る)"], meanings: ["see", "look"], strokeCount: 7, level: 3, examples: [{ word: "見る", reading: "みる", meaning: "to see" }, { word: "花見", reading: "はなみ", meaning: "flower viewing" }] },
  { id: "kj064", kanji: "聞", onyomi: ["ブン", "モン"], kunyomi: ["き(く)"], meanings: ["hear", "ask", "listen"], strokeCount: 14, level: 3, examples: [{ word: "聞く", reading: "きく", meaning: "to hear/ask" }, { word: "新聞", reading: "しんぶん", meaning: "newspaper" }] },
  { id: "kj065", kanji: "読", onyomi: ["ドク", "トク"], kunyomi: ["よ(む)"], meanings: ["read"], strokeCount: 14, level: 3, examples: [{ word: "読む", reading: "よむ", meaning: "to read" }] },
  { id: "kj066", kanji: "書", onyomi: ["ショ"], kunyomi: ["か(く)"], meanings: ["write"], strokeCount: 10, level: 3, examples: [{ word: "書く", reading: "かく", meaning: "to write" }, { word: "図書館", reading: "としょかん", meaning: "library" }] },
  { id: "kj067", kanji: "話", onyomi: ["ワ"], kunyomi: ["はな(す)", "はなし"], meanings: ["talk", "speak", "story"], strokeCount: 13, level: 3, examples: [{ word: "話す", reading: "はなす", meaning: "to speak" }, { word: "電話", reading: "でんわ", meaning: "telephone" }] },
  { id: "kj068", kanji: "行", onyomi: ["コウ", "ギョウ"], kunyomi: ["い(く)", "おこな(う)"], meanings: ["go", "carry out"], strokeCount: 6, level: 3, examples: [{ word: "行く", reading: "いく", meaning: "to go" }, { word: "銀行", reading: "ぎんこう", meaning: "bank" }] },
  { id: "kj069", kanji: "来", onyomi: ["ライ"], kunyomi: ["く(る)"], meanings: ["come"], strokeCount: 7, level: 3, examples: [{ word: "来る", reading: "くる", meaning: "to come" }, { word: "来週", reading: "らいしゅう", meaning: "next week" }] },
  { id: "kj070", kanji: "出", onyomi: ["シュツ", "スイ"], kunyomi: ["で(る)", "だ(す)"], meanings: ["exit", "leave", "put out"], strokeCount: 5, level: 3, examples: [{ word: "出る", reading: "でる", meaning: "to exit" }, { word: "出口", reading: "でぐち", meaning: "exit" }] },
  { id: "kj071", kanji: "入", onyomi: ["ニュウ"], kunyomi: ["い(る)", "はい(る)"], meanings: ["enter"], strokeCount: 2, level: 3, examples: [{ word: "入る", reading: "はいる", meaning: "to enter" }, { word: "入口", reading: "いりぐち", meaning: "entrance" }] },
  { id: "kj072", kanji: "休", onyomi: ["キュウ"], kunyomi: ["やす(む)"], meanings: ["rest"], strokeCount: 6, level: 3, examples: [{ word: "休む", reading: "やすむ", meaning: "to rest" }, { word: "休日", reading: "きゅうじつ", meaning: "holiday" }] },
  { id: "kj073", kanji: "立", onyomi: ["リツ"], kunyomi: ["た(つ)"], meanings: ["stand"], strokeCount: 5, level: 3, examples: [{ word: "立つ", reading: "たつ", meaning: "to stand" }] },
  { id: "kj074", kanji: "年", onyomi: ["ネン"], kunyomi: ["とし"], meanings: ["year"], strokeCount: 6, level: 3, examples: [{ word: "今年", reading: "ことし", meaning: "this year" }, { word: "来年", reading: "らいねん", meaning: "next year" }] },
  { id: "kj075", kanji: "時", onyomi: ["ジ"], kunyomi: ["とき"], meanings: ["time", "hour"], strokeCount: 10, level: 3, examples: [{ word: "時間", reading: "じかん", meaning: "time/hour" }, { word: "何時", reading: "なんじ", meaning: "what time" }] },
  { id: "kj076", kanji: "今", onyomi: ["コン", "キン"], kunyomi: ["いま"], meanings: ["now", "present"], strokeCount: 4, level: 3, examples: [{ word: "今", reading: "いま", meaning: "now" }, { word: "今日", reading: "きょう", meaning: "today" }] },
  { id: "kj077", kanji: "前", onyomi: ["ゼン"], kunyomi: ["まえ"], meanings: ["before", "front"], strokeCount: 9, level: 3, examples: [{ word: "前", reading: "まえ", meaning: "before/front" }, { word: "名前", reading: "なまえ", meaning: "name" }] },
  { id: "kj078", kanji: "後", onyomi: ["ゴ", "コウ"], kunyomi: ["あと", "うし(ろ)"], meanings: ["after", "behind"], strokeCount: 9, level: 3, examples: [{ word: "後", reading: "あと", meaning: "after" }, { word: "午後", reading: "ごご", meaning: "afternoon" }] },
  { id: "kj079", kanji: "国", onyomi: ["コク"], kunyomi: ["くに"], meanings: ["country"], strokeCount: 8, level: 3, examples: [{ word: "国", reading: "くに", meaning: "country" }, { word: "外国", reading: "がいこく", meaning: "foreign country" }] },
  { id: "kj080", kanji: "語", onyomi: ["ゴ"], kunyomi: ["かた(る)"], meanings: ["language", "word"], strokeCount: 14, level: 3, examples: [{ word: "日本語", reading: "にほんご", meaning: "Japanese language" }, { word: "英語", reading: "えいご", meaning: "English language" }] },
];

// ── LEVEL 4: Daily life, adjectives, places ──────────────────────────────────
const LEVEL_4: KanjiCard[] = [
  { id: "kj081", kanji: "長", onyomi: ["チョウ"], kunyomi: ["なが(い)"], meanings: ["long", "leader"], strokeCount: 8, level: 4, examples: [{ word: "長い", reading: "ながい", meaning: "long" }, { word: "社長", reading: "しゃちょう", meaning: "company president" }] },
  { id: "kj082", kanji: "高", onyomi: ["コウ"], kunyomi: ["たか(い)"], meanings: ["tall", "high", "expensive"], strokeCount: 10, level: 4, examples: [{ word: "高い", reading: "たかい", meaning: "tall/expensive" }, { word: "高校", reading: "こうこう", meaning: "high school" }] },
  { id: "kj083", kanji: "安", onyomi: ["アン"], kunyomi: ["やす(い)"], meanings: ["cheap", "peaceful"], strokeCount: 6, level: 4, examples: [{ word: "安い", reading: "やすい", meaning: "cheap" }, { word: "安心", reading: "あんしん", meaning: "relief" }] },
  { id: "kj084", kanji: "新", onyomi: ["シン"], kunyomi: ["あたら(しい)"], meanings: ["new"], strokeCount: 13, level: 4, examples: [{ word: "新しい", reading: "あたらしい", meaning: "new" }, { word: "新聞", reading: "しんぶん", meaning: "newspaper" }] },
  { id: "kj085", kanji: "古", onyomi: ["コ"], kunyomi: ["ふる(い)"], meanings: ["old"], strokeCount: 5, level: 4, examples: [{ word: "古い", reading: "ふるい", meaning: "old" }, { word: "中古", reading: "ちゅうこ", meaning: "used/second-hand" }] },
  { id: "kj086", kanji: "多", onyomi: ["タ"], kunyomi: ["おお(い)"], meanings: ["many", "much"], strokeCount: 6, level: 4, examples: [{ word: "多い", reading: "おおい", meaning: "many" }] },
  { id: "kj087", kanji: "少", onyomi: ["ショウ"], kunyomi: ["すく(ない)", "すこ(し)"], meanings: ["few", "little"], strokeCount: 4, level: 4, examples: [{ word: "少ない", reading: "すくない", meaning: "few" }, { word: "少し", reading: "すこし", meaning: "a little" }] },
  { id: "kj088", kanji: "広", onyomi: ["コウ"], kunyomi: ["ひろ(い)"], meanings: ["wide", "spacious"], strokeCount: 5, level: 4, examples: [{ word: "広い", reading: "ひろい", meaning: "wide/spacious" }] },
  { id: "kj089", kanji: "近", onyomi: ["キン"], kunyomi: ["ちか(い)"], meanings: ["near", "close"], strokeCount: 7, level: 4, examples: [{ word: "近い", reading: "ちかい", meaning: "near" }, { word: "最近", reading: "さいきん", meaning: "recently" }] },
  { id: "kj090", kanji: "遠", onyomi: ["エン"], kunyomi: ["とお(い)"], meanings: ["far", "distant"], strokeCount: 13, level: 4, examples: [{ word: "遠い", reading: "とおい", meaning: "far" }] },
  { id: "kj091", kanji: "早", onyomi: ["ソウ", "サッ"], kunyomi: ["はや(い)"], meanings: ["early", "fast"], strokeCount: 6, level: 4, examples: [{ word: "早い", reading: "はやい", meaning: "early/fast" }, { word: "早朝", reading: "そうちょう", meaning: "early morning" }] },
  { id: "kj092", kanji: "明", onyomi: ["メイ", "ミョウ"], kunyomi: ["あか(るい)"], meanings: ["bright", "clear"], strokeCount: 8, level: 4, examples: [{ word: "明るい", reading: "あかるい", meaning: "bright" }, { word: "明日", reading: "あした", meaning: "tomorrow" }] },
  { id: "kj093", kanji: "暗", onyomi: ["アン"], kunyomi: ["くら(い)"], meanings: ["dark"], strokeCount: 13, level: 4, examples: [{ word: "暗い", reading: "くらい", meaning: "dark" }] },
  { id: "kj094", kanji: "強", onyomi: ["キョウ", "ゴウ"], kunyomi: ["つよ(い)"], meanings: ["strong"], strokeCount: 11, level: 4, examples: [{ word: "強い", reading: "つよい", meaning: "strong" }, { word: "勉強", reading: "べんきょう", meaning: "study" }] },
  { id: "kj095", kanji: "弱", onyomi: ["ジャク"], kunyomi: ["よわ(い)"], meanings: ["weak"], strokeCount: 10, level: 4, examples: [{ word: "弱い", reading: "よわい", meaning: "weak" }] },
  { id: "kj096", kanji: "好", onyomi: ["コウ"], kunyomi: ["す(き)", "この(む)"], meanings: ["like", "fond of"], strokeCount: 6, level: 4, examples: [{ word: "好き", reading: "すき", meaning: "to like" }, { word: "大好き", reading: "だいすき", meaning: "love" }] },
  { id: "kj097", kanji: "悪", onyomi: ["アク", "オ"], kunyomi: ["わる(い)"], meanings: ["bad", "evil"], strokeCount: 11, level: 4, examples: [{ word: "悪い", reading: "わるい", meaning: "bad" }] },
  { id: "kj098", kanji: "元", onyomi: ["ゲン", "ガン"], kunyomi: ["もと"], meanings: ["origin", "source"], strokeCount: 4, level: 4, examples: [{ word: "元気", reading: "げんき", meaning: "energetic" }] },
  { id: "kj099", kanji: "店", onyomi: ["テン"], kunyomi: ["みせ"], meanings: ["shop", "store"], strokeCount: 8, level: 4, examples: [{ word: "店", reading: "みせ", meaning: "shop" }, { word: "喫茶店", reading: "きっさてん", meaning: "cafe" }] },
  { id: "kj100", kanji: "道", onyomi: ["ドウ"], kunyomi: ["みち"], meanings: ["road", "path", "way"], strokeCount: 12, level: 4, examples: [{ word: "道", reading: "みち", meaning: "road" }, { word: "柔道", reading: "じゅうどう", meaning: "judo" }] },
  { id: "kj101", kanji: "駅", onyomi: ["エキ"], kunyomi: [], meanings: ["station"], strokeCount: 14, level: 4, examples: [{ word: "駅", reading: "えき", meaning: "station" }] },
  { id: "kj102", kanji: "病", onyomi: ["ビョウ"], kunyomi: ["やまい", "や(む)"], meanings: ["illness", "sick"], strokeCount: 10, level: 4, examples: [{ word: "病気", reading: "びょうき", meaning: "illness" }, { word: "病院", reading: "びょういん", meaning: "hospital" }] },
  { id: "kj103", kanji: "院", onyomi: ["イン"], kunyomi: [], meanings: ["institution", "temple"], strokeCount: 10, level: 4, examples: [{ word: "病院", reading: "びょういん", meaning: "hospital" }, { word: "美容院", reading: "びよういん", meaning: "beauty salon" }] },
  { id: "kj104", kanji: "社", onyomi: ["シャ"], kunyomi: ["やしろ"], meanings: ["company", "shrine"], strokeCount: 7, level: 4, examples: [{ word: "会社", reading: "かいしゃ", meaning: "company" }, { word: "神社", reading: "じんじゃ", meaning: "shrine" }] },
  { id: "kj105", kanji: "会", onyomi: ["カイ", "エ"], kunyomi: ["あ(う)"], meanings: ["meet", "gathering"], strokeCount: 6, level: 4, examples: [{ word: "会う", reading: "あう", meaning: "to meet" }, { word: "会社", reading: "かいしゃ", meaning: "company" }] },
];

// ── LEVEL 5: Compound words, abstract concepts, advanced verbs ────────────────
const LEVEL_5: KanjiCard[] = [
  { id: "kj106", kanji: "電", onyomi: ["デン"], kunyomi: [], meanings: ["electricity"], strokeCount: 13, level: 5, examples: [{ word: "電車", reading: "でんしゃ", meaning: "train" }, { word: "電話", reading: "でんわ", meaning: "telephone" }] },
  { id: "kj107", kanji: "力", onyomi: ["リョク", "リキ"], kunyomi: ["ちから"], meanings: ["power", "strength"], strokeCount: 2, level: 5, examples: [{ word: "力", reading: "ちから", meaning: "strength" }, { word: "努力", reading: "どりょく", meaning: "effort" }] },
  { id: "kj108", kanji: "名", onyomi: ["メイ", "ミョウ"], kunyomi: ["な"], meanings: ["name", "famous"], strokeCount: 6, level: 5, examples: [{ word: "名前", reading: "なまえ", meaning: "name" }, { word: "有名", reading: "ゆうめい", meaning: "famous" }] },
  { id: "kj109", kanji: "外", onyomi: ["ガイ", "ゲ"], kunyomi: ["そと", "はず(す)"], meanings: ["outside"], strokeCount: 5, level: 5, examples: [{ word: "外", reading: "そと", meaning: "outside" }, { word: "外国", reading: "がいこく", meaning: "foreign country" }] },
  { id: "kj110", kanji: "内", onyomi: ["ナイ", "ダイ"], kunyomi: ["うち"], meanings: ["inside", "within"], strokeCount: 4, level: 5, examples: [{ word: "内", reading: "うち", meaning: "inside" }, { word: "案内", reading: "あんない", meaning: "guidance" }] },
  { id: "kj111", kanji: "東", onyomi: ["トウ"], kunyomi: ["ひがし"], meanings: ["east"], strokeCount: 8, level: 5, examples: [{ word: "東", reading: "ひがし", meaning: "east" }, { word: "東京", reading: "とうきょう", meaning: "Tokyo" }] },
  { id: "kj112", kanji: "西", onyomi: ["セイ", "サイ"], kunyomi: ["にし"], meanings: ["west"], strokeCount: 6, level: 5, examples: [{ word: "西", reading: "にし", meaning: "west" }] },
  { id: "kj113", kanji: "南", onyomi: ["ナン"], kunyomi: ["みなみ"], meanings: ["south"], strokeCount: 9, level: 5, examples: [{ word: "南", reading: "みなみ", meaning: "south" }] },
  { id: "kj114", kanji: "北", onyomi: ["ホク"], kunyomi: ["きた"], meanings: ["north"], strokeCount: 5, level: 5, examples: [{ word: "北", reading: "きた", meaning: "north" }, { word: "北海道", reading: "ほっかいどう", meaning: "Hokkaido" }] },
  { id: "kj115", kanji: "間", onyomi: ["カン", "ケン"], kunyomi: ["あいだ", "ま"], meanings: ["between", "interval", "space"], strokeCount: 12, level: 5, examples: [{ word: "時間", reading: "じかん", meaning: "time" }, { word: "間", reading: "あいだ", meaning: "between" }] },
  { id: "kj116", kanji: "半", onyomi: ["ハン"], kunyomi: ["なか(ば)"], meanings: ["half"], strokeCount: 5, level: 5, examples: [{ word: "半分", reading: "はんぶん", meaning: "half" }, { word: "半年", reading: "はんとし", meaning: "half a year" }] },
  { id: "kj117", kanji: "毎", onyomi: ["マイ"], kunyomi: [], meanings: ["every", "each"], strokeCount: 6, level: 5, examples: [{ word: "毎日", reading: "まいにち", meaning: "every day" }, { word: "毎週", reading: "まいしゅう", meaning: "every week" }] },
  { id: "kj118", kanji: "何", onyomi: ["カ"], kunyomi: ["なに", "なん"], meanings: ["what"], strokeCount: 7, level: 5, examples: [{ word: "何", reading: "なに", meaning: "what" }, { word: "何時", reading: "なんじ", meaning: "what time" }] },
  { id: "kj119", kanji: "言", onyomi: ["ゲン", "ゴン"], kunyomi: ["い(う)", "こと"], meanings: ["say", "word"], strokeCount: 7, level: 5, examples: [{ word: "言う", reading: "いう", meaning: "to say" }] },
  { id: "kj120", kanji: "買", onyomi: ["バイ"], kunyomi: ["か(う)"], meanings: ["buy"], strokeCount: 12, level: 5, examples: [{ word: "買う", reading: "かう", meaning: "to buy" }, { word: "買い物", reading: "かいもの", meaning: "shopping" }] },
  { id: "kj121", kanji: "売", onyomi: ["バイ"], kunyomi: ["う(る)"], meanings: ["sell"], strokeCount: 7, level: 5, examples: [{ word: "売る", reading: "うる", meaning: "to sell" }] },
  { id: "kj122", kanji: "待", onyomi: ["タイ"], kunyomi: ["ま(つ)"], meanings: ["wait"], strokeCount: 9, level: 5, examples: [{ word: "待つ", reading: "まつ", meaning: "to wait" }] },
  { id: "kj123", kanji: "持", onyomi: ["ジ"], kunyomi: ["も(つ)"], meanings: ["hold", "have"], strokeCount: 9, level: 5, examples: [{ word: "持つ", reading: "もつ", meaning: "to hold/have" }, { word: "気持ち", reading: "きもち", meaning: "feeling" }] },
  { id: "kj124", kanji: "走", onyomi: ["ソウ"], kunyomi: ["はし(る)"], meanings: ["run"], strokeCount: 7, level: 5, examples: [{ word: "走る", reading: "はしる", meaning: "to run" }] },
  { id: "kj125", kanji: "歩", onyomi: ["ホ", "ブ"], kunyomi: ["ある(く)"], meanings: ["walk", "step"], strokeCount: 8, level: 5, examples: [{ word: "歩く", reading: "あるく", meaning: "to walk" }, { word: "散歩", reading: "さんぽ", meaning: "walk/stroll" }] },
  { id: "kj126", kanji: "使", onyomi: ["シ"], kunyomi: ["つか(う)"], meanings: ["use"], strokeCount: 8, level: 5, examples: [{ word: "使う", reading: "つかう", meaning: "to use" }] },
  { id: "kj127", kanji: "作", onyomi: ["サク", "サ"], kunyomi: ["つく(る)"], meanings: ["make", "create"], strokeCount: 7, level: 5, examples: [{ word: "作る", reading: "つくる", meaning: "to make" }, { word: "作文", reading: "さくぶん", meaning: "composition" }] },
  { id: "kj128", kanji: "思", onyomi: ["シ"], kunyomi: ["おも(う)"], meanings: ["think", "feel"], strokeCount: 9, level: 5, examples: [{ word: "思う", reading: "おもう", meaning: "to think" }] },
  { id: "kj129", kanji: "知", onyomi: ["チ"], kunyomi: ["し(る)"], meanings: ["know"], strokeCount: 8, level: 5, examples: [{ word: "知る", reading: "しる", meaning: "to know" }, { word: "知人", reading: "ちじん", meaning: "acquaintance" }] },
  { id: "kj130", kanji: "教", onyomi: ["キョウ"], kunyomi: ["おし(える)"], meanings: ["teach"], strokeCount: 11, level: 5, examples: [{ word: "教える", reading: "おしえる", meaning: "to teach" }, { word: "教室", reading: "きょうしつ", meaning: "classroom" }] },
  { id: "kj131", kanji: "住", onyomi: ["ジュウ"], kunyomi: ["す(む)"], meanings: ["live", "reside"], strokeCount: 7, level: 5, examples: [{ word: "住む", reading: "すむ", meaning: "to live" }, { word: "住所", reading: "じゅうしょ", meaning: "address" }] },
  { id: "kj132", kanji: "工", onyomi: ["コウ", "ク"], kunyomi: [], meanings: ["construction", "craft"], strokeCount: 3, level: 5, examples: [{ word: "工場", reading: "こうじょう", meaning: "factory" }] },
  { id: "kj133", kanji: "場", onyomi: ["ジョウ"], kunyomi: ["ば"], meanings: ["place", "location"], strokeCount: 12, level: 5, examples: [{ word: "場所", reading: "ばしょ", meaning: "place" }, { word: "工場", reading: "こうじょう", meaning: "factory" }] },
  { id: "kj134", kanji: "色", onyomi: ["ショク", "シキ"], kunyomi: ["いろ"], meanings: ["color"], strokeCount: 6, level: 5, examples: [{ word: "色", reading: "いろ", meaning: "color" }, { word: "黄色", reading: "きいろ", meaning: "yellow" }] },
  { id: "kj135", kanji: "春", onyomi: ["シュン"], kunyomi: ["はる"], meanings: ["spring"], strokeCount: 9, level: 5, examples: [{ word: "春", reading: "はる", meaning: "spring" }] },
  { id: "kj136", kanji: "夏", onyomi: ["カ", "ゲ"], kunyomi: ["なつ"], meanings: ["summer"], strokeCount: 10, level: 5, examples: [{ word: "夏", reading: "なつ", meaning: "summer" }, { word: "夏休み", reading: "なつやすみ", meaning: "summer vacation" }] },
  { id: "kj137", kanji: "秋", onyomi: ["シュウ"], kunyomi: ["あき"], meanings: ["autumn", "fall"], strokeCount: 9, level: 5, examples: [{ word: "秋", reading: "あき", meaning: "autumn" }] },
  { id: "kj138", kanji: "冬", onyomi: ["トウ"], kunyomi: ["ふゆ"], meanings: ["winter"], strokeCount: 5, level: 5, examples: [{ word: "冬", reading: "ふゆ", meaning: "winter" }, { word: "冬休み", reading: "ふゆやすみ", meaning: "winter vacation" }] },
  { id: "kj139", kanji: "朝", onyomi: ["チョウ"], kunyomi: ["あさ"], meanings: ["morning"], strokeCount: 12, level: 5, examples: [{ word: "朝", reading: "あさ", meaning: "morning" }, { word: "朝ご飯", reading: "あさごはん", meaning: "breakfast" }] },
  { id: "kj140", kanji: "昼", onyomi: ["チュウ"], kunyomi: ["ひる"], meanings: ["noon", "daytime"], strokeCount: 9, level: 5, examples: [{ word: "昼", reading: "ひる", meaning: "noon" }, { word: "昼ご飯", reading: "ひるごはん", meaning: "lunch" }] },
  { id: "kj141", kanji: "夜", onyomi: ["ヤ"], kunyomi: ["よる", "よ"], meanings: ["night", "evening"], strokeCount: 8, level: 5, examples: [{ word: "夜", reading: "よる", meaning: "night" }, { word: "今夜", reading: "こんや", meaning: "tonight" }] },
  { id: "kj142", kanji: "週", onyomi: ["シュウ"], kunyomi: [], meanings: ["week"], strokeCount: 11, level: 5, examples: [{ word: "今週", reading: "こんしゅう", meaning: "this week" }, { word: "来週", reading: "らいしゅう", meaning: "next week" }] },
  { id: "kj143", kanji: "海", onyomi: ["カイ"], kunyomi: ["うみ"], meanings: ["sea", "ocean"], strokeCount: 9, level: 5, examples: [{ word: "海", reading: "うみ", meaning: "sea" }] },
  { id: "kj144", kanji: "林", onyomi: ["リン"], kunyomi: ["はやし"], meanings: ["forest", "grove"], strokeCount: 8, level: 5, examples: [{ word: "林", reading: "はやし", meaning: "grove" }] },
  { id: "kj145", kanji: "森", onyomi: ["シン"], kunyomi: ["もり"], meanings: ["forest"], strokeCount: 12, level: 5, examples: [{ word: "森", reading: "もり", meaning: "forest" }] },
];

export const ALL_KANJI: KanjiCard[] = [...LEVEL_1, ...LEVEL_2, ...LEVEL_3, ...LEVEL_4, ...LEVEL_5];

export function getKanjiByLevel(level: 1 | 2 | 3 | 4 | 5): KanjiCard[] {
  return ALL_KANJI.filter((k) => k.level === level);
}

export function sampleKanji(level: 1 | 2 | 3 | 4 | 5 | "all", count: number): KanjiCard[] {
  const pool = level === "all" ? ALL_KANJI : getKanjiByLevel(level);
  return [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
}

export const KANJI_LEVELS = [
  { level: 1 as const, title: "Numbers & Basics", count: LEVEL_1.length },
  { level: 2 as const, title: "Nouns & Nature", count: LEVEL_2.length },
  { level: 3 as const, title: "Actions & Time", count: LEVEL_3.length },
  { level: 4 as const, title: "Adjectives & Places", count: LEVEL_4.length },
  { level: 5 as const, title: "Compounds & Seasons", count: LEVEL_5.length },
];
