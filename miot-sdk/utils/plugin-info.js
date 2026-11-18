import native, { isAndroid } from "../native";
/**
 * @description 获取插件信息，
 *
 * @export fetchPluginInfos
 * @param {array<string>} [models=[]] 需要获取的插件model
 * @param {array<object>} [specifiedModelVersions=[]] 需要获取的指定版本插件model和版本
 * @return {Promise<array>} 
 */
export function fetchPluginInfos(models = [], specifiedModelVersions = []) {
  return new Promise((resolve, reject) => {
    native.MIOTRPC.standardCall('/v2/plugin/fetch_plugin', {
      latest_req: {
        plugins: models.map((model) => {
          return { model: model };
        }),
        app_platform: isAndroid ? 'Android' : 'IOS',
        api_version: isAndroid ? native.MIOTHost.systemInfo.hostApiLevel : native.MIOTHost.apiLevel,
        packageType: '',
        region: isAndroid ? 'CN' : 'zh'
      },
      stand_plugins: {
        stand_plugins: specifiedModelVersions,
        app_platform: isAndroid ? 'Android' : 'IOS',
        api_version: isAndroid ? native.MIOTHost.systemInfo.hostApiLevel : native.MIOTHost.apiLevel
      } 
    }, (ok, res) => {
      const { latest_info = [], stand_plugin_info = [] } = res || {};
      if (ok) {
        resolve([...stand_plugin_info, ...latest_info]);
        return;
      }
      reject();
    });
  });
}