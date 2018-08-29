'use strict';

import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  TextInput,
  PixelRatio,
  StatusBar,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import { Package,Host } from "miot";

const APPBAR_HEIGHT = Host.isIOS ? 44 : 56;

export default class SceneMain extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      requestStatus: false,
    };
  }

  componentDidMount() {
    alert('Trigger: ' + JSON.stringify(Package.extraInfo.trigger));
    alert('Action: ' + JSON.stringify(Package.extraInfo.action));
    alert('Payload: ' + JSON.stringify(Package.extraInfo.payload));
  }

  render() {
    return (
      <View style={styles.containerAll} >
        <StatusBar barStyle='light-content' />
        <View style={styles.containerIconDemo}>
          <Image style={styles.iconDemo} source={this.props.app.sourceOfImage("control_home.png")} />
          <Text style={styles.iconText}>开发自定义智能场景</Text>
        </View>
        <View style={styles.containerMenu}>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#838383',
    marginTop: 0,
  },
  containerIconDemo: {
    flex: 1.7,
    flexDirection: 'column',
    backgroundColor: '#191919',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  containerMenu: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
  },
  iconDemo: {
    width: 270,
    height: 181,
    alignSelf: 'center',
  },
  iconText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 20,
    alignSelf: 'center'
  },
});

const KEY_OF_SCENEMAIN = 'SceneMain';
