'use strict';

import React from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import MyButton from "./MyButton";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;
const ratioH = screenHeight / 1324;

export default class EditHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.header}>
        <MyButton
          title={this.props.leftBtnText}
          style={styles.btn}
          fontStyle={styles.btnText}
          onClick={() => this.props.leftFun()}
        />
        <Text style={styles.title}>{this.props.title}</Text>
        <MyButton
          title={this.props.rightBtnText}
          style={styles.btn}
          fontStyle={styles.btnText}
          onClick={() => this.props.rightFun()}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 120 * ratioH,
    backgroundColor: "#fff",
    width: screenWidth,
    height: 120 * ratioH,
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    width: 100 * ratioW,
    height: 100 * ratioH,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 30 * ratioW,
  },
  title: {
    color: '#373E4D',
    fontWeight: '500',
    fontSize: 18,
    textAlign: "center",
    flex: 1,
  },
});