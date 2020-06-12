import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import TouchableView from '../TouchableView';
import { Images, Styles } from '../../resources';
import Separator from "../Separator";
import { AccessibilityRoles, AccessibilityPropTypes, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
const { width } = Dimensions.get('window');
const dot = require('../../resources/title/dot.png');
const THIN_HEIGHT = 50;
const PADDING = 24;
const dotSize = 8;
const ICON_SIZE = Platform.select({ android: 26, ios: 24 }); // 当android设置24的时候，图形会挤压形成锯齿
/**
 * @export public
 * @doc_name 列表控件
 * @doc_index 2
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module ListItem
 * @description 普通列表项
 * @property {string} title - 左侧主标题
 * @property {string} subtitle - 右侧副标题
 * @property {string} value - 右侧文案
 * @property {function} onPress - 点击事件
 * @property {bool} disabled - 是否禁用点击，默认值 false
 * @property {bool} showSeparator - 是否显示分割线，默认值 true
 * @property {bool} hideArrow - 是否隐藏右侧箭头图片，默认值 `false`
 * @property {bool} showDot - 是否显示小红点，默认值 `false`
 * @property {component} separator - 自定义分割线，不传将显示默认样式的分割线
 * @property {style} containerStyle - 列表项的自定义样式
 * @property {style} titleStyle - 标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} valueStyle - 右侧文案的自定义样式
 * @property {bool} dotStyle - 10040新增 title右上角红点的style  建议设置宽高为8，以免图片失真
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {number} titleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 10040新增 设置subtitle字体显示的最大行数 默认为2
 * @property {number} valueNumberOfLines - 10040新增 设置value字体显示的最大行数 默认为1
 */
export default class ListItem extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    value: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    showSeparator: PropTypes.bool,
    hideArrow: PropTypes.bool,
    showDot: PropTypes.bool,
    separator: PropTypes.element,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
    valueStyle: PropTypes.object,
    dotStyle: PropTypes.object,
    allowFontScaling: PropTypes.bool,
    unlimitedHeightEnable: PropTypes.bool,
    titleNumberOfLines: PropTypes.number,
    subtitleNumberOfLines: PropTypes.number,
    valueNumberOfLines: PropTypes.number,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  }
  static defaultProps = {
    title: '',
    subtitle: '',
    value: '',
    onPress: () => { },
    disabled: false,
    showSeparator: true,
    hideArrow: false,
    showDot: false,
    containerStyle: {},
    titleStyle: {},
    subtitleStyle: {},
    valueStyle: {},
    dotStyle: {},
    unlimitedHeightEnable: false,
    allowFontScaling: true
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('ListItem');
  }
  render() {
    let extraContainerStyle = {
      height: THIN_HEIGHT
    };
    if (this.props.subtitle) {
      extraContainerStyle = {
        paddingVertical: 8,
        height: undefined
      };
    }
    let extraRightStyle = {
      // flex: 0
      maxWidth: '50%'
    };
    // if (this.props.value) {
    //   extraRightStyle.flex = 8;
    // }
    const valueStyle = {
      marginRight: -7,
      textAlignVertical: 'center',
      // flex: 1,
      textAlign: 'right'
    };
    let adaptedFontStyle = {};
    if (this.props.unlimitedHeightEnable) {
      adaptedFontStyle = { height: undefined, lineHeight: undefined };
    }
    let titleLine = this.props.titleNumberOfLines == undefined ? 1 : this.props.titleNumberOfLines;
    let subtitleLine = this.props.subtitleNumberOfLines == undefined ? 2 : this.props.subtitleNumberOfLines;
    let valueLine = this.props.valueNumberOfLines == undefined ? 1 : this.props.valueNumberOfLines;
    if (titleLine < 0) titleLine = 0;
    if (subtitleLine < 0) subtitleLine = 0;
    if (valueLine < 0) valueLine = 0;
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') {
      fontFamily = { fontFamily: 'Kmedium' };
      valueStyle.height = THIN_HEIGHT;
    }
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableView
          disabled={this.props.disabled}
          underlayColor={Styles.common.underlayColor}
          onPress={this.props.onPress}
          viewStyle={[styles.container, this.props.containerStyle, extraContainerStyle, adaptedFontStyle]}
          {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.button,
            accessibilityLabel: this.props.accessibilityLabel,
            accessibilityHint: this.props.accessibilityHint,
            accessibilityState: {
              disabled: this.props.disabled
            }
          })}
        >
          <View style={[styles.left]}>
            <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
              <Text
                numberOfLines={titleLine}
                allowFontScaling={this.props.allowFontScaling}
                style={[Styles.common.title, fontFamily, adaptedFontStyle, this.props.titleStyle]}
                {...getAccessibilityConfig({
                  accessible: false
                })}
              >
                {this.props.title}
              </Text>
              {this.props.showDot
                ? <Image
                  style={[styles.dot, this.props.dotStyle]}
                  resizeMode="contain"
                  source={dot}
                />
                : null
              }
            </View>
            {this.props.subtitle ?
              <Text
                numberOfLines={subtitleLine}
                allowFontScaling={this.props.allowFontScaling}
                style={[Styles.common.subtitle, this.props.subtitleStyle, adaptedFontStyle]}
                {...getAccessibilityConfig({
                  accessible: false
                })}
              >
                {this.props.subtitle}
              </Text>
              : null
            }
          </View>
          <View style={{ width: 5 }} />
          <View style={[styles.right, extraRightStyle]}>
            {this.props.value ?
              <Text
                numberOfLines={valueLine}
                allowFontScaling={this.props.allowFontScaling}
                ellipsizeMode="tail"
                style={[Styles.common.subtitle, this.props.valueStyle, valueStyle, adaptedFontStyle]}
                {...getAccessibilityConfig({
                  accessible: false
                })}
              >
                {this.props.value}
              </Text>
              : null
            }
          </View>
          {!this.props.hideArrow
            ? <Image
              style={styles.icon}
              source={Images.common.right_arrow}
            />
            : null
          }
        </TouchableView>
        {this.renderSeparator()}
      </View>
    );
  }
  renderSeparator() {
    if (!this.props.showSeparator) return null;
    return this.props.separator || <Separator style={{ marginLeft: Styles.common.padding }} />;
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: PADDING,
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    flex: 1
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE
  },
  dot: {
    marginTop: -1,
    marginLeft: 1,
    width: dotSize,
    height: dotSize
  }
});