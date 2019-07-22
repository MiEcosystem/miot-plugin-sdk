import React from "react";
import {Dimensions} from "react-native";

const ReactNative = require('react-native');
const fontScale = ReactNative.PixelRatio.getFontScale();
const pixelRatio = ReactNative.PixelRatio.get();

export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;

const designWidth = 750.0;
const designHeight = 1334.0;

// 根据dp获取屏幕的px
const screenPxW = ReactNative.PixelRatio.getPixelSizeForLayoutSize(screenW);
const screenPxH = ReactNative.PixelRatio.getPixelSizeForLayoutSize(screenH);

/**
 * 设置text
 * @param size  px
 * @returns {Number} dp
 */
export const SetSpText=(size)=>{
    var scaleWidth = screenW / designWidth;
    var scaleHeight = screenH / designHeight;
    var scale = Math.min(scaleWidth, scaleHeight);
	var result = Math.round(size * scale/fontScale + 0.5);
    return result;
}

/**
 * 设置高度
 * @param size  px
 * @returns {Number} dp
 */
export const ScaleHeight=(size)=>{
    var scaleHeight = size * screenPxH / designHeight;
    var result = Math.round((scaleHeight / pixelRatio + 0.5));
    return result;
}

/**
 * 设置宽度
 * @param size  px
 * @returns {Number} dp
 */
export const ScaleWidth=(size)=>{
    var scaleWidth = size * screenPxW / designWidth;
	var result = Math.round((scaleWidth/pixelRatio + 0.5));
    return result;
}