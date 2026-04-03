import React from 'react';
import { SWITCH_DEVICE_TYPE } from "../../Const";
import AutoDeviceInfoButton from "./AutoDeviceInfoButton";
import AddDeviceButton from "./AddDeviceButton";
import { Images, strings as I18n } from "../../../../resources";
import { reportAutoSwitchClick } from "../reportUtils";
/**
 * 手动场景卡片组件
 * 用于手动场景的展示和操作
 * 有数据时显示场景信息；无数据时始终显示添加入口
 */
const ManualSceneCard = ({
  switchButtonType,
  currentTagsScene,
  relatedManualScene,
  existTriggerScene,
  onEditPress,
  onChangeTypePress,
  disabled,
  subRef
}) => {
  const { scene_action, scene_id } = currentTagsScene || {};
  const { name } = scene_action?.actions?.[0] || {};
  // currentTagsScene 是所有类型共用的，必须同时确认是手动场景类型才算有数据
  const hasData = !!scene_id && switchButtonType === SWITCH_DEVICE_TYPE.MANUAL_SCENE;
  if (!hasData) {
    return null;
  }
  const handlePress = () => {
    reportAutoSwitchClick({
      subRef,
      item_type: 'button',
      item_name: 'replace_device'
    });
    onChangeTypePress();
  };
  const title = relatedManualScene?.scene_id
    ? relatedManualScene?.scene_name
    : name;
  const rightText = relatedManualScene?.scene_id
    ? I18n.automation_toggle_btn
    : "";
  const icon = relatedManualScene?.icon
    ? { uri: relatedManualScene.icon }
    : Images.common.manualScene;
  return (
    <AutoDeviceInfoButton
      style={{ marginTop: 12 }}
      title={title}
      subtitle={relatedManualScene?.scene_id ? '' : I18n.common_deleted}
      rightText={rightText}
      icon={icon}
      onPress={handlePress}
      disabled={disabled}
    />
  );
};
export default ManualSceneCard;