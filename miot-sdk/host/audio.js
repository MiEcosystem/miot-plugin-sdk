/**
 * @export public
 * @doc_name 音频模块
 * @doc_index 2
 * @doc_directory host
 * @module miot/host/audio
 * @description
 * 音频处理
 * @example
 * import {Host} from 'miot'
 * ...
 * Host.audio.startRecord('sample', {'AVFormatIDKey': 'AMR'})
 *  .then(res => {//start record success})
 * ...
 * Host.audio.stopRecord().then(res => {//stop finished})
 * ...
 */
export default {
  /**
   * 用户是否开启录制权限
   * @return {boolean}
   */
  isAbleToRecord() {
     return Promise.resolve(null);
  },
  /**
   * 开始录音
   * @param {string} audioName  保存文件名，如 audio.mp3
   * @param {json} settings 配置参数{ AVSampleRateKey 采样率 默认44100，
   *                                AVNumberOfChannelsKey 声道，默认2，
   *                                AVLinearPCMBitDepthKey 音频编码比特率 默认16,
   *                                AVFormatIDKey 编码格式(AMR,AMR_WB,MPEG4AAC,MPEG4CELP,MPEG4HVXC,MPEG4TwinVQ,AC3,60958AC3),
   *                                AVEncoderAudioQualityKey 音质(Min,Low,Medium,High,Max)
   *                              }
   *
   * @return {Promise}
   *
   */
  startRecord(audioName, settings) {
     return Promise.resolve(null);
  },
  /**
   * 停止录音
   * @return {Promise}
   */
  stopRecord() {
     return Promise.resolve(null);
  },
  /**
   * 开始播放
   * @param {string} audioName 文件名
   * @param {json} settings 配置参数 updateAudioPlayerTimeInterval 回调间隔, audioPlayerUid 音频的唯一标识
   * @return {Promise}
   */
  startPlay(audioName, settings) {
     return Promise.resolve(null);
  },
  /**
   * 停止播放
   * @return {Promise}
   */
  stopPlay() {
     return Promise.resolve(null);
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
     return Promise.resolve(null);
  },
  /**
   * wav转 amr
   * @param {string} wavPath 读取 wav 文件名
   * @param {string} savePath 保存 amr 文件名
   * @return {Promise}
   */
  wavToAmr(wavPath, savePath) {
     return Promise.resolve(null);
  },
  /**
   * amr 转 wav
   * @param {string} amrPath 读取 amr 文件名
   * @param {string} savePath 保存 wav 文件名
   * @return {Promise}
   */
  amrToWav(amrPath, savePath) {
     return Promise.resolve(null);
  },
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
  },
  /**
   * 播放进度事件
   * @event
   * @param {json} params  -{audioPlayerUid,currentTime}音频播放的Uid，播放当前进度
   * @since 10020
   *
   */
  updateAudioPlayerTime: {
  },
  /**
   * 播放开始事件
   * @event
   * @param {json} event -{audioPlayerUid,isSuccess}音频播放的Uid，是否成功开始播放
   * @since 10020
   *
   */
  audioPlayerDidStartPlaying: {
  }
}
buildEvents(AudioEvent);