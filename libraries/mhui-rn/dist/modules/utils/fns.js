// @ts-nocheck

/* eslint-disable */
// 空函数
export function NOOP() {} // 打印参数

export function log(...args) {
  console.log(...args);
} // 判断两个数组的元素相同

export function isSameArrayElements(a, b) {
  if (a === b) {
    return true;
  }

  if (!a && b || a && !b) {
    return false;
  }

  if (a && b && a.length !== b.length) {
    return false;
  }

  for (let i = 0, l = a.length; i < l; i++) {
    const item = a[i];

    if (b.find(n => n === item) === undefined) {
      return false;
    }
  }

  return true;
} // 获取数据类型

export function getType(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}