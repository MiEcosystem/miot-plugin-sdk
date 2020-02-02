/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView
} from 'react-native';
import {ClassicBluetooth, ClassicBluetoothEvent} from "miot";

export default class ClassicBle extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {

    this.fontFamily = {};
    if (Platform.OS === 'android') {
      // 如果不设置英文字体，那么外文字符串将显示不全（Android）
      this.fontFamily = {fontFamily: 'Kmedium'}
    }

    console.log('ClassicBluetooth', ClassicBluetooth);
    console.log('ClassicBluetoothEvent', ClassicBluetoothEvent);

    this.classicBlueBondStateChanged = ClassicBluetoothEvent.classicBlueBondStateChanged.addListener((data) => {
        console.log('classicBlueBondStateChanged', data)
    });

    console.log('this.classicBlueBondStateChanged', this.classicBlueBondStateChanged);

    this.classicBlueConnectionStateChanged = ClassicBluetoothEvent.classicBlueConnectionStateChanged.addListener((data) => {
        console.log('classicBlueConnectionStateChanged', data)
    });

    this.classicBlueReceivedData = ClassicBluetoothEvent.classicBlueReceivedData.addListener((data) => {
        console.log('classicBlueReceivedData', data)
    });
  }

  componentWillUnmount() {
    this.classicBlueBondStateChanged.remove();
    this.classicBlueConnectionStateChanged.remove();
    this.classicBlueReceivedData.remove();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
                this._create();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第一步-初始化经典蓝牙-create</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
                this._prepareBluetoothProfile();
            }}
          >
            <Text
              style={[styles.textStyle, this.fontFamily]}>第二步-事先准备要需要的BluetoothProfile-prepareBluetoothProfile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
                this._connectBluetoothProfile();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第三步-Profile连接-connectBluetoothProfile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
                this._connectSocket();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第四步-根据device 的mac 地址，与中心设备建立socket 链接-connectSocket</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
                this._write();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第五步-向蓝牙设备写入数据-write</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
                this._disconnectSocket();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第六步-断开与中心设备的socket连接-disconnectSocket</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
                this._disconnectBluetoothProfile();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第七步-断开profile-disconnectBluetoothProfile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
                this._destroy();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第八步-销毁-destroy</Text>
          </TouchableOpacity>

        </ScrollView>

      </View>
    );
  }

  _create() {
    ClassicBluetooth.create().then((res) => {
      console.log('create', res)
    }).catch((error) => {
      console.log('create', error)
    });
  }

  _prepareBluetoothProfile() {
    let profile = 1;
    ClassicBluetooth.prepareBluetoothProfile(profile).then((profile) => {
        console.log('prepareBluetoothProfile', profile)
    }).catch((error) => {
      console.log('prepareBluetoothProfile', error)
    });
  }

  _connectBluetoothProfile() {
    let macAddress = 'AA:BB:CC:DD:EE:FF'
    let profile = 1;
    ClassicBluetooth.connectBluetoothProfile(macAddress, profile).then((res) => {
        console.log('connectBluetoothProfile', res)
    }).catch((error) => {
      console.log('connectBluetoothProfile', error)
    });
  }

  _connectSocket() {
    let macAddress = 'AA:BB:CC:DD:EE:FF'
    let transportUUID = '1000000-0000-0000-0000-00000000001';
    ClassicBluetooth.connectSocket(macAddress, transportUUID).then((res) => {
        console.log('connectSocket', res)
    }).catch((error) => {
      console.log('connectSocket', error)
    });
  }

  _write() {
    let data = 'aaa';
    ClassicBluetooth.write(data).then((res) => {
        console.log('write', res)
    }).catch((error) => {
      console.log('write', error)
    });
  }

  _disconnectSocket() {
    ClassicBluetooth.disconnectSocket().then((res) => {
        console.log('disconnectSocket', res)
    }).catch((error) => {
      console.log('disconnectSocket', error)
    });
  }

  _disconnectBluetoothProfile() {
    let macAddress = 'AA:BB:CC:DD:EE:FF'
    let profile = 1;
    ClassicBluetooth.disconnectBluetoothProfile(macAddress, profile).then((res) => {
        console.log('disconnectBluetoothProfile', res)
    }).catch((error) => {
      console.log('disconnectBluetoothProfile', error)
    });
  }

  _destroy() {
    ClassicBluetooth.destroy().then((res) => {
        console.log('destroy', res)
    }).catch((error) => {
      console.log('destroy', error)
    });
  }

}


const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#ffffff',
    fontSize: 14,
  }
});