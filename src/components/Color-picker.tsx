/*
 * @Author:FeiFeiSeal
 * @Date:2025-05-29 16:00:00
 * @LastEditors:Wendy
 * @LastEditTime:2026-05-19 13:00:00
 * @Description: 顏色選擇器組件
 */
import Color from 'colorjs.io'
import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  children?: React.ReactNode
}

export function ColorPicker({ value, onChange, children }: ColorPickerProps) {
  const [color, setColor] = useState<Color>(new Color(value))
  const [alpha, setAlpha] = useState(1)
  const [activeFormat, setActiveFormat] = useState('hex')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const newColor = new Color(value)
      setColor(newColor)
      setAlpha(newColor.alpha)
    } catch (error) {
      console.error('Invalid color value:', value)
    }
  }, [value])

  const handleColorChange = (newColor: Color) => {
    setColor(newColor)
    onChange(newColor.toString())
  }

  const handleHexPickerChange = (hex: string) => {
    try {
      const newColor = new Color(hex)
      newColor.alpha = alpha
      handleColorChange(newColor)
    } catch (error) {
      console.error('Invalid hex color:', hex)
    }
  }

  const handleAlphaChange = (val: number[]) => {
    const newAlpha = val[0] / 100
    setAlpha(newAlpha)
    const newColor = color.clone()
    newColor.alpha = newAlpha
    handleColorChange(newColor)
  }

  // 取 6 位 hex（不含 alpha），供 HexColorPicker 使用
  const hexValue = (() => {
    try {
      const hex = color.toString({ format: 'hex' })
      return hex.length >= 7 ? hex.slice(0, 7) : hex
    } catch {
      return '#000000'
    }
  })()

  const getColorCode = () => {
    try {
      switch (activeFormat) {
        case 'hex': return color.toString({ format: 'hex' })
        case 'rgb': return color.toString({ format: 'rgb' })
        case 'hsl': return color.toString({ format: 'hsl' })
        default: return color.toString()
      }
    } catch {
      return ''
    }
  }

  const copyColorCode = async () => {
    try {
      await navigator.clipboard.writeText(getColorCode())
      setCopied(true)
      toast.success('顏色代碼已複製')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('複製失敗')
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-2 cursor-pointer">
          <div
            className="w-6 h-6 rounded-full shadow border shrink-0"
            style={{ backgroundColor: color.toString() }}
          />
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 space-y-3 bg-popover" align="start">
        {/* 顏色預覽 */}
        <div
          className="w-full h-10 rounded-md border border-border shadow-sm"
          style={{ backgroundColor: color.toString() }}
        />

        {/* react-colorful 色盤 */}
        <HexColorPicker
          color={hexValue}
          onChange={handleHexPickerChange}
          style={{ width: '100%', height: '160px' }}
        />

        {/* Alpha slider */}
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Alpha</Label>
          <Slider
            value={[Math.round(alpha * 100)]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleAlphaChange}
            trackClassName="bg-[linear-gradient(to_right,transparent,var(--alpha-color))] [background-image:linear-gradient(to_right,transparent,var(--alpha-color))]"
            style={{ '--alpha-color': hexValue } as React.CSSProperties}
            rangeClassName="bg-transparent"
            thumbClassName="border-border"
            thumbStyle={{ backgroundColor: color.toString() }}
          />
        </div>

        {/* 格式選擇 + 顏色代碼輸出 */}
        <div className="space-y-2">
          <Tabs value={activeFormat} onValueChange={setActiveFormat}>
            <TabsList className="h-7 w-full">
              <TabsTrigger value="hex" className="flex-1 text-xs">HEX</TabsTrigger>
              <TabsTrigger value="rgb" className="flex-1 text-xs">RGB</TabsTrigger>
              <TabsTrigger value="hsl" className="flex-1 text-xs">HSL</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Input
              value={getColorCode()}
              readOnly
              className="font-mono text-xs h-8"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyColorCode}
              className="shrink-0 h-8 w-8"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
