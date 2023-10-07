import { useState } from 'react';
import { Device, Service, PackageEvent } from 'miot';
import useDeepCompareEffect from './useDeepCompareEffect';
import { existSpecificTriggerSceneV2 } from '../ui/SwitchIfttt/utils';
export default function useSceneList(triggers = [], homeId, did = Device.deviceID) {
  const [sceneList, setSceneList] = useState([]);
  const [existTriggerScene, setExistTriggerScene] = useState(false);
  const fetchSceneList = () => {
    Service.sceneV2.loadSceneList(homeId, did).then((res) => {
      console.log('获取获取智能列表--loadSceneList-res', JSON.stringify(res));
      const list = res || [];
      setSceneList(list);
      if (triggers.length && list.length) {
        setExistTriggerScene(existSpecificTriggerSceneV2(list, triggers));
      }
    }).catch((error) => {
      console.log('获取智能列表报错---loadSceneList---error', error);
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
    sceneList,
    existTriggerScene
  };
}