'use strict';

import React from 'react';

import {
  AlertIOS,
  Modal,
  PixelRatio,
  TextInput,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

var LocalizedStrings = require('../CommonComponents/MHLocalizableString.js').string;
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import MyButton from "../CommonComponents/MyButton";
import TimePicker from "../CommonComponents/TimePicker";

export default class AddTimer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      time: {
        min: 59,
        sec: 59,
      },
      tag: "",
    };
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.showModal}
      >
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this._cancel()}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          </View>
        </TouchableWithoutFeedback>
        <View style={[styles.innerModalView]}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{this.props.title}</Text>
          </View>
          <View style={styles.modalSeparator} />
          {this.props.showInput &&
          <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "stretch" }}>
            <Text style={{ fontSize: 14, marginLeft: 15 }}>{LocalizedStrings.tag}</Text>
            <TextInput
              maxLength={20}
              style={styles.modalTextInput}
              onChangeText={(text) => this._onChangeText(text)}
              value={this.state.tag}
            />
          </View>
          }
          <TimePicker
            style={{ alignSelf: "stretch" }}
            minMin={0}
            secMin={11}
            setTime={(time) => this.setState({ time: time })}
          />
          <View style={styles.modalSeparator} />
          <View style={{ flexDirection: "row" }}>
            <MyButton
              title={LocalizedStrings.cancel}
              style={styles.myButton}
              fontStyle={{ color: "#000", fontSize: 14 }}
              onClick={() => this._cancel()}
            />
            <View style={styles.separatorCol} />
            <MyButton
              title={this.props.showInput ? LocalizedStrings.save : LocalizedStrings.start}
              style={styles.myButton}
              fontStyle={{ color: "#00BC9C", fontSize: 14 }}
              onClick={() => this._save()}
            />
          </View>
        </View>
      </Modal>
    );
  }

  _onChangeText(text) {
    if (text.length > 20) {
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.maxWordLimit,
      )
    } else {
      this.setState({ tag: text });
    }
  }

  _cancel() {
    this.props.cancel();
    this.setState({ tag: "" });
  }

  _save() {
    this.props.save(this.props.showInput, this.state.time, this.state.tag);
    this.setState({
      time: {
        min: 59,
        sec: 59,
      },
      tag: ""
    });
  }
}

var styles = StyleSheet.create({
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
  modalTextInput: {
    marginVertical: 10,
    marginRight: 15,
    marginLeft: 10,
    flex: 1,
    height: 40,
    borderColor: '#dfdfdf',
    borderWidth: 1 / PixelRatio.get(),
  },
  myButton: {
    width: screenWidth / 2 - 20, // double buttons
    flex: 1,
    height: 50,
    alignSelf: 'stretch',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    flex: 1,
  },
  separator: {
    width: screenWidth,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#dfdfdf',
  },
  separatorCol: {
    width: 1 / PixelRatio.get(),
    alignSelf: "stretch",
    backgroundColor: "#e5e5e5",
  },
});
