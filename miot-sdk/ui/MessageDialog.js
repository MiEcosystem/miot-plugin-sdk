/**
 * @export
 * @module miot/ui/MessageDialog
 * @description 消息对话框
 * @mark andr done
 */
import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
export default class MessageDialog extends Component {
  
  static defaultProps = {
    title:'',
    message:''
  }
  static propTypes = {
    /**
     * 
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
     * 副标题，内容
     * @member {string}
     */
    message: PropTypes.string,
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