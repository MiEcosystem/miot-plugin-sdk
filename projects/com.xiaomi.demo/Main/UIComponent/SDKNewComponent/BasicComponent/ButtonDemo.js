'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { colorToken } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";
import withDarkModeSupport from "../adaptiveThemeComponent";

class ButtonDemo extends Component {
  constructor(props) {
    super(props);
  }

  // 增加标题传递
  navigateToScreen(routerName, title) {
    const { navigation } = this.props;
    if (navigation && routerName) {
      navigation.navigate(routerName, { title }); // 把标题传递给路由参数
    }
  }

  renderListSection(title, items) {
    return (
      <View style={styles.sectionContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => this.navigateToScreen(item.router, item.label)} // 跳转并传递标题
          >
            <Text style={styles.itemText}>{item.label}</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  render() {
    const tokenItems = [
      { label: '基础样式', router: 'ButtonCustomDemo' },
      { label: '页面效果', router: 'ButtonPageViewDemo' }
    ];
    return (
      <ScrollView style={styles.container}>
        {this.renderListSection('token', tokenItems)}
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2
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
    backgroundColor: "transparent",
    paddingVertical: 5
  },
  sectionTitle: {
    fontSize: 12,
    color: colorToken.mjcard_color_miui_2,
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: colorToken.mj_color_gray_card_1
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

export default withDarkModeSupport(ButtonDemo);
