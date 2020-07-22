/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * hmpace.watch.v1
 *
 */

import { Device, Host, Service } from 'miot';
import { StringSpinner, CardButton, SliderWithHeader } from 'miot/ui';
import React from 'react';
import {
  StyleSheet, View, NativeModules, Slider, Text, Switch
} from 'react-native';

const bt = Device.getBluetoothLE();
export default class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      toggling: false,
      isLightOn: false,
      lightBrightness: 0,
      log: ''
    };
  }

  componentDidMount() {
    this.readLightProp();
  }

  componentWillUnmount() {
  }

  addLog(string) {
    let { log } = this.state;
    log = string + '\n' + log;
    this.setState({ log });
  }

  ////////////////////////////////
  //  *Mesh light RPC* //
  readLightProp() {
    const params = [{ did: Device.deviceID, siid: 2, piid: 1 }, { did: Device.deviceID, siid: 2, piid: 2 }];
    Service.spec.getPropertiesValue(params).then(result => {
      if (result instanceof Array && result.length >= 2) {
        const onProp = result[0];
        const isLightOn = onProp.value;
        const brightProp = result[1];
        const lightBrightness = brightProp.value;
        this.setState({ isLightOn, lightBrightness });
        this.addLog('获取灯属性成功,' + JSON.stringify(result));
      }
      else {
        this.addLog('获取灯属性失败,' + JSON.stringify(result));
      }

    }).catch(err => {
      this.addLog('read light prop failed,' + JSON.stringify(err));
    });
  }

  toggleLight(on) {
    if (on === this.state.isLightOn) {
      return;
    }
    this.setState({ toggling: true });
    const params = [{
      did: Device.deviceID, siid: 2, piid: 1, value: on
    }];
    this.addLog('open light :' + JSON.stringify(params));
    Service.spec.setPropertiesValue(params).then(result => {
      this.addLog('toggle Light success,' + JSON.stringify(result));
      this.setState({ isLightOn: on, toggling: false });
    }).catch(err => {
      this.setState({ toggling: false });
      this.addLog('toggle Light failed,' + JSON.stringify(err));
    });
  }

  changeBrightness(val) {
    const number = (val);
    this.addLog('修改灯色：' + number);
    const params = [{
      did: Device.deviceID, siid: 2, piid: 2, value: number
    }];
    Service.spec.setPropertiesValue(params).then(result => {
      if (result instanceof Array && result.length >= 1) {
        const res = result[0];
        if (res.code < 0) {
          this.addLog('修改灯色 failed,code = ' + res.code);
        }
        else {
          const lightBrightness = number;
          this.setState({ lightBrightness });
          this.addLog('修改灯色 success,' + JSON.stringify(result));
        }
      }
      else {
        this.addLog('修改灯色 failed');
      }
    }).catch(err => {
      this.addLog('修改灯色 failed,' + JSON.stringify(err));
    });
  }

  ////////////////////////////////

  render() {
    return (
      <View style={styles.mainContainer}>
        <CardButton
          title="更新灯状态"
          subtitle="通过RPC请求当前灯的亮度灯属性状态"
          icon={require('../Resources/icon_rpc_light.png')}
          onPress={() => {
            this.readLightProp();
          }}
        />
        <CardButton
          title="开关灯"
          subtitle={this.state.isLightOn ? '已开启' : '已关闭'}
          icon={require('../Resources/icon_swithc.png')}
          onPress={() => {
            this.toggleLight(!this.state.isLightOn);
          }}
        />
        <Text>当前灯亮度状态(滑动更新)</Text>
        <Slider
          maximumValue={100}
          minimumValue={0}
          step={1}
          value={this.state.lightBrightness}
          onSlidingComplete={value => this.changeBrightness(value)}
        />
        <Text>日志信息：</Text>
        <Text style={styles.log}>
          {this.state.log}
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginBottom: 0,
    marginTop: 0
  },
  actionContainer: {
    minWidth: 100,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    marginBottom: 0,
    marginTop: 0,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    borderRightWidth: 1,
    borderRightColor: 'black'
  },
  actionText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textDecorationLine: 'underline'
  },
  log: {
    flex: 1,
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
    alignSelf: 'stretch'
  },
  testText: {
    color: '#000000cc',
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
