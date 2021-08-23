import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

import { Service, Device } from 'miot';
import render from './render-from-instance';
import { init, deinit } from './spec-helper';

// const MockInstance = require('./ddf.json');

export default class MiotSpecV3Demo extends Component {
  state = {
    doms: []
  };
  componentDidMount() {
    Service.spec.getSpecString(Device.deviceID).then((instance) => {
      if (this.willUnmount) {
        return;
      }
      // instance = MockInstance;
      let parsedInstance = typeof instance === 'string' ? JSON.parse(instance || '{}') : instance;
      let targetInstance = parsedInstance && parsedInstance.modules && parsedInstance.type && ['aiot-spec-v3'].includes(parsedInstance.type.split(':')[1]) ? parsedInstance : {
        modules: [{
          services: parsedInstance.services
        }]
      };
      init(targetInstance);
      this.setState({
        doms: render(targetInstance)
      });
    }).catch((e) => {
      this.setState({
        doms: [<Text key="xxx">{JSON.stringify(e)}</Text>]
      });
    });
  }
  componentWillUnmount() {
    this.willUnmount = true;
    deinit();
  }
  render() {
    const { doms } = this.state;
    return (
      <ScrollView style={Styles.contaner}>
        {doms}
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({

});
