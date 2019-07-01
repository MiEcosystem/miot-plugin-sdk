import PropTypes from 'prop-types';
import React from 'react';
import { Animated, ART, View } from 'react-native';
const {
  Surface,
  Shape,
  Path,
  Transform,
} = ART;
/**
 * @description 两端圆角的矩形
 */
class Rectangle extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    degree: PropTypes.number.isRequired,
  };
  render() {
    const { width, height } = this.props;
    if (width < height) return null;
    const newWidth = width - height;
    const path = Path()
      .moveTo(height / 2 - width / 2, height / 2)
      .arc(0, -height, height / 2)
      .line(newWidth, 0)
      .arc(0, height, height / 2)
      .line(-newWidth, 0)
      .close();
    return (
      <Shape
        transform={new Transform().rotate(this.props.degree)}
        {...this.props}
        d={path}
      />
    );
  }
}
const AnimatedRectangle = Animated.createAnimatedComponent(Rectangle);
const degree = 43; //  旋转角度
/**
 * @author Geeook
 * @description `Checkbox` 勾选动效
 * @property {number} size - 整体尺寸大小，和 `Checkbox` 的尺寸相等，默认 50
 * @property {bool} visible - 是否显示
 */
export default class Checkable extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired
  }
  static defaultProps = {
    size: 50,
    visible: false
  }
  constructor(props, context) {
    console.log('constructor checkable');
    super(props, context);
    this.state = {
      animatedWidth: new Animated.Value(0)
    }
    // 计算各种数值
    const { size } = this.props;
    const containerHeight = size; // 容器高度
    const leftWidth = size * 0.45; // 左侧宽度
    const rightWidth = size - leftWidth; // 右侧宽度
    const intersectionHeight = Math.floor(size * 2 / 3); // 交点坐标
    const leftRectangleWidth = intersectionHeight; // 左矩形的长度
    const rightRectangleWidth = size; // 右矩形的长度
    const rectangleHeight = size / 10; // 矩形的宽度
    this.animationConfig = { // 动画配置参数
      toValue: rightRectangleWidth,
      speed: 9,
      bounciness: 9,
    }
    this.containerHeight = containerHeight;
    this.leftWidth = leftWidth;
    this.rightWidth = rightWidth;
    this.intersectionHeight = intersectionHeight;
    this.leftRectangleWidth = leftRectangleWidth;
    this.rightRectangleWidth = rightRectangleWidth;
    this.rectangleHeight = rectangleHeight;
  }
  render() {
    console.log('render checkable');
    if (!this.props.visible) {
      this.preVisible = false;
      return <View />;
    }
    if (!this.preVisible) {
      this.state.animatedWidth.setValue(0);
      Animated.spring(this.state.animatedWidth, this.animationConfig).start();
    }
    this.preVisible = true;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Surface
          width={this.leftWidth}
          height={this.containerHeight}
          style={{ backgroundColor: 'transparent' }}
        >
          <AnimatedRectangle
            degree={degree}
            fill={'#fff'}
            width={this.leftRectangleWidth}
            height={this.rectangleHeight}
            y={this.intersectionHeight}
            x={this.leftWidth}
          />
        </Surface>
        <Surface
          width={this.rightWidth}
          height={this.containerHeight}
          style={{ backgroundColor: 'transparent', marginLeft: -0.5 }}
        >
          <AnimatedRectangle
            degree={-degree}
            fill={'#fff'}
            width={this.state.animatedWidth}
            height={this.rectangleHeight}
            y={this.intersectionHeight}
            x={0}
          />
        </Surface>
      </View>
    );
  }
}