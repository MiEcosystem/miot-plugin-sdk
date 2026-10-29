'use strict';
import { Service, Device, DeviceEvent, Host } from 'miot';
const SKEY_MOBILE = 'mobile-network';
const SKEY_NETWORK = 'network-info';
const ACTIVE_TAB_STORAGE_KEY_PREFIX = 'mobileCard_props_activeTab_';
const DATASOURCE_CACHE_FIRST = 1;
const DATASOURCE_REALTIME = 2;
const DATASOURCE_CACHE_ONLY = 3;
const PENDING_SWITCH_RECOVERY_MS = 10 * 60 * 1000;
// 创米 093 实际 spec 字段(信号信息走整字段 network-signal,不是 simN-snr/rsrp/...)
const MOBILE_PROP_KEYS = [
  'sim1-iccid', 'sim2-iccid',
  'sim1-type', 'sim2-type',
  'sim1-free', 'sim2-free',
  'sim1-operator', 'sim2-operator',
  'sim1-exist', 'sim2-exist',
  'current-sim',
  'auto-switch-enable',
  'auto-switch-status',
  'network-signal',
  'network-info',
];
const MOBILE_CARD_BOOT_PROP_KEYS = [
  'current-sim',
  'auto-switch-enable',
  'auto-switch-status',
  'sim1-exist', 'sim2-exist',
  'sim1-operator', 'sim2-operator',
  'sim1-iccid', 'sim2-iccid',
  'sim1-type', 'sim2-type',
  'network-info',
];
// 信号字段并未拆到 network-info service,统一并到 mobile-network.network-signal
const NETWORK_PROP_KEYS = [];
/**
 * 4G 流量卡 spec 服务封装。
 * 字段分布在两个 service:mobile-network(卡 / 切卡 / 智能切换)+ network-info(信号)。
 */
class MobileNetworkService {
  /**
   * 懒加载两个 service 的 siid / piid 元数据,缓存到 _spec.piidMap。
   * spec 查询失败往上抛,由调用方决定 toast 还是降级。
   */
  async _ensureSpec() {
    if (this._spec) return this._spec;
    try {
    const did = Device.deviceID;
    const instance = await Service.spec.getInstanceWithCache(did);
    if (!instance) throw new Error('no spec instance');
    const isV3 = parseFloat(instance['protocol-version'] || 2) >= 3;
    const keyIndex = isV3 ? 4 : 3;
    // 找到两个 service 的 siid/miid。spec-v3 service 在 modules[].services[];v2 在 services[]。
    const findService = (skey) => {
      if (isV3) {
        const modules = instance.modules || [];
        for (let i = 0; i < modules.length; i++) {
          const services = modules[i].services || [];
          for (let j = 0; j < services.length; j++) {
            const parts = (services[j].type || '').split(':');
            if (parts[keyIndex] === skey) {
              return { siid: services[j].iid, miid: modules[i].iid, raw: services[j] };
            }
          }
        }
        return null;
      }
      const services = instance.services || [];
      for (let i = 0; i < services.length; i++) {
        const parts = (services[i].type || '').split(':');
        if (parts[keyIndex] === skey) {
          return { siid: services[i].iid, miid: undefined, raw: services[i] };
        }
      }
      return null;
    };
    const mobile = findService(SKEY_MOBILE);
    if (!mobile) throw new Error('no mobile-network service');
    // network-info 是可选的:创米 093 把信号合并进 mobile-network 了,Wi-Fi 设备才有它
    const network = findService(SKEY_NETWORK);
    // 解析 service 下的 property piid。raw.properties 形如 [{iid, type:'urn:...:property:sim1-iccid:...'}]
    const buildPiidMap = (svc, keys, source) => {
      const out = {};
      if (!svc) return out;
      const props = svc.raw.properties || [];
      keys.forEach((pkey) => {
        for (let i = 0; i < props.length; i++) {
          const parts = (props[i].type || '').split(':');
          if (parts[keyIndex] === pkey) {
            // access: MIOT spec 标准声明,含 'notify' 才支持订阅 push。
            // 必须以真机 instance 为准:不支持 notify 的 prop 订了也收不到 push。
            const access = props[i].access || [];
            out[pkey] = {
              siid: svc.siid, miid: svc.miid, piid: props[i].iid, source,
              notify: Array.isArray(access) && access.includes('notify'),
            };
            break;
          }
        }
      });
      return out;
    };
    const piidMap = {
      ...buildPiidMap(mobile, MOBILE_PROP_KEYS, 'mobile'),
      ...buildPiidMap(network, NETWORK_PROP_KEYS, 'network'),
    };
    // 卡槽数 / 槽位索引:从 current-sim property 的 value-list 读
    // value-list 形如 [{value:1, description:"SIM1"}, {value:2, description:"SIM2"}]
    // 单卡设备只声明一项 → slotCount=1;双卡两项 → 2;以此类推支持未来扩展
    const slotIndices = (() => {
      const props = (mobile.raw && mobile.raw.properties) || [];
      for (let i = 0; i < props.length; i++) {
        const skey = (props[i].type || '').split(':')[keyIndex];
        if (skey !== 'current-sim') continue;
        const list = props[i]['value-list'] || [];
        return list.map((v) => v.value).filter((v) => Number.isInteger(v) && v > 0);
      }
      return [1]; // current-sim 没声明 value-list 时兜底为单卡
    })();
    // 调试:piidMap 哪些 key 解析到、哪些缺
    const matchedKeys = Object.keys(piidMap);
    const missingMobile = MOBILE_PROP_KEYS.filter((k) => !piidMap[k]);
    console.log('[Cellular][Svc] piidMap matched (' + matchedKeys.length + '): ' + matchedKeys.join(', '));
    if (missingMobile.length) {
      console.log('[Cellular][Svc] missing in mobile-network: ' + missingMobile.join(', '));
    }
    // 打出每个字段是否支持 notify(订阅)——据此决定 subscribeKeys 能订哪些,不靠猜
    const notifyDump = matchedKeys.map((k) => `${ k }:${ piidMap[k].notify ? 'notify' : 'NO' }`);
    console.log('[Cellular][Svc] access notify support: ' + notifyDump.join(', '));
    console.log('[Cellular][Svc] slotIndices = ' + JSON.stringify(slotIndices));
    // 打出 spec 中所有 events（固件结果码可能通过 event 通道下发）
    const dumpEvents = (svc, label) => {
      if (!svc || !svc.raw) return;
      const events = svc.raw.events || [];
      if (!events.length) {
        console.log(`[Cellular][Svc] ${ label } events: none`);
        return;
      }
      const dump = events.map((ev) => {
        const etype = (ev.type || '').split(':');
        const args = (ev.arguments || []).map((a) => a.piid).join(',');
        return `eiid=${ ev.iid } name=${ etype[keyIndex] || '?' } args=[${ args }]`;
      });
      console.log(`[Cellular][Svc] ${ label } events (${ events.length }): ${ dump.join('; ') }`);
    };
    dumpEvents(mobile, 'mobile-network');
    dumpEvents(network, 'network-info');
    // 打出 spec 中所有 actions
    const dumpActions = (svc, label) => {
      if (!svc || !svc.raw) return;
      const actions = svc.raw.actions || [];
      if (!actions.length) {
        console.log(`[Cellular][Svc] ${ label } actions: none`);
        return;
      }
      const dump = actions.map((ac) => {
        const atype = (ac.type || '').split(':');
        const ins = (ac.in || []).join(',');
        const outs = (ac.out || []).join(',');
        return `aiid=${ ac.iid } name=${ atype[keyIndex] || '?' } in=[${ ins }] out=[${ outs }]`;
      });
      console.log(`[Cellular][Svc] ${ label } actions (${ actions.length }): ${ dump.join('; ') }`);
    };
    dumpActions(mobile, 'mobile-network');
    dumpActions(network, 'network-info');
    this._spec = { piidMap, slotIndices };
    return this._spec;
    } catch (e) {
      console.log(`[Cellular][Svc] _ensureSpec failed, fallback to slotIndices=[1,2]: ${ e && e.message }`);
      // piidMap 空意味着 getAllProperties / _setProp / subscribeMessages 无法工作,
      // 但 slotIndices 至少能让 Tab 显示出来,用户能看到离线流量卡而不是空白
      this._spec = { piidMap: {}, slotIndices: [1, 2] };
      return this._spec;
    }
  }
  /** 卡槽数(1 / 2 / 3...)。需先 await _ensureSpec 一次或调过 getAllProperties */
  getSlotCount() {
    return this._spec ? this._spec.slotIndices.length : 0;
  }
  /** 槽位索引数组(如 [1, 2])。需先 await _ensureSpec 一次或调过 getAllProperties */
  getSlotIndices() {
    return this._spec ? this._spec.slotIndices.slice() : [];
  }
  getCachedSlotIndices() {
    return this.getSlotIndices();
  }
  _getActiveTabKey() {
    return ACTIVE_TAB_STORAGE_KEY_PREFIX + Device.deviceID;
  }
  persistActiveTab(tab) {
    const val = parseInt(tab, 10);
    if (!val) return;
    this._lastActiveTab = val;
    try { Host.storage.set(this._getActiveTabKey(), val); } catch (e) { /* noop */ }
  }
  getLastActiveTabSync() {
    return this._lastActiveTab || 0;
  }
  async loadLastActiveTab() {
    try {
      const key = this._getActiveTabKey();
      const result = Host.storage.get(key);
      const val = result && result.then ? await result : result;
      this._lastActiveTab = val || 0;
      return this._lastActiveTab;
    } catch (e) {
      return 0;
    }
  }
  // 页面实例 ID 管理:RN 导航可能同时存在多个 MobileCardPage 实例,
  // 只有最新 mount 的实例才活跃(处理 push/recovery),旧实例静默。
  registerPageInstance() {
    if (!this._pageInstanceSeq) this._pageInstanceSeq = 0;
    this._pageInstanceSeq += 1;
    this._activePageInstance = this._pageInstanceSeq;
    return this._pageInstanceSeq;
  }
  isActivePageInstance(id) {
    return id === this._activePageInstance;
  }
  unregisterPageInstance(id) {
    if (this._activePageInstance === id) {
      this._activePageInstance = 0;
    }
  }
  /** 一次拉齐所有属性。默认与其它 spec 页面一致:优先读服务端缓存,无缓存再下发 RPC。 */
  async getAllProperties(options = {}) {
    const { piidMap } = await this._ensureSpec();
    const did = Device.deviceID;
    const keys = options.keys || Object.keys(piidMap);
    const params = keys.map((key) => piidMap[key]).filter(Boolean).map(({ siid, miid, piid }) => {
      const p = { did, siid, piid };
      if (miid !== undefined) p.miid = miid;
      return p;
    });
    if (!params.length) return {};
    const datasource = options.datasource || (Device.isOnline ? DATASOURCE_CACHE_FIRST : DATASOURCE_CACHE_ONLY);
    const res = await Service.spec.getPropertiesValue(params, datasource);
    // 整齐打印每个字段的 value 和 code,对齐显示
    const inv = {};
    Object.entries(piidMap).forEach(([k, { siid, piid }]) => {
      inv[`${ siid }.${ piid }`] = k;
    });
    const lines = (res || []).map((r) => {
      const key = inv[`${ r.siid }.${ r.piid }`] || `(?siid=${ r.siid } piid=${ r.piid })`;
      const v = r.code === 0 ? JSON.stringify(r.value) : `(code=${ r.code } value=${ JSON.stringify(r.value) })`;
      return `  ${ key.padEnd(22, ' ') } = ${ v }`;
    });
    const ts = Date.now();
    console.log(`[Cellular] getPropertiesValue @${ ts } (datasource=${ datasource } isOnline=${ Device.isOnline }):\n${ lines.join('\n') }`);
    // 单独高亮 current-sim 这条的 code/value —— 切卡判定的核心字段,看它"忙(code≠0)→ 恢复(code=0)"
    const csMeta = piidMap['current-sim'];
    if (csMeta) {
      const csRow = (res || []).find((r) => r.siid === csMeta.siid && r.piid === csMeta.piid);
      if (csRow) {
        console.log(`[Cellular] >>> current-sim @${ ts }: code=${ csRow.code } value=${ JSON.stringify(csRow.value) }`);
      } else {
        console.log(`[Cellular] >>> current-sim @${ ts }: NOT in response`);
      }
    }
    const normalized = this._normalize(res, piidMap);
    return normalized;
  }
  getRealtimeProperties() {
    return this.getAllProperties({ datasource: Device.isOnline ? DATASOURCE_REALTIME : DATASOURCE_CACHE_ONLY });
  }
  async fetchNetworkInfo() {
    return this.getAllProperties({
      keys: ['network-info'],
      datasource: DATASOURCE_REALTIME,
    });
  }
  async getBootProperties() {
    return this.getAllProperties({
      datasource: Device.isOnline ? DATASOURCE_CACHE_FIRST : DATASOURCE_CACHE_ONLY,
      keys: MOBILE_CARD_BOOT_PROP_KEYS,
    });
  }
  /**
   * 切卡指令飞行锁:RPC 发出后到设备 push 回 current-sim 之前,_switchInflight=true。
   * 期间用户重复点击切卡 → 直接抛 'switch-busy',不重发 RPC。
   * 设备状态在变化中(切卡引起的短暂离线 / 重新建链),并发 RPC 会被设备拒绝甚至导致状态错乱。
   *
   * 解锁时机(任一触发):
   *   1. current-sim 到达目标 → finishSwitch() 清 pending
   *   2. 明确失败 / 60s watchdog 超时 → finishSwitch() 清 pending(MIECOCM-6722:重置缓存)
   */
  isSwitchInflight() { return !!this._switchInflight; }
  // 进行中的切卡目标卡(setProp 发出后记下,finishSwitch 清空)。
  // 跨页面生命周期保留:切卡中退出插件、重进时,页面据此恢复"切换中"上下文,
  // 拉到 current-sim===该目标即补弹"切换成功"。0 表示当前无进行中的切卡。
  getPendingTarget() {
    if (!this._pendingTarget) return 0;
    if (this._pendingTargetAt && Date.now() - this._pendingTargetAt > PENDING_SWITCH_RECOVERY_MS) {
      console.log('[Cellular][Svc] pending switch expired, clear recovery target');
      this.finishSwitch();
      return 0;
    }
    return this._pendingTarget || 0;
  }
  finishSwitch() {
    this._switchInflight = false;
    this._pendingTarget = 0;
    this._pendingTargetAt = 0;
  }
  async switchSim(targetSim) {
    if (this._switchInflight) {
      console.log('[Cellular][Svc] switchSim BLOCKED by inflight lock');
      const err = new Error('switch-busy');
      err.code = 'switch-busy';
      throw err;
    }
    this._switchInflight = true;
    this._pendingTarget = targetSim;
    this._pendingTargetAt = Date.now();
    try {
      const t0 = Date.now();
      console.log(`[Cellular][Svc] setProp current-sim = ${ targetSim } @${ t0 } isOnline=${ Device.isOnline }`);
      const res = await this._setProp('current-sim', targetSim);
      const t1 = Date.now();
      const it = Array.isArray(res) ? res[0] : null;
      console.log(`[Cellular][Svc] setProp returned @${ t1 } (took ${ t1 - t0 }ms): code=${ it ? it.code : 'no-item' } raw=${ JSON.stringify(res) } isOnline=${ Device.isOnline }`);
      // 返回 code 只作诊断。设备切卡忙时可能回非 0,但最终仍会完成切换;
      // 保持 inflight + pendingTarget,等页面通过 current-sim 到达目标或 watchdog / 恢复流程收尾。
      return res;
    } catch (e) {
      console.log(`[Cellular][Svc] switchSim threw: ${ e && e.message }`);
      throw e;
    }
  }
  setAutoSwitch(enabled) { return this._setProp('auto-switch-enable', enabled); }
  async _setProp(pkey, value) {
    const { piidMap } = await this._ensureSpec();
    const meta = piidMap[pkey];
    if (!meta) throw new Error(`spec key not found: ${ pkey }`);
    const param = { did: Device.deviceID, siid: meta.siid, piid: meta.piid, value };
    if (meta.miid !== undefined) param.miid = meta.miid;
    const res = await Service.spec.setPropertiesValue([param]);
    console.log(`[Cellular][Svc] _setProp(${ pkey }=${ JSON.stringify(value) }) response: ${ JSON.stringify(res) }`);
    return res;
  }
  /**
   * 订阅设备主动上报。两个 service 各取自己的 siid 拼 'prop.{siid}.{piid}'。
   * 入参是字符串数组,不是 piid 数字 — MIOT spec 设备规范。
   */
  async subscribeMessages(handler) {
    const { piidMap } = await this._ensureSpec();
    // 想订阅的全部字段:卡相关(exist/operator/iccid)+ current-sim + 智能切换 + 信号/网络。
    // 远端这些属性变化时固件 push,UI 才能实时跟随(否则只能靠 loadProps 主动拉)。
    const wantKeys = [
      'current-sim', 'auto-switch-enable', 'auto-switch-status',
      'sim1-exist', 'sim2-exist',
      'sim1-operator', 'sim2-operator',
      'sim1-iccid', 'sim2-iccid',
      'sim1-type', 'sim2-type',
      'sim1-free', 'sim2-free',
      'network-signal', 'network-info',
    ];
    // 订阅所有能解析到 siid/piid 的字段(只剔除 piidMap 里压根没有的)。
    // 不再用 spec 的 notify access 过滤 —— spec access 是云端声明,未必准:固件方明确
    // 会上报 current-sim,但其 spec 可能漏标 notify。漏标就被过滤掉 → prop.22.8 没进订阅
    // → 固件推了也收不到(实测 FIRED 只见 prop.23.1/1.5,从无 22.8)。
    // 以"固件实际会推"为准而非"spec 是否标 notify":订了不支持的最多收不到,不会少订会推的。
    const subKeys = wantKeys.filter((k) => piidMap[k]);
    const noNotify = subKeys.filter((k) => !piidMap[k].notify);
    const skippedMissing = wantKeys.filter((k) => !piidMap[k]);
    if (noNotify.length) {
      // 仅诊断:这些字段 spec 没标 notify,但仍订阅(看固件实际是否会推)
      console.log('[Cellular][Svc] subscribe (spec no notify, subscribe anyway): ' + noNotify.join(', '));
    }
    if (skippedMissing.length) {
      console.log('[Cellular][Svc] subscribe SKIP (not in piidMap): ' + skippedMissing.join(', '));
    }
    const subscribeKeys = subKeys.map((k) => {
      const { siid, piid } = piidMap[k];
      return `prop.${ siid }.${ piid }`;
    });
    if (!subscribeKeys.length) return { remove: () => {} };
    console.log(`[Cellular][Svc] subscribe+listen keys (${ subKeys.join(',') }) = ${ JSON.stringify(subscribeKeys) }`);
    // 双通道：subscribeMessages 接收设备主动 push，listenMessages 轮询检测变化
    let sub = null;
    try {
      sub = await Device.getDeviceWifi().subscribeMessages(...subscribeKeys);
      console.log(`[Cellular][Svc] subscribeMessages OK @${ Date.now() }`);
    } catch (e) {
      console.log(`[Cellular][Svc] subscribeMessages FAILED: ${ e && (e.message || JSON.stringify(e)) }`);
    }
    let listened = false;
    try {
      const res = await Device.getDeviceWifi().listenMessages(...subscribeKeys);
      listened = true;
      console.log(`[Cellular][Svc] listenMessages OK @${ Date.now() }, res=${ JSON.stringify(res) }`);
    } catch (e) {
      console.log(`[Cellular][Svc] listenMessages FAILED: ${ e && (e.message || JSON.stringify(e)) }`);
    }
    const myDid = Device.deviceID;
    const listener = DeviceEvent.deviceReceivedMessages.addListener((dev, msgs) => {
      const evDid = dev && (dev.deviceID || dev.did);
      const allKeys = [];
      const allEntries = [];
      if (msgs && msgs.forEach) {
        msgs.forEach((v, k) => {
          allKeys.push(k);
          allEntries.push(`${ k }=${ JSON.stringify(v) }`);
        });
      }
      console.log(`[Cellular][Svc] deviceReceivedMessages FIRED @${ Date.now() }: evDid=${ evDid } myDid=${ myDid } match=${ evDid === myDid } size=${ msgs && msgs.size } keys=[${ allKeys.join(',') }]`);
      console.log(`[Cellular][Svc] ALL msgs dump: [${ allEntries.join(', ') }]`);
      // msgs 是 Map<'prop.{siid}.{piid}', value>;反查 key 给页面用。
      // push 的 value 是数组([2] / [null] / [undefined]),Service 层统一脱成裸值
      // 再交给 handler,与 getAllProperties 返回裸值的口径一致。
      const rawDump = [];
      const out = {};
      const unknown = []; // 推了但 piidMap 反查不到 pkey 的 prop(如未订阅/未声明的 simN-exist)
      msgs.forEach((value, msgKey) => {
        rawDump.push(`${ msgKey }=${ JSON.stringify(value) }(type=${ Array.isArray(value) ? 'array' : typeof value })`);
        const m = msgKey.match(/^prop\.(\d+)\.(\d+)$/);
        if (!m) return;
        const siid = parseInt(m[1], 10);
        const piid = parseInt(m[2], 10);
        let matched = false;
        Object.entries(piidMap).forEach(([pkey, meta]) => {
          if (meta.siid === siid && meta.piid === piid) {
            out[pkey] = Array.isArray(value) ? (value.length ? value[0] : undefined) : value;
            matched = true;
          }
        });
        if (!matched) unknown.push(`${ msgKey }=${ JSON.stringify(value) }`);
      });
      console.log(`[Cellular][Svc] push raw: [${ rawDump.join(', ') }]`);
      console.log(`[Cellular][Svc] push unwrapped → ${ JSON.stringify(out) }`);
      if (unknown.length) {
        console.log(`[Cellular][Svc] push UNKNOWN (not in piidMap, dropped): [${ unknown.join(', ') }]`);
      }
      if (Object.keys(out).length) handler(out);
    });
    return {
      remove: () => {
        if (sub && sub.remove) sub.remove();
        if (listened) {
          try {
            Device.getDeviceWifi().unlistenMessages(...subscribeKeys);
          } catch (e) {
            console.log(`[Cellular][Svc] unlistenMessages FAILED: ${ e && (e.message || JSON.stringify(e)) }`);
          }
        }
        if (listener && listener.remove) listener.remove();
      },
    };
  }
  // raw: [{did, siid, piid, code, value}, ...]。不同 service 的 piid 可能撞号,
  // 反查 key 用 siid.piid 复合键。code≠0 输出 null,UI 据此走真离线降级
  // (灰卡 / '--')。假离线保护期由调用方在 page 层处理(merge 旧值)。
  _normalize(raw, piidMap) {
    const inv = {};
    Object.entries(piidMap).forEach(([k, { siid, piid }]) => {
      inv[`${ siid }.${ piid }`] = k;
    });
    const out = {};
    (raw || []).forEach(({ siid, piid, code, value }) => {
      const key = inv[`${ siid }.${ piid }`];
      if (!key) return;
      out[key] = code === 0 ? value : null;
    });
    return out;
  }
}
export default new MobileNetworkService();