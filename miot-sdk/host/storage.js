/**
 * @export
 * @module miot/host/storage
 * @description 本地轻量级存储服务
 */
import native, { Utils } from "../native";

export default {
  /**
   * 获取一个key 保存的字符串，如果已经调用 set 则返回对应的值，未调用 set 则返回“”
   * @param {string} key
   * @mark andr done
   */
  get(key) {
    return new Promise((resolve, reject) => {
      native.MIOTHost.loadInfoCallback(key, value => {
        if (value) {
          let res = JSON.parse(value);
          if (res.expire > 0) {
            if (res.expire + res.time > new Date().getTime()) {
              resolve(res.value);
            } else {
              reject("expired");
            }
          } else {
            resolve(res.value);
          }
        }else{
          resolve(value);
        }
      });
    });
  },

  /**
   * 和 get 相对应，持久化一个 key=value 的数据
   * @param {string} key 获取 value 时传入的唯一标识
   * @param {object} val 要保存的数据
   * @param {object} [opt={ expire: 0 }] opt.expire 有效期 从保存的时候开始 expire ms以内数据有效。
   * @mark andr done
   */
  set(key, val, opt = { expire: 0 }) {
    let value = {
      "value": val,
      "expire": opt ? opt.expire : 0,
      "time": new Date().getTime()
    };
    native.MIOTHost.saveInfo(key, JSON.stringify(value));
  },

  /**
   * 获取所有 keys 的 values
   * @param {array} keys
   * @return {promise} 返回的promise传出的值是values数组，和传入的keys对应
   * @mark 纯 js 方法
   */
  load(keys) {
    if (Utils.typeName(keys) !== "array") {
      console.warn("传入参数不是数组");
      return;
    }
    let promiseArray = keys.map(key => {
      return this.get(key);
    });
    return Promise.all(promiseArray);
  },

  /**
   * 保存所有 keyValues 的数据，例如{key1:value1 , key2:value2 , key3:value3}
   * 每个 key 可单独更新数据，如果调用 set(key2,value4) 则只更新 key2，key1和 key3的值保持不变
   * @param {{key:value}} keyValues - 需要存储的数据
   * @param {object} [opt={ expire: 0 }] opt.expire 有效期 从保存的时候开始 expire ms以内数据有效。
   * @mark 纯 js 方法
   */
  save(keyValues, opt = { expire: 0 }) {
    for (let key in keyValues) {
      this.set(key, keyValues[key], opt);
    }
  }
};

