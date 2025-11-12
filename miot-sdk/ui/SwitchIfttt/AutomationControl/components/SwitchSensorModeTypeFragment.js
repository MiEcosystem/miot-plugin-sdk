import { View } from "react-native";
import React, { Fragment, useMemo } from "react";
import { dynamicColor, dynamicStyleSheet } from "../../../Style";
import { ChoiceItemWithIcon } from "../../../ListItem";
import { strings as I18n } from "../../../../resources";
export default function SwitchSensorModeTypeFragment(props) {
  const { switchSensorMode, switchSensorModeSpec, onChange } = props;
  const getSwitchTypeTitle = (type) => {
    if (type === switchSensorModeSpec.prop['Multiple Click']) {
      return I18n.switch_listItem_title_standardMode;
    } else if (type === switchSensorModeSpec.prop['Quick Single Click']) {
      return I18n.switch_listItem_title_speedMode;
    }
  };
  const getSwitchTypeSubtitle = (type) => {
    if (type === switchSensorModeSpec.prop['Multiple Click']) {
      return switchSensorModeSpec?.multipleClickSubtitle || I18n.switch_listItem_subtile_standardModeDescription;
    } else if (type === switchSensorModeSpec.prop['Quick Single Click']) {
      return I18n.switch_listItem_subtile_speedModeDescription;
    }
  };
  const onSensorModeTypeSelect = (selected, type) => {
    onChange(selected ? type : null);
  };
  const singleBar = (key, type, isFirst, isLast) => {
    return (
      <ChoiceItemWithIcon
        key={ key }
        styles={ {
          container: [
            { backgroundColor: dynamicColor('#FFF', "#333") },
            isFirst ? { borderTopLeftRadius: 16, borderTopRightRadius: 16 } : null,
            isLast ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 } : null
          ]
        } }
        title={ getSwitchTypeTitle(type) }
        subtitle={ getSwitchTypeSubtitle(type) }
        checked={ switchSensorMode === type }
        // icon={ getSwitchTypeIcon(type) }
        onValueChange={ (selected) => {
          onSensorModeTypeSelect(selected, type);
        } }
        radio={ {
          checkedBigCircleStyle: {
            borderColorChecked: '#32BAC0',
            backgroundColorChecked: '#32BAC0',
            borderColor: dynamicColor("rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.15)'),"),
            backgroundColor: dynamicColor("rgba(0, 0, 0, 0.06)", "rgba(255, 255, 255, 0.15)")
          }
        } }
      />
    );
  };
  const choiceItems = useMemo(() => {
    return (Object.entries(switchSensorModeSpec.prop || {}).map(([key, type], index) => {
      return singleBar(key, type, index === 0, index === 1);
    }));
  }, [switchSensorMode, switchSensorModeSpec]);
  return (
    <Fragment>
      <View
        contentStyle={ Styles.contentStyle }
      >
        <View style={ Styles.card }>
          { choiceItems }
        </View>
      </View>
    </Fragment>
  );
}
const Styles = dynamicStyleSheet({
  contentStyle: {
    flex: 1
  },
  card: {
    width: "100%",
    paddingHorizontal: 12,
    paddingBottom: 8
  }
});