'use strict';

import React from 'react';

import {
  AlertIOS,
  Modal,
  RefreshControl,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  PixelRatio,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Device } from "miot";
import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString').string;
import ImageButton from 'miot/ui/ImageButton';

import MessageDialog from "miot/ui/MessageDialog";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;
const maxTop = 684 * ratioW // 上方Tip组件的高度
const minTop = MHGlobalData.APP_MARGINTOP // 上方导航栏的高度
const range = maxTop - minTop; // 可滑动范围
const maxNum = 30;

// 刷新闹钟剩余时间的定时器
var refreshClockData = null;
// var queryClocks = null;

// 判断当前设备是否为分享设备
// const isShare = MHPluginSDK.userId != MHPluginSDK.ownerId;
const isShare = false;

import Tip from '../CommonComponents/Tip';
import SwitchItem from "./SwitchItem";
import AddClock from "./AddClock";
import AddHeader from "../CommonComponents/AddHeader";
import EditFooter from "../CommonComponents/EditFooter";
import * as DateUtil from '../Utils/DateUtil';
import MyButton from '../CommonComponents/MyButton';
import ParallaxScroll from "../../CommonModules/ParallaxScroll";

import { TitleBarBlack } from "miot/ui";
import { TitleBarWhite } from "miot/ui";

/*
用于render的数据结构
{
  id: 1,
  delete: false,
  active: true,
  time: "12:25",
  aorp: "上午",
  circle: "法定工作日",
  leftTime: "12小时29分后响铃",
}
*/
export default class Clock extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props, context) {
    super(props, context);
    this.isFull = false; // 默认未达到上限
    this.clocks = [];
    this.queryClocks = null;
    this.lastSelected = 0;
    this.updateMainPage = this.props.navigation.getParam("updateMainPage");
    this.state = {
      contentInsetY: range,
      contentOffsetY: -range,
      showRefresh: true,

      addMode: false,
      editMode: false,
      showTip: true,
      update: false,
      nowTime: {},
      clockData: [],
      showCloseModal: false,
      chosenIndex: undefined,
      closeDate: "",
      allSelected: false,
      refreshing: false,

      dialogShow: false,
      dialogTitle: '',
      dialogMessage: '',
      dialogOK: '',
      dialogCancel: '',
      dialogPressOK: null,
    };
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#f2f2f2" }]}>
        <StatusBar barStyle={"light-content"} />
        <MessageDialog title={this.state.dialogTitle}
          message={this.state.dialogMessage}
          cancel={this.state.dialogCancel}
          confirm={this.state.dialogOK}
          onCancel={() => {
            console.log('onCancel', e);
          }}
          onConfirm={this.state.dialogPressOK}
          onDismiss={() => {
            console.log('onDismiss');
            this.setState({ dialogShow: false });
          }}
          visible={this.state.dialogShow} />
        {!this.state.editMode
          ? <TitleBarWhite
            title={LocalizedStrings.clock} style={{ backgroundColor: '#5cbd56' }}
            onPressLeft={() => { this.props.navigation.goBack() }}
          />
          : <TitleBarBlack
            leftTextStyle={{ color: '#000000aa', width: 100, textAlign: 'left', paddingLeft: 20 }}
            rightTextStyle={{ color: '#000000aa', width: 100, textAlign: 'right', paddingRight: 20 }}
            title={LocalizedStrings.selectItems} style={{ backgroundColor: '#fff' }}
            leftText={LocalizedStrings.cancel}
            onPressLeft={() => this._cancel()}
            rightText={this.state.allSelected ? LocalizedStrings.selectNone : LocalizedStrings.selectAll}
            onPressRight={() => this._selectAll(!this.state.allSelected)}
          />
        }
        <Tip
          showBubble={true}
          backgroundColor='#5cbd56'
          iconUri={require('../../Resources/clock/clock_alarmclock_icon_normal.png')}
          dialogText={LocalizedStrings.clockTipExample} />
        <ScrollView
          refreshControl={this.state.showRefresh &&
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        // style={{ backgroundColor: "transparent", height: screenHeight - minTop }}
        // scrollEventThrottle={5}
        // onScroll={e => { console.log(e.nativeEvent) }}
        >
          {this._renderList()}
        </ScrollView>
        {!this.state.editMode &&
          <ImageButton
            style={styles.addBtn}
            source={require('../../Resources/clock/clock_alarmclock_icon_add_normal.png')}
            onPress={() => this._openAddPage()}
          />
        }
        {this.state.editMode &&
          <EditFooter
            onPress={() => this._delete()}
            iconUri={require("../../Resources/utils/edit_icon_delete_nor.png")}
            text={LocalizedStrings.delete}
          />
        }
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.showCloseModal}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ showCloseModal: false })}>
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
              <View style={styles.innerModalView}>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>{LocalizedStrings.closeClock}</Text>
                </View>
                <View style={styles.modalSeparator} />
                <TouchableHighlight
                  underlayColor='rgba(200,200,200,0.3)'
                  onPress={() => this._closeOnce(this.state.chosenIndex)}
                >
                  <View style={styles.modalScrollViewItem}>
                    <Text style={styles.modalScrollViewItemTextNormal}>
                      {LocalizedStrings.formatString(LocalizedStrings.onlyCloseOnce, this.state.closeDate)}
                    </Text>
                  </View>
                </TouchableHighlight>
                <View style={styles.modalSeparator} />
                <TouchableHighlight
                  underlayColor='rgba(200,200,200,0.3)'
                  onPress={() => this._close(this.state.chosenIndex)}
                >
                  <View style={styles.modalScrollViewItem}>
                    <Text style={styles.modalScrollViewItemTextNormal}>
                      {LocalizedStrings.closeThisClock}
                    </Text>
                  </View>
                </TouchableHighlight>
                <View style={styles.modalSeparator} />
                <MyButton
                  title={LocalizedStrings.cancel}
                  style={styles.myButton}
                  fontStyle={{ color: "#00BC9C", fontSize: 14 }}
                  onClick={() => this.setState({ showCloseModal: false })}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

      </View>
    );
  }

  _onClickClock(i) {
    var index = this.clocks.findIndex(item => item.i === i);
    this._openAddPage(index);
  }

  _openAddPage(index) {
    if (isShare) { return }
    var passProps = {};
    if (index !== undefined) {
      // 点击列表项，更新保存
      var clock = this.clocks[index];
      passProps = {
        // id: clock.id,
        id: clock.i,
        // circle: clock.circle,
        circle: clock.c,
        // circleExtra: clock.circle_extra,
        circleExtra: clock.ec,
        circleText: this.state.clockData[index].circle,
        // ringName: clock.ringtone,
        ringName: clock.a,
        // repeatRing: !!(clock.repeat_ringing),
        repeatRing: !!(clock.l),
        // deleteAfterAlarm: !!(clock.delete_datetime),
        deleteAfterAlarm: !!(clock.dd),
        chosenTime: clock.date,
        // event: clock.event,
        event: clock.n,
        update: () => this._queryClocks(0, []),
      };
    } else {
      // 新建闹钟，上限30个
      if (this.isFull) {
        AlertIOS.alert(
          LocalizedStrings.prompt,
          LocalizedStrings.maxClockLimit,
        )
        return;
      }
      passProps = {
        update: () => this._queryClocks(0, []),
      };
    }
    this.props.navigation.navigate('AddClock', passProps);
  }

  // 渲染闹钟列表项
  _renderItem(item, index) {
    // alert(JSON.stringify(item))
    return (
      <SwitchItem
        key={- index}
        onClickClock={i => this._onClickClock(i)}
        isShare={isShare}
        update={this.state.update}
        isActive={item.active}
        isChecked={item.delete}
        id={item.id}
        time={item.time}
        aorp={item.aorp}
        circle={item.circle}
        leftTime={item.leftTime}
        style={{ height: 60 }}
        editMode={this.state.editMode}
        onOpen={(i) => this._onOpen(i)}
        deleteOne={() => this._delete()}
        openEditMode={() => this._openEditMode()}
        toggleCheckBox={(i, state) => this._toggleCheckBox(i, state)}
        toggleSwitchState={(i, state) => this._toggleSwitchState(i, state)}
      />
    );
  }

  _openEditMode() {
    this.setState({ editMode: true });
    // this.props.app.setIsNavigationBarHidden(true);
  }

  // 渲染整个闹钟列表
  _renderList() {
    var clockData = this.state.clockData;
    var clockList = [];
    for (var i = 0; i < clockData.length; i++) {
      let margin = {};
      (i !== clockData.length - 1) && (margin = { marginHorizontal: 20 });
      clockList.push(this._renderItem(clockData[i], i));
      clockList.push(
        <View key={clockList.length} style={[styles.separator, margin]} />
      );
    }
    let blankHeight = screenHeight - minTop - clockData.length * 60;
    if (blankHeight >= 60) {
      clockList.push(
        <View key={clockList.length} style={{ width: screenWidth, height: blankHeight, backgroundColor: "#f2f2f2" }} />
      )
    }
    if (blankHeight < 60) {
      clockList.push(
        <View key={clockList.length} style={{ width: screenWidth, height: 60, backgroundColor: "#f2f2f2" }} />
      )
    }
    return (
      <View style={{ backgroundColor: '#fff' }}>
        {clockList}
      </View>
    );
  }

  _queryClocks(index, clocks) {
    this.setState({ refreshing: true });
    var params = { "operation": "query", "req_type": "alarm", "index": index };
    Device.callMethod("alarm_ops", params).then((json) => {
      if (this.queryClocks) {
        // 闹钟数量上限
        if (json.result[0] + json.result[1].length >= maxNum) {
          this.isFull = true;
        }
        if (json.result[0] > 0) {
          // 还有待拉取项，先render这部分
          let newClocks = clocks.concat(this._preprocessClocks(json.result[1]));
          this._transToClockData(newClocks);
          this._queryClocks(newClocks.length, newClocks);
        } else {
          // 全部拉取完毕
          let newClocks = [];
          if (json.result.length > 1 && json.result[1].length > 0) {
            newClocks = clocks.concat(this._preprocessClocks(json.result[1]));
          }
          this._transToClockData(newClocks);
          console.log("clocks fetch from device", newClocks);
          console.log("this.state.clockData", this.state.clockData);
          this.clocks = newClocks;
        }
      } else {
        console.log(json);
      }
    }).catch((json) => {
      console.log(json);
    });
  }

  _preprocessClocks(clocks) {
    clocks.forEach(clock => {
      clock.delete = false;
      if (MHGlobalData.env) {
        clock.date = new Date(DateUtil._local2UTC(clock.d)); // 真机环境
      } else {
        clock.date = new Date(clock.d); // chrome 环境
      }
    });
    return clocks;
  }

  _transToClockData(clocks) {
    this.setState({
      clockData: Array.from(clocks, clock => DateUtil._formatClockData(clock)),
      refreshing: false,
    });
    // this.scrollView.scrollTo({ x: 0, y: -range, animated: true });
  }

  _onRefresh() {
    // this.setState({ refreshing: true });
    console.log("fetching clocks");
    this._queryClocks(0, []);
  }

  _cancel() {
    // this.props.app.setIsNavigationBarHidden(false);
    this.state.clockData.forEach(item => item.delete = false);
    console.log("this.clocks", this.clocks);
    console.log("this.state.clockData", this.state.clockData);
    this.setState({ editMode: false, allSelected: false });
  }

  _selectAll(bool) {
    this.state.clockData.forEach(item => item.delete = bool);
    console.log("this.clocks", this.clocks);
    console.log("this.state.clockData", this.state.clockData);
    this.setState({
      allSelected: bool,
    });
  }

  _toggleSwitchState(i, state) {
    if (isShare) { return }
    var index = this.clocks.findIndex((item) => item.i === i);
    var circle = this.clocks[index].c;
    if (circle === "once") {
      // 单次闹钟的开启，重新计算时间
      if (state) {
        var params = {
          "operation": "modify",
          "u": new Date().getTime(),
          "data": [{
            id: Number(i),
            status: "on",
          }],
        };
        Device.callMethod("alarm_ops", params).then((json) => {
          // 重新计算响铃时间
          var date = {};
          if (this.clocks[index].date > new Date()) {
            date = this.clocks[index].date;
          } else {
            date = DateUtil._calibrateChosenTime(new Date(), this.clocks[index].date);
          }
          var newEventTime = DateUtil._getEventTime(date, this.clocks[index].c, this.clocks[index].ec);
          // 计算剩余时间
          this.state.clockData[index].leftTime = DateUtil._calcLeftTime(newEventTime);
          this.state.clockData[index].active = state;
          this.setState({ update: true });
        }).catch((json) => {
          console.log(JSON.stringify(json));
          AlertIOS.alert(
            LocalizedStrings.prompt,
            LocalizedStrings.updateStatusFailure,
          )
        });
      }
      // 单次闹钟的关闭，直接close
      else {
        var params = {
          "operation": "modify",
          "u": new Date().getTime(),
          "data": [{
            id: Number(i),
            status: "off",
          }],
        };
        Device.callMethod("alarm_ops", params).then((json) => {
          this.state.clockData[index].leftTime = LocalizedStrings.unopened;
          this.state.clockData[index].active = state;
          this.setState({ update: true });
        }).catch((json) => {
          console.log(JSON.stringify(json));
          AlertIOS.alert(
            LocalizedStrings.prompt,
            LocalizedStrings.updateStatusFailure,
          )
        });
      }
    }
    else {
      // 开启重复闹钟
      if (state) {
        var params = {
          "operation": "modify",
          "u": new Date().getTime(),
          "data": [{
            id: Number(i),
            status: "on",
            disable_datetime: "",
          }],
        };
        dev.callMethod("alarm_ops", params).then((json) => {
          // 重新计算响铃时间
          var date = {};
          if (this.clocks[index].date > new Date()) {
            date = this.clocks[index].date;
          } else {
            date = DateUtil._calibrateChosenTime(new Date(), this.clocks[index].date);
          }
          var newEventTime = DateUtil._getEventTime(date, this.clocks[index].c, this.clocks[index].ec);
          // 计算剩余时间
          this.state.clockData[index].leftTime = DateUtil._calcLeftTime(newEventTime);
          this.state.clockData[index].active = state;
          this.setState({ update: true });
        }).catch((json) => {
          console.log(JSON.stringify(json));
          AlertIOS.alert(
            LocalizedStrings.prompt,
            LocalizedStrings.updateStatusFailure,
          )
        });
      }
      // 关闭重复闹钟
      else {
        // 判断是否关闭过下一次
        if (this.clocks[index].ot) {
          this._close(index);
        }
        // 没有关闭过，弹出选择Modal
        else {
          this.setState({
            showCloseModal: true,
            chosenIndex: index,
            closeDate: DateUtil._date2dateString(this.clocks[index].date),
          });
        }
      }
    }
  }

  // 关闭重复闹钟
  _close(index) {
    var params = {
      "operation": "modify",
      "u": new Date().getTime(),
      "data": [{
        id: Number(this.clocks[index].i),
        status: "off",
        disable_datetime: "",
      }],
    };
    Device.callMethod("alarm_ops", params).then((json) => {
      this.clocks[index].ot = null;
      this.state.clockData[index].leftTime = LocalizedStrings.unopened;
      this.state.clockData[index].active = false;
      this.setState({ update: true });
    }).catch((json) => {
      console.log(JSON.stringify(json));
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.updateStatusFailure,
      )
    });
    this.setState({ showCloseModal: false });
  }

  // 关闭重复闹钟一次
  _closeOnce(index) {
    var disable_datetime = DateUtil._calcDisableTime(this.clocks[index].date);
    var params = {
      "operation": "modify",
      "u": new Date().getTime(),
      "data": [{
        id: Number(this.clocks[index].i),
        disable_datetime: disable_datetime,
      }],
    };
    Device.callMethod("alarm_ops", params).then((json) => {
      // 重新计算响铃时间
      var newEventTime = DateUtil._calcEventTime(this.clocks[index].date, disable_datetime, this.clocks[index].c, this.clocks[index].ec);
      // 计算剩余时间
      this.clocks[index].ot = disable_datetime; // 给本地添加一个
      this.state.clockData[index].leftTime = DateUtil._calcLeftTime(newEventTime);
      this.setState({ update: true });
    }).catch((json) => {
      console.log(JSON.stringify(json));
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.updateStatusFailure,
      )
    });
    this.setState({ showCloseModal: false });
  }

  _onOpen(i) {
    var index = this.clocks.findIndex((item) => item.i === i);
    var clockDataTmp = this.state.clockData;
    clockDataTmp[this.lastSelected]["delete"] = false;
    clockDataTmp[index]["delete"] = true;
    this.setState({ clockData: clockDataTmp });
    this.lastSelected = index;
    console.log("🛑🛑🛑Open🛑🛑🛑");
    console.log("this.clocks", this.clocks);
    console.log("this.state.clockData", this.state.clockData);
  }

  _toggleCheckBox(i, state) {
    var index = this.clocks.findIndex((item) => item.i === i);
    this.state.clockData[index]["delete"] = state;
    console.log("this.clocks", this.clocks);
    console.log("this.state.clockData", this.state.clockData);
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
        this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
      }
      // 不到25%，复原
      else {
        console.log("release to bottom");
        this.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
    }
    // 列表在顶部
    else {
      // 往下滑动25%，就坠底
      if (this.contentOffsetY < - (range * 0.25)) {
        console.log("release to bottom");
        this.setState({ contentInsetY: range, showRefresh: true });
        this.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
      // 不到25%，复原
      else if (this.contentOffsetY >= - (range * 0.25) && this.contentOffsetY < 0) {
        console.log("release to top");
        this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  }

  _delete() {
    var deletedClocks = this.state.clockData.filter(item => item.delete);

    this.setState({
      dialogTitle: LocalizedStrings.prompt,
      dialogMessage: deletedClocks.length === 1 ?
        LocalizedStrings.deleteOneClockConfirm :
        LocalizedStrings.deleteClockConfirm,
      dialogOK: LocalizedStrings.ok,
      dialogCancel: LocalizedStrings.cancel,
      dialogPressOK: () => this._deleteAll(),
      dialogShow: true,
    });
  }

  _deleteAll() {
    var method = "alarm_ops";
    var operation = "delete";
    var u = new Date().getTime();
    var data = [];
    var deletedClocks = this.state.clockData.filter(item => item.delete);
    deletedClocks.forEach(item => {
      data.push({ id: Number(item.id) });
    });
    var params = {
      "operation": operation,
      "u": u,
      "data": data,
    };

    Device.callMethod(method, params).then((json) => {
      this._queryClocks(0, []);
      // this.clocks = this.clocks.filter(item => !item.delete);
      // this.state.clockData = this.state.clockData.filter(item => !item.delete);
      // this.props.app.setIsNavigationBarHidden(false);
      this.setState({ editMode: false, allSelected: false });
      console.log("this.clocks", this.clocks);
      console.log("this.state.clockData", this.state.clockData);
    });
  }

  componentDidMount() {
    this.queryClocks = setTimeout(() => this._queryClocks(0, []), 1000);
    // this._query(0, []);
    // 进入页面设定刷新UI的定时器, 半分钟刷新一次
    refreshClockData = setInterval(() => {
      // this.clocks = [] 初始化
      let clockData = Array.from(this.clocks, clock => DateUtil._formatClockData(clock));
      // 如果有闹钟响过了，重新请求
      if (clockData.some(item => item.leftTime < 0)) {
        this._queryClocks(0, []);
      } else {
        // 否则，只是刷新UI，不发送网络请求呀
        this.setState({
          clockData: clockData
        });
      }
    }, 30000);
  }

  componentWillUnmount() {
    this.updateMainPage();
    // DeviceEventEmitter.emit('updateMainPage', { from: "clock" });
    // 退出页面时，清除定时器
    clearInterval(refreshClockData);
    refreshClockData = null;
    clearTimeout(this.queryClocks);
    this.queryClocks = null;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#dfdfdf',
  },
  addBtn: {
    width: 104 * ratioW,
    height: 104 * ratioW,
    position: "absolute",
    bottom: 40 * ratioW,
    right: 40 * ratioW,
  },
  innerModalView: {
    width: screenWidth - 40,
    marginHorizontal: 20,
    position: "absolute",
    bottom: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
  },
  modalTitleContainer: {
    alignSelf: "stretch",
    height: 66,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 15,
    color: "#000",
  },
  modalSeparator: {
    alignSelf: "stretch",
    height: 1 / PixelRatio.get(),
    backgroundColor: "#e5e5e5"
  },
  modalScrollViewItem: {
    width: screenWidth - 40,
    height: 48,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 14,
  },
  modalScrollViewItemTextNormal: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  myButton: {
    // width: screenWidth / 2 - 20, // double buttons
    flex: 1,
    height: 50,
    alignSelf: 'stretch',
    alignItems: "center",
    justifyContent: "center",
  },
  containerMenu: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    width: screenWidth,
  },
  menuLabel: {
    marginLeft: 40 * ratioW,
    fontSize: 32 * ratioW,
  },
});
