/**
 * @export
 * @module miot/ui/ProgressDialog
 * @description 进度对话框
 * @mark andr done
 */
import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
export default class ProgressDialog extends Component {
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
    max: PropTypes.number,
    /**
     * 
     * @member    
     */
    progress: PropTypes.number,
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