/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @module miot/ui/MultiChoseDialog
 * @description 多选对话框
 * 
 * @example
 * import {MultiChoseDialog} from 'miot/ui'
 * //dataSource列表数据中，dataKey所定义的值('dataKeyName') 对应项为展示的名称， 与checkKey所定义的值('checkKeyName') 对应的boolean值表示是否选中
 * <MultiChoseDialog 
 * dataSource = {[{'dataKeyName':'displayName1','checkKeyName':false}, {'dataKeyName':'displayName2','checkKeyName':true} ]}
 * dataKey = {'dataKeyName'}
 * checkKey = {'checkKeyName'}
 * />
 * 
 * @example
 * 某一行选中状态变更回调
 * @member {func}
 * @description 回调会带一个 object 的参数，object.position为点击第几个条目，object.check 为选中状态
 * @example
 * import {MultiChoseDialog} from 'miot/ui'
 * <MultiChoseDialog 
 * ...
 * onCheck={res => {
 *  console.log('click at row ', res.position, ' with checked ', res.check)
 * }}
 * />
 *
 * @property {bool} visible 是否可见
 * @property {bool} cancelable 是否允许点击空白区域取消显示,仅限Android
 * @property {string} title 标题
 * @property {number} timeout 超时自动隐藏，设置0或者不设置不会自动隐藏
 * @property {array} dataSource 数据源，建议 array 的每个item 是一个 object，object 至少有展示条目名称、选中状态两个字段
 * @property {string} dataKey 用于表示显示的字段名，dataSource每个条目显示名称 object 的字段名
 * @property {string} checkKey 用于表示选中的字段名，dataSource每个条目选中状态 object 的字段名
 * @property {string} cancel 取消标题
 * @property {string} confirm 确认标题
 * @property {func} onConfirm 确认点击回调
 * @property {func} onCancel 取消点击回调
 * @property {func} onDismiss 对话框消失回调
 * @property {func} onCheck 某一行选中状态变更回调
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { requireNativeComponent, ViewPropTypes } from 'react-native';
export default class MultiChoseDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    title: PropTypes.string,
    timeout: PropTypes.number,
    dataSource: PropTypes.array,
    dataKey: PropTypes.string,
    checkKey: PropTypes.string,
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