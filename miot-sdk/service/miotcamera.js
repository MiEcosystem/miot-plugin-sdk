/**
 * @export public
 * @doc_name 智能摄像机模块
 * @doc_index 7
 * @doc_directory service
 * @module miot/service/miotcamera
 * @description 摄像机 API
 *
 */
//@native
import {Device} from "miot"
import { NativeModules, Platform } from 'react-native';
/**
 * MISS 命令
 * @namespace MISSCommand
 */
export const MISSCommand = {
    MISS_CMD_VIDEO_START: 0x102,	/**< C->S, video start */
    MISS_CMD_VIDEO_STOP: 0x103,	/**< C->S, video stop */
    MISS_CMD_AUDIO_START: 0x104,	/**< C->S, audio start */
    MISS_CMD_AUDIO_STOP: 0x105,	/**< C->S, audio stop */
    MISS_CMD_SPEAKER_START_REQ: 0x106,	/**< C->S, speaker start req */
    MISS_CMD_SPEAKER_START_RESP: 0x107,	/**< C->S, speaker start resp */
    MISS_CMD_SPEAKER_STOP: 0x108,	/**< C->S, speaker stop */
    MISS_CMD_STREAM_CTRL_REQ: 0x109,	/**< C->S, video quality req */
    MISS_CMD_STREAM_CTRL_RESP: 0x10A,	/**< S->C, video quality response */
    MISS_CMD_GET_AUDIO_FORMAT_REQ: 0x10B,	/**< C->S, get audio format */
    MISS_CMD_GET_AUDIO_FORMAT_RESP: 0x10C,  /**< S->C, audio format response */
    MISS_CMD_PLAYBACK_REQ: 0x10D,	/**< C->S, playback request */
    MISS_CMD_PLAYBACK_RESP: 0x10E,	/**< S->C, playback response */
    MISS_CMD_PLAYBACK_SET_SPEED: 0x10F,	/**< C->S, playback speed */
    MISS_CMD_DEVINFO_REQ: 0x110,	/**< C->S, device info request */
    MISS_CMD_DEVINFO_RESP: 0x111,	/**< S->C, device info response */
    MISS_CMD_MOTOR_REQ: 0x112,	/**< C->S, device motor control */
    MISS_CMD_MOTOR_RESP: 0x113,	/**< S->C, device motor control response */
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
    MISS_ERR_NOT_SUPPORT_VENDOR: 5,// 5
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
    MISS_ERR_CONNECT_SERVER: 34, // 34
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
    MISS_Connection_ReceivedFirstFrame: 3,
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
    EventType_BabyCry: 1 << 6,
};
Object.freeze(AlarmEventType);
export default {
    /**
     * 连接设备
     * @param {string} callbackName 链接状态变更回调 { state: MISSConnectState, error: MISSError }
     */
    connectToDeviceWithStateChangeCallBack(callbackName) {
        //@native :=>
        if (Platform.OS === 'android') {
            NativeModules.MHCameraSDK.startConnect(Device.deviceID, callbackName);
        } else {
            NativeModules.MHCameraSDK.connectToDeviceWithDid(Device.deviceID, Device.model, callbackName);
        }
        //@native end
    },
    /**
     * 断开连接设备
     * @since 10033
     */
    disconnectToDevice() {
        //@native :=>
        if (Platform.OS === 'android') {
            // console.log('待实现')
          NativeModules.MHCameraSDK.release(Device.deviceID)
        } else {
            return new Promise((resolve, reject) => {
                NativeModules.MHCameraSDK.c(Device.deviceID, (result, retCode) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(retCode);
                    }
                });
            })
        }
        //@native end
    },
    /**
     * 发送miss命令到设备
     * @param {MISSCommand} command miss 命令
     * @param {object} params 参数
     * @returns {Promise<number>} a promise with return code
     */
    sendP2PCommandToDevice(command, params) {
        //@native :=> promise
        if (Platform.OS === 'android') {
            return new Promise((resolve, reject) => {
                NativeModules.MHCameraSDK.sendServerCmd(Device.deviceID, command, JSON.stringify(params), (result, retCode) => {
                    if (result) {
                        resolve(retCode);
                    } else {
                        reject(retCode);
                    }
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                NativeModules.MHCameraSDK.sendP2PCommandToDeviceWith(Device.deviceID, command, params, (result, retCode) => {
                    if (result) {
                        resolve(retCode);
                    } else {
                        reject(retCode);
                    }
                });
            });
        }
        //@native end
    },
    /**
     * 注册接收命令回调
     * @param {string} callbackName 收到p2p command回调 { command: MISSCommand, data: Object/Base64String }
     */
    bindP2PCommandReceiveCallback(callbackName) {
        //@native :=>
        NativeModules.MHCameraSDK.bindP2PCommandReceiveWithDid(Device.deviceID, callbackName);
        //@native
    },
    /**
     * 发送RDT命令到设备
     * @param {object} params json data
     * @returns {Promise<number>} a promise with return code
     */
    sendRDTJSONCommandToDevice(params) {
        //@native :=> promise
        if (Platform.OS === 'android') {
            return new Promise((resolve, reject) => {
                NativeModules.MHCameraSDK.sendRDTCommandToDevice(Device.deviceID, JSON.stringify(params), (result, retCode) => {
                    if (result) {
                        resolve(retCode);
                    } else {
                        reject(retCode);
                    }
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                NativeModules.MHCameraSDK.sendRDTCommandJSONToDeviceWith(Device.deviceID, params, (result, retCode) => {
                    if (result) {
                        resolve(retCode);
                    } else {
                        reject(retCode);
                    }
                });
            });
        }
        //@native end
    },
    /**
     * 发送RDT命令到设备
     * @param {string} params base64 encoded data
     * @returns {Promise<number>} a promise with return code
     */
    sendRDTCommandToDevice(params) {
        //@native :=> promise
        if (Platform.OS === 'android') {
            return new Promise((resolve, reject) => {
                NativeModules.MHCameraSDK.sendRDTCommandToDevice(Device.deviceID, params, (result, retCode) => {
                    if (result) {
                        resolve(retCode);
                    } else {
                        reject(retCode);
                    }
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                NativeModules.MHCameraSDK.sendRDTCommandToDeviceWith(Device.deviceID, params, (result, retCode) => {
                    if (result) {
                        resolve(retCode);
                    } else {
                        reject(retCode);
                    }
                });
            });
        }
        //@native end
    },
    /**
     * 注册接收RDT命令回调
     * @param {string} callbackName 收到RDT回调 { data: Object/Base64String }
     */
    bindRDTDataReceiveCallback(callbackName) {
        //@native :=>
        if (Platform.OS === 'android') {
            NativeModules.MHCameraSDK.bindRDTDataReceiveCallback(Device.deviceID, callbackName);
        } else {
            NativeModules.MHCameraSDK.bindRDTDataReceiveWithDid(Device.deviceID, callbackName);
        }
        //@native
    },
    /**
     * 打开报警视频页面
     * @since 10033
     * @param {number} AlarmEventType 取或
     */
    showAlarmVideos(localRecognizeEvents) {
        NativeModules.MHCameraSDK.showAlarmVideos(Device.deviceID, localRecognizeEvents)
    },
    /**
     * 打开云储存页面
     * @since 10033
     * @param {BOOL} supportHevc 是否支持 H265
     * @param {useV2API} 是否使用 V2 接口
     */
    showCloudStorage(supportHevc, useV2API) {
        NativeModules.MHCameraSDK.showCloudStorage(Device.deviceID, supportHevc, useV2API)
    },
    /**
     * 打开云储存设置页面
     * @since 10033
     */
    showCloudStorageSetting() {
        NativeModules.MHCameraSDK.showCloudStorageSetting(Device.deviceID)
    },
    /**
     * 打开人脸识别页面
     * @since 10033
     * @param {BOOL} isVip
     */
    showFaceRecognize(isVip) {
        NativeModules.MHCameraSDK.showFaceRecognize(Device.deviceID, isVip)
    },
     
    /* 注册收到数据速率 Bytes per second，每秒回调一次
     * @param {string} callbackName 回调名称 { rate: number }
     */
    bindBPSReceiveCallback(callbackName) {
        //@native :=>
        NativeModules.MHCameraSDK.bindBpsDataCallback(Device.deviceID, callbackName);
        //@native
    }
}