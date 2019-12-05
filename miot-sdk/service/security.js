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
//@native begin
import native, { Properties } from "../native";
// result：格式
// const demo = {"bleshare":[
//                 {"keyid":183038048,
//                 "shareuid":"23912868",
//                 "status":"3",
//                 "active_time":"1499997061",
//                 "expire_time":"1531446661",
//                 "isoutofdate":0
//             }]}
function shareSecureKeyAPI(type, did, args, callback) {
    native.MIOTRPC.standardCall("/share/bluetoothkeyshare", { type, did, ...args }, callback)
}
function shareSecureKeyAPIWithNativeCall(type, did, args, callback) {
    native.MIOTRPC.nativeCall("/share/bluetoothkeyshare", { type, did, ...args }, callback)
}
//@native end
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
        //@native => 0
        return Properties.of(this).did;
    }
    /**
     * 电子钥匙 ID
     * @type {long}
     * @readonly
     */
    get keyID() {
        //@native => 0
        return Properties.of(this).data.keyid;
    }
    /**
     * 分享目标的uid
     * @type {string}
     * @readonly
     */
    get shareUserID() {
        //@native => 0
        return Properties.of(this).data.shareuid;
    }
    /**
     * 生效时间 UTC时间戳，单位为s, active_time
     * @type {long}
     */
    get activeTime() {
        //@native => 0
        return parseInt(Properties.of(this).data.active_time || 0);
    }
    set activeTime(active_time) {
        //@native
        Properties.of(this).data.active_time = active_time;
    }
    /**
     * 过期时间 UTC时间戳，单位为s, expire_time
     */
    get expireTime() {
        //@native => 0
        return parseInt(Properties.of(this).data.expire_time || 0);
    }
    set expireTime(expire_time) {
        //@native
        Properties.of(this).data.expire_time = expire_time;
    }
    /**
     * 生效日期（星期几，例如周一和周三对应1和3，[1, 3]，星期天对应0），仅在status=2时不可为空
     * @type {Array<int>}
     */
    get weekdays() {
        //@native :=> []
        const self = Properties.of(this);
        if (!self._weekdays) {
            self._weekdays = (self.data.weekdays || "")
                .split(",")
                .filter(w => w && w.length > 0)
                .map(w => parseInt(w))
        }
        return self._weekdays;
        //@native end
    }
    set weekdays(weekdays) {
        //@native begin
        if (!weekdays) return;
        if (Array.isArray(weekdays)) {
            weekdays = weekdays.join(",")
        }
        const self = Properties.of(this);
        self.data.weekdays = weekdays;
        self._weekdays = null;
        //@native end
    }
    /**
     * 分享类别，1：暂时，2：周期，3：永久
     * @type {int}
     */
    get status() {
        //@native => 1
        return Properties.of(this).data.status;
    }
    set status(status) {
        //@native
        return Properties.of(this).data.status = status;
    }
    /**
     * 是否过期
     * @returns boolean
     */
    isOutOfDate() {
        //@native begin => false
        let current = new Date().getTime() / 1000
        return current > this.expireTime
        // return Properties.of(this).data.isoutofdate;
        //@native end
    }
    /**
     * 保存 /share/bluetoothkeyshare
     * @returns {Promise}
     */
    save() {
        //@native :=> promise
        const self = Properties.of(this);
        if (!self.data.keyid) {
            return Promise.reject();
        }
        /**
            dataObj.put("type", "update");
            dataObj.put("did", did);
            dataObj.put("keyid", keyId);
            dataObj.put("status", status);
            dataObj.put("active_time", activeTime);
            dataObj.put("expire_time", expireTime);
            dataObj.put("weekdays", sb.toString());
         */
        return new Promise((resolve, reject) => {
            shareSecureKeyAPI("update", this.deviceID, self.data, (ok, res) => {
                if (ok) {
                    return resolve(true);
                }
                reject(res);
            })
        })
        //@native end
    }
    /**
     * 删除 /share/bluetoothkeyshare
     * @returns {Promise}
     */
    remove() {
        //@native :=> promise false
        const self = Properties.of(this);
        if (!self.data.keyid) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            shareSecureKeyAPIWithNativeCall("bledelete", this.deviceID, { keyid: self.data.keyid }, (ok, res) => {
                if (ok) {
                    //TODO ???
                    self.data = {};
                    return resolve(true);
                }
                reject(res);
            })
        });
        //@native end
    }
}
/**
 * @export
 */
export default {
    /**
     * 加载设备的安全锁 /share/bluetoothkeyshare
     * @param {*} deviceID 设备ID
     * @returns {Promise<ISecureKey[]>}
     */
    loadSecureKeys(deviceID) {
        //@native :=> promise []
        return new Promise((resolve, reject) => {
            shareSecureKeyAPI("get", deviceID, {}, (ok, res) => {
                if (!ok || !res || !res.bleshare) {
                    return reject(res);
                }
                resolve(res.bleshare.map(data => {
                    return Properties.init(new ISecureKey(), { data, did: deviceID });
                }));
            })
        })
        //@native end
    },
    /**
     * 分享蓝牙锁的钥匙 /share/bluetoothkeyshare
     * 锁固件版本在 2.0.0 及以上， 不支持钥匙的分享
     * @param deviceID 被分享设备ID
     * @param shareUid 被分享人
     * @param {{status,activeTime,expireTime,weekdays,readonly}} [settings={}] readonly = true, 则被分享人不可接收锁push，false则被分享人可接收锁push，（family关系用户不受这个字段影响）。status:分享类别，1：暂时，2：周期，3：永久; weekdays 生效日期（星期几，例如周一和周三对应1和3，[1, 3]），仅在status=2时不可为空
     * @returns {Promise<ISecureKey>}
     *
     */
    shareSecureKey(deviceID, shareUid, settings = {}) {
        //@native :=> promise
        //需要检查各种数据
        const data = {
            status: settings.status || 0,
            active_time: settings.activeTime,
            expire_time: settings.expireTime,
            weekdays: Array.isArray(settings.weekdays)
                ? settings.weekdays.join(",") : settings.weekdays
        }
        return new Promise((resolve, reject) => {
            //需要先从服务端获取对应的 小米账号id， 因为目标值可能为邮箱或手机号
            native.MIOTRPC.nativeCall("/home/profile", { id: shareUid }, (ok, res) => {
                if (!ok) {
                    return reject(res);
                }
                return resolve(res)
            })
        }).then(res => {
            if (res.result && res.result.userid) {
                const uid = res.result.userid
                return new Promise((resolve, reject) => {
                    shareSecureKeyAPI("bleshare", deviceID, {
                        userid: res.result.userid, ...data, readonly: settings.readonly
                    }, (ok, res) => {
                        console.log("shareSecureKey with response: ", ok, res)
                        if (ok && res.keyid) {
                            //TODO 数据应该是从 res 来, 但现在并没有确认这件事
                            //从用户反馈：res中返回带有keyid，同时需要填充shareUID
                            const keydata = { shareuid: uid, ...res, ...data }
                            console.log('elements uid:', uid, ' res:', res, ' data:', data, " all:", keydata)
                            return resolve(Properties.init(new ISecureKey(), { data: keydata, did: deviceID }));
                        } else if (ok && res == 'ok') {
                            //如果res为ok，则表示该用户已经被分享过
                            return reject({ code: -101, message: 'key already shared to target user' })
                        }
                        reject(res);
                    })
                });
            }
            return new Promise.reject("share user not found ", shareUid)
        });
        //@native end
    },
    /**
     * 获取锁绑定信息, /device/blelockbindinfo 返回数据格式：{"bindtime":1505180216}
     *
     * @param {*} deviceID
     * @returns {Promise<json>}
     *
     */
    getLockBindInfo(deviceID) {
        //@native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTRPC.standardCall("/device/blelockbindinfo", { did: deviceID }, (ok, res) => {
                if (ok && res) {
                    return resolve(res);
                }
                reject(res);
            })
        })
        //@native end
    }
}