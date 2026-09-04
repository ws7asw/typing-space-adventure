/*
 * 句子資料庫（中英雙語）
 * len = 英文單字數，難度越高越容易抽到較長句子
 */
const SENTENCE_BANK = [
  // 短句 2–3 字
  { en: "I am happy", zh: "我很快樂", len: 3 },
  { en: "I like cats", zh: "我喜歡貓", len: 3 },
  { en: "It is big", zh: "它很大", len: 3 },
  { en: "She is tall", zh: "她很高", len: 3 },
  { en: "He is kind", zh: "他很親切", len: 3 },
  { en: "We are friends", zh: "我們是朋友", len: 3 },
  { en: "Good morning", zh: "早安", len: 2 },
  { en: "Good night", zh: "晚安", len: 2 },
  { en: "Thank you", zh: "謝謝你", len: 2 },
  { en: "See you", zh: "再見", len: 2 },
  { en: "Come here", zh: "到這裡來", len: 2 },
  { en: "Sit down", zh: "坐下", len: 2 },
  { en: "Stand up", zh: "站起來", len: 2 },
  { en: "Look out", zh: "小心", len: 2 },
  { en: "I can run", zh: "我會跑步", len: 3 },
  { en: "I can swim", zh: "我會游泳", len: 3 },
  { en: "I can sing", zh: "我會唱歌", len: 3 },
  { en: "I love mom", zh: "我愛媽媽", len: 3 },
  { en: "I love dad", zh: "我愛爸爸", len: 3 },
  { en: "Red is nice", zh: "紅色很好", len: 3 },
  { en: "It is sunny", zh: "天氣晴朗", len: 3 },
  { en: "It is rainy", zh: "正在下雨", len: 3 },
  { en: "I am fine", zh: "我很好", len: 3 },
  { en: "You are cool", zh: "你很酷", len: 3 },
  { en: "Open the book", zh: "打開書", len: 3 },
  { en: "Close the door", zh: "關門", len: 3 },

  // 中句 4–5 字
  { en: "I have a dog", zh: "我有一隻狗", len: 4 },
  { en: "I have a cat", zh: "我有一隻貓", len: 4 },
  { en: "This is my bag", zh: "這是我的書包", len: 4 },
  { en: "That is my pen", zh: "那是我的筆", len: 4 },
  { en: "I like to play", zh: "我喜歡玩", len: 4 },
  { en: "I like to read", zh: "我喜歡閱讀", len: 4 },
  { en: "She has a book", zh: "她有一本書", len: 4 },
  { en: "He has a bike", zh: "他有一台腳踏車", len: 4 },
  { en: "We go to school", zh: "我們去上學", len: 4 },
  { en: "I go to bed", zh: "我去睡覺", len: 4 },
  { en: "The cat is cute", zh: "這隻貓很可愛", len: 4 },
  { en: "The dog is big", zh: "這隻狗很大", len: 4 },
  { en: "I eat an apple", zh: "我吃一顆蘋果", len: 4 },
  { en: "I drink some milk", zh: "我喝一些牛奶", len: 4 },
  { en: "It is a sunny day", zh: "今天是晴天", len: 5 },
  { en: "I am a good student", zh: "我是好學生", len: 5 },
  { en: "She is my best friend", zh: "她是我最好的朋友", len: 5 },
  { en: "He can play soccer", zh: "他會踢足球", len: 4 },
  { en: "We play in the park", zh: "我們在公園玩", len: 5 },
  { en: "I see a blue bird", zh: "我看到一隻藍鳥", len: 5 },
  { en: "The book is on the desk", zh: "書在書桌上", len: 6 },
  { en: "My bag is under the chair", zh: "我的書包在椅子下面", len: 6 },
  { en: "I brush my teeth", zh: "我刷牙", len: 4 },
  { en: "I wash my hands", zh: "我洗手", len: 4 },
  { en: "Please open the window", zh: "請打開窗戶", len: 4 },
  { en: "What is your name", zh: "你叫什麼名字", len: 4 },
  { en: "How old are you", zh: "你幾歲", len: 4 },
  { en: "Where is my pencil", zh: "我的鉛筆在哪裡", len: 4 },
  { en: "I want some water", zh: "我想要一些水", len: 4 },
  { en: "Let us go home", zh: "我們回家吧", len: 4 },

  // 長句 6–8 字
  { en: "I go to school every day", zh: "我每天去上學", len: 6 },
  { en: "She likes to sing and dance", zh: "她喜歡唱歌跳舞", len: 6 },
  { en: "He plays basketball after school", zh: "他放學後打籃球", len: 5 },
  { en: "We have lunch at twelve", zh: "我們十二點吃午餐", len: 5 },
  { en: "My mother cooks dinner for us", zh: "媽媽為我們煮晚餐", len: 6 },
  { en: "I do my homework at night", zh: "我晚上做功課", len: 6 },
  { en: "The children play in the garden", zh: "孩子們在花園玩", len: 6 },
  { en: "There is a cat on the sofa", zh: "沙發上有一隻貓", len: 7 },
  { en: "I can see many stars at night", zh: "晚上我可以看到很多星星", len: 7 },
  { en: "Please put the book on the table", zh: "請把書放在桌子上", len: 7 },
  { en: "My father works in a hospital", zh: "我爸爸在醫院工作", len: 6 },
  { en: "We visit the zoo on Sunday", zh: "我們星期天去動物園", len: 6 },
  { en: "I like apples more than bananas", zh: "我喜歡蘋果多過香蕉", len: 6 },
  { en: "She is reading a story book now", zh: "她現在正在讀故事書", len: 7 },
  { en: "He is running in the big park", zh: "他正在大公園跑步", len: 7 },
  { en: "The weather is cold and windy today", zh: "今天天氣又冷又有風", len: 7 },
  { en: "I want to be a doctor someday", zh: "我將來想當醫生", len: 7 },
  { en: "Can you help me with this bag", zh: "你可以幫我拿這個袋子嗎", len: 7 },
  { en: "We are going to the library now", zh: "我們現在要去圖書館", len: 7 },
  { en: "My sister has a cute little rabbit", zh: "我姊姊有一隻可愛的小兔子", len: 7 },

  // 更長 8–10 字（高難度）
  { en: "I brush my teeth every morning and night", zh: "我每天早晚刷牙", len: 8 },
  { en: "She walks to school with her best friend", zh: "她和最好的朋友走路去學校", len: 8 },
  { en: "We had a great time at the beach yesterday", zh: "我們昨天在海邊玩得很開心", len: 9 },
  { en: "My teacher gave me a gold star today", zh: "老師今天給我一顆金星", len: 8 },
  { en: "There are many colorful flowers in the garden", zh: "花園裡有很多彩色的花", len: 8 },
  { en: "I want to learn English and make new friends", zh: "我想學英文並交新朋友", len: 9 },
  { en: "He plays the piano for one hour every day", zh: "他每天彈一小時鋼琴", len: 9 },
  { en: "Please remember to bring your homework tomorrow", zh: "請記得明天帶功課來", len: 7 },
  { en: "The little boy is looking for his lost dog", zh: "小男孩正在找他走失的狗", len: 9 },
  { en: "We should keep our classroom clean and tidy", zh: "我們應該保持教室乾淨整齊", len: 8 },
  { en: "I am excited to go on a trip this summer", zh: "我很期待今年夏天去旅行", len: 10 },
  { en: "She bought a beautiful dress for the party", zh: "她為派對買了一件漂亮的洋裝", len: 8 },
  { en: "My grandpa tells me funny stories every night", zh: "爺爺每天晚上跟我說有趣的故事", len: 8 },
  { en: "Do you want to play soccer with us later", zh: "你等一下要不要跟我們踢足球", len: 9 },
  { en: "The sun is shining and the birds are singing", zh: "太陽照耀著，鳥兒在唱歌", len: 9 }
];

/** 依難度 1–10 取得可用句子池（越難越長） */
function getSentencesForDifficulty(level) {
  let minLen, maxLen;
  if (level <= 2) { minLen = 2; maxLen = 3; }
  else if (level <= 4) { minLen = 2; maxLen = 4; }
  else if (level <= 6) { minLen = 3; maxLen = 6; }
  else if (level <= 8) { minLen = 4; maxLen = 8; }
  else { minLen = 6; maxLen = 10; }

  return SENTENCE_BANK.filter((s) => s.len >= minLen && s.len <= maxLen);
}
