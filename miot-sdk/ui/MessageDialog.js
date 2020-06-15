/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @module miot/ui/MessageDialog
 * @description 消息对话框
 * @property {bool} visible 是否可见
 * @property {bool} cancelable 是否允许点击空白区域取消显示,仅限Android
 * @property {string} title 标题
 * @property {string} message 副标题，内容
 * @property {string} cancel 取消标题
 * @property {string} confirm 确认标题
 * @property {func} onConfirm 确认点击回调
 * @property {func} onCancel 取消点击回调
 * @property {func} onDismiss 对话框消失回调
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { requireNativeComponent, ViewPropTypes } from 'react-native';
import { referenceReport } from '../decorator/ReportDecorator';
export default class MessageDialog extends Component {
  static defaultProps = {
    title: '',
    message: ''
  }
  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    cancel: PropTypes.string,
    confirm: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onDismiss: PropTypes.func,
    ...ViewPropTypes
  };
  constructor(props, context) {
    super(props, context);
    referenceReport('MessageDialog');
  }
  render() {
     return null
  }
}