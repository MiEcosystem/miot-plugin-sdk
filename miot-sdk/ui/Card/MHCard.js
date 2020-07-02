import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Images, Styles } from '../../resources';
import Card from "../Card";
import Switch from '../Switch';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
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
};
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
};
Object.freeze(CARD_RADIUS_TYPE);
const { width } = Dimensions.get('window');
const cardMargin = 10; // 卡片左右间距
const cardWidth = width - cardMargin * 2; // 卡片的宽度
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
 * @property {CARD_TYPE} cardType - 卡片类型，右侧是否是开关，默认是 `CARD_TYPE.NORMAL`
 * @property {CARD_RADIUS_TYPE} cardRadiusType - 卡片圆角类型，定义四个角是圆角还是直角，默认是 `CARD_RADIUS_TYPE.ALL`，所有的卡片类型有效
 * @property {style} iconContainerStyle - 图标容器的样式
 * @property {number} icon - 左侧图标的资源 id, 参照`Image`的`resource`属性，所有的卡片类型有效
 * @property {style} iconStyle - 图标的样式
 * @property {string} title - 左侧主标题，所有的卡片类型有效
 * @property {style} titleStyle - 左侧主标题的自定义样式，所有的卡片类型有效
 * @property {string} subtitle - 左侧副标题，如果有的话，显示在主标题的下方，没有则不显示，所有的卡片类型有效
 * @property {style} subtitleStyle - 左侧副标题的自定义样式，所有的卡片类型有效
 * @property {string} rightText - 右侧文案，如果有的话，显示在右箭头的左侧，没有则不显示，当卡片类型是`CARD_TYPE.NORMAL`有效
 * @property {style} rightTextStyle - 右侧文案的自定义样式，当卡片类型是`CARD_TYPE.NORMAL`有效
 * @property {bool} hideArrow - 是否隐藏右侧箭头图片，默认值 `false`，当卡片类型是`CARD_TYPE.NORMAL`有效
 * @property {function} onPress - 点击卡片的回调函数，所有的卡片类型有效
 * @property {bool} switchValue - 开关的状态，默认是 `false`，当卡片类型是`CARD_TYPE.SWITCH`有效
 * @property {string} onTintColor - 开关打开时的背景颜色，当卡片类型是`CARD_TYPE.SWITCH`有效
 * @property {string} tintColor - 开关关闭时的背景颜色，当卡片类型是`CARD_TYPE.SWITCH`有效
 * @property {function} onValueChange - 点击卡片开关的回调函数，当卡片类型是`CARD_TYPE.SWITCH`有效
 * @property {bool} disabled - 是否禁用卡片，默认是 `false`，禁用时显示不可点击态，所有的卡片类型有效
 * @property {bool} visible - 是否显示卡片，默认是 `true`，改变该值将显示/隐藏卡片，有弹出和收起动效，所有的卡片类型有效
 * @property {bool} showShadow - 是否显示卡片阴影，默认是 `false`，所有的卡片类型有效
 * @property {number} marginTop - 10039废弃 请在style中设置 卡片的上边距，默认 `0`，所有的卡片类型有效
 * @property {object} style - 10039新增 ，style
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {bool} allowFontScaling - 10040新增 设置卡片字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {number} titleNumberOfLines - 10040新增 设置title显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 10040新增 设置subtitle显示的最大行数 默认为1
 * @property {number} rightTextNumberOfLines - 10040新增 设置rightText显示的最大行数 默认为2
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
    style: PropTypes.object,
    iconContainerStyle: PropTypes.object,
    icon: PropTypes.number.isRequired,
    iconStyle: PropTypes.object,
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
    unlimitedHeightEnable: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    titleNumberOfLines: PropTypes.number,
    subtitleNumberOfLines: PropTypes.number,
    rightTextNumberOfLines: PropTypes.number,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
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
    unlimitedHeightEnable: false,
    allowFontScaling: true
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
    referenceReport('MHCard');
    this.radiusStyle = {
      [CARD_RADIUS_TYPE.ALL]: {
        borderRadius: 10
      },
      [CARD_RADIUS_TYPE.NONE]: {
        borderRadius: 0
      },
      [CARD_RADIUS_TYPE.TOP]: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
      },
      [CARD_RADIUS_TYPE.BOTTOM]: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      }
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
    }]);
  }
  onAccessibilityAction = ({ nativeEvent: { actionName } }) => {
    const { disabled, cardType, onPress, onValueChange, switchValue } = this.props;
    if (disabled) {
      return;
    }
    if (actionName === 'activate' && cardType === CARD_TYPE.SWITCH && typeof onValueChange === 'function') {
      onValueChange(!switchValue);
    }
    if (actionName === 'activate' && cardType === CARD_TYPE.NORMAL && typeof onPress === 'function') {
      onPress();
    }
  }
  renderInnerView() {
    const opacityStyle = {
      opacity: this.props.disabled ? disabledOpacity : 1
    };
    let titleLine = this.props.titleNumberOfLines == undefined ? 1 : this.props.titleNumberOfLines;
    if (titleLine < 0) titleLine = 0;
    let subtitleLine = this.props.subtitleNumberOfLines == undefined ? 1 : this.props.subtitleNumberOfLines;
    if (subtitleLine < 0) subtitleLine = 0;
    let rightTextLine = this.props.rightTextNumberOfLines == undefined ? 2 : this.props.rightTextNumberOfLines;
    if (rightTextLine < 0) rightTextLine = 0;
    return (
      <View style={[styles.container, this.radiusStyle, opacityStyle, this.props.style]} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: this.props.cardType === CARD_TYPE.SWITCH ? AccessibilityRoles.switch : this.props.onPress ? AccessibilityRoles.button : AccessibilityRoles.text,
        accessibilityLabel: this.props.accessibilityLabel,
        accessibilityHint: this.props.accessibilityHint,
        accessibilityState: this.props.cardType === CARD_TYPE.SWITCH ? {
          disabled: !!this.props.disabled,
          checked: this.props.switchValue
        } : {
          disabled: !!this.props.disabled
        }
      })} accessibilityActions={[
        { name: 'activate' }
      ]} onAccessibilityAction={this.onAccessibilityAction}>
        <View style={[styles.iconContainer, this.props.iconContainerStyle]}>
          <Image
            style={[styles.icon, this.props.iconStyle]}
            source={this.props.icon}
            resizeMode="contain"
            {...getAccessibilityConfig({
              accessible: false
            })}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text
              style={[Styles.common.title, this.props.unlimitedHeightEnable ? { height: undefined, lineHeight: undefined } : {}, this.props.titleStyle]}
              numberOfLines={titleLine}
              {...getAccessibilityConfig({
                accessible: false
              })}
            >
              {this.props.title || ''}
            </Text>
            {
              this.props.subtitle ? <Text
                style={[styles.subtitle, this.props.unlimitedHeightEnable ? { height: undefined, lineHeight: undefined } : {}, this.props.subtitleStyle]}
                numberOfLines={subtitleLine}
                {...getAccessibilityConfig({
                  accessible: false
                })}
              >
                {this.props.subtitle}
              </Text>
                : null
            }
          </View>
          {
            this.props.rightText ?
              <View style={{ maxWidth: '33%' }}>
                <Text
                  style={[styles.rightText, this.props.unlimitedHeightEnable ? { height: undefined, lineHeight: undefined } : {}, this.props.rightTextStyle]}
                  allowFontScaling={this.props.allowFontScaling}
                  numberOfLines={rightTextLine}{...getAccessibilityConfig({
                    accessible: false
                  })}>
                  {this.props.rightText || ''}
                </Text>
              </View>
              : null
          }
        </View>
        {this.renderRight()}
      </View >
    );
  }
  renderRight() {
    if (this.props.cardType === CARD_TYPE.NORMAL) {
      if (this.props.hideArrow) return null;
      return (
        <Image
          style={styles.arrow}
          source={Images.common.right_arrow}
          resizeMode="contain"
          {...getAccessibilityConfig({
            accessible: false
          })}
        />
      );
    } else if (this.props.cardType === CARD_TYPE.SWITCH) {
      return (
        <Switch
          value={this.props.switchValue}
          {...this.props}
          {...getAccessibilityConfig({
            accessible: false
          })}
        />
      );
    } else {
      if (__DEV__ && console.warn) {
        console.warn('cardType must be one of CARD_TYPE');
      }
    }
  }
  render() {
    const cardStyle = StyleSheet.flatten([this.cardStyle, !this.props.allowFontScaling ? { height: undefined } : {}]);
    return (
      <Card
        innerView={this.renderInnerView()}
        cardStyle={cardStyle}
        {...this.props}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: cardPadding,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginLeft: 14
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#666'
  },
  rightText: {
    paddingLeft: 10,
    textAlign: 'right',
    fontSize: 16,
    color: '#000'
  },
  arrow: {
    width: ARROW_SIZE,
    height: ARROW_SIZE
  }
});