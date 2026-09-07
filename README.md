# 佩柔團隊14天上手計劃

新人依序完成14天的任務，上級審核通過才解鎖下一天；每天內容還加了一組3位數PIN碼保護，PIN由上級決定何時公佈給新人。

## 快速開始

```bash
npm install
npm start
```

- 新人端：http://localhost:3000/
- 上級審核台：http://localhost:3000/review （內部使用，沒有密碼保護）

## 使用方式

**新人端**：第一次進入輸入姓名即可開始，不需要密碼，用瀏覽器記住身份。依序看到每天內容：

1. 順序鎖：前一天的回傳要先被上級核可，才會顯示這一天的「輸入PIN」畫面
2. PIN鎖：輸入當天的3位數PIN碼（跟上級索取）才會看到當天的完整內容
3. 完成後填寫回傳內容 + 「這堂課學會了什麼」，可選擇附上截圖，送出後等待審核

**審核台**：任何人都可以開啟（內部使用），畫面最上方有「每天PIN碼一覽」，方便你決定何時公佈給大家。往下可以看到每位夥伴目前做到第幾天、核可或退回每一筆待審核項目。

## 內容與PIN

每天的課程內容、3位數PIN碼定義在 `server/tasks.js`，之後要調整文字或補上第12天（目前缺漏，先自動略過不卡進度）直接修改該檔案即可。

## 專案結構

```
server/
  index.js        入口，掛載路由與靜態頁面
  db.js           JSON 檔案儲存（trainees / submissions / pinUnlocks）
  tasks.js        14天課程內容與PIN碼定義
  routes/api.js   API：tasks / trainees / pin / submissions / review
public/
  index.html/app.js     新人端
  review/               審核台
  assets/               課程用圖片
data/db.json      執行期資料（不會提交進 git）
data/uploads/     新人上傳的截圖（不會提交進 git）
```
