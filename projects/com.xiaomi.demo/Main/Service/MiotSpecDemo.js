import {Device, Service, DeviceEvent} from "miot";
import React from 'react';
import {Host} from 'miot'
import {StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Platform} from 'react-native';

export default class CallSmartHomeAPIDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectBtn: 1,
      dataArray: ['124660227.2.1.true', '124660227.2.1', '124660227.2.1.[10]', '2.1', '124660227'],
      result: "结果展示区\n\n设置属性请在上面文本框输入:did.siid.piid.value，然后点击执行\n获取属性请在上面文本框输入did.siid.piid，然后点击执行\n调用方法请输入did.aiid.piid后点击执行\n订阅请输入siid.piid后点击执行\n获取spec请直接输入did后点击执行",
    }
  }

  componentWillMount() {
      // 如果不设置英文字体，那么外文字符串将显示不全（Android）
      this.fontFamily = {};
      if (Platform.OS === 'android')  {
          this.fontFamily = { fontFamily: 'Kmedium' }
      };
  }

    componentDidMount() {
    Host.file.readFile('miot-spec-config').then(res => {
      if (res) {
        this.setState({dataArray: JSON.parse(res)});
      }
    }).catch(err => {
    });
    this._deviceStatusListener = DeviceEvent.deviceReceivedMessages.addListener(
      (device, map, res) => {
        this.setState({result: JSON.stringify(res)})
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
      <View style={{flex: 1}}>
        <ScrollView style={styles.containerMenu}>
          <View style={{height: 50, flexDirection: 'row', marginBottom: 8}}>
            <TouchableOpacity onPress={() => {
              this.setState({selectBtn: 1})
            }} style={[styles.topButton, this.state.selectBtn == 1 && styles.topButtonSelected]}><Text
              style={[styles.topButtonText, this.state.selectBtn == 1 && styles.topButtonTextSelected]}>设置属性</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({selectBtn: 2})
            }} style={[styles.topButton, this.state.selectBtn == 2 && styles.topButtonSelected]}><Text
              style={[styles.topButtonText, this.state.selectBtn == 2 && styles.topButtonTextSelected]}>获取属性</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({selectBtn: 3})
            }} style={[styles.topButton, this.state.selectBtn == 3 && styles.topButtonSelected]}><Text
              style={[styles.topButtonText, this.state.selectBtn == 3 && styles.topButtonTextSelected]}>调用方法</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({selectBtn: 4})
            }} style={[styles.topButton, this.state.selectBtn == 4 && styles.topButtonSelected]}><Text
              style={[styles.topButtonText, this.state.selectBtn == 4 && styles.topButtonTextSelected]}>订阅</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({selectBtn: 5})
            }} style={[styles.topButton, this.state.selectBtn == 5 && styles.topButtonSelected]}><Text
              style={[styles.topButtonText, this.state.selectBtn == 5 && styles.topButtonTextSelected]}>获取Spec</Text></TouchableOpacity>
          </View>
          <View>
            {this.state.dataArray.map((val, index) => {
              return this._createTextRow(index, val);
            })}
          </View>
          <View style={{
            height: 60,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>

              <TouchableOpacity
                onPress={() => {
                    this._getCurrentSpecValue().then(r => {});
                }}
                style={{
                  height: 30,
                  borderColor: '#ccc',
                  borderWidth: 0.5,
                  marginVertical: 10,
                  marginRight:10,
                  justifyContent: 'center',
                  alignItems: 'center'
              }}><Text style={[this.fontFamily]}>获取缓存Spec</Text>
              </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.state.dataArray.push('');
              this.setState({})
            }} style={{
              width: 70,
              height: 30,
              borderColor: '#ccc',
              borderWidth: 0.5,
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}><Text>添加一条</Text>
            </TouchableOpacity>
          </View>
          <TextInput editable={false}
                     style={{height: 250, margin: 10, borderColor: '#eee', borderWidth: 0.5, backgroundColor: '#ccc'}}
                     multiline={true} numberOfLines={0} value={this.state.result}></TextInput>
        </ScrollView>
      </View>
    )
  }

  _createTextRow(curIndex, title) {
    return (<View key={curIndex} style={{height: 50, paddingVertical: 8, flexDirection: 'row',}}>
      <TextInput style={{flex: 1, marginLeft: 10, borderColor: '#ccc', borderWidth: 0.5}} onChangeText={(result) => {
        this.state.dataArray[curIndex] = result;
        this.setState({});
      }} clearButtonMode='while-editing' placeholder='请输入参数,格式为did.siid.piid.value,比如：12345.2.1.on' value={title}/>
      <TouchableOpacity onPress={() => {
        this._onOpenSubPage(curIndex);
      }} style={{
        width: 50,
        height: 30,
        marginLeft: 5,
        justifyContent: 'center',
        alignSelf: 'center'
      }}><Text>执行</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        this._deleteRow(curIndex)
      }} style={{
        width: 50,
        height: 30,
        marginLeft: 5,
        justifyContent: 'center',
        alignSelf: 'center'
      }}><Text>删除</Text></TouchableOpacity>
    </View>)
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
        var obj = JSON.parse(param);
        if (obj) return obj;
      } catch (e) {
        return param;
      }
    }
    return param;
  }

  _isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    if (regPos.test(val)) {
      return true;
    } else {
      return false;
    }
  }

  _onOpenSubPage(index) {
    const did = Device.deviceID;
    const value = this.state.dataArray[index];
    var array = value.split('.');
    switch (this.state.selectBtn) {
      case 1:
        if (array.length < 3) {
          this.setState({result: '参数错误，请仔细参照说明传递'});
          return;
        }
        Service.spec.setPropertiesValue([{
          did: array[0],
          siid: parseInt(array[1]),
          piid: parseInt(array[2]),
          value: array.length > 3 ? this._parseValue(array[3]) : null
        }]).then(res => {
          console.log('resolve');
          this.setState({result: JSON.stringify(res)});
        }).catch(res => {
          console.log('catch');
          this.setState({result: res.message});
        });
        break;
      case 2:
        if (array.length < 3) {
          this.setState({result: '参数错误，请仔细参照说明传递'});
          return;
        }
        Service.spec.getPropertiesValue([{
          did: array[0],
          siid: parseInt(array[1]),
          piid: parseInt(array[2])
        }]).then(res => {
          this.setState({result: JSON.stringify(res)});
        }).catch(res => {
          this.setState({result: res.message});
        });
        break;
      case 3:
        if (array.length < 3) {
          this.setState({result: '参数错误，请仔细参照说明传递'});
          return;
        }
        Service.spec.doAction({
          did: array[0],
          siid: parseInt(array[1]),
          aiid: parseInt(array[2]),
          in: array.length > 3 ? this._parseValue(array[3]) : null
        }).then(res => {
          this.setState({result: JSON.stringify(res)});
        }).catch(res => {
          this.setState({result: res.message});
        });
        break;
      case 4:
        if (array.length < 2) {
          this.setState({result: '参数错误，请仔细参照说明传递'});
          return;
        }
        Device.getDeviceWifi().subscribeMessages("prop." + array[0] + "." + array[1]).then(res => {
          this.setState({result: JSON.stringify(res)});
        }).catch(res => {
          this.setState({result: res.message});
        });
        break;
      case 5:
        if (array.length < 1) {
          this.setState({result: '参数错误，请仔细参照说明传递'});
          return;
        }
        Service.spec.getSpecString(array[0]).then(res => {
          this.setState({result: JSON.stringify(res)});
        }).catch(res => {
          this.setState({result: res.message});
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
      console.log("data", data)
      this.setState({
          result: JSON.stringify(data)
      })
  }

}

var styles = StyleSheet.create({
  containerAll: {
    flex: 1, flexDirection: 'column', backgroundColor: '#cccccc', marginTop: 0,
  },
  containerIconDemo: {
    flex: 1.7,
    flexDirection: 'column',
    backgroundColor: '#191919',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  containerMenu: {
    flex: 1, flexDirection: 'column', backgroundColor: '#ffffff', alignSelf: 'stretch',
  },
  topButton: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 0.5,
    backgroundColor: '#eee',
    alignContent: 'center',
    justifyContent: 'center'
  },
  topButtonText: {color: '#333', fontSize: 14, alignSelf: 'stretch', textAlign: 'center'},
  topButtonTextSelected: {color: '#fc4343'},
  topButtonSelected: {borderColor: '#fc4343'},
  iconDemo: {
    width: 270, height: 181, alignSelf: 'center',
  },
  iconText: {
    fontSize: 20, textAlign: 'center', color: '#ffffff', marginTop: 20, alignSelf: 'center'
  },
  rowContainer: {
    alignSelf: 'stretch', flexDirection: 'row', flex: 1,
  },
  title: {
    fontSize: 17,
    alignItems: 'center',
    alignSelf: 'center',
    color: '#000000',
    flex: 1,
    marginLeft: 15
  },
  subArrow: {
    width: 9, height: 17, marginRight: 15, alignSelf: 'center',
  },
  separator: {
    height: 0.5,
    alignSelf: 'stretch',
    backgroundColor: '#dddddd',
    marginLeft: 15,
    marginRight: 15,
  },
});