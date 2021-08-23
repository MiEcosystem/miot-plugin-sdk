
import React from 'react';
import { DarkMode, PackageEvent } from 'miot';
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

    // 退后台时停止监听，回前台继续监听。
    // 退后台后，RN停止工作，将收不到通知。受 iOS 系统影响
    PackageEvent.packageDidResume.addListener(() => { 
      this.addListener();
      // 如果退后台期间改变了  需要刷新
      this.refreshColorScheme();
    });
    PackageEvent.packageWillPause.addListener(() => { 
      this.removeListener();
    });

    // 查询当前颜色模式
    this.refreshColorScheme();
    // 监听
    this.addListener();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  refreshColorScheme() {
    const currentScheme = DarkMode.getColorScheme();
    this.setState({ colorScheme: currentScheme });
    console.log('用户是否在iOS端自己适配了深色模式：', DarkMode.darkModeStore.setDarkMode);
    console.log('当前 mode：', DarkMode.getColorScheme()); // rn bug: debug 模式下始终 light
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
            'dynamicStyleSheet + DynamicColor 配置样式'
          ].map((item, index) => {
            return <Text style={ styles.text } key={index}>{item}</Text>;
          })
        }
        {
          [
            '监听 colorScheme 配置样式'
          ].map((item, index) => {
            return <Text style={[styles.text, { color: this.state.colorScheme == 'dark' ? '#FFA' : '#336' }]} key={index}>{item}</Text>;
          })
        }
        {
          [
            `监听到的当前 colorScheme:${ JSON.stringify(this.state.colorScheme) }`
          ].map((item, index) => {
            return <Text style={[styles.text]} key={index}>{item}</Text>;
          })
        }
        {
          [
            ['点击取消监听浅色/深色模式', this.removeListener],
            ['点击开始监听浅色/深色模式', this.addListener]
          ].map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.button} onPress={item[1].bind(this)}>
                <Text style={styles.buttonText}>{item[0]}</Text>
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
  text: {
    color: new DynamicColor('#1A1A1A', '#EEE'),
    fontSize: 14,
    padding: 5
  },
  button: {
    width: '90%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: new DynamicColor('#1A1A1A', '#EEE'),
    borderColor: new DynamicColor('#444', '#DDD')
  },
  buttonText: {
    color: new DynamicColor('#EEE', '#1A1A1A'),
    fontSize: 14,
    padding: 5
  }
});
