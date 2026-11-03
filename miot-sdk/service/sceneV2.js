/**
 * @export public
 * @doc_name 场景模块
 * @doc_index 2
 * @doc_directory service
 * @module miot/service/sceneV2
 * @description 场景2.0相关服务
 */
import { report } from "../decorator/ReportDecorator";
import Device from '../device/BasicDevice';
import { CurrentAccount } from './Account';
/**
 * @export
 */
class IMiotSceneV2 {
  /**
   * @since 10077
   * 获取家庭的手动场景列表, /app/appgateway/miot/appsceneservice/AppSceneService/GetManualSceneList
   * @param {Object} params
   * @example
   * {
      "home_id":12345678, //必填
      "room_id":12345,//非必填
      "owner_uid": 1111,//必填
      "source": "tv" ,//必填 请求来源 （tv:电视  zkp：中控屏 car:汽车）
      "get_type" : 0, //必填 场景类型 0:自定义手动场景 1：模板手动场景 2：全部手动场景
      "filter_closed"：true, //是否过滤掉已关闭的场景， true 过滤， false 不过滤
      "scene_ids": [11111, 22222, 33333] // 非必填，获取指定场景信息 // 中控屏需求
    }
   * @returns {Promise<Object>}
   * @example
   * {
      "code":0,
      "message":"ok",
      "result":{[
        {
          "scene_id":12345678,//场景id
          "home_id":123123, //家庭id
          "room_id":12345, //房间id
          "scene_name":"xxxxxx",//名称
          "icon"："xxx",   // 模板的场景会使用这个icon
          "template_id":11111111, //模板id
          "update_time":1111111,
          "enable": true // 场景开关状态
        }, ...
      ]}
    }
   */
  @report
  getManualSceneList(params) {
  }
  // 定时2.0相关接口
  /**
* since 10074
* 编辑/新建时间段定时，时间段定时由一对父子场景组合而成，开始动作对应父场景，结束动作对应子场景，需要根据父子关系组合显示定时数据
* 父场景：scene_id 为场景ID， sub_usIds 为其关联的子场景，对应下文的onSceneId
* 子场景：scene_id 为场景ID， parent_usId 为其关联的父场景 ， 对应下文的offSceneId
* @param {object} timer 定时
* @param {string} timer.onSceneName 定时开始动作的场景名称，会显示在智能日志中
* @param {string} timer.onSceneId 定时开始动作的sceneID，新建可以不传，编辑传需要编辑的定时ID，对应定时列表中sub_usIds有值的场景的scene_id
* @param {object} timer.onPayload 定时开始的执行动作参数
* @param {string} onPayload.did 定时执行的设备did, 默认当前插件设备did
* @param {string} onPayload.model 定时执行的设备model, 默认当前插件设备model
* @param {string} onPayload.command 定时执行的方法名称 设置属性 'set_properties', 执行方法 'action'
* @param {string} onPayload.device_name 定时执行的设备名称, 默认当前插件设备name
* @param {object} onPayload.value 定时执行方法value, value格式如下
* @param {object} set_properties 当 command 为 set_properties 时, value格式 [{ "did":1232, "siid":2,"piid":1,"value":false}]
* @param {object} action 当 command 为 action 时,  value格式 {"did":"xx", "siid":xx, "aiid":xxx, "in":[{"did":"xx", "siid":xx, "piid":xx, "value":xx}]}
* @param {object} timer.onPayloadName 定时执行动作的名称
* @param {string} timer.onActionId 定时执行动作的自动化id, IoT开发平台-高阶配置-自动化配置-id那一栏查看
* @param {string} timer.onTime 执行时间，crontab字符串 0 22 8 * * 1,2,3,4,5 *
* @param {string} timer.second 秒：0-59
* @param {string} timer.minute 分：0-59
* @param {string} timer.hour 时：0-23
* @param {string} timer.day 日：1-31 或者 *
* @param {string} timer.month 月：1-12 或者 *
* @param {string} timer.week 星期：0,1,2,3,4,5,6 或者 *
* @param {string} timer.year 年：* 或者 具体年份 如2022
* @example {string} time 执行一次，crontab字符串 0 2 12 27 8 * 2022
* @example {string} time 每天，crontab字符串 0 2 12 * * * *
* @example {string} time 每周二三，crontab字符串 0 2 12 * * 2,3 *
* @param {string} timer.offSceneName 定时结束动作的场景名称，会显示在智能日志中
* @param {string} timer.offSceneId 定时结束动作的sceneID，新建可以不传，编辑传需要编辑的定时ID, 对应定时列表中sub_usIds的值
* @param {object} timer.offPayload 定时结束的执行动作参数
* @param {string} offPayload.did 定时执行的设备did, 默认当前插件设备did
* @param {string} offPayload.model 定时执行的设备model, 默认当前插件设备model
* @param {string} offPayload.command 定时执行的方法名称 设置属性 'set_properties', 执行方法 'action'
* @param {string} offPayload.device_name 定时执行的设备名称, 默认当前插件设备name
* @param {object} offPayload.value 定时执行方法value, value格式如下
* @param {object} set_properties 当 command 为 set_properties 时, value格式 [{ "did":1232, "siid":2,"piid":1,"value":false}]
* @param {object} action 当 command 为 action 时,  value格式 {"did":"xx", "siid":xx, "aiid":xxx, "in":[{"did":"xx", "siid":xx, "piid":xx, "value":xx}]}
* @param {object} timer.offPayloadName 定时执行动作的名称
* @param {string} timer.offActionId 定时执行动作的自动化id, IoT开发平台-高阶配置-自动化配置-id那一栏查看
* @param {string} timer.offTime 执行时间，crontab字符串 0 22 8 * * 1,2,3,4,5 *
* @param {string} timer.second 秒：0-59
* @param {string} timer.minute 分：0-59
* @param {string} timer.hour 时：0-23
* @param {string} timer.day 日：1-31 或者 *
* @param {string} timer.month 月：1-12 或者 *
* @param {string} timer.week 星期：0,1,2,3,4,5,6 或者 *
* @param {string} timer.year 年：* 或者 具体年份 如2022
* @param {string} timer.filter 节假日, cn_workday: 法定工作日， cn_freeday: 法定节假日
* @returns {Promise<object>}
*/
  @report
  editPeriodTimer = (timer) => {
  }
  /**
* since 10074
* 编辑时间点定时: sub_usIds为空且parent_usId为'0'场景才是独立的时间点定时
* @param {object} timer 定时
* @param {string} timer.sceneName 定时的名称
* @param {string} timer.sceneId 定时的ID，新建可以不传，编辑传需要编辑的定时ID
* @param {object} timer.payload 定时执行的动作参数
* @param {string} payload.did 定时执行的设备did, 默认当前插件设备did
* @param {string} payload.model 定时执行的设备model, 默认当前插件设备model
* @param {string} payload.command 定时执行的方法名称 设置属性 'set_properties', 执行方法 'action'
* @param {string} payload.device_name 定时执行的设备名称, 默认当前插件设备name
* @param {object} payload.value 定时执行方法value, value格式如下
* @param {object} set_properties 当 command 为 set_properties 时, value格式 [{ "did":1232, "siid":2,"piid":1,"value":false}]
* @param {object} action 当 command 为 action 时,  value格式 {"did":"xx", "siid":xx, "aiid":xxx, "in":[{"did":"xx", "siid":xx, "piid":xx, "value":xx}]}
* @param {object} timer.payloadName 定时执行动作的名称
* @param {string} timer.actionId 定时执行动作的自动化id, IoT开发平台-高阶配置-自动化配置-id那一栏查看
* @param {string} timer.time 执行时间，crontab字符串 0 22 8 * * 1,2,3,4,5 *
* @param {string} timer.second 秒：0-59
* @param {string} timer.minute 分：0-59
* @param {string} timer.hour 时：0-23
* @param {string} timer.day 日：1-31 或者 *
* @param {string} timer.month 月：1-12 或者 *
* @param {string} timer.week 星期：0,1,2,3,4,5,6 或者 *
* @param {string} timer.year 年：* 或者 具体年份 如2022
* @example {string} time 执行一次，crontab字符串 0 2 12 27 8 * 2022
* @example {string} time 每天，crontab字符串 0 2 12 * * * *
* @example {string} time 每周二三，crontab字符串 0 2 12 * * 2,3 *
* @param {string} timer.filter 节假日, cn_workday: 法定工作日， cn_freeday: 法定节假日
* @param {object} timer.payloadName 定时执行的动作名称
* @returns {Promise<object>}
*/
  @report
  editPointTimer = (timer) => {
  }
  /**
* since 10074
* 删除时间段定时
* 删除时间段定时
* @param {string} sceneId 场景ID
* @returns {Promise<object>}
*/
  @report
  deletePeriodTimer = (sceneId) => {
  }
  /**
* since 10074
* 删除时间点定时
* 删除时间点定时
* @param {string} sceneId 场景ID
* @returns {Promise<object>}
*/
  @report
  deletePointTimer = (sceneId) => {
  }
  /**
* since 10074
* 批量删除定时
* @param {array<string>} sceneIds 场景列表
* @returns {Promise<object>}
*/
  @report
  batchDeleteTimers = (sceneIds) => {
  }
  /**
* since 10074
* 开关时间段定时
* 开关时间段定时
* @param {string} sceneId 场景ID
* @param {boolean} enable 使能
* @returns {Promise<object>}
*/
  @report
  enablePeriodTimer = (sceneId, enable) => {
  }
  /**
* since 10074
* 开关时间点定时
* 开关时间点定时
* @param {string} sceneId 场景ID
* @param {boolean} enable 使能
* @returns {Promise<object>}
*/
  @report
  enablePointTimer = (sceneId, enable) => {
  }
  /**
* since 10074
* 获取2.0插件定时列表
* @param {string} deviceId 设备id， 不传默认当前插件设备
* @returns {Promise<object>}
* @param {boolean} enable 定时是否开启
* @param {object} scene_id 定时的场景ID
* @param {object} scene_action 定时的执行动作
* @param {object} scene_trigger 定时的触发条件，包含执行时间等
*/
  @report
  getTimerList = (deviceId = Device.deviceID) => {
  }
  /**
   * @since 10077
   * 是否有可以转成2.0版本场景的1.0场景，一般搭配openBatchConvertScenePage()使用
   * @param param{Object}
   * @param param.hasUserClick{boolean} hasUserClick为true时，表示只要有1.0的手动执行场景，就返回true
   * @example
   * Service.sceneV2.hasConvertibleScene()
   * .then((has)=>{
   *   if(has) {
   *     Host.ui.openBatchConvertScenePage()
   *   }
   * })
   * @returns {Promise<boolean>}，true有，false没有
   */
  @report
  hasConvertibleScene = (param = undefined) => {
      if (param) {
        native.MIOTHost.isBatchConvertSceneVisisbleWith(param, (ok, has) => {
          if (ok) {
            resolve(has);
          } else {
            reject(has);
          }
        });
      } else {
        native.MIOTHost.isBatchConvertSceneVisisble((ok, has) => {
          if (ok) {
            resolve(has);
          } else {
            reject(has);
          }
        });
      }
    });
  }
  /**
   * @since 10077
   * 打开1.0场景转2.0场景的页面
   */
  @report
  openBatchConvertScenePage() {
  }
  /**
   * since 10085
   * 获取场景2.0的智能场景，/appgateway/miot/appsceneservice/AppSceneService/GetSceneList
   * 获取场景2.0did设备下的智能场景，包括手动场景和自动化场景 （不包含模板创建的场景列表）与loadSceneList接口的区别是没有强制校验deviceId为空
   * @param {string} homeId 家庭id
   * @param {string} deviceId 设备id
   * @returns {Promise<array>}
   */
  @report
  loadSceneListV2(homeId, deviceId) {
  }
  /**
   * since 10085
   * API:/app/appgateway/miot/appsceneservice/AppSceneService/Edit
   * 定时推送 具体参数详情可参考文档 https://xiaomi.f.mioffice.cn/docx/doxk4cdNLDvx52o6vAfNCSKU3qb 
   * @param {object} timer 定时
   * @param {int} timer.sceneId     场景ID，新建可以不传，编辑传
   * @param {string} timer.sceneName   场景名称
   * @param {string} timer.triggerId   自动化配置Id
   * @param {string} timer.triggerName 定时执行的名称
   * @param {string} timer.tagsSource xx设备插件创建的场景 例:"tags":{"source":"plugin-label-printer"}
   * @param {string} timer.extraIdentify 插件设备的did
   * @param {string} timer.extraJson   定时执行的扩展信息 例:"extra_json":{"did":xxxx}
   * @param {string} timer.actionTitle 动作标题
   * @param {string} timer.actionDesc  动作详情
   * @param {object} timer.payloadName 定时执行动作的名称
   * @param {string} timer.time 执行时间，crontab字符串 0 22 8 * * 1,2,3,4,5 * 
   * @example {string} time 执行一次，crontab字符串 0 2 12 27 8 * 2022
   * @example {string} time 每天，crontab字符串 0 2 12 * * * *
   * @example {string} time 每周二三，crontab字符串 0 2 12 * * 2,3 *
   * 
   * @returns {Promise<boolean>} true 修改成功，false修改失败
   */
  
  @report
  createPointTimerPush = (timer) => {
  }
}
const MiotSceneInstanceV2 = new IMiotSceneV2();
/**
 * @export
 */
export default MiotSceneInstanceV2;