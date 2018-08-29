'use strict';

import React from 'react';

import {
  ScrollView,
  RefreshControl,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  ImageBackground,
  View,
  PixelRatio,
  StatusBar,
  DeviceEventEmitter, Platform
} from "react-native";
import { Device, DeviceEvent, Host, Package } from "miot";
import { TitleBarBlack } from 'miot/ui';
import MHGlobalData from './CommonComponents/MHGlobalData';
var LocalizedStrings = require('./CommonComponents/MHLocalizableString').string;
import Setting from './MHSetting';
import ImageButton from '../CommonModules/ImageButton';

import Clock from './Clock/Clock';
import Reminder from './Reminder/Reminder';
import Timer from './Timer/Timer';

import SmartHome from './SmartHome/SmartHome';
import ChatHistory from './ChatHistory/ChatHistory';
import Travel from './Travel/Travel';
import Weather from './Weather/Weather';
import * as DateUtil from "./Utils/DateUtil";

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const ratioW = (screenWidth / (698 + 2 * 26));
var mainTitle = Device.name;
/*
服务器返回数据格式
{
  "id": "1",
  "type": 0,
  "circle": "once",
  "datetime": "2018-05-11T11:03:22+0800",
  "status": "off",
  "circle_extra": null,
  "event": null,
  "reminder": null,
  "reminder_audio": "/usr/share/sounds/alarm.mp3",
  "volume": 100,
  "ringtone": "/usr/share/sounds/alarm.mp3",
  "update_datetime": "2017-11-02T16:33:20+0800",
  "disable_datetime": null
}
*/

export default class MainPage extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBarBlack
          title={navigation.state["params"] ? navigation.state.params.name : Device.name}
          style={{ backgroundColor: '#fff' }}
          onPressLeft={() => { Package.exit() }}
          onPressRight={() => {
            navigation.navigate('MHSetting', { 'title': '设置' });
          }}
        />
    };
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      refreshing: false,
      clocks: [],
      reminders: [],
      offset: 0,
      timerRun: false,

      clockData: [],
      reminderData: [],
      timerData: [],

      clockNum: 0,
      reminderNum: 0,

      clockDetail: "",
      reminderDetail: "",
      timerDetail: "",
    };
  }

  render() {
    var clock = this._createMainRow(Clock, 'clock');
    var reminder = this._createMainRow(Reminder, 'reminder');
    var timer = this._createMainRow(Timer, 'timer');

    var smartHome = this._createMenuRow(SmartHome);
    var chatHistory = this._createMenuRow(ChatHistory);
    var travel = this._createMenuRow(Travel);
    var weather = this._createMenuRow(Weather);

    return (
      <ScrollView
        style={styles.containerAll}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />}>
        <StatusBar barStyle="default" />
        <View style={styles.container}>
          {clock}
          {reminder}
          {timer}
          <Text style={{ alignSelf: "flex-start", marginTop: 26 * ratioW, marginLeft: 40 * ratioW, fontSize: 26 * ratioW, color: "rgba(0, 0, 0, 0.4)" }}>
            {LocalizedStrings.skillCenter}
          </Text>
          <View style={styles.separator} />
          {smartHome}
          {Device.isOwner && chatHistory}
          {travel}
          {weather}
        </View>
        <View style={{ height: 60 * ratioW }}></View>
      </ScrollView>
    );
  }

  _onRefresh() {
    // this.setState({ refreshing: true });
    this._queryClocks();
    this._queryReminders();
    this._queryTimer();
  }

  _createMainRow(component) {
    var key = component.name;
    var iconLeftUri, number, mainTitle, unit, subTitle;
    switch (key) {
      case "Clock":
        iconLeftUri = require("../Resources/home/clock_home_alarmclock_bg_normal.png");
        number = this.state.clockNum ? this.state.clockNum : "";
        mainTitle = LocalizedStrings.clock + " " + number;
        unit = "";
        if (this.state.clockNum) {
          unit = this.state.clockNum === 1 ?
            LocalizedStrings.copy :
            LocalizedStrings.copys;
        }
        subTitle = this.state.clockDetail;
        break;
      case "Reminder":
        iconLeftUri = require("../Resources/home/clock_home_remind_bg_normal.png");
        number = this.state.reminderNum ? this.state.reminderNum : "";
        mainTitle = LocalizedStrings.reminder + " " + number;
        unit = "";
        if (this.state.reminderNum) {
          unit = this.state.reminderNum === 1 ?
            LocalizedStrings.item :
            LocalizedStrings.items;
        }
        subTitle = this.state.reminderDetail;
        break;
      case "Timer":
        iconLeftUri = require("../Resources/home/clock_home_countdown_bg_normal.png");
        mainTitle = LocalizedStrings.countdown;
        unit = "";
        subTitle = this.state.timerDetail;
        break;
    }

    const imageWidth = 698 * ratioW;
    const imageHeight = 214 * ratioW;

    return (
      <TouchableHighlight
        key={"touch_" + key}
        style={{ justifyContent: "center", marginBottom: 20 * ratioW }}
        underlayColor='rgba(255,255,255,0)'
        onPress={() => this._onOpenSubPage(component)}
      >
        <ImageBackground
          source={iconLeftUri}
          style={{ borderRadius: 6, width: imageWidth, height: imageHeight, justifyContent: "center" }}
        >
          <Text style={styles.mainTitle}>
            {mainTitle}
            <Text style={styles.mainSubTitle}>{unit}{'\n'}{subTitle}</Text>
          </Text>
        </ImageBackground>
      </TouchableHighlight>
    );
  }

  _createMenuRow(component) {
    var key = component.name;
    var iconLeftUri, title, subTitle;

    switch (key) {
      case "SmartHome":
        iconLeftUri = require("../Resources/home/clock_home_icon_smarthome_normal.png");
        title = LocalizedStrings.smartHome;
        subTitle = LocalizedStrings.smartHomeSubTitle;
        break;
      case "ChatHistory":
        iconLeftUri = require("../Resources/home/clock_home_icon_dialogue_normal.png");
        title = LocalizedStrings.chatRecord;
        subTitle = LocalizedStrings.chatRecordSubTitle;
        break;
      case "Travel":
        iconLeftUri = require("../Resources/home/clock_home_icon_travel_normal.png");
        title = LocalizedStrings.travel;
        subTitle = LocalizedStrings.travelSubTitle;
        break;
      case "Weather":
        iconLeftUri = require("../Resources/home/clock_home_icon_weather_normal.png");
        title = LocalizedStrings.weather;
        subTitle = LocalizedStrings.weatherSubTitle;
        break;
    }

    return (
      <TouchableHighlight
        key={"touch_" + key}
        style={{ width: screenWidth, paddingLeft: 15, paddingRight: 20, height: 68, justifyContent: "center" }}
        underlayColor='rgba(200,200,200,0.3)'
        onPress={() => this._onOpenSubPage(component)}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Image
            source={iconLeftUri}
            style={styles.menuIcon}
          />
          <View>
            <Text style={styles.menuTitle}>{title}</Text>
            <Text style={styles.menuSubTitle}>{subTitle}</Text>
          </View>
          <Image
            source={require('../Resources/common/clock_home_icon_forward_normal.png')}
            style={styles.rightArrow}
          />
        </View>
      </TouchableHighlight >
    );
  }

  _onOpenSubPage(subPageComponent) {
    console.log("leave mainpage");
    clearInterval(this.timerId);
    this.timerId = null;
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = undefined;
    }

    var key = subPageComponent.name;
    var passProps = {};
    switch (key) {
      case "Clock":
        passProps = {
          updateMainPage: () => this._queryClocks(),
        }
        break;
      case "Reminder":
        passProps = {
          updateMainPage: () => this._queryReminders(),
        }
        break;
      case "Timer":
        passProps = {
          updateMainPage: () => this._queryTimer(),
        }
        break;
    }
    this.props.navigation.navigate(key, passProps);
  }

  componentWillMount() {
    // 设置中改名之后，首页title同步改名
    this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener((device) => {
      this.props.navigation.setParams({
        name: device.name
      });
      this.forceUpdate();
    });
    this._subscribe();
  }

  _setTimer(min, sec) {
    var seconds = min * 60 + sec;
    this.setState({
      timerRun: true,
      offset: seconds,
      timerDetail: LocalizedStrings.enabling + Math.floor(min / 10) + min % 10 + ":" + Math.floor(sec / 10) + sec % 10,
    });
    clearInterval(this.timerId);
    this.timerId = null;
    this.timerId = setInterval(() => {
      if (--seconds < 0) {
        clearInterval(this.timerId);
        this.timerId = null;
        this.setState({
          timerRun: false,
          offset: 0,
          timerDetail: LocalizedStrings.noCountdownSet
        });
      } else {
        if (--sec < 0) {
          sec = 59;
          min--;
        }
        seconds = min * 60 + sec;
        this.setState({
          offset: seconds,
          timerDetail: LocalizedStrings.enabling + Math.floor(min / 10) + min % 10 + ":" + Math.floor(sec / 10) + sec % 10,
        });
      }
    }, 1000);
    console.log(this.timerId);
  }

  // 优化拉取逻辑，只需要拉取第一份就行
  // 设备返回的数据是按照时间顺序排序，且过期在最后
  _queryClocks() {
    var params = { "operation": "query", "req_type": "alarm", "index": 0 };
    Device.callMethod("alarm_ops", params).then((json) => {
      this.setState({ refreshing: false });
      console.log("mainpage _queryClocks res json", json);
      // 闹钟个数总和
      this.setState({ clockNum: json.result[0] + json.result[1].length });
      if (json.result[1].length > 0) {
        var clock = json.result[1][0];
        console.log("mainpage _queryClocks clock", clock);
        if (clock.s === "off") {
          // all off
          this.setState({
            clockDetail: LocalizedStrings.noClockAble,
          });
        } else {
          // not all off
          if (MHGlobalData.env) {
            clock.date = new Date(DateUtil._local2UTC(clock.d)); // 真机环境
          } else {
            clock.date = new Date(clock.d); // chrome 环境
          }
          this.setState({
            clockDetail: DateUtil._formatClockData(clock).leftTime,
          });
        }
      } else {
        this.setState({
          clockDetail: LocalizedStrings.noClockSet,
        });
      }
    }).catch((json) => {
      console.log(json);
    });
  }

  _queryReminders() {
    var params = { "operation": "query", "req_type": "reminder", "index": 0 };
    Device.callMethod("alarm_ops", params).then((json) => {
      this.setState({ refreshing: false });
      console.log("mainpage _queryReminders res json", json);
      this.setState({ reminderNum: json.result[0] + json.result[1].length });
      if (json.result[1].length > 0) {
        var reminder = json.result[1][0];
        if (reminder.s === "off") {
          this.setState({
            reminderDetail: LocalizedStrings.noReminderAble,
          });
        } else {
          if (MHGlobalData.env) {
            reminder.date = new Date(DateUtil._local2UTC(reminder.d)); // 真机环境
          } else {
            reminder.date = new Date(reminder.d); // chrome 环境
          }
          this.setState({
            reminderDetail: DateUtil._formatReminderDetail(reminder),
          });
        }
      } else {
        this.setState({
          reminderDetail: LocalizedStrings.noReminderSet,
        });
      }
    }).catch((json) => {
      console.log(json);
    });
  }

  _initTimerState(offset) {
    if (offset > 0) {
      var min = Math.floor(offset / 60);
      var sec = offset % 60;
      this._setTimer(min, sec);
    } else {
      this.setState({
        timerDetail: LocalizedStrings.noCountdownSet,
        offset: 0,
      });
    }
  }

  componentDidMount() {
    this._onRefresh();
  }

  _queryTimer() {
    Device.callMethod("get_count_down", []).then((json) => {
      this.setState({ refreshing: false });
      console.log("mainpage _queryTimer res json", json);
      var offset = 0;
      var result = json.result;
      if (result[0] !== "none") {
        if (result[0] === "running") {
          offset = Math.round((result[3] - new Date().getTime()) / 1000);
          this._initTimerState(offset);
        } else {
          offset = result[2];
          clearInterval(this.timerId);
          this.timerId = null;
          var min = Math.floor(offset / 60);
          var sec = offset % 60;
          this.setState({
            offset: offset,
            timerDetail: LocalizedStrings.enabling + Math.floor(min / 10) + min % 10 + ":" + Math.floor(sec / 10) + sec % 10,
          });
        }
      } else {
        clearInterval(this.timerId);
        this.timerId = null;
        this.setState({
          timerDetail: LocalizedStrings.noCountdownSet,
          offset: 0,
        });
      }
    }).catch((json) => {
      // 错误处理
      console.log("res,json", JSON.stringify(json));
    });
  }

  _subscribe() {
    this._didFocusListener = this.props.navigation.addListener('didFocus', (event) => {
      console.log(event);
      this.subscription = DeviceEvent.deviceRecievedMessages.addListener((device, map, res) => {
        console.log('Device.addListener', device, map, res, this.state.timerRun);
        let status = map.get("event.count_down")[0] || "";
        //res[0]['value'][0];
        switch (status) {
          case "pause":
            // 防抖，会收到多条重复上报信息
            if (this.state.timerRun) {
              this._pause();
            }
            break;
          case "resume":
            if (!this.state.timerRun) {
              this._restart();
            }
            break;
          case "cancel":
            this._cancel();
            break;
        }
      });
    });
  }

  _pause() {
    // clearInterval(this.timerId);
    // this.timerId = null;
    this.setState({ timerRun: false });
    this._queryTimer();
  }

  _restart() {
    // var offset = this.state.offset;
    // this._setTimer(Math.floor(offset / 60), offset % 60);
    this.setState({ timerRun: true });
    this._queryTimer();
  }

  _cancel() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.setState({
      timerRun: false,
      offset: 0,
      timerDetail: LocalizedStrings.noCountdownSet
    });
  }

  componentWillUnmount() {
    console.log("mainpage unmount");
    this._didFocusListener.remove();
    this._deviceNameChangedListener.remove();
  }
}

var styles = StyleSheet.create({
  pageContanier: {
    width: screenWidth,
    height: screenHeight - 64,
    backgroundColor: "#fff",
  },
  containerAll: {
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
  },
  mainTitle: {
    marginLeft: 60 * ratioW,
    fontFamily: "Kmedium",
    fontSize: 46 * ratioW,
    color: "#fff",
  },
  mainSubTitle: {
    fontSize: 26 * ratioW,
    color: 'rgba(255,255,255,0.6)'
  },
  separator: {
    height: 1 / PixelRatio.get(),
    width: 670 * ratioW,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginTop: 16 * ratioW,
    marginBottom: 15,
    alignSelf: "center",
  },
  menuIcon: {
    width: 38,
    height: 38,
  },
  menuTitle: {
    paddingBottom: 5 * ratioW,
    width: 538 * ratioW,
    marginLeft: 26 * ratioW,
    fontSize: 34 * ratioW,
    color: "#000",
  },
  menuSubTitle: {
    marginLeft: 26 * ratioW,
    fontSize: 26 * ratioW,
    color: 'rgba(0,0,0,0.4)'
  },
  rightArrow: {
    width: 40 * ratioW,
    height: 40 * ratioW,
  },
});


// 打开更多菜单
var openMorePage = function (navigator) {
  navigator.push(Setting.route);
};

