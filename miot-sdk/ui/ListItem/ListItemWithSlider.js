'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Slider from "react-native-slider";
import { Styles } from '../../resources';
import Separator from "../Separator";
import {FontDefault} from '../../utils/fonts';
const { width } = Dimensions.get('window');
const HEIGHT = 77;
const PADDING = 24;
const THUMB_SIZE = 24;
const THUMB_TOUCH_SIZE = { width: 50, height: 50 };
/**
 * @export public
 * @doc_name 列表控件
 * @doc_index 2
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module ListItemWithSlider
 * @description 带滑动条的列表项
 * @property {string} title - 标题
 * @property {string} subtitle - 副标题，优先级高于自动计算的值
 * @property {object} sliderProps - slider的属性值，默认值 {minimumValue:0,maximumValue:100,step:1,value:50}
 * minimumValue：最小值；maximumValue：最大值；step：步长；value：当前值
 * @property {bool} showWithPercent - 是否以百分比显示当前值，默认值 true
 * @property {string} unit - 当前值的单位。`showWithPercent = true` 将不显示单位
 * @property {object} sliderStyle - slider 的自定义样式
 * 默认值
 * {
 *   minimumTrackTintColor: "#32BAC0", // slider 左侧已填充颜色
 *   maximumTrackTintColor: "rgba(0,0,0,0.15)", // slider 右侧未填充颜色
 *   thumbTintColor: "#32BAC0", // 可移动圆圈的填充颜色
 *   style: {}, // slider 容器的自定义样式
 *   trackStyle: { height: 2, borderRadius: 1 }, // 轨 的自定义样式
 *   thumbStyle: { width: 24, height: 24, borderRadius: 12 }, // 可移动圆圈 的自定义样式
 * }
 * @property {function} onValueChange - 滑动回调函数，返回实时的滑动值
 * @property {function} onSlidingComplete - 滑动结束回调函数
 * @property {bool} disabled - 是否禁用滑动，默认值 false
 * @property {style} containerStyle - 列表项的自定义样式
 * @property {style} titleStyle - 标题的自定义样式
 * @property {style} valueStyle - value的自定义样式
 * @property {bool} showSeparator - 是否显示分割线，默认值 true
 * @property {component} separator - 自定义分割线，不传将显示默认样式的分割线
 */
export default class ListItemWithSlider extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    sliderProps: PropTypes.object,
    showWithPercent: PropTypes.bool,
    unit: PropTypes.string,
    sliderStyle: PropTypes.object,
    onValueChange: PropTypes.func,
    onSlidingComplete: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    valueStyle: PropTypes.object,
    showSeparator: PropTypes.bool,
    separator: PropTypes.element,
  }
  static defaultProps = {
    title: '',
    subtitle: '',
    showWithPercent: true,
    unit: '',
    disabled: false,
    containerStyle: {},
    titleStyle: {},
    valueStyle: {},
    showSeparator: true,
    onSlidingComplete: () => {}
  }
  constructor(props, context) {
    super(props, context);
    this.sliderProps = Object.assign({
      minimumValue: 0,
      maximumValue: 100,
      step: 1,
      value: 50
    }, this.props.sliderProps);
    this.sliderStyle = Object.assign({
      minimumTrackTintColor: Styles.common.MHGreen,
      maximumTrackTintColor: "rgba(0,0,0,0.15)",
      thumbTintColor: Styles.common.MHGreen,
    }, this.props.sliderStyle);
    this.state = {
      value: this.sliderProps.value,
      valueStr: this.format(this.sliderProps.value),
    }
  }
  render() {
    let extraStyle = {
      maxWidth: (width - PADDING * 2) * 0.7,
      fontFamily: FontDefault
    }
    if (this.props.containerStyle.width) {
      extraStyle = {
        maxWidth: (this.props.containerStyle.width - PADDING * 2) * 0.7,
      }
    }
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={[styles.up]}>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={[Styles.common.title, this.props.titleStyle, extraStyle]}
            >
              {this.props.title}
            </Text>
            <View style={styles.separatorCol} />
            <Text style={[styles.value, this.props.valueStyle]}>
              {this.props.subtitle || this.state.valueStr}
            </Text>
          </View>
          <View style={styles.down}>
            <Slider
              disabled={this.props.disabled}
              style={[this.sliderStyle.style]}
              maximumValue={this.sliderProps.maximumValue}
              minimumValue={this.sliderProps.minimumValue}
              step={this.sliderProps.step}
              minimumTrackTintColor={this.sliderStyle.minimumTrackTintColor}
              maximumTrackTintColor={this.sliderStyle.maximumTrackTintColor}
              thumbTintColor={this.sliderStyle.thumbTintColor}
              thumbTouchSize={THUMB_TOUCH_SIZE}
              trackStyle={[styles.trackStyle, this.sliderStyle.trackStyle]}
              thumbStyle={[styles.thumbStyle, this.sliderStyle.thumbStyle]}
              value={this.state.value}
              onValueChange={value => this._onValueChange(value)}
              onSlidingComplete={value => this._onSlidingComplete(value)}
            />
          </View>
        </View>
        {this.renderSeparator()}
      </View>
    );
  }
  renderSeparator() {
    if (!this.props.showSeparator) return null;
    return this.props.separator || <Separator style={{ marginLeft: Styles.common.padding }} />
  }
  format(val) {
    if (this.props.showWithPercent) {
      const { minimumValue: min, maximumValue: max } = this.sliderProps;
      return Math.round((val - min) / (max - min) * 100) + ' %';
    }
    return val + ' ' + this.props.unit;
  }
  // 父组件更新数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.sliderProps === undefined) return;
    if (typeof nextProps.sliderProps.value !== 'number') {
      console.warn('sliderProps.value is not a number');
      return;
    }
    const { value, minimumValue, maximumValue } = nextProps.sliderProps;
    if (minimumValue !== undefined && minimumValue !== this.sliderProps.minimumValue) {
      this.sliderProps.minimumValue = minimumValue;
    }
    if (maximumValue !== undefined && maximumValue !== this.sliderProps.maximumValue) {
      this.sliderProps.maximumValue = maximumValue;
    }
    if (value !== this.state.value) {
      this.setState({
        value,
        valueStr: this.format(value)
      });
    }
  }
  _onValueChange(value) {
    this.setState({
      value,
      valueStr: this.format(value)
    });
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }
  _onSlidingComplete(value) {
    if (this.props.onSlidingComplete) {
      this.props.onSlidingComplete(value);
    }
  }
}
var styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: PADDING,
    height: HEIGHT,
  },
  up: {
    marginTop: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  down: {
    flex: 1,
    justifyContent: 'center',
  },
  separatorCol: {
    height: 14,
    width: 0.5,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  value: {
    fontSize: 12,
    color: Styles.common.MHGreen,
    lineHeight: 16,
    flex: 1,
  },
  trackStyle: {
    height: 2,
    borderRadius: 1
  },
  thumbStyle: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
  }
});