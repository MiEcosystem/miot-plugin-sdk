// @ts-nocheck

/* eslint-disable  */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
import { ConfigContext } from "../configProvider";
import DynamicColor from "../../styles/DynamicColor";
/**
 * @export
 * @author Li Yue
 * @since 10011
 * @module Radio
 * @description Radio for Android and iOS.
 * @property {bool} isChecked - 按钮的选中状态，默认值 false
 * @property {object} bigCircleStyle - 大圆的尺寸、圆角半径、边宽，默认值 {}
 * @property {object} checkedBigCircleStyle - 大圆在选中和非选中状态下的边框颜色、背景色，默认值 非选中状态：边框#666，背景#999。选中状态：边框#060，背景#090
 * @property {string} smallCircleBg - 小圆的背景色，默认值 white
 * @property {function} changeCheck - 改变选中状态的函数
 * @property {number} id - 单选按钮的 id，默认值 -1
 * @property {bool} disabled - 单选按钮的可选状态，默认值 false
 */

class Radio extends Component {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);
    referenceReport('Radio');
    const {
      isChecked
    } = props;
    const circleOpacity = isChecked ? 1 : 0;
    const circleScale = isChecked ? 0.5 : 0.4;
    this.state = {
      scale: new Animated.Value(circleScale),
      opacity: new Animated.Value(circleOpacity)
    };
  }

  colorSwitchCircle = new DynamicColor('#ffffff', '#ebebeb');

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      isChecked
    } = nextProps;

    if (isChecked) {
      // 选中
      this.changeStatus(0.5, 1);
    } else {
      // 取消选中
      this.changeStatus(0.4, 0);
    }
  } // 改变选中状态时，执行动画


  changeStatus = (scaleTo, opacityTo) => {
    const {
      scale,
      opacity
    } = this.state;
    Animated.parallel([Animated.spring( // 随时间变化而执行动画
    scale, // 动画中的变量值
    {
      toValue: scaleTo,
      bounciness: 15,
      speed: 9 // 透明度最终变为1，即完全不透明

    }), Animated.timing( // 随时间变化而执行动画
    opacity, // 动画中的变量值
    {
      toValue: opacityTo,
      // 透明度最终变为1，即完全不透明
      duration: 200 // 让动画持续一段时间

    })]).start();
  }; // 改变该按钮的状态

  changeRadioCheck = () => {
    const {
      changeCheck,
      id
    } = this.props;
    changeCheck(id);
  };

  render() {
    const {
      colorScheme
    } = this.context;
    const {
      smallCircleBg,
      isChecked,
      bigCircleStyle,
      checkedBigCircleStyle,
      disabled,
      accessible,
      accessibilityRole,
      label,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState
    } = this.props;
    const {
      borderColorChecked,
      backgroundColorChecked,
      borderColor,
      backgroundColor
    } = checkedBigCircleStyle;
    const {
      scale,
      opacity
    } = this.state;
    const colorSmallCircleBg = smallCircleBg || this.colorSwitchCircle.color(colorScheme);
    return <TouchableWithoutFeedback onPress={this.changeRadioCheck} disabled={disabled} {...getAccessibilityConfig({ ...this.props,
      accessibilityRole: accessibilityRole || AccessibilityRoles.radio,
      accessibilityLabel: accessibilityLabel || label,
      accessibilityState: accessibilityState || {
        disabled: !!disabled,
        checked: !!isChecked
      }
    })}>
          <View style={[styles.btn, bigCircleStyle, {
        borderColor: isChecked ? borderColorChecked : borderColor,
        backgroundColor: isChecked ? backgroundColorChecked : backgroundColor,
        opacity: disabled ? 0.3 : 1
      }]}>
            <Animated.View style={[styles.smallCircle, bigCircleStyle, {
          borderWidth: 0,
          transform: [{
            scale
          }],
          opacity,
          backgroundColor: colorSmallCircleBg
        }]} />
          </View>
        </TouchableWithoutFeedback>;
  }

}

Radio.defaultProps = {
  bigCircleStyle: {},
  checkedBigCircleStyle: {
    borderColorChecked: '#060',
    backgroundColorChecked: '#090',
    borderColor: '#666',
    backgroundColor: '#999'
  },
  isChecked: false,

  changeCheck() {},

  id: -1,
  disabled: false
};
Radio.propTypes = {
  bigCircleStyle: PropTypes.object,
  checkedBigCircleStyle: PropTypes.object,
  smallCircleBg: PropTypes.string,
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  changeCheck: PropTypes.func,
  id: PropTypes.number,
  ...AccessibilityPropTypes
};
const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 40,
    width: 80,
    height: 80
  },
  smallCircle: {
    borderRadius: 40,
    width: 80,
    height: 80
  }
});
export default Radio;