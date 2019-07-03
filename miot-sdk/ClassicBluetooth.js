/**
 * @export public
 * @doc_name 经典蓝牙模块
 * @doc_index 5
 * @module miot/Bluetooth
 * @description 经典蓝牙设备操作类  仅支持Android
 *
 * @example
 *
 *
 */
export default {
    /**
     * 初始化经典蓝牙
     * @returns {Promise<any>}
     */
    create(){
         return Promise.resolve(null);
    },
    /**
     * 根据device 的mac 地址，与中心设备建立socket 链接
     * @param {string} macAddress   中心设备mac地址
     * @param {string} transport  连接中心设备的相应服务的UUID
     * @returns {Promise<any>}
     */
    connectSocket(macAddress, transportUUID){
         return Promise.resolve(null);
    },
    /**
     * 断开与中心设备的socket连接
     * @returns {Promise<any>}
     */
    disconnectSocket(){
         return Promise.resolve(null);
    },
    /**
     * 向蓝牙设备写入数据
     * @param {string} data
     * @returns {Promise<any>}
     */
    write(data){
         return Promise.resolve(null);
    },
    /**
     * 事先准备要需要的BluetoothProfile, 具体的类型是profile, 具体的数值参考Android Api: BluetoothProfile.HEADSET，BluetoothProfile.A2DP
     * @param {int} profile
     * @returns {Promise<any>}
     */
    prepareBluetoothProfile(profile){
         return Promise.resolve(null);
    },
    /**
     *  连接类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务
     * @param {string} macAddress   需要查询的设备macAddress
     * @param {int} profile  BluetoothProfile 接口类的类型（ BluetoothProfile.HEADSET，BluetoothProfile.A2DP等）
     * @returns {Promise<any>}
     */
    connectBluetoothProfile(macAddress, profile){
         return Promise.resolve(null);
    },
    /**
     * 断开类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务
     * @param {string} macAddress
     * @param {int} profile
     * @returns {Promise<any>}
     */
    disconnectBluetoothProfile(macAddress, profile){
         return Promise.resolve(null);
    },
    /**
     * 获取类型为profile的BluetoothProfile的当前状态
     * @param {string} macAddress
     * @param {int} profile
     * @returns {Promise<any>}
     */
    getBluetoothProfileState(macAddress, profile){
         return Promise.resolve(null);
    },
    /**
     * 销毁蓝牙服务
     * @returns {Promise<any>}
     */
    destroy(){
         return Promise.resolve(null);
    }
}
export const ClassicBluetoothEvent = {
    classicBlueBondStateChanged: {
    },
    classicBlueConnectionStateChanged: {
    },
    classicBlueReceivedData: {
    },
}
buildEvents(ClassicBluetoothEvent);