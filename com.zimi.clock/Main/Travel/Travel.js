'use strict';

import React from 'react';

import {
  ScrollView,
  Dimensions,
  View,
  StatusBar, Platform
} from "react-native";

import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString').string;
import MyButton from '../CommonComponents/MyButton';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const ratioW = screenWidth / 752;
const maxTop = 684 * ratioW // 上方Tip组件的高度
const minTop = MHGlobalData.APP_MARGINTOP // 上方导航栏的高度
const range = maxTop - minTop; // 可滑动范围

import VoiceCommands from '../CommonComponents/VoiceCommands';
import Tip from '../CommonComponents/Tip';
import TravelSetting from '../TravelSetting/TravelSetting';
import { Device } from "miot";
import ParallaxScroll from "../../CommonModules/ParallaxScroll";
import { TitleBarWhite } from "miot/ui";

var tips = [
  {
    title: LocalizedStrings.travelTitle1,
    contents: [
      LocalizedStrings.travelTip1,
      LocalizedStrings.travelTip2,
    ],
  },
  {
    title: LocalizedStrings.travelTitle2,
    contents: [
      LocalizedStrings.travelTip3,
      LocalizedStrings.travelTip4,
    ],
  },
]

export default class Travel extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <View>
          <TitleBarWhite
            title={LocalizedStrings.travel}
            style={{ backgroundColor: '#4c8ef2' }}
            onPressLeft={() => { navigation.goBack() }}
            rightText={LocalizedStrings.setting}
            onPressRight={() => {
                navigation.navigate('TravelSetting', { 'title': LocalizedStrings.setting });
            }}
          />
        </View>
    };
  };


  constructor(props, context) {
    super(props, context);

    this.state = {
      contentInsetY: range,
      contentOffsetY: -range,
    };
  }

  // 监控上下滑手势
  // 上下滑动的动效，记录contentOffset
  _onScroll(e) {
    this.contentOffsetY = e['nativeEvent']['contentOffset']['y'];
  }

  _onTouchEnd() {
    // 列表在底部
    if (this.state.contentInsetY === range) {
      // 往上滑动25%，就吸顶
      if (this.contentOffsetY > - (range * 0.75)) {
        console.log("release to top");
        this.setState({ contentInsetY: 0, showRefresh: false });
        this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
      }
      // 不到25%，复原
      else {
        console.log("release to bottom");
        this.refs.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
    }
    // 列表在顶部
    else {
      // 往下滑动25%，就坠底
      if (this.contentOffsetY < - (range * 0.25)) {
        console.log("release to bottom");
        this.setState({ contentInsetY: range, showRefresh: true });
        this.refs.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
      // 不到25%，复原
      else if (this.contentOffsetY >= - (range * 0.25) && this.contentOffsetY < 0) {
        console.log("release to top");
        this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar barStyle={"light-content"} />
        <ParallaxScroll
          style={{ backgroundColor: '#fff' }}
          headerHeight={0}
          isHeaderFixed={true}
          onHeaderFixed={() => { }}
          parallaxHeight={684*screenWidth / 752}
          innerRef={ref => this.scrollView = ref}
          useNativeDriver={false}
          isBackgroundScalable={false}
          onChangeHeaderVisibility={() => { }}
          renderParallaxBackground={() => (
            <Tip
              // iconSize={180}
              backgroundColor={'#4c8ef2'}
              iconUri={require('../../Resources/travel/icon_出行_normal.png')}
              dialogText={LocalizedStrings.travelTipExample} />
          )}
          fadeOutParallaxBackground={false}
          fadeOutParallaxForeground={false}
          parallaxBackgroundScrollSpeed={1000}
          parallaxForegroundScrollSpeed={2.5}
        >
          <VoiceCommands tips={tips} />
        </ParallaxScroll>
      </View>
    );
  }
}

var route = {
  key: "travel",
  title: LocalizedStrings.travel,
  component: Travel,
  navLeftButtonStyle: {
    tintColor: '#fff',
  },
  navTitleStyle: {
    color: '#fff',
  },
  navBarStyle: {
    backgroundColor: '#4c8ef2',
  },
  renderNavRightComponent: function (route, navigator, index, navState) {
    if (Device.isOwner) {
      return (
        <View style={{ left: 0, width: 29 + 15 * 2, height: MHGlobalData.APPBAR_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
          <MyButton
            title={LocalizedStrings.setting}
            fontStyle={{ color: "#fff", fontSize: 16 }}
            onClick={() => navigator.push(TravelSetting.route)}
          />
        </View>
      );
    } else {
      return null;
    }
  },
};
