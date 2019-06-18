/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 23
 * @module miot/ui/InputDialog
 * @description 输入对话框
 * @property {bool} visible 是否可见
 * @property {bool} cancelable 是否允许点击空白区域取消显示,仅限Android
 * @property {bool} singleLine 是否单行显示
 * @property {string} title 标题
 * @property {string} message 副标题，内容
 * @property {string} placeholder 输入框placeholder，默认为空
 * @property {string} defaultText 输入框默认初始值，默认为空
 * @property {string} cancel 取消标题
 * @property {string} confirm 确认标题
 * @property {func} onConfirm 确认点击回调
 * @property {func} onCancel 取消点击回调
 * @property {func} onDismiss 对话框消失回调
 * @property {number} timeout 超时自动隐藏，设置0或者不设置不会自动隐藏
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { requireNativeComponent, ViewPropTypes } from 'react-native';
export default class InputDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    placeholder: PropTypes.string,
    defaultText: PropTypes.string,
    timeout: PropTypes.number,
    cancel: PropTypes.string,
    confirm: PropTypes.string,
    singleLine: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}