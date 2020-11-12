import { Host } from "miot";
import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import Logger from '../Logger';

export default class KVStorageDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key0: "",
      value0: "",
      key1: "",
      value1: ""
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {
          [
            ['key0', (text) => this.setState({ key0: text })],
            ['value0', (text) => this.setState({ value0: text })],
            ['key1', (text) => this.setState({ key1: text })],
            ['value1', (text) => this.setState({ value1: text })]
          ].map((item, index) => {
            return <TextInput key={index}
              style={[styles.button, { paddingLeft: 10 }]}
              placeholder={`输入要存的${ item[0] }`}
              onChangeText={item[1].bind(this)}
            />;
          })
        }
        {
          [
            ['保存 key0 数据', this._setKeyValue],
            ['保存 key0 数据 有效期6秒', this._setKeyValueFor6Seconds],
            ['读取 key0 数据', this._getValue],
            ['保存 key0 key1 数据', this._saveKeyValues],
            ['保存 key0 key1 数据 有效期6秒', this._saveKeyValuesFor6Seconds],
            ['读取 key0 key1 数据', this._loadValues]
          ].map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.button} onPress={() => {
                item[1].bind(this)();
                Logger.trace(this, item[1], { name: item[0] });
              }}>
                <Text style={styles.buttonText}>{item[0]}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

  _setKeyValue() {
    if (this.state.key0 === '') {
      alert('请输入key0');
      return;
    }
    if (this.state.value0 === '') {
      alert('请输入value0');
      return;
    }
    Host.storage.set(this.state.key0, this.state.value0);
    alert("set success");
  }

  _setKeyValueFor6Seconds() {
    if (this.state.key0 === '') {
      alert('请输入key0');
      return;
    }
    if (this.state.value0 === '') {
      alert('请输入value0');
      return;
    }
    Host.storage.set(this.state.key0, this.state.value0, { expire: 6000 });
    alert("set success");
  }

  _saveKeyValues() {
    if (this.state.key0 === '' || this.state.value0 === ''
      || this.state.key1 === '' || this.state.value1 === '') {
      alert('请输入key 或 value');
      return;
    }
    let info = {};
    info[this.state.key0] = this.state.value0;
    info[this.state.key1] = this.state.value1;
    Host.storage.save(info);
    alert("set success");
  }

  _saveKeyValuesFor6Seconds() {
    if (this.state.key0 === '' || this.state.value0 === ''
      || this.state.key1 === '' || this.state.value1 === '') {
      alert('请输入key 或 value');
      return;
    }
    let info = {};
    info[this.state.key0] = this.state.value0;
    info[this.state.key1] = this.state.value1;
    Host.storage.save(info, { expire: 6000 });
    alert("set success");
  }

  _getValue() {
    Host.storage.get(this.state.key0).then((value) => {
      alert(JSON.stringify(value));
    })
      .catch((failure) => {
        alert(JSON.stringify(failure));
      });
  }

  _loadValues() {
    Host.storage.load([this.state.key0, this.state.key1]).then((values) => {
      alert(JSON.stringify(values));
    }).catch((failure) => {
      alert(JSON.stringify(failure));
    });
  }
}

var styles = StyleSheet.create({
  button: {
    color: '#000',
    width: '90%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    alignSelf: 'center',
    color: '#555',
    fontSize: 14,
    padding: 5
  }
});
