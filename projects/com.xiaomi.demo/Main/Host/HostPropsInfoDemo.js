'use strict';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Host } from "miot";
import Logger from '../Logger';

export default class HostPropsInfoDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wifiInfo: '',
      appName: '',
      phoneScreenInfo: '',
      operatorsInfo: '',
      phoneHasNfcForAndroid: '',
      pageShouldAdapterSoftKeyboard: false
    };
    Logger.trace(this);
  }

  componentDidMount() {
    Host.getWifiInfo().then((res) => {
      this.setState({ wifiInfo: res });
    }).catch(() => {
      this.setState({ wifiInfo: '没有获取到wifi信息' });
    });
    Host.getAppName().then((res) => {
      this.setState({ appName: res });
    }).catch(() => {
      this.setState({ appName: '没有获取到appName' });
    });
    Host.getPhoneScreenInfo().then((res) => {
      this.setState({ phoneScreenInfo: res });
    }).catch((err) => {
      this.setState({ phoneScreenInfo: err });
    });
    Host.getOperatorsInfo().then((res) => {
      this.setState({ operatorsInfo: res });
    }).catch((err) => {
      this.setState({ operatorsInfo: err });
    });
    Host.phoneHasNfcForAndroid().then((res) => {
      this.setState({ phoneHasNfcForAndroid: res });
    }).catch((err) => {
      this.setState({ phoneHasNfcForAndroid: err });
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
        <ScrollView showsHorizontalScrollIndicator={false}>
          {
            [
              ['type', Host.type],
              ['isAndroid', Host.isAndroid],
              ['isIOS', Host.isIOS],
              ['version', Host.version],
              ['apiLevel', Host.apiLevel],
              ['isDebug', Host.isDebug],
              ['systemInfo', Host.systemInfo],
              ['appConfigEnv', `${ Host.appConfigEnv }\n(\n1:表示选中,preview； \n0:表示未选中, release\n)`],
              ['getWifiInfo', this.state.wifiInfo],
              ['getAppName', this.state.appName],
              ['getPhoneScreenInfo', this.state.phoneScreenInfo],
              ['getOperatorsInfo', this.state.operatorsInfo],
              ['phoneHasNfcForAndroid', this.state.phoneHasNfcForAndroid],
              ['pageShouldAdapterSoftKeyboard', this.state.pageShouldAdapterSoftKeyboard]
            ].map((item, index) => {
              console.log(JSON.stringify(item));
              return (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 48, marginTop: 1, padding: 10, width: '100%', backgroundColor: index % 2 == 0 ? '#FFF' : '#FFFFFFE0' }}>
                  <Text>{`${ item[0] }:    `}</Text>
                  <Text>{typeof item[1] === 'string' ? item[1] : JSON.stringify(item[1], null, '\t')}</Text>
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}
