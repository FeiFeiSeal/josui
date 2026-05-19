/*
 * @Description: 左側滑入色票面板（由 Create 開關控制，覆蓋主內容）
 */
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/Color-picker'
import { getCSSCustomPropIndex, getColorRuleList } from '@/lib/get-css-prop'

const PANEL_TRANSITION_MS = 300

type ThemeMode = 'light' | 'dark' | 'system'

function getEffectiveTheme(theme: ThemeMode): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

export type ThemeColorPanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  theme: ThemeMode
}

export function ThemeColorPanel({ open, onOpenChange, theme }: ThemeColorPanelProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [themeColors, setThemeColors] = useState<
    Array<{ selectorText: string; style: Map<string, string> }>
  >([])

  const effectiveTheme = getEffectiveTheme(theme)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(frame)
    }

    setVisible(false)
    const timer = window.setTimeout(() => setMounted(false), PANEL_TRANSITION_MS)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (open) setThemeColors(getColorRuleList())
  }, [theme, open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open || !window.matchMedia('(max-width: 1023px)').matches) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const colorEntries = (() => {
    const result = themeColors.find((cssStyle) =>
      effectiveTheme === 'light'
        ? cssStyle.selectorText === ':root'
        : cssStyle.selectorText === '.dark'
    )
    return result ? Array.from(result.style, ([key, value]) => ({ key, value })) : []
  })()

  const handleColorChange = (value: string, key: string) => {
    const colorRule = getCSSCustomPropIndex()
      .filter((style) =>
        effectiveTheme === 'light'
          ? (style as CSSStyleRule).selectorText === ':root'
          : (style as CSSStyleRule).selectorText === '.dark'
      )
      .find(Boolean)

    if (colorRule && (colorRule as CSSStyleRule).style.getPropertyValue(key)) {
      ;(colorRule as CSSStyleRule).style.setProperty(key, value)
      setThemeColors(getColorRuleList())
    } else {
      console.warn(`CSS 變數 ${key} 不存在 ❌`)
    }
  }

  if (!mounted) return null

  return createPortal(
    <>
      <button
        type="button"
        aria-label="關閉色票面板"
        className={clsx(
          'fixed inset-0 top-0 z-40 bg-black/40 transition-opacity duration-300 ease-out lg:hidden',
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => onOpenChange(false)}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Theme color editor"
        className={clsx(
          'fixed left-0 top-0 bottom-0 z-50 flex w-[min(100vw-1rem,280px)] flex-col',
          'border-r border-foreground/15 border-dashed bg-background/95 shadow-lg backdrop-blur-md',
          'transition-transform duration-300 ease-out',
          visible ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex shrink-0 items-center gap-1 border-b border-foreground/15 border-dashed px-2 py-2">
          <p className="min-w-0 flex-1 truncate px-1 text-sm font-medium">Customize Theme</p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={() => onOpenChange(false)}
            aria-label="關閉色票面板"
          >
            <X className="size-4" />
          </Button>
        </div>

        <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden py-2">
          {colorEntries.map((color) => (
            <li
              key={`${color.key}-${effectiveTheme}`}
              className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-muted/50"
            >
              <ColorPicker
                value={color.value}
                onChange={(value) => handleColorChange(value, color.key)}
                popoverSide="right"
              >
                <span className="truncate text-foreground/90">{color.key.substring(2)}</span>
              </ColorPicker>
            </li>
          ))}
        </ul>
      </aside>
    </>,
    document.body
  )
}
