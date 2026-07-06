# JOSUI 待辦清單

> 依優先級排序 · 最後更新：2026-07-05  
> 來源：程式碼審查 + `.note.md` + 架構分析

---

## 優先級說明

| 等級 | 意義 | 時間框架 |
|------|------|----------|
| **P0** | 阻塞核心體驗或面試/上線品質 | 立即 |
| **P1** | 顯著影響品質或專業度 | 1–2 週 |
| **P2** | 工程成熟度提升 | 2–4 週 |
| **P3** | 產品功能擴充 | 1–3 個月 |
| **P4** | 長期演進 | 3–6 個月 |

---

## P0 — 立即處理

- [ ] **核心流程端到端驗證**
  - 手動走一遍：改色 → 頁面預覽 → Copy Theme 匯出
  - 將匯出的 v3 / v4 CSS 貼入全新 shadcn 專案，確認可用
  - 負責檔案：`Tool-bar.tsx`、`Theme-color-panel.tsx`、`Copy-dialog.tsx`

- [ ] **OKLCH Tab 決策**
  - `Color-picker.tsx` 內 OKLCH 分頁 UI 目前被註解
  - 選項 A：補齊 OKLCH Tab（與 shadcn v4 方向一致）
  - 選項 B：刪除大段註解程式碼，避免程式像半成品
  - 建議：面試/上線前至少做 B，有餘力再做 A

---

## P1 — 程式碼整潔與一致性

- [ ] **清理 `Tool-bar.tsx` 註解**
  - 約 L169+ 註解掉的 Default 重置按鈕 — 復用或刪除

- [ ] **清理 `Home.tsx` / `Root.tsx` i18n 註解**
  - `react-i18next` 的 `useTranslation` 被註解
  - 決策：短期移除無用 import 與註解；或啟用 i18n（見 P3）

- [ ] **清理 `Color-picker.tsx` 大段註解**
  - L147–190 等 OKLCH 相關註解 — 與 P0 OKLCH Tab 決策一併處理

- [ ] **統一網域設定**
  - README 寫 `josui.space`，SEO meta / canonical 寫 `josui.design`
  - 統一為實際上線網域，更新 `index.html`、`public/sitemap.xml`、`robots.txt`

- [ ] **README 補強**
  - 說清專案解決什麼問題、目標使用者
  - 補上完整 Tech Stack 與架構簡述
  - 確認本地執行步驟（Node 版本等）

---

## P2 — 工程成熟度

- [ ] **單元測試：色彩轉換核心**
  - 引入 Vitest
  - 測試 `oklchToHSL()`、`oklchToRgb()` 已知輸入/輸出
  - 測試 `isSameDomain()` 同源/跨域判斷
  - 檔案：`src/lib/get-css-prop.ts`

- [ ] **單元測試：匯出字串組裝**
  - 測試 v3 vs v4 格式差異
  - mock `document.styleSheets`
  - 檔案：`src/components/Copy-dialog.tsx`

- [ ] **GitHub Actions CI**
  - workflow：`lint` + `tsc -b` + `vite build`
  - README 加入 CI badge

- [ ] **ErrorBoundary**
  - 在 `main.tsx` 或 `Root.tsx` 包一層 global ErrorBoundary
  - 提供 fallback UI

- [ ] **`useRouteError()` 改善 Error 頁**
  - 區分 404 vs runtime error
  - 檔案：`src/pages/Error.tsx`

- [ ] **`window.rybbit` optional guard**
  - `Copy-dialog.tsx` 中 `window.rybbit?.event()` 避免腳本缺失時 throw

- [ ] **OKLCH 透明度處理**
  - `get-css-prop.ts` L84 TODO：處理透明度轉換

---

## P3 — 產品功能擴充

- [ ] **啟用 i18n 多語系**
  - 更新 `src/local/resource.ts` 為 JOSUI UI 文案
  - 取消 `Root.tsx` 的 `useTranslation` 註解
  - 實作 Globe 語言切換按鈕
  - 支援 zh-TW + en

- [ ] **主題 URL 分享**
  - 將目前 CSS variables encode 到 URL hash
  - 打開連結即可還原主題
  - 不需後端

- [ ] **主題 localStorage 暫存**
  - 刷新頁面後還原上次調整（不只 dark/light 偏好）
  - 可選「重置為預設」按鈕

- [ ] **a11y 強化**
  - 鍵盤可操作 Toolbar / Popover / Drawer 全流程
  - audit 補充缺少的 `aria-*`

- [ ] **sample-card 外部資源修復**
  - `randomuser.me` 無效 portrait ID（如 `men/7-5.jpg`）
  - 改用有效 ID 或穩定佔位圖

- [ ] **Color-picker HEX 快速色板去重**
  - `map` 內重複 hex 精簡

---

## P4 — 長期演進

- [ ] **啟用 Header 導航**
  - Pricing / Playground / 更多設計 頁面規劃與實作
  - 取消 `Root.tsx` 導航註解

- [ ] **使用者帳號系統**
  - 需後端（主題雲端儲存、歷史紀錄）
  - Avatar / Profile / Sign Out UI 已 scaffold

- [ ] **社群 preset 投稿**
  - 使用者分享自訂主題
  - 需後端或靜態 CMS

- [ ] **Design Token 文件自動生成**
  - 從目前主題產出 Markdown / JSON token 文件

- [ ] **React.lazy 按需載入**
  - lazy load `sample-card` 等大型 demo 模組
  - 減少首屏 bundle

- [ ] **CHANGELOG / Release Notes**
  - 版本與使用者可見變更紀錄

- [ ] **Lighthouse 效能優化**
  - 量測並優化 Core Web Vitals
  - README 可選加入分數截圖

- [ ] **PWA / Service Worker**
  - 離線基本瀏覽（低優先）

---

## 已完成 ✅

- [x] HEX 色盤 crosshair 位置修復（`Color-picker.tsx`）
- [x] RGBA / HSLA Slider 色彩空間修復（`Color-picker.tsx`）
- [x] `public/robots.txt` 加入 ClaudeBot / anthropic-ai
- [x] 專案分析文件（`docs/project-analysis.md`）
- [x] 技術文件大綱（`docs/technical-outline.md`）
- [x] 非技術專案摘要（`docs/project-summary.md`）

---

## 建議執行順序（Sprint 規劃）

### Sprint 1（本週）— 穩定核心

```
P0 核心流程驗證 → P0 OKLCH Tab 決策 → P1 清理註解
```

### Sprint 2（下週）— 專業形象

```
P1 統一網域 → P1 README 補強 → P2 CI 導入
```

### Sprint 3（第三週）— 品質保障

```
P2 單元測試 → P2 ErrorBoundary → P2 rybbit guard
```

### Sprint 4+（之後）— 功能成長

```
P3 i18n → P3 主題分享 → P3 a11y → P4 導航頁面
```

---

*此清單應隨開發進度更新。建議每完成一項即勾選，並在 PR 中引用對應 todo 編號。*
