import native from './ecoNative';
/**
 * Eco缓存服务
 * 
*/
export default class EcoCache {
  static getString(key) {
    return new Promise((resolve, reject) => {
      native.EcoCache.getString(`${ key }`, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  static getBoolean(key) {
    return new Promise((resolve, reject) => {
      native.EcoCache.getBoolean(`${ key }`, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  static getInt(key) {
    return new Promise((resolve, reject) => {
      native.EcoCache.getInt(`${ key }`, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  static putString(key, value) {
    native.EcoCache.putString(`${ key }`, `${ value }`);
  }
  static putBoolean(key, value) {
    native.EcoCache.putBoolean(`${ key }`, Boolean(value));
  }
  static putInt(key, value) {
    native.EcoCache.putInt(`${ key }`, Number(value));
  }
}