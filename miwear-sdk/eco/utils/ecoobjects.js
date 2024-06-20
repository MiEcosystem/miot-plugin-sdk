// @ts-nocheck
/* eslint-disable */
/**
 * 判断基础类型
 * @param v
 * @returns {boolean}
 */
export function isPrimary(v) {
  if (v === null || v === undefined) {
    return true;
  }
  return ['number', 'string', 'boolean', 'symbol'].includes(typeof v);
}
const TypeHandlers = {
  '[object Array]': {
    related: false,
    create: () => [],
    forEach: (src, fn) => {
      src.forEach((v, i) => fn(v, i));
    },
    map: (src, fn) => src.map(fn),
    set: (src, key, value) => {
      src[key] = value;
    }
  },
  '[object Object]': {
    related: true,
    create: () => ({}),
    forEach: (src, fn) => {
      Object.entries(src).forEach(([k, v]) => fn(v, k));
    },
    map: (src, fn) => Object.entries(src).map(([k, v]) => fn(v, k)),
    set: (src, key, value) => {
      src[key] = value;
    }
  },
  '[object Set]': {
    related: false,
    create: () => new Set(),
    forEach: (src, fn) => {
      src.forEach(fn);
    },
    map: (src, fn) => Array.from(src.entries()).map(vs => fn(vs[0])),
    set: (src, key, value) => {
      src.add(value);
    }
  },
  '[object Map]': {
    related: true,
    create: () => new Map(),
    forEach: (src, fn) => {
      src.forEach(fn);
    },
    map: (src, fn) => Array.from(src.entries()).map(([k, v]) => fn(v, k)),
    set: (src, key, value) => {
      src.set(key, value);
    }
  }
};
function _copy(value, memo) {
  if (isPrimary(value) || value instanceof Function) {
    return value;
  }
  let newValue = memo.get(value);
  if (newValue) {
    return newValue;
  }
  const type = TypeHandlers[Object.prototype.toString.call(value)];
  if (type !== undefined) {
    newValue = type.create();
    memo.set(value, newValue);
    type.forEach(value, (v, k) => {
      type.set(newValue, k, _copy(v, memo));
    });
  } else {
    // 不认识的类型默认处理
    newValue = JSON.parse(JSON.stringify(value));
  }
  return newValue;
}
/**
 * 深度比较，不支持循环引用
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function isEqual(obj1, obj2) {
  if (isPrimary(obj1) && isPrimary(obj2)) {
    return obj1 === obj2;
  }
  if (isPrimary(obj1) || isPrimary(obj2)) {
    return false;
  }
  if (obj1 instanceof Array && obj2 instanceof Array) {
    return isArrayEqual(obj1, obj2);
  }
  if (obj1 instanceof Array || obj2 instanceof Array) {
    return false;
  }
  return isArrayEqual(Object.entries(obj1), Object.entries(obj2));
}
function isArrayEqual(a1, a2) {
  if (a1.length !== a2.length) {
    return false;
  }
  for (let i = 0; i < a1.length; ++i) {
    if (!isEqual(a1[i], a2[i])) {
      return false;
    }
  }
  return true;
}
/**
 * 拷贝
 * 1 基础类型：直接返回原值
 * 2 数组 or 对象：深copy，支持 Object, Array, Map, Set, Function
 * @returns {*}
 * @param value
 */
export function copy(value) {
  return _copy(value, new Map());
}
/**
 * 将 src 转化成可读字符串
 *
 * TODO 支持 Map、Set 等更多类型
 */
export function stringify(src) {
  if (isPrimary(src)) {
    return `${src}`;
  }
  let ret = '';
  const type = TypeHandlers[Object.prototype.toString.call(src)];
  if (type) {
    if (type.related) {
      ret += '{';
      ret += type.map(src, (v, k) => `${stringify(k)}: ${stringify(v)}`).join(', ');
      ret += '}';
    } else {
      ret += '[';
      ret += type.map(src, stringify).join(', ');
      ret += ']';
    }
  } else {
    ret = JSON.stringify(src);
  }
  return ret;
}
export const getType = value => Object.prototype.toString.call(value).match(/\[object (.*)\]/)[1];
/**
 * 判断 value 的类型
 * @param {string|Array<string>} type
 * @param {any} value
 * @returns
 */
export const isTypeOf = (type, value) => {
  const valueType = getType(value);
  if (Array.isArray(type)) {
    return type.includes(valueType);
  }
  return valueType === type;
};
export function fixNum(n) {
  return `00${n === undefined || n === null ? 0 : n}`.slice(-2);
}