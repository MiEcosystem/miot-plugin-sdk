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
const RCTProgressDialog = requireNativeComponent('RCTProgressDialog', null);
export default class ProgressDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    max: PropTypes.number,
    progress: PropTypes.number,
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
    return <RCTProgressDialog {...this.props}
                              onDismiss={(event) => {
                                if (this.props.onDismiss) {
                                  this.props.onDismiss(event.nativeEvent);
                                }
                              }}/>;
  }
}