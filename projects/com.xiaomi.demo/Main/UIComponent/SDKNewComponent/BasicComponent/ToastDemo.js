'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { colorToken } from 'mhui-rn/dist/styles/color';
import withDarkModeSupport from '../adaptiveThemeComponent';
import { showToast } from 'miot/ui/hyperOSUI';

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
      <View style={styles.sectionContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => {
              showToast(
                this.getToastText(item.text),
                item.duration
              );
            }}
          >
            <Text style={styles.itemText}>{item.text}</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    backgroundColor: 'transparent'
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  sectionContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: 'transparent',
    paddingVertical: 5
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  itemText: {
    fontSize: 16,
    color: colorToken.mj_color_gray_text_1
  },
  arrow: {
    fontSize: 16,
    color: colorToken.mj_color_gray_icon_4
  }
});

export default withDarkModeSupport(ToastDemo);
