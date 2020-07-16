// @ts-nocheck

/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { adjustSize } from "../utils/sizes";
import { FontDefault } from "../utils/fonts";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
export default class SmallNumber extends PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      themeColor: PropTypes.any,
      titleThemeColor: PropTypes.any,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel
    })),
    themeColor: PropTypes.any,
    titleThemeColor: PropTypes.any,
    accessible: AccessibilityPropTypes.accessible
  };
  offsetX = new Animated.Value(0);
  containerWidth = 0;
  centerWidth = 0;
  centerX = 0;
  onLayoutContainer = e => {
    let {
      width
    } = e.nativeEvent.layout;
    this.containerWidth = width;

    if (width && this.centerWidth) {
      this.offsetX.setValue(width / 2 - this.centerWidth / 2 - this.centerX);
    }
  };
  onLayoutCenter = e => {
    let {
      width,
      x
    } = e.nativeEvent.layout;
    this.centerWidth = width;
    this.centerX = x;

    if (width && this.containerWidth) {
      this.offsetX.setValue(this.containerWidth / 2 - width / 2 - x);
    }
  };
  getItems = () => {
    let {
      list,
      themeColor,
      titleThemeColor
    } = this.props;
    let filtered = list.filter(item => {
      return item && item.title !== undefined && item.number !== undefined;
    });
    let total = filtered.length;
    let isOdd = total % 2 === 1;
    let centerIndex = total <= 0 ? 0 : isOdd ? total / 2 - 0.5 : total / 2;
    return filtered.map((item, index) => {
      let {
        title,
        number
      } = item;
      let theme = item.themeColor || themeColor;
      let titleTheme = item.titleThemeColor || titleThemeColor;
      return <Fragment key={index}>
          {index > 0 ? <View style={[Styles.separator, titleTheme ? {
          backgroundColor: titleTheme
        } : null]} onLayout={centerIndex === index && !isOdd ? this.onLayoutCenter : null}></View> : null}
          <View style={Styles.item} onLayout={centerIndex === index && isOdd ? this.onLayoutCenter : null} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.text,
          accessibilityLabel: item.accessibilityLabel
        })}>
            <Text style={[Styles.number, theme ? {
            color: theme
          } : null, isNaN(number) ? {
            fontSize: adjustSize(88)
          } : null]}>{number}</Text>
            <Text style={[Styles.title, titleTheme ? {
            color: titleTheme
          } : null]}>{title}</Text>
          </View>
        </Fragment>;
    });
  };

  render() {
    let {
      list
    } = this.props;

    if (!list || !list.length) {
      return null;
    }

    let items = this.getItems();
    let offsetX = this.offsetX;
    return <View style={Styles.container} onLayout={this.onLayoutContainer}>
        <Animated.View style={[Styles.containerInner, {
        transform: [{
          translateX: offsetX
        }]
      }]}>
          {items}
        </Animated.View>
      </View>;
  }

}
const Styles = StyleSheet.create({
  containerInner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  separator: {
    width: adjustSize(2.1),
    height: adjustSize(135),
    marginHorizontal: adjustSize(45),
    marginTop: adjustSize(12),
    backgroundColor: 'rgba(0, 0, 0, 1)',
    opacity: 0.2
  },
  item: {
    alignItems: 'center'
  },
  title: {
    fontSize: adjustSize(36),
    fontFamily: FontDefault,
    lineHeight: adjustSize(48),
    color: '#1C2229',
    opacity: 1
  },
  number: {
    fontSize: adjustSize(102),
    fontFamily: 'Helvetica',
    lineHeight: adjustSize(123),
    color: '#1C2229',
    opacity: 0.8
  }
});