/**
 */

import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    StatusBar,
    PixelRatio,
    Dimensions,
    Platform,
    Alert,
    WebView,
    ScrollView,
    Animated, NativeModules, requireNativeComponent
} from 'react-native';

import {MiotAndroidScrollView} from "miot/ui";

var window = Dimensions.get('window');

var windowHeight = 0;
var windowWidth = 0;

var naviHeight = StatusBar.currentHeight;

function getWindowHeight(){
    if(windowHeight === 0){
        return window.height;
    }
    return windowHeight;
}

function getWindowWidth(){
    if(windowWidth === 0){
        return window.width;
    }
    return windowWidth;
}

function getControlHeight() {
    return Math.round(getWindowHeight() * 0.18)
}

function getVideoHeight() {
    return getWindowHeight() - getControlHeight() - naviHeight;
}

export default class MiotAndroidScrollViewDemo extends React.Component {

    constructor(props) {
        super(props);
        this.scrollY = 0;
        this.scrollYValue = new Animated.Value(0);
    }


    render() {

        return (
            <View style={{flex: 1}}  onLayout = {(event) => {
                let {width, height} = event.nativeEvent.layout;
                if(getWindowWidth() !== width || getWindowHeight() !== height){
                    windowHeight = height + naviHeight;
                    windowWidth = width;
                    this.setState({});
                }
                console.log("video height: "+getVideoHeight() + " layout height:"+height + " ,naviHight: "+naviHeight, window);
            }}>
                <StatusBar barStyle='dark-content' backgroundColor = 'transparent'/>
                <MiotAndroidScrollView
                    style={{flex: 1, backgroundColor: 'green'}}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    automaticallyAdjustContentInsets={true}
                    onScroll = {this.onScroll}
                    overScrollMode='never'
                    scrollEventThrottle={1}
                    decelerationRate={0.9}
                    // pagingEnabled={true}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                    onMomentumScrollBegin = {this.onMomentumScrollBegin}
                    onMomentumScrollEnd={this.onMomentumScrollEnd}
                    // snapToInterval = {getVideoHeight()}
                    // snapToAlignment={'start'}
                    snapHeight = {getVideoHeight()}
                    scrollYDuration = {250}
                    ref= {(ref) => {
                        this.scrollView = ref;
                    }}>
                    <View style={{height: getVideoHeight(), backgroundColor: 'yellow'}}/>
                    <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={'#efeff0'}
                        onPress={() => {

                        }}>
                        <View style={{height: 500, backgroundColor: 'wheat'}}/>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.5} underlayColor={'#efeff0'} onPress={() => {
                        this.scrollView.scrollTo({x: 0, y: 0, animated: true});
                    }}>
                        <View style={{height: 500, backgroundColor: 'pink'}}/>
                    </TouchableHighlight>
                </MiotAndroidScrollView>

                <View style={{backgroundColor: 'red', height: getControlHeight()}}/>

            </View>
        );
    }
    

    onScrollBeginDrag = (e) => {
        this.touchUp = false;
        let scrollHeight = getVideoHeight();
        this.isTopScrolled = this.scrollY >= scrollHeight;
        this.scrollY = e.nativeEvent.contentOffset.y;
        console.log('onScrollBeginDrag scrollY:' + this.scrollY);
        // this.startY = this.scrollY;

    };
    onScrollEndDrag = (e) => {
        this.touchUp = true;
        this.scrollY = e.nativeEvent.contentOffset.y;
        console.log('onScrollEndDrag scrollY:' + this.scrollY);
    };

    onMomentumScrollBegin = (e) => {
        this.scrollY = e.nativeEvent.contentOffset.y;
        console.log('onMomentumScrollBegin scrollY:' + this.scrollY);
    };

    onMomentumScrollEnd = (e) => {
        this.scrollY = e.nativeEvent.contentOffset.y;
        console.log('onMomentumScrollEnd scrollY:' + this.scrollY);
        // this.snapStart(this.scrollY);
    };

    onScroll = (e) => {
        let scrollHeight = getVideoHeight() ;
        this.scrollY = e.nativeEvent.contentOffset.y;
        console.log('onScroll scrollY:' + this.scrollY);
    };

    snapStart(scrollY){
        let scrollHeight = getVideoHeight() ;
        let bottomLine = scrollHeight * 0.8;
        let topLine = scrollHeight * 0.2;
        console.log(`scrollY: ${scrollY} , bottomLine: ${bottomLine}  topLine: ${topLine}`);
        if ((scrollY >= bottomLine && scrollY < scrollHeight) || (scrollY > topLine && scrollY < bottomLine && scrollY > this.startY)) {
            // this.scrollView.scrollTo({x: 0, y: scrollHeight, animated: true});
            this.animateScrollY(scrollHeight);
        } else if ((scrollY > 0 && scrollY <= topLine) || (scrollY > topLine && scrollY < bottomLine && scrollY <= this.startY)) {
            // this.scrollView.scrollTo({x: 0, y: 0, animated: true});
            this.animateScrollY(0);
        }
    }

    animateScrollY(moveY){
        this.endScrollY = moveY;
        let startScrollY = this.scrollY;
        let maxScrollY = getVideoHeight();
        let duration = Math.max(Math.abs(startScrollY - moveY) / maxScrollY * 200, 100);
        console.log('animateScrollY'+moveY + " ,duration"+ duration);
        this.scrollYValue.stopAnimation();
        this.scrollYValue.setValue(0);
        this.scrollYValue.removeAllListeners();
        this.scrollYValue.addListener((callback) => {
            let y = (moveY -  startScrollY) * callback.value + startScrollY;
            console.log("addListener y:"+y, callback.value);
            if(this.scrollView){
                this.scrollView.scrollTo({x: 0, y: y, animated: false});
            }
        });
        let timeAnimated = Animated.timing(this.scrollYValue,
            {
                toValue: 1,
                duration: duration,
            });
        timeAnimated.start();

    }

}

var styles = StyleSheet.create({});