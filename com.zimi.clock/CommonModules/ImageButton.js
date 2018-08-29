/**
 * @export
 * @module miot/ui/ImageButton
 * @description 按钮
 *
 */

// var  React  = require('react-native');
import { Platform } from 'react-native'
// const React = require('React');
import React from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
} from 'react-native';

export default class ImageButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonPressed: false,
      image: null,
      highlightedImage: null,
      onPress: null,
    }
  }

  static initialState = {
    buttonPressed: false,
  }

  static defaultProps = {
    image: null,
    highlightedImage: null,
    onPress: null,
  }

  _buttonPressIn() {
    this.setState({ buttonPressed: true });
  }

  _buttonPressOut() {
    this.setState({ buttonPressed: false });
  }

  _isButtonPressed() {
    return this.state.buttonPressed;
  }

  render() {
    var source = this.props.source;
    if (this._isButtonPressed() && this.props.highlightedSource) {
      source = this.props.highlightedSource;
    }
    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <Touchable
        onPress={this.props.onPress}
        onPressIn={this._buttonPressIn.bind(this)}
        onPressOut={this._buttonPressOut.bind(this)}
      >
        <Image
          style={this.props.style}
          source={source} />
      </Touchable>
    );
  }
};

// module.exports = ImageButton;
