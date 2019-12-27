import {Device, Host, Service} from "miot";
import React from "react";
import {Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Platform} from "react-native";


export default class KVStorageDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key0: "",
      value0: "",
      key1: "",
      value1: "",
    };
  }

  componentWillMount() {
    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    this.fontFamily = {};
    if (Platform.OS === 'android')  {
      this.fontFamily = { fontFamily: 'Kmedium' }
    };
  }


  render() {

    return (
      <View style={{flexDirection: "column"}}>
        <View style={{margin: 10}}>
          <TextInput
            style={[styles.searchTextInput]}
            placeholder='输入要存的key0'
            onChangeText={
              (text) => {
                this.setState( {
                    key0:text
                  }
                );

              }
            }
          />
        </View>
        <View style={{margin: 10}}>
          <TextInput
            style={[styles.searchTextInput]}
            placeholder='输入要存的value0'
            onChangeText={
              (text) => {
                this.setState( {
                    value0:text
                  }
                );

              }
            }
          />
        </View>
        <View style={{margin: 10}}>
          <TextInput
            style={[styles.searchTextInput]}
            placeholder='输入要存的key1'
            onChangeText={
              (text) => {
                this.setState(
                  (preState) => {
                    return {"key1": text};
                  }
                );

              }
            }
          />
        </View>
        <View style={{margin: 10}}>
          <TextInput
            style={[styles.searchTextInput]}
            placeholder='输入要存的value1'
            onChangeText={
              (text) => {
                this.setState(
                  (preState) => {
                    return {"value1": text};
                  }
                );

              }
            }
          />
        </View>

        <TouchableOpacity style={styles.btnStyle} onPress={()=>{this._setKeyValue()}}>
          <Text style={[{ color: '#ffffff' }, this.fontFamily]}>保存 key0 数据</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={()=>{this._setKeyValueFor6Seconds()}}>
          <Text style={[{ color: '#ffffff' }, this.fontFamily]}>保存 key0 数据 有效期6秒</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={()=>{this._getValue()}}>
          <Text style={[{ color: '#ffffff' }, this.fontFamily]}>读取 key0 数据</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnStyle} onPress={()=>{this._saveKeyValues()}}>
          <Text style={[{ color: '#ffffff' }, this.fontFamily]}>保存 key0 key1 数据</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={()=>{this._saveKeyValuesFor6Seconds()}}>
          <Text style={[{ color: '#ffffff' }, this.fontFamily]}>保存 key0 key1 数据 有效期6秒</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={()=>{this._loadValues()}}>
          <Text style={[{ color: '#ffffff' }, this.fontFamily]}>读取 key0 key1 数据</Text>
        </TouchableOpacity>


      </View>

    );
  }


  /**
   * 保存key value
   * @private
   */
  _setKeyValue(){
    if(this.state.key0 === ''){
      alert('请输入key0');
      return;
    }

    if(this.state.value0 === ''){
      alert('请输入value0');
      return;
    }

    Host.storage.set(this.state.key0, this.state.value0);
    alert("set success");
  }

  /**
   * 保存key value, 有效期6秒
   * @private
   */
  _setKeyValueFor6Seconds(){

    if(this.state.key0 === ''){
      alert('请输入key0');
      return;
    }

    if(this.state.value0 === ''){
      alert('请输入value0');
      return;
    }

    Host.storage.set(this.state.key0, this.state.value0, {expire: 6000});
    alert("set success");
  }

  /**
   * 批量保存 key-value
   * @private
   */
  _saveKeyValues(){
    if(this.state.key0 === '' || this.state.value0 === ''
      || this.state.key1 === '' || this.state.value1 === ''){
      alert('请输入key 或 value');
      return;
    }

    let info = {};
    info[this.state.key0] = this.state.value0;
    info[this.state.key1] = this.state.value1;
    Host.storage.save(info);
    alert("set success");
  }

  /**
   * 批量保存 key-value 有效期6秒
   * @private
   */
  _saveKeyValuesFor6Seconds(){

    if(this.state.key0 === '' || this.state.value0 === ''
      || this.state.key1 === '' || this.state.value1 === ''){
      alert('请输入key 或 value');
      return;
    }

    let info = {};
    info[this.state.key0] = this.state.value0;
    info[this.state.key1] = this.state.value1;
    Host.storage.save(info, {expire: 6000});
    alert("set success");
  }

  /**
   * 通过key读取value
   * @private
   */
  _getValue(){
    Host.storage.get(this.state.key0)
      .then((value) => {
        alert(JSON.stringify(value))
      })
      .catch((failure) => {
        alert(JSON.stringify(failure))
      });
  }

  /**
   * 批量读values
   * @private
   */
  _loadValues(){
    Host.storage.load([this.state.key0, this.state.key1])
      .then((values) => {
        alert(JSON.stringify(values))
      }).catch((failure) => {
        alert(JSON.stringify(failure))
    });
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
  },
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
