import React from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { dynamicColor } from "../../../Style";
import PropTypes from "prop-types";
const AutoDeviceInfoButton = ({
  title = "",
  subtitle = "",
  subtitleParts,
  rightText = "",
  icon = "",
  iconNode,
  onPress,
  style,
  disabled,
}) => {
  const renderSubtitle = () => {
    if (subtitleParts && subtitleParts.length > 0) {
      return (
        <View style={ Styles.subtitleRow }>
          { subtitleParts.map((part, index) => {
            const text = typeof part === 'string' ? part : part.text;
            const color = typeof part === 'string' ? null : part.color;
            return (
              <React.Fragment key={ index }>
                { index > 0 && <View style={ Styles.subtitleDivider } /> }
                <Text
                  style={ [Styles.subtitleStyle, color ? { color } : null, disabled && Styles.disabledText] }
                  numberOfLines={ 1 }
                >{ text }</Text>
              </React.Fragment>
            );
          }) }
        </View>
      );
    }
    return subtitle
      ? <Text style={ [Styles.subtitleStyle, disabled && Styles.disabledText] } numberOfLines={ 3 }>{ subtitle }</Text>
      : null;
  };
  return (
    <TouchableHighlight
      underlayColor="transparent"
      disabled={disabled}
      onPress={ () => {
        onPress && onPress();
      } }>
      <View style={ [Styles.container, style] }>
        { iconNode
          ? <View style={ disabled && Styles.disabledOpacity }>{ iconNode }</View>
          : <Image source={ icon } style={ [Styles.iconStyle, disabled && Styles.disabledOpacity] }/>
        }
        <View style={ Styles.titleContainer }>
          <View style={ Styles.titleRow }>
            <Text style={ [Styles.titleStyle, disabled && Styles.disabledText] } numberOfLines={ 3 }>{ title }</Text>
          </View>
          { renderSubtitle() }
        </View>
        <View style={ Styles.rightTextContainerStyle }>
          <View style={ Styles.rightTextBadge }>
            <Text style={ [Styles.rightTextStyle, disabled && Styles.disabledText] } numberOfLines={ 3 }>{ rightText }</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
AutoDeviceInfoButton.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleParts: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ text: PropTypes.string, color: PropTypes.string }),
  ])),
  rightText: PropTypes.string,
  icon: PropTypes.any,
  onPress: PropTypes.func,
  style: PropTypes.any,
};
const Styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: dynamicColor('rgba(0, 0, 0, .04)', 'rgba(255, 255, 255, 0.08)'),
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 7,
    alignItems: "center",
  },
  iconStyle: {
    width: 50,
    height: 50,
  },
  titleContainer: {
    paddingHorizontal: 4,
    justifyContent: "center",
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 15,
    flexShrink: 1,
    color: dynamicColor('rgba(0,0,0,0.8)', 'rgba(255, 255, 255, 0.95)'),
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  subtitleDivider: {
    width: 1,
    height: 6,
    backgroundColor: dynamicColor('rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.5)'),
    marginHorizontal: 5,
  },
  subtitleStyle: {
    fontSize: 12,
    color: dynamicColor('rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 0.5)'),
  },
  rightTextContainerStyle: {
    maxWidth: 116,
    justifyContent: "center",
    paddingRight: 10,
    alignItems: "flex-end",
  },
  rightTextBadge: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: dynamicColor('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.8)'),
  },
  rightTextStyle: {
    fontFamily: "MiSans",
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 5.5,
    color: dynamicColor('rgba(0, 0, 0, 0.8)', '#FFFFFF'),
  },
  disabledOpacity: {
    opacity: 0.25,
  },
  disabledText: {
    color: dynamicColor('rgba(0,0,0,0.2)', 'rgba(255,255,255,0.2)'),
  },
});
export default AutoDeviceInfoButton;