import { Platform } from 'react-native';
import DarkMode from 'miot/darkmode';
class DynamicColor {
  /**
   *
   * @param {sting} light 浅色模式色值
   * @param {sting} dark 深色模式色值
   */
  // @ts-nocheck
  constructor(light: string, dark: string) {
    if (Platform.OS === 'ios') {
      this.light = `xm${ light }`;
      this.dark = `xm${ dark }`;
    } else {
      this.light = light;
      this.dark = dark;
    }
  }
}
/**
 * 动态获取颜色
 * @param {sting} light - 浅色模式色值
 * @param {sting} dark - 深色模式色值
 */
// @ts-nocheck
export function dynamicColor(light: string, dark: string): string {
  const dynamicValue = new DynamicColor(light, dark);
  let darkMode = DarkMode.getColorScheme();
  return dynamicValue[darkMode || 'light'];
}
export default DynamicColor;