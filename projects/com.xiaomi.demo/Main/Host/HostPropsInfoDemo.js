'use strict';
import React, { Component } from 'react';
import {  Platform, StyleSheet, Text,View } from 'react-native';
import {Host} from "miot";



export default class HostPropsInfoDemo extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <View style={{flex: 1}}>
        <View style={{padding: 10}}>
          <Text style={{color:"#333333"}}>Host.type:  {""+Host.type}</Text>
          <Text style={{color:"#333333"}}>Host.isAndroid:  {""+Host.isAndroid}</Text>
          <Text style={{color:"#333333"}}>Host.isIOS:  {""+Host.isIOS}</Text>
          <Text style={{color:"#333333"}}>Host.version:  {""+Host.version}</Text>
          <Text style={{color:"#333333"}}>Host.apiLevel:  {""+Host.apiLevel}</Text>
          <Text style={{color:"#333333"}}>Host.isDebug:  {""+Host.isDebug}</Text>
          <Text style={{color:"#333333"}}>Host.systemInfo:  {""+JSON.stringify(Host.systemInfo)}</Text>
        </View>
      </View>
    );
  }
}
