'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { ListItem, ListItemWithSwitch } from 'miot/ui/ListItem';

const sourceData1 = [
  {
    componentType: 2,
    index: 1,
    type: 'switch',
    title: '列表主文字',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 2,
    title: '列表主文字',
    value: '巨无霸',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 3,
    title: '列表主文字',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 4,
    title: '列表主文字',
    value: '状态状态状态',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
    
  },
  {
    componentType: 1,
    index: 5,
    title: '列表主文字',
    rightIconType: 'fold',
    value: '状态',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
    
  },
  {
    componentType: 1,
    index: 6,
    rightIconType: 'select',
    title: '列表主文字',
    value: '状态',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 2,
    index: 7,
    title: '列表主文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    buttonOption: {
      title: '按钮',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'greenLayerGreen'
      // backgroundColor: { bgColorNormal: '#0CCE941A'},
      // titleStyle: { color: 'green',  }
    }
  },
  {
    componentType: 2,
    index: 8,
    title: '列表主文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    buttonOption: {
      title: '全选',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'grayLayerBlack',
      size: 'mini'
    }
  },
  {
    componentType: 2,
    index: 9,
    title: '列表主文字',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  }
];

const sourceData2 = [
  {
    componentType: 2,
    index: 1,
    title: '列表主文字',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
    // leftIconSize: 'small',
  },
  {
    componentType: 1,
    index: 2,
    title: '列表主文字',
    value: '巨无霸',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png'),
    leftIconSize: 'regular'
  },
  {
    componentType: 1,
    index: 3,
    title: '列表主文字',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    index: 4,
    title: '列表主文字',
    value: '状态',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    index: 5,
    title: '列表主文字',
    rightIconType: 'fold',
    value: '状态',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    index: 6,
    rightIconType: 'select',
    title: '列表主文字',
    value: '状态',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 2,
    index: 7,
    title: '列表主文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png'),
    buttonOption: {
      title: '按钮',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'greenLayerGreen'
      // backgroundColor: { bgColorNormal: '#0CCE941A'},
      // titleStyle: { color: 'green',  }
    }
  },
  {
    componentType: 2,
    index: 8,
    title: '列表主文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png'),
    buttonOption: {
      title: '全选',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'grayLayerBlack',
      size: 'mini'
    }
  },
  {
    componentType: 2,
    index: 9,
    title: '列表主文字',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  }
];

const sourceData3 = [
  {
    componentType: 2,
    index: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    value: '巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
    
  },
  {
    componentType: 1,
    index: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 4,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    value: '状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 5,
    rightIconType: 'fold',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    value: '状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 6,
    rightIconType: 'select',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: false,
    showDot: false,
    value: '状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态',
    containerStyle: { width: '100%' },
    onPress: () => console.log(4)
  },
  {
    componentType: 2,
    index: 7,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮v按钮',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'greenLayerGreen'
      // backgroundColor: { bgColorNormal: '#0CCE941A' },
      // titleStyle: { color: 'green',  }
    }
  },
  {
    componentType: 2,
    index: 8,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    buttonOption: {
      title: '全选全选全选全选全选全选全选全选全选全选全选',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'grayLayerBlack',
      size: 'mini'
    }
  },
  {
    componentType: 2,
    index: 9,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮v按钮',
      onPress: () => console.log(4)
    }
  }
];

const sourceData4 = [
  {
    componentType: 2,
    index: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    index: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    value: '巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸巨无霸',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    index: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    index: 4,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    value: '状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    index: 5,
    rightIconType: 'fold',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    value: '状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 1,
    index: 6,
    rightIconType: 'select',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: false,
    showDot: false,
    value: '状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态',
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 2,
    index: 7,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'greenLayerGreen'
      // backgroundColor: { bgColorNormal: '#0CCE941A' },
      // titleStyle: { color: 'green',  }
    },
    leftIcon: require('./images/group.png')
  },
  {
    componentType: 2,
    index: 8,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    // valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png'),
    buttonOption: {
      title: '全选全选全选全选全选全选全选全选全选全选全选',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'grayLayerBlack',
      size: 'mini'
    }
  },
  {
    componentType: 2,
    index: 9,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    leftIcon: require('./images/group.png'),
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮v按钮',
      onPress: () => console.log(4)
    }
  }
];

class ListItemDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceData: sourceData1
    };
  }
  transformData(type) {
    let data = [];
    switch (type) {
      case 1:
        data = sourceData1;
        break;
      case 2:
        data = sourceData2;
        break;
      case 3:
        data = sourceData3;
        break;
      case 4:
        data = sourceData4;
        break;
      default:
        data = sourceData1;
    }
    this.setState({
      sourceData: data
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
          <View style={styles.data}>
            {
              this.state.sourceData.map((item, index) => {
                if (item.componentType === 1) {
                  return <ListItem key={index} {...item} />;
                } 
                return <ListItemWithSwitch key={index} {...item} />;
              })
            }
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
    paddingHorizontal: 12,
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
  },
  data: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden'
  }
});

export default ListItemDemo;
