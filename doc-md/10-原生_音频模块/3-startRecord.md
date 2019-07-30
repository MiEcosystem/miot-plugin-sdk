<a name="module_miot/host/audio.startRecord"></a>

## .startRecord(audioName, settings) ⇒ <code>Promise</code>
开始录音

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| audioName | <code>string</code> | 保存文件名，如 audio.mp3 |
| settings | <code>json</code> | 配置参数{ AVSampleRateKey 采样率 默认44100，                                AVNumberOfChannelsKey 声道，默认2，                                AVLinearPCMBitDepthKey 音频编码比特率 默认16,                                AVFormatIDKey 编码格式(AMR,AMR_WB,MPEG4AAC,MPEG4CELP,MPEG4HVXC,MPEG4TwinVQ,AC3,60958AC3),                                AVEncoderAudioQualityKey 音质(Min,Low,Medium,High,Max)                              } |

