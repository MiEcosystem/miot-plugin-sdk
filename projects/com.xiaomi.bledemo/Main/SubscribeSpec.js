/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * hmpace.watch.v1
 *
 */

import {
  Bluetooth, BluetoothEvent, Device, Host, DeviceEvent, Service
} from 'miot';
import { StringSpinner, CardButton } from 'miot/ui';
import React from 'react';
import {
  ScrollView, StyleSheet, Text, Button, View, TextInput, NativeModules
} from 'react-native';

import CheckBox from "./widgets/checkbox";
import CommonCell from './CommonCell';
import { Styles } from 'miot/resources';
const bt = Device.getBluetoothLE();


// uuids for testing.
const UUID_SERVICE = '00000100-0065-6C62-2E74-6F696D2E696D';
const UUID_LED_READ_WRITE = '00000101-0065-6C62-2E74-6F696D2E696D';
const UUID_BUTTON_READ_WRITE_NOTIFY = '00000102-0065-6C62-2E74-6F696D2E696D';

export default class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    const sctype = props.navigation.state.params.sc_type === undefined ? 0 : props.navigation.state.params.sc_type;
    this.state = {
      chars: {},
      services: [],
      isEnable: false,
      connectState: '未连接',
      btConnect: false,
      blueConnecting: false,
      testCharNotify: false,
      log: `设备类型：${ sctype }`,
      scType: sctype,
      props: [
        // 温湿度计的
        // { name: 'prop.2.1', desc: '温度（属性）', isChecked: false },
        // { name: 'prop.2.2', desc: '相对湿度（属性）', isChecked: false },
        // { name: 'prop.2.3', desc: 'PM 2.5(属性)', isChecked: false },
        // { name: 'prop.3.1', desc: '电池电量（属性）', isChecked: false },
        // { name: 'prop.3.2', desc: '电池充电状态（属性）', isChecked: false },
        // { name: 'prop.3.3', desc: '电压（属性）', isChecked: false }

        // 门锁的
        { name: 'prop.2.1', desc: 'lock的工作状态（属性）', isChecked: false },
        { name: 'prop.4.1', desc: 'door的工作状态（属性）', isChecked: false },
        { name: 'prop.3.1', desc: '电池电量（属性）', isChecked: false },
        { name: 'prop.6.2', desc: '物理控制锁状态（属性）', isChecked: false }
      ],
      events: [
        // 温湿度计
        // { name: 'event.3.1', desc: '电量低（事件）', isChecked: false }
        { name: 'event.2.1', desc: '开锁（事件）', isChecked: false },
        { name: 'event.2.2', desc: '上锁（事件）', isChecked: false },
        { name: 'event.2.3', desc: '反锁（事件）', isChecked: false },
        { name: 'event.2.4', desc: '锁 发生异常（事件）', isChecked: false },
        { name: 'event.4.1', desc: '敲门（事件）', isChecked: false },
        { name: 'event.4.2', desc: '门 发生异常（事件）', isChecked: false },
        { name: 'event.5.1', desc: '门铃响了（事件）', isChecked: false },
        { name: 'event.3.1', desc: '电量低（事件）', isChecked: false }
      ],
      piid: '3.1'
    };
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style ={{ maxHeight: 400 }}>
          {
            this.state.props.map((value, index) => {
              return (
                <View style={styles.modalCheckboxContainer}>
                  <CheckBox
                    isChecked={value.isChecked}
                    onClick={() => {
                      value.isChecked = !value.isChecked;
                      console.log(`check  prop item key=${ value.name },desc=${ value.desc },checked=${ value.isChecked },index=${ index }`);
                    }}
                  />
                  <Text style={styles.modalCheckboxText}> {value.desc}</Text>
                </View>
              );
            })
          }

          {
            this.state.events.map((value, index) => {
              return (
                <View style={styles.modalCheckboxContainer}>
                  <CheckBox
                    isChecked={value.isChecked}
                    onClick={() => {
                      value.isChecked = !value.isChecked;
                      console.log(`check  event item key=${ value.name },desc=${ value.desc },checked=${ value.isChecked },index=${ index }`);
                    }}
                  />
                  <Text style={styles.modalCheckboxText}> {value.desc}</Text>
                </View>
              );
            })
          }
        </ScrollView>
        <TextInput
          style={styles.inputStyle}
          placeholder="输入格式：siid.piid 或者siid.eiid, 例如：3.1"
          numberOfLines={1}
          onChangeText={(text) => this.setState({ piid: text })}
          value={this.state.piid}
        />
        <View style={{ margin: 5 }}>
          <Button
            title={'订阅选中的属性或事件'}
            onPress={() => {
              this.subsrible();
            }} />
        </View>

        <View style={{ margin: 5 }}>
          <Button
            title={'测试用，手动拉取当前的设备单条【属性】信息'}
            onPress={() => {
              this.getDeviceProperty();
            }} />
        </View>
        <View style={{ margin: 5 }}>
          <Button
            title={'测试用，手动拉取当前的设备单条【事件】信息'}
            onPress={() => {
              this.getDeviceEvent();
            }} />
        </View>
        {/* <View style={{ margin: 5 }}>
          <Button
            title={'取消选中的属性或事件'}
            onPress={() => {
              // this.doAction()
            }} />
        </View> */}
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.log}>
            {this.state.log}
          </Text>
        </ScrollView>
      </View>


    );
  }

  subsrible() {
    let subArr = [];
    this.state.props.map((value, index) => {
      if (value.isChecked) {
        subArr.push(value.name);
      }
    });
    this.state.events.map((value, index) => {
      if (value.isChecked) {
        subArr.push(value.name);
      }
    });
    console.log(`start subsribe :${ JSON.stringify(subArr) }`);
    let l = subArr.length;
    if (l > 0) {
      Device.getDeviceWifi().subscribeMessages(...subArr).then((subcription) => {

      }).catch(() => console.log('subscribe exception fail'));
    } else {
      this.addLog('请选中属性（事件）再订阅！');
    }

  }
  getDeviceProperty() {
    let now = parseInt(Date.now() / 1000 - 30 * 60);
    let end = parseInt(Date.now() / 1000);
    console.log(`device id=${ Device.deviceID },${ Device.mac },${ Device.did }`);
    Service.smarthome.getDeviceData({ did: Device.deviceID, key: this.state.piid, type: 'prop', time_start: now, time_end: end })
      .then((res) => {
        console.log(`get Property :${ JSON.stringify(res) }`);
        this.addLog(`查询设备【属性】${ this.state.piid },resp:${ JSON.stringify(res) }`);
      }).catch((res) => {
        console.log(`get Property fail:${ JSON.stringify(res) }`);
        this.addLog(`查询设备【属性】${ this.state.piid } fail：${ JSON.stringify(res) }`);
      });
  }

  getDeviceEvent() {
    let now = parseInt(Date.now() / 1000 - 30 * 60);
    let end = parseInt(Date.now() / 1000);
    Service.smarthome.getDeviceData({ did: Device.deviceID, key: this.state.piid, type: 'event', time_start: now, time_end: end })
      .then((res) => {
        console.log(`get Property :${ JSON.stringify(res) }`);
        this.addLog(`查询设备【事件】${ this.state.piid },resp:${ JSON.stringify(res) }`);
      }).catch((res) => {
        console.log(`get Property fail:${ JSON.stringify(res) }`);
        this.addLog(`查询设备【事件】${ this.state.piid }fail：${ JSON.stringify(res) }`);
      });
  }

  startListenNotify() {
    this.addLog('start listen notify');
    console.log('start listen notify');
    this._s11 = DeviceEvent.deviceRecievedMessages.addListener((device, map, res) => {
      this.addLog(`receive prop(event) changed notification:${ JSON.stringify(map) },${ JSON.stringify(res) }`);
      console.log(`receive prop(event) changed notification:${ JSON.stringify(map) },res:${ JSON.stringify(res) }`);
      let status = map.get("event.count_down_background")[0] || "";
      switch (status) {
        case "pause":

          break;
        case "resume":

          break;
        case "cancel":

          break;
      }
    });
  }


  addLog(string) {
    let { log } = this.state;
    log = `${ string }\n${ log }`;
    this.setState({ log });
  }

  componentDidMount() {
    this.showing = true;
  }

  componentWillUnmount() {
    this.showing = false;
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
  },
  button: {
    alignItems: "center",
    backgroundColor: "#32BAC0",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5
  },
  modalCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 15,
    marginLeft: 20
  },
  modalCheckboxText: {
    marginLeft: 7,
    color: "#003a6c"
  },
  inputStyle: {
    minHeight: 30,
    minWidth: 200,
    marginLeft: 15,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    marginTop: 1
  }
});