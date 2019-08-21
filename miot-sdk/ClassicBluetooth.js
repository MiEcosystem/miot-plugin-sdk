/**
 * @export public
 * @doc_name 经典蓝牙模块
 * @doc_index 2
 * @doc_directory bluetooth
 * @module miot/ClassicBluetooth
 * @description 经典蓝牙设备操作类  仅支持Android, sdk 10023 提供支持
 * @since 10023
 *
 *
 */
export default {
    /**
     * 初始化经典蓝牙,返回的数据没有实际作用, 执行到catch表示初始化失败
     * @since 10023
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    create() {
         return Promise.resolve(null);
    },
    /**
     * 根据device 的mac 地址，与中心设备建立socket 链接, 返回的数据没有实际作用, 执行到catch表示连接失败
     * @since 10023
     * @param {string} macAddress   中心设备mac地址
     * @param {string} transport  连接中心设备的相应服务的UUID
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    connectSocket(macAddress, transportUUID) {
         return Promise.resolve(null);
    },
    /**
     * 断开与中心设备的socket连接, 返回的数据没有实际作用, 执行到catch表示断开连接失败
     * @since 10023
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    disconnectSocket() {
         return Promise.resolve(null);
    },
    /**
     * 向蓝牙设备写入数据, 返回的数据没有实际作用, 执行到catch表示写失败
     * @since 10023
     * @param {string} data
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    write(data) {
         return Promise.resolve(null);
    },
    /**
     * 事先准备要需要的BluetoothProfile, 具体的类型是profile, 具体的数值参考Android Api: BluetoothProfile.HEADSET，BluetoothProfile.A2DP
     * HEADSET = 1;A2DP = 2;HEALTH = 3;
     * @since 10023
     * @param {int} profile
     * @returns {Promise<any>} 成功进入then, 返回对应的profile，失败进入catch
     */
    prepareBluetoothProfile(profile) {
         return Promise.resolve(null);
    },
    /**
     * 连接类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务
     * @since 10023
     * @param {string} macAddress   需要查询的设备macAddress
     * @param {int} profile  BluetoothProfile 接口类的类型（ BluetoothProfile.HEADSET，BluetoothProfile.A2DP等）
     * @returns {Promise<any>} 成功进入then, 返回值没有实际作用，失败进入catch
     */
    connectBluetoothProfile(macAddress, profile) {
         return Promise.resolve(null);
    },
    /**
     * 断开类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务
     * @since 10023
     * @param {string} macAddress
     * @param {int} profile
     * @returns {Promise<any>}  成功进入then, 返回值没有实际作用，失败进入catch
     */
    disconnectBluetoothProfile(macAddress, profile) {
         return Promise.resolve(null);
    },
    /**
     * 获取类型为profile的BluetoothProfile的当前状态, 返回值有四个选项,参考android api : BluetoothProfile.STATE_DISCONNECTED等
     * STATE_DISCONNECTED = 0; STATE_CONNECTING = 1;STATE_CONNECTED = 2;TATE_DISCONNECTING = 3;
     * @since 10023
     * @param {string} macAddress
     * @param {int} profile
     * @returns {Promise<any>}  成功进入then, 返回值{"state": 0}，失败进入catch
     */
    getBluetoothProfileState(macAddress, profile) {
         return Promise.resolve(null);
    },
    /**
     * 销毁蓝牙服务
     * @since 10023
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    destroy() {
         return Promise.resolve(null);
    }
}
export const ClassicBluetoothEvent = {
    /**
     * BondStateChange 状态改变事件
     * 返回的数据格式为：{"macAddress": "xxx", "state":xxx}
     * state 取值为：BOND_BONDING = 11;BOND_NONE = 10;BOND_BONDED = 12;
     */
    classicBlueBondStateChanged: {
    },
    /**
     * 经典蓝牙连接状态改变事件
     * 返回的数据格式为：{"macAddress": "xxx", "state":xxx}
     * state 取值为：DISCONNECTED = 0;CONNECTING = 1;CONNECTED = 2;DISCONNECTING = 3;NO_STATE = 4;
     */
    classicBlueConnectionStateChanged: {
    },
    /**
     * 收到数据事件
     * 返回的数据格式为：{"macAddress": "xxx", "data":"xxx"}
     */
    classicBlueReceivedData: {
    },
}
buildEvents(ClassicBluetoothEvent);