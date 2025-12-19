'use strict';

import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { ListItem, ListItemWithWidget } from 'miot/ui/hyperOSUI';
import withDarkModeSupport from '../adaptiveThemeComponent';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { colorToken } from 'miot/ui/hyperOSUI';

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
    subtitle: '列表副文字',
    value: '巨无霸',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 3,
    title: '列表主文字',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
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
      colorType: 'green',
      type: 'light',
      size: 'medium'
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
      type: 'normal',
      size: 'small'
    }
  },
  {
    componentType: 2,
    index: 9,
    title: '列表主文字列表主文字列表主文字列表',
    // title: 'dahjdhsjadjsajkdjsajdsajkdsjkajdksadsjakdjskadsajdsjadjksajkdsja',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    showTitleArrow: true
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
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
  },
  {
    componentType: 1,
    index: 2,
    title: '列表主文字',
    subtitle: '列表副文字',
    value: '巨无霸',
    hideRightIcon: true,
    showDot: false,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    leftIconSize: 'regular'
  },
  {
    componentType: 1,
    index: 3,
    title: '列表主文字',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
  },
  {
    componentType: 1,
    index: 4,
    title: '列表主文字',
    value: '状态',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
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
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
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
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
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
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    buttonOption: {
      title: '按钮',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'green',
      type: 'light',
      size: 'medium'
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
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    buttonOption: {
      title: '全选',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      type: 'normal',
      size: 'small'
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
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    showTitleArrow: true
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
    onPress: () => console.log(4),
    showTitleArrow: true
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
      colorType: 'green',
      type: 'light',
      size: 'medium'
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
    onPress: () => console.log(4),
    buttonOption: {
      title: '全选全选全选全选全选全选全选全选全选全选全选',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      type: 'normal',
      size: 'small'
    }
  },
  {
    componentType: 2,
    index: 9,
    // title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    title: 'abcdefgshsjdhjsdjdsjdhsjsdjdsjdhsjdsjdhsjdhsddsdjdsjdhsjsjdhsjdsjdhsjdhsddsdjdsjdhsjsjdhsjdsjdhsjdhsddsdjdsjdhsj hjdshajdshja dsjahdjsah dsadsajdhsjd dsaj dhsj dsaff dsajhdsj ahjds ajdsaj hdjsa ',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: false,
    showDot: true,
    containerStyle: { width: '100%' },
    valueStyle: { fontSize: 10 },
    onPress: () => console.log(4),
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮v按钮',
      onPress: () => console.log(4)
    },
    showTitleArrow: true
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
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
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
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
  },
  {
    componentType: 1,
    index: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: false,
    showDot: false,
    containerStyle: { width: '100%' },
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
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
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
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
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
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
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
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
      colorType: 'green',
      type: 'light',
      size: 'medium'
      // backgroundColor: { bgColorNormal: '#0CCE941A' },
      // titleStyle: { color: 'green',  }
    },
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />
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
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    buttonOption: {
      title: '全选全选全选全选全选全选全选全选全选全选全选',
      onPress: () => console.log(4),
      type: 'normal',
      size: 'small'
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
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮',
      onPress: () => console.log(4)
    },
    showTitleArrow: true
  }
];

const ListItemDemo = () => {

  const [state, setState] = useState({
    sourceData: sourceData1,
    disabled: false,
    switchValue: false
  });

  const transformData = (type) => {
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
    setState((item) => ({
      ...item,
      sourceData: data
    }));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>基础样式</Text>
        <Text style={styles.button} onPress={() => {
          transformData(1);
        }}>重置</Text>
        <Text style={styles.button} onPress={() => {
          transformData(2);
        }}>切换图标</Text>
        <Text style={styles.button} onPress={() => {
          transformData(3);
        }}>切换长标题</Text>
        <Text style={styles.button} onPress={() => {
          transformData(4);
        }}>切换图标长标题</Text>
        <Text style={styles.button} onPress={() => {
          setState((item) => ({
            ...item,
            disabled: !state.disabled
          }));
        }}>切换禁用态</Text>
        <View style={styles.data}>
          {
            state.sourceData.map((item, index) => {
              if (item.componentType === 1) {
                return <ListItem key={index} {...item} disabled={state.disabled}/>;
              } 
              return <ListItemWithWidget key={index} {...item} disabled={state.disabled} value={state.switchValue} onValueChange={(val) => {
                setState((item) => ({
                  ...item,
                  switchValue: val
                }));
              }}/>;
            })
          }
        </View>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    backgroundColor: colorToken.mj_color_gray_bg_2,
    minHeight: '100%'
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_1,
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
    borderRadius: 16,
    overflow: 'hidden'
  }
});

export default withDarkModeSupport(ListItemDemo);
