'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  Image,
  TouchableHighlight,
  Component,
  StatusBar,
  ScrollView,
  DeviceEventEmitter,
  Button,
} from 'react-native';

// var ActionSheetIOS = require('ActionSheetIOS');
// var HelloDeveloper = require('../CommonModules/HelloDeveloper');
// import HelloReactART from '../CommonModules/HelloReactART';
// var LocalizedStrings = require('./MHLocalizableString.js').string;
import { createStackNavigator } from 'react-navigation';

import MHLocalizableString  from './MHLocalizableString.js';
import MHGlobal from './MHGlobalData';
import {Host,Device,DeviceEvent} from "miot";

// var MoreMenu = require('./MoreMenu');
// import MoreMenu from  './MoreMenu'
var BUTTONS = [
  '测试对话框',
  '确定',
];

export default class Setting extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle:"菜单",
      headerLeft:(
        <Button onPress={()=>{console.log("back button tapped")}} title="back" color="#ff3454" />
      ),
      headerRight: (
        <Button onPress={()=>{ navigation.navigate('setting') ; }} title="ok" color="#ff3452" />
      ),
    };
  };

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2)=>r1!==r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this._createMenuData();

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(this._menuData),
    };
  }

  componentWillMount(){
      this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener((device)=>{
          MHGlobal.deviceName = device.name;
          // this.forceUpdate();
          var ds = new ListView.DataSource({
              rowHasChanged: (r1, r2)=>r1!==r2,
              sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          });
          this.setState ( {
              dataSource: ds.cloneWithRowsAndSections(this._menuData),
          });
      })
  }

  componentDidUnMount(){
      this._deviceNameChangedListener.remove();
  }
  _createMenuData() {
    var commonMenuData = [];
    var featureMenuData = [];
    var resetMenuData = [];//listView的footerView好像不支持，用一个section来模拟

    if (Device.isOwner) // 非分享设备
    {
      commonMenuData = [
        {
          'name':MHLocalizableString.string.deviceName,
          'subtitle':MHGlobal.deviceName,
          'func': () => {
              Host.ui.openChangeDeviceName();
          }
        },
        {
          'name':MHLocalizableString.string.locationManagement,
          'func': () => {
              Host.ui.openRoomManagementPage();
          }
        },
        {
          'name': MHLocalizableString.string.shareDevice,
          'func': () => {
              Host.ui.openShareDevicePage();
          }
        },
        {
          'name': MHLocalizableString.string.ifttt,
          'func': () => {
              Host.ui.openIftttAutoPage();
          }
        },
        {
          'name': MHLocalizableString.string.firmwareUpgrate,
          'func': () => {
            Host.ui.openDeviceUpgradePage();
          }
        },
        {
          'name': MHLocalizableString.string.moreSetting,
          'func': () => {
              Host.ui.openNewMorePage();
          }
        },
        {
          'name': MHLocalizableString.string.addToDesktop,
          'func': () => {
              Host.ui.openAddToDesktopPage();
          }
        },

        {
          'name': MHLocalizableString.string.licenseAndPolicy,
          'func': () => {
              Host.ui.privacyAndProtocolReview("license","https://www.baidu.com","privacy","https://www.baidu.com");
          }
        },

      ];

      featureMenuData = [
        {
          'name': '自定义设置选项',
          'func': () => {
            this.props.navigation.navigate('moreMenu')
            // this.props.navigator.push(MoreMenu.route);
          }
        }
      ];

      resetMenuData = [
        {
          'name': MHLocalizableString.string.resetDevice,
          'func': () => {
              Host.ui.openDeleteDevice();
          }
        },
      ];
    }
    var featureSetting = MHLocalizableString.string.featureSetting;
    var commonSetting = MHLocalizableString.string.commonSetting;
    // alert("commonSetting " + commonSetting);
    this._menuData = {};
    this._menuData[featureSetting] = featureMenuData;
    this._menuData[commonSetting] = commonMenuData;
    this._menuData[""] = resetMenuData;//不显示这个section的header，所以key为空
  }

  render() {
    return (
      <View style = {{backgroundColor:'rgb(235,235,236)',marginTop:0,marginBottom:0,flex:1}}>
      <View style = {{backgroundColor:'rgb(174,174,174)',height:1,}}></View>
       <ScrollView style = {{backgroundColor:'rgb(235,235,236)'}}>
        <View style={styles.container}>
          <StatusBar barStyle='default' />
          <ListView style={styles.list} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)} renderSectionHeader={this._renderSectionHeader.bind(this) } />
        </View>
        </ScrollView>
        </View>
    );
  }

  _renderSectionHeader(sectionData,sectionID){
    return (
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{sectionID}</Text>

        </View>
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    if (sectionID != '') {
      return (
        <TouchableHighlight  onPress={() => this._pressRow(sectionID,rowID)}>
          <View style={{backgroundColor:'#ffffff'}}>
            <View style={styles.rowContainer}>
              <Text style={styles.title}>{rowData.name}</Text>
              {/* <Text style= {styles.subtitle}>{rowData.subtitle?MHGlobal.deviceName:'' }</Text>
              <Image style={styles.subArrow} source={require("../Resources/sub_arrow.png")} /> */}
            </View>
            <View style={rowID != this._menuData[sectionID].length - 1?styles.separator:{}}></View>
          </View>
        </TouchableHighlight>
      );
    }else {
      return (
        <TouchableHighlight  onPress={() => this._pressRow(sectionID,rowID)}>
          <View style={{backgroundColor:'#ffffff'}}>
            <View style={styles.rowContainer}>
              <Text style={styles.reset}>{rowData.name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }

  }

  _pressRow(sectionID,rowID) {
    console.log("sectionID"+sectionID+"row"+rowID+"clicked!");
    this._menuData[sectionID][rowID].func();
  }

  // onShowDidButtonPress() {
  //   this.props.navigator.push(HelloDeveloper.route);
  // }

  // showReactART() {
  //   this.props.navigator.push(HelloReactART.route);
  // }

  // showActionSheet() {
  //   ActionSheetIOS.showActionSheetWithOptions({
  //         options: BUTTONS,
  //         destructiveButtonIndex: 1,
  //         },
  //         (buttonIndex) => {

  //         });
  // }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(235,235,236)',
    // marginBottom: 0,
    // marginTop: 64,
  },

  rowContainer: {
  	alignSelf: 'stretch',
    flexDirection: 'row',
    flex: 1,
    // padding: 20,
    backgroundColor:'#ffffff',
    height:50,
    marginLeft:20,
    marginRight:20,
    // justifyContent: 'center',
    alignItems:'center'
  },
  sectionHeader:{
    height: 30,
    backgroundColor: 'rgb(235,235,236)',
    justifyContent: 'center',
    // padding:10,
    marginLeft:10,
  },
  sectionHeaderText:{
    fontSize:14,
  },
  list: {
    alignSelf: 'stretch',
  },

  title: {
    // alignSelf: 'stretch',
    fontSize: 16,
    // alignItems: 'center',
    flex: 2,
    // height:49,
  },
  reset: {
    // alignSelf: 'stretch',
    fontSize: 16,
    // alignItems: 'center',
    flex: 1,
    // height:49,
    color:'rgb(251,0,0)',
    textAlign:'center'
  },
  subtitle: {
    // alignSelf: 'stretch',
    fontSize: 14,
    // alignItems: 'center',
    flex: 1,
    color:'rgb(138,138,138)',
    textAlign:"right",
    marginRight:5

  },
  subArrow: {
     width: 6.5,
     height: 13,
  },
  separator: {
  	height: 0.75,
  	backgroundColor: '#dddddd',
  	marginLeft: 20,
  	marginRight: 20
  }
});
