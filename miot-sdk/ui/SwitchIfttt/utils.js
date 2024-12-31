import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import { SWITCH_DEVICE_TYPE } from "./Const";
import { strings as I18n } from '../../resources';
export function getSwitchTypeTitle(type = '') {
  let switchTypeDescription = I18n.common_listItem_value_unset;
  switch (type) {
    case SWITCH_DEVICE_TYPE.COMMON_DEVICE:
      switchTypeDescription = I18n.switch_title_deviceType_normalDevice;
      break;
    case SWITCH_DEVICE_TYPE.SMART_LIGHT:
      switchTypeDescription = I18n.switch_title_deviceType_smartLight;
      break;
    case SWITCH_DEVICE_TYPE.SMART_SWITCH:
      switchTypeDescription = I18n.switch_title_deviceType_smartSwitch;
      break;
    case SWITCH_DEVICE_TYPE.MANUAL_SCENE:
      switchTypeDescription = I18n.switch_title_deviceType_manualScene;
      break;
    case SWITCH_DEVICE_TYPE.OTHER_SMART_DEVICE:
      switchTypeDescription = I18n.switch_title_deviceType_otherSmartDevice;
      break;
    default:
      break;
  }
  return switchTypeDescription;
}
export function getSwitchTypeDescription(type = '') {
  let switchTypeDescription = I18n.common_listItem_value_unset;
  switch (type) {
    case SWITCH_DEVICE_TYPE.COMMON_DEVICE:
      switchTypeDescription = I18n.switch_value_deviceType_normalDevice;
      break;
    case SWITCH_DEVICE_TYPE.SMART_LIGHT:
      switchTypeDescription = I18n.switch_value_deviceType_smartLight;
      break;
    case SWITCH_DEVICE_TYPE.SMART_SWITCH:
      switchTypeDescription = I18n.switch_value_deviceType_smartSwitch;
      break;
    case SWITCH_DEVICE_TYPE.MANUAL_SCENE:
      switchTypeDescription = I18n.switch_value_deviceType_manualScene;
      break;
    case SWITCH_DEVICE_TYPE.OTHER_SMART_DEVICE:
      switchTypeDescription = I18n.switch_value_deviceType_otherSmartDevice;
      break;
    default:
      break;
  }
  return switchTypeDescription;
}
export function isSpecProp(prop) {
  return !!(prop && prop.siid && typeof prop.siid === 'number');
}
/**
 * 需要和服务端保持一致
 * @param prop
 * @returns {string}
 */
export function encodeProp(prop) {
  const { miid, siid, piid, aiid, eiid } = prop || {};
  if (eiid !== null && eiid !== undefined) {
    return miid ? `event.${ miid }.${ siid }.${ eiid }` : `event.${ siid }.${ eiid }`;
  } else if (aiid !== null && aiid !== undefined) {
    return miid ? `action.${ miid }.${ siid }.${ aiid }` : `action.${ siid }.${ aiid }`;
  } else { // if (piid !== null && piid !== undefined) {
    return miid ? `prop.${ miid }.${ siid }.${ piid }` : `prop.${ siid }.${ piid }`;
  }
}
/**
 * 需要和服务端保持一致
 * @returns { { siid, piid, aiid, eiid } |null}
 * @param key
 */
export function decodeProp(key) {
  let res = {};
  const parts = key.split('.');
  if (parts.length === 3) {
    const type = parts[0];
    const sNumber = parseInt(parts[1], 10);
    // 2 for '.'
    const suffix = key.slice(parts[0].length + parts[1].length + 2); 
    const isNotSpec = isNaN(sNumber);
    const siid = isNotSpec ? parts[1] : sNumber;
    const xiid = isNotSpec ? suffix : parseInt(suffix, 10);
    if (type === 'event') {
      return { siid, eiid: xiid };
    } else if (type === 'action') {
      return { siid, aiid: xiid };
    } else if (type === 'prop') {
      return { siid, piid: xiid };
    }
  } else if (parts.length >= 4) {
    const type = parts[0];
    const mNumber = parseInt(parts[1], 10);
    const sNumber = parseInt(parts[2], 10);
    const suffix = key.slice(parts[0].length + parts[1].length + parts[2].length + 3); // 3 for '.'
    const isNotSpec = isNaN(sNumber);
    const miid = isNotSpec ? parts[1] : mNumber;
    const siid = isNotSpec ? parts[2] : sNumber;
    const xiid = isNotSpec ? suffix : parseInt(suffix, 10);
    if (type === 'event') {
      return { miid, siid, eiid: xiid };
    } else if (type === 'action') {
      return { miid, siid, aiid: xiid };
    } else if (type === 'prop') {
      return { miid, siid, piid: xiid };
    }
  }
 
  return res;
}
/**
 * @description 
 * @author guhao
 * @date 11/09/2023
 * @export 
 * @param {object} spec
 * @returns {string} siid.piid siid.eiid siid.aiid
 */
export function encodeSpec(spec) {
  const { miid, siid, piid, aiid, eiid } = spec || {};
  if (eiid !== null && eiid !== undefined) {
    return miid ? `${ miid }.${ siid }.${ eiid }` : `${ siid }.${ eiid }`;
  } else if (aiid !== null && aiid !== undefined) {
    return miid ? `${ miid }.${ siid }.${ aiid }` : `${ siid }.${ aiid }`;
  } else { // if (piid !== null && piid !== undefined) {
    return miid ? `${ miid }.${ siid }.${ piid }` : `${ siid }.${ piid }`;
  }
}
export function existSpecificTriggerSceneV2(scenes, specificTriggers) {
  // 没有指定trigger
  if (!specificTriggers || specificTriggers.length <= 0) {
    return false;
  }
  let hasTargetScene = false;
  for (let index = 0; index < scenes.length; index++) {
    const scene = findSpecificTriggerScene(scenes[index], specificTriggers);
    if (scene) {
      hasTargetScene = true;
      break;
    }
  }
  return hasTargetScene;
}
export function findSpecificTriggerScene(scene, specificTriggers) {
  // 没有指定trigger
  if (!specificTriggers || specificTriggers.length <= 0) {
    return null;
  }
  let hasTargetScene = false;
  const triggers = scene?.scene_trigger?.triggers || [];
  for (let indexTrigger = 0; indexTrigger < triggers.length; indexTrigger++) {
    const trigger = triggers[indexTrigger];
    const { key, extra_json, value_json } = trigger || {};
    // xiaomi.airc.ar03r1 这个设备支持动态model，会导致一个did出现多个不同model
    if (extra_json?.did === Device.deviceID) {
      hasTargetScene = triggerMatch(specificTriggers, key, value_json);
    }
    if (hasTargetScene) {
      break;
    }
  }
  if (hasTargetScene) {
    return scene;
  }
  const conditions = scene?.scene_condition?.conditions || [];
  for (let indexCondition = 0; indexCondition < conditions.length; indexCondition++) {
    const condition = conditions[indexCondition];
    const { key, extra_json, value_json } = condition || {};
    // console.log('existSpecificTriggerSceneV2--trigger---', condition);
    if (extra_json?.did === Device.deviceID) {
      hasTargetScene = triggerMatch(specificTriggers, key, value_json);
    }
    if (hasTargetScene) {
      break;
    }
  }
  if (hasTargetScene) {
    return scene;
  }
  return null;
}
export function existSpecificTriggerScene(scenes, specificTriggers) {
  // 没有指定trigger
  if (!specificTriggers || specificTriggers.length <= 0) {
    return false;
  }
  // 场景不存在
  if (!scenes) {
    return false;
  }
  let hasTargetScene = false;
  for (let index = 0; index < scenes.length; index++) {
    const scene = scenes[index];
    const triggers = scene?.setting?.launch?.attr || [];
    for (let indexTrigger = 0; indexTrigger < triggers.length; indexTrigger++) {
      const trigger = triggers[indexTrigger];
      const { key, value } = trigger || {};
      hasTargetScene = triggerMatch(specificTriggers, key, value);
      if (hasTargetScene) {
        break;
      }
    }
    if (hasTargetScene) {
      break;
    }
  }
  return hasTargetScene;
}
function triggerMatch(specificTriggers, key, value) {
  let matchTrigger = false;
  // 指定的条件
  for (let indexSpecificTrigger = 0; indexSpecificTrigger < specificTriggers.length; indexSpecificTrigger++) {
    const specificTrigger = specificTriggers[indexSpecificTrigger];
    // key符合
    if (key === specificTrigger.key) {
      // 存在指定依赖prop (事件携带属性)
      if (specificTrigger.valueKey) {
        const attrs = value?.sub_props?.attr || [];
        for (let indexAttr = 0; indexAttr < attrs.length; indexAttr++) {
          const attr = attrs[indexSpecificTrigger];
          // 指定依赖prop相符
          if (attr?.key === specificTrigger.valueKey) {
            // 指定依赖的prop的value
            if (specificTrigger.value !== undefined) {
              // 指定依赖prop的value相符
              if (attr?.value?.toString() === specificTrigger.value?.toString()) {
                matchTrigger = true;
                break;
              }
            } else {
              matchTrigger = true;
              break;
            }
          }
        }
      } else if (specificTrigger.value !== undefined) {
        // 指定value
        if (value?.toString() === specificTrigger.value?.toString()) {
          matchTrigger = true;
          break;
        }
      } else {
        // 只指定key
        matchTrigger = true;
      }
      if (matchTrigger) {
        break;
      }
    }
  }
  return matchTrigger;
}
export function createSwitchScene(extra) {
  const scene = {
    timewindow: {
      from: '0 0 0 * * * *',
      to: '0 0 0 * * * *'
    },
    enable: true,
    common_use: false,
    value_format: 1,
    scene_condition: {
      express: 0,
      conditions: []
    },
    uid: Service.account.ID,
    app_version: 1,
    edit_from: 1,
    scene_action: {
      mode: 1,
      actions: [{
        group_id: 0,
        id: 9873,
        order: 1,
        type: 0,
        name: '开灯',
        payload: '',
        payload_json: {
          command: 'set_properties',
          delay_time: 0,
          device_name: '米家智能台灯Lite',
          did: '1044366178',
          model: 'philips.light.lite',
          value: [{
            piid: 1,
            did: '1044366178',
            value: true,
            siid: 2
          }]
        },
        protocol_type: 1,
        sa_id: 9873,
        from: 1,
        device_group_id: 0
        // nested_scene_info: null
      }
      ]
    },
    enable_push: false,
    owner_uid: Service.account.ID,
    scene_name: '小米米家智能开关（双开单控）单击右键-开灯米家智能台灯Lite',
    scene_trigger: {
      express: 0,
      triggers: [{
        id: 0,
        order: 1,
        src: 'device',
        key: 'event.9.1',
        extra: '',
        name: '单击右键',
        value: '',
        value_type: 5,
        extra_json: {
          device_name: '小米智能开关 双开',
          did: '1029392368',
          model: 'zimi.switch.dhkg02'
        },
        value_json: '',
        protocol_type: 2,
        sc_id: 9321,
        from: 1
      }
      ]
    },
    // template_id: '0',
    no_record_log: false,
    tags: { source: 'plugin-intelligent-switch' },
    // home_id ,scene_id, trigger, action ,scene_name
    ...(extra || {})
  };
  return scene;
}
export function createSwitchTrigger(spec, propSpec, propValue, value_type = 5) {
  const sceneTrigger = {
    express: 0,
    triggers: [{
      id: 9321,
      order: 1,
      src: 'device',
      key: encodeProp(spec),
      extra: '',
      name: `${ spec?.i18n }`,
      value: '',
      value_type: propValue === undefined ? value_type : 6,
      extra_json: {
        device_name: Device.name,
        did: Device.deviceID,
        model: Device.model
      },
      value_json: propValue === undefined ? '' : {
        sub_props: {
          express: 0,
          attr: [{
            key: propSpec?.miid ? `prop.${ Device.model }.${ propSpec?.miid }.${ propSpec?.siid }.${ propSpec?.piid }` : `prop.${ Device.model }.${ propSpec?.siid }.${ propSpec?.piid }`,
            value: propValue,
            value_type: 1
          }]
        }
      },
      // protocol_type: 2,
      sc_id: 9321,
      from: 1
    }
    ]
  };
  return sceneTrigger;
}
export function createManualSceneAction(scene) {
  const sceneAction = {
    mode: 1,
    actions: [{
      order: 1,
      // 执行场景
      type: 2,
      name: scene.scene_name,
      payload_json: {
        enable: true,
        scene_id: scene.scene_id,
        delay_time: 0
      }
    }
    ]
  };
  return sceneAction;
}
export function createDeviceSceneAction(action) {
  const sceneAction = {
    mode: 1,
    actions: [action]
  };
  return sceneAction;
}
export function getClickTriggerConfig(spec, propSpec, value) {
  let triggerConfig = [];
  const DeviceModel = Device.model;
  if (propSpec && spec) {
    triggerConfig.push({
      key: spec.miid ? `event.${ spec.miid }.${ spec.siid }.${ spec.eiid }` : `event.${ spec.siid }.${ spec.eiid }`,
      valueKey: propSpec.miid ? `prop.${ DeviceModel }.${ propSpec.miid }.${ propSpec.siid }.${ propSpec.piid }` : `prop.${ DeviceModel }.${ propSpec.siid }.${ propSpec.piid }`,
      value: value
    });
    // 1.0格式
    triggerConfig.push({
      key: spec.miid ? `event.${ DeviceModel }.${ spec.miid }.${ spec.siid }.${ spec.eiid }` : `event.${ DeviceModel }.${ spec.siid }.${ spec.eiid }`,
      valueKey: propSpec.miid ? `prop.${ DeviceModel }.${ propSpec.miid }.${ propSpec.siid }.${ propSpec.piid }` : `prop.${ DeviceModel }.${ propSpec.siid }.${ propSpec.piid }`,
      value: value
    });
  } else if (spec) {
    triggerConfig.push({
      key: spec.miid ? `event.${ spec.miid }.${ spec.siid }.${ spec.eiid }` : `event.${ spec.siid }.${ spec.eiid }`
    });
    // 1.0格式
    triggerConfig.push({
      key: spec.miid ? `event.${ DeviceModel }.${ spec.miid }.${ spec.siid }.${ spec.eiid }` : `event.${ DeviceModel }.${ spec.siid }.${ spec.eiid }`
    });
  }
  return triggerConfig;
}
export function getTargetDeviceList(homeDeviceList, deviceTypes, filterMain) {
  const targetDeviceList = [];
  const filterDevice = {};
  for (let index = 0; index < homeDeviceList.length; index++) {
    const device = homeDeviceList[index];
    // 去掉分享设备
    if (device.roomId === 'mijia.roomid.share' || !device.specUrn) {
      continue;
    }
    const regex = /device:([^:]*):/;
    const type = device.specUrn.match(regex);
    
    if (type && deviceTypes.includes(type[1]) && !filterDevice[device.did]) {
      if (filterMain) {
        if (!device.did.includes('.s') && device.did !== Device.deviceID) {
          filterDevice[device.did] = true;
          targetDeviceList.push(device);
        }
      } else {
        filterDevice[device.did] = true;
        targetDeviceList.push(device);
      } 
    }
  }
  return targetDeviceList;
}
export function getTargetSectionDeviceList(deviceList) {
  const targetDeviceList = [];
  for (let index = 0; index < deviceList.length; index++) {
    const device = deviceList[index];
    const sectionIndex = targetDeviceList.findIndex((s) => {
      return s.roomId === device?.roomId;
    });
    if (sectionIndex === -1) {
      targetDeviceList.push({
        title: device?.roomName || I18n.room_unassigned,
        roomId: device?.roomId,
        data: [device]
      });
    } else {
      targetDeviceList[sectionIndex].data.push(device);
    }
  }
  return targetDeviceList;
}
export function getCustomSceneName(sceneName) {
  return sceneName.substring(0, 30);
}
export function getLocalI18n(key, replaces) {
  if (replaces?.length) {
    let v = I18n[key];
    if (!v) { return ''; }
    replaces.forEach((r, i) => {
      v = v.replace('${}', r);
      v = v.replace(`{${ i + 1 }}`, r);
    });
    return v;
  }
  return I18n[key];
}
export function getSwitchTypeKey(spec) {
  const { miid, siid, piid } = spec || {};
  return miid ? `${ Device.deviceID }.${ miid }.${ siid }.${ piid }` : `${ Device.deviceID }.${ siid }.${ piid }`;
}
export function getSwitchTypeDeviceSettingKey(spec) {
  const { miid, siid, piid } = spec || {};
  return miid ? `SwitchType.${ miid }.${ siid }.${ piid }` : `SwitchType.${ siid }.${ piid }`;
}
export function getSwitchTypeBySceneAction(sceneAction) {
  const { payload_json, type } = sceneAction?.actions[0] || {};
  if (type === 2) {
    return SWITCH_DEVICE_TYPE.MANUAL_SCENE;
  }
  if (type === 0) {
    const model = payload_json?.model || '';
    const modelMiddle = model.split('.')[1];
    if (['switch', 'control-panel', 'relay', 'ctrl_ln2', 'ctrl_ln1', 'ctrl_neutral2', 'ctrl_neutral1'].includes(modelMiddle)) {
      return SWITCH_DEVICE_TYPE.SMART_SWITCH;
    }
    if (['light'].includes(modelMiddle)) {
      return SWITCH_DEVICE_TYPE.SMART_LIGHT;
    }
  }
  return '';
}