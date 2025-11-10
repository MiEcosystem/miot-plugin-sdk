'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

class ListDemo extends Component {
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
      { label: '基础样式', router: 'ListItemDemo' },
      { label: '卡片包裹', router: 'ListGroupDemo' }
    ];
    return (
      <ScrollView style={styles.container}>
        {this.renderListSection('token', tokenItems)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7'
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
  sectionTitle: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 15,
    paddingVertical: 8
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

export default ListDemo;
