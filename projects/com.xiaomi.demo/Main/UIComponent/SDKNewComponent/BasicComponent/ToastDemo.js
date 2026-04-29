'use strict';

import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { colorToken, showToast, ListCard, ListItem } from 'miot/ui/hyperOSUI';


class ToastDemo extends Component {
  constructor(props) {
    super(props);
  }

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
      <ListCard title="">
        {items.map((item, index) => (
          <ListItem key={index} title={item.text} onPress={() => showToast(this.getToastText(item.text), item.duration)} />
        ))}
      </ListCard>
    );
  }

  render() {
    const tokenItems = [
      { text: '标准单行', duration: 1 },
      { text: '最短样式', duration: 1 },
      { text: '多语言', duration: 2 },
    ];

    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.header}>第三期（轻消息）</Text>
        {this.renderListSection(tokenItems)}
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.surfacePageLow,
    flex: 1,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentSecondaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});

export default ToastDemo;
