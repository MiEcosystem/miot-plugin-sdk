import React from 'react';

import {
  View, ScrollView
} from 'react-native';
import {
  System,
  MemoryWarningEvent,
  AccelerometerChangeEvent,
  CompassChangeEvent,
  GyroscopeChangeEvent,
  VolumeChangeEvent,
  Host
} from "miot";
import { Permissions } from "miot/system/permission";
import { Separator } from 'mhui-rn';
import { ListItem } from 'miot/ui/ListItem';
import { ShakeEvent } from "miot/system/shake";
import Logger from '../Logger';

export const interval = {
  "a": "game",
  "b": "ui",
  "c": "normal"
};

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
  System.permission.request(Permissions.CAMERA).then((res) => {
    alert(`requestPermission,result:${ res }`);
  }).catch((error) => {
    alert(`requestPermission,error:${ JSON.parse(error) }`);
  });
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
              ["获取电量", getBattery],
              ["获取NFC状态", getNfcInfo],
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
              [],
              ["获取位置信息（高精度）", () => { getLocation("high"); }],
              [],
              ["扫码", getScanCode],
              [],
              ["获取手机当前连接的路由器的ip地址", getGatewayIpAddress],
              ["获取当前wifi的广播地址", getWifiBroadcastAddress],
              [],
              ["设备是否为Pad", isPad]
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
