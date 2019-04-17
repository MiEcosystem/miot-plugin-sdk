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



export default class ARTLineDemo extends React.Component {
  render() {

    // 构建直线路径
    var straightLine = Path()
      .move(width/2-100,(height - (Platform.OS === 'ios' ? 64 : 76))/(2*4)-10)
      .line(200,0);

    // 构建折线路径
    var brokenLine = Path()
      .move(width/2-100,(height - (Platform.OS === 'ios' ? 64 : 76))/(2*4)-10)
      .line(80, 23)
      .line(60, -43)
      .line(70, 20);

    // 构建贝斯路径
    var curveLine = Path()
      .move(width/2-100,(height - (Platform.OS === 'ios' ? 64 : 76))/(2*4)-10)
      .curve(50, 23, 150, -23, 200, 0);

    // 构建圆线路径
    var circleLine = Path()
      .move(width/2-50,(height - (Platform.OS === 'ios' ? 64 : 76))/(2*4))
      .arc(50 * 2, 0, 50, 50, false, false);


    return (
      <View style={styles.container} >
        <StatusBar barStyle='default' />
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/4}>
          <Shape d={straightLine} stroke="#000000" strokeWidth={2} />
        </Surface>
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/4}>
          <Shape d={brokenLine} stroke="#000000" strokeWidth={2}  />
        </Surface>
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/4}>
          <Shape d={curveLine} stroke="#000000" strokeWidth={2} />
        </Surface>
        <Surface width={width} height={(height - (Platform.OS === 'ios' ? 64 : 76))/4}>
          <Shape d={circleLine} stroke="#000000" strokeWidth={2} />
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
//   key: 'ARTLineDemo',
//   component: ARTLineDemo,
//   title: '线：Line',
// };


