import React from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  FlatList
} from "react-native";

import { Host } from "miot";

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
              this.setState({
                "txt": value
              });
            })
            .catch((failure) => { alert(failure) });
        }} />
        <Text style={styles.text}>{this.state.txt}</Text>
        <Button title="读取 key0 key1 数据" onPress={() => {
          Host.storage.load([this.state.key, this.state.key1])
            .then((values) => {
              alert(values);
            }).catch((failure) => { alert(failure) });
        }} />
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
    textAlign:'center'
  }

});
