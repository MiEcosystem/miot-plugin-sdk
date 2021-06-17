import { Device, Service } from "miot";
import { ListItem } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';
import Host from "miot/Host";
import { MemberType } from "miot/service/smarthome";
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import Logger from '../Logger';

export default class CallSmartHomeAPIDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      apiList: []
    };
    Logger.trace(this);
  }

  componentDidMount() {
    this.setState({
      apiList: [
        [
          { group: '蓝牙网关' },
          { name: "获取关联蓝牙列表", handle: this.handleObjRes.bind(this), action: () => { return Device.getLinkedBTDevices(); } }
        ],
        [
          { group: '固件信息' },
          { name: "点击查询设备新版本信息", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.checkDeviceVersion(Device.deviceID, Device.type); } },
          { name: "点击查询设备最新版本信息V2", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getLatestVersionV2(Device.deviceID); } },
          { name: "点击获取可用固件更新", handle: this.handleArrRes.bind(this), action: () => { return Service.smarthome.getAvailableFirmwareForDids([Device.deviceID]); } }
        ],
        [
          { group: '设置设备信息' },
          { name: "设置device setting", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.setDeviceSetting({ did: Device.deviceID, settings: { 'testK': 'testV' } }); } },
          { name: "获取device setting", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getDeviceSettingV2({ did: Device.deviceID, settings: ["testK"] }); } },
          { name: "删除device setting", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.delDeviceSetting({ did: Device.deviceID, settings: ["testK"] }); } },
          { name: "Batch 设置信息", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_string": 'name', "prop.s_json": JSON.stringify({ 'jname': 'test' }) } }]); } },
          { name: "Batch 获取信息", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_string", "prop.s_json"] }]); } }
        ],
        [
          { group: '用户收藏' },
          { name: "设置用户收藏", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.setUserColl({ did: Device.deviceID, name: 'testName', content: "testContent" }); } },
          { name: "获取用户收藏", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getUserColl({ did: Device.deviceID }); } },
          { name: "删除用户收藏", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getUserColl({ did: Device.deviceID }).then((result) => { if (result.length > 0) { return Service.smarthome.delUserColl({ did: Device.deviceID, coll_id: result[0].coll_id }); } else { return new Promise.reject("用户收藏为空"); } }); } }
        ],
        [
          { group: '成员' },
          { name: "获取成员", handle: this.handleArrRes.bind(this), action: () => { return Service.smarthome.loadMembers(MemberType.Person); } },
          {
            name: "创建成员", handle: this.handleObjRes.bind(this), action: () => {
              return Service.smarthome.createMember(MemberType.Person, {
                name: 'hahahahah'
              });
            }
          },
          {
            name: "更新成员", handle: this.handleObjRes.bind(this), action: () => {
              return Service.smarthome.loadMembers(MemberType.Person).then((res) => {
                if (res instanceof Array && res.length > 0) {
                  let p = res[0];
                  console.log('update:', p);
                  return Service.smarthome.updateMember(MemberType.Person, p.id, { name: `${ p.name }.` });
                } else {
                  return Promise.reject("no member to update");
                }
              });
            }
          },
          {
            name: "删除成员", handle: this.handleObjRes.bind(this), action: () => {
              return Service.smarthome.loadMembers(MemberType.Person).then((res) => {
                if (res instanceof Array && res.length > 0) {
                  let p = res[0];
                  console.log('delete:', p.id);
                  return Service.smarthome.deleteMember(MemberType.Person, [p.id]);
                } else {
                  return Promise.reject("no member to delete");
                }
              });
            }
          }
        ],
        [
          { group: '其他' },
          { name: "获取定位信息", handle: this.handleObjRes.bind(this), action: () => { return Host.locale.getLocation(); } },
          { name: "getDeviceDataRaw", handle: this.handleObjRes.bind(this), action: () => { let params = { "uid": Service.account.ID, "did": Device.deviceID, "type": "store", "key": "opt_log", "time_start": 1464658990, "time_end": 1464663600, "limit": 20 }; return Service.smarthome.getDeviceDataRaw(params).then((res) => { return new Promise.resolve({ "getDeviceDataRaw res": res }); }); } },
          { name: "上报设备数据", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.reportRecords(Device.deviceID, [{ type: "prop", key: "b", value: "c" }]); } },
          { name: "获取支持语音的设备-语音设备可用", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getVoiceCtrlDevices(Device.deviceID); } },
          { name: "当前服务器国家码", handle: this.handleObjRes.bind(this), action: () => { return Host.getCurrentCountry().then((res) => { return new Promise.resolve({ "res": res }); }); } },
          {
            name: "获取AppConfig配置文件信息", handle: this.handleObjRes.bind(this), action: () => {
              let params = {
                name: "local_timer_config",
                lang: 'zh_CN',
                version: "1",
                result_level: '0'
              };
              return Service.smarthome.getAppConfig(params);
            }
          },
          { name: "获取首页设备列表", handle: this.handleObjRes.bind(this), action: () => { return Service.smarthome.getHomeDevice({}); } },
          {
            name: "插件事件上报reportEvent", handle: this.handleObjRes.bind(this), action: () => {
              let eventName = 'testEvent';
              let params = { 'key1': 'value1', 'key2': 'value2', 'tip': 'tips' };
              Service.smarthome.reportEvent(eventName, params);
              return Promise.resolve("reported");
            }
          },
          {
            name: "获取多键开关名称", handle: this.handleObjRes.bind(this), action: () => {
              return Service.smarthome.getMultiSwitchName(Device.deviceID);
            }
          }
        ]
      ]
    });
  }

  handleObjRes(result) {
    let item = [];
    for (let key in result) {
      item.push({ 'key': key, 'value': JSON.stringify(result[key]) });
    }
    alert(JSON.stringify(result, null, '\t'));
    this.setState((preState) => {
      return { dataSource: item };
    });
  }

  handleArrRes(result) {
    console.log(result instanceof Array);
    if (!(result instanceof Array)) {
      result = result.list;
      if (!(result instanceof Array)) {
        return;
      }
    }
    let items = [];
    for (let i = 0; i < result.length; i++) {
      let item = result[i];
      items.push({ 'key': i, 'value': "----" });
      for (let key in item) {
        items.push({ 'key': key, 'value': `v:${ JSON.stringify(item[key]) }` });
      }
    }
    this.setState((preState) => {
      return { dataSource: items };
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Separator />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ padding: 10, marginVertical: 2, textAlign: 'center', backgroundColor: '#FFF' }}>{this.state.dataSource.length > 0 ? '结果输出' : '点击功能列表项目展示输出结果'}</Text>
          {
            this.state.dataSource.map((item, index) => {
              return (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1, padding: 10, width: '100%', backgroundColor: index % 2 == 0 ? '#FFF' : '#FFFFFFE0' }}>
                  <Text>{`${ item.key }:    `}</Text>
                  <Text>{item.value}</Text>
                </View>);
            })
          }
          <Text style={{ padding: 10, marginVertical: 2, textAlign: 'center', backgroundColor: '#FFF' }}>{'功能列表'}</Text>
          {
            this.state.apiList.map((items, index) => {
              return <View key={index}>
                <Text style={{ margin: 5, marginLeft: 25 }}>{items[0].group}</Text>
                {
                  items.filter((item) => item.name).map((item, key) => {
                    return <ListItem
                      key={key}
                      title={item.name}
                      onPress={(_) => {
                        item.action && item.action().then((result) => {
                          console.log("api res", result);
                          item.handle && item.handle(result);
                        }).catch((err) => {
                          console.log("err", err);
                          alert(JSON.stringify(err, null, '\t'));
                        });
                        Logger.trace(this, item.action, item);
                      }
                      } />;
                  })
                }
              </View>;
            })
          }
        </ScrollView>
      </View>
    );
  }
}