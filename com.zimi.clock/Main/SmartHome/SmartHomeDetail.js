'use strict';

import React from 'react';

import {
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

import MHGlobalData from '../CommonComponents/MHGlobalData';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const ratioW = screenWidth / 752;
const minTop = MHGlobalData.APP_MARGINTOP // 上方导航栏的高度
const range = 289; // 可滑动范围
import Bubble from '../CommonComponents/Bubble';
import VoiceCommands from '../CommonComponents/VoiceCommands';
import ParallaxScroll from "../../CommonModules/ParallaxScroll";

export default class SmartHomeDetail extends React.Component {
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
        this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
      }
      // 不到25%，复原
      else {
        console.log("release to bottom");
        this.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
    }
    // 列表在顶部
    else {
      // 往下滑动25%，就坠底
      if (this.contentOffsetY < - (range * 0.25)) {
        console.log("release to bottom");
        this.setState({ contentInsetY: range, showRefresh: true });
        this.scrollView.scrollTo({ x: 0, y: -range, animated: true });
      }
      // 不到25%，复原
      else if (this.contentOffsetY >= - (range * 0.25) && this.contentOffsetY < 0) {
        console.log("release to top");
        this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ParallaxScroll
          style={{ backgroundColor: '#fff' }}
          headerHeight={0}
          isHeaderFixed={true}
          onHeaderFixed={() => { }}
          parallaxHeight={289}
          innerRef={ref => this.scrollView = ref}
          useNativeDriver={false}
          isBackgroundScalable={false}
          onChangeHeaderVisibility={() => { }}
          renderParallaxBackground={() => (
            <View style={{ height: 289 + minTop, backgroundColor: "#f2f2f2" }}>
              <View style={{ height: 289, marginTop: minTop, alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: 160, height: 160, alignItems: "center", justifyContent: "center" }}>
                  <Image
                    resizeMode="contain"
                    source={{ uri: this.props.navigation.state.params.iconUrl }}
                    style={{ width: 160, height: 160 }}
                  />
                </View>
              </View>
            </View>
          )}
          fadeOutParallaxBackground={false}
          fadeOutParallaxForeground={false}
          parallaxBackgroundScrollSpeed={1000}
          parallaxForegroundScrollSpeed={2.5}
        >
          <VoiceCommands tips={this.props.navigation.state.params.tips} />
        </ParallaxScroll>
      </View>
    );
  }

  //   _renderCommands(commands) {
  //     var length = commands.length;
  //     var commandList = [];
  //     for (let i = 0; i < length; i++) {
  //       commandList.push(
  //         <View style={{ marginTop: 22 * ratioW, marginRight: 40 * ratioW, flex: 1, alignItems: 'flex-end' }}>
  //           <Bubble
  //             rightBubbleleft={require('../../Resources/common/left_normal.png')}
  //             rightBubbleright={require('../../Resources/common/right_normal.png')}
  //             bubbleWidth={68 * ratioW}
  //             height={100 * ratioW}
  //             color="#4ebba3"
  //             fontSize={30 * ratioW}
  //             text={commands[i]}
  //           />
  //         </View>
  //       )
  //     }
  //     return commandList;
  //   }

  //   _renderDeviceSkills() {
  //     var deviceSkills = this.props.navigation.state.params.tips;
  //     var length = deviceSkills.length;
  //     var skillList = [];
  //     for (let i = 0; i < length; i++) {
  //       skillList.push(
  //         <View>
  //           <Text style={styles.categoryText}>{deviceSkills[i].title}</Text>
  //           {this._renderCommands(deviceSkills[i].contents)}
  //         </View>
  //       )
  //     }
  //     return skillList;
  //   }
}

  // var styles = StyleSheet.create({
  //   separator: {
  //     height: 1,
  //     backgroundColor: '#dfdfdf',
  //   },
  //   categoryText: {
  //     width: screenWidth,
  //     textAlign: "right",
  //     paddingRight: 54 * ratioW,
  //     marginTop: 38 * ratioW,
  //     marginBottom: 18 * ratioW,
  //     fontSize: 26 * ratioW,
  //     color: "rgba(0,0,0,0.5)",
  //   },
// });
