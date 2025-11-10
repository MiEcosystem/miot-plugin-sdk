'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LoadingDialog } from 'miot/ui/Dialog';

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
        dialogMessage: '加载中，请稍候...',
        dialogStyle: {
          textNumberOfLines: 1, // 单行样式
          messageStyle: { fontSize: 16 }
        }
      });
    } else if (type === 'multi') {
      this.setState({
        loadingVisible: true,
        dialogMessage: '加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候加载中，请稍候...',
        dialogStyle: {
          textNumberOfLines: 5, // 多行文本
          unlimitedHeightEnable: true,
          messageStyle: { fontSize: 14, lineHeight: 20 }
        }
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    paddingTop: 30
  },
  header: {
    fontSize: 24,
    color: '#000',
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  sectionContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 5
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)'
  },
  itemText: {
    fontSize: 16,
    color: '#000'
  },
  arrow: {
    fontSize: 16,
    color: '#999'
  }
});

export default LoadingDemo;
