'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LoadingDialog } from "miot/ui/Dialog";
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import withDarkModeSupport from "../adaptiveThemeComponent";
class BasicComponentDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: false // 控制加载弹窗显示
    };
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
        <Text style={styles.sectionTitle}>{title}</Text>
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
      { label: '颜色', router: 'ColorDemo' },
      { label: '字体', router: 'FontsDemo' },
      { label: '圆角', router: 'RadiusDemo' }
    ];
    const projectItems = [
      { label: '第一期（弹窗）', router: 'PhaseOneDemo' },
      { label: '第二期（近手弹窗）', router: 'HandPopDemo' },
      { label: '第二期（列表）', router: 'ListDemo' },
      { label: '第二期（加载弹窗）', router: 'LoadingDemo' },
      { label: '第三期（按钮）', router: 'ButtonDemo' },
      { label: '第三期（小组件）', router: 'AtomicDemo' },
      { label: '第三期（轻消息）', router: 'ToastDemo' }
    ];

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>标插SDK demo</Text>

        {this.renderListSection('token', tokenItems)}
        {this.renderListSection('项目工程', projectItems)}
        <LoadingDialog
          visible={this.state.loadingVisible}
          message="加载中，请稍候..."
          timeout={2000} // 这里交给我们手动关闭
        />
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

export default withDarkModeSupport(BasicComponentDemo);
