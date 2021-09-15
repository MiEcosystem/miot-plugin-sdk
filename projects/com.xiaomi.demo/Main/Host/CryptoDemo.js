// index.ios.js

'use strict';

import { Host, ECCCrypto } from "miot";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import Logger from '../Logger';

export default class TraceDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      md5Text: '',
      base64Text: '',
      SHA1Text: '',
      SHA2Text: '',
      otherP: ''
    };
    this.cryptoObject = new ECCCrypto(ECCCrypto.CurveTypeSecp256r1);
    this.cryptoObject2 = new ECCCrypto(ECCCrypto.CurveTypeSecp256r1);
    Logger.trace(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, padding: 10 }}>
          {
            [
              [
                'MD5',
                this.state.md5Text, () =>
                  Host.crypto.encodeMD5('hello MIoT').then((res) => {
                    this.setState({ md5Text: `md5 res: ${ res }` });
                  }).catch((err) => {
                    this.setState({ md5Text: `md5 failed: ${ err }` });
                  })
              ],
              [
                'Base 64',
                this.state.base64Text, () =>
                  Host.crypto.encodeBase64('hello MIoT').then((res) => {
                    Host.crypto.decodeBase64(res).then((res1) => {
                      this.setState({ base64Text: `Base64 success: ${ res1 }` });
                    }).catch((err) => {
                      this.setState({ base64Text: `decodeBase64 failed: ${ err }` });
                    });
                  }).catch((err) => {
                    this.setState({ base64Text: `encodeBase64 failed: ${ err }` });
                  })
              ],
              [
                'SHA1',
                this.state.SHA1Text, () =>
                  Host.crypto.encodeSHA1('hello MIoT').then((res) => {
                    this.setState({ SHA1Text: `encodeSHA1 success: ${ res }` });
                  }).catch((err) => {
                    this.setState({ SHA1Text: `encodeSHA1 failed: ${ err }` });
                  })
              ],
              [
                'SHA2',
                this.state.SHA2Text, () =>
                  Host.crypto.encodeSHA2('hello MIoT').then((res) => {
                    this.setState({ SHA2Text: `encodeSHA2 success: ${ res }` });
                  }).catch((err) => {
                    this.setState({ SHA2Text: `encodeSHA2 failed: ${ err }` });
                  })
              ]
            ].map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.buttonText}>{item[1] || `${ item[0] }: `}</Text>
                  <TouchableOpacity style={styles.button} onPress={item[2].bind(this)}>
                    <Text style={styles.buttonText}>{`${ item[0] }加密`}</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          }
          <View style={{ height: 20 }}/>
          <Text style={styles.buttonText}> {'eccPublicKey：'} </Text>
          <Text style={styles.buttonText} selectable={true}>{this.state.eccPublicKey0 || '第一步，点击下面按钮产生KP'}</Text>
          <TouchableOpacity style={styles.button} onPress={() => {
            Logger.trace(this, this.render, { action: 'eccPublicKey' });
            Promise.all([this.cryptoObject.generateKeyPair(), this.cryptoObject2.generateKeyPair()]).then((publicKeys) => {
              console.log(`public keys: ${ publicKeys }`);
              this.setState({
                eccPublicKey0: publicKeys[0],
                eccPublicKey1: publicKeys[1],
                otherP: publicKeys[0]
              });
            }).catch((err) => {
              alert(JSON.stringify(err));
            });
          }}>
            <Text style={styles.buttonText}>产生KP（generate key pair）</Text>
          </TouchableOpacity>

          <Text style={styles.buttonText}> {'otherPublicKey：'}</Text>
          <TextInput style={[styles.buttonText, { marginBottom: 5, borderBottomColor: '#AAA', borderBottomWidth: 1 }]}
            placeholder="第二步，在这里输入 otherPublicKey 后再点下面的按钮"
            value={this.state.eccPublicKey0}
            onChangeText={(text) => {
              this.setState({ otherP: text });
            }}
          />
          <TouchableOpacity style={[styles.button, { marginBottom: 40 }]} onPress={() => {
            Logger.trace(this, this.render, { action: 'generateSharedSecret' });
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
          }}>
            <Text style={styles.buttonText}>产生SK（generate shared secret）</Text>
          </TouchableOpacity>
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
