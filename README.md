# Hahow Frontend Engineer 徵才小專案

## 我們該如何執行完成的 package

```bash
yarn
yarn build
yarn start
```

## 專案的架構、Web 的架構邏輯

`/src/pages` 分別是 HeroList 與 HeroProfile ，  
對應 `/heroes` 與 `/heroes/:heroId` ， ajax 資料的邏輯皆在此處理。

`/src/components` 為所有的 components ，僅專住在呈現資料，額外包含 skeleton loading 樣式。

## 你對於所有使用到的第三方 library 的理解，以及他們的功能簡介

- axios
  - 處理 ajax 的 library 。
  - 瀏覽器支援度很高。
  - promise 的形狀， code 簡潔好維護。
  - 社群龐大，有大量的文件、範例、教學。
- react-router-dom
  - 處理 router 的 library 。
  - 支援 react hooks 、 TypeScript 。
  - 社群龐大，有大量的文件、範例、教學。
- styled-components
  - CSS in JavaScript 。
  - 支援 TypeScript 。
- serve
  - serve 靜態檔案。

## 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解

清楚的程式碼應該從命名就能清楚的了解意圖，  
除非有隱藏的 bug ，或是未完成的功能、優化，我才會選擇寫註解。

## 在這份專案中你遇到的困難、問題，以及解決的方法

我發現 `Single Hero` 的 API 有時候會出現 Backend error ，  
但我並沒有用到這支 API，我想先列入 issues 之後再處理即可。

其餘沒有什麼特別的困難，  
針對 `Hero 能力值不能為零` 、 `送出的能力值總和必須與拿到的時候相同` ，  
在儲存按鈕的邏輯做了比較複雜的處理。

額外做了 skeleton loading ，覺得很美的，  
以及在 mobile 時，選擇 Hero 會自動下滑至 Hero Profile 。
