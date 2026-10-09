import { useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import { PackageEvent } from 'miot/event/PackageEvent';
import useDeepCompareEffect from './useDeepCompareEffect';
import { findDuplicateTagsScene } from '../ui/SwitchIfttt/utils';
const cachedSpecificTagsSceneList = {};
function getCacheKey(tags = []) {
  return `${ Device.deviceID }${ tags.toString() }`;
}
export default function useSpecificTagsSceneList({
  tags = [],
  mode,
}) {
  const [tagsSceneList, setTagsSceneList] = useState(cachedSpecificTagsSceneList[getCacheKey(tags)] || []);
  const [tagsSceneListLoading, setTagsSceneListLoading] = useState(true);
  // propSpec: button-type 属性 spec，用于区分共用 switch-sensor 服务的多个按键；
  //   不传则只按 trigger key 去重（一键一 sensor 的设备够用）
  const editTagsScene = (scene, propSpec) => {
    return new Promise((resolve, reject) => {
      const doEdit = (target, list) => {
        Service.sceneV2.editScene(target).then((res) => {
          const editResult = target.scene_id ? list.map((s) => {
            return s.scene_id === target.scene_id ? { ...s, ...target } : s;
          }) : [
            ...list,
            {
              ...target,
              scene_id: res?.scene_id,
            },
          ];
          // 先广播本地拼的结果,让卡片立刻出现
          DeviceEventEmitter.emit('EditTagsScene_DeviceEventEmitter', editResult);
          // 再以服务端数据为准刷一次:本地/云端标识取的 type 由服务端按有无中枢网关
          //   判定,createSwitchScene 拼不出来,不刷新就要等用户重进页面才显示(MIIO-134827)
          Service.sceneV2.loadSceneListByTags(tags, mode).then((latest) => {
            if (latest) {
              DeviceEventEmitter.emit('EditTagsScene_DeviceEventEmitter', latest);
            }
          }).catch(() => {});
          resolve(res);
        }).catch((error) => {
          console.log('创建关联场景报错---getManualSceneList---error', error);
          reject(error);
        });
      };
      if (scene.scene_id) {
        doEdit(scene, tagsSceneList);
        return;
      }
      // 调用方没给 scene_id 时不能直接新建：冷启动等时序下它本来就取不到，
      //   直接新建会让同一按键同一手势累积出多条等价自动化（MIIO-134803）。
      //   这里重新拉一次列表再判重，不读闭包里的 tagsSceneList —— 它可能还是空的。
      Service.sceneV2.loadSceneListByTags(tags, mode).then((list) => {
        const latest = list || [];
        const targetTrigger = scene?.scene_trigger?.triggers?.[0];
        const duplicate = findDuplicateTagsScene(latest, targetTrigger, propSpec);
        // 命中则复用其 scene_id 走更新；enable 沿用已有值，
        //   避免把用户主动关掉的自动化静默重新启用
        doEdit(duplicate ? {
          ...scene,
          scene_id: duplicate.scene_id,
          enable: duplicate.enable,
        } : scene, latest);
      }).catch(() => {
        // 拉取失败退回原行为，不因去重失败阻断用户保存
        doEdit(scene, tagsSceneList);
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
    const appearListener = PackageEvent.packageViewWillAppear.addListener(() => {
      fetchTagsSceneList();
    });
    const resumeListener = PackageEvent.packageDidResume.addListener(() => {
      fetchTagsSceneList();
    });
    return () => {
      editListener && editListener.remove && editListener.remove();
      appearListener && appearListener.remove && appearListener.remove();
      resumeListener && resumeListener.remove && resumeListener.remove();
    };
  }, [tags]);
  return {
    tagsSceneList,
    editTagsScene,
    deleteTagsScene,
    tagsSceneListLoading,
  };
}