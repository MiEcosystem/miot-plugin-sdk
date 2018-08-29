'use strict';

import React from 'react';

import {
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
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import { Device } from "miot";
import DatePicker from "rmc-date-picker";
import TitleBarBlack from 'miot/ui/TitleBarBlack';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString.js').string;
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
    circle: "everyweek",
    text: LocalizedStrings.everyweek,
    isSelected: false,
  },
  {
    circle: "twoweek",
    text: LocalizedStrings.twoweek,
    isSelected: false,
  },
  {
    circle: "monthly",
    text: LocalizedStrings.monthly,
    isSelected: false,
  },
  {
    circle: "yearly",
    text: LocalizedStrings.yearly,
    isSelected: false,
  },
];

import MHGlobalData from '../CommonComponents/MHGlobalData';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;
var ringOptions = [];
var maximumDate = new Date(2100, 0, 1);
var minimumDate = new Date();

import MyButton from "../CommonComponents/MyButton";
import Circle from '../CommonComponents/Circle';
import Ring from '../CommonComponents/Ring';
import * as DateUtil from "../Utils/DateUtil";
import AddHeader from "../CommonComponents/AddHeader";

export default class AddReminder extends React.Component {
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
      showStartModal: false,
      showEndCircleModal: false,
      chosenTime: chosenTime,
      startDate: chosenTime,
      startDateText: startDateText,
      event: props.navigation.state.params.event ? props.navigation.state.params.event : "",
      circle: circle,
      circleText: props.navigation.state.params.circleText ? props.navigation.state.params.circleText : LocalizedStrings.once,
      circleIndex: circleIndex,
      circleExtra: DateUtil._circleExtra2Array(props.navigation.state.params.circleExtra),
      endCtime: props.navigation.state.params.endCtime,
      ringIndex: 0,
      ringText: "",
      disabled: false,
    };
  }

  componentDidMount() {
    console.log("MHGlobalData", MHGlobalData);
    if (MHGlobalData.ring) {
      ringOptions = MHGlobalData.ring.reminder;
      var ringIndex = ringOptions.findIndex(item => item.name === this.props.navigation.state.params.ringName);
      ringIndex = ringIndex === -1 ? 0 : ringIndex;
      this.setState({
        ringIndex: ringIndex,
        ringText: ringOptions[ringIndex].title,
      });
    } else {
      console.log("获取铃声配置失败");
    }
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <StatusBar barStyle="default" />
        <TitleBarBlack
          title={LocalizedStrings.setReminder} style={{ backgroundColor: '#fff' }}
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
                mode="time"
                use12Hours={true}
                onDateChange={(newDate) => this.setState({ chosenTime: newDate })}
              />
              <View style={styles.separator} />
              <View style={styles.containerMenu}>
                <Text style={styles.menuLabel}>{LocalizedStrings.event}</Text>
                <TextInput
                  maxLength={20}
                  style={[styles.menuText, { marginLeft: 20 * ratioW, flex: 1, height: 60 }]}
                  onChangeText={(text) => this._onChangeText(text)}
                  defaultValue={this.state.event}
                  placeholder={LocalizedStrings.enterEvent}
                  selectTextOnFocus={true}
                  clearButtonMode="while-editing"
                />
              </View>
              <View style={styles.separator} />
              <TouchableHighlight
                underlayColor='rgba(200,200,200,0.3)'
                onPress={() => this.setState({ showStartModal: true })}
              >
                <View style={styles.containerMenu}>
                  <Text style={[styles.menuLabel, { flex: 1 }]}>
                    {LocalizedStrings.startDate}
                  </Text>
                  <Text style={styles.menuText}>
                    {this.state.startDateText}
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
              {this.state.circle !== "once" &&
                <TouchableHighlight
                  underlayColor='rgba(200,200,200,0.3)'
                  onPress={() => this.setState({ showEndCircleModal: true })}
                >
                  <View style={styles.containerMenu}>
                    <Text style={[styles.menuLabel, { flex: 1 }]}>
                      {LocalizedStrings.endRepeat}
                    </Text>
                    <Text style={styles.menuText}>
                      {this.state.endCtime ? DateUtil._date2dateString(this.state.endCtime) : LocalizedStrings.alwaysRepeat}
                    </Text>
                    <Image
                      source={require('../../Resources/common/clock_home_icon_forward_normal.png')}
                      style={styles.rightArrow}
                    />
                  </View>
                </TouchableHighlight>
              }
              {this.state.circle !== "once" &&
                <View style={styles.separator} />
              }
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
              <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.showStartModal}
              >
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.setState({ showStartModal: false })}>
                  <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.innerModalView} >
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>{LocalizedStrings.startDate}</Text>
                  </View>
                  <View style={styles.modalSeparator} />
                  <DatePicker
                    maxDate={maximumDate}
                    minDate={minimumDate}
                    defaultDate={this.state.startDate}
                    mode="date"
                    onDateChange={(newDate) => this.setState({ startDate: newDate })}
                  />
                  <View style={styles.modalSeparator} />
                  <View style={{ flexDirection: "row" }}>
                    <MyButton
                      title={LocalizedStrings.cancel}
                      style={styles.myButton}
                      fontStyle={{ color: "#000", fontSize: 14 }}
                      onClick={() => this.setState({ showStartModal: false })}
                    />
                    <View style={styles.separatorCol} />
                    <MyButton
                      title={LocalizedStrings.ok}
                      style={styles.myButton}
                      fontStyle={{ color: "#00BC9C", fontSize: 14 }}
                      onClick={() => this._setStartDate()}
                    />
                  </View>
                </View>
              </Modal>
              <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.showEndCircleModal}
              >
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.setState({ showEndCircleModal: false })}>
                  <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.innerModalView}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>{LocalizedStrings.endRepeat}</Text>
                  </View>
                  <View style={styles.modalSeparator} />
                  <DatePicker
                    maxDate={maximumDate}
                    minDate={this.state.startDate}
                    defaultDate={this.state.endCtime ? this.state.endCtime : new Date()}
                    mode="date"
                    onDateChange={(newDate) => this.setState({ endCtime: newDate })}
                  />
                  <View style={styles.modalSeparator} />
                  <View style={{ flexDirection: "row" }}>
                    <MyButton
                      title={LocalizedStrings.alwaysRepeat}
                      style={styles.myButton}
                      fontStyle={{ color: "#000", fontSize: 14 }}
                      onClick={() => this.setState({ showEndCircleModal: false, endCtime: null })}
                    />
                    <View style={styles.separatorCol} />
                    <MyButton
                      title={LocalizedStrings.ok}
                      style={styles.myButton}
                      fontStyle={{ color: "#00BC9C", fontSize: 14 }}
                      onClick={() => this.setState({ showEndCircleModal: false })}
                    />
                  </View>
                </View>
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
    this.setState({
      showStartModal: false,
      startDateText: DateUtil._date2dateString(startDate),
      circleText: DateUtil._getFormattedCircleText(startDate, this.state.circle),
    });
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
  }

  _openCircle() {
    this.props.navigation.navigate('Circle', {
      navigator: this.props.navigation.state.params.navigator,
      circleIndex: this.state.circleIndex,
      circleOptions: circleOptions,
      circleExtra: this.state.circleExtra,
      setCircle: (circleIndex) => this._setCircle(circleIndex),
      setCircleExtra: (arr) => this._setCircleExtra(arr),
    });
  }

  _openRing() {
    this.props.navigation.navigate('Ring', {
      hideNavBar: true,
      ringIndex: this.state.ringIndex,
      ringOptions: ringOptions,
      setRing: (ringIndex) => this.setState({ ringIndex: ringIndex, ringText: ringOptions[ringIndex].title }),
    });
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
    let circle = circleOptions[circleIndex].circle;
    this.setState({
      circleIndex: circleIndex,
      circleText: DateUtil._getFormattedCircleText(this.state.startDate, circle),
      circle: circle,
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
    if (this.state.event === "") {
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.noEventAlert,
      )
      return;
    }
    this.setState({ disabled: true });
    // 处理数据，适配接口
    var method = "alarm_ops";
    var update_datetime = new Date().getTime();
    // 时间截断秒数
    this.state.chosenTime.setSeconds(0);
    var addDate = DateUtil._calibrateChosenTime(this.state.startDate, this.state.chosenTime); // 开始日期 + 选择时间
    var obj = DateUtil._circle2requestData(addDate, this.state.circle, this.state.circleExtra);
    var data = Object.assign({
      "status": "on",
      "type": "reminder",
      "circle": this.state.circle,
      "ringtone": ringOptions[this.state.ringIndex].name,
      "event": this.state.event,
      "reminder": this.state.event,
    }, obj);

    if (this.state.endCtime) {
      data["end_ctime"] = DateUtil._mergeDateTime(this.state.endCtime, this.state.chosenTime);
    }

    var newReminder = {
      "type": 1,
      "circle": this.state.circle,
      "date": new Date(obj.datetime),
      "status": "on",
      "delete": false,
      "circle_extra": obj.circle_extra,
      "event": this.state.event,
      "reminder": this.state.event,
      "ringtone": data.ringtone,
      "volume": 100,
      "end_ctime": data.end_ctime,
    }
    if (this.props.navigation.state.params.id) {
      data.id = Number(this.props.navigation.state.params.id);
      var params = {
        "operation": "modify",
        "update_datetime": update_datetime,
        "data": [data],
      };
      Device.callMethod(method, params).then((json) => {
        // // 处理数据，适配渲染
        // var reminder = Object.assign({
        //   "id": this.props.id,
        // }, obj);
        // // 调用Reminder传过来的hook，
        // this.props.updateReminder(reminder);
        this.props.navigation.state.params.update();
        // 返回Reminder界面
        this.props.navigation.goBack();
      }).catch((json) => {
        this.setState({ disabled: false });
        console.log(JSON.stringify(json));
        AlertIOS.alert(
          LocalizedStrings.prompt,
          LocalizedStrings.updateReminderFailure,
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
        // // 处理数据，适配渲染
        // var reminder = Object.assign({
        //   "id": json.result[0].id + "",
        // }, obj);
        // // 调用Reminder传过来的hook，
        // this.props.addReminder(reminder);
        this.props.navigation.state.params.update();
        // 返回Reminder界面
        this.props.navigation.goBack();
      }
      ).catch((json) => {
        this.setState({ disabled: false });
        console.log(JSON.stringify(json));
        AlertIOS.alert(
          LocalizedStrings.prompt,
          LocalizedStrings.addReminderFailure,
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
    marginLeft: 40 * ratioW,
    fontSize: 32 * ratioW,
    fontWeight: "bold",
  },
  menuText: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 30 * ratioW,
  },
  rightArrow: {
    width: 40 * ratioW,
    height: 40 * ratioW,
    marginHorizontal: 20 * ratioW,
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
  myButton: {
    width: screenWidth / 2 - 20,
    flex: 1,
    alignSelf: "stretch",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
