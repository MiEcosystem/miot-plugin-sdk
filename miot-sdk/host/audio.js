/**
 * @export
 * @module miot/host/audio
 * @description 音频处理
 */
export default {
  /**
   * 开始录音
   * @param {string} audioName  保存文件名
   * @param {json} settings 配置参数 AVSampleRateKey，AVNumberOfChannelsKey，AVLinearPCMBitDepthKey,audioFormatLinearPCM,AVEncoderAudioQualityKey
   * @return {Promise}
   * 
   */
  startRecord(audioName, settings) {
     return Promise.resolve(null);
  },
  /**
   * 停止录音
   * @return {Promise<boolean>} 
   */
  stopRecord() {
     return Promise.resolve(null);
  },
  /**
   * 开始播放
   * @param {string} audioName 文件名
   * @param {json} settings 配置参数 updateAudioPlayerTimeInterval,audioPlayerUid
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
  }
};