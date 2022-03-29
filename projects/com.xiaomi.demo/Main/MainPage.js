'use strict';

import {
  Device, Package, Host, Entrance, Service, DeviceEvent, PackageEvent, PrivacyEvent, CLOUD_PRIVACY_EVENT_TYPES, UserExpPlanEvent, USER_EXP_PLAN_EVENT_TYPES
} from "miot";
import NavigationBar from "miot/ui/NavigationBar";
import React from 'react';
import {
  Image, PixelRatio, StyleSheet, Text, TouchableHighlight, View, ListView
} from 'react-native';
import { getString } from './MHLocalizableString';
import Logger from './Logger';

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this._createMenuData();
    this.state = { dataSource: ds.cloneWithRows(this._menuData.map((o) => (o.name))) };
    Logger.trace(this);
    this.props.navigation.setParams({
      title: Device.name,
      subtitle: getString('NUM_PHOTOS', { 'numPhotos': 1 }),
      left: [{
        key: NavigationBar.ICON.CLOSE,
        onPress: () => Package.exit(),
        accessibilityLabel: '返回',
        accessibilityHint: '返回上一页'
      }],
      right: [{
        key: NavigationBar.ICON.MORE,
        onPress: () => this.props.navigation.navigate('Setting', { 'title': '设置' }),
        accessibilityLabel: '设置',
        accessibilityHint: '进入设置'
      }]
    });
  }

  _createMenuData() {
    this._menuData = [
      {
        'name': '常用功能',
        'func': () => {
          this.props.navigation.navigate('tutorialDemo', { title: '常用功能' });
        }
      },
      {
        'name': '设备控制(Device)',
        'func': () => {
          this.props.navigation.navigate('DeviceControl', { title: '设备控制(Device)' });
        }
      },
      {
        'name': 'Native交互(Host)',
        'func': () => {
          this.props.navigation.navigate('HostDemo', { title: 'Native交互(Host)' });
        }
      },
      {
        'name': '接口服务(Service)',
        'func': () => {
          this.props.navigation.navigate('ServiceDemo', { title: '接口服务(Service)' });
        }
      },
      {
        'name': 'UI能力(miot/ui)',
        'func': () => {
          this.props.navigation.navigate('UIDemo', { title: 'UI能力(miot/ui)' });
        }
      },
      {
        'name': '第三方库能力',
        'func': () => {
          this.props.navigation.navigate('ThirdPartyDemo', { title: '第三方库能力' });
        }
      },
      {
        'name': '旧-设置页面(不推荐使用)',
        'func': () => {
          this.props.navigation.navigate('moreMenu', { title: '设置页面(不推荐使用)' });
        }
      }
    ];
  }

  componentWillUnmount() {
    this._deviceOnlineListener && this._deviceOnlineListener.remove();
    this._packageReceivedInformation && this._packageReceivedInformation.remove();
    this._packageReceivedOutAppInformation && this._packageReceivedOutAppInformation.remove();
    this._cloudPrivacyEvent && this._cloudPrivacyEvent.remove();
    this._userExpPlanEvent && this._userExpPlanEvent.remove();
  }

  UNSAFE_componentWillMount() {
    this._deviceOnlineListener = DeviceEvent.deviceStatusChanged.addListener((device, newstatus) => {
      console.log(device.isOnline);
      alert(`设备状态改变:${ JSON.stringify(newstatus) }`);
    });
    this._packageReceivedInformation = PackageEvent.packageReceivedInformation.addListener((message) => {
      console.log(`收到通知数据：${ JSON.stringify(message) }`);
    });
    this._packageReceivedOutAppInformation = PackageEvent.packageReceivedOutAppInformation.addListener((message) => {
      console.log('收到外部APP传过来的参数', JSON.stringify(message, null, '\t'));
    });
    this._cloudPrivacyEvent = PrivacyEvent.cloudPrivacyEvent.addListener((message) => {
      console.log(`收到云端隐私通知数据：${ JSON.stringify(message) }`);
      if (!message) {
        console.log(`收到云端隐私通知数据为空`);
        return;
      }
      switch (message.eventType) {
        case CLOUD_PRIVACY_EVENT_TYPES.AGREED:
          break;
        case CLOUD_PRIVACY_EVENT_TYPES.POP_DIALOG_SUCCESS:
          break;
        case CLOUD_PRIVACY_EVENT_TYPES.FAILED:
          break;
        default:
          break;
      }
    });
    this._userExpPlanEvent = UserExpPlanEvent.userExpPlanEvent.addListener((message) => {
      console.log(`收到用户体验计划通知数据：${ JSON.stringify(message) }`);
      if (!message) {
        console.log(`收到用户体验计划通知数据为空`);
        return;
      }
      switch (message.userExpPlanEventType) {
        case USER_EXP_PLAN_EVENT_TYPES.AGREED:
          break;
        case USER_EXP_PLAN_EVENT_TYPES.POP_DIALOG_SUCCESS:
          break;
        case USER_EXP_PLAN_EVENT_TYPES.CANCELED:
          break;
        case USER_EXP_PLAN_EVENT_TYPES.DISABLED:
          break;
        default:
          break;
      }
    });
    console.log(`传递进来的 PageParams: ${ JSON.stringify(Package.pageParams) }`);
    console.log(`传递进来的 entryInfo: ${ JSON.stringify(Package.entryInfo) }`);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.list} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }

  componentDidMount() {
    console.log("MainPage  componentDidMount...");
    if (Package.pageParams.isBackToMainPage && Package.entrance !== Entrance.Main) {
      this.props.navigation.navigate(Package.entrance);
    }
    // 使用在线隐私之后需要去掉旧隐私逻辑
    // Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_auth_config"] }]).then((res) => {
    //   let alreadyAuthed = true;
    //   let result = res[Device.deviceID];
    //   let config;
    //   if (result && result['prop.s_auth_config']) {
    //     config = result['prop.s_auth_config'];
    //   }
    //   if (config) {
    //     try {
    //       let authJson = JSON.parse(config);
    //       console.log('auth config ', authJson);
    //       alreadyAuthed = authJson.privacyAuthed && true;
    //     } catch (err) {
    //       // json解析失败，不处理
    //     }
    //   } else {
    //     alreadyAuthed = false;
    //   }
    //   if (alreadyAuthed) {
    //     console.log("已经授权");
    //     return;
    //   }
    //   const licenseURL = require('../Resources/raw/license_zh.html');
    //   const privacyURL = require('../Resources/raw/privacy_zh.html');
    //   let options = {};
    //   options.agreementURL = licenseURL;
    //   options.privacyURL = privacyURL;
    //   // options.privacyURLForChildren = privacyURL;
    //   // options.privacyURLForWatch = privacyURL;
    //   options.experiencePlanURL = licenseURL;
    //   options.hideAgreement = false;
    //   options.hideUserExperiencePlan = false;
    //   // options.privacyURLForChildren = privacyURL;   // 如果有儿童隐私协议需要展示请传入此参数
    //   Host.ui.alertLegalInformationAuthorization(options).then((res) => {
    //     if (res === 'ok' || res === true || res === 'true') {
    //       Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_auth_config": JSON.stringify({ 'privacyAuthed': true }) } }]);
    //       PackageEvent.packageAuthorizationAgreed.emit();
    //       console.log("[Demo] 同意协议，进入插件");
    //     }
    //   }).catch((error) => {
    //     if (error === false || error === 'false') {
    //       console.log("[Demo] 不同意协议，插件退出", res);
    //       Package.exit();
    //       return;
    //     }
    //     console.log(error);
    //   });
    // }).catch({});
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor="#838383" onPress={() => this._pressRow(rowID)}>
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
    this._menuData[rowID].func();
    Logger.trace(this, this._pressRow, this._menuData[rowID]);
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
  list: { alignSelf: 'stretch' },
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
