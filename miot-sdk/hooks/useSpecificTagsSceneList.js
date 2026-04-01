import { useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
const cachedSpecificTagsSceneList = {};
function getCacheKey(tags = []) {
  return `${ Device.deviceID }${ tags.toString() }`;
}
export default function useSpecificTagsSceneList({
  tags = [],
  mode
}) {
  const [tagsSceneList, setTagsSceneList] = useState(cachedSpecificTagsSceneList[getCacheKey(tags)] || []);
  const [tagsSceneListLoading, setTagsSceneListLoading] = useState(true);
  const editTagsScene = (scene) => {
    return new Promise((resolve, reject) => {
      Service.sceneV2.editScene(scene).then((res) => {
        // console.log('创建关联场景--editScene-res', res);
        const editResult = scene.scene_id ? tagsSceneList.map((s) => {
          return s.scene_id === scene.scene_id ? scene : s;
        }) : [
          ...tagsSceneList,
          {
            ...scene,
            scene_id: res?.scene_id
          }
        ];
        DeviceEventEmitter.emit('EditTagsScene_DeviceEventEmitter', editResult);
        resolve(res);
      }).catch((error) => {
        console.log('创建关联场景报错---getManualSceneList---error', error);
        reject(error);
      });
    });
  };
  const deleteTagsScene = (scene_id) => {
    return new Promise((resolve, reject) => {
      Service.sceneV2.deleteScene(scene_id).then((res) => {
        // console.log('创建关联场景--editScene-res', res);
        const editResult = tagsSceneList.filter((s) => {
          return s.scene_id !== scene_id;
        });
        DeviceEventEmitter.emit('EditTagsScene_DeviceEventEmitter', editResult);
        resolve(res);
      }).catch((error) => {
        console.log('创建关联场景报错---getManualSceneList---error', error);
        reject(error);
      });
    });
  };
  const fetchTagsSceneList = () => {
    Service.sceneV2.loadSceneListByTags(tags, mode).then((res) => {
      // console.log('获取批量控制成功--loadSceneListByTags-res', res);
      setTagsSceneList(res || []);
      cachedSpecificTagsSceneList[getCacheKey(tags)] = res || [];
      setTagsSceneListLoading(false);
    }).catch((error) => {
      setTagsSceneListLoading(false);
      console.log('获取tags场景报错---loadSceneListByTags---error', error);
    });
  };
  useDeepCompareEffect(() => {
    fetchTagsSceneList();
    let editListener = DeviceEventEmitter.addListener('EditTagsScene_DeviceEventEmitter', (value) => {
      // console.log('DeviceEventEmitter--loadSceneListByTags-value', JSON.stringify(value));
      setTagsSceneList(value);
      cachedSpecificTagsSceneList[getCacheKey(tags)] = value;
    });
    return () => {
      editListener && editListener.remove && editListener.remove();
    };
  }, [tags]);
  return {
    tagsSceneList,
    editTagsScene,
    deleteTagsScene,
    tagsSceneListLoading
  };
}