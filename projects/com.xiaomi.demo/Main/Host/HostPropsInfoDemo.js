'use strict';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, } from 'react-native';
import { Host } from "miot";

export default class HostPropsInfoDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wifiInfo: '',
      appName: '',
      phoneScreenInfo: '',
      currentCountry: '',
      operatorsInfo: '',
      phoneHasNfcForAndroid: '',
      pageShouldAdapterSoftKeyboard: false,
    }
  }

  componentDidMount() {
    Host.getWifiInfo().then((res) => {
      this.setState({ wifiInfo: JSON.stringify(res) });
    }).catch(() => {
      this.setState({ wifiInfo: '没有获取到wifi信息' });
    });
    Host.getAppName().then((res) => {
      this.setState({ appName: res });
    }).catch(() => {
      this.setState({ appName: '没有获取到appName' });
    });
    Host.getPhoneScreenInfo().then((res) => {
      this.setState({ phoneScreenInfo: JSON.stringify(res) });
    }).catch((err) => {
      this.setState({ phoneScreenInfo: '没有获取到phoneScreenInfo error:' + err });
    });
    Host.getCurrentCountry().then((res) => {
      this.setState({ currentCountry: res });
    }).catch(() => {
      this.setState({ currentCountry: '没有获取到currentCountry' });
    });
    Host.getOperatorsInfo().then((res) => {
      this.setState({ operatorsInfo: JSON.stringify(res) });
    }).catch((err) => {
      this.setState({ operatorsInfo: '没有获取到operatorsInfo error: ' + err });
    });
    Host.phoneHasNfcForAndroid().then((res) => {
      this.setState({ phoneHasNfcForAndroid: JSON.stringify(res) });
    }).catch((err) => {
      this.setState({ phoneHasNfcForAndroid: 'error:' + err });
    });
    Host.pageShouldAdapterSoftKeyboard().then((res) => {
      this.setState({ pageShouldAdapterSoftKeyboard: res });
    }).catch((err) => {
      this.setState({ pageShouldAdapterSoftKeyboard: err });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <Text style={styles.textStyle}>Host.type:  {"" + Host.type}</Text>
          <Text style={styles.textStyle}>Host.isAndroid:  {"" + Host.isAndroid}</Text>
          <Text style={styles.textStyle}>Host.isIOS:  {"" + Host.isIOS}</Text>
          <Text style={styles.textStyle}>Host.version:  {"" + Host.version}</Text>
          <Text style={styles.textStyle}>Host.apiLevel:  {"" + Host.apiLevel}</Text>
          <Text style={styles.textStyle}>Host.isDebug:  {"" + Host.isDebug}</Text>
          <Text style={styles.textStyle}>Host.systemInfo:  {"" + JSON.stringify(Host.systemInfo)}</Text>
          <Text style={styles.textStyle}>Host.appConfigEnv:  {"" + Host.appConfigEnv} +   (1:表示选中, preview ； 0：表示未选中, release)</Text>
          <Text style={styles.textStyle}>Host.getWifiInfo:  {"" + this.state.wifiInfo}</Text>
          <Text style={styles.textStyle}>Host.getAppName:  {"" + this.state.appName}</Text>
          <Text style={styles.textStyle}>Host.getPhoneScreenInfo:  {"" + this.state.phoneScreenInfo}</Text>
          <Text style={styles.textStyle}>Host.getCurrentCountry:  {"" + this.state.currentCountry}</Text>
          <Text style={styles.textStyle}>Host.getOperatorsInfo:  {"" + this.state.operatorsInfo}</Text>
          <Text style={styles.textStyle}>Host.phoneHasNfcForAndroid:  {"" + this.state.phoneHasNfcForAndroid}</Text>
          <Text style={styles.textStyle}>Host.pageShouldAdapterSoftKeyboard:  {"" + this.state.pageShouldAdapterSoftKeyboard}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#333333",
    fontStyle: 'normal',
    marginTop: 10,
  }
})
