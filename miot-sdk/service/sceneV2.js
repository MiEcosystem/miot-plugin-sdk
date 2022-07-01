/**
 * @export public
 * @doc_name 场景模块
 * @doc_index 2
 * @doc_directory service
 * @module miot/service/sceneV2
 * @description 场景2.0相关服务
 */
import { report } from "../decorator/ReportDecorator";
import { Device, Service } from 'miot';
/**
 * @export
 */
class IMiotSceneV2 {
  /**
   * since 10064
   * 获取场景2.0的智能场景，/appgateway/miot/appsceneservice/AppSceneService/GetSceneList
   * 获取场景2.0did设备下的智能场景，包括手动场景和自动化场景 （不包含模板创建的场景列表）
   * @param {string} homeId 家庭id
   * @param {string} deviceId 设备id
   * @returns {Promise<array>}
   */
  @report
  loadSceneList(homeId, deviceId) {
    if (!deviceId) {
      return Promise.reject("deviceId can not be null");
    }
    const params = {
      home_id: homeId,
      did: deviceId
    };
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/appgateway/miot/appsceneservice/AppSceneService/GetSceneList", params, (ok, res) => {
        if (ok && res?.scene_info_list) {
          resolve(res?.scene_info_list);
        } else {
          reject(res);
        }
      });
    });
  }
  @report
  loadSceneListByTags(tags = [], mode = 0, homeId, deviceId = Device.deviceID) {
    return new Promise((resolve, reject) => {
      (homeId ? Promise.resolve(homeId) : Device.getRoomInfoForCurrentHome().then((res) => {
        if (res?.data?.homeId) {
          return Promise.resolve(res.data.homeId);
        }
        return Promise.reject();
      })).then((homeId) => {
        native.MIOTRPC.standardCall('/appgateway/miot/appsceneservice/AppSceneService/GetSceneListByTags', {
          home_id: homeId,
          did: deviceId,
          tags,
          mode
        }, (ok, res) => {
          if (ok && res?.scene_info_list) {
            resolve(res.scene_info_list);
            return;
          }
          reject(res);
        });
      }).catch(reject);
    });
  }
  /**
   * since 10064
   * 获取场景2.0模板创建的场景列表，/app/appgateway/miot/appsceneservice/AppSceneService/GetTplSceneList
   * 场景2.0:模板创建的场景列表
   * @param {string} homeId 家庭id
   * @param {string} deviceId 设备id
   * @returns {Promise<array[object]>}
   * @example
   *  [{
        "template_id": "1343905190336802816",
      "scene_id": "1462743313128103936",
      "trigger_key_list": ["user.click"],
      "enable": true,
      "tpl_dids": []
      }, {
      "template_id": "1323546968919769088",
      "scene_id": "1466314707404251136",
      "trigger_key_list": ["location.enter_fence"],
      "enable": true,
      "tpl_dids": []
      }]
   */
  @report
  loadTplSceneList(homeId, deviceId) {
    if (!deviceId) {
      return Promise.reject("deviceId can not be null");
    }
    const params = {
      home_id: homeId,
      did: deviceId
    };
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/appgateway/miot/appsceneservice/AppSceneService/GetTplSceneList", params, (ok, res) => {
        if (ok && res?.scene_list) {
          resolve(res.scene_list);
        } else {
          reject(res);
        }
      });
    });
  }
  /**
   * since 10066
   * API:/app/appgateway/miot/appsceneservice/AppSceneService/GetCommonUsedSceneList
   * 场景2.0:获取常用手动场景场景列表
   * @param {string} homeId 家庭id
   * @param {string} ownerId 所属的uid
   * @param {boolean} needRecommendedTemplate 是否包含推荐模板，默认true
   * @returns {Promise<array[object]>}
   * @example
   * [
      {
        "scene_id": "string",
        "scene_name": "string",
        "scene_type": 0,
        "icon": "string",
        "update_time": "string",
        "template_id": "string"
      }
    ]
   */
  @report
  loadCommonUsedSceneList(homeId, ownerId, needRecommendedTemplate = true) {
    if (!homeId || !ownerId) {
      return Promise.reject("homeId or ownerId can not be null");
    }
    const params = {
      home_id: homeId,
      owner_uid: ownerId,
      need_recommended_template: needRecommendedTemplate
    };
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/appgateway/miot/appsceneservice/AppSceneService/GetCommonUsedSceneList", params, (ok, res) => {
        if (ok && res?.common_use_scene) {
          resolve(res.common_use_scene);
        } else {
          reject(res);
        }
      });
    });
  }
  /**
   * since 10066
   * API:/app/appgateway/miot/appsceneservice/AppSceneService/ChangeCommonUsedSceneOrder
   * 场景2.0:修改常用场景顺序
   * @param {string} homeId 家庭id
   * @param {array<string>} sceneIds 场景IDs
   * @param {string} ownerId 所属的uid
   * @returns {Promise<object>}
   */
  @report
  changeCommonUsedSceneOrder(homeId, sceneIds, ownerId) {
    if (!sceneIds || !homeId || !ownerId) {
      return Promise.reject("sceneIds or homeId or ownerId can not be null");
    }
    const params = {
      home_id: homeId,
      owner_uid: ownerId,
      scene_ids: sceneIds
    };
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/appgateway/miot/appsceneservice/AppSceneService/ChangeCommonUsedSceneOrder", params, (ok, res) => {
        if (ok && res) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  /**
   * since 10066
   * API:/app/appgateway/miot/appsceneservice/AppSceneService/UpdateCommonUsedSceneName
   * 场景2.0:修改场景名称
   * @param {string} sceneId 场景ID
   * @param {string} sceneName 场景名称
   * @param {number} sceneType 场景类型
   * @returns {Promise<boolean>} true 修改成功，false修改失败
   */
  @report
  updateCommonUsedSceneName(sceneId, sceneName, sceneType = 0) {
    if (!sceneId || !sceneName) {
      return Promise.reject("sceneId or sceneName can not be null");
    }
    const params = {
      scene_id: sceneId,
      scene_name: sceneName,
      scene_type: sceneType
    };
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall("/appgateway/miot/appsceneservice/AppSceneService/UpdateCommonUsedSceneName", params, (ok, res) => {
        if (ok && res) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
}
const MiotSceneInstanceV2 = new IMiotSceneV2();
/**
 * @export
 */
export default MiotSceneInstanceV2;
export function createAction(payload, config) {
  return {
    group_id: 0,
    id: 0,
    type: 0,
    name: '',
    protocol_type: 2,
    from: 5,
    payload_json: {
      command: 'set_properties',
      delay_time: 0,
      device_name: Device.name,
      did: Device.deviceID,
      model: Device.model,
      value: '',
      ...(payload || {})
    },
    ...(config || {})
  };
}
export function createActions(actions = [], mode = 0) {
  return {
    mode,
    actions: actions.filter((action) => !!action).map((action, index) => {
      return {
        order: index + 1,
        ...action
      };
    })
  };
}
export function createTrigger(trigger) {
  return {
    id: 0,
    src: 'user',
    key: 'user.click',
    extra: '',
    name: '',
    value_type: 5,
    extra_json: null,
    value_json: null,
    protocol_type: 2,
    ...(trigger || {})
  };
}
export function createTriggers(triggers = [], express = 0) {
  return {
    express,
    triggers: triggers.filter((trigger) => !!trigger).map((trigger, index) => {
      return {
        order: index + 1,
        ...trigger
      };
    })
  };
}
export function createCondition(condition) {
  return createTrigger(condition);
}
export function createConditions(conditions, express) {
  return createTriggers(conditions, express);
}
export function createTimewindow(config) {
  return {
    from: '0 0 0 * * * *',
    to: '0 0 0 * * * *',
    filter: '',
    extra: '',
    ...(config || {})
  };
}
export function saveScene(config, timewindow, condition, trigger, action) {
  return Device.getRoomInfoForCurrentHome().then((res) => {
    const { homeId } = res?.data || {};
    if (!homeId) {
      return Promise.reject({
        msg: 'get homeId fail'
      });
    }
    const scene = {
      // scene_id 有，则为修改，否则为新建
      // scene_id: undefined,
      uid: Service.account.ID,
      home_id: homeId,
      scene_name: '',
      template_id: '0',
      edit_from: 1,
      common_use: false,
      enable: true,
      enable_push: false,
      // value_json: 1,
      value_format: 1,
      timewindow: timewindow || createTimewindow(),
      scene_condition: condition || createConditions(),
      scene_trigger: trigger || createTriggers([createTrigger()]),
      scene_action: action || createActions(),
      ...(config || {})
    };
    return MiotSceneInstanceV2.editScene(scene).then((res) => {
      return {
        ...scene,
        ...(res || {})
      };
    });
  });
}