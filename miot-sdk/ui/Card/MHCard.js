import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Images, Styles } from '../../resources';
import Card from "../Card";
import Switch from '../Switch';
/**
 * @description 卡片类型
 * @enum {string}
 */
const CARD_TYPE = {
  /**
   * 普通卡片，卡片右侧不是开关
   */
  NORMAL: 'normal',
  /**
   * 开关卡片，卡片右侧是开关
   */
  SWITCH: 'switch'
}
Object.freeze(CARD_TYPE);
/**
 * @description 卡片圆角类型
 * @enum {string}
 */
const CARD_RADIUS_TYPE = {
  /**
   * 四角都是圆角
   */
  ALL: 'all',
  /**
   * 四角都是直角
   */
  NONE: 'none',
  /**
   * 上方圆角下方直角
   */
  TOP: 'top',
  /**
   * 上方直角下方圆角
   */
  BOTTOM: 'bottom'
}
Object.freeze(CARD_RADIUS_TYPE);
const { width } = Dimensions.get('window');
const cardMargin = 10; // 卡片左右间距
const cardWidth = width - cardMargin * 2 // 卡片的宽度
const cardHeight = 80; // 卡片的高度
const cardPadding = 20; // 卡片内边距
const ICON_SIZE = 40; // 左侧图标尺寸
const ARROW_SIZE = Platform.select({ android: 26, ios: 24 }); // 当android设置24的时候，图形会挤压形成锯齿
const disabledOpacity = 0.35;
/**
 * @export
 * @author Geeook
 * @since 10020
 * @module MHCard
 * @description 米家插件首页常用卡片, 包括普通卡片（右侧箭头）和开关卡片（右侧开关），使用 `miot/ui/Card` 作为容器
 * @param {CARD_TYPE} cardType - 卡片类型，右侧是否是开关，默认是 `CARD_TYPE.NORMAL`
 * @param {CARD_RADIUS_TYPE} cardRadiusType - 卡片圆角类型，定义四个角是圆角还是直角，默认是 `CARD_RADIUS_TYPE.ALL`，所有的卡片类型有效
 * @param {number} icon - 左侧图标的资源 id, 参照`Image`的`resource`属性，所有的卡片类型有效
 * @param {string} title - 左侧主标题，所有的卡片类型有效
 * @param {style} titleStyle - 左侧主标题的自定义样式，所有的卡片类型有效
 * @param {string} subtitle - 左侧副标题，如果有的话，显示在主标题的下方，没有则不显示，所有的卡片类型有效
 * @param {style} subtitleStyle - 左侧副标题的自定义样式，所有的卡片类型有效
 * @param {string} rightText - 右侧文案，如果有的话，显示在右箭头的左侧，没有则不显示，当卡片类型是`CARD_TYPE.NORMAL`有效
 * @param {style} rightTextStyle - 右侧文案的自定义样式，当卡片类型是`CARD_TYPE.NORMAL`有效
 * @param {bool} hideArrow - 是否隐藏右侧箭头图片，默认值 `false`，当卡片类型是`CARD_TYPE.NORMAL`有效
 * @param {function} onPress - 点击卡片的回调函数，所有的卡片类型有效
 * @param {bool} switchValue - 开关的状态，默认是 `false`，当卡片类型是`CARD_TYPE.SWITCH`有效
 * @param {string} onTintColor - 开关打开时的背景颜色，当卡片类型是`CARD_TYPE.SWITCH`有效
 * @param {string} tintColor - 开关关闭时的背景颜色，当卡片类型是`CARD_TYPE.SWITCH`有效
 * @param {function} onValueChange - 点击卡片开关的回调函数，当卡片类型是`CARD_TYPE.SWITCH`有效
 * @param {bool} disabled - 是否禁用卡片，默认是 `false`，禁用时显示不可点击态，所有的卡片类型有效
 * @param {bool} visible - 是否显示卡片，默认是 `true`，改变该值将显示/隐藏卡片，有弹出和收起动效，所有的卡片类型有效
 * @param {bool} showShadow - 是否显示卡片阴影，默认是 `false`，所有的卡片类型有效
 * @param {number} marginTop - 卡片的上边距，默认 `0`，所有的卡片类型有效
 */
export default class MHCard extends React.Component {
  static propTypes = {
    cardType: PropTypes.oneOf([CARD_TYPE.NORMAL, CARD_TYPE.SWITCH]),
    cardRadiusType: PropTypes.oneOf([
      CARD_RADIUS_TYPE.ALL,
      CARD_RADIUS_TYPE.NONE,
      CARD_RADIUS_TYPE.TOP,
      CARD_RADIUS_TYPE.BOTTOM
    ]),
    icon: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.object,
    subtitle: PropTypes.string,
    subtitleStyle: PropTypes.object,
    rightText: PropTypes.string,
    rightTextStyle: PropTypes.object,
    hideArrow: PropTypes.bool,
    onPress: PropTypes.func,
    switchValue: PropTypes.bool,
    onTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    onValueChange: PropTypes.func,
    disabled: PropTypes.bool,
    visible: PropTypes.bool,
    showShadow: PropTypes.bool,
    marginTop: PropTypes.number,
  }
  static defaultProps = {
    cardType: CARD_TYPE.NORMAL,
    cardRadiusType: CARD_RADIUS_TYPE.ALL,
    icon: Images.common.mihome,
    hideArrow: false,
    switchValue: false,
    disabled: false,
    visible: true,
    showShadow: false,
    marginTop: 0,
  }
  /**
   * @description 卡片类型
   * @enum {string}
   */
  static CARD_TYPE = CARD_TYPE
  /**
   * @description 卡片圆角类型
   * @enum {string}
   */
  static CARD_RADIUS_TYPE = CARD_RADIUS_TYPE
  constructor(props) {
    super(props);
    this.radiusStyle = {
      [CARD_RADIUS_TYPE.ALL]: {
        borderRadius: 10,
      },
      [CARD_RADIUS_TYPE.NONE]: {
        borderRadius: 0,
      },
      [CARD_RADIUS_TYPE.TOP]: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      [CARD_RADIUS_TYPE.BOTTOM]: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
    }[this.props.cardRadiusType];
    /**
     * 将样式作为属性传入组件的时候，要保证
     * 1. 要么在传入的时候扁平化成一个object
     * 2. 要么在组件接收传参的时候做扁平化
     */
    this.cardStyle = StyleSheet.flatten([this.radiusStyle, {
      width: cardWidth,
      height: cardHeight,
      marginTop: this.props.marginTop
    }])
  }
  renderInnerView() {
    const opacityStyle = {
      opacity: this.props.disabled ? disabledOpacity : 1
    }
    return (
      <View style={[styles.container, this.radiusStyle, opacityStyle]}>
        <Image
          style={styles.icon}
          source={this.props.icon}
          resizeMode='contain'
        />
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text
              style={[Styles.common.title, this.props.titleStyle]}
              numberOfLines={1}
            >
              {this.props.title || ''}
            </Text>
            {this.props.subtitle
              ? <Text
                style={[styles.subtitle, this.props.subtitleStyle]}
                numberOfLines={1}
              >
                {this.props.subtitle}
              </Text>
              : null
            }
          </View>
          {this.props.rightText
            ? <Text
              style={[styles.rightText, this.props.rightTextStyle]}
              numberOfLines={2}
            >
              {this.props.rightText || ''}
            </Text>
            : null
          }
        </View>
        {this.renderRight()}
      </View>
    )
  }
  renderRight() {
    if (this.props.cardType === CARD_TYPE.NORMAL) {
      if (this.props.hideArrow) return null;
      return (
        <Image
          style={styles.arrow}
          source={Images.common.right_arrow}
          resizeMode='contain'
        />
      )
    }
    else if (this.props.cardType === CARD_TYPE.SWITCH) {
      return (
        <Switch
          value={this.props.switchValue}
          {...this.props}
        />
      )
    }
    else {
      console.warn('cardType must be one of CARD_TYPE');
    }
  }
  render() {
    return (
      <Card
        innerView={this.renderInnerView()}
        cardStyle={this.cardStyle}
        {...this.props}
      />
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: cardPadding,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#666',
  },
  rightText: {
    flex: 0.5,
    textAlign: 'right',
    fontSize: 16,
    color: '#000',
  },
  arrow: {
    width: ARROW_SIZE,
    height: ARROW_SIZE,
  }
});