/**
 * Sample Particle System App

 */
'use strict';

import ReactNative, {
  AppRegistry,
  Text,
  View,
  Image,
  TabBarIOS,
  StyleSheet,
  Dimensions
} from 'react-native';

import React from 'react';

// var ParticleView = require('react-native-particle-system/ParticleView');
// var ParticleCell = require('react-native-particle-system/ParticleCell');
var starsParticleProps = {
  name : "untitled",
  enabled : true,
  contentsRect : {x: 0.0, y: 0.0, width: 1.0, height: 1.0},
  magnificationFilter : 'linear', minificationFilter : 'linear',
  scale : 1.00, scaleRange : 0.0, scaleSpeed : 0.10,
  color : '#7f7f7f',
  redRange : 1.00,	greenRange : 1.00, blueRange : 1.00, alphaRange : 0.00,
  redSpeed : 0.00, greenSpeed : 0.00, blueSpeed : 0.00, alphaSpeed : 0.00,

  lifetime : 1000, lifetimeRange : 0.50,
  birthRate : 250,
  velocity : 150.00, velocityRange : 25.00,
  xAcceleration : 0.00, yAcceleration : 0.00, zAcceleration : 0.00,

  // these values are in radians, in the UI they are in degrees
  spin : 0.000, spinRange : 12.566,
  emissionLatitude : 0.000, emissionLongitude : 0.000, emissionRange : 6.283,
};

var fireParticleProps = {
  name : "untitled",
  enabled : true,
  contentsRect : {x: 0.0, y: 0.0, width: 1.0, height: 1.0},
  magnificationFilter: 'linear', minificationFilter: 'linear',
  scale: 0.57, scaleRange: 1.28, scaleSpeed: -0.29,
  color: '#ff4000',
  redRange: 0.6,	greenRange: 0.0, blueRange: 1.0, alphaRange: 0.57,
  redSpeed: 0.0, greenSpeed: 0.0, blueSpeed: -0.66, alphaSpeed: -0.64,

  lifetime: 7230.0, lifetimeRange: 3.11,
  birthRate: 497,
  velocity: 93.7, velocityRange: 0.0,
  xAcceleration: 0.0, yAcceleration: -266.0, zAcceleration : 0.0,

  // these values are in radians, in the UI they are in degrees
  spin : 0.000, spinRange : 0,
  emissionLatitude : 1.484, emissionLongitude : 0.0, emissionRange : 0.0,
};

export default class ParticleDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedTab: 'fireTab'};
  }

  render() {
    var midX = Dimensions.get('window').width/2;
    var midY = Dimensions.get('window').height/2;
    return (

      <View style={{flex:1, backgroundColor:'black'}}>
        {/*<ParticleView name={"emitterLayer"} style={{flex:1,backgroundColor:'black'}}*/}
        {/*emitterPosition={{x:midX, y:midY+100}}*/}
        {/*emitterZPosition={0}*/}
        {/*emitterShape={'line'}*/}
        {/*emitterMode={'surface'}*/}
        {/*emitterSize={{width:180, height:20}}*/}
        {/*emitterDepth={0} renderMode={"additive"} seed={2197194815}>*/}
        {/*{*/}
        {/*<ParticleCell {...fireParticleProps}>*/}
        {/*<Image source={require("../Resources/spark.png")} style={{top:0, left:0, width:64, height:64}}/>*/}
        {/*</ParticleCell>}*/}
        {/*</ParticleView>*/}
      </View>


      //   <View style={{flex:1, backgroundColor:'black'}}>
      //   <ParticleView name={"emitterLayer"} style={{flex:1,backgroundColor:'transparent'}}
      //     emitterPosition={{x:midX, y:midY}}
      //     emitterZPosition={0}
      //     emitterSize={{width:1, height:1}}
      //     emitterDepth={0} renderMode={"additive"} seed={2316268059}>
      //     <ParticleCell {...starsParticleProps}>
      //       <Image source={require("../Resources/mysprite.png")} style={{top:0, left:0, width:32, height:32}}/>
      //     </ParticleCell>
      //   </ParticleView>
      // </View>

    );
  }
}
