/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * hmpace.watch.v1
 *
 */

import {
  Bluetooth, BluetoothEvent, Device, Host, DeviceEvent
} from 'miot';
import { StringSpinner, CardButton } from 'miot/ui';
import React from 'react';
import {
  ScrollView, StyleSheet, Text, Button, View, TextInput, NativeModules
} from 'react-native';

import CommonCell from './CommonCell';
import { Styles } from 'miot/resources';
const bt = Device.getBluetoothLE();


//uuids for testing.
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
      log: '设备类型：' + sctype,
      scType: sctype,
      siid: 0,
      piid: 0,
      eiid: 0,
      aiid: 0,
      valueType: 0,
      value: '',
      VALUE_TYPE: { 'bool': 0, 'uint8': 1, 'int8': 2, 'uint16': 3, 'int16': 4, 'uint32': 5, 'int32': 6, 'uint64': 7, 'int64': 8, 'float': 9, 'string': 10 }
    };
  }
  setProperty() {
    let prop = {
      "siid": parseInt(this.state.siid),
      "piid": parseInt(this.state.piid),
      "type": parseInt(this.state.valueType),
      "value": this.state.value
    };
    let props = [];
    props.push(prop);
    let entity = { "objects": props };
    let json = JSON.stringify(entity);
    this.addLog(`set Property params ${json},mac:${Device.mac}`);
    Bluetooth.spec.setPropertiesValue(Device.mac, json).then((data) => {
      this.addLog(`set property resp :${JSON.stringify(data)}`);
    }).catch((err) => {
      this.addLog('set property Fail:' + JSON.stringify(err));
    });
  }

  getProperty() {
    let prop = {
      "siid": parseInt(this.state.siid),
      "piid": parseInt(this.state.piid)
    };
    let props = [];
    props.push(prop);
    let entity = { "objects": props };
    let json = JSON.stringify(entity);
    this.addLog(`get Property params ${json}`);
    Bluetooth.spec.getPropertiesValue(Device.mac, json).then((data) => {
      this.addLog(`get property resp :${JSON.stringify(data)}`);
    }).catch((err) => {
      this.addLog('get property Fail:' + JSON.stringify(err));
    });
  }

  doAction() {
    let prop = {
      "value": this.state.value,
      "piid": parseInt(this.state.piid),
      "type": parseInt(this.state.valueType)
    };
    let props = [];
    props.push(prop);
    let entity = {
      "siid": parseInt(this.state.siid),
      "aiid": parseInt(this.state.aiid),
      "objects": props
    };
    let json = JSON.stringify(entity);
    this.addLog(`do Action params ${json}`);
    Bluetooth.spec.doAction(Device.mac, json).then((data) => {
      this.addLog(`doAction  resp :${JSON.stringify(data)}`);
    }).catch((err) => {
      this.addLog('doAction Fail ,msg:' + JSON.stringify(err));
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        <View style={{ margin: 5 }}>
          <Button
            title={this.state.btConnect ? '断开蓝牙（蓝牙已连接）' : '连接蓝牙（蓝牙未连接）'}
            onPress={() => {
              if (!this.state.btConnect) {
                this.connect();
              }
              else {
                this.disconnect();
              }
            }} />
        </View>

        <TextInput
          style={styles.inputStyle}
          placeholder="输入整数类型的service id"
          numberOfLines={1}
          onChangeText={text => this.setState({ siid: text })}
          value={this.state.siid}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="输入整数类型的property id"
          numberOfLines={1}
          onChangeText={text => this.setState({ piid: text })}
          value={this.state.piid}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="【执行动作】才需要输入整数 action id"
          numberOfLines={1}
          onChangeText={text => this.setState({ aiid: text })}
          value={this.state.aiid}
        />
        <StringSpinner
          style={{ height: 100, backgroundColor: '#ffffff' }}
          dataSource={['bool', 'uint8', 'int8', 'uint16', 'int16', 'uint32', 'int32', 'uint64', 'int64', 'float', 'string']}
          defaultValue='bool'
          pickerInnerStyle={{
            lineColor: '#cc0000', textColor: '#ff0000', selectTextColor: '#0000FF', fontSize: 12, selectFontSize: 16, rowHeight: 30, selectBgColor: '#f5f5f5'
          }}
          onValueChanged={data => {
            var type = this.state.VALUE_TYPE[data.newValue]
            this.setState({ valueType: type })
            this.addLog('选择的数据类型是' + data.newValue + ',value type=' + type)
          }}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="VALUE 输入数据举例:(ture,false,3.2,9,-88,hello）"
          numberOfLines={1}
          onChangeText={text => this.setState({ value: text })}
          value={this.state.value}
        />
        <View style={{ margin: 5 }}>
          <Button
            title={'设置属性(参数:siid,piid,data-type,value)'}
            onPress={() => {
              this.setProperty()
            }} />
        </View>
        <View style={{ margin: 5 }}>
          <Button
            title={'获取属性(参数:siid,piid)'}
            onPress={() => {
              this.getProperty()
            }} />
        </View>
        <View style={{ margin: 5 }}>
          <Button
            title={'执行动作(参数:siid,aiid,piid,data-type,value)'}
            onPress={() => {
              this.doAction()
            }} />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.log}>
            {this.state.log}
          </Text>
        </ScrollView>
      </View>


    );
  }

  connect(mac = undefined, disconnectOntimeOut = true) {
    if (Host.isAndroid) {
      Bluetooth.stopScan(15000);
    }
    this.setState({ blueConnecting: true, connectState: '连接中。。。' });
    this.addLog('准备开始蓝牙连接');
    if (bt.isConnected) {
      console.log();
      this.addLog('蓝牙设备已经连接');
      this.addLog('开始发先服务');
      this.setState({ blueConnecting: false, connectState: '已连接', btConnect: true });
      bt.startDiscoverServices();
    }
    else if (bt.isConnecting) {
      this.addLog('蓝牙正处于连接中，请等待连接结果后再试');
    }
    else {
      const that = this;
      this.addLog('' + Host.isAndroid);
      if (Host.isAndroid && mac === undefined) {
        this.setState({ blueConnecting: true, connectState: '扫描设备中' + bt.mac });
        Bluetooth.startScan(15000);
        return;
      }
      bt.connect(this.state.scType, { did: Device.deviceID }).then(data => {
        this.setState({ blueConnecting: false, connectState: '已连接', btConnect: true });
        bt.startDiscoverServices();
      }).catch(data => {
        this.setState({ blueConnecting: false, connectState: '连接失败', btConnect: false });
        this.addLog('ble connect failed: ' + JSON.stringify(data));
        if (data.code === -7 && disconnectOntimeOut) {
          Bluetooth.retrievePeripheralsWithServicesForIOS('FE95')
            .then(res => {
              that.addLog('获取已连接设备：' + JSON.stringify(res));
              return new Promise((resolve, reject) => {
                for (const key in res) {
                  //判断V是自己要断连的设备
                  that.addLog('准备断开连接：' + key);
                  Bluetooth.createBluetoothLE(key).disconnect();
                }
                resolve();
              });
            })
            .then(() => {
              //重连设备
              that.connect(mac, false);
            });
        }
      });
    }
  }

  disconnect() {
    this.setState({ connectState: '断开连接中。。。' });
    bt.disconnect();
  }

  checkBluetoothIsEnabled() {
    Bluetooth.checkBluetoothIsEnabled().then(yes => {
      statusEnable = yes;
    });
  }

  enableBluetoothForAndroid() {
    Bluetooth.enableBluetoothForAndroid(!statusEnable);
  }


  addLog(string) {
    let { log } = this.state;
    log = string + '\n' + log;
    this.setState({ log });
  }

  componentDidMount() {
    this.showing = true;
    Bluetooth.checkBluetoothIsEnabled().then(result => {
      this.state.isEnable = result;
      if (result) {
        this.addLog('蓝牙已开启');
      }
      else {
        this.addLog('蓝牙未开启，请检查开启蓝牙后再试');
        Host.ui.showBLESwitchGuide();
      }
    });
    this._s5 = BluetoothEvent.bluetoothStatusChanged.addListener(isOn => {
      console.log('bluetoothStatusChanged', isOn);
      this.addLog('蓝牙状态发生变化 ： ' + JSON.stringify(isOn));
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
    this._s7 = BluetoothEvent.bluetoothDeviceDiscovered.addListener(result => {
      if (result.mac === bt.mac) {
        this.addLog('发现设备' + JSON.stringify(result));
        this.connect(result.mac);
      }
      // else {
      //     this.addLog("初次发现设备" + JSON.stringify(result))
      //     //普通蓝牙设备的连接必须在扫描到设备之后手动创建 ble 对象
      //     bt = Bluetooth.createBluetoothLE(result.uuid || result.mac);//android 用 mac 创建设备，ios 用 uuid 创建设备
      //     Bluetooth.stopScan();
      //     this.connect();
      // }
    });
    this._s1 = BluetoothEvent.bluetoothSeviceDiscovered.addListener((blut, services) => {
      if (services.length <= 0) {
        return;
      }
      console.log('bluetoothSeviceDiscovered', blut.mac, services.map(s => s.UUID), bt.isConnected);
      this.addLog('发现蓝牙服务更新：' + JSON.stringify(services.map(s => s.UUID)));

      const s = services.map(s => ({ uuid: s.UUID, char: [] }));
      this.setState({ services: s });
      if (bt.isConnected) {
        this.addLog('开始扫描特征值');
        services.forEach(s => {
          this.state.services[s.UUID] = s;
          s.startDiscoverCharacteristics();
        });
      }
      Device.getBluetoothLE().getVersion(true, true).then(version => {
        // Device.getBluetoothLE().securityLock.decryptMessageWithToken(version).then(data => {
        //   this.addLog('设备版本为：' + version + ', 解析结果：' + JSON.stringify(data));
        // });
      }).catch(err => {
        // console.log(err, '-------');
      });
    });
    this._s2 = BluetoothEvent.bluetoothCharacteristicDiscovered.addListener((bluetooth, service, characters) => {
      console.log('bluetoothCharacteristicDiscovered', characters.map(s => s.UUID), bt.isConnected);
      this.addLog(service.UUID + ' 蓝牙特征值已扫描成功' + JSON.stringify(characters.map(s => s.UUID)));
      const { services } = this.state;
      services.forEach(s => {
        if (s.uuid === service.UUID) {
          s.char = characters.map(s => s.UUID);
        }
      });
      this.setState({ services });
      if (bt.isConnected) {
        characters.forEach(c => {
          this.state.chars[c.UUID] = c;
        });
      }
    });
    this._s3 = BluetoothEvent.bluetoothCharacteristicValueChanged.addListener((bluetooth, service, character, value) => {
      if (service.UUID.indexOf('ffd5') > 0) {
        console.log('bluetoothCharacteristicValueChanged', character.UUID, value);//刷新界面
      }
      if (character.UUID.toUpperCase() === UUID_BUTTON_READ_WRITE_NOTIFY) {
        this.addLog('收到原始回复：' + value);
        bt.securityLock.decryptMessage(value).then(res => {
          this.addLog('解密之后回复：' + res);
        });
      }
      // this.addLog('bluetoothCharacteristicValueChanged:' + character.UUID + '>' + value);
    });
    this._s4 = BluetoothEvent.bluetoothSeviceDiscoverFailed.addListener((blut, data) => {
      console.log('bluetoothSeviceDiscoverFailed', data);
      //   this.setState({ buttonText: 'bluetoothSeviceDiscoverFailed :' + data });
    });
    this._s5 = BluetoothEvent.bluetoothCharacteristicDiscoverFailed.addListener((blut, data) => {
      console.log('bluetoothCharacteristicDiscoverFailed', data);
      //   this.setState({ buttonText: 'bluetoothCharacteristicDiscoverFailed:' + data });
    });
    this._s6 = BluetoothEvent.bluetoothConnectionStatusChanged.addListener((blut, isConnect) => {
      console.log('bluetoothConnectionStatusChanged', blut, isConnect);
      if (bt.mac === blut.mac) {
        this.setState({ connectState: isConnect ? '已连接' : '未连接' });
        this.addLog('蓝牙' + JSON.stringify(blut) + '状态变化' + isConnect);
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
    this._s8 = DeviceEvent.BLESpecNotifyActionEvent.addListener((result) => {
      this.addLog("Spec notify:" + JSON.stringify(result))
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
    this._s5.remove();
    this._s6.remove();
    this._s7.remove();
    this._s8.remove();
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
  inputStyle: {
    minHeight: 30,
    minWidth: 200,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    marginTop: 1
  },
  button: {
    alignItems: "center",
    backgroundColor: "#32BAC0",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5
  }
});