import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

function getSource(on) {
  return require('./res/open.png');
}

export default class extends PureComponent {
  render() {
    let { on } = this.props;
    let source = getSource();
    return (
      <View>
        <Image width="95" height="95" source={source} />
      </View>
    );
  }
}
