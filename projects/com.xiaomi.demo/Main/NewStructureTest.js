//index.ios.js

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  Image,
  PixelRatio
} from 'react-native';

var window = Dimensions.get('window');
export default class ImagePathDemo extends React.Component {




  //需要在工程本地导入一个名为'broadchurch'的mp4文件;
  //http://cookbook.supor.com/Swast2SpEjewRAnE.mp4;
  render() {


    return (
      <View style={styles.container}>
<View style = {{width:100,height:100}}></View>

      <Image  source={require('../Resources/Images/test_icon1.png')} style = {{width:100,height:100}} />
      <Image  source={require('../Resources/Images/right_arrow1.png')} style = {{width:100,height:100}} />
      <Image  source={require('../Resources/RGB_input.png')} style = {{width:100,height:100}} />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  video: {
    width: window.width,
    height: window.height,
  },
  progressLine: {
    width: window.width,
    height: 10,
    bottom: 30,
    backgroundColor: 'blue'
  },
  progressArrow: {
    position: 'absolute',
    width: 20,
    height: 20,
    bottom: 25,
    left: 0,
    backgroundColor: 'red',
  },
});

// // var route = {
// //   key: 'ImagePathDemo',
// //   title: '',
// //   component: ImagePathDemo,
// }

// module.exports = {
//   component: ImagePathDemo,
//   // route: route,
// }
