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
     * @member {boolean}
     */
    visible: PropTypes.bool,
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
     * @member {boolean}   
     */
    singleLine: PropTypes.bool,
    /**
     * 
     * @event    
     */
    onConfirm: PropTypes.func,
    /**
     * 
     * @event 
     */
    onCancel: PropTypes.func,
    /**
     * 
     * @event    
     */
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}