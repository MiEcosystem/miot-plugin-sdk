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
} = ART;

import Wedge from '../../CommonModules/Chart/Wedge';

export default class ARTEllipseDemo extends React.Component {

  render() {
    // 椭圆形
    var sRadius = 40;
    var lRadius = 60;
    var circlePath = Path().move(width/2-sRadius,(height - (Platform.OS === 'ios' ? 64 : 76))/(2*2))
       .arc(sRadius * 2, 0, sRadius, lRadius, false, false)
       .arc(-sRadius * 2, 0, sRadius, lRadius, false, false)
       .close();

     // 椭圆形
     var radius = 40;
     var harfPath = Path().move(width/2-radius,(height - (Platform.OS === 'ios' ? 64 : 76))/(2*2))
        .arc(radius * 2, 0, radius, radius, false, false, 90)
        .close();
    return (
      <View style={styles.container} >
        <StatusBar barStyle='default' />
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/2}>
          <Shape  d={circlePath} stroke="#000000" strokeWidth={1} fill="#000000" />
        </Surface>
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/2} fill='blue'>
          <Wedge innerRadius={0}
              outerRadius={50}
              startAngle={0}
              endAngle={90}
              x={width/2-150}
              y={20}
              stroke="#6ff41a" strokeWidth={1} fill="#6ff41a" />
          <Wedge innerRadius={20}
              outerRadius={50}
              startAngle={0}
              endAngle={90}
              x={width/2}
              y={20}
              stroke="#2f349a" strokeWidth={1} fill="#2f349a" />
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

});

// var route = {
//   key: 'ARTEllipseDemo',
//   component: ARTEllipseDemo,
//   title: '椭圆：Ellipse',
// };

// module.exports = {
//   route: route,
// }
