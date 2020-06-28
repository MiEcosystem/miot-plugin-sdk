import React, { Component } from 'react';
import { StyleSheet, View, Animated, DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Device, DeviceEvent, Service, PackageEvent, Host } from 'miot';
import { LoadingDialog } from 'miot/ui';

import Navigator from '../modules/navigator';
import Protocol from '../modules/protocol';
import { LocalizedString, PROTOCOLCACHEKEY, DeviceID, getDefinitionWithKeyFromInstance, getInstanceFromCache, getInstanceFromNet, SwitchKey, formatTimerTime, fixNum } from '../modules/consts';

import DeviceImage from '../components/device';
import TimingImage from '../components/timing';
import SwitchImage from '../components/switch';
import CountdownImage from '../components/countdown';
import ImageButton from '../components/imageButton';
import TitledImageButton from '../components/titledImageButton';

const ButtonedDevice = ImageButton(DeviceImage);
const TitledTiming = TitledImageButton(ImageButton(TimingImage));
const TitledSwitch = TitledImageButton(ImageButton(SwitchImage));
const TitledCountdown = TitledImageButton(ImageButton(CountdownImage));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.initProtocol();
  }

  state = {
    on: false,
    timerInfo: '',
    containerBackgroundColor: new Animated.Value(0),
    timingTitle: LocalizedString.setTime(),
    timingActive: false,
    switchTitle: LocalizedString.switch(),
    countdownTitle: LocalizedString.timer(),
    countdownActive: false
  };

  switchProp = '';
  SwitchBaseProps = null;

  initProtocol = () => {
    Host.storage.get(PROTOCOLCACHEKEY).then((cache) => {
      if (cache) {
        return;
      }
      Host.ui.alertLegalInformationAuthorization(Protocol).then((agreed) => {
        if (agreed) {
          Host.storage.set(PROTOCOLCACHEKEY, true);
        }
      }).catch((_) => {});
    }).catch((_) => {});
  }

  showLoadingTips = (tip) => {
    return;
  }

  dismissTips = () => {
    this.timerTips && clearTimeout(this.timerTips);
    setTimeout(() => {
      this.setState({
        showDialog: false,
        dialogTimeout: 0,
        dialogTitle: ''
      });
    }, 300);
  }

  showFailTips = (tip) => {
    this.setState({
      showDialog: true,
      dialogTimeout: 3000,
      dialogTitle: tip
    });
    this.timerTips && clearTimeout(this.timerTips);
    this.timerTips = setTimeout(() => {
      this.dismissTips();
    }, 3000);
  }

  setHandling = (start, end) => {
    this.isHandling = true;
    this.stateAnimation && this.stateAnimation.stop();
    this.stateAnimation = Animated.timing(this.state.containerBackgroundColor, {
      toValue: end,
      duration: 300
    });
    this.state.containerBackgroundColor.setValue(start);
    this.stateAnimation.start((e) => {
      if (e.finished) {
        this.setHandling(end, start);
      }
    });
  }

  setHandled = (on) => {
    this.stateAnimation && this.stateAnimation.stop();
    this.stateAnimation = Animated.timing(this.state.containerBackgroundColor, {
      toValue: on ? 1 : 0,
      duration: 1000
    });
    this.stateAnimation.start(() => {
      this.isHandling = false;
      this.setState({
        on,
        isHandling: false
      });
      this.updateTimerState();
      this.updateNavigationState();
    });
  }

  changeState = (on) => {
    this.setState({
      on
    });
    this.updateTimerState();
    this.updateNavigationState();
    this.stateAnimation && this.stateAnimation.stop();
    this.stateAnimation = Animated.timing(this.state.containerBackgroundColor, {
      toValue: on ? 1 : 0,
      duration: 1000
    });
    this.stateAnimation.start();
  }

  switch = (fn) => {
    if (!this.SwitchBaseProps) {
      return;
    }
    // 防止高频提交
    if (this.isHandling) {
      return;
    }
    this.setState({
      isHandling: true
    });
    let on = !this.state.on;
    let switchProps = Object.assign({}, this.SwitchBaseProps, {
      value: on
    });
    this.setHandling(on ? 0 : 0.5, on ? 0.5 : 1);
    // this.showLoadingTips(LocalizedString.handling());
    Service.spec.setPropertiesValue([Object.assign({ did: DeviceID }, switchProps)]).then((_) => {
      let code = _[0].code;
      // 处理中，等推送消息
      if (code === 1) {
        return;
      }
      if (code === 0) {
        this.setHandled(on);
        this.dismissTips();
        return;
      }
      this.setHandled(!on);
      this.showFailTips(LocalizedString.failed());
    }).catch((_) => {
      this.setHandled(!on);
      this.showFailTips(LocalizedString.failed());
    });
  }

  getSwtichState = (cb) => {
    if (!this.SwitchBaseProps) {
      return;
    }
    Service.spec.getPropertiesValue([Object.assign({ did: DeviceID }, this.SwitchBaseProps)]).then((_) => {
      let res = _[0];
      let code = res.code;
      if (code === 0) {
        this.changeState(_[0].value);
      }

      if (typeof cb === 'function') {
        cb(_);
      }
    }).catch((_) => {});
  }

  updateNavigationState = () => {
    this.props.navigation.setParams({
      barColor: this.state.on ? 'white' : 'black'
    });
  }

  getTimerList = () => {
    Service.scene.loadTimerScenes(DeviceID, {
      identify: DeviceID
    }).then((_) => {
      this.timers = _;
      this.startUpdateTimerState();
    }).catch((_) => {});
  }

  startUpdateTimerState = () => {
    this.updateTimerState();
    this.intervalTimerState && clearInterval(this.intervalTimerState);
    this.intervalTimerState = setInterval(() => {
      this.updateTimerState();
    }, 2e3);
  }

  updateTimerState = () => {
    function getTimerInfo(scene, on) {
      if (!scene) {
        return '';
      }
      let time = scene.time;
      if (scene.timer.setting.timer_type !== '1') {
        return (on ? LocalizedString.timingTipOff : LocalizedString.timingTipOn)(`${ fixNum(time.getHours()) }:${ fixNum(time.getMinutes()) }`);
      }
      let diffMinutes = Math.ceil((time.getTime() - Date.now()) / 1000 / 60);
      let hours = Math.floor(diffMinutes / 60);
      let minutes = diffMinutes - hours * 60;
      return (on ? LocalizedString.countdownTipOff : LocalizedString.countdownTipOn)(hours, minutes);
    }
    let _ = this.timers || [];
    let on = this.state.on;
    let now = new Date();
    let timingScenes = _.filter((item) => {
      return item.setting.enable_timer === '1' && item.setting.timer_type !== '1' && item.status === 0;
    }).map((item) => {
      return {
        timer: item,
        sceneID: item.sceneID,
        time: formatTimerTime(item.setting[on ? 'off_time' : 'on_time'])
      };
    }).filter((item) => {
      return item.time > now;
    });

    let hasTiming = timingScenes.length > 0;

    let countdownScenes = _.filter((item) => {
      // 通过timer_type===1，过滤倒计时
      if (item.setting.enable_timer === '1'
        && (item.setting.timer_type === '1')
        && (item.status === 0)
        && ((item.setting.enable_timer_off === '1' && on)
          || (item.setting.enable_timer_on === '1' && !on))
      ) {
        return true;
      } else {
        return false;
      }
    }).map((item) => {
      return {
        timer: item,
        sceneID: item.sceneID,
        time: formatTimerTime(item.setting[on ? 'off_time' : 'on_time'])
      };
    }).filter((item) => {
      return item.time > now;
    });

    let hasCountdown = countdownScenes.length > 0;

    if (hasCountdown) {
      let recentTimer = countdownScenes.sort((a, b) => {
        return a.time > b.time ? 1 : -1;
      })[0];
      this.firstCountdownTimer = recentTimer;
    } else {
      this.firstCountdownTimer = null;
    }

    let lastScene = (!hasTiming && !hasCountdown) ? null : [...timingScenes, ...countdownScenes].sort((a, b) => {
      return a.time > b.time ? 1 : -1;
    })[0];

    let timerInfo = !lastScene ? '' : getTimerInfo(lastScene, on);
    this.setState({
      timingActive: hasTiming,
      countdownActive: hasCountdown,
      timerInfo
    });
  }

  setTiming = () => {
    if (!this.SwitchBaseProps) {
      return;
    }
    let switchOnProps = Object.assign({}, this.SwitchBaseProps, {
      value: true,
      did: DeviceID
    });
    let switchOffProps = Object.assign({}, this.SwitchBaseProps, {
      value: false,
      did: DeviceID
    });
    Host.ui.openTimerSettingPageWithVariousTypeParams('set_properties', [switchOnProps], 'set_properties', [switchOffProps]);
  }

  setCountdown = () => {
    if (!this.SwitchBaseProps) {
      return;
    }
    let now = new Date();
    let firstCountdownTimer = this.firstCountdownTimer;
    let firstCountdownTime = (this.firstCountdownTimer && this.firstCountdownTimer.time > now) ? this.firstCountdownTimer.time : now;
    let onParam = Object.assign({}, this.SwitchBaseProps, {
      value: true,
      did: DeviceID
    });
    let offParam = Object.assign({}, this.SwitchBaseProps, {
      value: false,
      did: DeviceID
    });

    Service.scene.openCountDownPage(!!this.state.on, {
      onMethod: 'set_properties',
      onParam: [onParam],
      offMethod: 'set_properties',
      offParam: [offParam]
    });
  }

  handleReceivedMessage = (device, message) => {
    if (!message) {
      return;
    }
    this.handleReceivedSwitchMessage(message);
  }

  handleReceivedSwitchMessage = (message) => {
    if (!this.switchProp) {
      return;
    }
    if (!message.has(this.switchProp)) {
      return;
    }
    let value = message.get(this.switchProp);
    if (Array.isArray(value)) {
      value = value[0];
    }
    if (typeof value === 'undefined') {
      return;
    }
    this.changeState(value);
  }

  updateInstance = (instance) => {
    if (!instance) {
      return;
    }
    let defs = getDefinitionWithKeyFromInstance(instance, SwitchKey);
    let switchDef = defs[SwitchKey];
    if (switchDef) {
      this.switchProp = `prop.${ switchDef.siid }.${ switchDef.piid }`;
      this.SwitchBaseProps = {
        siid: switchDef.siid,
        piid: switchDef.piid
      };
    }
    this.initPropsSubscription();
    this.getSwtichState();
  }

  initPropsSubscription = () => {
    // 状态订阅
    let props = [];
    if (this.switchProp) {
      props.push(this.switchProp);
    }
    if (!props.length) {
      return;
    }
    this.messageSubscription = DeviceEvent.deviceReceivedMessages.addListener(this.handleReceivedMessage);
    Device.getDeviceWifi().subscribeMessages(...props).then((subscription) => {
      this.propsSubscription = subscription;
    }).catch((err) => {
      // console.log(err);
    });
  }

  componentDidMount() {
    // 从其他rn页面返回
    this.viewFocusListener && this.viewFocusListener.remove();
    this.viewFocusListener = this.props.navigation.addListener('didFocus', (_) => {
      this.getSwtichState(this.getTimerList);
    });

    // 从原生页面返回
    this.viewAppearListener && this.viewAppearListener.remove();
    this.viewAppearListener = PackageEvent.packageViewWillAppear.addListener((_) => {
      this.getSwtichState(this.getTimerList);
    });

    getInstanceFromCache(this.updateInstance);
    getInstanceFromNet(this.updateInstance);

    this.updateNavigationState();

    this.firmwareChange = DeviceEventEmitter.addListener('MH_FirmwareNeedUpdateAlert', (params) => {
      if (params && params.needUpgrade) {
        this.props.navigation.setParams({
          showDot: true
        });
      }
    });
  }

  componentWillUnmount() {
    this.viewFocusListener && this.viewFocusListener.remove();
    this.viewAppearListener && this.viewAppearListener.remove();

    this.messageSubscription && this.messageSubscription.remove();
    this.propsSubscription && this.propsSubscription.remove();

    this.intervalTimerState && clearInterval(this.intervalTimerState);

    this.firmwareChange && this.firmwareChange.remove();
  }

  render() {
    let { on, timerInfo, timingTitle, timingActive, countdownTitle, countdownActive, switchTitle, containerBackgroundColor, showDialog, dialogTimeout, dialogTitle } = this.state;
    let deviceTitle = timerInfo || (on ? LocalizedString.powerOn() : LocalizedString.powerOff());
    // console.log(this.isHandling);
    return (
      <Animated.View style={[Styles.container, { backgroundColor: containerBackgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#FAFAFA', '#5B64F1']
      }) }]}>
        <SafeAreaView style={Styles.safearea}>
          <Navigator navigation={this.props.navigation} />
          <View style={Styles.containerInner}>
            <View style={Styles.main}>
              <ButtonedDevice on={on} disabled={!!this.isHandling} title={deviceTitle} onPress={this.switch} />
            </View>
            <View style={[Styles.buttons, Device.isOwner ? null : {
              justifyContent: 'center'
            }]}>
              {Device.isOwner ? (
                <TitledTiming on={on} disabled={!!this.isHandling} active={timingActive} title={timingTitle} onPress={this.setTiming} />
              ) : null}
              <TitledSwitch on={on} disabled={!!this.isHandling} title={switchTitle} onPress={this.switch} />
              {Device.isOwner ? (
                <TitledCountdown on={on} disabled={!!this.isHandling} active={countdownActive} title={countdownTitle} onPress={this.setCountdown} />
              ) : null}
            </View>
          </View>
        </SafeAreaView>
        <LoadingDialog visible={showDialog} message={dialogTitle} timeout={dialogTimeout} />
      </Animated.View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  safearea: {
    flex: 1,
    width: '100%'
  },
  containerInner: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 40
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  },
  buttons: {
    width: 321,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
