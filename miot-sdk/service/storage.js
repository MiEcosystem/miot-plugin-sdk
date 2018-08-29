/**
 * @export
 * @module miot/service/storage
 * @description MIOT 云端提供的各种暂存服务, 包括文件上传,下载?
 * 
 */

import native from '../native'

export default {
    /**
     * 读数据
     * @param {string} componentId 
     * @param {} keys 
     * @returns {Promise}
     */
    getUserConfigs(componentId,keys){
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.standardCall("/user/get_user_config", 
                {"component_id":componentId, keys}, (ok, res)=>{
                    if(ok){
                        return resolve(res)
                    }
                    reject(res);
                });
        });
    },
    /**
     * 写数据
     * @param {string} componentId 
     * @param {*} data 
     * @returns {Promise}
     */
    
    setUserConfigs(componentId,data){
        const params = Object.keys(data||[]).map(key=>({"component_id":componentId, key, data:data[key]||{}}))
        if(!componentId || params.length < 1){
            return Promise.reject();
        }
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.standardCall("/user/set_user_config", params, (ok, res)=>{
                    if(ok && res != 0){
                        return resolve(ok)
                    }
                    reject(res);
                });
        });
    }
}