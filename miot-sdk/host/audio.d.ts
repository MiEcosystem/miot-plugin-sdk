export default AudioInstance;
export namespace AudioEvent {
    namespace audioPlayerDidFinishPlaying {
        function forever(emitter: any): (event: any) => void;
    }
    namespace updateAudioPlayerTime {
        export function forever_1(emitter: any): (event: any) => void;
        export { forever_1 as forever };
    }
    namespace audioPlayerDidStartPlaying {
        export function forever_2(emitter: any): (event: any) => void;
        export { forever_2 as forever };
    }
}
declare const AudioInstance: IAudio;
/**
 * 音频
 * @interface
 *
 */
declare class IAudio {
  /**
     * 用户是否开启录制权限
     * 在Android平台下 由于需要动态获取录音权限，所以该方法固定返回true，但是并不意味着可以录音。
     * @return {boolean}
     */
  isAbleToRecord(): boolean;
    /**
     * 开始录音
     * 在Android平台下 由于需要动态获取录音权限 使用方法请参考 请参考 com.xiaomi.demo 中 MHAudioDemo 的用法
     * @param {string} audioName  保存文件名，如 audio.mp3
     * @param {json} settings 配置参数{
     *                                RecordType: 录制类型，可选值有 audioRecord,mediaRecord；  only worked for android
     *                                AVSampleRateKey 采样率 默认44100，
     *                                AVNumberOfChannelsKey 声道，默认2，
     *                                AVLinearPCMBitDepthKey 音频编码比特率 默认16,
     *                                AVFormatIDKey 编码格式(AMR,AMR_WB,MPEG4AAC,MPEG4CELP,MPEG4HVXC,MPEG4TwinVQ,AC3,60958AC3 ;
     *                                              recordType为audioRecord时，可以指定录制G711格式音频，设置AVFormatIDKey即可，默认是pcm裸数据), 仅仅适用于Android端，且不支持AAC;
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
     *   RecordType: 'mediaRecord'
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
    startRecord: (audioName: string, settings: json) => Promise<any>;
    /**
     * 停止录音
     * @return {Promise}
     */
    stopRecord(): Promise<any>;
    /**
     * 开始播放
     * @param {string} audioName  保存文件名，如 audio.mp3
     * @param {json} settings 配置参数{
     *                                playerType: 播放器类型,可选值有 audioTrack,mediaPlayer；   only worked for android
     *                                AVSampleRateKey 采样率 默认44100，
     *                                AVNumberOfChannelsKey 声道，默认2，
     *                                AVLinearPCMBitDepthKey 音频编码比特率 默认16,
     *                                AVFormatIDKey 编码格式(AMR,AMR_WB,MPEG4AAC,MPEG4CELP,MPEG4HVXC,MPEG4TwinVQ,AC3,60958AC3 ;
     *                                              playerType为audioTrack时，可以指定播放G711格式音频，设置AVFormatIDKey即可，默认是pcm裸数据), 仅仅适用于Android端，且不支持AAC;
     *                                AVEncoderAudioQualityKey 音质(Min,Low,Medium,High,Max)
     *                                audioPlayerUid  播放器ID，监听播放进度的时候会用到
     *                              }
     * @example
     * let params = {
     *   'playerType':'audioTrack',
     *   AVFormatIDKey:'G711',
     *   'updateAudioPlayerTimeInterval': 1,
     *   'audioPlayerUid': 'audioPlayerUid'
     * };
     * Host.audio.startPlay(fileName, params).then(() => { console.log('startPlay'); })
     *
     * @return {Promise}
     */
    startPlay(audioName: string, settings: json): Promise<any>;
    /**
     * 停止播放
     * @return {Promise}
     */
    stopPlay(): Promise<any>;
    /**
     * 获取当前录制声音的峰值声音强度。
     * for iOS： 对应的原生api为 [AVAudioRecorder peakPowerForChannel:0]
     * iOS官方文档：https://developer.apple.com/documentation/avfoundation/avaudiorecorder/1389463-peakpowerforchannel?language=objc
     * 返回值为0 表示满刻度或最大；返回值为-160表示最小（即接近静默）。
     * 取值范围是 -160 - 0， -160 意味着接近silence（静音），0 表示 最大的可测强度
     * 但是实际在测试过程中发现会大于0的输出情况，该值在测试极限情况出现过 10.5 的情况
     *
     * for android： 取值范围是0-2^15，对应的原生api 为 MediaRecorder.getMaxAmplitude()，仅RecordType为mediaRecord时可用
     *
     * @since 10030
     * @return {Promise}
     * 成功时：{"code":0, "data":xxx}    失败时：{"code":-1, "message":"xxx" }
     *
     */
    getRecordingPeakPower(): Promise<any>;
    /**
     * wav转 amr
     * android暂不支持该方法
     * @param {string} wavPath 读取 wav 文件名
     * @param {string} savePath 保存 amr 文件名
     * @return {Promise}
     */
    wavToAmr(wavPath: string, savePath: string): Promise<any>;
    /**
     * amr 转 wav
     * android暂不支持该方法
     * @param {string} amrPath 读取 amr 文件名
     * @param {string} savePath 保存 wav 文件名
     * @return {Promise}
     */
    amrToWav(amrPath: string, savePath: string): Promise<any>;
    getFilePath(fileName: any): any;
    /**
     * @since 10105
     * 获取资源文件的播放时长
     * @param fileName 文件名称，例如：file1728636383820.mp3
     * @returns
     *    成功时：
     *    { code: 0, data: {
     *      duration: 2253 // 资源文件的播放时长，单位是毫秒
     *    }}
     *    失败时：
     *    { code: xx, message: 'xx' }
     */
    getMediaDuration(fileName: any): Promise<any>;
}