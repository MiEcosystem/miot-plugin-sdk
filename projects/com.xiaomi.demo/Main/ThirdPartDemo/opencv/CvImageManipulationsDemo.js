/**
 * Sample React Native App
 * https://github.com/adamgf/react-native-opencv3-tests/CvImageManipulations
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, DeviceEventEmitter, TouchableOpacity, ScrollView, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { RNCv, CvCamera, CvInvoke, CvInvokeGroup, ColorConv, CvType, Imgproc, Mat, MatOfInt, MatOfFloat, CvScalar, CvPoint, CvSize } from 'react-native-opencv3';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

export default class CvImageManipulationsDemo extends Component<Props> {

  constructor(props) {
    super(props);
    let { height, width } = Dimensions.get('window');
    this.scrollView = React.createRef();
    this.cvCamera = React.createRef();
    this.histSizeNum = 25.0;
    this.state = { scrolltop: height - 94, scrollleft: width - 64, windowwidth: width, windowheight: height, currMode: 'RGBA' };
  }

  componentDidMount = async() => {
    // I like to use camelCase similar to cameltoe
    const interMat = await new Mat().init();
    const channelZero = await new MatOfInt(0).init();
    const channelOne = await new MatOfInt(1).init();
    const channelTwo = await new MatOfInt(2).init();
    const maskMat = await new Mat().init();
    const histogramMat = await new Mat().init();
    const ranges = await new MatOfFloat(0.0, 256.0).init();
    const histSize = await new MatOfInt(this.histSizeNum).init();

    // Fill sepia kernel
    let sepiaKernel = await new Mat(4, 4, CvType.CV_32F).init();
    sepiaKernel.put(0, 0, /* R */0.189, 0.769, 0.393, 0);
    sepiaKernel.put(1, 0, /* G */0.168, 0.686, 0.349, 0);
    sepiaKernel.put(2, 0, /* B */0.131, 0.534, 0.272, 0);
    sepiaKernel.put(3, 0, /* A */0.000, 0.000, 0.000, 1);	
	
    this.setState({ ...this.state, interMat: interMat, channelZero: channelZero, channelOne: channelOne, channelTwo: channelTwo,
      maskMat: maskMat, histogramMat: histogramMat, histSize: histSize, ranges: ranges, sepiaKernel: sepiaKernel,
      opencvinstalled: false });

    DeviceEventEmitter.addListener('onPayload', this.onPayload);
    DeviceEventEmitter.addListener('onFrameSize', this.onFrameSize);
	
    if (Platform.OS === 'android') {
	    setTimeout(() => {
	      if (this.scrollView && this.scrollView.current) {
	        this.scrollView.current.scrollTo({ x: 0, y: this.state.windowheight, animated: false });
	      }
      }, 500);
      
      Package.installModule('RnOpencv').then((res) => {
        if (res && res.data && res.data.installed) {
          this.setState({ opencvinstalled: true });
        }
      });
    }
  }

  onFrameSize = async(e) => {
	  if (!this.state.frameWidth && !this.state.frameHeight && !this.state.fillMat) {		
      	const { frameWidth, frameHeight } = JSON.parse((Platform.OS === 'ios') ? e.nativeEvent.payload : e.payload).frameSize;
      	
      let fillMat;
      if (Platform.OS === 'ios') {
		  fillMat = await new Mat(frameHeight, frameWidth, CvType.CV_8UC4).init();
      } else {
		  fillMat = await new Mat(frameWidth, frameHeight, CvType.CV_8UC4).init();
      }
		
      	this.setState({ ...this.state, frameWidth: frameWidth, frameHeight: frameHeight, fillMat: fillMat, halfHeight: frameHeight / 2.0 });
    }
  }

  onPayload = async(e) => {
    const hist = (Platform.OS === 'ios') ? e.nativeEvent.payload : e.payload;

    const { frameWidth, frameHeight, fillMat } = this.state;
	
    if (fillMat) {
      if (Platform.OS === 'ios') {
        fillMat.setTo(CvScalar.all(0));
	  }
	  
      let thickness = (frameWidth / (this.histSizeNum + 10) / 5);
      if (thickness > 5) {
        thickness = 5;
      }

      const RGBScalars = [new CvScalar(200, 0, 0, 255), new CvScalar(0, 200, 0, 255), new CvScalar(0, 0, 200, 255)];

      const whiteScalar = CvScalar.all(255);

      const colorsHue = [
        new CvScalar(255, 0, 0, 255), new CvScalar(255, 60, 0, 255), new CvScalar(255, 120, 0, 255), new CvScalar(255, 180, 0, 255), new CvScalar(255, 240, 0, 255),
        new CvScalar(215, 213, 0, 255), new CvScalar(150, 255, 0, 255), new CvScalar(85, 255, 0, 255), new CvScalar(20, 255, 0, 255), new CvScalar(0, 255, 30, 255),
        new CvScalar(0, 255, 85, 255), new CvScalar(0, 255, 150, 255), new CvScalar(0, 255, 215, 255), new CvScalar(0, 234, 255, 255), new CvScalar(0, 170, 255, 255),
        new CvScalar(0, 120, 255, 255), new CvScalar(0, 60, 255, 255), new CvScalar(0, 0, 255, 255), new CvScalar(64, 0, 255, 255), new CvScalar(120, 0, 255, 255),
        new CvScalar(180, 0, 255, 255), new CvScalar(255, 0, 255, 255), new CvScalar(255, 0, 215, 255), new CvScalar(255, 0, 85, 255), new CvScalar(255, 0, 0, 255)
      ];

      for (let c = 0; c < hist.length; c++) {
        let offset = ((frameWidth - (5 * this.histSizeNum + 4 * 10) * thickness) / 2);
        for (let h = 0; h < this.histSizeNum; h++) {
          const x1 = offset + (c * (this.histSizeNum + 10) + h) * thickness;
          const x2 = x1;
          let y1 = frameHeight - 1.0;
          let y2 = y1 - 2.0 - hist[c][h];
          if (Platform.OS === 'ios') {
            y1 -= 128;
            y2 -= 128;
          }
          let mP1 = new CvPoint(x1, y1);
          let mP2 = new CvPoint(x2, y2);
          // RNCv.drawLine(histMat,mP1,mP2,RGBScalar,5);
          if (c < 3) {
            RNCv.invokeMethod("line", { "p1": fillMat, "p2": mP1, "p3": mP2, "p4": RGBScalars[c], "p5": thickness });
          } else if (c === 3) {
            RNCv.invokeMethod("line", { "p1": fillMat, "p2": mP1, "p3": mP2, "p4": whiteScalar, "p5": thickness });
          } else if (c === 4) {
            RNCv.invokeMethod("line", { "p1": fillMat, "p2": mP1, "p3": mP2, "p4": colorsHue[h], "p5": thickness });
          }
        }
      }

      if (this.cvCamera && this.cvCamera.current) {
        // have to do this for performance ...
        this.cvCamera.current.setOverlay(fillMat);
      }
    }
  }

  resetFillMat = () => {
    const { fillMat, currMode } = this.state;
    if (currMode === 'HISTOGRAM') {
      setTimeout(() => {
        if (this.cvCamera && this.cvCamera.current) {
          // have to do this for performance ...
          fillMat.setTo(CvScalar.all(0));
          this.cvCamera.current.setOverlay(fillMat);
        }
      }, 500);
    }
  }

  press1 = (e) => {
    let mode = 'RGBA';
    if (Platform.OS === 'android') {
	  this.resetFillMat();
	  mode = 'POSTERIZE';
    }
    this.setState({ ...this.state, currMode: mode });
  }

  press2 = (e) => {
    let mode = 'HISTOGRAM';
  	if (Platform.OS === 'android') {
  	  this.resetFillMat();
	  mode = 'PIXELATE';
  	}
    this.setState({ ...this.state, currMode: mode });
  }

  press3 = (e) => {
    let mode = 'CANNY';
  	if (Platform.OS === 'android') {
  	  this.resetFillMat();
	  mode = 'ZOOM';
  	}
    this.setState({ ...this.state, currMode: mode });
  }

  press4 = (e) => {
    let mode = 'SOBEL';
  	if (Platform.OS === 'android') {
  	  this.resetFillMat();
	  mode = 'SEPIA';
  	}
    this.setState({ ...this.state, currMode: mode });
  }

  press5 = (e) => {
    let mode = 'SEPIA';
  	if (Platform.OS === 'android') {
  	  this.resetFillMat();
	  mode = 'SOBEL';
  	}
    this.setState({ ...this.state, currMode: mode });
  }

  press6 = (e) => {
    let mode = 'ZOOM';
  	if (Platform.OS === 'android') {
  	  this.resetFillMat();
	  mode = 'CANNY';
  	}
    this.setState({ ...this.state, currMode: mode });
  }

  press7 = (e) => {
    let mode = 'PIXELATE';
  	if (Platform.OS === 'android') {
  	  this.resetFillMat();
	  mode = 'HISTOGRAM';
  	}
    this.setState({ ...this.state, currMode: mode });
  }

  press8 = (e) => {
    let mode = 'POSTERIZE';
  	if (Platform.OS === 'android') {
  	  this.resetFillMat();
	  mode = 'RGBA';
  	}
    this.setState({ ...this.state, currMode: mode });
  }

  renderScrollView = () => {
    let svstyle = { 'left': this.state.scrollleft, ...styles.scrollview };
    let horizontalVal = false;
    if (Platform.OS === 'ios') {
      svstyle = { 'top': this.state.scrolltop, ...styles.scrollviewios };
      horizontalVal = true;
    }
	  
    return (
      <ScrollView ref={this.scrollView} style={svstyle} horizontal={horizontalVal}>
        <TouchableOpacity onPress={this.press1} style={styles.to}>
          <Image source={require('./images/react-native-icon.png')} style={Platform.OS === 'android' ? styles.scrollimgAndroid : styles.scrollimg}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.press2} style={styles.to}>
          <Image source={require('./images/react-native-icon.png')} style={Platform.OS === 'android' ? styles.scrollimgAndroid : styles.scrollimg}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.press3} style={styles.to}>
          <Image source={require('./images/react-native-icon.png')} style={Platform.OS === 'android' ? styles.scrollimgAndroid : styles.scrollimg}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.press4} style={styles.to}>
          <Image source={require('./images/react-native-icon.png')} style={Platform.OS === 'android' ? styles.scrollimgAndroid : styles.scrollimg}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.press5} style={styles.to}>
          <Image source={require('./images/react-native-icon.png')} style={Platform.OS === 'android' ? styles.scrollimgAndroid : styles.scrollimg}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.press6} style={styles.to}>
          <Image source={require('./images/react-native-icon.png')} style={Platform.OS === 'android' ? styles.scrollimgAndroid : styles.scrollimg}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.press7} style={styles.to}>
          <Image source={require('./images/react-native-icon.png')} style={Platform.OS === 'android' ? styles.scrollimgAndroid : styles.scrollimg}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.press8} style={styles.to}>
          <Image source={require('./images/react-native-icon.png')} style={Platform.OS === 'android' ? styles.scrollimgAndroid : styles.scrollimg}/>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  renderModeLabel = () => {
    let mlstyle = styles.modelabel;
    if (Platform.OS === 'ios') {
	  mlstyle = styles.modelabelios;
    }
  	return <Text style={mlstyle}>Mode: {this.state.currMode}</Text>;

  }
  renderCamera = () => {	  
  	  return (
      <CvCamera ref={this.cvCamera} style={{ width: '100%', height: '100%', position: 'absolute' }} onFrameSize={this.onFrameSize} overlayInterval={0}/>
  	  );
  }
  render() {
    const { interMat, channelZero, channelOne, channelTwo, maskMat, histogramMat, histSize, ranges, halfHeight, fillMat, currMode, frameWidth, frameHeight, sepiaKernel } = this.state;

    const left = frameWidth / 8;
    const top = frameHeight / 8;
    const width = frameWidth * 3 / 4;
    const height = frameHeight * 3 / 4;
    const right = left + width;
    const bottom = top + height;

    const zcLeft = 0;
    const zcRight = frameWidth / 2 - frameWidth / 10;
    const zcTop = 0;
    const zcBottom = frameHeight / 2 - frameHeight / 10;

    const zwLeft = frameWidth / 2 - 9 * frameWidth / 100;
    const zwRight = frameWidth / 2 + 9 * frameWidth / 100;
    const zwTop = frameHeight / 2 - 9 * frameHeight / 100;
    const zwBottom = frameHeight / 2 + 9 * frameHeight / 100;

    const zoomScalar = new CvScalar(255, 0, 0, 255);
    const wsize = new CvSize(zwRight - zwLeft, zwBottom - zwTop);
    const csize = new CvSize(zcRight - zcLeft, zcBottom - zcTop);
    const zoomPoint1 = new CvPoint(1, 1);
    const zoomPoint2 = new CvPoint(wsize.width - 2, wsize.height - 2);

    const size0 = new CvSize();
    const iwsize = new CvSize(right - left, bottom - top);  
	  
    const posterScalar = new CvScalar(0, 0, 0, 255);
    let overlayInt = 1000;
    if (Platform.OS === 'ios') {
	  overlayInt = 300;
    }  
  
    if (!this.state.opencvinstalled) {
      return (
        <View style={styles.container}/>
      );
    }
	  
	  if (frameWidth && frameHeight) {
      switch (currMode) {
        default:
        case 'RGBA':
          return (
            <View style={styles.container}>
              {this.renderCamera()}
              {this.renderScrollView()}
  		{this.renderModeLabel()}
            </View>
          );
        case 'HISTOGRAM':
          return (
            <View style={styles.container}>
              <CvInvokeGroup groupid="invokeGroup4">
                <CvInvoke func="normalize" params={{ "p1": histogramMat, "p2": histogramMat, "p3": halfHeight, "p4": 0, "p5": 1 }} callback="onPayload"/>
                <CvInvoke func="calcHist" params={{ "p1": interMat, "p2": channelZero, "p3": maskMat, "p4": histogramMat, "p5": histSize, "p6": ranges }}/>
                <CvInvoke func="cvtColor" params={{ "p1": "rgba", "p2": interMat, "p3": ColorConv.COLOR_RGB2HSV_FULL }}/>
                <CvInvokeGroup groupid="invokeGroup3">
                  <CvInvoke func="normalize" params={{ "p1": histogramMat, "p2": histogramMat, "p3": halfHeight, "p4": 0, "p5": 1 }} callback="onPayload"/>
                  <CvInvoke func="calcHist" params={{ "p1": interMat, "p2": channelTwo, "p3": maskMat, "p4": histogramMat, "p5": histSize, "p6": ranges }}/>
                  <CvInvoke func="cvtColor" params={{ "p1": "rgba", "p2": interMat, "p3": ColorConv.COLOR_RGB2HSV_FULL }}/>
                  <CvInvokeGroup groupid="invokeGroup2">
                    <CvInvoke func="normalize" params={{ "p1": histogramMat, "p2": histogramMat, "p3": halfHeight, "p4": 0, "p5": 1 }} callback="onPayload"/>
                    <CvInvoke func="calcHist" params={{ "p1": "rgba", "p2": channelTwo, "p3": maskMat, "p4": histogramMat, "p5": histSize, "p6": ranges }}/>
                    <CvInvokeGroup groupid="invokeGroup1">
                      <CvInvoke func="normalize" params={{ "p1": histogramMat, "p2": histogramMat, "p3": halfHeight, "p4": 0, "p5": 1 }} callback="onPayload"/>
                      <CvInvoke func="calcHist" params={{ "p1": "rgba", "p2": channelOne, "p3": maskMat, "p4": histogramMat, "p5": histSize, "p6": ranges }}/>
                      <CvInvokeGroup groupid="invokeGroup0">
                        <CvInvoke func="normalize" params={{ "p1": histogramMat, "p2": histogramMat, "p3": halfHeight, "p4": 0, "p5": 1 }} callback="onPayload"/>
                        <CvInvoke func="calcHist" params={{ "p1": "rgba", "p2": channelZero, "p3": maskMat, "p4": histogramMat, "p5": histSize, "p6": ranges }}/>
          		  <CvCamera ref={this.cvCamera} style={{ width: '100%', height: '100%', position: 'absolute' }} 
  		   	   	    overlayInterval={overlayInt}
  	                onPayload={this.onPayload}
  	                onFrameSize={this.onFrameSize}
  		          />
                      </CvInvokeGroup>
		      </CvInvokeGroup>
                  </CvInvokeGroup>
	      </CvInvokeGroup>
              </CvInvokeGroup>
              {this.renderModeLabel()}
              {this.renderScrollView()}
            </View>
          );
        case 'CANNY':
          return (
            <View style={styles.container}>
              <CvInvokeGroup groupid="invokeGroup0">
                <CvInvoke inobj="rgbaInnerWindow" func="release"/>
                <CvInvoke func="cvtColor" params={{ "p1": interMat, "p2": "rgbaInnerWindow", "p3": ColorConv.COLOR_GRAY2BGRA, "p4": 4 }}/>
                <CvInvoke func="Canny" params={{ "p1": "rgbaInnerWindow", "p2": interMat, "p3": 80, "p4": 90 }}/>
                <CvInvoke inobj="rgba" func="submat" params={{ "p1": top, "p2": bottom, "p3": left, "p4": right }} outobj="rgbaInnerWindow"/>
                {this.renderCamera()}        
              </CvInvokeGroup>
    	{this.renderModeLabel()}
              {this.renderScrollView()}
            </View>
          );
        case 'SOBEL':
          return (
            <View style={styles.container}>
              <CvInvokeGroup groupid="invokeGroup0">
                <CvInvoke inobj="rbgaInnerWindow" func="release"/>
                <CvInvoke func="cvtColor" params={{ "p1": interMat, "p2": "rgbaInnerWindow", "p3": ColorConv.COLOR_GRAY2BGRA, "p4": 4 }}/>
                <CvInvoke inobj="rgba" func="submat" params={{ "p1": top, "p2": bottom, "p3": left, "p4": right }} outobj="rgbaInnerWindow"/>
                <CvInvoke inobj="grayInnerWindow" func="release"/>
                <CvInvoke func="convertScaleAbs" params={{ "p1": interMat, "p2": interMat, "p3": 10, "p4": 0 }}/>
                <CvInvoke func="Sobel" params={{ "p1": "grayInnerWindow", "p2": interMat, "p3": CvType.CV_8U, "p4": 1, "p5": 1 }}/>
                <CvInvoke inobj="gray" func="submat" params={{ "p1": top, "p2": bottom, "p3": left, "p4": right }} outobj="grayInnerWindow"/>
                {this.renderCamera()}
              </CvInvokeGroup>
    	{this.renderModeLabel()}
              {this.renderScrollView()}
            </View>
          );
        case 'SEPIA':
          return (
            <View style={styles.container}>
              <CvInvoke inobj="rbgaInnerWindow" func="release">
                <CvInvoke func="transform" params={{ "p1": "rgbaInnerWindow", "p2": "rgbaInnerWindow", "p3": sepiaKernel }}>
                  <CvInvoke inobj="rgba" func="submat" params={{ "p1": top, "p2": bottom, "p3": left, "p4": right }} outobj="rgbaInnerWindow">
                    {this.renderCamera()}
                  </CvInvoke>
                </CvInvoke>
              </CvInvoke>
	    {this.renderModeLabel()}
              {this.renderScrollView()}
            </View>
          );
        case 'ZOOM':
          return (
            <View style={styles.container}>
              <CvInvokeGroup groupid="invokeGroup0">
                <CvInvoke inobj="zoomWindow" func="release"/>
                <CvInvoke inobj="zoomCorner" func="release"/>
                <CvInvoke func="rectangle" params={{ "p1": "zoomWindow", "p2": zoomPoint1, "p3": zoomPoint2, "p4": zoomScalar, "p5": 2 }}/>
                <CvInvoke func="resize" params={{ "p1": "zoomWindow", "p2": "zoomCorner", "p3": csize, "p4": 0, "p5": 0, "p6": 5 }}/>
                <CvInvoke inobj="rgba" func="submat" params={{ "p1": zwTop, "p2": zwBottom, "p3": zwLeft, "p4": zwRight }} outobj="zoomWindow"/>
                <CvInvoke inobj="rgba" func="submat" params={{ "p1": zcTop, "p2": zcBottom, "p3": zcLeft, "p4": zcRight }} outobj="zoomCorner"/>
                {this.renderCamera()}
              </CvInvokeGroup>
    	{this.renderModeLabel()}
              {this.renderScrollView()}
            </View>
          );
  	  case 'PIXELATE':
          return (
            <View style={styles.container}>
              <CvInvoke inobj="rbgaInnerWindow" func="release">
                <CvInvoke func="resize" params={{ "p1": interMat, "p2": "rgbaInnerWindow", "p3": iwsize, "p4": 0., "p5": 0., "p6": Imgproc.INTER_NEAREST }}>
      	    <CvInvoke func="resize" params={{ "p1": "rgbaInnerWindow", "p2": interMat, "p3": size0, "p4": 0.1, "p5": 0.1, "p6": Imgproc.INTER_NEAREST }}>
                    <CvInvoke inobj="rgba" func="submat" params={{ "p1": top, "p2": bottom, "p3": left, "p4": right }} outobj="rgbaInnerWindow">
                      {this.renderCamera()}
                    </CvInvoke>
                  </CvInvoke>
	      </CvInvoke>
              </CvInvoke>
              {this.renderModeLabel()}
              {this.renderScrollView()}
            </View>
          );
        case 'POSTERIZE':
          return (
            <View style={styles.container}>
              <CvInvokeGroup groupid="zeeGrup">
                <CvInvoke inobj="rgbaInnerWindow" func="release"/>
                <CvInvoke func="convertScaleAbs" params={{ "p1": interMat, "p2": "rgbaInnerWindow", "p3": 16, "p4": 0 }}/>
                <CvInvoke func="convertScaleAbs" params={{ "p1": "rgbaInnerWindow", "p2": interMat, "p3": 1. / 16, "p4": 0 }}/>
                <CvInvoke inobj="rgbaInnerWindow" func="setTo" params={{ "p1": posterScalar, "p2": interMat }}/>
                <CvInvoke func="Canny" params={{ "p1": "rgbaInnerWindow", "p2": interMat, "p3": 80, "p4": 90 }}/>
                <CvInvoke inobj="rgba" func="submat" params={{ "p1": top, "p2": bottom, "p3": left, "p4": right }} outobj="rgbaInnerWindow"/>
                {this.renderCamera()}
              </CvInvokeGroup>
    	{this.renderModeLabel()}
              {this.renderScrollView()}
            </View>
          );
      }
    } else {
	  return (
        <View style={styles.container}>
          {this.renderCamera()}
          {this.renderScrollView()}
        </View>
  	);
    }
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  modelabel: {
    transform: [{ rotate: '-90deg' }],	
    position: 'absolute',
    fontSize: 16,
    color: 'white',
    backgroundColor: '#00000080',
    left: -20,
    bottom: 70,
    width: 140
  },
  modelabelios: {
    position: 'absolute',
    fontSize: 20,
    color: 'white',
    backgroundColor: '#00000080',
    top: 44,
    right: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  to: {
    width: 64,
    height: 64,
    backgroundColor: 'transparent'
  },
  scrollimg: {
    width: 56,
    height: 56,
    margin: 4
  },
  scrollimgAndroid: {
    width: 56,
    height: 56,
    margin: 4,
    transform: [{ rotate: '-90deg' }]	
  },
  scrollview: {
    right: 0,
    bottom: 0,
    top: 0,
    height: 512,
    width: 64,
    backgroundColor: '#000',
    opacity: 0.65
  },
  scrollviewios: {
    bottom: 30,
    height: 64,
    backgroundColor: '#000',
    opacity: 0.65
  }
});