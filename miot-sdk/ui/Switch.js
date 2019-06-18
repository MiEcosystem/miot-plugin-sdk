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
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
    // 根据style的宽度计算出滚球的大小和间距
    const { width, height } = this.props.style;
    const backWidth = width || BACK_WIDTH;
    const backHeight = height || BACK_HEIGHT;
    const margin = (backHeight / ratio) < minMargin
      ? minMargin
      : Math.round(backHeight / ratio);
    const circleSize = backHeight - 2 * margin;
    // 滚球滚动最大距离
    this.offsetXMax = backWidth - backHeight;
    // 容器实际样式
    this.backStyle = {
      width: backWidth,
      height: backHeight,
      borderRadius: backHeight / 2,
    }
    //滚球实际样式
    this.circleStyle = {
      margin,
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.state.value) {
      this.setState({ value: newProps.value }, this.animated);
    }
  }
  render() {
    const backgroundColor = this.state.value ? this.props.onTintColor : this.props.tintColor;
    const opacity = this.props.disabled ? 0.5 : 1;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.back, this.backStyle, { backgroundColor, opacity }]}
          disabled={this.props.disabled}
          activeOpacity={0.8}
          onPress={_ => this._onValueChange()}
        >
          <Animated.View
            style={[styles.circle, this.circleStyle, { transform: [{ translateX: this.offsetX }] }]}
          />
        </TouchableOpacity>
      </View>
    );
  }
  animated() {
    const toValue = this.state.value ? this.offsetXMax : 0;
    Animated.spring(this.offsetX,
      {
        toValue,
        bounciness: 9,
        speed: 9,
      }
    ).start();
  }
  _onValueChange() {
    const value = !this.state.value;
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
    this.setState({ value }, this.animated);
  }
  componentDidMount() {
    this.animated();
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