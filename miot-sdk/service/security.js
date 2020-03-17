/*
 * @description: 
 * @since: 
 * @author: 
 * @Date: 2019-10-14 19:39:26
 * @param: 
 * @example: 
 */
/**
 * @export public
 * @doc_name 安全模块
 * @doc_index 3
 * @doc_directory service
 * @module miot/service/security
 * @description 安全相关服务
 * @example
 *
 * import {Service} from 'miot'
 *
 * Service.security.shareSecureKey(deviceID, shareUid, {})
 *  .then(secureKey=>{
 *     ...
 *  })
 *
 * Service.security.loadSecureKeys(deviceID).then(secureKeys=>{
 *    if(secureKeys.length > 0){
 *       const key = secureKeys[0];
 *       key.status = 1;
 *       key.save().then(key=>{...})
 *    }
 * })
 *
 */
/**
 * 安全锁
 * @interface
 *
 */
export class ISecureKey {
    /**
     * 设备 ID
     * @type {long}
     * @readonly
     */
    get deviceID() {
         return  0
    }
    /**
     * 电子钥匙 ID
     * @type {long}
     * @readonly
     */
    get keyID() {
         return  0
    }
    /**
     * 分享目标的uid
     * @type {string}
     * @readonly
     */
    get shareUserID() {
         return  0
    }
    /**
     * 生效时间 UTC时间戳，单位为s, active_time
     * @type {long}
     */
    get activeTime() {
         return  0
    }
    set activeTime(active_time) {
    }
    /**
     * 过期时间 UTC时间戳，单位为s, expire_time
     */
    get expireTime() {
         return  0
    }
    set expireTime(expire_time) {
    }
    /**
     * 生效日期（星期几，例如周一和周三对应1和3，[1, 3]，星期天对应0），仅在status=2时不可为空
     * @type {Array<int>}
     */
    get weekdays() {
         return []
    }
    set weekdays(weekdays) {
    }
    /**
     * 分享类别，1：暂时，2：周期，3：永久
     * @type {int}
     */
    get status() {
         return  1
    }
    set status(status) {
    }
    /**
     * 是否过期
     * @returns boolean
     */
    @report
    isOutOfDate() {
         return false
    }
    /**
     * 保存 /share/bluetoothkeyshare
     * @returns {Promise}
     */
    @report
    save() {
         return Promise.resolve(null);
    }
    /**
     * 删除 /share/bluetoothkeyshare
     * @returns {Promise}
     */
    @report
    remove() {
         return Promise.resolve(false);
    }
}
/**
 * @export
 */
class ISecurity {
    /**
     * 加载设备的安全锁 /share/bluetoothkeyshare
     * @param {*} deviceID 设备ID
     * @returns {Promise<ISecureKey[]>}
     */
    @report
    loadSecureKeys(deviceID) {
         return Promise.resolve([]);
    }
    /**
     * 分享蓝牙锁的钥匙 /share/bluetoothkeyshare
     * 锁固件版本在 2.0.0 及以上， 不支持钥匙的分享
     * @param deviceID 被分享设备ID
     * @param {string} shareUid 被分享人
     * @param {{status,activeTime,expireTime,weekdays,readonly}} [settings={}] readonly = true, 则被分享人不可接收锁push，false则被分享人可接收锁push，（family关系用户不受这个字段影响）。status:分享类别，1：暂时，2：周期，3：永久; weekdays 生效日期（星期几，例如周一和周三对应1和3，[1, 3]），仅在status=2时不可为空
     * @returns {Promise<ISecureKey>} 分享成功返回锁的信息；reject的时候返回的是object，如果该锁已经分享给被分享人会返回失败，错误码为-101；其他错误情形留意返回的错误信息
     *
     */
    @report
    shareSecureKey(deviceID, shareUid, settings = {}) {
         return Promise.resolve(null);
    }
    /**
     * 获取锁绑定信息, /device/blelockbindinfo 返回数据格式：{"bindtime":1505180216}，bindtime是锁的绑定时间
     *
     * @param {string} deviceID
     * @returns {Promise<json>}
     *
     */
    @report
    getLockBindInfo(deviceID) {
         return Promise.resolve(null);
    }
}
const SecurityInstance = new ISecurity();
export default SecurityInstance;