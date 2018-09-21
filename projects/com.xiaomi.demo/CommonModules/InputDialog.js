import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

const RCTInputDialog = requireNativeComponent('RCTInputDialog', null);

export default class InputDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    cancel: PropTypes.string,
    confirm: PropTypes.string,
    singleLine: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };

  render() {
    return <RCTInputDialog {...this.props}
                             onDismiss={(event) => {
                               if (this.props.onDismiss) {
                                 this.props.onDismiss(event.nativeEvent);
                               }
                             }}
                             onCancel={(event) => {
                               if (this.props.onCancel) {
                                 this.props.onCancel(event.nativeEvent);
                               }
                             }}
                             onConfirm={(event) => {
                               if (this.props.onConfirm) {
                                 this.props.onConfirm(event.nativeEvent);
                               }
                             }}/>;
  }
}
