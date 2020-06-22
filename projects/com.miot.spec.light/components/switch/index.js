import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

function getSource(on) {
  switch (true) {
    case on: return require('./res/switch-on.png');
    default: return require('./res/switch-off.png');
  }
}

export default class extends PureComponent {
  render() {
    let { on } = this.props;
    let source = getSource(on);
    return (
      <View>
        <Image source={source} />
      </View>
    );
  }
}
