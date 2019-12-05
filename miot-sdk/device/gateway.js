//@native begin
import native, { Properties } from './../native';
//@native end
export default class IDeviceGateWay {
  /**
   * 获取设备ID，same as Device.deviceID
   * @since 10020
   */
  get deviceID() {
    //@native => ""
    return Properties.of(this).did;
  }
  //@native begin
  //获取rootDevice
  get originDevice() {
    return Properties.of(this).originDevice;
  }
  //@native end
  /**
   * 获取子设备列表
   * @since 10020
   * @returns Promise
   */
  getSubDevices() {
    //@native :=> promise []
    const self = Properties.of(this);
    if (self._parentDevice) {
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
              return (Properties.init(new IDevice(),
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
              return (Properties.init(new IDevice(),
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
  /**
   * 获取支持连接的model列表
   */
  supportModelToConnect() {
  }
  /**
   * 获取蓝牙网关关联的普通蓝牙和蓝牙mesh设备列表。
   * @param {string} [did=Device.deviceID] 蓝牙网关的did，可以为空，为空时默认取当前的Device.deviceID
   * @returns {Promise} 返回数组设备信息的promise， {"mesh":[], "normal":""}
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