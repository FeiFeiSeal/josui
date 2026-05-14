/*
 * @Author:FeiFeiSeal
 * @Date:2025-03-28 17:29:51
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-04-21 16:46:50
 * @Description:
 */
import { ThemeProvider } from "@/components/theme-provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import './local/i18n'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ ThemeProvider>
  </StrictMode>
)
