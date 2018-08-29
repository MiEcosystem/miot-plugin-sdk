'use strict';

import React from 'react';

import {
  PixelRatio,
  ScrollView,
  View,
} from 'react-native';

import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString').string;
const imageRightUri = require('../../Resources/chatHistory/对话记录_-右箭头_normal.png');
const imageLeftUri = require('../../Resources/chatHistory/对话记录_-左箭头_normal.png');
const avatarLeftUri = require('../../Resources/chatHistory/MIAILOGO.png');
import { TitleBarBlack } from "miot/ui";
import { ChatLeftDialog, ChatRightDialog } from '../CommonComponents/Dialog';
import * as DateUtil from '../Utils/DateUtil';
import { Device, Service } from "miot";

export default class ChatHistory extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <View>
          <TitleBarBlack
            title={LocalizedStrings.chatRecord} style={{ backgroundColor: '#fff' }}
            onPressLeft={() => { navigation.goBack() }}
          />
        </View>
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      avatarRightUri: '',
      records: [],
    };
    Service.account.load()
      .then((res) => {
        console.log(res, '用户信息');
        this.setState({ avatarRightUri: res.avatarURL });
      })
      .catch((res) => {
        console.log(res, '用户信息');
      });
  }

  render() {
    return (
      <View>
        <View style={{ marginTop: MHGlobalData.APP_MARGINTOP, height: 1 / PixelRatio.get(), backgroundColor: "#e5e5e5" }} />
        <ScrollView
          ref="scrollView"
          onContentSizeChange={(w, h) => {
            this.refs.scrollView.scrollToEnd({ animated: false });
          }}
        >
          {this._renderRecords()}
          <View style={{ height: 10 }}></View>
        </ScrollView>
      </View>
    );
  }

  _calcTimestmap(date) {
    return LocalizedStrings.formatString(LocalizedStrings.monthDate, date.getMonth() + 1, date.getDate()) +
      " " + DateUtil._date2localeTimeStringWithoutSec(date, true);
  }

  _renderRecords() {
    var offset = 30 * 60 * 1000; // 间隔一段时间重新加上时间戳
    var records = this.state.records;
    var recordList = [];
    var lastTime = 0;
    var showTime = false;
    for (let i = 0; i < records.length; i++) {
      var date = new Date(records[i].time);
      var time = this._calcTimestmap(date);
      if (lastTime) {
        if (date - lastTime > offset) {
          showTime = true;
          lastTime = date;
        }
      } else {
        showTime = true;
        lastTime = date;
      }
      if (records[i].speaker === "User") {
        recordList.push(
          <ChatRightDialog
            time={time}
            showTime={showTime}
            imageRightUri={imageRightUri}
            avatarRightUri={this.state.avatarRightUri}
            text={records[i].content}
          />
        )
        showTime = false;
      } else {
        var text = "好的";
        if (records[i].content !== undefined &&
          records[i].content !== "" &&
          records[i].content !== " " &&
          records[i].content !== "“ ”") {
          text = records[i].content;
        } else {
          if (records[i].widget !== undefined &&
            records[i].widget !== "[]") {
            var widgetText = JSON.parse(records[i].widget)[0].text;
            if (widgetText !== undefined &&
              widgetText !== "" &&
              widgetText !== " ") {
              text = widgetText;
            }
          }
        }
        recordList.push(
          < ChatLeftDialog
            imageLeftUri={imageLeftUri}
            avatarLeftUri={avatarLeftUri}
            text={text}
          />
        )
      }
    }
    return recordList;
  }

  componentDidMount() {
    var api = "/v2/api/aivs";
    var data = {
      "path": "/api/aivs/device-events",
      "params": {
        "client_id": "257885859209021440",
        "did": Device.deviceID,
      },
      "header": {
        "name": "DialogRecord.FetchByTime"
      },
      "env": 1,
      "payload": {
        "start": new Date().getTime(),
        "pagesize": 24
      },
      "req_method": "POST",
      "req_header": {
        "Content-Type": [
          "application/json"
        ]
      }
    }
    console.log(data);
    Service.smarthome.getAiServiceProxy(data).then((response) => {
      console.log(response);
      if (response.resp_code === 200) {
        var records = response.ret.records; // 升序
        console.log("records: ", records);
        records.reverse();
        this.setState({ records: records });
      }
    });
  }
}
