/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 23
 * @module miot/ui/SingleChoseDialog
 * @description 单选对话框
 * 
 * @example
 * import {SingleChoseDialog} from 'miot/ui'
 * <SingleChoseDialog 
 * dataSource={['message0', 'message1', 'message2', 'message3', 'message4', 'message5', 'message6']}
 * ...
 * />
 *
 * @property {bool} visible 是否可见
 * @property {bool} cancelable 是否允许点击空白区域取消显示,仅限Android
 * @property {string} title 标题
 * @property {number} timeout 超时自动隐藏，设置0或者不设置不会自动隐藏
 * @property {array<string>} dataSource 数据源
 * @property {number} check 选中第几个数据源
 * @property {string} cancel 取消标题
 * @property {string} confirm 确认标题
 * @property {func} onConfirm 确认点击回调
 * @property {func} onCancel 取消点击回调
 * @property {func} onDismiss 对话框消失回调
 * @property {func} onCheck 某一行选中状态变更回调
 */
import React, { Component } from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
export default class SingleChoseDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    title: PropTypes.string,
    timeout: PropTypes.number,
    dataSource: PropTypes.array,
    check: PropTypes.number,
    cancel: PropTypes.string,
    confirm: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onCheck: PropTypes.func,
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}