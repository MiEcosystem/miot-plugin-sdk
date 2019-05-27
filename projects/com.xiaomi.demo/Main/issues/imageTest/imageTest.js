import { ImageButton } from "miot/ui";
import React, { Component } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';

// const ratio = Dimensions.get('window').width / 375;
let featureBtnBGWidth = 720;

export default class ImageTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      powerOffset: 0,
      colorOffset: 180,
      briOffset: 360,
      cctOffset: 540,
      briScale: 1,
      cctScale: 1,
    };
  }

  //切换按钮
  _createFeatureBtnView(resource, name, flag, opacity, left) {
    return (

      <Animated.View style={[
        styles.featureItemStyle,
        {
          // left: left,
          opacity: opacity,
          /* transform: [{
            scale: flag === "power" ? 1 : flag === "color" ? 1 : flag === "bri" ?
              this.state.briScale : flag === "cct" ? this.state.cctScale : 1
          }] */
        },
      ]}>

        <ImageButton style={[styles.featureBtnStyle]}
          source={resource}
          onPress={null}
        />
        <Text style={[styles.featureBtnTextStyle]}>
          {name}
        </Text>

      </Animated.View>
    )
  }

  render() {
    let powerBtn = this._createFeatureBtnView(require('./images/powerOff.png'), "onoff", 'power', 1, this.state.powerOffset);
    let colorBtn = this._createFeatureBtnView(require('./images/colorOff.png'), "color", 'color', 1, this.state.colorOffset);
    let briBtn = this._createFeatureBtnView(require('./images/briOn.png'), "bri", 'bri', 1, this.state.briOffset);
    let cctBtn = this._createFeatureBtnView(require('./images/cctOff.png'), "temp", 'cct', 1, this.state.cctOffset);

    return (
      <View>
        <View style={styles.box}>
          <Image
            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
            style={styles.favicon}
            resizeMode='cover'
          />
        </View>
        <View style={styles.bigBox}>
          <Image
            source={require('./images/college.jpeg')}
            resizeMode='contain'
            style={styles.college}
          />
        </View>
        <View style={[
          styles.featureViewLayout,
        ]}>
          {cctBtn}
          {briBtn}
          {colorBtn}
          {powerBtn}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  box: {
    width: 64,
    height: 32,
    backgroundColor: 'yellow'
  },
  bigBox: {
    width: 200,
    height: 200,
    backgroundColor: 'red'
  },
  favicon: {
    width: 64,
    height: 32
  },
  college: {
    width: 200,
    height: 200
  },
  //创建切换功能布局
  featureViewLayout: {
    flexDirection: 'row',
    marginTop: 0,
    // marginLeft: 30 * ratio,
    // marginBottom: 67 * ratio,
    // height: 80 * ratio,
    // width: featureBtnBGWidth,
  },
  //功能按钮
  featureItemStyle: {
    // width: 60 * ratio,
    alignItems: 'center',
    backgroundColor: 'yellow',
    marginRight: 10,
    /* position: 'absolute',
    top: 0, */
  },
  //图片样式（ImageButton）
  featureBtnStyle: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
});