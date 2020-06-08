'use strict';
import EventEmitter from '../../node_modules/react-native/Libraries/vendor/emitter/EventEmitter';
import NativeEventEmitter from '../../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter';
import NativeAppearance from './NativeDarkmode';
import invariant from 'invariant';
import { isIOS, isAndroid } from "miot/native";
// @ts-nocheck
type NativeColorScheme = null | 'light' | 'dark';
const eventEmitter = new EventEmitter();
const IS_DEBUG = __DEV__ && !global.nativeExtensions && !global.nativeCallSyncHook && !global.RN$Bridgeless;
if (NativeAppearance) {
  const nativeEventEmitter = new NativeEventEmitter(NativeAppearance);
  nativeEventEmitter.addListener(
    'appearanceChanged',
    (newAppearance) => {
      const { colorScheme } = newAppearance;
      invariant(
        colorScheme === 'dark' ||
        colorScheme === 'light' ||
        colorScheme == null,
        "Unrecognized color scheme. Did you mean 'dark' or 'light'?",
      );
      eventEmitter.emit('change', { colorScheme });
    },
  );
}
class DarkModeStore {
  constructor() {
    this.setDarkMode = false;
  }
}
const darkModeStore = new DarkModeStore();
export default {
  /**
   * 维护了是否由开发者自己适配iOS下插件深色模式的标记变量
   * 建议统一调用preparePluginOwnDarkMode
   */
  darkModeStore,
  /**
   * 开发者使用以下的接口自己适配插件的深色模式时需先调用该函数，
   * 作用：关闭插件所在页面native端的系统强制深色模式（Android）/ miot-sdk的反色模式（iOS）,
   *
   * @returns {void} 无返回值
   */
  preparePluginOwnDarkMode() {
    if (isIOS) {
      // 设置为true时标识由开发者自己适配插件的深色模式（iOS）
      this.darkModeStore.setDarkMode = true;
    } else {
      if (NativeAppearance != null) {
        // 关闭插件所在页面native端的系统强制深色模式（Android）
        if (IS_DEBUG) {
          // https://github.com/facebook/react-native/commit/4fd9c9d544d741fb2df3ad849dfa4bdf4719ccf4
          if (__DEV__ && console.warn) {
            console.warn('调试模式下无法正常调用 preparePluginOwnDarkMode');
          }
        } else {
          NativeAppearance.disableActivityDarkMode();
        }
      }
    }
  },
  /**
   * 获取当前颜色模式，light：浅色模式， dark：深色模式，null：颜色模式尚未选择或不支持模式切换。
   * @return {string} 当前模式：'light'|'dark'|null
   */
  getColorScheme(): NativeColorScheme {
    if (IS_DEBUG) {
      // https://github.com/facebook/react-native/commit/4fd9c9d544d741fb2df3ad849dfa4bdf4719ccf4
      if (__DEV__ && console.warn) {
        console.warn('调试模式下无法正常获取当前颜色模式');
      }
      return 'light';
    }
    const nativeColorScheme =
      NativeAppearance == null
        ? null
        : NativeAppearance.getColorScheme() || null;
    invariant(
      nativeColorScheme === 'dark' ||
      nativeColorScheme === 'light' ||
      nativeColorScheme == null,
      "Unrecognized color scheme. Did you mean 'dark' or 'light'?",
    );
    return nativeColorScheme;
  },
  /**
   * 添加深色模式的监听
   * @param {Function} ({colorScheme}) => void
   * @return {void}
   */
  addChangeListener(listener) {
    eventEmitter.addListener('change', listener);
  },
  /**
   * 取消深色模式的监听
   * @param {Function} ({colorScheme}) => void
   * @return {void}
   */
  removeChangeListener(listener) {
    eventEmitter.removeListener('change', listener);
  }
};