'use strict';

import React from 'react';

import {
  PixelRatio,
  RefreshControl,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  StatusBar,
  DeviceEventEmitter,
} from 'react-native';

import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString.js').string;
var timerId = null;
import { Device, Service, DeviceEvent } from "miot";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;
const maxTop = 684 * ratioW // 上方Tip组件的高度
const minTop = MHGlobalData.APP_MARGINTOP // 上方导航栏的高度
const range = maxTop - minTop; // 可滑动范围
const maxNum = 100;
const arrImg = [require('../../Resources/timer/0.png'), require('../../Resources/timer/1.png'), require('../../Resources/timer/2.png'), require('../../Resources/timer/3.png'), require('../../Resources/timer/4.png'),
require('../../Resources/timer/5.png'), require('../../Resources/timer/6.png'), require('../../Resources/timer/7.png'), require('../../Resources/timer/8.png'), require('../../Resources/timer/9.png')];
var queryTimer = null;

import Tip from '../CommonComponents/Tip';
import MyButton from "../CommonComponents/MyButton";
import AddTimer from "./AddTimer";
import CheckBox from "../CommonComponents/checkbox";
import AddHeader from "../CommonComponents/AddHeader";
import EditFooter from "../CommonComponents/EditFooter";
import Swipeout from 'react-native-swipeout';
import ParallaxScroll from "../../CommonModules/ParallaxScroll";
import MessageDialog from "miot/ui/MessageDialog";
import TitleBarWhite from "miot/ui/TitleBarWhite";

function StyleText(props) {
  return (
    <Text
      style={[
        { color: props.timerMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,1)", fontSize: 32 * ratioW },
        props.style,
      ]}
    >
      {props.text}
    </Text>
  );
}

function MenuItem(props) {
  var swipeoutBtns = [
    {
      text: '多选',
      backgroundColor: '#C8C6CD',
      onPress: () => props.onLongPress(),
    },
    {
      text: '删除',
      backgroundColor: '#FF3C2F',
      onPress: () => props.deleteOne(),
    },
  ]
  return (
    <View style={[styles.contentRow]}>
      <Swipeout
        disabled={!props.onOpen || props.workMode || props.editMode} // 首尾列表项不可滑动，工作状态不可滑动，编辑态不可滑动
        autoClose={true}
        close={!props.checked}
        onOpen={props.onOpen ? () => props.onOpen() : () => { }}
        sensitivity={10}
        buttonWidth={66}
        style={{ width: screenWidth, height: 60, flexDirection: 'row' }}
        right={swipeoutBtns}
      >
        <TouchableHighlight
          style={{ width: screenWidth, height: 60 }}
          underlayColor='#f2f2f2'
          onPress={props.editMode ?
            () => props.toggleCheckBox() :
            () => props.onPress()}
          disabled={props.workMode || (!props.onOpen && props.editMode)} // 工作状态时不可以点击，编辑状态时首尾列表项不可以点击
        >
          <View style={[styles.contentRow, { paddingHorizontal: 20 }]}>
            {props.onOpen && props.editMode && // 普通列表项在编辑态时弹出勾选框
              <CheckBox
                isChecked={props.checked}
                onClick={() => props.toggleCheckBox()}
              />
            }
            <StyleText text={props.label} timerMode={props.editMode || props.workMode} />
            {!!(props.tag) &&
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.separatorCol}></View>
                <StyleText text={props.tag} timerMode={props.editMode || props.workMode} />
              </View>
            }
          </View>
        </TouchableHighlight>
      </Swipeout>
    </View >
  );
}

function CountDown(props) {
  return (
    <View style={styles.containerCountDown}>
      <View style={{ flexDirection: "row", marginTop: 280 * ratioW }}>
        <Image
          style={styles.numberImage}
          source={arrImg[props.time.min0]}
        />
        <Image
          style={styles.numberImage}
          // source={require('../../Resources/timer/' + props.time.min1 + '.png')}
          source={arrImg[props.time.min1]}
        />
        <Image
          style={styles.colonImage}
          source={require('../../Resources/timer/colon.png')}
        />
        <Image
          style={styles.numberImage}
          source={arrImg[props.time.sec0]}
        />
        <Image
          style={styles.numberImage}
          // source={require('../../Resources/timer/' + props.time.sec1 + '.png')}
          source={arrImg[props.time.sec1]}
        />
      </View>
    </View>
  );
}

export default class Timer extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props, context) {
    super(props, context);
    this.lastSelected = 0;
    this.state = {
      contentInsetY: range,
      contentOffsetY: -range,
      showRefresh: true, // 是否支持下拉刷新，吸顶时不支持

      allSelected: false, // 列表项是否全选
      addMode: false, // 是否显示添加Modal
      runMode: true, // 倒计时状态，是否正在倒计时，默认是true
      showTip: true, // 是否显示静态倒计时大图标，false 表示倒计时正在运行
      showInput: true, // 新建倒计时是否加上输入框
      editMode: false, // 是否是编辑态，列表项可以点击多选
      timerData: [],
      offset: 0,
      time: {
        min0: 0,
        min1: 0,
        sec0: 0,
        sec1: 0,
      },
      dialogShow: false,
      dialogTitle: '',
      dialogMessage: '',
      dialogOK: '',
      dialogCancel: '',
      dialogPressOK: null,
      refreshing: false
    };
  }

  render() {
    const iconUri = require('../../Resources/timer/Count-down_icon.png');
    return (
      <View style={[styles.container, { backgroundColor: "#f2f2f2" }]}>
        <StatusBar barStyle={"light-content"} />
        <MessageDialog title={this.state.dialogTitle}
          message={this.state.dialogMessage}
          cancel={this.state.dialogCancel}
          confirm={this.state.dialogOK}
          onCancel={(e) => {
            console.log('onCancel', e);
          }}
          onConfirm={this.state.dialogPressOK}
          onDismiss={() => {
            console.log('onDismiss');
            this.setState({ dialogShow: false });
          }}
          visible={this.state.dialogShow} />
        <TitleBarWhite
          title={this.state.editMode ? LocalizedStrings.selectItems : LocalizedStrings.countdown}
          leftTextStyle={{ color: '#000000aa', width: 100, textAlign: 'left', paddingLeft: 20 }}
          rightTextStyle={{ color: '#000000aa', width: 100, textAlign: 'right', paddingRight: 20 }}
          leftText={this.state.editMode ? LocalizedStrings.cancel : null}
          rightText={this.state.editMode ? (this.state.allSelected ? LocalizedStrings.selectNone : LocalizedStrings.selectAll) : null}
          style={this.state.editMode ? { backgroundColor: '#fff' } : { backgroundColor: '#35a9ec' }}
          onPressLeft={this.state.editMode ? () => { this._cancel() } : () => this.props.navigation.goBack()}
          onPressRight={this.state.editMode ? () => { this._selectAll(!this.state.allSelected) } : null}
        />
        {!this.state.showTip &&
          <CountDown
            time={this.state.time}
          />
        }
        {this.state.showTip &&
          <Tip
            showBubble={true}
            backgroundColor={'#35a9ec'}
            iconUri={iconUri}
            dialogText={LocalizedStrings.countdownTipExample} />
        }
        <ScrollView
          refreshControl={this.state.showRefresh &&
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        // ref="scrollView"
        // scrollEnabled={this.state.showTip}
        // style={{ backgroundColor: "transparent", height: screenHeight - minTop }}
        // scrollEventThrottle={5}
        // onScroll={e => { console.log(e.nativeEvent) }}
        >
          <MenuItem
            workMode={!this.state.showTip}
            editMode={this.state.editMode}
            // timerMode={!this.state.showTip || this.state.editMode}
            label={LocalizedStrings.oneCountdown}
            onPress={() => this.setState({ showInput: false, addMode: true })}
          // onLongPress={() => { }}
          />
          <View style={styles.separator} />
          <View style={{ backgroundColor: "#f2f2f2", height: 14 * ratioW }} />
          <View style={styles.separator} />
          {this._renderList()}
        </ScrollView>
        {!this.state.showTip &&
          <View style={styles.buttonGroup}>
            <View style={[styles.borderView, { borderRightWidth: 0, borderRightColor: "#fff", borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }]}></View>
            <MyButton
              title={LocalizedStrings.cancel}
              style={[styles.myButton, { borderLeftWidth: 0, borderLeftColor: "#fff" }]}
              fontStyle={{ color: "rgba(0,0,0,0.7)", fontSize: 13 }}
              onClick={() => this._onClickCancel()}
            />
            {this.state.runMode &&
              <MyButton
                title={LocalizedStrings.pause}
                style={[styles.myButton, { borderRightWidth: 0, borderRightColor: "#fff" }]}
                fontStyle={{ color: "rgba(0,0,0,0.7)", fontSize: 13 }}
                onClick={() => this._pause(false)}
              />
            }
            {!this.state.runMode &&
              <MyButton
                title={LocalizedStrings.resume}
                style={[styles.myButton, { borderRightWidth: 0, borderRightColor: "#fff" }]}
                fontStyle={{ color: "rgba(0,0,0,0.7)", fontSize: 13 }}
                onClick={() => this._restart(false)}
              />
            }
            <View style={[styles.borderView, { borderLeftWidth: 0, borderLeftColor: "#fff", borderTopRightRadius: 20, borderBottomRightRadius: 20 }]}></View>
          </View>
        }
        <AddTimer
          title={this.state.showInput ? LocalizedStrings.custom : LocalizedStrings.oneCountdown}
          showModal={this.state.addMode}
          showInput={this.state.showInput}
          updateAddMode={(state) => this.setState({ addMode: state })}
          cancel={() => this.setState({ addMode: false })}
          save={(showInput, selectTimer, tag) => this._addTimer(showInput, selectTimer, tag)}
        />
        {this.state.editMode &&
          <EditFooter
            onPress={() => this._delete()}
            iconUri={require('../../Resources/utils/edit_icon_delete_nor.png')}
            text={LocalizedStrings.delete}
          />
        }
      </View >
    );
  }

  // 监控上下滑手势
  // 上下滑动的动效，记录contentOffset
  _onScroll(e) {
    if (this.state.refreshing) return;
    this.contentOffsetY = e['nativeEvent']['contentOffset']['y'];
  }

  _onTouchEnd() {
    if (this.state.refreshing) return;
    // 列表在底部
    if (this.state.contentInsetY === range) {
      // 往上滑动25%，就吸顶
      if (this.contentOffsetY > - (range * 0.75)) {
        console.log("release to top");
        this.setState({ contentInsetY: 0, showRefresh: false });
        this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
      }
      // 不到25%，复原
      else {
        console.log("release to bottom");
        this.refs.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
    }
    // 列表在顶部
    else {
      // 往下滑动25%，就坠底
      if (this.contentOffsetY < - (range * 0.25)) {
        console.log("release to bottom");
        this.setState({ contentInsetY: range, showRefresh: true });
        this.refs.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
      // 不到25%，复原
      else if (this.contentOffsetY >= - (range * 0.25) && this.contentOffsetY < 0) {
        console.log("release to top");
        this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  }

  _onLongPress() {
    // this.props.app.setIsNavigationBarHidden(true);
    this.setState({ editMode: true });
  }

  _toggleCheckBox(i) {
    let timerDataTmp = this.state.timerData;
    timerDataTmp[i].delete = !timerDataTmp[i].delete;
    this.setState({ timerData: timerDataTmp });
    console.log(this.state.timerData);
  }

  _cancel() {
    // this.props.app.setIsNavigationBarHidden(false);
    this.setState({ editMode: false, allSelected: false });
    this.state.timerData.forEach(item => item.delete = false);
    console.log(this.state.timerData);
  }

  _selectAll(bool) {
    this.state.timerData.forEach(item => item.delete = bool);
    console.log(this.state.timerData);
    this.setState({ allSelected: bool });
  }

  _delete() {
    var deleteTimers = this.state.timerData.filter(item => item.delete);
    this.setState({
      dialogShow: true,
      dialogTitle: LocalizedStrings.prompt,
      dialogMessage: deleteTimers.length === 1 ? LocalizedStrings.deleteOneTimerConfirm : LocalizedStrings.deleteTimerConfirm,
      dialogOK: LocalizedStrings.ok,
      dialogCancel: LocalizedStrings.cancel,
      dialogPressOK: () => {
        this.setState({
          timerData: this.state.timerData.filter(item => !item.delete),
          editMode: false,
          allSelected: false,
        }, () => {
          this._saveTimerData();
        });
      }
    });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    console.log("fetch countdown status and timerData");
    this._queryTimer();
    this._fetchTimerData();
  }

  _queryTimer() {
    Device.callMethod("get_count_down", []).then((json) => {
      var result = json.result;
      if (result[0] !== "none") {
        this.setState({ refreshing: false });
        // this.refs.scrollView.scrollTo({ x: 0, y: -range, animated: true });
        if (result[0] === "running") {
          var offset = Math.round((result[3] - new Date().getTime()) / 1000);
          var min = Math.floor(offset / 60);
          var sec = offset % 60;
          this.setState({ showTip: false });
          this._setTimer(min, sec);
        } else {
          clearInterval(timerId);
          timerId = null;
          var offset = result[2];
          var min = Math.floor(offset / 60);
          var sec = offset % 60;
          this.setState({
            showTip: false,
            runMode: false,
            offset: offset,
            time: {
              min0: Math.floor(min / 10),
              min1: min % 10,
              sec0: Math.floor(sec / 10),
              sec1: sec % 10,
            }
          });
        }
      }
    }).catch((json) => {
      // 错误处理
      console.log("_queryTimer", JSON.stringify(json));
    });
  }

  _renderItem(timerItem, i) {
    return (
      <View
        key={i}
        style={{ backgroundColor: "#fff", width: screenWidth }}>
        <MenuItem
          editMode={this.state.editMode}
          workMode={!this.state.showTip}
          checked={timerItem.delete}
          // timerMode={!this.state.showTip || this.state.editMode}
          label={timerItem.label}
          tag={timerItem.tag}
          onOpen={() => this._onOpen(i)}
          // onClose={() => this._onClose(i)}
          deleteOne={() => this._delete()}
          onPress={timerItem.onPress}
          onLongPress={() => this._onLongPress()}
          toggleCheckBox={() => this._toggleCheckBox(i)}
        />
        <View style={[styles.separator, { marginHorizontal: 40 * ratioW }]} />
      </View>
    );
  }

  _onOpen(i) {
    var timerDataTmp = this.state.timerData;
    timerDataTmp[this.lastSelected].delete = false;
    timerDataTmp[i].delete = true;
    this.lastSelected = i;
    this.setState({ timerData: timerDataTmp });
    console.log("🛑🛑🛑Open🛑🛑🛑", this.state.timerData);
  }

  _renderList() {
    var timerData = this.state.timerData;
    var length = timerData.length;
    var timerList = [];
    var timerItem = {};
    for (let i = 0; i < length; i++) {
      timerItem = {
        label: (timerData[i].min === 0 ? "" : timerData[i].min + LocalizedStrings.Min) +
          (timerData[i].sec === 0 ? "" : timerData[i].sec + LocalizedStrings.Sec),
        tag: timerData[i].tag,
        onPress: () => this._trigerTimer({ "min": timerData[i].min, "sec": timerData[i].sec }),
        delete: timerData[i].delete
      }
      timerList.push(this._renderItem(timerItem, i));
    }
    timerList.push(
      <View
        key={timerList.length}
      >
        <MenuItem
          editMode={this.state.editMode}
          workMode={!this.state.showTip}
          // timerMode={!this.state.showTip || this.state.editMode}
          label={LocalizedStrings.custom}
          onPress={() => this.setState({ showInput: true, addMode: true })}
        // onLongPress={() => { }}
        />
        <View style={styles.separator} />
      </View>
    )
    let blankHeight = screenHeight - minTop - (length + 2) * 60 - 14 * ratioW;
    timerList.push(
      <View
        key={timerList.length}
        style={{ width: screenWidth, height: blankHeight > 0 ? blankHeight : 0, backgroundColor: "#f2f2f2" }} />
    )
    return timerList;
  }

  _onClickCancel() {
    this.setState({
      dialogShow: true,
      dialogTitle: LocalizedStrings.prompt,
      dialogMessage: LocalizedStrings.cancelTimerConfirm,
      dialogOK: LocalizedStrings.end,
      dialogCancel: LocalizedStrings.noEnd,
      dialogPressOK: () => this._cancelRun(false)
    });
  }

  // 取消正在运行的倒计时
  _cancelRun(flag) {
    let callback = () => {
      clearInterval(timerId);
      timerId = null;
      this.setState({
        runMode: true,
        showTip: true,
        time: {
          min0: 0,
          min1: 0,
          sec0: 0,
          sec1: 0,
        },
      });
    }
    if (!flag) {
      this._timerRequest("cancel", undefined, callback);
    } else {
      callback();
    }
  }

  // 暂停正在运行的倒计时
  _pause(flag) {
    let callback = () => {
      this.setState({ runMode: false });
      this._queryTimer();
    }
    if (!flag) {
      this._timerRequest("pause", undefined, callback);
    } else {
      callback();
    }
  }

  // 重启正在运行的倒计时
  // 手机终端向设备发送rpc指令时，flag标识位false
  // 手机终端订阅到设备的状态时，flag标识位true
  _restart(flag) {
    let callback = () => {
      this.setState({ runMode: true });
      this._queryTimer();
    }
    if (!flag) {
      this._timerRequest("resume", undefined, callback);
    } else {
      callback();
    }
  }

  // 设定并启动一个倒计时，设置倒计时的最小程序单元
  _setTimer(min, sec) {
    var seconds = min * 60 + sec;
    this.setState({
      offset: seconds,
      time: {
        min0: Math.floor(min / 10),
        min1: min % 10,
        sec0: Math.floor(sec / 10),
        sec1: sec % 10,
      }
    });
    clearInterval(timerId);
    timerId = null;
    timerId = setInterval(() => {
      if (--seconds < 0) {
        clearInterval(timerId);
        timerId = null;
        this.setState({
          offset: 0,
          showTip: true
        });
      } else {
        if (--sec < 0) {
          sec = 59;
          min--;
        }
        seconds = min * 60 + sec;
        this.setState({
          offset: seconds,
          time: {
            min0: Math.floor(min / 10),
            min1: min % 10,
            sec0: Math.floor(sec / 10),
            sec1: sec % 10,
          }
        });
      }
    }, 1000);
    console.log("timerId", timerId);
  }

  // 刷新上方UI，调用_setTimer设置并启动一个倒计时
  _trigerTimer(selectTimer) {
    let callback = () => {
      if (this.state.contentInsetY === 0) {
        this.setState({ contentInsetY: range, showRefresh: true });
        // this.refs.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
      this.setState({ showTip: false });
      this._setTimer(selectTimer.min, selectTimer.sec);
    }
    this._timerRequest("create", selectTimer.min * 60 + selectTimer.sec, callback);
  }

  _timerRequest(operation, offset, callback) {
    var obj = {};
    var method = "alarm_ops";
    var now = new Date().getTime();
    if (operation !== "create") {
      obj = { "operation": operation, "update_datetime": now, data: [{ "type": "timer" }] };
    } else {
      var data = {
        type: "timer",
        circle: "once",
        datetime: now + offset * 1000,
        offset: offset,
      }
      obj = { "operation": operation, "update_datetime": now, data: [data] };
    }
    Device.callMethod(method, obj).then((json) => {
      callback();
      console.log(json, operation, offset, 'timerRequest');
    }).catch((json) => { console.log(json, operation, offset, 'timerRequest catch') });
  }

  // 添加一个倒计时，根据showInput标志位判断是“单次”还是“自定义”
  // 单次：一次性倒计时，无标签，不保存
  // 自定义：有标签，需保存
  // 都需要向设备发送指令
  _addTimer(showInput, selectTimer, tag) {
    if (showInput) {
      // 数量上限
      if (this.state.timerData.length >= maxNum) {
        this.setState({
          dialogShow: true,
          dialogTitle: LocalizedStrings.prompt,
          dialogMessage: LocalizedStrings.maxTimerLimit,
          dialogOK: LocalizedStrings.ok,
          dialogCancel: null,
        });
        return;
      }
      // 去重
      let exist = this.state.timerData.some(timer => {
        if (timer.min === selectTimer.min && timer.sec === selectTimer.sec) return true;
      })
      if (exist) {
        this.setState({
          dialogShow: true,
          dialogTitle: LocalizedStrings.prompt,
          dialogMessage: LocalizedStrings.sameTimerExist,
          dialogOK: LocalizedStrings.ok,
          dialogCancel: null,
        });
        return;
      }
      this._trigerTimer(selectTimer);
      this.state.timerData.reverse();
      this.state.timerData.push({
        min: selectTimer.min,
        sec: selectTimer.sec,
        tag: tag,
      })
      this.state.timerData.reverse();
      this._saveTimerData();
      this.setState({ addMode: false });
    } else {
      this._trigerTimer(selectTimer);
      this.setState({ addMode: false });
    }
  }

  componentWillMount() {
    this._subscribe();
  }

  // 兼容安卓
  _getKey(i) {
    return "keyid_timedowns_data_" + (i < 10 ? "0" + i : i);
  }

  _fetchTimerData() {
    let settings = [];
    for (let i = 0; i < 100; i++) {
      settings.push(this._getKey(i));
    }
    Service.smarthome.getDeviceSetting({ "did": Device.deviceID, "settings": settings }).then((response) => {
      console.log(response, 'Service.smarthome.getDeviceSetting');
      let timerData = [
        { sec: 0, min: 1, tag: "", delete: false },
        { sec: 0, min: 3, tag: "", delete: false },
        { sec: 0, min: 5, tag: "", delete: false },
      ];
      if (response && response.result["keyid_timedowns_data_01"] !== undefined) {
        let ret = response.result;
        timerData = [];
        for (let i = 0; i < 100; i++) {
          let key = this._getKey(i);
          if (ret[key]) {
            let timer = JSON.parse(ret[key]);
            timer.delete = false;
            timerData.push(timer);
          }
        }
      }
      console.log(timerData, 'timerData');
      this.setState({ refreshing: false });
      // this.refs.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      this.setState({ timerData: timerData });
    });
  }

  _getEmptySettings() {
    let settings = {};
    for (let i = 0; i < 100; i++) {
      let key = this._getKey(i);
      settings[key] = "";
    }
    return settings;
  }

  _saveTimerData() {
    let emptySettings = this._getEmptySettings();
    let length = this.state.timerData.length;
    for (let i = 0; i < length; i++) {
      let timerData = this.state.timerData[i];
      delete timerData.delete;
      let key = this._getKey(i);
      emptySettings[key] = JSON.stringify(timerData);
    }
    var params = {
      "did": Device.deviceID,
      "settings": emptySettings
    }
    Service.smarthome.setDeviceSetting(params).then((response) => {
      console.log(response, ' Service.smarthome.setDeviceSetting');
    }).catch((err) => {
      console.log(err, ' Service.smarthome.setDeviceSetting catch');
    });
  }

  _subscribe() {
    // 监听设备的状态
    this.subscription = DeviceEvent.deviceRecievedMessages.addListener((device, map, res) => {
      console.log('Device.addListener', device, res, this.state.runMode);
      if (this.state.contentInsetY === 0) {
        this.setState({ contentInsetY: range, showRefresh: true });
        // this.refs.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
      let status = map.get("event.count_down")[0] || "";
      switch (status) {
        case "pause":
          // 防抖，会收到多条重复上报信息
          if (this.state.runMode) {
            this._pause(true);
          }
          break;
        case "resume":
          if (!this.state.runMode) {
            this._restart(true);
          }
          break;
        case "cancel":
          // if (!this.state.runMode) {
          this._cancelRun(true);
          // }
          break;
      }
    });
  }

  componentDidMount() {
    // 获取用户添加的自定义倒计时
    this.setState({ refreshing: true });
    this._fetchTimerData();
    queryTimer = setTimeout(() => this._queryTimer(), 1000);
  }

  componentWillUnmount() {
    console.log("timer unmount");
    clearInterval(timerId);
    timerId = null;
    clearInterval(queryTimer);
    queryTimer = null;
    this.subscription.remove();
    this.props.navigation.state.params.updateMainPage();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCountDown: {
    width: screenWidth,
    height: 684 * ratioW,
    alignItems: 'center',
    backgroundColor: "#35a9ec",
  },
  numberImage: {
    width: 90 * ratioW,
    height: 136 * ratioW,
  },
  colonImage: {
    width: 30 * ratioW,
    height: 136 * ratioW,
  },
  buttonGroup: {
    position: "absolute",
    bottom: 0,
    width: screenWidth,
    backgroundColor: "#fff",
    height: 200 * ratioW,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  borderView: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: "#ccc",
    width: 20,
    height: 40,
  },
  myButton: {
    width: 140,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1 / PixelRatio.get(),
    borderColor: "#ccc",
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#dfdfdf',
  },
  contentRow: {
    flex: 1,
    backgroundColor: "#fff",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  separatorCol: {
    width: 1 / PixelRatio.get(),
    height: 40 * ratioW,
    backgroundColor: "#e5e5e5",
    marginHorizontal: 22 * ratioW,
  },
});
