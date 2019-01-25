'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  Image,
  TouchableHighlight,
  Component,
  PixelRatio,
  ActionSheetIOS,
} from 'react-native';
import { Host, DeviceEvent } from "miot";
import { TitleBarBlack } from 'miot/ui';

var BUTTONS = [
  '测试对话框',
  '确定',
];

export default class MoreMenu extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: <TitleBarBlack title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
        onPressLeft={() => { navigation.goBack(); }} />,
    };
  };

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this._createMenuData();
    this.state = {
      dataSource: ds.cloneWithRows(this._menuData.map((o) => (o.name))),
    };
  }

  _createMenuData() {
    this._menuData = [
      {
        'name': '你好，开发者！',
        'func': () => {
          this.onShowDidButtonPress();
        }
      },
      {
        'name': '弹出Alert',
        'func': () => {
          alert('测试对话框');
        }
      },
      {
        'name': '弹出ActionSheet',
        'func': () => {
          this.showActionSheet();
        }
      },
      {
        'name': 'REACT-ART',
        'func': () => {
          this.showReactART();
        }
      },
      {
        'name': '高德地图',
        'func': () => {
          this.props.navigation.navigate('mhMapDemo', { 'title': '高德地图Demo' });
        }
      },
      {
        'name': '音频',
        'func': () => {
          this.props.navigation.navigate('audioDemo', { 'title': '音频Demo' });
        }
      },
      {
        'name': '视频',
        'func': () => {
          this.props.navigation.navigate('videoDemo', { 'title': '视频Demo' });
        }
      },
      {
        'name': '新目录结构获取图片方式测试',
        'func': () => {
          this.props.navigation.navigate('imagePathDemo', { 'title': '新目录结构获取图片方式测试' });
        }
      },
      {
        'name': '修改设备名称',
        'func': () => {
          Host.ui.openChangeDeviceName();
        }
      },
      {
        'name': '设备共享',
        'func': () => {
          Host.ui.openShareDevicePage();
        }
      },
      {
        'name': '检查固件升级',
        'func': () => {
          Host.ui.openDeviceUpgradePage();
        }
      },
      {
        'name': '删除设备',
        'func': () => {
          Host.ui.openDeleteDevice();
        }
      },
      {
        'name': '删除设备时自定义提示',
        'func': () => {
          Host.ui.openDeleteDevice("😘 🍚 🐰");
        }
      },
      {
        'name': '安全设置',
        'func': () => {
          Host.ui.openSecuritySetting();
        }
      },
      {
        'name': '常见问题',
        'func': () => {
          Host.ui.openHelpPage();
        }
      },
      {
        'name': '反馈问题',
        'func': () => {
          Host.ui.openFeedbackInput();
        }
      },
      {
        'name': '语音设备授权',
        'func': () => {
          Host.ui.openVoiceCtrlDeviceAuthPage();
        }
      },
      {
        'name': '分享',
        'func': () => {
          Host.ui.openShareListBar('小米智能家庭', '小米智能家庭', { uri: 'https://avatars3.githubusercontent.com/u/13726966?s=40&v=4' }, 'https://iot.mi.com/new/index.html');
        }
      },
      {
        'name': '获取设备列表数据',
        'func': () => {
          Host.ui.getDevicesWithModel("xiaomi.watch.band2", (success, devices) => {
            if (success) {
              alert(JSON.stringify(devices));
            }
          })
        }
      },
      {
        'name': "开启倒计时",
        'func': () => {
          Host.ui.openCountDownPage(false, {});
        }
      },
      {
        'name': '打开自动化界面',
        'func': () => {
          Host.ui.openIftttAutoPage();
        }
      },
      {
        'name': '位置管理',
        'func': () => {
          Host.ui.openRoomManagementPage();
        }
      },
      {
        'name': '时区设置',
        'func': () => {
          Host.ui.openDeviceTimeZoneSettingPage();
        }
      },
      {
        'name': '添加到桌面',
        'func': () => {
          Host.ui.openAddToDesktopPage();
        }
      },
      {
        'name': '蓝牙网关',
        'func': () => {
          Host.ui.openBtGatewayPage();
        }
      },
      {
        'name': '查看使用条款和隐私协议',
        'func': () => {
          const licenseURL = require('../Resources/raw/license_zh.html');
          const policyURL = require('../Resources/raw/privacy_zh.html');
          Host.ui.privacyAndProtocolReview('软件许可及服务协议', licenseURL, '隐私协议', policyURL);
        }
      },
      {
        'name': '授权使用条款和隐私协议',
        'func': () => {
          const licenseURL = require('../Resources/raw/license_zh.html');
          const policyURL = require('../Resources/raw/privacy_zh.html');
          Host.ui.openPrivacyLicense('软件许可及服务协议', licenseURL, '隐私协议', policyURL, (result) => {
            if (result === 'ok') {
              // 同意授权
            } else {
              // 取消授权，默认退出插件
            }
          });
        }
      }
    ];
  }

  componentDidMount(){
    this.listenter = DeviceEvent.deviceTimeZoneChanged.addListener((val)=>{
      console.log("deviceTimeZoneChanged", val);
    })
  }

  componentWillUnmount() {
    
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
      <TouchableHighlight underlayColor='#838383' onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{rowData}</Text>
            <Image style={styles.subArrow} source={require("../Resources/sub_arrow.png")} />
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID) {
    console.log("row" + rowID + "clicked!");
    this._menuData[rowID].func();
  }

  onShowDidButtonPress() {
    this.props.navigation.navigate('helloDeveloper');
  }

  showReactART() {
    this.props.navigation.navigate('helloReactART');
  }

  showChart() {
    this.props.navigator.push(ChartDemo.route);
  }

  showActionSheet() {
    if (Host.isIOS)
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        destructiveButtonIndex: 1,
      },
        (buttonIndex) => {

        });
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 0,
    marginTop: 0,
  },

  rowContainer: {
    height: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1,
  },
  list: {
    alignSelf: 'stretch',
  },

  title: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1,
  },
  subArrow: {
    width: 7,
    height: 14,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
    marginLeft: 20,
  }
});
