/**
 * @export
 * @module miot/service/security
 * @description 安全相关服务
 */

import native, {Properties} from "../native"

// result：格式
// const demo = {"bleshare":[
//                 {"keyid":183038048,
//                 "shareuid":"23912868",
//                 "status":"3",
//                 "active_time":"1499997061",
//                 "expire_time":"1531446661",
//                 "isoutofdate":0
//             }]}
 
function shareSecureKeyAPI(type, did, args, callback){
    native.MIOTRPC.standardCall("/share/bluetoothkeyshare", {type, did, ...args}, callback)
}

/**
 * 安全锁
 * @interface
 * 
 */
export class ISecureKey{
    get deviceID(){
        return Properties.of(this).did;
    }
    get keyID(){
        return Properties.of(this).data.keyid;
    }
    /**
     * 分享目标的uid
     */
    get shareUserID(){
        return Properties.of(this).data.shareuid;
    }
    /**
     * 生效时间 UTC时间戳，单位为s
     */
    get activeTime(){
        return parseInt(Properties.of(this).data.active_time||0);
    }
    set activeTime(active_time){
        Properties.of(this).data.active_time = active_time;
    }
    /**
     * 过期时间 UTC时间戳，单位为s
     */
    get expireTime(){
        return parseInt(Properties.of(this).data.expire_time||0);
    }
    set expireTime(expire_time){
        Properties.of(this).data.expire_time = expire_time;
    }
    /**
     * 生效日期（星期几，例如周一和周三对应1和3，[1, 3]，星期天对应0），仅在status=2时不可为空
     * @type {Array<int>}
     */
    get weekdays(){
        const self = Properties.of(this);
        if(!self._weekdays){
            self._weekdays = (self.data.weekdays || "")
                .split(",")
                .filter(w=>w&&w.length>0)
                .map(w=>parseInt(w))
        }
        return self._weekdays;
    }
    set weekdays(weekdays){
        if(!weekdays)return;
        if(Array.isArray(weekdays)){
            weekdays = weekdays.join(",")
        } 
        const self = Properties.of(this);
        self.data.weekdays = weekdays;
        self._weekdays = null;
    }
    /**
     * 分享类别，1：暂时，2：周期，3：永久
     * @type {int} 
     */
    get status(){
        return Properties.of(this).data.status;
    }
    set status(status){
        return Properties.of(this).data.status = status;
    }
    get isOutOfDate(){
        return Properties.of(this).data.isoutofdate;
    }
    
    /**
     * @returns {Promise<boolean>}
     */
    save(){
        const self = Properties.of(this);
        if(!self.data.keyid){
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
        return new Promise((resolve, reject)=>{
            shareSecureKeyAPI("update", this.deviceID, self.data, (ok,res)=>{
                if(ok){
                    return resolve(true);
                }
                reject(res);
            })
        })
    }
    /**
     * @returns {Promise<boolean>}
     */
    remove(){
        const self = Properties.of(this);
        if(!self.data.keyid){
            return Promise.reject();
        }
        return new Promise((resolve, reject)=>{
            shareSecureKeyAPI("bledelete", this.deviceID, {keyid:self.keyid}, (ok, res)=>{
                if(ok){
                    //TODO ???
                    self.data={};
                    return resolve(true);
                }
                reject(res);
            })
        });
    }
}



export default {
    /**
     * 加载设备的安全锁
     * @param {*} deviceID 
     * @returns {Promise<ISecureKey[]>}
     */
    loadSecureKeys(deviceID){
        return new Promise((resolve, reject)=>{
            shareSecureKeyAPI("get", deviceID, {}, (ok, res)=>{
                if(!ok || !res || !res.bleshare){
                    return reject(res);
                }
                resolve(res.bleshare.map(data=>{
                    return Properties.init(new ISecureKey(), {data, did:deviceID});
                }));
            })
        })
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
        //需要检查各种数据
        const data = { 
            status:settings.status||0,
            active_time:settings.activeTime,
            expire_time:settings.expireTime,
            weekdays:Array.isArray(settings.weekdays)
                ?weekdays.join("?"):weekdays
        }
        shareSecureKeyAPI("bleshare", deviceID, {
            userid:shareUid, ...data, readonly:settings.readonly
        }, (ok, res)=>{
            if(ok){
                //TODO 数据应该是从 res 来, 但现在并没有确认这件事
                return resolve(Properties.init(new ISecureKey(), {data, did:deviceID}));
            }
            reject(res);
        })
    },

    /**
     * 获取锁绑定信息
     * 
     * @param {*} deviceID 
     * @returns {Promise<json>} 
     *   返回数据格式：{"bindtime":1505180216}
     */
    getLockBindInfo(deviceID){
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.standardCall("/device/blelockbindinfo", {did:deviceID}, (ok, res)=>{
                if(ok && res){
                    return resolve(res);
                }
                reject(res);
            })
        })
    }

}