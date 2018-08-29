'use strict';

import React from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  PixelRatio,
} from 'react-native';
import { Host } from 'miot';
import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('./MHLocalizableString.js').string;
const bigScreenModels = ["iPhone10,2", "iPhone10,3", "iPhone10,5", "iPhone10,6"]; // ipx,ip8p 的 Identifier
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const minTop = MHGlobalData.APP_MARGINTOP // 上方导航栏的高度
const commonPath = Host.basePath + "common/";
const rightBubbleleft = require("../../Resources/common/left_normal_2x.png");
const rightBubbleright = require("../../Resources/common/right_normal_2x.png");
const bubbleWidthLeft = 50 / PixelRatio.get();
const bubbleWidthRight = 54 / PixelRatio.get();
const height = 84 / PixelRatio.get();
if (bigScreenModels.includes(Host.systemInfo?Host.systemInfo.mobileModel:"")) {
  rightBubbleleft = require("../../Resources/common/left_normal_3x.png");
  rightBubbleright = require("../../Resources/common/right_normal_3x.png");
  bubbleWidthLeft = 82 / PixelRatio.get();
  bubbleWidthRight = 82 / PixelRatio.get();
  height = 120 / PixelRatio.get();
}

import Bubble from './Bubble';

export default class VoiceCommands extends React.Component {
  constructor(props, context) {
    super(props, context);
    // deviceSkills = props.tips;
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <View style={{ height: 53, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 13, color: "#666" }}>{LocalizedStrings.youCanSayLikeThis}</Text>
        </View>
        <View style={[styles.separator, { backgroundColor: "#e5e5e5", marginHorizontal: 20 }]}></View>
        {this._renderDeviceSkills()}
      </View>
    );
  }

  _renderCommands(commands, formLength) {
    var length = commands.length;
    var commandList = [];
    for (let i = 0; i < length; i++) {
      let delay = (formLength + i) * 180;
      commandList.push(
        <View style={{ marginBottom: 11, width: screenWidth, height: height }}>
          <Bubble
            delay={delay}
            rightBubbleleft={rightBubbleleft}
            rightBubbleright={rightBubbleright}
            bubbleWidthLeft={bubbleWidthLeft}
            bubbleWidthRight={bubbleWidthRight}
            height={height}
            color="#4ebba3"
            fontSize={15}
            text={commands[i]}
          />
        </View>
      )
    }
    return commandList;
  }

  _renderDeviceSkills() {
    let contentHeight = 0;
    var deviceSkills = this.props.tips;
    var length = deviceSkills.length;
    var skillList = [];
    let formLength = 0;
    for (let i = 0; i < length; i++) {
      contentHeight += (44 + deviceSkills[i].contents.length * (height + 11)); // 44 是类别标题的高度
      skillList.push(
        <View>
          <View style={{ height: 44 }}>
            <Text style={styles.categoryText}>{deviceSkills[i].title}</Text>
          </View>
          {this._renderCommands(deviceSkills[i].contents, formLength)}
        </View>
      )
      formLength += deviceSkills[i].contents.length;
    }
    contentHeight += (53 + 1 / PixelRatio.get()); // 53 是标题的高度
    let blankHeight = screenHeight - minTop - contentHeight;
    if (blankHeight > 0) {
      skillList.push(
        <View style={{ width: screenWidth, height: blankHeight, backgroundColor: "#fff" }} />
      )
    }
    return skillList;
  }
}

var styles = StyleSheet.create({
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#dfdfdf',
  },
  categoryText: {
    width: screenWidth,
    textAlign: "right",
    paddingRight: 27,
    marginTop: 19,
    fontSize: 13,
    color: "rgba(0,0,0,0.5)",
  },
});
