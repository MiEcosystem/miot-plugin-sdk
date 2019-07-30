/**
 * @export public 
 * @doc_name 系统服务_场景模块
 * @doc_index 17
 * @module miot/service/scene
 * @description 场景相关服务, 包括定时,人工与自动场景 
 *    
 * @example
 *
 *  import {Service, Device, SceneType} from 'miot';
 *   //加载此设备所有的定时场景
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
 *    //加载此设备名称为name，类别为identify的所有人工场景
 *    Service.scene.loadArtificialScenes(Device.deviceID, {name:'...', identify:'...'})
 *    .then(arr=>{...}).catch(err=>{...})
 *
 * @example
 *   //加载此设备的所有定时场景
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
export const SceneType = {
    /**
     * 定时场景
     * @const
     */
    Timer: 8,
    /**
     * 人工场景
     * @const
     */
    Artificial: 30,
    /**
     * 自动场景
     * @const
     */
    Automatic: 15
};
Object.freeze(SceneType)
/**
 * 场景
 * @interface
 *
 */
export class IScene {
    /**
     *
     * 场景id
     * @member
     * @type {int}
     * @readonly
     */
    get sceneID() {
         return  0
        return Properties.of(this).data.us_id
    }
    /**
     * 是否是新的场景
     * @member
     * @type {boolean}
     * @readonly
     */
    get isNew() {
         return  false
    }
    /**
     * 场景的创建时间
     * @member
     * @type {long}
     * @readonly
     */
    get createTime() {
         return  0
    }
    /**
     * 场景是否开启
     * @member
     * @type {int}
     * @readonly
     */
    get status() {
         return  0
    }
    /**
     * 定时场景的设备的did
     * @member
     * @type {string}
     * @readonly
     */
    get deviceID() {
         return  0
    }
    /**
     * 场景名称
     * @member
     * @type {string}
     */
    get name() {
         return  ""
    }
    set name(name) {
    }
    /**
     * 场景类型，只读
     * @member
     * @type {SceneType}
     * @readonly
     */
    get type() {
         return  0
    }
    /**
     * 是否是定时场景，只读
     * @member
     * @type {boolean}
     * @readonly
     */
    get isTimer() {
        return this.type + "" == SceneType.Timer + "";
    }
    /**
     * 是否是人工场景，只读
     * @member
     * @type {boolean}
     * @readonly
     */
    get isArtificial() {
        return this.type + "" == SceneType.Artificial + "";
    }
    /**
     * 是否是自动场景，只读
     * @member
     * @type {readonly}
     * @readonly
     */
    get isAutomatic() {
        return this.type + "" == SceneType.Automatic + "";
    }
    /**
     * 代表场景的分类，创建场景时可自定义此参数；如果获取场景的时候传入identify，表示获取identify类场景列表；如果不需要对场景分类，此参数可忽略。
     * @type {string}
     */
    get identify() {
         return  ""
    }
    set identify(identify) {
    }
    /**
     * 场景的更多属性，详见 {@link module:miot/service/scene/createTimerScene}
     * @member
     * @type {json}
     */
    get setting() {
         return  {}
    }
    set setting(setting) {
    }
    /**
     * 授权设备列表，指场景关联的那些设备的deviceID
     * @member
     * @type {Array<String>}
     */
    get authorizedDeviceIDs() {
         return  []
    }
    set authorizedDeviceIDs(deviceIDs) {
    }
    /**
     * 保存场景 /scene/edit
     * @param {json} opt {authed:[...], name, identify, setting} 同上面的authed，name，identify，setting
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
    save(opt = null) {
        if (opt) {
            if (opt.name) {
                this.name = opt.name;
            }
            if (opt.identify) {
                this.identify = opt.identify;
            }
            if (opt.setting) {
                this.setting = opt.setting;
            }
            if (opt.authed && opt.authed.length > 0) {
                this.authorizedDeviceIDs = opt.authed;
            }
        }
         return Promise.resolve(null);
    }
    /**
     * 重新加载场景数据 /scene/get 
     * 用法：scene.reload();
     * @returns {Promise<IScene>}
     */
    reload() {
         return Promise.resolve(null);
    }
    /**
     * 启动场景 /scene/start
     * 用法：scene.start();
     * @returns {Promise<IScene>}
     */
    start() {
         return Promise.resolve(false);
    }
    /**
     * 删除场景 /scene/delete
     * 用法：scene.remove();
     * @returns {Promise<IScene>}
     */
    remove() {
         return Promise.resolve(false);
    }
}
/**
 * 创建场景 
 * @param {string} deviceID 设备id
 * @param {SceneType} sceneType 场景类型
 * @param {*} opt {identify,name} 同上面的identify，name
 * @returns {IScene}
 */
function createScene(deviceID, sceneType, opt = null) {
     return Promise.resolve(null);
}
/**
 * 加载场景 
 * @param {string} deviceID 设备id
 * @param {SceneType} sceneType 场景类型
 * @param {*} opt {identify,name} 同上面的identify，name
 * @returns {Promise<IScene>}
 */
function loadScenes(deviceID, sceneType, opt = null) {
     return Promise.resolve(null);
}
/**
 * @export
 */
export default {
    /**
     * 创建场景
     * @param {string} deviceID  设备id
     * @param {int} sceneType 场景类型
     * @param {{identify,name}} opt {identify,name,setting} 同上面的identify，name
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
     * 用法同上面的 createScene(deviceID, SceneType.Timer, opt);
     * 定时中的 crontab string 详见 [Linux crontab命令](http://www.runoob.com/linux/linux-comm-crontab.html)
     * @param {string} deviceID
     * @param {json} opt
     * @returns {IScene}
     * @example
     * import {Service, Device, SceneType} from 'miot'
     * const settinig = {
     * enable_timer_on: true, //是否开启定时打开。如果enable_timer设置为false，此属性不会起作用
     * on_time: * * * * *, //crontab string, minute hour day month week。如：59 11 21 3 * 指3月21号11点59分定时开
     * off_time: * * * * *, //crontab string，同上。
     * enable_timer_off: true,//是否开启定时关闭。如果enable_timer设置为false，此属性不会起作用
     * onMethod: 'method_name', //咨询硬件工程师,指硬件端，打开开关的方法。miot-spec下，一般为：set_properties
     * on_param: 'param', //咨询硬件工程师，指硬件端，打开开关应该传入的参数。miot-spec下，一般为：[{did,siid,piid,value}]
     * off_method: 'method_name', //咨询硬件工程师，指硬件端，关闭开关的方法。miot-spec下，一般为：set_properties
     * off_param: 'param', //咨询硬件工程师，关闭开关应该传入的参数。 miot-spec下，一般为：[{did,siid,piid,value}]
     * enable_timer: true, //是否开启此定时器，后续打开，关闭定时器，可以设置此属性
     * timer_type: "0",//用来区分普通定时和倒计时，为空（或者为"0"）表示普通定时，为"1"表示倒计时
     * on_filter: "cn_workday" // 后台用来过滤日期,目前只在大陆地区生效：cn_workday 表示工作日，cn_freeday 表示节假日
     * off_filter:"cn_freeday" // 后台用来过滤日期,目前只在大陆地区生效：cn_workday 表示工作日，cn_freeday 表示节假日
     // 
     * }
     * 
     * const scene = Service.scene.createTimerScene(Device.deviceID, {
     *      identify:'identify',//同上面的identify
     *      name:'myTimer',//同上面的名称
     *      setting:settinig
     * });
     * 
     * scene.save().then(scene=>{
     *   ...
     * })
     */
    createTimerScene(deviceID, opt) {
        return createScene(deviceID, SceneType.Timer, opt);
    },
    /**
     * 创建人工场景
     * same as createScene(deviceID, SceneType.Timer, opt);
     * @param {string} 设备id
     * @param {json} opt 同上面opt
     * @returns {IScene}
     */
    createArtificialScene(deviceID, opt) {
        return createScene(deviceID, SceneType.Artificial, opt);
    },
    /**
     * 创建自动场景
     * same as createScene(deviceID, SceneType.Automatic, opt);
     * @param {string} deviceID 设备id
     * @param {json} opt 同上面opt
     * @returns {IScene}
     */
    createAutomaticScene(deviceID, opt) {
        return createScene(deviceID, SceneType.Automatic, opt);
    },
    /**
     * 获取场景列表 /scene/list
     * @param {*} deviceID 设备id
     * @param {*} sceneType 场景类型
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadScenes,
    /**
     * 加载定时场景 /scene/list
     * @param {*} deviceID 设备id
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadTimerScenes(deviceID, opt = null) {
        return loadScenes(deviceID, SceneType.Timer, opt);
    },
    /**
     * 加载人工场景 /scene/list
     * @param {*} deviceID 设备id
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadArtificialScenes(deviceID, opt = null) {
        return loadScenes(deviceID, SceneType.Artificial, opt);
    },
    /**
     * 加载自动场景 /scene/list
     * @param {*} deviceID 设备id
     * @param {json} opt {identify,name}
     * @returns {Promise<IScene[]>}
     */
    loadAutomaticScenes(deviceID, opt = null) {
        return loadScenes(deviceID, SceneType.Automatic, opt);
    },
    /**
     * 获取指定设备的智能日志信息
     * @since 10010
     * @param {string} did 拉取设备的did
     * @param {long} timestamp 时间戳限制
     * @param {int} limit 拉取日志数量限制，小于等于50
     */
    loadScenesHistoryForDevice(did, timestamp = -1, limit = 50) {
         return Promise.resolve(null);
    },
}