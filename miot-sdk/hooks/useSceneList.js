import { useState } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
import { existSpecificTriggerSceneV2, existSpecificTriggerScene } from '../ui/SwitchIfttt/utils';
const cachedSceneList = {};
const cachedSceneListV1 = {};
export default function useSceneList(triggers = [], homeId, did = Device.deviceID) {
  const [sceneList, setSceneList] = useState(cachedSceneList[did] || []);
  const [sceneListV1, setSceneV1List] = useState(cachedSceneListV1[did] || []);
  const [existTriggerScene, setExistTriggerScene] = useState(existSpecificTriggerSceneV2(sceneList, triggers) || 
  existSpecificTriggerScene(sceneListV1, triggers));
  const [sceneLoading, setSceneLoading] = useState(true);
  const fetchSceneList = () => {
    if (!homeId) {
      console.log('获取智能列表报错---loadSceneList---homeId不存在');
      return;
    }
    Promise.all([Service.sceneV2.loadSceneList(homeId, did, 2).then((res) => {
      // console.log('获取获取智能列表--loadSceneList-res', JSON.stringify(res));
      const list = res || [];
      cachedSceneList[did] = list;
      return list;
    }).catch((error) => {
      console.log('获取智能列表报错---loadSceneList---error', error);
      return cachedSceneList[did] || [];
    }), Service.scene.loadAutomaticScenes(Device.deviceID).then((res) => {
      // console.log('loadAutomaticScenes--res--', res);
      const list = res || [];
      cachedSceneListV1[did] = list;
      return list;
    }).catch(() => {
  
      // console.log('loadAutomaticScenes--error--', error);
      return cachedSceneListV1[did] || [];
  
    })]).then(([l2, l1]) => {
      const listV2 = l2 || [];
      const listV1 = l1 || [];
      setSceneList(listV2 || []);
      setSceneV1List(listV1 || []);
      if (triggers.length && (listV2.length || listV1.length)) {
        const exist = existSpecificTriggerSceneV2(listV2, triggers) || 
        existSpecificTriggerScene(listV1, triggers);
        setExistTriggerScene(exist);
      }
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
    sceneListV1,
    sceneList,
    existTriggerScene,
    sceneLoading
  };
}