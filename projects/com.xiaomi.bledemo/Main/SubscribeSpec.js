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
import { Values } from 'react-native-ui-kitten/src/styles/defaultTheme';
const bt = Device.getBluetoothLE();


// uuids for testing.
const UUID_SERVICE = '00000100-0065-6C62-2E74-6F696D2E696D';
const UUID_LED_READ_WRITE = '00000101-0065-6C62-2E74-6F696D2E696D';
const UUID_BUTTON_READ_WRITE_NOTIFY = '00000102-0065-6C62-2E74-6F696D2E696D';

export default class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.subscribedProps = new Set();
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
        // Ble Spec
        { name: 'prop.1.2', desc: 'prop.1.2', isChecked: false },
        { name: 'prop.2.4', desc: 'prop.2.4', isChecked: false },
        { name: 'prop.3.6', desc: 'prop.3.6', isChecked: false },
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
                <View style={styles.modalCheckboxContainer} key = {value.name}>
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
                <View style={styles.modalCheckboxContainer} key = {value.name}>
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
              this.connectAndSubscribe();
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

  connectAndSubscribe() {
    this.connect().then((res) => {
      this.subscrible();
    }).catch((err) => {
      this.addLog(JSON.stringify(err));
    });
  }

  // trySubscribe(mac = undefined, disconnectOntimeOut = true) {
  //   if (Host.isAndroid) {
  //     Bluetooth.stopScan(15000);
  //   }
  //   this.setState({ blueConnecting: true, connectState: '连接中。。。' });
  //   this.addLog('准备开始蓝牙连接');
  //   if (bt.isConnected) {
  //     console.log();
  //     this.addLog('蓝牙设备已经连接');
  //     this.setState({ blueConnecting: false, connectState: '已连接', btConnect: true });
  //     this.subsrible();
  //   }
  //   else if (bt.isConnecting) {
  //     this.addLog('蓝牙正处于连接中，请等待连接结果后再试');
  //   }
  //   else {
  //     const that = this;
  //     this.addLog('' + Host.isAndroid);
  //     // if (Host.isAndroid && mac === undefined) {
  //     //   this.setState({ blueConnecting: true, connectState: '扫描设备中' + bt.mac });
  //     //   Bluetooth.startScan(15000);
  //     //   return;
  //     // }
  //     bt.connect(this.state.scType, { did: Device.deviceID }).then(data => {
  //       this.setState({ blueConnecting: false, connectState: '已连接', btConnect: true });
  //       this.subsrible();
  //     }).catch(data => {
  //       this.setState({ blueConnecting: false, connectState: '连接失败', btConnect: false });
  //       this.addLog('ble connect failed: ' + JSON.stringify(data));
  //       if (data.code === -7 && disconnectOntimeOut) {
  //         Bluetooth.retrievePeripheralsWithServicesForIOS('FE95')
  //           .then(res => {
  //             that.addLog('获取已连接设备：' + JSON.stringify(res));
  //             return new Promise((resolve, reject) => {
  //               for (const key in res) {
  //                 //判断V是自己要断连的设备
  //                 that.addLog('准备断开连接：' + key);
  //                 Bluetooth.createBluetoothLE(key).disconnect();
  //               }
  //               resolve();
  //             });
  //           })
  //           .then(() => {
  //             //重连设备
  //             this.trySubscribe(mac, false);
  //           });
  //       }
  //     });
  //   }
  // }

  connect(mac = undefined, disconnectOntimeOut = true) {
    this.setState({ blueConnecting: true, connectState: '连接中。。。' });
    this.addLog('准备开始蓝牙连接');
    if (bt.isConnected) {
      console.log();
      this.addLog('蓝牙设备已经连接');
      this.setState({ blueConnecting: false, connectState: '已连接', btConnect: true });
      return Promise.resolve({ code: 0, connected: true });
    } else if (bt.isConnecting) {
      this.addLog('蓝牙正处于连接中，请等待连接结果后再试');
      return Promise.reject({ code: -1, message: '蓝牙正处于连接中，请等待连接结果后再试' });
    } else {
      const that = this;
      this.addLog(`${ Host.isAndroid }`);
      return new Promise((resolve, reject) => {
        bt.connect(this.state.scType, { did: Device.deviceID }).then((data) => {
          this.setState({ blueConnecting: false, connectState: '已连接', btConnect: true });
          resolve({ code: 0, connected: true });
          // this.subsrible();
        }).catch((data) => {
          this.setState({ blueConnecting: false, connectState: '连接失败', btConnect: false });
          this.addLog(`ble connect failed: ${ JSON.stringify(data) }`);
          if (data.code === -7 && disconnectOntimeOut) {
            Bluetooth.retrievePeripheralsWithServicesForIOS('FE95')
              .then((res) => {
                that.addLog(`获取已连接设备：${ JSON.stringify(res) }`);
                return new Promise((resolve, reject) => {
                  for (const key in res) {
                    // 判断V是自己要断连的设备
                    that.addLog(`准备断开连接：${ key }`);
                    Bluetooth.createBluetoothLE(key).disconnect();
                  }
                  resolve();
                });
              }).then(() => {
                // 重连设备
                this.connect(mac, false);
              });
          } else {
            reject({ code: -2, error: data, message: 'connect failed' });
          }
        });
      });

    }
  }

  


  disconnect() {
    this.setState({ connectState: '断开连接中。。。' });
    bt.disconnect();
  }

  
  subscrible() {
    let subArr = [];
    this.state.props.map((value, index) => {
      if (value.isChecked) {
        subArr.push(value.name);
      }
      return subArr;
    });
    this.state.events.map((value, index) => {
      if (value.isChecked) {
        subArr.push(value.name);
      }
      return subArr;
    });
    console.log(`start subsribe :${ JSON.stringify(subArr) }`);
    let l = subArr.length;
    if (l > 0) {
      this.subscribedProps = new Set([...this.subscribedProps, ...subArr]);
      this.addLog(`当前已订阅属性:${ JSON.stringify(Array.from(this.subscribedProps)) }`);
      bt.subscribeMessages(...subArr).then((subcription) => {

      }).catch((err) => console.log('subscribe exception fail'));
    } else {
      bt.unsubscribeMessages();
      if (this.subscribedProps.size > 0) {
        this.subscribedProps.clear();
        this.addLog('已取消订阅所有属性(事件)');
      } else {
        this.addLog('请选中属性（事件）再订阅！');
      }
      
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

  // startListenNotify() {
  //   this.addLog('start listen notify')
  //   console.log('start listen notify')
  //   this._s11 = DeviceEvent.BLESpecNotifyActionEvent.addListener((device, map, res) => {
  //     this.addLog('receive prop(event) changed notification:' + JSON.stringify(map) + ',' + JSON.stringify(res))
  //     console.log('receive prop(event) changed notification:' + JSON.stringify(map) + ',res:' + JSON.stringify(res))
  //     this.state.props.map((value, index) => {
  //       if (value.isChecked) {
  //         if(map.has(value.name)){
  //           let msg = map.get(value.name);
  //           this.addLog('receive prop(event) changed notification,prop:'+value.name+","+JSON.stringify(msg));
  //           console.log('receive prop(event) changed notification,prop:'+value.name,JSON.stringify(msg));
  //         }
  //       }
  //     })
  //   });
  // }


  addLog(string) {
    let { log } = this.state;
    log = `${ string }\n${ log }`;
    this.setState({ log });
  }

  componentDidMount() {
    this.showing = true;

    Bluetooth.checkBluetoothIsEnabled().then((result) => {
      this.setState({ isEnable: result });
      if (result) {
        this.addLog('蓝牙已开启');
      } else {
        this.addLog('蓝牙未开启，请检查开启蓝牙后再试');
        Host.ui.showBLESwitchGuide();
      }
    });
    this._s1 = BluetoothEvent.bluetoothStatusChanged.addListener((isOn) => {
      console.log('bluetoothStatusChanged', isOn);
      this.addLog(`蓝牙状态发生变化 ： ${ JSON.stringify(isOn) }`);
      if (!isOn) {
        this.addLog('蓝牙连接已断开');
        this.setState({
          connectState: '未连接',
          testCharNotify: false,
          btConnect: false,
          chars: {},
          services: []
        });
      }
    });
    this._s2 = BluetoothEvent.bluetoothDeviceDiscovered.addListener((result) => {
      if (result.mac === bt.mac) {
        this.addLog(`发现设备${ JSON.stringify(result) }`);
        this.trySubscribe(result.mac);
        Bluetooth.stopScan();
      }
  
    });

    this._s3 = BluetoothEvent.bluetoothConnectionStatusChanged.addListener((blut, isConnect) => {
      console.log('bluetoothConnectionStatusChanged', blut, isConnect);
      if (bt.mac === blut.mac) {
        this.setState({ connectState: isConnect ? '已连接' : '未连接' });
        this.addLog(`蓝牙${ JSON.stringify(blut) }状态变化${ isConnect }`);
        this.addLog('蓝牙连接已断开');
        if (!isConnect) {
          this.setState({
            connectState: '未连接',
            testCharNotify: false,
            btConnect: false,
            chars: {},
            services: []
          });
          // this.connect();
        }
      }
    });

    this._s4 = DeviceEvent.BLESpecNotifyActionEvent.addListener((device, data, res) => {
      this.addLog(`receive prop(event) changed notification:${ JSON.stringify(data) },${ JSON.stringify(res) }`);
      console.log(`receive prop(event) changed notification:${ JSON.stringify(data) },res:${ JSON.stringify(res) }`);
      // this.state.props.map((value, index) => {
      //   if (value.isChecked) {
      //     if(map.has(value.name)){
      //       let msg = map.get(value.name);
      //       this.addLog('receive prop(event) changed notification,prop:'+value.name+","+JSON.stringify(msg));
      //       console.log('receive prop(event) changed notification,prop:'+value.name,JSON.stringify(msg));
      //     }
      //   }
      // })
      data.forEach((key, value) => {
        this.addLog(`receive prop(event) changed notification,prop:${ key },${ JSON.stringify(value) }`);
        console.log(`receive prop(event) changed notification,prop:${ key }`, JSON.stringify(value));
      });
      
    });
  }

  componentWillUnmount() {
    this.showing = false;

    if (bt.isConnected) {
      bt.disconnect();
      console.log('disconnect');
    }
    this._s1.remove();
    this._s2.remove();
    this._s3.remove();
    this._s4.remove();
    bt.unsubscribeMessages();
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