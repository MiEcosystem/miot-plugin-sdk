'use strict';

import React from 'react'
import {
  StyleSheet,
  WebView,
  View,
  StatusBar,
  Platform,
  Dimensions,
  ART
} from 'react-native';

var {
  width,
  height
} = Dimensions.get('window');

var {
  Surface,
  Shape,
  Path,
  Text,
  Group
} = ART;

export default class ARTTextDemo extends React.Component {

  render() {
    return (
      <View style={styles.container} >
        <StatusBar barStyle='default' />
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/2}style={styles.surface} >
          <Text
            font={`20px "Helvetica Neue", "Helvetica", Arial`}
            fill = "#000000"
            alignment = "left"
           >
             Hello World
           </Text>
        </Surface>
      </View>
    );

  }
}





var styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 64 : 76,
        flexDirection:'column',
        flex:1,
    },
    surface:{
      flex:1,
    }

});

