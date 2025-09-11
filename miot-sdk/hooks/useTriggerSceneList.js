import { useState } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
const cachedTriggerSceneList = {};
export default function useTriggerSceneList(trigger = {}, homeId, tag, did = Device.deviceID) {
  const { triggerKey, ...rest } = trigger;
  const cacheKey = `${ did }-${ triggerKey }`;
  const [triggerSceneList, setTriggerSceneList] = useState(cachedTriggerSceneList[cacheKey] || []);
  const cacheExist = tag ? triggerSceneList.find((item) => item.tags?.source !== tag) : triggerSceneList.length > 0;
  const [existTriggerScene, setExistTriggerScene] = useState(cacheExist);
  const [sceneLoading, setSceneLoading] = useState(true);
  const fetchSceneList = async() => {
    if (!homeId) {
      homeId = (await Device.getCurrentSelectHomeInfo())?.homeId;
    }
    if (!homeId) {
      console.log('useTriggerSceneList---loadSceneList---homeId不存在');
      return;
    }
    Service.sceneV2.loadTriggerSceneList(homeId, [rest]).then((res) => {
      // console.log('获取获取智能列表--loadSceneList-res', JSON.stringify(res));
      const result = res || [];
      const sceneInfoList = result?.[0]?.scene_info_list || [];
      setTriggerSceneList(sceneInfoList);
      cachedTriggerSceneList[cacheKey] = sceneInfoList;
      const exist = tag ? sceneInfoList.find((item) => item.tags?.source !== tag) : sceneInfoList.length > 0;
      // console.log('exist---', exist);
      setExistTriggerScene(exist ? true : false);
      setSceneLoading(false);
    }).catch((error) => {
      console.log('useTriggerSceneList---loadSceneList---error', error);
      setSceneLoading(false);
    });
  };
  useDeepCompareEffect(() => {
    fetchSceneList();
    const listener = PackageEvent.packageViewWillAppear.addListener(() => {
      fetchSceneList();
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, [homeId, did]);
  return {
    triggerSceneList,
    existTriggerScene,
    sceneLoading
  };
}