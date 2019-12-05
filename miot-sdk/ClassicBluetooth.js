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
//@native
import native, { buildEvents } from './native';
export default {
    /**
     * 初始化经典蓝牙,返回的数据没有实际作用, 执行到catch表示初始化失败
     * @since 10023
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    create() {
        //@native :=> promise
        //@mark andr done
        if (native.isIOS) {
            return new Promise.reject("ios is not support...")
        }
        return new Promise((resolve, reject) => {
            native.ClassicBluetooth.create((isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 根据device 的mac 地址，与中心设备建立socket 链接, 返回的数据没有实际作用, 执行到catch表示连接失败
     * @since 10023
     * @param {string} macAddress   中心设备mac地址
     * @param {string} transport  连接中心设备的相应服务的UUID
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    connectSocket(macAddress, transportUUID) {
        //@native :=> promise
        //@mark andr done
        if (native.isIOS) {
            return new Promise.reject("ios is not support...")
        }
        return new Promise((resolve, reject) => {
            native.ClassicBluetooth.connectSocket(macAddress, transportUUID, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 断开与中心设备的socket连接, 返回的数据没有实际作用, 执行到catch表示断开连接失败
     * @since 10023
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    disconnectSocket() {
        //@native :=> promise
        //@mark andr done
        if (native.isIOS) {
            return new Promise.reject("ios is not support...")
        }
        return new Promise((resolve, reject) => {
            native.ClassicBluetooth.disconnectSocket((isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 向蓝牙设备写入数据, 返回的数据没有实际作用, 执行到catch表示写失败
     * @since 10023
     * @param {string} data
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    write(data) {
        //@native :=> promise
        //@mark andr done
        if (native.isIOS) {
            return new Promise.reject("ios is not support...")
        }
        return new Promise((resolve, reject) => {
            native.ClassicBluetooth.write(data, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 事先准备要需要的BluetoothProfile, 具体的类型是profile, 具体的数值参考Android Api: BluetoothProfile.HEADSET，BluetoothProfile.A2DP
     * HEADSET = 1;A2DP = 2;HEALTH = 3;
     * @since 10023
     * @param {int} profile
     * @returns {Promise<any>} 成功进入then, 返回对应的profile，失败进入catch
     */
    prepareBluetoothProfile(profile) {
        //@native :=> promise
        //@mark andr done
        if (native.isIOS) {
            return new Promise.reject("ios is not support...")
        }
        return new Promise((resolve, reject) => {
            native.ClassicBluetooth.prepareBluetoothProfile(profile, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 连接类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务
     * @since 10023
     * @param {string} macAddress   需要查询的设备macAddress
     * @param {int} profile  BluetoothProfile 接口类的类型（ BluetoothProfile.HEADSET，BluetoothProfile.A2DP等）
     * @returns {Promise<any>} 成功进入then, 返回值没有实际作用，失败进入catch
     */
    connectBluetoothProfile(macAddress, profile) {
        //@native :=> promise
        //@mark andr done
        if (native.isIOS) {
            return new Promise.reject("ios is not support...")
        }
        return new Promise((resolve, reject) => {
            native.ClassicBluetooth.connectBluetoothProfile(macAddress, profile, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 断开类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务
     * @since 10023
     * @param {string} macAddress
     * @param {int} profile
     * @returns {Promise<any>}  成功进入then, 返回值没有实际作用，失败进入catch
     */
    disconnectBluetoothProfile(macAddress, profile) {
        //@native :=> promise
        //@mark andr done
        if (native.isIOS) {
            return new Promise.reject("ios is not support...")
        }
        return new Promise((resolve, reject) => {
            native.ClassicBluetooth.disconnectBluetoothProfile(macAddress, profile, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
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
        //@native :=> promise
        //@mark andr done
        if (native.isIOS) {
            return new Promise.reject("ios is not support...")
        }
        return new Promise((resolve, reject) => {
            native.ClassicBluetooth.getBluetoothProfileState(macAddress, profile, (isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    },
    /**
     * 销毁蓝牙服务
     * @since 10023
     * @returns {Promise<any>}  成功进入then，失败进入catch
     */
    destroy() {
        //@native :=> promise
        //@mark andr done
        if (native.isIOS) {
            return new Promise.reject("ios is not support...")
        }
        return new Promise((resolve, reject) => {
            native.ClassicBluetooth.destroy((isSuccess, result) => {
                if (isSuccess) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
        //@native end
    }
}
export const ClassicBluetoothEvent = {
    /**
     * BondStateChange 状态改变事件
     * 返回的数据格式为：{"macAddress": "xxx", "state":xxx}
     * state 取值为：BOND_BONDING = 11;BOND_NONE = 10;BOND_BONDED = 12;
     */
    classicBlueBondStateChanged: {
        //@native begin
        forever: emitter => (event) => {
            emitter.emit(event);
        }
        //@native end
    },
    /**
     * 经典蓝牙连接状态改变事件
     * 返回的数据格式为：{"macAddress": "xxx", "state":xxx}
     * state 取值为：DISCONNECTED = 0;CONNECTING = 1;CONNECTED = 2;DISCONNECTING = 3;NO_STATE = 4;
     */
    classicBlueConnectionStateChanged: {
        //@native begin
        forever: emitter => (event) => {
            emitter.emit(event);
        }
        //@native end
    },
    /**
     * 收到数据事件
     * 返回的数据格式为：{"macAddress": "xxx", "data":"xxx"}
     */
    classicBlueReceivedData: {
        //@native begin
        forever: emitter => (event) => {
            emitter.emit(event);
        }
        //@native end
    },
}
buildEvents(ClassicBluetoothEvent);