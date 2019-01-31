/**
 * @export
 * @module miot/service/scene
 * @description 场景相关服务, 包括定时,人工与自动场景
 * @example
 *
 *  import {Service, Device, SceneType} from 'miot';
 *
 *   Service.scene.loadScenes(Device.deviceID, SceneType.Timer)
 *   .then((sceneArr) => {
 *      if(sceneArr.length > 0){
 *         const scene = sceneArr[0];
 *         scene.setting.enable_push = 1;
 *         ...
 *         scene.save().then((res)=>{
 *            console.log(res)
 *         });
 *      }
 *  });
 * @example
 *    Service.scene.loadArtificialScenes(Device.deviceID, {name:'...', identify:'...'})
 *    .then(arr=>{...}).catch(err=>{...})
 *
 * @example
 * 
 *   Device.loadTimerScenes().then((sceneArr) => {
 *     ...
 *   })
 *   .catch(err=>{
 *      console.log(err)
 *   })
 */
/**
 * 场景类型
 * @namespace SceneType
 */
export const SceneType={
    /**
     * 定时场景
     * @const
     */
    Timer:8,
    /**
     * 人工场景
     * @const
     */
    Artificial:30,
    /**
     * 自动场景
     * @const
     */
    Automatic:15
};
Object.freeze(SceneType)
/**
 * 场景
 * @interface
 *
 */
export class IScene{
    /**
     *
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
     * 授权对象 authed
     * @member
     * @type {Array<String>}
     */
    get authorizedDeviceIDs(){
         return  []
    }
    set authorizedDeviceIDs(deviceIDs){
    }
    /**
     * 保存场景 /scene/edit
     * @param {json} opt {authed:[...], name, identify, setting}
     * @returns {Promise<IScene>}
     * 
     * @example 
     * scene.save({setting:{...}}).then(scene=>{...})
     * 
     * @example
     * scene.save().then(scene=>{...}).catch(err=>{...})
     *  
     * 
     */
    save(opt=null){
        if(opt){
            if(opt.name){
                this.name = opt.name;
            }
            if(opt.identify){
                this.identify = opt.identify;
            }
            if(opt.setting){
                this.setting = opt.setting;
            }
            if(opt.authed && opt.authed.length > 0){
                this.authorizedDeviceIDs = opt.authed;
            }
        }
         return Promise.resolve(null);
    }
    /**
     * 重新加载场景数据 /scene/get
     * @returns {Promise<IScene>}
     */
    reload(){
         return Promise.resolve(null);
    }
    /**
     * 启动场景 /scene/start
     * @returns {Promise<IScene>}
     */
    start(){
         return Promise.resolve(false);
    }
    /**
     * 删除场景 /scene/delete
     * @returns {Promise<IScene>}
     */
    remove(){
         return Promise.resolve(false);
    }
}
function createScene(deviceID, sceneType, opt=null){
     return Promise.resolve(null);
}
function loadScenes(deviceID, sceneType, opt=null){
     return Promise.resolve(null);
}
/**
 * @export
 */
export default {
    /**
     * 创建场景
     * @param {string} deviceID
     * @param {int} sceneType
     * @param {{identify,name}} opt {identify,name}
     * @returns {IScene}
     * @example
     * 
     * import {Service, Device, SceneType} from 'miot'
     * const scene = Service.scene.createScene(Device.deviceID, SceneType.Timer, {
     *      identify:'identify',
     *      name:'myTimer',
     *      setting:{...}
     * });
     * 
     * scene.save().then(scene=>{
     *   ...
     * })
     * 
     * 
     */
    createScene,
    /**
     * 创建定时场景  
     * same as createScene(deviceID, SceneType.Timer, opt);
     * @param {string} deviceID
     * @param {json} opt
     * @returns {IScene}
     * @example
     * import {Service, Device, SceneType} from 'miot'
     * const settinig = {
     *  enable_timer: true,
     *  on_time: * * * * *, //crontab string, minute hour day month week
     *  enable_timer_on: true,
     *  off_time: * * * * *, //crontab string
     *  enable_timer_off: true,
     *  onMethod: 'method_name', //咨询硬件工程师
     *  on_param: 'param', //咨询硬件工程师
     *  off_method: 'method_name', //咨询硬件工程师
     *  off_param: 'param', //咨询硬件工程师
     * }
     * 
     * const scene = Service.scene.createTimerScene(Device.deviceID, {
     *      identify:'identify',
     *      name:'myTimer',
     *      setting:settinig
     * });
     * 
     * scene.save().then(scene=>{
     *   ...
     * })
     */
    createTimerScene(deviceID, opt){
        return createScene(deviceID, SceneType.Timer, opt);
    },
    /**
     * 创建人工场景
     * same as createScene(deviceID, SceneType.Timer, opt);
     * @param {string} deviceID
     * @param {json} opt
     * @returns {IScene}
     */
    createArtificialScene(deviceID, opt){
        return createScene(deviceID, SceneType.Artificial, opt);
    },
    /**
     * 创建自动场景
     * same as createScene(deviceID, SceneType.Automatic, opt);
     * @param {string} deviceID
     * @param {json} opt
     * @returns {IScene}
     */
    createAutomaticScene(deviceID, opt){
        return createScene(deviceID, SceneType.Automatic, opt);
    },
    /**
     * 获取场景列表 /scene/list
     * @param {*} deviceID
     * @param {*} sceneType
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadScenes,
    /**
     * 加载定时场景 /scene/list
     * @param {*} deviceID
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadTimerScenes(deviceID, opt=null){
        return loadScenes(deviceID, SceneType.Timer, opt);
    },
    /**
     * 加载人工场景 /scene/list
     * @param {*} deviceID
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadArtificialScenes(deviceID, opt=null){
        return loadScenes(deviceID, SceneType.Artificial, opt);
    },
    /**
     * 加载自动场景 /scene/list
     * @param {*} deviceID
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadAutomaticScenes(deviceID, opt=null){
        return loadScenes(deviceID, SceneType.Automatic, opt);
    }
}