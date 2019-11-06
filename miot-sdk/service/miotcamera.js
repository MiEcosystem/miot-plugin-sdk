/**
 * @export public
 * @doc_name 智能摄像机模块
 * @doc_index 5
 * @doc_directory service
 * @module miot/service/miotcamera
 * @description 摄像机 API
 *
 */
import { NativeModules, Platform } from 'react-native';
/**
 * MISS 命令
 * @namespace MISSCommand
 */
export const MISSCommand = {
	MISS_CMD_VIDEO_START:           0x102,	/**< C->S, video start */
	MISS_CMD_VIDEO_STOP:            0x103,	/**< C->S, video stop */
	MISS_CMD_AUDIO_START:           0x104,	/**< C->S, audio start */
	MISS_CMD_AUDIO_STOP:            0x105,	/**< C->S, audio stop */
	MISS_CMD_SPEAKER_START_REQ:     0x106,	/**< C->S, speaker start req */
	MISS_CMD_SPEAKER_START_RESP:    0x107,	/**< C->S, speaker start resp */
	MISS_CMD_SPEAKER_STOP:          0x108,	/**< C->S, speaker stop */
	MISS_CMD_STREAM_CTRL_REQ:       0x109,	/**< C->S, video quality req */
	MISS_CMD_STREAM_CTRL_RESP:      0x110,	/**< S->C, video quality response */
	MISS_CMD_GET_AUDIO_FORMAT_REQ:  0x111,	/**< C->S, get audio format */
	MISS_CMD_GET_AUDIO_FORMAT_RESP: 0x112,  /**< S->C, audio format response */
	MISS_CMD_PLAYBACK_REQ:          0x113,	/**< C->S, playback request */
	MISS_CMD_PLAYBACK_RESP:         0x114,	/**< S->C, playback response */
	MISS_CMD_PLAYBACK_SET_SPEED:    0x115,	/**< C->S, playback speed */
	MISS_CMD_DEVINFO_REQ:           0x116,	/**< C->S, device info request */
	MISS_CMD_DEVINFO_RESP:          0x117,	/**< S->C, device info response */
	MISS_CMD_MOTOR_REQ:             0x118,	/**< C->S, device motor control */
	MISS_CMD_MOTOR_RESP:            0x119,	/**< S->C, device motor control response */
};
Object.freeze(MISSCommand)
export default {
    /**
     * 连接设备
     * @param {string} callbackName 链接状态变更回调
     */
    connectToDeviceWithStateChangeCallBack(callbackName) {
         return 
    },
    /**
     * 发送miss命令到设备
     * @param {MISSCommand} command miss 命令
     * @param {object} params 参数
     * @returns {Promise<number>} a promise with return code
     */
    sendP2PCommandToDevice(command, params) {
         return Promise.resolve(null);
    },
    /**
     * 注册接收命令回调
     * @param {string} callbackName 收到p2p command回调
     */
    bindP2PCommandReceiveCallback(callbackName) {
         return 
    /**
     * 发送RDT命令到设备
     * @param {string} params base64 encoded data
     * @returns {Promise<number>} a promise with return code
     */
    sendRDTCommandToDevice(params) {
         return Promise.resolve(null);
    },
    /**
     * 注册接收RDT命令回调
     * @param {string} callbackName 收到RDT回调
     */
    bindRDTDataReceiveCallback(callbackName) {
         return 
}