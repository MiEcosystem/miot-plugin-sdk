export declare type NativeColorScheme = null | 'light' | 'dark';
export declare class DarkModeStore {
  constructor();
}
declare const _default: {
    /**
     * 维护了是否由开发者自己适配插件深色模式的标记变量
     * 建议统一调用preparePluginOwnDarkMode
     */
    darkModeStore: DarkModeStore;
    /**
     * 开发者使用以下的接口自己适配插件的深色模式时需先调用该函数，
     * 作用：关闭miot-sdk的反色模式（iOS & Android）,
     *
     * @returns {void} 无返回值
     */
    preparePluginOwnDarkMode(): void;
    /**
     * 获取当前颜色模式，light：浅色模式， dark：深色模式，null：颜色模式尚未选择或不支持模式切换。
     * @return {string} 当前模式：'light'|'dark'|null
     */
    getColorScheme(): NativeColorScheme;
    /**
     * 添加深色模式的监听
     * @param {Function} ({colorScheme}) => void
     * @return {void}
     */
    addChangeListener(listener: any): void;
    /**
     * 取消深色模式的监听
     * @param {Function} ({colorScheme}) => void
     * @return {void}
     */
    removeChangeListener(listener: any): void;
};
export default _default;