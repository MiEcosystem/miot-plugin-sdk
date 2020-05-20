'use strict';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated } from 'react-native';
/**
 * @export
 * @author Li Yue
 * @since 10030
 * @module Radio
 * @description 组件的显示、隐藏效果，下拉淡入和收起淡出。
 * @property {bool} isShown - 组件的显示状态，默认值 false
 * @property {number} childrenHeight - 子组件的总高度，默认值0
 */
export default class FadeSlide extends Component {
  constructor(props) {
    super(props);
    let { isShown, childrenHeight } = props;
    let blockOpacity = isShown ? 1 : 0;
    let blockHeight = isShown ? childrenHeight : 0;
    this.state = {
      height: new Animated.Value(blockHeight),
      opacity: new Animated.Value(blockOpacity)
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let { isShown, childrenHeight } = nextProps;
    if (isShown) {
      // 显示
      this.changeStatus(childrenHeight, 1);
    } else {
      // 隐藏
      this.changeStatus(0, 0);
    }
  }
    // 改变显示状态时，执行动画
    changeStatus = (heightTo, opacityTo) => {
      let { height, opacity } = this.state;
      Animated.parallel([
        Animated.timing(
          height,
          {
            toValue: heightTo,
            duration: 250
          }
        ),
        Animated.timing(
          opacity,
          {
            toValue: opacityTo,
            duration: 250
          }
        )
      ]).start();
    }
    render() {
      let { opacity, height } = this.state;
      return (
        <Animated.View
          style={{ opacity, height }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
}
FadeSlide.defaultProps = {
  isShown: false,
  childrenHeight: 0
};
FadeSlide.propTypes = {
  isShown: PropTypes.bool,
  childrenHeight: PropTypes.number
};