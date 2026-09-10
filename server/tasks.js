// 佩柔團隊10天上手計劃 - 課程內容
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

      { type: 'subhead', text: '06｜提問式銷售｜先問，再報價' },
      { type: 'p', text: '當客人傳來：' },
      { type: 'voicelist', items: [
        '你好，＿＿多少錢？',
        '我想諮詢',
        '想請問瘦身',
        '瘦身一個月要多少$？',
      ]},
      { type: 'p', text: '❌ 新手不要馬上回價格，因為你還不知道客人：' },
      { type: 'list', items: [
        '為什麼想瘦？',
        '目前最困擾什麼？',
        '想改善哪裡？',
        '有沒有嘗試過其他方法？',
      ]},
      { type: 'p', text: '先了解需求，再介紹適合的產品。' },

      { type: 'subhead', text: '① 開放式問題｜讓客人多說一點' },
      { type: 'p', text: '不要只問「要不要？」可以問：' },
      { type: 'voicelist', items: [
        '可以呀～想先了解一下，你目前最困擾的是哪一部分呢？',
        '你這次會想開始瘦身，主要是因為什麼原因呀？',
        '你目前最想改善的是體態、飲食，還是其他方面呢？',
      ]},
      { type: 'p', text: '📌 目的：讓客人把自己的需求說出來。' },

      { type: 'subhead', text: '② 封閉式問題｜幫助客人做選擇' },
      { type: 'p', text: '當你已經了解一些需求後，再用選擇題：' },
      { type: 'voicelist', items: [
        '你比較在意小腹，還是整體體態呢？',
        '你是想先體驗看看，還是想直接做一個月的規劃呢？',
      ]},
      { type: 'p', text: '📌 目的：讓聊天更容易繼續，不讓客人只回一句「喔」。' },

      { type: 'subhead', text: '③ 了解需求後，再介紹產品' },
      { type: 'p', text: '這時候才開始說明：' },
      { type: 'quote', text: '你的需求 → 對應產品 → 使用方式 → 價格' },
      { type: 'p', text: '而不是一開始就丟：' },
      { type: 'list', items: [
        '❌「一盒 $1480」',
        '❌「買3盒最划算」',
        '❌「要不要多帶小粉？」',
      ]},

      { type: 'subhead', text: '⭐ 新手夥伴記住' },
      { type: 'p', text: '客人問價格 ≠ 馬上報價格' },
      { type: 'quote', text: '問需求 → 聽答案 → 找痛點 → 介紹產品 → 最後報價' },
      { type: 'p', text: '真正的提問式銷售，不是一直問問題，而是讓客人覺得：' },
      { type: 'quote', text: '「她是真的想了解我的需求，不是在急著賣我東西。」' },

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
      { type: 'list', items: ['價值觀輸出', '好物分享', '美食分享', '出貨／工作日常'] },

      { type: 'video', src: '/assets/day5-value.mp4', caption: '範例：價值觀輸出' },
      { type: 'video', src: '/assets/day5-goods.mp4', caption: '範例：好物分享' },
      { type: 'video', src: '/assets/day5-restaurant.mp4', caption: '範例：美食分享' },
      { type: 'video', src: '/assets/day5-work.mp4', caption: '範例：出貨／工作日常' },

      { type: 'subhead', text: '框架B・產品心得結構' },
      { type: 'list', items: ['吃產品的原因', '失敗的經歷', '痛點', '產品帶來的好處'] },

      { type: 'subhead', text: '① 吃產品的原因' },
      { type: 'gapnote', text: '小內文：為什麼吃？起心動念是什麼？可能是小時候胖胖的，或者是皮膚狀況問題。' },

      { type: 'subhead', text: '② 失敗的經歷' },
      { type: 'gapnote', text: '小內文：可能是我過去觀念錯誤，覺得吃保健食品就可以大吃大喝，或者是我很愛擠痘痘然後造成有痘疤的問題。' },

      { type: 'subhead', text: '③ 痛點' },
      { type: 'subhead', text: '瘦身痛點' },
      { type: 'p', text: '外型困擾' },
      { type: 'list', items: [
        '小腹突出、腰間肉明顯',
        '大腿、手臂容易顯胖',
        '穿衣服不好看、不敢穿貼身衣服',
        '拍照覺得自己看起來很胖',
      ]},
      { type: 'p', text: '減重困擾' },
      { type: 'list', items: [
        '吃不多但還是容易胖',
        '嘗試很多方法卻不容易維持',
        '好不容易瘦了又復胖',
        '想運動卻沒有時間',
        '想改變卻不知道從哪裡開始',
      ]},
      { type: 'p', text: '心理困擾' },
      { type: 'list', items: [
        '不喜歡現在的身材',
        '看到別人變瘦會羨慕',
        '希望穿衣服更好看',
        '想找回自信、讓自己更有精神',
      ]},

      { type: 'subhead', text: '皮膚痛點' },
      { type: 'p', text: '外觀困擾' },
      { type: 'list', items: [
        '暗沉、沒有光澤',
        '毛孔明顯',
        '粉刺、痘痘反覆',
        '痘印、痘疤困擾',
        '容易泛紅',
        '上妝容易卡粉、脫妝',
      ]},
      { type: 'p', text: '保養困擾' },
      { type: 'list', items: [
        '買很多保養品卻不知道怎麼搭配',
        '擦很多產品卻看不到理想改變',
        '不知道自己的膚況適合什麼',
        '保養很容易半途而廢',
        '花了很多錢，卻不知道有沒有用',
      ]},
      { type: 'p', text: '心理困擾' },
      { type: 'list', items: [
        '素顏沒有自信',
        '拍照需要靠濾鏡',
        '不敢近距離見人',
        '希望皮膚看起來更有精神',
        '希望素顏也能有好氣色',
      ]},

      { type: 'subhead', text: '⭐ 新手夥伴記住' },
      { type: 'quote', text: '瘦身＝身材困擾＋減重困擾＋自信\n皮膚＝膚況困擾＋保養困擾＋自信' },
      { type: 'p', text: '所以聊天時不要一開始就問：❌「要不要買產品？」' },
      { type: 'p', text: '而是先去了解：' },
      { type: 'quote', text: '「你現在最困擾的是哪一個問題？」' },
      { type: 'p', text: '這樣才比較容易找到客人的真正需求。' },

      { type: 'subhead', text: '④ 產品帶來的好處' },
      { type: 'subhead', text: '產品體驗｜先讓自己有感' },
      { type: 'p', text: '新手加入後，不要急著賣。先自己使用、自己感受、自己了解產品。因為當你自己有體驗過，之後跟客人分享時，會更自然，也比較不會不知道要說什麼。' },

      { type: 'subhead', text: '瘦身產品｜記錄自己的感受' },
      { type: 'p', text: '使用過程中可以觀察：' },
      { type: 'list', items: [
        '吃完之後自己的感受',
        '飲食習慣有沒有變化',
        '身體狀態有沒有不同',
        '體態上的變化',
        '穿衣服、照鏡子時的感受',
        '自己最有感的是哪一個地方',
      ]},
      { type: 'gapnote', text: '📌 不用刻意講很厲害，只分享自己的真實體驗。' },

      { type: 'subhead', text: '皮膚產品｜記錄自己的感受' },
      { type: 'p', text: '使用過程中可以觀察：' },
      { type: 'list', items: [
        '使用當下的膚感',
        '保養後的感覺',
        '肌膚摸起來的感受',
        '上妝時的感覺',
        '持續使用後自己注意到的變化',
        '自己最喜歡產品哪一點',
      ]},
      { type: 'gapnote', text: '📌 把「我用了之後的感覺」記錄下來，未來就是你分享產品最自然的素材。' },

      { type: 'subhead', text: '⭐ 新手夥伴記住' },
      { type: 'quote', text: '先體驗 → 記錄 → 感受 → 分享\n不要背產品話術。\n你自己用過、真的有感受，分享起來才會像在聊天，而不是在賣東西。' },
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

      { type: 'subhead', text: '① 興趣定位' },
      { type: 'p', text: '我喜歡做什麼？什麼事可以讓我感到快樂？' },

      { type: 'subhead', text: '② 價值定位' },
      { type: 'p', text: '我能提供什麼價值？什麼事情對我來說最重要？' },

      { type: 'subhead', text: '③ 天賦定位' },
      { type: 'p', text: '我天生擅長什麼？別人最常稱讚我什麼？' },

      { type: 'subhead', text: '④ 能力定位' },
      { type: 'p', text: '我具備哪些專業能力？我可以持續精進什麼？' },

      { type: 'subhead', text: '⑤ 自我定位' },
      { type: 'p', text: '我是誰？我想成為什麼樣的人？' },

      { type: 'subhead', text: '⑥ 人設定位' },
      { type: 'p', text: '我希望別人怎麼記住我？我想建立什麼樣的個人形象？' },

      { type: 'subhead', text: '⑦ 商業定位' },
      { type: 'p', text: '我可以靠什麼創造收入？我的專業可以如何變現？' },

      { type: 'subhead', text: '⑧ 生活定位' },
      { type: 'p', text: '我想過什麼樣的生活？什麼樣的生活方式最適合我？' },

      { type: 'subhead', text: '⑨ 社會定位' },
      { type: 'p', text: '我想為別人帶來什麼？我希望自己對這個世界產生什麼影響？' },

      { type: 'image', src: '/assets/day6-nine-grid.jpg', caption: '定位九宮格總覽' },
    ],
    submitHint: '依照上面九宮格，簡短寫下你自己的版本（每格1-2句即可），並簡述完成後你對自己的定位有什麼新想法',
  },
  {
    day: 7,
    minutes: 6,
    title: '包貨包材、上架平台',
    pin: '254',
    blocks: [
      { type: 'subhead', text: '① 包貨包材' },
      { type: 'p', text: '睡覺也能收單，包材要先備好。收藏以下兩個採購連結：' },
      { type: 'links', items: [
        { label: '紙箱（7、9、10號）', url: 'https://s.shopee.tw/4Aog5HDf7e' },
        { label: '破壞袋（小的28*42）', url: 'https://s.shopee.tw/7V583TuYLz' },
      ]},

      { type: 'subhead', text: '② 上架平台' },
      { type: 'p', text: '睡覺也能收單的賣場連結：' },
      { type: 'links', items: [
        { label: '7-11 賣貨便 上架教學', url: 'https://cpok.tw/27145' },
        { label: '全家好賣家 上架教學', url: 'https://cpok.tw/27241' },
        { label: '蝦皮 上架教學', url: 'https://seller.shopee.tw/edu/article/3641' },
        { label: '綠界金流申請', url: 'https://rakosell.com/zh/blog/ec-pay-tutorial' },
      ]},

      { type: 'subhead', text: '③ 用ChatGPT生成產品宣傳圖' },
      { type: 'p', text: '想用AI（例如ChatGPT）幫忙做產品宣傳圖，重點是把風格、構圖、文字、禁止項目都寫清楚，AI才會做出你要的效果。下面是一個範例指令，可以直接複製修改（記得附上你的產品照片給AI參考）：' },
      { type: 'quote', text: '請製作一張高級、乾淨、質感的「小綠 JERÔSSE」產品形象宣傳圖。\n\n請以我提供的產品照片作為產品外觀參考，完整保留 JERÔSSE 小綠產品包裝的真實造型、顏色、Logo與比例，不要重新設計產品包裝。\n\n整體風格：\n- 韓系高級感\n- 極簡、清新、自然\n- 奶油米白＋鼠尾草綠＋淡金色\n- 柔和自然光\n- 高級保養品／生活風格品牌攝影\n- 畫面乾淨、有留白\n- 不要俗氣的減肥廣告風格\n- 不要過度鮮豔\n- 不要複雜背景\n\n畫面構圖：\n- 直式 4:5\n- 小綠產品包裝放在畫面中央偏下\n- 一包產品立體呈現，旁邊放產品盒\n- 背景使用米白色石材桌面\n- 周圍搭配少量綠色植物葉片\n- 可以加入透明玻璃杯與柔和光影\n- 產品是整張圖片的視覺主角\n- 保留足夠留白，讓畫面看起來高級\n\n文字設計：\n主標題：\n「小綠」\n\n副標題可以使用：\n「給日常多一份輕盈的選擇」\n\n小字：\n「日常管理｜輕盈生活」\n\n底部可以放：\n「Better Me, Every Day」\n\n重要要求：\n- 不要出現「大脂肪溶解小脂肪」\n- 不要出現「澱粉殺手」\n- 不要出現「燃脂」\n- 不要出現「減脂」\n- 不要出現任何疾病、治療、療效或保證效果的文字\n- 不要寫「吃了就瘦」\n- 不要使用前後對比身材\n- 不要出現人體脂肪、腹部、卡路里、脂肪燃燒等圖像\n- 整張圖定位為「產品形象／日常生活風格」，不要做成療效型廣告\n\n整體要呈現：\n「漂亮、乾淨、有質感、讓人想了解產品」\n而不是強調產品療效。' },
      { type: 'image', src: '/assets/day7-jerosse-product.jpg', caption: '小綠 JERÔSSE 產品參考圖（可附上給AI參考產品外觀）' },
    ],
    submitHint: '確認已收藏包材採購連結，並簡述你打算先用哪個平台上架、目前進度到哪一步',
  },
  {
    day: 8,
    minutes: 6,
    title: '纖體班報名、官方群提問模版',
    pin: '419',
    blocks: [
      { type: 'subhead', text: '① 纖體班報名' },
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

      { type: 'imagegrid', items: [
        { src: '/assets/day8-slimclass-1.jpg', caption: '纖體班報名流程' },
        { src: '/assets/day8-slimclass-2.jpg', caption: '客製化纖體陪跑班 477期' },
        { src: '/assets/day8-slimclass-3.jpg', caption: '纖體陪伴班 第34期' },
      ]},

      { type: 'subhead', text: '② 官方群提問模版' },
      { type: 'p', text: '營養師諮詢表格，百萬小學堂記事本可直接複製。' },
      { type: 'list', items: [
        '標記8位營養師，填寫「體重管理系列」表格（性別年齡、身高體重體脂、腰圍、使用天數／方式／劑量、飲食控制、水量攝取、排便睡眠運動頻率、過去減重史、目前用藥、喝酒頻率）',
        '標記美容師 @Elaine（小嵐），填寫「養顏美容系列」或「養髮洗護系列」（頭皮髮質、法樂蓬使用狀況、頭皮屑史、染燙髮史、用藥史、居住地等）',
      ]},
    ],
    submitHint: '寫下你的纖體班報名狀況（已完成報名／預計報名日期），並附上一則你會發到官方群的提問草稿（套用上面模版格式）',
  },
  {
    day: 9,
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

      { type: 'subhead', text: 'DAY 1｜收到產品後，先陪客人開始' },
      { type: 'p', text: '今天要做的事：' },
      { type: 'p', text: '① 主動詢問：「寶寶～產品收到了嗎❤️？」' },
      { type: 'p', text: '② 確認收到後，開始教客人：' },
      { type: 'list', items: ['產品怎麼使用', '什麼時間使用', '使用上的注意事項'] },
      { type: 'p', text: '③ 開始建立瘦身／體態紀錄，可以請客人記錄：' },
      { type: 'list', items: ['體重', '體態照片', '身體感受'] },
      { type: 'p', text: '📌 重點：第一天不要只把產品丟給客人，要讓客人知道「接下來有人陪我」。' },

      { type: 'subhead', text: 'DAY 3｜分享自己的飲食方式' },
      { type: 'p', text: '目的：增加信賴感。這一天不要一直講產品，可以分享自己的日常飲食、生活方式，讓客人感覺你是真的有在陪他做體態管理。' },
      { type: 'p', text: '瘦身秘訣資訊價值：' },
      { type: 'list', items: [
        '❶ 減少垃圾食物和精緻澱粉',
        '❷ 保持補充原型食物，菜肉飯 3:2:1',
        '❸ 補充適量水分',
        '❹ 搭配簡易居家運動',
        '❺ 維持自己想瘦身的初心，每日紀錄',
        '❻ 持續觀察自己的體態變化',
        '❼ 認真補充纖體保健品',
      ]},
      { type: 'p', text: '可以這樣跟客人說：' },
      { type: 'quote', text: '「我平常自己也會這樣吃～不是完全不吃，而是盡量讓自己的飲食簡單一點、規律一點，再搭配產品一起做日常管理❤️」' },
      { type: 'p', text: '📌 重點：分享生活，不要讓客人覺得你只是在賣產品。' },

      { type: 'subhead', text: 'DAY 7｜回訪使用感受' },
      { type: 'p', text: '主動詢問：「寶寶～這幾天使用下來覺得怎麼樣？有沒有什麼感受？」如果客人回答：「還不錯耶！」可以接：' },
      { type: 'quote', text: '「太好了寶寶！！❤️\n也順便跟你分享一個瘦身觀念～\n體態管理不是幾天就能完成的事情，重點是慢慢建立飲食、運動和生活習慣，我會陪你一起觀察自己的變化。」' },
      { type: 'p', text: '📌 重點：不要只問「有沒有瘦」，而是關心客人的整體使用感受。' },

      { type: 'subhead', text: '第二個7天｜開始看紀錄、陪客人調整' },
      { type: 'p', text: '這個階段要做的事，請客人分享：' },
      { type: 'list', items: ['📸 體態照片', '📊 體重／相關數據', '💬 這段時間的身體感受'] },
      { type: 'p', text: '接著跟客人一起看：' },
      { type: 'list', items: [
        '哪裡有變化？',
        '哪裡沒有變化？',
        '飲食有沒有做到？',
        '日常生活有沒有需要調整的地方？',
        '使用產品的狀況如何？',
      ]},
      { type: 'p', text: '如果變化不明顯，不要直接讓客人覺得「沒效」。可以先說：' },
      { type: 'quote', text: '「沒關係～我們先一起看看這段時間的飲食跟生活狀況，找找看是哪個地方可以再調整，我陪你一起慢慢來❤️」' },
      { type: 'p', text: '📌 重點：讓客人感受到你不是「賣完就不管」，而是會持續陪伴。' },

      { type: 'subhead', text: 'DAY 21｜回購關心' },
      { type: 'p', text: '關心客人是否需要回購：' },
      { type: 'quote', text: '「你堅持了一個月真的超棒耶！超多人都撐不下去！如果你想要長期回購的話，我可以幫你申請更優惠的方案唷」\n（可用實際差價說明：加盟自用比單買划算，並提醒瘦身建議至少持續吃3個月）' },
    ],
    submitHint: '依「鋪陳／銷售前／銷售中／銷售後」四個階段，各寫一句你會怎麼執行的規劃',
  },
  {
    day: 10,
    minutes: null,
    title: '新人必上課程',
    pin: '204',
    blocks: [
      { type: 'p', text: '新人加入後，必須完成以下兩堂基礎課程，才能開始進行後續的產品學習與客戶服務。' },

      { type: 'subhead', text: '① 新人起步課程' },
      { type: 'p', text: '先了解基本操作、社群經營與日常分享方式，建立新手的第一步。' },

      { type: 'subhead', text: '② 產品與銷售課程' },
      { type: 'p', text: '了解產品、客戶需求與基本銷售流程，學會如何自然地與客人互動。' },

      { type: 'links', items: [
        { label: '新人起步課程', url: 'https://youtu.be/iGMEzIraLYQ' },
        { label: '產品與銷售課程', url: 'https://youtu.be/YOv5Osn0Z9Q' },
      ]},

      { type: 'quote', text: '先把基礎學會，再開始行動。\n不需要一次全部學會，照著課程一步一步做就可以。' },
    ],
    submitHint: '確認已看完以上課程，簡述你學到的重點',
  },
];

const TASKS = DAYS.map((d, index) => ({ id: `d${d.day}`, seq: index, ...d }));

function getTaskById(id) {
  return TASKS.find((t) => t.id === id);
}

module.exports = { TASKS, getTaskById };
