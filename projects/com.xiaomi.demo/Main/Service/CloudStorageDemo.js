import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Platform
} from 'react-native';
import { Device, Service } from "miot";

export default class CloudStorageDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };

  }

  render() {

    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' }

    return (
      <View>
        <TouchableOpacity style={styles.btnStyle} onPress={(e) => {
          let data = { "1010530098": { "userGroupList": [{ "userGroupId": 0, "passwordList": [{ "groupId": 0, "id": 61, "name": "密码03", "number": 3, "authority": 0, "timeInternal": 1561553832, "type": 2 }], "fingerprintList": [], "nfcList": [], "userGroupType": 0, "userGroupIconId": "default", "userGroupIconUrl": "", "userGroupName": "未分配" }, { "userGroupId": 1, "passwordList": [{ "groupId": 1, "id": 81, "name": "密码11", "number": 11, "authority": 1, "timeInternal": 536871298, "type": 2 }, { "groupId": 1, "id": 83, "name": "密码02", "number": 2, "authority": 1, "timeInternal": 536871298, "type": 2 }, { "groupId": 1, "id": 127, "name": "密码01", "number": 1, "authority": 1, "timeInternal": 536871298, "type": 2 }], "fingerprintList": [{ "groupId": 1, "id": 58, "name": "指纹01", "number": 1, "authority": 1, "timeInternal": 1561553771, "type": 1 }], "nfcList": [], "userGroupType": 1, "userGroupIconId": "default", "userGroupIconUrl": "", "userGroupName": "我" }], "NFCCidBindList": [] }, "1010586195": { "userGroupList": [{ "userGroupId": 1, "passwordList": [], "fingerprintList": [{ "groupId": 1, "id": 4, "name": "指纹02", "number": 2, "authority": 1, "timeInternal": 1561949698, "type": 1 }], "nfcList": [], "userGroupType": 1, "userGroupIconId": "default", "userGroupIconUrl": "", "userGroupName": "我" }, { "userGroupId": 2, "passwordList": [{ "groupId": 2, "id": 5, "name": "密码02", "number": 2, "authority": 1, "timeInternal": 1561949749, "type": 2 }, { "groupId": 2, "id": 6, "name": "密码03", "number": 3, "authority": 1, "timeInternal": 1561974195, "type": 2 }], "fingerprintList": [{ "groupId": 2, "id": 3, "name": "指纹01", "number": 1, "authority": 1, "timeInternal": 1561949200, "type": 1 }], "nfcList": [], "userGroupType": 1, "userGroupIconId": "default", "userGroupIconUrl": "", "userGroupName": "用户A" }, { "userGroupId": 3, "passwordList": [{ "groupId": 3, "id": 11, "name": "密码01", "number": 1, "authority": 2, "timeInternal": 536871298, "type": 2 }], "fingerprintList": [], "nfcList": [], "userGroupType": 2, "userGroupIconId": "default", "userGroupIconUrl": "", "userGroupName": "用户B" }], "NFCCidBindList": [], "oneTimePasswordList": [{ "number": 0, "startTime": 1562845800, "isInvalid": false, "createTime": 1562846204 }] }, "1020006468": { "userGroupList": [{ "fingerprintList": [], "nfcList": [], "passwordList": [{ "authority": 1, "createTime": 1562836099, "groupId": 1, "id": 1, "name": "密码01", "number": 1, "type": 2 }], "userGroupId": 1, "userGroupName": "我", "userGroupType": 1 }] } }
          Service.storage.setThirdUserConfigsForOneKey(Device.model, 234, data).then((res) => {
            console.log("res", res)
            alert(JSON.stringify(res))
          }).catch((error) => {
            console.log("error", error)
            alert(JSON.stringify(error))
          })
        }}>
          <Text style={[{ color: '#ffffff' }, fontFamily]}>setThirdUserConfigsForOneKey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={(e) => {
          Service.storage.getThirdUserConfigsForOneKey(Device.model, 234).then((res) => {
            console.log("res", res, res.data)
            alert(JSON.stringify(res.data))
          }).catch((error) => {
            console.log("error", error)
            alert(JSON.stringify(error))
          })
        }}>
          <Text style={[{ color: '#ffffff' }, fontFamily]}>getThirdUserConfigsForOneKey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={(e) => {
          Service.storage.setUserConfigs(1, { "open": "YES", "test1": "test2" }).then((res) => {
            console.log("res", res)
            alert(res)
          }).catch((error) => {
            console.log("error", error)
            alert(JSON.stringify(error))
          })
        }}>
          <Text style={[{ color: '#ffffff' }, fontFamily]}>setUserConfigs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={(e) => {
          Service.storage.getUserConfigs(1, "open", "test1").then((res) => {
            console.log("res", res, res.data)
            alert(JSON.stringify(res.data))
          }).catch((error) => {
            console.log("error", error)
            alert(JSON.stringify(error))
          })
        }}>
          <Text style={[{ color: '#ffffff' }, fontFamily]}>getUserConfigs</Text>
        </TouchableOpacity>
      </View>
    );
  }



}
// eslint-disable-next-line no-var,vars-on-top
var styles = StyleSheet.create({
  btnStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
