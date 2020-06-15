/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @module miot/ui/ProgressDialog
 * @description 进度对话框，当进度到达max设置之后自动消失
 * 
 * @property {bool} visible 是否可见
 * @property {bool} cancelable 是否允许点击空白区域取消显示,仅限Android
 * @property {string} title 标题
 * @property {string} message 副标题，内容
 * @property {number} max 最大进度值
 * @property {number} progress 当前进度值
 * @property {func} onDismiss 对话框消失回调
 * @property {number} timeout 超时自动隐藏，设置0或者不设置不会自动隐藏
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { requireNativeComponent, ViewPropTypes } from 'react-native';
import { referenceReport } from '../decorator/ReportDecorator';
export default class ProgressDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    timeout: PropTypes.number,
    max: PropTypes.number,
    progress: PropTypes.number,
    onDismiss: PropTypes.func,
    ...ViewPropTypes
  };
  constructor(props, context) {
    super(props, context);
    referenceReport('ProgressDialog');
  }
  render() {
     return null
  }
}