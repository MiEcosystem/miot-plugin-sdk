export function setReadonly(obj, key, val) {
  return Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false, 
    get: () => val, 
    set: () => {}
  });
}
export default {
  setReadonly
};