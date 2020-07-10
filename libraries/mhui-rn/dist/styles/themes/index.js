// @ts-nocheck
import defaultTheme from "./default";
import ITheme from "./ITheme";
export { ITheme };
const themes = {
  default: defaultTheme
};
export function getTheme(theme = 'default', colorScheme = 'light') {
  const result = {};
  Object.entries(themes[theme]).forEach(([key, value]) => {
    result[key] = value[colorScheme];
  });
  return result;
}