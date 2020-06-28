import DynamicColor from './DynamicColor';
import DarkMode from 'miot/darkmode';
class DynamicStyleSheet {
  constructor(style) {
    this.light = this._create(style, 'light');
    this.dark = this._create(style, 'dark');
  }
  /**
   *
   * @param {string} type 'light' | 'dark'
   * @param {Style} style
   */
  _create(styles, type = 'light') {
    const newStyles = {};
    for (let [stylesKey, stylesValue] of Object.entries(styles)) {
      const newStyle = {};
      for (let [styleKey, styleValue] of Object.entries(stylesValue)) {
        if (styleValue instanceof DynamicColor) {
          newStyle[styleKey] = styleValue[type];
        } else {
          newStyle[styleKey] = styleValue;
        }
      }
      newStyles[stylesKey] = newStyle;
    }
    return newStyles;
  }
}
/**
 *  动态获取颜色的样式表
 * @param {Style} style - 样式表
 */
export function dynamicStyleSheet(style) {
  let darkMode = DarkMode.getColorScheme();
  const result = new DynamicStyleSheet(style)[darkMode || 'light'];
  return result;
}
export default DynamicStyleSheet;