'use strict';

import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Logger from '../Logger';

export default class AbsoluteTouch extends React.Component {

  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      title: '绝对定位点击测试'
    });
    Logger.trace(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            console.log(11111111);
          }}
          style={styles.btn1}
        >
          <Text style={styles.txt}>按钮1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            console.log(22222222);
          }}
          style={styles.btn2}
        >
          <Text style={styles.txt}>按钮2</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    marginTop: 0,
    position: 'relative',
    zIndex: 0
  },
  btn1: {
    width: 150,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    top: 50,
    zIndex: 50
  },
  btn2: {
    width: 150,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    bottom: 20,
    zIndex: 50
  },
  txt: { color: 'white' }
});

