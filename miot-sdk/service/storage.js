/**
 * @export
 * @module miot/service/storage
 * @description MIOT 云端提供的各种暂存服务, 包括文件上传,下载?
 * 
 */
export default {
    /**
     * 读数据
     * @param {string} componentId 
     * @param {...string} keys 
     * @returns {Promise}
     */
    getUserConfigs(componentId,...keys){
         return Promise.resolve(null);
    },
    /**
     * 写数据
     * @param {string} componentId 
     * @param {*} data 
     * @returns {Promise}
     */
    setUserConfigs(componentId,data){
         return Promise.resolve(null);
    }
}