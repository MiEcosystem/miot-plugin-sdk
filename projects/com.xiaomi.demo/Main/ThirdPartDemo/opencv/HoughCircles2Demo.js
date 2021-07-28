/**
 * Sample React Native App to test OpenCV
 * https://github.com/adamgf/react-native-opencv3-tests
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { NativeEventEmitter, DeviceEventEmitter, Platform, StyleSheet, Text, View, Image } from 'react-native';
import { RNCv, Mat, CvType, CvSize, CvPoint, CvScalar, ColorConv } from 'react-native-opencv3';

export default class HoughCircles2Demo extends Component {
    
  constructor(props) {
    super(props);
    this.state = { destImageUri: '', opencvinstalled: false };		
    this.RNFS = require('react-native-fs');
    this.resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
    this.downloadAssetSource = require('react-native-opencv3/downloadAssetSource');
  }
	
  componentDidMount = async() => {
	  
    const newImagePath = `${ this.RNFS.DocumentDirectoryPath }/Billiard-balls-table-circles.jpg`;
	  
    const interMat = await new Mat().init();
    const circlesMat = await new Mat().init();
	  		
    let overlayMat;
    if (Platform.OS === 'ios') {
      overlayMat = await new Mat(1600, 1280, CvType.CV_8UC4).init();
    } else {
      overlayMat = await new Mat(1280, 1600, CvType.CV_8UC4).init();
    } 
	
    const sourceuri = this.resolveAssetSource(require('./images/Billiard-balls-table.jpg')).uri;
    const sourceFile = await this.downloadAssetSource(sourceuri);
    const srcMat = await RNCv.imageToMat(sourceFile);
    const gaussianKernelSize = new CvSize(9, 9);
	
    RNCv.invokeMethod('cvtColor', { "p1": srcMat, "p2": interMat, "p3": ColorConv.COLOR_BGR2GRAY }); 
    RNCv.invokeMethod('GaussianBlur', { "p1": interMat, "p2": interMat, "p3": gaussianKernelSize, "p4": 2, "p5": 2 });
    RNCv.invokeMethod('HoughCircles', { "p1": interMat, "p2": circlesMat, "p3": 3, "p4": 2, "p5": 100, "p6": 100, "p7": 90, "p8": 1, "p9": 130 });
	
  	const scalar1 = new CvScalar(255, 0, 255, 255);
  	const scalar2 = new CvScalar(255, 255, 0, 255);
	
    const circles = await RNCv.getMatData(circlesMat, 0, 0);
	
    for (let i = 0; i < circles.length; i += 3) {
  	  const center = new CvPoint(Math.round(circles[i]), Math.round(circles[i + 1]));
  	  const radius = Math.round(circles[i + 2]);
      RNCv.invokeMethod("circle", { "p1": overlayMat, "p2": center, "p3": 3, "p4": scalar1, "p5": 12, "p6": 8, "p7": 0 });
      RNCv.invokeMethod("circle", { "p1": overlayMat, "p2": center, "p3": radius, "p4": scalar2, "p5": 24, "p6": 8, "p7": 0 });
  	}
    
    RNCv.invokeMethod("addWeighted", { "p1": srcMat, "p2": 1.0, "p3": overlayMat, "p4": 1.0, "p5": 0.0, "p6": srcMat });
    const { uri, width, height } = await RNCv.matToImage(srcMat, newImagePath);
	
    RNCv.deleteMat(overlayMat);	
    RNCv.deleteMat(interMat);	
    RNCv.deleteMat(circlesMat);
	
    this.setState({ ...this.state, destImageUri: uri });
  
    Package.installModule('RnOpencv').then((res) => {
      if (res && res.data && res.data.installed) {
        this.setState({ opencvinstalled: true });
      }
    });
  }
	  
  render() {
    const { destImageUri } = this.state;
    let circlesImageUri = this.resolveAssetSource(require('./images/Billiard-balls-table.jpg')).uri;
	
    if (destImageUri.length > 0) {
      const prependFilename = Platform.OS === 'ios' ? '' : 'file://';
      circlesImageUri = prependFilename + destImageUri;  	
    }
  
    if (!this.state.opencvinstalled) {
      return (
        <View style={styles.container}/>
      );
    }
	
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 250 }}
          source={ require('./images/Billiard-balls-table.jpg') }
        />
        <Text style={styles.captions}>Original</Text>
        <Image
          style={{ width: 200, height: 250 }}
          source={{ uri: `${ circlesImageUri }` }}
        />
        <Text style={styles.captions}>Hough Circles</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  captions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10
  }
});