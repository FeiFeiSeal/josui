/*
 * @Author:FeiFeiSeal
 * @Date:2025-04-05 22:01:18
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-29 15:47:31
 * @Description:
 */
import CodeBlock from "@/components/Code-block";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getColorRule, oklchToHSL } from "@/lib/get-css-prop";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { ReactElement, useState } from "react";
import { toast } from "sonner";

// Extend the Window interface to include 'rybbit'
declare global {
  interface Window {
    rybbit: {
      event: (eventName: string, data: any) => void;
    };
  }
}

interface CodeDialogProps {
  trigger: ReactElement
}

export function CopyDialog({ trigger }: CodeDialogProps) {
  const [v4cssRule, setV4CssRule] = useState('')
  const [v3cssRule, setV3CssRule] = useState('')
  const [copied, setCopied] = useState(false)
  const [tabs, setTabs] = useState('v4')

  const cssRule: {
    ":root": {
        [key: string]: string;
    };
    ".dark": {
        [key: string]: string;
    };
  } = getColorRule()
  /** 複製到剪貼簿 */
  const copyToClipboard = async () => {
    /** 發送 rybbit event */
    window.rybbit.event('rybbit-copy-event', {
      version: tabs
    })
    try {
      await navigator.clipboard.writeText(tabs === 'v4'? v4cssRule : v3cssRule)
      setCopied(true)
      toast('Copied successfully')
      setTimeout(() => {
        setCopied(false)
      }, 2000)

    } catch (err) {
      console.error("複製失敗:", err);
    }
  }

  /** 獲取複製面板顏色 */
  const getColor = () => {
    
    const v4colorRule = () => {
      const result: Record<string, Record<string, string>> = {};

      for (const section in cssRule) {
        if (section === ':root' || section === '.dark') {
          result[section] = {};

          for (const key in cssRule[section]) {
            if (key === '--radius') {
              result[section][key] = cssRule[section][key]
              continue
            } 
            const value = cssRule[section][key]
            const hsl = oklchToHSL(value)
            result[section][key] = hsl ? `hsla(${hsl.hsl} / ${hsl.alpha})` : ""
          }
        }
      }

      return JSON.stringify(result, null, 2)
        .replace(/^{|}$/g, '')
        .replace(/"/g, '')
        .replace(/^(\s*)(:root|\.dark):/gm, '$1$2')
        .replace(/^(\s*})\s*,/gm, '$1')
        .replace(/,/g, ';')
    }
    setV4CssRule(v4colorRule())

    const v3colorRuleTrans = () => {
      const result: Record<string, Record<string, string>> = {};

      for (const section in cssRule) {
        if (section === ':root' || section === '.dark') {
          result[section] = {};

          for (const key in cssRule[section]) {
            if (key.startsWith('--sidebar')) continue // 跳過 --sidebar 變數
            if (key === '--radius') {
              result[section][key] = cssRule[section][key]
              continue
            } 
            const value = cssRule[section][key]
            
            result[section][key] = oklchToHSL(value)?.hsl ?? ""
          }
        }
      }

      return result;
    } 

    const v3colorRule = JSON.stringify(v3colorRuleTrans(), null, 2).replace(/^{|}$/g, '').replace(/"/g, '').replace(/^(\s*)(:root|\.dark):/gm, '$1$2').replace(/^(\s*})\s*,/gm, '$1').replace(/,/g, ';') 
    setV3CssRule(`@layer base {${v3colorRule}}`)
  }

  return (
    <Dialog >
      <DialogTrigger asChild>
        <div onClick={() => getColor()}>
          { trigger }
        </div>
      </DialogTrigger>
      <DialogHeader>
      <DialogTitle />
      <DialogDescription />
    </DialogHeader>
      <DialogContent className="sm:max-w-max">
        <DialogHeader className="hidden">
          <DialogTitle>Theme color</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="v4" className="h-[calc(100vh/2)] overflow-hidden">
          <TabsList className="mx-auto">
            <TabsTrigger id="preview-tailwind-v4" value="v4" onClick={() => setTabs('v4')}>Tailwind v4</TabsTrigger>
            <TabsTrigger id="preview-tailwind-v3" value="v3" onClick={() => setTabs('v3')}>Tailwind v3</TabsTrigger>
          </TabsList>
          <TabsContent value="v4" className="rounded-lg  overflow-scroll ">
            <CodeBlock code={v4cssRule} />
          </TabsContent>
          <TabsContent value="v3" className="rounded-lg overflow-scroll">
            <CodeBlock code={v3cssRule} />
          </TabsContent>
        </Tabs>
        <Button
          id={`${tabs}-color-copy-to-clipboard`}
          onClick={copyToClipboard}
          size="lg"
        >
          <p className="flex gap-2 pointer-events-none">
            { copied
              ? <><ClipboardCheck className="w-4 h-4" /> Success</>
              : <><Clipboard className="w-4 h-4" /> Copy</>
            }
          </p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
