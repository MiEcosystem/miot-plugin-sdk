import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Images, Styles } from '../../resources';
import Checkbox from '../Checkbox/Checkbox';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
const thinHeight = 50; // 无副标题时的高度
const fatHeight = 60; // 有副标题时的高度
const checkboxSize = 20;
/**
 * @description 选择列表项的类型
 * @enum {string}
 */
const TYPE = {
  /**
   * 无状态列表项
   */
  STATELESS: 'stateless',
  /**
   * 单选列表项
   */
  SINGLE: 'single',
  /**
   * 多选列表项
   */
  MULTIPLE: 'multiple'
};
Object.freeze(TYPE);
/**
 * @export
 * @author Geeook
 * @since 10022
 * @module ChoiceItem
 * @description 可选择的列表项，可以单选或者多选
 * @property {TYPE} type - 列表项的类型，是单选还是多选
 * @property {string} title - 标题文字
 * @property {string} subtitle - 副标题文字
 * @property {style} titleStyle - 10040新增 设置title的style
 * @property {style} subtitleStyle - 10040新增 设置subtitle的style
 * @property {boolean} selected - 是否选中，`TYPE.SINGLE`和`TYPE.MULTIPLE`可用
 * @property {string} color - 选中态颜色，单选时表示选中文字颜色，多选时表示勾选框勾选背景颜色，`TYPE.SINGLE`和`TYPE.MULTIPLE`可用
 * @property {number} icon - 列表项被选中时的选中图标，放在文字前面，`TYPE.SINGLE`可用
 * @property {function} onPress - 点击列表项的回调函数
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {number} titleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 */
export default class ChoiceItem extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf([TYPE.STATELESS, TYPE.SINGLE, TYPE.MULTIPLE]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    selected: PropTypes.bool,
    color: PropTypes.string,
    icon: PropTypes.number,
    onPress: PropTypes.func,
    unlimitedHeightEnable: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    titleNumberOfLines: PropTypes.number,
    subtitleNumberOfLines: PropTypes.number,
    titleStyle: Text.propTypes.style,
    subtitleStyle: Text.propTypes.style,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  }
  static defaultProps = {
    type: TYPE.STATELESS,
    selected: false,
    color: Styles.common.MHGreen,
    icon: Images.common.selectIcon,
    unlimitedHeightEnable: false,
    allowFontScaling: true,
    titleNumberOfLines: 1,
    subtitleNumberOfLines: 1,
    titleStyle: {},
    subtitleStyle: {}
  }
  /**
   * @description 选择列表项的类型
   * @enum {string}
   */
  static TYPE = TYPE
  constructor(props, context) {
    super(props, context);
    referenceReport('ChoiceItem');
    this.state = {
      selected: props.selected
    };
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.selected !== this.state.selected) {
      this.setState({ selected: newProps.selected });
    }
  }
  renderIcon() {
    if (this.props.type === TYPE.STATELESS) return null;
    if (!this.state.selected
      || this.props.type === TYPE.MULTIPLE) {
      return (
        <View
          style={{
            width: 38,
            height: fatHeight
          }}
        />);
    }
    const paddingTop = { paddingTop: 20 };
    if (this.props.subtitle) paddingTop.paddingTop = 16;
    return (
      <View style={[styles.iconContainer, paddingTop]}>
        <Image
          source={this.props.icon}
          resizeMode="contain"
          style={styles.icon}
        />
      </View>
    );
  }
  renderText() {
    const color = { color: "#000000" };
    const textAlign = {};
    if (this.state.selected) color.color = this.props.color;
    if (this.props.type === TYPE.STATELESS) textAlign.textAlign = 'center';
    let adaptedFontStyle = {};
    if (!this.props.unlimitedHeightEnable) {
      adaptedFontStyle = { height: undefined, lineHeight: undefined };
    }
    return (
      <View style={styles.textContainer}>
        <Text
          style={[styles.title, color, textAlign, adaptedFontStyle, this.props.titleStyle]}
          numberOfLines={this.props.titleNumberOfLines}
          allowFontScaling={this.props.allowFontScaling}>
          {this.props.title}
        </Text>
        {
          this.props.subtitle
            ? <Text
              style={[styles.subtitle, textAlign, adaptedFontStyle, this.props.subtitleStyle]}
              numberOfLines={this.props.subtitleNumberOfLines}
              allowFontScaling={this.props.allowFontScaling}>
              {this.props.subtitle}
            </Text>
            : null
        }
      </View >
    );
  }
  renderCheckbox() {
    if (this.props.type !== TYPE.MULTIPLE) return null;
    return (
      <Checkbox
        style={{
          width: checkboxSize,
          height: checkboxSize,
          borderRadius: checkboxSize / 2,
          marginRight: 20
        }}
        checked={this.state.selected}
        checkedColor={this.props.color}
        onValueChange={(selected) => this._onValueChange(selected)}
      />
    );
  }
  render() {
    const height = { height: thinHeight };
    if (this.props.subtitle) {
      height.height = fatHeight;
    }
    let heightStyle = {
      minHeight: height.height,
      height: height.height
    };
    if (this.props.unlimitedHeightEnable) {
      heightStyle.height = null;
    }
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.05)"
        onPress={() => this._onPress()}
        {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.radio,
          accessibilityLabel: this.props.accessibilityLabel,
          accessibilityHint: this.props.accessibilityHint,
          accessibilityState: {
            selected: this.state.selected,
            checked: this.state.selected
          }
        })}
      >
        <View style={[styles.container, heightStyle]}>
          {this.renderIcon()}
          {this.renderText()}
          {this.renderCheckbox()}
        </View>
      </TouchableHighlight>
    );
  }
  _onValueChange(selected) {
    // this.state.selected = selected;
    this.setState({
      selected
    });
    if (this.props.onPress) {
      this.props.onPress(selected);
    }
  }
  _onPress() {
    const { type } = this.props;
    let selected = this.state.selected;
    if (type !== TYPE.STATELESS) {
      if (type === TYPE.MULTIPLE) selected = !selected;
      if (type === TYPE.SINGLE) selected = true;
      this.setState({ selected });
    }
    if (this.props.onPress) {
      this.props.onPress(selected);
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 38,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  icon: {
    width: 10,
    height: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'stretch',
    fontSize: 15,
    lineHeight: 20
  },
  subtitle: {
    alignSelf: 'stretch',
    fontSize: 12,
    color: "#666666",
    lineHeight: 16
  }
});