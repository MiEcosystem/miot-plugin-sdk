import React from 'react';

import {
  View, ScrollView
} from 'react-native';
import { System, MemoryWarningEvent, AccelerometerChangeEvent, CompassChangeEvent, GyroscopeChangeEvent } from "miot";
import { Permissions } from "miot/system/permission";
import { Separator } from 'mhui-rn';
import { ListItem } from 'miot/ui/ListItem';

export const interval = {
  "a": "game",
  "b": "ui",
  "c": "normal"
};

// 电量
function getBattery() {
  System.battery.getBatteryInfo().then((res) => {
    alert(`getBatteryInfo:${ JSON.stringify(res) }`);
    console.log("111", res);
  }).catch((error) => {
    console.log("233", error);
  });
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
    console.log("111", res);
  }).catch((error) => {
    console.log("233", error);
  });
}

// 性能
function addMemoryWarning() {
  console.log("addMemoryWarning");
  MemoryWarningEvent.onMemoryWarning.addListener(this.myListener);
}

// 权限
function requestPermission(permission) {
  System.permission.request(permission).then((res) => {
    console.log("111", (res));
  }).catch((error) => {
    console.log("233", error);
  });
}

// 加速计
function getStartAccelerometer() {
  System.accelerometer.startAccelerometer(interval.a).then((res) => {
    alert(`startAccelerometer: ${ JSON.stringify(res) }`);
    AccelerometerChangeEvent.onAccelerometerChange.addListener((result) => {
      console.log(result);
    });
  }).catch((error) => {
    console.log("233", error);
  });
}
function getStopAccelerometer() {
  System.accelerometer.stopAccelerometer().then((res) => {
    alert(`stopAccelerometer: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    console.log("233", error);
  });
}

// 罗盘
function getStartCompass() {
  System.compass.startCompass(interval.c).then((res) => {
    alert(`startCompass: ${ JSON.stringify(res) }`);
    CompassChangeEvent.onCompassChange.addListener((result) => {
      console.log(result);
    });
  }).catch((error) => {
    console.log("233", error);
  });
}
function getStopCompass() {
  System.compass.stopCompass().then((res) => {
    alert(`stopCompass: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    console.log("233", error);
  });
}

// 陀螺仪
function getStartGyroscope() {
  System.gyroscope.startGyroscope(interval.c).then((res) => {
    alert(`startGyroscope: ${ JSON.stringify(res) }`);
    GyroscopeChangeEvent.onGyroscopeChange.addListener((result) => {
      console.log(result);
    });
  }).catch((error) => {
    console.log("233", error);
  });
}
function getStopGyroscope() {
  System.gyroscope.stopGyroscope().then((res) => {
    alert(`stopGyroscope: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    console.log("233", error);
  });
}

export default class SystemDemo extends React.Component {
  render() {
    return (
      <View>
        <Separator />
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            [
              ["电量", getBattery],
              [],
              ["截屏监听", onUserCaptureScreen],
              [],
              ["内存警告", addMemoryWarning],
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
              ["短震", getVibrateShort],
              ["长震", getVibrateLong],
              [],
              ["申请录音权限", () => { requestPermission(Permissions.RECORD_AUDIO); }],
              ["申请相机权限", () => { requestPermission(Permissions.CAMERA); }],
              ["申请定位权限", () => { requestPermission(Permissions.LOCATION); }],
              [],
              ["获取位置信息（高精度）", () => { getLocation("high"); }],
              [],
              ["扫码", getScanCode]
            ].map((item, index) => {
              return (item.length >= 2 ? <ListItem
                key={index}
                title={item[0]}
                hideArrow={true}
                onPress={item[1].bind(this)}
              /> : <View style={{ height: 18 }} />);
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
}