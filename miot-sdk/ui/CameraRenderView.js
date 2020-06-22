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
 * @property {number} videoRate 视频fps
 * @property {number} maximumZoomScale 最大缩放比例 默认2.0
 * @property {number} minimumZoomScale 最小缩放比例 默认1.0
 * @property {number} scale 缩放比例 默认1.0
 * @property {bool} useLenCorrent 是否开启畸变矫正 default true
 * @property {number} correctRadius 畸变矫正-radius default 1.1
 * @property {number} osdx 畸变矫正-osdx default 0.0
 * @property {number} osdy 畸变矫正-osdy default 0.0
 * @property {bool} fullscreenState 是否是全屏状态 since 10033
 * @property {bool} forceSoftDecode 强制软解 since 10033
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
     * G711
     * @const
     */
  MISS_CODEC_AUDIO_G711A: 0x403,
  /**
     * AAC
     * @const
     */
  MISS_CODEC_AUDIO_AAC: 0x406
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
export default class CameraRenderView extends React.Component {
    static propTypes = {
      videoCodec: PropTypes.oneOf([MISSCodec.MISS_CODEC_VIDEO_H264, MISSCodec.MISS_CODEC_VIDEO_H265]),
      audioCodec: PropTypes.oneOf([MISSCodec.MISS_CODEC_AUDIO_G711A, MISSCodec.MISS_CODEC_AUDIO_AAC]),
      audioRecordSampleRate: PropTypes.oneOf([MISSSampleRate.FLAG_AUDIO_SAMPLE_8K, MISSSampleRate.FLAG_AUDIO_SAMPLE_16K]),
      audioRecordChannel: PropTypes.oneOf([MISSAudioChannel.FLAG_AUDIO_CHANNEL_MONO, MISSAudioChannel.FLAG_AUDIO_CHANNEL_STERO]),
      audioRecordDataBits: PropTypes.oneOf([MISSDataBits.FLAG_AUDIO_DATABITS_8, MISSDataBits.FLAG_AUDIO_DATABITS_16]),
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
      /**
         * 用户单击回调
         * @member {func}
         */
      onVideoClick: PropTypes.func,
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
     */
    snapShot(filePath, did = Device.deviceID) {
       return Promise.resolve(null);
    }
}