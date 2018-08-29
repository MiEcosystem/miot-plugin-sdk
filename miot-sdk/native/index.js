/**
 * @file 本地接口集中导出
 * @author
 * @description 整个 native 文件夹都将是隐藏的, 不会导出, 仅供内部使用
 *
 */

import { Platform, DeviceEventEmitter } from 'react-native'

import AndroidModules from './android'
import IosModules from './ios'

import utils from './utils'

import createEventBuilder from './events'


export const Utils = utils;

//全小写
export const IOS = "ios"
export const ANDROID = "android"
//export const TV = "tv"

//check
export const NativeType = (Platform.OS.toLowerCase() === 'android') ? ANDROID : IOS;
export const isAndroid = (NativeType === ANDROID)
export const isIOS = (NativeType === IOS)

// const RandomPropertyName = "__" + Utils.uniqueToken32(0);
const nativePropertiesMap = new WeakMap();
export const Properties = {
    init(target, props) {
        //target[RandomPropertyName] = props || {};
        nativePropertiesMap.set(target, props||{});
        return target;
    },
    of(target) {
        // return target[RandomPropertyName] || {};
        return nativePropertiesMap.get(target) || {};
    }
}

//modules
const modules = isAndroid ? AndroidModules : IosModules;
const MIOTRPC = modules.MIOTRPC;
MIOTRPC.standardCall=(api, params, callback)=>{
    MIOTRPC.nativeCall(api, params, (ok, res)=>{
        if(ok && res.result){
            callback(ok, res.result)
            return;
        }
        callback(false, res)
    })
}

//全局事件处理
const EventRandom = modules.MIOTPackage.eventRandom || "";
export const MIOTEventEmitter={
    addListener(name,callback){
        return DeviceEventEmitter.addListener(name + EventRandom, callback)
    },
    emit(name, ...args){
        DeviceEventEmitter.emit(name + EventRandom, ...args);
    }
};

modules.LocalCache.globalEventProfiles={};
const eventBuilder = createEventBuilder(modules.LocalCache.globalEventProfiles, MIOTEventEmitter);
export const createEventManager = eventBuilder.createEventManager;

export default {
    ...modules, MIOTRPC,MIOTEventEmitter,
    type: NativeType,
    isAndroid, isIOS
}
