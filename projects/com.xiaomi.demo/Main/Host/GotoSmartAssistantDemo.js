'use strict';

import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight, DeviceEventEmitter } from 'react-native';
import { Device, Host } from 'miot';
import Logger from '../Logger';

// 验证「插件唤起助手」功能（扫地机 Agent 接入）
// 1. 调用 Host.ui.gotoSmartAssistant 唤起助手（原生弹出抽屉浮层），Promise resolve 表示唤起成功
// 2. 助手内交互后，通过 callbackEvent 事件通道回传 { pageName, pageParams }（核心②）
// 3. demo 监听该事件，用自身导航栈 navigate(pageName, pageParams) 做同插件页面跳转
export default class GotoSmartAssistantDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      model: Device.model || '',
      did: Device.deviceID || '',
      bubbleText: '你好，我是扫地机助手',
      callbackEvent: 'SmartAssistantCallback',
      logs: [],
    };
    Logger.trace(this);
  }

  componentDidMount() {
    // 监听助手回传事件（核心②）：收到 { pageName, pageParams } 后做同插件页面跳转
    this.subscription = DeviceEventEmitter.addListener(this.state.callbackEvent, (payload) => {
      this._appendLog(`收到助手回传: ${ JSON.stringify(payload) }`);
      const pageName = payload && payload.pageName;
      const pageParams = (payload && payload.pageParams) || {};
      if (!pageName) {
        this._appendLog('payload 无 pageName，忽略跳转');
        return;
      }
      try {
        this._appendLog(`同插件跳转 → navigate('${ pageName }')`);
        this.props.navigation.navigate(pageName, pageParams);
      } catch (e) {
        this._appendLog(`跳转失败（该页可能未注册）: ${ e && e.message }`);
      }
    });
  }

  componentWillUnmount() {
    this.subscription && this.subscription.remove();
  }

  _appendLog(msg) {
    const line = `${ new Date().toLocaleTimeString() }  ${ msg }`;
    this.setState({ logs: [line, ...this.state.logs] });
  }

  _gotoAssistant() {
    const { model, did, bubbleText, callbackEvent } = this.state;
    this._appendLog(`调用 gotoSmartAssistant(model=${ model }, did=${ did }, callbackEvent=${ callbackEvent })`);
    Host.ui.gotoSmartAssistant(model, did, bubbleText, callbackEvent)
      .then((result) => {
        this._appendLog(`唤起成功: ${ JSON.stringify(result) }`);
      })
      .catch((err) => {
        this._appendLog(`唤起失败: ${ JSON.stringify(err) }`);
      });
  }

  _renderField(label, key) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          value={String(this.state[key])}
          onChangeText={(text) => this.setState({ [key]: text })}
          placeholder={label}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          {this._renderField('model', 'model')}
          {this._renderField('did', 'did')}
          {this._renderField('bubbleText 气泡文案', 'bubbleText')}
          {this._renderField('callbackEvent 回调事件名', 'callbackEvent')}

          <TouchableHighlight
            style={styles.button}
            underlayColor="#3a7afe"
            onPress={() => this._gotoAssistant()}
          >
            <Text style={styles.buttonText}>唤起智能助手</Text>
          </TouchableHighlight>

          <Text style={styles.logTitle}>日志</Text>
          {this.state.logs.map((line, idx) => (
            <Text key={idx} style={styles.logLine}>{line}</Text>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scroll: { flex: 1, padding: 16 },
  field: { marginBottom: 12 },
  label: { fontSize: 14, color: '#333', marginBottom: 4 },
  input: { backgroundColor: '#fff', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8, fontSize: 14, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#4a90ff', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginVertical: 16 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  logTitle: { fontSize: 15, fontWeight: '600', color: '#333', marginTop: 8, marginBottom: 6 },
  logLine: { fontSize: 12, color: '#666', marginBottom: 4, lineHeight: 18 },
});
