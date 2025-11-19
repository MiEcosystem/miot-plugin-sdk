declare namespace _default {
    /**
       * 初始化经典蓝牙,返回的数据没有实际作用, 执行到catch表示初始化失败。
       * @since 10023
       * @returns {Promise<any>}  成功进入then，失败进入catch
       */
    function create(): Promise<any>;
    /**
       * 根据device 的mac 地址，与中心设备建立socket 链接, 返回的数据没有实际作用, 执行到catch表示连接失败
       * @since 10023
       * @param {string} macAddress   中心设备mac地址。格式类似："AA:BB:CC:DD:EE:FF"
       * @param {string} transport  连接中心设备的相应服务的UUID,格式类似："1000000-0000-0000-000000000001"
       * @returns {Promise<any>}  成功进入then，失败进入catch
       */
    function connectSocket(macAddress: string, transportUUID: any): Promise<any>;
    /**
       * 根据device 的mac 地址，与中心设备建立socket 链接, 返回的数据没有实际作用, 执行到catch表示连接失败
       * @since 10023
       * @param {string} macAddress   中心设备mac地址。格式类似："AA:BB:CC:DD:EE:FF"
       * @param {string} transport  连接中心设备的相应服务的UUID,格式类似："1000000-0000-0000-000000000001"
       * @returns {Promise<any>}  成功进入then，失败进入catch
       */
    function disconnectSocket(): Promise<any>;
    /**
       * 断开与中心设备的socket连接, 返回的数据没有实际作用, 执行到catch表示断开连接失败
       * @since 10023
       * @returns {Promise<any>}  成功进入then，失败进入catch
       */
    function write(data: string): Promise<any>;
    /**
       * 事先准备要需要的BluetoothProfile, 具体的类型是profile, 具体的数值参考Android Api: BluetoothProfile.HEADSET，BluetoothProfile.A2DP
       * HEADSET = 1;A2DP = 2;HEALTH = 3;
       * @since 10023
       * @param {int} profile
       * @returns {Promise<any>} 成功进入then, 返回对应的profile，失败进入catch
       */
    function prepareBluetoothProfile(profile: int): Promise<any>;
    /**
       * 事先准备要需要的BluetoothProfile, 具体的类型是profile, 具体的数值参考Android Api: BluetoothProfile.HEADSET，BluetoothProfile.A2DP
       * HEADSET = 1;A2DP = 2;HEALTH = 3;
       * @since 10023
       * @param {int} profile
       * @returns {Promise<any>} 成功进入then, 返回对应的profile，失败进入catch
       */
    function connectBluetoothProfile(macAddress: string, profile: int): Promise<any>;
    /**
       * 连接类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务
       * @since 10023
       * @param {string} macAddress   需要查询的设备macAddress
       * @param {int} profile  BluetoothProfile 接口类的类型（ BluetoothProfile.HEADSET，BluetoothProfile.A2DP等）
       * @returns {Promise<any>} 成功进入then, 返回值没有实际作用，失败进入catch
       */
    function disconnectBluetoothProfile(macAddress: string, profile: int): Promise<any>;
    /**
       * 断开类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务
       * @since 10023
       * @param {string} macAddress
       * @param {int} profile
       * @returns {Promise<any>}  成功进入then, 返回值没有实际作用，失败进入catch
       */
    function getBluetoothProfileState(macAddress: string, profile: int): Promise<any>;
    /**
       * 获取类型为profile的BluetoothProfile的当前状态, 返回值有四个选项,参考android api : BluetoothProfile.STATE_DISCONNECTED等
       * STATE_DISCONNECTED = 0; STATE_CONNECTING = 1;STATE_CONNECTED = 2;TATE_DISCONNECTING = 3;
       * @since 10023
       * @param {string} macAddress
       * @param {int} profile
       * @returns {Promise<any>}  成功进入then, 返回值{"state": 0}，失败进入catch
       */
    function destroy(): Promise<any>;
    /**
       * 销毁蓝牙服务
       * @since 10023
       * @returns {Promise<any>}  成功进入then，失败进入catch
       */
    function isConnected(): Promise<any>;
}
export default _default;
export namespace ClassicBluetoothEvent {
    namespace classicBlueBondStateChanged {
        function forever(emitter: any): (event: any) => void;
    }
    namespace classicBlueConnectionStateChanged {
        export function forever_1(emitter: any): (event: any) => void;
        export { forever_1 as forever };
    }
    namespace classicBlueReceivedData {
        export function forever_2(emitter: any): (event: any) => void;
        export { forever_2 as forever };
    }
}