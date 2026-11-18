'use strict';

import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { dynamicStyleSheet } from "miot/ui";
import { LoadingToast, colorToken, ListCard, ListItem } from "miot/ui/hyperOSUI";

class LoadingDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: false,
      dialogMessage: '', // 存储当前要显示的文本
      dialogStyle: {}, // 存储不同样式配置
    };
  }

  // 点击不同按钮时设置不同内容
  showLoading = (type) => {
    if (type === 'single') {
      this.setState({
        loadingVisible: true,
        dialogMessage: '加载中，请稍候...',
      });
    } else if (type === 'multi') {
      this.setState({
        loadingVisible: true,
        dialogMessage: '加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候...',
      });
    }
  };

  handleDismiss = () => {
    this.setState({ loadingVisible: false });
  };

  renderListSection(items) {
    return (
      <ListCard title="">
        {items.map((item, index) => (
          <ListItem key={index} title={item.text} onPress={() => this.showLoading(item.type)} />
        ))}
      </ListCard>
    );
  }

  render() {
    const tokenItems = [
      { text: '单行样式', type: 'single' },
      { text: '多行样式', type: 'multi' },
    ];

    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ marginTop: 15 }}>
          {this.renderListSection(tokenItems)}
        </View>
        <LoadingToast
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
    backgroundColor: colorToken.surfacePageLow,
  },
});

export default LoadingDemo;
