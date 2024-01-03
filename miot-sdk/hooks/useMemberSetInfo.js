import { useEffect, useState } from 'react';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import { getModelType } from './useModelType';
const cacheShowMemberSet = {};
// 请求是否展示「按键设置」的状态
export function showMemberSet(model = Device.model) {
  if (cacheShowMemberSet[model] !== undefined) {
    return Promise.resolve(cacheShowMemberSet[model]);
  }
  return new Promise((resolve, reject) => {
    getModelType().then((modelTypeInfo) => {
      if (!['switch', 'control-panel', 'relay', 'controller'].includes(modelTypeInfo)) {
        cacheShowMemberSet[model] = {
          isSingleSwitch: false,
          showMemberSetKey: false
        };
        resolve(cacheShowMemberSet[model]);
        return;
      }
      Service.callSmartHomeAPI("/v2/device/multi_button_template", { model: model }).then((res) => {
        const member = res.members ?? [];
        cacheShowMemberSet[model] = {
          isSingleSwitch: member.length === 1,
          showMemberSetKey: member.length >= 2 && member.length <= 6
        };
        resolve(cacheShowMemberSet[model]);
      }).catch((error) => {
        cacheShowMemberSet[model] = {
          isSingleSwitch: false,
          showMemberSetKey: false
        };
        Service.smarthome.reportLog(Device.model, `Service.smarthome.multi_button_template error: ${ JSON.stringify(error) }`);
        reject(error);
      });
    });
  });
}
export default function useMemberSetInfo(model = Device.model) {
  const defaultInfo = {
    isSingleSwitch: false,
    showMemberSetKey: false
  };
  const [memberSetInfo, setMemberInfo] = useState(cacheShowMemberSet[model] || defaultInfo);
  useEffect(() => {
    showMemberSet(model).then((memberInfo) => {
      setMemberInfo(memberInfo || defaultInfo);
    }).catch(() => { });
  }, [model]);
  return memberSetInfo;
}