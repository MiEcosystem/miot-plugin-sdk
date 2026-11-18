import { useState, useEffect } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Device from 'miot/device/BasicDevice';
import Service from 'miot/Service';
import Host from '../Host';
import { strings as I18n } from '../resources';
/**
 * 请求接口，获取当前'在米家使用'项的开关状态
 * @returns [isOpen, setIsOpen]
 * @since 10115
 */
export default function useUsedOnMiHome() {
  const [isOpen, setIsOpen] = useState(false);
  function update() {
    getUsedOnMiHomeStatus()
      .then((value) => {
        setIsOpen(value);
      }).catch((error) => {});
  }
  useEffect(() => {
    update();
    PackageEvent.packageViewWillAppear.addListener(update);
  }, []);
  return [isOpen, setIsOpen];
}
export function getUsedOnMiHomeStatus() {
  return new Promise((resolve, reject) => {
    Service.callSmartHomeAPI("/thirdcloud2cloud/query_device_switch", { did: Device.deviceID })
      .then((res) => {
        // "status": 0/-1 // 0 开关打开状态；-1 开关关闭状态
        console.log(`获取开关状态 then res -> ${ JSON.stringify(res) }`);
        resolve(res.status === 0);
      }).catch((error) => {
        reject(error);
      });
  });
}
/**
 * 请求接口，操作打开或关闭‘在米家使用’，开关
 * @param {操作去：打开或关闭} isOpen 
 * @returns Promise
 * @since 10115
 */
export function switchUsedOnMiHome(isOpen) {
  const action = isOpen ? 0 : -1;
  // 如果是关闭‘在米家使用’，需要二次弹窗确认
  if (action === -1) {
    // 操作关闭，弹窗确认
    return Host.ui.openCloseUsedOnMiHomeConfirmDialog().then(() => {
      console.log(`点击了【不使用】，去请求接口`);
      return _switchUsedOnMiHome(action);
    });
  } else {
    // 操作打开，直接去请求接口
    return _switchUsedOnMiHome(action);
  }
  function _switchUsedOnMiHome(action) {
    return new Promise((resolve, reject) => {
      Service.callSmartHomeAPI("/thirdcloud2cloud/switch_device", { did: Device.deviceID, action: action })
        .then(() => {
          resolve();
        }).catch(() => {
          reject(I18n.operation_failed);
        });
    });
  }
  
}