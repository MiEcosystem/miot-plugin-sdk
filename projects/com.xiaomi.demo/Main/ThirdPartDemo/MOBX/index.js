'use strict';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
// 被观察者, 观察 counter 变量  
const storer = observable({
  counter: 0
});
//---------------------------------
//  ES6 写法: Arrow Function
//---------------------------------
storer.plus = () => {
  storer.counter++;
};
storer.minus = () => {
  storer.counter--;
};
class Counter extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*加一*/}
        <TouchableHighlight
          onPress={() => { this.props.store.plus() }}>
          <Text>Add</Text>
        </TouchableHighlight>
        {/* 显示处理结果 */}
        <Text style={styles.resultTxtStyle}>
          {this.props.store.counter}
        </Text>
        {/*减一*/}
        <TouchableHighlight
          onPress={() => { storer.minus() }}>
          <Text>Minus</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
// 使用 observer 创建
const CounterComponent = observer(Counter);
export default class MOBXNormal extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 64 }}>

        <CounterComponent store={storer} />
      </View>
    );
  }
}
/* 样式定义 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  resultTxtStyle: {
    fontSize: 22,
    color: 'red'
  }
});