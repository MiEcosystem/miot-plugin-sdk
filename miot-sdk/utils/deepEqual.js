const hasElementType = typeof Element !== 'undefined';
const hasMap = typeof Map === 'function';
const hasSet = typeof Set === 'function';
const hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;
const JsObjectTypes = ['Function', 'Array', 'Date', 'RegExp', 'Object'];
function getType(value) {
  return Object.prototype.toString.call(value).match(/\[object (.*)\]/)[1];
}
/**
 * @description 深度比较两个对象是否相等，来源：https://github.com/FormidableLabs/react-fast-compare
 * @author guhao
 * @date 15/09/2021
 * @param {Object} a
 * @param {Object} b
 * @returns {boolean} 
 */
export default function deepEqual(a, b) {
  if (a === b) return true;
  const TypeA = getType(a); 
  const TypeB = getType(b);
  if (a && b && TypeA === TypeB && JsObjectTypes.includes(TypeA) && JsObjectTypes.includes(TypeB)) {
    
    if (a.constructor !== b.constructor) return false;
    let length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    if (TypeA === 'Date' && TypeB === 'Date') {
      return a.getTime() === b.getTime();
    }
    let it;
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!deepEqual(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }
    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === 'function' && typeof b.valueOf === 'function') return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString && typeof a.toString === 'function' && typeof b.toString === 'function') return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;
    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {
      if ((
        keys[i] === '_owner' || 
        keys[i] === '__v' || 
        keys[i] === '__o'
        // keys[i] === '_store' ||
        // keys[i] === '_self' ||
        // keys[i] === '_source'
      ) && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements
        continue;
      }
      // all other properties should be traversed as usual
      if (!deepEqual(a[keys[i]], b[keys[i]])) return false;
    }
    return true;
  }
  // NaN === NaN
  return a !== a && b !== b;
}