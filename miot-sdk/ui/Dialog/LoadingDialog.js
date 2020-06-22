import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import { Styles } from '../../resources';
import AbstractDialog from "./AbstractDialog";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module LoadingDialog
 * @description 加载弹窗，显示加载旋转动画和提示信息
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} message - 显示文字
 * @param {number} timeout - Modal 隐藏的超时时间，如果不主动设置隐藏的话
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.textNumberOfLines - 10040新增 控制message 文字的行数， 默认 undefined (兼容旧版)
 * @param {bool} dialogStyle.unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {ViewPropTypes.style} dialogStyle.messageStyle - 10040新增 控制message 文字的样式
 * @param {function} onDismiss - Modal隐藏时的回调函数
 */
export default class LoadingDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    message: PropTypes.string,
    timeout: PropTypes.number,
    dialogStyle: PropTypes.object,
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible
  }
  static defaultProps = {
    dialogStyle: {
      allowFontScaling: true,
      unlimitedHeightEnable: false,
      messageStyle: {}
    }
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('Dialog/LoadingDialog');
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
    const timeout = this.props.timeout;
    if (timeout && typeof parseInt(timeout) === "number") {
      if (!this.state.visible) {
        this.timer = null;
        clearTimeout(this.timer);
      } else {
        if (!this.timer) {
          this.timer = setTimeout(() => {
            this.setState({ visible: false });
            this.props.onDismiss && this.props.onDismiss();
          }, parseInt(timeout));
        }
      }
    }
    let heightStyle = {
      height: styles.container.height,
      minHeight: styles.container.height
    };
    if (this.props.dialogStyle && this.props.dialogStyle.hasOwnProperty('textNumberOfLines')) {
      if (this.props.dialogStyle.textNumberOfLines > 1) {
        heightStyle.height = null;
      }
    }
    if (this.props.dialogStyle && this.props.dialogStyle.unlimitedHeightEnable) {
      heightStyle.height = null;
    }
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.state.visible}
        showTitle={false}
        canDismiss={false}
        showButton={false}
        accessible={this.props.accessible}
      >
        <View
          style={[styles.container, heightStyle]}
          {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.text
          })}
        >
          <BallIndicator
            style={styles.indicator}
            color="rgba(0,0,0,0.6)"
            size={20}
          />
          <Text
            style={[styles.message, this.props.dialogStyle.messageStyle]}
            allowFontScaling={this.props.dialogStyle.allowFontScaling}
            numberOfLines={this.props.dialogStyle.textNumberOfLines}
          >
            {this.props.message || ''}
          </Text>
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
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 27,
    borderRadius: Styles.dialog.modal.borderRadius
  },
  indicator: {
    position: 'absolute',
    left: 27,
    height: 20
  },
  message: {
    marginLeft: 15 + 20,
    flex: 1,
    fontSize: 15,
    color: 'rgba(0,0,0,0.8)'
  }
});