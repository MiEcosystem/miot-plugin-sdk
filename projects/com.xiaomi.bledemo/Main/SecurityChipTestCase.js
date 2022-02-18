import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Bluetooth, BluetoothEvent, Device, Host } from 'miot';

const { width } = Dimensions.get("window");
const lockUUIDService = '00001000-0065-6C62-2E74-6F696D2E696D';

const stateUUIDCharacteristic = '00001002-0065-6C62-2E74-6F696D2E696D';
const logUUIDCharacteristic = '00001003-0065-6C62-2E74-6F696D2E696D';


export default class TestCasePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectStatus: false,
      log: '',
      opeState: '',
      lockLog: ''
    };
  }

  componentDidMount(): void {
    this.checkBluetoothIsEnabled();
    this.addListener();
  }

  addListener=() => {
    // 蓝牙服务发现事件
    this.bluetoothSeviceDiscovered = BluetoothEvent.bluetoothSeviceDiscovered.addListener((bluetooth, services) => {
      console.log('蓝牙服务发现事件-成功 bluetoothSeviceDiscovered', bluetooth, services);

      if (services) {
        services.forEach((service) => {
          if (service.UUID.toUpperCase() === lockUUIDService) {
            // 通过服务发现对应的特征值
            console.log(`发现服务 ${ lockUUIDService }  开始startDiscoverCharacteristics...`);
            // Android 蓝牙连接成功后，会自动进行发现服务、特征值的操作, 因此无需再次调用发现特征值接口
            if (Host.isIOS) {
              this.startDiscoverCharacteristics();
            }
          }
        });
      }
    });
    // 蓝牙特征发现事件-成功
    this.bluetoothCharacteristicDiscovered = BluetoothEvent.bluetoothCharacteristicDiscovered.addListener((bluetooth, service, characters) => {
      console.log('蓝牙特征发现事件-成功 bluetoothCharacteristicDiscovered', service, characters);
      if (service.UUID.toUpperCase() === lockUUIDService) {
        characters.forEach((character) => {
          if (character.UUID.toUpperCase() === stateUUIDCharacteristic) {
            console.log('发现state特征值，开始setNotify');
            this.bleDevice.getService(lockUUIDService).getCharacteristic(stateUUIDCharacteristic).setNotify(true)
              .then((ble) => {
                console.log('state特征值setNotify成功');
              })
              .catch((error) => {
                console.log(`state特征值setNotify失败${ JSON.stringify(error) }`);
                this.updateState(`state特征值setNotify失败${ JSON.stringify(error) }`);
              });
          }
          if (character.UUID.toUpperCase() === logUUIDCharacteristic) {
            console.log('发现log特征值，开始setNotify');
            this.bleDevice.getService(lockUUIDService).getCharacteristic(logUUIDCharacteristic).setNotify(true)
              .then((ble) => {
                console.log('log特征值setNotify成功');
              })
              .catch((error) => {
                console.log(`log特征值setNotify失败${ JSON.stringify(error) }`);
                this.updateState(`state特征值setNotify失败${ JSON.stringify(error) }`);
              });
          }
        });
      }

    });

    this.bluetoothCharacteristicValueChanged = BluetoothEvent.bluetoothCharacteristicValueChanged.addListener((bluetooth, service, character, value) => {
      console.log('蓝牙特征值变更事件 bluetoothCharacteristicValueChanged', character, value);
      if (character.UUID.toUpperCase() === stateUUIDCharacteristic) {
        this.bleDevice.securityLock.decryptMessage(value)
          .then((msg) => {
            this.setState({
              opeState: msg
            });
          })
          .catch((error) => {
            this.updateState('decryptMessage error:', error);
          });
      }
      if (character.UUID.toUpperCase() === logUUIDCharacteristic) {
        this.bleDevice.securityLock.decryptMessage(value)
          .then((msg) => {
            this.setState({
              lockLog: msg
            });
          })
          .catch((error) => {
            this.updateState('decryptMessage error:', error);
          });
      }
    });
  }

  //  判断手机蓝牙是否打开
  checkBluetoothIsEnabled() {
    Bluetooth.checkBluetoothIsEnabled().then((enable) => {
      this.updateState(`checkBluetoothIsEnabled  enable=${ enable }`);
      // 没有开启蓝牙权限，则需要打开蓝牙权限
      if (!enable) {
        if (Host.isAndroid) {
          Bluetooth.enableBluetoothForAndroid(true);
        } else {
          Host.ui.showBLESwitchGuide();
        }
      } else {
        if (this.bleDevice && this.bleDevice.isConnected) {
          return;
        }
        this.connect();
      }
    }).catch((error) => {
      this.updateState('checkBluetoothIsEnabled error ', error);
    });
  }

  reconnect=() => {
    if (!this.state.connectStatus) {
      this.updateState('ble is connecting...');
      if (this.bleDevice && this.bleDevice.isConnected) {
        this.setState({ connectStatus: true });
        this.updateState('ble connect success');
        return;
      }
      this.connect();
    }
  }

  connect=() => {

    if (!this.bleDevice) {

      this.bleDevice = Device.getBluetoothLE();
      // 也可以如下方式创建蓝牙
      // let macOrPeripheralID = Host.isAndroid?Device.mac:this.peripheralUUIDIOS;
      // this.bleDevice = Bluetooth.createBluetoothLE(lockUUIDService);
    }

    this.updateState('ble is connecting...');
    if (this.bleDevice.isConnecting) {
      console.log('ble is connecting  return');
      return;
    }
    /**
     * Android调用connect方法，接下来会自动执行 bluetoothSeviceDiscovered   bluetoothCharacteristicDiscovered
     */
    this.bleDevice.connect(1, { timeout: 30000, forceReconnect: true })
      .then((blueData) => {
      // 这里的blueData是原生传递过来的数据(包括service信息等)，并不是当前蓝牙设备对象
        console.log('ble connect success ', blueData);
        this.setState({
          connectStatus: true
        });
        this.updateState('ble connect success');
        // Android 蓝牙连接成功后，会自动进行发现服务、特征值的操作, 因此无需再次调用发现服务接口
        if (Host.isIOS) {
          this.startDiscoverServices();
        }

      }).catch((error) => {
        this.updateState(`ble connect error:  ${ JSON.stringify(error) }\nclick here to reconnect!`);
      });
  }

  startDiscoverServices() {
    if (this.bleDevice) {
      console.log(`开始发现服务 startDiscoverServices  ${ lockUUIDService }`);
      this.bleDevice.startDiscoverServices(lockUUIDService);
    }
  }

  startDiscoverCharacteristics() {
    if (this.bleDevice && this.bleDevice.getService(lockUUIDService)) {
      this.bleDevice.getService(lockUUIDService).startDiscoverCharacteristics(logUUIDCharacteristic, stateUUIDCharacteristic);
    }
  }


  render(): React.ReactNode {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.connectStatus}>
            <Text>
              {'设备连接状态：'}
            </Text>
            <Text>
              {this.state.connectStatus ? '已连接' : '未连接'}
            </Text>
          </View>
          {this.renderItem('开锁', () => {
            if (!this.state.connectStatus) {
              return;
            }
            this.bleDevice.securityLock.toggle(0, 5000)
              .then((lock) => { this.updateState('toggle success', lock); })
              .catch((err) => { this.updateState('toggle failed:', err); });
          })}
          {this.renderItem('关锁', () => {
            if (!this.state.connectStatus) {
              return;
            }
            this.bleDevice.securityLock.toggle(1, 5000)
              .then((lock) => { this.updateState('toggle success', lock); })
              .catch((err) => { this.updateState('toggle failed:', err); });
          })}
          {this.renderItem('反锁', () => {
            if (!this.state.connectStatus) {
              return;
            }
            this.bleDevice.securityLock.toggle(2, 5000)
              .then((lock) => { this.updateState('toggle success', lock); })
              .catch((err) => { this.updateState('toggle failed:', err); });
          })}
          <Text style={[styles.logContainer, { color: this.state.connectStatus ? 'green' : 'red' }]} onPress={() => {
            this.reconnect();
          }}>
            {this.state.log}
          </Text>
          <Text style={styles.logContainer}>
            {`OperationState:\n${ this.state.opeState }`}
          </Text>
          <Text style={styles.logContainer}>
            {`LockLog:\n${ this.state.lockLog }`}
          </Text>
        </View>
      </ScrollView>
    );
  }

  updateState=(txtInfo) => {
    this.setState({
      log: txtInfo
    });
  }

  renderItem=(title, func) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={func}>
          <View style={styles.itemContent}>
            <Text>
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  componentWillUnmount(): void {
    if (this.bleDevice) {
      if (Host.isIOS) {
        Bluetooth.retrievePeripheralsWithServicesForIOS(lockUUIDService).then((res) => {
          this.bleDevice.disconnect();
        }).catch((error) => {
          this.bleDevice.disconnect();
        });
      } else {
        this.bleDevice.disconnect();
      }
    }
    this.bluetoothSeviceDiscovered && this.bluetoothSeviceDiscovered.remove();
    this.bluetoothCharacteristicDiscovered && this.bluetoothCharacteristicDiscovered.remove();
    this.bluetoothCharacteristicValueChanged && this.bluetoothCharacteristicValueChanged.remove();
  }

}
const styles = StyleSheet.create(
  {
    mainContainer: {
      flex: 1,
      flexDirection: 'column'
    },
    connectStatus: {
      marginTop: 10,
      marginLeft: width / 10,
      flexDirection: 'row'
    },
    itemContainer: {
      width: width,
      height: 85,
      alignItems: 'center',
      justifyContent: 'center'
    },
    itemContent: {
      height: 50,
      width: width * 4 / 5,
      backgroundColor: '#3CB371',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logContainer: {
      margin: 20
    }
  }
);
