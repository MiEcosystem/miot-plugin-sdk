'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LoadingDialog } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "mhui-rn/dist/styles/color";
import withDarkModeSupport from "../adaptiveThemeComponent";

class LoadingDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: false,
      dialogMessage: '', // 存储当前要显示的文本
      dialogStyle: {} // 存储不同样式配置
    };
  }

  // 点击不同按钮时设置不同内容
  showLoading = (type) => {
    if (type === 'single') {
      this.setState({
        loadingVisible: true,
        dialogMessage: '加载中，请稍候...'
      });
    } else if (type === 'multi') {
      this.setState({
        loadingVisible: true,
        dialogMessage: '加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候...'
      });
    }
  };

  handleDismiss = () => {
    this.setState({ loadingVisible: false });
  };

  renderListSection(title, items) {
    return (
      <View style={styles.sectionContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => this.showLoading(item.type)}
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
      { text: '单行样式', type: 'single' },
      { text: '多行样式', type: 'multi' }
    ];

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>第二期（加载弹窗）</Text>

        {this.renderListSection('token', tokenItems)}

        <LoadingDialog
          visible={this.state.loadingVisible}
          message={this.state.dialogMessage}
          timeout={2000}
          onDismiss={this.handleDismiss}
        />
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: "transparent"
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

export default withDarkModeSupport(LoadingDemo);
