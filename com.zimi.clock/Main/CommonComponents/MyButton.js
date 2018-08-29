'use strict';

import React from 'react';

import {
  Text,
  TouchableHighlight,
} from 'react-native';

export default class MyButton extends React.Component {

  render() {
    return (
      <TouchableHighlight
        disabled={this.props.disabled}
        style={this.props.style}
        underlayColor="rgba(200,200,200,0.3)"
        onPress={this.props.onClick}
      >
        <Text style={[this.props.fontStyle]}>
          {this.props.title}
        </Text>
      </TouchableHighlight>
    );
  }
}