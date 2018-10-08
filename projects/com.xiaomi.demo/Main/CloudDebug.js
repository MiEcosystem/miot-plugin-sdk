'use strict';

import React from 'react';
import {
   View, Text,AppRegistry,Button,
   TouchableHighlight,
   TouchableOpacity,
   Platform,
   Dimensions,
   Animated,
   StyleSheet,
   PixelRatio,
   StatusBar,
   Image,
   WebView,
   DeviceEventEmitter,
} from 'react-native';
import { TitleBarBlack } from 'miot/ui';
export default class CloudDebug extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:<TitleBarBlack title={"调试云端API"} style={{backgroundColor:'#fff'}}
                            onPressLeft={()=>{ navigation.goBack();}}/>,
    };
  };

  render() {
    var url= 'https://github.com/MiEcosystem/ios-rn-sdk/blob/master/MiHomePluginSDK/docs/callSmartHomeAPI.md';
    return (
      <View style={styles.container} >
        <StatusBar barStyle='default'/>
        <Text>其他云端api请参见：</Text>
        <WebView source={{uri:url}} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {

        borderTopColor:'#f1f1f1',
        borderTopWidth:1,
        flex:1,
    },
});



