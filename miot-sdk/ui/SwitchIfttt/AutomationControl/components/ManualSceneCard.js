import React from 'react';
import { SWITCH_DEVICE_TYPE } from "../../Const";
import AutoDeviceInfoButton from "./AutoDeviceInfoButton";
import { Images, strings as I18n } from "../../../../resources";
import { reportAutoSwitchClick } from "../reportUtils";
/**
 * 手动场景卡片组件
 * 用于手动场景的展示和操作
 */
const ManualSceneCard = ({ 
  switchButtonType,
  currentTagsScene,
  relatedManualScene,
  existTriggerScene,
  onEditPress,
  subRef
}) => {
  // 只在手动场景类型时显示
  if (switchButtonType !== SWITCH_DEVICE_TYPE.MANUAL_SCENE) {
    return null;
  }
  const { scene_action, scene_id } = currentTagsScene || {};
  const { name } = scene_action?.actions?.[0] || {};
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
    />
  );
};
export default ManualSceneCard;