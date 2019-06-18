/**
 * @export public
 * @doc_name 系统服务_云端配置
 * @doc_index 21
 * @module miot/service/storage
 * @description MIOT 云端提供的各种暂存服务, 包括文件上传,下载?
 *
 */
export default {
    /**
     * 读取米家的用户配置信息 /user/get_user_config（获取/user/set_user_config写入的用户配置）
     * @param {number} componentId 厂商APP_ID，需要向小米申请, 0 和 1 预留
     * @param {...number} keys 保存的数据索引，从0开始
     * @returns {Promise} key，value结构数据
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
     * @example
     * getThirdUserConfigs(model, k1,k2,k3).then(res => {...})
     */
    getThirdUserConfigs(model, ...keys) {
         return Promise.resolve(null);
    },
    /**
     * 写数据 /user/set_user_config
     * @param {string} componentId 厂商APP_ID，需要向小米申请，0和1预留
     * @param {*} data   key，value结构数据
     * @returns {Promise}
     */
    setUserConfigs(componentId, data) {
         return Promise.resolve(null);
    },
    /**
     * 写数据 /user/set_user_config
     * @param {string} model 
     * @param {number} key 
     * @param {json} data 
     */
    setThirdUserConfigs(model, key, data) {
         return Promise.resolve(null);
    }
}