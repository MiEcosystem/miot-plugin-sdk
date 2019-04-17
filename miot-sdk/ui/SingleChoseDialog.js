/**
 * @export
 * @module miot/ui/SingleChoseDialog
 * @description 单选对话框
 * @mark andr done
 *
 */
import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
export default class SingleChoseDialog extends Component {
  static propTypes = {
    /**
     * 是否可见
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
     * 
     * @member {string}
     */
    title: PropTypes.string,
    /**
     * 超时自动隐藏，设置0或者不设置不会自动隐藏
     * @member {number}
     */
    timeout: PropTypes.number,
    /**
     * 数据源列表
     * @member {array<string>}
     * @example
     * <SingleChoseDialog 
     * dataSource={['message0', 'message1', 'message2', 'message3', 'message4', 'message5', 'message6']}
     * ...
     * />
     */
    dataSource: PropTypes.array,
    /**
     * 选中第几个数据源
     * @member {number}
     * @description 选中第几个数据的 index
     *
     */
    check: PropTypes.number,
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
     * 选中状态变更回调
     * @member {func}
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