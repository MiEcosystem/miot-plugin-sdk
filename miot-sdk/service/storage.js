/**
 * @export public
 * @doc_name 系统服务_云端配置
 * @doc_index 19
 * @module miot/service/storage
 * @description MIOT 云端提供的各种暂存服务, 包括文件上传,下载?
 *
 */
export default {
    /**
     * 读数据 /user/get_user_config
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
     * 读取三方数据 /user/get_third_user_config
     * @param {string} model device model
     * @param  {...number} keys key 列表
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