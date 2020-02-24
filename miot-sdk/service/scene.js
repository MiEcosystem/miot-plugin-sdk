/**
 * @export public 
 * @doc_name 场景模块
 * @doc_index 2
 * @doc_directory service
 * @module miot/service/scene
 * @description 场景相关服务, 包括定时,人工与自动场景（SceneType 类中）
 * 定时场景：是指设备的有关倒计时或设置时间触发设备执行某一动作的智能自动化；
 * 例如米家app中 “智能”->“+”->“定时” 创建的自动化或通过openTimerSettingPageWithOptions或openCountDownPage 提供的API 创建的智能自动化都属于定时场景。
 * 人工场景：是指需要手动执行的智能自动化；
 * 例如米家app中 “智能”->“+”->“手动执行” 创建的自动化属于人工场景
 * 自动场景：主要是指设备之间相互关联的能够自动促发的智能自动化；
 * 例如米家app中 “智能”->“+”-> 选择某一设备 创建的智能自动化, 通常有 if...then... 的执行过程。
 *
 * 更多详细介绍可以参考：https://iot.mi.com/new/doc/05-米家扩展程序开发指南/03-智能自动化/01-概述.html
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
 *    ** 注意：name字段慎用，后台有如此判断逻辑：if(req.name != "") req.did=req.identify... 。这个会导致请求接口提示have no device permit。**
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
//@native
import native, { Properties } from "../native";
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
        //@native => 0
        console.log(Properties.of(this).data.us_id);
        return Properties.of(this).data.us_id
    }
    /**
     * 是否是新的场景
     * @member
     * @type {boolean}
     * @readonly
     */
    get isNew() {
        //@native => false
        return !this.sceneID;
    }
    /**
     * 场景的创建时间
     * @member
     * @type {long}
     * @readonly
     */
    get createTime() {
        //@native => 0
        return Properties.of(this).data.create_time;
    }
    /**
     * 场景是否开启
     * @member
     * @type {int}
     * @readonly
     */
    get status() {
        //@native => 0
        return Properties.of(this).data.status || 0;
    }
    /**
     * 定时场景的设备的did
     * @member
     * @type {string}
     * @readonly
     */
    get deviceID() {
        //@native => 0
        return Properties.of(this).deviceID;
    }
    /**
     * 场景名称
     * @member
     * @type {string}
     */
    get name() {
        //@native => ""
        return (Properties.of(this).data || {}).name
    }
    set name(name) {
        //@native
        Properties.of(this).data.name = name;
    }
    /**
     * 场景类型，只读
     * @member
     * @type {SceneType}
     * @readonly
     */
    get type() {
        //@native => 0
        return Properties.of(this).data.st_id
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
        //@native => ""
        return Properties.of(this).data.identify;
    }
    set identify(identify) {
        //@native
        Properties.of(this).data.identify = identify
    }
    /**
     * 场景的更多属性，详见 {@link module:miot/service/scene/createTimerScene}
     * @member
     * @type {json}
     */
    get setting() {
        //@native => {}
        return Properties.of(this).data.setting || {};
    }
    set setting(setting) {
        //@native
        Properties.of(this).data.setting = setting || {};
    }
    /**
     * 授权设备列表，指场景关联的那些设备的deviceID
     * @member
     * @type {Array<String>}
     */
    get authorizedDeviceIDs() {
        //@native => []
        return Properties.of(this).data.authed || [this.deviceID]
    }
    set authorizedDeviceIDs(deviceIDs) {
        //@native
        Properties.of(this).data.authed = deviceIDs.map(id => id + "");
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
        //@native :=> promise
        return new Promise((resolve, reject) => {
            const params = {
                us_id: this.sceneID,
                st_id: this.type,
                name: this.name || '',
                identify: this.identify,
                setting: this.setting,
                authed: this.authorizedDeviceIDs
            };
            native.MIOTRPC.standardCall("/scene/edit", params, (ok, res) => {
                if (ok) {
                    const self = Properties.of(this)
                    self.data.us_id = self.data.us_id || res.us_id;
                    self.data.status = res.status;
                    return resolve(this, res)
                } else {
                    return reject(res)
                }
            });
        });
        //@native end
    }
    /**
     * 重新加载场景数据 /scene/get 
     * 用法：scene.reload();
     * @returns {Promise<IScene>}
     */
    reload() {
        //@native :=> promise
        if (this.isNew) {
            return Promise.reject(false);
        }
        const self = Properties.of(this);
        return new Promise((resolve, reject) => {
            native.MIOTRPC.standardCall("/scene/get", { us_id: this.sceneID }, (ok, res) => {
                if (ok && res.result) {
                    self.data = res.result;
                    return resolve(this, res);
                }
                reject(res)
            });
        })
        //@native end
    }
    /**
     * 启动场景 /scene/start
     * 用法：scene.start();
     * @returns {Promise<IScene>}
     */
    start() {
        //@native :=> promise false
        if (this.isNew) {
            return Promise.reject(false);
        }
        return new Promise((resolve, reject) => {
            native.MIOTRPC.standardCall("/scene/start", { us_id: this.sceneID }, (ok, res) => {
                ok && resolve(this, res)
                !ok && reject(res)
            })
        })
        //@native end
    }
    /**
     * 删除场景 /scene/delete
     * 用法：scene.remove();
     * @returns {Promise<IScene>}
     */
    remove() {
        //@native :=> promise false
        if (this.isNew) {
            return Promise.reject(this);
        }
        return new Promise((resolve, reject) => {
            native.MIOTRPC.standardCall("/scene/delete", { us_id: this.sceneID }, (ok, res) => {
                if (ok) {
                    Properties.of(this).data.us_id = 0;
                    return resolve(this, res);
                }
                reject(res);
            });
        });
        //@native end
    }
}
/**
 * 创建场景 
 * @param {string} deviceID 设备id
 * @param {SceneType} sceneType 场景类型
 * @param {object} opt {identify, us_id, name, setting }
 * @param {string} opt.identify
 * @param {string} opt.us_id  场景的唯一标识。创建时传"0"
 * @param {string} opt.name   场景名称
 * @param {object} opt.setting  可参考createTimerScene
 *
 * @returns {IScene}
 */
function createScene(deviceID, sceneType, opt = null) {
    //@native :=> promise
    const { identify, us_id, name, setting } = opt || {};
    return Properties.init(new IScene(), {
        data: {
            st_id: sceneType, us_id, identify, name, authed: [deviceID + ""],
            setting: setting || {}, deviceID
        }
    });
    //@native end
}
/**
 * 加载场景 
 * @param {string} deviceID 设备id
 * @param {SceneType} sceneType 场景类型
 * @param {*} opt {identify,name} 同上面的identify，name
 * @returns {Promise<IScene>}
 */
function loadScenes(deviceID, sceneType, opt = null) {
    //@native begin => promise
    const params = {
        did: deviceID,
        st_id: sceneType,
        type: 0 //强制是云端
    };
    const { identify, name } = opt || {};
    if (identify) {
        params.identify = identify;
    }
    if (name) {
        params.name = name;
    }
    return new Promise((resolve, reject) => {
        native.MIOTRPC.standardCall("/scene/list", params, (ok, res) => {
            if (!ok || !res) {
                return reject(res);
            }
            resolve(Object.keys(res).map(k => {
                return Properties.init(new IScene(), { data: { name, identify, ...res[k], st_id: sceneType }, deviceID });
            }));
        })
    })
    //@native end
}
/**
 * @export
 */
export default {
    /**
     * 创建场景
     * @param {string} deviceID 设备id
     * @param {SceneType} sceneType 场景类型
     * @param {object} opt {identify, us_id, name, setting }
     * @param {string} opt.identify
     * @param {string} opt.us_id  场景的唯一标识。创建时传"0"
     * @param {string} opt.name   场景名称
     * @param {object} opt.setting  可参考createTimerScene
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
        //@native :=> promise
        let params = { did, limit, "command": "history" }
        if (timestamp !== -1) {
            params.timestamp = timestamp;
        }
        return new Promise((resolve, reject) => {
            native.MIOTRPC.standardCall("/scene/history", params, (ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        })
        //@native end
    },
    //@native begin
    editSceneRecord(params) {
        return new Promise((resolve, reject) => {
            native.MIOTService.editSceneRecord(params, (ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        })
    },
    //@native end
    /**
     * 批量删除自动化、场景
     * @param {Array}  params 自动化、场景us_id数组
     */
    deleteSceneRecords(params) {
        return new Promise((resolve, reject) => {
            native.MIOTService.deleteSceneRecords(params, (ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        })
    },
    triggerTemplatesForQualified(did) {
        return new Promise((resolve, reject) => {
            native.MIOTService.triggerTemplatesForQualifiedDid(did, (ok, res) => {
                if (ok) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
        })
    },
    actionTemplatesForQualified(did) {
        return new Promise((resolve, reject) => {
            native.MIOTService.actionTemplatesForQualifiedDid(did, (ok, res) => {
                if (ok) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
        })
    },
    loadSceneTemplate() {
        return new Promise((resolve, reject) => {
            native.MIOTRPC.standardCall("/scene/tplv2", null, (ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        })
    },
    //@native end
    /**
     * 打开添加智能的页面(米家APP实现)
     * @since 10032 ,SDKLevel 10032 开始提供使用
     * @example
     * Service.scene.openIftttAutoPage()
     */
    openIftttAutoPage() {
        //@native begin
        //@mark andr done
        native.MIOTHost.openIftttAutoPage();
        //@native end
    },
    /**
     * 打开时间设置页面(米家APP实现)
     * @since 10032 ,SDKLevel 10032 开始提供使用
     * @param {object} options 配置信息
     * @param {string} options.onMethod 配置定时开启的 method 名，同上面openTimerSettingPageWithVariousTypeParams的参数onMethod
     * @param {string} options.onParam 配置定时开启的 参数，同上面openTimerSettingPageWithVariousTypeParams的参数onParam
     * @param {string} options.offMethod 配置定时关闭的 method 名，同上面openTimerSettingPageWithVariousTypeParams的参数offMethod
     * @param {string} options.offParam 配置定时关闭的 参数，同上面openTimerSettingPageWithVariousTypeParams的参数offParam
     * @param {string} options.displayName 配置场景日志显示的名称
     * @param {string} options.identify 自定义定时Identifier
     * @param {string} options.onTimerTips 定时列表页面、设置时间页面 打开副标题（默认：开启时间）
     * @param {string} options.offTimerTips 定时列表页面、设置时间页面 关闭时间副标题（默认：关闭时间）
     * @param {string} options.listTimerTips 定时列表页面 定时时间段副标题（默认：开启时段）
     * @param {boolean} options.bothTimerMustBeSet 是否强制要求设置时间段？ true: 强制设置时间段(默认：false)如果设置true,忽略下面三个参数
     * @param {boolean} options.showOnTimerType 是否可以创建：定时开启？ true: 可以，false:不可以(默认：true)
     * @param {boolean} options.showOffTimerType 是否可以创建：定时关闭？ true: 可以，false:不可以(默认：true)
     * @param {boolean} options.showPeriodTimerType 是否可以创建：时间段定时？ true: 可以，false:不可以(默认：true)
     * 注意：showOnTimerType、showOffTimerType、showPeriodTimerType三个参数至少有一个为true，才有效，否则三个中任意都会被忽略掉
     * @example
     * Host.ui.openTimerSettingPageWithOptions({onMethod:"power_on", onParam: "on", offMethod: "power_off", offParam: "off", displayName:"设置xxx定时"，identify:"plug_usb_countdowm"})
     */
    openTimerSettingPageWithOptions(options) {
        //@native begin
        native.MIOTHost.openTimerSettingPageWithOptions(options);
        //@native end
    },
    /**
     * 开启倒计时界面
     * @param {Boolean} isCountDownOn 设备的当前状态:YES 为开启，所以我们启动关闭倒计时; NO  为关闭，所以我们启动开启倒计时
     * @param {object} setting 设置倒计时页面的属性
     * @param {string} setting.onMethod 指硬件端，打开 倒计时应该 执行的方法，请咨询硬件工程师
     * @param {string} setting.onParam 指硬件端，打开 倒计时应该 传入的参数，请咨询硬件工程师
     * @param {string} setting.offMethod 指硬件端，关闭 倒计时应该 执行的方法，请咨询硬件工程师
     * @param {string} setting.offParam 指硬件端，关闭 倒计时应该 传入的参数，请咨询硬件工程师
     * @param {string} setting.identify since 10021, 用于设置倒计时的identify
     * @param {string} options.displayName 配置场景日志显示的名称：注意，不会更改倒计时页面的标题，只会上传到服务端
     * @example
     *
     * Host.ui.openCountDownPage(true, {onMethod:"power_on", offMethod:'power_off', onParam:'on', offParam:'off',displayName:"新名字"})
     *
     */
    openCountDownPage(isCountDownOn, setting) {
        //@native begin
        //@mark ios done
        //@mark android undone
        native.MIOTHost.launchCountDownWhenDevice(isCountDownOn, setting);
        //@native end
    },
    //@native begin
    /**
     * 将时和分转化为cron表达式
     * @since 10034
     * @param {object} params
     * @param {int} params.hour  时
     * @param {int} params.minute  分
     * @param {string} params.on_filter  定时开启标识符
     *              中国大陆法定节假日     cn_freeday
     *              中国大陆法定工作日     cn_workday
     *              其他不填，为空
     * @param {string} params.off_filter  定时关闭标识符
     *              中国大陆法定节假日     cn_freeday
     *              中国大陆法定工作日     cn_workday
     *              其他不填，为空
     * @param {int} params.repeatType  重复类型  0: 执行一次  1: 每天  2 :中国大陆法定工作日  3：中国大陆法定节假日  4: 自定义
     * @param {array} params.weekday  当repeatType为4的时候才有效，必须将七天的数据都带上
     *          [true,        // 代表周日 被选中
     *           true,         // 代表周一 被选中
     *           false,        // 代表周一 未被选中
     *           false,
     *           true,
     *           true,
     *           true]
     * @returns {Promise<object>}
     * 成功时：{"data":"xxx","code":0}   例如：{"data":"16 30 18 18 1 * 2020","code":0}
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * 可参考 com.xiaomi.demo 中的 SceneDemo.js
     */
    convertDateToCron(params) {
        //@native :=> Promise.resolve('');
        return new Promise((resolve, reject) => {
            native.MIOTHost.convertDateToCron(params, (ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
        //@native end
    },
    /**
     * 将cron表达式转化为时和分
     * @since 10034
     * @param {Object} params
     *   {
     *      "cron": "58 30 12 * * 0,1,2,3,4,5,6 *",
     *      "on_filter": "cn_workday", // 定时开启标识符 这两个参数一般由服务端传回
     *      "off_filter": "cn_workday", // 定时关闭标识符 这两个参数一般由服务端传回
     * }
     *     中国大陆法定节假日     cn_freeday
     *     中国大陆法定工作日     cn_workday
     *     其他不填，为空
     * @returns {Promise<object>}
     * 成功时：{"data":{object},"code":0}
     * 例如：
     * {
     *  "data": {
     *    "weekday": [
     *          true,
     *          true,
     *          false,
     *          false,
     *          true,
     *          true,
     *          true
     *    ],
     *   "timerOnDetail": "12:30",
     *   "repeatStr": "周日, 周一, 周四, 周五, 周六",
     *   "repeatType": 4,
     *   "minute": 30,
     *   "hour": 12
     *   },
     *  "code": 0
     * }
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     * 可参考 com.xiaomi.demo 中的 SceneDemo.js
     */
    convertCronToDate(params) {
        //@native :=> Promise.resolve('');
        return new Promise((resolve, reject) => {
            native.MIOTHost.convertCronToDate(params, (ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
        //@native end
    },
    //@native end
}