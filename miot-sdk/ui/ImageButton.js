/**
 * @export
 * @module miot/ui/ImageButton
 * @description 按钮
 *
 */
import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../utils/accessibility-helper';
import { referenceReport } from '../decorator/ReportDecorator';
export default class ImageButton extends React.Component {
  constructor(props) {
    super(props);
    referenceReport('ImageButton');
    this.state = {
      buttonPressed: false
    };
  }
  static initialState = {
    buttonPressed: false
  };
  static propTypes = {
    source: PropTypes.any,
    highlightedSource: PropTypes.any,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    source: null,
    highlightedSource: null,
    onPress: null
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
    let { source, highlightedSource, disabled, onPress, accessible, accessibilityLabel, accessibilityHint, ...rest } = this.props;
    if (this._isButtonPressed() && highlightedSource) {
      source = highlightedSource;
    }
    return (
      <TouchableWithoutFeedback
        disabled={ disabled }
        onPress={ onPress }
        onPressIn={ this._buttonPressIn.bind(this) }
        onPressOut={ this._buttonPressOut.bind(this) }
        { ...getAccessibilityConfig({
          accessible: accessible,
          accessibilityRole: AccessibilityRoles.imagebutton,
          accessibilityLabel: accessibilityLabel,
          accessibilityHint: accessibilityHint,
          accessibilityState: {
            disabled: !!disabled
          }
        }) }
      >
        <Image
          source={ source }
          { ...rest }/>
      </TouchableWithoutFeedback>
    );
  }
}