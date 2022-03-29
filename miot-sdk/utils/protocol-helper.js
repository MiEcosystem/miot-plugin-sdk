/**
 * 云端隐私通知类型
 * @namespace CLOUD_PRIVACY_EVENT_TYPE
 */
export const CLOUD_PRIVACY_EVENT_TYPE = {
  // 已经同意过云端隐私弹窗或者点击同意云端隐私弹窗
  AGREED: 'agreed',
  // 获取同意状态失败或者弹窗失败
  FAILED: 'failed',
  // 没有同意过云端隐私弹窗,需要弹窗,且弹窗成功
  POP_DIALOG_SUCCESS: 'pop_dialog_success'
};
Object.freeze(CLOUD_PRIVACY_EVENT_TYPE);
export const PrivacyEvent = {
  /**
   * 云端隐私状态通知,通知为
   * {eventType: CLOUD_PRIVACY_EVENT_TYPE中的某个值,
   * eventMessage: String类型,通知消息}
   * @event
   * @since 10064
   */
  cloudPrivacyEvent: { always: true }
};
  }
};
buildEvents(UserExpPlanEvent);
function fetchPluginInfo() {
  return new Promise((resolve, reject) => {
    native.MIOTRPC.standardCall('/v2/plugin/fetch_plugin', {
      latest_req: {
        plugins: [{ model: Device.model }],
        app_platform: isAndroid ? 'Android' : 'IOS',
        api_version: isAndroid ? native.MIOTHost.systemInfo.hostApiLevel : native.MIOTHost.apiLevel,
        packageType: '',
        region: isAndroid ? 'CN' : 'zh'
      }
    }, (ok, res) => {
      const lastest = res && res.latest_info && res.latest_info[0] ? res.latest_info[0] : {};
      const { plugin_id, version: plugin_version } = lastest;
      if (plugin_id && plugin_version) {
        resolve({
          plugin_id,
          plugin_version
        });
        return;
      }
      reject();
    });
  });
}
let resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
export default class ProtocolManager {
  static _legalInfoAuthHasShowed = false;
  static _HostUILegalAlertHasShowed = false;
  static _SendCloudPrivacyEventFinished = false;
  static _UniUrl = 'https://home.mi.com/miot/activity/privacy/index.html';
  static ProtocolManager_NeedShowPrivacyAlert = 'ProtocolManager_NeedShowPrivacyAlert';
  static ProtocolManager_OldNetProtocolProceed = 'ProtocolManager_OldNetProtocolProceed';
  static ProtocolManager_PrivacyShowing = 'ProtocolManager_PrivacyShowing'; // 隐私弹窗已经在展示中
  static ProtocolManager_PrivacyAgree = 'ProtocolManager_PrivacyAgree'; // 同意新弹出的在线隐私
  static ProtocolManager_PrivacyAgreedBefore = 'ProtocolManager_PrivacyAgreedBefore'; // 之前已经同意了在线隐私
  static ProtocolManager_PrivacyAgreeChanges = 'ProtocolManager_PrivacyAgreeChanges'; // 同意新弹出的更新的隐私
  static ProtocolManager_PrivacyRejected = 'ProtocolManager_PrivacyRejected'; // 拒绝隐私，外部需要退出插件
  static ProtocolManager_PrivacyAgreeLocal = 'ProtocolManager_PrivacyAgreeLocal'; // 之前同意了本地隐私的判断
  static ProtocolManager_PrivacyUrlEmpty = 'ProtocolManager_PrivacyUrlEmpty'; // 获取到的在线隐私连接为空
  static pluginLegalInformationCheck() {
    // 原生插件转RN在iOS上会保存-99 导致隐私无法弹出。现在恢复这个本地记录保存为‘’，保证能够弹出
    let model = Device.model;
    if (model) {
      let gategroy = model.split('.')[1] || '';
      if (['camera', 'cateye'].indexOf(gategroy) !== -1) {
        ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 隐私前置判断-99，gategroy', gategroy);
        Device.getNativePrivacyConfirmationVersion().then((res) => {
          let localVer = res?.data?.version;
          if (localVer === '-99') {
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 隐私前置判断 setNativePrivacyConfirmationVersion 为空');
            Device.setNativePrivacyConfirmationVersion({ 'version': '' });
          }
        }).catch(() => {
          ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 隐私前置判断 getNativePrivacyConfirmationVersion catch');
        });
      }
    }
    ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 进入隐私判断逻辑 enter');
    return new Promise((resolve, reject) => {
      let netVer = Device.lastestPrivacyVersion;
      ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager', 'netVer: ', netVer);
      if (!netVer) {
        ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 不存在netversion，回退到旧版隐私逻辑');
        // 不存在在线隐私，回退到旧版隐私逻辑，本地隐私逻辑在Host.ui.alertLegalInformationAuthorization中控制拦截弹出
        Device.getNativePrivacyConfirmationVersion().then((res1) => {
          let localVer = res1?.data?.version;
          if (!localVer) {
            ProtocolManager.getBatchAuthConfigDatas().then(() => {
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] netVer nil 云端没有旧版本的隐私同意记录');
              // 云端没有旧版本的隐私同意记录且本地也没有隐私的同意记录 需要尝试弹出隐私 （不一定能弹出，因为可能没有上传在线隐私）
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] netVer nil 云端没有旧版本的隐私同意记录且本地也没有隐私的同意记录 需要尝试弹出隐私 （不一定能弹出，因为可能没有上传在线隐私）');
              let params = {
                'setPrivacyConfirmationInfo': true,
                'privacyVersion': '-101',
                'privacyType': 1,
                'privacyId': Device.pd_id
              };
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 尝试获取在线隐私url并展示在线隐私', 'params: ', params);
              ProtocolManager.getLegalAuthInfoProtocolAndAlertPrivacyWithParams(params, true).then((res) => {
                ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.AGREED, 'native local null,cloud need show,click agree');
                resolve({ 'code': 0, 'data': { 'result': ProtocolManager.ProtocolManager_PrivacyAgree } });
              }).catch((err) => {
                ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 获取在线隐私 catch', 'err: ', err);
                if (err == ProtocolManager.ProtocolManager_PrivacyUrlEmpty) {
                  let isIgnore = PluginAppConfigHelper.pluginAppConfigValueForKey('ignore_default_native_privacy_version', true);
                  ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 获取在线隐私 isIgnore:', isIgnore);
                  if (!isIgnore) {
                    ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 尝试设置默认本地隐私版本');
                    ProtocolManager.setDefaultNativeVersion();
                  }
                }
                ProtocolManager.protocolMangerReportLog('[Privacy Debug] -1012, ProtocolManager_Net0Local0 err:', err);
                if (!(err === ProtocolManager.ProtocolManager_PrivacyRejected)) {
                  ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.FAILED, `native local null,cloud need show,show error,error=${ err }`);
                }
                // 点击取消会走到这里
                reject({ 'code': -1012, 'message': err });
              });
            }).catch((err) => {
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager getBatchAuthConfigDatas err:', err);
              if (err == ProtocolManager.BatchAuthConfig_ALREADYAUTHED) {
                ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager BatchAuthConfig_ALREADYAUTHED');
                // 云端存在旧版本的隐私同意记录  代表之前用户点击过同意隐私，需要上报同意版本
                ProtocolManager.protocolMangerReportLog('[Privacy Debug] netVer nil 云端存在旧版本的隐私同意记录  代表之前用户点击过同意隐私，需要上报同意版本');
                ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.AGREED, 'native local null,cloud agreed');
                Device.setNativePrivacyConfirmationVersion({ 'version': '-100' });
                reject({ 'code': -1017, 'message': ProtocolManager.ProtocolManager_OldNetProtocolProceed });
              } else {
                // 网络错误或获取到的在线隐私连接为空时会走到这里
                ProtocolManager.protocolMangerReportLog('[Privacy Debug] netVer nil fetch getBatchAuthConfigDatas error: ', err);
                ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.FAILED, `native local null,cloud error,error=${ err }`);
                reject({ 'code': -1018, 'message': 'fetch getBatchAuthConfigDatas error' });
              }
            });
          } else {
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager', 'localVer: ', localVer);
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager netVer nil ProtocolManager_PrivacyAgreeLocal');
            ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.AGREED, `native local agreed,ver=${ localVer }`);
            resolve({ 'code': 0, 'data': { 'result': ProtocolManager.ProtocolManager_PrivacyAgreeLocal } });
          }
        }).catch((err1) => {
          ProtocolManager.getBatchAuthConfigDatas().then(() => {
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] netVer nil 云端没有旧版本的隐私同意记录');
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager net nil getNativePrivacyConfirmationVersion err:', err1);
            // 云端没有旧版本的隐私同意记录且获取本地隐私失败 需要尝试弹出隐私 （不一定能弹出，因为可能没有上传在线隐私）
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] netVer nil 云端没有旧版本的隐私同意记录且获取本地隐私失败 需要尝试弹出隐私 （不一定能弹出，因为可能没有上传在线隐私）');
            let params = {
              'setPrivacyConfirmationInfo': true,
              'privacyVersion': '-101',
              'privacyType': 1,
              'privacyId': Device.pd_id
            };
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 尝试获取在线隐私url并展示在线隐私', 'params: ', params);
            ProtocolManager.getLegalAuthInfoProtocolAndAlertPrivacyWithParams(params, true).then((res) => {
              ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.AGREED, 'native error,cloud need show,click agree');
              resolve({ 'code': 0, 'data': { 'result': ProtocolManager.ProtocolManager_PrivacyAgree } });
            }).catch((err) => {
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager ProtocolManager_Net0Local0', 'err:', err);
              // 点击取消会走到这里
              if (!(err === ProtocolManager.ProtocolManager_PrivacyRejected)) {
                ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.FAILED, `native error,cloud need show,show error,error=${ err }`);
              }
              reject({ 'code': -1019, 'message': err });
            });
          }).catch((err) => {
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager getBatchAuthConfigDatas err:', err);
            if (err == ProtocolManager.BatchAuthConfig_ALREADYAUTHED) {
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager BatchAuthConfig_ALREADYAUTHED');
              // 云端存在旧版本的隐私同意记录  代表之前用户点击过同意隐私，需要上报同意版本
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] netVer nil 云端存在旧版本的隐私同意记录  代表之前用户点击过同意隐私，需要上报同意版本');
              ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.AGREED, 'native error,cloud agreed');
              Device.setNativePrivacyConfirmationVersion({ 'version': '-100' });
              reject({ 'code': -1020, 'message': ProtocolManager.ProtocolManager_OldNetProtocolProceed });
            } else {
              // 网络错误或获取到的在线隐私连接为空时会走到这里
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] netVer nil fetch getBatchAuthConfigDatas error: ', err);
              ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.FAILED, `native error,cloud error,error=${ err }`);
              reject({ 'code': -1021, 'message': 'fetch getBatchAuthConfigDatas error' });
            }
          });
        });
        return;
      }
      ProtocolManager.protocolMangerReportLog('[Privacy Debug] 存在netversion，进入新版判断');
      Device.getNativePrivacyConfirmationVersion().then((res1) => {
        ProtocolManager.protocolMangerReportLog('[Privacy Debug] getNativePrivacyConfirmationVersion', res1);
        let localVer = res1?.data?.version;
        if (!localVer) {
          ProtocolManager.protocolMangerReportLog('[Privacy Debug] getNativePrivacyConfirmationVersion netVer exist localVer nil');
          ProtocolManager.getBatchAuthConfigDatas().then(() => {
            // 云端没有旧版本的隐私同意记录且获取本地隐私失败 需要尝试弹出隐私 （不一定能弹出，因为可能没有上传在线隐私）
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] 云端没有旧版本的隐私同意记录且获取本地隐私失败 需要尝试弹出隐私 （不一定能弹出，因为可能没有上传在线隐私）');
            let params = {
              'setPrivacyConfirmationInfo': true,
              'privacyVersion': netVer,
              'privacyType': 1,
              'privacyId': Device.pd_id
            };
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 尝试获取在线隐私url并展示在线隐私', 'params: ', params);
            ProtocolManager.getLegalAuthInfoProtocolAndAlertPrivacyWithParams(params, true).then((res) => {
              ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.AGREED, `netVer=${ netVer },native local null,cloud need show,click agree`);
              resolve({ 'code': 0, 'data': { 'result': ProtocolManager.ProtocolManager_PrivacyAgree } });
            }).catch((err) => {
              if (err == ProtocolManager.ProtocolManager_PrivacyUrlEmpty) {
                let isIgnore = PluginAppConfigHelper.pluginAppConfigValueForKey('ignore_default_native_privacy_version', true);
                ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 获取在线隐私 isIgnore:', isIgnore);
                if (!isIgnore) {
                  ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager 尝试设置默认本地隐私版本');
                  ProtocolManager.setDefaultNativeVersion();
                }
              }
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager ProtocolManager_Net1Local0Config0', 'err:', err);
              // 点击取消会走到这里
              if (!(err === ProtocolManager.ProtocolManager_PrivacyRejected)) {
                ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.FAILED, `netVer=${ netVer },native local null,cloud need show,show error,error=${ err }`);
              }
              reject({ 'code': -1012, 'message': err });
            });
          }).catch((err) => {
            if (err == ProtocolManager.BatchAuthConfig_ALREADYAUTHED) {
              // 云端存在旧版本的隐私同意记录  代表之前用户点击过同意隐私,但是本地没有记录,不知道同意的版本,这种情况不弹更新弹窗
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] BatchAuthConfig_ALREADYAUTHED 进入隐私更新弹窗逻辑');
              ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.AGREED, `netVer=${ netVer },native local null,cloud agreed`);
              // 有云端隐私变更版本a，没有本地隐私同意记录，有云端同意记录的情况，本次不弹更新弹窗，把a保存为本地同意记录,方便后续弹升级弹窗
              Device.setNativePrivacyConfirmationVersion({ 'version': netVer });
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager_NoNeedToGetPrivacyChanges');
              reject({ 'code': -1030, 'message': 'ProtocolManager_NoNeedToGetPrivacyChanges' });
            } else {
              // 网络错误或获取到的在线隐私连接为空时会走到这里
              ProtocolManager.protocolMangerReportLog('[Privacy Debug] netVer nil fetch getBatchAuthConfigDatas error: ', err);
              ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.FAILED, `netVer=${ netVer },native error,cloud error,error=${ err }`);
              reject({ 'code': -1018, 'message': 'fetch getBatchAuthConfigDatas error' });
            }
          });
          return;
        }
        ProtocolManager.protocolMangerReportLog('[Privacy Debug] getNativePrivacyConfirmationVersion netVer exist localVer exist');
        ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.AGREED, `netVer=${ netVer },native local agreed,ver=${ localVer }`);
        let localVerInt = parseInt(localVer);
        let netVerInt = parseInt(netVer);
        ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager', 'netVerInt: ', netVerInt);
        ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager', 'localVerInt: ', localVerInt);
        if (localVerInt >= netVerInt) {
          resolve({ 'code': 0, 'data': { 'result': ProtocolManager.ProtocolManager_PrivacyAgreedBefore } });
          return;
        }
        // 隐私更新弹窗逻辑
        ProtocolManager.protocolMangerReportLog('[Privacy Debug] 进入隐私更新弹窗逻辑');
        // 文档：https://xiaomi.f.mioffice.cn/docs/dock4m7B3rdcTXhn5sKfFRhIemf
        Service.smarthome.getPrivacyChanges(localVer).then((res) => {
          ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager getPrivacyChanges', 'res:', res);
          let change_log = res?.change_log;
          let pop_type = res?.pop_type; // //0-不弹窗 1-弹窗告知 2-弹窗获得同意
          let change_version = res?.ver;
          if (pop_type && pop_type != 0) {
            if (!change_version) {
              change_version = netVer;
            }
            if (!change_log) {
              change_log = '隐私更新';
            }
            let params = {
              'setPrivacyConfirmationInfo': true,
              'privacyChanges': change_log,
              'popType': pop_type,
              'privacyVersion': change_version,
              'privacyType': 1,
              'privacyId': Device.pd_id
            };
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] 弹出隐私更新弹窗逻辑', params);
            ProtocolManager.getLegalAuthInfoProtocolAndAlertPrivacyWithParams(params).then((res) => {
              resolve({ 'code': 0, 'data': { 'result': ProtocolManager.ProtocolManager_PrivacyAgreeChanges } });
            }).catch((err) => {
              // 点击取消隐私会走到这里
              reject({ 'code': -1003, 'message': 'ProtocolManager_EnterChangeButError', 'error': err });
            });
          } else {
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager_EnterChangeButPoptype 0');
            reject({ 'code': -1088, 'message': 'ProtocolManager_EnterChangeButPoptype 0' });
          }
        }).catch((err) => {
          ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager_FetchPrivacyChangesError ', err);
          reject({ 'code': -1004, 'message': 'ProtocolManager_FetchPrivacyChangesError', 'error': err });
        });
      }).catch((err) => {
        ProtocolManager.protocolMangerReportLog('[Privacy Debug] ProtocolManager_FetchLocalPrivacyVersionError ：', err);
        ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.FAILED, `netVer=${ netVer },native error`);
        reject({ 'code': -1005, 'message': 'ProtocolManager_FetchLocalPrivacyVersionError', 'error': err });
      });
    });
  }
  static getLegalAuthInfoProtocolAndAlertPrivacyWithParams(params = {}, ifSendCloudPrivacyEvent = false) {
    return new Promise((resolve, reject) => {
      ProtocolManager.getLegalAuthInfoProtocol().then((protocol) => {
        if (true == ProtocolManager.getLegalInfoAuthHasShowed()) {
          reject(ProtocolManager.ProtocolManager_PrivacyShowing);
          return;
        }
        let protocolCopy = Object.assign(params, protocol);
        ProtocolManager.protocolMangerReportLog('[Privacy Debug] child ProtocolManager DeviceEventEmitter emit');
        DeviceEventEmitter.emit('MH_Event_ShowPrivacyLicenseDialog', { isShowingPrivacyLicenseDialog: true });
        if (ifSendCloudPrivacyEvent) {
          ProtocolManager.sendCloudPrivacyEvent(CLOUD_PRIVACY_EVENT_TYPE.POP_DIALOG_SUCCESS, 'pop dialog success');
        }
        ProtocolManager.setLegalInfoAuthHasShowed(true);
        ProtocolManager.showProcotolAlert(protocolCopy).then(resolve).catch(reject);
      }).catch(reject);
    });
  }
  static showProcotolAlert(protocol) {
    return new Promise((resolve, reject) => {
      ProtocolManager.protocolMangerReportLog('[Privacy Debug] child ProtocolManager showProcotolAlert 弹出在线隐私');
      native.MIOTHost.showDeclarationWithConfig(protocol, (ret) => {
        if (ret === 'ok' || ret === true || ret === 'true') {
          Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_auth_config": JSON.stringify({ 'privacyAuthed': true }) } }]);
          resolve('ok');
        } else {
          reject(ProtocolManager.ProtocolManager_PrivacyRejected);
        }
      });
    });
  }
  static BatchAuthConfig_ALREADYAUTHED = 'already authed, save property';
  static getBatchAuthConfigDatas() {
    return new Promise((resolve, reject) => {
      Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_auth_config"] }]).then((res) => {
        let alreadyAuthed = true;
        if (!res) {
          reject("getBatchAuthConfigDatas data error res null");
          return;
        }
        let result = res[Device.deviceID];
        if (!result) {
          reject("getBatchAuthConfigDatas data error result null");
          return;
        }
        let config = result['prop.s_auth_config'];
        if (config) {
          try {
            let authJson = JSON.parse(config);
            alreadyAuthed = authJson.privacyAuthed && true;
          } catch (err) {
            reject("getBatchAuthConfigDatas json parse error");
            return;
          }
        } else {
          // 设备初识化进入 没有注册过这个设备的s_auth_config属性就会为null 并不代表已经同意了用户协议
          alreadyAuthed = false;
        }
        if (alreadyAuthed) {
          reject(ProtocolManager.BatchAuthConfig_ALREADYAUTHED);
        } else {
          resolve(true);
          return;
        }
      }).catch(reject);
    });
  }
  // 获取在线隐私，并检查有效性
  static getLegalAuthInfoProtocol() {
    ProtocolManager.protocolMangerReportLog('[Privacy Debug] child ProtocolManager getLegalAuthInfoProtocol enter');
    return new Promise((resolve, reject) => {
      let { model } = Device;
      let plugin_id = native.MIOTPackage.pluginID;
      let plugin_version = native.MIOTPackage.version;
      let language = LanguageMap[native.MIOTHost.language] || native.language;
      if (__DEV__) {
        let miot_debug = global.variables?.miot_debug;
        if (miot_debug) {
          ProtocolManager.protocolMangerReportLog('[Privacy Debug]通过指定的 plugin_id 和 plugin_version 来获取在线隐私连接，miot_debug: ', miot_debug);
          console.log && console.log('[Privacy Debug]通过指定的 plugin_id 和 plugin_version 来获取在线隐私连接，miot_debug: ', miot_debug);
          let miot_debug_plugin_id = miot_debug.miot_debug_plugin_id;
          let miot_debug_plugin_version = miot_debug.miot_debug_plugin_version;
          if (miot_debug_plugin_id && miot_debug_plugin_version) {
            ProtocolManager.protocolMangerReportLog('[Privacy Debug]通过指定的 plugin_id 和 plugin_version 来获取在线隐私连接，miot_debug_plugin_id: ', miot_debug_plugin_id, 'miot_debug_plugin_version: ', miot_debug_plugin_version);
            console.log && console.log('[Privacy Debug]通过指定的 plugin_id 和 plugin_version 来获取在线隐私连接，miot_debug_plugin_id: ', miot_debug_plugin_id, 'miot_debug_plugin_version: ', miot_debug_plugin_version);
            plugin_id = miot_debug_plugin_id;
            plugin_version = miot_debug_plugin_version;
          }
        }
      }
      let packageName = native.MIOTPackage.packageName;
      (SpecPackageNames.includes(packageName) ? fetchPluginInfo() : Promise.resolve({
        plugin_id,
        plugin_version
      })).then(({
        plugin_id,
        plugin_version
      }) => {
        Service.getServerName().then((server) => {
          let country = server.countryCode;
          let serverCode = (server.serverCode || country).toLowerCase();
          let baseParams = {
            model,
            plugin_id,
            plugin_version,
            country,
            language
          };
          let params = [1, 2, 3, 4].map((type_int) => {
            return {
              ...baseParams,
              type_int
            };
          });
          Promise.all(params.map((p) => {
            return Service.smarthome.getProtocolUrls(p);
          })).then(([privacy, agreement, experiencePlan, childrenUrl]) => {
            // get
            let privacyURL = privacy.html_url ? ProtocolManager._resolveUniUrlV2(ProtocolManager._UniUrl, params[0], serverCode) : '';
            let agreementURL = agreement.html_url ? ProtocolManager._resolveUniUrlV2(ProtocolManager._UniUrl, params[1], serverCode) : '';
            let experiencePlanURL = experiencePlan.html_url ? ProtocolManager._resolveUniUrlV2(ProtocolManager._UniUrl, params[2], serverCode) : '';
            let childrenURL = childrenUrl.html_url ? ProtocolManager._resolveUniUrlV2(ProtocolManager._UniUrl, params[3], serverCode) : '';
            let option = ProtocolManager.resolveUrlOption({ 'privacyURL': privacyURL, 'agreementURL': agreementURL, 'experiencePlanURL': experiencePlanURL, 'privacyURLForChildren': childrenURL });
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] getLegalAuthInfoProtocol original result', option);
            // check
            if (!option.privacyURL || option.privacyURL.length <= 0) {
              reject(ProtocolManager.ProtocolManager_PrivacyUrlEmpty);
              return;
            }
            // 如果无效url 则不添加对应属性，增加隐藏标识
            if (!option.agreementURL || option.agreementURL.length == 0) {
              option.hideAgreement = true;
            }
            if (!option.experiencePlanURL || option.experiencePlanURL.length == 0) {
              option.hideUserExperiencePlan = true;
            }
            ProtocolManager.protocolMangerReportLog('[Privacy Debug] getLegalAuthInfoProtocol resolved result', option);
            resolve(option);
          }).catch(reject);
        }).catch(reject);
      }).catch(reject);
    });
  }
  static setDefaultNativeVersion() {
    setTimeout(() => {
      Device.getNativePrivacyConfirmationVersion().then((res) => {
        if (__DEV__) {
          return;
        }
        if (ProtocolManager.getLegalInfoAuthHasShowed()) {
          return;
        }
        if (ProtocolManager.getHostUILegalAlertHasShowed()) {
          return;
        }
        let localVer = res?.data?.version;
        if (!localVer || localVer == '') {
          ProtocolManager.protocolMangerReportLog('[Privacy Debug] child 设置默认同意记录 为 -2 成功');
          Device.setNativePrivacyConfirmationVersion({ 'version': '-2' });
          ProtocolManager.setHostUILegalAlertHasShowed(false);
        }
      }).catch();
    }, 3000);
  }
  static setLegalInfoAuthHasShowed(showed) {
    ProtocolManager.protocolMangerReportLog('[Privacy Debug] child setLegalInfoAuthHasShowed : ', showed);
    ProtocolManager._legalInfoAuthHasShowed = showed;
  }
  static getLegalInfoAuthHasShowed() {
    ProtocolManager.protocolMangerReportLog('[Privacy Debug] child getLegalInfoAuthHasShowed', ProtocolManager._legalInfoAuthHasShowed);
    return ProtocolManager._legalInfoAuthHasShowed;
  }
  static setHostUILegalAlertHasShowed(showed) {
    ProtocolManager.protocolMangerReportLog('[Privacy Debug] child setHostUILegalAlertHasShowed:', showed);
    ProtocolManager._HostUILegalAlertHasShowed = showed;
  }
  static getHostUILegalAlertHasShowed() {
    ProtocolManager.protocolMangerReportLog('[Privacy Debug] child getHostUILegalAlertHasShowed');
    return ProtocolManager._HostUILegalAlertHasShowed;
  }
  static setSendCloudPrivacyEventFinished(showed) {
    ProtocolManager.protocolMangerReportLog('[Privacy Debug] child setSendCloudPrivacyEventFinished:', showed);
    ProtocolManager._SendCloudPrivacyEventFinished = showed;
  }
  static getSendCloudPrivacyEventFinished() {
    ProtocolManager.protocolMangerReportLog('[Privacy Debug] child getSendCloudPrivacyEventFinished:', ProtocolManager._SendCloudPrivacyEventFinished);
    return ProtocolManager._SendCloudPrivacyEventFinished;
  }
  static _resolveUniParamsV2(params) {
    let ret = ['auth=1'];
    for (let k in params) {
      if (params.hasOwnProperty(k)) {
        ret.push(`${ k }=${ params[k] }`);
      }
    }
    return ret.join('&');
  }
  static _resolveUniUrlV2(url, params, serverCode) {
    if (!url) {
      return '';
    }
    if (serverCode && serverCode !== 'cn') {
      url = url.replace('//', `//${ serverCode }.`);
    }
    return url + (url.indexOf('?') > -1 ? '&' : '?') + ProtocolManager._resolveUniParamsV2(params);
  }
  static resolveUrl(rawUrl) {
    let newUrl = resolveAssetSource(rawUrl);
    if (newUrl && (newUrl.uri || Array.isArray(newUrl))) {
      if (typeof newUrl.uri === 'string') {
        if (isAndroid) {
          return [{ uri: newUrl.uri }];
        } else {
          return newUrl.uri;
        }
      }
    }
  }
  static resolveUrlWithLink(url) {
    if (typeof url === 'string' && (/https?:\/\//i).test(url)) {
      return isAndroid ? [{ uri: url }] : url;
    }
    return ProtocolManager.resolveUrl(url);
  }
  /**
   *隐私需要转换一次url
   * */
  static resolveUrlOption(optionOriginal) {
    // 先进行拷贝,不改变原始option对象
    let option = Object.assign({}, optionOriginal);
    if (option.privacyURL) {
      option.privacyURL = ProtocolManager.resolveUrlWithLink(option.privacyURL);
    }
    if (!option.agreementURL || option.hideAgreement) {
      delete option['agreementURL'];
    } else {
      option.agreementURL = ProtocolManager.resolveUrlWithLink(option.agreementURL);
    }
    if (!option.experiencePlanURL || option.hideUserExperiencePlan) {
      delete option['experiencePlanURL'];
    } else {
      option.experiencePlanURL = ProtocolManager.resolveUrlWithLink(option.experiencePlanURL);
    }
    if (!option.privacyURLForChildren) {
      // undefined 和 '' 空字符串的时候需要删除掉，iOS bug 为空字符串时会认为有值
      delete option['privacyURLForChildren'];
    } else {
      option.privacyURLForChildren = ProtocolManager.resolveUrlWithLink(option.privacyURLForChildren);
    }
    if (!option.privacyURLForWatch) {
      // undefined 和 '' 空字符串的时候需要删除掉，iOS bug 为空字符串时会认为有值
      delete option['privacyURLForWatch'];
    } else {
      option.privacyURLForWatch = ProtocolManager.resolveUrlWithLink(option.privacyURLForWatch);
    }
    return option;
  }
  static protocolMangerReportLog(...logs) {
    Service.smarthome.reportSDKFileLog(...logs);
  }
  static sendCloudPrivacyEvent(type, message) {
    console.log('Package check pluginLegalInformationCheck sendCloudPrivacyEvent,type: ', type, ',message:', message);
    ProtocolManager.protocolMangerReportLog('[Privacy Debug Event] sendCloudPrivacyEvent,type:', type, ',message:', message);
    // 如果已经发送完毕,则不能再发送事件
    if (ProtocolManager.getSendCloudPrivacyEventFinished()) {
      console.log('Package check pluginLegalInformationCheck sendCloudPrivacyEvent already finished');
      ProtocolManager.protocolMangerReportLog('[Privacy Debug Event] sendCloudPrivacyEvent already finished');
      return;
    }
    if (!(type === CLOUD_PRIVACY_EVENT_TYPE.POP_DIALOG_SUCCESS)) {
      ProtocolManager.setSendCloudPrivacyEventFinished(true);
    }
    PrivacyEvent.cloudPrivacyEvent.emit({ eventType: type, eventMessage: message });
  }
}