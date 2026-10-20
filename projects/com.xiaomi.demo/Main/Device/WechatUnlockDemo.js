'use strict';

import { Device, Host } from "miot";
import React from 'react';
import { Alert, PixelRatio, StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView } from 'react-native';
import Logger from '../Logger';

export default class WechatUnlockDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tempkeyId: 'f80212db3d6ebce1',
      accessKey: 'IOS00026747c5acafc2',
      tempkeyStart: '1773740700',
      tempkeyEnd: '1773744300',
      timeout: '30000',
      // 分享小程序卡片参数
      shareAppOriginalId: 'gh_b1cd5e842bf2',
      sharePath: 'pages/wifi/share?ssid=MyWiFi&pwd=test1234',
      shareTitle: 'WiFi密码分享',
      shareDescription: '点击查看WiFi密码',
      shareThumbUrl: '',
      shareWebpageUrl: 'https://mijiayoupin.com/shop/main',
      log: ''
    };
    Logger.trace(this);
  }

  _appendLog(msg) {
    const now = new Date();
    const time = `${ String(now.getHours()).padStart(2, '0') }:${ String(now.getMinutes()).padStart(2, '0') }:${ String(now.getSeconds()).padStart(2, '0') }`;
    this.setState((prev) => ({ log: `[${ time }] ${ msg }\n${ prev.log }` }));
  }

  _doWechatUnlock = () => {
    const ble = Device.getBluetoothLE();
    if (!ble || !ble.securityLock) {
      this._appendLog('❌ 获取 BluetoothLE 或 securityLock 失败');
      return;
    }

    const params = {
      did: Device.deviceID,
      tempkey_start: parseInt(this.state.tempkeyStart) || 0,
      tempkey_end: parseInt(this.state.tempkeyEnd) || 0
    };

    this._appendLog(`📤 调用 wechatUnlock, params=${ JSON.stringify(params) }`);

    ble.securityLock.wechatUnlock(params).then((result) => {
      this._appendLog(`✅ 开锁成功: ${ JSON.stringify(result) }`);
    }).catch((error) => {
      const code = error?.code || 'unknown';
      const message = error?.message || JSON.stringify(error);
      this._appendLog(`❌ 失败 [${ code }]: ${ message }`);
      Alert.alert('开锁失败', `code: ${ code }\n${ message }`);
    });
  }

  _doShareMiniProgramCard = () => {
    const params = {
      appOriginalId: this.state.shareAppOriginalId,
      path: this.state.sharePath,
      title: this.state.shareTitle,
      description: this.state.shareDescription
    };
    if (this.state.shareThumbUrl) {
      params.thumbUrl = this.state.shareThumbUrl;
    }
    if (this.state.shareWebpageUrl) {
      params.webpageUrl = this.state.shareWebpageUrl;
    }

    this._appendLog(`📤 shareWeChatMiniProgramCardToContact params=${ JSON.stringify(params) }`);

    try {
      Host.ui.shareWeChatMiniProgramCardToContact(params);
      this._appendLog(`✅ 已调用分享（fire-and-forget）`);
    } catch (error) {
      const message = typeof error === 'string' ? error : (error?.message || JSON.stringify(error));
      this._appendLog(`❌ 调用异常: ${ message }`);
    }
  }

  _doCancelUnlock = () => {
    const ble = Device.getBluetoothLE();
    if (!ble || !ble.securityLock) {
      this._appendLog('❌ 获取 BluetoothLE 或 securityLock 失败');
      return;
    }
    this._appendLog('📤 取消开锁');
    ble.disconnect();
    this._appendLog('✅ 已断开连接');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.sectionTitle}>参数配置</Text>

          <Text style={styles.label}>Device ID</Text>
          <Text style={styles.readonlyValue}>{Device.deviceID}</Text>

          <Text style={styles.label}>Tempkey Start (Unix timestamp)</Text>
          <TextInput style={styles.input} value={this.state.tempkeyStart}
            onChangeText={(v) => this.setState({ tempkeyStart: v })} keyboardType="numeric" placeholder="生效时间戳" />

          <Text style={styles.label}>Tempkey End (Unix timestamp)</Text>
          <TextInput style={styles.input} value={this.state.tempkeyEnd}
            onChangeText={(v) => this.setState({ tempkeyEnd: v })} keyboardType="numeric" placeholder="失效时间戳" />

          <TouchableHighlight style={styles.btnPrimary} underlayColor="#1a6fc4" onPress={this._doWechatUnlock}>
            <Text style={styles.btnText}>🔓 wechatUnlock</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnSecondary} underlayColor="#c0392b" onPress={this._doCancelUnlock}>
            <Text style={styles.btnText}>✋ 取消开锁</Text>
          </TouchableHighlight>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>分享小程序卡片测试</Text>

          <Text style={styles.label}>小程序原始ID (appOriginalId)</Text>
          <TextInput style={styles.input} value={this.state.shareAppOriginalId}
            onChangeText={(v) => this.setState({ shareAppOriginalId: v })} placeholder="gh_xxxxxxxx" />

          <Text style={styles.label}>页面路径 (path)</Text>
          <TextInput style={styles.input} value={this.state.sharePath}
            onChangeText={(v) => this.setState({ sharePath: v })} placeholder="pages/wifi/share?ssid=xx&pwd=xx" />

          <Text style={styles.label}>卡片标题 (title)</Text>
          <TextInput style={styles.input} value={this.state.shareTitle}
            onChangeText={(v) => this.setState({ shareTitle: v })} placeholder="WiFi密码分享" />

          <Text style={styles.label}>卡片描述 (description, 可选)</Text>
          <TextInput style={styles.input} value={this.state.shareDescription}
            onChangeText={(v) => this.setState({ shareDescription: v })} placeholder="点击查看WiFi密码" />

          <Text style={styles.label}>缩略图URL (thumbUrl, 可选)</Text>
          <TextInput style={styles.input} value={this.state.shareThumbUrl}
            onChangeText={(v) => this.setState({ shareThumbUrl: v })} placeholder="https://example.com/thumb.png" />

          <Text style={styles.label}>兜底网页URL (webpageUrl, 可选)</Text>
          <TextInput style={styles.input} value={this.state.shareWebpageUrl}
            onChangeText={(v) => this.setState({ shareWebpageUrl: v })} placeholder="https://mijiayoupin.com/shop/main" />

          <TouchableHighlight style={styles.btnShare} underlayColor="#1a8a4c" onPress={this._doShareMiniProgramCard}>
            <Text style={styles.btnText}>📤 分享小程序卡片到微信</Text>
          </TouchableHighlight>

          <Text style={styles.sectionTitle}>调用日志</Text>
          <Text style={styles.logText}>{this.state.log || '暂无日志'}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scroll: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 12, marginBottom: 8 },
  label: { fontSize: 13, color: '#666', marginTop: 8, marginBottom: 2 },
  readonlyValue: { fontSize: 13, color: '#999', paddingVertical: 8, paddingHorizontal: 10, backgroundColor: '#eee', borderRadius: 4 },
  input: { fontSize: 14, borderWidth: 1 / PixelRatio.get(), borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#fff' },
  btnPrimary: { marginTop: 16, backgroundColor: '#2196F3', borderRadius: 6, paddingVertical: 12, alignItems: 'center' },
  btnSecondary: { marginTop: 10, backgroundColor: '#e74c3c', borderRadius: 6, paddingVertical: 12, alignItems: 'center' },
  btnShare: { marginTop: 16, backgroundColor: '#07C160', borderRadius: 6, paddingVertical: 12, alignItems: 'center' },
  divider: { height: 1, backgroundColor: '#ddd', marginTop: 20, marginBottom: 4 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  logText: { fontSize: 12, color: '#555', fontFamily: 'Courier', lineHeight: 18, marginTop: 4 }
});
