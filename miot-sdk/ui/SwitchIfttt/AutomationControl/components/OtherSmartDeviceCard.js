import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Host from 'miot/Host';
import { Device } from 'miot';
import { SWITCH_DEVICE_TYPE } from "../../Const";
import AutoDeviceInfoButton from "./AutoDeviceInfoButton";
import AddDeviceButton from "./AddDeviceButton";
import { dynamicColor } from "../../../Style";
import { strings as I18n } from "../../../../resources";
/**
 * 其他智能设备卡片组件
 * 用于 OTHER_SMART_DEVICE 类型的自动化场景展示
 * 按单击 → 双击 → 长按顺序显示，双击/长按为空时隐藏，单击为空时显示添加入口
 * 无数据时调用 fillAutomationConfig 新增，有数据时调用 openAutomationDetail 查看详情
 */
const OtherSmartDeviceCard = ({
  switchButtonType,
  simplifiedMatchedScenes,
  matchedTcaItems,
  switchClickSpec,
  switchDoubleClickSpec,
  switchLongPressesSpec,
  subRef
}) => {
  if (switchButtonType !== SWITCH_DEVICE_TYPE.OTHER_SMART_DEVICE) {
    return null;
  }
  const { click = [], doubleClick = [], longPress = [] } = simplifiedMatchedScenes || {};
  const handleAdd = (tcaItem) => {
    if (!tcaItem?.sc_id) return;
    const trigger = { did: Device.deviceID, sc_id: tcaItem.sc_id };
    if (tcaItem.value !== '' && tcaItem.value != null) {
      trigger.value = tcaItem.value;
    }
    Host.ui.fillAutomationConfig({ trigger: [trigger] });
  };
  const handleEdit = (item) => {
    Host.ui.openAutomationDetail({
      scene_type: 2,
      scene_id: item.scene_id,
      template_id: item.template_id,
      edit_from: 1
    });
  };
  const renderSceneItem = (item) => {
    const { scene_action, name, scene_id } = item;
    const icon = scene_action.iconUrl
      ? { uri: scene_action.iconUrl }
      : scene_action.defaultIcon;
    return (
      <AutoDeviceInfoButton
        key={scene_id}
        style={Styles.itemSpacing}
        title={name}
        icon={icon}
        rightText={I18n.automation_toggle_btn}
        onPress={() => handleEdit(item)}
      />
    );
  };
  const renderSection = (label, scenes, tcaItem) => {
    if (!scenes.length) return null;
    return (
      <View style={Styles.section}>
        <Text style={Styles.sectionLabel}>{label}</Text>
        {scenes.map(renderSceneItem)}
      </View>
    );
  };
  const hasDoubleOrLong = switchDoubleClickSpec || switchLongPressesSpec;
  return (
    <View style={{ width: '100%' }}>
      {/* 单击：为空时显示添加按钮，section label 仅在有双击或长按时显示以作区分 */}
      {click.length > 0 ? (
        <View style={Styles.section}>
          {hasDoubleOrLong && switchClickSpec && (
            <Text style={Styles.sectionLabel}>{switchClickSpec.i18n}</Text>
          )}
          {click.map(renderSceneItem)}
        </View>
      ) : (
        <View style={Styles.section}>
          {hasDoubleOrLong && switchClickSpec && (
            <Text style={Styles.sectionLabel}>{switchClickSpec.i18n}</Text>
          )}
          <AddDeviceButton
            onPress={() => handleAdd(matchedTcaItems?.click)}
          />
        </View>
      )}
      {/* 双击：有数据才显示 */}
      {switchDoubleClickSpec && renderSection(switchDoubleClickSpec.i18n, doubleClick, matchedTcaItems?.doubleClick)}
      {/* 长按：有数据才显示 */}
      {switchLongPressesSpec && renderSection(switchLongPressesSpec.i18n, longPress, matchedTcaItems?.longPress)}
    </View>
  );
};
const Styles = StyleSheet.create({
  section: {
    marginTop: 12,
    width: '100%'
  },
  sectionLabel: {
    fontSize: 13,
    color: dynamicColor('rgba(0,0,0,0.4)', 'rgba(255,255,255,0.5)'),
    marginBottom: 6,
    paddingHorizontal: 4
  },
  itemSpacing: {
    marginTop: 8
  }
});
export default OtherSmartDeviceCard;