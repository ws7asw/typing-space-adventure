/*
 * 分年級主題式單字庫（中英雙語）
 * ------------------------------------------------------------
 * 依據：
 *  - 教育部十二年國教英語文領綱「參考字彙表」精神（基礎約 1200 字）
 *  - 翰林 Dino on the Go! 與常見國小英語單元主題
 *
 * 說明：教育部並未硬性規定各年級固定清單；本表為依課綱主題與
 *       常見教學進度整理的「參考單字」，方便分級練習，可於遊戲內增修。
 *
 * 遊戲使用時會攤平成 {en, zh} 清單。
 */
const GRADE_SETS = {
  g1: {
    label: "一年級",
    desc: "字母啟蒙・顏色・數字 1-10・打招呼・教室・形狀・天氣入門",
    themes: [
      {
        name: "顏色 Colors",
        words: [
          { en: "red", zh: "紅色" }, { en: "blue", zh: "藍色" },
          { en: "green", zh: "綠色" }, { en: "yellow", zh: "黃色" },
          { en: "black", zh: "黑色" }, { en: "white", zh: "白色" },
          { en: "pink", zh: "粉紅色" }, { en: "orange", zh: "橘色" },
          { en: "purple", zh: "紫色" }, { en: "brown", zh: "棕色" },
          { en: "gray", zh: "灰色" }, { en: "gold", zh: "金色" }
        ]
      },
      {
        name: "數字 Numbers 1-10",
        words: [
          { en: "one", zh: "一" }, { en: "two", zh: "二" },
          { en: "three", zh: "三" }, { en: "four", zh: "四" },
          { en: "five", zh: "五" }, { en: "six", zh: "六" },
          { en: "seven", zh: "七" }, { en: "eight", zh: "八" },
          { en: "nine", zh: "九" }, { en: "ten", zh: "十" },
          { en: "zero", zh: "零" }
        ]
      },
      {
        name: "打招呼 Greetings",
        words: [
          { en: "hi", zh: "嗨" }, { en: "hello", zh: "哈囉" },
          { en: "bye", zh: "再見" }, { en: "yes", zh: "是" },
          { en: "no", zh: "不" }, { en: "please", zh: "請" },
          { en: "thanks", zh: "謝謝" }, { en: "sorry", zh: "對不起" },
          { en: "good", zh: "好的" }, { en: "okay", zh: "好" },
          { en: "welcome", zh: "歡迎" }, { en: "morning", zh: "早安" }
        ]
      },
      {
        name: "教室與人物 Classroom",
        words: [
          { en: "boy", zh: "男孩" }, { en: "girl", zh: "女孩" },
          { en: "book", zh: "書" }, { en: "pen", zh: "筆" },
          { en: "bag", zh: "書包" }, { en: "desk", zh: "書桌" },
          { en: "chair", zh: "椅子" }, { en: "door", zh: "門" },
          { en: "window", zh: "窗戶" }, { en: "teacher", zh: "老師" },
          { en: "friend", zh: "朋友" }, { en: "name", zh: "名字" },
          { en: "class", zh: "班級" }, { en: "board", zh: "黑板" },
          { en: "map", zh: "地圖" }, { en: "clock", zh: "時鐘" }
        ]
      },
      {
        name: "形狀 Shapes",
        words: [
          { en: "circle", zh: "圓形" }, { en: "square", zh: "正方形" },
          { en: "triangle", zh: "三角形" }, { en: "star", zh: "星形" },
          { en: "heart", zh: "心形" }, { en: "line", zh: "線" },
          { en: "round", zh: "圓的" }, { en: "shape", zh: "形狀" }
        ]
      },
      {
        name: "常見小物 Things",
        words: [
          { en: "ball", zh: "球" }, { en: "toy", zh: "玩具" },
          { en: "cup", zh: "杯子" }, { en: "hat", zh: "帽子" },
          { en: "key", zh: "鑰匙" }, { en: "box", zh: "盒子" },
          { en: "sun", zh: "太陽" }, { en: "moon", zh: "月亮" },
          { en: "tree", zh: "樹" }, { en: "flower", zh: "花" },
          { en: "car", zh: "汽車" }, { en: "bus", zh: "公車" },
          { en: "bike", zh: "腳踏車" }, { en: "bed", zh: "床" },
          { en: "lamp", zh: "燈" }, { en: "phone", zh: "電話" }
        ]
      },
      {
        name: "天氣入門 Weather",
        words: [
          { en: "rain", zh: "雨" }, { en: "wind", zh: "風" },
          { en: "cloud", zh: "雲" }, { en: "sky", zh: "天空" },
          { en: "hot", zh: "熱的" }, { en: "cold", zh: "冷的" },
          { en: "wet", zh: "濕的" }, { en: "dry", zh: "乾的" }
        ]
      },
      {
        name: "延伸單字 Extra",
        words: [
          { en: "day", zh: "白天／天" }, { en: "up", zh: "向上" },
          { en: "down", zh: "向下" }, { en: "in", zh: "裡面" },
          { en: "out", zh: "外面" }, { en: "go", zh: "去" },
          { en: "run", zh: "跑" }, { en: "jump", zh: "跳" },
          { en: "eat", zh: "吃" }, { en: "see", zh: "看見" },
          { en: "me", zh: "我" }, { en: "you", zh: "你" },
          { en: "we", zh: "我們" }, { en: "it", zh: "它" },
          { en: "and", zh: "和" }, { en: "the", zh: "這／那" },
          { en: "big", zh: "大的" }, { en: "little", zh: "小的" },
          { en: "look", zh: "看" }, { en: "come", zh: "來" }
        ]
      }
    ]
  },

  g2: {
    label: "二年級",
    desc: "數字 11-20・家人・身體・心情・動物入門・食物・日常動詞",
    themes: [
      {
        name: "數字 Numbers 11-20",
        words: [
          { en: "eleven", zh: "十一" }, { en: "twelve", zh: "十二" },
          { en: "thirteen", zh: "十三" }, { en: "fourteen", zh: "十四" },
          { en: "fifteen", zh: "十五" }, { en: "sixteen", zh: "十六" },
          { en: "seventeen", zh: "十七" }, { en: "eighteen", zh: "十八" },
          { en: "nineteen", zh: "十九" }, { en: "twenty", zh: "二十" }
        ]
      },
      {
        name: "家人 Family",
        words: [
          { en: "dad", zh: "爸爸" }, { en: "mom", zh: "媽媽" },
          { en: "father", zh: "父親" }, { en: "mother", zh: "母親" },
          { en: "brother", zh: "兄弟" }, { en: "sister", zh: "姊妹" },
          { en: "baby", zh: "嬰兒" }, { en: "family", zh: "家庭" },
          { en: "grandpa", zh: "爺爺" }, { en: "grandma", zh: "奶奶" },
          { en: "uncle", zh: "叔叔" }, { en: "aunt", zh: "阿姨" },
          { en: "cousin", zh: "表親" }, { en: "son", zh: "兒子" },
          { en: "daughter", zh: "女兒" }, { en: "parents", zh: "父母" }
        ]
      },
      {
        name: "身體 Body",
        words: [
          { en: "head", zh: "頭" }, { en: "hand", zh: "手" },
          { en: "foot", zh: "腳" }, { en: "eye", zh: "眼睛" },
          { en: "ear", zh: "耳朵" }, { en: "nose", zh: "鼻子" },
          { en: "mouth", zh: "嘴巴" }, { en: "hair", zh: "頭髮" },
          { en: "leg", zh: "腿" }, { en: "arm", zh: "手臂" },
          { en: "face", zh: "臉" }, { en: "tooth", zh: "牙齒" },
          { en: "finger", zh: "手指" }, { en: "knee", zh: "膝蓋" },
          { en: "neck", zh: "脖子" }, { en: "shoulder", zh: "肩膀" },
          { en: "back", zh: "背部" }, { en: "toe", zh: "腳趾" }
        ]
      },
      {
        name: "心情 Feelings",
        words: [
          { en: "happy", zh: "快樂的" }, { en: "sad", zh: "難過的" },
          { en: "angry", zh: "生氣的" }, { en: "fine", zh: "很好的" },
          { en: "tired", zh: "疲倦的" }, { en: "sick", zh: "生病的" },
          { en: "hungry", zh: "飢餓的" }, { en: "thirsty", zh: "口渴的" },
          { en: "scared", zh: "害怕的" }, { en: "brave", zh: "勇敢的" },
          { en: "kind", zh: "善良的" }, { en: "funny", zh: "好笑的" }
        ]
      },
      {
        name: "動物入門 Animals",
        words: [
          { en: "cat", zh: "貓" }, { en: "dog", zh: "狗" },
          { en: "bird", zh: "鳥" }, { en: "fish", zh: "魚" },
          { en: "duck", zh: "鴨子" }, { en: "pig", zh: "豬" },
          { en: "cow", zh: "乳牛" }, { en: "hen", zh: "母雞" },
          { en: "pet", zh: "寵物" }, { en: "ant", zh: "螞蟻" },
          { en: "bee", zh: "蜜蜂" }, { en: "fox", zh: "狐狸" }
        ]
      },
      {
        name: "食物入門 Food",
        words: [
          { en: "apple", zh: "蘋果" }, { en: "milk", zh: "牛奶" },
          { en: "egg", zh: "蛋" }, { en: "bread", zh: "麵包" },
          { en: "rice", zh: "米飯" }, { en: "water", zh: "水" },
          { en: "juice", zh: "果汁" }, { en: "cake", zh: "蛋糕" },
          { en: "cookie", zh: "餅乾" }, { en: "ice", zh: "冰" },
          { en: "soup", zh: "湯" }, { en: "meat", zh: "肉" },
          { en: "corn", zh: "玉米" }, { en: "bean", zh: "豆子" }
        ]
      },
      {
        name: "日常動詞 Daily Verbs",
        words: [
          { en: "play", zh: "玩" }, { en: "read", zh: "讀" },
          { en: "write", zh: "寫" }, { en: "help", zh: "幫助" },
          { en: "love", zh: "愛" }, { en: "want", zh: "想要" },
          { en: "need", zh: "需要" }, { en: "walk", zh: "走路" },
          { en: "sleep", zh: "睡覺" }, { en: "drink", zh: "喝" },
          { en: "wash", zh: "洗" }, { en: "clean", zh: "清理" },
          { en: "sing", zh: "唱歌" }, { en: "dance", zh: "跳舞" },
          { en: "draw", zh: "畫" }, { en: "stop", zh: "停" }
        ]
      },
      {
        name: "延伸單字 Extra",
        words: [
          { en: "home", zh: "家" }, { en: "school", zh: "學校" },
          { en: "today", zh: "今天" }, { en: "now", zh: "現在" },
          { en: "here", zh: "這裡" }, { en: "there", zh: "那裡" },
          { en: "my", zh: "我的" }, { en: "your", zh: "你的" },
          { en: "his", zh: "他的" }, { en: "her", zh: "她的" },
          { en: "our", zh: "我們的" }, { en: "their", zh: "他們的" },
          { en: "who", zh: "誰" }, { en: "what", zh: "什麼" },
          { en: "how", zh: "如何" }, { en: "many", zh: "許多" }
        ]
      }
    ]
  },

  g3: {
    label: "三年級",
    desc: "動物・文具・水果蔬菜・衣物・形容詞・動詞・教室指令（Dino 1-2）",
    themes: [
      {
        name: "動物 Animals",
        words: [
          { en: "rabbit", zh: "兔子" }, { en: "frog", zh: "青蛙" },
          { en: "bear", zh: "熊" }, { en: "lion", zh: "獅子" },
          { en: "tiger", zh: "老虎" }, { en: "monkey", zh: "猴子" },
          { en: "elephant", zh: "大象" }, { en: "zebra", zh: "斑馬" },
          { en: "giraffe", zh: "長頸鹿" }, { en: "snake", zh: "蛇" },
          { en: "mouse", zh: "老鼠" }, { en: "horse", zh: "馬" },
          { en: "sheep", zh: "羊" }, { en: "chicken", zh: "雞" },
          { en: "turtle", zh: "烏龜" }, { en: "panda", zh: "熊貓" },
          { en: "dolphin", zh: "海豚" }, { en: "whale", zh: "鯨魚" },
          { en: "koala", zh: "無尾熊" }, { en: "penguin", zh: "企鵝" }
        ]
      },
      {
        name: "文具 School Things",
        words: [
          { en: "ruler", zh: "尺" }, { en: "pencil", zh: "鉛筆" },
          { en: "eraser", zh: "橡皮擦" }, { en: "crayon", zh: "蠟筆" },
          { en: "marker", zh: "麥克筆" }, { en: "glue", zh: "膠水" },
          { en: "notebook", zh: "筆記本" }, { en: "scissors", zh: "剪刀" },
          { en: "paper", zh: "紙" }, { en: "backpack", zh: "背包" },
          { en: "sharpener", zh: "削鉛筆機" }, { en: "whiteboard", zh: "白板" },
          { en: "dictionary", zh: "字典" }, { en: "folder", zh: "資料夾" },
          { en: "stapler", zh: "釘書機" }, { en: "tape", zh: "膠帶" }
        ]
      },
      {
        name: "水果 Fruit",
        words: [
          { en: "banana", zh: "香蕉" }, { en: "grape", zh: "葡萄" },
          { en: "guava", zh: "芭樂" }, { en: "mango", zh: "芒果" },
          { en: "peach", zh: "桃子" }, { en: "pear", zh: "梨子" },
          { en: "lemon", zh: "檸檬" }, { en: "watermelon", zh: "西瓜" },
          { en: "strawberry", zh: "草莓" }, { en: "pineapple", zh: "鳳梨" },
          { en: "cherry", zh: "櫻桃" }, { en: "kiwi", zh: "奇異果" },
          { en: "orange", zh: "橙子" }, { en: "papaya", zh: "木瓜" },
          { en: "coconut", zh: "椰子" }, { en: "blueberry", zh: "藍莓" }
        ]
      },
      {
        name: "蔬菜 Vegetables",
        words: [
          { en: "carrot", zh: "紅蘿蔔" }, { en: "tomato", zh: "番茄" },
          { en: "potato", zh: "馬鈴薯" }, { en: "onion", zh: "洋蔥" },
          { en: "cabbage", zh: "高麗菜" }, { en: "lettuce", zh: "生菜" },
          { en: "cucumber", zh: "黃瓜" }, { en: "pepper", zh: "辣椒／甜椒" },
          { en: "broccoli", zh: "花椰菜" }, { en: "spinach", zh: "菠菜" },
          { en: "pumpkin", zh: "南瓜" }, { en: "corn", zh: "玉米" }
        ]
      },
      {
        name: "衣物 Clothes",
        words: [
          { en: "shirt", zh: "襯衫" }, { en: "shoes", zh: "鞋子" },
          { en: "socks", zh: "襪子" }, { en: "pants", zh: "褲子" },
          { en: "dress", zh: "洋裝" }, { en: "coat", zh: "外套" },
          { en: "skirt", zh: "裙子" }, { en: "jacket", zh: "夾克" },
          { en: "cap", zh: "鴨舌帽" }, { en: "gloves", zh: "手套" },
          { en: "sweater", zh: "毛衣" }, { en: "shorts", zh: "短褲" },
          { en: "boots", zh: "靴子" }, { en: "tie", zh: "領帶" },
          { en: "belt", zh: "皮帶" }, { en: "scarf", zh: "圍巾" }
        ]
      },
      {
        name: "形容詞 Adjectives",
        words: [
          { en: "big", zh: "大的" }, { en: "small", zh: "小的" },
          { en: "tall", zh: "高的" }, { en: "short", zh: "矮的／短的" },
          { en: "cute", zh: "可愛的" }, { en: "new", zh: "新的" },
          { en: "old", zh: "舊的／老的" }, { en: "long", zh: "長的" },
          { en: "fast", zh: "快的" }, { en: "slow", zh: "慢的" },
          { en: "hot", zh: "熱的" }, { en: "cold", zh: "冷的" },
          { en: "this", zh: "這個" }, { en: "that", zh: "那個" },
          { en: "pretty", zh: "漂亮的" }, { en: "ugly", zh: "醜的" },
          { en: "heavy", zh: "重的" }, { en: "light", zh: "輕的" },
          { en: "full", zh: "滿的" }, { en: "empty", zh: "空的" }
        ]
      },
      {
        name: "動詞基礎 Verbs",
        words: [
          { en: "like", zh: "喜歡" }, { en: "have", zh: "有" },
          { en: "see", zh: "看見" }, { en: "look", zh: "看" },
          { en: "come", zh: "來" }, { en: "go", zh: "去" },
          { en: "sit", zh: "坐" }, { en: "stand", zh: "站" },
          { en: "open", zh: "打開" }, { en: "close", zh: "關閉" },
          { en: "give", zh: "給" }, { en: "take", zh: "拿" },
          { en: "find", zh: "找到" }, { en: "put", zh: "放" },
          { en: "make", zh: "做" }, { en: "say", zh: "說" }
        ]
      },
      {
        name: "延伸單字 Extra",
        words: [
          { en: "color", zh: "顏色" }, { en: "number", zh: "數字" },
          { en: "animal", zh: "動物" }, { en: "fruit", zh: "水果" },
          { en: "schoolbag", zh: "書包" }, { en: "classroom", zh: "教室" },
          { en: "student", zh: "學生" }, { en: "goodbye", zh: "再見" },
          { en: "count", zh: "數" }, { en: "listen", zh: "聽" },
          { en: "speak", zh: "說" }, { en: "point", zh: "指出" },
          { en: "touch", zh: "碰" }, { en: "show", zh: "展示" },
          { en: "repeat", zh: "重複" }, { en: "quiet", zh: "安靜" },
          { en: "ready", zh: "準備好" }, { en: "again", zh: "再一次" }
        ]
      }
    ]
  },

  g4: {
    label: "四年級",
    desc: "整十數・進行式動作・房間・位置・食物・時間・日常用品（Dino 3-4）",
    themes: [
      {
        name: "整十數 Tens",
        words: [
          { en: "thirty", zh: "三十" }, { en: "forty", zh: "四十" },
          { en: "fifty", zh: "五十" }, { en: "sixty", zh: "六十" },
          { en: "seventy", zh: "七十" }, { en: "eighty", zh: "八十" },
          { en: "ninety", zh: "九十" }, { en: "hundred", zh: "一百" },
          { en: "thousand", zh: "一千" }, { en: "first", zh: "第一" },
          { en: "second", zh: "第二" }, { en: "third", zh: "第三" }
        ]
      },
      {
        name: "進行中動作 Actions (-ing)",
        words: [
          { en: "running", zh: "跑步" }, { en: "jumping", zh: "跳" },
          { en: "eating", zh: "吃" }, { en: "drinking", zh: "喝" },
          { en: "sleeping", zh: "睡覺" }, { en: "swimming", zh: "游泳" },
          { en: "singing", zh: "唱歌" }, { en: "dancing", zh: "跳舞" },
          { en: "reading", zh: "閱讀" }, { en: "writing", zh: "寫字" },
          { en: "drawing", zh: "畫畫" }, { en: "playing", zh: "玩" },
          { en: "walking", zh: "走路" }, { en: "watching", zh: "觀看" },
          { en: "listening", zh: "聽" }, { en: "cooking", zh: "烹飪" },
          { en: "talking", zh: "說話" }, { en: "studying", zh: "讀書" },
          { en: "shopping", zh: "購物" }, { en: "cleaning", zh: "打掃" }
        ]
      },
      {
        name: "房間 Rooms",
        words: [
          { en: "bedroom", zh: "臥室" }, { en: "bathroom", zh: "浴室" },
          { en: "kitchen", zh: "廚房" }, { en: "livingroom", zh: "客廳" },
          { en: "diningroom", zh: "飯廳" }, { en: "yard", zh: "院子" },
          { en: "garden", zh: "花園" }, { en: "garage", zh: "車庫" },
          { en: "balcony", zh: "陽台" }, { en: "attic", zh: "閣樓" },
          { en: "basement", zh: "地下室" }, { en: "hallway", zh: "走廊" }
        ]
      },
      {
        name: "位置介係詞 Places",
        words: [
          { en: "in", zh: "在……裡面" }, { en: "on", zh: "在……上面" },
          { en: "under", zh: "在……下面" }, { en: "behind", zh: "在……後面" },
          { en: "between", zh: "在……之間" }, { en: "next", zh: "旁邊的" },
          { en: "above", zh: "在……上方" }, { en: "below", zh: "在……下方" },
          { en: "near", zh: "靠近" }, { en: "where", zh: "哪裡" },
          { en: "over", zh: "在……之上" }, { en: "through", zh: "穿過" },
          { en: "into", zh: "進入" }, { en: "onto", zh: "到……上面" }
        ]
      },
      {
        name: "食物與飲料 Food & Drink",
        words: [
          { en: "noodles", zh: "麵" }, { en: "meat", zh: "肉" },
          { en: "soup", zh: "湯" }, { en: "salad", zh: "沙拉" },
          { en: "sandwich", zh: "三明治" }, { en: "pizza", zh: "披薩" },
          { en: "hamburger", zh: "漢堡" }, { en: "chicken", zh: "雞肉" },
          { en: "tofu", zh: "豆腐" }, { en: "cheese", zh: "起司" },
          { en: "butter", zh: "奶油" }, { en: "sugar", zh: "糖" },
          { en: "salt", zh: "鹽" }, { en: "tea", zh: "茶" },
          { en: "coffee", zh: "咖啡" }, { en: "soda", zh: "汽水" },
          { en: "candy", zh: "糖果" }, { en: "yogurt", zh: "優格" },
          { en: "pancake", zh: "鬆餅" }, { en: "dumpling", zh: "餃子" }
        ]
      },
      {
        name: "時間 Time",
        words: [
          { en: "clock", zh: "時鐘" }, { en: "time", zh: "時間" },
          { en: "morning", zh: "早上" }, { en: "afternoon", zh: "下午" },
          { en: "evening", zh: "傍晚" }, { en: "night", zh: "晚上" },
          { en: "today", zh: "今天" }, { en: "tomorrow", zh: "明天" },
          { en: "yesterday", zh: "昨天" }, { en: "week", zh: "星期" },
          { en: "hour", zh: "小時" }, { en: "minute", zh: "分鐘" },
          { en: "oclock", zh: "整點" }, { en: "half", zh: "半" },
          { en: "quarter", zh: "一刻鐘" }, { en: "early", zh: "早的" },
          { en: "late", zh: "晚的" }, { en: "soon", zh: "很快" }
        ]
      },
      {
        name: "日常用品 Objects",
        words: [
          { en: "table", zh: "桌子" }, { en: "sofa", zh: "沙發" },
          { en: "lamp", zh: "燈" }, { en: "phone", zh: "電話" },
          { en: "television", zh: "電視" }, { en: "computer", zh: "電腦" },
          { en: "umbrella", zh: "雨傘" }, { en: "watch", zh: "手錶" },
          { en: "mirror", zh: "鏡子" }, { en: "blanket", zh: "毯子" },
          { en: "pillow", zh: "枕頭" }, { en: "towel", zh: "毛巾" },
          { en: "soap", zh: "肥皂" }, { en: "brush", zh: "刷子" },
          { en: "camera", zh: "相機" }, { en: "radio", zh: "收音機" }
        ]
      },
      {
        name: "延伸單字 Extra",
        words: [
          { en: "breakfast", zh: "早餐" }, { en: "lunch", zh: "午餐" },
          { en: "dinner", zh: "晚餐" }, { en: "snack", zh: "點心" },
          { en: "always", zh: "總是" }, { en: "sometimes", zh: "有時候" },
          { en: "never", zh: "從不" }, { en: "often", zh: "常常" },
          { en: "before", zh: "在……之前" }, { en: "after", zh: "在……之後" },
          { en: "because", zh: "因為" }, { en: "about", zh: "關於" },
          { en: "around", zh: "大約／周圍" }, { en: "inside", zh: "裡面" },
          { en: "outside", zh: "外面" }, { en: "beside", zh: "在旁邊" },
          { en: "usually", zh: "通常" }, { en: "every", zh: "每個" },
          { en: "both", zh: "兩者" }, { en: "also", zh: "也" }
        ]
      }
    ]
  },

  g5: {
    label: "五年級",
    desc: "職業・能力・地點・天氣・星期月份・節慶・運動（Dino 5-6）",
    themes: [
      {
        name: "職業 Jobs",
        words: [
          { en: "teacher", zh: "老師" }, { en: "doctor", zh: "醫生" },
          { en: "nurse", zh: "護士" }, { en: "farmer", zh: "農夫" },
          { en: "cook", zh: "廚師" }, { en: "driver", zh: "司機" },
          { en: "singer", zh: "歌手" }, { en: "dentist", zh: "牙醫" },
          { en: "police", zh: "警察" }, { en: "writer", zh: "作家" },
          { en: "pilot", zh: "飛行員" }, { en: "artist", zh: "藝術家" },
          { en: "actor", zh: "演員" }, { en: "firefighter", zh: "消防員" },
          { en: "scientist", zh: "科學家" }, { en: "waiter", zh: "服務生" },
          { en: "baker", zh: "烘焙師" }, { en: "vet", zh: "獸醫" },
          { en: "engineer", zh: "工程師" }, { en: "reporter", zh: "記者" }
        ]
      },
      {
        name: "能力動詞 Can Do",
        words: [
          { en: "dance", zh: "跳舞" }, { en: "sing", zh: "唱歌" },
          { en: "swim", zh: "游泳" }, { en: "draw", zh: "畫畫" },
          { en: "jump", zh: "跳" }, { en: "climb", zh: "爬" },
          { en: "fly", zh: "飛" }, { en: "ride", zh: "騎" },
          { en: "run", zh: "跑" }, { en: "skate", zh: "溜冰" },
          { en: "speak", zh: "說" }, { en: "drive", zh: "開車" },
          { en: "type", zh: "打字" }, { en: "paint", zh: "畫（顏料）" },
          { en: "bake", zh: "烘焙" }, { en: "fish", zh: "釣魚" },
          { en: "ski", zh: "滑雪" }, { en: "surf", zh: "衝浪" }
        ]
      },
      {
        name: "地點 Places",
        words: [
          { en: "park", zh: "公園" }, { en: "zoo", zh: "動物園" },
          { en: "school", zh: "學校" }, { en: "store", zh: "商店" },
          { en: "hospital", zh: "醫院" }, { en: "library", zh: "圖書館" },
          { en: "market", zh: "市場" }, { en: "restaurant", zh: "餐廳" },
          { en: "bank", zh: "銀行" }, { en: "museum", zh: "博物館" },
          { en: "station", zh: "車站" }, { en: "airport", zh: "機場" },
          { en: "beach", zh: "海灘" }, { en: "farm", zh: "農場" },
          { en: "postoffice", zh: "郵局" }, { en: "cinema", zh: "電影院" },
          { en: "bookstore", zh: "書店" }, { en: "supermarket", zh: "超市" },
          { en: "gym", zh: "健身房" }, { en: "playground", zh: "遊樂場" }
        ]
      },
      {
        name: "天氣 Weather",
        words: [
          { en: "sunny", zh: "晴朗的" }, { en: "rainy", zh: "下雨的" },
          { en: "cloudy", zh: "多雲的" }, { en: "windy", zh: "有風的" },
          { en: "snowy", zh: "下雪的" }, { en: "warm", zh: "溫暖的" },
          { en: "cool", zh: "涼爽的" }, { en: "weather", zh: "天氣" },
          { en: "rain", zh: "雨" }, { en: "snow", zh: "雪" },
          { en: "wind", zh: "風" }, { en: "cloud", zh: "雲" },
          { en: "storm", zh: "暴風雨" }, { en: "foggy", zh: "有霧的" },
          { en: "temperature", zh: "溫度" }, { en: "degree", zh: "度" }
        ]
      },
      {
        name: "星期 Days",
        words: [
          { en: "Monday", zh: "星期一" }, { en: "Tuesday", zh: "星期二" },
          { en: "Wednesday", zh: "星期三" }, { en: "Thursday", zh: "星期四" },
          { en: "Friday", zh: "星期五" }, { en: "Saturday", zh: "星期六" },
          { en: "Sunday", zh: "星期日" }, { en: "weekend", zh: "週末" },
          { en: "weekday", zh: "平日" }, { en: "today", zh: "今天" }
        ]
      },
      {
        name: "月份 Months",
        words: [
          { en: "January", zh: "一月" }, { en: "February", zh: "二月" },
          { en: "March", zh: "三月" }, { en: "April", zh: "四月" },
          { en: "May", zh: "五月" }, { en: "June", zh: "六月" },
          { en: "July", zh: "七月" }, { en: "August", zh: "八月" },
          { en: "September", zh: "九月" }, { en: "October", zh: "十月" },
          { en: "November", zh: "十一月" }, { en: "December", zh: "十二月" }
        ]
      },
      {
        name: "節慶 Festivals",
        words: [
          { en: "birthday", zh: "生日" }, { en: "Christmas", zh: "聖誕節" },
          { en: "Halloween", zh: "萬聖節" }, { en: "Easter", zh: "復活節" },
          { en: "party", zh: "派對" }, { en: "gift", zh: "禮物" },
          { en: "candy", zh: "糖果" }, { en: "costume", zh: "服裝" },
          { en: "firework", zh: "煙火" }, { en: "lantern", zh: "燈籠" },
          { en: "dragon", zh: "龍" }, { en: "celebrate", zh: "慶祝" }
        ]
      },
      {
        name: "運動 Sports",
        words: [
          { en: "soccer", zh: "足球" }, { en: "baseball", zh: "棒球" },
          { en: "basketball", zh: "籃球" }, { en: "volleyball", zh: "排球" },
          { en: "tennis", zh: "網球" }, { en: "badminton", zh: "羽毛球" },
          { en: "tabletennis", zh: "桌球" }, { en: "swimming", zh: "游泳" },
          { en: "running", zh: "跑步" }, { en: "team", zh: "隊伍" },
          { en: "player", zh: "選手" }, { en: "score", zh: "得分" },
          { en: "win", zh: "贏" }, { en: "lose", zh: "輸" },
          { en: "game", zh: "比賽／遊戲" }, { en: "match", zh: "比賽" }
        ]
      },
      {
        name: "延伸單字 Extra",
        words: [
          { en: "spring", zh: "春天" }, { en: "summer", zh: "夏天" },
          { en: "autumn", zh: "秋天" }, { en: "winter", zh: "冬天" },
          { en: "season", zh: "季節" }, { en: "holiday", zh: "假期" },
          { en: "vacation", zh: "放假" }, { en: "trip", zh: "旅行" },
          { en: "country", zh: "國家" }, { en: "city", zh: "城市" },
          { en: "village", zh: "村莊" }, { en: "people", zh: "人們" },
          { en: "children", zh: "孩子們" }, { en: "adult", zh: "大人" },
          { en: "hobby", zh: "嗜好" }, { en: "sport", zh: "運動" },
          { en: "favorite", zh: "最喜歡的" }, { en: "invite", zh: "邀請" },
          { en: "join", zh: "加入" }, { en: "practice", zh: "練習" }
        ]
      }
    ]
  },

  g6: {
    label: "六年級",
    desc: "方位・過去式・興趣・情緒・科目・交通・健康・進階字彙（Dino 7-8）",
    themes: [
      {
        name: "方位 Directions",
        words: [
          { en: "left", zh: "左邊" }, { en: "right", zh: "右邊" },
          { en: "front", zh: "前面" }, { en: "back", zh: "後面" },
          { en: "far", zh: "遠的" }, { en: "corner", zh: "轉角" },
          { en: "street", zh: "街道" }, { en: "road", zh: "道路" },
          { en: "across", zh: "穿過" }, { en: "along", zh: "沿著" },
          { en: "around", zh: "圍繞" }, { en: "straight", zh: "直直地" },
          { en: "north", zh: "北" }, { en: "south", zh: "南" },
          { en: "east", zh: "東" }, { en: "west", zh: "西" },
          { en: "block", zh: "街區" }, { en: "bridge", zh: "橋" }
        ]
      },
      {
        name: "過去式動詞 Past Tense",
        words: [
          { en: "went", zh: "去（過去）" }, { en: "ate", zh: "吃（過去）" },
          { en: "saw", zh: "看到（過去）" }, { en: "played", zh: "玩（過去）" },
          { en: "studied", zh: "讀書（過去）" }, { en: "watched", zh: "觀看（過去）" },
          { en: "visited", zh: "拜訪（過去）" }, { en: "cooked", zh: "煮（過去）" },
          { en: "bought", zh: "買（過去）" }, { en: "made", zh: "做（過去）" },
          { en: "took", zh: "拿／搭（過去）" }, { en: "came", zh: "來（過去）" },
          { en: "gave", zh: "給（過去）" }, { en: "found", zh: "找到（過去）" },
          { en: "wrote", zh: "寫（過去）" }, { en: "read", zh: "讀（過去）" },
          { en: "did", zh: "做（過去）" }, { en: "had", zh: "有（過去）" },
          { en: "said", zh: "說（過去）" }, { en: "got", zh: "得到（過去）" },
          { en: "met", zh: "遇見（過去）" }, { en: "felt", zh: "感覺（過去）" }
        ]
      },
      {
        name: "興趣 Hobbies",
        words: [
          { en: "fishing", zh: "釣魚" }, { en: "hiking", zh: "健行" },
          { en: "shopping", zh: "購物" }, { en: "camping", zh: "露營" },
          { en: "painting", zh: "繪畫" }, { en: "jogging", zh: "慢跑" },
          { en: "skating", zh: "溜冰" }, { en: "cycling", zh: "騎腳踏車" },
          { en: "collecting", zh: "收集" }, { en: "gardening", zh: "園藝" },
          { en: "baking", zh: "烘焙" }, { en: "traveling", zh: "旅行" },
          { en: "reading", zh: "閱讀" }, { en: "cooking", zh: "烹飪" },
          { en: "photography", zh: "攝影" }, { en: "chess", zh: "西洋棋" }
        ]
      },
      {
        name: "情緒 Emotions",
        words: [
          { en: "excited", zh: "興奮的" }, { en: "bored", zh: "無聊的" },
          { en: "scared", zh: "害怕的" }, { en: "surprised", zh: "驚訝的" },
          { en: "nervous", zh: "緊張的" }, { en: "proud", zh: "驕傲的" },
          { en: "worried", zh: "擔心的" }, { en: "lonely", zh: "孤單的" },
          { en: "confused", zh: "困惑的" }, { en: "relaxed", zh: "放鬆的" },
          { en: "curious", zh: "好奇的" }, { en: "grateful", zh: "感激的" },
          { en: "jealous", zh: "嫉妒的" }, { en: "hopeful", zh: "抱希望的" }
        ]
      },
      {
        name: "科目 Subjects",
        words: [
          { en: "math", zh: "數學" }, { en: "science", zh: "自然科學" },
          { en: "music", zh: "音樂" }, { en: "art", zh: "美術" },
          { en: "history", zh: "歷史" }, { en: "English", zh: "英文" },
          { en: "Chinese", zh: "國語" }, { en: "computer", zh: "電腦" },
          { en: "sports", zh: "體育" }, { en: "geography", zh: "地理" },
          { en: "biology", zh: "生物" }, { en: "physics", zh: "物理" },
          { en: "chemistry", zh: "化學" }, { en: "PE", zh: "體育課" }
        ]
      },
      {
        name: "交通 Transport",
        words: [
          { en: "bus", zh: "公車" }, { en: "train", zh: "火車" },
          { en: "taxi", zh: "計程車" }, { en: "bike", zh: "腳踏車" },
          { en: "car", zh: "汽車" }, { en: "boat", zh: "船" },
          { en: "plane", zh: "飛機" }, { en: "subway", zh: "捷運／地鐵" },
          { en: "scooter", zh: "機車" }, { en: "helicopter", zh: "直升機" },
          { en: "ship", zh: "輪船" }, { en: "tram", zh: "電車" },
          { en: "ferry", zh: "渡輪" }, { en: "ticket", zh: "票" },
          { en: "passenger", zh: "乘客" }, { en: "driver", zh: "司機" }
        ]
      },
      {
        name: "健康 Health",
        words: [
          { en: "healthy", zh: "健康的" }, { en: "exercise", zh: "運動" },
          { en: "medicine", zh: "藥" }, { en: "fever", zh: "發燒" },
          { en: "cough", zh: "咳嗽" }, { en: "cold", zh: "感冒" },
          { en: "headache", zh: "頭痛" }, { en: "stomachache", zh: "肚子痛" },
          { en: "rest", zh: "休息" }, { en: "sleep", zh: "睡眠" },
          { en: "energy", zh: "精力" }, { en: "strong", zh: "強壯的" }
        ]
      },
      {
        name: "進階形容詞 More Adjectives",
        words: [
          { en: "beautiful", zh: "美麗的" }, { en: "delicious", zh: "美味的" },
          { en: "important", zh: "重要的" }, { en: "interesting", zh: "有趣的" },
          { en: "dangerous", zh: "危險的" }, { en: "different", zh: "不同的" },
          { en: "famous", zh: "著名的" }, { en: "popular", zh: "受歡迎的" },
          { en: "wonderful", zh: "很棒的" }, { en: "difficult", zh: "困難的" },
          { en: "easy", zh: "簡單的" }, { en: "special", zh: "特別的" },
          { en: "useful", zh: "有用的" }, { en: "careful", zh: "小心的" },
          { en: "helpful", zh: "樂於助人的" }, { en: "polite", zh: "有禮貌的" }
        ]
      },
      {
        name: "延伸單字 Extra",
        words: [
          { en: "adventure", zh: "冒險" }, { en: "future", zh: "未來" },
          { en: "planet", zh: "行星" }, { en: "spaceship", zh: "太空船" },
          { en: "astronaut", zh: "太空人" }, { en: "universe", zh: "宇宙" },
          { en: "imagine", zh: "想像" }, { en: "create", zh: "創造" },
          { en: "discover", zh: "發現" }, { en: "protect", zh: "保護" },
          { en: "respect", zh: "尊重" }, { en: "share", zh: "分享" },
          { en: "practice", zh: "練習" }, { en: "improve", zh: "進步" },
          { en: "challenge", zh: "挑戰" }, { en: "success", zh: "成功" },
          { en: "courage", zh: "勇氣" }, { en: "kindness", zh: "仁慈" },
          { en: "freedom", zh: "自由" }, { en: "knowledge", zh: "知識" },
          { en: "environment", zh: "環境" }, { en: "recycle", zh: "回收" },
          { en: "pollution", zh: "污染" }, { en: "nature", zh: "大自然" }
        ]
      }
    ]
  }
};

function flattenGrade(gradeId) {
  const set = GRADE_SETS[gradeId];
  if (!set) return [];
  const out = [];
  set.themes.forEach((t) => t.words.forEach((w) => out.push({ en: w.en, zh: w.zh })));
  return out;
}

function flattenAll() {
  const out = [];
  Object.keys(GRADE_SETS).forEach((g) => out.push(...flattenGrade(g)));
  return out;
}
