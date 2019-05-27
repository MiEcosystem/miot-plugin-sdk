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
    height: PropTypes.number.isRequired
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
    return <Shape {...this.props} d={path} />;
  }
}
const AnimatedRectangle = Animated.createAnimatedComponent(Rectangle);
/**
 * @author Geeook
 * @description `Checkbox` 勾选动效
 * @property {number} size - 整体尺寸大小，和 `Checkbox` 的尺寸相等，默认 50
 */
export default class Checkable extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired
  }
  static defaultProps = {
    size: 50
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      height: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
    }
  }
  render() {
    // 计算各种数值
    const { size } = this.props;
    const containerHeight = size; // 容器高度
    const leftWidth = size * 0.45; // 左侧宽度
    const rightWidth = size - leftWidth; // 右侧宽度
    const intersectionHeight = Math.floor(size * 2 / 3); // 交点坐标
    const leftRectangleWidth = intersectionHeight; // 左矩形的长度
    const rightRectangleWidth = size; // 右矩形的长度
    const rectangleHeight = size / 10; // 矩形的宽度
    const degree = 43; //  旋转角度
    const animationConfig = { // 动画配置参数
      toValue: rightRectangleWidth,
      speed: 9,
      bounciness: 9,
    }
    // Animated.parallel(
    //   [
    //     Animated.timing(this.state.opacity,
    //       {
    //         toValue: 1,
    //         duration: 200,
    //       }
    //     ),
    //     Animated.timing(this.state.scale,
    //       {
    //         toValue: 1,
    //         duration: 200,
    //       }
    //     )
    //   ]
    // ).start(_ => {
    Animated.spring(this.state.height, animationConfig).start();
    // });
    return (
      <View style={{ flexDirection: 'row' }}>
        <Surface
          width={leftWidth}
          height={containerHeight}
          style={{ backgroundColor: 'transparent' }}
        >
          <AnimatedRectangle
            // scale={this.state.scale}
            // opacity={this.state.opacity}
            transform={new Transform().rotate(degree).translate()}
            fill={'#fff'}
            width={leftRectangleWidth}
            height={rectangleHeight}
            y={intersectionHeight}
            x={leftWidth}
          />
        </Surface>
        <Surface
          width={rightWidth}
          height={containerHeight}
          style={{ backgroundColor: 'transparent', marginLeft: -0.5 }}
        >
          <AnimatedRectangle
            transform={new Transform().rotate(-degree)}
            fill={'#fff'}
            width={this.state.height}
            height={rectangleHeight}
            y={intersectionHeight}
            x={0}
          />
        </Surface>
      </View>
    );
  }
}