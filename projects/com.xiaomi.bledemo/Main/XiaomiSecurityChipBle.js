/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * hmpace.watch.v1
 *
 */

import {
  Bluetooth, BluetoothEvent, Device, Host
} from 'miot';
//import Host from 'miot/Host';
import React from 'react';
import {
  ScrollView, StyleSheet, Text, View, TextInput, NativeModules
} from 'react-native';

import CommonCell from './CommonCell';

let bt = Device.getBluetoothLE();
let statusEnable = false;


//uuids for testing.
const UUID_SERVICE = '00000100-0065-6C62-2E74-6F696D2E696D';
const UUID_LED_READ_WRITE = '00000101-0065-6C62-2E74-6F696D2E696D';
const UUID_BUTTON_READ_WRITE_NOTIFY = '00000102-0065-6C62-2E74-6F696D2E696D';
const AUTH_TYPE = 1;

export default class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      chars: {},
      services: [],
      isEnable: false,
      connectState: '未连接',
      testCharNotify: false,
      log: '',
      fake_dfu_url: 'https://cdn.cnbj0.fds.api.mi-img.com/miio_fw/67d8939fc7767b055445dd1b50da5b2f_upd_zimi.mosq.v1.bin?GalaxyAccessKeyId=5721718224520&Expires=1581933403000&Signature=pGNN4+oC9CgEXbxn2Jstmu5KVQ8='
    };
  }

  componentDidMount() {
    this.showing = true;
    this.addLog('测试流程：先 连接蓝牙，随后开启特征订阅，发送测试数据(0101...01)之后会收到发送的测试数据回复。');
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
        this.setState({
          connectState: '未连接',
          testCharNotify: false,
          chars: {},
          services: []
        });
      }
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
      this.addLog('发现蓝牙特征值更新，具体参见右上部分属性列表');
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
      if (character.UUID === UUID_BUTTON_READ_WRITE_NOTIFY) {
        this.addLog('收到回复：' + value);
        bt.securityLock.decryptMessage(value).then(res => {
          this.addLog('收到回复：' + res);
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
        this.setState({ connectState: isConnect });
        this.addLog('蓝牙' + JSON.stringify(blut) + '状态变化：' + isConnect ? '已连接' : '未连接');
        if (!isConnect) {
          this.setState({
            connectState: '未连接',
            testCharNotify: false,
            chars: {},
            services: []
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this.showing = false;
    if (bt.isConnected) {
      // bt.disconnect();
      console.log('disconnect');
    }
    this._s1.remove();
    this._s2.remove();
    this._s3.remove();
    this._s4.remove();
    this._s5.remove();
    this._s6.remove();
  }

  enableNotify(val) {
    if (!bt.isConnected || this.state.services.length <= 0) {
      this.addLog('蓝牙尚未连接或者service未发现');
      return;
    }
    this.addLog('switch' + val);
    bt.getService(UUID_SERVICE).getCharacteristic(UUID_BUTTON_READ_WRITE_NOTIFY).setNotify(val)
      .then(res => {
        this.setState({ testCharNotify: val });
        this.addLog((val ? '开启' : '关闭') + '特征值通知成功');
      })
      .catch(err => {
        this.setState({ testCharNotify: !val });
        this.addLog((val ? '开启' : '关闭') + '特征值通知失败：' + JSON.stringify(err));
      });
  }

  sendTestText() {
    if (!bt.isConnected || this.state.services.length <= 0) {
      this.addLog('蓝牙尚未连接或者service未发现');
      return;
    }
    bt.securityLock.encryptMessage('01010101')
      .then(hex => {
        bt.getService(UUID_SERVICE).getCharacteristic(UUID_LED_READ_WRITE).writeWithoutResponse(hex);
      })
      .then(res => {
        this.addLog('测试数据写入成功');
      })
      .catch(err => {
        this.addLog('测试数据写入失败' + JSON.stringify(err));
      });
  }

  /**
     * 更新固件后重新链接设备
     */
  update() {
    Bluetooth.startScan(30000, '1000000-0000-0000-00000000000');//扫描指定设备
    BluetoothEvent.bluetoothDeviceDiscovered.addListener(result => {
      bt = Bluetooth.createBluetoothLE(result.uuid || result.mac);//android 用 mac 创建设备，ios 用 uuid 创建设备
      this.connect();
    });
  }

  doOTA(test = true) {
    test ? this.addLog('开启OTA测试 分包传输') : this.addLog('开启OTA DFU 分包传输');
    bt.startOTA(test);
  }

  connect(disconnectOntimeOut = true) {
    this.setState({ connectState: '连接中。。。' });
    this.addLog('准备开始蓝牙连接');
    if (bt.isConnected) {
      console.log();
      this.addLog('蓝牙设备已经连接');
      this.addLog('开始发先服务');
      this.setState({ connectState: '已连接' });
      bt.startDiscoverServices();
    }
    else if (bt.isConnecting) {
      this.addLog('蓝牙正处于连接中，请等待连接结果后再试');
    }
    else {
      const that = this;
      bt.connect(4).then(data => {
        that.setState({ connectState: '已连接' });
        bt.startDiscoverServices();
      }).catch(data => {
        that.setState({ connectState: '连接失败' });
        that.addLog('ble connect failed: ' + JSON.stringify(data));
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
              that.connect(false);
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{
          flex: 2, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'black', borderTopWidth: 1, borderTopColor: 'black'
        }}
        >
          <View style={[styles.actionContainer]}>
            <CommonCell title="连接蓝牙" onPress={() => this.connect()} />
            <CommonCell title="断开蓝牙" onPress={() => this.disconnect()} />
            <CommonCell isSwitch isOn={this.state.testCharNotify} title="特征订阅" onValueChange={val => this.enableNotify(val)} onPress={() => this.enableNotify(!this.state.testCharNotify)} />
            <CommonCell title="发送测试数据" onPress={() => this.sendTestText()} />
            {/* <CommonCell title="固件升级(测试中断)" onPress={() => NativeModules.MHPluginSDK.openBLECommonDFUPage({ fake_dfu_url: this.state.fake_dfu_url, auth_type: 3, hook_dfu_fragment: 2 })} /> */}
            {/* <CommonCell title="固件升级-指定DFU" onPress={() => Host.ui.openBleCommonDeviceUpgradePage({ fake_dfu_url: this.state.fake_dfu_url, auth_type: AUTH_TYPE })} />
            <CommonCell title="固件升级-常规" onPress={() => Host.ui.openBleCommonDeviceUpgradePage({ auth_type: AUTH_TYPE })} /> */}

            <CommonCell title="固件升级-指定DFU" onPress={() => (Host.isAndroid ? NativeModules.MIOTHost : NativeModules.MHPluginSDK).openBleOtaDeviceUpgradePage({ fake_dfu_url: this.state.fake_dfu_url, auth_type: 1 })} />
            <CommonCell title="固件升级-常规" onPress={() => (Host.isAndroid ? NativeModules.MIOTHost : NativeModules.MHPluginSDK).openBleOtaDeviceUpgradePage({ auth_type: 1 })} />
          </View>
          <ScrollView style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'black' }}>
            <Text>
蓝牙状态：
              {this.state.connectState}
            </Text>
            <Text>
发现Service：
              {this.state.services.length}
个
            </Text>
            <Text>
测试特征值通知开启：
              {this.state.testCharNotify ? '开启' : '关闭'}
            </Text>
            <Text style={{ marginTop: 20 }}>
测试下载DFU地址：
            </Text>
            <TextInput
              style={{
                height: 200, borderColor: 'gray', borderWidth: 1, justifyContent: 'center'
              }}
              multiline
              numberOfLines={0}
              onChangeText={text => this.setState({ fake_dfu_url: text })}
              value={this.state.fake_dfu_url}
            />
          </ScrollView>
          <ScrollView style={{ flex: 1 }}>

            {
              this.state.services.map((val, index) => (
                <View key={index} style={{ marginTop: 20 }}>
                  <Text style={[{ backgroundColor: 'white' }]}>
service:
                    {' '}
                    {val.uuid}
                  </Text>
                  {
                    val.char.map((v, i) => (
                      <CommonCell
                        title={'char: ' + v}
                      />
                    ))
                  }

                </View>
              ))
          }
          </ScrollView>
        </View>
        <View style={{ flex: 2, flexDirection: 'column' }}>
          <Text style={{ minWidth: 20, minHeight: 20, textColor: 'gray' }}>日志信息：</Text>
          <ScrollView style={{ flex: 1 }}>
            <Text style={styles.log}>
              {this.state.log}
            </Text>
          </ScrollView>
        </View>
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
