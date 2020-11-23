
import React from 'react';
import { DarkMode } from 'miot';
import { View, Text, TouchableOpacity } from 'react-native';
import DynamicColor, { dynamicColor } from 'miot/ui/Style/DynamicColor';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import Logger from '../../Logger';

export default class DarkModeDemo extends React.Component {

  state = {
    colorScheme: 'null'
  }

  myListener = (value) => {
    console.log(`colorScheme from listener: ${ value.colorScheme }`);
    this.setState({ colorScheme: value.colorScheme });

  }

  UNSAFE_componentWillMount() {
    // 关闭插件所在页面native端的系统强制深色模式（Android）/miot-sdk的反色模式（iOS）,
    // 由开发者使用框架提供的接口自己适配插件的深色模式
    DarkMode.preparePluginOwnDarkMode();
  }

  componentDidMount() {
    Logger.trace(this);
    // 查询当前颜色模式
    const currentScheme = DarkMode.getColorScheme();
    this.setState({ colorScheme: currentScheme });
    this.addListener();
    console.log('用户是否在iOS端自己适配了深色模式：', DarkMode.darkModeStore.setDarkMode);
    console.log('当前 mode：', DarkMode.getColorScheme()); // rn bug: debug 模式下始终 light
  }

  componentWillUnmount() {
    console.log("componentWillUnmount: 取消深色模式监听");
    DarkMode.removeChangeListener(this.myListener);
  }

  // 添加深色模式的监听
  addListener = () => {
    Logger.trace(this, this.addListener, { action: 'addListener' });
    console.log("添加深色模式监听");
    DarkMode.addChangeListener(this.myListener);
  }

  // 取消深色模式的监听
  removeListener = () => {
    Logger.trace(this, this.removeListener, { action: 'removeListener' });
    console.log("取消深色模式监听");
    DarkMode.removeChangeListener(this.myListener);
  }

  render() {
    return (
      <View style={styles.container}>
        {
          [
            '使用 dynamicStyleSheet 函数配置 styles.container'
          ].map((item, index) => {
            return <Text style={[styles.buttonText, { color: this.state.colorScheme == 'dark' ? '#FFF' : '#333' }]} key={index}>{item}</Text>;
          })
        }
        {/* 单独适配某个组件的可以使用 dynamicColor 函数 */}
        {
          [
            'dynamicColor函数可以取得当前模式下的色值',
            JSON.stringify(this.state.colorScheme)
          ].map((item, index) => {
            return <Text style={[styles.buttonText, { color: dynamicColor('#000000', '#ffffff') }]} key={index}>{item}</Text>;
          })
        }
        {
          [
            ['点击取消监听浅色/深色模式', this.removeListener],
            ['点击开始监听浅色/深色模式', this.addListener]
          ].map((item, index) => {
            return (
              <TouchableOpacity key={index} style={[styles.button, {
                backgroundColor: this.state.colorScheme == 'dark' ? '#333' : '#FFF',
                borderColor: this.state.colorScheme == 'dark' ? '#444' : '#DDD'
              }]} onPress={item[1].bind(this)}>
                <Text style={[styles.buttonText, { color: this.state.colorScheme == 'dark' ? '#FFF' : '#333' }]}>{item[0]}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }
}

// 适配整体的 StyleSheet 可以使用 dynamicStyleSheet 函数，其中的色值需要使用使用 DynamicColor 类定义
const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: new DynamicColor('#EEE', '#1A1A1A')
  },
  button: {
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
    fontSize: 14,
    padding: 5
  }
});
