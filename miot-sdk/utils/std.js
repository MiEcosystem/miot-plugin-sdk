import Device from '../device/BasicDevice';
import React from 'react';
// import { View, Text } from 'react-native';
const All = {};
const unsolvedModel = '';
/**
 * 
 * @param {string} type 资源类型: component - 组件, feature - 使用场景
 * @param {string} key 资源id: type 为component 时须符合组件命名规范, type 为feature 时须为与标准插件对齐的指定值（home - 首页自定义）
 * @param {array} value 资源内容: type 为component 时, 每项内容为组件, type 为feature 时，每项为所用组件的id
 * @returns 
 */
function set(type, key, value) {
  const model = Device?.model || unsolvedModel;
  if (!type || !key || !value) { return; }
  if (!All[model]) { All[model] = {}; }
  if (!All[model][type]) { All[model][type] = {}; }
  All[model][type][key] = value;
}
/**
 * 注册组件
 * @param {string} key 组件名称
 * @param {function|class} value 组件
 */
export function setComponent(key, value) {
  set('component', key, value);
}
/**
 * 注册特性，根据特性标识，显示在指定区域
 * @param {string} key home - 首页
 * @param {array} value 每一项是已注册组件的名称
 */
export function setFeature(key, value) {
  set('feature', key, value);
}
export function getName(key) {
  return `${ Device?.model || unsolvedModel }.${ key }`;
}
export default {
  setComponent, setFeature, get, getName
};
// // demo
// 注册组件
// setComponent('X1', () => {
//   return (
//     <View style={{
//       width: '100%',
//       height: 40,
//       backgroundColor: '#f00'
//     }}>
//       <Text>X1</Text>
//     </View>
//   );
// });
// setComponent('X2', () => {
//   return (
//     <View style={{
//       width: '100%',
//       height: 20,
//       backgroundColor: '#ff0'
//     }}>
//       <Text>X2</Text>
//     </View>
//   );
// });
// 使用自定义组件，需要提前注册组件，组件内部自己维护各种状态
// setFeature('home', ['X1', 'X2']);