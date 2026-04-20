import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AutoDeviceInfoButton from "./AutoDeviceInfoButton";
import { strings as I18n, Images } from "../../../../resources";
/**
 * 自动化场景列表项
 * 封装图标徽章 + AutoDeviceInfoButton 的组合渲染
 *
 * @param {object} item - 场景数据，包含 scene_id / name / type / scene_action.iconUrl
 * @param {boolean} disabled
 * @param {function} onPress - 点击回调，参数为 item
 */
const SceneListItem = ({ item, disabled, onPress }) => {
  const { scene_action, name, scene_id } = item;
  const hasCustomIcon = !!scene_action.iconUrl;
  const icon = hasCustomIcon ? { uri: scene_action.iconUrl } : Images.common.auto_default;
  const executionLabel = item.type === 0
    ? I18n.switch_listItem_value_executionTypeCloud
    : I18n.switch_listItem_value_executionTypeLocale;
  const iconNode = hasCustomIcon ? (
    <View style={Styles.iconWrapper}>
      <Image source={icon} style={Styles.iconStyle} />
      <Image source={Images.common.auto_default} style={Styles.iconBadge} />
    </View>
  ) : null;
  return (
    <AutoDeviceInfoButton
      key={scene_id}
      style={Styles.itemSpacing}
      title={name}
      subtitle={executionLabel}
      icon={hasCustomIcon ? null : icon}
      iconNode={iconNode}
      rightText={I18n.automation_edit_btn}
      onPress={() => onPress(item)}
      disabled={disabled}
    />
  );
};
const Styles = StyleSheet.create({
  itemSpacing: {
    marginTop: 8,
  },
  iconWrapper: {
    width: 50,
    height: 50,
  },
  iconStyle: {
    width: 50,
    height: 50,
  },
  iconBadge: {
    position: 'absolute',
    width: 30,
    height: 30,
    right: 0,
    bottom: 0,
  },
});
export default SceneListItem;