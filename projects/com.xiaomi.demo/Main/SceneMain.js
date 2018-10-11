'use strict';

import {Package} from "miot";

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  TextInput,
  PixelRatio,
  StatusBar,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter,
} = React;

var ImageButton = require('../CommonModules/ImageButton');
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
var rValue = 0;
var gValue = 0;
var bValue = 0;

class SceneMain extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      requestStatus: false,
    };
  }

  componentDidMount() {
  }
  test() {
    alert("test");
  }

  render() {
    return (
      <View style={styles.containerAll} >
        <StatusBar barStyle='light-content' />
        <View style={styles.containerIconDemo}>
          <Image style={styles.iconDemo} source={require("../Resources/control_home.png")} />
          <Text style={styles.iconText}>开发自定义智能场景</Text>
        </View>
        <View style={styles.containerMenu}>
          <TextInput
            style={styles.textInput}
            maxLength={3}
            placeholder="R: 0-255"
            onChangeText={(text) => {
              rValue = text;
            }}
          />
          <TextInput
            style={styles.textInput}
            maxLength={3}
            placeholder="G: 0-255"
            onChangeText={(text) => {
              gValue = text;
            }}
          />
          <TextInput
            style={styles.textInput}
            maxLength={3}
            placeholder="B: 0-255"
            onChangeText={(text) => {
              bValue = text;
            }}
          />
        </View>
      </View>
    );
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

  textInput: {
    height: 40,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    // flex: 1,
    fontSize: 16,
    padding: 4,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#ffffff',
  },
});

const KEY_OF_SCENEMAIN = 'SceneMain';

// 每个页面export自己的route
var route = {
  key: KEY_OF_SCENEMAIN,
  title: '自定义场景',
  component: SceneMain,
  navLeftButtonStyle: {
    tintColor: '#ffffff',
  },
  navTitleStyle: {
    color: '#ffffff',
  },
  navBarStyle: {
    backgroundColor: 'transparent',
  },
  renderNavLeftComponent(route, navigator, index, navState) {
    return (<View style={{ left: 0, width: 29 + 15 * 2, height: APPBAR_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
      <ImageButton
        source={{ uri: MHPluginSDK.uriNaviBackButtonImage, scale: PixelRatio.get() }}
        onPress={() => {
          if (index === 0) {
            MHPluginSDK.closeCurrentPage();
          } else {
            navigator.pop();
          }
        }}
        style={[{ width: 29, height: 29, tintColor: '#000000' }, route.navLeftButtonStyle]}
      />
    </View>);
  },
  renderNavRightComponent: function (route, navigator, index, navState) {
    return (
      <View style={{ left: 0, width: 29 + 15 * 2, height: APPBAR_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableHighlight onPress={() => {
          var color = rValue << 16 | gValue << 8 | bValue;
          var action = Package.entryInfo.action;
          action.payload.value = color;
            Package.exitInfo=color;
            Package.exit();
        }}>
          <Text style={{ fontWeight: 'bold', color: '#f0f0f0' }}>确定</Text>
        </TouchableHighlight>
      </View>
    );
  },
  isNavigationBarHidden: false,
}

module.exports = {
  component: SceneMain,
  route: route,
}
