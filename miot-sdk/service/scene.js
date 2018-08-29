/**
 * @export
 * @module miot/service/scene
 * @description 场景相关服务, 尤其是定时服务
 * 
 * 需要确定是不是在这里统一实现一个完整的定时器的管理, 避免每一次都要重新实现 
 * 
 */

import native, {Properties} from "../native";

/**
 * 场景类型
 * @enum
 */
export const SceneType={
    /**
     * 定时场景
     */
    get Timer(){return 8;},
    /**
     * 人工场景
     */
    get Artificial(){return 30;},
    /**
     * 自动场景
     */
    get Automatic(){return 15;}
};


/**
 * 场景
 * @interface
 * 
 */
export class IScene{

    /**
     * @member
     * @type {int}
     * @readonly
     */
    get sceneID(){
        return Properties.of(this).data.us_id
    }

    /**
     * @member
     * @type {boolean}
     * @readonly
     */
    get isNew(){
        return this.sceneID;
    }

    // get userID(){
    //     return Properties.of(this).data.uid;
    // }

    /**
     * @member
     * @type {long}
     * @readonly
     */
    get createTime(){
        return Properties.of(this).data.create_time;
    }

    /**
     * @member
     * @type {int}
     * @readonly
     */
    get status(){
        return Properties.of(this).data.status || 0;
    }

    /**
     * @member
     * @type {string}
     * @readonly
     */
    get deviceID(){
        return Properties.of(this).deviceID;
    }

    /**
     * @member
     * @type {string} 
     */
    get name(){
        return Properties.of(this).data.name
    }

    set name(name){
        Properties.of(this).data.name = name;
    }

    /**
     * @member
     * @type {SceneType}
     * @readonly 
     */
    get type(){
        return Properties.of(this).data.st_id
    }

    /**
     * @member
     * @type {boolean}
     * @readonly
     */
    get isTimer(){
        return this.type + "" == SceneType.Timer + "";
    }

    /**
     * @member
     * @type {boolean}
     * @readonly
     */
    get isArtificial(){
        return this.type + "" == SceneType.Artificial + "";
    }

    /**
     * @member
     * @type {readonly}
     * @readonly
     */
    get isAutomatic(){
        return this.type + "" == SceneType.Automatic + "";
    }

    /**
     * @member
     * @type {string}
     */
    get identify(){
        return Properties.of(this).data.identify;
    }

    set identify(identify){
        Properties.of(this).data.identify = identify
    }

    // get data(){
    //     return Properties.of(this).data;
    // }

    /**
     * @member
     * @type {json}
     */
    get setting(){
        return Properties.of(this).data.setting||{};
    }

    set setting(setting){
        return Properties.of(this).data.setting = setting||{};
    }

    /**
     * @member
     * @type {Array<String>}
     */
    get authorizedDeviceIDs(){
        return Properties.of(this).data.authed||[this.deviceID]
    }

    set authorizedDeviceIDs(...deviceIDs){
        Properties.of(this).data.authed = deviceIDs.map(id=>id+"");
    }

    /**
     * 保存场景
     * @param {json} opt {authed:[...]}
     * @returns {Promise<boolean>}
     */
    save(opt=null){ 
        return new Promise((resolve, reject)=>{ 
            const params = {
                us_id:this.sceneID,
                st_id:this.type,
                identify: this.identify, 
                setting: this.setting,
                authed:this.authorizedDeviceIDs
            };
            if(this.name){
                params.name=name;
            }
            native.MIOTRPC.standardCall("/scene/edit", param, (ok, res)=>{
                if(ok){
                    const {data} = Properties.of(this)
                    data.us_id = data.us_id || res.us_id;
                    data.status = data.status;
                    return resolve(true)
                }else{
                    return reject(res)
                }
            });  
        });
    }

    /**
     * 重新加载场景数据
     * @returns {Promise<boolean>}
     */
    reload(){
        if(this.isNew){
            return Promise.reject(false);
        }
        const self = Properties.of(this);
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.standardCall("/scene/get", {us_id:this.sceneID}, (ok, res)=>{
                if(ok && res.result){
                    self.data = res.result;

                    return resolve(true);
                }
                reject(res)
            });
        })
    }

    /**
     * 启动场景
     * @returns {Promise<boolean>}
     */
    start(){
        if(this.isNew){
            return Promise.reject(false);
        }
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.standardCall("/scene/start", {us_id:this.sceneID}, (ok, res)=>{
                ok&&resolve(true)
                !ok&&reject(false)
            })
        })
    }

    /**
     * @returns {Promise<boolean>}
     */
    remove(){
        if(this.isNew){
            return Promise.resolve(true);
        }
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.standardCall("/scene/delete", {us_id:this.sceneID}, (ok, res)=>{
                if(ok){
                    Properties.of(this).data.us_id = 0;
                    return resolve(true);
                }
                reject(res);
            });
        });
    }
}

function createScene(deviceID, sceneType, opt=null){
    const {identify, name} = opt||{};
    return Properties.init(new IScene(), {data:{st_id:sceneType, identify,name, authed:[deviceID+""], 
        setting:{}}, deviceID});
}

function loadScenes(deviceID, sceneType, opt=null){
    const params = {
        did:deviceID, 
        st_id:sceneType,
        type:0 //强制是云端
    };
    const {identify, name} = opt||{};
    if(identify){
        params.identify = identify;
    }
    if(name){
        params.name = name;
    }
    return new Promise((resolve, reject)=>{
        native.MIOTRPC.standardCall("/scene/list", params, (ok, res)=>{
            if(!ok || !res){
                return reject(res);
            }
            resolve(Object.keys(res).map(k=>{ 
                return Properties.init(new IScene(), {data:{name, identify,...res[k],st_id:sceneType}, deviceID});
            }));
        })
    })
}

/**
 * export
 */
export default {
    /**
     * 创建场景
     * @param {*} deviceID 
     * @param {*} sceneType 
     * @param {json} opt {identify,name}
     * @returns {IScene}
     */
    createScene:createScene,

    /**
     * 创建定时场景
     * @param {*} deviceID 
     * @param {*} opt 
     * @returns {IScene}
     */
    createTimerScene(deviceID, opt){
        return createScene(deviceID, SceneType.Timer, opt);
    },
    /**
     * 创建人工场景
     * @param {*} deviceID 
     * @param {*} opt 
     * @returns {IScene}
     */
    createArtificialScene(deviceID, opt){
        return createScene(deviceID, SceneType.Artificial, opt);
    },
    /**
     * 创建自动场景
     * @param {*} deviceID 
     * @param {*} opt 
     * @returns {IScene}
     */
    createAutomaticScene(deviceID, opt){
        return createScene(deviceID, SceneType.Automatic, opt);
    },

    /**
     * 
     * @param {*} deviceID 
     * @param {*} sceneType 
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadScenes:loadScenes,

    /**
     * 加载定时场景
     * @param {*} deviceID 
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadTimerScenes(deviceID, opt=null){
        return loadScenes(deviceID, SceneType.Timer, opt);
    },

    /**
     * 加载人工场景
     * @param {*} deviceID 
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadArtificialScenes(deviceID, opt=null){
        return loadScenes(deviceID, SceneType.Artificial, opt);
    },

    /**
     * 加载自动场景
     * @param {*} deviceID 
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadAutomaticScenes(deviceID, opt=null){
        return loadScenes(deviceID, SceneType.Automatic, opt);
    }
}
 
