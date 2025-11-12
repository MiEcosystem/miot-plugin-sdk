import React from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { dynamicColor } from "../../../Style";
import { adjustSize } from "../../../../utils/sizes";
import PropTypes from "prop-types";
const AutoDeviceInfoButton = ({
  title = "",
  subtitle = "",
  rightText = "",
  icon = "",
  onPress,
  style
}) => {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={ () => {
        onPress && onPress();
      } }>
      <View style={ [Styles.container, style] }>
        <Image source={ icon } style={ Styles.iconStyle }/>
        <View style={ Styles.titleContainer }>
          <Text style={ Styles.titleStyle } numberOfLines={ 3 }>{ title }</Text>
          { subtitle ? <Text style={ Styles.subtitleStyle } numberOfLines={ 3 }>{ subtitle }</Text> : null }
        </View>
        <View style={ Styles.rightTextContainerStyle }>
          <Text style={ Styles.rightTextStyle } numberOfLines={ 1 }>{ rightText }</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
AutoDeviceInfoButton.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  rightText: PropTypes.string,
  icon: PropTypes.any,
  onPress: PropTypes.func,
  style: PropTypes.any
};
const Styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: dynamicColor('rgba(0, 0, 0, .04)', 'rgba(255, 255, 255, 0.14)'),
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 7,
    alignItems: "center"
  },
  iconStyle: {
    width: 50,
    height: 50
  },
  titleContainer: {
    paddingHorizontal: 4,
    justifyContent: "center",
    flex: 1
  },
  titleStyle: {
    position: 'relative',
    fontSize: 15,
    fontWeight: "bold",
    color: dynamicColor("#000", 'rgba(255, 255, 255, 0.95)')
  },
  subtitleStyle: {
    fontSize: 12,
    color: dynamicColor('rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 0.5)')
  },
  rightTextContainerStyle: {
    maxWidth: 116,
    justifyContent: "center",
    paddingRight: 10,
    alignItems: "flex-end"
  },
  rightTextStyle: {
    fontFamily: "MiSans",
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 5.5,
    borderRadius: 999,
    color: dynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.7)'),
    backgroundColor: dynamicColor('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.15)')
  }
});
export default AutoDeviceInfoButton;