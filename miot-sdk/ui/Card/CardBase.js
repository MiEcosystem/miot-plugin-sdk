import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Images, Styles } from '../../resources';
const { width } = Dimensions.get('window');
const DURATION_OUT = 250;
const DURATION_IN = 250;
const DEFAULT_STYLE = {
  MARGIN_H: 15,
  HEIGHT: 66,
  WIDTH: width - 15 * 2,
  // RADIUS: 8,
  ICON_SIZE: 35,
  CLOSE_AREA: 30,
  CLOSE_SIZE: 20
};
/**
 * @export
 * @author Geeook
 * @since 10010
 * @module CardBase
 * @description 基础卡片
 * @property {component} innerView - 卡片内部 View, 不传该参数将显示默认的 icon + text
 * @property {int} icon - 左侧图标的资源 id, 参照`Image`的`resource`属性, 不传将不显示图标
 * @property {string} text - 右侧文案
 * @property {bool} visible - 是否显示卡片, 默认值 true
 * @property {bool} showDismiss - 是否显示右上角的关闭按钮, 默认值 false
 * @property {bool} disabled - 是否禁用卡片点击, 默认值 false
 * @property {function} dismiss - 点右上角关闭按钮的回调函数
 * @property {function} onPress - 点击事件, 不传该参数将显示禁用态
 * @property {style} cardStyle - 卡片容器的自定义样式, 默认样式 `{ width: screenWidth - 30, height:66 }`
 * @property {style} iconStyle - 左侧图标的自定义样式
 * @property {style} textStyle - 右侧文案的自定义样式
 * @property {string} underlayColor - 卡片点击态颜色，默认 rgba(0,0,0,0.05)
 */
export default class CardBase extends React.Component {
  static propTypes = {
    innerView: PropTypes.object,
    icon: PropTypes.number,
    text: PropTypes.string,
    showDismiss: PropTypes.bool,
    disabled: PropTypes.bool,
    dismiss: PropTypes.func,
    visible: PropTypes.bool,
    onPress: PropTypes.func,
    cardStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    textStyle: PropTypes.object,
    underlayColor: PropTypes.string
  }
  static defaultProps = {
    showDismiss: false,
    disabled: false,
    visible: true,
    underlayColor: Styles.common.underlayColor
  }
  constructor(props, context) {
    super(props, context);
    const { height, marginTop } = this.props.cardStyle;
    this.cardHeight = height || DEFAULT_STYLE.HEIGHT;
    const initValue = this.props.visible ? 1 : 0;
    this.height = new Animated.Value(initValue);
    this.opacity = new Animated.Value(initValue);
    this.marginTop = marginTop || 0;
    this.cardRef = null;
    this.setCardRef = element => {
      this.cardRef = element;
    };
  }
  componentDidMount() {
    this.height.addListener(e => {
      this.cardRef && this.cardRef.setNativeProps({
        marginTop: this.marginTop * e.value
      });
    });
  }
  /**
   * @description 渲染卡片内部View。默认显示 icon + text
   */
  renderInner() {
    if (this.props.innerView === undefined) {
      const { icon, text, iconStyle, textStyle } = this.props;
      return (
        <Animated.View
          style={[styles.innerContainer, { opacity: this.opacity }]}
        >
          {
            icon
              ? <Image
                style={[styles.innerIcon, iconStyle]}
                source={icon}
                resizeMode="contain"
              />
              : null
          }
          <Text
            style={[styles.innerText, textStyle]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {text || ''}
          </Text>
        </Animated.View>
      );
    }
    return (
      <Animated.View
        style={[{ flex: 1 }, { opacity: this.opacity }]}
      >
        {this.props.innerView}
      </Animated.View>
    );
  }
  /**
   * @description 渲染右上角的关闭按钮, 默认不显示
   */
  renderClose() {
    if (!this.props.showDismiss) return null;
    return (
      <TouchableHighlight
        style={styles.closeArea}
        underlayColor="transparent"
        onPress={_ => this.dismiss()}
      >
        <Animated.Image
          style={[styles.close, { opacity: this.opacity }]}
          source={Images.common.close}
        />
      </TouchableHighlight>
    );
  }
  /**
   * @description 筛选出`cardStyle`中的大小定位信息
   */
  getCorrectStyle(cardStyle) {
    const animatedViewStyle = {};
    const containerStyle = {};
    Object.keys(cardStyle).forEach(key => {
      if (key.toString().startsWith('margin')
        || key.toString() === 'width') {
        animatedViewStyle[key] = cardStyle[key];
      }
      else {
        containerStyle[key] = cardStyle[key];
      }
    });
    return { animatedViewStyle, containerStyle };
  }
  render() {
    const toValue = this.props.visible ? 1 : 0;
    // 消失
    if (!this.props.visible) {
      Animated.parallel(
        [
          Animated.timing(this.height, {
            toValue,
            duration: DURATION_OUT,
            easing: Easing.ease,
          }),
          Animated.timing(this.opacity, {
            toValue,
            duration: DURATION_OUT * 0.4,
            easing: Easing.ease,
          })
        ],
        {
          stopTogether: false
        }
      ).start();
    }
    // 出现
    else {
      Animated.parallel(
        [
          Animated.timing(this.opacity, {
            toValue,
            duration: DURATION_IN * 0.5,
            easing: Easing.ease,
            delay: DURATION_IN * 0.5
          }),
          Animated.timing(this.height, {
            toValue,
            duration: DURATION_IN,
            easing: Easing.ease,
          })
        ]
      ).start();
    }
    const cardStyle = StyleSheet.flatten([styles.container, this.props.cardStyle]);
    const { animatedViewStyle, containerStyle } = this.getCorrectStyle(cardStyle);
    return (
      <Animated.View
        ref={this.setCardRef}
        style={[animatedViewStyle, {
          opacity: this.opacity,
          height: this.height.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.cardHeight]
          })
        }]}
      >
        <TouchableHighlight
          style={[containerStyle, { flex: 1 }]}
          underlayColor={this.props.underlayColor}
          disabled={this.props.disabled}
          onPress={this.props.onPress}
        >
          <View style={{ flex: 1 }}>
            {this.renderInner()}
            {this.renderClose()}
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  }
  dismiss() {
    this.props.dismiss && this.props.dismiss();
  }
}
const styles = StyleSheet.create({
  container: {
    // height: DEFAULT_STYLE.HEIGHT,
    width: DEFAULT_STYLE.WIDTH,
    backgroundColor: '#fff',
    // borderRadius: DEFAULT_STYLE.RADIUS
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: DEFAULT_STYLE.MARGIN_H
  },
  innerIcon: {
    width: DEFAULT_STYLE.ICON_SIZE,
    height: DEFAULT_STYLE.ICON_SIZE,
    marginRight: DEFAULT_STYLE.MARGIN_H
  },
  innerText: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  closeArea: {
    width: DEFAULT_STYLE.CLOSE_AREA,
    height: DEFAULT_STYLE.CLOSE_AREA,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  close: {
    width: DEFAULT_STYLE.CLOSE_SIZE,
    height: DEFAULT_STYLE.CLOSE_SIZE
  }
});
