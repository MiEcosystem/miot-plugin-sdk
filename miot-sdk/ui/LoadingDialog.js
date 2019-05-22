/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 23
 * @module miot/ui/LoadingDialog
 * @description 输入对话框
 * @property {bool} visible 是否可见
 * @property {bool} cancelable 是否允许点击空白区域取消显示,仅限Android
 * @property {string} title 标题
 * @property {string} message 副标题，内容
 * @property {func} onDismiss 对话框消失回调
 * @property {number} timeout 超时自动隐藏，设置0或者不设置不会自动隐藏
 */
import React, { Component } from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import native from '.././native'
export default class ProgressDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    timeout: PropTypes.number,
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
    let showText = this.props.message ? this.props.message : this.props.title;
     return null
  }
}