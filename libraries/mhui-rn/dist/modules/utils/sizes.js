import { Dimensions, Platform, NativeModules } from 'react-native';
const {
  width: windowWidth,
  height: windowHeight
} = Dimensions.get('window');
export const window = {
  get width() {
    return windowWidth;
  },

  get height() {
    if (Platform.OS === 'android') {
      return windowHeight / windowWidth > 1.8 ? windowHeight + NativeModules.StatusBarManager.HEIGHT : windowHeight;
    }

    return windowHeight;
  }

}; // UI尺寸适配
// 3X图

export function adjustSize(n) {
  return n / 1080 * window.width;
}