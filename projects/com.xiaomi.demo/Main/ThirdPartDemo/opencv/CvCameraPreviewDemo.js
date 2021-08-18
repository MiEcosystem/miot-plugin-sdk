/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @author Adam Freeman --> adamgf@gmail.com
 * @description ==> video preview app for CvCamera for taking pictures and recording videos
 */

import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native';

import { CvCamera, CvScalar, Mat, CvInvoke, CvInvokeGroup } from 'react-native-opencv3';
import Video from 'react-native-video';
let RNFS = require('react-native-fs');

import { Package } from 'miot';


export default class CvCameraPreviewDemo extends React.Component {

  constructor(props) {
    super(props);

    const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
    const transUri = resolveAssetSource(require('./images/transparent.gif')).uri;
    this.state = { picuri: transUri, videouri: '', showImg: false, recording: false, showRec: true, switchValue: true, opencvinstalled: false };
    this.imgIndex = 0;
    this.videoIndex = 0;
    // Change the state every second or the time given by User.
    setInterval(() => {
      this.setState((previousState) => {
        return { showRec: !previousState.showRec };
      });
    }, 500);

    const opencvModuleId = "RnOpencv";
    Package.installModule(opencvModuleId).then((res) => {
      console.log('--------installModule:', JSON.stringify(res));
      this.setState({ opencvinstalled: res.data && res.data.installed });
    });
  }

  componentDidMount = async() => {
    this.interMat = await new Mat().init();
  }

  uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  takePicOrRecord = async() => {

    if (this.state.showImg) {
      const { uri, width, height } = await this.cvCamera.takePicture(`ocvpic-${ this.imgIndex }.jpg`);
      this.imgIndex += 1;
      if (Platform.OS === 'android') {
        this.setState({ picuri: `file://${ uri }` });
      } else {
        this.setState({ picuri: uri });
      }
    } else if (!this.state.recording) {
      let filenameStr = `ocvmovie-${ this.uuidv4() }`;
      if (Platform.OS === 'android') {
        filenameStr += '.avi';
      } else {
        filenameStr += '.m4v';
      }
      let itexists = await RNFS.exists(filenameStr);
      if (itexists) {
        await RNFS.unlink(filenameStr);
      }
      this.cvCamera.startRecording(filenameStr);
      this.videoIndex += 1;
      this.setState({ recording: true });
    } else if (this.state.recording) {
      this.setState({ recording: false });
      const { uri, width, height } = await this.cvCamera.stopRecording();
      const { size } = await RNFS.stat(uri);
      if (Platform.OS === 'android') {
        alert(`Video uri is: ${ uri } width is: ${ width } height is: ${ height } size is: ${ size }`);
        this.setState({ videouri: `file://${ uri }` });
      } else {
        this.setState({ videouri: uri });
      }
    }
  }

  onBuffer = () => {

  }

  onError = () => {

  }

  renderImageOrVideo = () => {
    if (this.state.showImg) {
      return (
        <Image
          style = {Platform.OS === 'android' ? styles.androidPic : styles.iosPic}
          source = {{ uri: `${ this.state.picuri }` }}
        />
      );
    } else if (this.state.videouri) {
      return (
        <Video
          source = {{ uri: `${ this.state.videouri }` }}
          ref = {(ref) => {
            this.player = ref;
          }}
          onBuffer = {this.onBuffer}
          onError = {this.onError}
          style = {Platform.OS === 'android' ? styles.androidPic : styles.iosPic}
        />
      );
    } else {
      return null;
    }
  }

  renderRec = () => {
    if (this.state.recording && this.state.showRec) {
      return (
        <Image
          style = {Platform.OS === 'android' ? styles.androidRec : styles.iosRec}
          source = {require('./images/rec.png')}
        />
      );
    } else {
      return null;
    }
  }

  renderCameraView = () => {
    const { facing } = 'back';
    const posterScalar = new CvScalar(0, 0, 0, 255);

    if (this.interMat) {
      return (
        <CvInvokeGroup groupid = "zeeGrup" >
          <CvInvoke
            func = "convertScaleAbs"
            params = {{
              "p1": this.interMat,
              "p2": "rgba", "p3": 16,
              "p4": 0
            }}
          />
          <CvInvoke
            func = "convertScaleAbs"
            params = {{
              "p1": "rgba",
              "p2": this.interMat,
              "p3": 1. / 16,
              "p4": 0
            }}
          />
          <CvInvoke
            inobj = "rgba"
            func = "setTo"
            params = {{
              "p1": posterScalar,
              "p2": this.interMat
            }}
          />
          <CvInvoke
            func = "Canny"
            params = {{
              "p1": "rgba",
              "p2": this.interMat,
              "p3": 80,
              "p4": 90
            }}
          />
          <CvCamera
            ref = {(ref) => {
              this.cvCamera = ref;
            }}
            style = {styles.preview}
            facing = {facing}
            useStorage = {true}
          />
        </CvInvokeGroup>
      );
    } else {
      return (
        <CvCamera ref={(ref) => {
          this.cvCamera = ref;
        }}
        style = {styles.preview}
        facing = {facing}
        useStorage = {true}
        />
      );
    }
  }


  render() {
    if (this.state.opencvinstalled) {
      return (
        <View style={styles.preview}>
          {this.renderCameraView()}
          {this.renderImageOrVideo()}
          {this.renderRec()}
          <TouchableOpacity
            style={Platform.OS === 'android' ? styles.androidButton : styles.iosButton}
            onPress={this.takePicOrRecord}>
            <Image
              style={Platform.OS === 'android' ? styles.androidImg : styles.iosImg}
              source={require('./images/recordButton.png')}/>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.preview}>
          {/* {this.renderCameraView()}
          {this.renderImageOrVideo()}
          {this.renderRec()} */}
          <TouchableOpacity
            style={Platform.OS === 'android' ? styles.androidButton : styles.iosButton}
            onPress={this.takePicOrRecord}>
            <Image
              style={Platform.OS === 'android' ? styles.androidImg : styles.iosImg}
              source={require('./images/recordButton.png')}/>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  preview: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  iosPic: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 112,
    height: 200,
    left: 0,
    top: '10%'
  },
  androidPic: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 200,
    height: 112,
    left: 0,
    bottom: 0
  },
  iosImg: {
    backgroundColor: 'transparent',
    width: 75,
    height: 75
  },
  androidImg: {
    backgroundColor: 'transparent',
    width: 75,
    height: 75
  },
  androidButton: {
    top: 0,
    bottom: 0,
    right: 40,
    width: 75,
    position: 'absolute',
    backgroundColor: 'transparent',
    opacity: 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosButton: {
    left: 0,
    right: 0,
    bottom: 40,
    height: 75,
    position: 'absolute',
    backgroundColor: 'transparent',
    opacity: 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidRec: {
    transform: [{ rotate: '-90deg' }],
    position: 'absolute',
    top: '45%',
    bottom: '45%',
    left: 0
  },
  iosRec: {
    position: 'absolute',
    left: '45%',
    right: '45%',
    top: '10%'
  },
  androidSwitch: {
    transform: [{ rotate: '-90deg' }],
    position: 'absolute',
    bottom: '85%',
    left: 0
  },
  iosSwitch: {
    position: 'absolute',
    left: '85%',
    top: '10%'
  }
});
