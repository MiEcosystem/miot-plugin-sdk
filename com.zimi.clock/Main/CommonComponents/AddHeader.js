'use strict';

import React from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MyButton from "./MyButton";
import MHGlobalData from '../CommonComponents/MHGlobalData';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default class AddHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <View style={[styles.header, this.props.style]}>
        <View style={[styles.btnGroup, this.props.btnGroupStyle]}>
          <MyButton
            // disabled={this.props.leftDisabled}
            title={this.props.leftBtnText}
            style={styles.btn}
            fontStyle={styles.btnText}
            onClick={() => this.props.leftFun()}
          // onClick={() => this._leftFun()}
          />
          <Text style={styles.title}>{this.props.title}</Text>
          <MyButton
            disabled={this.props.disabled}
            title={this.props.rightBtnText}
            style={styles.btn}
            fontStyle={[styles.btnText, { color: '#00bc9c' }]}
            onClick={() => this.props.rightFun()}
          // onClick={() => this._rightFun()}
          />
        </View>
      </View>
    );
  }

  _leftFun() {
    this.props.leftFun();
  }

  _rightFun() {
    this.props.rightFun();
  }

}

var styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: MHGlobalData.APPBAR_MARGINTOP,
    height: MHGlobalData.APPBAR_HEIGHT,
    backgroundColor: "#fff",
  },
  btnGroup: {
    marginTop: 0,
    alignItems: "center",
    flexDirection: "row",
    width: screenWidth,
    backgroundColor: "#fff",
  },
  btn: {
    width: 60,
    height: MHGlobalData.APPBAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 16,
    color: "rgba(0,0,0,0.5)",
  },
  title: {
    color: '#373E4D',
    fontWeight: '500',
    fontSize: 18,
    textAlign: "center",
    flex: 1,
  },
});