/**
 * @export
 * @module miot/service/storage
 * @description MIOT 云端提供的各种暂存服务, 包括文件上传,下载?
 *
 */
export default {
    /**
     * 读数据 /user/get_user_config
     * @param {string} componentId 厂商APP_ID，需要向小米申请, 0 和 1 预留
     * @param {...string} keys 保存的数据索引，从0开始
     * @returns {Promise} key，value结构数据
     */
    getUserConfigs(componentId,...keys){
         return Promise.resolve(null);
    },
    /**
     * 写数据 /user/set_user_config
     * @param {string} componentId 厂商APP_ID，需要向小米申请，0和1预留
     * @param {*} data   key，value结构数据
     * @returns {Promise}
     */
    setUserConfigs(componentId,data){
         return Promise.resolve(null);
    }
}