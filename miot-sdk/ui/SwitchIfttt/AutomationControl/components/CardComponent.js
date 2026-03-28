import React from 'react';
import { View, Text, TouchableHighlight, Image } from "react-native";
import { dynamicColor, dynamicStyleSheet } from "../../../Style";
import DynamicColor from "../../../Style/DynamicColor";
import PropTypes from "prop-types";
const CardComponent = ({ title, subtitle, onPress, children, style, icon }) => {
  return (
    <View style={ [{
      backgroundColor: "white",
      paddingTop: 12,
      paddingHorizontal: 10,
      paddingBottom: 8,
      width: "100%",
      borderRadius: 20,
      alignItems: "center"
    }, style] }>
      <View style={ Styles.container }>
        <TouchableHighlight
          underlayColor="transparent"
          style={{ width: "100%" }}
          onPress={ () => {
            onPress && onPress();
          } }>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <Text style={ Styles.titleText } numberOfLines={ 1 }>{ title }
            </Text>
            <View style={ Styles.rightContainer }>
              <Text
                style={ Styles.normalText }
                numberOfLines={ 1 }>{ subtitle }</Text>
              { icon &&
                <Image
                  source={ icon }
                  style={ Styles.rightIcon }/>
              }
            </View>
          </View>
        </TouchableHighlight>
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
  style: PropTypes.any
};
const Styles = dynamicStyleSheet({
  container: {
    width: "100%",
    paddingVertical: 5.5,
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  normalText: {
    lineHeight: 21,
    fontSize: 14,
    color: new DynamicColor('rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 0.5)')
  },
  titleText: {
    fontSize: 16,
    color: dynamicColor("rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 0.95)")
  },
  rightContainer: { flexDirection: "row", alignItems: "center" },
  rightIcon: { width: 24, height: 24 }
});
export default CardComponent;