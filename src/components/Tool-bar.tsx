/*
 * @Author:FeiFeiSeal
 * @Date:2025-05-07 16:24:33
 * @LastEditors:Wendy
 * @LastEditTime:2026-05-19 14:23:08
 * @Description:
 */
import clsx from 'clsx'
import colorTheme from '@/lib/color-theme'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getCSSCustomPropIndex } from '@/lib/get-css-prop'
import { Check, Copy, Moon, Paintbrush, Sun } from 'lucide-react'
import { CopyDialog } from './Copy-dialog'

export const ToolBar = ({
  className,
  state,
  changeState,
  themePanelOpen = false,
  onThemePanelToggle,
}: {
  className?: string
  state: 'light' | 'dark' | 'system'
  changeState?: () => void
  themePanelOpen?: boolean
  onThemePanelToggle?: () => void
}) => {
  const [activeRadius, setActiveRadius] = useState<number>(0.75)
  const [activeTheme, setActiveTheme] = useState<string>('default')
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeout = useRef<number | null>(null)

  const changeTheme = (key: string) => {
    const theme = colorTheme.find((color) => color.key === key) ?? colorTheme[0]
    setActiveTheme(key)
    getCSSCustomPropIndex().forEach((style) => {
      if (style.selectorText === ':root') {
        for (const key of style.style) {
          if (!key.startsWith('--')) continue
          const themeKey = key.substring(2) as keyof typeof theme.light
          if (!theme?.light[themeKey]) continue
          style.style.setProperty(key, theme?.light[themeKey])
        }
      }
      if (style.selectorText === '.dark') {
        for (const key of style.style) {
          if (!key.startsWith('--')) continue
          const themeKey = key.substring(2) as keyof typeof theme.dark
          if (!theme?.dark[themeKey]) continue
          style.style.setProperty(key, theme?.dark[themeKey])
        }
      }
    })
  }

  const handleRadiusChange = (value: number) => {
    const colorRule = getCSSCustomPropIndex()
      .filter((style) => (style as CSSStyleRule).selectorText === ':root')
      .find(Boolean)
    if (colorRule && (colorRule as CSSStyleRule).style.getPropertyValue('--radius')) {
      ;(colorRule as CSSStyleRule).style.setProperty('--radius', `${value.toString()}rem`)
      setActiveRadius(value)
    } else {
      console.warn('CSS 變數 radius 不存在 ❌')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimeout.current !== null) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false)
      }, 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current !== null) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return (
    <div
      className={clsx(
        'sticky top-0 z-40 -mx-4 border-b border-foreground/15 border-dashed backdrop-blur-md',
          isScrolling
          ? 'bg-background/80'
          : '',
        className
      )}
    >
      <div
        className={clsx(
          'container relative overflow-hidden duration-150 ease-out border-x border-foreground/15 border-dashed'
        )}
      >
        <div className="relative flex justify-start overflow-x-auto p-2 py-4 lg:p-4 2xl:justify-center">
          <div className="flex shrink-0 items-center gap-2 border-r px-4 sm:px-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    onClick={onThemePanelToggle}
                    className={clsx(
                      themePanelOpen && 'ring-2 ring-primary ring-offset-2 ring-offset-transparent'
                    )}
                    aria-pressed={themePanelOpen}
                    aria-expanded={themePanelOpen}
                  >
                    <Paintbrush />
                    Create!
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{themePanelOpen ? 'Close theme editor' : 'Open theme editor'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <CopyDialog
              trigger={
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="bg-white dark:bg-black">
                        <Copy />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy Theme</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white dark:bg-black"
                    onClick={changeState}
                  >
                    {state === 'light' ? <Sun /> : <Moon />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {state === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2 border-r px-6">
            {colorTheme.map((themeItem) => (
              <Button
                key={themeItem.key}
                variant="outline"
                onClick={() => changeTheme(themeItem.key)}
                className="bg-white dark:bg-black"
              >
                <div
                  className="size-4 rounded-full"
                  style={{
                    backgroundColor: themeItem[state === 'light' ? 'light' : 'dark'].primary,
                  }}
                >
                  {themeItem.key === activeTheme ? (
                    <Check
                      size={3}
                      strokeWidth={1}
                      style={{
                        color: themeItem[state === 'light' ? 'light' : 'dark']['primary-foreground'],
                      }}
                    />
                  ) : null}
                </div>
                {themeItem.key}
              </Button>
            ))}
          </div>
          <ul className="flex justify-center gap-1 px-6">
            {Array.from({ length: 5 }, (_, index) => index * 0.25).map((value) => (
              <li key={value}>
                <Button
                  variant="outline"
                  className={`w-10 bg-white dark:bg-black ${activeRadius === value && 'ring-2 ring-foreground/20 border border-foreground/50'}`}
                  onClick={() => handleRadiusChange(value)}
                >
                  {value}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
