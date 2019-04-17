'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Styles } from '../resources';
const CIRCLE_SIZE = 18;
const OFF_COLOR = '#f0f0f0';
const BORDER_COLOR = 'rgba(0,0,0,0.1)';
const BACK_WIDTH = 44;
const BACK_HEIGHT = 24;
const MARGIN = 3;
const BORDER_WIDTH = Platform.select({ android: 1, ios: 0.5 });
/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 21
 * @author Geeook
 * @since 20190403
 * @module Switch
 * @description Switch for Android and iOS，但是是高度定制的米家绿哈哈哈
 * @property {bool} value - 开关状态，默认值 false
 * @property {bool} disabled - 是否禁用，默认值 false
 * @property {function} onValueChange - 切换开关的回调函数
 */
export default class Switch extends React.Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  }
  static defaultProps = {
    value: false,
    disabled: false,
  }
  offsetX = new Animated.Value(0);
  render() {
    const toValue = this.props.value ? BACK_WIDTH - CIRCLE_SIZE - 2.5 * MARGIN : 0;
    const backgroundColor = this.props.value ? Styles.common.MHGreen : OFF_COLOR;
    const opacity = this.props.disabled ? 0.5 : 1;
    Animated.spring(this.offsetX,
      {
        toValue,
        duration: 200,
      }
    ).start();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.back, { backgroundColor, opacity }]}
          disabled={this.props.disabled}
          activeOpacity={0.8}
          onPress={_ => this._onValueChange()}
        >
          <Animated.View
            style={[styles.circle, { transform: [{ translateX: this.offsetX }] }]}
          />
        </TouchableOpacity>
      </View>
    );
  }
  _onValueChange() {
    if (this.props.onValueChange) {
      this.props.onValueChange(!this.props.value);
    } else {
      console.warn("Switch props 'onValueChange' is required");
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    justifyContent: 'center',
    width: BACK_WIDTH,
    height: BACK_HEIGHT,
    borderRadius: BACK_HEIGHT / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
  },
  circle: {
    margin: MARGIN,
    position: 'absolute',
    borderWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    backgroundColor: '#fff',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  }
});