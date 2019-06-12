//index.ios.js

'use strict';

import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
var window = Dimensions.get('window');
const resolveAssetSource = require('resolveAssetSource');
export default class ImagePathDemo extends React.Component {




  //需要在工程本地导入一个名为'broadchurch'的mp4文件;
  //http://cookbook.supor.com/Swast2SpEjewRAnE.mp4;
  render() {

    let source = resolveAssetSource(require('./../Resources/lottie.txt'))
    alert(source.uri)
    return (
      <View style={styles.container}>
        <View style={{ width: 100, height: 100 }}></View>
        <LottieView source={{ uri: source.uri }} autoPlay loop />;
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
