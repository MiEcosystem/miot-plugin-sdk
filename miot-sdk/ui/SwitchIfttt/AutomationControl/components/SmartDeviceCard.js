import React from 'react';
import { SWITCH_DEVICE_TYPE } from "../../Const";
import AutoDeviceInfoButton from "./AutoDeviceInfoButton";
import AddDeviceButton from "./AddDeviceButton";
import { Images, strings as I18n } from "../../../../resources";
const DEVICE_STATUS_OFFLINE_COLOR = '#CC9200';
const getExecutionTypeLabel = (type) =>
  type === 0 ? I18n.switch_listItem_value_executionTypeCloud : I18n.switch_listItem_value_executionTypeLocale;
const getDeviceStatusPart = (relatedDevice, relatedDeviceStatus) => {
  // 设备在当前家庭：检查在线状态
  if (relatedDevice?.did) {
    if (relatedDevice.isOnline === false) {
      return { text: I18n.offline, color: DEVICE_STATUS_OFFLINE_COLOR };
    }
    return null;
  }
  // 设备不在当前家庭或已删除
  if (relatedDeviceStatus === 'other_home') {
    return { text: I18n.switch_button_subtitle_notCurrentHome, color: DEVICE_STATUS_OFFLINE_COLOR };
  }
  if (relatedDeviceStatus === 'deleted') {
    return { text: I18n.common_deleted, color: DEVICE_STATUS_OFFLINE_COLOR };
  }
  return null;
};
/**
 * 智能设备卡片组件
 * 用于智能灯和智能开关的展示和操作
 * 有数据时显示设备信息；无数据时始终显示添加入口
 */
const SmartDeviceCard = ({
  switchButtonType,
  currentTagsScene,
  relatedDevice,
  relatedDeviceStatus,
  relatedRoomInfo,
  existTriggerScene,
  onEditPress,
  onChangeTypePress,
  disabled,
}) => {
  const { scene_action, scene_id, type: sceneType } = currentTagsScene || {};
  const { payload_json, name } = scene_action?.actions?.[0] || {};
  const executionLabel = getExecutionTypeLabel(sceneType);
  // currentTagsScene 是所有类型共用的，必须同时确认是智能灯/开关类型才算有数据
  const isMyType = [SWITCH_DEVICE_TYPE.SMART_LIGHT, SWITCH_DEVICE_TYPE.SMART_SWITCH].includes(switchButtonType);
  const hasData = !!scene_id && isMyType;
  if (!hasData) {
    return null;
  }
  const handlePress = () => {
    onChangeTypePress();
  };
  // 根据设备类型确定显示内容
  const isSmartSwitch = switchButtonType === SWITCH_DEVICE_TYPE.SMART_SWITCH;
  const hasRelatedDevice = !!relatedDevice?.did;
  const title = hasRelatedDevice
    ? (isSmartSwitch ? name : relatedDevice.deviceName)
    : payload_json?.device_name;
  const roomText = hasRelatedDevice
    ? (isSmartSwitch ? name : relatedDevice.roomName)
    : relatedRoomInfo?.roomName || payload_json?.roomName;
  const deviceStatusPart = getDeviceStatusPart(relatedDevice, relatedDeviceStatus);
  const secondPart = deviceStatusPart || executionLabel;
  const subtitleParts = roomText ? [roomText, secondPart] : [secondPart];
  // 不在当前家庭/已删除时仍显示切换按钮，让用户可以重新选择设备
  const rightText = (hasRelatedDevice || relatedDeviceStatus === 'other_home' || relatedDeviceStatus === 'deleted')
    ? I18n.automation_toggle_btn
    : "";
  const icon = hasRelatedDevice
    ? { uri: relatedDevice.iconUrl }
    : (isSmartSwitch ? Images.common.defaultSwitch : Images.common.defaultLight);
  return (
    <AutoDeviceInfoButton
      style={{ marginTop: 8 }}
      title={title}
      subtitleParts={subtitleParts}
      rightText={rightText}
      icon={icon}
      onPress={handlePress}
      disabled={disabled}
    />
  );
};
export default SmartDeviceCard;