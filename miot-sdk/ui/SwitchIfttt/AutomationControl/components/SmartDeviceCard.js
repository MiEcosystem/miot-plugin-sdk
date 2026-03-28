import React from 'react';
import { SWITCH_DEVICE_TYPE } from "../../Const";
import AutoDeviceInfoButton from "./AutoDeviceInfoButton";
import { Images, strings as I18n } from "../../../../resources";
import { reportAutoSwitchClick } from "../reportUtils";
/**
 * 智能设备卡片组件
 * 用于智能灯和智能开关的展示和操作
 */
const SmartDeviceCard = ({ 
  switchButtonType,
  currentTagsScene,
  relatedDevice,
  relatedRoomInfo,
  existTriggerScene,
  onEditPress,
  subRef
}) => {
  // 只在智能灯或智能开关类型时显示
  if (
    ![SWITCH_DEVICE_TYPE.SMART_LIGHT, SWITCH_DEVICE_TYPE.SMART_SWITCH].includes(switchButtonType)
  ) {
    return null;
  }
  const { scene_action, scene_id } = currentTagsScene || {};
  const { payload_json, name } = scene_action?.actions?.[0] || {};
  // 没有关联场景时不显示
  if (!scene_id) {
    return null;
  }
  const handlePress = () => {
    reportAutoSwitchClick({
      subRef,
      item_type: 'button',
      item_name: 'replace_device'
    });
    onEditPress();
  };
  // 根据设备类型确定显示内容
  const isSmartSwitch = switchButtonType === SWITCH_DEVICE_TYPE.SMART_SWITCH;
  
  const title = relatedDevice?.did 
    ? (isSmartSwitch ? name : relatedDevice?.deviceName)
    : payload_json?.device_name;
  const subtitle = relatedDevice?.did
    ? (isSmartSwitch ? name : relatedDevice?.roomName)
    : payload_json?.roomName;
  const rightText = relatedDevice?.did ? I18n.automation_toggle_btn : "";
  const icon = relatedDevice?.did
    ? { uri: relatedDevice.iconUrl }
    : (isSmartSwitch ? Images.common.defaultSwitch : Images.common.defaultLight);
  return (
    <AutoDeviceInfoButton
      style={{ marginTop: 12 }}
      title={title}
      subtitle={subtitle}
      rightText={rightText}
      icon={icon}
      onPress={handlePress}
    />
  );
};
export default SmartDeviceCard;