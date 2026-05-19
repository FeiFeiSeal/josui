/*
 * @Author:FeiFeiSeal
 * @Date:2025-04-11 15:14:00
 * @LastEditors:Wendy
 * @LastEditTime:2026-05-19 14:38:48
 * @Description:
 */


import { useState } from 'react'

import * as SampleCard from '@/components/sample/sample-card'
import { useTheme } from '@/components/theme-provider'
import { ToolBar } from '@/components/Tool-bar'
import { AdBlock } from '@/components/Ad-block'
import { ThemeColorPanel } from '@/components/Theme-color-panel'

function Home() {

  const { theme, setTheme } = useTheme()

  const [themePanelOpen, setThemePanelOpen] = useState(false)

  const handleState = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <div className='animate-fade-in bg-background/50 backdrop-blur-xs'>
      <div className="border-b border-foreground/15 border-dashed ">
        <div className='container !py-14 border-x border-foreground/15 border-dashed'>
          <h2 className="max-lg:text-center text-[4vw] sm:text-[2.8vw] lg:text-[1.3vw] lg:text-left 2xl:text-xl/12">Style shadcn UI beautifully
            <p className='font-medium'>
              <span className='max-lg:hidden lg:text-[3.5vw] 2xl:text-5xl'>— </span>
              <span className='max-lg:block lg:pr-2 text-[4vw]/12 sm:text-[2.8vw] lg:text-[3.5vw] 2xl:text-5xl'>with</span>
              <span className='font-bold text-[12.5vw] sm:text-[6vw] lg:text-[3.5vw] 2xl:text-5xl'>JOSUI</span>
            </p>
          </h2>
          <h3 className='font-light font-text-secondary-foreground text-center text-[4.3vw] sm:text-[2.8vw] lg:text-[1.8vw] lg:text-left 2xl:text-lg/10'>
            Experience real-time color previews, effortless palette tuning, and Tailwind v4/v3 exports — all in one designer-friendly playground.
          </h3>
        </div>
      </div>

      <ToolBar
        state={theme}
        changeState={handleState}
        themePanelOpen={themePanelOpen}
        onThemePanelToggle={() => setThemePanelOpen((open) => !open)}
      />

      <ThemeColorPanel
        open={themePanelOpen}
        onOpenChange={setThemePanelOpen}
        theme={theme}
      />

      <div className="relative container border-x border-foreground/15 border-dashed">
        <section className="relative flex flex-col gap-4 py-6">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 ">
            <div className="grid grid-cols-1 gap-4 xl:col-span-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 ">
                <SampleCard.ChartStackedDemo className='lg:col-span-2'/>
                <SampleCard.BarDemo className='lg:col-span-3'/>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
                <AdBlock className='sm:col-span-2 lg:col-span-1'>
                  <div className="px-4 py-1 bg-secondary rounded-sm text-xs text-secondary-foreground">✨ Feature 1</div>
                  <h2 className='text-lg text-primary-foreground font-semibold'>Visualize your tokens instantly</h2>
                  <h3 className='text-primary-foreground'>No more guessing. See how each color token actually looks on buttons, inputs, and more — right in the browser.</h3>
                </AdBlock>
                <SampleCard.CardA />
                <SampleCard.CardB />
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-1">
              <AdBlock className='sm:order-1 xl:order-0'>
                <div className="px-4 py-1 bg-secondary rounded-sm text-xs text-secondary-foreground">✨ Feature 2</div>
                <h2 className='text-lg text-primary-foreground font-semibold'>Zero config</h2>
                <h3 className='text-primary-foreground'>JOSUI is tailored to match shadcn's token structure and works seamlessly with Tailwind projects.</h3>
              </AdBlock>
              <SampleCard.CardC />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr_1fr] 2xl:grid-cols-[250px_repeat(9,1fr)]">
            <SampleCard.CalendarDemo className='auto-cols-min sm:col-span-2 lg:col-span-1 2xl:col-span-1'/>
            <AdBlock className='order-1 lg:col-span-1 2xl:order-0 2xl:col-span-4'>
              <div className="px-4 py-1 bg-secondary rounded-sm text-xs text-secondary-foreground">✨ Feature 3</div>
                <h2 className='text-lg text-primary-foreground font-semibold'>Real-time editing + export</h2>
                <h3 className='text-primary-foreground'>Tweak, preview, export. Adjust your theme live and copy the final config into your codebase with one click.</h3>
            </AdBlock>
            <SampleCard.CommandDemo className='lg:col-span-1 2xl:col-span-5'/>
          </div>
          <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-12">
            <div className="grid gap-4 sm:grid-cols-1 sm:order-1 2xl:order-0 2xl:col-span-3">
              <SampleCard.PieChartDemo className=''/>
              <SampleCard.BarDemo2 />
            </div>
            <div className="grid gap-4 lg:col-span-2 lg:grid-cols-3 2xl:col-span-5">
              <SampleCard.CardDemo className="lg:col-span-3"/>
              <div className="grid gap-4 lg:col-span-3 lg:grid-cols-3">
                <SampleCard.CardWithForm className='lg:col-span-2'/>
                <AdBlock className='lg:col-span-1'/>
              </div>
            </div>
            <div className="2xl:col-span-4">
              <SampleCard.TabsDemo />
            </div>
          </div>
        </section>
        
      </div>  
    </div>
  )
}

export default Home