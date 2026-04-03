import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Host from 'miot/Host';
import AutoDeviceInfoButton from "./AutoDeviceInfoButton";
import { strings as I18n, Images } from "../../../../resources";
/**
 * 其他智能设备卡片组件
 * 用于单击自动化场景展示
 * 有数据时显示场景列表；无数据时返回 null（由父级统一显示空态）
 */
const OtherSmartDeviceCard = ({
  switchButtonType,
  simplifiedMatchedScenes,
  disabled,
}) => {
  const { click = [] } = simplifiedMatchedScenes || {};
  if (click.length === 0) {
    return null;
  }
  const handleEdit = (item) => {
    Host.ui.openAutomationDetail({
      scene_type: 2,
      scene_id: item.scene_id,
      template_id: item.template_id,
      edit_from: 1
    });
  };
  return (
    <View style={{ width: '100%' }}>
      {click.map((item) => {
        const { scene_action, name, scene_id } = item;
        const hasCustomIcon = !!scene_action.iconUrl;
        const icon = hasCustomIcon
          ? { uri: scene_action.iconUrl }
          : Images.common.auto_default;
        const executionLabel = item.type === 0
          ? I18n.switch_listItem_value_executionTypeCloud
          : I18n.switch_listItem_value_executionTypeLocale;
        const iconWithBadge = hasCustomIcon ? (
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
            iconNode={iconWithBadge}
            rightText={I18n.automation_edit_btn}
            onPress={() => handleEdit(item)}
            disabled={disabled}
          />
        );
      })}
    </View>
  );
};
const Styles = StyleSheet.create({
  itemSpacing: {
    marginTop: 8
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
export default OtherSmartDeviceCard;