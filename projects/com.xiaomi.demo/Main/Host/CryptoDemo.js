//index.ios.js

'use strict';

import { Host } from "miot";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default class CryptoDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      md5Text: 'md5: ',
      base64Text: 'base64: ',
      SHA1Text: 'SHA1: ',
      SHA2Text: 'SHA2: ',
    };
  }

  render() {
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' }

    return (
      <View style={styles.container}>
        <Text style={[{ fontSize: 20, top: 80 }, fontFamily]}>{this.state.md5Text}</Text>
        <TouchableOpacity style={{ top: 120 }}
          onPress={() => {
            Host.crypto.encodeMD5('hello MIoT').then((res) => {
              this.setState({ md5Text: 'md5 res: ' + res })
            }).catch((err) => {
              this.setState({ md5Text: 'md5 failed: ' + err })
            });
          }}>
          <Text style={[{ fontSize: 20 }, fontFamily]}>MD5 加密</Text>
        </TouchableOpacity >
        <Text style={[{ fontSize: 20, top: 180 }, fontFamily]}>{this.state.base64Text}</Text>
        <TouchableOpacity style={{ top: 220 }}
          onPress={() => {
            Host.crypto.encodeBase64('hello MIoT').then((res) => {
              Host.crypto.decodeBase64(res).then((res1) => {
                this.setState({ base64Text: 'Base64 success: ' + res1 })
              }).catch((err) => {
                this.setState({ base64Text: 'decodeBase64 failed: ' + err })
              });
            }).catch((err) => {
              this.setState({ base64Text: 'encodeBase64 failed: ' + err })
            });
          }}>
          <Text style={[{ fontSize: 20 }, fontFamily]}>Base 64 加解密</Text>
        </TouchableOpacity >
        <Text style={[{ fontSize: 20, top: 280 }, fontFamily]}>{this.state.SHA1Text}</Text>
        <TouchableOpacity style={{ top: 320 }}
          onPress={() => {
            Host.crypto.encodeSHA1('hello MIoT').then((res) => {
              this.setState({ SHA1Text: 'encodeSHA1 success: ' + res })
            }).catch((err) => {
              this.setState({ SHA1Text: 'encodeSHA1 failed: ' + err })
            });
          }}>
          <Text style={[{ fontSize: 20 }, fontFamily]}>点击SHA1</Text>
        </TouchableOpacity >
        <Text style={[{ fontSize: 20, top: 380 }, fontFamily]}>{this.state.SHA2Text}</Text>
        <TouchableOpacity style={{ top: 420 }}
          onPress={() => {
            Host.crypto.encodeSHA2('hello MIoT').then((res) => {
              this.setState({ SHA2Text: 'encodeSHA2 success: ' + res })
            }).catch((err) => {
              this.setState({ SHA2Text: 'encodeSHA2 failed: ' + err })
            });
          }}>
          <Text style={[{ fontSize: 20 }, fontFamily]}>点击SHA2</Text>
        </TouchableOpacity >
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});