
import React from 'react';
import { API_LEVEL, Package, Host, DarkMode } from 'miot';
import { View, Text, Button } from 'react-native';

export default class DarkModeDemo extends React.Component {

  state = {
    colorScheme: 'null'
  }

  myListener = (value) => {
    console.log(`colorScheme from listener: ${ value.colorScheme }`);
    this.setState({ colorScheme: value.colorScheme });
  }


  componentWillMount() {
    // 关闭插件所在页面native端的系统强制深色模式（Android）/miot-sdk的反色模式（iOS）,
    // 由开发者使用框架提供的接口自己适配插件的深色模式
    DarkMode.preparePluginOwnDarkMode();
  }

  componentDidMount() {
    // 查询当前颜色模式
    const currentScheme = DarkMode.getColorScheme();
    this.setState({ colorScheme: currentScheme });
    this.addListener();
    console.log('用户是否在iOS端自己适配了深色模式：', DarkMode.darkModeStore.setDarkMode);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount: 取消深色模式监听");
    DarkMode.removeChangeListener(this.myListener);
  }

  // 添加深色模式的监听
  addListener = () => {
    console.log("添加深色模式监听");
    DarkMode.addChangeListener(this.myListener);
  }

  // 取消深色模式的监听
  removeListener = () => {
    console.log("取消深色模式监听");
    DarkMode.removeChangeListener(this.myListener);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'powderblue' }}>
        <Text>API_LEVEL:{API_LEVEL}</Text>
        <Text>NATIVE_API_LEVEL:{Host.apiLevel}</Text>
        <Text>{Package.packageName}</Text>
        <Text>models:{Package.models}</Text>
        <Text>{JSON.stringify(this.state.colorScheme)}</Text>

        <Button title={'点击取消监听浅色/深色模式'} onPress={() => {
          this.removeListener();
        }} />

        <Text />

        <Button title={'点击开始监听浅色/深色模式'} onPress={() => {
          this.addListener();
        }} />
      </View>
    );
  }
}