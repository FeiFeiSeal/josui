/*
 * @Author:FeiFeiSeal
 * @Date:2025-05-07 16:24:33
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-15 14:38:18
 * @Description:
 */
import Color from 'colorjs.io'
import clsx from "clsx"
import colorTheme from '@/lib/color-theme'

import {
  useEffect,
  useRef,
  useState
} from 'react'

import {
  Button
} from "@/components/ui/button"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { getCSSCustomPropIndex, getColorRuleList, oklchToRgb } from '@/lib/get-css-prop'

import { Check, Copy, Moon, Paintbrush, Sun, LockKeyhole, LockOpen } from 'lucide-react'
import { CopyDialog } from './Copy-dialog'
import { ColorPicker } from './Color-picker'


export const ToolBar = (
  { state, changeState }
  :{ className?: string,
    state: 'light' | 'dark'| 'system',
    changeState?: () => void
  }) => {
    const [themeColors, setThemeColors] = useState<Array<
    {selectorText: string
      style: Map<string, string>
    }>>([]);

    const [isLock, setIsLock] = useState(false)
    const [activeRadius, setActiveRadius] = useState<number>(0.75)
    const [activeTheme, setActiveTheme] = useState<string>('default')
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const dragRef = useRef<HTMLDivElement>(null)

    const useThemeColors = () => {
      useEffect(() => {
        setThemeColors(getColorRuleList())
      }, [state]); // 空依賴陣列，確保只在組件掛載時執行與 state 切換執行
    
      return themeColors;
    };
  
    useThemeColors()

    
  const handleSelectorChange = (state: 'light' | 'dark'| 'system') => {
    const result = themeColors.find((cssStyle) => {
      if (state === 'light') {
        return (cssStyle?.selectorText === ':root')
      } else {
        return (cssStyle?.selectorText === '.dark')
      }
    })

    return result
    ? Array.from(result.style, ([key, value]) => ({ key, value }))
    : []
  }

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

  // 變更色彩並紀錄至 CSS 變數
  const handleColorChange = (
    value: string,
    key: string
  ) => {
    const colorRule = getCSSCustomPropIndex().filter((style) => {
      if (state === 'light') {
        return (style as CSSStyleRule).selectorText === ':root'
      } else {
        return (style as CSSStyleRule).selectorText === '.dark'
      }
    }).find(Boolean)

    if (colorRule && (colorRule as CSSStyleRule).style.getPropertyValue(key)) {
      (colorRule as CSSStyleRule).style.setProperty(key, value);
    } else {
      console.warn(`CSS 變數 ${key} 不存在 ❌`);
    }
  }

  // 圓角切換
  const handleRadiusChange = (value: number) => {
    const colorRule = getCSSCustomPropIndex().filter((style) => {
        return (style as CSSStyleRule).selectorText === ':root'
    }).find(Boolean)
    if (colorRule && (colorRule as CSSStyleRule).style.getPropertyValue('--radius')) {
      (colorRule as CSSStyleRule).style.setProperty('--radius', `${value.toString()}rem`)
      setActiveRadius(value)
    } else {
      console.warn(`CSS 變數 radius 不存在 ❌`);
    }
  }

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 每次滾動都設為 true
      setIsScrolling(true);

      // 清除前一個 timeout（避免重複觸發）
      if (scrollTimeout.current !== null) {
        clearTimeout(scrollTimeout.current);
      }

      // 設定延遲判斷停止滾動
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 300); // 200ms 內沒有新的 scroll，就視為停止
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current !== null) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // 拖曳相關的處理函數
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('button')) return
    setIsDragging(true)
    const startX = e.clientX - position.x
    const startY = e.clientY - position.y

    // 防止選取
    e.preventDefault()

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - startX
      const newY = e.clientY - startY
      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div 
      ref={dragRef}
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
      className={clsx(
        "max-lg:-mx-4 overflow-hidden rounded-md duration-150 ease-out border border-border sui-shadow z-50 backdrop-blur-md fixed bottom-5 shadow-ui",
        "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/70 dark:before:from-black/70 before:via-15% before:via-transparent before:pointer-events-none",
        "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-l after:from-white/70 dark:after:from-black/70 after:via-15% after:via-transparent after:pointer-events-none",
        isScrolling
          ? "bg-white/80 dark:bg-black/80"
          : "bg-white/100 dark:bg-black/100"
      )}
    >
      <div className="p-2 py-6 lg:p-6 overflow-x-scroll  flex justify-start 2xl:justify-center">
        <div className="flex items-center gap-2 px-6 border-r max-sm:hidden">
          <Popover open={isLock ? true : undefined}>
            <TooltipProvider>
              <Tooltip>
                <PopoverTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button variant="default" onClick={() => setIsLock(false)}>
                      <Paintbrush />Create!
                    </Button>
                  </TooltipTrigger>
                </PopoverTrigger>
                <TooltipContent>
                  <p>Customize Theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <PopoverContent
              onInteractOutside={(e) => isLock? e.preventDefault(): undefined}
              className='bg-white/80 dark:bg-black/80 backdrop-blur-md border-border rounded-md shadow-lg p-0'
            >
              <div className=" rounded-md overflow-hidden">
                <p className='flex p-5 border-b'>
                  Customize Theme
                  <span className="ml-auto cursor-pointer" onClick={() => setIsLock(!isLock)}>
                    {isLock ? <LockKeyhole size={20} /> : <LockOpen size={20}/>}
                  </span>
                </p>
                <ul className='flex flex-col max-h-[calc(100vh/1.5)] overflow-x-hidden overflow-y-scroll'>
                  { handleSelectorChange(state).map((color) => {
                    if (color.key === '--radius') return null
                    return ( 
                    <li
                      key={`${color.key}-${state}`}
                      className='flex gap-2 items-center px-6 py-2 duration-100 hover:font-semibold'
                    >
                      <ColorPicker
                        value={color.value}
                        onChange={(value) => handleColorChange(value, color.key)}
                      >
                        <span className='text-md align-center' >{color.key.substring(2)}</span>
                      </ColorPicker>
                    </li>
                    )})
                  }
                </ul>
              </div>
            </PopoverContent>
          </Popover>
          <div className='flex items-center'>
            <CopyDialog
              trigger={
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className='bg-white dark:bg-black'>< Copy/></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy Theme</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className='bg-white dark:bg-black' onClick={changeState}>
                  { state==='light'? < Sun/> : < Moon/> }
                </Button>
              </TooltipTrigger>
              <TooltipContent>
              { state==='light'? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* mobile */}
        <div className="flex items-center gap-2 px-6 border-r sm:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="default" onClick={() => setIsLock(false)}>
              <Paintbrush />Create!
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Customize Theme</DrawerTitle>
              <DrawerDescription className='flex justify-center gap-2 my-4'>
              <CopyDialog
                trigger={
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className='bg-white dark:bg-black'>< Copy/></Button>
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
                    <Button variant="outline" size="icon" className='bg-white dark:bg-black' onClick={changeState}>
                      { state==='light'? < Sun/> : < Moon/> }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                  { state==='light'? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              </DrawerDescription>
            </DrawerHeader>
            <div className=" rounded-md overflow-hidden">
              <ul className='flex flex-col max-h-[calc(100vh/1.5)] overflow-x-hidden overflow-y-scroll pb-16'>
                { handleSelectorChange(state).map((color) => {
                  if (color.key === '--radius') return null
                  return ( 
                  <li
                    key={`${color.key}-${state}`}
                    className='flex gap-2 items-center px-6 py-2 duration-100 hover:font-semibold'
                  >
                    <ColorPicker
                      value={color.value}
                      onChange={(value) => handleColorChange(value, color.key)}
                    >
                      <span className='text-md align-center' >{color.key.substring(2)}</span>
                    </ColorPicker>
                  </li>
                  )})
                }
              </ul>
            </div>
          </DrawerContent>
        </Drawer>
        </div>
        <div className="flex items-center gap-2 px-6 border-r">
          {/* <Button variant="outline"  onClick={changeTheme} className='bg-white dark:bg-black'>
            <div className=" size-4 rounded-full bg-primary">
              <Check className='text-primary-foreground' size={6} strokeWidth={2} />
            </div>
            Default
          </Button> */}
          {
            colorTheme.map((theme) => {
              return (
              <Button key={theme.key} variant="outline"  onClick={() => changeTheme(theme.key)} className='bg-white dark:bg-black'>
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: theme[state === 'light' ? 'light' : 'dark'].primary }}
                >
                  { theme.key === activeTheme
                  ? <Check size={3} strokeWidth={1} style={{color: theme[state === 'light' ? 'light' : 'dark']['primary-foreground']}} />
                  : null
                }
                </div>
                {theme.key}
              </Button>
              )
            })          
          }
        </div>
        <ul className='flex justify-center gap-1 px-6'>
          {Array.from({ length: 5 }, (_, index) => index * 0.25).map((value) => (
            <li key={value}>
              <Button
                variant="outline"
                className={`w-10 bg-white dark:bg-black ${(activeRadius === value) && 'ring-2 ring-foreground/20 border border-foreground/50'}`}
                onClick={() => handleRadiusChange(value)}
              >
                {value}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}