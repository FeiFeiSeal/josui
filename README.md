# JOSUI Official Website

JOSUI 是一個為 shadcn/ui 與 Tailwind CSS 設計的主題色彩 Playground，讓設計師與前端工程師可以即時調整 UI token、預覽元件效果，並快速複製色彩設定到專案中。

此專案以 React、TypeScript、Vite 與 Tailwind CSS v4 建構，重點放在互動式主題編輯、即時 UI 預覽、響應式介面與可維護的元件架構。

## Demo

Website: https://josui.space/

## Project Highlights

- 建立可即時互動的主題色彩編輯器，支援 CSS variables 動態更新
- 整合 shadcn/ui 風格元件，展示 Button、Card、Chart、Calendar、Tabs、Command 等 UI 狀態
- 支援 Light / Dark theme，方便預覽不同主題下的視覺一致性
- 實作色彩選擇器，支援 HEX、RGB、HSL 顯示與複製
- 使用 React Router 建立首頁與隱私權頁面路由
- 採用 Tailwind CSS v4 與 Radix UI 建構一致、可擴充的 UI 系統
- 注重響應式排版，在桌機與行動裝置上維持良好瀏覽體驗

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Radix UI
- React Router
- i18next
- colorjs.io
- react-colorful
- Recharts

### Theme Playground

使用者可以在網站中即時查看不同 UI 元件的主題色彩呈現，降低在設計與開發之間反覆調整 token 的成本。

### Color Token Editor

透過側邊色票面板讀取目前頁面中的 CSS custom properties，並可即時修改對應色彩，讓調整結果立即反映在畫面上。

### Color Format Support

內建色彩選擇器支援 HEX、RGB、HSL 格式檢視，並提供一鍵複製，方便設計或開發流程使用。

### Responsive UI

首頁以 Grid 與 Tailwind utilities 建構多區塊展示版面，讓 UI preview 在不同螢幕尺寸下都能維持良好閱讀性。

## Getting Started

### Requirements

```bash
node >= 22.12.0