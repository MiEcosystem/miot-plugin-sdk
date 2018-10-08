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
     * @member {bool}   
     */
    visible: PropTypes.bool,
    /**
     * 
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
     * @member {number}   
     */
    max: PropTypes.number,
    /**
     * 
     * @member {number}
     */
    progress: PropTypes.number,
    /**
     * 
     * @member {func}    
     */
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}