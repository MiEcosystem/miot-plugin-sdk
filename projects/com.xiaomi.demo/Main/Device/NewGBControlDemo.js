import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import Logger from '../Logger';
import { Device, DeviceEvent, Host, Service } from 'miot';
import { NewGBTipsView } from 'miot/ui';

export default class NewGBControlDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    Logger.trace(this);
  }

  state = {
    isOpenNewGBBtn: false,
  };

  componentDidMount() {
    /**
     * 对设备属性进行订阅
     * prop.属性名, profile 设备这样进行传参   eg: prop.power
     * prop.siid.piid， spec协议设备这样进行传参  eg: prop.2.1
     */
    Device.getBluetoothLE().subscribeMessages('prop.remote-controllable', 'prop.3.1').then((res) => {
      console.log('subscribeMessages success', res);
    }).catch((error) => {
      console.log('subscribeMessages error', error);
    });

    // 监听设备属性发生变化事件； 当设备属性发生改变，会发送事件到js，此处会收到监听回调
    this.mDeviceReceivedMessages = DeviceEvent.deviceReceivedMessages.addListener(
      (device, messages) => {
        if (messages.has('prop.3.1')) {
          this.setState({ isOpenNewGBBtn: messages.get('prop.3.1') });
        }
      });
  }

  componentWillUnmount() {
    // 取消蓝牙属性订阅
    Device.getBluetoothLE().unsubscribeMessages('prop.power', 'prop.3.1');
    // 取消事件监听
    this.mDeviceReceivedMessages && this.mDeviceReceivedMessages.remove();
  }

  _isNewGBDevice = () => {
    console.log('click isNewGBDevice button');
    console.log('是否是新国标设备：', Device.isNewGBDevice);
  };

  _doOneAction = () => {
    Service.spec.doAction({ did: Device.deviceID, miid: 0, aiid: 1, siid: 2, in: [] }).then((res) => {
      if (res[0].code === -24) {
        Host.ui.openRemoteControlDialog(Device.deviceID);
      } else {
        console.log('正常执行操作', res);
      }
    }).catch((err) => {
      console.log('执行操作发生 err', err);
    });
  };

  _doOneSetProp = () => {
    Service.spec.setPropertiesValue([
      { did: Device.deviceID, siid: 2, piid: 2, value: 0 },
    ]).then((res) => {
      if (res[0].code === -24) {
        Host.ui.openRemoteControlDialog(Device.deviceID);
      } else {
        console.log('正常 set 操作 ===> res:', res);
      }
    }).catch((err) => {
      console.log('set 操作发生错误===>err:', err);
    });
  };

  render() {
    const visible = Device.isNewGBDevice && !this.state.isOpenNewGBBtn;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={this._isNewGBDevice}>
            <Text style={styles.buttonText}>是否是新国标设备？{Device.isNewGBDevice ? '是' : '否'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._doOneAction}>
            <Text style={styles.buttonText}>某个action操作按钮</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._doOneSetProp}>
            <Text style={styles.buttonText}>某个set设置属性按钮</Text>
          </TouchableOpacity>
          <View style={styles.newGBView}>
            <Text style={styles.buttonText}>是否提示新国标未开启tips？ {visible ? '是' : '否'}</Text>
            {visible ? <NewGBTipsView /> : null}
          </View>
          <View style={{width: '20%' }}>
            <Text style={styles.button} android_hyphenationFrequency={'full'}>international</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#838383',
  },
  button: {
    width: '90%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  newGBView: {
    flex: 1,
    width: '90%',
    flexDirection: 'column',
    backgroundColor: '#838383',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#555',
    fontSize: 18,
  },
});
