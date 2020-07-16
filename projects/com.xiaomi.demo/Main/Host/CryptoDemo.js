// index.ios.js

'use strict';

import { Host, ECCCrypto } from "miot";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Platform, TextInput } from 'react-native';

let ZhuiMiRobot = require('../../Resources/zhuimi_robot');

export default class CryptoDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      md5Text: 'md5: ',
      base64Text: 'base64: ',
      SHA1Text: 'SHA1: ',
      SHA2Text: 'SHA2: ',
      zhuimiRobotTracesToImageBase64: '',
      otherP: ''
    };

    this.cryptoObject = new ECCCrypto(ECCCrypto.CurveTypeSecp256r1);
    this.cryptoObject2 = new ECCCrypto(ECCCrypto.CurveTypeSecp256r1);
  }

  render() {
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' };
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <Text style={[{ fontSize: 14 }, fontFamily]}>{this.state.md5Text}</Text>
          <TouchableOpacity
            style={{ marginTop: 10, height: 40, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              Host.crypto.encodeMD5('hello MIoT').then((res) => {
                this.setState({ md5Text: `md5 res: ${ res }` });
              }).catch((err) => {
                this.setState({ md5Text: `md5 failed: ${ err }` });
              });
            }}>
            <Text style={[{ fontSize: 14 }, fontFamily]}>MD5 加密</Text>
          </TouchableOpacity>
          <Text style={[{ fontSize: 14 }, fontFamily]}>{this.state.base64Text}</Text>
          <TouchableOpacity
            style={{ marginTop: 10, height: 40, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              Host.crypto.encodeBase64('hello MIoT').then((res) => {
                Host.crypto.decodeBase64(res).then((res1) => {
                  this.setState({ base64Text: `Base64 success: ${ res1 }` });
                }).catch((err) => {
                  this.setState({ base64Text: `decodeBase64 failed: ${ err }` });
                });
              }).catch((err) => {
                this.setState({ base64Text: `encodeBase64 failed: ${ err }` });
              });
            }}>
            <Text style={[{ fontSize: 14 }, fontFamily]}>Base 64 加解密</Text>
          </TouchableOpacity>
          <Text style={[{ fontSize: 14 }, fontFamily]}>{this.state.SHA1Text}</Text>
          <TouchableOpacity
            style={{ marginTop: 10, height: 40, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              Host.crypto.encodeSHA1('hello MIoT').then((res) => {
                this.setState({ SHA1Text: `encodeSHA1 success: ${ res }` });
              }).catch((err) => {
                this.setState({ SHA1Text: `encodeSHA1 failed: ${ err }` });
              });
            }}>
            <Text style={[{ fontSize: 14 }, fontFamily]}>点击SHA1</Text>
          </TouchableOpacity>
          <Text style={[{ fontSize: 14 }, fontFamily]}>{this.state.SHA2Text}</Text>
          <TouchableOpacity
            style={{ marginTop: 10, height: 40, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              Host.crypto.encodeSHA2('hello MIoT').then((res) => {
                this.setState({ SHA2Text: `encodeSHA2 success: ${ res }` });
              }).catch((err) => {
                this.setState({ SHA2Text: `encodeSHA2 failed: ${ err }` });
              });
            }}>
            <Text style={[{ fontSize: 14 }, fontFamily]}>点击SHA2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10, height: 40, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              Host.crypto.zhuimiRobotTracesToImageBase64(ZhuiMiRobot.width, ZhuiMiRobot.height, JSON.stringify(ZhuiMiRobot.traces)).then((res) => {
                console.log('success', res);
                this.setState({
                  zhuimiRobotTracesToImageBase64: `data:image/png;base64,${ res.data }`
                });
                // alert(JSON.stringify(res))
              }).catch((err) => {
                alert(JSON.stringify(err));
              });
            }}>
            <Text style={[{ fontSize: 14 }, fontFamily]}>zhuimiRobotTracesToImageBase64</Text>
          </TouchableOpacity>
          {
            this.state.zhuimiRobotTracesToImageBase64 === '' ? <Text>图片内容为空</Text> :
              <Image style={{ width: ZhuiMiRobot.width, height: ZhuiMiRobot.height }} source={{ uri: this.state.zhuimiRobotTracesToImageBase64 }}/>
          }
          <TouchableOpacity
            style={{ marginTop: 10, height: 40, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              Promise.all([this.cryptoObject.generateKeyPair(), this.cryptoObject2.generateKeyPair()]).then((publicKeys) => {
                console.log(`public keys: ${ publicKeys }`);
                this.setState({
                  eccPublicKey0: publicKeys[0],
                  eccPublicKey1: publicKeys[1]
                });

              }).catch((err) => {
                alert(JSON.stringify(err));
              });
            }}
          >
            <Text style={[{ fontSize: 14 }, fontFamily]}>第一步：产生KP（generate key pair）</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10, height: 40, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              this.cryptoObject.generateSharedSecret(this.state.eccPublicKey1).then((sharedSecret) => {
                this.cryptoECCSharedSecret = sharedSecret;
                console.log(`shared secret:${ sharedSecret }`);
              }).catch((err) => {
                console.log(`generate shared secret error:${ JSON.stringify(err) }`);
              });
              this.cryptoObject.generateSharedSecret(this.state.otherP).then((shareS) => {
                alert(JSON.stringify(shareS));
              }).catch((err) => {
                alert(JSON.stringify(err));
              });
            }}
          >
            <Text style={[{ fontSize: 14 }, fontFamily]}>第二步：产生SK（generate shared secret）</Text>
          </TouchableOpacity>
          <Text
            style={{ fontSize: 14, color: '#333333', marginTop: 10 }}
          >
            {'eccPublicKey：'}
          </Text>
          <Text
            style={{ fontSize: 14, padding: 10, color: '#666666' }}
            selectable={true}
          >
            {this.state.eccPublicKey0}
          </Text>

          <Text
            style={{ fontSize: 14, color: '#333333', marginTop: 10 }}
          >
            {'请输入otherPublicKey：'}
          </Text>
          <TextInput
            style={{ height: 40, borderBottomColor: '#aaa', borderBottomWidth: 1 }}
            placeholder="otherPublicKey"
            onChangeText={(text) => {
              this.setState({ otherP: text });
            }}
          />

        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
