'use strict';

import React from 'react';

import {
  PixelRatio,
  Dimensions,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import ReminderItem from "./ReminderItem";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

/*
render的数据结构
{
  dateTitle: "今天/明天/2018年5月18日",
  reminderList: [
    {
      id: "1",
      delete: false,
      tag: "和妈妈打电话",
      time: "上午12:25",
      circle: "法定工作日",
    },
  ],
}
*/

export default class ReminderBundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.separator} />
          <View>
            <View style={{ marginHorizontal: 20, justifyContent: "center", height: 34 }}>
              <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.4)" }}>{this.props.reminderBundle.dateTitle}</Text>
            </View>
            {this._renderList(this.props.reminderBundle.reminderList)}
          </View>
          <View style={styles.separator} />
        </View>
        <View style={{ backgroundColor: "#f2f2f2", width: screenWidth, height: 11 }} />
      </View>
    );
  }

  _renderList(reminderList) {
    var length = reminderList.length;
    var renderReminderList = [];
    for (var i = 0; i < length; i++) {
      renderReminderList.push(
        <ReminderItem
          key={renderReminderList.length}
          onOpen={this.props.onOpen}
          deleteOne={this.props.deleteOne}
          dateTitle={this.props.reminderBundle.dateTitle}
          reminderItem={reminderList[i]}
          style={{ height: 60 }}
          editMode={this.props.editMode}
          openEditMode={this.props.openEditMode}
          setReminderItemState={this.props.setReminderItemState}
          onClickReminder={this.props.onClickReminder}
        />
      );
    }
    return renderReminderList;
  }



}

var styles = StyleSheet.create({
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
  },
});