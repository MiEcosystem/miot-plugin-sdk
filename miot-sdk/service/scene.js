/**
 * @export
 * @module miot/service/scene
 * @description 场景相关服务, 尤其是定时服务
 * 
 * 需要确定是不是在这里统一实现一个完整的定时器的管理, 避免每一次都要重新实现 
 * 
 */
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
         return  0
    }
    /**
     * @member
     * @type {boolean}
     * @readonly
     */
    get isNew(){
         return  false
    }
    /**
     * @member
     * @type {long}
     * @readonly
     */
    get createTime(){
         return  0
    }
    /**
     * @member
     * @type {int}
     * @readonly
     */
    get status(){
         return  0
    }
    /**
     * @member
     * @type {string}
     * @readonly
     */
    get deviceID(){
         return  0
    }
    /**
     * @member
     * @type {string} 
     */
    get name(){
         return  ""
    }
    set name(name){
    }
    /**
     * @member
     * @type {SceneType}
     * @readonly 
     */
    get type(){
         return  0
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
         return  ""
    }
    set identify(identify){
    }
    // get data(){
    //     return Properties.of(this).data;
    // }
    /**
     * @member
     * @type {json}
     */
    get setting(){
         return  {}
    }
    set setting(setting){
    }
    /**
     * @member
     * @type {Array<String>}
     */
    get authorizedDeviceIDs(){
         return  []
    }
    set authorizedDeviceIDs(...deviceIDs){
    }
    /**
     * 保存场景
     * @param {json} opt {authed:[...]}
     * @returns {Promise<boolean>}
     */
    save(opt=null){ 
         return Promise.resolve(null);
    }
    /**
     * 重新加载场景数据
     * @returns {Promise<boolean>}
     */
    reload(){
         return Promise.resolve(null);
    }
    /**
     * 启动场景
     * @returns {Promise<boolean>}
     */
    start(){
         return Promise.resolve(null);
    }
    /**
     * @returns {Promise<boolean>}
     */
    remove(){
         return Promise.resolve(null);
    }
}
function createScene(deviceID, sceneType, opt=null){
     return Promise.resolve(null);
}
function loadScenes(deviceID, sceneType, opt=null){
     return Promise.resolve(null);
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
    createScene,
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
    loadScenes,
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
 