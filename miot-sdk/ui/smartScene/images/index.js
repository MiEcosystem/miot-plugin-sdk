import Darkmode from '../../../darkmode';
const Image = {
  "wear-scene": require("./wear-scene.png"),
  "wear-scene-dark": require("./wear-scene-dark.png"),
  "ifttt-h": require("./ifttt-h.png"),
  "mi-log": require("./mi-log.png"),
  "connect_arrow": require("./connect_arrow.png"),
  "connect_arrow-dark": require("./connect_arrow-dark.png")
};
export function getImage(str) {
  const isDark = Darkmode.getColorScheme() === "dark";
  if (!isDark) {
    return Image[str];
  } else {
    return Image[`${ str }-dark`] || Image[str];
  }
}
export default Image;