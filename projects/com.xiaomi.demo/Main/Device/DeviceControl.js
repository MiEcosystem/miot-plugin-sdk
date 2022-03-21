'use strict';

import { Bluetooth, Device, Host, Service } from "miot";
import React from 'react';
import { ActionSheetIOS, Image, ListView, PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { PluginEntrance } from "../PluginEntrance";
import Logger from '../Logger';

let BUTTONS = [
  '测试对话框',
  '确定'
];

export default class UIDemo extends React.Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this._createMenuData();
    this.state = {
      dataSource: ds.cloneWithRows(this._menuData.map((o) => (o.name)))
    };
    Logger.trace(this);
  }

  _createMenuData() {
    this._menuData = [
      {
        'name': '开发板控制Demo',
        'func': () => {
          this.props.navigation.navigate('ControlDemo', { title: 'ControlDemo' });
        }
      },
      {
        'name': '设备互联',
        'func': () => {
          this.props.navigation.navigate('InterconnectionDemo', { title: '设备互联' });
        }
      },
      {
        'name': '设备互联页面',
        'func': () => {
          this.props.navigation.navigate('BTInterconnection', { title: '设备互联页面', category: '', sameRoom: true, minRssi: -70 });
        }
      },
      {
        'name': '手环设备互联页面',
        'func': () => {
          /**
           * 参数说明
           * mac: 已绑定的手环mac地址，如果已配置则走流程: 搜索->解绑，未配置则走流程：搜索->绑定
           * onDisconnect:(mac, callback), 点击解绑的回调，插件实现，成功callback true, 否则 false
           * onConnect: 点击绑定的回调，插件实现，成功 callback true, 否则 false
           */
          this.props.navigation.navigate('BraceletInterconnection', {
            title: '手环设备互联页面',
            // mac: '11:22:33:44:55:66',
            onDisconnect: (mac, callback) => {
              console.log('解除关联：', mac);
              setTimeout(() => {
                callback(true);
              }, 1 * 1000);
            },
            onConnect: (mac, callback) => {
              console.log('关联：', mac);
              setTimeout(() => {
                callback(true);
              }, 5 * 1000);
            },
            accessible: true,
            searchAccessibilityHint: '搜索hint',
            connectAccessibilityHint: '链接hint',
            disconnectAccessibilityHint: '断连hint'
          });
        }
      },
      {
        'name': 'RPC指令控制',
        'func': () => {
          this.props.navigation.navigate('RPCControl', { title: 'RPC指令控制' });
        }
      },
      {
        'name': '当前设备信息',
        'func': () => {
          this.props.navigation.navigate('DeviceDemo', { title: '当前设备信息' });
        }
      },
      {
        'name': '获取所有子设备',
        'func': () => {
          Device.getSubDevices().then((res) => {
            console.log('subdevices:', res);
            alert(`子设备共有${ res.length }个`);
          }).catch((err) => {
            console.log('error:', err);
            alert(`error:${ err }`);
          });
        }
      },
      {
        'name': '打开第一个子设备',
        'func': () => {
          Device.getSubDevices().then((res) => {
            if (res.length) {
              let device = res[0];
              Host.ui.openDevice(res[0].deviceID, res[0].model, { dismiss_current_plug: false });
            }
          }).catch((err) => {
            console.log('error:', err);
            alert(`error:${ err }`);
          });
        }
      },
      {
        'name': '打开第一个子设备(退出当前插件)',
        'func': () => {
          Device.getSubDevices().then((res) => {
            if (res.length) {
              Host.ui.openDevice(res[0].deviceID, res[0].model, { dismiss_current_plug: true });
            }
          }).catch((err) => {
            console.log('error:', err);
            alert(`error:${ err }`);
          });
        }
      },
      {
        'name': '打开插件的Setting页面(需要返回到插件首页)',
        'func': () => {
          let pageParams = {
            did: Device.deviceID,
            model: Device.model
          };
          Host.ui.openPluginPage(Device.deviceID, PluginEntrance.Setting, pageParams).then((res) => {
            // 此处最好不要做任何事, android会退出此插件
            console.log("res", res);
          }).catch((error) => {
            // 打开插件失败
            console.log("error", error);
          });
        }
      },
      {
        'name': '打开插件的Setting页面(不需要返回插件首页)',
        'func': () => {
          let pageParams = {
            did: Device.deviceID,
            model: Device.model,
            isBackToMainPage: false
          };
          Host.ui.openPluginPage(Device.deviceID, PluginEntrance.Setting, pageParams).then((res) => {
            // 此处最好不要做任何事, android会退出此插件
            console.log("res", res);
          }).catch((error) => {
            // 打开插件失败
            console.log("error", error);
          });
        }
      },
      {
        'name': '蓝牙token加密',
        'func': () => {
          let ble = Device.getBluetoothLE();
          console.log("ble:", ble, "lock", ble.securityLock);
          Device.getBluetoothLE().securityLock.encryptMessageWithToken("4C").then((res) => {
            console.log('encript success :', res);
            alert(`success result:${ res.result }`);
          }).catch((err) => {
            console.log(err);
            alert(`error:${ err }`);
          });
        }
      },
      {
        'name': '设备model信息',
        'func': () => {
          Device.loadRealDeviceConfig(Device.model).then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          });
        }
      },
      {
        'name': '指定model设备列表',
        'func': () => {
          Device.getDeviceWifi().requestAuthorizedDeviceListData(Device.model).then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          });
        }
      },
      {
        'name': '指定model设备列表v2',
        'func': () => {
          Host.ui.getDevicesWithModel(Device.model).then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          }).catch((err) => {
            alert(JSON.stringify(err, null, '\t'));
          });
        }
      },
      {
        'name': '打印设备经纬度',
        'func': () => {
          alert(JSON.stringify({ lat: Device.latitude, lng: Device.longitude }, null, '\t'));
        }
      },
      {
        'name': '使用当前手机位置作为设备的新位置信息',
        'func': () => {
          Device.reportDeviceGPSInfo();
        }
      },
      {
        'name': 'parentDevice',
        'func': () => {
          if (Device.parentDevice) {
            alert(`当前设备存在 父设备，父设备ID为${ Device.parentDevice.deviceID }`);
          } else {
            alert("当前设备没有parentDevice");
          }
        }
      },
      {
        'name': 'Android 手机NFC支持',
        'func': () => {
          Host.phoneHasNfcForAndroid().then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          }).catch((error) => {
            alert(JSON.stringify(error, null, '\t'));
          });
        }
      },
      {
        'name': '是否是HomeKit设备',
        'func': () => {
          Device.getDeviceWifi().checkIsHomeKitDevice().then((res) => {
            alert(`${ res ? "是" : "不是" } HomeKit 设备`);
          });
        }
      },
      {
        'name': '是否连接了HomeKit',
        'func': () => {
          Device.getDeviceWifi().checkHomeKitConnected().then((res) => {
            alert(`${ res ? "已经" : "没有" } 连入HomeKit`);
          });
        }
      },
      {
        'name': '添加到HomeKit',
        'func': () => {
          Device.getDeviceWifi().bindToHomeKit().then(() => {
            alert('添加成功');
          }).catch((error) => {
            alert(`添加失败${ JSON.stringify(error, null, '\t') }`);
          });
        }
      },
      {
        'name': '打开设备组添加页（支持设备组的设备调用此方法）',
        'func': () => {
          Host.ui.openAddDeviceGroupPage(Device.model);
        }
      },
      {
        'name': '打开设备组编辑页(设备组才可调用此方法)',
        'func': () => {
          Device.getDeviceWifi().getVirtualDevices().then((res) => {
            let devices = res.map((stat) => {
              return stat.deviceID;
            });
            Host.ui.openEditDeviceGroupPage(devices);
          }).catch((err) => {
            console.log(err);
          });
        }
      },
      {
        'name': '打开Mesh设备组添加页（支持mesh设备组的设备调用此方法）',
        'func': () => {
          Host.ui.openMeshDeviceGroupPage("add", Device.deviceID);
        }
      },
      {
        'name': '打开Mesh设备组编辑页（mesh设备组调用此方法）',
        'func': () => {
          Host.ui.openMeshDeviceGroupPage("edit", Device.deviceID);
        }
      },
      {
        'name': '获取设备时区信息',
        'func': () => {
          Device.getDeviceTimeZone().then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          }).catch((error) => {
            alert(JSON.stringify(error, null, '\t'));
          });
        }
      },
      {
        'name': '修改设备名称',
        'func': () => {
          Device.changeDeviceName("新名称").then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          }).catch((error) => {
            alert(JSON.stringify(error, null, '\t'));
          });
        }
      },
      {
        'name': '获取设备定向推荐信息',
        'func': () => {
          Device.getDeviceWifi().getRecommendScenes(Device.model, Device.deviceID).then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          }).catch((error) => {
            alert(JSON.stringify(error, null, '\t'));
          });
        }
      },
      {
        'name': '获取miot-spec设备当前信息',
        'func': async() => {
          let data = await Service.spec.getCurrentSpecValue(Device.deviceID);
          alert(JSON.stringify(data, null, '\t'));
        }
      },
      {
        'name': '获取同企业组所有设备',
        'func': () => {
          Device.getAllDevicesOfBelongedCompanies().then((res) => {
            alert(JSON.stringify(res));
          }).catch((error) => {
            alert(JSON.stringify(error));
          });
        }
      },
      {
        'name': '获取当前账号的当前家庭的DeviceList',
        'func': () => {
          Device.getHomeDeviceList().then((res) => {
            alert(JSON.stringify(res));
          }).catch((error) => {
            alert(JSON.stringify(error));
          });
        }
      },
      {
        'name': '获取设设备蓝牙信号强度(蓝牙子设备)',
        'func': () => {
          Bluetooth.getBtGateWaySubDeviceRSSI(Device.mac).then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          }).catch((err) => {
            alert(JSON.stringify(err, null, '\t'));
          });
        }
      },
      {
        'name': 'BLE/Mesh子设备是否连接网关',
        'func': () => {
          Bluetooth.isBleOrMeshGatewayConnected(Device.mac, true).then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          }).catch((err) => {
            alert(JSON.stringify(err, null, '\t'));
          });
        }
      },
      {
        'name': '设备隐私上报',
        'func': () => {
          let param = {
            privacyVersion: "",
            type: "accept",
            privacyType: 3,
            pluginPrivacyId: 1300,
            sysPermissionInfo:
              [{ permission_id: 101, status: 1 },
                { permission_id: 102, status: 0 }]
          };
          Device.setPrivacyConfirmation(param).then((res) => {
            alert(JSON.stringify(res, null, '\t'));
          }).catch((err) => {
            alert(JSON.stringify(err, null, '\t'));
          });
        }
      }
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.list} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor="#838383" onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{rowData}</Text>
            <Image style={styles.subArrow} source={require("../../Resources/sub_arrow.png")} />
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID) {
    console.log(`row${ rowID }clicked!`);
    this._menuData[rowID].func();
    Logger.trace(this, this._pressRow, this._menuData[rowID]);
  }

  onShowDidButtonPress() {
    this.props.navigation.navigate('helloDeveloper');
  }

  showReactART() {
    this.props.navigation.navigate('helloReactART');
  }

  showActionSheet() {
    if (Host.isIOS)
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        destructiveButtonIndex: 1
      }, () => {

      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 0,
    marginTop: 0
  },
  rowContainer: {
    height: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1
  },
  list: {
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1
  },
  subArrow: {
    width: 7,
    height: 14
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
    marginLeft: 20
  }
});
