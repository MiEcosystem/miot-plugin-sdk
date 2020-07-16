import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated } from 'react-native';
import { referenceReport } from "../../decorators/reportDecorator";

/** 组件的显示、隐藏效果，下拉淡入和收起淡出。 */
class FadeSlide extends Component {
  static defaultProps = {
    isShown: false,
    childrenHeight: 0
  };
  static propTypes = {
    isShown: PropTypes.bool,
    childrenHeight: PropTypes.number
  };

  constructor(props) {
    super(props);
    referenceReport('FadeSlide');
    const {
      isShown,
      childrenHeight
    } = props;
    const blockOpacity = isShown ? 1 : 0;
    const blockHeight = isShown ? childrenHeight : 0;
    this.state = {
      height: new Animated.Value(blockHeight),
      opacity: new Animated.Value(blockOpacity)
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      isShown,
      childrenHeight
    } = nextProps;

    if (isShown) {
      // 显示
      this.changeStatus(childrenHeight, 1);
    } else {
      // 隐藏
      this.changeStatus(0, 0);
    }
  } // 改变显示状态时，执行动画


  changeStatus = (heightTo, opacityTo) => {
    const {
      height,
      opacity
    } = this.state;
    Animated.parallel([Animated.timing(height, {
      toValue: heightTo,
      duration: 250
    }), Animated.timing(opacity, {
      toValue: opacityTo,
      duration: 250
    })]).start();
  };

  render() {
    const {
      opacity,
      height
    } = this.state;
    return <Animated.View style={{
      opacity,
      height
    }}>
        {this.props.children}
      </Animated.View>;
  }

}

export default FadeSlide;