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