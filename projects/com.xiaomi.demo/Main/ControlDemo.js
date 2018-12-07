'use strict';

import React from 'react';
import {
  View, Text, AppRegistry, Button,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
  StyleSheet,
  PixelRatio,
  StatusBar,
  Image,
  TextInput,
  DeviceEventEmitter,
} from 'react-native';


import { TitleBarBlack } from 'miot/ui';
import { Device, DeviceEvent, Host, Package } from "miot";

export default class ControlDemo extends React.Component {
  static navigationOptions = ({ navigation }) => {

    return {
      header: <TitleBarBlack title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
        onPressLeft={() => { navigation.goBack(); }} />,
    };
  };

  constructor(props, context) {
    super(props, context);


      this.state = {
        requestStatus: false,
        textR: '',
        textG: '',
        textB: '',
        resultViewColor: '#000000',
      };
  }

  componentDidMount() {
      this._deviceStatusListener = DeviceEvent.deviceReceivedMessages.addListener(
      (device, map, res) => {
          console.log('Device.addListener', device, map, res, this.state.timerRun);
          let status = map.get("prop.on")|| {};
          let sRGB = "#" + this.getNewRGB(status.rgb >> 16, (status.rgb >> 8) & 0x00ff, (status.rgb & 0x0000ff));
            this.setState({"resultViewColor":sRGB});
          });
        Device.getDeviceWifi().subscribeMessages("prop.on","prop.usb_on"
    );
  }

  componentWillUnmount() {
    this._deviceStatusListener.remove();
  }

  render() {
    return (
      <View style={styles.containerAll}>
        <View style={styles.containerIconDemo}>
          <Image style={styles.iconDemo} source={require('../Resources/icon_demo.png')} />
          <Text style={styles.iconText}>通过指令控制三原色灯珠 {this.props.message}</Text>
        </View>

        <View style={styles.containerRGB}>
          <View style={styles.flowRight}>
            <View >
              <Text style={styles.RGBText}>R</Text>
              <Text style={styles.RGBText}>G</Text>
              <Text style={styles.RGBText}>B</Text>
            </View>

            <View>
              <TextInput style={styles.RGBInput}
                placeholder='0-255'
                value={this.state.textR}
                onChange={this.onSetTextRChanged.bind(this)}></TextInput>
              <TextInput style={styles.RGBInput}
                placeholder='0-255'
                value={this.state.textG}
                onChange={this.onSetTextGChanged.bind(this)}></TextInput>
              <TextInput style={styles.RGBInput}
                placeholder='0-255'
                value={this.state.textB}
                onChange={this.onSetTextBChanged.bind(this)}></TextInput>
            </View>

            <View>
              <Image style={styles.RGBArrowImage} source={require("../Resources/right_arrow.png")} />
            </View>

            <View style={[styles.RGBResultView, { backgroundColor: this.state.resultViewColor }]}></View>

          </View>

            <TouchableHighlight underlayColor='#ffffff' onPress={this.onSendDidButtonPress.bind(this)}>
                <Image style={styles.commandButton} source={require( "../Resources/button_command.png")} />
              </TouchableHighlight>

        </View>
      </View>
    );
  }

  onSetTextRChanged(event) {
    this.setState({ textR: event.nativeEvent.text });
  }

  onSetTextGChanged(event) {
    this.setState({ textG: event.nativeEvent.text });
  }

  onSetTextBChanged(event) {
    this.setState({ textB: event.nativeEvent.text });
  }

  getNewRGB(r, g, b) {
    var k;
    var resultR;
    var resultG;
    var resultB;
    var stringRGB;

    var middel = (Math.round(r) > Math.round(g) ? r : g);
    var max = (Math.round(middel) > Math.round(b) ? middel : b);

    if (Math.round(max) == 0) {
      return '000000';
    } else {
      k = max / 255;
      resultR = Math.round(r / k);
      resultG = Math.round(g / k);
      resultB = Math.round(b / k);
      console.log("r,g,b,max,k: ", r, g, b, max, k);
      console.log("resultR,resultG,resultB : ", resultR, resultG, resultB);
    }

    stringRGB = ((resultR << 16) + (resultG << 8) + resultB).toString(16);
    console.log("stringRGB 1 : ", stringRGB);
    if (Math.round(resultR) == 0) {
      if (Math.round(resultG) == 0) {
        stringRGB = '00' + stringRGB;
      } else if (Math.round(resultG) < 16 && Math.round(resultG) > 0) { stringRGB = '0' + stringRGB; }
      stringRGB = '00' + stringRGB;
    } else if (Math.round(resultR) < 16 && Math.round(resultR) > 0) { stringRGB = '0' + stringRGB; }
    console.log("stringRGB 2 : ", stringRGB);
    return stringRGB;
  }

  onSendDidButtonPress() {
    Device.getDeviceWifi().callMethod("set_rgb", [(this.state.textR<<16|this.state.textG<<8|this.state.textB)]).then( json => {
      console.log("rpc result:"+isSuccess+json);
      this.setState({requestStatus:isSuccess})

    });
  }

}

var styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#838383',
    // marginTop: 66,
  },
  containerIconDemo: {
    flex: 1.2,
    flexDirection: 'column',
    backgroundColor: '#191919',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  containerRGB: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
  },
  flowRight: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  iconDemo: {
    alignSelf: 'center',
    width: 192,
    height: 177,
  },
  iconText: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    marginTop: 13
  },

  RGBText: {
    fontSize: 20,
    color: '#000000',
    marginRight: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  RGBInput: {
    height: 38,
    width: 65,
    padding: 4,
    marginTop: 10,
    marginRight: 10,
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#48BBEC',
    color: '#48BBEC',
    alignSelf: 'center',
  },
  RGBArrowImage: {
    height: 31.9,
    width: 29.3,
    paddingRight: 3,
    marginTop: 62,
    marginRight: 10,
    alignSelf: 'center',
  },
  RGBResultView: {
    height: 135,
    width: 135,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#48BBEC',
    alignSelf: 'center',
  },

  commandButton: {
    marginTop: 13,
    height: 40,
    width: 314,
    alignSelf: 'center',
  },

  navBarRightButton: {
    paddingRight: 10,
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },
});
