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
import { CardButton, LoadingDialog } from 'miot/ui';
import React from 'react';
import {
  ScrollView, StyleSheet, Text, View, TextInput, NativeModules
} from 'react-native';

import CommonCell from './CommonCell';

const bt = Device.getBluetoothLE();
let statusEnable = false;


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
      testEncrptText: ''
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
          this.connect();
        }
      }
    });
    this._s8 = DeviceEvent.bleDeviceFirmwareNeedUpgrade.addListener((device) => {
      this.addLog('bleDeviceFirmwareNeedUpgrade ' + device.needUpgrade+','+device.latestVersion+','+device.lastVersion);
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

  enableNotify(val) {
    if (!bt.isConnected || this.state.services.length <= 0) {
      this.addLog('蓝牙尚未连接或者service未发现');
      return Promise.reject('蓝牙尚未连接或者service未发现');
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

  stringToHex(str) {
    let val = '';
    for (let i = 0; i < str.length; i++) {

      if (val === '') {
        val = str.charCodeAt(i).toString(16);
      }
      else {
        val += str.charCodeAt(i).toString(16);
      }
    }
    return val;
  }

  sendTestText() {
    if (!bt.isConnected || this.state.services.length <= 0) {
      this.addLog('蓝牙尚未连接或者service未发现');
      return;
    }
    if (!this.state.testCharNotify) {
      this.addLog('蓝牙通知尚未开启，请点击 开启数据交互 之后尝试写入测试数据');
      return;
    }
    let text = this.state.testEncrptText;
    if (text === '' || text === undefined) {
      text = '01010101';
    }
    text = this.stringToHex(text);
    //  -1: 自动判断，0: 普通小米蓝牙协议设备，1: 安全芯片小米蓝牙设备（比如锁类产品），2: 分享的安全芯片小米蓝牙设备，3: 普通的BLE蓝牙设备(无 mibeacon，无小米 FE95 service)， 4: Standard Auth 标准蓝牙认证协议(通常2019.10.1之后上线的新设备，使用的都是该蓝牙协议，具体详情可以与设备端开发沟通)
    if (this.state.scType === 0) {
      this.addLog('使用Token加密传输，' + text);
      bt.securityLock.encryptMessageWithToken(text).then(res => {
        const { result } = res;
        bt.getService(UUID_SERVICE).getCharacteristic(UUID_LED_READ_WRITE).writeWithoutResponse(result);
      })
        .then(res => {
          this.addLog('write res: ' + JSON.stringify(res));
        })
        .catch(err => {
          this.addLog('write error: ' + JSON.stringify(err));
        });
    }
    else {
      this.addLog('使用Session加密传输，' + text);
      bt.securityLock.encryptMessage(text)
        .then(hex => {
          bt.getService(UUID_SERVICE).getCharacteristic(UUID_LED_READ_WRITE).writeWithoutResponse(hex);
        })
        .then(res => {
          this.addLog('write res: ' + JSON.stringify(res));
        })
        .catch(err => {
          this.addLog('write error: ' + JSON.stringify(err));
        });
    }
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <LoadingDialog
          message={this.state.connectState}
          cancelable
          onDismiss={() => {
            Bluetooth.stopScan();
            this.setState({ blueConnecting: false });
          }}
          visible={this.state.blueConnecting}
        />
        <View style={{ flex: 1 }}>
          <CardButton
            title={this.state.btConnect ? '断开蓝牙' : '连接蓝牙'}
            subtitle={this.state.btConnect ? '蓝牙已连接' : '蓝牙未连接'}
            icon={require('../Resources/icon_ble.png')}
            onPress={() => {
              if (!this.state.btConnect) {
                this.connect();
              }
              else {
                this.disconnect();
              }
            }}
          />
          <CardButton
            title={this.state.testCharNotify ? '取消蓝牙监听' : '开启蓝牙监听'}
            subtitle={this.state.testCharNotify ? '蓝牙监听已开启' : '蓝牙监听未开启'}
            icon={require('../Resources/icon_notify.png')}
            onPress={() => {
              this.enableNotify(!this.state.testCharNotify);
            }}
          />
          <TextInput
            style={{
              minHeight: 50, minWidth: 200, borderColor: 'gray', borderWidth: 1, justifyContent: 'center'
            }}
            placeholder="此处填写测试写入数据"
            numberOfLines={1}
            onChangeText={text => this.setState({ testEncrptText: text })}
            value={this.state.testEncrptText}
          />
          <CardButton
            title="写入测试数据"
            subtitle="向指定特征写入测试数据，默认写入010101，可在下方输入自定义文字传输"
            icon={require('../Resources/icon_write.png')}
            onPress={() => {
              this.sendTestText();
            }}
          />
          <CardButton
            title="默认版本升级"
            subtitle="从服务端读取最新版本进行OTA升级，线上用户只能进入该选项"
            icon={require('../Resources/icon_normal_dfu.png')}
            onPress={() => {
              (Host.isAndroid ? NativeModules.MIOTHost : NativeModules.MHPluginSDK).openBleOtaDeviceUpgradePage({ auth_type: 5 });
            }}
          />
        </View>
        <View style={{
          minHeight: 200,
          marginTop: 10
        }}
        >
          <Text style={{
            flex: 0, minWidth: 20, minHeight: 20, textColor: 'gray'
          }}
          >
            日志信息：
          </Text>
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
    marginBottom: 0,
    marginTop: 0
  },
  actionContainer: { flex: 1 },
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
