import React from 'react';

import {
  View,
  Button
} from 'react-native';
import { System, MemoryWarningEvent, AccelerometerChangeEvent, CompassChangeEvent, GyroscopeChangeEvent } from "miot";
import { Permissions } from "miot/system/permission";
import { Separator } from 'mhui-rn';



export const interval = {
  "a": "game",
  "b": "ui",
  "c": "normal"
};

// 电量
function getBattery() {
  System.BatteryInstance.getBatteryInfo().then((res) => {
    alert(`getBatteryInfo:${ JSON.stringify(res) }`);
    console.log("111", res);
  }).catch((error) => {
    console.log("233", error);
  });
}

// 震动
function getVibrateShort() {
  System.VibrateInstance.vibrateShort();
}
function getVibrateLong() {
  System.VibrateInstance.vibrateLong();
}

// 截屏
function onUserCaptureScreen() {
  alert(`onUserCaptureScreen,待实现`);
}

// 精确位置
function getLocation(accuracy) {
  System.LocationInstance.getLocation(accuracy).then((location) => {
    alert(JSON.stringify(location));
    
  });
}

// 扫码
function getScanCode() {
  System.ScanCodeInstance.scanCode().then((res) => {
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
  System.PermissionInstance.request(permission).then((res) => {
    console.log("111", (res));
  }).catch((error) => {
    console.log("233", error);
  });
}

// 加速计
function getStartAccelerometer() {
  System.AccelerometerInstance.startAccelerometer(interval.a).then((res) => {
    alert(`startAccelerometer: ${ JSON.stringify(res) }`);
    AccelerometerChangeEvent.onAccelerometerChange.addListener((result) => {
      console.log(result);
    });
  }).catch((error) => {
    console.log("233", error);
  });
}
function getStopAccelerometer() {
  System.AccelerometerInstance.stopAccelerometer().then((res) => {
    alert(`stopAccelerometer: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    console.log("233", error);
  });
}

// 罗盘
function getStartCompass() {
  System.CompassInstance.startCompass(interval.c).then((res) => {
    alert(`startCompass: ${ JSON.stringify(res) }`);
    CompassChangeEvent.onCompassChange.addListener((result) => {
      console.log(result);
    });
  }).catch((error) => {
    console.log("233", error);
  });
}
function getStopCompass() {
  System.CompassInstance.stopCompass().then((res) => {
    alert(`stopCompass: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    console.log("233", error);
  });
}

// 陀螺仪
function getStartGyroscope() {
  System.GyroscopeInstance.startGyroscope(interval.c).then((res) => {
    alert(`startGyroscope: ${ JSON.stringify(res) }`);
    GyroscopeChangeEvent.onGyroscopeChange.addListener((result) => {
      console.log(result);
    });
  }).catch((error) => {
    console.log("233", error);
  });
}
function getStopGyroscope() {
  System.GyroscopeInstance.stopGyroscope().then((res) => {
    alert(`stopGyroscope: ${ JSON.stringify(res) }`);
  }).catch((error) => {
    console.log("233", error);
  });
}


export default class SystemDemo extends React.Component {
  render() {
    return (
      <View>
        <View>
          <Button title="电量" onPress={() => getBattery()} />
        </View>
        <Separator/>
        <View>
          <Button title="截屏监听" onPress={() => onUserCaptureScreen()} />
        </View>
        <Separator/>
        <View>
          <Button title="内存警告" onPress={() => addMemoryWarning()} />
        </View>
        <Separator/>
        <View>
          <Button title="开始监听加速计" onPress={() => getStartAccelerometer()} />
          <Button title="停止监听加速计" onPress={() => getStopAccelerometer()} />
        </View>
        <Separator/>
        <View>
          <Button title="开始监听罗盘" onPress={() => getStartCompass()} />
          <Button title="停止监听罗盘" onPress={() => getStopCompass()} />
        </View>
        <Separator/>
        <View>
          <Button title="开始监听陀螺仪" onPress={() => getStartGyroscope()} />
          <Button title="停止监听陀螺仪" onPress={() => getStopGyroscope()} />
        </View>
        <Separator/>
        <View>
          <Button title="短震" onPress={() => getVibrateShort()} />
          <Button title="长震" onPress={() => getVibrateLong()} />
        </View>
        <Separator/>
        <View>
          <Button title="申请录音权限" onPress={() => requestPermission(Permissions.RECORD_AUDIO)} />
        </View>
        <View>
          <Button title="申请相机权限" onPress={() => requestPermission(Permissions.CAMERA)} />
        </View>
        <View>
          <Button title="申请定位权限" onPress={() => requestPermission(Permissions.LOCATION)} />
        </View>
        <Separator/>
        <View>
          <Button title="获取位置信息（高精度）" onPress={() => getLocation("high")} />
        </View>
        <Separator/>
        <View>
          <Button title="扫码" onPress={() => getScanCode()} />
        </View>
        <Separator/>
      </View>

    );
  }

  myListener = (value) => {
    console.log(`SystemDemo listener`);
    console.log(value.level);
    alert(`onMemoryWarning,level:${ value.level }`);
  }

  componentDidMount() {
    console.log(`SystemDemo componentDidMount`);
  }

  componentWillUnmount() {
    console.log(`SystemDemo componentWillUnmount`);
  }

}