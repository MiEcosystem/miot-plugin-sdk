import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Styles } from '../../resources';
import Card from './Card';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
/**
 * @export
 * @author Li Yue
 * @since 10021
 * @module ModeCard
 * @description 档位/模式卡片
 * @property {string} radiusType - 卡片圆角类型：四个圆角、没有圆角、只有上圆角、只有下圆角。对应值：all（默认）, none, top, bottom
 * @property {array} modes - 模式数组，默认值：[] 其中的object个数决定显示在卡片中的个数,支持的所有key值：{description:'',icon: {normal: require(''),press: require(''),active: require(''),activeDisabled: require(''),},isDisabled:false,isActive:false,isPressing: false}
 * @property {function} pressIn - 按下模式时执行的函数，默认值：function(){}
 * @property {function} pressOut - 手指抬起模式时执行的函数，默认值：function(){}
 * @property {string} modesKey - 模式数组对应的 key，默认值：''
 * @property {style} descriptionStyle - 描述文字的样式，默认值：{}
 * @property {style} activeDescriptionStyle - 描述文字的高亮样式，默认值：{}
 * @property {bool} showShadow - 是否显示卡片阴影, 默认值 true。由于安卓的阴影显示存在问题，在和标题进行卡片拼接时，不能显示阴影，请传入 false
 * @property {style} modeCardStyle - 模式卡片样式, 默认值 {}
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {bool} allowFontScaling - 10040新增 设置卡片字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {number} numberOfLines - 10040新增 设置卡片字体显示的最大行数 默认为1
 */
const radiusValue = 10;
let iconLength = 56;
const padding3 = 30;
const padding4 = 28;
const padding5 = 20;
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
const { width } = Dimensions.get('window');
class ModeCard extends Component {
  constructor(props) {
    super(props);
    referenceReport('ModeCard');
    this.cardWrapStyle = {};
    // 设置 Card 组件的样式
    let { modes } = props;
    let { length } = modes;
    let cardWrapStyle = {
      height: 116
    };
    let hasDescription = modes.some((mode) => {
      return mode.description;
    });
    if (length === 3 && hasDescription) {
      // 3模式有描述
      cardWrapStyle = {
        height: 140
      };
    } else if (length === 4 && !hasDescription) {
      // 4模式无描述
      cardWrapStyle = {
        height: 106
      };
    } else if (length === 4 && hasDescription) {
      // 4模式有描述
      cardWrapStyle = {
        height: 130
      };
    } else if (length === 5) {
      // 5模式
      cardWrapStyle = {
        height: 86
      };
    }
    this.cardWrapStyle = cardWrapStyle;
    // 根据 radiusType 设置卡片圆角
    this.radius = {
      [CARD_RADIUS_TYPE.ALL]: {
        borderRadius: radiusValue
      },
      [CARD_RADIUS_TYPE.NONE]: {
        borderRadius: 0
      },
      [CARD_RADIUS_TYPE.TOP]: {
        borderTopLeftRadius: radiusValue,
        borderTopRightRadius: radiusValue
      },
      [CARD_RADIUS_TYPE.BOTTOM]: {
        borderBottomLeftRadius: radiusValue,
        borderBottomRightRadius: radiusValue
      }
    }[props.radiusType];
  }
  componentDidMount() {
  }
  // 生成模式结构
  createModesRN = () => {
    let {
      modes, descriptionStyle, activeDescriptionStyle,
      accessible
    } = this.props;
    let { length } = modes;
    let modeStyle = {};
    let iconStyle = {};
    if (length === 4) {
      // 4模式
      iconLength = 50;
      modeStyle = {
        width: iconLength,
        marginRight: 33
      };
      iconStyle = {
        width: iconLength,
        height: iconLength
      };
    } else if (length === 5) {
      // 5模式
      iconLength = 46;
      modeStyle = {
        width: iconLength,
        marginRight: 17
      };
      iconStyle = {
        width: iconLength,
        height: iconLength
      };
    }
    let modesRN = modes.map((mode, index) => {
      let {
        isDisabled, isActive, icon, description, isPressing,
        accessibilityLabel, accessibilityHint
      } = mode;
      let iconSource = -1;
      let iconOpacity = 1;
      let descriptionRN = null;
      let last = {};
      let activeDescription = {};
      let descriptionOpacity = 1;
      if (isDisabled && isActive) {
        // 高亮不可点
        iconSource = icon.activeDisabled;
      } else if (isDisabled) {
        // 不可点
        iconSource = icon.normal;
        iconOpacity = .3;
      } else if (isActive) {
        // 高亮
        iconSource = icon.active;
        activeDescription = { color: Styles.common.MHGreen };
        Object.assign(activeDescription, activeDescriptionStyle);
      } else if (isPressing) {
        // 按下
        iconSource = icon.press;
      } else {
        // 正常
        iconSource = icon.normal;
      }
      if (isDisabled) {
        // 不可点
        descriptionOpacity = .3;
      }
      if (description && length < 5) {
        // 模式3、4有描述文字
        const style = StyleSheet.flatten([styles.description, this.props.unlimitedHeightEnable ? { fontSize: undefined, lineHeight: undefined } : {}]);
        let textLine = this.props.numberOfLines == undefined ? 1 : this.props.numberOfLines;
        if (textLine < 0) textLine = 0;
        descriptionRN = (
          <Text
            style={[style, descriptionStyle, activeDescription, { opacity: descriptionOpacity }
            ]}
            numberOfLines={textLine}
          > {description}</Text >
        );
      }
      if (index === length - 1) {
        // 最后一个
        last = { marginRight: 0 };
      }
      return (
        <TouchableWithoutFeedback
          key={index}
          onPressIn={() => {
            this.pressInIcon(index);
          }}
          onPressOut={() => {
            this.pressOutIcon(index);
          }}
          {...getAccessibilityConfig({
            accessible,
            accessibilityRole: AccessibilityRoles.radio,
            accessibilityLabel: accessibilityLabel || description,
            accessibilityHint: accessibilityHint,
            accessibilityState: {
              disabled: !!isDisabled,
              selected: !!isActive
            }
          })}
        >
          <View style={[
            styles.mode,
            modeStyle,
            last
          ]}>
            <Image
              style={[
                styles.icon,
                { opacity: iconOpacity },
                iconStyle
              ]}
              resizeMode="contain"
              source={iconSource}
            />
            {descriptionRN}
          </View>
        </TouchableWithoutFeedback>
      );
    });
    return modesRN;
  }
  // 按下图标
  pressInIcon = (index) => {
    let { pressIn, modesKey } = this.props;
    if (pressIn && modesKey) {
      // 传入了按下函数、模式数组对应的 key
      pressIn(index, modesKey);
    }
  }
  // 手指抬起图标
  pressOutIcon = (index) => {
    let { pressOut, modesKey } = this.props;
    if (pressOut && modesKey) {
      // 传入了手指抬起函数、模式数组对应的 key
      pressOut(index, modesKey);
    }
  }
  // 渲染模式卡片结构
  renderModeCard = () => {
    let { modes } = this.props;
    let { length } = modes;
    let cardPadding = {};
    if (length === 4) {
      // 4模式
      cardPadding = {
        paddingTop: padding4,
        paddingBottom: padding4
      };
    } else if (length === 5) {
      // 5模式
      cardPadding = {
        paddingTop: padding5,
        paddingBottom: padding5
      };
    }
    return (
      <View style={[
        styles.card,
        this.radius,
        cardPadding
      ]}
      >
        <View style={styles.main}>
          {this.createModesRN()}
        </View>
      </View>
    );
  }
  render() {
    let { showShadow, modeCardStyle } = this.props;
    let defaultCardStyle = {
      marginTop: 0,
      width: width - 10 * 2
    };
    let mixCardStyle = Object.assign({}, defaultCardStyle, modeCardStyle, this.cardWrapStyle, this.radius, !this.props.allowFontScaling ? { height: undefined } : {});
    return (
      <Card
        showShadow={showShadow}
        disabled={true}
        innerView={this.renderModeCard()}
        cardStyle={mixCardStyle}
        allowFontScaling={this.props.allowFontScaling}
        unlimitedHeightEnable={this.props.unlimitedHeightEnable}
        numberOfLines={this.props.numberOfLines}
      />
    );
  }
}
ModeCard.defaultProps = {
  radiusType: 'all',
  modes: [
    {
      description: '',
      icon: {
        /* normal: require(''),
        press: require(''),
        active: require(''),
        activeDisabled: require(''), */
      },
      isDisabled: false,
      isActive: false,
      isPressing: false
    }
  ],
  pressIn: function() { },
  pressOut: function() { },
  modesKey: '',
  descriptionStyle: {},
  activeDescriptionStyle: {},
  showShadow: true,
  modeCardStyle: {},
  unlimitedHeightEnable: false,
  allowFontScaling: true
};
ModeCard.propTypes = {
  radiusType: PropTypes.string,
  modesKey: PropTypes.string,
  modes: PropTypes.arrayOf(PropTypes.shape({
    isDisabled: PropTypes.bool,
    isActive: PropTypes.bool,
    icon: PropTypes.shape({
      normal: PropTypes.any,
      press: PropTypes.any,
      active: PropTypes.any,
      activeDisabled: PropTypes.any
    }),
    description: PropTypes.string,
    isPressing: PropTypes.bool,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  })),
  pressIn: PropTypes.func,
  pressOut: PropTypes.func,
  descriptionStyle: PropTypes.object,
  activeDescriptionStyle: PropTypes.object,
  showShadow: PropTypes.bool,
  modeCardStyle: PropTypes.object,
  allowFontScaling: PropTypes.bool,
  unlimitedHeightEnable: PropTypes.bool,
  numberOfLines: PropTypes.number,
  accessible: AccessibilityPropTypes.accessible
};
const styles = StyleSheet.create({
  card: {
    paddingTop: padding3,
    paddingBottom: padding3,
    backgroundColor: 'white'
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  mode: {
    width: iconLength,
    marginRight: 40
  },
  icon: {
    width: iconLength,
    height: iconLength
  },
  description: {
    fontSize: 13,
    color: '#7F7F7F',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 14
  }
});
export default ModeCard;