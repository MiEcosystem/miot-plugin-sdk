/**
 *  动态获取颜色的样式表
 * @param {Style} style - 样式表
 */
export function dynamicStyleSheet(style: Style): any;
export default DynamicStyleSheet;
declare class DynamicStyleSheet {
  constructor(style: any);
    light: any;
    dark: any;
    /**
     *
     * @param {string} type 'light' | 'dark'
     * @param {Style} style
     */
    _create(styles: any, type?: string): any;
}