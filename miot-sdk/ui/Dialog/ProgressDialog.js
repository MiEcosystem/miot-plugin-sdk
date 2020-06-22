import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Styles } from '../../resources';
import AbstractDialog from "./AbstractDialog";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
const padding = 37;
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module ProgressDialog
 * @description 进度条弹窗，显示进度条和提示信息
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} message - 提示信息文字
 * @param {number} progress - 当前进度，默认`0`
 * @param {string} color - progressBar 填充颜色，默认米家绿
 * @param {string} unfilledColor - progressBar 未填充颜色，默认`#f1f1f1`
 * @param {string} textColor - 进度百分比文字颜色，默认米家绿
 * @param {bool} autoDismiss - 是否在进度条读完之后自动隐藏 Modal, 默认`false`
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中message是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.messageNumberOfLines - 10040新增 控制message 文字的行数， 默认 1行
 * @param {ViewPropTypes.style} dialogStyle.messageStyle - 10040新增 控制message 文字的样式
 * @param {ViewPropTypes.style} dialogStyle.progressTextStyle - 10040新增 进度百分比 文字的样式
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 */
export default class ProgressDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    message: PropTypes.string,
    progress: PropTypes.number,
    color: PropTypes.string,
    unfilledColor: PropTypes.string,
    textColor: PropTypes.string,
    autoDismiss: PropTypes.bool,
    dialogStyle: PropTypes.object,
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityValue: AccessibilityPropTypes.accessibilityValue
  }
  static defaultProps = {
    progress: 0,
    color: Styles.common.MHGreen,
    unfilledColor: '#f1f1f1',
    textColor: Styles.common.MHGreen,
    autoDismiss: false,
    dialogStyle: {
      allowFontScaling: true,
      messageNumberOfLines: 1,
      messageStyle: {},
      progressTextStyle: {}
    }
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('Dialog/ProgressDialog');
    this.state = {
      visible: this.props.visible
    };
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({ visible: newProps.visible });
    }
  }
  render() {
    if (this.props.autoDismiss
      && this.state.visible === true
      && this.props.progress >= 1) { // 传参不一定刚好等于1，可能大于1
      this.timer = setTimeout(() => {
        this.setState({ visible: false });
        this.props.onDismiss && this.props.onDismiss();
      }, 100);
    }
    const progressText = `${ Math.round(this.props.progress * 100) }%`;
    let messageNumberOfLines = 1;
    if (this.props.dialogStyle) {
      if (this.props.dialogStyle.hasOwnProperty('messageNumberOfLines') && this.props.dialogStyle.messageNumberOfLines > 1) {
        messageNumberOfLines = this.props.dialogStyle.messageNumberOfLines;
      }
    }
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.state.visible}
        showTitle={false}
        canDismiss={false}
        showButton={false}
        {...getAccessibilityConfig({
          accessible: false
        })}
      >
        <View style={styles.container} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.progressbar,
          accessibilityLabel: this.props.accessibilityLabel,
          accessibilityValue: this.props.accessibilityValue || {
            text: progressText
          }
        })}>
          <View style={styles.messageContainer}>
            <Text
              numberOfLines={messageNumberOfLines}
              style={[styles.message, { flex: 1 }, this.props.dialogStyle.messageStyle]}
              allowFontScaling={this.props.dialogStyle.allowFontScaling}
            >
              {this.props.message || ''}
            </Text>
            <Text
              style={[
                styles.message,
                { minWidth: 45, textAlign: 'right' },
                { color: this.props.textColor },
                this.props.dialogStyle.progressTextStyle
              ]}
              numberOfLines={1}
              allowFontScaling={this.props.dialogStyle.allowFontScaling}
            >
              {progressText}
            </Text>
          </View>
          <Progress.Bar
            style={{ marginBottom: messageNumberOfLines > 1 ? 10 : 0 }}
            progress={this.props.progress}
            color={this.props.color}
            unfilledColor={this.props.unfilledColor}
            width={Styles.dialog.modal.width - padding * 2}
            height={3}
            borderRadius={2.5}
            borderWidth={0.3}
            borderColor="#e5e5e5"
            useNativeDriver={true}
          />
        </View>
      </AbstractDialog>
    );
  }
  componentWillUnmount() {
    this.timer = null;
    clearTimeout(this.timer);
  }
}
const styles = StyleSheet.create({
  container: {
    minHeight: 86,
    backgroundColor: '#fff',
    paddingHorizontal: padding,
    justifyContent: 'center',
    borderRadius: Styles.dialog.modal.borderRadius
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  message: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.8)'
  }
});