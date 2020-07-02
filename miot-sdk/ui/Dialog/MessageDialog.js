import PropTypes, { array } from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '../../resources';
import Checkbox from '../Checkbox/Checkbox';
import Separator from '../Separator';
import AbstractDialog from "./AbstractDialog";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
const paddingHorizontal = 29; // 内容的左右边距
const paddingVertical = 27; // 内容的上下边距
const paddingTop = 13; // 内容和下划线文字间距
/**
 * @description 消息弹窗的类型
 * @enum {string}
 */
const TYPE = {
  /**
   * 普通，只有提示文字
   */
  SIMPLE: 'simple',
  /**
   * 带下划线超链接
   */
  UNDERLINE: 'underline',
  /**
   * 带勾选框
   */
  CHECKBOX: 'checkbox'
};
Object.freeze(TYPE);
/**
 * 下划线超链接或者勾选框需要的其他数据
 * @typedef {Object} Extra
 * @property {boolean} checked - 勾选框的初始勾选状态，只对`TYPE.CHECKBOX`有效
 * @property {function} onPress - 点击下划线链接的回调函数，只对`TYPE.UNDERLINE`有效
 */
/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的样式
 * @property {bool} allowFontScaling - 10040新增 text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @property {number} numberOfLines - 10040新增 text文字的行数， 默认 undefined (兼容旧版)
 * @property {function} callback - 点击按钮的回调函数
 */
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module MessageDialog
 * @description 消息弹窗，用于提示用户
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {TYPE} type - 消息弹窗的类型。是否只有提示文字，是否有下划线超链接，或者是否有勾选项，详见 `TYPE`，默认 `TYPE.SIMPLE`
 * @param {string} color - 下划线超链接的文字颜色 / 勾选框的勾选颜色，默认米家绿
 * @param {string} title - 标题文字，不传或者为空字符串将不显示标题栏，默认不显示
 * @param {string} message - 提示信息文字，可显示单行或者多行，最多**15**行
 * @param {ViewPropTypes.style} messageStyle - 提示信息文字自定义样式
 * @param {string} extraText - 下划线超链接的文字 / 勾选框右侧的说明文字
 * @param {Extra} extra - 下划线超链接或者勾选框需要的其他数据，只对`TYPE.UNDERLINE`和`TYPE.CHECKBOX`有效
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.titleNumberOfLines - 10040新增 控制 title 文字的行数， 默认 1行
 * @param {number} dialogStyle.messageNumberOfLines - 10040新增 控制 message 文字的行数，默认 15行
 * @param {number} dialogStyle.extraTextNumberOfLines - 10040新增 控制 extraText 文字的行数，默认 1行
 * @param {bool} dialogStyle.unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {ViewPropTypes.style} dialogStyle.titleStyle - 10040新增 控制title 文字的样式
 * @param {ViewPropTypes.style} dialogStyle.extraTextStyle - 10040新增 控制extraText 文字的样式
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 */
export default class MessageDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    type: PropTypes.oneOf([TYPE.SIMPLE, TYPE.UNDERLINE, TYPE.CHECKBOX]),
    color: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    messageStyle: Text.propTypes.style,
    extraText: PropTypes.string,
    extra: PropTypes.object,
    buttons: PropTypes.arrayOf(PropTypes.object),
    dialogStyle: PropTypes.object,
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    // UNDERLINE 或CHECKBOX 才有效
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  }
  static defaultProps = {
    type: TYPE.SIMPLE,
    color: Styles.common.MHGreen,
    message: `请自定义提示文案`,
    messageStyle: {},
    dialogStyle: {
      allowFontScaling: true,
      unlimitedHeightEnable: false,
      titleNumberOfLines: 1,
      messageNumberOfLines: 15,
      extraTextNumberOfLines: 1,
      titleStyle: {},
      extraTextStyle: {}
    },
    extra: {}
  }
  /**
   * @description 消息弹窗的类型
   * @enum {string}
   */
  static TYPE = TYPE
  constructor(props, context) {
    super(props, context);
    referenceReport('Dialog/MessageDialog');
    this.state = {
      checked: props.extra.checked || false
    };
    this.process(props);
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      checked: props.extra.checked || false
    });
    this.process(props);
  }
  process(props) {
    // this.state.checked = props.extra.checked || false;
    // this.setState({
    //   checked: props.extra.checked || false
    // });
    this.hasPressUnderlineText = false;
    // 拦截确认按钮的回调函数，传入 MesaageDialog 的一些信息
    const buttons = props.buttons;
    if (buttons instanceof Array) {
      const button = buttons[buttons.length - 1];
      if (button && button.callback) {
        const callbackOrigin = button.callback;
        button.callback = () => {
          if (props.type === TYPE.UNDERLINE) {
            callbackOrigin({ hasPressUnderlineText: this.hasPressUnderlineText });
          } else if (props.type === TYPE.CHECKBOX) {
            callbackOrigin({ checked: this.state.checked });
          } else {
            callbackOrigin({});
          }
        };
      }
    }
    this.buttons = buttons;
  }
  renderExtra() {
    let extraTextNumberOfLines = 1;
    if (this.props.dialogStyle && this.props.dialogStyle.hasOwnProperty('extraTextNumberOfLines')) {
      extraTextNumberOfLines = this.props.dialogStyle.extraTextNumberOfLines;
    }
    switch (this.props.type) {
      case TYPE.SIMPLE:
        return null;
      case TYPE.UNDERLINE:
        return (
          <View style={[styles.extraContainer, { paddingTop }]} {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.link,
            accessibilityLabel: this.props.accessibilityLabel || this.props.extraText,
            accessibilityHint: this.props.accessibilityHint
          })}>
            <Text
              numberOfLines={extraTextNumberOfLines}
              allowFontScaling={this.props.dialogStyle.allowFontScaling}
              style={[styles.underlineText, { color: this.props.color }, this.props.dialogStyle.extraTextStyle]}
              onPress={() => this.onPressUnderlineText()}
            >
              {this.props.extraText || ''}
            </Text>
          </View>
        );
      case TYPE.CHECKBOX:
        return (
          <TouchableOpacity
            onPress={() => this.onPressCheckbox()}
            activeOpacity={1}
            style={{ paddingTop }}
            {...getAccessibilityConfig({
              accessible: false
            })}
          >
            <View style={styles.extraContainer} {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.checkbox,
              accessibilityLabel: this.props.accessibilityLabel || this.props.extraText,
              accessibilityHint: this.props.accessibilityHint,
              accessibilityState: {
                disabled: false,
                checked: this.state.checked
              }
            })}>
              <Checkbox
                checked={this.state.checked}
                checkedColor={this.props.color}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10
                }}
                onValueChange={(checked) => {
                  this.setState({
                    checked: checked
                  });
                }}
              />
              <Text
                style={[styles.checkboxText, this.props.dialogStyle.extraTextStyle]}
                numberOfLines={extraTextNumberOfLines}
                allowFontScaling={this.props.dialogStyle.allowFontScaling}
              >
                {this.props.extraText || ''}
              </Text>
            </View>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  }
  render() {
    if (!this.props.visible) return null;
    const showTitle = !!this.props.title;
    const paddingTop = showTitle ? { paddingTop: 0 } : {}; // 有标题的时候，去掉顶部边距
    let messageNumberOfLines = 15;
    if (this.props.dialogStyle && this.props.dialogStyle.hasOwnProperty('messageNumberOfLines')) {
      messageNumberOfLines = this.props.dialogStyle.messageNumberOfLines;
    }
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.props.visible}
        title={this.props.title}
        showTitle={showTitle}
        buttons={this.buttons}
        dialogStyle={this.props.dialogStyle}
        onDismiss={() => this._onDismiss()}
        {...getAccessibilityConfig({
          accessible: this.props.accessible
        })}
      >
        <View style={[styles.container, paddingTop]}>
          <Text
            numberOfLines={messageNumberOfLines}
            allowFontScaling={this.props.dialogStyle.allowFontScaling}
            style={[styles.message, this.props.messageStyle]}
            {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.text
            })}
          >
            {this.props.message || ''}
          </Text>
          {this.renderExtra()}
        </View>
        <Separator />
      </AbstractDialog>
    );
  }
  _onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  }
  onPressUnderlineText() {
    this.hasPressUnderlineText = true;
    const { onPress } = this.props.extra;
    onPress && onPress();
  }
  onPressCheckbox() {
    this.setState({ checked: !this.state.checked });
  }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal,
    paddingVertical,
    backgroundColor: '#fff',
    borderRadius: Styles.dialog.modal.borderRadius
  },
  message: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    fontFamily: 'MI-LANTING--GBK1-Light',
    fontWeight: '400'
  },
  underlineText: {
    flex: 1,
    textDecorationLine: 'underline',
    fontSize: 14
  },
  extraContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#999'
  }
});