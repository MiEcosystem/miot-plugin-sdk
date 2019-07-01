import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native';
import Styles from '../../resources/Styles';
import Block from "./Block";
/**
 * @description 容器和滑块的圆角类型
 * @enum {string}
 */
const TYPE = {
  /**
  * 圆形 ⭕️
  */
  CIRCLE: 'circle',
  /**
   * 方形 ⬜️
   */
  RECTANGLE: 'rectangle'
}
Object.freeze(TYPE);
const { width: screenWidth } = Dimensions.get('window');
const DEFAULT_SIZE = 40; // 滑块默认大小
const MIN_MARGIN = 5; // 滑块和容器的最小间距
const MARGIN = 7.5; // 滑块和容器的默认间距
const MAX_MARGIN = 10; // 滑块和容器的最大间距
const DEFAULT_HEIGHT = DEFAULT_SIZE + MARGIN * 2; // 容器默认高度
const DEFAULT_BLOCK_COLOR = '#fff'; // 滑块默认颜色
/**
 * @export
 * @author Geeook
 * @since 10022
 * @module SlideGear
 * @description 档位控件，滑动选择
 * @property {TYPE} type - 容器和滑块的圆角类型
 * @property {array<string>} options - 档位可选项，以字符串数组表示，必填
 * @property {bool} showEndText - 是否显示两端的文字，即`options`的第一个和最后一个，默认`true`
 * @property {style} containerStyle - 容器样式，设置背景颜色无效
 * @property {style} blockStyle - 滑块样式，尺寸始终比容器小
 * @property {string} minimumTrackTintColor - 滑块左侧填充颜色
 * @property {string} leftTextColor - 最左侧文字颜色，`showEndText = true`时有效
 * @property {string} maximumTrackTintColor - 滑块右侧填充颜色
 * @property {string} rightTextColor - 最右侧文字颜色，`showEndText = true`时有效
 * @property {number} value - 被选择档位的数组下标, `0<=value<=options.length -1`
 * @property {function} onValueChange - 滑动时的回调函数
 * @property {function} onSlidingComplete - 滑动结束的回调函数
 */
export default class SlideGear extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf([TYPE.CIRCLE, TYPE.RECTANGLE]),
    options: PropTypes.array.isRequired,
    showEndText: PropTypes.bool,
    containerStyle: PropTypes.object,
    blockStyle: PropTypes.object,
    minimumTrackTintColor: PropTypes.string,
    leftTextColor: PropTypes.string,
    maximumTrackTintColor: PropTypes.string,
    rightTextColor: PropTypes.string,
    value: PropTypes.number,
    onValueChange: PropTypes.func,
    onSlidingComplete: PropTypes.func.isRequired,
  }
  static defaultProps = {
    type: TYPE.CIRCLE,
    options: [],
    showEndText: true,
    containerStyle: {},
    blockStyle: {},
    minimumTrackTintColor: Styles.common.MHGreen,
    leftTextColor: '#eee',
    maximumTrackTintColor: '#dfe2e3',
    rightTextColor: '#999',
    value: 0,
  }
  /**
   * @description 容器和滑块的圆角类型
   * @enum {string}
   */
  static TYPE = TYPE
  constructor(props, context) {
    super(props, context);
    if (this.props.options.length === 0) {
      this.showNothing = true;
      return;
    }
    const { margin, blockWidth, blockHeight, containerWidth, containerHeight } = this.getCorrectLayout();
    this.margin = margin;
    this.blockWidth = blockWidth;
    this.blockHeight = blockHeight;
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.length = this.props.options.length;
    console.log(
      `滑块高度: ${blockHeight}
    滑块宽度: ${blockWidth}
    滑块间距: ${margin}
    容器高度: ${containerHeight}
    容器宽度: ${containerWidth}`);
    this.state = {
      pan: new Animated.Value(0),
      moveX: new Animated.Value(0),
      value: this.props.value,
      dragToValueMin: 0,
      dragToValueMax: 0,
    };
    this.translateX = 0; // 记录拖拽距离
    this.offset = 0; // 手势触摸点和中心左边偏差值
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onShouldBlockNativeResponder: () => false,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: this._onPanResponderGrant.bind(this),
      onPanResponderMove: Animated.event([null, { dx: this.state.pan, moveX: this.state.moveX }]),
      onPanResponderRelease: this._onPanResponderRelease.bind(this)
    });
  }
  componentWillReceiveProps(newProps) {
    if (this.showNothing) return;
    const { value } = newProps;
    if (value !== this.props.value) {
      if (value < 0 || value >= this.length) return;
      this.currentCoord = this.coords[value];
      this.getDragRange();
    }
  }
  componentWillMount() {
    // 拖拽变化值监听
    this.state.pan.addListener(e => {
      const { dragToValueMin: min, dragToValueMax: max } = this.state;
      if (e.value >= min && e.value <= max) {
        this.translateX = e.value;
      }
      else {
        this.translateX = e.value < min ? min : max;
      }
      this._background.setNativeProps({
        width: this.translateX + this.margin * 2 + this.blockWidth - this.state.dragToValueMin
      })
    });
    // 拖拽手势坐标监听
    this.state.moveX.addListener(e => {
      const index = this.getClosetIndex(e.value);
      if (this.props.onValueChange) {
        this.props.onValueChange(index);
      }
    });
  }
  /**
   * @description 获取距离拖拽元素最近的选项下标
   * 根据释放时的绝对坐标和各个选项的绝对坐标距离做对比
   */
  getClosetIndex(moveX) {
    const adjustCoord = moveX - this.offset; // 拖拽过程中Block的中心点坐标
    const diffs = this.coords.map(coord => Math.abs(coord - adjustCoord));
    return diffs.indexOf(Math.min(...diffs));
  }
  /**
   * @description 手势开始回调
   */
  _onPanResponderGrant(e, gesture) {
    // 每次拖拽手势开始时，需要重置
    this.state.pan.setOffset(this.translateX);
    this.state.pan.setValue(0);
    // 为了准确确定释放位置，需要在起手的时候，计算出手势触摸点和中心点的偏差
    const { pageX } = e.nativeEvent;
    this.offset = pageX - this.currentCoord;
    console.log('⬇️⬇️⬇️⬇️⬇️⬇️⬇️滑动开始⬇️⬇️⬇️⬇️⬇️⬇️⬇️');
    console.log(`滑块中心坐标 ${this.currentCoord}`);
    console.log(`触摸点坐标 ${pageX}`);
    console.log(`this.translateX ${this.translateX}`);
  }
  /**
   * @description 手势释放回调
   */
  _onPanResponderRelease(e, gesture) {
    const coord = gesture.moveX - this.offset;
    const min = this.coords[0];
    const max = this.coords[this.length - 1];
    if (coord >= min && coord <= max) {
      this.currentCoord = coord;
    }
    else {
      this.currentCoord = coord < min ? min : max;
    }
    const index = this.getClosetIndex(gesture.moveX);
    this.state.value = index;
    if (this.props.onSlidingComplete) {
      this.props.onSlidingComplete(index);
    }
    console.log(`手势结束坐标: ${coord}\n滑块最终坐标: ${this.currentCoord}\n离滑块最近的选项下标: ${index}`);
    this.offset = 0;
    console.log('⬆️⬆️⬆️⬆️⬆️⬆️⬆️滑动结束⬆️⬆️⬆️⬆️⬆️⬆️⬆️');
  }
  /**
   * @description 根据选项的宽度、间距和 maxWidth ，计算容器实际宽度，选项实际宽度，实际间距
   * @returns {{margin,blockWidth, blockHeight,containerHeight, containerWidth}}
   */
  getCorrectLayout() {
    const containerHeight = this.props.containerStyle.height || DEFAULT_HEIGHT; // 容器高度
    const containerWidth = this.props.containerStyle.width || screenWidth; // 容器宽度
    const blockWidth = this.props.blockStyle.width || DEFAULT_SIZE; // 滑块宽度
    // 重新计算
    let margin = ~~(containerHeight / 10);
    margin = margin > MAX_MARGIN ? MAX_MARGIN : margin;
    margin = margin < MIN_MARGIN ? MIN_MARGIN : margin;
    const blockHeight = containerHeight - margin * 2;
    return {
      margin,
      blockWidth: this.props.type === TYPE.CIRCLE ? blockHeight : blockWidth,
      blockHeight,
      containerWidth,
      containerHeight,
    };
  }
  /**
   * @description 计算整个容器的大小和在屏幕上的位置，从而确定每个选项的圆心坐标
   */
  calculateCoord() {
    this._container.measure((x, y, w, h, px, py) => {
      console.log(`容器起始坐标: ${x}\n宽度: ${w}`);
      const offset = this.margin * 2 + this.blockWidth;
      const startCoord = x + offset / 2;
      const d = (w - offset) / (this.length - 1);
      this.coords = this.props.options.map((v, i) => startCoord + d * i);
      console.log('各选项中心坐标', this.coords);
      this.currentCoord = this.coords[this.state.value];
      this.getDragRange();
    })
  }
  /**
   * @description 计算可拖拽的范围
   */
  getDragRange(callback) {
    this.setState({
      dragToValueMin: this.coords[0] - this.currentCoord || 0,
      dragToValueMax: this.coords[this.length - 1] - this.currentCoord || 0,
    }, _ => {
      callback && callback();
    });
    console.log('滑块中心坐标', this.currentCoord);
    console.log(`可滑动范围: ${this.state.dragToValueMin} ~ ${this.state.dragToValueMax}`);
  }
  /**
   * @description 滑块
   */
  renderDraggable() {
    const { dragToValueMin: min, dragToValueMax: max } = this.state;
    // 在没有找到自我定位的时候，要在舞台后面低调
    if (min === undefined) return null;
    // 可拖拽元素初始绝对定位
    const position = {
      position: 'absolute',
      left: -min,
    }
    // 显示区域
    const innerCircle = this.props.type === TYPE.CIRCLE
      ? {
        width: this.blockHeight,
        height: this.blockHeight,
        borderRadius: this.blockHeight / 2,
      }
      : {
        width: this.blockWidth,
        height: this.blockHeight,
        borderRadius: 0,
      }
    // 手势响应区域
    const touchArea = {
      width: this.blockWidth + this.margin * 2,
      height: this.containerHeight,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    }
    // 动效
    const panStyle = {
      transform: [
        {
          translateX: this.state.pan.interpolate({
            inputRange: [min - 1, min, max, max + 1],
            outputRange: [min, min, max, max],
          })
        }
      ]
    }
    return (
      <Block
        panHandlers={this.panResponder.panHandlers}
        style={[position, panStyle]}
      >
        <View style={touchArea}>
          <View
            style={[
              { backgroundColor: DEFAULT_BLOCK_COLOR },
              this.props.blockStyle,
              innerCircle
            ]}
          />
        </View>
      </Block>
    )
  }
  /**
   * 滑块左侧背景
   */
  renderBackground() {
    return (
      <View
        ref={background => this._background = background}
        style={{
          position: 'absolute',
          width: this.margin * 2 + this.blockWidth - (this.state.dragToValueMin || 0),
          height: this.containerHeight,
          borderRadius: this.props.type === TYPE.CIRCLE ? this.containerHeight / 2 : 0,
          backgroundColor: this.props.minimumTrackTintColor
        }}
      >
        {this.props.showEndText
          ? <View
            style={[
              styles.textContainer,
              {
                margin: this.margin,
                alignSelf: 'flex-start',
                width: this.blockWidth + this.margin * 2,
                height: this.blockHeight,
              }
            ]}
          >
            <Text style={[styles.text, { color: this.props.leftTextColor }]}>
              {this.props.options[0]}
            </Text>
          </View>
          : null
        }
      </View>
    )
  }
  /**
   * 最右侧文字
   */
  renderRightText() {
    if (!this.props.showEndText) return null;
    return (
      <View
        style={[
          styles.textContainer,
          {
            margin: this.margin,
            alignSelf: 'flex-end',
            width: this.blockWidth + this.margin * 2,
            height: this.blockHeight,
          }
        ]}
      >
        <Text style={[styles.text, { color: this.props.rightTextColor }]}>
          {this.props.options[this.length - 1]}
        </Text>
      </View>
    )
  }
  render() {
    if (this.showNothing) return null;
    const containerStyle = {
      width: this.containerWidth,
      height: this.containerHeight,
      borderRadius: this.props.type === TYPE.CIRCLE ? this.containerHeight / 2 : 0,
      backgroundColor: this.props.maximumTrackTintColor
    };
    return (
      <View
        onLayout={_ => this.calculateCoord()}
        ref={container => this._container = container}
        style={[
          this.props.containerStyle,
          containerStyle
        ]}
      >
        {this.renderRightText()}
        {this.renderBackground()}
        {this.renderDraggable()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15
  },
})