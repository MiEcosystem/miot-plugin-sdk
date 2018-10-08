'use strict';

import React, {Component} from 'react'

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    View,
    TextInput,
    PixelRatio,
    StatusBar,
    TouchableOpacity,
    BackHandler,
    Platform,
    DeviceEventEmitter,
} from 'react-native';



export default class BaseComponent extends Component {
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        } else {
            MHPluginSDK.closeCurrentPage();
        }
        return false;//默认行为

    };
}

