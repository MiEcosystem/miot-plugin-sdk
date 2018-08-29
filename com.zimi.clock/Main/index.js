'use strict';

import React from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  PixelRatio,
  DeviceEventEmitter,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { TitleBarBlack } from 'miot/ui';
import { Device, Host, Package, Service, DeviceEvent } from "miot";
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import TravelSetting from './TravelSetting/TravelSetting';
import Address from './TravelSetting/Address';
import SmartHomeDetail from './SmartHome/SmartHomeDetail';
import SmartHome from './SmartHome/SmartHome';
import ChatHistory from './ChatHistory/ChatHistory';
import AddReminder from './Reminder/AddReminder';
import Reminder from './Reminder/Reminder';
import Timer from './Timer/Timer';
import SceneMain from './SceneMain';
import MainPage from './MainPage';
import MHSetting from './MHSetting';
import Weather from './Weather/Weather';
import Travel from './Travel/Travel';
import Clock from './Clock/Clock';
import AddClock from './Clock/AddClock';
import Circle from './CommonComponents/Circle';
import Ring from './CommonComponents/Ring';

const RootStack = createStackNavigator(
  {
    TravelSetting: TravelSetting,
    Address: Address,
    SmartHomeDetail: SmartHomeDetail,
    SmartHome: SmartHome,
    ChatHistory: ChatHistory,
    AddReminder: AddReminder,
    Reminder: Reminder,
    Timer: Timer,
    SceneMain: SceneMain,
    MainPage: MainPage,
    MHSetting: MHSetting,
    Weather: Weather,
    Travel: Travel,
    Clock: Clock,
    AddClock: AddClock,
    Circle: Circle,
    Ring: Ring,
  },
  {
    initialRouteName: 'MainPage',
    navigationOptions: ({ navigation }) => {
      return {
        header:
          <TitleBarBlack
            title={navigation.state.params ? navigation.state.params.title : ''}
            style={{ backgroundColor: '#fff' }}
            onPressLeft={() => { navigation.goBack() }}
          />,
      };
    },
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
  }
);

var MHPluginSDK = require('NativeModules').MHPluginSDK;
import MHGlobalData from './CommonComponents/MHGlobalData';
var { height: screenHeight, widt: screenWidth } = Dimensions.get('window');
var LocalizedStrings = require('./CommonComponents/MHLocalizableString.js').string;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (Package.extraInfo && (Package.extraInfo.trigger || Package.extraInfo.action) && SceneMain) { //自定义场景入口
      this._firstPage = SceneMain;
    }
    else { // 正常进入插件首页
      this._firstPage = MainPage;
    }
    this.state = {
    }
  }

  _openPolicyLicense() {
    Host.storage.get('agreeLicense').then((value) => {
      if (!value) {
        Host.ui.openPrivacyLicense(LocalizedStrings.license, require('../Resources/raw/license_zh.html'), LocalizedStrings.policy, require('../Resources/raw/privacy_zh.html'), (result) => {
          if (result) {
            Host.storage.set('agreeLicense', 'true');
            MHGlobalData.agreeLicense = true;
            console.log("用户选择同意并继续");
          }
        })
      } else {
        MHGlobalData.agreeLicense = true;
      }
    });
  }

  _syncConfig() {
    let ring, configVersion, versionRemote, fetchRing;
    let ringCache = () => {
      MHGlobalData.ring = ring;
      MHGlobalData.configVersion = configVersion;
      DeviceEventEmitter.emit('ringOptionsLoaded', {});
    }
    Device.callMethod("get_config_version", ["audio"]).then((json) => {
      versionRemote = json.result[0];
      console.log("最新铃声配置版本", versionRemote);
      fetchRing = () => {
        var data = {
          lang: "zh_CN",
          name: "mijia_clock_audio_preview",
          version: String(versionRemote)
        }
        var url = MHGlobalData.configUrl + JSON.stringify(data);
        fetch(url)
          .then(response => response.json())
          .then(json => {
            if (json.result) {
              console.log("最新的铃声列表", json.result.content);
              ring = JSON.parse(json.result.content);
              configVersion = versionRemote;
              ringCache();
            }
          })
          .catch((error) => {
            // MHPluginSDK.showFailTips(error);
            console.log("拉取最新铃声列表失败", error);
          });
      }
    }).catch((json) => {
      console.log("获取配置版本失败", JSON.stringify(json));
    }).done(() => {
      Host.storage.load(['configVersion', 'ring']).then(info => {
        console.log("本地缓存", info);
        // 有缓存
        if (info && info[0] && info[1]) {
          // 缓存不需要更新 / 获取配置版本失败
          ring = info[1];
          configVersion = info[1];
          ringCache();
          // 缓存需要更新
          if (info[1] !== versionRemote) {
            console.log("铃声列表需要更新");
            fetchRing && fetchRing();
          }
        }
        // 第一次拉取，无缓存
        else {
          if (fetchRing) {
            fetchRing();
          }
          else {
            // MHPluginSDK.showFailTips(LocalizedStrings.fetchConfigVersionFail);
          }
        }
      });
    });

    // 获取工作日配置
    Host.storage.load(['reminderLater', 'workdayVersion', 'workday']).then(info => {
      console.log("获取工作日配置 info", info);
      if (info === null || info[0] === undefined) {
        MHGlobalData.reminderLater = true;
      } else {
        MHGlobalData.reminderLater = info[0];
      }
      var yearNow = new Date().getFullYear();
      if (info === null || !info[1] || !info[2] || info[1] !== yearNow) {
        console.log("工作日不存在或者需要更新");
        var data = {
          "lang": "zh_CN",
          "name": "mijia_clock_workday_preview",
          "version": String(yearNow)
        };
        var url = MHGlobalData.configUrl + JSON.stringify(data);
        fetch(url)
          .then(response => response.json())
          .then(json => {
            if (json) {
              MHGlobalData.workday = JSON.parse(json.result.content);
              MHGlobalData.workdayVersion = yearNow;
              console.log("保存工作日配置");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("工作日存在并且是最新版本");
        MHGlobalData.workday = info[2];
        MHGlobalData.workdayVersion = yearNow;
      }
    })
  }

  componentWillMount() {
    this._openPolicyLicense();
    this._syncConfig();
    // 用户撤销隐私授权时回调，清空info数据，重新快联设备
    this._deviceCancelAuthorization = DeviceEventEmitter.addListener(DeviceEvent.deviceAuthorizationCancel, (event) => {
      Host.storage.set('agreeLicense', '');
      console.log("用户撤销隐私授权");
    });
  }

  componentDidMount() {
    // 订阅设备倒计时的状态
    Device.subscribeMessages("event.count_down");
    console.log("Host.systemInfo.mobileModel", Host.systemInfo ? Host.systemInfo.mobileModel : "");
    console.log("MHGlobalData.APPBAR_HEIGHT", MHGlobalData.APPBAR_HEIGHT);
    console.log("MHGlobalData.APPBAR_MARGINTOP", MHGlobalData.APPBAR_MARGINTOP);
    console.log("MHGlobalData.APP_MARGINTOP", MHGlobalData.APP_MARGINTOP);
  }

  componentWillUnmount() {
    this._deviceCancelAuthorization.remove();
  }

  render() {
    return <RootStack />;
  }
}
