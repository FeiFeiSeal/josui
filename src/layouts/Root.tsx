
/*
 * @Author:FeiFeiSeal
 * @Date:2025-04-11 15:14:00
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-15 15:36:27
 * @Description:
 */

import { useLocation } from "react-router-dom";

import logoB from '@/assets/josui-logo-b.svg'
import logoW from '@/assets/josui-logo-w.svg'
import { Link, Outlet } from "react-router-dom"
import BgStarGroup from '@/components/Bg-star-group'
// import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle
// } from '@/components/ui/navigation-menu'

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'

import {
  Facebook,
  Instagram,
  X,
} from 'lucide-react'

import { useEffect } from "react"

import { useTheme } from '@/components/theme-provider'

import { Toaster } from '@/components/ui/sonner'

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      // 給首頁一點時間讓內容 render 完
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100); // 視情況可調成 200ms
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}


function Root() {
  // const { t, i18n } = useTranslation()
  const { theme } = useTheme()

  return (
    <>
      <ScrollToTop />
      <div className="fixed w-full inset-0 -z-10 pointer-events-none">
        <BgStarGroup className='max-w-[1850px] mx-auto ' />
      </div>
      <header className='absolute z-20 bg-background/5 backdrop-blur-xs w-full border-b border-foreground/15 border-dashed'>
        <div className='container flex flex-between items-center border-x border-foreground/15 border-dashed'>
          <Link to="/" className='cursor-pointer flex gap-2 items-end'>
            { theme === 'light'
              ? <img src={logoB} alt="logo" className='size-8 object-cover' />
              : <img src={logoW} alt="logo" className='size-8 object-cover' />
            }
            <h1 className='text-foreground font-bold'>JOSUI</h1>
          </Link>
          {/* <NavigationMenu className='max-sm:hidden  px-4  border-x border-foreground/15 border-dashed'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Playground
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  更多設計
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>  
          <div className='flex items-center gap-2 ml-auto'>
            <Button variant='ghost' size='icon'>
              <Globe/>
            </Button>
            <Popover>
              <PopoverTrigger>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <ul>
                  <li>
                    <Button variant='ghost' className='w-full'>Profile</Button>
                  </li>
                  <li>
                    <Button variant='ghost' className='w-full'>Your Template</Button>
                  </li>
                  <li>
                    <Button variant='ghost' className='w-full'>Sign Out</Button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>*/}
        </div>
        {/* <NavigationMenu className='sm:hidden mx-auto'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Playground
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                更多設計
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
      </header>
      
      <main className='relative z-10 !pt-16'>
        <Outlet />
      </main>
      <footer className='text-foreground border-t border-foreground/15 border-dashed bg-background/5 backdrop-blur-xs'>
        <div className='container flex max-lg:flex-col items-center justify-between'>
          <div className="w-1/2 flex max-lg:flex-col items-center gap-2">
            <div className="flex gap-4 max-sm:flex-col items-center ">
              <ul className='flex'>
                <li>
                  <Button variant='ghost' size='icon'>
                    <a href="https://www.facebook.com/61574807189436/" target='_blank' aria-label="Visit our Facebook profile">
                        <Facebook />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button variant='ghost' size='icon'>
                    <a href="https://x.com/josui_design" target="_blank" aria-label="Visit our X profile">
                        <X />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button variant='ghost' size='icon'>
                    <a href="https://www.instagram.com/josui.design/"  target='_blank' aria-label="Visit our Instagram profile">
                        <Instagram />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button variant='ghost' size='icon' className='group'>
                    <a href="https://www.threads.net/@josui.design"  target='_blank' aria-label="Visit our threads profile">
                      <svg className='w-4 h-4 fill-foreground group-hover:fill-accent-foreground' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z"/></svg>
                    </a>
                  </Button>
                </li>
              </ul>
              <div className="flex max-sm:flex-col gap-4 text-sm items-center">
                <a className="hover:underline whitespace-nowrap" href="mailto:contact@josui.design" target="_blank" rel="noopener noreferrer">
                  Contact Us
                </a>
                <Link className="hover:underline whitespace-nowrap" to="/privacy">
                  {'Privacy Policy'}
                </Link>
              </div>
            </div>
            <Link to="/" className='max-lg:mx-auto my-4 size-6 lg:ml-auto lg:translate-x-1/2'>
              { theme === 'light'
                ? <img src={logoB} alt="logo" className='object-cover' />
                : <img src={logoW} alt="logo" className='object-cover' />
              }
              <p className='text-primary sr-only'>JOSUI</p>
            </Link>
          </div>
          <p className='text-secondary-foreground/50 text-sm/8'>Powered by josui.design</p>
          
        </div>
      </footer>
      <Toaster />
    </>
  )
}

export default Root