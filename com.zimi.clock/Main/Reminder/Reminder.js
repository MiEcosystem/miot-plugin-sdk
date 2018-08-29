'use strict';

import React from 'react';

import {
  AlertIOS,
  RefreshControl,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Device, Service } from "miot";
import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString.js').string;
import ImageButton from 'miot/ui/ImageButton';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;
const isShare = false;
const maxTop = 684 * ratioW // 上方Tip组件的高度
const minTop = MHGlobalData.APP_MARGINTOP // 上方导航栏的高度
const range = maxTop - minTop; // 可滑动范围
const maxNum = 80;
import Tip from '../CommonComponents/Tip';
import ReminderBundle from './ReminderBundle';
import { TitleBarBlack } from "miot/ui";
import { TitleBarWhite } from "miot/ui";
import AddHeader from "../CommonComponents/AddHeader";
import EditFooter from "../CommonComponents/EditFooter";
import AddReminder from "./AddReminder";
import * as DateUtil from '../Utils/DateUtil';
import MessageDialog from "miot/ui/MessageDialog";

export default class Reminder extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props, context) {
    super(props, context);
    this.isFull = false;
    this.reminders = [];
    this.queryReminders = null;
    this.lastSelected = 0;
    this.updateMainPage = this.props.navigation.getParam("updateMainPage");
    this.state = {
      contentInsetY: range,
      contentOffsetY: -range,
      showRefresh: true,
      refreshing: false,
      reminderBundles: [],
      editMode: false,
      addMode: false,
      allSelected: false,
      dialogShow: false,
      dialogTitle: '',
      dialogMessage: '',
      dialogOK: '',
      dialogCancel: '',
      dialogPressOK: null,
    };
  }

  _bundleReminderData(reminderData) {
    var reminderBundles = [];
    reminderData.forEach(reminder => {
      this._bundleNewReminder(reminderBundles, reminder);
    });
    console.log("reminderBundles", reminderBundles);
    return reminderBundles;
  }

  _bundleNewReminder(reminderBundles, reminder) {
    var dateTitle = "";
    // 新增过期提醒，三种状态，不同的UI，不同的控制权限。
    switch (reminder.status) {
      case "on":
        dateTitle = DateUtil._formatReminderDate(reminder.date);
        break;
      case "off":
        dateTitle = LocalizedStrings.closed;
        break;
      case "history":
        dateTitle = LocalizedStrings.expired;
        break;
    }
    var index = reminderBundles.findIndex(item => item.dateTitle === dateTitle);
    if (index !== -1) {
      reminderBundles[index].reminderList.push(reminder);
    } else {
      reminderBundles.push({
        dateTitle: dateTitle,
        reminderList: [reminder],
      })
    }
  }

  render() {
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
        {!this.state.editMode
          ? <TitleBarWhite
            title={LocalizedStrings.reminder} style={{ backgroundColor: '#4ebba3' }}
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
          backgroundColor={'#4ebba3'}
          iconUri={require('../../Resources/reminder/alarm-clock_icon.png')}
          dialogText={LocalizedStrings.reminderTipExample} />
        <ScrollView
          refreshControl={this.state.showRefresh &&
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        // ref="scrollView"
        // style={{ position: "absolute", top: minTop, backgroundColor: "transparent", height: screenHeight - minTop }}
        // contentInset={{ top: this.state.contentInsetY }}
        // contentOffset={{ y: this.state.contentOffsetY }}
        // scrollEventThrottle={5}
        // onScroll={e => this._onScroll(e)}
        // onTouchEnd={() => this._onTouchEnd()}
        >
          {this._renderReminderBundles()}
        </ScrollView>
        {!this.state.editMode &&
          <ImageButton
            style={styles.addBtn}
            source={require('../../Resources/reminder/Add-to_icon.png')}
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
      </View>
    );
  }

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

  _onOpen(id) {
    var index = this.reminders.findIndex((item) => item.i === id);
    this.reminders[this.lastSelected].delete = false;
    this.reminderData[this.lastSelected].delete = false;
    this.reminders[index].delete = true;
    this.reminderData[index].delete = true;
    this.lastSelected = index;
    this.setState({ reminderBundles: this._bundleReminderData(this.reminderData) });
    console.log("🛑🛑🛑open🛑🛑🛑");
    console.log(this.reminders);
    console.log(this.reminderData);
  }

  _setReminderItemState(id, state) {
    var index = this.reminders.findIndex((item) => item.i === id);
    this.reminders[index].delete = state;
    this.reminderData[index].delete = state;
    console.log(this.reminders);
    console.log(this.reminderData);
  }

  _delete() {
    var deletedReminders = this.reminders.filter(item => item.delete);
    this.setState({
      dialogTitle: LocalizedStrings.prompt,
      dialogMessage: deletedReminders.length === 1 ?
        LocalizedStrings.deleteOneReminderConfirm :
        LocalizedStrings.deleteReminderConfirm,
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
    var deletedReminders = this.reminders.filter(item => item.delete);
    deletedReminders.forEach(item => {
      data.push({ id: Number(item.i) });
    });
    var params = {
      "operation": operation,
      "u": u,
      "data": data,
    };

    Device.callMethod(method, params)
      .then(json => {
        this.reminders = this.reminders.filter(item => !item.delete);
        this.reminderData = this.reminderData.filter(item => !item.delete);
        // // this.props.app.setIsNavigationBarHidden(false);
        this.setState({
          editMode: false,
          allSelected: false,
          reminderBundles: this._bundleReminderData(this.reminderData),
        });
        console.log("----====删除提醒后====----");
        console.log(this.reminders);
        console.log(this.reminderData);
      });
  }

  _cancel() {
    // this.props.app.setIsNavigationBarHidden(false);
    this.reminders.forEach(item => item.delete = false);
    this.reminderData.forEach(item => item.delete = false);
    console.log(this.reminders);
    console.log(this.reminderData);
    this.setState({
      editMode: false,
      allSelected: false,
      // reminderBundles: this._bundleReminderData(this.reminderData),
    });
  }

  _selectAll(bool) {
    this.reminders.forEach(item => item.delete = bool);
    this.reminderData.forEach(item => item.delete = bool);
    console.log(this.reminders);
    console.log(this.reminderData);
    this.setState({
      allSelected: bool,
      reminderBundles: this._bundleReminderData(this.reminderData),
    });
  }

  _renderReminderBundles() {
    let contentHeight = 0;
    var length = this.state.reminderBundles.length;
    var renderReminderBundles = [];
    for (var i = 0; i < length; i++) {
      // 每一个bundle的高度
      contentHeight += (45 + this.state.reminderBundles[i].reminderList.length * 60);
      renderReminderBundles.push(
        <ReminderBundle
          key={renderReminderBundles.length}
          onOpen={i => this._onOpen(i)}
          deleteOne={() => this._delete()}
          onClickReminder={id => this._onClickReminder(id)}
          reminderBundle={this.state.reminderBundles[i]}
          editMode={this.state.editMode}
          openEditMode={() => this._openEditMode()}
          setReminderItemState={(id, state) => this._setReminderItemState(id, state)}
        />);
    }
    contentHeight -= 11;
    // 补充的空白高度 = ScrollView的高度 - 内容高度
    let blankHeight = screenHeight - minTop - contentHeight;
    if (blankHeight >= 60) {
      renderReminderBundles.push(
        <View key={renderReminderBundles.length} style={{ width: screenWidth, height: blankHeight, backgroundColor: "#f2f2f2" }} />
      )
    }
    if (blankHeight < 60) {
      renderReminderBundles.push(
        <View key={renderReminderBundles.length} style={{ width: screenWidth, height: 60, backgroundColor: "#f2f2f2" }} />
      )
    }
    return renderReminderBundles;
  }

  _openEditMode() {
    this.setState({ editMode: true });
    // this.props.app.setIsNavigationBarHidden(true);
  }

  _onClickReminder(id) {
    var index = this.reminders.findIndex(item => item.i === id);
    this._openAddPage(index);
  }

  _openAddPage(index) {
    if (isShare) { return }
    var passProps = {};
    if (index !== undefined) {
      let reminder = this.reminders[index];
      passProps = {
        id: reminder.i,
        circle: reminder.c,
        circleExtra: reminder.ec,
        circleText: this.reminderData[index].circle,
        ringName: reminder.a,
        event: reminder.n || reminder.r || "",
        chosenTime: reminder.date,
        endCtime: reminder.endCtime,
        update: () => this._queryReminders(0, []),
      };
    } else {
      if (this.isFull) {
        AlertIOS.alert(
          LocalizedStrings.prompt,
          LocalizedStrings.maxReminderLimit,
        )
        return;
      }
      passProps = {
        update: () => this._queryReminders(0, []),
      };
    }
    this.props.navigation.navigate('AddReminder', passProps);
  }

  _updateReminder(reminder) {
    this.reminders = this.reminders.filter(item => item.id !== reminder.id);
    this.reminderData = this.reminderData.filter(item => item.id !== reminder.id);
    this._addReminder(reminder);
  }

  _addReminder(reminder) {
    this.reminders.push(reminder);
    this.reminderData.push(DateUtil._formatReminderData(reminder));
    this.reminders.sort((a, b) => a.date - b.date);
    this.reminderData.sort((a, b) => a.date - b.date);
    this.setState({
      reminderBundles: this._bundleReminderData(this.reminderData),
    });
  }

  _onRefresh() {
    // this.setState({ refreshing: true });
    console.log("fetching reminders");
    this._queryReminders(0, []);
  }

  componentDidMount() {
    this.queryReminders = setTimeout(() => this._queryReminders(0, []), 1000);
  }

  _queryExpired() {
    var api = "/v2/device/range_get_extra_data";
    var data = {
      "did": Device.deviceID,
      "prefix": "h_reminder",
      "offset": 0,
      "limit": 100, // 最大为100
    }
    console.log(data);
    Service.smarthome.getDevicesConfig(data).then((response) => {
      if (response) {
        let res = response.result;
        let expiredReminders = [];
        for (let key in res) {
          expiredReminders = expiredReminders.concat(JSON.parse(res[key]));
        }
        console.log("expiredReminders fetch from remote", expiredReminders);
        this.reminders = this.reminders.concat(this._preprocessReminders(expiredReminders));
        this._transToReminderData(this.reminders);
        console.log("all reminders", this.reminders);
        console.log("all reminderData", this.reminderData);
      }
    }).catch((response) => {
      console.log(response);
    });
  }

  _queryReminders(index, reminders) {
    this.setState({ refreshing: true });
    var params = { "operation": "query", "req_type": "reminder", "index": index };
    Device.callMethod("alarm_ops", params).then((json) => {
      if (this.queryReminders) {
        if (json.result[0] + json.result[1].length >= maxNum) { this.isFull = true; }
        if (json.result[0] > 0) {
          let newReminders = reminders.concat(this._preprocessReminders(json.result[1]));
          this._transToReminderData(newReminders);
          this._queryReminders(newReminders.length, newReminders);
        } else {
          let newReminders = [];
          if (json.result.length > 1 && json.result[1].length > 0) {
            newReminders = reminders.concat(this._preprocessReminders(json.result[1]));
          }
          this._transToReminderData(newReminders);
          this.reminders = newReminders;
          console.log("reminders fetch from device", newReminders);
          console.log("this.reminderData", this.reminderData);
          this._queryExpired();
        }
      } else {
        console.log(json);
      }
    }).catch((json) => { console.log(json); });
  }

  _preprocessReminders(reminders) {
    reminders.forEach(reminder => {
      reminder.delete = false;
      if (MHGlobalData.env) {
        // 真机环境
        reminder.date = new Date(DateUtil._local2UTC(reminder.d));
        reminder.endCtime = reminder.dc ? new Date(DateUtil._local2UTC(reminder.dc)) : reminder.dc; // end_ctime 可能为空
      } else {
        // chrome 环境
        reminder.date = new Date(reminder.d);
        reminder.endCtime = reminder.dc ? new Date(reminder.dc) : reminder.dc;
      }
    });
    return reminders;
  }

  _transToReminderData(reminders) {
    this.reminderData = Array.from(reminders, reminder => DateUtil._formatReminderData(reminder));
    this.setState({
      reminderBundles: this._bundleReminderData(this.reminderData),
      refreshing: false,
    });
  }

  _initReminderState(reminders) {
    this.reminderData = Array.from(reminders, reminder => DateUtil._formatReminderData(reminder));
    this.setState({
      reminderBundles: this._bundleReminderData(this.reminderData),
    });
  }

  componentWillUnmount() {
    this.updateMainPage();
    clearTimeout(this.queryReminders);
    this.queryReminders = null;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBtn: {
    width: 104 * ratioW,
    height: 104 * ratioW,
    position: "absolute",
    bottom: 40 * ratioW,
    right: 40 * ratioW,
  }
});
