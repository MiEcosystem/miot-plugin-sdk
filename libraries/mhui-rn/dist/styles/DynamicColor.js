import { isIOS, isMiHome } from "../utils/check";

class DynamicColor {
  // 浅色模式色值
  // 深色模式色值
  constructor(light, dark) {
    if (isIOS && isMiHome) {
      this.light = `xm${light}`;
      this.dark = `xm${dark}`;
    } else {
      this.light = light;
      this.dark = dark;
    }
  }

  color(colorScheme = 'light') {
    return colorScheme === 'light' ? this.light : this.dark;
  }

} // /**
//  * 动态获取颜色
//  * @param {sting} light - 浅色模式色值
//  * @param {sting} dark - 深色模式色值
//  */
// // @ts-nocheck
// export function dynamicColor(light: string, dark: string): string {
//   const dynamicValue = new DynamicColor(light, dark);
//   const darkMode = DarkMode.getColorScheme();
//   return dynamicValue[darkMode || 'light'];
// }


export default DynamicColor;