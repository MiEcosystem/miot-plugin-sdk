/**
 * @file miot/native/android
 * @author
 * @description 安卓端的本地接口
 *
 */

import { NativeModules } from 'react-native'
const LocalCache = {currentDevice:{}, bluetoothDevices:new Map()};
const { MIOTPackage, MIOTDevice, MIOTService, MIOTHost, MHMapSearch, MIOTFile ,MIOTBluetooth, MIOTAudio } = NativeModules;

const nativeCall=(path, params, callback)=>{
  MIOTService.callSmartHomeAPI(path, (typeof(params)==="string")?params:JSON.stringify(params), 
  (ok, res, msg)=>{
    if(ok){
      try{
        res = JSON.parse(res);
        callback(ok, res)
      }catch(err){
        callback(ok, {})
      }
    }else{
      callback(ok, {code:res, msg})
    }

  })
}

export default {
  MIOTPackage, MIOTDevice, MIOTService, MIOTRPC:{nativeCall},
  MIOTHost, MHMapSearch, MIOTFile, MIOTBluetooth, 
  MIOTAudio, LocalCache
}
