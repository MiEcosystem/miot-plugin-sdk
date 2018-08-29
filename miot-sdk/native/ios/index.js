/**
 * @file miot/native/ios
 * @author
 * @description iOS 端的本地接口代码
 *
 */

import { NativeModules } from 'react-native'

const { MIOTPackage, MIOTDevice, MIOTService } = NativeModules;
const MIOTHost = NativeModules.MHPluginSDK;
const MIOTFile = NativeModules.MHPluginFS;
const MIOTBluetooth = NativeModules.MIOTBluetooth;
const MIOTAudio = NativeModules.MHAudio;
const LocalCache = { currentDevice: {}, bluetoothDevices:new Map()}

/**
 * 要求必须返回一个成功失败的标示, 否则太过于麻烦了
 * @param {*} path
 * @param {*} params
 * @param {*} callback
 */
const nativeCall=(path, params, callback)=>{
    MIOTService.callSmartHomeAPI(path, params, (ok, res)=>{
      callback(ok, res||{})
    })
}

export default {
    MIOTPackage, MIOTDevice, MIOTService, MIOTRPC:{nativeCall},
    MIOTHost, MIOTFile, LocalCache, MIOTBluetooth, MIOTAudio
}
