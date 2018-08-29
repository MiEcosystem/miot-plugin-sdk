'use strict';

import React from 'react';

import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Picker from "rmc-picker";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
var LocalizedStrings = require('./MHLocalizableString.js').string;

export default class TimePicker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      min: "59",
      sec: "59",
      minMin: props.minMin ? props.minMin : 0,
      secMin: 0,
    };
  }

  render() {
    var defaultSettings = {
      // minMin: 0,
      minInterval: 1,
      minMax: 59,
      // secMin: 0,
      secInterval: 1,
      secMax: 59,
    };
    var settings = this.props.settings ?
      Object.assign(defaultSettings, this.props.settings) :
      defaultSettings;

    return (
      <View style={[this.props.style, { flexDirection: "row" }]}>
        {this._pickerWithTitle(LocalizedStrings.Min, "min", settings)}
        {this._pickerWithTitle(LocalizedStrings.Sec, "sec", settings)}
      </View>
    );
  }

  _renderList(type, settings) {
    // 分钟采用设置的最小值，秒钟最小值根据分钟数变化
    var min = this.state[type + "Min"];
    var max = settings[type + "Max"];
    var interval = settings[type + "Interval"];
    var pickerList = [];
    for (let i = min; i <= max; i += interval) {
      pickerList.push(
        <Text label={i < 10 ? "0" + i : i + ""} value={i} >{i < 10 ? "0" + i : i + ""}</Text>
      );
    }
    return pickerList;
  }

  _pickerWithTitle(title, type, settings) {
    return (
      <View style={styles.pickerWrapper}>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={this.state[type]}
            style={{ alignSelf: "stretch" }}
            onValueChange={(itemValue) => this._setPickerValue(itemValue, type)}>
            {this._renderList(type, settings)}
          </Picker>
        </View>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            height: 190,
            right: (screenWidth - 40) / 4 - 36,
          }}>
          <Text style={styles.pickerTitle}>{title}</Text>
        </View>
      </View>
    );
  }

  _setPickerValue(itemValue, type) {
    if (type === "min") {
      if (itemValue == this.state.minMin) {
        let secMin = this.props.secMin ? this.props.secMin : 0;
        this.setState({ secMin: secMin });
      } else {
        this.setState({ secMin: 0 });
      }
    }
    this.setState({ [type]: itemValue }, () => {
      this.props.setTime({
        min: Number(this.state.min),
        sec: Number(this.state.sec)
      });
    });
  }
}

var styles = StyleSheet.create({
  separator: {
    marginVertical: 5,
    height: 2 / PixelRatio.get(),
    backgroundColor: '#35a9ec',
    width: 60,
  },
  pickerWrapper: {
    height: 190,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  pickerTitle: {
    fontSize: 20,
    color: "#000",
  }
});
