/**
 * @export public
 * @doc_name 音频模块
 * @doc_index 2
 * @doc_directory host
 * @module miot/host/audio
 * @description
 * 音频处理
 * 
 *  重要： 请参考 com.xiaomi.demo 中 MHAudioDemo 中各个api的用法。
 * 
 * @example
 * import {Host} from 'miot'
 * ...
 * Host.audio.startRecord('sample', {'AVFormatIDKey': 'AMR'})
 *  .then(res => {//start record success})
 * ...
 * Host.audio.stopRecord().then(res => {//stop finished})
 * ...
 */
//@native
import native, { buildEvents } from "../native";
export default {
  /**
   * 用户是否开启录制权限
   * 在Android平台下 由于需要动态获取录音权限，所以该方法固定返回true，但是并不意味着可以录音。
   * @return {boolean}
   */
  isAbleToRecord() {
    //@native :=> false;
    return native.MIOTAudio.isAbleToRecord;
    //@native end
  },
  /**
   * 开始录音
   * 在Android平台下 由于需要动态获取录音权限 使用方法请参考 请参考 com.xiaomi.demo 中 MHAudioDemo 的用法
   * @param {string} audioName  保存文件名，如 audio.mp3
   * @param {json} settings 配置参数{ AVSampleRateKey 采样率 默认44100，
   *                                AVNumberOfChannelsKey 声道，默认2，
   *                                AVLinearPCMBitDepthKey 音频编码比特率 默认16,
   *                                AVFormatIDKey 编码格式(AMR,AMR_WB,MPEG4AAC,MPEG4CELP,MPEG4HVXC,MPEG4TwinVQ,AC3,60958AC3),
   *                                AVEncoderAudioQualityKey 音质(Min,Low,Medium,High,Max)
   *                              }
   *
   * @return {Promise}
   * @example   
   * import { Host } from "miot";
   * import React from 'react';
   * import { PermissionsAndroid, Platform } from 'react-native';
   * 
   * var settings = {
   *   AVFormatIDKey: 'audioFormatLinearPCM',
   *   AVSampleRateKey: 9500,
   *   AVNumberOfChannelsKey: 2,
   *   AVEncoderAudioQualityKey: 'audioQualityHigh',
   *   AVLinearPCMBitDepthKey: 16,
   *   AVLinearPCMIsBigEndianKey: false,
   *   AVLinearPCMIsFloatKey: false,
   * };
   * if (Platform.OS === 'android') {
   *   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, null)
   *     .then((granted) => {
   *       console.log("granted", granted);
   *       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
   *         Host.audio.startRecord(fileName, settings).then(() => {
   *           console.log('startRecord');
   *         });
   *       }
   *     }).catch((error) => {
   *       console.log("error", error)
   *     })
   * } else {
   *   Host.audio.startRecord(fileName, settings).then(() => {
   *     console.log('startRecord');
   *   }).catch((err) => {
   *     console.log('startRecord catch error' + err);
   *   });
   * }
   * 
   */
  startRecord(audioName, settings) {
    //@native :=> Promise.resolve(null);
    //@mark andr done
    return new Promise((resolve, reject) => {
      native.MIOTAudio.startRecord(this.getFilePath(audioName), settings, (ret, message) => {
        if (ret) {
          resolve(ret)
        } else {
          reject(message)
        }
      });
    });
    //@native end
  },
  /**
   * 停止录音
   * @return {Promise}
   */
  stopRecord() {
    //@native :=> Promise.resolve(null);
    //@mark andr done
    return new Promise((resolve, reject) => {
      native.MIOTAudio.stopRecord((ret, message) => {
        if (ret) {
          resolve(ret)
        } else {
          reject(message)
        }
      });
    });
    //@native end
  },
  /**
   * 开始播放
   * @param {string} audioName 文件名
   * @param {json} settings 配置参数 updateAudioPlayerTimeInterval 回调间隔, audioPlayerUid 音频的唯一标识
   * @return {Promise}
   */
  startPlay(audioName, settings) {
    //@native :=> Promise.resolve(null);
    //@mark andr done
    return new Promise((resolve, reject) => {
      //use to load required audio
      const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
      var resource = resolveAssetSource(audioName)
      audioName = resource ? resource.uri : this.getFilePath(audioName)
      native.MIOTAudio.startPlay(audioName, settings, (ret, message) => {
        if (ret) {
          resolve(ret)
        } else {
          reject(message)
        }
      });
    });
    //@native end
  },
  /**
   * 停止播放
   * @return {Promise}
   */
  stopPlay() {
    //@native :=> Promise.resolve(null);
    //@mark andr done
    return new Promise((resolve, reject) => {
      native.MIOTAudio.stopPlay((ret, message) => {
        if (ret) {
          resolve(ret)
        } else {
          reject(message)
        }
      });
    });
    //@native end
  },
  /**
   * 获取当前录制声音的峰值声音强度。
   * for iOS： 对应的原生api为 [AVAudioRecorder peakPowerForChannel:0]
   * iOS官方文档：https://developer.apple.com/documentation/avfoundation/avaudiorecorder/1389463-peakpowerforchannel?language=objc
   * 返回值为0 表示满刻度或最大；返回值为-160表示最小（即接近静默）。
   * 取值范围是 -160 - 0， -160 意味着接近silence（静音），0 表示 最大的可测强度
   * 但是实际在测试过程中发现会大于0的输出情况，该值在测试极限情况出现过 10.5 的情况
   *
   * for android： 取值范围是0-2^15，对应的原生api 为 MediaRecorder.getMaxAmplitude()
   *
   * @since 10030
   * @return {Promise}
   * 成功时：{"code":0, "data":xxx}    失败时：{"code":-1, "message":"xxx" }
   *
   */
  getRecordingPeakPower() {
    //@native :=> Promise.resolve(null);
    //@mark andr done
    return new Promise((resolve, reject) => {
      native.MIOTAudio.getRecordingPeakPower((ret, message) => {
        if (ret) {
          resolve(message)
        } else {
          reject(message)
        }
      });
    });
    //@native end
  },
  /**
   * wav转 amr
   * android暂不支持该方法
   * @param {string} wavPath 读取 wav 文件名
   * @param {string} savePath 保存 amr 文件名
   * @return {Promise}
   */
  wavToAmr(wavPath, savePath) {
    //@native :=> Promise.resolve(null);
    //@mark andr 暂未提供
    return new Promise((resolve, reject) => {
      if (!native.isIOS) {
        reject('not support for android');
        return;
      }
      native.MIOTAudio.wavToAmr(this.getFilePath(wavPath), this.getFilePath(savePath), (ret, message) => {
        if (ret) {
          resolve(ret)
        } else {
          reject(message)
        }
      });
    });
    //@native end
  },
  /**
   * amr 转 wav
   * android暂不支持该方法
   * @param {string} amrPath 读取 amr 文件名
   * @param {string} savePath 保存 wav 文件名
   * @return {Promise}
   */
  amrToWav(amrPath, savePath) {
    //@native :=> Promise.resolve(null);
    //@mark andr 暂未提供
    return new Promise((resolve, reject) => {
      if (!native.isIOS) {
        reject('not support for android');
        return;
      }
      native.MIOTAudio.amrToWav(this.getFilePath(amrPath), this.getFilePath(savePath), (ret, message) => {
        if (ret) {
          resolve(ret)
        } else {
          reject(message)
        }
      });
    });
    //@native end
  },
  //@native begin
  getFilePath(fileName) {
    if (typeof (fileName) != 'string') {
      return fileName;
    }
    if (fileName.substr(0, 1) == '/') {
      return native.MIOTFile.storageBasePath + fileName;
    } else {
      return native.MIOTFile.storageBasePath + '/' + fileName;
    }
  }
  //@native end
};
/**
 * Audio播放事件名集合
 * @namespace AudioEvent
 * @example
 *    import { AudioEvent } from 'miot/host/audio';
 *    const subscription = AudioEvent.audioPlayerDidFinishPlaying.addListener(
 *       (event)=>{
 *          ...
 *       }
 *     )
 *    ...
 *    subscription.remove()
 *    ...
 *
 */
export const AudioEvent = {
  /**
   * 播放完毕事件
   * @event
   * @param {json} event -{audioPlayerUid,isSuccess}音频播放的Uid，是否播放成功
   * @since 10020
   *
   */
  audioPlayerDidFinishPlaying: {
    //@native begin
    forever: emitter => (event) => {
      emitter.emit(event);
    }
    //@native end
  },
  /**
   * 播放进度事件
   * @event
   * @param {json} params  -{audioPlayerUid,currentTime}音频播放的Uid，播放当前进度
   * @since 10020
   *
   */
  updateAudioPlayerTime: {
    //@native begin
    forever: emitter => (event) => {
      emitter.emit(event);
    }
    //@native end
  },
  /**
   * 播放开始事件
   * @event
   * @param {json} event -{audioPlayerUid,isSuccess}音频播放的Uid，是否成功开始播放
   * @since 10020
   *
   */
  audioPlayerDidStartPlaying: {
    //@native begin
    forever: emitter => (event) => {
      emitter.emit(event);
    }
    //@native end
  }
}
buildEvents(AudioEvent);