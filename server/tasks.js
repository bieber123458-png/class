// 佩柔團隊14天上手計劃 - 課程內容
//
// 每天有兩道鎖：
//   1) 順序鎖：前一天的回傳必須被上級核可，才會解鎖這一天
//   2) PIN鎖：就算順序解鎖了，還要輸入當天的3位數PIN碼才看得到內容
//      （PIN由上級決定何時公佈給大家，例如當天上課才公佈）
//
// Day 12 目前沒有內容（原始大綱缺漏，待補），設成 pending，
// 不會卡住後面的 Day 13 / Day 14 進度。

const DAYS = [
  {
    day: 1,
    minutes: 5,
    title: 'APP：MBA培訓系統、雲倉使用方法',
    pin: '482',
    image: { src: '/assets/mba-system.png', caption: 'MBA培訓系統有什麼' },
    blocks: [
      { type: 'subhead', text: 'MBA培訓系統有什麼？' },
      { type: 'list', items: [
        '品牌、產品類（影片）－產品知識課程、銷售輔助課程',
        '事業培訓類（影片）－引流變現、銷售技巧、客戶經營、擴展團隊課程',
        '品牌類（圖片）－產品原理、制度價格表、臨床實驗、授獎照片',
        '產品類（圖片）－產品照片、EDM、產品懶人包、產品資料',
        '常見問題（Q&A）－公司與產品常見問題',
      ]},
      { type: 'subhead', text: '雲倉系統功能（三級以上才能使用）' },
      { type: 'links', items: [
        { label: '儲值完整教學影片', url: 'https://www.youtube.com/watch?v=rVK7grkM3sc&feature=youtu.be' },
      ]},
      { type: 'subhead', text: '儲值（SP運費點數）' },
      { type: 'p', text: '步驟一：立即聯繫加盟商官方客服 LINE（LINE ID：@j28398327），告知：「您好～我需要儲值SP(運費)點數」' },
      { type: 'p', text: '步驟二：填寫以下資料表' },
      { type: 'quote', text: '【儲值SP(運費)點數資料表】\n👉您好～我要儲值SP(運費)點數\n1.直屬皇家姓名：\n2.直屬上家姓名：\n3.加盟商姓名：\n4.加盟商電話：\n（請務必提供加盟商營運系統裡的電話，不然會無法儲值）\n5.加盟商級別：\n6.SP(運費)點數儲值：\n7.匯款帳號後五碼：\n8.請提供匯款截圖：\n\n匯款帳號如下：\n銀行：中國信託822　帳號：495540558397\n戶名：維科生技股份有限公司\n※單次匯款最少儲值金為200元，以百為單位增加；EX.200元、300元、400元…' },
      { type: 'p', text: '步驟三：匯款完畢以及【儲值SP(運費)點數資料表】填妥確認無誤後，連同匯款截圖回傳給客服。' },
      { type: 'p', text: '步驟四及五：工作日下午17:00前完成步驟三的夥伴，待公司核對無誤後，SP點數會於當天儲值到你的加盟商營運系統中；如果超過工作日下午17:00後才完成步驟三，點數儲值將順延到下一個工作日唷‼️' },
      { type: 'subhead', text: '雲倉頁面選單（叫貨/提領在這裡）' },
      { type: 'iconmenu', items: [
        { icon: 'cart', label: '向上家叫貨' },
        { icon: 'checksearch', label: '審核下家叫貨' },
        { icon: 'truck', label: '提領出貨' },
        { icon: 'receipt', label: '歷史記錄' },
      ]},
      { type: 'iconmenu', items: [
        { icon: 'house', label: '首頁' },
        { icon: 'cloud', label: '雲倉', active: true },
        { icon: 'people', label: '團隊組織' },
        { icon: 'chat', label: '聊聊' },
        { icon: 'person', label: '我的資料' },
      ]},
      { type: 'p', text: '叫貨：向上家叫貨 → 選擇當初加盟所選的產品數量依序加入購物車 → 右上角購物車核對商品 → 右下角確認叫貨 → 匯款金額至上家帳號 → 附上截圖 → 提交。' },
      { type: 'p', text: '提領：提領出貨 → 選擇要提領的產品（一次最少提領5樣）→ 右下角我要提領 → 核對提領商品 → 下方確認提領 → 輸入收件資料（宅配／7-11／全家，最多可記錄三組地址）→ 送出。' },
      { type: 'qa', q: '實習為何不能使用雲倉？', a: '實習補貨量少，上家幫忙寄送即可。如果想使用雲倉，可以升級成三級就能使用囉！' },
      { type: 'qa', q: '為什麼要5樣才能提領？', a: '如果只提領一包體驗包或一本DM，公司卻需要負擔包材成本，為了避免這樣的狀況，一次最少提領5樣商品唷！' },
    ],
    submitHint: '簡述你已完成登入MBA培訓系統／雲倉，並寫下你學到的操作重點（例如叫貨、提領、拆分、儲值點數）',
  },
  {
    day: 2,
    minutes: 5,
    title: '基礎版面打造',
    pin: '917',
    blocks: [
      { type: 'p', lead: true, text: '新手照著做就好' },

      { type: 'subhead', text: '① 清楚的頭像' },
      { type: 'p', text: '讓別人一眼認出你。建議：' },
      { type: 'list', items: [
        '使用本人清楚、自然的照片',
        '不要使用風景、寵物、商品當頭像',
        '避免照片太遠或太暗',
      ]},

      { type: 'subhead', text: '② 好記的名字' },
      { type: 'p', text: '讓別人搜尋得到你、記得住你。公式可以直接給夥伴：名字／暱稱＋你的特色／專業' },
      { type: 'quote', text: '小美｜日常分享\n婷婷｜美妝保養\n阿芳｜體態管理' },
      { type: 'p', text: '不用每個人都一模一樣，重點是簡單、好記、看得懂。' },

      { type: 'subhead', text: '③ 自我介紹' },
      { type: 'p', text: '這個建議做成填空模板，新手最容易卡在這裡，直接給他們：' },
      { type: 'quote', text: '我是誰｜我在做什麼\n我的故事／改變\n我可以提供什麼\n想了解更多 → 私訊我' },
      { type: 'p', text: '範例參考（請照原文使用，不隨意更改）' },
      { type: 'profilecard',
        name: '林恰兒｜居家運動｜體態管理',
        stats: [
          { value: '363', label: '則貼文' },
          { value: '4,753', label: '位粉絲' },
          { value: '1,488', label: '追蹤中' },
        ],
        bio: '恰兒｜1寶媽日常｜居家運動\n卡了3年的體重，在3個月內輕鬆ByeBye🔥\n合作邀約/產品諮詢/歡迎私訊小盒子\n翻譯年糕',
      },

      { type: 'subhead', text: '④ 認識你的貼文' },
      { type: 'p', lead: true, text: '不要一加入就每天發「產品很好、歡迎購買」。先讓別人認識你。' },
      { type: 'p', text: '可以分享：' },
      { type: 'list', items: [
        '我的日常', '我的故事', '我的興趣', '我的改變', '我的工作', '我使用產品的過程', '客人的回饋',
      ]},
      { type: 'quote', text: '讓陌生人慢慢產生：\n「我認識這個人 → 我信任這個人 → 我願意問她」' },

      { type: 'subhead', text: '⑤ 帳號公開' },
      { type: 'p', text: '新手一定要檢查：帳號 → 公開' },
      { type: 'p', text: '因為你希望陌生人透過貼文、短影音或朋友分享認識你，就必須讓對方能看到你的內容。' },
    ],
    submitHint: '簡述你完成的頭貼／名字／自我介紹設定，並確認帳號已改為公開',
  },
  {
    day: 3,
    minutes: 10,
    title: '簡單的限動美感',
    pin: '305',
    blocks: [
      { type: 'p', lead: true, text: '🎯 今天的目標：限時動態要讓大家看得懂，不是自己看懂就好。' },

      { type: 'subhead', text: '① 萬用構圖' },
      { type: 'quote', text: '製圖前，最重要的是構圖：圖片底子不好，再怎麼修改都沒用' },
      { type: 'image', src: '/assets/grid-settings.png', caption: '認識構圖：畫面平衡感很重要（設定 → 相機 → 格線）' },
      { type: 'image', src: '/assets/comp-center.png', caption: '居中構圖' },
      { type: 'image', src: '/assets/comp-thirds.png', caption: '三分線構圖' },
      { type: 'image', src: '/assets/comp-quad.png', caption: '四宮格構圖' },
      { type: 'image', src: '/assets/comp-diagonal.png', caption: '對角線構圖' },

      { type: 'subhead', text: '② 字體' },
      { type: 'p', text: '新手先記住：' },
      { type: 'list', items: [
        '字體不要超過3個',
        '注意字間距、行距',
        '內容記得分段',
        '大標建議使用方正字體',
        '避免使用太歪、太花俏的字體（斜體、卡通字、手寫風）→ 容易造成視覺混淆、可讀性差、給人不專業的感覺',
      ]},

      { type: 'subhead', text: '③ 顏色' },
      { type: 'list', items: [
        '顏色不要使用螢光色',
        '一張限動建議不要超過兩個色系',
        '最安全可以使用同一色系做深淺搭配',
      ]},
      { type: 'image', src: '/assets/color-tabu-example.jpg', caption: '❌ 左：紫＋橘兩個色系混用，看起來雜亂 ｜ ⭕ 右：同一桃紅色系深淺搭配，畫面乾淨統一' },

      { type: 'subhead', text: '④ 畫面' },
      { type: 'p', text: '畫面要乾淨整齊，不要把太多東西全部塞在一張限動裡。可以簡單分成：' },
      { type: 'quote', text: '大標題 → 內文 → 小亮點' },
      { type: 'image', src: '/assets/structure-example.jpg', caption: '範例：大標題（上方重點句）＋內文（下方細節說明）' },

      { type: 'subhead', text: '⑤ 範例對照' },
      { type: 'p', text: 'BA背景' },
      { type: 'list', items: [
        '❌ 錯誤示範：雜亂背景＋螢光／高彩度字體 → 看起來很亂，找不到重點',
        '⭕ 正確示範：乾淨深色背景＋白色文字 → 重點一眼就能看到',
      ]},
      { type: 'p', text: '詢問截圖' },
      { type: 'list', items: [
        '❌ LINE對話截圖搭配太花俏的背景 → 容易讓觀眾找不到重點',
        '⭕ 使用乾淨的背景 → 讓聊天內容成為畫面的重點',
      ]},

      { type: 'subhead', text: '⑥ 推薦使用字體' },
      { type: 'image', src: '/assets/fonts-recommend.png', caption: '常用字體：jf open粉圓2.0、獅尾繁中宋體、簡宋、蘋方－繁；Vivisticker、下筆 App 內建字體範例' },

      { type: 'subhead', text: '⑦ APP推薦' },
      { type: 'image', src: '/assets/camera-app.png', caption: '美顏相機：選「原生」模式，真實質感、不吃妝' },
      { type: 'image', src: '/assets/design-apps.png', caption: '製圖常用 App：Vivisticker、下筆、Canva' },

      { type: 'subhead', text: '⑧ 限動尺寸' },
      { type: 'p', text: '比例：9:16' },
      { type: 'p', text: '背景：' },
      { type: 'list', items: [
        '❌ 不要用太複雜的漸層',
        '⭕ 簡單乾淨即可',
      ]},

      { type: 'subhead', text: '⭐ 記憶版' },
      { type: 'quote', text: '限動美感6個重點：\n構圖對｜字體少｜顏色少｜分段清楚｜背景乾淨｜重點明顯' },
    ],
    submitHint: '上傳一張你自己完成的限動截圖（9:16），並簡述你怎麼掌握字體、顏色、背景乾淨這幾個原則',
  },
  {
    day: 4,
    minutes: 10,
    title: '銷售前心態',
    pin: '761',
    blocks: [
      { type: 'p', lead: true, text: '🎯 今天的目標：建立正確的銷售心態——不害怕開口、不怕被拒絕、不心急促成交。' },
      { type: 'p', text: '從新人時期開始培養正確心態。剛開始幾乎每個人心裡都會有這些聲音：' },
      { type: 'voicelist', items: [
        '沒有經驗也沒有粉絲，朋友又少',
        '我不敢面對鏡頭',
        '會不會沒辦法像其他人一樣賣得好',
        '真的會有人找我諮詢嗎？',
        '短影音好難，我沒辦法',
        '影片拍了，流量好差',
      ]},

      { type: 'subhead', text: '01｜先建立一個觀念' },
      { type: 'quote', text: '銷售不是推銷，而是讓對方知道你能提供什麼。' },
      { type: 'p', text: '不要害怕開口介紹產品。客人有需求，只是需要有人讓他知道「這個產品可以幫助我」。' },

      { type: 'subhead', text: '02｜不要害怕被拒絕' },
      { type: 'p', text: '客人說「不用」，不代表你不好，也不代表產品不好。被拒絕只是代表：現在還不是他的需求。' },
      { type: 'quote', text: '不要因為一次拒絕，就不敢再分享。' },

      { type: 'subhead', text: '03｜不要急著成交' },
      { type: 'p', text: '新手最容易犯的錯：' },
      { type: 'list', items: [
        '❌ 一開口就問「要不要買？」',
        '❌ 一直介紹產品價格',
        '❌ 急著把產品賣出去',
      ]},
      { type: 'p', text: '先做：' },
      { type: 'quote', text: '認識 → 了解需求 → 分享 → 解決問題 → 再成交' },

      { type: 'subhead', text: '04｜先建立信任，再談產品' },
      { type: 'p', text: '客人不是因為你「很會賣」才買，而是因為：' },
      { type: 'quote', text: '相信你 → 了解你 → 認同你 → 願意跟你買' },
      { type: 'p', text: '所以平常的限動、貼文、生活分享，都是在累積信任。' },

      { type: 'subhead', text: '05｜新手銷售前先問自己' },
      { type: 'p', text: '在跟客人聊天前，先記住三件事：' },
      { type: 'list', items: [
        '我不是在打擾對方',
        '我是在提供一個選擇',
        '沒成交也沒關係，先累積信任',
      ]},

      { type: 'subhead', text: '⭐ 新人必記' },
      { type: 'quote', text: '不要怕開口｜不要怕被拒絕｜不要急著成交｜先建立信任' },

      { type: 'subhead', text: '📺 心態必上課程' },
      { type: 'links', items: [
        { url: 'https://youtu.be/0oYevHn0ShM?si=F6iL1aUD60KSse7c', label: '心態必上課程' },
      ]},
    ],
    submitHint: '這些心裡話中，哪一句最有共鳴？另外「不要怕開口／不要怕被拒絕／不要急著成交／先建立信任」這4句裡，你覺得自己最需要練習的是哪一句？寫下原因（至少50字）',
  },
  {
    day: 5,
    minutes: 5,
    title: '動態前期',
    pin: '148',
    blocks: [
      { type: 'p', text: '不單單只是銷售！而是分享產品如何讓你的生活變好。' },
      { type: 'subhead', text: '框架A・四種日常內容' },
      { type: 'list', items: ['價值觀輸出', '好物分享', '餐廳探店', '出貨／工作日常'] },
      { type: 'subhead', text: '框架B・產品心得結構' },
      { type: 'list', items: ['吃產品的原因', '失敗的經歷', '痛點', '產品帶來的好處'] },
    ],
    submitHint: '條列3個你之後想發的日常動態題材（可套用框架A或框架B）',
  },
  {
    day: 6,
    minutes: 5,
    title: '定位九宮格',
    pin: '693',
    blocks: [
      { type: 'p', text: '認清自己的身分＋故事——你想吸引什麼樣的人，就要先把自己打扮成什麼樣的人。' },
      { type: 'fillBlank', rows: [
        { prompt: '我是＿＿歲', example: '我是25歲上班族' },
        { prompt: '我的身份＿＿', example: '習慣利用中午吃飯時間去健身' },
        { prompt: '我的日常＿＿', example: '一年多的健身經歷' },
        { prompt: '我接觸產品的故事＿＿', example: '但是我克制不住吃零食，導致容易囤積肥肉' },
        { prompt: '我的困擾＿＿', example: '肚子大、腿又粗總是被身邊的人嘲笑，穿裙子都會有大腿摩擦的問題' },
      ]},
    ],
    submitHint: '依照上面五格填寫你自己的版本，並簡述你想吸引的族群輪廓',
  },
  {
    day: 7,
    minutes: 1,
    title: '包貨紙箱、破壞袋',
    pin: '254',
    blocks: [
      { type: 'p', text: '睡覺也能收單，包材要先備好。收藏以下兩個採購連結：' },
      { type: 'links', items: [
        { label: '紙箱（7、9、10號）', url: 'https://s.shopee.tw/4Aog5HDf7e' },
        { label: '破壞袋（小的28*42）', url: 'https://s.shopee.tw/7V583TuYLz' },
      ]},
    ],
    submitHint: '確認已收藏以上兩個連結',
  },
  {
    day: 8,
    minutes: 5,
    title: '平台選擇（賣貨便、蝦皮）',
    pin: '830',
    blocks: [
      { type: 'p', text: '睡覺也能收單的賣場連結：' },
      { type: 'links', items: [
        { label: '7-11 賣貨便 上架教學', url: 'https://cpok.tw/27145' },
        { label: '全家好賣家 上架教學', url: 'https://cpok.tw/27241' },
        { label: '蝦皮 上架教學', url: 'https://seller.shopee.tw/edu/article/3641' },
        { label: '綠界金流申請', url: 'https://rakosell.com/zh/blog/ec-pay-tutorial' },
      ]},
    ],
    submitHint: '簡述你打算先用哪個平台上架、目前進度到哪一步',
  },
  {
    day: 9,
    minutes: 3,
    title: '百萬群組資源介紹',
    pin: '576',
    blocks: [
      { type: 'p', text: '百萬小學堂可享有的資源，記得加入以下群組：' },
      { type: 'groupList', items: [
        { name: '百萬小學堂交流群', note: '每週要交三張圖，互相分享客人反饋／對比圖／製圖', count: '120人' },
        { name: '富一代', note: '', count: '159人' },
        { name: '百萬引爆流量群', note: '培訓系統2.0陪跑群', count: '107人' },
        { name: '百萬零售衝刺群', note: '培訓系統2.0陪跑群', count: '97人' },
        { name: '百萬團隊裂變群', note: '完成任務才能找上級申請報名', count: '51人' },
        { name: '雙鑽榮譽DQ團隊共識5E群', note: 'DQ大團隊群組，超過百堂限定課程', count: '498人' },
        { name: '婕樂纖無店鋪行動加盟官方群4O', note: '公司官方營養師群組', count: '493人' },
        { name: '婕樂纖無店鋪行動加盟官方群4F', note: '公司官方營養師群組', count: '500人' },
        { name: '婕樂纖加盟商官方客服', note: '儲值運費／申請創業包／訂製名片／課程活動報名確認', count: 'LINE' },
      ]},
    ],
    submitHint: '確認已加入以上所有群組，簡述你已加入哪幾個',
  },
  {
    day: 10,
    minutes: 3,
    title: '纖體班報名',
    pin: '419',
    blocks: [
      { type: 'subhead', text: '報名方式' },
      { type: 'list', items: [
        '填寫纖體班表單：https://reurl.cc/edQx4L（本名、LINE名稱／ID、身分別及購買數量、產品合照、賣家授權書）',
        '加LINE好友 @181hlrqr，傳送：身份（加盟商／消費者）、姓名、Line ID',
      ]},
      { type: 'subhead', text: '達標送贈品（3項都達成，隨機送一盒纖體系列產品，市價1480元）' },
      { type: 'list', items: [
        '兩週體重下降2.5公斤，且體脂下降1.2%（含）以上',
        '記事本打卡兩週至少4次以上（不含期初建立記事本）',
        '拍攝前後體態照＆體重機數據並留存原檔，同意肖像權授權',
      ]},
    ],
    submitHint: '寫下你的報名狀況（已完成報名／預計報名日期），可附上報名成功截圖',
  },
  {
    day: 11,
    minutes: 3,
    title: '官方群提問模版',
    pin: '962',
    blocks: [
      { type: 'p', text: '營養師諮詢表格，百萬小學堂記事本可直接複製。' },
      { type: 'list', items: [
        '標記8位營養師，填寫「體重管理系列」表格（16題：性別年齡、身高體重體脂、腰圍、使用天數／方式／劑量、飲食控制、水量攝取、排便睡眠運動頻率、過去減重史、目前用藥、喝酒頻率）',
        '標記美容師 @Elaine（小嵐），填寫「養顏美容系列」（10題）或「養髮洗護系列」（15題：頭皮髮質、法樂蓬使用狀況、頭皮屑史、染燙髮史、用藥史、居住地等）',
      ]},
    ],
    submitHint: '寫下一則你會發到官方群的提問草稿（套用以上模版格式）',
  },
  {
    day: 12,
    minutes: null,
    title: '（內容待補充）',
    pending: true,
    blocks: [
      { type: 'p', text: '這一天的內容原始大綱與簡報都沒有提供，先自動略過，不會卡住後面的進度，之後補齊後會加進來。' },
    ],
  },
  {
    day: 13,
    minutes: 15,
    title: '動態鋪陳SOP',
    pin: '137',
    blocks: [
      { type: 'subhead', text: '① 鋪陳——產品鋪陳開始說故事囉' },
      { type: 'p', text: '用「起承轉合」公式，讓觀眾產生共鳴：' },
      { type: 'list', items: [
        '起（製造共鳴，創造需求）：你遇到什麼困擾？',
        '承（深化問題，讓觀眾代入）：這問題對你造成什麼影響？',
        '轉（轉折→我找到一個方法）：你是怎麼發現這個產品的？',
        '合（初步使用感受或期望）：感受如何？期待什麼？',
      ]},
      { type: 'quote', text: '瘦身系列——\n①起：「我因為下半身比較肥胖，大腿總是摩擦，都不敢穿上喜歡的裙子或洋裝，我試過好多方法168、節食、健身都沒有辦法瘦下來」\n②承：「那時候已經節食連續三週，每天餓到心情很差體重都沒變，我真的心態大崩…」\n③轉：「最近買了這個還蠻紅的，聽說可以不用節食就能瘦，我現在已經吃第三天，控制嘴饞耶」\n④合：「希望可以一路瘦到理想狀態，穿上喜歡的洋裝，如果有用的話我之後再跟你們分享！」' },

      { type: 'subhead', text: '② 銷售前——準備好BA、使用產品的心得' },
      { type: 'quote', text: '婕肌零洗背痘——\n我從以前就超害怕穿背心，或是那種會露出背部的衣服，因為背痘超多已經困擾5年了，只要流汗、喝牛奶、喝雞湯就瘋狂冒痘痘，各種去痘神器都買過⋯\n有想過要去打醫美，但真的太貴了我花不下去⋯也害怕花了這麼多錢最後又變回原樣，一直很想反饋，可是沒有勇氣。今天看到背後變那麼乾淨，勇氣馬上跑出來了⋯' },

      { type: 'subhead', text: '③ 銷售中——對話模板與價格' },
      { type: 'p', text: '提問式銷售：假如客人傳來「你好，＿＿多少錢？」「我想諮詢」「想請問瘦身」「瘦身一個月要多少$」，先別急著報價。' },
      { type: 'p', text: '開放式／封閉式問答（先了解需求，再介紹產品）：' },
      { type: 'voicelist', items: ['1｜一盒 $1480', '2｜你要不要多帶小粉？', '3｜買3盒最划算', '4｜其他'] },
      { type: 'p', text: '產品價格計算方式：' },
      { type: 'table', headers: ['', '小綠', '飄飄', '小粉'], rows: [
        ['原價', '1480', '1480', '（PPT被標籤遮住）'],
        ['任選兩件', '1380', '1380', '800'],
        ['滿額 $4000', '1280', '1280', '740'],
      ]},
      { type: 'practice', items: [
        { q: '客人買一盒小綠是多少錢？', a: '1480' },
        { q: '客人買一盒小綠＋一盒小粉是多少錢？', a: '2180' },
        { q: '客人買兩盒小綠＋兩盒飄飄＋兩盒小粉多少錢？', a: '6600' },
        { q: '客人買三盒小綠是多少錢？', a: '3840' },
      ]},

      { type: 'subhead', text: '④ 銷售後——服務13777' },
      { type: 'list', items: [
        'DAY1　客人收到貨關心',
        'DAY3　詢問客人產品吃的狀況，一方面確認客人已經開始吃產品',
      ]},
      { type: 'gapnote', text: '中間這一格被PPT紅色標籤擋住，只露出尾端「…吃法」幾個字，推測是DAY7，內容待補充完整版本。' },
      { type: 'list', items: [
        'DAY14　關心客人使用狀況（纖體班／日常關心）',
        'DAY21　關心客人是否需要回購',
      ]},
      { type: 'quote', text: 'DAY14 示範話術——\n「你目前參加纖體班有什麼變化嗎？」「那你現在有瘦多少呀？」\n（可分享：菜肉飯321比例、大餐前後怎麼吃、纖飄錠／爆纖錠的搭配吃法）' },
      { type: 'quote', text: 'DAY21 示範話術——\n「你堅持了一個月真的超棒耶！超多人都撐不下去！如果你想要長期回購的話，我可以幫你申請更優惠的方案唷」\n（可用實際差價說明：加盟自用比單買划算，並提醒瘦身建議至少持續吃3個月）' },
    ],
    submitHint: '依「鋪陳／銷售前／銷售中／銷售後」四個階段，各寫一句你會怎麼執行的規劃',
  },
  {
    day: 14,
    minutes: null,
    title: '新人必上課程',
    pin: '204',
    blocks: [
      { type: 'p', text: '新人必須得上的兩堂課程：' },
      { type: 'links', items: [
        { label: '課程一', url: 'https://youtu.be/iGMEzIraLYQ' },
        { label: '課程二', url: 'https://youtu.be/YOv5Osn0Z9Q' },
      ]},
      { type: 'p', text: '九宮格引流課程：' },
      { type: 'links', items: [
        { label: '九宮格引流課程', url: 'https://youtu.be/DBdarfdHajc' },
      ]},
    ],
    submitHint: '確認已看完以上課程，簡述你學到的重點',
  },
];

const TASKS = DAYS.map((d, index) => ({ id: `d${d.day}`, seq: index, ...d }));

function getTaskById(id) {
  return TASKS.find((t) => t.id === id);
}

module.exports = { TASKS, getTaskById };
