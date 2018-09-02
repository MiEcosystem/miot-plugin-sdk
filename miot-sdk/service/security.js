/**
 * @export
 * @module miot/service/security
 * @description 安全相关服务
 */
/**
 * 安全锁
 * @interface
 * 
 */
export class ISecureKey{
    get deviceID(){
         return  0
    }
    get keyID(){
         return  0
    }
    /**
     * 分享目标的uid
     */
    get shareUserID(){
         return  0
    }
    /**
     * 生效时间 UTC时间戳，单位为s
     */
    get activeTime(){
         return  0
    }
    set activeTime(active_time){
    }
    /**
     * 过期时间 UTC时间戳，单位为s
     */
    get expireTime(){
         return  0
    }
    set expireTime(expire_time){
    }
    /**
     * 生效日期（星期几，例如周一和周三对应1和3，[1, 3]，星期天对应0），仅在status=2时不可为空
     * @type {Array<int>}
     */
    get weekdays(){
         return []
    }
    set weekdays(weekdays){
    }
    /**
     * 分享类别，1：暂时，2：周期，3：永久
     * @type {int} 
     */
    get status(){
         return  1
    }
    set status(status){
    }
    get isOutOfDate(){
         return  false
    }
    
    /**
     * @returns {Promise<boolean>}
     */
    save(){
         return Promise.resolve(null);
    }
    /**
     * @returns {Promise<boolean>}
     */
    remove(){
         return Promise.resolve(false);
    }
}
export default {
    /**
     * 加载设备的安全锁
     * @param {*} deviceID 
     * @returns {Promise<ISecureKey[]>}
     */
    loadSecureKeys(deviceID){
         return Promise.resolve(null);
    },
    /**
     * @param deviceID
     * @param shareUid 被分享人
     * @param {json} settings
     *  {
     *      status
     *      activeTime
     *      expireTime
     *      weekdays
     *      readonly 被分享人不可接收锁push，false：被分享人可接收锁push，（family关系用户不受这个字段影响）
     *  }
     *  @returns {Promise<ISecureKey>}
     */
    shareSecureKey(deviceID, shareUid, settings={}){ 
         return Promise.resolve(null);
    },
    /**
     * 获取锁绑定信息
     * 
     * @param {*} deviceID 
     * @returns {Promise<json>} 
     *   返回数据格式：{"bindtime":1505180216}
     */
    getLockBindInfo(deviceID){
         return Promise.resolve(null);
    }
}