/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @since 10031
 * @module miot/ui/CameraRender
 * @description 摄像机视频渲染组件
 *
 * @example
 *
 <CameraRenderView
    style={{ width: 300, height: 300, backgroundColor: '#ffffff'}}
    maximumZoomScale={3.0}
    videoCodec={MISSCodec.MISS_CODEC_VIDEO_H264}
    audioCodec={MISSCodec.MISS_CODEC_AUDIO_G711A}
    audioRecordSampleRate={MISSSampleRate.FLAG_AUDIO_SAMPLE_8K}
    audioRecordChannel={MISSAudioChannel.FLAG_AUDIO_CHANNEL_MONO}
    audioRecordDataBits={MISSDataBits.FLAG_AUDIO_DATABITS_16}
    fullscreenState={false}
    videoRate={15} >
/>
 *
 * @property {MISSCodec} videoCodec 接收视频的编码格式 默认：MISS_CODEC_VIDEO_H264
 * @property {MISSCodec} audioCodec 对讲发送音频的编码格式 默认：MISS_CODEC_AUDIO_G711A
 * @property {MISSSampleRate} audioRecordSampleRate 对讲音频的 sample rate 默认：FLAG_AUDIO_SAMPLE_8K
 * @property {MISSAudioChannel} audioRecordChannel 对讲音频的 channel 默认：FLAG_AUDIO_CHANNEL_MONO
 * @property {MISSDataBits} audioRecordDataBits 对讲音频的 data bits 默认：FLAG_AUDIO_DATABITS_16
 * @property {MISSCodec} audioRecordCodec 对讲音频的codecId，默认与audioCodec一样。
 * @property {number} videoRate ios端录制视频时的帧率。
 * @property {number} maximumZoomScale 最大缩放比例 默认2.0 ;only ios
 * @property {number} minimumZoomScale 最小缩放比例 默认1.0 ;only ios
 * @property {number} scale 缩放比例 默认1.0 ;only ios
 * @property {bool} useLenCorrent 是否开启畸变矫正 default true
 * @property {number} correctRadius 畸变矫正-radius default 1.1
 * @property {number} osdx 畸变矫正-osdx default 0.0
 * @property {number} osdy 畸变矫正-osdy default 0.0
 * @property {bool} fullscreenState 是否是全屏状态 since 10033
 * @property {bool} forceSoftDecode 强制软解 since 10033
 * @property {object} recordingVideoParam  only for android;限制录制视频时的分辨率，开始录制视频前，要调整分辨率到指定分辨率。 since 10041 {width:111, height:111，fps： 20}  fps指定录制视频时，对应的视频帧帧率，默认是20，不是20的需要手动指定；如果调整到固定帧率，依旧不work，则指定成-1，app端会按照收到视频帧的时间插入视频文件里。
 * @property {boolean} isFull  画面是否填充满屏幕
 * @property {boolean} whiteBackground  是否使用白色背景 @since 10047
 * @property {number} playRate android端播放直播/回看时的帧率，默认是20   since 10048 
 */
/**
 * 音视频codec
 * @namespace MISSCodec
 */
export const MISSCodec = {
  /**
     * H264
     * @const
     */
  MISS_CODEC_VIDEO_H264: 0x4,
  /**
     * H265
     * @const
     */
  MISS_CODEC_VIDEO_H265: 0x5,
  /**
     * G711u
     * @const
     * @since 10060
     */
  MISS_CODEC_AUDIO_G711U: 0x402,
  /**
     * G711
     * @const
     */
  MISS_CODEC_AUDIO_G711A: 0x403,
  /**
     * AAC
     * @const
     */
  MISS_CODEC_AUDIO_AAC: 0x406,
  /**
     * PCM
     * @const
     * @since 10047
     */
  MISS_CODEC_AUDIO_PCM: 0x400,
  /**
   * OPUS
   * @const
   * @since 10062
   * 
   */
  MISS_CODEC_AUDIO_OPUS: 0x408
};
Object.freeze(MISSCodec);
/**
 * 音频sample rate
 * @namespace MISSSampleRate
 */
export const MISSSampleRate = {
  /**
     * 8000
     * @const
     */
  FLAG_AUDIO_SAMPLE_8K: 0,
  /**
     * 16000
     * @const
     */
  FLAG_AUDIO_SAMPLE_16K: 3
};
Object.freeze(MISSSampleRate);
/**
 * 音频 data bits
 * @namespace MISSDataBits
 */
export const MISSDataBits = {
  /**
     * 8bits
     * @const
     */
  FLAG_AUDIO_DATABITS_8: 0,
  /**
     * 16bits
     * @const
     */
  FLAG_AUDIO_DATABITS_16: 1
};
Object.freeze(MISSDataBits);
/**
 * 音频 channel
 * @namespace MISSAudioChannel
 */
export const MISSAudioChannel = {
  /**
     * 单通道
     * @const
     */
  FLAG_AUDIO_CHANNEL_MONO: 0,
  /**
     * 双通道
     * @const
     */
  FLAG_AUDIO_CHANNEL_STERO: 1
};
Object.freeze(MISSAudioChannel);
export const MISSAudioBitRate = {
  /**
     * 8000
     * @const
     */
  FLAG_AUDIO_BIT_RATE_8K: 0,
  /**
     * 16000
     * @const
     */
  FLAG_AUDIO_BIT_RATE_16K: 1,
  /**
   * 32000
   * @const
   */
  FLAG_AUDIO_BIT_RATE_32K: 2
};
Object.freeze(MISSAudioBitRate);
export default class CameraRenderView extends React.Component {
  static propTypes = {
    videoCodec: PropTypes.oneOf([MISSCodec.MISS_CODEC_VIDEO_H264, MISSCodec.MISS_CODEC_VIDEO_H265]),
    audioCodec: PropTypes.oneOf([MISSCodec.MISS_CODEC_AUDIO_G711A, MISSCodec.MISS_CODEC_AUDIO_AAC, MISSCodec.MISS_CODEC_AUDIO_PCM]),
    audioRecordSampleRate: PropTypes.oneOf([MISSSampleRate.FLAG_AUDIO_SAMPLE_8K, MISSSampleRate.FLAG_AUDIO_SAMPLE_16K]),
    audioRecordChannel: PropTypes.oneOf([MISSAudioChannel.FLAG_AUDIO_CHANNEL_MONO, MISSAudioChannel.FLAG_AUDIO_CHANNEL_STERO]),
    audioRecordDataBits: PropTypes.oneOf([MISSDataBits.FLAG_AUDIO_DATABITS_8, MISSDataBits.FLAG_AUDIO_DATABITS_16]),
    audioRecordCodec: PropTypes.oneOf([MISSCodec.MISS_CODEC_AUDIO_OPUS, MISSCodec.MISS_CODEC_AUDIO_G711A, MISSCodec.MISS_CODEC_AUDIO_AAC, MISSCodec.MISS_CODEC_AUDIO_PCM]), // 如果没有配置该类型，则默认为对讲时录音的音频格式与播放声音的音频格式一致。 主要处理部分厂商（华来）的特异性问题，对讲录音音频格式与播放音频格式不一致的问题。
    videoRate: PropTypes.number,
    maximumZoomScale: PropTypes.number,
    minimumZoomScale: PropTypes.number,
    scale: PropTypes.number,
    useLenCorrent: PropTypes.bool,
    correctRadius: PropTypes.number,
    osdx: PropTypes.number,
    osdy: PropTypes.number,
    fullscreenState: PropTypes.bool,
    forceSoftDecode: PropTypes.bool,
    recordingVideoParam: PropTypes.object,
    isFull: PropTypes.bool,
    whiteBackground: PropTypes.bool,
    playRate: PropTypes.number,
    
    /**
       * 用户单击回调
       * @member {func}
       */
    onVideoClick: PropTypes.func,
    /**
     * 缩放的回调
     */
    onScaleChanged: PropTypes.func,
    /**
     * 提供给云台机，向左向右滑动view，让云台机跟着转动
     */
    onPTZDirectionCtr: PropTypes.func,
    ...ViewPropTypes
  };
  render() {
    let did = this.props.did || Device.deviceID;
     return null
  }
  /**
   * 开始渲染视频
   */
  startRender() {
     return null
  }
  /**
   * 停止渲染视频
   */
  stopRender() {
     return null
  }
  /**
   * 开始播放声音
   */
  startAudioPlay() {
     return null
  }
  /**
   * 停止播放声音
   */
  stopAudioPlay() {
     return null
  }
  /**
   * 开始录制声音
   */
  startAudioRecord() {
     return null
  }
  /**
   * 停止录制声音
   */
  stopAudioRecord() {
     return null
  }
  /**
   * 隐藏SurfaceView only for Android
   * @since 10033
   */
  hidesSurfaceView() {
     return null
  }
  /**
   * 开始录像
   * @param {string} 存储位置filePath filePath必须是带 Host.file.storageBasePath前缀的path，native端会校验这个路径合法性。  
   * @param {string} timeCallBackName 录制时长回调 
   * @param {*} did 
   */
  @report
  startRecord(filePath, timeCallBackName, did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
   * 停止录像
   */
  @report
  stopRecord(did = Device.deviceID) {
     return Promise.resolve(null);
  }
  /**
   * 截屏
   * @param {string} 存储位置filePath filePath必须是带 Host.file.storageBasePath前缀的path，native端会校验这个路径合法性。  
   * @param {*} did 
   */
  snapShot(filePath, did = Device.deviceID) {
     return Promise.resolve(null);
  }
}