import native, { isAndroid } from "../native";
/**
 * @description 获取插件信息，
 *
 * @export fetchPluginInfos
 * @param {array<string>} [models=[]] 需要获取的插件model
 * @return {Promise<array>} 
 */
export function fetchPluginInfos(models = []) {
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
      }
    }, (ok, res) => {
      const latestPlugins = res?.latest_info;     
      if (latestPlugins?.length > 0) {
        resolve(latestPlugins.map((latestPlugin) => {
          const { plugin_id, version: plugin_version, status, dev_mode } = latestPlugin;
          return {
            plugin_id,
            plugin_version,
            status,
            dev_mode
          };
        }));
        return;
      }
      reject();
    });
  });
}