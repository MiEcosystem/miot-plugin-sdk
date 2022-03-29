import native from '../native';
const CachedSettings = {};
export default function getCUstomSettings(
  pluginId = native.MIOTPackage.pluginID,
  pluginVersion = native.MIOTPackage.version
) {
  const key = `CachedSettings.${ pluginId }.${ pluginVersion }`;
  if (CachedSettings[key]) {
    return Promise.resolve(CachedSettings[key]);
  }
  return new Promise((resolve, reject) => {
    native.MIOTRPC.standardCall('/v2/plugin/get_customize_service', {
      plugin_id: pluginId, // 1009706,
      plugin_version: pluginVersion // || 3
    }, (ok, res) => {
      // ok = true;
      // res = {
      //   setting_info_detail: [{
      //     item_name: '111',
      //     parent_note: '111-111'
      //   }, {
      //     item_name: '222',
      //     parent_note: '222-111',
      //     siid: 2,
      //     piid: 1
      //   }, {
      //     item_name: '333',
      //     parent_note: '333-111',
      //     siid: 2,
      //     piid: 2,
      //     children_set: [{
      //       item_name: '7766yyy',
      //       parent_note: 'iiiiii',
      //       siid: 2,
      //       piid: 2
      //     }, {
      //       icon: 'https://cdn.cnbj1.fds.api.mi-img.com/iot-mi-com/prod/img/access_to_xiaoai.2c967c6b.png'
      //     }]
      //   }, {
      //     item_name: '444',
      //     parent_note: '111-111',
      //     siid: 2,
      //     piid: 6,
      //     children_notes: ['222', '', '999'],
      //     children_set: [{
      //       item_name: '8888',
      //       siid: 2,
      //       piid: 6
      //     }]
      //   }, {
      //     item_name: '555',
      //     parent_note: '111-111',
      //     siid: 2,
      //     piid: 1,
      //     children_set: [{
      //       item_name: '222',
      //       parent_note: '222-111',
      //       siid: 2,
      //       piid: 1,
      //       icon: 'https://cdn.cnbj1.fds.api.mi-img.com/iot-mi-com/prod/img/access_to_xiaoai.2c967c6b.png'
      //     }]
      //   }]
      // };
      if (ok && res && res.setting_info_detail) {
        CachedSettings[key] = res.setting_info_detail;
        resolve(CachedSettings[key]);
        return;
      }
      reject(res);
    });
  });
}