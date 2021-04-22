import React from 'react';
import { Bluetooth, BluetoothEvent, Device, Host, Package } from "miot";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NavigationBar from 'miot/ui/NavigationBar';
import Separator from 'miot/ui/Separator';

/**
 * SDK 提供的多语言 和 插件提供的多语言
 */
import { strings as SdkStrings, Styles as SdkStyles } from 'miot/resources';
import PluginStrings from '../resources/strings';
/**
 * SDK 支持的字体
 */
import * as SdkFontStyle from 'miot/utils/fonts';

/**
 * 插件开发者 争对 蓝牙设备说明文档， 需要对如下数据进行修改
 */
const ServiceUUID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const WCharacteristicUUID = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';
const RCharacteristicUUID = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

/**
 * 蓝牙模块 通用api使用
 */
export default class MainPage extends React.Component {

  /**
   * 页面内部自定义Header
   * @param navigation
   * @returns {{header: *}|{header: null}}
   */
  static navigationOptions = ({ navigation }) => {
    const { titleProps } = navigation.state.params || {};
    if (!titleProps) return { header: null };
    return {
      header: <NavigationBar {...titleProps} />
    };
  };

  constructor(props) {
    super(props);

    this.initNavigationBar();

    this.state = {
      txtShowInfo: ''
    };
    this.initData();
  }

  initNavigationBar() {
    this.props.navigation.setParams({
      titleProps: {
        title: Device.name,
        left: [
          {
            key: NavigationBar.ICON.BACK,
            onPress: () => {
              Package.exit();
            }
          }
        ],
        right: [
          {
            key: NavigationBar.ICON.MORE,
            onPress: () => {
              // 跳转到设置页
              this.props.navigation.navigate('SettingPage', { title: SdkStrings.setting });
            }
          }
        ]
      }
    });
  }

  initData() {
    this.bleListenrs = [];
    this.peripheralUUIDIOS = '';
    this.bleDevice = null;

    this.txtShowInfoIndex = 0;
  }

  UNSAFE_componentWillMount() {
    this.addListener();
  }

  addListener() {
    // 手机蓝牙开关状态变更事件
    this.bleListenrs['bluetoothStatusChanged'] = BluetoothEvent.bluetoothStatusChanged.addListener((isEnabled) => {
      this.logInfo('手机蓝牙开关状态变更事件 bluetoothStatusChanged  isEnabled', isEnabled);
      this.updateState(`手机蓝牙开关状态变更事件 bluetoothStatusChanged  isEnabled = ${ isEnabled }`);
    });

    // 蓝牙设备扫描发现事件
    this.bleListenrs['bluetoothDeviceDiscovered'] = BluetoothEvent.bluetoothDeviceDiscovered.addListener((bluetoohData) => {

      if (bluetoohData) {
        if (Device.mac === bluetoohData.mac) {
          this.logInfo('扫描完成', Device.mac, bluetoohData);
          // 已发现设备，停止扫描
          this.peripheralUUIDIOS = bluetoohData.uuid; // iOS所需
          this.logInfo(`蓝牙设备扫描发现事件 bluetoothDeviceDiscovered：uuid is ${ bluetoohData.uuid }`);
          this.updateState(`蓝牙设备扫描发现事件 bluetoothDeviceDiscovered：uuid is ${ bluetoohData.uuid }`);

          this.stopScan();
          // 正常开发插件， 当扫描发现后， 就可以调用连接api了，此处注释是为了让开发者通过页面点击按钮点击操作进行连接；
          // this.connec();
        }
      }
    });

    // 蓝牙设备扫描发现失败事件
    this.bleListenrs['bluetoothDeviceDiscoverFailed'] = BluetoothEvent.bluetoothDeviceDiscoverFailed.addListener((error) => {
      this.logInfo('蓝牙设备扫描发现失败事件 bluetoothDeviceDiscoverFailed', error);
      this.updateState(`蓝牙设备扫描发现失败事件 bluetoothDeviceDiscoverFailed error is ${ JSON.stringify(error) }`);
    });

    // 蓝牙连接状态改变的事件
    this.bleListenrs['bluetoothConnectionStatusChanged'] = BluetoothEvent.bluetoothConnectionStatusChanged.addListener((bluetooth, isConnected) => {
      this.logInfo('蓝牙连接状态改变的事件 bluetoothConnectionStatusChanged', bluetooth, isConnected);
      this.updateState(`蓝牙连接状态改变的事件 bluetoothConnectionStatusChanged isConnected: ${ isConnected }`);
    });

    // 蓝牙服务发现事件
    this.bleListenrs['bluetoothSeviceDiscovered'] = BluetoothEvent.bluetoothSeviceDiscovered.addListener((bluetooth, services) => {
      this.logInfo('蓝牙服务发现事件-成功 bluetoothSeviceDiscovered', bluetooth, services);

      if (services) {
        services.forEach((service) => {
          if (service.UUID.toUpperCase() == ServiceUUID) {
            // 通过服务发现对应的特征值
            this.logInfo(`发现服务 ${ ServiceUUID }  开始startDiscoverCharacteristics...`);
            this.updateState(`发现服务 ${ ServiceUUID }  开始startDiscoverCharacteristics...`);
            // Android 蓝牙连接成功后，会自动进行发现服务、特征值的操作, 因此无需再次调用发现特征值接口
            if (Host.isIOS) {
              this.startDiscoverCharacteristics();
            }
          }
        });
      }
    });

    // 蓝牙服务发现失败事件
    this.bleListenrs['bluetoothSeviceDiscoverFailed'] = BluetoothEvent.bluetoothSeviceDiscoverFailed.addListener((bluetooth, error) => {
      this.logInfo('蓝牙服务发现失败事件 bluetoothSeviceDiscoverFailed', bluetooth, error);
      this.updateState(`蓝牙服务发现失败事件 bluetoothSeviceDiscoverFailed error is ${ JSON.stringify(error) }`);
    });

    // 蓝牙特征发现事件-成功
    this.bleListenrs['bluetoothCharacteristicDiscovered'] = BluetoothEvent.bluetoothCharacteristicDiscovered.addListener((bluetooth, service, characters) => {
      this.logInfo('蓝牙特征发现事件-成功 bluetoothCharacteristicDiscovered', service, characters);


      if (service.UUID.toUpperCase() == ServiceUUID) {
        characters.forEach((character) => {
          if (character.UUID.toUpperCase() == RCharacteristicUUID) {
            // 对对应的特征值进行监听
            this.logInfo(`发现特征值 ${ RCharacteristicUUID }  开始setNotify...`);
            this.updateState(`发现特征值 ${ RCharacteristicUUID }  开始setNotify...`);
            this.bleDevice.getService(ServiceUUID).getCharacteristic(RCharacteristicUUID).setNotify(true)
              .then((ble) => {
                this.logInfo(`特征值 ${ RCharacteristicUUID }  开始setNotify 成功...`);
                this.updateState(`特征值 ${ RCharacteristicUUID }  开始setNotify  成功...`);
              })
              .catch((error) => {
                let info = `特征值 ${ RCharacteristicUUID }  开始setNotify error...${ JSON.stringify(error) }`;
                this.logInfo(info);
                this.updateState(info);
              });
          }

          if (character.UUID.toUpperCase() == WCharacteristicUUID) {
            let value = '123123';
            this.logInfo(`发现特征值 ${ WCharacteristicUUID }  开始 write data ${ value }`);
            this.updateState(`发现特征值 ${ WCharacteristicUUID }  开始 write data ${ value }`);
            this.bleDevice.getService(ServiceUUID).getCharacteristic(WCharacteristicUUID).writeWithoutResponse(value);
          }
        });
      }

    });

    // 蓝牙特征发现事件-失败
    this.bleListenrs['bluetoothCharacteristicDiscoverFailed'] = BluetoothEvent.bluetoothCharacteristicDiscoverFailed.addListener((bluetooth, service, error) => {
      this.logInfo('蓝牙特征发现事件-失败 bluetoothSeviceDiscoverFailed', service, error);
    });

    // 蓝牙特征值变更事件
    this.bleListenrs['bluetoothCharacteristicValueChanged'] = BluetoothEvent.bluetoothCharacteristicValueChanged.addListener((bluetooth, service, character, value) => {
      this.logInfo('蓝牙特征值变更事件 bluetoothCharacteristicValueChanged', character, value);
    });
  }

  removeListener() {
    if (this.bleListenrs && this.bleListenrs.length > 0) {
      for (let index in this.bleListenrs) {
        this.bleListenrs[index] && this.bleListenrs[index].remove();
      }
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Separator/>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginTop: 20, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Image
              style={{ width: 350, height: 200 }}
              source={require('../resources/images/welcome.png')} />
          </View>
          <View style={{ padding: 20 }}>
            <Text style={styles.textStyle1}>{PluginStrings.hello}</Text>

            <Text style={{ color: '#d71345', fontSize: 14 } }>.蓝牙设备-蓝牙连接相关接口使用!</Text>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={(e) => {
                this.checkBluetoothIsEnabled();
              }}
            >
              <Text style={[styles.textStyle, this.fontFamily]}>第一步-检查手机蓝牙是否打开</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={(e) => {
                this.startScan();
              }}
            >
              <Text style={[styles.textStyle, this.fontFamily]}>第二步-开始蓝牙扫描</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={(e) => {
                this.connec();
              }}
            >
              <Text style={[styles.textStyle, this.fontFamily]}>第三步-开始蓝牙连接</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={(e) => {
                this.startDiscoverServices();
              }}
            >
              <Text style={[styles.textStyle, this.fontFamily]}>第四步-开始发现服务</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={(e) => {
                this.startDiscoverCharacteristics();
              }}
            >
              <Text style={[styles.textStyle, this.fontFamily]}>第五步-开始发现特征值</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={(e) => {
                this.write();
              }}
            >
              <Text style={[styles.textStyle, this.fontFamily]}>第六步-开始写特征值</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={(e) => {
                this.disConnec();
              }}
            >
              <Text style={[styles.textStyle, this.fontFamily]}>第七步-断开连接</Text>
            </TouchableOpacity>

            <Text style={[{ marginLeft: 10, color: '#666666' }, this.fontFamily]}>{this.state.txtShowInfo}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  componentWillUnmount() {
    this.stopScan();
    this.disConnec();
  }

  //  判断手机蓝牙是否打开
  checkBluetoothIsEnabled() {
    Bluetooth.checkBluetoothIsEnabled().then((enable) => {
      this.updateState(`checkBluetoothIsEnabled  enable=${ enable }`);
      // 没有开启蓝牙权限，则需要打开蓝牙权限
      if (!enable) {
        if (Host.isAndroid) {
          Bluetooth.enableBluetoothForAndroid(true);
          // Host.ui.openPhoneBluSettingPage();
        } else {
          Host.ui.showBLESwitchGuide();
        }
      }
    }).catch((error) => {
      this.logInfo('checkBluetoothIsEnabled error ', error);
    });
  }

  startScan() {
    this.logInfo('startScan');

    this.setState({
      txtShowInfo: ''
    });
    this.updateState('startScan');
    if (Host.isIOS) {
      this.updateState(`iOS 无需扫描蓝牙设备，可以直接connect`);
    } else {
      let serviceUUIDs = [
        // XXXX
      ];
      Bluetooth.startScan(30000, ...serviceUUIDs);
    }
  }

  stopScan() {
    this.logInfo('stopScan');
    this.updateState('stopScan');
    Bluetooth.stopScan();
  }

  connec() {

    if (!this.bleDevice) {

      this.bleDevice = Device.getBluetoothLE(this.peripheralUUIDIOS);
      // 也可以如下方式创建蓝牙
      // let macOrPeripheralID = Host.isAndroid?Device.mac:this.peripheralUUIDIOS;
      // this.bleDevice = Bluetooth.createBluetoothLE(macOrPeripheralID);

    }

    this.logInfo('ble will connect...', this.bleDevice);
    this.updateState('ble will connect...');
    /**
     * Android调用connect方法，接下来会自动执行 bluetoothSeviceDiscovered   bluetoothCharacteristicDiscovered
     */
    this.bleDevice.connect(0, { timeout: 30000, forceReconnect: true }).then((blueData) => {
      // 这里的blueData是原生传递过来的数据(包括service信息等)，并不是当前蓝牙设备对象
      this.logInfo('ble connect success ', blueData);
      this.updateState('ble connect success ...');
      // Android 蓝牙连接成功后，会自动进行发现服务、特征值的操作, 因此无需再次调用发现服务接口
      if (Host.isIOS) {
        this.startDiscoverServices();
      }

    }).catch((error) => {
      this.logInfo('ble connect error ', error);
      this.updateState(`ble connect error:  ${ JSON.stringify(error) }`);
    });
  }

  disConnec() {
    if (this.bleDevice) {
      this.logInfo('ble will disconnect...');
      this.updateState(`ble will disconnect...`);

      if (Host.isIOS) {
        Bluetooth.retrievePeripheralsWithServicesForIOS(ServiceUUID).then((res) => {
          this.bleDevice.disconnect();
        }).catch((error) => {
          this.bleDevice.disconnect();
        });
      } else {
        this.bleDevice.disconnect();
      }

    }
  }

  startDiscoverServices() {
    if (this.bleDevice) {
      this.updateState(`开始发现服务 startDiscoverServices  ${ ServiceUUID }`);
      this.bleDevice.startDiscoverServices(ServiceUUID);
    }
  }

  startDiscoverCharacteristics() {
    if (this.bleDevice && this.bleDevice.getService(ServiceUUID)) {
      this.bleDevice.getService(ServiceUUID).startDiscoverCharacteristics(WCharacteristicUUID, RCharacteristicUUID);
    }
  }

  write() {
    let value = '123123';
    this.updateState(`开始向特征值 ${ WCharacteristicUUID }  write data ${ value }`);
    this.logInfo(`开始向特征值 ${ WCharacteristicUUID }  write data ${ value }`);
    this.bleDevice.getService(ServiceUUID).getCharacteristic(WCharacteristicUUID).write(value)
      .then((ble) => {
        this.updateState(`特征值 ${ WCharacteristicUUID } 写数据成功...`);
        this.logInfo(`特征值 ${ WCharacteristicUUID } 写数据成功...`);
      })
      .catch((error) => {
        this.updateState(`写数据失败...${ JSON.stringify(error) }`);
        this.logInfo(`写数据失败...${ JSON.stringify(error) }`);
      });
  }

  logInfo(...messages) {
    console.log(...messages);
    console.log('----------------------------------------------\n');
  }

  updateState(txtInfo) {
    this.txtShowInfoIndex++;
    let info = `${ this.state.txtShowInfo + this.txtShowInfoIndex }、${ txtInfo }\n`;
    this.setState({
      txtShowInfo: info
    });
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SdkStyles.common.backgroundColor,
    flex: 1
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 18,
    color: '#ffffff'
  },
  textStyle1: {
    fontSize: 20,
    lineHeight: 22,
    color: '#333333',
    fontFamily: SdkFontStyle.FontKmedium,
    marginBottom: 20
  },
  btnStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center'
  }
});



