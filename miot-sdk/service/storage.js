/**
 * @export public
 * @doc_name 云端配置
 * @doc_index 6
 * @doc_directory service
 * @module miot/service/storage
 * @description MIOT 云端提供的暂存服务
 *
 */
//@native
import native from '../native';
export default {
  /**
   * 读取米家的用户配置信息 /user/get_user_config（获取/user/set_user_config写入的用户配置）
   * @param {number} componentId 厂商APP_ID(Cloud ID)，需要向小米申请, 0 和 1 预留
   * @param {...number} keys 保存的数据索引，从0开始
   * @returns {Promise} key，value结构数据
   * @deprecated 10023开始废弃，建议使用 getThirdUserConfigsForOneKey
   * @example
   * getUserConfigs(componentId, k1,k2,k3).then(res => {...})
   */
  getUserConfigs(componentId, ...keys) {
    //@native :=> promise
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/user/get_user_config",
        { "component_id": componentId, keys }, (ok, res) => {
          if (ok) {
            return resolve(res)
          }
          reject(res);
        });
    });
    //@native end
  },
  /**
   * 读取三方数据,该接口读取厂商的用户配置信息 /user/get_third_user_config，对应的写的接口为：set_third_user_config。
   * @param {string} model 设备Model
   * @param  {...number} keys 根据key获取配置,如果不传keys 返回用户该厂商的所有配置
   * @deprecated 10023开始废弃，建议使用getThirdUserConfigsForOneKey, 与setThirdUserConfigsForOneKey配套使用
   * @example
   * getThirdUserConfigs(model, k1,k2,k3).then(res => {...})
   */
  getThirdUserConfigs(model, ...keys) {
    //@native :=> promise
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/user/get_third_user_config",
        { "model": model, keys }, (ok, res) => {
          if (ok) {
            return resolve(res)
          }
          reject(res);
        });
    });
    //@native end
  },
  /**
   * 写数据 /user/set_user_config
   * @param {string} componentId 厂商APP_ID(Cloud ID)，需要向小米申请，0和1预留
   * @param {*} data   key，value结构数据
   * @returns {Promise}
   * @deprecated 10023开始废弃，建议使用 setThirdUserConfigsForOneKey, data数据量支持分段保存
   */
  setUserConfigs(componentId, data) {
    //@native :=> promise
    const params = Object.keys(data || []).map(key => ({ "component_id": componentId, key, data: data[key] || {} }))
    if (!componentId || params.length < 1) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/user/set_user_config", params, (ok, res) => {
        if (ok && res != 0) {
          return resolve(ok)
        }
        reject(res);
      });
    });
    //@native end
  },
  /**
   * 写数据 /user/set_user_config， data的数据量不能超过2048字节
   * @param {string} model 
   * @param {number} key 
   * @param {json} data
   * @deprecated 10023开始废弃，建议使用setThirdUserConfigsForOneKey, data数据量支持分段保存
   */
  setThirdUserConfigs(model, key, data) {
    //@native :=> promise
    const params = { model, key, data }
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/user/set_third_user_config", params, (ok, res) => {
        if (ok && res != 0) {
          return resolve(ok)
        }
        reject(res);
      });
    });
    //@native end
  },
  /**
   * 写数据 /user/set_user_config
   * 创建或修改设置插件自由存储空间。如果数据超过服务器设置的阈值，自动分段存储到云端。
   * 但是分段存储会占用额外的key，比如key=100时，分出的新段会存储在101,102,103...等后续相邻的key上，
   * 因此如果插件方需要存储多个key-value，建议多个key之间相差较大
   * @since 10023
   * @param {string} model
   * @param {number} key
   * @param {json} data
   * @returns {Rromise<any>} Promise
   * 成功时：true
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  setThirdUserConfigsForOneKey(model, key, data) {
    //@native :=> promise
    // const params = { model, key, data }
    const params = this._convertParamsForThirdUserConfig(model, key, data);
    if (!params) {
      return new Promise.reject("data is too long, cannot save...");
    }
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/user/set_third_user_config", params, (ok, res) => {
        if (ok && res != 0) {
          return resolve(ok)
        }
        reject(res);
      });
    });
    //@native end
  },
  /**
   * 与setThirdUserConfigsForOneKey配套使用，会把分段的数据自动合并后返回，使得分段行为对调用者透明
   * @since 10023
   * @param model
   * @param key
   * @returns {Promise<any>}
   * 成功时：{key:xxx, data:xxx}   data 为set时的数据
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  getThirdUserConfigsForOneKey(model, key) {
    //@native :=> promise
    let keys = [];
    keys.push(key);
    return new Promise((resolve, reject) => {
      // 获取主key 的data
      native.MIOTRPC.standardCall("/user/get_third_user_config",
        { "model": model, "keys": keys }, (ok, res) => {
          if (ok) {
            let childKeys = this._parseMainkeysValue(res);
            if (!childKeys || childKeys.length === 0) {
              if (typeof res === "string") {
                res = JSON.parse(res);
              }
              // 获取一个key对应的value， 服务端返回的是一个数组，数组大小其实只为1，这里解析出来的目的是和获取子value一致
              if (Array.isArray(res) && res.length > 0) {
                res = res[0];
              }
              resolve(res);
            } else {
              // 获取子key 对应的data
              native.MIOTRPC.standardCall("/user/get_third_user_config",
                { "model": model, "keys": childKeys }, (ok, res) => {
                  if (ok) {
                    resolve(this._parseChildkeysValue(key, res));
                  } else {
                    reject(res);
                  }
                });
            }
          } else {
            reject(res);
          }
        });
    });
    //@native end
  },
  //@native begin
  /**
   *  需要考虑存储数据的大小，数据量太大需要分段存储
   * @param model
   * @param key
   * @param data
   * @returns {*}  datas:[]
   */
  _convertParamsForThirdUserConfig(model, key, data) {
    /**
     * 此处代码参考 Android  原生实现
     * key, DeviceTagManager.CUSTOM_COUNT_MAX=1000, DeviceTagManager.MAX_DATA_LENGTH=2048
     * String TAG_DATA_START = "ts";  String TAG_DATA_COUNT = "tc";
     * 经检验，服务端保存的 key 是整数，这点比较坑
     */
    let keyMain = key;
    let arrayDatas = [];
    let keyChilds = [];
    let keyChildIndex = 1
    let maxKeyChildCount = 1000;
    let maxLength = 2048;
    if (typeof data !== "string") {
      data = JSON.stringify(data);
    }
    let length = data.length;
    if (length <= maxLength) {
      // 数据量不大，一次处理
      arrayDatas.push({
        "model": model,
        "key": keyMain,
        "data": data
      })
      return arrayDatas;
    }
    let count = parseInt((length / maxLength));
    if ((length % maxLength) != 0) {
      ++count;
    }
    if ((count + 1) > maxKeyChildCount) {
      // 防止数据量过大
      return null;
    }
    // 处理keys, 数据量比较大，需要分批存放
    for (let i = 0; i < count; i++) {
      keyChilds.push(key + (keyChildIndex++));
    }
    let dataMain = {
      "model": model,
      "key": keyMain,
      "data": JSON.stringify({ "ts": keyChilds[0], "tc": count })
    }
    arrayDatas.push(dataMain);
    // 对数据进行分割保存
    count = keyChilds.length;
    let dataStart = 0;
    for (let i = 0; i < count; i++) {
      let dataStr
      if (i === (count - 1)) {
        dataStr = data.substring(dataStart);
      } else {
        dataStr = data.substring(dataStart, dataStart + maxLength);
      }
      arrayDatas.push({
        "model": model,
        "key": keyChilds[i],
        "data": dataStr
      });
      dataStart += maxLength;
    }
    return arrayDatas;
  },
  // mainkeys 中的value都是子key
  _parseMainkeysValue(mainkeysData) {
    if (!mainkeysData) {
      return null;
    }
    if (typeof mainkeysData === "string") {
      try {
        mainkeysData = JSON.parse(mainkeysData);
      } catch (e) {
      }
    }
    // 错误兼容
    mainkeysData = mainkeysData.result ? mainkeysData.result : mainkeysData;
    mainkeysData = mainkeysData.results ? mainkeysData.results : mainkeysData;
    let mainKeyValue = null;
    if (!Array.isArray(mainkeysData)) {
      mainKeyValue = mainkeysData.data;
    } else {
      mainKeyValue = mainkeysData[0].data;
    }
    if (typeof mainKeyValue === "string") {
      try {
        mainKeyValue = JSON.parse(mainKeyValue);
      } catch (e) {
      }
    }
    let childKeys = [];
    if (mainKeyValue && mainKeyValue.ts && mainKeyValue.tc) {
      for (let i = 0; i < mainKeyValue.tc; i++) {
        childKeys.push(mainKeyValue.ts + i);
      }
      return childKeys;
    } else {
      return null;
    }
  },
  // 子key中的value合并
  _parseChildkeysValue(mainKey, childKeysValue) {
    if (!childKeysValue) {
      return null;
    }
    if (typeof childKeysValue === "string") {
      try {
        childKeysValue = JSON.parse(childKeysValue);
      } catch (e) {
      }
    }
    // 错误兼容
    childKeysValue = childKeysValue.result ? childKeysValue.result : childKeysValue;
    childKeysValue = childKeysValue.results ? childKeysValue.results : childKeysValue;
    if (!Array.isArray(childKeysValue) || childKeysValue.length === 0) {
      return null;
    }
    let resultData = childKeysValue[0];
    let totalData = "";
    let len = childKeysValue.length;
    for (let i = 0; i < len; i++) {
      totalData += childKeysValue[i].data;
    }
    resultData.data = totalData;
    resultData.key = mainKey;
    return resultData;
  },
  //@native end
}