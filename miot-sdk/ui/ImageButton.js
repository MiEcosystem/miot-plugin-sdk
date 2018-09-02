/**
 * @export
 * @module miot/ui/ImageButton
 * @description 按钮
 *
 */
import React from 'react';
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
export default class ImageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonPressed: false,
    }
  }
  static initialState = {
    buttonPressed: false,
  };
  static defaultProps = {
    source: null,
    highlightedSource: null,
    onPress: null,
  };
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
    let source = this.props.source;
    if (this._isButtonPressed() && this.props.highlightedSource) {
      source = this.props.highlightedSource;
    }
    // const Touchable =
    //   Platform.OS === 'android' ? TouchableNativeFeedback : TouchableWithoutFeedback;
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressIn={this._buttonPressIn.bind(this)}
        onPressOut={this._buttonPressOut.bind(this)}
      >
        <Image
          style={this.props.style}
          source={source} />
      </TouchableWithoutFeedback>
    );
  }
};
// module.exports = ImageButton;