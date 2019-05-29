import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import CardBase from './CardBase';
const { width } = Dimensions.get('window');
const DURATION = 250;
const DEFAULT_STYLE = {
  HEIGHT: 66,
  WIDTH: width - 15 * 2,
  RADIUS: 8,
  MARGIN_TOP: { marginTop: 15 }
};
/**
 * @export
 * @author Geeook
 * @since 10010
 * @module Card
 * @description 带阴影的卡片
 * @property {component} innerView - 卡片内部 View, 不传该参数将显示默认的 icon + text
 * @property {int} icon - 左侧图标的资源 id, 参照`Image`的`resource`属性, 不传将不显示图标
 * @property {string} text - 右侧文案
 * @property {bool} visible - 是否显示卡片, 默认值 true
 * @property {bool} showDismiss - 是否显示右上角的关闭按钮, 默认值 false
 * @property {bool} disabled - 是否禁用卡片点击, 默认值 false
 * @property {function} dismiss - 点右上角关闭按钮的回调函数
 * @property {bool} showShadow - 是否显示卡片阴影, 默认值 true
 * @property {function} onPress - 点击事件, 不传该参数将显示禁用态
 * @property {style} cardStyle - 卡片容器的自定义样式, 默认样式 `{ width: screenWidth - 30, height:66 }`
 * @property {style} iconStyle - 左侧图标的自定义样式
 * @property {style} textStyle - 右侧文案的自定义样式
 * @property {string} underlayColor - 卡片点击态颜色，默认 rgba(0,0,0,0.05)
 * @property {string} shadowColor - 阴影颜色，默认 '#000'，❗️android 平台只支持16进制的 shadowColor
 * @property {number} shadowOpacity - 阴影透明度，默认 0.03
 */
export default class Card extends React.Component {
  static propTypes = {
    innerView: PropTypes.object,
    icon: PropTypes.number,
    text: PropTypes.string,
    visible: PropTypes.bool,
    showDismiss: PropTypes.bool,
    disabled: PropTypes.bool,
    dismiss: PropTypes.func,
    showShadow: PropTypes.bool,
    onPress: PropTypes.func,
    cardStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    textStyle: PropTypes.object,
    underlayColor: PropTypes.string,
    shadowColor: PropTypes.string,
    shadowOpacity: PropTypes.number
  }
  static defaultProps = {
    visible: true,
    showDismiss: false,
    disabled: false,
    showShadow: true,
    cardStyle: {},
    shadowColor: '#000',
    shadowOpacity: 0.03
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      showShadow: this.props.visible && this.props.showShadow
    }
  }
  // android 卡片动效对于阴影的处理
  componentWillReceiveProps(newProps) {
    if (newProps.showShadow === false) return;
    if (newProps.visible === this.props.visible) return;
    // 隐藏
    if (newProps.visible === false) {
      this.setState({ showShadow: false });
    }
    // 显示
    else if (newProps.visible === true) {
      setTimeout(_ => this.setState({ showShadow: true }), DURATION);
    }
  }
  renderCardIOS() {
    const shadowIOS = this.props.showShadow
      ? {
        position: 'relative',
        shadowColor: this.props.shadowColor,
        shadowOpacity: this.props.shadowOpacity,
        shadowOffset: { width: 0, height: 8 }
      }
      : {};
    const cardStyle = StyleSheet.flatten([{}, DEFAULT_STYLE.MARGIN_TOP, this.props.cardStyle, shadowIOS]);
    return (
      <CardBase
        {...this.props}
        cardStyle={cardStyle}
      />
    );
  }
  renderCardAndroid() {
    if (!this.state.showShadow) {
      const cardStyle = StyleSheet.flatten([{}, DEFAULT_STYLE.MARGIN_TOP, this.props.cardStyle]);
      return (
        <CardBase
          {...this.props}
          cardStyle={cardStyle}
        />
      );
    }
    else {
      const { width, height, borderRadius } = this.props.cardStyle;
      const { shadowAndroidStyle, cardStyle } = this.getCorrectStyle();
      const shadowAndroid = {
        width: width || DEFAULT_STYLE.WIDTH,
        height: height || DEFAULT_STYLE.HEIGHT,
        radius: borderRadius || DEFAULT_STYLE.RADIUS,
        color: this.props.shadowColor,
        border: 10,
        opacity: this.props.shadowOpacity,
        x: 0,
        y: 6,
        style: shadowAndroidStyle
      };
      return (
        <BoxShadow setting={shadowAndroid}>
          <CardBase
            {...this.props}
            cardStyle={cardStyle}
          />
        </BoxShadow>
      );
    }
  }
  /**
   * @description 筛选出`this.props.cardStyle`中的定位信息，传给`shadowAndroid`的`style`
   */
  getCorrectStyle() {
    const shadowAndroidStyle = Object.assign({}, DEFAULT_STYLE.MARGIN_TOP);
    const cardStyle = {};
    Object.keys(this.props.cardStyle).forEach(key => {
      if (key.toString().startsWith('margin')) {
        shadowAndroidStyle[key] = this.props.cardStyle[key];
      }
      else {
        cardStyle[key] = this.props.cardStyle[key];
      }
    });
    return { shadowAndroidStyle, cardStyle };
  }
  render() {
    return Platform.select({
      android: this.renderCardAndroid(),
      ios: this.renderCardIOS()
    });
  }
}