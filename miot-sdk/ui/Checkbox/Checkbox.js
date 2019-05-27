import { Styles } from 'miot/resources';
import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Checkable from './Checkable';
const SIZE = 40;
const UNCHECKED_BACKGROUNDCOLOR = '#f0f0f0';
const UNCHECKED_BORDER_COLOR = 'rgba(0,0,0,0.1)';
/**
 * @export
 * @author Geeook
 * @since 10011
 * @module Checkbox
 * @description 带动效的复选框
 * @property {style} style - 样式
 * @property {bool} disabled - 是否禁用，默认 false
 * @property {bool} checked - 是否勾选，默认 false
 * @property {string} checkedColor - 勾选背景颜色，默认米家绿
 */
export default class Checkbox extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    checkedColor: PropTypes.string
  }
  static defaultProps = {
    style: {},
    disabled: false,
    checked: false,
    checkedColor: Styles.common.MHGreen,
  }
  constructor(props, context) {
    super(props, context);
  }
  backgroundColor = new Animated.Value(0);
  render() {
    const toValue = this.props.checked ? 1 : 0;
    const backgroundColor = this.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: [UNCHECKED_BACKGROUNDCOLOR, this.props.checkedColor]
    });
    const { borderWidth, borderColor, width, height } = this.props.style;
    const size = Math.min(width || SIZE, height || SIZE);
    const borderStyle = this.props.checked
      ? { borderWidth: 0 }
      : {
        borderWidth: borderWidth || 1,
        borderColor: borderColor || UNCHECKED_BORDER_COLOR
      };
    Animated.timing(this.backgroundColor,
      {
        toValue,
        duration: 200
      }
    ).start();
    return (
      <Animated.View style={[
        styles.container,
        this.props.style,
        borderStyle,
        { backgroundColor }
      ]}
      >
        <TouchableWithoutFeedback
          disabled={this.props.disabled}
          onPress={_ => this._onValueChange()}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.props.checked
              ? <Checkable size={size} />
              : null
            }
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
  _onValueChange() {
    if (this.props.onValueChange) {
      this.props.onValueChange(!this.props.checked);
    } else {
      console.warn("Checkbox props 'onValueChange' is required");
    }
  }
}
var styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  }
});