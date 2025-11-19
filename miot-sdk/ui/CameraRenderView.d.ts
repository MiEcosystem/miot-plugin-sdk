export namespace MISSCodec {
    const MISS_CODEC_VIDEO_H264: number;
    const MISS_CODEC_VIDEO_H265: number;
    const MISS_CODEC_AUDIO_G711U: number;
    const MISS_CODEC_AUDIO_G711A: number;
    const MISS_CODEC_AUDIO_AAC: number;
    const MISS_CODEC_AUDIO_PCM: number;
    const MISS_CODEC_AUDIO_OPUS: number;
}
export namespace MISSSampleRate {
    const FLAG_AUDIO_SAMPLE_8K: number;
    const FLAG_AUDIO_SAMPLE_16K: number;
}
export namespace MISSDataBits {
    const FLAG_AUDIO_DATABITS_8: number;
    const FLAG_AUDIO_DATABITS_16: number;
}
export namespace MISSAudioChannel {
    const FLAG_AUDIO_CHANNEL_MONO: number;
    const FLAG_AUDIO_CHANNEL_STERO: number;
}
export namespace MISSAudioBitRate {
    const FLAG_AUDIO_BIT_RATE_8K: number;
    const FLAG_AUDIO_BIT_RATE_16K: number;
    const FLAG_AUDIO_BIT_RATE_32K: number;
}
export default class CameraRenderView extends React.Component<any, any, any> {
    static propTypes: any;
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    cameraGLView: any;
    /**
     * 开始渲染视频
     */
    startRender(): void;
    /**
     * 停止渲染视频
     */
    stopRender(): void;
    /**
     * 开始播放声音
     */
    startAudioPlay(): void;
    /**
     * 停止播放声音
     */
    stopAudioPlay(): void;
    /**
     * 开始录制声音
     */
    startAudioRecord(enableAEC?: boolean): void;
    /**
     * 停止录制声音
     */
    stopAudioRecord(): void;
    /**
     * 隐藏SurfaceView only for Android
     * @since 10033
     */
    hidesSurfaceView(): void;
    /**
     * 开始录像
     * @param {string} 存储位置filePath filePath必须是带 Host.file.storageBasePath前缀的path，native端会校验这个路径合法性。
     * @param {string} timeCallBackName 录制时长回调
     * @param {*} did
     */
    startRecord(filePath: any, timeCallBackName: string, did?: any): Promise<any>;
    /**
     * 停止录像
     */
    stopRecord(did?: string): Promise<any>;
    /**
     * 截屏
     * @param {string} 存储位置filePath filePath必须是带 Host.file.storageBasePath前缀的path，native端会校验这个路径合法性。
     * @param {*} did
     */
    snapShot(filePath: any, did?: any): Promise<any>;
}
import React from "react";