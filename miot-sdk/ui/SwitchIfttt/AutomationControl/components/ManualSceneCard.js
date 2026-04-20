import React from 'react';
import { SWITCH_DEVICE_TYPE } from "../../Const";
import AutoDeviceInfoButton from "./AutoDeviceInfoButton";
import AddDeviceButton from "./AddDeviceButton";
import { Images, strings as I18n } from "../../../../resources";
const SCENE_STATUS_COLOR = '#CC9200';
/**
 * 手动场景卡片组件
 * 用于手动场景的展示和操作
 * 有数据时显示场景信息；无数据时始终显示添加入口
 */
const ManualSceneCard = ({
  switchButtonType,
  currentTagsScene,
  relatedManualScene,
  manualSceneListLoaded,
  existTriggerScene,
  onEditPress,
  onChangeTypePress,
  disabled,
}) => {
  const { scene_action, scene_id, type: sceneType } = currentTagsScene || {};
  const { name } = scene_action?.actions?.[0] || {};
  // currentTagsScene 是所有类型共用的，必须同时确认是手动场景类型才算有数据
  const hasData = !!scene_id && switchButtonType === SWITCH_DEVICE_TYPE.MANUAL_SCENE;
  if (!hasData || !manualSceneListLoaded) {
    return null;
  }
  const handlePress = () => {
    onChangeTypePress();
  };
  const sceneFound = !!relatedManualScene?.scene_id;
  // 只有 manualSceneList 已加载（loaded）且未找到匹配场景，才判定为"已删除"
  const isDeleted = manualSceneListLoaded && !sceneFound;
  const title = sceneFound
    ? relatedManualScene?.scene_name
    : name;
  const rightText = (sceneFound || isDeleted) ? I18n.automation_toggle_btn : "";
  const icon = relatedManualScene?.icon
    ? { uri: relatedManualScene.icon }
    : Images.common.manualScene;
  const executionLabel = sceneType === 0
    ? I18n.switch_listItem_value_executionTypeCloud
    : I18n.switch_listItem_value_executionTypeLocale;
  const subtitleParts = isDeleted
    ? [{ text: I18n.common_deleted, color: SCENE_STATUS_COLOR }]
    : [{ text: executionLabel }];
  return (
    <AutoDeviceInfoButton
      style={{ marginTop: 12 }}
      title={title}
      subtitleParts={subtitleParts}
      rightText={rightText}
      icon={icon}
      onPress={handlePress}
      disabled={disabled}
      titleDeleted={isDeleted}
    />
  );
};
export default ManualSceneCard;