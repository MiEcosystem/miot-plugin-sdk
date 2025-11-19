/**
 * 动态获取颜色
 * @param {sting} light - 浅色模式色值
 * @param {sting} dark - 深色模式色值
 */
export function dynamicColor(light: string, dark: string): string;
export default DynamicColor;
declare class DynamicColor {
  /**
     *
     * @param {sting} light 浅色模式色值
     * @param {sting} dark 深色模式色值
     */
  constructor(light: string, dark: string);
    light: string;
    dark: string;
}