/**
 * @export
 * @module miot/ui/MultiChoseDialog
 * @description 多选对话框
 * @mark andr done
 */
import React, {Component} from 'react';
import { requireNativeComponent, ViewPropTypes, } from 'react-native';
import PropTypes from 'prop-types';
export default class MultiChoseDialog extends Component {
  static propTypes = {
    /**
     * 是否显示
     * @member {bool}
     */
    visible: PropTypes.bool,
    /**
     * 是否允许点击空白区域取消显示   
     * Android Only iOS无效
     * @member {bool}
     */
    cancelable: PropTypes.bool,
    /**
     * 标题
     * @member {string}
     */
    title: PropTypes.string,
    /**
     * 超时自动隐藏，设置0或者不设置不会自动隐藏
     * @member {number}
     */
    timeout: PropTypes.number,
    /**
     * 选择数据源
     * @member {array}
     * @description 建议 array 的每个item 是一个 object，object 至少有展示条目名称、选中状态两个字段
     * @example
     * import {MultiChoseDialog} from 'miot/ui'
     * //dataSource列表数据中，dataKey所定义的值('dataKeyName') 对应项为展示的名称， 与checkKey所定义的值('checkKeyName') 对应的boolean值表示是否选中
     * <MultiChoseDialog 
     * dataSource = {[{'dataKeyName':'displayName1','checkKeyName':false}, {'dataKeyName':'displayName2','checkKeyName':true} ]}
     * dataKey = {'dataKeyName'}
     * checkKey = {'checkKeyName'}
     * />
     */
    dataSource: PropTypes.array,
    /**
     * 用于表示显示的字段名
     * @member {string}
     * @description dataSource每个条目显示名称 object 的字段名
     */
    dataKey: PropTypes.string,
    /**
     * 用于表示选中的字段名
     * @member {string}
     * @description dataSource每个条目选中状态 object 的字段名
     */
    checkKey: PropTypes.string,
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
     */
    onCheck: PropTypes.func,
    /**
     * 弹窗消失回调
     * @member {func}
     */
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}