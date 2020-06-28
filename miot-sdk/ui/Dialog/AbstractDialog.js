import { Host } from 'miot';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Modal, Platform, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { strings, Styles } from '../../resources';
import Separator from '../Separator';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
const { width, height } = Dimensions.get('window');
const underlayColor = 'rgba(0,0,0,.05)';
/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的样式
 * @param {bool} allowFontScaling - 10040新增 text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} numberOfLines - 10040新增 text文字的行数， 默认 undefined (兼容旧版)
 * @property {function} callback - 点击按钮的回调函数
 */
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module AbstractDialog
 * @description 通用弹窗容器，包括头部标题和底部按钮，内容自定义
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {style} style - modal 的自定义样式
 * @param {string} title - 标题
 * @param {string} subtitle - 副标题
 * @param {bool} showTitle - 是否显示标题，如果`false`，整个标题都不显示（包括副标题），默认`true`
 * @param {bool} showSubtitle - 是否显示副标题，默认`false`
 * @param {bool} canDismiss - 是否允许点击蒙层背景隐藏 Modal，默认`true`
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {bool} showButton - 是否显示按钮，默认`true`
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.titleNumberOfLines - 10040新增 控制title 文字的行数， 默认 1行
 * @param {number} dialogStyle.subTitleNumberOfLines - 10040新增 控制subTitle 文字的行数，默认 1行
 * @param {ViewPropTypes.style} dialogStyle.titleStyle - 10040新增 控制title 文字的样式
 * @param {ViewPropTypes.style} dialogStyle.subTitleStyle - 10040新增 控制subTitle 文字的样式
 * @param {function} onDismiss - 点击`Modal`内容外面/取消按钮/确定按钮，Modal隐藏时的回调函数
 */
export default class AbstractDialog extends React.Component {
    static propTypes = {
      animationType: PropTypes.string,
      visible: PropTypes.bool,
      style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
      title: PropTypes.string,
      subtitle: PropTypes.string,
      showTitle: PropTypes.bool,
      showSubtitle: PropTypes.bool,
      canDismiss: PropTypes.bool,
      buttons: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        style: PropTypes.any,
        callback: PropTypes.func,
        accessibilityHint: AccessibilityPropTypes.accessibilityHint
      })),
      showButton: PropTypes.bool,
      dialogStyle: PropTypes.object,
      onDismiss: PropTypes.func,
      accessible: AccessibilityPropTypes.accessible
    }
    static defaultProps = {
      animationType: 'fade',
      visible: false,
      showTitle: true,
      showSubtitle: false,
      dialogStyle: {
        unlimitedHeightEnable: false,
        allowFontScaling: true,
        titleNumberOfLines: 1,
        subTitleNumberOfLines: 1,
        titleStyle: {},
        subTitleStyle: {}
      },
      canDismiss: true,
      buttons: [
        {
          text: strings.cancel
        },
        {
          text: strings.ok,
          style: {
            color: Styles.common.MHGreen
          }
        }
      ],
      showButton: true
    }
    constructor(props, context) {
      super(props, context);
      referenceReport('Dialog/AbstractDialog');
      this.state = {
        visible: this.props.visible
      };
    }
    UNSAFE_componentWillReceiveProps(newProps) {
      if (newProps.visible !== this.state.visible) {
        this.setState({ visible: newProps.visible });
      }
    }
    /**
      * 判断 控件高度是否自适应，  true： 自适应，高度不固定， false： 高度固定
      * @private
    */
    _checkUnlimitedHeightEnable() {
      let result = false;
      if (this.props.dialogStyle && this.props.dialogStyle.hasOwnProperty('unlimitedHeightEnable')) {
        result = this.props.dialogStyle.unlimitedHeightEnable;
      }
      return result;
    }
    /**
     * 标题部分
     */
    renderTitle() {
      if (!this.props.showTitle) return null;
      const { titleHeightFat, titleHeightThin } = Styles.dialog.title;
      let height = {
        height: this.props.showSubtitle ? titleHeightFat : titleHeightThin
      };
      const marginBottom = this.props.showSubtitle ? { marginBottom: 6 } : {};
      let language = Host.locale.language;
      let titleLines = 1;
      if (language !== 'zh') {
        // 当前米家 app 语言不是中文
        titleLines = 3;
        height.maxHeight = 86;
      }
      // 只给安卓手机设置字体为空字符串
      let fontFamily = {};
      if (Platform.OS === 'android') {
        // Android 设备或模拟器
        fontFamily.fontFamily = '';
      }
      let titleNumberOfLines = titleLines;
      let subTitleNumberOfLines = 1;
      if (this.props.dialogStyle) {
        if (this.props.dialogStyle.hasOwnProperty('titleNumberOfLines') && this.props.dialogStyle.titleNumberOfLines > 1) {
          titleNumberOfLines = this.props.dialogStyle.titleNumberOfLines;
          height = null;
        }
        if (this.props.dialogStyle.hasOwnProperty('subTitleNumberOfLines') && this.props.dialogStyle.subTitleNumberOfLines > 1) {
          subTitleNumberOfLines = this.props.dialogStyle.subTitleNumberOfLines;
          height = null;
        }
        if (this._checkUnlimitedHeightEnable()) {
          // unlimitedHeightEnable = true, 不限制高度
          height = null;
        }
      }
      return (
        <View
          style={[styles.titleContainer, height]}
          {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.text
          })}
        >
          <Text
            numberOfLines={titleNumberOfLines}
            allowFontScaling={this.props.dialogStyle.allowFontScaling}
            style={[
              {
                width: Styles.dialog.modal.width * 0.75,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                color: '#000',
                marginTop: height ? 0 : 10
              },
              marginBottom,
              fontFamily,
              this.props.dialogStyle.titleStyle
            ]}
          >
            {this.props.title || ''}
          </Text>
          {this.props.showSubtitle
            ? <Text
              numberOfLines={subTitleNumberOfLines}
              allowFontScaling={this.props.dialogStyle.allowFontScaling}
              style={[Styles.dialog.subtitle, this.props.dialogStyle.subTitleStyle]}
            >
              {this.props.subtitle}
            </Text>
            : null
          }
        </View>
      );
    }
    /**
     * 中间内容
     */
    renderContent() {
      if (this.props.children) return this.props.children;
      return (
        <View {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.text
        })}>
          <Separator />
          <View style={styles.content}>
            <Text>⬆️可自定义标题和副标题⬆️</Text>
            <Text>可自定义内容</Text>
            <Text>⬇️可自定义按钮文字和样式⬇️</Text>
          </View>
          <Separator />
        </View>
      );
    }
    /**
     * 底部按钮
     */
    renderButtonGroup() {
      if (!this.props.showButton) return null;
      const buttons = this.props.buttons;
      if (!(buttons instanceof Array)) return null;
      if (buttons.length === 1) return this.renderOneButton(buttons);
      if (buttons.length === 2) return this.renderTwoButtons(buttons);
      else {
        if (__DEV__ && console.warn) {
          console.warn('只允许设置1～2个按钮');
        }
        return null;
      }
    }
    /**
     * 一个按钮
     * @param {object[]} buttons
     */
    renderOneButton(buttons) {
      const button0 = buttons[0];
      if (typeof button0 !== 'object') return null;
      let callback = button0.callback;
      if (callback === undefined || !(callback instanceof Function)) {
        callback = () => this.dismiss();
      }
      let height = Styles.dialog.buttons.height;
      let buttonNumberOfLines;
      if (button0.hasOwnProperty('numberOfLines')) {
        buttonNumberOfLines = button0.numberOfLines;
        if (buttonNumberOfLines > 1) {
          height = null;
        }
      }
      let allowFontScaling = this.props.dialogStyle.allowFontScaling;
      if (button0.hasOwnProperty('allowFontScaling')) {
        allowFontScaling = button0.allowFontScaling;
      }
      if (this._checkUnlimitedHeightEnable()) {
        height = null;
      }
      return (
        <View style={[Styles.dialog.buttons, { height: height }]}>
          <TouchableHighlight
            style={[
              Styles.dialog.button,
              {
                borderBottomLeftRadius: Styles.dialog.modal.borderRadius
              }
            ]}
            onPress={callback}
            underlayColor={underlayColor}
            {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.button,
              accessibilityHint: button0.accessibilityHint
            })}
          >
            <Text
              style={[Styles.dialog.buttonText, button0.style]}
              numberOfLines={buttonNumberOfLines}
              allowFontScaling={allowFontScaling}
            >
              {button0.text || strings.ok}
            </Text>
          </TouchableHighlight>
        </View>
      );
    }
    /**
     * 两个按钮
     * @param {object[]} buttons
     */
    renderTwoButtons(buttons) {
      const button0 = buttons[0], button1 = buttons[1];
      if (typeof button0 !== 'object'
            || typeof button1 !== 'object') return null;
      let callback0 = button0.callback;
      let callback1 = button1.callback;
      if (callback0 === undefined || !(callback0 instanceof Function)) {
        callback0 = () => this.dismiss();
      }
      if (callback1 === undefined || !(callback1 instanceof Function)) {
        callback1 = () => this.dismiss();
      }
      let height = Styles.dialog.buttons.height;
      let button0NumberOfLines;
      let button1NumberOfLines;
      if (button0.hasOwnProperty('numberOfLines')) {
        button0NumberOfLines = button0.numberOfLines;
        if (button0NumberOfLines > 1) {
          height = null;
        }
      }
      if (button1.hasOwnProperty('numberOfLines')) {
        button1NumberOfLines = button1.numberOfLines;
        if (button1NumberOfLines > 1) {
          height = null;
        }
      }
      if (this._checkUnlimitedHeightEnable()) {
        height = null;
      }
      let button0AllowFontScaling = this.props.dialogStyle.allowFontScaling;
      let button1AllowFontScaling = button0AllowFontScaling;
      if (button0.hasOwnProperty('allowFontScaling')) {
        button0AllowFontScaling = button0.allowFontScaling;
      }
      if (button1.hasOwnProperty('allowFontScaling')) {
        button1AllowFontScaling = button0.allowFontScaling;
      }
      return (
        <View style={[Styles.dialog.buttons, { height: height }]}>
          <TouchableHighlight
            style={[
              Styles.dialog.button,
              {
                borderBottomLeftRadius: Styles.dialog.modal.borderRadius
              }
            ]}
            onPress={callback0}
            underlayColor={underlayColor}
            {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.button,
              accessibilityHint: button0.accessibilityHint
            })}
          >
            <Text
              style={[Styles.dialog.buttonText, button0.style]}
              numberOfLines={button0NumberOfLines}
              allowFontScaling={button0AllowFontScaling}
            >
              {button0.text || strings.cancel}
            </Text>
          </TouchableHighlight>
          {
            Platform.select({
              android:
                <Separator type="column" style={{ flex: 1}} />,
              ios:
                <Separator type="column" style={{ height: '100%'}} />
            })
          }
          <TouchableHighlight
            style={[
              Styles.dialog.button,
              {
                borderBottomRightRadius: Styles.dialog.modal.borderRadius
              }
            ]}
            onPress={callback1}
            underlayColor={underlayColor}
            {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.button,
              accessibilityHint: button1.accessibilityHint
            })}
          >
            <Text
              style={[Styles.dialog.buttonText, { color: Styles.common.MHGreen }, button1.style]}
              numberOfLines={button1NumberOfLines}
              allowFontScaling={button1AllowFontScaling}
            >
              {button1.text || strings.ok}
            </Text>
          </TouchableHighlight>
        </View>
      );
    }
    render() {
      return (
        <Modal
          animationType={this.props.animationType}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => this.dismiss()}
        >
          <View style={Styles.dialog.background}>
            <TouchableWithoutFeedback onPress={() => this.dismiss()} >
              <View style={{ width, height }} />
            </TouchableWithoutFeedback>
            <View style={[Styles.dialog.modal, this.props.style]}>
              {this.renderTitle()}
              {this.renderContent()}
              {this.renderButtonGroup()}
            </View>
          </View>
        </Modal>
      );
    }
    /**
     * 隐藏 Modal
     */
    dismiss() {
      if (this.props.canDismiss) {
        this.setState({ visible: false });
        this.props.onDismiss && this.props.onDismiss();
      }
    }
}
const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: Styles.dialog.modal.width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  }
});