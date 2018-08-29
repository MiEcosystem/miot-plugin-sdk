'use strict';

import React from 'react';

import {
  PixelRatio,
  TouchableHighlight,
  Dimensions,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import CheckBox from "../CommonComponents/checkbox";
import Swipeout from 'react-native-swipeout';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;

/*
render的数据结构
{
  id: "1",
  delete: false,
  tag: "和妈妈打电话",
  time: "上午12:25",
  circle: "法定工作日",
}
*/

export default class ReminderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.reminderItem.delete,
    }
  }

  render() {
    var swipeoutBtns = [
      {
        text: '多选',
        backgroundColor: '#C8C6CD',
        onPress: () => this._onLongPress(),
      },
      {
        text: '删除',
        backgroundColor: '#FF3C2F',
        onPress: () => this.props.deleteOne(),
      },
    ]
    return (
      <Swipeout
        disabled={this.props.editMode} // 编辑态不可滑动
        autoClose={true}
        close={!this.state.isChecked}
        onOpen={() => this.props.onOpen(this.props.reminderItem.id)}
        sensitivity={10}
        buttonWidth={66}
        style={{ width: screenWidth, height: 60, flexDirection: 'row' }}
        right={swipeoutBtns}
      >
        <View style={styles.separator}></View>
        <TouchableHighlight
          style={{ width: screenWidth, height: 60 }}
          key={this.props.reminderItem.id}
          underlayColor='#f2f2f2'
          onPress={this.props.editMode ?
            () => this._toggleCheckBox() :
            () => this.props.onClickReminder(this.props.reminderItem.id)}
          disabled={this.props.reminderItem.status === "history"}
        >
          <View style={[styles.contentRow, { paddingHorizontal: 20 }]}>
            {this.props.reminderItem.status !== "history" && this.props.editMode &&
              <CheckBox
                isChecked={this.state.isChecked}
                onClick={() => this._toggleCheckBox()}
              />
            }
            <View style={{ justifyContent: "center", height: this.props.style.height }}>
              <Text style={[styles.tag,
              { color: this.props.reminderItem.status !== "history" ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.2)" }]}>
                {this.props.reminderItem.tag}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.subTitle,
                { color: this.props.reminderItem.status !== "history" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)" }]}>
                  {this.props.reminderItem.time}
                </Text>
                <View style={styles.separatorCol}></View>
                <Text style={[styles.subTitle,
                { color: this.props.reminderItem.status !== "history" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)" }]}>
                  {this.props.reminderItem.circle}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isChecked: nextProps.reminderItem.delete });
  }

  _onLongPress() {
    this.props.openEditMode();
    this.setState({ isChecked: true });
    // this._toggleCheckBox();
  }

  _toggleCheckBox() {
    this.setState({ isChecked: !this.state.isChecked });
    this.props.setReminderItemState(this.props.reminderItem.id, this.state.isChecked);
  }

}

var styles = StyleSheet.create({
  contentRow: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  tag: {
    fontSize: 32 * ratioW,
    marginBottom: 8 * ratioW,
  },
  subTitle: {
    fontSize: 24 * ratioW,
  },
  separator: {
    marginHorizontal: 20,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
  },
  separatorCol: {
    width: 1 / PixelRatio.get(),
    height: 36 * ratioW,
    backgroundColor: "#e5e5e5",
    marginHorizontal: 20 * ratioW,
  },
});