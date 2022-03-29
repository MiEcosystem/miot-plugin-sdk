'use strict';
import React, { Component } from 'react';
import { Alert, AlertIOS, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createThumbnail } from "react-native-create-thumbnail";

/* 接口详情见：
https://www.npmjs.com/package/react-native-create-thumbnail
 */
export default class VideoThumbnailDemo extends Component {
  constructor(props) {
    super(props);
  }

  createThumbnail() {
    createThumbnail({
      url: 'http://cookbook.supor.com/Swast2SpEjewRAnE.mp4',
      format: 'jpeg',
      cacheName: 'test'
    })
      .then((response) => {
        console.log({ response });
        Alert.alert('获取缩略图成功', JSON.stringify(response));
      })
      .catch((err) => {
        console.log({ err });
        Alert.alert('获取缩略图失败', JSON.stringify(err));
      });
  }


  renderIgnoreSilentSwitchControl(ignoreSilentSwitch) {
    return (
      <TouchableOpacity onPress={() => {
        this.createThumbnail();
      }}>
        <Text style={[styles.controlOption]}>
          点击获取视频缩略图
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return this.renderIgnoreSilentSwitchControl();
  }
}

const styles = StyleSheet.create({
  controlOption: {
    alignSelf: 'center',
    fontSize: 30,
    color: "black",
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 30,
    lineHeight: 12
  }
});
