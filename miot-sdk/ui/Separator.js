'use strict';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Styles } from "../resources";
/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 21
 * @author Geeook
 * @since 20190410
 * @module Separator
 * @description 横向分割线，常用于导航栏和列表项
 * @property {object} style - 自定义样式，maxHeight = 1
 */
export default class Separator extends React.PureComponent {
  render() {
    let maxHeight = {};
    if (this.props.style && this.props.style.height) {
      if (this.props.style.height > 1) {
        maxHeight = { height: 1 };
      }
    }
    const separatorContainer = {
      backgroundColor: 'transparent',
      height: 1,
      justifyContent: 'center'
    }
    const separatorStyle = StyleSheet.flatten([Styles.common.separator, this.props.style, maxHeight]);
    const separator = Platform.select({
      android:
        <View style={separatorContainer}>
          <View style={separatorStyle} />
        </View>,
      ios:
        <View style={separatorStyle} />
    })
    return separator;
  }
}