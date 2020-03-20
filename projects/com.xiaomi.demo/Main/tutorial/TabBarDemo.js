import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const RootTabs = createMaterialTopTabNavigator(
  {
    topPage1: {
      screen: FirstPage,
    },
    topPage2: {
      screen: SecondPage,
    }
  },
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions:
    { 
      activeTintColor: '#ffffff',  //标签栏激活字体颜色
      inactiveTintColor: '#000000', //标签栏未激活字体颜色
      style: { backgroundColor: '#31b3c0' }, //设置整个tabbar样式(背景颜色等)
    }
  }
);

export default function TabBarDemo() {
  return <RootTabs />;
}