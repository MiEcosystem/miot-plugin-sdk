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
  Path
} = ART;

import Circle from '../../CommonModules/Chart/Circle';

export default class ARTCircleDemo extends React.Component {

  render() {
    // 圆形
    var radius = 40;
    var circlePath = Path().move(width/2-radius,(height - (Platform.OS === 'ios' ? 64 : 76))/4)
       .arc(radius * 2, 0, radius, radius, false, false)
       .arc(-radius * 2, 0, radius, radius, false, false)
       .close();


    return (
      <View style={styles.container} >
        <StatusBar barStyle='default' />
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/2}style={styles.surface} >
          <Circle x={width/2} y={40+60} radius={40}
            stroke="green"
            strokeWidth={1}
            fill="blue" />
        </Surface>
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/2} style={styles.surface}>
          <Shape  d={circlePath} stroke="#23a03f" strokeWidth={8} />
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

// var route = {
//   key: 'ARTCircleDemo',
//   component: ARTCircleDemo,
//   title: '圆形：Circle',
// };


