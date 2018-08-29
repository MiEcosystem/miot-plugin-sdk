/**
 * @export
 * @module miot/ui/LoadingDialog
 * @description 加载对话框
 * @mark andr done
 */

import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

const RCTLoadingDialog = requireNativeComponent('RCTLoadingDialog', null);

export default class ProgressDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };

  render() {
    return <RCTLoadingDialog {...this.props}
                              onDismiss={(event) => {
                                if (this.props.onDismiss) {
                                  this.props.onDismiss(event.nativeEvent);
                                }
                              }}/>;
  }
}
