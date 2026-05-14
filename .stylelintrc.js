/*
 * @Author:FeiFeiSeal
 * @Date:2025-04-11 17:36:58
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-04-25 16:12:46
 * @Description:
 */
export default {
  extends: ['stylelint-config-standard', '@stylelint/prettier-config'],
  plugins: ['stylelint-prettier', 'stylelint-scss'],
  rules: {
    'prettier/prettier': true,
    // 在這裡添加你的自訂規則
  },
  "singleQuote": true,
  "trailingComma": "es5"
}