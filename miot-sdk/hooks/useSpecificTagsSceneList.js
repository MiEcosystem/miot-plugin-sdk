import { useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { Service } from 'miot';
import useDeepCompareEffect from './useDeepCompareEffect';
export default function useSpecificTagsSceneList({
  tags = [],
  mode
}) {
  const [tagsSceneList, setTagsSceneList] = useState([]);
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
  const deleteTagsScene = (scene) => {
    return new Promise((resolve, reject) => {
      Service.sceneV2.deleteScene(scene.scene_id).then((res) => {
        // console.log('创建关联场景--editScene-res', res);
        const editResult = tagsSceneList.filter((s) => {
          return s.scene_id !== scene.scene_id;
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
    }).catch((error) => {
      console.log('获取tags场景报错---loadSceneListByTags---error', error);
    });
  };
  useDeepCompareEffect(() => {
    fetchTagsSceneList();
    let editListener = DeviceEventEmitter.addListener('EditTagsScene_DeviceEventEmitter', (value) => {
      // console.log('DeviceEventEmitter--loadSceneListByTags-value', JSON.stringify(value));
      setTagsSceneList(value);
    });
    return () => {
      editListener && editListener.remove && editListener.remove();
    };
  }, [tags]);
  return {
    tagsSceneList,
    editTagsScene,
    deleteTagsScene
  };
}