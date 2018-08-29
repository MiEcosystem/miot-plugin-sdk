'use strict';

import React from 'react';

import {
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  PixelRatio,
  DeviceEventEmitter,
} from 'react-native';

import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString.js').string;
import MyButton from '../CommonComponents/MyButton';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
import { TitleBarBlack } from "miot/ui";
import SmartHomeDetail from './SmartHomeDetail';
import { Device, Service, Package, Host } from "miot";

export default class SmartHome extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <View>
          <TitleBarBlack
            title={LocalizedStrings.smartHome} style={{ backgroundColor: '#fff' }}
            onPressLeft={() => { navigation.goBack() }}
            rightText={LocalizedStrings.setting}
            onPressRight={Device.isOwner ? () => { Host.ui.openVoiceCtrlDeviceAuthPage() } : null}
          />
        </View>
    };
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      devices: [],
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <View style={[styles.separator]}></View>
        <ScrollView>
          <View style={[styles.separator, { marginTop: 21 }]}></View>
          <View style={{ backgroundColor: "#fff" }}>
            {this._renderList()}
            <View style={[styles.separator]}></View>
          </View>
        </ScrollView>
      </View>

    );
  }

  _renderList() {
    var devices = this.state.devices;
    var length = devices.length;
    var deviceList = [];
    for (let i = 0; i < length; i++) {
      deviceList.push(
        <View>
          <TouchableHighlight
            key={"touch_" + devices[i].name}
            style={{ flex: 1, backgroundColor: "#fff" }}
            underlayColor='#f6f6f6'
            onPress={() => this._openDeviceDetail(i)}
          >
            <View style={{ alignItems: "center", flexDirection: "row", height: 70, marginHorizontal: 18 }}>
              <Image
                source={{ uri: devices[i].icon_url }}
                style={styles.menuIcon}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.menuTitle}>{devices[i].category}</Text>
                <Text style={styles.menuSubTitle}>{devices[i].name}</Text>
              </View>
              <Image
                source={require('../../Resources/common/clock_home_icon_forward_normal.png')}
                style={styles.rightArrow}
              />
            </View>
          </TouchableHighlight>
          {i !== length - 1 &&
            <View style={[styles.separator, { marginLeft: 14 }]}></View>
          }
        </View>
      );
    }
    return deviceList;
  }

  _openDeviceDetail(i) {
    this.props.navigation.navigate('SmartHomeDetail', {
      iconUrl: this.state.devices[i].icon_url,
      tips: this.state.devices[i].tips,
      title: this.state.devices[i].name,
    });
  }

  componentWillMount() {
    console.log("SmartHome WillMount");
    this._viewWillAppearListener = DeviceEventEmitter.addListener(Package.packageViewWillAppear, (event) => {
      this._fetchDevices();
    });
  }

  componentDidMount() {
    console.log("SmartHome DidMount");
    this._fetchDevices();
  }

  _fetchDevices() {
    Service.smarthome.getVoiceVtrlDevices(Device.deviceID).then((response) => {
      console.log(JSON.stringify(response));
      this.setState({ devices: response.result.devices });
    });
  }

  componentWillUnmount() {
    console.log("SmartHome Unmount");
    this._viewWillAppearListener.remove();
  }
}

var styles = StyleSheet.create({
  pageContainer: {
    width: screenWidth,
    height: screenHeight,

  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#dfdfdf',
  },
  menuIcon: {
    width: 56,
    height: 56,
  },
  menuTitle: {
    fontSize: 17,
    marginBottom: 5,
  },
  menuSubTitle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.4)',
  },
  rightArrow: {
    width: 20,
    height: 20,
  },
});

// var route = {
//   key: "smartHome",
//   title: LocalizedStrings.smartHome,
//   component: SmartHome,
//   renderNavRightComponent: function (route, navigator, index, navState) {
//     if (MHPluginSDK.userId == MHPluginSDK.ownerId) {
//       return (
//         <View style={{ left: 0, width: 29 + 15 * 2, height: MHGlobalData.APPBAR_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
//           <MyButton
//             title={LocalizedStrings.setting}
//             fontStyle={{ color: "rgba(0,0,0,0.5)", fontSize: 16 }}
//             onClick={() => MHPluginSDK.openVoiceCtrlDeviceAuthPage()}
//           />
//         </View>
//       );
//     } else {
//       return null;
//     }
//   },
// };
