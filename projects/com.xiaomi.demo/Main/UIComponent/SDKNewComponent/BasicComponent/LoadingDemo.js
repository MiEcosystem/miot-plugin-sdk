'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { LoadingDialog } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from "miot/ui";
import { colorToken } from "miot/ui/hyperOSUI";
import { ListGroup } from "mhui-rn/dist/hyperOS";

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

  renderListSection(items) {
    return (
      <ListGroup
        dataSource={items.map((item, index) => ({
          title: item.text,
          key: index,
          onPress: () => this.showLoading(item.type)
        }))}
      >
      </ListGroup>
    );
  }

  render() {
    const tokenItems = [
      { text: '单行样式', type: 'single' },
      { text: '多行样式', type: 'multi' }
    ];

    return (
      <ScrollView style={styles.container}>
        <View style={{ marginTop: 15 }}>
          {this.renderListSection(tokenItems)}
        </View>
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
    backgroundColor: colorToken.mj_color_gray_bg_2
  }
});

export default LoadingDemo;
