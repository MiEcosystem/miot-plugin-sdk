/**
 * @deprecated  该部分废弃， 请查看 Host/KVStorageDemo.js
 */
import {Device, Host, Service} from "miot";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";


export default class StorageDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      value: "",
      key1: "",
      value1: "",
      txt: "",
      txtAll: ""
    };
  }


  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={{ margin: 10 }}>
          <TextInput style={[styles.searchTextInput]}
            placeholder='输入要存的key0'
            onChangeText={
              (text) => {
                this.setState(
                  (preState) => {
                    return { "key": text };
                  }
                );

              }
            }
          />
        </View>
        <View style={{ margin: 10 }}>
          <TextInput style={[styles.searchTextInput]}
            placeholder='输入要存的value0'
            onChangeText={
              (text) => {
                this.setState(
                  (preState) => {
                    return { "value": text };
                  }
                );

              }
            }
          />
        </View>
        <View style={{ margin: 10 }}>
          <TextInput style={[styles.searchTextInput]}
            placeholder='输入要存的key1'
            onChangeText={
              (text) => {
                this.setState(
                  (preState) => {
                    return { "key1": text };
                  }
                );

              }
            }
          />
        </View>
        <View style={{ margin: 10 }}>
          <TextInput style={[styles.searchTextInput]}
            placeholder='输入要存的value1'
            onChangeText={
              (text) => {
                this.setState(
                  (preState) => {
                    return { "value1": text };
                  }
                );

              }
            }
          />
        </View>
        <Button title="保存 key0 数据" onPress={() => {
          Host.storage.set(this.state.key, this.state.value);
          alert("set success");
        }} />
        <Button title="保存 key0 key1 数据" onPress={() => {
          info = {};
          info[this.state.key] = this.state.value;
          info[this.state.key1] = this.state.value1;
          Host.storage.save(info);
          alert("save success", info);
        }} />
        <Button title="保存 key0 数据 有效期60秒" onPress={() => {
          Host.storage.set(this.state.key, this.state.value, { expire: 60000 });
          alert("set success");
        }} />
        <Button title="保存 key0 key1 数据 有效期60秒" onPress={() => {
          info = {};
          info[this.state.key] = this.state.value;
          info[this.state.key1] = this.state.value1;
          Host.storage.save(info, { expire: 60000 });
          alert("save success", info);
        }} />
        <Button title="读取 key0 数据" onPress={() => {
          Host.storage.get(this.state.key)
            .then((value) => {
              console.log(value)
              this.setState({
                "txt": value || "null"
              });
            })
            .catch((failure) => { alert(failure) });
        }} />
        <Text style={styles.text}>{this.state.txt}</Text>
        <Button title="读取 key0 key1 数据" onPress={() => {
          Host.storage.load([this.state.key, this.state.key1])
            .then((values) => {
              console.log(values)
              var info = "v1:" + (values[0] || "null") + "，v2:" + (values[1] || "null");
              alert(info);
            }).catch((failure) => { alert(failure) });
        }} />

        <View>
          <TouchableOpacity style={{marginTop: 10, height: 40, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center'}} onPress={(e)=>{
            let data = {"1010530098":{"userGroupList":[{"userGroupId":0,"passwordList":[{"groupId":0,"id":61,"name":"密码03","number":3,"authority":0,"timeInternal":1561553832,"type":2}],"fingerprintList":[],"nfcList":[],"userGroupType":0,"userGroupIconId":"default","userGroupIconUrl":"","userGroupName":"未分配"},{"userGroupId":1,"passwordList":[{"groupId":1,"id":81,"name":"密码11","number":11,"authority":1,"timeInternal":536871298,"type":2},{"groupId":1,"id":83,"name":"密码02","number":2,"authority":1,"timeInternal":536871298,"type":2},{"groupId":1,"id":127,"name":"密码01","number":1,"authority":1,"timeInternal":536871298,"type":2}],"fingerprintList":[{"groupId":1,"id":58,"name":"指纹01","number":1,"authority":1,"timeInternal":1561553771,"type":1}],"nfcList":[],"userGroupType":1,"userGroupIconId":"default","userGroupIconUrl":"","userGroupName":"我"}],"NFCCidBindList":[]},"1010586195":{"userGroupList":[{"userGroupId":1,"passwordList":[],"fingerprintList":[{"groupId":1,"id":4,"name":"指纹02","number":2,"authority":1,"timeInternal":1561949698,"type":1}],"nfcList":[],"userGroupType":1,"userGroupIconId":"default","userGroupIconUrl":"","userGroupName":"我"},{"userGroupId":2,"passwordList":[{"groupId":2,"id":5,"name":"密码02","number":2,"authority":1,"timeInternal":1561949749,"type":2},{"groupId":2,"id":6,"name":"密码03","number":3,"authority":1,"timeInternal":1561974195,"type":2}],"fingerprintList":[{"groupId":2,"id":3,"name":"指纹01","number":1,"authority":1,"timeInternal":1561949200,"type":1}],"nfcList":[],"userGroupType":1,"userGroupIconId":"default","userGroupIconUrl":"","userGroupName":"用户A"},{"userGroupId":3,"passwordList":[{"groupId":3,"id":11,"name":"密码01","number":1,"authority":2,"timeInternal":536871298,"type":2}],"fingerprintList":[],"nfcList":[],"userGroupType":2,"userGroupIconId":"default","userGroupIconUrl":"","userGroupName":"用户B"}],"NFCCidBindList":[],"oneTimePasswordList":[{"number":0,"startTime":1562845800,"isInvalid":false,"createTime":1562846204}]},"1020006468":{"userGroupList":[{"fingerprintList":[],"nfcList":[],"passwordList":[{"authority":1,"createTime":1562836099,"groupId":1,"id":1,"name":"密码01","number":1,"type":2}],"userGroupId":1,"userGroupName":"我","userGroupType":1}]}}
            // data = {"adf":"asdfasdfasdfasdf"};
            Service.storage.setThirdUserConfigsForOneKey(Device.model, 234, data).then((res)=>{
              console.log("res", res)
              alert(JSON.stringify(res))
            }).catch((error)=>{
              console.log("error", error)
              alert(JSON.stringify(error))
            })
          }}>
            <Text style={{color:"#ffffff"}}>setThirdUserConfigsForOneKey</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop: 10, height: 40, backgroundColor: "#2196F3", justifyContent: 'center', alignItems: 'center'}} onPress={(e)=>{
            Service.storage.getThirdUserConfigsForOneKey(Device.model, 234).then((res)=>{
              console.log("res", res, res.data)
              alert(JSON.stringify(res.data))
            }).catch((error)=>{
              console.log("error", error)
              alert(JSON.stringify(error))
            })
          }}>
            <Text style={{color:"#ffffff"}}>getThirdUserConfigsForOneKey</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>{this.state.txtAll}</Text>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  searchTextInput: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    paddingVertical: 0,
    height: 35
  },
  text: {
    textAlign: 'center'
  }

});
