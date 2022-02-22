/**
 * @export public
 * @doc_name 智能摄像机模块
 * @doc_index 7
 * @doc_directory service
 * @module miot/service/miotcamera
 * @description 摄像机 API
 *
 */
import { NativeModules, Platform } from 'react-native';
import { report } from "../decorator/ReportDecorator";
import CameraRenderView, { MISSCodec } from "../ui/CameraRenderView";
/**
 * MISS 命令
 * @namespace MISSCommand
 */
export const MISSCommand = {
  MISS_CMD_VIDEO_START: 0x102,
  /** < C->S, video start */
  MISS_CMD_VIDEO_STOP: 0x103,
  /** < C->S, video stop */
  MISS_CMD_AUDIO_START: 0x104,
  /** < C->S, audio start */
  MISS_CMD_AUDIO_STOP: 0x105,
  /** < C->S, audio stop */
  MISS_CMD_SPEAKER_START_REQ: 0x106,
  /** < C->S, speaker start req */
  MISS_CMD_SPEAKER_START_RESP: 0x107,
  /** < C->S, speaker start resp */
  MISS_CMD_SPEAKER_STOP: 0x108,
  /** < C->S, speaker stop */
  MISS_CMD_STREAM_CTRL_REQ: 0x109,
  /** < C->S, video quality req */
  MISS_CMD_STREAM_CTRL_RESP: 0x10A,
  /** < S->C, video quality response */
  MISS_CMD_GET_AUDIO_FORMAT_REQ: 0x10B,
  /** < C->S, get audio format */
  MISS_CMD_GET_AUDIO_FORMAT_RESP: 0x10C,
  /** < S->C, audio format response */
  MISS_CMD_PLAYBACK_REQ: 0x10D,
  /** < C->S, playback request */
  MISS_CMD_PLAYBACK_RESP: 0x10E,
  /** < S->C, playback response */
  MISS_CMD_PLAYBACK_SET_SPEED: 0x10F,
  /** < C->S, playback speed */
  MISS_CMD_DEVINFO_REQ: 0x110,
  /** < C->S, device info request */
  MISS_CMD_DEVINFO_RESP: 0x111,
  /** < S->C, device info response */
  MISS_CMD_MOTOR_REQ: 0x112,
  /** < C->S, device motor control */
  MISS_CMD_MOTOR_RESP: 0x113, /** < S->C, device motor control response */
  MISS_CMD_CRUISE_STATE_REQ: 0x200,
  MISS_CMD_CRUISE_STATE_RESP: 0x201,
  MISS_CMD_CALL_STATUS_RESP: 0x301
};
Object.freeze(MISSCommand);
/**
 * MISS Error
 * @namespace MISSError
 */
export const MISSError = {
  MISS_NO_ERROR: 0, // 0
  MISS_ERR_CLOSE_BY_LOCAL: 1,
  MISS_ERR_CLOSE_BY_REMOTE: 2,
  MISS_ERR_AUTHORIZED: 3,
  MISS_ERR_CLOSE_BY_TIMEOUT: 4,
  MISS_ERR_NOT_SUPPORT_VENDOR: 5, // 5
  MISS_ERR_ALREADY_INITIALIZED: 6,
  MISS_ERR_NOT_INITIALIZED: 7,
  MISS_ERR_ABORTED: 8,
  MISS_ERR_CREATE_MUTEX: 9,
  MISS_ERR_CREATE_THREAD: 10, // 10
  MISS_ERR_NOT_ENOUGH_MEMORY: 11,
  MISS_ERR_CREATE_SOCKET: 12,
  MISS_ERR_SOCKET_OPTIONS: 13,
  MISS_ERR_SOCKET_BIND: 14,
  MISS_ERR_MAX_SESSION: 15, // 15
  MISS_ERR_SESSION_HANDLE: 16,
  MISS_ERR_TIMOUT: 17,
  MISS_ERR_RPC_SEND: 18,
  MISS_ERR_RPC_JSON_PARSE: 19,
  MISS_ERR_DISCONNECT_TIMOUT: 20, // 20
  MISS_ERR_CREATE_CHANNEL: 21,
  MISS_ERR_INVALID_ARG: 22,
  MISS_ERR_CLIENT_NO_SUPPORT: 23,
  MISS_ERR_MAX_CHANNEL: 24,
  MISS_ERR_NO_RESPONSE: 25, // 25
  MISS_ERR_NO_BUFFER: 26,
  MISS_ERR_CHANNEL_EXCEED_MAX_SIZE: 27,
  MISS_ERR_FUNCTION_ALREADY_CALLED: 28,
  MISS_ERR_FRAME_DECRYPTO: 29,
  MISS_ERR_FRAME_ENCTYPTO: 30, // 30
  MISS_ERR_FUNCTION_DISABLE: 31,
  MISS_ERR_SLEEPING: 32,
  MISS_ERR_OFFLINE: 33,
  MISS_ERR_CONNECT_SERVER: 34 // 34
};
Object.freeze(MISSError);
/**
 * MISS Connection State
 * @namespace MISSConnectState
 */
export const MISSConnectState = {
  MISS_Connection_Disconnected: 0,
  MISS_Connection_Connecting: 1,
  MISS_Connection_Connected: 2,
  MISS_Connection_ReceivedFirstFrame: 3
};
Object.freeze(MISSConnectState);
/**
 * Alarm Event Type
 * @namespace AlarmEventType
 */
export const AlarmEventType = {
  EventType_All: 1 << 0,
  EventType_AI: 1 << 1,
  EventType_Face: 1 << 2,
  EventType_KnownFace: 1 << 3,
  EventType_PeopleMotion: 1 << 4,
  EventType_ObjectMotion: 1 << 5,
  EventType_BabyCry: 1 << 6
};
Object.freeze(AlarmEventType);
/**
 * @export
 */
class IMiotCamera {
    /**
     * 连接设备
     * @param {string} callbackName 链接状态变更回调 { state: MISSConnectState, error: MISSError }
     */
    @report
  connectToDeviceWithStateChangeCallBack(callbackName, did = Device.deviceID) {
     return null
  }
    /**
         * 断开连接设备
         * @since 10033
         */
    @report
    disconnectToDevice(did = Device.deviceID) {
       return null
    }
    /**
         * 发送miss命令到设备
         * @param {MISSCommand} command miss 命令
         * @param {object} paramsJson 参数 要求是符合jsonObj形式的数据
         * @returns {Promise<number>} a promise with return code
         */
    @report
    sendP2PCommandToDevice(command, paramsJson, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 发送miss命令到设备 主要处理部分model发送命令的参数不是json格式，也不是 byte数组编码得到的str，而是普通的字串
     * @param {MISSCommand} command miss 命令  如果是tutk，米家标准的命令号要转为用Miss的命令号，如果是自定义命令 直接发送
     * @param {string} paramStr 参数: string参数，非json 非 base64
     * @returns {Promise<number>} a promise with return code
     */
    @report
    sendP2PCommandToDeviceWithStringParam(command, paramStr, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 发送miss命令到设备 主要处理部分model发送命令的参数不是json格式，而是byte数组形式的命令。 byte数组请用base64编码得到string再调用这个接口。
     * @warn miss固件 android端不支持直接发送byte[]，此时调用该接口会直接返回错误。
     * @param {MISSCommand} command miss 命令  如果是tutk，米家标准的命令号要转为用Miss的命令号，如果是自定义命令 直接发送
     * @param {string} base64Param 参数:  byte[]数组base64 encode后的字串
     * @returns {Promise<number>} a promise with return code
     */
    @report
    sendP2PCommandToDeviceWithBase64Param(command, base64Param, did = Device.deviceID) {
      if (Platform.OS === 'android') {
         return Promise.resolve(null);
      } else {
         return Promise.resolve(null);
      }
    }
    /**
     * 注册接收命令回调
     * @param {string} callbackName 收到p2p command回调 { command: MISSCommand, data: Object/Base64String }
     */
    @report
    bindP2PCommandReceiveCallback(callbackName, did = Device.deviceID) {
       return null
    }
    /**
         * 发送RDT命令到设备
         * @param {object} params json data
         * @returns {Promise<number>} a promise with return code
         */
    @report
    sendRDTJSONCommandToDevice(params, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
         * 发送RDT命令到设备
         * @param {string} params base64 encoded data
         * @returns {Promise<number>} a promise with return code
         */
    @report
    sendRDTCommandToDevice(params, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
         * 注册接收RDT命令回调
         * @param {string} callbackName 收到RDT回调 { data: Object/Base64String }
         */
    @report
    bindRDTDataReceiveCallback(callbackName, did = Device.deviceID) {
       return null
    }
    /**
     * 打开报警视频页面
     * 这个接口按照现有的标准报警视频交互，报警视频列表页筛选项默认有：全部、物体移动、人性移动、AI；如果是vip用户，就再加上人脸、宝宝哭声这两个筛选项；
     * 这里添加这个localRecognizeEvents的目的是：主要处理，部分model不是vip，也会有宝宝哭声的筛选项，这个参数的作用：用户如果不是vip，但是又有默认选项之外的筛选项时，通过这个参数来添加人脸或者宝宝哭声的选项。
     *
     * 现在除创米021那几款摄像头，都只传0就行了
     * @since 10033
     * @param {bool} isNewPlugin 是否是新固件 
     * @param {number} localRecognizeEvents   AlarmEventType 里 几个筛选项的或值。 
     *    isNewPlugin = false的情况下，兼容以前的逻辑，非vip会读localRecognizeEvents变量里是否有宝宝哭声和人脸识别选项,有就展示   vip则包含所有的筛选项
     *    isNewPlugin = true时，localRecognizeEvents的含义：js端由该变量控制显示哪些筛选项，例如v3设备: 非vip  localRecognizeEvents= EventType_All| EventType_PeopleMotion| EventType_ObjectMotion  vip： localRecognizeEvents = EventType_All| EventType_PeopleMotion| EventType_ObjectMotion| EventType_Face| EventType_BabyCry  
     *    AI选项不受该值控制，用户设置了该did的智能选项后，筛选项目里就会有，否则无。
     * @updated 10047
     */
    @report
    showAlarmVideos(localRecognizeEvents, did = Device.deviceID, isNewPlugin = false) { // 为了防止model已经手动传入过did，只能把newPlugin变量放到最后
       return null
    }
    /**
     * 打开回看页面
     * @since 10048
     * @param {data} jsonobj=>str，包含打开回看需要的sdcardStatus, isVip等信息
     * @example 
     *         data = {sdcardGetSuccess: true, sdcardStatus: 0, isVip: false}
     *         Service.miotcamera.showPlaybackVideos(JSON.stringify(data));
     */
    @report
    showPlaybackVideos(data, did = Device.deviceID) {
       return null
    }
    /**
     * 打开长时间无人出现页面
     * @since 10054
     * @param {data} jsonobj
     * @example 
     */
    @report
    openLongTimeNobody(data, did = Device.deviceID) {
       return null
    }
    /**
     * 打开每日故事设置
     * @since 10054
     * @param {data} jsonobj
     * @example 
     */
    @report
    openDailyStorySetting(data, did = Device.deviceID) {
       return null
    }
    /**
         * 打开宝宝睡眠设置
         * @since 10054
         * @param {data} jsonobj
         * @example 
         */
    @report
    openBabySleepSetting(data, did = Device.deviceID) {
       return null
    }
    /**
         * 打开IDM设置
         * @since 10054
         * @param {data} jsonobj
         * @example 
         */
    @report
    openIDMSetting(data, did = Device.deviceID) {
       return null
    }
    /**
     * 打开相册
     * @since 10051
     * @param {data} jsonobj=>str，预留
     * @example 
     *         data = {};
     *         Service.miotcamera.showPlaybackVideos(JSON.stringify(data));
     */
    @report
    showAlbum(data, did = Device.deviceID) {
       return null
    }
    /**
     * 打开设备相册中最新的图片或视频
     * @since 10051
     * @param {data} jsonobj=>str，包含albumName等信息
     * @example 
     *         data = { albumName: albumName};
     *         Service.miotcamera.showLastAlbumMediaFile(JSON.stringify(data));
     */
    @report
    showLastAlbumMediaFile(data, did = Device.deviceID) {
       return null
    }
    /**
     * 获取设备对应的相册名字
     * @since 10051
     */
    @report
    getAlbumName(did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 打开云储存页面
     * @since 10033
     * @param {BOOL} supportHevc 是否支持 H265
     * @param {useV2API} 是否使用 V2 接口
     * @param {did} 默認參數 did
     * @param {cloudStoragePurchaseUrl} @since 10051 默認爲空，兼容以前的邏輯，不是vip就打開攝像頭的雲存購買連接；如果是低功耗設備，需要自己填入雲存購買連接。
     */
    @report
    showCloudStorage(supportHevc, useV2API, did = Device.deviceID, cloudStoragePurchaseUrl = "") {
       return null
    }
    /**
     * 打开云储存设置页面
     * @since 10033
     * @param {did} 默认参数 did
     * @param {aSettingUrl} @since 10053  自定义设置地址。默认为空，兼容以前的逻辑。
     */
    @report
    showCloudStorageSetting(did = Device.deviceID, aSettingUrl = null) {
       return null
    }
    /**
     * 打开报警视频播放页面
     * @since 10037
     * @param data  jsonobj=>str 从push点击跳转进来后，如果是smartscene 就把extra字段捞出来放到这里
     */
    @report
    openAlarmVideoPlayer(data) {
       return null
    }
    /**
     * @param model
     * @param did
     * @returns true, 最新报警视频的时间和事件描述字符串；false，错误描述
     * @since 10047
     */
    @report
    loadMonitoringDetail(model = Device.model, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 打开人脸识别页面
     * @since 10054
     * @param {BOOL} isVip
     * @param did
     * @param {string} aFreeFaceSt 免费人脸状态 OutOfDate Acquired unAcquired
     * @param {string} aBuyVipUrl vip购买链接
     */
    @report
    showFaceRecognize(isVip, did = Device.deviceID, aFreeFaceSt = null, aBuyVipUrl = null) {
       return null
    }
    /**
     *
     * 注册收到数据速率 Bytes per second，每秒回调一次
     * @param {string} callbackName 回调名称 { rate: number }
     * @since 10036
     */
    @report
    bindBPSReceiveCallback(callbackName, did = Device.deviceID) {
       return null
    }
    /*
     * 拉取当前正在播放时间戳 js端控制拉取节奏
     */
    @report
    getCurrentFrameInfo(did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 执行FFmpeg命令
     * @param {object} command string
     * @param {String} callback string
     * @param {Block} complete (eror) =>
     */
    @report
    ffmpegCommand(command, callbackName, complete) {
       return null
    }
    /**
         * 下载m3u8视频并合成mp4
         * @since 10038
         * @param fileId
         * @param filePath
         * @param callbackName
         * @param isAlarm 是否报警视频
         * @param videoCodec 视频编码如 "H264", "H265"
         * @param extra 额外配置参数 iOS {extraPath:xxx 会拼接到获取资源的后面 since 10063 }
         * @returns
         *    state : 1. onStart (开始下载)  2. onComplete（下载完成）  3. onError（失败）  4. onProgress（下载进度）
         *    errorInfo : 失败描述（state = onError时才有）
         *    progress : 下载进度0 - 100 (state = onProgress时才有)
         */
    @report
    downloadM3U8ToMP4(fileId, filePath, callbackName, isAlarm = false, videoCodec = 'H265', did = Device.deviceID, extra = {}) {
        NativeModules.MHCameraSDK.downloadM3U8ToMP4(Device.model, did, fileId, isAlarm, videoCodec, filePath, extra, callbackName);
        return;
      }
      NativeModules.MHCameraSDK.downloadM3U8ToMP4(Device.model, did, fileId, isAlarm, videoCodec, filePath, callbackName);
    }
    /**
     * 取消downloadM3U8ToMP4任务, 只有ios需要这个接口
     * @since 10053
     * @param {*} fileId
     * @param {*} callbackName
     * @param {*} isAlarm
     * @param {*} videoCodec
     * @param {*} did
     */
    @report
    cancelDownloadM3U8ToMP4(fileId, callbackName, isAlarm = false, did = Device.deviceID) {
        NativeModules.MHCameraSDK.cancelDownloadM3U8ToMP4(Device.model, did, fileId, isAlarm, callbackName);
      } else {
        console.log('android use downloadM3U8ToMP4V2 and cancelDownloadM3U8ToMP4V2 from 10053');
      }
    }
    /**
     * 下载m3u8视频并合成mp4，支持合成mp4时统一分辨率，避免视频花屏
     * @since 10053
     * @param fileId
     * @param filePath
     * @param callbackName
     * @param isAlarm 是否报警视频
     * @param videoCodec 视频编码如 "H264", "H265"
     * @param transcode 是否需要把每个子视频转码成相同分辨率后再合成，默认需要转
     * @returns
     *    state : 1. onStart (开始下载)  2. onComplete（下载完成）  3. onError（失败）  4. onProgress（下载进度）
     *    errorInfo : 失败描述（state = onError时才有）
     *    progress : 下载进度0 - 100 (state = onProgress时才有)
     */
    @report
    downloadM3U8ToMP4V2(fileId, filePath, callbackName, isAlarm = false, videoCodec = 'H265', did = Device.deviceID, transcode = true) {
    }
    /**
     * 取消downloadM3U8ToMP4V2任务
     * @since 10053
     * @param {*} fileId
     * @param {*} callbackName
     * @param {*} isAlarm
     * @param {*} did
     */
    @report
    cancelDownloadM3U8ToMP4V2(fileId, callbackName, isAlarm = false, did = Device.deviceID) {
    }
    /**
     * 获取报警视频m3u8播放地址
     * @since 10037
     * @param fileId 视频fileId
     * @param isAlarm 是否报警视频
     * @param videoCodec 视频编码如 "H264", "H265"
     */
    @report
    getVideoFileUrl(fileId, isAlarm, videoCodec, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 获取视频缩略图片接口（如报警视频列表缩略图）
     * @since 10037
     * @param {string} imgStoreId 图片id
     * @returns {Promise<String>} 文件路径
     */
    @report
    getFileIdImage(imgStoreId, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 获取人脸图片接口
     * @since 10040
     * @param {string} faceId 人脸id
     * @returns {Promise<String>} 文件路径
     */
    @report
    getFaceImgWithDid(faceId, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 获取通用图片接口（如云存储视频缩略图）
     * @since 10041
     * @param {string} imgId 图片唯一标识ID 如imgStoreId
     * @param {string} hostParams json字符串，接口信息: 如获取云存储缩略图{"prefix":"business.smartcamera.", "method":"GET", "path":"/miot/camera/app/v1/img"}   注：key固定的
     * @param {string} pathParams json字符串，请求参数: 如获取云存储缩略图{"did":"xxxx", "fileId":"xxxx", "stoId":"xxxxxxxx"}
     * @returns {Promise<String>} 文件路径
     */
    @report
    getCommonImgWithParams(imgId, hostParams, pathParams, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 通知native端现在是不是回看时间轴模式
     * @since 10038
     * @param {boolean} isTimelinePlayback 是不是回看时间轴模式
     * @returns {null}
     */
    @report
    setTimelinePlaybackMode(isTimelinePlayback, did = Device.deviceID) {
       return null
    }
    /**
     * 绑定回调，native端 在时间轴回看的模式下，如果从点播切换成直播了，就通过这个回调告诉js端
     * @since 10038
     * @param {string} timelinePlaybackEndListenerName native端在回看时间轴模式下，从点播切换成直播了，通过DeviceEmitter发送这个时间给js端
     * @returns {null}
     */
    @report
    bindTimelinePlaybackEndListener(timelinePlaybackEndListenerName, did = Device.deviceID) {
       return null
    }
    /**
     * 获取当前语音对讲过程中的音量大小
     * @since 10038
     * return {promise}
     */
    @report
    getCurrentSpeakerVolumn(did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 设置当前model是不是miss固件
     * @param boolean isMissFirmware  是否是miss固件，true 是； false tutk固件。
     * @since 10038
     */
    @report
    setCurrentDeviceIsMissFirmware(isMissFirmware, did = Device.deviceID) {
       return null
    }
    /**
     * 打开摄像机NAS存储设置页面。
     *
     * @since 10038
     *
     */
    @report
    showNASSetting(did = Device.deviceID) {
       return null
    }
    /**
     * 开启悬浮窗模式
     * @since 10039
     */
    @report
    openFloatWindow(did = Device.deviceID) {
      if (Platform.OS == "android") {
         return Promise.resolve(null);
      } else {
        return Promise.reject("unsupported operation for ios platform");
      }
    }
    /**
     * 关闭悬浮窗
     * @since 10040
     */
    @report
    closeFloatWindow(did = Device.deviceID) {
      if (Platform.OS == "android") {
         return null
      } else {
        return Promise.reject("unsupported operation for ios platform");
      }
    }
    /**
     * 绑定摄像头的报警视频到微信米家公众号里，有报警视频推送到微信公共号
     * @since 10040
     */
    @report
    tryBindAlarmNotifyWithWechatMijia(did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 查询设备的pipUid和password，提供给部分model进行固件交互
     * 仅仅允许华来部分model使用，其他model访问会得到一个错误。
     * resolve返回的值即为服务器返回的json字串。
     * @param did 设备did
     * @since 10041
     */
    @report
    queryDevicePassword(did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 设置当前设备为直连模式，使用固定的uid 和 password连接设备，目前只有华来的小方设备使用到了该功能。
     * 切换直连为非直连模式，需要断开原有连接，设置该接口为false，重新连接设备。
     * 先设置是否是miss固件，在调用连接前设置该接口。
     * @param isUseFixedUid 是否使用直连模式， 默认false
     * @param did 设备did
     * @since 10047
     */
    @report
    setCurrentDeviceUseFixedUid(isUseFixedUid, did = Device.deviceID) {
       return null
    }
    /**
     * 使用chacha20_xor解密大文件
     * @param {string} fileData byte array encoded into string 待解密的文件体
     * @param {*} nonce byte array encoded into string chacha20_xor解密需要的nonce
     * @param {*} shareKey  byte array encoded into string chacha20_xor解密需要的sharekey
     * @since 10041, for ios from 10062
     */
    @report
    decryptBigFile(fileData, nonce, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 使用chacha20_xor解密小文件
     * @param {string} fileData byte array base64 encoded into string 待解密的文件体
     * @param {string} nonce byte array base64 encoded into string chacha20_xor解密需要的nonce
     * @param {string} shareKey  byte array base64 encoded into string chacha20_xor解密需要的sharekey
     * @since 10041, for ios from 10062
     */
    @report
    decryptSmallFile(fileData, nonce, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 标记当前是否使用华来的音视频解密方案，只对tutk生效，需要在连接成功之后，收到视频流之前调用
     * @param {bool} isEncrypted
     * @param {string} did
     * @since 10042
     */
    @report
    markCurrentDeviceUseHualaiEncrypted(isEncrypted, did = Device.deviceID) {
       return null
    }
    /**
     * 在连接成功后，发送rdt命令前调用，标记当前设备是否使用固定rdtChannel方案。
     * @param {bool} useFixedRdtChannel
     * @param {string} did
     * @since 10042
     */
    @report
    setCurrentDeviceUseFixedRdtChannel(useFixedRdtChannel, did = Device.deviceID) {
       return null
    }
    /**
     * 设置开启/关闭ijk解码。
     * @param {bool} isEnableIjk 是否开启ijk 一启用，所有的设备都会被启用。
     * @param {string} did
     * @since 10043
     */
    @report
    setUseIjkDecoderGlobal(isEnableIjk, did = Device.deviceID) {
      if (Platform.OS == "android") {
         return null
      } else {
        return Promise.reject("ios platform not support yet; to be done");
      }
    }
    /**
     * 设置speaker变声类型,    初次设置会触发初始化，后续simpleRate or channel发生改变 都不会触发初始化。
     * @param {int} simpleRate  音频采样率  与CameraRenderView里定义的MISSSampleRate一致
     * @param {int} type 变声类型，目前米家只提供 0 == 正常  1 == 小丑  2 == 大叔这三种类型 10055 增加 3 == 青年
     * @param {int} channel 单双通道 1 单声道， 2 立体声   默认为1
     * @param {string} did
     */
    @report
    setCurrrentVoiceChangerType(simpleRate, type, channel = 1, did = Device.deviceID) {
       return null
    }
    /**
     * 打开门铃的带屏设备联动页面
     * @param {bool} isMultiChoice
     * @param {number} screenCount
     * @param {string} did
     * @since 10044
     */
    @report
    showScreenLinkagePage(isMultiChoice, screenCount, did = Device.deviceID) {
       return null
    }
    /**
     * 打开云存下载列表页面
     * @param {string} did
     *
     * @since 10046
     */
    @report
    openCloudSettingDownloadListPage(did = Device.deviceID) {
       return null
    }
    /**
     * 下载云存视频到 云存管理-》下载列表里
     * promise仅仅代表提交任务时是否成功；
     * 监听任务状态 需要通过EventEmitter监听 cloudVideoDownloadProgressCallbackName
     *
     * EventEmitter里返回的数据解释:
     * status: 0 下载错误  1 开始下载  2 停止下载  3 下载结束 4 下载取消  (Android端目前仅有onFinish回调 status:3)
     * errorCode:错误码  0代表无错误。
     * fileId:当前哪个fileId 对应的视频下载状态
     *
     * @param {*} did
     * @param {*} fileId 视频的fileId
     * @param {*} isAlarmFile 是否是报警视频(短视频 true)/云存视频(长视频 false)
     * @param {*} startTime 视频的开始时间
     * @param {*} duration 视频的duration，通过播放器返回的时长或者其他方式获取到
     * @param {*} register true时 native 层会监听下载状态并发送cloudVideoDownloadProgressCallbackName, false时取消监听并停止发送
     * @param {*} thumbId 视频缩略图id
     *
     * @since 10047
     */
    @report
    downloadCloudVideoIntoCloudSetting(did, fileId, isAlarmFile, startTime, duration, register = true, thumbId = null) {
      // @ native :=> promise
      return new Promise((resolve, reject) => {
        NativeModules.MHCameraSDK.downloadCloudVideoIntoCloudSetting(did, fileId, isAlarmFile, startTime, duration, register, thumbId, (result, data) => {
          if (result) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    }
    /**
     * 下载mp4类型的云存视频
     * @param {string} did 设备did
     * @param {string} fileId 从服务端拿到的fileId
     * @param {string} stoId 从服务器端拿到的stoId
     * @since 10047
     */
    @report
    downloadCloudVideoMp4(fileId, stoId, did = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 将携带g711音频的mp4视频 转换成 aac音频的mp4视频，返回resolve的情况下，filepath对应的文件被替换成aac mp4文件了。
     * @param {string} filePath 必须是以Host.file.storageBasePath 作为前缀开始传入。
     * @param {object} audioParam {sampleRate:MISSSampleRate.FLAG_AUDIO_SAMPLE_8K, channel:MISSAudioChannel.FLAG_AUDIO_CHANNEL_MONO, bitRate:MISSAudioBitRate.FLAG_AUDIO_BIT_RATE_16K}
     * @since 10047
     */
    @report
    convertG711VideoIntoAACVideo(filePath, audioParam) {
       return Promise.resolve(null);
    }
    /**
     * react-native-video 截屏，用来截video标签里video控件的内容
     * @param {number} viewRef - scrollView的引用
     * @param {string} imagePath - 存储图片的位置，必须以Host.file.baseStoragePath开始，再加上文件存储名
     * @returns {Promise<string>}
     * 成功时：{"code":xxxx}
     * 失败时：{"code":xxx, "message":"xxx" }
     * @example
     *  let findNodeHandle = require('findNodeHandle');
     *  let reactNativeVideo = findNodeHandle(this.refs.reactNativeVideo);
     *  Service.miotcamera.reactNativeVideoScreenShot(reactNativeVideo, Host.file.storageBasePath + '/test2.png').then(result=>{
     *      console.log(result);
     *  });
     * 
     *  @since 10049
     */
    @report
    reactNativeVideoScreenShot(viewRef, imagePath) {
       return Promise.resolve(null);
    }
    /**
     * @param paramsJson 包含如下参数：
     * @param {string} videoPath h264 或者h265的源文件绝对路径  必须以Host.file.storageBasePath开始
     * @param {CameraRenderView.MISSCodec} videoType 视频源文件的路径 MISSCodec里定义的h264 或者h265
     * @param {string} aacAudioPath aac 的源文件路径  没有就填写 ""   有值时必须以Host.file.storageBasePath开始, 音频文件只支持aac格式
     * @param {string} targetPath 最终的输出文件目录 同上，必须以Host.file.storageBasePath开始
     * 以下参数只用于ios
     * @param {int} fps
     * @param {int} videoWidth
     * @param {int} videoHeight
     *
     * Android json demo：
        {"videoPath":vPath,
        "videoType": vType,
        "aacAudioPath": aacAPath,
        "targetPath": tPath}
     *
     * IOS json demo：
        {"videoPath":vPath,
        "videoType": vType,
        "aacAudioPath": aacAPath,
        "targetPath": tPath,
        "fps": fps,
        "videoWidth": vWidth,
        "videoHeight": vHeight}
     * 
     * @since 10050
     */
    @report
    convertH26xVideoIntoMp4(paramsJson) {
       return Promise.resolve(null);
    }
    /**
     * 启动设备设备联动页面
     * @param {string} srid from getRecommend
     * @param {string} did
     * @param {string} model
     * @since 10052
     */
    @report
    launchRecommend(srid, did = Device.deviceID, model = Device.model) {
      return new Promise((resolve, reject) => {
        NativeModules.MHCameraSDK.launchRecommend(srid, did, model, (result, data) => {
          if (result) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    }
    /**
     * 打开推荐运营位页面
     * @param data  jsonobj=>str 推荐运营位链接，sd卡状态等信息
     * @param {string} did
     * @since 10053
     * @example 
     *     let data = { h5Url: this.bannerItem.h5Url, sdcardGetSuccess: true, sdcardStatus: this.sdcardCode };
     *     Service.miotcamera.showOperationBannerPage(data);
     */
    @report
    showOperationBannerPage(data, did = Device.deviceID) {
       return null
    }
    /**
     * @param isPadFullScreen 是否希望进入pad下的全屏， 设置为true，会把画面铺满屏幕，设置为false，会恢复画面
     */
    @report
    enterFullscreenForPad(isPadFullScreen) {
      // native :=> null
      NativeModules.MHCameraSDK.enterFullscreenForPad(isPadFullScreen);
    }
    /**
     * 过滤视频帧
     * @param aFilter  过滤器信息 当前支持timestamp_s EX:{timestamp_s: 666666}过滤时间戳为666666的视频帧; null取消filter
     * @param aCbName  过滤到相应帧后通过aCbName 返回base64格式数据
     * @param {string} aDid 设备id
     * @since 10055
     * @example 
     *     ThumbFilter = “timestampfilter”;
     *     DeviceEventEmitter.addListener(ThumbFilter, (aBase64Frame)=>{xxx});
     *     Service.miotcamera.setFrameFilter({ timestamp_s: 666666 }, ThumbFilter);
     *     Service.miotcamera.setFrameFilter({ timestamp_s: [555555, 666666] }, ThumbFilter); 过滤多个timestamp
     */
    @report
    setFrameFilter(aFilter, aCbName, aDid = Device.deviceID) {
      // native :=> null
      NativeModules.MHCameraSDK.setFrameFilter(aFilter, aCbName, aDid);
    }
    /**
     * 发送tutk 函数类型命令
     * @param args  {name:"IOTC_WakeUp_WakeDevice"}
     * @param {string} aDid 设备id
     * @since 10055
     * @example 
     *     Service.miotcamera.callTutkSpecial({name:"IOTC_WakeUp_WakeDevice"}).then(xxx).catch(yyy);
     */
    @report
    callTutkSpecial(args, aDid = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 发送audio 数据
     * @param aDatInBase64  audio数据 base64编码
     * @param aHeaderInBase64  audio数据头 base64编码
     * @param aCodeId audio codecid默认MISSCodec.MISS_CODEC_AUDIO_G711A
     * @param {string} aDid 设备id
     * @since 10055
     * @example 
     *     Service.miotcamera.sendP2PCommandToDevice(MISSCommand.MISS_CMD_SPEAKER_START_REQ, {})
     *     收到回复 MISSCommand.MISS_CMD_SPEAKER_START_RESP 之后可以发送
     *     Service.miotcamera.sendAudioData(data, header).then(xxx).catch(yyy);
     */
    @report
    sendAudioData(aDatInBase64, aHeaderInBase64, aCodeId = MISSCodec.MISS_CODEC_AUDIO_G711A, aDid = Device.deviceID) {
       return Promise.resolve(null);
    }
    /**
     * 设置 moveType change时回调回来的callbackName，js端使用DeviceEventEmitter监听，  返回数据{currentMoveType: xxx}
     * 仅仅适合华来摄像头特定业务场景。
     * @param {string} did 
     * @param {string} callbackName 
     * 
     * @since 10056
     */
    @report
    bindMoveTypeChangeCallback(callbackName, did = Device.deviceID) {
       return null
    }
    /**
     * @since 10058
     * @param {拍照或者相册得到的图片路径} imagePath 
     * @param {did} did 
     */
    @report
    uploadImageToCameraServer(imagePath, did = Device.deviceID) {
       return Promise.resolve(null);
       return end
       return Promise.resolve(null);
       return end
       return Promise.resolve(null);
       return end
       return Promise.resolve(null);
       return end
       return Promise.resolve(null);
    }
    /**
   * 下载m3u8视频并合成mp4，支持合成mp4时统一分辨率，避免视频花屏
   * @since 10066
   * @param fileId 视频文件的fileId
   * @param url 视频文件交给播放器播放的url （使用getVideoFileUrlV2换过来的视频地址）
   * @param filePath 下载视频完成后 视频的存储路径，要求必须以Host.storageBasePath开始
   * @param callbackName 下载进度回调
   * @param did did
   * @returns
   *    state : 1. onStart (开始下载)  2. onComplete（下载完成）  3. onError（失败）  4. onProgress（下载进度）
   *    errorInfo : 失败描述（state = onError时才有）
   *    progress : 下载进度0 - 100 (state = onProgress时才有)
   */
     @report
    downloadM3U8ToMP4ByUrl(fileId, url, filePath, callbackName, did = Device.deviceID) {
    }
}
const MiotCameraInstance = new IMiotCamera();
export default MiotCameraInstance;