import { Device, Service } from "miot";
import Host from 'miot/Host';
import { DeviceEventEmitter } from "react-native";
import { strings as I18n } from "../../../../resources";
import {
  apiSaveSwitchType,
  apiSaveWirelessSwitchMode
} from "../utils";
import {
  EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY,
  SWITCH_DEVICE_TYPE
} from "../../Const";
import { getSwitchTypeDeviceSettingKey } from "../../utils";
/**
 * 开关控制逻辑 Hook
 * 处理开关状态控制、模式切换、类型保存等业务逻辑
 */
export const useSwitchControl = (props) => {
  const {
    switchSpec,
    switchModeSpec,
    switchSensorModeSpec,
    switchButtonType,
    setSwitchButtonType,
    tempSwitchType,
    setTempSwitchType,
    tempSwitchSensorMode,
    setTempSwitchSensorMode,
    switchSensorMode,
    setSwitchSensorMode,
    switchStatus,
    setSwitchStatus,
    switchMode,
    setSwitchMode,
    switchTypeRef,
    deleteTagsScene,
    currentTagsScene,
    setLoadingVisible,
    onOpenDeviceSceneEditPage,
    onOpenManualSceneSelectPage,
    onOpenAutomationConfig
  } = props;
  // 开关按钮按下
  const onSwitchButtonPress = (value) => {
    const t = {
      did: Device.deviceID,
      siid: switchSpec.siid,
      piid: switchSpec.piid,
      value: value
    };
    setSwitchStatus(t.value);
    Service.spec.setPropertiesValue([t]).then((res) => {
      const { code, value } = res[0];
      if (![0, 1].includes(code)) {
        setSwitchStatus(value);
      }
    }).catch((error) => {
      setSwitchStatus(value);
      Host.ui.showToast(I18n.common_setting_failed);
      console.log('开关设置失败---error', error);
    });
  };
  // 保存无线开关模式
  const saveWirelessSwitchMode = async(type) => {
    const value = type === SWITCH_DEVICE_TYPE.COMMON_DEVICE 
      ? switchModeSpec.prop?.['Wired And Wireless'] 
      : switchModeSpec.prop?.['Wireless'];
    
    const succeeded = await apiSaveWirelessSwitchMode(switchModeSpec, value);
    if (succeeded) {
      setSwitchMode(value);
    } else {
      setSwitchMode(switchModeSpec.prop?.['Wired And Wireless']);
    }
    return succeeded;
  };
  // 保存开关类型
  const onSaveSwitchType = async(type) => {
    if (type === switchButtonType) return true;
    
    const selectSwitchInfo = {
      ...(switchTypeRef.current || {}),
      [getSwitchTypeDeviceSettingKey(switchSpec)]: type
    };
    
    const succeeded = await apiSaveSwitchType(selectSwitchInfo);
    if (succeeded) {
      DeviceEventEmitter.emit(EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY, selectSwitchInfo);
      onSceneDeleteIfNeeded();
    }
    return succeeded;
  };
  // 删除关联场景（如果需要）
  const onSceneDeleteIfNeeded = () => {
    if (tempSwitchType &&
      switchButtonType &&
      tempSwitchType !== switchButtonType &&
      tempSwitchType !== SWITCH_DEVICE_TYPE.MANUAL_SCENE &&
      (currentTagsScene?.scene_id)) {
      deleteTagsScene(currentTagsScene?.scene_id).then(() => {
        setLoadingVisible(false);
      }).catch((error) => {
        Host.ui.showToast(I18n.common_setting_failed);
      });
    } else {
      setLoadingVisible(false);
    }
  };
  // 修改操作模式
  const onSwitchSensorMode = (value) => {
    const lastValue = switchSensorMode;
    if (lastValue === value) {
      return;
    }
    
    setLoadingVisible(true);
    const t = {
      did: Device.deviceID,
      siid: switchSensorModeSpec.siid,
      piid: switchSensorModeSpec.piid,
      value
    };
    
    if (switchSensorModeSpec.miid) {
      t.miid = switchSensorModeSpec.miid;
    }
    
    Service.spec.setPropertiesValue([t]).then((res) => {
      const { code } = res[0] || {};
      if (![0, 1].includes(code)) {
        Host.ui.showToast(I18n.common_setting_failed);
      } else {
        setSwitchSensorMode(value);
      }
    }).catch((error) => {
      Host.ui.showToast(I18n.common_setting_failed);
      console.log('操作模式设置失败---error', error);
    }).finally(() => {
      setLoadingVisible(false);
    });
  };
  // 提交开关类型
  const submitSwitchType = async(SwitchType) => {
    try {
      // 普通设备，直接修改
      if (SwitchType === SWITCH_DEVICE_TYPE.COMMON_DEVICE) {
        await saveWirelessSwitchMode(SwitchType);
        await onSaveSwitchType(SwitchType);
        setSwitchButtonType(SwitchType);
      }
      // 智能灯、开关，跳转二级页面
      else if (SwitchType === SWITCH_DEVICE_TYPE.SMART_LIGHT || SwitchType === SWITCH_DEVICE_TYPE.SMART_SWITCH) {
        onOpenDeviceSceneEditPage(SwitchType);
      }
      // 执行手动控制，跳转二级页面，type 由详情页确认后写入
      else if (SwitchType === SWITCH_DEVICE_TYPE.MANUAL_SCENE) {
        const isTypeChange = SwitchType !== switchButtonType;
        onOpenManualSceneSelectPage(isTypeChange);
      }
      // 其他智能设备，保存类型后打开自动化配置编辑器
      else if (SwitchType === SWITCH_DEVICE_TYPE.OTHER_SMART_DEVICE) {
        await saveWirelessSwitchMode(SwitchType);
        await onSaveSwitchType(SwitchType);
        setSwitchButtonType(SwitchType);
        onOpenAutomationConfig();
      }
    } catch (error) {
      console.log('提交开关类型失败', error);
    }
  };
  // 切换到智能模式
  const handleSwitchToSmartMode = async() => {
    const wirelessValue = switchModeSpec.prop?.['Wireless'];
    const prevMode = switchMode;
    // 乐观更新：立刻切换界面
    setSwitchMode(wirelessValue);
    try {
      setLoadingVisible(true);
      const succeeded = await apiSaveWirelessSwitchMode(switchModeSpec, wirelessValue);
      if (!succeeded) {
        setSwitchMode(prevMode);
      }
    } catch (error) {
      console.log('handleSwitchToSmartMode error', error);
      setSwitchMode(prevMode);
      Host.ui.showToast(I18n.common_setting_failed);
    } finally {
      setLoadingVisible(false);
    }
  };
  // 切换到传统模式
  const handleSwitchToTraditionalMode = async() => {
    const wiredValue = switchModeSpec.prop?.['Wired And Wireless'];
    const prevMode = switchMode;
    // 乐观更新：立刻切换界面
    setSwitchMode(wiredValue);
    try {
      setLoadingVisible(true);
      const succeeded = await apiSaveWirelessSwitchMode(switchModeSpec, wiredValue);
      if (!succeeded) {
        setSwitchMode(prevMode);
      }
    } catch (error) {
      console.log('handleSwitchToTraditionalMode error', error);
      setSwitchMode(prevMode);
      Host.ui.showToast(I18n.common_setting_failed);
    } finally {
      setLoadingVisible(false);
    }
  };
  return {
    onSwitchButtonPress,
    saveWirelessSwitchMode,
    onSaveSwitchType,
    onSceneDeleteIfNeeded,
    onSwitchSensorMode,
    submitSwitchType,
    handleSwitchToSmartMode,
    handleSwitchToTraditionalMode,
    setTempSwitchSensorMode
  };
};