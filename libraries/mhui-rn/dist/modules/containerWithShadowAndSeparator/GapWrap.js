// @ts-nocheck

/* eslint-disable */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Separator } from "../../components/separator";
import { adjustSize } from "../utils/sizes";
export default class GapWrap extends Component {
  state = {
    shown: true
  };
  onLayout = e => {
    this.setState({
      shown: e.nativeEvent.layout.height > adjustSize(3.1)
    });
  };

  render() {
    const {
      hasSeparator,
      separatorStyle,
      children
    } = this.props;
    const {
      shown
    } = this.state;

    if (!children) {
      return null;
    }

    return <View onLayout={this.onLayout}>
        {hasSeparator && shown ? <Separator style={[{
        height: Math.min(adjustSize(3), 1),
        opacity: 0.35,
        marginHorizontal: adjustSize(60)
      }, separatorStyle]} /> : null}
        {children}
      </View>;
  }

}