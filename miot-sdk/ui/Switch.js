import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Styles } from '../resources';
const OFF_COLOR = '#f0f0f0';
const BORDER_COLOR = 'rgba(0,0,0,0.1)';
const BACK_WIDTH = 44; // 默认宽度
const BACK_HEIGHT = 24; // 默认高度
const BORDER_WIDTH = StyleSheet.hairlineWidth;
const ratio = 6.5; // 容器高度和滚球尺寸比例
const minMargin = 2.5 // 容器和滚球之间的最小间距
/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 23
 * @author Geeook
 * @since
 * @module Switch
 * @description Switch for Android and iOS
 * @property {bool} value - 开关状态，默认值 false
 * @property {style} style - 开关样式，仅支持宽高
 * @property {string} onTintColor - 打开时的背景颜色
 * @property {string} tintColor - 关闭时的背景颜色
 * @property {bool} disabled - 是否禁用，默认值 false
 * @property {function} onValueChange - 切换开关的回调函数
 */
export default class Switch extends React.Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    style: PropTypes.object,
    onTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  }
  static defaultProps = {
    value: false,
    style: {},
    onTintColor: Styles.common.MHGreen,
    tintColor: OFF_COLOR,
    disabled: false,
  }
  offsetX = new Animated.Value(0);
  render() {
    // 根据style的宽度计算出滚球的大小和间距
    const { width, height } = this.props.style;
    const backWidth = width || BACK_WIDTH;
    const backHeight = height || BACK_HEIGHT;
    const margin = (backHeight / ratio) < minMargin
      ? minMargin
      : Math.round(backHeight / ratio);
    const circleSize = backHeight - 2 * margin;
    // 容器实际样式
    const backStyle = {
      width: backWidth,
      height: backHeight,
      borderRadius: backHeight / 2,
    }
    //滚球实际样式
    const circleStyle = {
      margin,
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
    }
    // 开关切换时需要变化的值
    const toValue = this.props.value ? backWidth - backHeight : 0;
    const backgroundColor = this.props.value ? this.props.onTintColor : this.props.tintColor;
    const opacity = this.props.disabled ? 0.5 : 1;
    Animated.spring(this.offsetX,
      {
        toValue,
        bounciness: 9,
        speed: 9,
      }
    ).start();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.back, backStyle, { backgroundColor, opacity }]}
          disabled={this.props.disabled}
          activeOpacity={0.8}
          onPress={_ => this._onValueChange()}
        >
          <Animated.View
            style={[styles.circle, circleStyle, { transform: [{ translateX: this.offsetX }] }]}
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
    borderWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
  },
  circle: {
    position: 'absolute',
    borderWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    backgroundColor: '#fff',
  }
});