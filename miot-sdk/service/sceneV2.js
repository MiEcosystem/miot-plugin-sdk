/**
 * @export public
 * @doc_name 场景模块
 * @doc_index 2
 * @doc_directory service
 * @module miot/service/sceneV2
 * @description 场景2.0相关服务
 */
import { report } from "../decorator/ReportDecorator";
/**
 * @export
 */
class IMiotSceneV2 {
  /**
   * since 10064
   * 获取场景2.0的智能场景，/appgateway/miot/appsceneservice/AppSceneService/GetSceneList
   * 获取场景2.0did设备下的智能场景，包括手动场景和自动化场景 （不包含模板创建的场景列表）
   * @param {string} deviceID 设备id
   * @param {string} homeID 家庭id
   * @returns {Promise<array>}
   */
  @report
  loadSceneList(homeID, deviceID) {
    if (!deviceID) {
      return Promise.reject("deviceID can not be null");
    }
    const params = {
      home_id: homeID,
      did: deviceID
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
  /**
   * since 10064
   * 获取场景2.0模板创建的场景列表，/app/appgateway/miot/appsceneservice/AppSceneService/GetTplSceneList
   * 获取场景2.0模板创建的场景列表
   * @param {string} deviceID 设备id
   * @param {string} homeID 家庭id
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
  loadTplSceneList(homeID, deviceID) {
    if (!deviceID) {
      return Promise.reject("deviceID can not be null");
    }
    const params = {
      home_id: homeID,
      did: deviceID
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
}
const MiotSceneInstanceV2 = new IMiotSceneV2();
/**
 * @export
 */
export default MiotSceneInstanceV2;