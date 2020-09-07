import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const RootTabs = createMaterialTopTabNavigator(
  {
    topPage1: {
      screen: FirstPage
    },
    topPage2: {
      screen: SecondPage
    }
  },
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions:
    { 
      activeTintColor: '#1F1F1F', // 标签栏激活字体颜色
      inactiveTintColor: '#666', // 标签栏未激活字体颜色
      style: { backgroundColor: '#FFF', borderTopColor: '#0003', borderTopWidth: 0.5 } // 设置整个tabbar样式(背景颜色等)
    }
  }
);

export default function TabBarDemo() {
  return <RootTabs />;
}