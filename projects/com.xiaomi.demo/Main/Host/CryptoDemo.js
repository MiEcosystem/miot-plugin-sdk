//index.ios.js

'use strict';

import { Host } from "miot";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';

import ZhuiMiRobot from '../../Resources/zhuimi_robot'

export default class CryptoDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      md5Text: 'md5: ',
      base64Text: 'base64: ',
      SHA1Text: 'SHA1: ',
      SHA2Text: 'SHA2: ',
      zhuimiRobotTracesToImageBase64:''
    };
  }

  render() {
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' }

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, padding:10}}>
          <Text style={[{fontSize: 20}, fontFamily]}>{this.state.md5Text}</Text>
          <TouchableOpacity
            onPress={() => {
              Host.crypto.encodeMD5('hello MIoT').then((res) => {
                this.setState({md5Text: 'md5 res: ' + res})
              }).catch((err) => {
                this.setState({md5Text: 'md5 failed: ' + err})
              });
            }}>
            <Text style={[{fontSize: 20}, fontFamily]}>MD5 加密</Text>
          </TouchableOpacity>
          <Text style={[{fontSize: 20}, fontFamily]}>{this.state.base64Text}</Text>
          <TouchableOpacity
            onPress={() => {
              Host.crypto.encodeBase64('hello MIoT').then((res) => {
                Host.crypto.decodeBase64(res).then((res1) => {
                  this.setState({base64Text: 'Base64 success: ' + res1})
                }).catch((err) => {
                  this.setState({base64Text: 'decodeBase64 failed: ' + err})
                });
              }).catch((err) => {
                this.setState({base64Text: 'encodeBase64 failed: ' + err})
              });
            }}>
            <Text style={[{fontSize: 20}, fontFamily]}>Base 64 加解密</Text>
          </TouchableOpacity>
          <Text style={[{fontSize: 20}, fontFamily]}>{this.state.SHA1Text}</Text>
          <TouchableOpacity
            onPress={() => {
              Host.crypto.encodeSHA1('hello MIoT').then((res) => {
                this.setState({SHA1Text: 'encodeSHA1 success: ' + res})
              }).catch((err) => {
                this.setState({SHA1Text: 'encodeSHA1 failed: ' + err})
              });
            }}>
            <Text style={[{fontSize: 20}, fontFamily]}>点击SHA1</Text>
          </TouchableOpacity>
          <Text style={[{fontSize: 20}, fontFamily]}>{this.state.SHA2Text}</Text>
          <TouchableOpacity
            onPress={() => {
              Host.crypto.encodeSHA2('hello MIoT').then((res) => {
                this.setState({SHA2Text: 'encodeSHA2 success: ' + res})
              }).catch((err) => {
                this.setState({SHA2Text: 'encodeSHA2 failed: ' + err})
              });
            }}>
            <Text style={[{fontSize: 20}, fontFamily]}>点击SHA2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Host.crypto.zhuimiRobotTracesToImageBase64(ZhuiMiRobot.width, ZhuiMiRobot.height, JSON.stringify(ZhuiMiRobot.traces)).then((res) => {
                console.log('success', res)
                this.setState({
                  zhuimiRobotTracesToImageBase64: 'data:image/png;base64,'+res.data
                })
                // alert(JSON.stringify(res))
              }).catch((err) => {
                alert(JSON.stringify(err))
              });
            }}>
            <Text style={[{fontSize: 20}, fontFamily]}>zhuimiRobotTracesToImageBase64</Text>
          </TouchableOpacity>
          {
            this.state.zhuimiRobotTracesToImageBase64 === '' ? <Text>图片内容为空</Text> :
              <Image style={{width: ZhuiMiRobot.width, height: ZhuiMiRobot.height}} source={{uri: this.state.zhuimiRobotTracesToImageBase64}}/>
          }

        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});