import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { NOOP } from '../../utils/fns';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import DynamicColor from '../Style/DynamicColor';
export default class ConfirmButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    themeColor: PropTypes.any,
    textColor: PropTypes.any,
    onClick: PropTypes.func,
    clickInterval: PropTypes.number,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.any,
    iconSelected: PropTypes.any,
    containerStyle: PropTypes.any,
    btnStyle: PropTypes.any,
    iconStyle: PropTypes.any,
    textStyle: PropTypes.any,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    title: '',
    themeColor: '',
    textColor: '',
    icon: null,
    containerStyle: {},
    iconStyle: {},
    btnStyle: {},
    textStyle: {},
    onClick: NOOP,
    clickInterval: 0,
    onLongPress: NOOP,
    onPressIn: NOOP,
    onPressOut: NOOP,
    disabled: false
  };
  onPress = () => {
    let { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  onLongPress = () => {
    let { clickInterval, onLongPress } = this.props;
    if (typeof onLongPress === 'function') {
      onLongPress();
    }
    if (!clickInterval) {
      return;
    }
    this._longPressInterval = setInterval(() => {
      this.onPress();
    }, clickInterval);
  };
  onPressIn = () => {
    let { onPressIn } = this.props;
    if (typeof onPressIn === 'function') {
      onPressIn();
    }
  };
  onPressOut = () => {
    this._longPressInterval && clearInterval(this._longPressInterval);
    this._longPressInterval = undefined;
    let { onPressOut } = this.props;
    if (typeof onPressOut === 'function') {
      onPressOut();
    }
  };
  render() {
    let {
      title,
      themeColor,
      textColor,
      disabled,
      icon,
      containerStyle,
      btnStyle,
      iconStyle,
      textStyle
    } = this.props;
    if (!title && !icon) {
      return null;
    }
    let opacity = disabled ? 0.4 : 1;
    return (
      <View style={[Styles.container, containerStyle]}>
        <TouchableOpacity style={[Styles.btn, { opacity }, themeColor ? {
          backgroundColor: themeColor,
          borderColor: themeColor
        } : null, btnStyle]} onPress={this.onPress} onLongPress={this.onLongPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut} disabled={disabled} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityLabel: this.props.accessibilityLabel,
          accessibilityHint: this.props.accessibilityHint,
          accessibilityState: {
            disabled
          }
        })}>
          {
            icon ? (
              <Image style={StyleSheet.flatten([Styles.icon, { opacity }, iconStyle])}
                source={icon}
              />
            ) : null
          }
          {
            title && title.length > 0 ? (
              <Text style={[Styles.title, { opacity }, textColor ? {
                color: textColor
              } : null, textStyle]}>{title}</Text>
            ) : null
          }
        </TouchableOpacity>
      </View>
    );
  }
}
const Styles = dynamicStyleSheet({
  container: {},
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: new DynamicColor('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.2)')
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: new DynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.7)')
  }
});