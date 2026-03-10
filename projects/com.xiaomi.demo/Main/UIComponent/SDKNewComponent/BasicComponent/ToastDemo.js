'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { colorToken } from 'mhui-rn/dist/styles/color';
import { showToast } from 'miot/ui/hyperOSUI';
import { ListGroup } from "mhui-rn/dist/hyperOS";

class ToastDemo extends Component {
  getToastText(type) {
    switch (type) {
      case '标准单行':
        return '最短56，最长252';
      case '最短样式':
        return '1';
      case '多语言':
      default:
        return '最短56，最长252最短56，最长252最短56，最长252最短56，最长252';
    }
  }

  renderListSection(items) {
    return (
      <ListGroup dataSource={items.map((item, index) => ({
        title: item.text,
        key: index,
        onPress: () => showToast(this.getToastText(item.text), item.duration)
      }))}/>
    );
  }

  render() {
    const tokenItems = [
      { text: '标准单行', duration: 1 },
      { text: '最短样式', duration: 1 },
      { text: '多语言', duration: 2 }
    ];

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>第三期（轻消息）</Text>
        {this.renderListSection(tokenItems)}
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2,
    flex: 1
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  }
});

export default ToastDemo;
