   return Promise.resolve(null);
}
let { width, height } = Dimensions.get('window');
if (isAndroid) {
  getPhoneScreenInfo().then((res) => {
    width = res.viewWidth;
    height = res.viewHeight;
  }).catch(NOOP);
}
export const window = {
  get width() { return width; },
  get height() { return height; }
};
// UI尺寸适配
// 3X图
export function adjustSize(n) {
  const calculateSize = (n / 1080 * window.width * 2) / 2;
  const roundToNearestPixel = PixelRatio.roundToNearestPixel(calculateSize);
  return roundToNearestPixel;
}