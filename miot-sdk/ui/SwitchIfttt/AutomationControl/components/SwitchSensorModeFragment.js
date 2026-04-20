import React, { useMemo } from 'react';
import { View } from 'react-native';
import { CardContainer, ListItem, Radio } from 'mhui-rn/dist/hyperOS';
import { strings as I18n } from '../../../../resources';
export default function SwitchSensorModeFragment({ switchSensorMode, switchSensorModeSpec, onChange }) {
  const items = useMemo(() => {
    return Object.entries(switchSensorModeSpec?.prop || {}).map(([key, type]) => {
      const isMultiple = type === switchSensorModeSpec.prop['Multiple Click'];
      const title = isMultiple
        ? I18n.switch_listItem_title_standardMode
        : I18n.switch_listItem_title_speedMode;
      const subtitle = isMultiple
        ? (switchSensorModeSpec?.multipleClickSubtitle || I18n.switch_listItem_subtile_standardModeDescription)
        : I18n.switch_listItem_subtile_speedModeDescription;
      return { key, type, title, subtitle };
    });
  }, [switchSensorModeSpec]);
  return (
    <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
      <CardContainer>
        {items.map(({ key, type, title, subtitle }) => (
          <View key={key} onStartShouldSetResponderCapture={() => { onChange(type); return true; }}>
            <ListItem
              title={title}
              subtitle={subtitle}
              actionType="custom"
              onPress={() => {}}
              customRender={
                <Radio
                  checked={switchSensorMode === type}
                  colorType="green"
                />
              }
            />
          </View>
        ))}
      </CardContainer>
    </View>
  );
}