import React from 'react';
import { View, Text, TouchableHighlight, Image } from "react-native";
import { dynamicColor, dynamicStyleSheet } from "../../../Style";
import DynamicColor from "../../../Style/DynamicColor";
import PropTypes from "prop-types";
import Right from 'mhui-rn/dist/icons/Right';
import { colorToken, Fonts } from 'mhui-rn/dist/hyperOS';
const CardComponent = ({ title, subtitle, onPress, children, style, icon, rightButton, disabled }) => {
  const headerContent = (
    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
      <Text style={ [Styles.titleText, disabled && Styles.titleTextDisabled] } numberOfLines={ 1 }>{ title }</Text>
      { rightButton ? (
        rightButton
      ) : (
        <View style={ Styles.rightContainer }>
          <Text
            style={ Styles.normalText }
            numberOfLines={ 1 }>{ subtitle }</Text>
          { icon &&
            <Right width={18} height={18} fill={dynamicColor('rgba(0,0,0,0.3)', 'rgba(255,255,255,0.3)')} />
          }
        </View>
      ) }
    </View>
  );
  return (
    <View style={ [{
      backgroundColor: dynamicColor('#FFFFFF', 'rgba(255, 255, 255, 0.08)'),
      paddingTop: 10,
      paddingHorizontal: 10,
      paddingBottom: 10,
      width: "100%",
      borderRadius: 20,
      alignItems: "center"
    }, style] }>
      <View style={ Styles.container }>
        { rightButton ? (
          headerContent
        ) : (
          <TouchableHighlight
            underlayColor="transparent"
            style={{ width: "100%" }}
            onPress={ () => {
              onPress && onPress();
            } }>
            { headerContent }
          </TouchableHighlight>
        ) }
      </View>
      { children }
    </View>
  );
};
CardComponent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.any,
  disabled: PropTypes.bool,
};
const Styles = dynamicStyleSheet({
  container: {
    width: "100%",
    paddingVertical: 5.5,
    paddingLeft: 10,
    paddingRight: 6,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  normalText: {
    lineHeight: 21,
    ...Fonts.fontSystem14Regular,
    color: colorToken.contentQuaternaryNormal,
  },
  titleText: {
    ...Fonts.fontSystem16Medium,
    color: colorToken.contentPrimaryNormal,
  },
  titleTextDisabled: {
    color: colorToken.contentDisabledPrimary,
  },
  rightContainer: { flexDirection: "row", alignItems: "center" },
  rightIcon: { width: 24, height: 24 }
});
export default CardComponent;