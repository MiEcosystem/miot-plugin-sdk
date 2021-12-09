import { Device, Service, DeviceEvent } from "miot";
import React from 'react';
import { Host } from 'miot';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Logger from '../Logger';

export default class CallSmartHomeAPIDemo extends React.Component {
  constructor(props) {
    super(props);
    let did = Device.deviceID;
    this.state = {
      selectBtn: 1,
      dataArray: [`${ did }.2.1.true`, `${ did }.2.1`, `${ did }.2.1.[10]`, '2.1', did],
      result: "结果展示区\n\n设置属性请在上面文本框输入:did.siid.piid.value，然后点击执行\n获取属性请在上面文本框输入did.siid.piid，然后点击执行\n调用方法请输入did.aiid.piid后点击执行\n订阅请输入siid.piid后点击执行\n获取spec请直接输入did后点击执行"
    };
    Logger.trace(this);
  }

  componentDidMount() {
    Host.file.readFile('miot-spec-config').then((res) => {
      if (res) {
        this.setState({ dataArray: JSON.parse(res) });
      }
    }).catch(() => {
    });
    this._deviceStatusListener = DeviceEvent.deviceReceivedMessages.addListener(
      (device, map, res) => {
        this.setState({ result: JSON.stringify(res, null, '\t') });
        console.log('Device.addListener', device, map, res);
      });
    this._deviceNameChangedListener = DeviceEvent.deviceNameChanged.addListener((device) => {
      console.log("不要以为你改了名字我就不认识你了", device);
      this.props.navigation.setParams({
        name: device.name
      });
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    Host.file.writeFile('miot-spec-config', JSON.stringify(this.state.dataArray));
    this._deviceStatusListener && this._deviceStatusListener.remove();
    this._deviceNameChangedListener && this._deviceNameChangedListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={{ backgroundColor: '#FFF', flexDirection: 'row' }}>
            {
              ['设置属性', '获取属性', '调用方法', '订阅', '获取Spec'].map((item, index) => {
                let adjustIndex = index + 1;
                return (
                  <TouchableOpacity key={index} onPress={() => {
                    Logger.trace(this, this.render, { name: item });
                    this.setState({ selectBtn: adjustIndex });
                  }}
                  style={[styles.button, this.state.selectBtn == adjustIndex && styles.buttonSelected]}>
                    <Text style={[styles.buttonText, this.state.selectBtn == adjustIndex && styles.buttonTextSelected]}>{item}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
          {
            this.state.dataArray.map((val, index) => {
              return this._createTextRow(index, val);
            })
          }
          <View style={{ backgroundColor: '#FFF', flexDirection: 'row', paddingVertical: 20 }}>
            {
              [
                ['获取缓存Spec', this._getCurrentSpecValue],
                ['添加一条', () => { this.state.dataArray.push(''); this.setState({}); }]
              ].map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => {
                    item[1].bind(this)();
                    Logger.trace(this, item[1], { action: item[0] });
                  }} style={styles.button}>
                    <Text style={styles.buttonText}>{item[0]}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
          <TextInput editable={false}
            style={{ minHeight: 150, margin: 10, padding: 10, borderRadius: 5, borderColor: '#DDD', borderWidth: 0.5, backgroundColor: '#fff' }}
            multiline={true} numberOfLines={0} value={this.state.result}></TextInput>
        </ScrollView>
      </View>
    );
  }

  _createTextRow(curIndex, title) {
    return (
      <View key={curIndex} style={{ height: 50, paddingVertical: 8, flexDirection: 'row', backgroundColor: '#FFF' }}>
        <TextInput
          style={{ flex: 1, marginLeft: 10, paddingLeft: 10, borderColor: '#ccc', borderWidth: 0.5 }}
          onChangeText={(result) => {
            this.state.dataArray[curIndex] = result;
            this.setState({});
          }}
          clearButtonMode="while-editing"
          placeholder="请输入参数,格式为did.siid.piid.value,比如：12345.2.1.on"
          value={title}
        />
        {
          [
            ['执行', this._onOpenSubPage],
            ['删除', this._deleteRow]
          ].map((item, index) => {
            return (
              <TouchableOpacity onPress={() => {
                item[1].bind(this)(curIndex);
                Logger.trace(this, item[1], { action: item[0] });
              }}
              style={{ width: 50, height: 30, marginLeft: 5, justifyContent: 'center', alignSelf: 'center' }}>
                <Text>{item[0]}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

  _deleteRow(index) {
    this.state.dataArray.splice(index, 1);
    this.setState({});
  }

  _parseValue(param) {
    if (this._isNumber(param)) {
      return parseFloat(param);
    } else if (param == 'true') {
      return true;
    } else if (param == 'false') {
      return false;
    } else {
      try {
        let obj = JSON.parse(param);
        if (obj) return obj;
      } catch (e) {
        return param;
      }
    }
    return param;
  }

  _isNumber(val) {
    let regPos = /^\d+(\.\d+)?$/; // 非负浮点数
    if (regPos.test(val)) {
      return true;
    } else {
      return false;
    }
  }

  _onOpenSubPage(index) {
    const did = Device.deviceID;
    const value = this.state.dataArray[index];
    let array = value.split('.');
    switch (this.state.selectBtn) {
      case 1:
        if (array.length < 3) {
          this.setState({ result: '参数错误，请仔细参照说明传递' });
          return;
        }
        Service.spec.setPropertiesValue([{
          did: array[0],
          siid: parseInt(array[1]),
          piid: parseInt(array[2]),
          value: array.length > 3 ? this._parseValue(array[3]) : null
        },
        {
          did: array[0],
          siid: 11,
          piid: 22,
          value: 33
        }]).then((res) => {
          this.setState({ result: JSON.stringify(res, null, '\t') });
        }).catch((res) => {
          this.setState({ result: res.message });
        });
        break;
      case 2:
        if (array.length < 3) {
          this.setState({ result: '参数错误，请仔细参照说明传递' });
          return;
        }
        Service.spec.getPropertiesValue([{
          did: array[0],
          siid: parseInt(array[1]),
          piid: parseInt(array[2])
        },
        {
          did: array[0],
          siid: 11,
          piid: 22
        }]).then((res) => {
          this.setState({ result: JSON.stringify(res, null, '\t') });
        }).catch((res) => {
          this.setState({ result: res.message });
        });
        break;
      case 3:
        if (array.length < 3) {
          this.setState({ result: '参数错误，请仔细参照说明传递' });
          return;
        }
        Service.spec.doAction({
          did: array[0],
          siid: parseInt(array[1]),
          aiid: parseInt(array[2]),
          in: array.length > 3 ? this._parseValue(array[3]) : null
        }).then((res) => {
          this.setState({ result: JSON.stringify(res, null, '\t') });
        }).catch((res) => {
          this.setState({ result: res.message });
        });
        break;
      case 4:
        if (array.length < 2) {
          this.setState({ result: '参数错误，请仔细参照说明传递' });
          return;
        }
        Device.getDeviceWifi().subscribeMessages(`prop.${ array[0] }.${ array[1] }`).then((res) => {
          this.setState({ result: JSON.stringify(res, null, '\t') });
        }).catch((res) => {
          this.setState({ result: res.message });
        });
        break;
      case 5:
        if (array.length < 1) {
          this.setState({ result: '参数错误，请仔细参照说明传递' });
          return;
        }
        Service.spec.getSpecString(array[0]).then((res) => {
          this.setState({ result: JSON.stringify(res, null, '\t') });
        }).catch((res) => {
          this.setState({ result: res.message });
        });
        break;
      default:
        break;
    }
  }

  /**
   * 从米家APP缓存获取spec
   * @returns {Promise<void>}
   * @private
   */
  async _getCurrentSpecValue() {
    let data = await Service.spec.getCurrentSpecValue(Device.deviceID);
    console.log("data", data);
    this.setState({
      result: JSON.stringify(data)
    });
  }
}

var styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  buttonTextSelected: {
    color: '#fc4343'
  },
  buttonSelected: {
    borderColor: '#fc4343'
  }
});