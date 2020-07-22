/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * hmpace.watch.v1
 *
 */

import { Device, Host } from 'miot';
import TitleBar from 'miot/ui/TitleBar';
import { StringSpinner, CardButton } from 'miot/ui';
import React from 'react';
import { StyleSheet, View, NativeModules } from 'react-native';

const bt = Device.getBluetoothLE();
export default class MainPage extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { titleProps } = navigation.state.params || {};
    if (!titleProps) return { header: null };
    return { header: <TitleBar {...titleProps} /> };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      firmwareList: [{ name: '版本未获取', url: '' }],
      fake_dfu_url: '',
      fake_dfu_name: '',
      fake_dfu_md5: '',
      log: ''
    };
  }

  componentDidMount() {
    this.checkOTAVersion();
    this.props.navigation.setParams({
      titleProps: {
        leftText: 'Back',
        rightText: 'Setting',
        rightTextStyle: { width: 60 },
        onPressRight: _ => this.navigateToSetting()
      }
    });
  }

  componentWillUnmount() {
  }

  navigateToSetting() {
    this.props.navigation.navigate('setting');
  }

  navigateToBleControl() {
    this.props.navigation.navigate('blecontrol', { title: '蓝牙直连控制', sc_type: 5 });
  }

  navigateToRPCControl() {
    this.props.navigation.navigate('rpccontrol', { title: 'RPC控制', sc_type: 5 });
  }

  jump2BleSpec(){
    this.props.navigation.navigate('bleSpec',{title:'Ble Spec',sc_type:5})
  }

  doOTA(test = true) {
    test ? this.addLog('开启OTA测试 分包传输') : this.addLog('开启OTA DFU 分包传输');
    bt.startOTA(test);
  }

  addLog(string) {
    let { log } = this.state;
    log = string + '\n' + log;
    this.setState({ log });
  }

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
        const versionMap = infos.map(info => ({ name: info.version, url: info.sign_url === '' ? info.url : info.sign_url, md5: info.sign_url === '' ? info.fileMd5 : info.sign_fileMd5 }));
        const { url, name, md5 } = versionMap[0];
        this.setState({
          firmwareList: versionMap, fake_dfu_url: url, fake_dfu_name: name, fake_dfu_md5: md5
        });
      });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <CardButton
          title="RPC远程灯控制"
          subtitle="通过网关下发RPC请求控制灯的操作"
          icon={require('../Resources/icon_rpc_light.png')}
          onPress={() => {
            this.navigateToRPCControl();
          }}
        />
        <CardButton
          title="蓝牙直连控制"
          subtitle="用于蓝牙直连控制设备"
          icon={require('../Resources/icon_control.png')}
          onPress={() => {
            this.navigateToBleControl();
          }}
        />
        <CardButton
          title="Ble Spec"
          subtitle="用于ble spec 测试"
          icon={require('../Resources/icon_control.png')}
          onPress={() => {
            this.jump2BleSpec();
          }}
        />
        <CardButton
          title="更新固件列表"
          subtitle="更新下方固件列表，注意只能在内网环境下获取，获取失败请多点两次"
          icon={require('../Resources/icon_ota.png')}
          onPress={() => {
            this.checkOTAVersion();
          }}
        />
        <StringSpinner
          style={{ height: 150, backgroundColor: '#ffffff' }}
          dataSource={this.state.firmwareList.map(e => e.name)}
          defaultValue="1.4.0_0001"
          pickerInnerStyle={{
            lineColor: '#cc0000', textColor: '#ff0000', selectTextColor: '#0000FF', fontSize: 12, selectFontSize: 16, rowHeight: 30, selectBgColor: '#f5f5f5'
          }}
          onValueChanged={data => {
            const { url, name, md5 } = this.state.firmwareList.filter(e => e.name === data.newValue)[0];
            const a = this.state.firmwareList.filter(e => e.name === data.newValue);
            if (url !== undefined) {
              this.addLog('选择测试版本：' + data.newValue + ', 测试下载链接：' + JSON.stringify(url));
              this.setState({ fake_dfu_url: url, fake_dfu_name: name, fake_dfu_md5: md5 });
            }
            else {
              this.addLog('选择测试版本异常：' + JSON.stringify(data) + JSON.stringify(a));
            }

          }}
        />
        <CardButton
          title="指定版本升级"
          subtitle="使用上方指定的固件版本进行OTA升级，仅用于测试"
          icon={require('../Resources/icon_debug_dfu.png')}
          onPress={() => {
            if (this.state.fake_dfu_url === '' || this.state.fake_dfu_url === undefined) {
              this.addLog('请先选择需要升级的固件版本');
            }
            (Host.isAndroid ? NativeModules.MIOTHost : NativeModules.MHPluginSDK).openBleOtaDeviceUpgradePage({
              fake_dfu_url: this.state.fake_dfu_url, fake_dfu_name: 'debug:' + this.state.fake_dfu_name, md5: this.state.fake_dfu_md5, auth_type: 5
            });
          }}
        />
        <CardButton
          title="测试包版本升级"
          subtitle="使用固定OTA包测试传输流程-pack2"
          icon={require('../Resources/icon_debug_dfu.png')}
          onPress={() => {
            (Host.isAndroid ? NativeModules.MIOTHost : NativeModules.MHPluginSDK).openBleOtaDeviceUpgradePage({
              fake_dfu_url: 'http://cdn.cnbj0.fds.api.mi-img.com/miio_fw/signed_61e78f20104ac7829a92a2fade7189e1_upd_xiaomi.bledemo.v1.bin?Expires=1662354188000&GalaxyAccessKeyId=5721718224520&Signature=ovceIMsswqer7inteBdwRaaNNAY=', md5: '61e78f20104ac7829a92a2fade7189e1', fake_dfu_name: 'debug:1.1.0_0012', auth_type: 5
            });
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
