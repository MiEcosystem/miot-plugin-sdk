import React, { PureComponent, Fragment } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import getPercent from '../../modules/getPercent';
import { adjustSize } from '../../modules/consts';

const IMAGE = {
  sourceOn: require('./res/device-on.png'),
  sourceOff: require('./res/device-off.png'),
  // sourceDark: require('./res/device-dark.png'),
  sourceColorful: require('./res/device-colorful.png')
};

export default class extends PureComponent {
  render() {
    let { on, brightness, brightnessMin, brightnessMax, temperature, temperatureMin, temperatureMax } = this.props;
    let supportBrightness = brightness !== undefined;
    let supportTemperature = temperature !== undefined;
    let styleBrightness = {
      opacity: supportBrightness ? getPercent(brightness, brightnessMin, brightnessMax, 0, 0.3) : 1
    };
    let styleTemperature = {
      opacity: supportTemperature ? Math.log(getPercent(temperature, temperatureMin, temperatureMax) * getPercent(styleBrightness.opacity, 0, 0.3, 0.5, 1) + 1) / Math.log(1.8) : 0
    };
    return (
      <View style={Styles.container}>
        {(!on) ? (
          <Image source={IMAGE.sourceOff} style={[Styles.device]} />
        ) : ((!supportBrightness && !supportTemperature && on) ? (
          <Image source={IMAGE.sourceOn} style={[Styles.device]} />
        ) : (
          <Fragment>
            <Image source={IMAGE.sourceColorful} style={[Styles.device]} />
            {supportBrightness ? (
              <Image source={on ? IMAGE.sourceOn : IMAGE.sourceOff} style={[Styles.device, styleBrightness]} />
            ) : null}
            {supportTemperature ? (
              <Image source={IMAGE.sourceOn} style={[Styles.device, styleTemperature]} />
            ) : null}
          </Fragment>
        ))}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: adjustSize(315),
    height: adjustSize(315)
  },
  device: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: adjustSize(315),
    height: adjustSize(315),
    resizeMode: 'contain',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: '#f00',
    shadowRadius: 8
  }
});
