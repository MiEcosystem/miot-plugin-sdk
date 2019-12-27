/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * hmpace.watch.v1
 *
 */

import {
  Bluetooth, BluetoothEvent, Device, Service
} from 'miot';
import Host from 'miot/Host';
import React from 'react';
import {
  ScrollView, StyleSheet, Text, View, NativeModules
} from 'react-native';

import CommonCell from './CommonCell';

let bt = Device.getBluetoothLE();

//uuids for testing.
const UUID_SERVICE = '00000100-0065-6C62-2E74-6F696D2E696D';
const UUID_LED_READ_WRITE = '00000101-0065-6C62-2E74-6F696D2E696D';
const UUID_BUTTON_READ_WRITE_NOTIFY = '00000102-0065-6C62-2E74-6F696D2E696D';

export default class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      chars: {},
      services: [],
      isEnable: false,
      connectState: '未连接',
      lightStatu: false,
      lightBrightness: 0,
      log: ''
    };
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
        this.setState({
          connectState: '未连接',
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
        this.addLog('蓝牙' + JSON.stringify(blut) + '状态变化' + isConnect);
        if (!isConnect) {
          this.setState({
            connectState: '未连接',
            chars: {},
            services: []
          });
        }
      }
    });
    this.readLightProp();
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
  }

  enableNotify(val) {
    if (!bt.isConnected || this.state.services.length <= 0) {
      this.addLog('蓝牙尚未连接或者service未发现');
      return;
    }
    this.addLog('switch' + val);
    //   });
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
        this.addLog('write res' + JSON.stringify(res));
      })
      .catch(err => {
        this.addLog('write error' + JSON.stringify(err));
      });


  }

  /**
     * 更新固件后重新链接设备
     */
  update() {
    Bluetooth.startScan(30000, '1000000-0000-0000-00000000000');//扫描指定设备
    BluetoothEvent.bluetoothDeviceDiscovered.addListener(result => {
      bt = Bluetooth.createBluetoothLE(result.uuid || result.mac);//android 用 mac 创建设备，ios 用 uuid 创建设备
      // this.connect();
    });
  }

  doOTA(test = true) {
    test ? this.addLog('开启OTA测试 分包传输') : this.addLog('开启OTA DFU 分包传输');
    bt.startOTA(test);
  }

  connect() {
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
      bt.connect(5).then(data => {
        this.setState({ connectState: '已连接' });
        bt.startDiscoverServices();
      }).catch(data => {
        this.setState({ connectState: '连接失败' });
        this.addLog('ble connect failed: ' + JSON.stringify(data));
      });
    }
  }

  disconnect() {
    this.setState({ connectState: '断开连接中。。。' });
    bt.disconnect();
  }

  addLog(string) {
    let { log } = this.state;
    log = string + '\n' + log;
    this.setState({ log });
  }

  readLightProp() {
    const params = [{ did: Device.deviceID, siid: 2, piid: 1 }, { did: Device.deviceID, siid: 2, piid: 2 }];
    Service.spec.getPropertiesValue(params).then(result => {
      if (result instanceof Array && result.length >= 2) {
        const on_prop = result[0];
        const lightStatu = on_prop.value;
        const bright_prop = result[1];
        const lightBrightness = bright_prop.value;
        this.setState({ lightStatu, lightBrightness });
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
    const params = [{
      did: Device.deviceID, siid: 2, piid: 1, value: on
    }];
    this.addLog('open light :' + JSON.stringify(params));
    Service.spec.setPropertiesValue(params).then(result => {
      this.addLog('toggle Light success,' + JSON.stringify(result));
      this.setState({ lightStatu: on });
    }).catch(err => {
      this.addLog('toggle Light failed,' + JSON.stringify(err));
    });
  }

  changeBrightness() {
    const number = ((Math.floor(Math.random() * 100) + 1 + this.state.brightness) % 100) + 1;
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{
          flex: 2, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'black', borderTopWidth: 1, borderTopColor: 'black'
        }}
        >
          <View style={[styles.actionContainer]}>
            <CommonCell title="开灯" onPress={() => this.toggleLight(true)} />
            <CommonCell title="关灯" onPress={() => this.toggleLight(false)} />
            <CommonCell title="随机灯色" onPress={() => this.changeBrightness()} />
            <CommonCell title="同步状态" onPress={() => this.readLightProp()} />
            {/* <CommonCell title="连接蓝牙" onPress={() => this.connect()} /> */}
            {/* <CommonCell title="断开蓝牙" onPress={() => this.disconnect()} /> */}
            <CommonCell title="固件升级-旧" onPress={() => Host.ui.openBleMeshDeviceUpgradePage()} />
            <CommonCell title="固件升级-新常规" onPress={() => Host.ui.openBleCommonDeviceUpgradePage({ auth_type: 5 })} />
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
            <Text style={{ color: !this.state.lightStatu ? 'red' : 'green' }}>
测试灯状态：
              {this.state.lightStatu ? '开启' : '关闭'}
            </Text>
            <Text style={{ color: !this.state.lightStatu ? 'red' : 'green' }}>
测试灯亮度：
              {'' + this.state.lightBrightness}
            </Text>
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
