'use strict';

import React from 'react'
import {
  StyleSheet,
  WebView,
  View,
  StatusBar,
  Platform,
  Dimensions,
  Text,
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
  LinearGradient,
  RadialGradient
} = ART;

import  Rectangle from './Rectangle.art';

import Circle from '../../CommonModules/Chart/Circle';

export default class ARTGradientDemo extends React.Component {
  render() {
    var textHeight = 20;
    var surfaceHeight = (height - (Platform.OS === 'ios' ? 64 : 76) - 2*textHeight)/2;
    return (
      <View style={styles.container} >
        <StatusBar barStyle='default' />
        <View style={{width:width, height:textHeight}}><Text style={{textAlign:'center'}}>线性渐变</Text></View>
        <Surface width={width} height={surfaceHeight}>
          <Rectangle x={width/2-50} y={20} width={100}
            height={200}
            stroke="red"
            strokeWidth={1}
            fill={
            new LinearGradient({
              '0': 'rgba(255,0,0,0)', //stop offsets and color
              '0.5':'rgba(0,255,255,1)',
              '1':'rgba(0,0,255,1)'
            },
            "50",  //x1 起始点x
            "0",  //y1 起始点y
            "50",  //x2 结束点x
            "200"  //y2 结束点y
          )}/>
        </Surface>
        <View style={{width:width, height:textHeight}}><Text style={{textAlign:'center'}}>径向渐变</Text></View>
        <Surface width={width} height={surfaceHeight}>
          <Circle x={width/2} y={80+60} radius={80}
            stroke="green"
            strokeWidth={1}
            fill={
              new RadialGradient({
                '0': 'white', //stop offsets and color
                '1': 'green'
              },
              width/2, //最外层渐变椭圆的位置坐标cx
              80+60,  //最外层渐变椭圆的位置坐标cy
              80, //最外层渐变椭圆的位置大小rx
              80, //最外层渐变椭圆的位置大小ry
              width/2, //最内层渐变椭圆的位置坐标fx
              80+60  //最内层渐变椭圆的位置坐标fy
            )} />
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
//   key: 'ARTGradientDemo',
//   component: ARTGradientDemo,
//   title: '渐变：Gradient',
// };

// module.exports = {
//   route: route,
// }
