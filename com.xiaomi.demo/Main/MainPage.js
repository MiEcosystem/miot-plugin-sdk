'use strict';

import React from 'react';
import {
  View,
  Text,
  AppRegistry,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
  StyleSheet,
  PixelRatio,
  StatusBar,
  Image,
  DeviceEventEmitter,
  NativeModules,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';
import ControlDemo from './ControlDemo';
import CloudDebug from './CloudDebug';
import ThirdPartyDemo from './ThirdPartyDemo';
import { MHPluginSDK } from 'NativeModules';
import Utils from '../CommonModules/Utils';
//import Setting from './MHSetting';

import { ImageButton } from 'miot/ui';
import { TitleBarBlack } from 'miot/ui';
import MoreDialog from './MoreDialog';
// import ImageButton from '../CommonModules/ImageButton.js';;

import { localStrings, getString } from './MHLocalizableString';
import BlankDemo from './tutorial/BlankDemo';
import DeviceInfo from './tutorial/device/DeviceInfo';
import AccountDemo from './tutorial/account/AccountDemo';
import TutorialDemo from './tutorial/TutorialDemo';
import UIDemo from './UIDemo';
import FileStorage from './tutorial/storage/FileStorage';

export default class MainPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <View>
          <TitleBarBlack
            title={Utils.formats(localStrings).t2('s')} style={{ backgroundColor: '#fff' }}
            subTitle={getString('NUM_PHOTOS', { 'numPhotos': 1 })}
            // showDot={1}
            // onPressLeft2={()=>{ MHPluginSDK.closeCurrentPage(); }}
            // onPressRight2={()=>{ navigation.navigate('moreMenu'); }}
            onPressLeft={() => { MHPluginSDK.closeCurrentPage() }}
            onPressRight={() => {
              // MHPluginSDK.openAddDeviceGroupPage();
              if (Platform.OS == 'android') {
                navigation.setParams({ showDialog: true });
              } else {
                navigation.navigate('moreMenu', { 'title': '设置' });
              }
            }} />
          <MoreDialog
            visible={typeof navigation.state.params === 'undefined' ? false : navigation.state.params.showDialog}
            navigation={navigation} />
        </View>
    };
  };

  // 获取插件包内资源路径
  pathForResource(filename) {
    return MHPluginSDK.basePath + filename;
  }

  // 获取插件包内图片source，<Image>用
  sourceOfImage(filename) {
    return {
      uri: this.pathForResource(filename),
      scale: PixelRatio.get(),
    }
  }

  componentDidMount() {
    // test module method
    // const params = {"operation":"query","req_type":"alarm","index":5}
    // MHPluginSDK.callMethod("alarm_ops",[],{"params":params},(res,json)=>{
    //   alert("pencilCool")
    // })
  }

  render() {
    var rowTutorialDemo = this._createMenuRow(TutorialDemo, '教程', 'tutorialDemo');
    var rowControlDemo = this._createMenuRow(ControlDemo, '控制能力', 'ControlDemo');
    var rowCloudDebug = this._createMenuRow(UIDemo, 'UI能力', 'UIDemo');
    var rowThirdPartyDemo = this._createMenuRow(ThirdPartyDemo, '第三方库能力', 'ThirdPartyDemo');
    return (
      <View style={styles.containerAll} >
        <View style={styles.containerIconDemo}>
          <Image style={styles.iconDemo} source={this.sourceOfImage("control_home.png")} ></Image>
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

  _createMenuRow(component, title, demoName) {
    return <TouchableHighlight
      style={styles.rowContainer} underlayColor='#838383'
      onPress={this._onOpenSubPage(title, demoName).bind(this)}>
      <View style={[styles.rowContainer, { borderTopColor: '#f1f1f1', borderTopWidth: 1, }]}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.subArrow} source={this.sourceOfImage("sub_arrow.png")} />
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
