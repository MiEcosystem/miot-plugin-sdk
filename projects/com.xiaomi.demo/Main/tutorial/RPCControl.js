'use strict';

import { Device } from "miot";
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import Logger from '../Logger';

export default class RPCControl extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      requestStatus: false,
      method: '',
      params: {},
      extra: {},
      paramsString: '',
      extraString: {},
      result: 'None'
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.menu}>
          <Text style={styles.buttonText}>默认指令</Text>
          {
            [
              ["清空", this.clearParams],
              ["闹钟 属性", this.setParamsTo_alarm_ops],
              ["闹钟 倒计时", this.setParamsTo_get_count_down],
              ["宜家灯 属性", this.setPramsTo_light_props],
              ["宜家灯 开关", this.setPramsTo_light_toggle]
            ].map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.button} onPress={() => {
                  Logger.trace(this, item[1], { action: item[0] });
                  item[1].bind(this)();
                }}>
                  <Text style={styles.buttonText}>{item[0]}</Text>
                </TouchableOpacity>
              );
            })
          }
        </View>
        <View style={styles.main}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.buttonText}>Main</Text>
            <TextInput
              style={styles.input}
              placeholder="method"
              value={this.state.method}
              onChange={this.onMethodTextRChanged.bind(this)}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="extra 可以为空"
              value={this.state.extraString}
              onChange={this.onExtraTextBChanged.bind(this)}
            />
            <TextInput
              style={[styles.input, { minHeight: 100 }]}
              placeholder="params String"
              value={this.state.paramsString}
              multiline={true}
              numberOfLines={10}
              onChange={this.onParamsTextGChanged.bind(this)}
            />
            {
              [
                ["发送普通指令", this.sendRequest],
                ["发送Remote指令", this.sendRemoteRequest]
              ].map((item, index) => {
                return (
                  <TouchableOpacity key={index} style={styles.button} onPress={() => {
                    Logger.trace(this, item[1], { action: item[0] });
                    item[1].bind(this)();
                  }}>
                    <Text style={styles.buttonText}>{item[0]}</Text>
                  </TouchableOpacity>
                );
              })
            }
            <Text style={styles.buttonText}>result: </Text>
            <Text style={[styles.input, { minHeight: 100 }]}>{this.state.result}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }

  sendRequest() {
    let params = this.state.params;
    let method = this.state.method;
    let extra = this.state.extra;
    if (method == '') {
      alert('method 不能为空');
      return;
    }
    console.log('extra', extra);
    Device.getDeviceWifi().callMethod(method, params, extra).then((res) => {
      let result = JSON.stringify(res, null, '\t');
      this.setState({ result });
    }).catch((err) => {
      console.log('error:', err);
      let result = JSON.stringify(err, null, '\t');
      this.setState({ result });
    });
  }

  sendRemoteRequest() {
    let params = this.state.params;
    let method = this.state.method;
    let extra = this.state.extra;
    if (method == '') {
      alert('method 不能为空');
      return;
    }
    Device.getDeviceWifi().callMethodFromCloud(method, params).then((res) => {
      let result = JSON.stringify(res, null, '\t');
      this.setState({ result });
    }).catch((err) => {
      let result = JSON.stringify(err, null, '\t');
      this.setState({ result });
    });
  }

  clearParams() {
    this.setState({ params: {}, extra: {}, paramsString: '', extraString: '', method: '' });
  }

  setParamsTo_alarm_ops() {
    let params = { "operation": "query", "req_type": "alarm", "index": 0 };
    let paramsString = JSON.stringify(params, null, '\t');
    let method = 'alarm_ops';
    let extraString = '';
    this.setState({ params, paramsString, method, extraString });
  }

  setParamsTo_get_count_down() {
    let params = [];
    let paramsString = JSON.stringify(params, null, '\t');
    let method = 'get_count_down';
    let extraString = '';
    this.setState({ params, paramsString, method, extraString });
  }

  setPramsTo_light_props() {
    let params = [Device.deviceID, "light_level", "power_status"];
    let paramsString = JSON.stringify(params, null, '\t');
    let extra = { id: Device.deviceID };
    let extraString = JSON.stringify(extra, null, '\t');
    let method = 'get_device_prop';
    this.setState({ params, paramsString, method, extraString, extra });
  }

  setPramsTo_light_toggle() {
    let params = ['toggle'];
    let paramsString = JSON.stringify(params, null, '\t');
    let extra = { 'sid': Device.deviceID };
    let extraString = JSON.stringify(extra, null, '\t');
    let method = 'set_power';
    this.setState({ params, paramsString, method, extraString, extra });
  }

  onMethodTextRChanged(event) {
    this.setState({
      method: event.nativeEvent.text
    });
  }

  onParamsTextGChanged(event) {
    let paramsString = event.nativeEvent.text;
    try {
      var params = JSON.parse(paramsString);
      this.setState({
        params, paramsString, result: 'None'
      });
    } catch (err) {
      var params = [];
      this.setState({
        params, paramsString, result: "prase params failed"
      });
    }
  }

  onExtraTextBChanged(event) {
    let extraString = event.nativeEvent.text;
    try {
      var extra = JSON.parse(extraString);
      this.setState({
        extra,
        extraString,
        result: 'None'
      });
    } catch (err) {
      var extra = {};
      this.setState({
        extra,
        extraString,
        result: "prase extra failed"
      });
    }
  }

  onSendDidButtonPress() {
    Device.getDeviceWifi().callMethod("set_rgb", [(this.state.textR << 16 | this.state.textG << 8 | this.state.textB)]).then((json) => {
      console.log(`rpc result:${ isSuccess }${ json }`);
      this.setState({ requestStatus: isSuccess });

    });
  }
}

var styles = StyleSheet.create({
  button: {
    color: '#000',
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  buttonText: {
    alignSelf: 'center',
    color: '#555',
    fontSize: 14,
    padding: 5
  },
  menu: {
    padding: 10,
    backgroundColor: "white",
    alignItems: 'flex-start'
  },
  main: {
    padding: 10,
    flex: 1
  },
  input: {
    color: '#333',
    padding: 8,
    marginBottom: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5
  }
});
