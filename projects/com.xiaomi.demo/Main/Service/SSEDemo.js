/**
 * 通用 SSE 接口验证 Demo
 *
 * 验证 Service.SSE.open / Service.SSE.cancel 全链路：
 *   JS(Service.SSE) → NativeModule(MIOTServiceModuleCore.openSSE/cancelSSE)
 *                   → Provider(RnSSEProviderImpl) → SSEStreamApi(createSSEFlow)
 *                   → RCTDeviceEventEmitter.emit(`${callbackEvent}:${conversationId}`)
 *                   → 本页 DeviceEventEmitter.addListener 收事件
 *
 * 事件体固定为 { code, data, conversationId }：
 *   code 0  : chunk（data 为原始 JSON 字符串，业务自行 parse）
 *   code 1  : done（连接停止）
 *   code -1 : 网络/传输层失败
 *   code -2 : 服务器业务错误
 *   code -3 : 已取消
 *
 * 用途：真机验证 open/cancel、事件下发、连接停止(done)、取消(-3)、
 *       以及"组件卸载自动 cancel"的资源回收路径。
 */
import React from 'react';
import {
  DeviceEventEmitter,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { Device, Service } from 'miot';
import Logger from '../Logger';

// 事件 code → 可读标签
const CODE_LABEL = {
  0: 'CHUNK',
  1: 'DONE(连接停止)',
  '-1': 'ERR_NETWORK',
  '-2': 'ERR_BUSINESS',
  '-3': 'CANCELLED'
};

export default class SSEDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // 默认填灵云洗护真实请求：POST /app/appliance/washer/washcare/chat
      // content-type: text/event-stream（由底层 createSSEFlow 自动加 Accept）
      path: '/appliance/washer/washcare/chat',
      host: '',                 // 留空走默认网关；callSmartChatAPI 类需填 smartcamera 网关
      callbackEvent: 'washcareSSE',
      bodyText: SSEDemo._washcareBodyText(),
      headerText: '',           // JSON，仅追踪头（如 miot-request-did / Content-Type）
      conversationId: '',
      running: false,
      logs: []
    };
    this._sub = null;
    Logger.trace(this);
  }

  /**
   * 灵云洗护默认请求体（INPUT_TEXT 文字输入推荐场景）。
   * conversationId / deviceId 在发起时由 _open 兜底填充（带上当前 cid 与 Device.deviceID）。
   * 字段含义见接口文档：actionType / language / query / drum / files / materials / stains 等。
   */
  static _washcareBodyText() {
    return JSON.stringify({
      actionType: 'INPUT_TEXT',                 // JSON:手动选参推荐；INPUT_VOICE:语音；INPUT_TEXT:文字输入
      language: 'zh',                           // 当前语言环境
      conversationId: '',                       // 会话id，发起时自动填当前 cid
      query: '白色羊毛衫沾了油渍，应该怎么洗？',    // 文字输入内容（非语音时填）
      drum: 'left',                             // 可选，桶：left/right/down
      files: [],                                // 非语音时空数组；语音见 _washcareVoiceBodyText
      deviceId: '',                             // 设备id，发起时自动填 Device.deviceID
      prodModel: 'xiaomi.washer.example',       // 设备型号示例
      generateQuery: '',                        // 选参推荐时由前端生成的 query（INPUT_TEXT 场景留空）
      materials: ['wool'],                      // 衣物材质：羊毛
      stains: ['oil'],                          // 污渍类型：油渍
      colors: ['white'],                        // 衣物颜色：白色
      demands: ['gentle'],                      // 特殊要求：轻柔洗
      type: ['sweater']                         // 衣物类型：毛衣
    }, null, 2);
  }

  /** 选参推荐场景（actionType=JSON）示例：不靠 query，纯靠选择的材质/污渍等参数推荐。 */
  static _washcareSelectBodyText() {
    return JSON.stringify({
      actionType: 'JSON',                       // 手动选参推荐
      language: 'zh',
      conversationId: '',
      query: '',                                // 选参场景 query 为空
      drum: 'right',
      files: [],
      deviceId: '',
      prodModel: 'xiaomi.washer.example',
      generateQuery: '洗涤棉质浅蓝色衬衫上的汗渍',  // 前端根据所选参数生成的 query
      materials: ['cotton'],                    // 棉
      stains: ['sweat'],                        // 汗渍
      colors: ['lightblue'],                    // 浅蓝
      demands: ['sterilize'],                   // 除菌
      type: ['shirt']                           // 衬衫
    }, null, 2);
  }

  /** 语音输入场景（actionType=INPUT_VOICE）示例：query 为空，files 带 voice 文件。 */
  static _washcareVoiceBodyText() {
    return JSON.stringify({
      actionType: 'INPUT_VOICE',                // 语音输入推荐
      language: 'zh',
      conversationId: '',
      query: '',                                // 语音场景 query 为空
      drum: 'left',
      files: [
        { id: 'voice_demo_0001', type: 'voice' } // voice 语音文件
      ],
      deviceId: '',
      prodModel: 'xiaomi.washer.example',
      generateQuery: '',
      materials: [],
      stains: [],
      colors: [],
      demands: [],
      type: []
    }, null, 2);
  }

  /**
   * 一键填入灵云洗护示例参数。
   * @param scene 'text'=文字输入(默认) / 'select'=选参推荐 / 'voice'=语音输入
   * 三种场景对应 actionType: INPUT_TEXT / JSON / INPUT_VOICE，参数已填代表性真实值。
   * deviceId/prodModel 用当前设备覆盖；conversationId 在 _open 时兜底补。
   */
  _fillWashcarePreset(scene) {
    const did = (Device && Device.deviceID) ? Device.deviceID : '';
    const model = (Device && Device.model) ? Device.model : '';

    let tpl;
    if (scene === 'select') tpl = SSEDemo._washcareSelectBodyText();
    else if (scene === 'voice') tpl = SSEDemo._washcareVoiceBodyText();
    else tpl = SSEDemo._washcareBodyText();

    // 解析模板，用当前设备的 deviceId/prodModel 覆盖示例值
    let body;
    try {
      body = JSON.parse(tpl);
    } catch (e) {
      body = {};
    }
    if (did) body.deviceId = did;
    if (model) body.prodModel = model;

    this.setState({
      host: '',
      path: '/appliance/washer/washcare/chat',
      callbackEvent: 'washcareSSE',
      bodyText: JSON.stringify(body, null, 2),
      headerText: ''
    });
    this._appendLog(`已填入灵云洗护示例（场景=${ scene || 'text' }，deviceId=${ did || '<空>' }）`);
  }

  /**
   * 一键填入与 callSmartChatAPI（DeepSeekApi.requestSmartChat）等价的真实参数。
   *
   * 对照底层 requestSmartChat 调 SmartHomeRc4ChunkApi.createSSEFlow 的实际传参：
   *   host    = getChatHost() 国内 → https://app.business.smartcamera.api.mijia.tech
   *   path    = /event/app/ai/v1/chat?miot-request-did=<did>
   *   body    = { did, content, region, conversationId }（底层作为 data query 透传）
   *   header  = miot-request-did / Content-Type: application/json
   * 这样 Service.SSE.open 经 native SSEStreamApi → createSSEFlow 后，与 callSmartChatAPI 链路等价。
   */
  _fillSmartChatPreset() {
    const did = (Device && Device.deviceID) ? Device.deviceID : '<did>';
    this.setState({
      host: 'https://app.business.smartcamera.api.mijia.tech',
      path: `/event/app/ai/v1/chat?miot-request-did=${ did }`,
      callbackEvent: 'demoSSE',
      bodyText: JSON.stringify({ did, content: '你好', region: 'CN' }, null, 2),
      headerText: JSON.stringify({ 'miot-request-did': did, 'Content-Type': 'application/json' }, null, 2)
    });
    this._appendLog(`已填入 callSmartChatAPI 同款参数（did=${ did }）`);
  }

  componentWillUnmount() {
    // 关键验证点：组件卸载时主动取消，回收连接（最易漏，强烈建议业务照做）
    this._teardownListener();
    if (this.state.conversationId) {
      Service.SSE.cancel(this.state.conversationId)
        .then(() => console.log('[SSEDemo] unmount cancel ok'))
        .catch((e) => console.log('[SSEDemo] unmount cancel err', e));
    }
  }

  // ============ 日志 ============

  // 手动拼 HH:MM:SS，避开本 RN 环境 Intl/NumberFormat polyfill 的 bug
  // （toLocaleTimeString 会触发 core.js 构造非法正则抛 SyntaxError）
  _now() {
    const d = new Date();
    const p = (n) => (n < 10 ? `0${ n }` : `${ n }`);
    return `${ p(d.getHours()) }:${ p(d.getMinutes()) }:${ p(d.getSeconds()) }`;
  }

  _appendLog(line) {
    const ts = this._now();
    this.setState((s) => ({ logs: [...s.logs, `[${ ts }] ${ line }`] }));
  }

  _clearLog() {
    this.setState({ logs: [] });
  }

  // ============ 事件监听 ============

  _setupListener(eventName) {
    this._teardownListener();
    this._sub = DeviceEventEmitter.addListener(eventName, (evt) => {
      const code = evt && typeof evt.code !== 'undefined' ? evt.code : 'NaN';
      const label = CODE_LABEL[`${ code }`] || `UNKNOWN(${ code })`;
      const data = evt && typeof evt.data !== 'undefined' ? evt.data : '';
      this._appendLog(`<== ${ label } cid=${ evt && evt.conversationId } data=${ data }`);

      // 终态(done / error / cancel)：移除监听，标记结束
      if (code === 1 || code < 0) {
        this._teardownListener();
        this.setState({ running: false });
      }
    });
    this._appendLog(`addListener: ${ eventName }`);
  }

  _teardownListener() {
    if (this._sub) {
      this._sub.remove();
      this._sub = null;
    }
  }

  // ============ 操作 ============

  _genConversationId() {
    // 简单唯一 id：时间戳 + 随机，真机也可用 uuid 库
    return `cid-${ Date.now() }-${ Math.floor(Math.random() * 100000) }`;
  }

  _open() {
    if (this.state.running) {
      this._appendLog('已有流在运行，先取消再开');
      return;
    }
    const conversationId = this._genConversationId();
    const eventName = `${ this.state.callbackEvent }:${ conversationId }`;

    // body：把输入框文本 parse 成对象（parse 失败则当作不传 body）
    let body;
    try {
      body = this.state.bodyText ? JSON.parse(this.state.bodyText) : undefined;
    } catch (e) {
      this._appendLog(`body 不是合法 JSON，已忽略 body：${ e.message }`);
      body = undefined;
    }
    // 业务里通常把 conversationId / 设备id 也带进 body，这里一并兜底填充便于联调。
    // 兼容两种命名：洗护用 deviceId、callSmartChatAPI 用 did。
    if (body && typeof body === 'object') {
      if (!body.conversationId) body.conversationId = conversationId;
      const dvid = (Device && Device.deviceID) ? Device.deviceID : '';
      if (dvid) {
        if ('deviceId' in body && !body.deviceId) body.deviceId = dvid;
        if ('did' in body && !body.did) body.did = dvid;
        // 两个 key 都没有时，按通用习惯补 deviceId
        if (!('deviceId' in body) && !('did' in body)) body.deviceId = dvid;
      }
      // 洗护：补设备型号
      if ('prodModel' in body && !body.prodModel && Device && Device.model) {
        body.prodModel = Device.model;
      }
    }

    // header：把输入框文本 parse 成对象（parse 失败则不传 header）
    let header;
    try {
      header = this.state.headerText ? JSON.parse(this.state.headerText) : undefined;
    } catch (e) {
      this._appendLog(`header 不是合法 JSON，已忽略 header：${ e.message }`);
      header = undefined;
    }

    this.setState({ conversationId, running: true });
    this._setupListener(eventName);

    // opts 与 callSmartChatAPI 的 NetRequest 对齐：path / host / body(→data query) / header
    const opts = {
      path: this.state.path,
      conversationId,
      callbackEvent: this.state.callbackEvent,
      body
    };
    // host 留空时不传，让 native 走默认网关
    if (this.state.host) opts.host = this.state.host;
    if (header) opts.header = header;
    this._appendLog(`==> open ${ JSON.stringify(opts) }`);

    Service.SSE.open(opts)
      .then((res) => this._appendLog(`open resolved: ${ JSON.stringify(res) }`))
      .catch((err) => {
        // 参数错误等同步失败：reject 错误描述（不走事件通道）
        this._appendLog(`open rejected: ${ JSON.stringify(err) }`);
        this._teardownListener();
        this.setState({ running: false });
      });
  }

  _cancel() {
    if (!this.state.conversationId) {
      this._appendLog('无活跃会话，无需取消');
      return;
    }
    this._appendLog(`==> cancel cid=${ this.state.conversationId }`);
    Service.SSE.cancel(this.state.conversationId)
      .then(() => this._appendLog('cancel resolved'))
      .catch((e) => this._appendLog(`cancel rejected: ${ JSON.stringify(e) }`));
    // 注意：cancel 会通过事件下发 code=-3，监听里会收到并清理
  }

  // 并发测试：连开两条不同 cid 的流，验证多会话隔离（事件名互不串）
  _openConcurrent() {
    for (let i = 0; i < 2; i++) {
      const conversationId = this._genConversationId();
      const eventName = `${ this.state.callbackEvent }:${ conversationId }`;
      const sub = DeviceEventEmitter.addListener(eventName, (evt) => {
        const code = evt && evt.code;
        this._appendLog(`[并发#${ i }] <== code=${ code } cid=${ evt && evt.conversationId } data=${ evt && evt.data }`);
        if (code === 1 || code < 0) sub.remove();
      });
      let body;
      try {
        body = this.state.bodyText ? JSON.parse(this.state.bodyText) : undefined;
      } catch (e) {
        body = undefined;
      }
      let header;
      try {
        header = this.state.headerText ? JSON.parse(this.state.headerText) : undefined;
      } catch (e) {
        header = undefined;
      }
      const cc = { path: this.state.path, conversationId, callbackEvent: this.state.callbackEvent, body };
      if (this.state.host) cc.host = this.state.host;
      if (header) cc.header = header;
      this._appendLog(`[并发#${ i }] ==> open cid=${ conversationId }`);
      Service.SSE.open(cc)
        .catch((err) => {
          this._appendLog(`[并发#${ i }] open rejected: ${ JSON.stringify(err) }`);
          sub.remove();
        });
    }
  }

  // ============ UI ============

  _btn(title, onPress, disabled) {
    return (
      <TouchableHighlight
        underlayColor="#bbb"
        style={[styles.btn, disabled ? styles.btnDisabled : null]}
        onPress={disabled ? null : onPress}
      >
        <Text style={styles.btnText}>{title}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>path</Text>
        <TextInput
          style={styles.input}
          value={this.state.path}
          onChangeText={(t) => this.setState({ path: t })}
          autoCapitalize="none"
          placeholder="请求路径，例 /llm/api/mihome/assistant"
        />

        <Text style={styles.label}>host（留空走默认网关）</Text>
        <TextInput
          style={styles.input}
          value={this.state.host}
          onChangeText={(t) => this.setState({ host: t })}
          autoCapitalize="none"
          placeholder="例 https://app.business.smartcamera.api.mijia.tech"
        />

        <Text style={styles.label}>callbackEvent（事件名前缀）</Text>
        <TextInput
          style={styles.input}
          value={this.state.callbackEvent}
          onChangeText={(t) => this.setState({ callbackEvent: t })}
          autoCapitalize="none"
        />

        <Text style={styles.label}>body（JSON，整体作为 data 透传）</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={this.state.bodyText}
          onChangeText={(t) => this.setState({ bodyText: t })}
          multiline
          autoCapitalize="none"
          placeholder='{"question":"你好"}'
        />

        <Text style={styles.label}>header（JSON，仅追踪头）</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={this.state.headerText}
          onChangeText={(t) => this.setState({ headerText: t })}
          multiline
          autoCapitalize="none"
          placeholder='{"miot-request-did":"xxx","Content-Type":"application/json"}'
        />

        <Text style={styles.hint}>
          conversationId: {this.state.conversationId || '(未开始)'}　状态: {this.state.running ? '运行中' : '空闲'}
        </Text>

        <Text style={styles.label}>洗护示例（三种 actionType）</Text>
        <View style={styles.btnRow}>
          {this._btn('文字', () => this._fillWashcarePreset('text'), false)}
          {this._btn('选参', () => this._fillWashcarePreset('select'), false)}
          {this._btn('语音', () => this._fillWashcarePreset('voice'), false)}
        </View>
        <View style={styles.btnRow}>
          {this._btn('填入 callSmartChatAPI 同款', () => this._fillSmartChatPreset(), false)}
        </View>
        <View style={styles.btnRow}>
          {this._btn('发起 SSE', () => this._open(), this.state.running)}
          {this._btn('取消', () => this._cancel(), !this.state.conversationId)}
        </View>
        <View style={styles.btnRow}>
          {this._btn('并发×2', () => this._openConcurrent(), false)}
          {this._btn('清屏', () => this._clearLog(), false)}
        </View>

        <Text style={styles.label}>事件日志</Text>
        <View style={styles.logBox}>
          {this.state.logs.length === 0
            ? <Text style={styles.logLine}>（暂无事件）</Text>
            : this.state.logs.map((l, idx) => (
              <Text key={`${ idx }`} style={styles.logLine}>{l}</Text>
            ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12
  },
  label: {
    fontSize: 13,
    color: '#888',
    marginTop: 10,
    marginBottom: 4
  },
  hint: {
    fontSize: 12,
    color: '#3060c0',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    color: '#333'
  },
  inputMultiline: {
    height: 64,
    textAlignVertical: 'top'
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between'
  },
  btn: {
    flex: 1,
    height: 42,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#32BAC0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnDisabled: {
    backgroundColor: '#bcd'
  },
  btnText: {
    color: '#fff',
    fontSize: 15
  },
  logBox: {
    minHeight: 160,
    marginTop: 6,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    backgroundColor: '#fafafa',
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  logLine: {
    fontSize: 12,
    color: '#444',
    marginBottom: 2
  }
});
