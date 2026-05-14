/*
 * @Author:FeiFeiSeal
 * @Date:2025-04-05 21:58:42
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-06 17:07:30
 * @Description:
 */
import Color from 'colorjs.io';

// 丟棄第三方樣式
export const isSameDomain = (styleSheet: CSSStyleSheet) => {
  if (!styleSheet.href) {
    return true;
  }

  return styleSheet.href.indexOf(window.location.origin) === 0;
}

const isStyleRule = (rule: CSSStyleRule) => rule.type === 1 && (rule.selectorText===':root' || rule.selectorText === '.dark');        

// 獲取 :root 和 .dark 的 CSS 變數
export const getCSSCustomPropIndex = () => (
  [...document.styleSheets]
  .filter(isSameDomain) // 過濾跨域樣式表，否則會報錯
  .flatMap(sheet => [...sheet.cssRules]) // 直接展開 cssRules，避免多層 map
  .filter(rule => rule instanceof CSSStyleRule) // 過濾出 CSSStyleRule
  .filter(isStyleRule)
)

// 獲取 tool-box 變數呈現畫面
export const getColorRuleList = () => {
  
  const result =  getCSSCustomPropIndex()
    .map(rule => {
      const colorVars = new Map<string, string>(); // 用 Map 過濾重複變數

      for (let i = 0; i < rule.style.length; i++) {
        const key = rule.style[i];
        if (key === '--radius') continue; // 跳過 --radius
        const value = rule.style.getPropertyValue(key).trim(); // 變數值
        if (!colorVars.has(key)) {
          colorVars.set(key, value)
        }
      }
      
      return {
        selectorText: rule.selectorText,
        style: colorVars
      }
    })

  return result
}

// 獲取複製預覽畫面資料
export const getColorRule = () => {
  const colorRule = getCSSCustomPropIndex()

  const result: { [key in ':root' | '.dark']: { [key: string]: string } } = {
    ':root': {},
    '.dark': {}
  };

  colorRule.forEach(rule => {
    const selector = rule.selectorText as ':root' | '.dark';
    const styles = rule.style;

    for (let i = 0; i < styles.length; i++) {
      const key = styles[i]; // 取得變數名稱，例如 "--primary"
      const value = styles.getPropertyValue(key).trim(); // 取得變數的值
      result[selector][key] = value;
    }
  });

  return result
}

// 將 OKLCH 轉換成 RGB
export const oklchToRgb = (oklchColor: string): { hex: string, alpha: number }| null => {
  try {
    const color = new Color(oklchColor);  
    let alpha = color.alpha; // 取得透明度
    color.alpha = 1; // 設定透明度為 1
    // TODO 這邊要處理透明度
    return {
      hex: color.toGamut({space: 'srgb'}).to('srgb').toString({format: 'hex'}).replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/, "#$1$1$2$2$3$3"),
      alpha
    }
  }
  catch {
    return null
  }
}

// 將 OKLCH 轉換成 HSL
export const oklchToHSL = (oklchColor: string): { hsl: string, alpha: number } | null=> {
  try {
    const color = new Color(oklchColor);
    const hsl = color.to('hsl');
    
    // 取得透明度，若沒有則預設為 1
    const alpha = color.alpha !== undefined ? parseFloat(color.alpha.toFixed(2)) : 1;
    
    return {
      hsl: `${Math.round(hsl.h)} ${Math.round(hsl.s)}% ${Math.round(hsl.l )}%`,
      alpha
    }

  } catch {
    return null // 如果格式錯誤，則跳過
  }
}