/**
 * @export public
 * @doc_name 系统服务_智能家庭模块
 * @doc_index 20
 * @module miot/service/smarthome
 * @description 智能家庭 API
 *
 */
/**
 * 成员类型
 * @namespace MemberType
 */
export const MemberType = {
    /**
     * 人
     * @const
     */
    Person: "person",
    /**
     * 宠物
     * @const
     */
    Pet: 'pet'
};
Object.freeze(MemberType)
export default {
    /**
     * @typedef {Object} UserInfo
     * @property {number} uid user id; since 10010
     * @property {string} nickName user nick name
     * @property {string} avatarURL user avatarURL
     */
    /**
     * 获取用户的昵称和头像信息
     * @param {*} uid 获取用户信息的uid或者手机号
     * @returns {Promise<UserInfo>} a promise with user info
     */
    getUserInfo(uid) {
         return Promise.resolve({});
    },
    /**
     * 通过UID批量获取用户信息
     * @since 10005
     * @param {Array<string>} uids uid数组，仅支持uid，不支持手机号查询 
     * @return {Promise<Array<object>>}
     * @example
     * Service.smarthome.getUserInfoList([uid1,uid2]).then(res => {
     *  console.log('user info :', res.list)
     * })
     */
    getUserInfoList(uids) {
         return Promise.resolve(null);
    },
    /**
     * @typedef GPSInfo
     * @property lng - 经度
     * @property lat - 维度
     * @property adminArea - 省
     * @property countryCode - 国家代号（CN等）
     * @property locality - 城市
     * @property thoroughfare - 街道
     * @property language - 语言代号（zh_CN等）
     * @property subLocality - 区
     */
    /**
     * 上报gps信息 /location/set
     * @param {string} deviceID 设备ID
     * @param {GPSInfo} gpsInfo {lng,lat,countryCode,adminArea,locality,subLocality,thoroughfare,language} 依次为 {，，，，，，，}
     * @returns {Promise<object>}
     * @example
     * //获取手机地理信息，iOS必须是真机且开启定位权限
     * Host.locale.getLocation().then(res => {
     *  console.log('get location: ', res)
     *  var {longitude,latitude} = res;
     * }) 
     * if (latitude && longitude) {
     *  Service.smarthome.reportGPSInfo(Device.deviceID, {})
     * }
     *
     */
    reportGPSInfo(deviceID, gpsInfo) {
         return Promise.resolve(null);
    },
    /**
     * 设备固件版本信息
     * @typedef DeviceVersion
     * @property {boolean} isUpdating - 是否ota升级中 为true时，otaState才有效
     * @property {boolean} isLatest - 是否是最新版本
     * @property {boolean} isForce - 是否强制升级
     * @property {boolean} hasNewFirmware - 是否有新固件
     * @property {string} curVersion - 当前固件版本
     * @property {string} newVersion - 新固件版本
     * @property {string} description - 描述
     * @property {OTAState} otaState -设备OTA状态， since 10011
     *
     */
    /**
     * 设备固件otaState
     * @since 10011
     * @typedef OTAState
     * @param {string} state ota 状态
     * @param {number} startTime 开始时间
     * @param {number} progress 进度
     * @param {string} failedReason 失败原因
     * @param {number} failedCode   失败code
     */
    /**
     * 获取指定设备的新版本信息
     * /home/checkversion
     * @method
     * @param  {string} 设备did
     * @param  {number} pid 设备类型，使用Device.type,即可
     * @returns {Promise<DeviceVersion>}
     * @example
     * Device.getDeviceWifi().checkVersion()
     *  .then(res => console.log('success:', res))
     *  .catch(err => console.log('failed:', err))
     */
    checkDeviceVersion(did, pid) {
         return Promise.resolve({});
    },
    /**
     * // 获取可用固件更新，传参为dids。 /home/multi_checkversion
     * @param {array<string>} deviceIDs 设备ID
     * @return {Promise<json>}
     */
    getAvailableFirmwareForDids(deviceIDs) {
         return Promise.resolve(null);
    },
    /**
     * 获取服务器中 最新的版本信息，内部调用米家代理接口/home/latest_version
     * @param {string} model 设备的 model
     * @return {Promise}
     */
    getLatestVersion(model) {
         return Promise.resolve(null);
    },
    /**
     * 获取服务器中 最新的版本信息，
     * 内部调用米家代理接口/v2/device/latest_ver
     * @since 10004
     * @param {string} did 设备did
     */
    getLatestVersionV2(did) {
         return Promise.resolve(null);
    },
    /**
     * 添加一条日志打点。  
     * 开发者应该在拓展程序内合适时机调用该接口，打点信息会自动写入文件，按 Model 归类，即一个 Model 生成一个日志文件。  
     * 当用户反馈问题时，勾选 “同时上传日志”，则该 Model 的日志会跟随用户反馈上传，
     * 开发者可在 IoT 平台查看用户反馈及下载对应日志文件。用户反馈查看入口：数据中心—用户反馈，如果看不到数据中心入口，联系自己所属企业管理员修改账号权限。
     * @param {string} model 要打 log 到哪个 model 下
     * @param {string} log 具体的 log 数据
     * @returns {void}
     *
     * @example
     *     Service.smarthome.reportLog("a.b.c", "hello");
     *     Service.smarthome.reportLog(Device.model, `[info]test value is :${v1},${v2},${v3}`)
     *     Package.isDebug&&Service.smarthome.reportLog(...)
     *
     *     Device.reportLog(`...`)
     */
    reportLog(model, log) {
    },
    /**
     * 上报设备数据 /device/event
     * @param {string} deviceID 设备ID
     * @param {array<map>} records [{type,key,value}] 其中：type为'prop'或'event'，key，value均为自定义string
     *
     * @example
     * Service.smarthome.reportRecords("deviceID", [{type:"prop",key:"b",value:"c"}])
     */
    reportRecords(deviceID, records) {
         return Promise.resolve(null);
    },
    /**
     * /v2/device/set_extra_data
     *  写extra_data 字段，必须为map[string] string格式
     * @since 10002
     * @deprecated 10005 不推荐使用，后续版本会移除该方法。建议使用batchSetDeviceDatas
     * @param {json} params  -参数 {did, extra_data}
     * @return {Promise}
     */
    deviceSetExtraData(params) {
         return Promise.resolve(null);
    },
    /**
     * 通过前缀分批拉取设备的配置信息
     * - /v2/device/range_get_extra_data
     * @deprecated 10005 开始废弃， 后续版本会移除该方法。推荐使用 batchGetDeviceDatas
     * @param {json} params {did:string,prefix:string,limit:int,offset:int}
     * @return {Promise<json>}
     */
    getDevicesConfig(params) {
         return Promise.resolve(null);
    },
    /**
     * 删除设备上传的信息 /v2/device/del_extra_data
     * @deprecated 10005 开始废弃， 后续版本会移除该方法。batchSetDeviceDatas 设置的属性会随着设备删除自动清空
     * @param {json} params {did:string, keys:[key1,key2]}
     * @return {Promise<json>}
     */
    delDevicesConfig(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取设备时区
     * @deprecated 10005, 内部取用extra_Data 中设置的数据，建议自行在batchSetDeviceData中实现
     * @param {string} did 
     */
    getDeviceTimeZone(did) {
         return Promise.resolve(null);
    },
    /**
     * 提供返回设备数据统计服务，使用该接口需要配置产品model以支持使用，建议找对接的产品人员进行操作。
     * 图表📈统计接口 /v2/user/statistics
     * 注:由于sds限额问题，可能会出现一次拉不到或者拉不完数据的情况，会返回code:0和message:“sds throttle”
     * @param {object} params 
     * @param {string} params.did did
     * @param {string} params.data_type 数据类型 包括： 采样统计 日统计:stat_day_v3 / 周统计:stat_week_v3 / 月统计:stat_month_v3;
     * @param {string} params.key 需要统计的字段，即统计上报对应的key
     * @param {number} params.time_start 开始时间
     * @param {number} params.time_end 结束时间
     * @param {number} params.limit 限制次数，0为默认条数
     * @return {Promise<Object>}
     {
        "code": 0,
        "message": "ok",
        "result": [
            {
                "value": "[12,34]", // 为一个数组形式json串
                "time": 1543593600 // 时间戳
            },
            {
                "value": "[10,11]",
                "time": 1541001600
            }]
    }
     */
    getUserStatistics(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取支持语音的设备 可以控制的设备列表。 /voicectrl/ai_devs
     * @param deviceID  语音设备的 did
     * @return {Promise}
     */
    getVoiceCtrlDevices(deviceID) {
        return this.getVoiceVtrlDevices(deviceID);
    },
    getVoiceVtrlDevices(deviceID) {
         return Promise.resolve(null);
    },
    /**
     * 获取小爱接口数据，内部调用米家代理接口/v2/api/aivs
     * @param {json} params 请求参数 {path:string,params:map,header:map,payload:map,env:int,req_method:string,req_header:map}
     * @param {string} params.path
     * @param {string} params.params
     * @param {string} params.params.did
     * @param {string} params.params.client_id
     * @param {string} params.header
     * @param {string} params.env
     * @param {string} params.req_method
     * @param {string} params.req_header
     * @return {Promise}
     * @example
     * Service.smarthome.getAiServiceProxy({
     *  path: "/api/aivs/xxx",
     *  params: { did : "xx", client_id: "xx"},
     *  header: { name : "xx"},
     *  env: 1,
     *  req_method: "POST",
     *  req_header: {"Content-Type":"xx"}
     * }).then()
     */
    getAiServiceProxy(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取服务器中 device 对应的数据，内部调用米家代理接口 /device/getsetting
     * @deprecated 10010 开始废弃， 后续版本会移除该方法。 推荐使用 getDeviceSettingV2
     * @param {object} params 请求参数
     * @param {string} params.did did
     * @param {Array<string>} params.settings 指定设置的key数组
     * @return {Promise}
     */
    getDeviceSetting(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取服务器中 device 对应的数据，内部调用米家代理接口 /v2/device/getsettingv2
     * @since 10010
     * @param {object} params 
     * @param {string} params.did   设备did
     * @param {string} params.last_id   上一次请求返回的id，用于分页
     * @param {string} params.prefix_filter filter
     * @param {Array<string>} params.settings 指定设置的key数组
     * @return {Promise}
     */
    getDeviceSettingV2(params) {
         return Promise.resolve(null);
    },
    /**
     * 设置服务器中 device 对应的数据，内部调用米家代理接口/device/setsetting
     * @param {object} params 请求参数 {did:string,settings:map<key,value>}
     * @param {string} params.did did
     * @param {object} params.settings 指定设置的key数组
     * @return {Promise}
     */
    setDeviceSetting(params) {
         return Promise.resolve(null);
    },
    /**
     * 删除服务器中 device 对应的数据，内部调用米家代理接口/device/delsetting
     * @param {json} params  - 请求参数
     * @param {string} params.did did
     * @param {object} params.settings 指定要删除的key数组
     * @return {Promise}
     */
    delDeviceSetting(params) {
         return Promise.resolve(null);
    },
    /**
     * 添加设备属性和事件历史记录，/user/set_user_device_data
     * @param {object} params  参数
     * @param {string} params.did 设备did，
     * @param {string} params.uid 添加到哪个用户下,一般为 Device.ownerId，
     * @param {string} params.type 属性为prop事件为event，属性名不需要prop或者event前缀，亦可以自定义，
     * @param {string} params.key 要保存的数据K
     * @param {string} params.value 要保存的数据V
     * @param {number} params.time 触发时间戳，
     * @return {Promise}
     */
    setDeviceData(params) {
         return Promise.resolve(null);
    },
    /**
     * 查询用户名下设备上报的属性和事件
     * 获取设备属性和事件历史记录，订阅消息直接写入到服务器，不需要插件添加.
     * 通下面的set_user_device_data的参数一一对应， /user/get_user_device_data
     *
     * @param {json} params -参数\{did,type,key,time_start,time_end,limit}含义如下：
     * @param {string} params.did 设备id。 必选参数
     * @param {string} params.uid 要查询的用户id 。必选参数
     * @param {string} params.key 事件名，可自定义,定义与SDS表中key一致。必选参数
     * @param {string} params.type 定义与SDS表中type一致。必选参数。可参考SDS文档中的示例
     * @param {string} params.time_start 数据起点。必选参数
     * @param {string} params.time_end 数据终点。必选参数，time_end必须大于time_start,
     * @param {string} params.group 返回数据的方式，默认raw,可选值为hour、day、week、month。可选参数.
     * @param {string} params.limit 返回数据的条数，默认20，最大1000。可选参数.
     * @returns {Promise}
     */
    getDeviceData(params) {
         return Promise.resolve(null);
    },
    /**
     * 删除用户的设备信息（prop和event 除外）.
     * 删除对应时间戳的上报的数据，无法删除type为prop和event,删除后可用get_user_device_data校验。
     * 如果get_user_device_data校验返回的为[]表示删除成功。
     * user/del_user_device_data
     * @since 10004
     * @param {object} params {did:'', type: '', key:'',time:number} did:设备ID ;type: 要删除的类型 ;key: 事件名称. motion/alarm ;time:时间戳，单位秒
     * @param {string} params.did 设备id。 必选参数
     * @param {string} params.type type 定义与SDS表中type一致。必选参数。可参考SDS文档中的示例
     * @param {string} params.key key 事件名，可自定义,定义与SDS表中key一致。必选参数
     * @param {string} params.time 指定时间戳
     * @param {string} params.value 指定值
     */
    delDeviceData(params) {
         return Promise.resolve(null);
    },
    /**
     * 用于按照时间顺序拉取指定uid,did的发生的属性事件
     * /v2/user/get_user_device_log
     * @since 10004
     * @param {object} params 参数
     * @param {string} params.did 
     * @param {number} params.limit         目前最大为50
     * @param {number} params.time_start    开始时间
     * @param {number} params.time_end      结束时间
     */
    getUserDeviceLog(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取用户收藏
     * /user/get_user_coll
     * @param {object} params 参数
     * @param {string} params.did did
     * @return {Promise}
     */
    getUserColl(params) {
         return Promise.resolve(null);
    },
    /**
     * 设置用户收藏
     * /user/get_user_coll
     * @param {object} params 参数
     * @param {string} params.did did
     * @param {string} params.name name
     * @param {string} params.content content
     * @return {Promise}
     */
    setUserColl(params) {
         return Promise.resolve(null);
    },
    /**
     * /user/edit_user_coll
     *  编辑用户收藏
     * @since 10002
     * @param {json} params  -参数 {coll_id, newname， content}
     * @return {Promise}
     */
    editUserColl(params) {
         return Promise.resolve(null);
    },
    /**
     * 删除用户收藏
     * /user/get_user_coll
     * @param {*} params 参数
     * @param {string} params.did did
     * @param {string} params.coll_id coll_id
     * @return {Promise}
     */
    delUserColl(params) {
         return Promise.resolve(null);
    },
    /**
     * 添加设备属性和事件历史记录，/home/getmapfileurl
     * @param {json} params
     * @return {Promise}
     */
    getMapfileUrl(params) {
         return Promise.resolve(null);
    },
    /**
     * 石头扫地机器人专用，获取fds存储文件url
     *  /home/getrobomapurl
     *
     * @param {*} arams {“obj_name”:”xxx/12345678/87654321/1.0”}，obj_name格式为:fds存储文件夹/did/uid/obj_name
     * @return {Promise}
     */
    getRobomapUrl(params) {
         return Promise.resolve(null);
    },
    /**
     * 石头扫地机器人专用，撤销隐私时删除扫地机地图
     *  /user/del_user_map
     *
     * @param {json} params {did} 设备ID
     * @return {Promise}
     */
    delUsermap(params) {
         return Promise.resolve(null);
    },
    /**
     * 添加设备属性和事件历史记录，/home/device_list
     * 当ssid和bssid均不为空时，表示同时搜索这个局域网内所有未被绑定过的设备
     * @param {json} params {pid:string ,ssid:string ,bssid:string ,localDidList:array<string>,checkMoreWifi:bool,dids:array<string>}
     * @param {string} params.pid               Device.type
     * @param {string} params.ssid              wifi 的 ssid
     * @param {string} params.bssid             wifi 的bssid
     * @param {string} params.dids              要拉取列表的设备的didi，如果为空表示所有设备
     * @param {string} params.localDidList      本地设备did列表，补充ssid和bssid的本地查询条件，会与ssid查到的本地列表一起返回其中未被绑定的在线设备
     * @param {string} params.checkMoreWifi     检查2.4gwifi下的本地设备列表
     * @param {boolean} params.getHuamiDevices  获取华米设备,如华米手环
     * 其中，pid：设备PID，ssid：wifi名称，bssid：wifi网关mac，locatDidList：本地设备did列表，补充ssid和bssid的本地查询条件，会与ssid查到的本地列表一起返回其中未被绑定的在线设备，checkMoreWifi：检查2.4gwifi下的本地设备列表，did：要拉取列表的设备的did，如果为空表示所有设备
     * @return {Promise}
     */
    getHomeDevice(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取AppConfig配置文件，1. 插件端有一些自己的信息需要配置，可使用此接口 2. 局限性：只有小米内部有权配置，之后可能会出对外版（目前只能找米家产品经理/工程师帮忙配置）3.维护起来很不方便，不建议使用。
     * 
     * @param {object} params 请求参数
     * @param {string} params.name configName 配置的名字
     * @param {string} params.lang lang 可选: zh_CN、zh_TW、en，zh-hant，一般请使用zh_CN和en	
     * @param {string} params.result_level  正常传"0"，若传“1”，则会提供一个downloadurl，而不是直接返回content，以节省流量。取得downloadurl后，通过Host.file.downloadFile下载文件，然后使用
     * @param {string} params.version version 后台配置的version，大概率为"1"，如果不对，可以找米家工程师帮忙查询，查询地址：http://plato.io.mi.srv/#/appconfig/client
     */
    getAppConfig(params) {
         return Promise.resolve(null);
    },
    /**
     * 用于获取插件所需的一些默认配置信息
     * @deprecated 10010, SDKLevel 10010 废弃该接口，使用getAppConfig
     * @param {json} params {'name':'自定义值','lang':'自定义值','version':'自定义值','model':'modelId'}
     * /service/getappconfigv2
     */
    getAppConfigV2(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取设备所在网络的IP地址所属国家
     * /home/getcountry
     * @param {json} params {"dids": ["xx"]}
     * @return {Promise}
     */
    getCountry(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取蓝牙锁绑定的时间，/device/blelockbindinfo
     *
     * @param {json} params  -参数
     * @param {string} params.did  did
     * @return {Promise}
     */
    getBleLockBindInfo(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取设备的属性，属性设置会在设备被删除时清空
     * api call /device/batchdevicedatas
     * 
     * error code: 
     * 0 - 成功
     * -7 - 没有找到注册的设备
     * -6 - 设备对应uid不为0 
     * -4 - server err
     * 
     * @since 10005
     * @param {object[]} params  -参数
     * @param {string} params[].did did
     * @param {string[]} params[].props props 列表,属性需要以"prop.s_"开头 e.g ["prop.s_aaa","prop.s_bbb"]
     * @return {Promise}
     * @example
     * let params = {'did':Device.deviceID, 'props': [   
     *  "prop.s_push_switch"
     * ]}   
     * Service.smarthome.batchGetDeviceDatas([params]).then(...)
     * 
     * 
     */
    batchGetDeviceDatas(params) {
         return Promise.resolve(null);
    },
    /**
     * 设置设备属性, 属性设置会在设备被删除时清空
     * 备注： props最多20个，最多同时300个设备（目前max设备数)，属性需要以prop.s_ 开头
     * 
     * error code: 
     * 0 - 成功
     * 7 - 没有找到注册的设备
     * 6 - 设备对应uid为0 
     * 4 - server err
     * 
     * @since 10005
     * @param {object[]} params {did: string, props: json}
     * @param {string} params[].did did
     * @param {object} params[].props props 键值对， 属性需要以"prop.s_"开头
     * @example
     * let params = {'did':Device.deviceID, 'props': {   
     *  "prop.s_push_switch_xxx":"0"
     * }}   
     * Service.smarthome.batchSetDeviceDatas([params]).then(...)
     * 
     */
    batchSetDeviceDatas(params) {
         return Promise.resolve(null);
    },
    /**
     * 设置设备属性，e.g 配置摄像头/门铃设备的属性
     * props最多20个, 属性需要以"prop.s_"开头。
     * 
     * error code: 
     * 0 - 成功
     * -7 - 没有找到注册的设备
     * -6 - 设备对应uid不为0 
     * -4 - server err
     * 
     * @since 10004
     * @param {object} params 参数
     * @param {string} params.did did
     * @param {object} params.props props 键值对， 属性需要以"prop.s_"开头
     * @example
     * let params = {'did':Device.deviceID, 'props': {   
     *  "prop.s_notify_screen_dev_enable":"0", //0,关； 1，开   
     *  "prop.s_notify_screen_dev_did":"123456789" // 接收rpc的音响设备  
     * }}   
     * Service.smarthome.setDeviceProp(params).then(...)
     */
    setDeviceProp(params) {
         return Promise.resolve(null);
    },
    /**
     * 从服务器获取配置文件，/device/getThirdConfig
     *
     * @param {json} params  -参数 {"name":"config_version","version":1,"lang":"en","app_id":"XXX"}
     * @param {string} params.name configName
     * @param {string} params.model device model
     * @param {string} params.app_id app_id
     * @param {string} params.lang lang e.g: zh_CN
     * @param {string} params.result_level 值为1，则不返回content来节省流量， 默认为0
     * @param {string} params.version version
     * @return {Promise}
     */
    getThirdConfig(params) {
         return Promise.resolve(null);
    },
    /**
     * /v2/third/synccall. 兼容三方厂商使用
     * @since 10003
     * @param {json} params {"uid": , "did":, "api_name": , ...}
     * @return {Promise<json>} {"code": 0, "policy": <POLICY_NUMBER">, ...}
     */
    thirdSyncCall(params) {
         return Promise.resolve(null);
    },
    /**
     * 异步调用第三方云接口  /third/api
     *
     * @param {json} params  -参数 {"app_id":"123","dids":["1","2"],"params":json}
     * @return {Promise}
     */
    callThirdPartyAPI(params) {
         return Promise.resolve(null);
    },
    /**
     * 华米watch配置使用
     * Android not support yet
     * @return {Promise}
     */
    getMiWatchConfig() {
        if (native.isAndroid) {
            return new Promise.reject("not support android yet");
        }
        return new Promise((resolve, reject) => {
            native.MIOTHost.getMiWatchConfigWithCallback((ok, res) => {
                if (ok) {
                    return resolve(res);
                }
                reject("get failed");
            });
        });
    },
    /**
     * 获取authCode来做鉴权
     * @param string} did 设备的 did
     * @returns {Promise}
     */
    getUserDeviceAuth(did) {
         return Promise.resolve(null);
    },
    /**
     * 获取InterimFileUrl 获取临时文件
     * @param {json} params  -参数 {obj_name : '{ownerId}/{deviceId}/{index}'}
     * @returns {Promise}
     */
    getInterimFileUrl(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取文件下载地址
     * @deprecated 10004 使用 Host.file.getFDSFileInfoWithObjName
     * @param {json} params  -参数 {obj_name : '2018/06/08/123456/xiaomi123_181030106.mp3'}
     * @return {Promise}
     */
    getFileUrl(params) {
         return Promise.resolve(null);
    },
    /**
     * 日志分页拉取
     * @since 10001
     * @param {object} params 参数
     * @param {string} params.did
     * @param {string} params.key
     * @param {string} params.type
     * @param {string} params.timestamp
     * @param {string} params.limit
     * @return {Promise}
     */
    getUserDeviceDataTab(params) {
         return Promise.resolve(null);
    },
    /**
     * /v2/home/range_get_open_config
     * 通过appid、category、configid获获取对应的配置
     * @since 10002
     * @param {json} params  -参数 {did,category,configids,offset,limit}
     * @return {Promise}
     */
    rangeGetOpenConfig(params) {
         return Promise.resolve(null);
    },
    /**
     * 门锁米家APP上传Cid,Did,Uid，返回处理结果。函数内部与金服APP建立http连接签名传输配置信息与NFC卡片信息
     * Service.smarthome.BindNFCCard(params)
     * @since 10003
     * @param {json} params {did:'', uid:'', cid:''}
     */
    bindNFCCard(params) {
         return Promise.resolve(null);
    },
    /**
     * 米家app查询NFC卡信息，使用did查询did下绑定的NFC卡列表信息
     * @since 10003
     * @param {json} params {did:''}
     * @return {json}  卡片结果数组
     * @example
     * response:
     * ret={
        "code":0,
        "message":"ok",
        "result":{
            "list":[{
                "did":"1234567",
                "uid":123456789,                    //设备owner的用户id
                "cid":"111122223333444455",
                "name":"家",                            //用户设置的卡名称
                "type":1,                                  //卡片类型，1：手机NFC卡，2：实体卡
                "status":1,                               //卡片状态，1：有效， 0： 无效
                "issuer_id":"666666",
                "time_stamp":1234567890,   // 开卡时间
                "extra":{
                    "deviceModel":"RedMi 4X",
                    "OS":"MIUI 9.5"
                    }
                },
                {
                ...
                }
                ]
        }
    }
     */
    getNFCCard(params) {
         return Promise.resolve(null);
    },
    /**
     * /yaokan/insertunmodel
     * @since 10004
     * @param {json} params {device:int, id: int, brand: string, model: string}
     */
    insertunmodel(params) {
         return Promise.resolve(null);
    },
    /**
     * call api /scene/idfy_get
     * @since 10005
     * @param {object} params json params
     * @param {string} params.indetify 唯一标识符，场景的id，一般填did
     * @example
     * let params = {identify:Device.deviceID}
     * Service.smarthome.getIDFY(params)
     */
    getIDFY(params) {
         return Promise.resolve(null);
    },
    /**
     * call api /scene/idfy_get
     * @since 10005
     * @param {object} params json params
     * @example
     * let params = {"identify":"554011","st_id":7,"setting":{"aqi_link":"0","exception_alert":"1","blue_sky_alert":"0"},"authed":["554011"]}
     * Service.smarthome.editIDFY(params)
     */
    editIDFY(params) {
         return Promise.resolve(null);
    },
    /**
     * call api /v2/home/range_get_open_config
     * @since 10005
     * @deprecated 10011 改用 Service.smarthome.rangeGetOpenConfig
     * @param {json} params json params {did:string, category:string, configids:array, offset: int, limit:int}, did: 设备did。 category 配置类别， configids： 配置id 为空时返回所有配置，不超过20个，不为空时没有数量限制， offset 偏移；limit 数量，不超过20
     */
    getRangeOpenConfig(params) {
         return Promise.resolve(null);
    },
    /**
     * @typedef MemberPet
     * @property {string} id 
     * @property {string} name      名称
     * @property {string} sex       性别
     * @property {string} birth     生日
     * @property {double} weight    重量
     * @property {string} species   物种
     * @property {string} variety   品种
     * @property {string} food_cate 食品
     * @property {int} active_rate  活跃度
     * @property {int} castrated    阉割
     * @property {int} special_mark 特殊标志
     */
    /**
     * @typedef MemberPerson
     * @property {string} id 
     * @property {string} name      姓名
     * @property {string} sex       性别
     * @property {string} birth     生日
     * @property {double} height    身高
     * @property {double} weight    体重
     * @property {string} relation  关系
     * @property {string} icon      预留项，暂不支持设置
     * @property {int} xiaomi_id    小米uid
     * @property {string} region    国家区域
     * @property {int} special_mark 特殊标志
     */
    /**
     * 创建 成员， 参考 MemberPerson 或者 MemberPet 的内容，按需填写。
     * @since 10005
     * @param {MemberType} type 成员类型 pet or person
     * @param {MemberPerson} info  - MemberPerson 或者 MemberPet
     */
    createMember(type, info) {
         return Promise.resolve(null);
    },
    /**
     * 更新成员信息
     * @since 10005
     * @param {MemberType} type 
     * @param {string} member_id 
     * @param {MemberPerson} info - MemberPerson 或者 MemberPet 只填写需要更新的项目
     */
    updateMember(type, member_id, info) {
         return Promise.resolve(null);
    },
    /**
     * 删除成员
     * @since 10005
     * @param {MemberType} type 
     * @param {Array} member_id 成员id列表
     */
    deleteMember(type, member_id) {
         return Promise.resolve(null);
    },
    /**
     * 加载指定种类的成员列表
     * @since 10005
     * @param {MemberType} type 
     */
    loadMembers(type) {
         return Promise.resolve(null);
    },
    /**
     * 设置用户信息
     * call /user/setpdata, 其中的time为关键信息，在getpdata使用时将利用此值。
     * @since 10010
     * @param {object} params params
     * @param {long} params.time setpddata的时间戳
     * @param {string} params.key key 字串
     * @param {string} params.value value值
     */
    setUserPDData(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取用户信息
     * call /user/getpdata
     * 此接口的时间戳范围是反的，即：time_start > time_end ,否则获取不到。
     * @since 10010
     * @param {object} params params
     * @param {object} params.time_end 筛选结果的时间戳
     * @param {object} params.time_start 筛选结果的时间戳
     * @param {object} params.key 获取的key
     */
    getUserPDData(params) {
         return Promise.resolve(null);
    },
    /**
     * App获取设备上报操作记录
     * request /v2/user/get_device_data_raw
     * @since 10011
     * @param {object} params 参数
     * @param {string} params.did 设备did
     * @param {string} params.uid 用户UID
     * @param {string} params.type  查询事件；当查询属性时使用 'prop', 否则使用 'store'操作
     * @param {string} params.key   事件名称；当查询属性时value填具体属性，比如"aqi"
     * @param {string} params.time_start   开始UTC时间
     * @param {string} params.time_end 结束UTC时间
     * @param {string} params.limit    最多返回结果数目，上限500。注意按需填写，返回数据越多查询越慢
     */
    getDeviceDataRaw(params) {
         return Promise.resolve(null);
    },
    /**
     * 透传米家APP与小米支付创建session
     * request /v2/nfckey/create_se_session
     * @since 10011
     * @param {object} params params
     * @param {string} params.did did
     * @param {object} params.reqData // 透传给Mipay的数据
     * @param {string} params.reqData.userId // 透传给Mipay的数据
     * @param {string} params.reqData.cplc // 透传给Mipay的数据
     * @param {string} params.reqData.deviceType // 透传给Mipay的数据
     * @param {string} params.reqData.deviceId // 透传给Mipay的数据
     * @param {string} params.reqData.timestamp // 透传给Mipay的数据
     * @param {string} params.reqData.sign // 透传给Mipay的数据
     */
    createSeSession(params) {
         return Promise.resolve(null);
    },
    /**
     * 透传替换ISD key
     * request /v2/nfckey/replace_se_isdkey
     * @since 10011
     * @param {object} params params
     * @param {string} params.did did
     * @param {object} params.reqData // 透传给Mipay的数据
     * @param {string} params.reqData.sessionId // 透传给Mipay的数据
     * @param {string} params.reqData.partnerId // 透传给Mipay的数据
     * @param {string} params.reqData.userId // 透传给Mipay的数据
     * @param {string} params.reqData.cplc // 透传给Mipay的数据
     * @param {string} params.reqData.timestamp // 透传给Mipay的数据
     * @param {string} params.reqData.sign // 透传给Mipay的数据
     */
    replaceSEISDkey(params) {
         return Promise.resolve(null);
    },
    /**
     * 透传锁主密钥重置
     * request /v2/nfckey/reset_lock_primarykey
     * @since 10011
     * @param {object} params params
     * @param {string} params.did did
     * @param {object} params.reqData // 透传给Mipay的数据
     * @param {string} params.reqData.sessionId // 透传给Mipay的数据
     * @param {string} params.reqData.partnerId // 透传给Mipay的数据
     * @param {string} params.reqData.userId // 透传给Mipay的数据
     * @param {string} params.reqData.cplc // 透传给Mipay的数据
     * @param {string} params.reqData.timestamp // 透传给Mipay的数据
     * @param {string} params.reqData.sign // 透传给Mipay的数据
     */
    resetLockPrimaryKey(params) {
         return Promise.resolve(null);
    },
    /**
     * 处理芯片返回
     * request /v2/nfckey/handle_se_response
     * @since 10011
     * @param {object} params params
     * @param {string} params.did did
     * @param {object} params.reqData // 透传给Mipay的数据
     * @param {string} params.reqData.sessionId // 透传给Mipay的数据
     * @param {string} params.reqData.userId // 透传给Mipay的数据
     * @param {string} params.reqData.cplc // 透传给Mipay的数据
     * @param {Array<object>} params.reqData.seResps // 这是一个数组透传给Mipay的数据
     * @param {string} params.reqData.seResps[].data // 这是一个透传给Mipay的数据
     * @param {string} params.reqData.seResps[].statusWord // 这是一个透传给Mipay的数据
     * @param {string} params.reqData.timestamp // 透传给Mipay的数据
     * @param {string} params.reqData.sign // 透传给Mipay的数据
     * @example
     * let param = {
     *  "did":"1234567",
     *  "reqData":{ // 透传给Mipay的数据
     *      "sessionId":"999999999", 
     *      "userId":"12340000",
     *      "cplc":"asdghjklmnbvd",
     *      "seResps":[
     *          {"data":"","statusWord":"9000"},
     *          {"data":"","statusWord":"6A80"}
     *      ],
     *      "timestamp":1234567890,
     *      "sign":"shaddgkldsjlkeri"
     *  }
     * }
     */
    handleSEResponse(params) {
         return Promise.resolve(null);
    },
    /**
     * 上报蓝牙设备信息
     * call: /v2/device/bledevice_info
     * 等效于: /v2/blemesh/dev_info
     * @since 10020
     * @param {object} params 参数
     * @param {string} prarms.did 设备did
     * @param {string} prarms.fw_ver 设备当前固件版本号
     * @param {string} prarms.hw_ver 设备的硬件平台
     * @param {string} prarms.latitude 纬度，number字符串
     * @param {string} prarms.longitude 经度，number字符串
     * @param {string} prarms.iternetip app/网关IP地址
     */
    reportBLEDeviceInfo(params) {
         return Promise.resolve(null);
    }
}