'use strict';
import React, { Component } from 'react';
import {  Platform, StyleSheet, Text,View, } from 'react-native';
import {Host} from "miot";



export default class HostPropsInfoDemo extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <View style={{flex: 1}}>
        <View style={{padding: 10}}>
          <Text style={styles.textStyle}>Host.type:  {""+Host.type}</Text>
          <Text style={styles.textStyle}>Host.isAndroid:  {""+Host.isAndroid}</Text>
          <Text style={styles.textStyle}>Host.isIOS:  {""+Host.isIOS}</Text>
          <Text style={styles.textStyle}>Host.version:  {""+Host.version}</Text>
          <Text style={styles.textStyle}>Host.apiLevel:  {""+Host.apiLevel}</Text>
          <Text style={styles.textStyle}>Host.isDebug:  {""+Host.isDebug}</Text>
          <Text style={styles.textStyle}>Host.systemInfo:  {""+JSON.stringify(Host.systemInfo)}</Text>
          <Text style={styles.textStyle}>Host.appConfigEnv:  {""+Host.appConfigEnv}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    color:"#333333",
    fontStyle:'normal',
    marginTop:10,
  }
})
