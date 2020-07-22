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
import { StringSpinner } from 'miot/ui';
import Host from 'miot/Host';
import React from 'react';
import {
  ScrollView, StyleSheet, Text, View, NativeModules
} from 'react-native';

import CommonCell from './CommonCell';

const bt = Device.getBluetoothLE();

//uuids for testing.
const UUID_SERVICE = '00000100-0065-6C62-2E74-6F696D2E696D';
const UUID_LED_READ_WRITE = '00000101-0065-6C62-2E74-6F696D2E696D';
const UUID_BUTTON_READ_WRITE_NOTIFY = '00000102-0065-6C62-2E74-6F696D2E696D';

export default class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isEnable: false,
      connectState: '未连接',
      lightStatu: false,
      lightBrightness: 0,
      log: '',
      firmwareList: [{ name: '版本未获取', url: '' }],
      fake_dfu_url: '',
      fake_dfu_name: ''
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
    this.checkOTAVersion();
    this.readLightProp();
  }

  componentWillUnmount() {
    this.showing = false;
  }

  addLog(string) {
    let { log } = this.state;
    log = string + '\n' + log;
    this.setState({ log });
  }

  ////////////////////////////////
  //  *Mesh bluetooth operation*  //
  
  ////////////////////////////////
  //  *Mesh light RPC* //
  readLightProp() {
    const params = [{ did: Device.deviceID, siid: 2, piid: 1 }, { did: Device.deviceID, siid: 2, piid: 2 }];
    Service.spec.getPropertiesValue(params).then(result => {
      if (result instanceof Array && result.length >= 2) {
        const onProp = result[0];
        const lightStatu = onProp.value;
        const brightProp = result[1];
        const lightBrightness = brightProp.value;
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

  ////////////////////////////////
  // * OTA version list fetch* //
  checkOTAVersion() {
    fetch('http://support.io.mi.srv/product/if_productinfo?model=' + Device.model)
      .then(response => response.json())
      .then(response => {
        const fileName = response.result.update_file;
        if (fileName === undefined) {
          return new Promise.reject('fetch version failed');
        }
        return fetch('http://support.io.mi.srv/product/if_firmware_versionlist?name=' + fileName);
      })
      .then(response => response.json())
      .then(response => {
        const infos = response.result;
        const versionMap = infos.map(info => ({ name: info.version, url: info.sign_url === '' ? info.url : info.sign_url }));
        const { url, name } = versionMap[0];
        this.setState({ firmwareList: versionMap, fake_dfu_url: url, fake_dfu_name: name });
      })
      .catch(err => {
        this.addLog('获取OTA版本列表失败：' + JSON.stringify(err));
      });
  }
  ////////////////////////////////

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
            <CommonCell title="更新固件列表" onPress={() => this.checkOTAVersion()} />
            <CommonCell title="固件升级-旧" onPress={() => Host.ui.openBleMeshDeviceUpgradePage()} />
            <CommonCell
              title="新-固件升级-指定DFU"
              onPress={() => {
                if (this.state.fake_dfu_url === '' || this.state.fake_dfu_url === undefined) {
                  this.addLog('请先选择需要升级的固件版本');
                }
                (Host.isAndroid ? NativeModules.MIOTHost : NativeModules.MHPluginSDK).openBleOtaDeviceUpgradePage({ fake_dfu_url: this.state.fake_dfu_url, fake_dfu_name: 'debug:' + this.state.fake_dfu_name, auth_type: 5 });
              }}
            />
            <CommonCell title="新-固件升级-常规" onPress={() => (Host.isAndroid ? NativeModules.MIOTHost : NativeModules.MHPluginSDK).openBleOtaDeviceUpgradePage({ auth_type: 5 })} />
          </View>
          <ScrollView style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'black' }}>
            <Text>
蓝牙状态：
              {this.state.connectState}
            </Text>
            <Text style={{ color: !this.state.lightStatu ? 'red' : 'green' }}>
测试灯状态：
              {this.state.lightStatu ? '开启' : '关闭'}
            </Text>
            <Text style={{ color: !this.state.lightStatu ? 'red' : 'green' }}>
测试灯亮度：
              {'' + this.state.lightBrightness}
            </Text>
            <Text style={{ color: 'black', marginTop: 30 }}>
左侧选择 ’新-固件升级-指定DFU’时,将强制写入下方选择的DFU版本。更新完成之后查看版本即可。更新点击 ‘检测固件版本’：
            </Text>
            <StringSpinner
              style={{ width: 300, height: 100, backgroundColor: '#ffffff' }}
              dataSource={this.state.firmwareList.map(e => e.name)}
              defaultValue="1.4.0_0001"
              pickerInnerStyle={{
                lineColor: '#cc0000', textColor: '#ff0000', selectTextColor: '#0000FF', fontSize: 12, selectFontSize: 16, rowHeight: 30, selectBgColor: '#f5f5f5'
              }}
              onValueChanged={data => {
                const { url, name } = this.state.firmwareList.filter(e => e.name === data.newValue)[0];
                const a = this.state.firmwareList.filter(e => e.name === data.newValue);
                if (url !== undefined) {
                  this.addLog('选择测试版本：' + data.newValue + ', 测试下载链接：' + JSON.stringify(url));
                  this.setState({ fake_dfu_url: url, fake_dfu_name: name });
                }
                else {
                  this.addLog('选择测试版本异常：' + JSON.stringify(data) + JSON.stringify(a));
                }
              }}
            />
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
