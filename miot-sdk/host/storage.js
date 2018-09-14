/**
 * @export
 * @module miot/host/storage
 * @description 本地轻量级存储服务
 */
export default {
  /**
   * 获取一个key 保存的字符串，如果已经调用 set 则返回对应的值，未调用 set 则返回“”
   * @param {string} key 
   * @returns {*}
   */
  get(key) {
     return Promise.resolve(null);
  },
  /**
   * 和 get 相对应，持久化一个 key=value 的数据
   * @param {string} key 获取 value 时传入的唯一标识
   * @param {object} val 要保存的数据
   * @param {object} [opt={ expire: 0 }] opt.expire 有效期 从保存的时候开始 expire ms以内数据有效。 
   * @returns {void}
   */
  set(key, val, opt = { expire: 0 }) {
  },
  /**
   * 获取所有 keys 的 values
   * @param {array} keys
   * @return {promise<Array<json>>} 返回的promise传出的值是values数组，和传入的keys对应 [{key,value}]
   * 
   */
  load(keys) {
     return Promise.resolve(null);
  },
  /**
   * 保存所有 keyValues 的数据，例如{key1:value1 , key2:value2 , key3:value3}
   * 每个 key 可单独更新数据，如果调用 set(key2,value4) 则只更新 key2，key1和 key3的值保持不变
   * @param {{key:value}} keyValues - 需要存储的数据
   * @param {object} [opt={ expire: 0 }] opt.expire 有效期 从保存的时候开始 expire ms以内数据有效。
   * @returns {void}
   * 
   */
  save(keyValues, opt = { expire: 0 }) { 
    for (let key in keyValues) {
      this.set(key, keyValues[key], opt);
    }
  }
};