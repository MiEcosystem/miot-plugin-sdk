'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { ListItem, ListItemWithWidget, colorToken, JestComponent } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const alert = Alert.alert;
const sourceData1 = [
  {
    componentType: 2,
    index: 1,
    type: 'switch',
    title: '列表主文字',
    hideRightIcon: true,
    showDot: false,
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
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 3,
    title: '列表主文字',
    hideRightIcon: false,
    showDot: false,
    onPress: () => console.log(4)
  },
  {
    componentType: 1,
    index: 4,
    title: '列表主文字',
    value: '状态状态状态',
    hideRightIcon: false,
    showDot: true,
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
    onPress: () => console.log(4)
  },
  {
    componentType: 2,
    index: 7,
    title: '列表主文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
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
    onPress: () => console.log(4),
    showTitleArrow: true
  },
  {
    componentType: 2,
    index: 10,
    title: '列表主文字列表主文字列表主文字列表',
    // title: 'dahjdhsjadjsajkdjsajdsajkdsjkajdksadsjakdjskadsajdsjadjksajkdsja',
    type: 'checkbox',
    hideRightIcon: false,
    showDot: true,
    onPress: () => console.log(4),
    checkboxOption: {
      checked: true,
      onValueChange: (val) => console.log(val)
    }
  }
];

const sourceData2 = [
  {
    componentType: 2,
    index: 1,
    title: '列表主文字',
    hideRightIcon: true,
    showDot: false,
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
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    buttonOption: {
      title: '按钮',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'green',
      type: 'light',
      size: 'medium'
    }
  },
  {
    componentType: 2,
    index: 8,
    title: '列表主文字',
    type: 'button',
    hideRightIcon: false,
    showDot: true,
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
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    showTitleArrow: true
  },
  {
    componentType: 2,
    index: 10,
    title: '列表主文字列表主文字列表主文字列表',
    // title: 'dahjdhsjadjsajkdjsajdsajkdsjkajdksadsjakdjskadsajdsjadjksajkdsja',
    type: 'checkbox',
    hideRightIcon: false,
    showDot: true,
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    onPress: () => console.log(4),
    checkboxOption: {
      checked: true,
      onValueChange: (val) => console.log(val)
    }
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
    onPress: () => console.log(4)

  },
  {
    componentType: 1,
    index: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideRightIcon: false,
    showDot: false,
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
    onPress: () => console.log(4),
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮v按钮',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'green',
      type: 'light',
      size: 'medium'
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
    onPress: () => console.log(4),
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮v按钮',
      onPress: () => console.log(4)
    },
    showTitleArrow: true
  },
  {
    componentType: 2,
    index: 10,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表',
    // title: 'dahjdhsjadjsajkdjsajdsajkdsjkajdksadsjakdjskadsajdsjadjksajkdsja',
    type: 'checkbox',
    hideRightIcon: false,
    showDot: true,
    onPress: () => console.log(4),
    checkboxOption: {
      checked: true,
      onValueChange: (val) => console.log(val)
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
    onPress: () => console.log(4),
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮',
      onPress: () => console.log(4),
      // ellipsizeMode: 'tail',
      colorType: 'green',
      type: 'light',
      size: 'medium'
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
    onPress: () => console.log(4),
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    buttonOption: {
      title: '按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮',
      onPress: () => console.log(4)
    },
    showTitleArrow: true
  },
  {
    componentType: 2,
    index: 10,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表',
    // title: 'dahjdhsjadjsajkdjsajdsajkdsjkajdksadsjakdjskadsajdsjadjksajkdsja',
    type: 'checkbox',
    hideRightIcon: false,
    showDot: true,
    leftIcon: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} />,
    onPress: () => console.log(4),
    checkboxOption: {
      checked: true,
      onValueChange: (val) => console.log(val)
    }
  }
];

const propConfigs1 = [
  { name: 'title', type: 'string', defaultValue: '主标题' },
  { name: 'subtitle', type: 'string', defaultValue: '副标题内容' },
  { name: 'value', type: 'string', defaultValue: '右侧文案' },
  { name: 'onPress', type: 'pass', passDescription: '点击事件回调', defaultValue: () => alert('onPress') },
  { name: 'onLongPress', type: 'pass', passDescription: '长按事件回调', defaultValue: () => alert('onLongPress') },
  { name: 'delayLongPress', type: 'number', defaultValue: 500 },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'hideRightIcon', type: 'boolean', defaultValue: false },
  { name: 'rightIconType', type: 'enum', enumOptions: ['arrow', 'select', 'fold'], defaultValue: 'arrow' },
  { name: 'showDot', type: 'boolean', defaultValue: false },
  { name: 'leftIcon', type: 'pass', passDescription: '左侧图标组件', defaultValue: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} /> },
  { name: 'customRenderer', type: 'pass', passDescription: '右侧自定义渲染', defaultValue: <Image style={{ resizeMode: 'contain', width: 46, height: 46 }} source={require('../../images/group.png')} /> }
];

const propConfigs2 = [
  { name: 'type', type: 'enum', enumOptions: ['switch', 'button', 'checkbox'], defaultValue: 'switch' },
  { name: 'title', type: 'string', defaultValue: '主标题' },
  { name: 'subtitle', type: 'string', defaultValue: '副标题' },
  { name: 'valueText', type: 'string', defaultValue: '值文本' },
  { name: 'value', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'onPress', type: 'pass', passDescription: '点击事件回调', defaultValue: () => alert('onPress') },
  { name: 'onValueChange', type: 'pass', passDescription: '值变化回调 (必填)', defaultValue: () => alert('onValueChange') },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'red', 'blue', 'wathet', 'purple', 'white', 'orange', 'yellow'],
    defaultValue: 'green'
  },
  { name: 'leftIcon', type: 'pass', passDescription: '左侧图标组件', defaultValue: <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={require('../../images/group.png')} /> },
  { name: 'showTitleArrow', type: 'boolean', defaultValue: false },
  { name: 'underlayColor', type: 'string' },
  { name: 'customRenderer', type: 'pass', passDescription: '右侧自定义渲染', defaultValue: <Image style={{ resizeMode: 'contain', width: 46, height: 46 }} source={require('../../images/group.png')} /> },
  {
    name: 'buttonOption',
    type: 'object',
    objectProps: [
      { name: 'size', type: 'enum', enumOptions: ['small', 'medium', 'large', 'mini'], defaultValue: 'large' },
      { name: 'type', type: 'enum', enumOptions: ['normal', 'primary', 'warning', 'light'], defaultValue: 'normal' },
      { name: 'title', type: 'string', defaultValue: '按钮' },
      { name: 'colorType', type: 'enum', enumOptions: ['green', 'blue', 'purple', 'orange', 'yellow', 'red', 'wathet', 'white'] },
      { name: 'disabled', type: 'boolean', defaultValue: false }
    ]
  },
  {
    name: 'checkboxOption',
    type: 'object',
    objectProps: [
      { name: 'checkedColor', type: 'string', defaultValue: '#4caf50' },
      { name: 'checked', type: 'boolean', defaultValue: false },
      { name: 'onValueChange', type: 'pass', passDescription: '单选变化回调' }
    ]
  },
  {
    name: 'accessibilityTitle',
    type: 'object',
    objectProps: [
      { name: 'accessible', type: 'boolean', defaultValue: true },
      { name: 'accessibilityLabel', type: 'string', defaultValue: '主标题' },
      { name: 'accessibilityRole', type: 'string', defaultValue: 'header' }
    ]
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
      <View style={styles.caseContainer}>
        <Text style={[styles.header, { marginTop: 12 }]}>ListItem - 普通列表项</Text>
        <JestComponent component={ListItem} propConfigs={propConfigs1} onPropsChange={(props) => console.log(props)}/>
      </View>
      <View style={styles.caseContainer}>
        <Text style={[styles.header, { marginTop: 12 }]}>ListItemWithWidget - 带控件列表项</Text>
        <JestComponent component={ListItemWithWidget} propConfigs={propConfigs2} onPropsChange={(props) => console.log(props)}/>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    backgroundColor: colorToken.mj_color_gray_bg_2
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
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 15,
    lineHeight: 24
  },
  data: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colorToken.mj_color_gray_card_1
  },
  caseContainer: {
    marginBottom: 12
  }
});

export default ListItemDemo;
