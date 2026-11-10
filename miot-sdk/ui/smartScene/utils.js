import Host from "../../Host";
import { Device, Package, Service } from "../../index";
/**
 * @description: 自动化模板工具类
 */
export class IftttTemplateUtils {
  /**
   * 获取当前选择的家信息
   * @returns {Promise<unknown> | Promise.Promise}
   */
  static getCurrentSelectHomeInfo() {
    return new Promise((resolve, reject) => {
      // 本需求随 11.7 版本发布，APP 版本一定满足，直接走 getCurrentSelectHomeInfo
      Device.getCurrentSelectHomeInfo().then(({ data }) => {
        resolve(data);
      }).catch((e) => {
        reject(e);
      });
    });
  }
  /**
   * 获取插件推荐模板列表V2
   * @param params
   * @returns {Promise | Promise<unknown> | Promise.Promise}
   * @since 10117
   */
  static getPluginRecommendTemplateList(params) {
    return Service.sceneV2.loadScenePluginRecommendTemplateListV2(params);
  }
  /**
   * 获取当前设备自动化信息
   * @param sceneListParams
   * @returns {Promise | Promise<unknown> | Promise.Promise}
   */
  static getGetSimpleSceneList(sceneListParams) {
    return Service.sceneV2.loadSimpleSceneList(sceneListParams);
  }
  static processTemplateList(tplSceneList, tpl_list) {
    const {
      manual_scene_info_list = [],
      auto_scene_info_list = [],
      voice_scene_info_list = [],
    } = tplSceneList || {};
    const scene_info_list = [...manual_scene_info_list, ...auto_scene_info_list, ...voice_scene_info_list];
    const existValue = (tpl_list || []).map((template) => {
      const {
        open_quantity,
        // recommend_reason,
        can_open,
        trigger_icon_list,
        action_icon_list,
        // bg_color,
        // text_color,
        name,
        template_id,
        template_type,
        // condition,
        // action,
        // trigger
      } = template;
      const tempScene = (scene_info_list || []).find((s) => s?.template_id === template_id);
      return {
        open_quantity,
        // recommend_reason,
        can_open,
        trigger_icon_list,
        action_icon_list,
        // bg_color,
        // text_color,
        name,
        openStatus: tempScene?.enable,
        template_id,
        scene_id: tempScene?.scene_id,
        template_type,
      };
    });
    return existValue;
  }
  /**
   * 获取插件推荐模板信息
   * @param device_type: string
   * @returns {Promise | Promise<unknown> | Promise.Promise}
   */
  static async getPluginRecommendTemplateInfo(device_type) {
    try {
      const currentHomeInfo = await IftttTemplateUtils.getCurrentSelectHomeInfo();
      const homeInfo = await Device.getCurrentSelectHomeInfo();
      const { homeId, ownerUid } = currentHomeInfo || {};
      const params = {
        home_id: homeId,
        did: Device.deviceID,
        owner_uid: ownerUid || Service.account.ID,
        type: 1,
        // 版本号 必须13.0
        max_version: "13.0",
        page: 1,
        page_size: 2,
        hasCar: true, // 用户是否有车 默认传true
        phoneDid: Host.phoneDid || "", // 手机did
      };
      if (device_type) {
        params.device_type = device_type;
      }
      if (homeInfo?.data?.ownerUid) params.owner_uid = homeInfo.data.ownerUid;
      const templateListRes = await IftttTemplateUtils.getPluginRecommendTemplateList(params);
      const sceneListParams = {
        home_id: homeId,
        did: Device.deviceID,
        get_type: 1,
        app_version: 17,
        owner_uid: ownerUid || Service.account.ID,
      };
      if (homeInfo?.data?.ownerUid) sceneListParams.owner_uid = homeInfo.data.ownerUid;
      let tplSceneList = [];
      // 获取场景失败，及没有对应场景
      try {
        tplSceneList = await IftttTemplateUtils.getGetSimpleSceneList(sceneListParams);
      } catch (e) {
      }
      tplSceneList = tplSceneList || [];
      let tpl_list = templateListRes.tpl_list || [];
      const pluginRecommendTemplateInfo = IftttTemplateUtils.processTemplateList(tplSceneList, tpl_list);
      return {
        code: 0,
        value: pluginRecommendTemplateInfo,
      };
    } catch (e) {
      return Promise.resolve({
        code: -1,
        value: [],
      });
    }
  }
  /**
   * 埋点上报
   * @param {string} event 事件名，如 'expose' / 'click' / 'view'
   * @param {Object} params 埋点参数。可传 ref / sub_ref 指定页面来源，传入时以调用方为准，
   *                        sub_ref 缺省时回落到 ref。
   *                        两者都不传时由 Native 用当前页面 ref 回填，可能是插件通用默认值
   *                        （plugin_homepage/<model>），会与卡片实际所在页面不符。
   */
  static async report(event, params) {
    let { ref, sub_ref, ...rest } = params || {};
    // 调用方传入的 ref / sub_ref 优先，sub_ref 未传时回落到 ref
    const pageRef = ref;
    const pageSubRef = sub_ref || ref;
    // iOS 侧此前漏传 ref / sub_ref，Native 只能用当前页面 ref 回填，
    // 导致卡片明明在插件首页、上报却是插件通用默认值，故按需补回
    const refParams = {};
    if (pageRef) {
      refParams.ref = pageRef;
    }
    if (pageSubRef) {
      refParams.sub_ref = pageSubRef;
    }
    const commonParams = Host.isAndroid ? {
      plugin_form: 0,
      did: Device.deviceID,
      device_model: Device.model,
      package_id: Package.packageID,
      package_name: Package.packageName,
      plugin_id: Package.pluginID,
      plugin_version: Package.version,
      user_type: 0,
      ref: pageRef,
      sub_ref: pageSubRef,
      belong_tag: 'plugin',
      ...rest,
    } : {
      did: Device.deviceID,
      device_model: Device.model,
      plugin_form: 0,
      user_type: 0,
      belong_tag: 'plugin',
      ...refParams,
      ...rest,
    };
    if (event === 'view' && Host.isAndroid) {
      await Service.smarthome.updatePluginPageRef({
        ...commonParams,
        ref: pageRef || this._ref,
        subRef: pageSubRef || this._subRef || this._ref,
      });
    } else {
      if (pageRef || pageSubRef) {
        await IftttTemplateUtils.updateRef(pageRef, pageSubRef, commonParams); // 20251010 android的expose事件会走到这里，加上公参
      }
      if (event === 'click') {
        Object.keys(rest).length > 0 && await Service.smarthome.reportEventRefChannel(event, commonParams);
      } else {
        await Service.smarthome.reportEventRefChannel(event, commonParams);
      }
    }
  }
  static _ref = "";
  static _subRef = "";
  static updateRef(ref, subRef, params) {
    let update = false;
    if (IftttTemplateUtils._ref !== ref && ref) {
      update = true;
      IftttTemplateUtils._ref = ref;
    }
    if (IftttTemplateUtils._subRef !== subRef) {
      update = !!IftttTemplateUtils._ref;
      IftttTemplateUtils._subRef = subRef;
    }
    update && Service.smarthome.updatePluginPageRef({
      ref: this._ref,
      subRef: subRef || ref,
      ...params,
    });
  }
}