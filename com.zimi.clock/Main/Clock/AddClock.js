'use strict';

import React from 'react';

import {
  DeviceEventEmitter,
  StatusBar,
  Modal,
  PixelRatio,
  AlertIOS,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import { Device } from "miot";
import { RkSwitch } from 'react-native-ui-kitten';
import { LoadingDialog } from "miot/ui";
import TitleBarBlack from 'miot/ui/TitleBarBlack';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString').string;
var circleOptions = [
  {
    circle: "once",
    text: LocalizedStrings.once,
    isSelected: false,
  },
  {
    circle: "everyday",
    text: LocalizedStrings.everyday,
    isSelected: false,
  },
  {
    circle: "workday",
    text: LocalizedStrings.workday,
    isSelected: false,
  },
  {
    circle: "holiday",
    text: LocalizedStrings.holiday,
    isSelected: false,
  },
];

import MHGlobalData from '../CommonComponents/MHGlobalData';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;
var ringOptions = [];
var workday = {};
var maximumDate = new Date(2100, 0, 1);
var minimumDate = new Date();

import CheckBox from "../CommonComponents/checkbox";
import Circle from '../CommonComponents/Circle';
import Ring from '../CommonComponents/Ring';
import * as DateUtil from "../Utils/DateUtil";
import AddHeader from "../CommonComponents/AddHeader";
import MyButton from '../CommonComponents/MyButton';
import DatePicker from "rmc-date-picker";

export default class AddClock extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props, context) {
    super(props, context);
    var circle = props.navigation.state.params.circle ? props.navigation.state.params.circle : "once";
    var circleIndex = circleOptions.findIndex(item => item.circle === circle);
    var chosenTime = props.navigation.state.params.chosenTime ? props.navigation.state.params.chosenTime : new Date();
    var startDateText = DateUtil._date2dateString(chosenTime);

    this.state = {
      chosenTime: chosenTime,
      startDate: chosenTime,
      startDateText: startDateText,
      circle: circle,
      circleText: props.navigation.state.params.circleText ? props.navigation.state.params.circleText : LocalizedStrings.once,
      circleIndex: circleIndex,
      circleExtra: DateUtil._circleExtra2Array(props.navigation.state.params.circleExtra),
      ringIndex: 0,
      ringText: "",
      repeatRing: props.navigation.state.params.repeatRing, // 懒人闹钟
      deleteAfterAlarm: props.navigation.state.params.deleteAfterAlarm, // 响铃后删除
      event: props.navigation.state.params.event ? props.navigation.state.params.event : "",
      showRepeatModal: false,
      showStartModal: false,
      reminderLater: true,
      disabled: false,
      loadingShow: false,
    };
  }

  _getRing() {
    ringOptions = MHGlobalData.ring.alarm;
    var ringIndex = ringOptions.findIndex(item => item.name === this.props.navigation.state.params.ringName);
    ringIndex = ringIndex === -1 ? (MHGlobalData.ringIndex || 0) : ringIndex;
    this.setState({
      ringIndex: ringIndex,
      ringText: ringOptions[ringIndex].title,
      loadingShow: false,
    });
    // MHPluginSDK.dismissTips();
  }

  _loadRingOptionFail() {
    this.setState({
      loadingShow: false,
    });
    // MHPluginSDK.dismissTips();
    ringOptions = [];
  }

  componentDidMount() {
    console.log("MHGlobalData", MHGlobalData);
    if (!MHGlobalData.ring) {
      this.setState({
        loadingShow: true,
      });
      // MHPluginSDK.showLoadingTips(LocalizedStrings.loadingRingOptions);
      setTimeout(() => this._loadRingOptionFail(), 8000);
    } else {
      this._getRing();
    }

    if (MHGlobalData.workday) {
      workday = MHGlobalData.workday;
    } else {
      console.log("获取工作日配置失败");
    }
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <StatusBar barStyle="default" />
        <LoadingDialog message={LocalizedStrings.loadingRingOptions}
          onDismiss={() => {
            console.log('onDismiss');
            this.setState({ loadingShow: false });
          }}
          visible={this.state.loadingShow} />
        <TitleBarBlack
          title={LocalizedStrings.setClock} style={{ backgroundColor: '#fff' }}
          onPressLeft={() => { this.props.navigation.goBack() }}
          rightText={LocalizedStrings.save}
          leftText={LocalizedStrings.cancel}
          onPressRight={() => {
            this._save();
          }}
        />
        <View style={styles.backgroundContainer}>
          <View style={styles.separator} />
          <ScrollView>
            <View style={styles.container}>
              <DatePicker
                style={{ width: screenWidth ,paddingTop:10,paddingBottom:10,paddingLeft:30,paddingRight:30}}
                defaultDate={this.state.chosenTime}
                locale={LocalizedStrings}
                mode="time"
                onDateChange={(newDate) => this.setState({ chosenTime: newDate })}
                use12Hours={true}
              />
              <View style={styles.separator} />
              <TouchableHighlight
                underlayColor='rgba(200,200,200,0.3)'
                onPress={() => this._openCircle()}
              >
                <View style={styles.containerMenu}>
                  <Text style={[styles.menuLabel, { flex: 1 }]}>
                    {LocalizedStrings.repeat}
                  </Text>
                  <Text style={styles.menuText}>
                    {this.state.circleText}
                  </Text>
                  <Image
                    source={require('../../Resources/common/clock_home_icon_forward_normal.png')}
                    style={styles.rightArrow}
                  />
                </View>
              </TouchableHighlight>
              <View style={styles.separator} />
              <TouchableHighlight
                underlayColor='rgba(200,200,200,0.3)'
                onPress={() => this._openRing()}
              >
                <View style={styles.containerMenu}>
                  <Text style={[styles.menuLabel, { flex: 1 }]}>
                    {LocalizedStrings.ring}
                  </Text>
                  <Text style={styles.menuText}>
                    {this.state.ringText}
                  </Text>
                  <Image
                    source={require('../../Resources/common/clock_home_icon_forward_normal.png')}
                    style={styles.rightArrow}
                  />
                </View>
              </TouchableHighlight>
              <View style={styles.separator} />
              {this.state.circle === "once" &&
                <View>
                  <View style={styles.containerMenu}>
                    <Text style={[styles.menuLabel, { flex: 1 }]}>
                      {LocalizedStrings.deleteAfterBell}
                    </Text>
                    <RkSwitch
                      style={styles.switch}
                      onTintColor="#5cbd56"
                      value={this.state.deleteAfterAlarm}
                      onValueChange={() => this._toggleDeleteAfterAlarm()}
                    />
                  </View>
                  <View style={styles.separator} />
                </View>
              }
              <View style={styles.containerMenu}>
                <Text style={[styles.menuLabel, { flex: 1 }]}>
                  {LocalizedStrings.snooze}
                </Text>
                <RkSwitch
                  style={styles.switch}
                  onTintColor="#5cbd56"
                  value={this.state.repeatRing}
                  onValueChange={() => this._toggleRepeatRing()}
                />
              </View>
              <View style={styles.separator} />
              <Text style={styles.tip}>{LocalizedStrings.snoozeTip}</Text>
              <View style={styles.separator} />
              <View style={styles.containerMenu}>
                <Text style={[styles.menuLabel]}>{LocalizedStrings.clockNote}</Text>
                <TextInput
                  maxLength={20}
                  style={[styles.menuText, { marginLeft: 10, flex: 1, height: 60 }]}
                  onChangeText={(text) => this._onChangeText(text)}
                  defaultValue={this.state.event}
                  placeholder={LocalizedStrings.enterNote}
                  selectTextOnFocus={true}
                  clearButtonMode="while-editing"
                />
              </View>
              <View style={styles.separator} />
              <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.showRepeatModal}
              >
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.setState({ showRepeatModal: false })}>
                  <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <TouchableWithoutFeedback>
                      <View style={styles.innerModalView}>
                        <View style={styles.modalTitleContainer}>
                          <Text style={styles.modalTitle}>{LocalizedStrings.snooze}</Text>
                        </View>
                        <View style={styles.modalContainer}>
                          <Text style={styles.modalContent}>{LocalizedStrings.snoozeCloseTip}</Text>
                          <View style={styles.modalCheckboxContainer}>
                            <CheckBox
                              isChecked={!this.state.reminderLater}
                              onClick={() => this._toggleReminderLater()}
                            />
                            <Text style={styles.modalCheckboxText}>{LocalizedStrings.noRemindAgain}</Text>
                          </View>
                        </View>
                        <View style={styles.modalSeparator} />
                        <MyButton
                          title={LocalizedStrings.gotIt}
                          style={styles.myButton}
                          fontStyle={{ color: "#00BC9C", fontSize: 14 }}
                          onClick={() => this._iKnow()}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  _setStartDate() {
    // 更改以前的闹钟（未开启）或者提醒，
    // 点开「开始日期」不拨动时间滚轴就保存时间，
    // 此时startDate是过去的时间点。
    // 其他情况startDate一定是将来的时间点
    var startDate = this.state.startDate < new Date() ? new Date() : this.state.startDate;
    this.setState({ showStartModal: false, startDateText: DateUtil._date2dateString(startDate) });
  }

  _onChangeText(text) {
    if (text.length > 20) {
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.maxWordLimit,
      )
    } else {
      this.setState({ event: text });
    }
  }

  _cancel() {
    this.props.navigation.goBack();
  }

  componentWillMount() {
    this._ringOptionsLoadedListener = DeviceEventEmitter.addListener("ringOptionsLoaded", (event) => {
      this._getRing();
    });
  }

  _openCircle() {
    this.props.navigation.navigate('Circle', {
      circleIndex: this.state.circleIndex,
      circleOptions: circleOptions,
      circleExtra: this.state.circleExtra,
      setCircle: (circleIndex) => this._setCircle(circleIndex),
      setCircleExtra: (arr) => this._setCircleExtra(arr),
    });
  }

  _openRing() {
    this.props.navigation.navigate(
      'Ring', {
        hideNavBar: true,
        ringIndex: this.state.ringIndex,
        ringOptions: ringOptions,
        setRing: (ringIndex) => this.setState({ ringIndex: ringIndex, ringText: ringOptions[ringIndex].title }),
      }
    );
  }

  _toggleRepeatRing() {
    if (!this.state.repeatRing) {
      // MHPluginSDK.loadInfoCallback(info => {
      if (MHGlobalData.reminderLater === undefined || MHGlobalData.reminderLater) {
        this.setState({ showRepeatModal: true });
      } else {
        this.setState({ repeatRing: !this.state.repeatRing });
      }
      // })
    } else {
      this.setState({ repeatRing: !this.state.repeatRing });
    }
  }

  _toggleReminderLater() {
    this.setState({ reminderLater: !this.state.reminderLater });
    // MHPluginSDK.loadInfoCallback(info => {
    MHGlobalData.reminderLater = this.state.reminderLater;
    // MHPluginSDK.saveInfo(info);
    // })
  }

  _iKnow() {
    this.setState({
      showRepeatModal: false,
      repeatRing: !this.state.repeatRing,
    });
  }

  _toggleDeleteAfterAlarm() {
    this.setState({ deleteAfterAlarm: !this.state.deleteAfterAlarm });
  }

  _setCircleExtra(arr) {
    var circleText = "";
    arr.forEach((item) => {
      circleText += (DateUtil._arab2zh(item) + ",");
    });
    this.setState({
      circle: "everyweek",
      circleText: circleText.slice(0, circleText.length - 1),
      circleExtra: arr,
    });
    console.log(this.state);
  }

  _setCircle(circleIndex) {
    this.setState({
      circleIndex: circleIndex,
      circleText: circleOptions[circleIndex].text,
      circle: circleOptions[circleIndex].circle,
      circleExtra: undefined, // 很关键，单独设置circle时候，circleExtra必须置为空
    });
    console.log(this.state);
  }

  _save() {
    if (this.state.circleText === "") {
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.noCircleAlert,
      )
      return;
    }
    this.setState({ disabled: true });
    // 处理数据，适配接口
    var method = "alarm_ops";
    // var parser_timestamp = new Date().getTime();
    var update_datetime = new Date().getTime();
    // 时间截断秒数
    this.state.chosenTime.setSeconds(0);
    // 又不要开始日期了，厉害厉害。
    var addDate = DateUtil._calibrateChosenTime(new Date(), this.state.chosenTime); // 开始日期 + 选择时间
    var obj = DateUtil._circle2requestData(addDate, this.state.circle, this.state.circleExtra, workday);
    var data = Object.assign({
      "type": "alarm",
      "circle": this.state.circle,
      "ringtone": ringOptions[this.state.ringIndex].name,
      "repeat_ringing": this.state.repeatRing ? 1 : 0,
      "event": this.state.event,
    }, obj);

    data["smart_clock"] = 0;
    if (ringOptions[this.state.ringIndex].sc) {
      data["smart_clock"] = 1;
    }

    data["delete_datetime"] = "";
    if (this.state.circle === "once" && this.state.deleteAfterAlarm) {
      data["delete_datetime"] = obj["datetime"];
    }

    if (this.props.navigation.state.params.id) {
      data.id = Number(this.props.navigation.state.params.id);
      var params = {
        "operation": "modify",
        "update_datetime": update_datetime,
        "data": [data],
      };
      Device.callMethod(method, params).then((json) => {
        this.props.navigation.state.params.update();
        this.props.navigation.goBack();
      }).catch((json) => {
        this.setState({ disabled: false });
        console.log(JSON.stringify(json));
        AlertIOS.alert(
          LocalizedStrings.prompt,
          LocalizedStrings.updateClockFailure,
        )
      });
    } else {
      var params = {
        "operation": "create",
        "update_datetime": update_datetime,
        "data": [data],
      };
      // 发送保存请求
      Device.callMethod(method, params).then((json) => {
        this.props.navigation.state.params.update();
        this.props.navigation.goBack();
      }).catch((json) => {
        this.setState({ disabled: false });
        console.log(JSON.stringify(json));
        AlertIOS.alert(
          LocalizedStrings.prompt,
          LocalizedStrings.addClockFailure,
        )
      });
    }
  }
}

var styles = StyleSheet.create({
  pageContainer: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "#f6f6f6",
  },
  backgroundContainer: {
    marginTop: MHGlobalData.APP_MARGINTOP,
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  separator: {
    alignSelf: "stretch",
    height: 1 / PixelRatio.get(),
    backgroundColor: '#dfdfdf',
  },
  separatorCol: {
    width: 1 / PixelRatio.get(),
    alignSelf: "stretch",
    backgroundColor: "#e5e5e5",
  },
  containerMenu: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    width: screenWidth,
  },
  menuLabel: {
    marginLeft: 20,
    fontSize: 16,
  },
  menuText: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 15,
  },
  rightArrow: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  switch: {
    marginRight: 10,
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
  modalContainer: {
    marginHorizontal: 42,
    flex: 1,
  },
  modalContent: {
    lineHeight: 20,
    fontSize: 15,
    color: "#666",
  },
  modalCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 25,
  },
  modalCheckboxText: {
    marginLeft: 7,
    color: "#999",
  },
  modalSeparator: {
    alignSelf: "stretch",
    height: 1 / PixelRatio.get(),
    backgroundColor: "#e5e5e5"
  },
  myButton: {
    flex: 1,
    height: 50,
    alignSelf: 'stretch',
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtn: {
    borderWidth: 1,
    borderColor: "#dfdfdf",
    borderRadius: 30,
    width: 160,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  ringMenu: {
    height: 37,
    alignItems: "center",
    flexDirection: "row",
    width: screenWidth - 10,
  },
  ringTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
  tip: {
    backgroundColor: "#f6f6f6",
    height: 37,
    width: screenWidth,
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.35)",
  },
});
