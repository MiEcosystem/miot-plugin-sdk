// index.ios.js

'use strict';

import { Host, ECCCrypto } from "miot";
import OrbitView from 'miot/ui/OrbitView';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Platform, TextInput } from 'react-native';
import Logger from '../Logger';
import Video from 'react-native-video';

let ZhuiMiRobot = require('../../Resources/zhuimi_robot');
let ZhuiMiRobotV2 = require('../../Resources/zhuimi_robot_v2.json');
let BoardJSON = require('../../Resources/board');

export default class CryptoDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      md5Text: '',
      base64Text: '',
      SHA1Text: '',
      SHA2Text: '',
      image: '',
      video: '',
      otherP: ''
    };
    this.cryptoObject = new ECCCrypto(ECCCrypto.CurveTypeSecp256r1);
    this.cryptoObject2 = new ECCCrypto(ECCCrypto.CurveTypeSecp256r1);
    Logger.trace(this);
  }

  render() {
    let array = [['小黑板路径转图片', 'image', '.jpg'], ['小黑板路径转 PDF', 'pdf', '.pdf'], ['小黑板路径转视频', 'video', '.mov']].map((item) => {
      return [item[0], () => {
        Host.crypto.createMediaWithPoints(BoardJSON, item[1], new Date().getTime().toString() + item[2], {
          backgroundColor: '#FFF',
          lineColor: 'red',
          lineWidth: 5.0,
          scale: 375 / 27398,
          size: { width: 27398, height: 20500 },
          maxPressure: 2047,
          pointsPerFrame: 2
        }).then((res) => {
          console.log('success', res);
          if (item[1] == 'video') {
            this.setState({
              video: res.data
            });
          }
          if (item[1] == 'image') {
            this.setState({
              image: res.data
            });
          }
        }).catch((err) => {
          alert(JSON.stringify(err));
        });
      }];
    });

    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <OrbitView style={{ width: '100%', height: 250, flexDirection: 'row' }}
            ref={(ref) => { this.orbitView = ref; }}
            lineColor= "red"
            lineWidth={5}
            scale={375 / 27398}
            deviceWidth={27398}
            deviceHeight={20500}
            maxPressure={2047}
          >
            <View style={{ alignSelf: "flex-end", width: '100%', height: 30, backgroundColor: '#0007', flexDirection: 'row', flexWrap: 'nowrap' }}>
              {
                [
                  ['展示', () => { this.orbitView.displayPoints(BoardJSON); }],
                  ['是否可撤销', () => { this.orbitView.canRevoke().then((res) => { alert(JSON.stringify(res)); }).catch((err) => { alert(JSON.stringify(err)); }); }],
                  ['撤销', () => { this.orbitView.revoke(); }],
                  ['清除', () => { this.orbitView.clear(); }]
                ].map((item, index) => {
                  return (
                    <TouchableOpacity style={[styles.button, { height: '100%', flexShrink: 1, backgroundColor: '#0000' }]} onPress={item[1].bind(this)} key={index}>
                      <Text style={[styles.buttonText, { color: 'white' }]}>{item[0]}</Text>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          </OrbitView>
          <View style={{ height: 20 }}/>
          {
            [
              ['追觅机器人路径转图片', () => {
                Host.crypto.zhuimiRobotTracesToImageBase64(ZhuiMiRobot.width, ZhuiMiRobot.height, JSON.stringify(ZhuiMiRobot.traces)).then((res) => {
                  console.log('success', res);
                  this.setState({
                    image: `data:image/png;base64,${ res.data }`
                  });
                }).catch((err) => {
                  alert(JSON.stringify(err));
                });
              }],
              ['追觅机器人路径转图片V2', () => {
                Host.crypto.zhuimiRobotTracesToImageBase64V2(ZhuiMiRobotV2.width, ZhuiMiRobotV2.height, JSON.stringify(ZhuiMiRobotV2.traces)).then((res) => {
                  console.log('success', res);
                  this.setState({
                    image: `data:image/png;base64,${ res.data }`
                  });
                }).catch((err) => {
                  alert(JSON.stringify(err));
                });
              }]
            ].concat(array).map((item, index) => {
              return (
                <TouchableOpacity style={styles.button} onPress={() => {
                  Logger.trace(this, this.render, { action: item[0] });
                  item[1]();
                }} key={index}>
                  <Text style={styles.buttonText}>{item[0]}</Text>
                </TouchableOpacity>
              );
            })
          }
          <View style={{ height: 20 }} />
          {
            this.state.image === '' ? null :
              <Image style={{ width: '100%', aspectRatio: ZhuiMiRobot.width / ZhuiMiRobot.height }}
                source={{ uri: this.state.image }} />
          }
          <View style={{ height: 20 }} />
          {
            this.state.video === '' ? null : <Video style={{ width: '100%', height: 200 }}
              source={{ uri: this.state.video }}
              paused={false}
              resizeMode="contain"
              onEnd={() => { }}
              repeat={false}
              onError={() => { console.log('Callback when video cannot be loaded'); }}
            />
          }
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    color: '#000',
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#555',
    fontSize: 14,
    padding: 5
  }
});
