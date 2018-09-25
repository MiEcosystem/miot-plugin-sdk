/**
 * @export
 * @module miot/ui/SingleDialog
 * @description 单选对话框
 * @mark andr done
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
    dataSource: PropTypes.array,
    /**
     * 
     * @member    
     */
    dataKey: PropTypes.string,
    /**
     * 
     * @member    
     */
    check: PropTypes.number,
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
    onCheck: PropTypes.func,
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