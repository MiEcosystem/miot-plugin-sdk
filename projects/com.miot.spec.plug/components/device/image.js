import React, { PureComponent } from 'react';
import { Image } from 'react-native';

const IMAGE = {
  sourceOn: require('./res/device-on.png'),
  sourceOff: require('./res/device-off.png')
};

export default class extends PureComponent {
  render() {
    let { on } = this.props;
    let source = on ? IMAGE.sourceOn : IMAGE.sourceOff;
    return (
      <Image source={source} />
    );
  }
}
