/*
 * @Author:FeiFeiSeal
 * @Date:2025-05-29 16:00:00
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-29 16:00:00
 * @Description: 顏色選擇器組件
 */
import Color from 'colorjs.io'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import  { ColorSlider } from "@/components/ui/color-slider"
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
  const [activeTab, setActiveTab] = useState('oklch')
  const [alpha, setAlpha] = useState(1)
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

  const handleAlphaChange = (value: number[]) => {
    const newAlpha = value[0]
    setAlpha(newAlpha)
    const newColor = color.clone()
    newColor.alpha = newAlpha
    handleColorChange(newColor)
  }

  const handleOklchChange = (l: number, c: number, h: number) => {
    const newColor = new Color('oklch', [l, c, h], alpha)
    handleColorChange(newColor)
  }

  const handleHexChange = (hex: string) => {
    try {
      const newColor = new Color(hex)
      newColor.alpha = alpha
      handleColorChange(newColor)
    } catch (error) {
      console.error('Invalid hex color:', hex)
    }
  }

  const handleRgbaChange = (r: number, g: number, b: number) => {
    const newColor = new Color('srgb', [r, g, b], alpha)
    handleColorChange(newColor)
  }

  const handleHslaChange = (h: number, s: number, l: number) => {
    const newColor = new Color('hsl', [h, s, l], alpha)
    handleColorChange(newColor)
  }

  const copyColorCode = async () => {
    try {
      await navigator.clipboard.writeText(color.toString())
      setCopied(true)
      toast.success('顏色代碼已複製')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('複製失敗')
    }
  }

  const getColorCode = () => {
    switch (activeTab) {
      case 'oklch':
        return color.toString({ format: 'oklch' })
      case 'hex':
        return color.toString({ format: 'hex' })
      case 'rgba':
        return color.toString({ format: 'rgb' })
      case 'hsla':
        return color.toString({ format: 'hsl' })
      default:
        return color.toString()
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-2 cursor-pointer">
          <div
            className="w-6 h-6 rounded-full shadow border shrink-0 "
            style={{ backgroundColor: color.toString() }}
          />
          { children }
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 space-y-4 bg-popover" align="start">
        <div className="flex flex-col gap-4 items-start justify-between">
          <div
            className="w-full h-16 rounded-md border shrink-0 border-popover-foreground shadow"
            style={{ backgroundColor: color.toString() }}
          />
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              {/* <TabsTrigger value="oklch">OKLCH</TabsTrigger> */}
              <TabsTrigger value="hex">HEX</TabsTrigger>
              <TabsTrigger value="rgba">RGBA</TabsTrigger>
              <TabsTrigger value="hsla">HSLA</TabsTrigger>
            </TabsList>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={getColorCode()}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyColorCode}
                  className="shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              {/* <TabsContent value="oklch" className="space-y-4">
                <div className="space-y-2">
                  <Label>Lightness</Label>
                  <Slider
                    value={[color.coords[0] * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value: number[]) => handleOklchChange(value[0] / 100, color.coords[1], color.coords[2])}
                    className="[&_[data-orientation=horizontal]]:bg-gradient-to-r [&_[data-orientation=horizontal]]:from-[var(--slider-from)] [&_[data-orientation=horizontal]]:to-[var(--slider-to)]"
                    style={{ 
                      "--slider-from": new Color('oklch', [0, color.coords[1], color.coords[2]]).toString(),
                      "--slider-to": new Color('oklch', [1, color.coords[1], color.coords[2]]).toString()
                    } as React.CSSProperties}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Chroma</Label>
                  <Slider
                    value={[color.coords[1] * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value: number[]) => handleOklchChange(color.coords[0], value[0] / 100, color.coords[2])}
                    className="[&_[data-orientation=horizontal]]:bg-gradient-to-r [&_[data-orientation=horizontal]]:from-[var(--slider-from)] [&_[data-orientation=horizontal]]:to-[var(--slider-to)]"
                    style={{ 
                      "--slider-from": 'transparent',
                      "--slider-to": 'transparent'
                    } as React.CSSProperties}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hue{[color.coords[2]]}</Label>
                  <ColorSlider
                    value={[color.coords[2]]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={(value: number[]) => handleOklchChange(color.coords[0], color.coords[1], value[0])}
                    className="
                    bg-linear-[to_right,oklch(100_1_0),oklch(100_1_16.66)_16.66%,oklch(100_1_33.34)_33.34%,oklch(100_1_50)_50%,oklch(100_1_66.67)_66.67%,oklch(100_1_83.33)_83.33%,oklch(100_1_100)_100%]"
                  />
                </div>
              </TabsContent> */}

              <TabsContent value="hex" className="space-y-4">
                <div className="space-y-2">
                  <Label>HEX</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-md border shrink-0"
                      style={{ backgroundColor: color.toString() }}
                    />
                    <Input
                      value={color.toString({ format: 'hex' })}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.match(/^#?[0-9A-Fa-f]{6}$/)) {
                          const hexValue = value.startsWith('#') ? value : `#${value}`;
                          handleHexChange(hexValue);
                        }
                      }}
                      className="font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                <div className="relative w-full aspect-[2/1] rounded-md overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-[hsl(0_100%_50%)] via-[hsl(60_100%_50%)] via-[hsl(120_100%_50%)] via-[hsl(180_100%_50%)] via-[hsl(240_100%_50%)] via-[hsl(300_100%_50%)] to-[hsl(360_100%_50%)]"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-white"
                  />
                  <div 
                    className="absolute w-3 h-3 border-2 border-white rounded-full shadow-lg"
                    style={{
                      left: `${(color.coords[2] / 360) * 100}%`,
                      top: `${(1 - color.coords[1]) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {[
                    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
                    '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#800000',
                    '#008000', '#000080', '#808000', '#800080', '#008080',
                    '#FFA500', '#A52A2A', '#FFC0CB', '#FFD700', '#4B0082',
                    '#800080', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF',
                    '#C0C0C0', '#808080', '#800000', '#808000', '#008000'
                  ].map((hexColor) => (
                    <button
                      key={hexColor}
                      className="w-6 h-6 rounded-sm border hover:scale-110 transition-transform"
                      style={{ backgroundColor: hexColor }}
                      onClick={() => handleHexChange(hexColor)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rgba" className="space-y-4">
                <div className="space-y-2">
                  <Label>Red</Label>
                  <Slider
                    value={[color.coords[0] * 255]}
                    min={0}
                    max={255}
                    step={1}
                    onValueChange={(value: number[]) => handleRgbaChange(value[0], color.coords[1] * 255, color.coords[2] * 255)}
                    className="[&_[data-orientation=horizontal]]:bg-gradient-to-r [&_[data-orientation=horizontal]]:from-[var(--slider-from)] [&_[data-orientation=horizontal]]:to-[var(--slider-to)]"
                    style={{ 
                      "--slider-from": new Color('srgb', [0, color.coords[1] * 255, color.coords[2] * 255]).toString(),
                      "--slider-to": new Color('srgb', [255, color.coords[1] * 255, color.coords[2] * 255]).toString()
                    } as React.CSSProperties}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Green</Label>
                  <Slider
                    value={[color.coords[1] * 255]}
                    min={0}
                    max={255}
                    step={1}
                    onValueChange={(value: number[]) => handleRgbaChange(color.coords[0] * 255, value[0], color.coords[2] * 255)}
                    className="[&_[data-orientation=horizontal]]:bg-gradient-to-r [&_[data-orientation=horizontal]]:from-[var(--slider-from)] [&_[data-orientation=horizontal]]:to-[var(--slider-to)]"
                    style={{ 
                      "--slider-from": new Color('srgb', [color.coords[0] * 255, 0, color.coords[2] * 255]).toString(),
                      "--slider-to": new Color('srgb', [color.coords[0] * 255, 255, color.coords[2] * 255]).toString()
                    } as React.CSSProperties}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Blue</Label>
                  <Slider
                    value={[color.coords[2] * 255]}
                    min={0}
                    max={255}
                    step={1}
                    onValueChange={(value: number[]) => handleRgbaChange(color.coords[0] * 255, color.coords[1] * 255, value[0])}
                    className="[&_[data-orientation=horizontal]]:bg-gradient-to-r [&_[data-orientation=horizontal]]:from-[var(--slider-from)] [&_[data-orientation=horizontal]]:to-[var(--slider-to)]"
                    style={{ 
                      "--slider-from": new Color('srgb', [color.coords[0] * 255, color.coords[1] * 255, 0]).toString(),
                      "--slider-to": new Color('srgb', [color.coords[0] * 255, color.coords[1] * 255, 255]).toString()
                    } as React.CSSProperties}
                  />
                </div>
              </TabsContent>

              <TabsContent value="hsla" className="space-y-4">
                <div className="space-y-2">
                  <Label>Hue</Label>
                  <Slider
                    value={[color.coords[0]]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={(value: number[]) => handleHslaChange(value[0], color.coords[1], color.coords[2])}
                    className="[&_[data-orientation=horizontal]]:bg-gradient-to-r [&_[data-orientation=horizontal]]:from-[var(--slider-from)] [&_[data-orientation=horizontal]]:via-[var(--slider-via)] [&_[data-orientation=horizontal]]:to-[var(--slider-to)]"
                    style={{ 
                      "--slider-from": new Color('hsl', [0, color.coords[1] * 100, color.coords[2] * 100]).toString(),
                      "--slider-via": new Color('hsl', [180, color.coords[1] * 100, color.coords[2] * 100]).toString(),
                      "--slider-to": new Color('hsl', [360, color.coords[1] * 100, color.coords[2] * 100]).toString()
                    } as React.CSSProperties}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Saturation</Label>
                  <Slider
                    value={[color.coords[1] * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value: number[]) => handleHslaChange(color.coords[0], value[0] / 100, color.coords[2])}
                    className="[&_[data-orientation=horizontal]]:bg-gradient-to-r [&_[data-orientation=horizontal]]:from-[var(--slider-from)] [&_[data-orientation=horizontal]]:to-[var(--slider-to)]"
                    style={{ 
                      "--slider-from": new Color('hsl', [color.coords[0], 0, color.coords[2] * 100]).toString(),
                      "--slider-to": new Color('hsl', [color.coords[0], 100, color.coords[2] * 100]).toString()
                    } as React.CSSProperties}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lightness</Label>
                  <Slider
                    value={[color.coords[2] * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value: number[]) => handleHslaChange(color.coords[0], color.coords[1], value[0] / 100)}
                    className="[&_[data-orientation=horizontal]]:bg-gradient-to-r [&_[data-orientation=horizontal]]:from-[var(--slider-from)] [&_[data-orientation=horizontal]]:to-[var(--slider-to)]"
                    style={{ 
                      "--slider-from": new Color('hsl', [color.coords[0], color.coords[1] * 100, 0]).toString(),
                      "--slider-to": new Color('hsl', [color.coords[0], color.coords[1] * 100, 100]).toString()
                    } as React.CSSProperties}
                  />
                </div>
              </TabsContent>

              <div className="space-y-2">
                <Label>Alpha</Label>
                <div className="relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMGgxMHYxMEgweiIgZmlsbD0iI2NjYyIvPjxwYXRoIGQ9Ik0wIDBoMTB2MTBIMHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]" />
                  <Slider
                    value={[alpha * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value: number[]) => handleAlphaChange([value[0] / 100])}
                    className="relative [&_[data-orientation=horizontal]]:bg-gradient-to-r [&_[data-orientation=horizontal]]:from-transparent [&_[data-orientation=horizontal]]:to-[var(--slider-color)]"
                    style={{ "--slider-color": color.toString() } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
} 