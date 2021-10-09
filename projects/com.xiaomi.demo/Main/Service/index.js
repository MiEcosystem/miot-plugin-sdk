import React from 'react';
import {
  Image, ListView, PixelRatio, StyleSheet, Text, TouchableHighlight, View
} from 'react-native';
import { Service } from 'miot';
import Logger from '../Logger';

export default class HostDemo extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this._createMenuData();
    this.state = { dataSource: ds.cloneWithRows(this._menuData.map((o) => (o.name))) };
    Logger.trace(this);
  }

  _createMenuData() {
    this._menuData = [
      {
        name: '智能家庭接口模块-smarthome',
        func: () => {
          this.props.navigation.navigate('callSmartHomeAPIDemo', { title: '智能家庭接口模块-smarthome' });
        }
      },
      {
        name: '家庭房间管理模块-Room',
        func: () => {
          this.props.navigation.navigate('MHRoomDemo', { title: '家庭房间管理模块-Room' });
        }
      },
      {
        name: '账户信息模块-Account',
        func: () => {
          this.props.navigation.navigate('AccountDemo', { title: '账户信息模块-Account' });
        }
      },
      {
        name: 'miot-spec模块',
        func: () => {
          this.props.navigation.navigate('MiotSpecDemo', { title: 'miot-spec模块' });
        }
      },
      {
        name: 'miot-spec-v3模块',
        func: () => {
          this.props.navigation.navigate('MiotSpecV3Demo', { title: 'miot-spec-v3模块' });
        }
      },
      {
        name: '云存储模块',
        func: () => {
          this.props.navigation.navigate('CloudStorageDemo', { title: '云存储模块模块' });
        }
      },
      {
        name: '智能/自动化模块-scene.js',
        func: () => {
          this.props.navigation.navigate('MHSceneDemo', { title: '智能/自动化模块' });
        }
      },
      {
        name: '通用的米家后台API调用接口',
        func: () => {
          Service.callSmartHomeAPI('/home/profiles', { uids: [Service.account.ID, '894158105'] })
            .then((res) => alert(JSON.stringify(res, null, '\t')))
            .catch((e) => alert(e));
        }
      },
      {
        name: '通用的米家后台API调用接口(错误测试)',
        func: () => {
          Service.callSmartHomeAPI('/xx/xx', {})
            .then((res) => alert(JSON.stringify(res)))
            .catch((e) => alert(e));
        }
      },
      {
        name: '获取当前家庭的电视列表',
        func: () => {
          Service.smarthome.getTvList()
            .then((res) => {
              console.log('getTvList,size:', res.data.length);
              alert(JSON.stringify(res));
            }).catch((e) => alert(e));
        }
      },
      {
        'name': 'callSpecificAPI',
        'func': () => {
          Service.callSpecificAPI('http://api.goseek.cn/Tools/holiday', 'get', { "date": "20191102" })
            .then((res) => alert(JSON.stringify(res, null, '\t')))
            .catch((e) => alert(JSON.stringify(e, null, '\t')));
        }
      },
      {
        'name': 'KookongDemo 酷控api Demo',
        'func': () => {
          this.props.navigation.navigate('KookongDemo', { title: '酷控api Demo' });
        }
      },
      {
        'name': 'callSmartHomeCameraAPI',
        'func': () => {
          Service.callSmartHomeCameraAPI('/wx/app/v1/put/pushSwitch', 'connect.camera', true, {})
            .then((res) => alert(JSON.stringify(res, null, '\t')))
            .catch((e) => alert(JSON.stringify(e, null, '\t')));
        }
      },
      {
        'name': '访问小爱服务端接口-获取聊天记录',
        'func': () => {
          Service.callXiaoaiNetworkAPI({ host: 'profile', path: '/device_profile/conversation', params: { limit: 5 } })
            .then((res) => alert(JSON.stringify(res, null, '\t')))
            .catch((e) => alert(JSON.stringify(e, null, '\t')));
        }
      },
      {
        'name': '访问小爱服务端接口-获取设备列表',
        'func': () => {
          Service.callXiaoaiNetworkAPI({ path: '/admin/v2/device_list', needDevice: 0 })
            .then((res) => alert(JSON.stringify(res, null, '\t')))
            .catch((e) => alert(JSON.stringify(e, null, '\t')));
        }
      },
      {
        'name': '访问小爱服务端接口-post请求',
        'func': () => {
          Service.callXiaoaiNetworkAPI({ host: 'normal', path: '/remote/ubus', needDevice: 1, method: 1, params: { deviceId: 'a0ffbb6b-19b4-4af5-af5d-de174d1c7cc2', method: 'enable', path: 'mibt', message: JSON.stringify({ btmode: 'classic', connect: 1, discover: 0 }) } })
            .then((res) => alert(JSON.stringify(res, null, '\t')))
            .catch((e) => alert(JSON.stringify(e, null, '\t')));
        }
      },
      {
        'name': '删除设备deleteDevice',
        'func': () => {
          Service.deleteDevice().then((res) => {
            console.log(JSON.stringify(res));
            alert(JSON.stringify(res));
          }).catch((err) => {
            console.log(JSON.stringify(err));
            alert(JSON.stringify(err));
          });
        }
      },
      {
        'name': '撤销隐私授权revokePrivacyLicense',
        'func': () => {
          Service.revokePrivacyLicense().then((res) => {
            console.log(JSON.stringify(res));
            alert(JSON.stringify(res));
          }).catch((err) => {
            console.log(JSON.stringify(err));
            alert(JSON.stringify(err));
          });
        }
      }
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.list} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor="#838383" onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{rowData}</Text>
            <Image style={styles.subArrow} source={require('../../Resources/sub_arrow.png')} />
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID) {
    this._menuData[rowID].func();
    Logger.trace(this, this._pressRow, this._menuData[rowID]);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0
  },
  rowContainer: {
    height: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1
  },
  subArrow: {
    width: 7,
    height: 14
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
    marginLeft: 20
  }
});
