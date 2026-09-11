'use strict';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Clipboard } from 'react-native';
import { Host, PackageEvent, DeviceEvent, HostEvent } from 'miot';
import {
  SubpageLayout,
  NavigationBar,
  SegmentedControls,
  ListCard,
  ListItem,
  ListItemWithWidget,
  ConfigContext,
  Fonts,
  MessageDialog,
  LoadingToast,
  useCollapsibleTitle,
} from 'miot/ui/hyperOSUI';
import strings, { formatString } from '../../resources/Strings';
import MobileNetworkService from './MobileNetworkService';
import Svg, { Path, Rect } from 'react-native-svg';
// MIOT spec 设备 subscribeMessages push 的 value 总是数组形式([1] 而非 1),
// getPropertiesValue 返回的是裸值。把数组首项取出统一成单值。
function unwrapPushValue(v) {
  if (Array.isArray(v)) return v.length ? v[0] : undefined;
  return v;
}
// LoadingToast 延迟显示阈值:RPC 快回(几百 ms)时不显示,避免一闪而过
const LOADING_TOAST_DELAY_MS = 1000;
const SWITCH_VISUAL_DELAY_MS = 220;
// 切卡结束后的 network-info 冷却窗口:协议栈重新注册基站可能耗时 10-20s,期间 code=-704083036
// (字段暂时不可用)导致 nv=null 会被误判 offline 闪一下。窗口内 nv=null 直接保持 isOnline 不变
// (切换前的 online 态延续),窗口过期后 nv=null 才立即 offline(回归常规判定)。
// 30s 覆盖 3 个 poll 周期,给协议栈足够恢复时间。
const SWITCH_END_GRACE_MS = 30000;
// 切卡看门狗:一次性保底超时。未经历中断且在线可读 → 判失败;
// 经历断网/断电/属性暂不可读 → 冷收尾不弹 toast。
const SWITCH_WATCHDOG_MS = 60000;
// network-info 主轮询周期:isOnline 判据唯一来源,mount 后立即打一发,后续每 10s 一次
const NETWORK_POLL_INTERVAL_MS = 10000;
const getOperatorName = (operator) => {
  switch (operator) {
    case 1: return strings.mobileCard_operatorMobile;
    case 2: return strings.mobileCard_operatorUnicom;
    case 3: return strings.mobileCard_operatorTelecom;
    default: return strings.mobileCard_operatorUnknown;
  }
};
// ICCID 4 位一组空格分隔
function formatIccid(iccid) {
  if (!iccid) return '--';
  return String(iccid).replace(/(.{4})/g, '$1 ').trim();
}
/**
 * 解析 mobile-network.network-info(JSON 字符串)。创米 093 实测格式:
 *   {"snr":-52,"rsrp":-81,"rsrq":-9,"net_band":"LTE BAND 3","net_format":"FDD LTE"}
 */
function parseNetworkInfo(raw) {
  if (!raw || typeof raw !== 'string') return {};
  try {
    const obj = JSON.parse(raw);
    return {
      snr: obj.snr,
      rsrp: obj.rsrp,
      rsrq: obj.rsrq,
      band: obj.net_band,
      downlinkChannel: obj.net_format,
    };
  } catch (e) {
    return {};
  }
}
// 数值/字符串字段显示;null/undefined/空 → '--'
function fmt(v) {
  if (v === null || v === undefined || v === '') return '--';
  return String(v);
}
function toSlotIndex(value) {
  const index = parseInt(value, 10);
  return Number.isInteger(index) ? index : 0;
}
function isSlotReady(state, slotIndex) {
  if (!state || !slotIndex) return false;
  const exist = state[`sim${ slotIndex }-exist`];
  return exist !== null && exist !== undefined;
}
function isSlotEmpty(state, slotIndex) {
  if (!state || !slotIndex) return false;
  const exist = state[`sim${ slotIndex }-exist`];
  return exist === 1;
}
function hasTemporaryUnavailableField(state, targetSlot) {
  if (!state) return false;
  if (state['current-sim'] === null) return true;
  if (targetSlot && state[`sim${ targetSlot }-exist`] === null) return true;
  return false;
}
function resolveActiveSlot(state, slotIndices, previousValue) {
  const indices = (slotIndices || []).map((value) => toSlotIndex(value)).filter(Boolean);
  const current = toSlotIndex(state && state['current-sim']);
  // current-sim 是设备明确告知的"当前卡",只要在 slotIndices 内就直接采用;
  // 切换中 / 属性暂不可读(sim{i}-exist=undefined / code=-704083036)不应阻止 Tab 选择,
  // 这些字段的就绪态由渲染层(蓝卡 / 灰卡 / Loading)消费,与 Tab 选择解耦。
  if (indices.includes(current)) return current;
  const previous = toSlotIndex(previousValue);
  if (indices.includes(previous)) return previous;
  if (indices.length === 1) return indices[0];
  return 0;
}
// —— SVG 组件(原 SimLabelSvg / CopyIconSvg，内联减少文件依赖) ——
const SIM_LABEL_PATHS = {
  1: { width: 47, height: 15, d: 'M5.74219 0C8.40608 6.39892e-05 10.1158 1.36832 10.9258 2.98828L8.6582 4.51758C8.0102 3.38374 6.92995 2.71779 5.70605 2.71777C4.48216 2.71777 3.49236 3.32989 3.49219 4.17578C3.49219 5.07576 4.22992 5.43616 6.2998 5.99414C8.2978 6.49814 11.0342 7.23619 11.0342 10.2422C11.0341 12.8521 8.76545 14.5439 5.56152 14.5439C2.86192 14.5438 0.91801 13.2661 0 11.3584L2.3584 9.77441C3.0964 11.2141 4.23023 11.8262 5.58008 11.8262C7.03803 11.8262 7.95605 11.2497 7.95605 10.3857C7.95594 9.52192 7.3618 9.10761 5.16602 8.51367C3.18603 7.97368 0.431669 7.23597 0.431641 4.24805C0.431641 1.76405 2.73619 0 5.74219 0ZM15.6465 14.292H12.6406V0.251953H15.6465V14.292ZM25.3799 7.45215H25.4883L30.1143 0.251953H32.832V14.292H29.8984V5.72363H29.79L26.5498 10.7637H24.3359L21.0781 5.77832H20.9697V14.292H18.0547V0.251953H20.7539L25.3799 7.45215ZM46.3486 14.292H43.3428V3.61816L40.2109 5.23828V2.10547L43.8467 0.251953H46.3486V14.292Z' },
  2: { width: 50, height: 15, d: 'M5.74219 0C8.40608 6.39892e-05 10.1158 1.36832 10.9258 2.98828L8.6582 4.51758C8.0102 3.38374 6.92995 2.71779 5.70605 2.71777C4.48216 2.71777 3.49236 3.32989 3.49219 4.17578C3.49219 5.07576 4.22992 5.43616 6.2998 5.99414C8.2978 6.49814 11.0342 7.23619 11.0342 10.2422C11.0341 12.8521 8.76545 14.5439 5.56152 14.5439C2.86192 14.5438 0.91801 13.2661 0 11.3584L2.3584 9.77441C3.0964 11.2141 4.23023 11.8262 5.58008 11.8262C7.03803 11.8262 7.95605 11.2497 7.95605 10.3857C7.95594 9.52192 7.3618 9.10761 5.16602 8.51367C3.18603 7.97368 0.431669 7.23597 0.431641 4.24805C0.431641 1.76405 2.73619 0 5.74219 0ZM15.6465 14.292H12.6406V0.251953H15.6465V14.292ZM25.3799 7.45215H25.4883L30.1143 0.251953H32.832V14.292H29.8984V5.72363H29.79L26.5498 10.7637H24.3359L21.0781 5.77832H20.9697V14.292H18.0547V0.251953H20.7539L25.3799 7.45215ZM44.9453 0C47.8609 0.000183842 49.6063 1.72796 49.6064 4.26562C49.6064 5.84945 48.797 7.19968 47.4473 8.60352L44.7109 11.4844H49.8945V14.292H40.1211V12.2578L45.0713 7.11035C46.1693 5.95837 46.5293 5.25573 46.5293 4.42773C46.5292 3.43788 45.9344 2.75391 44.8545 2.75391C43.7567 2.75405 43.0009 3.40214 42.4609 4.62598L40.1211 3.02441C40.7871 1.49441 42.2993 0 44.9453 0Z' },
  3: { width: 51, height: 15, d: 'M5.74219 0C8.40608 6.39892e-05 10.1158 1.36832 10.9258 2.98828L8.6582 4.51758C8.0102 3.38374 6.92995 2.71779 5.70605 2.71777C4.48216 2.71777 3.49236 3.32989 3.49219 4.17578C3.49219 5.07576 4.22992 5.43616 6.2998 5.99414C8.2978 6.49814 11.0342 7.23619 11.0342 10.2422C11.0341 12.8521 8.76545 14.5439 5.56152 14.5439C2.86192 14.5438 0.91801 13.2661 0 11.3584L2.3584 9.77441C3.0964 11.2141 4.23023 11.8262 5.58008 11.8262C7.03803 11.8262 7.95605 11.2497 7.95605 10.3857C7.95594 9.52192 7.3618 9.10761 5.16602 8.51367C3.18603 7.97368 0.431669 7.23597 0.431641 4.24805C0.431641 1.76405 2.73619 0 5.74219 0ZM49.373 2.7002L46.043 5.59766L46.0791 5.6875C48.167 5.63367 50.0391 7.30852 50.0391 9.90039C50.0388 12.6362 47.9866 14.5439 45.0527 14.5439C42.5328 14.5439 40.9128 13.1935 40.1748 11.5195L42.5332 9.91797C43.0732 11.1419 43.8292 11.8262 45.0352 11.8262C46.2408 11.826 47.0506 11.088 47.0508 9.90039C47.0508 8.69439 46.2767 7.93834 45.0527 7.90234C44.5668 7.88436 44.2066 8.028 43.6846 8.33398L42.0283 6.24609L45.3584 3.05957H40.6973V0.251953H49.373V2.7002ZM15.6465 14.292H12.6406V0.251953H15.6465V14.292ZM25.3799 7.45215H25.4883L30.1143 0.251953H32.832V14.292H29.8984V5.72363H29.79L26.5498 10.7637H24.3359L21.0781 5.77832H20.9697V14.292H18.0547V0.251953H20.7539L25.3799 7.45215Z' },
};
function SimLabelSvg({ index, color, scale = 1 }) {
  const data = SIM_LABEL_PATHS[index];
  if (!data) return null;
  return (
    <Svg width={data.width * scale} height={data.height * scale} viewBox={`0 0 ${ data.width } ${ data.height }`} fill="none">
      <Path d={data.d} fill={color} />
    </Svg>
  );
}
function CopyIconSvg({ color, size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Rect x="2.66669" y="5.3335" width="6.66667" height="8.66667" rx="1.33333" stroke={color} strokeWidth={1.33333} />
      <Path d="M6.66669 4V3.33333C6.66669 2.59695 7.26364 2 8.00002 2H12C12.7364 2 13.3334 2.59695 13.3334 3.33333V9.33333C13.3334 10.0697 12.7364 10.6667 12 10.6667H10.6667" stroke={color} strokeWidth={1.33333} />
    </Svg>
  );
}
/**
 * 流量卡蓝色 / 灰色信息区。优先级:loading > offline > !exist > 有卡蓝卡。
 *
 * - 加载中(loading=true,在线但字段未到):灰色 surfaceCardSubtle,运营商/ICCID 占位 '--',不报离线/无卡
 * - 设备离线(offline=true,即 !isOnline):灰色 surfaceCardSubtle,"已离线..."
 * - 有卡(exist=true):蓝色 accentBlueFill,白字,可选 "使用中" 角标
 * - 无卡(exist=false,设备明确空槽):灰色 surfaceCardSubtle,"无流量卡"占位,无复制图标
 */
function MobileCardInfo(props) {
  const { simIndex, operator, iccid, isCurrent, exist, offline, loading } = props;
  const { colorToken } = useContext(ConfigContext);
  const renderSimLabel = (color) => (simIndex ? (
    <View style={styles.cardSimLabel}>
      <SimLabelSvg index={simIndex} color={color} />
    </View>
  ) : null);
  const onCopy = useCallback(() => {
    if (!iccid) return;
    Clipboard.setString(String(iccid));
    Host.ui.showToast(strings.mobileCard_iccidCopied);
  }, [iccid]);
  if (loading) {
    return (
      <View style={[styles.card, { backgroundColor: colorToken.surfaceCardSubtle }]}>
        {renderSimLabel(colorToken.contentDisabledSecondary)}
        <View style={styles.cardEmptyCol}>
          <Text
            style={[Fonts.fontSystem32Regular, { color: colorToken.contentDisabledPrimary }]}
            allowFontScaling={false}
            numberOfLines={1}
          >
            --
          </Text>
          <Text
            style={[Fonts.fontSystem14Regular, { color: colorToken.contentDisabledPrimary }]}
            allowFontScaling={false}
          >
            --
          </Text>
        </View>
      </View>
    );
  }
  if (offline) {
    return (
      <View style={[styles.card, { backgroundColor: colorToken.surfaceCardSubtle }]}>
        {renderSimLabel(colorToken.contentDisabledSecondary)}
        <View style={styles.cardEmptyCol}>
          <Text
            style={[Fonts.fontSystem32Regular, { color: colorToken.contentDisabledPrimary }]}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {strings.mobileCard_offlineTitle}
          </Text>
          <Text
            style={[Fonts.fontSystem14Regular, styles.cardEmptyIccid, { color: colorToken.contentDisabledPrimary }]}
            allowFontScaling={false}
          >
            {strings.mobileCard_offlineSubtitle}
          </Text>
        </View>
      </View>
    );
  }
  if (!exist) {
    return (
      <View style={[styles.card, { backgroundColor: colorToken.surfaceCardSubtle }]}>
        {renderSimLabel(colorToken.contentDisabledSecondary)}
        <View style={styles.cardEmptyCol}>
          <Text
            style={[Fonts.fontSystem32Regular, { color: colorToken.contentDisabledPrimary }]}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {strings.mobileCard_noCard}
          </Text>
          <Text
            style={[Fonts.fontSystem14Regular, styles.cardEmptyIccid, { color: colorToken.contentDisabledPrimary }]}
            allowFontScaling={false}
          >
            --
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.card, { backgroundColor: colorToken.accentBlueFill }]}>
      {renderSimLabel('rgba(255,255,255,0.4)')}
      {isCurrent ? (
        <Text
          style={[Fonts.fontSystem16Medium, styles.cardInUseTag, { color: colorToken.contentInverseNormal }]}
          allowFontScaling={false}
        >
          {strings.mobileCard_inUse}
        </Text>
      ) : null}
      <View style={styles.cardInfoCol}>
        <Text
          style={[Fonts.fontSystem32Regular, { color: colorToken.contentInverseNormal }]}
          allowFontScaling={false}
          numberOfLines={1}
        >
          {getOperatorName(operator)}
        </Text>
        <View style={styles.cardIccidRow}>
          <Text
            style={[Fonts.fontSystem14Regular, styles.cardIccid, { color: 'rgba(255,255,255,0.6)' }]}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {formatIccid(iccid)}
          </Text>
          {iccid ? (
            <TouchableOpacity
              onPress={onCopy}
              style={styles.copyBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel={strings.mobileCard_copy}
            >
              <CopyIconSvg color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}
/**
 * 4G 流量卡详情页(函数组件)
 *
 * —— 判定模型 ——
 *   成功:push current-sim===target 立刻成功(快路径)
 *   失败:60s watchdog 到期 + 在线 + realtime 拉到 current-sim≠target → 失败 toast + 切到真实卡
 *   冷处理:60s watchdog 到期 + 离线/RPC失败/字段暂不可用 → 静默收尾,清 pendingTarget(MIECOCM-6722)
 *
 * —— 切卡时序(固件保证)——
 *   1. setProp current-sim 发出(RPC code 仅诊断日志,不参与判定)
 *   2. 固件推 auto-switch-status=1(可选;mount 时也用此识别正在切卡)
 *   3. 切卡完成 → 推 auto-switch-status=0 + 推最新 current-sim(成功失败都推)
 */
function MobileCardPage(props) {
  const { navigation } = props;
  const { colorToken } = useContext(ConfigContext);
  const routeParams = (navigation && navigation.state && navigation.state.params) || {};
  // 4G 摄像头双卡固定为 [1, 2],spec 缓存未就绪时用兜底,避免首帧 Tab 空白
  const cachedSlotIndices = MobileNetworkService.getCachedSlotIndices() || [];
  const initialSlotIndices = cachedSlotIndices.length ? cachedSlotIndices : [1, 2];
  // activeSlot 决定首帧 Tab。current-sim 由 loadProps 完成后同步,首帧统一从 slotIndices[0](即 SIM1)起,
  // loadProps 拉到 current-sim=2 时再由 resolveActiveSlot 同步过去。不再用 lastActiveTab 缓存 —— 避免
  // "上次看 SIM2 → 这次首帧就在 SIM2 loading"造成的起点不确定。
  const initialActiveSlot = initialSlotIndices[0] || 0;
  // _normalize 后的所有 spec 字段(初始 {} = 框架已渲染但字段未加载,UI 走占位)
  const [propsState, setPropsState] = useState({});
  // 当前选中 Tab 对应的 SIM index 字符串
  const [activeTab, setActiveTab] = useState(initialActiveSlot ? String(initialActiveSlot) : '0');
  // 卡槽索引数组,从 spec current-sim.value-list 解析。空数组 → Tab 区暂不渲染
  const [slotIndices, setSlotIndices] = useState(initialSlotIndices);
  // 切卡确认弹窗目标 SIM(0 = 不显示)
  const [confirmTarget, setConfirmTarget] = useState(0);
  // 切换中视觉态:确认弹窗关闭后再显示,逻辑态由 switchingRef 立即标记。
  // mount 时若 loadProps 拉到 auto-switch-status=1 才进 switching,不再基于跨页面 pendingTarget。
  const [switching, setSwitching] = useState(false);
  // LoadingToast 是否可见(switching=true 持续 ≥1s 才显示)
  const [loadingToastVisible, setLoadingToastVisible] = useState(false);
  // 首屏加载遮罩:mount 时显示 LoadingToast,loadProps(true) 完成后隐藏,
  // 避免用户看到空白/半残卡片
  const [initialLoading, setInitialLoading] = useState(true);
  // 页面焦点态:LoadingToast 是 RN Modal,即使页面被压栈仍会显示,导致"跳到别的页面还看到切换中弹窗"。
  // packageWillPause / packageViewWillDisappearIOS 时置 false,LoadingToast 不再渲染;
  // 回到本页面时(packageDidResume / packageViewWillAppear)恢复,switching 态未结束会重新显示。
  const [pageFocused, setPageFocused] = useState(true);
  // isOnline 权威数据源:network-info 轮询 RPC 结果。
  // null = 未定态(首次 RPC 未返回),true/false = 已由 RPC 判定。
  // 卡片优先级里 null 走 loading,不显示 offline / 蓝卡。
  const [isOnline, setIsOnline] = useState(null);
  const isOnlineRef = useRef(null);
  // 手机网络是否可用(HostEvent.cellPhoneNetworkStateChanged)
  const [phoneNetworkAvailable, setPhoneNetworkAvailable] = useState(true);
  const phoneNetworkRef = useRef(true);
  // 切换态中"手机离线"事件推迟到 watchdog 冷收尾再应用,避免切换过程中 UI 抖动。
  // 设备离线不再走推迟机制:isOnline 由 network-info 轮询独立驱动,切卡态里由 watchdog 补探判定。
  const pendingPhoneOfflineRef = useRef(false);
  // ref 持有最新值给异步回调用,避免闭包陷阱
  const propsRef = useRef(null);
  const slotIndicesRef = useRef([]);
  const activeTabRef = useRef('0');
  const switchingRef = useRef(false);
  const switchingVisualTimerRef = useRef(null);
  const loadingToastTimerRef = useRef(null);
  const subRef = useRef(null);
  const mountedRef = useRef(true);
  // 本次切卡的目标卡 index。成功判定唯一标准:current-sim === switchTargetRef.current
  const switchTargetRef = useRef(0);
  // 切卡看门狗 setTimeout handle(一次性 60s 保底)
  const watchdogTimerRef = useRef(null);
  // network-info 主轮询 setInterval handle。isOnline 权威数据源。
  const networkInfoTimerRef = useRef(null);
  const consecutivePollFailRef = useRef(0);
  // doPoll 的最新引用,供 stopSwitching 立即触发一次 poll,不等 setInterval
  const pollNetworkInfoRef = useRef(null);
  // mount 初始化完成前屏蔽 push,防止旧订阅/早期 push 覆盖 mount 建立的正确状态
  const mountReadyRef = useRef(false);
  // mountReady state:轮询 useEffect 依赖它,ref 变化不 rerender 无法触发 effect
  const [mountReady, setMountReady] = useState(false);
  // 切换成功后的保护窗口:listenMessages 可能推送切换前的旧 current-sim(时间戳比切换完成早),
  // 在确认窗口内忽略与确认值不同的 current-sim push,避免闪回旧卡。
  const confirmedSimRef = useRef(null); // { value: number, at: number }
  // 页面实例 ID:RN 导航同时存在多个实例时,只有最新实例活跃处理 push/recovery
  const pageInstanceIdRef = useRef(0);
  // mount 初始化完成前收到的 push 暂存,初始化完成后 apply(push 比 getBootProperties 更新)
  const pendingPushRef = useRef(null);
  // watchdog 60s 超时后置 true:此后 onMessage 收到任意 current-sim push 都静默退出
  const watchdogExpiredRef = useRef(false);
  // 切卡起始墙钟(Date.now()),用于 Android JS 冻结后 resume 时判定 elapsed 是否已越过 watchdog 周期
  const switchStartedAtRef = useRef(0);
  // 切卡结束墙钟,doPoll 判定是否在冷却窗口内(SWITCH_END_GRACE_MS),窗口内 nv=null 不立即翻 offline。
  const switchEndedAtRef = useRef(0);
  // 冷却窗口内 nv=null 的失败计数,累计到 debounce 阈值才翻 offline(和主 catch 路径共用同一含义)。
  const graceNvNullFailRef = useRef(0);
  useEffect(() => { propsRef.current = propsState; }, [propsState]);
  useEffect(() => { slotIndicesRef.current = slotIndices; }, [slotIndices]);
  useEffect(() => {
    activeTabRef.current = activeTab;
    if (activeTab && activeTab !== '0') {
      MobileNetworkService.persistActiveTab(activeTab);
    }
  }, [activeTab]);
  useEffect(() => { switchingRef.current = switching; }, [switching]);
  useEffect(() => { isOnlineRef.current = isOnline; }, [isOnline]);
  // 收尾:停 LoadingToast、停看门狗、清切换态、清 pendingTarget、解飞行锁。
  // 成功/失败/超时共用,toast 由调用方决定(MIECOCM-6722:超时不弹任何 toast)。
  const stopSwitching = useCallback((nextActiveSlot) => {
    if (switchingVisualTimerRef.current) {
      clearTimeout(switchingVisualTimerRef.current);
      switchingVisualTimerRef.current = null;
    }
    if (loadingToastTimerRef.current) {
      clearTimeout(loadingToastTimerRef.current);
      loadingToastTimerRef.current = null;
    }
    if (watchdogTimerRef.current) {
      clearTimeout(watchdogTimerRef.current);
      watchdogTimerRef.current = null;
    }
    MobileNetworkService.finishSwitch();
    const active = nextActiveSlot || resolveActiveSlot(propsRef.current, slotIndicesRef.current, activeTabRef.current);
    if (active) setActiveTab(String(active));
    switchTargetRef.current = 0;
    switchingRef.current = false;
    setSwitching(false);
    setLoadingToastVisible(false);
    watchdogExpiredRef.current = false;
    switchStartedAtRef.current = 0;
    pendingPhoneOfflineRef.current = false;
    // 切换结束记录已确认卡槽,保护后续 stale bulk push:
    // listenMessage 批量补推常混带切换前的旧 current-sim / auto-switch-status,
    // 若不进 grace,会导致 push handler 又进 switching 态。
    if (active) confirmedSimRef.current = { value: active, at: Date.now() };
    // 切卡结束进入 network-info 冷却窗口:协议栈重新起来的几秒内 nv=null 走 debounce,不闪 offline。
    // 不再主动打 poll —— 立即 poll 大概率拿到 code=-704083036 触发假 offline,交给 10s 自然轮询即可。
    switchEndedAtRef.current = Date.now();
    graceNvNullFailRef.current = 0;
    consecutivePollFailRef.current = 0;
    // isOnline 重置为未定态,避免"切换前就是 offline 的旧值"延续到切换后立即渲染离线卡片。
    // 卡片走 loading 占位,等新一轮 poll 判定;窗口保护首发 nv=null 走 debounce。
    setIsOnline(null);
  }, []);
  // 切卡成功收尾:仅当 current-sim === 目标卡 时调用。toast 成功 + 收尾。
  const finalizeSuccess = useCallback((freshData) => {
    if (!switchingRef.current) return;
    const target = switchTargetRef.current;
    confirmedSimRef.current = { value: target, at: Date.now() };
    stopSwitching(target);
    Host.ui.showToast(strings.mobileCard_switchSuccess);
    loadProps(false);
  }, [stopSwitching]);
  // watchdog 冷路径(B/C)清理判定字段:保留 Tab 文案(sim{i}-type)、用户开关(auto-switch-enable)、
  // 免流量(sim{i}-free);抹掉卡片渲染所依赖的过期素材,避免后续设备恢复瞬间用 stale 字段闪蓝卡。
  // 即时 UI 不变:超时当下 isOnline=false 走 offline 灰卡,isOnline=true 走 switching 的 loading 灰卡,均不读这些字段。
  const clearSimFieldsForWatchdogColdFinish = useCallback(() => {
    setPropsState((prev) => {
      if (!prev) return prev;
      const next = { ...prev };
      delete next['current-sim'];
      delete next['sim1-exist'];
      delete next['sim2-exist'];
      delete next['sim1-iccid'];
      delete next['sim2-iccid'];
      delete next['sim1-operator'];
      delete next['sim2-operator'];
      delete next['network-info'];
      delete next['auto-switch-status'];
      return next;
    });
  }, []);
  // 60s 看门狗超时:
  //   冷路径(离线 / RPC 失败 / 字段不可用)→ 保持 switching=true,仅隐藏 LoadingToast,
  //     UI 通过 loading 卡 / offline 卡 自然过渡;watchdogExpiredRef 置 true,
  //     等设备真实 push current-sim 时由 onMessage 静默退出。
  //   热路径(拉到真实数据)→ 保持原行为,弹成功/失败 toast。
  const watchdogTimeout = useCallback(async() => {
    watchdogTimerRef.current = null;
    if (!switchingRef.current) return;
    const target = switchTargetRef.current;
    // 手机断网:RPC 不可信,冷收尾,不判成功/失败。
    if (!phoneNetworkRef.current) {
      watchdogExpiredRef.current = true;
      setLoadingToastVisible(false);
      if (loadingToastTimerRef.current) {
        clearTimeout(loadingToastTimerRef.current);
        loadingToastTimerRef.current = null;
      }
      pendingPhoneOfflineRef.current = false;
      setPhoneNetworkAvailable(false);
      clearSimFieldsForWatchdogColdFinish();
      return;
    }
    // 切卡态里轮询停,watchdog 是唯一 RPC 判定入口:探 network-info 决定 online/offline。
    // catch 或 nv=null 都视作离线,判据与主轮询对齐。
    let probeOnline = false;
    try {
      const probe = await MobileNetworkService.fetchNetworkInfo();
      const nv = probe && probe['network-info'];
      probeOnline = nv !== null && nv !== undefined;
    } catch (e) {
    }
    if (!mountedRef.current || !switchingRef.current) return;
    if (!probeOnline) {
      watchdogExpiredRef.current = true;
      setIsOnline(false);
      clearSimFieldsForWatchdogColdFinish();
      stopSwitching();
      return;
    }
    // 补探判定在线,继续走原热路径判 current-sim
    setIsOnline(true);
    const data = await MobileNetworkService.getRealtimeProperties().catch(() => null);
    if (!mountedRef.current || !switchingRef.current) return;
    if (!data || hasTemporaryUnavailableField(data, target)) {
      // 设备在线但 current-sim 字段暂不可用 → 冷收尾,不弹失败 toast(切卡还没落地)
      watchdogExpiredRef.current = true;
      pendingPhoneOfflineRef.current = false;
      clearSimFieldsForWatchdogColdFinish();
      stopSwitching();
      return;
    }
    setPropsState((prev) => ({ ...(prev || {}), ...data }));
    const current = toSlotIndex(data['current-sim']);
    // Android JS 冻结导致 setTimeout 延后 fire:切卡起始已过去远超 watchdog 周期,
    // 用户已脱离操作上下文,不管切成功与否都静默收尾,不弹任何 toast(与 push 后置 watchdogExpired 静默分支对齐)。
    const elapsed = Date.now() - (switchStartedAtRef.current || 0);
    if (switchStartedAtRef.current && elapsed > SWITCH_WATCHDOG_MS + 30000) {
      watchdogExpiredRef.current = true;
      stopSwitching(current);
      loadProps(false);
      return;
    }
    if (current === target) {
      finalizeSuccess(data);
      return;
    }
    stopSwitching(current);
    Host.ui.showToast(strings.mobileCard_switchFailed);
  }, [finalizeSuccess, stopSwitching, clearSimFieldsForWatchdogColdFinish]);
  // 切卡开始:记录目标卡 → 切换态 → LoadingToast 延迟显示 → 看门狗。
  const startSwitching = useCallback((target, delayVisual) => {
    switchTargetRef.current = target;
    switchingRef.current = true;
    watchdogExpiredRef.current = false;
    switchStartedAtRef.current = Date.now();
    // 进 switching 清冷却窗口计数:上一轮切卡的残留计数不能带到本轮,
    // 否则本轮 stopSwitching 后立即命中 graceNvNullFailRef>=2 直接翻 offline。
    switchEndedAtRef.current = 0;
    graceNvNullFailRef.current = 0;
    consecutivePollFailRef.current = 0;
    if (switchingVisualTimerRef.current) clearTimeout(switchingVisualTimerRef.current);
    const showSwitching = () => {
      switchingVisualTimerRef.current = null;
      if (mountedRef.current && switchingRef.current) setSwitching(true);
    };
    if (delayVisual) {
      switchingVisualTimerRef.current = setTimeout(showSwitching, SWITCH_VISUAL_DELAY_MS);
    } else {
      showSwitching();
    }
    if (loadingToastTimerRef.current) clearTimeout(loadingToastTimerRef.current);
    loadingToastTimerRef.current = setTimeout(() => {
      loadingToastTimerRef.current = null;
      if (mountedRef.current && switchingRef.current) {
        setLoadingToastVisible(true);
      }
    }, LOADING_TOAST_DELAY_MS);
    // 一次性看门狗:push 拉到目标(finalizeSuccess→stopSwitching)会清掉它,否则 60s 后兜底收尾
    if (watchdogTimerRef.current) clearTimeout(watchdogTimerRef.current);
    watchdogTimerRef.current = setTimeout(() => { watchdogTimeout(); }, SWITCH_WATCHDOG_MS);
  }, [watchdogTimeout]);
  // 拉取所有 spec 字段。首屏先拉关键卡片字段(realtime),避免服务端旧缓存导致先显示 SIM1 再跳 SIM2;
  // 入口若已提前拿到 boot 快照,首帧可直接渲染真实卡片,其余信号/开关字段随后后台补齐。
  const loadProps = useCallback(async(initial) => {
    try {
      const data = await (initial ? MobileNetworkService.getBootProperties() : MobileNetworkService.getRealtimeProperties());
      const indices = MobileNetworkService.getSlotIndices();
      if (!mountedRef.current) return data;
      if (indices.length) setSlotIndices(indices);
      setPropsState((prev) => {
        const merged = { ...(prev || {}), ...data };
        // Tab 同步:切换中不动 activeTab,保持切前的卡 + 加载态(MIECOCM-6721 断电期间不要预判跳 Tab)。
        // 非切换中按 current-sim / 上次 Tab 解析:首屏 current-sim 暂不可读时保持空加载态,避免默认 SIM1 后再跳 SIM2。
        if (!switchingRef.current) {
          const nextActive = resolveActiveSlot(merged, indices, activeTabRef.current);
          if (nextActive) {
            setActiveTab(String(nextActive));
          } else if (initial) {
            setActiveTab('0');
          }
        }
        return merged;
      });
      return data;
    } catch (e) {
      return null;
    }
  }, []);
  // 切回前台:切卡进行中 → 立即重拉一次(等价于提前触发一轮轮询),拉到 current-sim===目标即成功;
  // 拉到非目标值只同步 Tab,保持切换中,继续等轮询。非切换中则正常 merge 一次。
  const onResume = useCallback(async() => {
    if (switchingRef.current) {
      // Android JS 后台冻结 setTimeout 不 fire,resume 时若 elapsed 已超 60s watchdog 周期,
      // 视为切换生命周期已到期:静默同步 UI,不弹任何 toast(用户已脱离操作上下文)。
      const elapsed = Date.now() - (switchStartedAtRef.current || 0);
      if (switchStartedAtRef.current && elapsed >= SWITCH_WATCHDOG_MS) {
        if (watchdogTimerRef.current) {
          clearTimeout(watchdogTimerRef.current);
          watchdogTimerRef.current = null;
        }
        watchdogExpiredRef.current = true;
        const staleData = await MobileNetworkService.getRealtimeProperties().catch(() => null);
        if (!mountedRef.current) return;
        if (staleData) setPropsState((prev) => ({ ...(prev || {}), ...staleData }));
        const staleCurrent = staleData && toSlotIndex(staleData['current-sim']);
        stopSwitching(staleCurrent || undefined);
        loadProps(false);
        return;
      }
      // 直接尝试拉 REALTIME:传输失败/离线走 catch 返回 null,不阻塞后续 UI
      const data = await MobileNetworkService.getRealtimeProperties().catch(() => null);
      if (!data || !mountedRef.current || !switchingRef.current) return;
      setPropsState((prev) => ({ ...(prev || {}), ...data }));
      const current = toSlotIndex(data['current-sim']);
      // 切换中 activeTab 由 confirmSwitch 锁定在 target,不允许被"旧 current-sim"拉回去。
      // 只在到达 target 时通过 finalizeSuccess→stopSwitching 更新,或切换结束由 stopSwitching 兜底同步。
      if (current === switchTargetRef.current) {
        finalizeSuccess(data);
      }
      return;
    }
    loadProps(false);
  }, [loadProps, finalizeSuccess, stopSwitching]);
  // 设备 push current-sim。只有 current-sim 到达目标才判成功;
  // 未到目标的旧值 / 中间值不判失败,继续等轮询 / 看门狗。
  // 非切换中的 push 只同步选中 Tab。
  const onMessage = useCallback((delta) => {
    if (!mountReadyRef.current) {
      const buffered = {};
      Object.entries(delta || {}).forEach(([k, v]) => {
        buffered[k] = unwrapPushValue(v);
      });
      pendingPushRef.current = { ...(pendingPushRef.current || {}), ...buffered };
      return;
    }
    if (!MobileNetworkService.isActivePageInstance(pageInstanceIdRef.current)) {
      return;
    }
    const normalized = {};
    Object.entries(delta || {}).forEach(([k, v]) => {
      normalized[k] = unwrapPushValue(v);
    });
    const currentSimRaw = normalized['current-sim'];
    // 切换确认后的保护窗口:listenMessages 可能延迟批量推送切换前的旧字段(current-sim + auto-switch-status),
    // 在 10s 窗口内忽略矛盾值,防止"刚成功又被错误地拉回切换中"。
    const CONFIRMED_GRACE_MS = 10000;
    const withinGrace = confirmedSimRef.current
      && Date.now() - confirmedSimRef.current.at < CONFIRMED_GRACE_MS;
    if (currentSimRaw !== undefined && withinGrace && !switchingRef.current) {
      const { value: confirmedVal } = confirmedSimRef.current;
      const pushSim = toSlotIndex(currentSimRaw);
      if (pushSim !== confirmedVal) {
        delete normalized['current-sim'];
      }
    }
    // auto-switch-status=1 用短窗口(3s)挡 stale 批量重放:切完 stopSwitching 后 3s 内
    // listenMessages 补推的 status=1 一律 drop,避免"切完 → 消失 → 又弹一次"连弹。
    // 超过 3s 的 status=1 视为设备端 / 另一手机新一轮切卡的真实信号,放行。
    // 窗口取自 switchEndedAtRef(比 confirmedSimRef 语义更精准 —— 后者用于挡 current-sim 旧值)。
    const AUTO_SWITCH_STATUS_STALE_MS = 3000;
    const withinAutoSwitchStaleWindow = switchEndedAtRef.current
      && Date.now() - switchEndedAtRef.current < AUTO_SWITCH_STATUS_STALE_MS;
    if (normalized['auto-switch-status'] === 1 && withinAutoSwitchStaleWindow && !switchingRef.current) {
      delete normalized['auto-switch-status'];
    }
    if (confirmedSimRef.current && !withinGrace) {
      confirmedSimRef.current = null;
    }
    if (!Object.keys(normalized).length) return;
    setPropsState((prev) => ({ ...(prev || {}), ...normalized }));
    // auto-switch-status push 处理
    const switchStatus = normalized['auto-switch-status'];
    if (switchStatus !== undefined) {
      if (switchStatus === 1 && !switchingRef.current) {
        // 进 switching 必须设备在线 + 手机网络可用:避免设备离线后 listenMessages 重放
        // 手机断网时切换态弹窗依赖手机 RPC,断网时不进 switching。
        // isOnline 已改由 network-info 轮询驱动,这里不再预判设备在线态。
        // 设备离线时 subscribeMessages 仍会回放服务端缓存的最后一次状态快照(含 stale auto-switch-status=1),
        // 不能据此进入 switching,否则离线设备重进页面会先弹切换中再闪回离线。
        if (!phoneNetworkRef.current || isOnlineRef.current === false) {
        } else {
          switchingRef.current = true;
          watchdogExpiredRef.current = false;
          switchStartedAtRef.current = Date.now();
          switchEndedAtRef.current = 0;
          graceNvNullFailRef.current = 0;
          consecutivePollFailRef.current = 0;
          setSwitching(true);
          setLoadingToastVisible(true);
          if (watchdogTimerRef.current) clearTimeout(watchdogTimerRef.current);
          watchdogTimerRef.current = setTimeout(() => { watchdogTimeout(); }, SWITCH_WATCHDOG_MS);
        }
      } else if (switchStatus === 0 && switchingRef.current && !switchTargetRef.current) {
        // 设备自动切换完成(非用户发起),退出切换态并刷新
        stopSwitching();
        loadProps(false);
        return;
      } else if (switchStatus === 0 && switchingRef.current) {
        // 用户发起切卡:status=0 不参与裁判(固件可能先发 status=0、再发 current-sim,
        // 即时判定会误报失败)。成功由下面 current-sim===target 快路径判,失败由 60s watchdog 兜底。
      }
    }
    const currentSimAfterFilter = normalized['current-sim'];
    if (currentSimAfterFilter === undefined) {
      return;
    }
    const currentSim = toSlotIndex(currentSimAfterFilter);
    // 非切换中的 push 直接同步选中 Tab;切换中 activeTab 由 confirmSwitch 锁在 target,
    // 收到"仍是旧 current-sim"的中间 push 不允许把 Tab 拉回旧位置,避免 target ↔ 旧值抖动。
    // 到达 target 时通过 finalizeSuccess→stopSwitching 完成最终同步,失败/超时由 stopSwitching 兜底纠正。
    if (!switchingRef.current) {
      if (resolveActiveSlot({ ...propsRef.current, ...normalized }, slotIndicesRef.current, activeTabRef.current) === currentSim) {
        setActiveTab(String(currentSim));
      }
      return;
    }
    // watchdog 已超时:后续任意 current-sim push 都视为设备最终态,静默退出(产品共识:超时后静默)
    if (watchdogExpiredRef.current) {
      stopSwitching(currentSim);
      loadProps(false);
      return;
    }
    // 切换中:只有 current-sim 到达目标才判成功。非目标值可能是切换中旧值/中间值,
    // 不立即判失败,继续等 listenMessages / resume / watchdog 兜底。
    if (currentSim === switchTargetRef.current) {
      finalizeSuccess({ ...propsRef.current, ...normalized });
    }
  }, [finalizeSuccess, stopSwitching, loadProps, watchdogTimeout]);
  useEffect(() => {
    mountedRef.current = true;
    pageInstanceIdRef.current = MobileNetworkService.registerPageInstance();
    const myInstanceId = pageInstanceIdRef.current;
    let unsub = null;
    let resumeListener = null;
    let appearListener = null;
    let pauseListener = null;
    let disappearListener = null;
    let propChangedListener = null;
    let networkListener = null;
    (async() => {
      const pendingTarget = MobileNetworkService.getPendingTarget();
      // spec 元数据 + 属性 cache 必须先拉(无论在线/离线),否则 slotIndices=[] 导致 Tab 不渲染
      const loadData = await loadProps(true);
      if (!mountedRef.current || !MobileNetworkService.isActivePageInstance(myInstanceId)) return;
      const switchStatus = loadData && loadData['auto-switch-status'];
      const current = loadData && loadData['current-sim'];
      const currentIdx = toSlotIndex(current);
      // isOnline 完全由 network-info 轮询驱动,mount 不再基于 Device.isOnline 预判。
      // pendingTarget 一律清理:切卡不再跨页面持久化,mount 时 auto-switch-status=1 仅
      // 表示设备端"我在切"(可能是用户上次点了切但退出、也可能设备自动切换),
      // 显示 loading 直到 push status=0 或 watchdog 60s 到期。
      if (pendingTarget) {
        MobileNetworkService.finishSwitch();
      }
      if (switchStatus === 1 && phoneNetworkRef.current && isOnline !== false) {
        // MIECOCM-6967:mount 时不能只凭 auto-switch-status=1 就进 switching。
        // 上一次切卡中若设备曾掉线,用户退回直播页再进插件,设备仍上报 status=1 但实际处于离线态;
        // 若直接进 switching 会覆盖 offline 卡,产生"加载中→切换中"的错误弹窗序列。
        // 同步 await 一发 network-info:online 才进 switching,offline 保持离线卡不进 switching。
        let probeOnline = null;
        try {
          const probe = await MobileNetworkService.fetchNetworkInfo();
          if (!mountedRef.current || !MobileNetworkService.isActivePageInstance(myInstanceId)) return;
          const nv = probe && probe['network-info'];
          probeOnline = nv !== null && nv !== undefined;
        } catch (e) {
          probeOnline = false;
        }
        if (probeOnline) {
          setIsOnline(true);
          switchingRef.current = true;
          watchdogExpiredRef.current = false;
          switchStartedAtRef.current = Date.now();
          switchEndedAtRef.current = 0;
          graceNvNullFailRef.current = 0;
          consecutivePollFailRef.current = 0;
          setSwitching(true);
          setLoadingToastVisible(true);
          if (watchdogTimerRef.current) clearTimeout(watchdogTimerRef.current);
          watchdogTimerRef.current = setTimeout(() => { watchdogTimeout(); }, SWITCH_WATCHDOG_MS);
        } else {
          // 设备离线:不进 switching,直接展示离线卡。轮询继续每 10s 探测,恢复在线自然进 switching(靠 push)。
          setIsOnline(false);
        }
      } else if (switchStatus === 1) {
        // 设备在线但手机断网,切换态弹窗依赖手机 RPC,断网时不进 switching。
        // 卡片由 phoneNetworkAvailable=false 走"手机无网"分支。
      }
      // 首屏遮罩解耦 network-info 轮询:必须放在 switchStatus 分支之**后**,
      // 才能保证切卡态 mount 时 setLoadingToastVisible(true) 先执行,
      // LoadingToast 的 visible 全程保持 true,message 直接从"加载中"切"切换中",
      // 不会因 setInitialLoading(false) 先跑导致 Modal 短暂 visible=false 被吞掉切换中态。
      // 非切卡分支下 loadingToastVisible=false,这里 setInitialLoading(false) 才让 Modal 关闭。
      setInitialLoading(false);
      // 兜底:_ensureSpec 抛错或 spec 中 current-sim 无 value-list 时,slotIndices 可能仍为空。
      // MobileCardPage 仅服务 4G 摄像头双卡,硬编码 [1, 2] 保底,Tab 至少能画出来
      if (!slotIndicesRef.current.length && !MobileNetworkService.getSlotIndices().length) {
        setSlotIndices([1, 2]);
      }
      // mount 初始化完成,开放 push 处理
      mountReadyRef.current = true;
      setMountReady(true);
      // apply mount 前缓存的 push(比 getBootProperties 缓存更新鲜)
      if (pendingPushRef.current && !switchingRef.current) {
        const buffered = pendingPushRef.current;
        pendingPushRef.current = null;
        onMessage(buffered);
      } else if (pendingPushRef.current) {
        pendingPushRef.current = null;
      }
      try {
        unsub = await MobileNetworkService.subscribeMessages(onMessage);
        subRef.current = unsub;
      } catch (e) {
        // 订阅失败不阻塞页面,后台 resume 兜底刷新
      }
      resumeListener = PackageEvent.packageDidResume.addListener(() => {
        setPageFocused(true);
        onResume();
      });
      appearListener = PackageEvent.packageViewWillAppear.addListener(() => {
        setPageFocused(true);
        onResume();
      });
      // 页面被压栈 / App 切后台时置 pageFocused=false,LoadingToast Modal 不再渲染,
      // 避免"切换中弹窗跟到别的页面"。iOS 用 packageViewWillDisappearIOS,Android 借用 packageWillPause。
      pauseListener = PackageEvent.packageWillPause.addListener(() => {
        setPageFocused(false);
      });
      if (PackageEvent.packageViewWillDisappearIOS) {
        disappearListener = PackageEvent.packageViewWillDisappearIOS.addListener(() => {
          setPageFocused(false);
        });
      }
      // 诊断：监听 devicePropertyChanged 看固件是否通过此通道下发结果码
      propChangedListener = DeviceEvent.devicePropertyChanged.addListener((dev, newStatus) => {
      });
      // 手机网络状态变化:networkState 0=不可用 1=蜂窝 2=WiFi
      networkListener = HostEvent.cellPhoneNetworkStateChanged.addListener((event) => {
        const state = event && event.networkState;
        if (state === 0) {
          phoneNetworkRef.current = false;
          if (switchingRef.current) {
            // 切换态中:可见 state 推迟到 watchdog 冷收尾
            pendingPhoneOfflineRef.current = true;
          } else {
            setPhoneNetworkAvailable(false);
          }
        } else if (state === 1 || state === 2) {
          phoneNetworkRef.current = true;
          pendingPhoneOfflineRef.current = false;
          setPhoneNetworkAvailable(true);
          // 手机网络恢复,拉一次云端缓存刷新 SIM 字段;isOnline 由下次轮询 RPC 判定
          loadProps(true);
        }
      });
    })();
    return () => {
      mountedRef.current = false;
      mountReadyRef.current = false;
      // 切卡进行中退出页面 → 冷清理,不再跨页面持久化。设备端的切卡操作已发出,
      // 结果由设备自行完成;下次进页面时若 auto-switch-status 仍为 1 会重新进 loading。
      if (switchingRef.current) {
        MobileNetworkService.finishSwitch();
      }
      MobileNetworkService.unregisterPageInstance(pageInstanceIdRef.current);
      if (subRef.current && subRef.current.remove) subRef.current.remove();
      if (resumeListener && resumeListener.remove) resumeListener.remove();
      if (appearListener && appearListener.remove) appearListener.remove();
      if (pauseListener && pauseListener.remove) pauseListener.remove();
      if (disappearListener && disappearListener.remove) disappearListener.remove();
      if (propChangedListener && propChangedListener.remove) propChangedListener.remove();
      if (networkListener && networkListener.remove) networkListener.remove();
      if (switchingVisualTimerRef.current) {
        clearTimeout(switchingVisualTimerRef.current);
        switchingVisualTimerRef.current = null;
      }
      if (loadingToastTimerRef.current) {
        clearTimeout(loadingToastTimerRef.current);
        loadingToastTimerRef.current = null;
      }
      if (watchdogTimerRef.current) {
        clearTimeout(watchdogTimerRef.current);
        watchdogTimerRef.current = null;
      }
      if (networkInfoTimerRef.current) {
        clearInterval(networkInfoTimerRef.current);
        networkInfoTimerRef.current = null;
      }
    };
    // 仅在 mount 时跑一次,handler 自身从 ref 读最新值,无需放到依赖里
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // network-info 主轮询:isOnline 权威判据。
  //   nv 有值(REALTIME 拉到 code=0)→ setIsOnline(true) + merge network-info
  //   nv=null(code≠0,如 -704083036 "字段暂时不可用")→ 立即 setIsOnline(false)(设备半死)
  //   catch(传输层异常/超时)→ counter++,连续 2 次 setIsOnline(false)(网络抖动保护)
  // 启动条件:mount 完成 + 手机有网 + 非切卡中。mount 后立即打一发,之后每 NETWORK_POLL_INTERVAL_MS 一次。
  useEffect(() => {
    const canPoll = mountReady && phoneNetworkAvailable && !switching;
    if (!canPoll) {
      if (networkInfoTimerRef.current) {
        clearInterval(networkInfoTimerRef.current);
        networkInfoTimerRef.current = null;
      }
      return;
    }
    if (networkInfoTimerRef.current) return;
    const doPoll = async() => {
      try {
        const data = await MobileNetworkService.fetchNetworkInfo();
        if (!mountedRef.current) return;
        const nv = data && data['network-info'];
        if (nv === null || nv === undefined) {
          // 切卡刚结束的冷却窗口内,nv=null 走 debounce(累计到 2 次才 offline)。
          // 协议栈重注册基站的几秒内 code=-704083036 是正常现象,不能立刻翻 offline 闪一下。
          const inSwitchEndGrace = switchEndedAtRef.current
            && Date.now() - switchEndedAtRef.current < SWITCH_END_GRACE_MS;
          if (inSwitchEndGrace) {
            graceNvNullFailRef.current += 1;
            setInitialLoading(false);
            if (graceNvNullFailRef.current >= 2) {
              setIsOnline(false);
              switchEndedAtRef.current = 0;
              graceNvNullFailRef.current = 0;
            }
            return;
          }
          // 设备协议栈没给出 network-info(code≠0)→ 立即判离线,无 debounce
          consecutivePollFailRef.current = 0;
          graceNvNullFailRef.current = 0;
          setIsOnline(false);
          setInitialLoading(false);
          return;
        }
        consecutivePollFailRef.current = 0;
        graceNvNullFailRef.current = 0;
        switchEndedAtRef.current = 0;
        setIsOnline(true);
        setInitialLoading(false);
        setPropsState((prev) => ({ ...(prev || {}), 'network-info': nv }));
        // SIM 字段缺失时补拉一次(不 spin,10s 一轮)。
        // 场景:watchdog 冷收尾清了 SIM 字段 → 设备恢复后 nv 有值但 sim{i}-exist=undefined,
        // 直接落到"无流量卡"分支。这里在 isOnline 翻回 true 时把 SIM 字段拉回来。
        const cur = propsRef.current || {};
        const simFieldsMissing = cur['current-sim'] === undefined || cur['current-sim'] === null
          || cur['sim1-exist'] === undefined || cur['sim1-exist'] === null
          || cur['sim2-exist'] === undefined || cur['sim2-exist'] === null;
        if (simFieldsMissing) {
          loadProps(false);
        }
      } catch (e) {
        if (!mountedRef.current) return;
        consecutivePollFailRef.current += 1;
        if (consecutivePollFailRef.current >= 2) {
          setIsOnline(false);
          setInitialLoading(false);
        }
      }
    };
    // 立即打一发,避免首帧盲窗;后续每 NETWORK_POLL_INTERVAL_MS 一次
    pollNetworkInfoRef.current = doPoll;
    doPoll();
    networkInfoTimerRef.current = setInterval(doPoll, NETWORK_POLL_INTERVAL_MS);
  }, [mountReady, phoneNetworkAvailable, switching]);
  // 用户点 Tab。activeTab 永远跟随 props['current-sim'],不允许"提前切过去":
  // 任何切到非当前卡的分支(被拒/进确认弹窗)都把 activeTab 强制回钉到 currentSim,
  // 只有 _onMessage 收到设备 push 后才允许 activeTab 跟随 push 值跳变
  const handleTabChange = useCallback((value) => {
    const targetIdx = toSlotIndex(value);
    if (!targetIdx) return;
    const cur = propsRef.current;
    const currentSim = toSlotIndex(cur && cur['current-sim']);
    const pinBack = () => {
      const active = resolveActiveSlot(cur, slotIndicesRef.current, activeTabRef.current);
      setActiveTab(active ? String(active) : '0');
    };
    // isOnline 由 network-info 轮询驱动,离线优先判断
    if (isOnline === false) {
      Host.ui.showToast(strings.mobileCard_offlineCannotSwitch);
      pinBack();
      return;
    }
    if (!phoneNetworkRef.current) {
      Host.ui.showToast(strings.mobileCard_networkInfoCheckFailed);
      pinBack();
      return;
    }
    if (!slotIndicesRef.current.includes(currentSim) || !isSlotReady(cur, currentSim)) {
      Host.ui.showToast(strings.mobileCard_networkInfoCheckFailed);
      pinBack();
      return;
    }
    if (targetIdx === currentSim) {
      setActiveTab(String(currentSim));
      return;
    }
    if (MobileNetworkService.isSwitchInflight()) {
      Host.ui.showToast(strings.mobileCard_switching);
      pinBack();
      return;
    }
    if (isSlotEmpty(cur, targetIdx)) {
      Host.ui.showToast(strings.mobileCard_switchFailed);
      pinBack();
      return;
    }
    pinBack();
    setConfirmTarget(targetIdx);
  }, [isOnline]);
  // 切卡:发 RPC 后进入切换中。setProp code 只作诊断,最终只看 current-sim 是否到达目标;
  // push/listen/poll 任一路径拉到目标即成功,否则由看门狗兜底收尾。
  // activeTab 不在此处变更,严格由 push/poll 拉到真实 current-sim 后同步 —— 切换未成功前
  // 视觉停留在原卡的 loading 态,避免"用户看起来切成功了但其实还没落地"的错觉。
  const confirmSwitch = useCallback(async() => {
    const target = confirmTarget;
    if (!target) return;
    setConfirmTarget(0);
    startSwitching(target, true);
    try {
      const res = await MobileNetworkService.switchSim(target);
      const item = Array.isArray(res) ? res[0] : null;
      const code = item ? item.code : -1;
      if (code !== 0) {
      }
    } catch (e) {
    }
  }, [confirmTarget, startSwitching]);
  const cancelSwitch = useCallback(() => {
    setConfirmTarget(0);
  }, []);
  // LoadingToast 被物理返回键 / 点遮罩关闭。仅收起加载遮罩,不中断切卡判定:
  // 切卡状态保存在 Service 单例(_pendingTarget 跨页面),重进时恢复并补判成功/失败。
  // 不收起的话(默认 cancelable=false),LoadingToast 的 Modal 会吞掉 Android 物理返回键,
  // 导致切换中无法返回上一级(MIECOCM-6302)。
  const onLoadingDismiss = useCallback(() => {
    setLoadingToastVisible(false);
  }, []);
  const handleAutoSwitchChange = useCallback(async(val) => {
    if (isOnline === false) return;
    setPropsState((prev) => ({ ...(prev || {}), 'auto-switch-enable': val }));
    try {
      await MobileNetworkService.setAutoSwitch(val);
    } catch (e) {
      if (mountedRef.current) Host.ui.showToast(strings.mobileCard_setFailed);
    }
  }, [isOnline]);
  const { scrollHandler, titleVisible, titleOpacity, LargeTitle } = useCollapsibleTitle({ title: strings.mobileCard_title });
  const tabOptions = useMemo(() => {
    if (slotIndices.length < 2) return null;
    return slotIndices.map((idx) => {
      const type = propsState && propsState[`sim${ idx }-type`];
      const tpl = type === 1 ? strings.mobileCard_tabExternal : strings.mobileCard_tabBuiltIn;
      const label = formatString(tpl, idx);
      return { label, value: String(idx) };
    });
  }, [slotIndices, propsState]);
  // 信号数据:切换中 / 设备离线 / 手机网络不可用时都视为无数据(返回 {} → 各项显示 '--');
  // 与信号 ListItem 的 disabled 解耦 —— 手机断网只清空内容,不置灰
  const signalData = useMemo(() => {
    const dataMissing = switching || !isOnline || !phoneNetworkAvailable;
    if (dataMissing) return {};
    return parseNetworkInfo(propsState && propsState['network-info']);
  }, [switching, isOnline, phoneNetworkAvailable, propsState]);
  // —— Renderers ——
  // 卡片状态优先级(MobileCardInfo 内:loading > offline > !exist > 蓝卡):
  //   switching + isOnline=true   → "切换中"加载态(切卡瞬态不可达 / 模组未就绪,盖过 stale 蓝卡)
  //   switching + isOnline=false  → 离线卡(切卡中真断电,固件上报真实离线 → loading 让位给离线)
  //   isOnline=false              → 离线卡(设备明确掉线)
  //   isOnline=true + 字段缺失      → 加载占位卡(首屏还没拉到)
  //   字段=1                       → "无流量卡"灰卡(设备明确空槽)
  //   字段=2                       → 蓝卡(有卡)
  // 卡片优先级:loading(含手机无网) > device-offline > !exist > 蓝卡
  //   loading  = switching || isOnline===null || !phoneNetworkAvailable
  //              手机无网走 loading 灰卡(纯 -- 占位),不用"设备已离线"文案(避免误导)
  //   offline  = isOnline===false(RPC 判定设备不响应)
  //   !exist   = 设备明确空槽(existRaw===1)
  //   蓝卡     = existRaw===2
  const renderActiveCard = () => {
    const idx = parseInt(activeTab, 10) || (slotIndices.length ? slotIndices[0] : 0);
    const operator = propsState[`sim${ idx }-operator`];
    const iccid = propsState[`sim${ idx }-iccid`];
    const existRaw = propsState[`sim${ idx }-exist`];
    const simReady = propsState['current-sim'] != null
      && propsState['sim1-exist'] != null
      && propsState['sim2-exist'] != null;
    const loading = switching || isOnline === null || !phoneNetworkAvailable
      || (isOnline === true && !simReady);
    const offline = !loading && isOnline === false;
    const exist = existRaw === 2;
    const isCurrent = propsState['current-sim'] === idx;
    return (
      <MobileCardInfo
        simIndex={idx}
        operator={operator}
        iccid={iccid}
        offline={offline}
        loading={loading}
        isCurrent={isCurrent}
        exist={exist}
      />
    );
  };
  const renderSignalCard = () => {
    const signalDisabled = switching || isOnline !== true;
    return (
      <ListCard title="">
        <ListItem disabled={signalDisabled} title={strings.mobileCard_signalSnr} value={fmt(signalData.snr)} actionType="none" onPress={() => {}} />
        <ListItem disabled={signalDisabled} title={strings.mobileCard_signalRsrp} value={fmt(signalData.rsrp)} actionType="none" onPress={() => {}} />
        <ListItem disabled={signalDisabled} title={strings.mobileCard_signalRsrq} value={fmt(signalData.rsrq)} actionType="none" onPress={() => {}} />
        <ListItem disabled={signalDisabled} title={strings.mobileCard_signalBand} value={fmt(signalData.band)} actionType="none" onPress={() => {}} />
        <ListItem disabled={signalDisabled} title={strings.mobileCard_signalDownlink} value={fmt(signalData.downlinkChannel)} actionType="none" onPress={() => {}} />
      </ListCard>
    );
  };
  const renderTabsIfNeeded = () => {
    if (!tabOptions) return null;
    const displayTab = activeTab === '0' ? String(slotIndices[0]) : activeTab;
    return (
      <View style={styles.segmentedWrapper}>
        <SegmentedControls
          options={tabOptions}
          activeValue={displayTab}
          onChange={handleTabChange}
        />
      </View>
    );
  };
  // 手机网络不可用时智能切换开关显示为 false(无数据源)
  const autoSwitch = !!(propsState && propsState['auto-switch-enable']) && phoneNetworkAvailable;
  const autoSwitchDisabled = isOnline !== true;
  return (
    <View style={styles.root}>
      <SubpageLayout onScroll={scrollHandler}>
        <SubpageLayout.Background>
          <View style={[styles.bg, { backgroundColor: colorToken.surfacePageLow }]} />
        </SubpageLayout.Background>
        <SubpageLayout.Navigation>
          <NavigationBar
            title={strings.mobileCard_title}
            titleSize="large"
            collapseTitle
            titleVisible={titleVisible}
            titleOpacity={titleOpacity}
            backgroundColor={colorToken.surfacePageLow}
            left={{ key: 'back', onPress: () => navigation && navigation.goBack() }}
          />
        </SubpageLayout.Navigation>
        <SubpageLayout.Header>
          <LargeTitle />
        </SubpageLayout.Header>
        <SubpageLayout.Content>
          {renderTabsIfNeeded()}
          {renderActiveCard()}
          {renderSignalCard()}
          <ListCard title="" footer={strings.mobileCard_freeFlowFooter}>
            <ListItemWithWidget
              widgetType="switch"
              title={strings.mobileCard_autoSwitchTitle}
              subtitle={strings.mobileCard_autoSwitchSubtitle}
              checked={autoSwitch}
              disabled={autoSwitchDisabled}
              onChange={handleAutoSwitchChange}
            />
          </ListCard>
        </SubpageLayout.Content>
      </SubpageLayout>
      {/* MessageDialog / LoadingToast 是 RN Modal,放 SubpageLayout 外面避免被它的 slot 过滤掉 */}
      <LoadingToast
        visible={pageFocused && (loadingToastVisible || initialLoading)}
        message={loadingToastVisible ? strings.mobileCard_switching : strings.common_loading}
        cancelable={!initialLoading}
        onDismiss={onLoadingDismiss}
      />
      <MessageDialog
        visible={!!confirmTarget}
        title={strings.mobileCard_switchConfirmTitle}
        contentText={strings.mobileCard_switchConfirmContent}
        buttons={[
          { title: strings.cancel, callback: cancelSwitch },
          { title: strings.mobileCard_switchConfirm, type: 'primary', callback: confirmSwitch },
        ]}
        onDismiss={cancelSwitch}
      />
    </View>
  );
}
MobileCardPage.navigationOptions = { header: null };
export default MobileCardPage;
const styles = StyleSheet.create({
  root: { flex: 1 },
  bg: { flex: 1 },
  // SubpageLayout 内容默认已有 12pt 外边距;SegmentedControls 自带左右 12pt padding,
  // 这里抵消掉组件内边距,让 Tab 与下方流量卡按设计稿同宽对齐。
  segmentedWrapper: { flex: 1 },
  // 蓝/灰卡布局严格按 Figma node 24878:8241 / 24896:40902 (368×186 viewBox)
  card: { height: 186, borderRadius: 20, overflow: 'hidden' },
  // SIM N SVG 标签:Figma (24,24)
  cardSimLabel: { position: 'absolute', left: 24, top: 24 },
  // "使用中"绿/白标:Figma (300,19) 48×21
  cardInUseTag: { position: 'absolute', right: 20, top: 19, width: 48, height: 21, textAlign: 'right' },
  // 蓝卡:运营商 + ICCID 的 column 容器,贴底布局(距底 32)
  cardInfoCol: { position: 'absolute', left: 20, right: 20, bottom: 32 },
  // ICCID + 复制图标 row,gap 6
  cardIccidRow: { flexDirection: 'row', alignItems: 'center'},
  cardIccid: { marginRight: 6, flexShrink: 1 },
  copyBtn: { padding: 0 },
  // 灰卡:"无流量卡"主文案 + ICCID '--' 同样贴底布局
  cardEmptyCol: { position: 'absolute', left: 20, right: 20, bottom: 32 },
});