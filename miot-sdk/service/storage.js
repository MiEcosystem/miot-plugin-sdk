/**
 * @export public
 * @doc_name 云端配置
 * @doc_index 6
 * @doc_directory service
 * @module miot/service/storage
 * @description MIOT 云端提供的各种暂存服务, 包括文件上传,下载?
 *
 */
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
     return Promise.resolve(null);
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
     return Promise.resolve(null);
  },
  /**
   * 写数据 /user/set_user_config
   * @param {string} componentId 厂商APP_ID(Cloud ID)，需要向小米申请，0和1预留
   * @param {*} data   key，value结构数据
   * @returns {Promise}
   * @deprecated 10023开始废弃，建议使用 setThirdUserConfigsForOneKey, data数据量支持分段保存
   */
  setUserConfigs(componentId, data) {
     return Promise.resolve(null);
  },
  /**
   * 写数据 /user/set_user_config， data的数据量不能超过2048字节
   * @param {string} model 
   * @param {number} key 
   * @param {json} data
   * @deprecated 10023开始废弃，建议使用setThirdUserConfigsForOneKey, data数据量支持分段保存
   */
  setThirdUserConfigs(model, key, data) {
     return Promise.resolve(null);
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
   */
  setThirdUserConfigsForOneKey(model, key, data) {
     return Promise.resolve(null);
  },
  /**
   * 与setThirdUserConfigsForOneKey配套使用，会把分段的数据自动合并后返回，使得分段行为对调用者透明
   * @since 10023
   * @param model
   * @param key
   * @returns {Promise<any>}
   */
  getThirdUserConfigsForOneKey(model, key) {
     return Promise.resolve(null);
  },
}