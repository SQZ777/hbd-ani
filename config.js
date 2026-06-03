// 你可以在這裡客製化生日遊戲內容
// 建議照片放在 assets 資料夾，檔名可自行更換。
// 目前先用 placeholder SVG，等你換成自己的照片即可。

window.BIRTHDAY_GAME_CONFIG = {
  defaultFriendName: "阿妮",
  titleTemplate: "{name} 的生日記憶翻牌",
  subtitle: "翻開卡片，找出一樣的回憶。全部配對成功後，會解鎖最後的生日祝福。",
  stageTitleTemplate: "找回 {name} 的生日回憶",
  winTitleTemplate: "{name}，生日快樂！",
  winMessageTemplate: "去找找你的禮物吧！用白色盒子裝起來了",
  revealImage: "assets/LINE_ALBUM_202663_260603_8.jpg",

  // 至少放 8 組比較彈性：簡單用前 4 組、普通用前 6 組、困難用前 8 組。
  memories: [
    {
      id: "m1",
      image: "assets/LINE_ALBUM_202663_260603_1.jpg",
      title: "韓國的麥當勞",
      message: "還是臺灣的好吃"
    },
    {
      id: "m2",
      image: "assets/LINE_ALBUM_202663_260603_2.jpg",
      title: "樂天世界的城堡",
      message: "迪士尼城堡最漂釀"
    },
    {
      id: "m3",
      image: "assets/LINE_ALBUM_202663_260603_3.jpg",
      title: "第一次一起出國",
      message: "韓服穿起來"
    },
    {
      id: "m4",
      image: "assets/LINE_ALBUM_202663_260603_4.jpg",
      title: "韓國的小吃",
      message: "好吃嗎？"
    },
    {
      id: "m5",
      image: "assets/LINE_ALBUM_202663_260603_5.jpg",
      title: "每年的生日一起過",
      message: "已經沒梗了"
    },
    {
      id: "m6",
      image: "assets/LINE_ALBUM_202663_260603_6.jpg",
      title: "誰最兇？",
      message: "哈哈是我啦"
    },
    {
      id: "m7",
      image: "assets/LINE_ALBUM_202663_260603_7.jpg",
      title: "我的媽媽",
      message: "怎麼還在家？"
    },
    {
      id: "m8",
      image: "assets/LINE_ALBUM_202663_260603_8.jpg",
      title: "嗨！乾媽！",
      message: "等你幫我洗澡呦"
    }
  ]
};
