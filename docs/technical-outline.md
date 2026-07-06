# JOSUI 技術文件大綱

> 對象：前端開發者、技術審查者  
> 用途：作為完整技術文件的目錄骨架，可依章節逐步擴寫

---

## 1. 系統概覽

### 1.1 專案簡介

- 產品定位：shadcn/ui + Tailwind CSS 即時主題 Playground
- 架構類型：純前端 CSR SPA，無後端
- 線上環境：https://josui.space/
- Repo 版本：v1.0.21

### 1.2 系統架構圖

- 整體分層：Entry → Router → Layout → Pages → Features → UI Primitives → Lib
- 主題引擎：CSSOM 讀寫流程圖
- 狀態分層：Context（theme）/ local state（UI）/ DOM（colors）

### 1.3 技術選型決策紀錄（ADR 摘要）

| 決策 | 選擇 | 替代方案 | 理由 |
|------|------|----------|------|
| 主題狀態存放 | CSSOM (CSS variables) | React state / Zustand | 零 re-render、與 Tailwind 原生整合 |
| UI 元件庫 | shadcn/ui + Radix | MUI / Chakra | 可複製、可客製、社群生態 |
| 建置工具 | Vite 6 | Webpack / Next.js | 輕量 SPA、快速 HMR |
| 樣式方案 | Tailwind CSS v4 | CSS Modules / Styled Components | shadcn 生態標準 |
| 狀態管理 | Context + local state | Redux / Zustand | 規模小、無複雜全域狀態 |

---

## 2. 環境與開發設定

### 2.1 環境需求

- Node.js >= 22.12.0
- npm（隨 Node 附帶）

### 2.2 專案初始化

```bash
git clone <repo-url>
cd official-website
npm install
npm run dev
```

### 2.3 目錄結構說明

```
src/
├── main.tsx              # 入口
├── App.tsx               # Router
├── App.css               # Design tokens + Tailwind
├── layouts/              # 全站 layout
├── pages/                # 路由頁面
├── components/           # Feature + UI 元件
│   ├── ui/               # shadcn primitives (23 個)
│   └── sample/           # Demo 展示
├── lib/                  # 工具函式 + 靜態資料
└── local/                # i18n 設定
```

### 2.4 路徑別名

- `@/` → `src/`（定義於 `vite.config.ts` 和 `tsconfig.app.json`）

### 2.5 程式碼品質工具

| 工具 | 設定檔 | 指令 |
|------|--------|------|
| ESLint 9 | `eslint.config.js` | `npm run lint` |
| Prettier | `.prettierrc.js` | — |
| Stylelint | `.stylelintrc.js` | — |
| TypeScript | `tsconfig.app.json` (strict) | `tsc -b` |

---

## 3. 路由與頁面

### 3.1 路由表

| Path | Component | Layout | 說明 |
|------|-----------|--------|------|
| `/` | `Home` | `Root` | 主 Playground |
| `/privacy` | `Privacy` | `Root` | 隱私權政策 |
| `*` | `Error` | — | 404（errorElement） |

### 3.2 Layout 結構

- `Root.tsx`：Header + `<Outlet />` + Footer + Toaster + ScrollToTop
- 背景：`BgStarGroup` 固定定位裝飾

### 3.3 頁面職責

- **Home**：orchestrator，管理 `themePanelOpen` 和 `activeThemeKey`
- **Privacy**：靜態法律內容（694 行 JSX）
- **Error**：404 + WavyCanvas 動畫

---

## 4. 核心模組技術規格

### 4.1 主題引擎 — `src/lib/get-css-prop.ts`

**職責：** 讀寫 CSSOM 中的 `:root` / `.dark` CSS variables

**公開 API：**

| 函式 | 輸入 | 輸出 | 說明 |
|------|------|------|------|
| `isSameDomain()` | CSSStyleSheet | boolean | 過濾跨域 stylesheet |
| `getCSSCustomPropIndex()` | — | CSSStyleRule[] | 取得 :root/.dark rules |
| `getColorRuleList()` | — | `{selectorText, style: Map}[]` | 色票面板用 |
| `getColorRule()` | — | `{':root': {}, '.dark': {}}` | 匯出用 |
| `oklchToRgb()` | OKLCH string | `{hex, alpha}` | 色彩轉換 |
| `oklchToHSL()` | OKLCH string | HSL string | 匯出轉換 |

**安全考量：**

- 跨域 stylesheet 存取 `cssRules` 會拋 `SecurityError`，必須 `filter(isSameDomain)`

**待處理：**

- L84 TODO：透明度處理

### 4.2 Preset 主題 — `src/lib/color-theme.ts`

- 8 組主題：default, red, rose, orange, green, blue, yellow, violet
- 每組含 `light` / `dark` token map
- 格式：HSLA / OKLCH 字串

### 4.3 主題工具列 — `src/components/Tool-bar.tsx`

**Props：**

```typescript
{
  state: 'light' | 'dark' | 'system'
  changeState?: () => void
  themePanelOpen?: boolean
  onThemePanelToggle?: () => void
  activeTheme?: string
  onThemeChange?: (key: string) => void
}
```

**行為：**

- `changeTheme(key)` → 遍歷 CSSOM 寫入 preset token
- `handleRadiusChange(value)` → 修改 `--radius`
- Scroll debounce 300ms → sticky backdrop

### 4.4 色票側欄 — `src/components/Theme-color-panel.tsx`

**動畫生命週期：**

```
open=true  → setMounted(true) → double rAF → setVisible(true)
open=false → setVisible(false) → 300ms timeout → setMounted(false)
```

**無障礙：**

- `role="dialog"` + `aria-modal`
- Escape key handler
- Mobile body scroll lock

### 4.5 色彩選擇器 — `src/components/Color-picker.tsx`

- 色彩空間：內部 Color 物件（colorjs.io），顯示 HEX/RGB/HSL
- Alpha：自訂 Slider + gradient track
- 複製：Clipboard API + Sonner toast
- 未完成：OKLCH Tab（註解中）

### 4.6 主題匯出 — `src/components/Copy-dialog.tsx`

**匯出格式差異：**

| | Tailwind v4 | Tailwind v3 |
|--|-------------|-------------|
| 語法 | `hsla(H S% L% / A)` | `H S% L%` (space-separated) |
| 包裹 | 直接 `:root` / `.dark` | `@layer base { ... }` |
| Token | 完整 | strip `--sidebar-*` |

**Analytics：** `window.rybbit.event('rybbit-copy-event', {version})`

### 4.7 深淺色 — `src/components/theme-provider.tsx`

- Context：`theme` + `setTheme`
- 持久化：localStorage (`vite-ui-theme`)
- DOM 操作：`<html>` classList 切換 `.dark`

### 4.8 Design Tokens — `src/App.css`

- `@import "tailwindcss"` + typography plugin
- `@custom-variant dark (&:is(.dark *))`
- `:root` / `.dark` 完整 shadcn token 集
- `@theme inline` 映射到 Tailwind utilities
- 自訂動畫：twinkle、fade-in

---

## 5. UI 元件層

### 5.1 shadcn/ui 設定

- 設定檔：`components.json`
- Style：new-york
- Base color：slate
- CSS variables：enabled
- Icons：lucide-react

### 5.2 元件清單（23 個）

`avatar`, `badge`, `button`, `calendar`, `card`, `chart`, `color-slider`, `command`, `dialog`, `drawer`, `input`, `label`, `navigation-menu`, `popover`, `radio-group`, `select`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `tooltip`

### 5.3 元件模式

- **CVA**：`button.tsx` — variant/size API
- **Compound Component**：`chart.tsx` — ChartContext + useChart()
- **Slot / asChild**：Radix composition pattern
- **forwardRef**：`slider.tsx` — 擴充 trackClassName/thumbStyle

### 5.4 Demo 展示 — `sample-card.tsx`

- Namespace export：15+ demo 函式
- 靜態資料：chart arrays、form fields
- 最大檔案（~881 行）

---

## 6. 建置與部署

### 6.1 Vite 設定重點

```typescript
// vite.config.ts
plugins: [react(), tailwindcss()]
server: { host: true, port: 3000 }
resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
build: { rollupOptions: { output: { manualChunks: { vendor: ['react', 'react-dom'] } } } } }
```

### 6.2 Build 流程

```
tsc -b  →  型別檢查
vite build  →  輸出 dist/
```

### 6.3 Release 流程

```
npm run react:release
  → tsc -b && vite build
  → release-merge.sh
    → npm version patch
    → commit + tag
    → merge main → release
    → git push --all --tags
```

### 6.4 靜態資源

- `public/robots.txt` — 爬蟲規則
- `public/sitemap.xml` — `/` + `/privacy`
- `public/ads.txt` — AdSense

---

## 7. 第三方整合

### 7.1 Analytics

| 服務 | ID / 設定 | 觸發時機 |
|------|-----------|----------|
| Google Analytics | G-5FQCLYTTWX | 頁面瀏覽（index.html） |
| Rybbit | `window.rybbit.event` | 主題複製（Copy-dialog） |

### 7.2 字型

- Inter（拉丁）
- Noto Sans TC（中文，`:lang(zh*)` 套用）

### 7.3 外部資源

- Google Fonts CDN
- randomuser.me（demo 頭像，部分 ID 可能無效）

---

## 8. 國際化（未啟用）

### 8.1 現況

- `src/local/i18n.ts` — 已 init，預設 `tw`
- `src/local/resource.ts` — 僅 `zh-TW.json`，內容為舊專案殘留
- `Root.tsx` — `useTranslation` 被註解

### 8.2 啟用步驟（待實作）

1. 更新 resource 內容為 JOSUI UI 文案
2. 取消 Root.tsx 註解
3. 將 Home / ToolBar 硬編碼字串改為 `t()` 呼叫
4. 加入語言切換 UI（Globe 按鈕已註解）

---

## 9. 錯誤處理

| 層級 | 機制 | 覆蓋範圍 |
|------|------|----------|
| Router | `errorElement` → Error.tsx | 路由級錯誤 |
| Color utils | try/catch → return null | 無效 OKLCH |
| Clipboard | try/catch → console.error | 複製失敗 |
| ColorPicker | try/catch → console.error | 無效色值 |

**缺失：**

- 無 React ErrorBoundary
- Error 頁未使用 `useRouteError()`
- `window.rybbit` 無 optional guard

---

## 10. 效能

| 優化 | 實作 | 效果 |
|------|------|------|
| Vendor chunk | Vite manualChunks | react 獨立打包 |
| CSSOM 主題 | 不觸發 re-render | 改色零延遲 |
| Portal 側欄 | render 到 body | 避免 layout reflow |
| Scroll debounce | 300ms | 減少 handler 觸發 |

**未做：**

- `React.lazy` / code splitting（bundle 尚小）
- Service Worker / PWA
- Image optimization pipeline

---

## 11. 無障礙（a11y）

- Radix primitives：focus trap、keyboard nav
- `aria-label`：社交連結
- `aria-pressed` / `aria-expanded`：Create 按鈕
- `role="dialog"` + `aria-modal`：色票面板
- `sr-only`：螢幕閱讀器文字
- `focus-visible:ring-*`：shadcn 預設

---

## 12. 測試策略（規劃中）

### 12.1 建議測試分層

| 層級 | 目標 | 工具 |
|------|------|------|
| Unit | `get-css-prop.ts` 轉換邏輯 | Vitest |
| Unit | `color-theme.ts` preset 完整性 | Vitest |
| Integration | Copy-dialog 匯出字串 | Vitest + jsdom |
| E2E | 改色 → 匯出流程 | Playwright |

### 12.2 優先測試案例

1. `oklchToHSL()` — 已知輸入/輸出
2. `getColorRule()` — mock document.styleSheets
3. v3 vs v4 匯出格式差異
4. `isSameDomain()` — 同源/跨域 stylesheet

---

## 13. 已知技術債

詳見 [待辦清單](./todo.md)。

---

## 14. 附錄

### A. 環境變數

- `.env.development` / `.env.production` — 定義 `VITE_ENV_DISPLAY`（src 中未引用）

### B. shadcn 新增元件

```bash
npx shadcn@latest add <component>
```

### C. 相關文件

- [專案分析](./project-analysis.md)
- [專案摘要（非技術）](./project-summary.md)
- [待辦清單](./todo.md)
