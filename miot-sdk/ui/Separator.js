import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Styles } from "../resources";
/**
 * 分割线类型
 */
const TYPE = {
  /**
   * 横向
   */
  ROW: 'row',
  /**
   * 纵向
   */
  COLUMN: 'column',
}
/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module Separator
 * @description 分割线，常用于导航栏和列表项等
 * @property {string} type - 分割线类型，横向(row)或者纵向(column)，默认横向
 * @property {object} style - 自定义样式，maxHeight = 1
 */
export default class Separator extends React.PureComponent {
  static defaultProps = {
    type: TYPE.ROW
  }
  render() {
    let separatorContainer, separatorStyle;
    if (this.props.type === TYPE.ROW) {
      let maxHeight = {};
      if (this.props.style && this.props.style.height) {
        if (this.props.style.height > 1) {
          maxHeight = { height: 1 };
        }
      }
      separatorContainer = {
        backgroundColor: 'transparent',
        height: 1,
        justifyContent: 'center'
      }
      separatorStyle = StyleSheet.flatten([Styles.common.separator, this.props.style, maxHeight]);
    }
    else {
      let maxWidth = {};
      if (this.props.style && this.props.style.width) {
        if (this.props.style.width > 1) {
          maxWidth = { width: 1 };
        }
      }
      separatorContainer = {
        backgroundColor: 'transparent',
        width: 1,
        alignItems: 'center'
      }
      separatorStyle = StyleSheet.flatten([
        {
          width: StyleSheet.hairlineWidth,
          backgroundColor: Styles.common.hairlineColor
        },
        this.props.style,
        maxWidth
      ]);
    }
    return Platform.select({
      android:
        <View style={separatorContainer}>
          <View style={separatorStyle} />
        </View>,
      ios:
        <View style={separatorStyle} />
    })
  }
}