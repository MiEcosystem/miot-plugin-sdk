/**
 * @export public
 * @doc_name 设备管理入口模块
 * @doc_index 1
 * @doc_directory device
 * @module miot/device
 * @description 设备管理类
 * 设备管理涉及到多方面的内容，米家扩展程序提供的最主要的功能即为设备管理。此模块提供的主要功能有：
 * 1. 绑定/解绑设备。
 * 2. 控制设备：下发指令，让设备执行某操作。
 * 3. 获取设备当前的状态。
 * 4. 订阅设备的事件。比如，洗衣机洗衣时，由漂洗切换到脱水，米家扩展程序能 实时获取 到这个状态的变化。
 * 5. 升级设备。
 * 6. 共享设备，给他人开放部分权限。
 * 详见：https://iot.mi.com/new/doc/05-%E7%B1%B3%E5%AE%B6%E6%89%A9%E5%B1%95%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/04-%E8%AE%BE%E5%A4%87%E7%AE%A1%E7%90%86/01-%E6%A6%82%E8%BF%B0.html。
 * **默认大家对iot有一定的了解**
 *
 * 设备管理主要包含以下文件/文件夹：
 * * index.js 设备管理相关入口文件，会导出大家需要的所有模块。
 * * BasicDevice.js 设备基础功能文件，主要包含了设备基础信息，设备属性修改，设备版本获取，设备事件等功能。
 * * WifiDevice.js Wifi设备功能文件，主要提供了设备通过网络交互的部分功能，比如：获取设备网络信息，下发RPC命令，加载设备属性，获取设备信息，绑定到homekit，设备升级，属性/事件订阅等。
 * * Gateway.js 网关管理类文件，涉及到网关的部分操作，暂未暴露功能给开发者使用,若有需要，请联系米家工程师。
 * * bluetooth 蓝牙功能开发文件夹，提供了蓝牙开发的各种支持
 *
 * 每个文件的具体功能，请直接查看此文件的具体文档。
 *
 * 因为米家SDK模块化的需求，大家后续引入Device，Bluetooth最好使用下面example中新的方式，我们也为老的引入做了兼容，但是不推荐。
 * 新的miot/device模块中，更多可引入的模块请直接查看miot-sdk/device/index.js模块
 *
 * @example
 *
 * 因为米家的模块化，现提供了以下两种引入方式，推荐使用新的。
 * 旧的引入方式：
 * import {Device,Bluetooth} from 'miot';
 *
 * 新的引入方式：
 * import {Device,Bluetooth} from 'miot/device';
 *
 *  Bluetooth.checkBluetoothIsEnabled().then(result => {
        this.state.isEnable = result;
        if (result) {
            this.addLog("蓝牙已开启")
            this.startScan();
        } else {
            this.addLog("蓝牙未开启，请检查开启蓝牙后再试")
            Host.ui.showBLESwitchGuide();
        }
    })
 *
 * ...
 *
 * ble.disconnect()
 *
 */
// new
import BasicDevice, { DeviceEvent as MIOTDeviceEvent } from './BasicDevice';
import MIOTBluetooth from './bluetooth';
import { IBluetooth as BluetoothDevice, BluetoothEvent as MIOTBluetoothEvent } from './bluetooth/BluetoothDevice';
import { IBluetoothService as MIOTIBluetoothService, IBluetoothCharacteristic as MIOTIBluetoothCharacteristic } from './bluetooth/CoreBluetooth';
import LockDevice from './bluetooth/LockDevice';
import ClassicBluetoothFactory, { ClassicBluetoothEvent as MIOTClassicBluetoothEvent } from './bluetooth/ClassicDevice';
import Interconnection from './interconnection';
export const Device = BasicDevice;
export const DeviceEvent = MIOTDeviceEvent;
export const Bluetooth = MIOTBluetooth;
export const BluetoothEvent = MIOTBluetoothEvent;
export const IBluetooth = BluetoothDevice;
export const IBluetoothLock = LockDevice;
export const ClassicBluetooth = ClassicBluetoothFactory;
export const ClassicBluetoothEvent = MIOTClassicBluetoothEvent;
export const IBluetoothService = MIOTIBluetoothService;
export const IBluetoothCharacteristic = MIOTIBluetoothCharacteristic;
export default {
  Device, DeviceEvent, Bluetooth, BluetoothEvent, IBluetooth, IBluetoothLock, ClassicBluetooth, ClassicBluetoothEvent, IBluetoothService, IBluetoothCharacteristic, Interconnection
};