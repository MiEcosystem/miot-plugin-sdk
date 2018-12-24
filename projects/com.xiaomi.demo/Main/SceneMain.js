'use strict';

import { Package } from "miot";
import React from "react";
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
} from "react-native"
import { ImageButton, TitleBarBlack } from 'miot/ui'
import PackageDemo from "./tutorial/PackageDemo";
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
var rValue = 0;
var gValue = 0;
var bValue = 0;

export default class SceneMain extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log(Package.entryInfo);
    this.state = {
      requestStatus: false,
    };
  }

  componentDidMount() {
  }
  test() {
    alert("test");
  }

  render() {
    return (
      <View style={styles.containerAll} >
        <TitleBarBlack
          onPressLeft={() => Package.exit()}
          // disabled={!this.state.textValid || !this.state.numValid}
          disabled={!this.state.numValid}
          // title={'title'}
          rightText={'确定'}
          onPressRight={() => {
            var color = rValue << 16 | gValue << 8 | bValue;
            var action = Package.entryInfo;
            action.payload.value = { 'test': 't' };
            console.log(Package.exitInfo);
            Package.exitInfo = action; // 设置exitInfo之后插件就会正常退出，无需再调用 Package.exit();
            // Package.exit();
          }}
        />
        <View style={styles.containerIconDemo}>
          <Image style={styles.iconDemo} source={require("../Resources/control_home.png")} />
          <Text style={styles.iconText}>开发自定义智能场景</Text>
        </View>
        <View style={styles.containerMenu}>
          <TextInput
            style={styles.textInput}
            maxLength={3}
            placeholder="R: 0-255"
            onChangeText={(text) => {
              rValue = text;
            }}
          />
          <TextInput
            style={styles.textInput}
            maxLength={3}
            placeholder="G: 0-255"
            onChangeText={(text) => {
              gValue = text;
            }}
          />
          <TextInput
            style={styles.textInput}
            maxLength={3}
            placeholder="B: 0-255"
            onChangeText={(text) => {
              bValue = text;
            }}
          />
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

  textInput: {
    height: 40,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    // flex: 1,
    fontSize: 16,
    padding: 4,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#ffffff',
  },
});
