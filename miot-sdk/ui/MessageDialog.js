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
  static propTypes = {
    /**
     * 
     * @member    
     */
    visible: PropTypes.bool,
    /**
     * 
     * @member    
     */
    title: PropTypes.string,
    /**
     * 
     * @member    
     */
    message: PropTypes.string,
    /**
     * 
     * @member    
     */
    cancel: PropTypes.string,
    /**
     * 
     * @member    
     */
    confirm: PropTypes.string,
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