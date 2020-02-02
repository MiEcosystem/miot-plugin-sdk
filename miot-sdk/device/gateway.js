//@native begin
import native, { Properties } from './../native';
import { BasicDevice, _find_device } from './BasicDevice';
//@native end
export default class IDeviceGateWay {
  // @native begin
  constructor(deviceID, originDevice) {
    Properties.of(this).did = deviceID;
    Properties.of(this).originDevice = originDevice;
  }
  /**
   * 获取设备deviceID，same as Device.deviceID
   * @since 10020
   */
  get deviceID() {
    return Properties.of(this).did;
  }
  //获取rootDevice
  get originDevice() {
    return Properties.of(this).originDevice;
  }
  //@native end
  /**
   * 获取子设备列表，如果是蓝牙网关的子设备列表，请使用下面的：getLinkedBTDevices方法
   * @since 10020
   * @returns {Promise<BasicDevice[]>}
   *    resolve：array<BasicDevice> 设备列表
   *    reject：{code: xxx, message: xxx} -1:找不到设备  其他code：网络错误
   */
  getSubDevices() {
    //@native :=> promise []
    let { device } = _find_device(this.deviceID);
    const self = Properties.of(device);
    if (self.parentDevice && Object.keys(self.parentDevice).length > 0) {
      return Promise.reject('parent device exist, current device is a sub device, can not load sub devices');
    }
    if (self._subDevices) {
      return Promise.resolve(self._subDevices);
    }
    return new Promise((resolve, reject) => {
      if (native.isIOS) {
        native.MIOTDevice.loadSubDevices(this.deviceID, (ok, result) => {
          if (ok && result) {
            console.log("devices:", result)
            self._subDevices = result.map(stat => {
              //initDeviceEvents
              return (Properties.init(new BasicDevice(),
                { ...stat, _parentDeviceID: this.deviceID, _parentDevice: this.originDevice, _msgset: new Set() }
              ));
            })
            resolve(self._subDevices);
          } else {
            reject(ret)
          }
        });
      } else {
        native.MIOTDevice.loadSubDevices(this.deviceID, ret => {
          if (ret && ret.ok && ret.result) {
            console.log("devices:", ret)
            self._subDevices = ret.result.map(stat => {
              //initDeviceEvents
              return (Properties.init(new BasicDevice(),
                { ...stat, _parentDeviceID: this.deviceID, _parentDevice: this, _msgset: new Set() }
              ));
            })
            resolve(self._subDevices);
          } else {
            reject(ret)
          }
        });
      }
    });
    //@native end
  }
  // @native begin
  /**
   * 获取支持连接的model列表，暂未实现
   */
  supportModelToConnect() {
  }
  // @native end
  /** Device
   *  主要有以下字段：{iconURL,did,model,userId,extra,name,event,session,permitLevel,parentId,showMode,mac,propInfo,ip,ssid,bssid,pid,latitude,longitude,isVoiceDevice,isOnline,ownerId,ownerName};
   */
  /**
   * 获取蓝牙网关关联的普通蓝牙和蓝牙mesh设备列表。
   * @param {string} [did=Device.deviceID] 蓝牙网关的did，可以为空，为空时默认取当前的Device.deviceID
   * @returns {Promise} 
   *    resolve：返回数组设备信息的promise， {"mesh":[Device], "normal":[Device]}
   *    reject：{code: xxx, error: xxx, extra:xxx} code固定等于-1，error.code： -1:获取设备列表失败  -2:网关设备不存在，请检查是否在线  401:无法获取配置信息  404:无法查询到相关设备
   */
  getLinkedBTDevices(did = null) {
    //@native :=> promise []
    did = did || this.deviceID;
    return new Promise((resolve, reject) => {
      native.MIOTDevice.getLinkedBTDevices(did, (ok, res) => {
        if (!ok || !res) {
          return reject({ code: -1, error: res, extra: 'fetch bledevice info failed' });
        }
        resolve(res);
      })
    })
    //@native end
  }
}