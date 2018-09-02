/**
 * @export
 * @module miot/host/audio
 * @description 音频相关
 */
export default {
  /**
   * 开始录音
   * @param audioName {string} 保存文件名
   * @param settings {object} 配置参数 AVSampleRateKey，AVNumberOfChannelsKey，AVLinearPCMBitDepthKey,audioFormatLinearPCM,AVEncoderAudioQualityKey
   * @return {Promise}
   * @mark andr done
   */
  startRecord(audioName, settings) {
     return Promise.resolve(null);
  },
  /**
   * 停止录音
   * @return {Promise}
   * @mark andr done
   */
  stopRecord() {
     return Promise.resolve(null);
  },
  /**
   * 开始播放
   * @param audioName {string} 文件名
   * @param settings {object} 配置参数 updateAudioPlayerTimeInterval,audioPlayerUid
   * @return {Promise}
   * @mark andr done
   */
  startPlay(audioName, settings) {
     return Promise.resolve(null);
  },
  /**
   * 停止播放
   * @return {Promise}
   * @mark andr done
   */
  stopPlay() {
     return Promise.resolve(null);
  },
  /**
   * wav转 amr
   * @param wavPath {string} 读取 wav 文件名
   * @param savePath {string} 保存 amr 文件名
   * @return {Promise}
   * @mark andr 暂未提供
   */
  wavToAmr(wavPath, savePath) {
     return Promise.resolve(null);
  },
  /**
   * amr 转 wav
   * @param amrPath {string} 读取 amr 文件名
   * @param savePath {string} 保存 wav 文件名
   * @return {Promise}
   * @mark andr 暂未提供
   */
  amrToWav(amrPath, savePath) {
     return Promise.resolve(null);
  }
};