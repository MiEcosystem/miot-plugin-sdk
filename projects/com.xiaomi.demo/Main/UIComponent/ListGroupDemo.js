'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { ListGroup } from 'miot/ui/ListItem';

const sourceGroup1data1 = [
  {
    componentType: 2,
    key: 1,
    type: 'switch',
    title: '列表主文字',
    hideArrow: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    key: 2,
    title: '列表主文字',
    hideArrow: true,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    key: 3,
    title: '列表主文字',
    hideArrow: false,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  }
];
const sourceGroup2data1 = [
  {
    componentType: 2,
    key: 1,
    type: 'switch',
    title: '列表主文字',
    hideArrow: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    key: 2,
    title: '列表主文字',
    hideArrow: true,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    key: 3,
    title: '列表主文字',
    hideArrow: false,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  }
];

const sourceGroup1data2 = [
  {
    componentType: 2,
    key: 1,
    title: '列表主文字',
    hideArrow: true,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    key: 2,
    title: '列表主文字',
    hideArrow: true,
    type: 'switch',
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    key: 3,
    title: '列表主文字',
    hideArrow: false,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  }
];
const sourceGroup2data2 = [
  {
    componentType: 2,
    key: 1,
    title: '列表主文字',
    hideArrow: true,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    key: 2,
    title: '列表主文字',
    hideArrow: true,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    key: 3,
    title: '列表主文字',
    hideArrow: false,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  }
];

const sourceGroup1data3 = [
  {
    componentType: 2,
    key: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    key: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    type: 'switch',
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
    
  },
  {
    componentType: 1,
    key: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: false,
    type: 'switch',
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  }
];

const sourceGroup2data3 = [
  {
    componentType: 2,
    key: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    key: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
    
  },
  {
    componentType: 1,
    key: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: false,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  }
];

const sourceGroup1data4 = [
  {
    componentType: 2,
    key: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    key: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    type: 'switch',
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    key: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: false,
    type: 'switch',
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  }
];

const sourceGroup2data4 = [
  {
    componentType: 2,
    key: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    key: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    key: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: false,
    showDot: false,
    type: 'switch',
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  }
];
class ListGroupDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupData1: sourceGroup1data1,
      groupData2: sourceGroup2data1
    };
  }
  transformData(type) {
    let data1 = [];
    let data2 = [];
    switch (type) {
      case 1:
        data1 = sourceGroup1data1;
        data2 = sourceGroup2data1;
        break;
      case 2:
        data1 = sourceGroup1data2;
        data2 = sourceGroup2data2;
        break;
      case 3:
        data1 = sourceGroup1data3;
        data2 = sourceGroup2data3;
        break;
      case 4:
        data1 = sourceGroup1data4;
        data2 = sourceGroup2data4;
        break;
      default:
        data1 = sourceGroup1data1;
        data2 = sourceGroup2data1;
    }
    this.setState({
      groupData1: data1,
      groupData2: data2
    });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>基础样式</Text>
          <Text style={styles.button} onPress={() => {
            this.transformData(2);
          }}>切换图标</Text>
          <Text style={styles.button} onPress={() => {
            this.transformData(3);
          }}>切换长标题</Text>
          <Text style={styles.button} onPress={() => {
            this.transformData(4);
          }}>切换图标长标题</Text>
          <View>
            <ListGroup title="分组标题" type="switch" disabled={false} bottomPosition="inner" bottomTips="自动亮度下，移动滑动条微调亮度，调整后的屏幕亮度仍会随周围环境的亮度变化而变化" groupData={this.state.groupData1} />
          </View>
          <View>
            <ListGroup title="分组标题" type="switch" disabled={true} bottomPosition="outer" bottomTips="自动亮度下，移动滑动条微调亮度，调整后的屏幕亮度仍会随周围环境的亮度变化而变化" groupData={this.state.groupData2} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    paddingTop: 30,
    minHeight: '100%'
  },
  header: {
    fontSize: 24,
    color: '#000',
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  button: {
    fontSize: 14,
    paddingHorizontal: 15,
    lineHeight: 24
  }
});

export default ListGroupDemo;
