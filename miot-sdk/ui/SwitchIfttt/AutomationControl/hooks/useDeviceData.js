import { useState } from 'react';
import { Device, DeviceEvent, Service } from "miot";
import { DeviceEventEmitter } from "react-native";
import useDeviceSettings from "../../../../hooks/useDeviceSettings";
import useDeepCompareEffect from "../../../../hooks/useDeepCompareEffect";
import {
  getSwitchTypeDeviceSettingKey,
  encodeProp
} from "../../utils";
import {
  EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY,
  MIOT_SWITCH_DEVICE_TYPE_KEY,
  SWITCH_DEVICE_TYPE
} from "../../Const";
/**
 * 设备数据管理 Hook
 * 处理设备规格、设置和状态同步
 */
export const useDeviceData = (switchSpecs, switchSpec, switchModeSpec, switchSensorModeSpec) => {
  // 设备设置
  const switchDeviceSettings = useDeviceSettings(
    MIOT_SWITCH_DEVICE_TYPE_KEY, 
    switchSpecs.map((spec) => getSwitchTypeDeviceSettingKey(spec)), 
    EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY
  );
  // 开关按钮类型
  const [switchButtonType, setSwitchButtonType] = useState(
    switchDeviceSettings?.[getSwitchTypeDeviceSettingKey(switchSpec)]
  );
  // 设备状态
  const [switchStatus, setSwitchStatus] = useState(null);
  const [switchMode, setSwitchMode] = useState(null);
  const [switchSensorMode, setSwitchSensorMode] = useState(null);
  const [tempSwitchSensorMode, setTempSwitchSensorMode] = useState(null);
  // 获取设备属性
  const getSpecProps = () => {
    const props = [switchSpec, switchModeSpec, switchSensorModeSpec].filter((prop) => !!prop).map((prop) => {
      const t = {
        did: Device.deviceID,
        siid: prop.siid,
        piid: prop.piid
      };
      if (prop.miid) {
        t.miid = prop.miid;
      }
      return t;
    });
    Service.spec.getPropertiesValue(props).then((res) => {
      res.forEach((prop) => {
        if (encodeProp(prop) === encodeProp(switchSpec)) {
          setSwitchStatus(prop.value);
        } else if (encodeProp(prop) === encodeProp(switchModeSpec)) {
          setSwitchMode(prop.value);
        } else if (encodeProp(prop) === encodeProp(switchSensorModeSpec)) {
          setSwitchSensorMode(prop.value);
          setTempSwitchSensorMode(prop.value);
        }
      });
    }).catch((error) => {
      console.log('获取--switchModeSpec--switchSensorModeSpec --error', error);
    });
  };
  // 初始化获取属性
  useDeepCompareEffect(() => {
    if (switchModeSpec && switchSensorModeSpec) {
      getSpecProps();
    }
  }, []);
  // 监听设备消息
  useDeepCompareEffect(() => {
    getSpecProps();
    const keys = [switchSpec, switchModeSpec, switchSensorModeSpec].filter((prop) => !!prop).map((prop) => {
      return encodeProp(prop);
    });
    
    Device.getDeviceWifi().listenMessages(...keys).then(() => {
      // 订阅成功
    }).catch();
    const listener = DeviceEvent.deviceReceivedMessages.addListener((device, messages) => {
      if (!device || device.deviceID !== Device.deviceID || !messages) {
        return;
      }
      messages.forEach((v, k) => {
        const value = Array.isArray(v) ? v[0] : v;
        if (k === encodeProp(switchModeSpec)) {
          setSwitchMode(value);
        } else if (k === encodeProp(switchSensorModeSpec)) {
          setSwitchSensorMode(value);
          setTempSwitchSensorMode(value);
        } else if (k === encodeProp(switchSpec)) {
          setSwitchStatus(value);
        }
      });
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, [Device.deviceID]);
  // 更新开关按钮类型
  useDeepCompareEffect(() => {
    if (switchDeviceSettings) {
      setSwitchButtonType(switchDeviceSettings?.[getSwitchTypeDeviceSettingKey(switchSpec)]);
    }
  }, [switchDeviceSettings]);
  // 老数据兼容：当 switchDeviceSettings 无值 且 switchMode 已加载时，自动推断并写入
  // 处理「无线模式 + 无 tagsScene」→ OTHER_SMART_DEVICE 的兜底情况
  // （有 tagsScene 的情况由 useSceneData 中的逻辑处理）
  useDeepCompareEffect(() => {
    const settingKey = getSwitchTypeDeviceSettingKey(switchSpec);
    const hasExistingType = !!switchDeviceSettings?.[settingKey];
    const wirelessValue = switchModeSpec?.prop?.['Wireless'];
    if (!hasExistingType && switchMode !== null && switchMode !== undefined && wirelessValue) {
      if (switchMode === wirelessValue) {
        // 无线模式 + 无类型记录 → 兜底为 OTHER_SMART_DEVICE（有 tagsScene 的由 useSceneData 处理）
        const settings = { [settingKey]: SWITCH_DEVICE_TYPE.OTHER_SMART_DEVICE };
        Service.smarthome.setDeviceSetting({
          did: Device.deviceID,
          settings
        }).then(() => {
          DeviceEventEmitter.emit(EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY, settings);
        }).catch((error) => {
          console.log('useDeviceData legacy migration error', error);
        });
      } else {
        // 有线模式 + 无类型记录 → 写入 COMMON_DEVICE
        const settings = { [settingKey]: SWITCH_DEVICE_TYPE.COMMON_DEVICE };
        Service.smarthome.setDeviceSetting({
          did: Device.deviceID,
          settings
        }).then(() => {
          DeviceEventEmitter.emit(EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY, settings);
        }).catch((error) => {
          console.log('useDeviceData legacy migration error', error);
        });
      }
    }
  }, [switchDeviceSettings, switchMode]);
  return {
    // 状态
    switchButtonType,
    setSwitchButtonType,
    switchStatus,
    setSwitchStatus,
    switchMode,
    setSwitchMode,
    switchSensorMode,
    setSwitchSensorMode,
    tempSwitchSensorMode,
    setTempSwitchSensorMode,
    
    // 设置
    switchDeviceSettings,
    
    // 方法
    getSpecProps
  };
};