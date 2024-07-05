import React from 'react';

import { PermissionsAndroid, ScrollView, View } from 'react-native';
import {
  AccelerometerChangeEvent,
  CompassChangeEvent,
  Device,
  GyroscopeChangeEvent,
  Host,
  MemoryWarningEvent,
  System,
  VolumeChangeEvent
} from "miot";
import { Permissions, SystemConfig } from "miot/system/permission";
import { Separator } from 'mhui-rn';
import { ListItem } from 'miot/ui/ListItem';
import { ShakeEvent } from "miot/system/shake";
import Logger from '../Logger';
import { isAndroid } from "../../../../bin/ABTest/commonPlugin/modules/consts";

export const interval = {
  "a": "game",
  "b": "ui",
  "c": "normal"
};

// 蓝牙

function _bluetoothStartstartAdvertising(mac) {
  let macs = mac.split(':');
  if (macs.length != 6) {
    return;
  }

  let u1 = ['00', ...macs, '01', '00', 'ff', '03', '05', '01', '02', '01', '00'];
  let u2 = ['00', ...(macs.reverse()), '01', '00', 'ff', '03', '05', '01', '02', '01', '00'];
  let u3 = [...u1].reverse();
  let u4 = [...u2].reverse();

  [u2, u1, u3, u4].forEach((u) => {
    [4, 7, 10, 13].forEach((index) => {
      u.splice(index, 0, '-');
    });
  });

  let uuids = [u1, u2, u3, u4].map((u) => u.join(''));
  uuids.push("11111111-2222-3333-4444-123456789abc");

  console.log(mac, JSON.stringify(uuids, null, '\t'));
  System.bluetooth.startAdvertising(
    {
      serviceUUIDs: uuids,
      localName: "hhhhhhhh",
      timeout: 10, // 时间长度，到时自动关闭
      services: uuids.map((uuid, index) => {
        return {
          uuid,
          primary: index == 0,
          characteristics: uuids.map((uuid) => {
            return { uuid };
          })
        };
      })
    });
}

function bluetoothStartstartAdvertising() {
  Device.getDeviceBleMac().then((res) => {
    console.log(res);
    let mac = res?.result?.data?.ble_mac;
    if (!mac) {
      console.log('无法获取有效蓝牙mac');
      return;
    }
    _bluetoothStartstartAdvertising(mac);
  }).catch((err) => { console.log('广播失败', err); });
}


// 电量
function getBattery() {
  System.battery.getBatteryInfo().then((res) => {
    if (res && res.data) {
      alert(`getBatteryInfo success,level:${ res.data.level },isCharging:${ res.data.isCharging }`);
    } else {
      alert(`getBatteryInfo fail,${ JSON.stringify(res) }`);
    }
  }).catch((error) => {
    alert(`getBatteryInfo fail,${ JSON.stringify(error) }`);
  });
}

// 获取手机当前连接的路由器的ip地址
function getGatewayIpAddress() {
  System.network.getGatewayIpAddress().then((res) => {
    if (res && res.data) {
      alert(`getGatewayIpAddress success,ipAddress:${ res.data.ipAddress }`);
    } else {
      alert(`getGatewayIpAddress fail,${ JSON.stringify(res) }`);
    }
  }).catch((error) => {
    alert(`getGatewayIpAddress fail,${ JSON.stringify(error) }`);
  });
}

// 获取当前wifi的广播地址
function getWifiBroadcastAddress() {
  System.network.getWifiBroadcastAddress().then((res) => {
    alert(`getWifiBroadcastAddress success,res:${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`getWifiBroadcastAddress fail,error: ${ JSON.stringify(error) }`);
  });
}

// 是否是Pad设备
function isPad() {
  alert(Host.isPad);
}

// 震动
function getVibrateShort() {
  System.vibrate.vibrateShort();
}
function getVibrateLong() {
  System.vibrate.vibrateLong();
}


// 截屏
function onUserCaptureScreen() {
  alert(`onUserCaptureScreen,待实现`);
}

// 精确位置
function getLocation(accuracy) {
  System.location.getLocation(accuracy).then((location) => {
    alert(JSON.stringify(location));

  });
}

// 扫码
function getScanCode() {
  System.scancode.scanCode().then((res) => {
    if (res && res.data) {
      alert(`getScanCode success,result:${ res.data.result }`);
    } else {
      alert(`getScanCode fail,${ JSON.stringify(res) }`);
    }
  }).catch((error) => {
    alert(`getScanCode fail,${ JSON.stringify(error) }`);
  });
}

// 性能
function addMemoryWarning() {
  console.log("addMemoryWarning");
  this.memoryListener = MemoryWarningEvent.onMemoryWarning.addListener(this.myListener);
}

// 权限
function requestPermission(permission) {
  System.permission.request(permission).then((res) => {
    alert(`requestPermission,result:${ res }`);
  }).catch((error) => {
    alert(`requestPermission,error:${ JSON.parse(error) }`);
  });
}

// 权限
function requestMultiplePermissions() {
  if (isAndroid) {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    ]).then((granted) => { // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, null)
      console.log("granted", granted);
    }).catch((error) => {
      console.log("error", error);
    });
  }

}


// 获取音量
function getVolumeInfo() {
  System.volume.getVolumeInfo().then((res) => {
    if (res && res.data) {
      alert(`getSystemVolumeInfo success,volume:${ res.data.volume }`);
    } else {
      alert(`getSystemVolumeInfo fail,${ JSON.stringify(res) }`);
    }
  }).catch((error) => {
    alert(`getSystemVolumeInfo fail,${ JSON.stringify(error) }`);
  });
}

// 开始监听音量
function getStartVolume() {
  System.volume.startVolume().then((res) => {
    alert(`getStartVolume: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`getStartVolume: ${ JSON.stringify(error) }`);
  });
}

// 开始监听音量(隐藏系统音量条)
function getStartVolumeHideSystemSlider() {
  System.volume.startVolume({ hideSystemSlider: true }).then((res) => {
    alert(`getStartVolumeHideSystemSlider: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`getStartVolumeHideSystemSlider: ${ JSON.stringify(error) }`);
  });
}

// 取消监听音量
function getStopVolume() {
  System.volume.stopVolume().then((res) => {
    alert(`getStopVolume: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`getStopVolume: ${ JSON.stringify(error) }`);
  });
}

// 加速计
function getStartAccelerometer() {
  System.accelerometer.startAccelerometer(interval.a).then((res) => {
    alert(`startAccelerometer: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`startAccelerometer: ${ JSON.stringify(error) }`);
  });
}
function getStopAccelerometer() {
  System.accelerometer.stopAccelerometer().then((res) => {
    alert(`stopAccelerometer: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`stopAccelerometer: ${ JSON.stringify(error) }`);
  });
}

// 罗盘
function getStartCompass() {
  System.compass.startCompass(interval.c).then((res) => {
    alert(`startCompass: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`startCompass: ${ JSON.stringify(error) }`);
  });
}
function getStopCompass() {
  System.compass.stopCompass().then((res) => {
    alert(`stopCompass: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`stopCompass: ${ JSON.stringify(error) }`);
  });
}

// 陀螺仪
function getStartGyroscope() {
  System.gyroscope.startGyroscope(interval.c).then((res) => {
    alert(`startGyroscope: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`startGyroscope: ${ JSON.stringify(error) }`);
  });
}
function getStopGyroscope() {
  System.gyroscope.stopGyroscope().then((res) => {
    alert(`stopGyroscope: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`stopGyroscope: ${ JSON.stringify(error) }`);
  });
}

// 摇一摇
function startShakeListener() {
  System.shake.startShakeListener().then((res) => {
    alert(`startShakeListener: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`startShakeListener: ${ JSON.stringify(error) }`);
  });
}
function stopShakeListener() {
  System.shake.stopShakeListener().then((res) => {
    alert(`stopShakeListener: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    alert(`stopShakeListener: ${ JSON.stringify(error) }`);
  });
}

function getNfcInfo() {
  System.nfc.getNfcInfo().then((res) => {
    alert(JSON.stringify(res));
  }).catch((err) => {
    alert(JSON.stringify(err));
  });
}

function writeNFCData() {
  let params = {
    extraString: 'nfc测试数据'
  };
  System.nfc.writeNFCData(params).then((res) => {
    alert(JSON.stringify(res));
  }).catch((err) => {
    alert(JSON.stringify(err));
  });
}

function isMiConnectSupportNFC() {
  System.nfc.isMiConnectSupportNFC({ did: Device.deviceID }).then((res) => {
    alert(res);
  });
}

function checkNotificationConfigEnable() {
  System.permission.checkAPPSystemConfigEnable(SystemConfig.NOTIFICATION)
    .then((res) => {
      alert(JSON.stringify(res));
    }).catch((res) => {
      alert(JSON.stringify(res));
    });
}

function openNotificationSettingPage() {
  System.permission.openAPPSystemConfigPage(SystemConfig.NOTIFICATION);
}

function requestHealthAuthorization() {
  let params = {
    writeObjTypes: ['BodyMass', 'BodyFatPercentage'],
    readObjTypes: ['BodyMass', 'BodyFatPercentage']
  };
  System.health.requestHealthAuthorization(params).then((res) => {
    alert(JSON.stringify(res));
  }).catch((res) => {
    alert(JSON.stringify(res));
  });
}

function getHealthAuthorizationStatus() {
  let params = {
    authObjType: 'BodyFatPercentage'
  };
  System.health.getHealthAuthorizationStatus(params).then((res) => {
    alert(JSON.stringify(res));
  }).catch((res) => {
    alert(JSON.stringify(res));
  });
}

function writeDataToHealthApp() {
  let params = {
    authObjType: 'BodyMassIndex',
    objValue: 1.2,
    startTime: 1667291265,
    endTime: 1667291270
  };
  System.health.writeDataToHealthApp(params).then((res) => {
    alert(JSON.stringify(res));
  }).catch((res) => {
    alert(JSON.stringify(res));
  });
}

export default class SystemDemo extends React.Component {
  componentDidMount() {
    Logger.trace(this);
  }

  render() {
    return (
      <View>
        <Separator />
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            [
              ["开启蓝牙广播", bluetoothStartstartAdvertising],
              [],
              ["获取电量", getBattery],
              [],
              ["获取NFC状态", getNfcInfo],
              ["写入NFC数据", writeNFCData],
              ["miui是否支持投屏", isMiConnectSupportNFC],
              [],
              ["内存警告", addMemoryWarning],
              [],
              ["获取音量", getVolumeInfo],
              [],
              ["开始监听音量变化(默认显示系统音量条)", getStartVolume],
              ["开始监听音量变化(隐藏系统音量条)", getStartVolumeHideSystemSlider],
              ["停止监听音量变化", getStopVolume],
              [],
              ["开始监听加速计", getStartAccelerometer],
              ["停止监听加速计", getStopAccelerometer],
              [],
              ["开始监听罗盘", getStartCompass],
              ["停止监听罗盘", getStopCompass],
              [],
              ["开始监听陀螺仪", getStartGyroscope],
              ["停止监听陀螺仪", getStopGyroscope],
              [],
              ["开始监听摇一摇", startShakeListener],
              ["停止监听摇一摇", stopShakeListener],
              [],
              ["短震", getVibrateShort],
              ["长震", getVibrateLong],
              [],
              ["申请录音权限", () => { requestPermission(Permissions.RECORD_AUDIO); }],
              ["申请相机权限", () => { requestPermission(Permissions.CAMERA); }],
              ["申请定位权限", () => { requestPermission(Permissions.LOCATION); }],
              ["申请多个权限(Android)", () => { requestMultiplePermissions(); }],
              [],
              ["获取位置信息（高精度）", () => { getLocation("high"); }],
              [],
              ["扫码", getScanCode],
              [],
              ["获取手机当前连接的路由器的ip地址", getGatewayIpAddress],
              ["获取当前wifi的广播地址", getWifiBroadcastAddress],
              [],
              ["设备是否为Pad", isPad],
              [],
              ["检查是否为APP开启推送通知权限", checkNotificationConfigEnable],
              ["打开开启推送通知权限设置页", openNotificationSettingPage],
              [],
              ["请求健康App权限(只有iOS)", requestHealthAuthorization],
              ["获取健康权限状态(只有iOS)", getHealthAuthorizationStatus],
              ["写入数据到健康App(只有iOS)", writeDataToHealthApp]
            ].map((item, index) => {
              return (item.length >= 2 ? <ListItem
                key={index}
                title={item[0]}
                hideArrow={true}
                onPress={() => {
                  Logger.trace(this, item[1], { action: item[0] });
                  item[1].bind(this)();
                }}
              /> : <View style={{ height: 18 }} key={index} />);
            })
          }
        </ScrollView>
      </View>
    );
  }

  myListener = (value) => {
    console.log(`SystemDemo listener`);
    console.log(value.level);
    alert(`onMemoryWarning,level:${ value.level }`);
  }

  componentWillMount() {
    this.sharkCount = 0;
    this.volumeListener = VolumeChangeEvent.onVolumeChange.addListener((result) => {
      console.log(`VolumeChangeEvent getResult:${ JSON.stringify(result) }`);
      if (result && result.result) {
        alert(`监听到音量变化:${ result.result.volume }`);
      }
    });
    this.compassListener = CompassChangeEvent.onCompassChange.addListener((result) => {
      console.log(`CompassChangeEvent getResult:${ JSON.stringify(result) }`);
    });
    this.gyroscopeListener = GyroscopeChangeEvent.onGyroscopeChange.addListener((result) => {
      console.log(`GyroscopeChangeEvent getResult:${ JSON.stringify(result) }`);
    });
    this.accelerometerListener = AccelerometerChangeEvent.onAccelerometerChange.addListener((result) => {
      console.log(`AccelerometerChangeEvent getResult:${ JSON.stringify(result) }`);
    });
    this.shakeListener = ShakeEvent.onShake.addListener(() => {
      console.log(`ShakeEvent`);
      alert(`摇一摇次数:${ ++this.sharkCount }`);
    });
  }

  componentWillUnmount() {
    this.volumeListener && this.volumeListener.remove();
    this.compassListener && this.compassListener.remove();
    this.gyroscopeListener && this.gyroscopeListener.remove();
    this.accelerometerListener && this.accelerometerListener.remove();
    this.memoryListener && this.memoryListener.remove();
    this.shakeListener && this.shakeListener.remove();
  }
}
