'use strict';

import {Device, DeviceEvent, Host, Package} from "miot";
import TitleBar from "miot/ui/TitleBar";
import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { getString } from './MHLocalizableString';



export default class MainPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <View>
          <TitleBar
            type='dark'
            title={navigation.state["params"] ? navigation.state.params.name : Device.name}
            subTitle={getString('NUM_PHOTOS', { 'numPhotos': 1 })}
            onPressLeft={() => { Package.exit() }}
            onPressRight={() => {
              navigation.navigate('moreMenu', { 'title': '设置' });
            }} />
        </View>
    };
  };


  componentWillMount() {
    this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener((device) => {
      console.log("不要以为你改了名字我就不认识你了", device);
      this.props.navigation.setParams({
        name: device.name
      });
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this._deviceNameChangedListener.remove();
  }

  componentDidMount() {
  }

  render() {
    console.log("com.xiaomi.demo", 'render first', Date.now());
    var rowTutorialDemo = this._createMenuRow('教程', 'tutorialDemo');
    var rowControlDemo = this._createMenuRow('设备控制', 'DeviceControl');
    var rowCloudDebug = this._createMenuRow('UI能力', 'UIDemo');
    var rowThirdPartyDemo = this._createMenuRow('第三方库能力', 'ThirdPartyDemo');
    return (
      <View style={styles.containerAll}>
        <View style={styles.containerIconDemo}
          testID="mytest">
          <Image style={styles.iconDemo} source={require("../Resources/control_home.png")} ></Image>
          <Text style={styles.iconText}>欢迎使用小米开发板</Text>
        </View>
        <View style={styles.containerMenu}>
          {rowTutorialDemo}
          {rowControlDemo}
          {rowCloudDebug}
          {rowThirdPartyDemo}
        </View>
      </View>)
  }

  _createMenuRow(title, demoName) {
    return <TouchableHighlight
      style={styles.rowContainer} underlayColor='#838383'
      onPress={this._onOpenSubPage(title, demoName).bind(this)}>
      <View style={[styles.rowContainer, { borderTopColor: '#f1f1f1', borderTopWidth: 1, }]}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.subArrow} source={require("../Resources/sub_arrow.png")} />
      </View>
    </TouchableHighlight>
  }

  _onOpenSubPage(title, demoName) {
    return function () {
      this.props.navigation.navigate(demoName, { title: title })
    }
  }
}





var styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#838383',
    marginTop: 0,
  },
  containerIconDemo: {
    flex: 1.7,
    flexDirection: 'column',
    backgroundColor: '#191919',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  containerMenu: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
  },
  iconDemo: {
    width: 270,
    height: 181,
    alignSelf: 'center',
  },
  iconText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 20,
    alignSelf: 'center'
  },
  rowContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    fontSize: 17,
    alignItems: 'center',
    alignSelf: 'center',
    color: '#000000',
    flex: 1,
    marginLeft: 15
  },
  subArrow: {
    width: 9,
    height: 17,
    marginRight: 15,
    alignSelf: 'center',
  },
  separator: {
    height: 0.5,
    alignSelf: 'stretch',
    backgroundColor: '#dddddd',
    marginLeft: 15,
    marginRight: 15,
  },
});
