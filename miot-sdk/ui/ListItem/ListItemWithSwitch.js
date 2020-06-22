'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { Styles } from '../../resources';
import TouchableView from '../TouchableView';
import Separator from '../Separator';
import Switch from '../Switch';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
const { width } = Dimensions.get('window');
const THIN_HEIGHT = 50;
const PADDING = 24;
/**
 * @export public
 * @doc_name 列表控件
 * @doc_index 2
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module ListItemWithSwitch
 * @description 带开关的列表项
 * @property {string} title - 左侧主标题
 * @property {string} subtitle - 左侧副标题，主标题下方
 * @property {string} valueText - 主标题右侧文案
 * @property {bool} value - 开关状态，默认值 false
 * @property {bool} disabled - 是否禁用开关，默认值 false
 * @property {function} onPress - note: IMPORTANT 列表项点击事件，不传则不具有点击态（disabled）
 * @property {function} onValueChange - 开关切换事件
 * @property {bool} showSeparator - 是否显示分割线，默认值 true
 * @property {component} separator - 自定义分割线，不传将显示默认样式的分割线
 * @property {style} containerStyle - 列表项的自定义样式
 * @property {style} titleStyle - 主标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} valueTextStyle - 主标题右侧文案的自定义样式
 * @property {style} switchStyle - 主标题右侧文案的自定义样式
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {number} titleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 10040新增 设置subtitle字体显示的最大行数 默认为2
 * @property {number} valueNumberOfLines - 10040新增 设置value字体显示的最大行数 默认为1
 * @property {string} onTintColor - 开关按钮打开时的背景颜色
 * @property {string} tintColor - 开关按钮关闭时的背景颜色
 */
export default class ListItemWithSwitch extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    valueText: PropTypes.string,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    onValueChange: PropTypes.func.isRequired,
    showSeparator: PropTypes.bool,
    separator: PropTypes.element,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
    valueTextStyle: PropTypes.object,
    switchStyle: PropTypes.object,
    tintColor: PropTypes.string,
    onTintColor: PropTypes.string,
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
    valueText: '',
    value: false,
    disabled: false,
    showSeparator: true,
    containerStyle: {},
    titleStyle: {},
    subtitleStyle: {},
    valueTextStyle: {},
    switchStyle: {},
    tintColor: undefined,
    onTintColor: undefined,
    unlimitedHeightEnable: false,
    allowFontScaling: true
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('ListItemWithSwitch');
  }
  render() {
    let extraContainerStyle = {
      height: THIN_HEIGHT
    };
    if (this.props.subtitle) {
      extraContainerStyle = {
        paddingVertical: 8,
        height: 60
      };
    }
    let extraStyle = {};
    if (this.props.valueText) {
      extraStyle.maxWidth = (width - PADDING * 2) * 0.4;
      if (this.props.containerStyle.width) {
        extraStyle.maxWidth = (this.props.containerStyle.width - PADDING * 2) * 0.4;
      }
    }
    if (Platform.OS === 'android') {
      extraStyle.fontFamily = 'KMedium';
    }
    let adaptedFontStyle = {};
    let adaptedContainerStyle = {};
    if (this.props.unlimitedHeightEnable) {
      adaptedFontStyle = { height: undefined, lineHeight: undefined };
      adaptedContainerStyle = { height: undefined, paddingVertical: 10 };
    }
    let titleLine = this.props.titleNumberOfLines == undefined ? 1 : this.props.titleNumberOfLines;
    let subtitleLine = this.props.subtitleNumberOfLines == undefined ? 2 : this.props.subtitleNumberOfLines;
    let valueLine = this.props.valueNumberOfLines == undefined ? 1 : this.props.valueNumberOfLines;
    if (titleLine < 0) titleLine = 0;
    if (subtitleLine < 0) subtitleLine = 0;
    if (valueLine < 0) valueLine = 0;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableView
          disabled={!this.props.onPress}
          underlayColor={Styles.common.underlayColor}
          onPress={this.props.onPress}
          viewStyle={[styles.container, this.props.containerStyle, extraContainerStyle, adaptedContainerStyle]}
          {...(this.props.onPress ? getAccessibilityConfig({
            accessible: false
          }) : getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.switch,
            accessibilityLabel: this.props.accessibilityLabel,
            accessibilityHint: this.props.accessibilityHint,
            accessibilityState: {
              disabled: this.props.disabled,
              checked: this.props.value
            }
          }))}
          accessibilityActions={this.props.onPress ? [] : [
            { name: 'activate' }
          ]}
          onAccessibilityAction={this.props.onPress ? null : this.onAccessibilityAction}
        >
          <View
            style={styles.left}
            {...(!this.props.onPress ? {} : getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.button,
              accessibilityLabel: this.props.accessibilityLabel,
              accessibilityHint: this.props.accessibilityHint,
              accessibilityState: {
                disabled: this.props.disabled
              }
            }))} accessibilityActions={!this.props.onPress ? [] : [
              { name: 'activate' }
            ]} onAccessibilityAction={!this.props.onPress ? null : this.onAccessibilityAction}
          >
            <View style={[styles.up]}>
              <Text
                numberOfLines={titleLine}
                allowFontScaling={this.props.allowFontScaling}
                ellipsizeMode="tail"
                style={[Styles.common.title, extraStyle, this.props.titleStyle, adaptedFontStyle]}
                {...getAccessibilityConfig({
                  accessible: false
                })}
              >
                {this.props.title}
              </Text>
              {this.props.valueText ?
                <View style={[styles.up]}>
                  {/* <View style={[styles.separatorCol, !this.props.allowFontScaling ? {
                      alignSelf: 'stretch', width: 0.5, height: undefined, marginVertical: 8,
                    } : {}]} /> */}
                  <View style={[styles.separatorCol]} />
                  <Text
                    numberOfLines={valueLine}
                    ellipsizeMode="tail"
                    allowFontScaling={this.props.allowFontScaling}
                    style={[Styles.common.subtitle, this.props.valueTextStyle, { flex: 1 }, adaptedFontStyle]}
                    {...getAccessibilityConfig({
                      accessible: false
                    })}
                  >
                    {this.props.valueText}
                  </Text>
                </View>
                : null
              }
            </View>
            {this.props.subtitle ?
              <Text
                numberOfLines={subtitleLine}
                ellipsizeMode="tail"
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
          <View style={styles.right}>
            <Switch
              style={this.props.switchStyle}
              value={this.props.value}
              disabled={this.props.disabled}
              tintColor={this.props.tintColor}
              onTintColor={this.props.onTintColor}
              onValueChange={(value) => this._onValueChange(value)}
              {...(!this.props.onPress ? {} : getAccessibilityConfig({
                accessible: this.props.accessible,
                accessibilityLabel: this.props.accessibilityLabel || this.props.title,
                accessibilityHint: this.props.accessibilityHint
              }))}
            />
          </View>
          {/* </View> */}
        </TouchableView>
        {this.renderSeparator()}
      </View >
    );
  }
  renderSeparator() {
    if (!this.props.showSeparator) return null;
    return this.props.separator || <Separator style={{ marginLeft: Styles.common.padding }} />;
  }
  // // 父组件更新数据
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.value !== this.state.value) {
  //     this.setState({ value: nextProps.value });
  //   }
  // }
  _onValueChange(value) {
    // this.setState({ value });
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }
  onAccessibilityAction = ({ nativeEvent: { actionName } }) => {
    const { disabled, onValueChange, onPress, value } = this.props;
    if (disabled) {
      return;
    }
    if (actionName === 'activate' && typeof onValueChange === 'function') {
      onValueChange(!value);
    }
    if (actionName === 'activate' && typeof onPress === 'function') {
      onPress();
    }
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: PADDING,
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    flex: 4
  },
  right: {
    flex: 1,
    alignItems: 'flex-end'
  },
  up: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  separatorCol: {
    height: 14,
    width: 0.5,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});