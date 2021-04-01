/**
 * Sample React Native App
 * https://github.com/adamgf/react-native-opencv3-tests
 *
 * @format
 * @flow
 * @author Adam Freeman => adamgf@gmail.com
 * @description ==> face detection app for CvCamera
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, DeviceEventEmitter, TouchableOpacity, Image } from 'react-native';
import { CvCamera, CvInvoke } from 'react-native-opencv3';

import { Package } from 'miot';

export default class CvFaceLandmarksDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { faces: '',
      facing: 'back',
      opencvinstalled: false
    };
  }

  componentDidMount = () => {
    DeviceEventEmitter.addListener('onFacesDetectedCv', this.onFacesDetectedCv);
    Package.installModule('RnOpencv').then((res) => {
      if (res && res.data && res.data.installed) {
        this.setState({ opencvinstalled: true });
      }
    });
  }

  switchFacing = (e) => {
    if (this.state.facing === 'back') {
      this.setState({ facing: 'front' });
    } else {
      this.setState({ facing: 'back' });
    }
  }

  onFacesDetectedCv = (e) => {
    // alert('payload: ' + JSON.stringify(e.payload))
    if (Platform.OS === 'ios') {
      if ((!e.nativeEvent.payload && this.state.faces) || (e.nativeEvent.payload && !this.state.faces) || (e.nativeEvent.payload && this.state.faces)) {
        this.setState({ faces: e.nativeEvent.payload });
      }
    } else {
      if ((!e.payload && this.state.faces) || (e.payload && !this.state.faces) || (e.payload && this.state.faces)) {
        this.setState({ faces: e.payload });
      }
    }
  }

  renderLandmarks() {

    if (this.state.faces) {
      const facesJSON = JSON.parse(this.state.faces);

      const faces = facesJSON.faces;
      let allPoints = [];

      for (let i = 0; i < faces.length; i++) {
        const landmarks = faces[i].landmarks;
        for (let j = 0; j < landmarks.length; j++) {
          const landmarkJson = landmarks[j];
          allPoints.push(landmarkJson);
        }
      }

      // landmark co-ordinates are in floating point as percentage of view
      let views = allPoints.map((landmark, i) => {
        if (landmark) {
          let box = {
            position: 'absolute',
            top: `${ 100.0 * landmark.y }%`,
            left: `${ 100.0 * landmark.x }%`,
            width: 3,
            height: 3,
            borderWidth: 2,
            borderColor: '#ff0'
          };
          let vertexKey = `Vertex${ i }`;
          return (
            <View key={vertexKey} style={box}/>
          );
        }
        return null;
      });
      return <View style={styles.allFaceBoxes}>{views}</View>;
    }
  }

  render() {
    if (this.state.opencvinstalled) {
      return (
        <View style={styles.preview}>
          <CvCamera
            style={styles.preview}
            facing={this.state.facing}
            faceClassifier="haarcascade_frontalface_alt2"
            landmarksModel="lbfmodel"
            onFacesDetectedCv={this.onFacesDetectedCv}
          />
          {this.renderLandmarks()}
          <TouchableOpacity style={Platform.OS === 'android' ? styles.androidButton : styles.iosButton} onPress={this.switchFacing}>
            <Image style={Platform.OS === 'android' ? styles.androidImg : styles.iosImg} source={require('./images/flipCamera.png')}/>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.preview}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  androidImg: {
    transform: [{ rotate: '-90deg' }],
    backgroundColor: 'transparent',
    width: 50,
    height: 50
  },
  iosImg: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50
  },
  androidButton: {
    top: 0,
    bottom: 0,
    right: 0,
    width: '10%',
    position: 'absolute',
    backgroundColor: '#FFF',
    opacity: 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosButton: {
    left: 0,
    right: 0,
    bottom: 0,
    height: '10%',
    position: 'absolute',
    backgroundColor: '#FFF',
    opacity: 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  allFaceBoxes: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  preview: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  }
});
