/**
 * @export
 * @module miot/ui/InputDialog
 * @description 输入对话框
 * @mark andr done
 */
import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
export default class InputDialog extends Component {
  static propTypes = {
    /**
     * 是否可见
     * @member {bool}
     */
    visible: PropTypes.bool,
    /**
     * 是否允许点击空白区域取消显示  
     * Android Only
     * @member {bool}
     */
    cancelable: PropTypes.bool,
    /**
     * 标题
     * @member {string}
     */
    title: PropTypes.string,
    /**
     * 副标题，内容
     * @member {string}
     */
    message: PropTypes.string,
    /**
     * 输入框placeholder，默认为空
     * @member {string}
     */
    placeholder: PropTypes.string,
    /**
     * 输入框默认初始值，默认为空
     * @member {string}
     */
    defaultText: PropTypes.string,
    /**
     * 超时自动隐藏，设置0或者不设置不会自动隐藏
     * @member {number}
     */
    timeout: PropTypes.number,
    /**
     * 取消标题
     * @member {string}
     */
    cancel: PropTypes.string,
    /**
     * 确认标题
     * @member {string}
     */
    confirm: PropTypes.string,
    /**
     * 是否单行显示
     * @member {bool}
     */
    singleLine: PropTypes.bool,
    /**
     * 确认点击回调
     * @member {func}
     */
    onConfirm: PropTypes.func,
    /**
     * 取消点击回调
     * @member {func}
     */
    onCancel: PropTypes.func,
    /**
     * 对话框消失回调
     * @member {func}
     */
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}