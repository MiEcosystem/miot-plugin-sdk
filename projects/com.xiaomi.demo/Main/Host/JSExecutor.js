import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Host from 'miot/Host';
import Logger from '../Logger';

export default class JSExecutor extends React.Component {

  componentDidMount() {
    Logger.trace(this);
    const jspath = require("../../Resources/test_executor.jx");
    Host.createBackgroundExecutor(jspath, { 'init1': "1", 'init2': [1, 2] }).then((executor) => {
      console.log("createBackgroundExecutor res:", executor);
      this.executor = executor;
    }).catch((err) => {
      console.log("createBackgroundExecutor error: ", err);
    });
  }

  componentWillUnmount() {
    this.executor && this.executor.remove();
  }

  ObjectMethodCall() {
    Logger.trace(this, this.ObjectMethodCall);
    if (this.executor) {
      // 支持使用Obj对象中的method
      this.executor.execute("TestObj.callWithArg1ReturnNumber", "hello world").then((res) => {
        console.log("ObjectMethodCall result :", res);
        alert(`success: ${ JSON.stringify(res) }`);
      }).catch((err) => {
        console.log("ObjectMethodCall failed :", err);
        alert("failed: ", JSON.stringify(err));
      });
    }
  }

  callWithObject() {
    Logger.trace(this, this.callWithObject);
    if (this.executor) {
      // execute参数支持任意可以json序列化的对象
      this.executor.execute("callWithObj", "initialProps.init1", ['array1', 'array2'], { 'map1': 'map1' }).then((res) => {
        console.log("callWithObj result :", res);
        alert(`success: ${ JSON.stringify(res) }`);
      }).catch((err) => {
        console.log("callWithObj failed :", err);
        alert("failed: ", JSON.stringify(err));
      });
    }
  }

  call3Params() {
    Logger.trace(this, this.call3Params);
    if (this.executor) {
      this.executor.execute("callWithArg3ReturnOBJ", "1", "2", "3").then((res) => {
        console.log("call 3 result :", res);
        alert(`success: ${ JSON.stringify(res) }`);
      }).catch((err) => {
        console.log("call 3 failed :", err);
        alert("failed: ", JSON.stringify(err));
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>JSExecutor</Text>
        <TouchableOpacity style={styles.button} onPress={this.call3Params.bind(this)}><Text style={styles.buttonText}>简单函数调用</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.callWithObject.bind(this)}><Text style={styles.buttonText}>函数调用传递对象</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.ObjectMethodCall.bind(this)}><Text style={styles.buttonText}>Obj方法调用</Text></TouchableOpacity>
      </View>
    );
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
    color: '#555',
    fontSize: 18,
    padding: 5
  }
});


