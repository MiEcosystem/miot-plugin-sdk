import { useState, useEffect, useCallback } from 'react';
import { Device, Service } from "miot";
import { DeviceEventEmitter } from "react-native";
import { PackageEvent } from "miot/event/PackageEvent";
import { Images } from "../../../../resources";
import useCurrentSelectHomeInfo from "../../../../hooks/useCurrentSelectHomeInfo";
import useTriggerSceneList from "../../../../hooks/useTriggerSceneList";
import useSpecificTagsSceneList from "../../../../hooks/useSpecificTagsSceneList";
import useManualSceneList from "../../../../hooks/useManualSceneList";
import useHomeDeviceList from "../../../../hooks/useHomeDeviceList";
import useDeepCompareEffect from "../../../../hooks/useDeepCompareEffect";
import useMountedState from "../../../../hooks/useMountedState";
import {
  getSceneTriggerListParam,
  getClickTriggerConfig,
  findSpecificTriggerScene,
  getSwitchTypeBySceneAction,
  getSwitchTypeDeviceSettingKey
} from "../../utils";
import { loadAllScenesV2, getSceneTcaConfigV3 } from "../utils";
import {
  EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY,
  MIOT_SWITCH_SCENE_TAGS,
  SWITCH_DEVICE_TYPE
} from "../../Const";
/**
 * 场景数据管理 Hook
 * 处理标签场景、触发场景、关联设备和场景
 */
export const useSceneData = (switchClickSpec, specButtonType, switchSpec, homeId, switchDeviceSettings, switchDoubleClickSpec, switchLongPressesSpec) => {
  const mountedState = useMountedState();
  const currentSelectHomeInfo = useCurrentSelectHomeInfo();
  // 点击触发配置
  const clickTriggers = getClickTriggerConfig(switchClickSpec, specButtonType, switchSpec?.buttonTypeValue);
  const clickTrigger = getSceneTriggerListParam(switchClickSpec, specButtonType, switchSpec?.buttonTypeValue);
  // 标签场景列表
  const {
    tagsSceneList,
    deleteTagsScene,
    tagsSceneListLoading
  } = useSpecificTagsSceneList({
    tags: [{
      tag_k: 'source',
      tag_v: MIOT_SWITCH_SCENE_TAGS
    }]
  });
  // 触发场景列表
  const {
    triggerSceneList,
    existTriggerScene,
    sceneLoading
  } = useTriggerSceneList(clickTrigger, homeId, MIOT_SWITCH_SCENE_TAGS);
  // 手动场景列表
  const manualSceneList = useManualSceneList({});
  // 家庭设备列表
  const homeDeviceList = useHomeDeviceList();
  // 当前标签场景
  const [currentTagsScene, setCurrentTagsScene] = useState({});
  // 关联设备
  const [relatedDevice, setRelatedDevice] = useState({});
  // 关联设备状态：'current_home' | 'other_home' | 'deleted'
  const [relatedDeviceStatus, setRelatedDeviceStatus] = useState('current_home');
  // 关联房间信息
  const [relatedRoomInfo, setRelatedRoomInfo] = useState({});
  // 关联手动场景
  const [relatedManualScene, setRelatedManualScene] = useState({});
  // V2 场景列表
  const [allScenesV2, setAllScenesV2] = useState([]);
  // TCA Config V3
  const [tcaConfigV3, setTcaConfigV3] = useState(null);
  // TCA 匹配结果
  const [matchedTcaItems, setMatchedTcaItems] = useState({ click: null, doubleClick: null, longPress: null });
  // allScenesV2 二次匹配结果
  const [matchedScenes, setMatchedScenes] = useState({ click: [], doubleClick: [], longPress: [] });
  const fetchAllScenesV2 = useCallback(() => {
    if (!homeId) return;
    loadAllScenesV2(homeId, Device.deviceID).then((list) => {
      if (mountedState()) {
        setAllScenesV2(list);
      }
    }).catch((e) => {
      console.log('useSceneData--loadAllScenesV2--error', e);
    });
  }, [homeId]);
  const fetchTcaConfigV3 = useCallback(() => {
    if (!homeId || !currentSelectHomeInfo?.ownerUid) return;
    const homeDataList = {
      home_id: homeId,
      owner_uid: currentSelectHomeInfo.ownerUid,
      did: [Device.deviceID]
    };
    getSceneTcaConfigV3(homeDataList).then((res) => {
      if (mountedState()) {
        setTcaConfigV3(res);
      }
    }).catch((e) => {
      console.log('useSceneData--getSceneTcaConfigV3--error', e);
    });
  }, [homeId, currentSelectHomeInfo?.ownerUid]);
  useEffect(() => {
    fetchAllScenesV2();
  }, [fetchAllScenesV2]);
  useEffect(() => {
    fetchTcaConfigV3();
  }, [fetchTcaConfigV3]);
  const reloadSceneData = useCallback(() => {
    fetchAllScenesV2();
    fetchTcaConfigV3();
  }, [fetchAllScenesV2, fetchTcaConfigV3]);
  // iOS: packageViewWillAppear；Android: packageDidResume
  useEffect(() => {
    const onResume = () => {
      reloadSceneData();
    };
    const l1 = PackageEvent.packageViewWillAppear.addListener(onResume);
    const l2 = PackageEvent.packageDidResume.addListener(onResume);
    return () => {
      l1 && l1.remove && l1.remove();
      l2 && l2.remove && l2.remove();
    };
  }, [reloadSceneData]);
  useEffect(() => {
    if (!tcaConfigV3) return;
    const launchList = tcaConfigV3?.TCA_list?.model_TCA_list?.[0]?.value?.launch || [];
    const buildKey = (spec) => {
      if (!spec) return null;
      return `event.${Device.model}.${spec.siid}.${spec.eiid}`;
    };
    const findItem = (spec) => {
      const key = buildKey(spec);
      if (!key) return null;
      return launchList.find((item) => item.key === key) || null;
    };
    setMatchedTcaItems({
      click: findItem(switchClickSpec),
      doubleClick: findItem(switchDoubleClickSpec),
      longPress: findItem(switchLongPressesSpec)
    });
  }, [tcaConfigV3]);
  useEffect(() => {
    if (!matchedTcaItems) return;
    const findScenes = (tcaItem) => {
      if (!tcaItem?.sc_id) return [];
      return allScenesV2.filter((scene) => {
        const triggers = scene?.scene_trigger?.triggers || [];
        return triggers.some((trigger) =>
          trigger.src === 'device' &&
          trigger.extra_json?.did === Device.deviceID &&
          String(trigger.sc_id) === String(tcaItem.sc_id)
        );
      });
    };
    setMatchedScenes({
      click: findScenes(matchedTcaItems.click),
      doubleClick: findScenes(matchedTcaItems.doubleClick),
      longPress: findScenes(matchedTcaItems.longPress)
    });
  }, [matchedTcaItems, allScenesV2]);
  const [simplifiedMatchedScenes, setSimplifiedMatchedScenes] = useState({ click: [], doubleClick: [], longPress: [] });
  useEffect(() => {
    const allScenes = [
      ...matchedScenes.click.map((s) => ({ scene: s, group: 'click' })),
      ...matchedScenes.doubleClick.map((s) => ({ scene: s, group: 'doubleClick' })),
      ...matchedScenes.longPress.map((s) => ({ scene: s, group: 'longPress' }))
    ];
    if (!allScenes.length) {
      setSimplifiedMatchedScenes({ click: [], doubleClick: [], longPress: [] });
      return;
    }
    const buildSimplified = async() => {
      const results = await Promise.all(allScenes.map(async({ scene, group }) => {
        const payload_json = scene?.scene_action?.actions?.[0]?.payload_json || {};
        const device = homeDeviceList.find((d) => d.did === payload_json.did);
        const modelMiddle = payload_json.model?.split('.')?.[1];
        const defaultIcon = modelMiddle === 'light' ? Images.common.defaultLight : Images.common.defaultSwitch;
        let deviceStatus = 'current_home';
        if (!device) {
          try {
            const res = await Device.getRoomInfoForCurrentHome(payload_json.did);
            deviceStatus = res?.data?.homeId ? 'other_home' : 'deleted';
          } catch (e) {
            deviceStatus = 'deleted';
          }
        }
        return {
          group,
          item: {
            scene_id: scene.scene_id,
            name: scene.name,
            template_id: scene.template_id,
            type: scene.type,
            scene_action: {
              did: payload_json.did,
              model: payload_json.model,
              iconUrl: device?.iconUrl || null,
              defaultIcon,
              deviceStatus
            }
          }
        };
      }));
      if (!mountedState()) return;
      const simplified = { click: [], doubleClick: [], longPress: [] };
      results.forEach(({ group, item }) => {
        simplified[group].push(item);
      });
      setSimplifiedMatchedScenes(simplified);
    };
    buildSimplified();
  }, [matchedScenes, homeDeviceList]);
  // 当前标签场景
  useDeepCompareEffect(() => {
    if (tagsSceneList && mountedState()) {
      setCurrentTagsScene(tagsSceneList.find((tagScene) => {
        return findSpecificTriggerScene(tagScene, clickTriggers);
      }) || {});
    }
  }, [tagsSceneList, mountedState()]);
  // 关联设备
  useDeepCompareEffect(() => {
    if (currentTagsScene?.scene_id && mountedState() && homeDeviceList.length) {
      const { scene_action } = currentTagsScene;
      const { payload_json } = scene_action?.actions?.[0] || {};
      const findDevice = homeDeviceList.find((device) => {
        return device.did === payload_json?.did;
      });
      if (!findDevice?.did) {
        Device.getRoomInfoForCurrentHome(payload_json?.did).then((res) => {
          const status = res?.data?.homeId ? 'other_home' : 'deleted';
          setRelatedRoomInfo(res?.data || {});
          setRelatedDeviceStatus(status);
        }).catch(() => {
          setRelatedRoomInfo({});
          setRelatedDeviceStatus('deleted');
        });
      } else {
        setRelatedDeviceStatus('current_home');
      }
      setRelatedDevice(findDevice || {});
    }
  }, [currentTagsScene, mountedState(), homeDeviceList]);
  // 关联手动场景
  useDeepCompareEffect(() => {
    if (
      manualSceneList.length &&
      currentTagsScene &&
      mountedState() &&
      switchDeviceSettings?.[getSwitchTypeDeviceSettingKey(switchSpec)] === SWITCH_DEVICE_TYPE.MANUAL_SCENE
    ) {
      const { payload_json } = currentTagsScene.scene_action?.actions?.[0] || {};
      setRelatedManualScene(
        payload_json?.scene_id
          ? manualSceneList.find((s) => payload_json?.scene_id === s?.scene_id) || {}
          : {}
      );
    }
  }, [manualSceneList, currentTagsScene, mountedState(), switchDeviceSettings]);
  // 根据tags场景还原选择的按钮类型
  useDeepCompareEffect(() => {
    if (tagsSceneList?.length && mountedState() && !Object.values(switchDeviceSettings).length) {
      const switchTypeSettings = tagsSceneList.reduce((pre, scene) => {
        const switchButtonType = getSwitchTypeBySceneAction(scene?.scene_action);
        return {
          ...pre,
          [`${ getSwitchTypeDeviceSettingKey(switchSpec) }`]: switchButtonType
        };
      }, {});
      Service.smarthome.reportLog(
        Device.model,
        `[miot.plugin.spec, ${ new Date() }, fromTags switchTypeSettings: ]${ JSON.stringify({ switchTypeSettings }) }`
      );
      Service.smarthome.setDeviceSetting({
        did: Device.deviceID,
        settings: switchTypeSettings
      }).then((res) => {
        DeviceEventEmitter.emit(EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY, switchTypeSettings);
      }).catch((error) => {
        console.log('SwitchButtonSelectPage--setDeviceSetting-333--error', error);
      });
    }
  }, [tagsSceneList, mountedState(), switchDeviceSettings]);
  return {
    // 数据
    clickTriggers,
    clickTrigger,
    tagsSceneList,
    deleteTagsScene,
    tagsSceneListLoading,
    triggerSceneList,
    existTriggerScene,
    sceneLoading,
    manualSceneList,
    homeDeviceList,
    // 当前状态
    currentTagsScene,
    relatedDevice,
    relatedDeviceStatus,
    relatedRoomInfo,
    relatedManualScene,
    allScenesV2,
    tcaConfigV3,
    matchedTcaItems,
    matchedScenes,
    simplifiedMatchedScenes,
    // 设置方法（内部使用）
    setRelatedRoomInfo,
    reloadSceneData
  };
};