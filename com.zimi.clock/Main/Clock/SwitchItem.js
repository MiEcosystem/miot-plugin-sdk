'use strict';

import React from 'react';

import {
  PixelRatio,
  TouchableHighlight,
  Dimensions,
  Text,
  StyleSheet,
  View,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';

import CheckBox from "../CommonComponents/checkbox";
import Swipeout from 'react-native-swipeout';
import { RkSwitch } from 'react-native-ui-kitten';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;

function StyleText(props) {
  return (
    <Text style={[{ color: "#5f5f5f", fontSize: props.fontSize }, props.style]}>{props.text}</Text>
  );
}

export default class SwitchItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked,
      isActive: props.isActive,
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
      <View style={[styles.contentRow]}>
        <Swipeout
          disabled={this.props.editMode} // 编辑态不可滑动
          autoClose={true}
          close={!this.props.isChecked}
          onOpen={() => this.props.onOpen(this.props.id)}
          sensitivity={10}
          buttonWidth={66}
          style={{ width: screenWidth, height: 60, flexDirection: 'row' }}
          right={swipeoutBtns}
        >
          <TouchableHighlight
            style={{ width: screenWidth, height: 60 }}
            key={this.props.id}
            underlayColor='#f2f2f2'
            onPress={this.props.editMode ?
              () => this._toggleCheckBox() :
              () => this.props.onClickClock(this.props.id)}
          >
            <View style={[styles.contentRow, { paddingHorizontal: 20 }]}>
              {this.props.editMode &&
                <CheckBox
                  isChecked={this.state.isChecked}
                  onClick={() => this._toggleCheckBox()}
                />
              }
              <View style={[styles.contentRow, { height: this.props.style.height }]}>
                <StyleText fontSize={20} text={this.props.time} />
                <StyleText fontSize={10} text={this.props.aorp} />
                <View style={styles.separatorCol}></View>
                <View>
                  <StyleText fontSize={11} text={this.props.circle} />
                  < StyleText fontSize={12} text={this.props.leftTime} />
                </View>
              </View>


              <TouchableWithoutFeedback>
                <RkSwitch
                  onTintColor="#5cbd56"
                  value={this.state.isActive}
                  onValueChange={() => this._toggleSwitch()}
                />
              </TouchableWithoutFeedback>


            </View>
          </TouchableHighlight>
        </Swipeout>
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isChecked: nextProps.isChecked });
    this.setState({ isActive: nextProps.isActive });
  }

  _onLongPress() {
    this.props.openEditMode();
    this.setState({ isChecked: true });
    // this.props.toggleCheckBox(this.props.id, this.state.isChecked);
  }

  _toggleCheckBox() {
    this.setState({ isChecked: !this.state.isChecked });
    this.props.toggleCheckBox(this.props.id, this.state.isChecked);
  }

  _toggleSwitch() {
    this.props.toggleSwitchState(this.props.id, !this.state.isActive);
  }
}

var styles = StyleSheet.create({
  contentRow: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  separatorCol: {
    width: 1 / PixelRatio.get(),
    height: 56 * ratioW,
    backgroundColor: "#bfbfbf",
    marginLeft: 24 * ratioW,
    marginRight: 20 * ratioW,
  },
});