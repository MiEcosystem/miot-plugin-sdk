/**
 * Sample React Native App to test OpenCV
 * https://github.com/adamgf/react-native-opencv3-tests
 *
 * @format
 * @flow
 * @author
 */

import React, { Component } from 'react';
import { DeviceEventEmitter, Platform, StyleSheet, Text, View, Image } from 'react-native';
import { RNCv, Mat, CvType, CvSize, CvPoint, CvScalar, CvCamera, CvInvoke } from 'react-native-opencv3';

export default class HoughCirclesDemo extends Component<Props> {

  constructor(props) {
	  super(props);
    DeviceEventEmitter.addListener('onPayload', this.onPayload);
    DeviceEventEmitter.addListener('onFrameSize', this.onFrameSize);
    this.cvCamera = React.createRef();
	  this.state = { opencvinstalled: false };
  }
    
  componentDidMount = async() => {
    const interMat = await new Mat().init();
    const circlesMat = await new Mat().init();
	  		
    this.setState({ ...this.state, interMat: interMat, circlesMat: circlesMat });
    Package.installModule('RnOpencv').then((res) => {
      if (res && res.data && res.data.installed) {
        this.setState({ opencvinstalled: true });
      }
    });
  }
	  
  componentWillUnmount = () => {
	  const { overlayMat, interMat, circlesMat } = this.state;
	  RNCv.deleteMat(interMat);	
	  RNCv.deleteMat(circlesMat);
	  RNCv.deleteMat(overlayMat);	
  }

  onFrameSize = async(e) => {
	  if (!this.state.frameWidth && !this.state.frameHeight && !this.state.overlayMat) {		
      	const { frameWidth, frameHeight } = JSON.parse((Platform.OS === 'ios') ? e.nativeEvent.payload : e.payload).frameSize;
      	
      let overlayMat;
      if (Platform.OS === 'ios') { // portrait
		  overlayMat = await new Mat(frameHeight, frameWidth, CvType.CV_8UC4).init();
      } else { // landscape
		  overlayMat = await new Mat(frameWidth, frameHeight, CvType.CV_8UC4).init();
      }
		
      	this.setState({ ...this.state, overlayMat: overlayMat });
    }
  }
  
  onPayload = async(e) => {
    // alert('Entered onPayload e is: ' + JSON.stringify(e))
    const circles = (Platform.OS === 'ios') ? e.nativeEvent.payload : e.payload;
	  
    const { overlayMat } = this.state;
	
    if (overlayMat) {
	  
	  overlayMat.setTo(CvScalar.all(0));  	
	  const scalar1 = new CvScalar(255, 0, 255, 255);
	  const scalar2 = new CvScalar(255, 255, 0, 255);
	
      for (let i = 0; i < circles.length; i += 3) {
        const center = new CvPoint(Math.round(circles[i]), Math.round(circles[i + 1]));
        const radius = Math.round(circles[i + 2]);
        RNCv.invokeMethod("circle", { "p1": overlayMat, "p2": center, "p3": 3, "p4": scalar1, "p5": 3, "p6": 8, "p7": 0 });
        RNCv.invokeMethod("circle", { "p1": overlayMat, "p2": center, "p3": radius, "p4": scalar2, "p5": 10, "p6": 8, "p7": 0 });
	  }
	
      if (this.cvCamera && this.cvCamera.current) {
        // have to do this for performance ...
        this.cvCamera.current.setOverlay(overlayMat);
      }
    }
  }
  
  renderHoughCircles = () => {
    const gaussianKernelSize = new CvSize(9, 9);
  	let overlayInt = 100;
  	
    const { interMat, circlesMat } = this.state;
	  if (interMat && circlesMat) {
  	  	return (
        <CvInvoke func="HoughCircles" params={{ "p1": interMat, "p2": circlesMat, "p3": 3, "p4": 2, "p5": 320, "p6": 200, "p7": 100, "p8": 5, "p9": 130 }} callback="onPayload">
          <CvInvoke func="GaussianBlur" params={{ "p1": "gray", "p2": interMat, "p3": gaussianKernelSize, "p4": 2, "p5": 2 }}>
    	  <CvCamera ref={this.cvCamera} style={styles.container} 
   	   	    overlayInterval={overlayInt}
              onPayload={this.onPayload}
              onFrameSize={this.onFrameSize}
            />
          </CvInvoke>
        </CvInvoke>
  	  	);	  	
	  } else {
	  	return (
        <View/>
	  	);
	  }
  }
  
  render() {
    if (!this.state.opencvinstalled) {
      return (
        <View style={styles.container}/>
      );
    }
    return (
      <View style={styles.container}>
		  {this.renderHoughCircles()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
	  height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute'
  }
});