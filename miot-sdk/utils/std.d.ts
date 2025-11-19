/**
 * 注册组件
 * @param {string} key 组件名称
 * @param {function|class} value 组件
 */
export function setComponent(key: string, value: Function | class): void;
/**
 * 注册特性，根据特性标识，显示在指定区域
 * @param {string} key home - 首页
 * @param {array} value 每一项是已注册组件的名称
 */
export function setFeature(key: string, value: array): void;
export function get(type: any): any;
export function getName(key: any): string;
declare namespace _default {
    export { setComponent };
    export { setFeature };
    export { get };
    export { getName };
}
export default _default;