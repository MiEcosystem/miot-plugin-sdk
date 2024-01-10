import Service from "../Service";
const exposeTrackRecord = {};
const specialTrackKey = ['defaultPlugin']; // 默认首页有自己的打点
// 目前就两个事件名 click expose
export default function tryTrackCommonSetting(featureName, eventName, status = null) {
  if (!featureName) { // 有些开发者自定义的item没有key，也就没有featureName，这种不上报
    return;
  }
  if (eventName === 'click') {
    if (specialTrackKey.includes(featureName)) {
      return;
    }
    Service.smarthome.reportEvent('click', {
      component_name: 'ListItem',
      feature_name: featureName,
      feature_params: status,
      handle_result: 'success',
      tip: '6.20.0.1.15496'
    });
    return;
  }
  if (exposeTrackRecord[featureName]) {
    return;
  }
  exposeTrackRecord[featureName] = true;
  Service.smarthome.reportEvent(eventName, {
    component_name: 'ListItem',
    feature_name: featureName,
    feature_params: status,
    tip: '6.20.0.1.15497'
  });
}