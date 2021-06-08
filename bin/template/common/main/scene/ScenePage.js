import React from 'react';
import { Package } from 'miot';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Styles as SdkStyles } from "miot/resources";

/**
 * 自定义智能自动化开发-开发自定义自动化页面
 * 该功能并非插件开发的必须功能，具体详情可参考文档：
 * https://iot.mi.com/new/doc/extension-development/topics/automation-develop
 */
export default class ScenePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => { this.saveScene(); }}
        >
          <Text style={{ color: '#333333' }}>点我保存</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * Package.entryInfo.payload有许多数据，只有name和value可修改，其他的均为readonly。
   * name：	string	条件/动作 名称
   * value：	object	可自定义的值，可以是json，string，number。比如：用户自定义的提示文本
   */
  saveScene() {
    Package.entryInfo.payload.value = {
      text: 'xxx',
      type: "xxx"
    };
    console.log("传回native的参数为：", JSON.stringify(Package.entryInfo));
    Package.exit(Package.entryInfo);
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: SdkStyles.common.backgroundColor,
    flex: 1
  },
  btnStyle: {
    margin: 20,
    height: 44,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


