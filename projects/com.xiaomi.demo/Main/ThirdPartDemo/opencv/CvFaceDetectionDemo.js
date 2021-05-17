/**
 * Sample React Native App
 * https://github.com/adamgf/react-native-opencv3-tests
 *
 * @format
 * @flow
 * @description ==> face detection app for CvCamera
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, DeviceEventEmitter, TouchableOpacity, Image } from 'react-native';
import { CvCamera, CvInvoke } from 'react-native-opencv3';
import { Package } from 'miot';

export default class CvFaceDetectionDemo extends Component {
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

  renderFaceBoxes() {
    if (this.state.faces) {
      const facesJSON = JSON.parse(this.state.faces);

      // face co-ordinates are in floating point as percentage of view
      let views = facesJSON.faces.map((face, i) => {
        console.log(`facesJON is: ${ JSON.stringify(facesJSON) }`);
        // console.log('x: ' + face.x + ' y: ' + face.y + ' w: ' + face.width + ' h: ' + face.height);
        let box = {
          position: 'absolute',
          top: `${ 100.0 * face.y }%`,
          left: `${ 100.0 * face.x }%`,
          width: '100%',
          height: '100%'
        };
        let style = {
          width: `${ 100.0 * face.width }%`,
          height: `${ 100.0 * face.height }%`,
          borderWidth: 3,
          borderColor: '#0f0'
        };

        let e1box = {}, e1style = {};
        if (face.firstEye) {
          e1box = {
            position: 'absolute',
            top: `${ 100.0 * face.firstEye.y }%`,
            left: `${ 100.0 * face.firstEye.x }%`,
            width: '100%',
            height: '100%'
          };
          e1style = {
            width: `${ 100.0 * face.firstEye.width }%`,
            height: `${ 100.0 * face.firstEye.height }%`,
            borderWidth: 2,
            borderColor: '#ff0'
          };
        }

        let e2box = {}, e2style = {};
        if (face.secondEye) {
          e2box = {
            position: 'absolute',
            top: `${ 100.0 * face.secondEye.y }%`,
            left: `${ 100.0 * face.secondEye.x }%`,
            width: '100%',
            height: '100%'
          };
          e2style = {
            width: `${ 100.0 * face.secondEye.width }%`,
            height: `${ 100.0 * face.secondEye.height }%`,
            borderWidth: 2,
            borderColor: '#ff0'
          };
        }

        let nbox = {}, nstyle = {};
        if (face.nose) {
          nbox = {
            position: 'absolute',
            top: `${ 100.0 * face.nose.y }%`,
            left: `${ 100.0 * face.nose.x }%`,
            width: '100%',
            height: '100%'
          };
          nstyle = {
            width: `${ 100.0 * face.nose.width }%`,
            height: `${ 100.0 * face.nose.height }%`,
            borderWidth: 2,
            borderColor: '#00f'
          };
        }

        let mbox = {}, mstyle = {};
        if (face.mouth) {
          mbox = {
            position: 'absolute',
            top: `${ 100.0 * face.mouth.y }%`,
            left: `${ 100.0 * face.mouth.x }%`,
            width: '100%',
            height: '100%'
          };
          mstyle = {
            width: `${ 100.0 * face.mouth.width }%`,
            height: `${ 100.0 * face.mouth.height }%`,
            borderWidth: 2,
            borderColor: '#f00'
          };
        }

        return (
          <View key={face.faceId} style={box}><View style={style}>
            <View style={e1box}><View style={e1style}></View></View>
            <View style={e2box}><View style={e2style}></View></View>
            <View style={nbox}><View style={nstyle}></View></View>
            <View style={mbox}><View style={mstyle}></View></View>
          </View></View>
        );
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
            eyesClassifier="haarcascade_eye_tree_eyeglasses"
            noseClassifier="nose"
            mouthClassifier="mouth"
            onFacesDetectedCv={this.onFacesDetectedCv}
          />
          {this.renderFaceBoxes()}
          <TouchableOpacity style={Platform.OS === 'android' ? styles.androidButton : styles.iosButton} onPress={this.switchFacing}>
            <Image style={Platform.OS === 'android' ? styles.androidImg : styles.iosImg} source={require('./images/flipCamera.png')}/>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.preview}>
        </View>
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