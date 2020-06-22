import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Dimensions, PanResponder, Platform, StyleSheet, Text, View } from 'react-native';
import Block from "./Block";
import Clickable from './Clickable';
import { AccessibilityPropTypes, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
const { width: screenWidth } = Dimensions.get('window');
const DEFAULT_SIZE = 50;
const DEFAULT_MARGIN = 12;
const BIGGER_SIZE = 1.35;
const dragStartAnimationConfig = {
  toValue: BIGGER_SIZE,
  duration: 50,
  useNativeDriver: true
};
const releaseAnimationConfig = {
  toValue: 1,
  duration: Platform.select({ ios: 160, android: 100 }),
  useNativeDriver: true
};
/**
 * @export
 * @author Geeook
 * @since 10011
 * @module DragGear
 * @description 档位控件，拖拽选择
 * （❗️注意：考虑到性能优化，android 系统在拖拽和移动动效中不会实时更新中间的文字）
 * @property {array<string>|array<number>} options - 档位可选项，以字符串数组表示，必填
 * @property {number} margin - 档位选项之间的间距，默认 12, 示意图 |12🛑12⭕️12|
 * @property {number} maxWidth
 * 容器宽度最大值，不传则默认屏幕宽度。
 * 如果所有档位的宽度 + 间距占据的宽度 <= maxWidth，则取实际宽度；
 * 否则容器宽度取 maxWidth，各个档位的宽度和间距自适应减小。
 * @property {style} containerStyle - 容器样式，设置宽高无效
 * @property {style} normalStyle - 普通档位样式，如果没有设置宽高，则默认宽高为 50
 * @property {style} textStyle - 档位文字的样式
 * @property {string} selectColor - 被选择档位的背景色
 * @property {number} selectIndex - 被选择档位的数组下标
 * @property {bool} allowFontScaling - 10040新增 字体大小是否随系统大小变化而变化, 默认值为true
 * @property {number} numberOfLines - 10040新增 文字最多显示的行数
 * @property {function} onSelect - 选择某档位后的回调函数
 */
export default class DragGear extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    containerStyle: PropTypes.object,
    normalStyle: PropTypes.object,
    textStyle: PropTypes.object,
    margin: PropTypes.number,
    maxWidth: PropTypes.number,
    selectColor: PropTypes.string,
    selectIndex: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    allowFontScaling: PropTypes.bool,
    numberOfLines: PropTypes.number,
    accessible: AccessibilityPropTypes.accessible,
    clickAccessibilityLables: PropTypes.arrayOf(AccessibilityPropTypes.accessibilityLabel),
    clickAccessibilityHints: PropTypes.arrayOf(AccessibilityPropTypes.accessibilityHint)
  }
  static defaultProps = {
    options: [],
    normalStyle: {},
    margin: DEFAULT_MARGIN,
    maxWidth: screenWidth,
    selectColor: '#f0ac3d',
    selectIndex: 0,
    allowFontScaling: true,
    clickAccessibilityLables: [],
    clickAccessibilityHints: []
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('DragGear');
    if (this.props.options.length === 0) {
      this.showNothing = true;
      return;
    }
    // 计算容器实际宽度，选项实际宽度，实际间距
    const { optionWidth, margin, containerWidth } = this.getCorrectLayout();
    this.optionWidth = optionWidth;
    this.margin = margin;
    this.containerWidth = containerWidth;
    console.log(`选项宽度 ${ optionWidth } 间距 ${ margin } 总体宽度 ${ containerWidth }`);
    // 也不能太拥挤吧
    if (this.optionWidth < 20) {
      this.showNothing = true;
      if (__DEV__ && console.warn) {
        console.warn('在目前maxWidth下显示不了这么多选项，请重新规划');
      }
      return;
    }
    this.state = {
      pan: new Animated.Value(0),
      moveX: new Animated.Value(0),
      scale: new Animated.Value(1),
      selectIndex: this.props.selectIndex,
      currentOption: this.props.options[this.props.selectIndex],
      dragToValueMin: 0,
      dragToValueMax: 0
    };
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
  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.showNothing) return;
    const { selectIndex } = newProps;
    if (selectIndex !== this.props.selectIndex) {
      if (selectIndex < 0 || selectIndex >= this.props.options.length) return;
      this.onPress(selectIndex); // 动画更新
      // this.animated2TargetIndex(newProps.selectIndex); // 直接更新
    }
  }
  UNSAFE_componentWillMount() {
    // 拖拽变化值监听
    this.state.pan.addListener((e) => {
      // 拖拽的时候，如果在这里更新文字，偶尔不准，并且更新不及时
      // 但是点击应该可以
      if (this.pressToChoose && Platform.OS === 'ios') {
        const moveX = this.currentCoord + e.value;
        const index = this.getClosetIndex(moveX);
        this.setState({ currentOption: this.props.options[index] });
      }
    });
    // 拖拽手势坐标监听，为了更新中间的文字
    if (Platform.OS === 'ios') {
      this.state.moveX.addListener((e) => {
        const index = this.getClosetIndex(e.value);
        this.setState({ currentOption: this.props.options[index] });
      });
    }
  }
  /**
   * @description 获取距离拖拽元素最近的选项下标
   * 根据释放时的绝对坐标和各个选项的绝对坐标距离做对比
   */
  getClosetIndex(moveX) {
    const adjustCoord = moveX - this.offset; // 拖拽过程中Block的中心点坐标
    const diffs = this.coords.map((coord) => Math.abs(coord - adjustCoord));
    return diffs.indexOf(Math.min(...diffs));
  }
  /**
   * @description 手势开始回调
   */
  _onPanResponderGrant(e) {
    // 放大动画
    Animated.timing(this.state.scale, dragStartAnimationConfig).start();
    // 为了准确确定释放位置，需要在起手的时候，计算出手势触摸点和中心点的偏差
    const { pageX } = e.nativeEvent;
    this.offset = pageX - this.currentCoord;
    this.pressToChoose = false;
    console.log('⬇️⬇️⬇️⬇️⬇️⬇️⬇️拖拽开始⬇️⬇️⬇️⬇️⬇️⬇️⬇️');
    console.log(`被选项中心坐标 ${ this.currentCoord }`);
    console.log(`触摸点坐标 ${ pageX }`);
  }
  /**
   * @description 手势释放回调
   */
  _onPanResponderRelease(e, gesture) {
    const index = this.getClosetIndex(gesture.moveX);
    this.animated2TargetIndex(index);
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  }
  /**
   * @description 以动画效果移动到目标选项，不管是释放还是点击
   */
  animated2TargetIndex(index) {
    console.log(`移动到第${ index }个`);
    this.offset = 0;
    // 重置 selectIndex
    this.setState({ selectIndex: index }, () => {
      this.getDragRange(() => {
        // 这行十分重要！！！
        // 在计算出新的可拖拽范围之后，Block position 重新定位在新的 -min
        // 此时pan.setValue(0)，直接将 Block 吸附在了新的位置上
        this.state.pan.setValue(0);
        Animated.timing(this.state.scale, releaseAnimationConfig).start(() => {
          if (Platform.OS == 'android') {
            this.setState({
              currentOption: this.props.options[index]
            });
          }
        });
        console.log('⬆️⬆️⬆️⬆️⬆️⬆️⬆️结束⬆️⬆️⬆️⬆️⬆️⬆️⬆️');
      });
    });
  }
  /**
   * @description 根据选项的宽度、间距和 maxWidth ，计算容器实际宽度，选项实际宽度，实际间距
   * @returns {{optionWidth, margin, containerWidth}}
   */
  getCorrectLayout() {
    const optionWidth = this.props.normalStyle.width || DEFAULT_SIZE; // 选项宽度
    const { margin, maxWidth } = this.props; // 间距、容器最大宽度
    const length = this.props.options.length; // 选项个数
    this.length = length;
    const containerWidth = (optionWidth + margin) * length + margin; // 容器宽度
    // 如果宽度不溢出，则取原值
    if (containerWidth <= maxWidth) return { optionWidth, margin, containerWidth };
    // 如果宽度溢出，则按照 `optionWidth = 2 * margin` 策略重新计算
    const newOptionWidth = Math.floor(maxWidth / (length + (length + 1) * 0.5));
    const newMargin = newOptionWidth / 2;
    const newContainerWidth = (3 * length + 1) * newMargin;
    return {
      optionWidth: newOptionWidth,
      margin: newMargin,
      containerWidth: newContainerWidth
    };
  }
  /**
   * @description 计算整个容器的大小和在屏幕上的位置，从而确定每个选项的圆心坐标
   */
  calculateCoord() {
    this._container.measure((x, y, w, h, px, py) => {
      console.log(`容器起始坐标 ${ x }，宽度 ${ w }`);
      let startCoord = x - this.optionWidth / 2;
      this.coords = [];
      for (let i = 0; i < this.props.options.length; i++) {
        this.coords[i] = startCoord + (this.optionWidth + this.margin) * (i + 1);
      }
      console.log('measure', x, y, w, h, px, py);
      console.log('各选项中心坐标', this.coords);
      this.getDragRange();
    });
  }
  /**
   * @description 计算可拖拽的范围，以及当前被选项到其余选项的拖拽距离，每次释放之后都需要刷新
   */
  getDragRange(callback) {
    this.currentCoord = this.coords[this.state.selectIndex];
    this.dragToValueArray = this.coords.map((coord) => coord - this.currentCoord);
    this.setState({
      dragToValueMin: this.dragToValueArray[0] || 0,
      dragToValueMax: this.dragToValueArray[this.length - 1] || 0
    }, () => {
      callback && callback();
    });
    console.log('被选项中心坐标', this.currentCoord);
    console.log('被选项到其余选项的距离', this.dragToValueArray);
  }
  /**
   * @description 所有的固定选项
   */
  renderOptions() {
    const style = StyleSheet.flatten([
      this.props.normalStyle,
      {
        width: this.optionWidth,
        height: this.optionWidth,
        borderRadius: this.optionWidth / 2,
        borderWidth: 0
      }
    ]);
    const { selectIndex } = this.state;
    return this.props.options.map((option, index) => {
      return (
        <Clickable
          key={option}
          allowFontScaling={this.props.allowFontScaling}
          numberOfLines={this.props.numberOfLines}
          onPress={() => this.onPress(index)}
          text={option}
          select={selectIndex === index}
          style={style}
          textStyle={this.props.textStyle}
          {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityLabel: this.props.clickAccessibilityLables[index] || option,
            accessibilityHint: this.props.clickAccessibilityHints[index]
          })}
        />
      );
    });
  }
  /**
   * @description 可拖拽元素
   */
  renderDraggable() {
    const { dragToValueMin: min, dragToValueMax: max } = this.state;
    // 在没有找到自我定位的时候，要在舞台后面低调
    if (min === undefined) return null;
    // 可拖拽元素初始绝对定位
    const position = {
      position: 'absolute',
      left: -min
    };
    // 显示区域
    const innerCircle = {
      width: this.optionWidth,
      height: this.optionWidth,
      borderRadius: this.optionWidth / 2,
      backgroundColor: this.props.selectColor,
      alignItems: 'center',
      justifyContent: 'center'
    };
    // 手势响应区域
    const touchArea = {
      width: this.optionWidth + this.margin * 2,
      height: this.optionWidth * BIGGER_SIZE,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center'
    };
    // 动效
    const panStyle = {
      transform: [
        {
          translateX: this.state.pan.interpolate({
            inputRange: [min - 1, min, max, max + 1],
            outputRange: [min, min, max, max]
          })
        },
        {
          scale: this.state.scale
        }
      ]
    };
    return (
      <Block
        panHandlers={this.panResponder.panHandlers}
        style={[position, panStyle]}
      >
        <View style={touchArea}>
          <View style={innerCircle}>
            <Text
              style={[this.props.textStyle, { color: '#fff' }]}
              {...getAccessibilityConfig({
                accessible: false
              })}
              allowFontScaling={this.props.allowFontScaling}
              numberOfLines={this.props.numberOfLines}
            >
              {this.state.currentOption}
            </Text>
          </View>
        </View>
      </Block>
    );
  }
  render() {
    if (this.showNothing) return null;
    const container = {
      width: this.containerWidth,
      height: this.optionWidth * BIGGER_SIZE
    };
    return (
      <View
        onLayout={() => this.calculateCoord()}
        ref={(container) => this._container = container}
        style={[this.props.containerStyle, styles.container, container]}>
        {this.renderOptions()}
        {this.renderDraggable()}
      </View>
    );
  }
  onPress(index) {
    console.log('⬇️⬇️⬇️⬇️⬇️⬇️⬇️点击开始⬇️⬇️⬇️⬇️⬇️⬇️⬇️');
    this.pressToChoose = true;
    Animated.sequence(
      [
        Animated.timing(this.state.scale, dragStartAnimationConfig),
        Animated.timing(this.state.pan,
          {
            toValue: this.dragToValueArray[index],
            duration: 200,
            useNativeDriver: true
          }
        )
      ]
    ).start(() => this.animated2TargetIndex(index));
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});