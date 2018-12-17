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
     * 是否可见
     * @member {bool}
     */
    cancelable: PropTypes.bool,
    /**
     * 标题
     * @member {string}
     */
    title: PropTypes.string,
    /**
     *
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
     *
     * @member {string}
     */
    cancel: PropTypes.string,
    /**
     *
     * @member {string}
     */
    confirm: PropTypes.string,
    /**
     *
     * @member {bool}
     */
    singleLine: PropTypes.bool,
    /**
     *
     * @member {func}
     */
    onConfirm: PropTypes.func,
    /**
     * @member {func}
     */
    onCancel: PropTypes.func,
    /**
     *
     * @member {func}
     */
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}