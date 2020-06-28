import React, { Component } from 'react';
import { StyleSheet, View, DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Device, Service, DeviceEvent, Host } from 'miot';
import { LoadingDialog } from 'miot/ui';

import Navigator from '../modules/navigator';

import Protocol from '../modules/protocol';

import ColoredBackground from '../components/coloredBackground';
import Curtain from '../components/curtain';
import OpenImage from '../components/open';
import SuspendImage from '../components/suspend';
import CloseImage from '../components/close';
import ImageButton from '../components/imageButton';
import TitledImageButton from '../components/titledImageButton';

import { DeviceID, PROTOCOLCACHEKEY, getDefinitionWithKeyFromInstance, getInstanceFromCache, getInstanceFromNet, SwitchKey, CurrentPositionKey, TargetPositionKey, ReverseKey, LocalizedString } from '../modules/consts';


const ButtonOpen = TitledImageButton(ImageButton(OpenImage));
const ButtonSuspend = TitledImageButton(ImageButton(SuspendImage));
const ButtonClose = TitledImageButton(ImageButton(CloseImage));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.initProtocol();
  }

  state = {
    visible: false,
    timerInfoTop: -1000,
    timerInfo: '',
    buttonOpenTitle: LocalizedString.buttonOpenTitle(),
    buttonSuspendTitle: LocalizedString.buttonSuspendTitle(),
    buttonCloseTitle: LocalizedString.buttonCloseTitle(),
    showDialog: false,
    dialogTimeout: 0,
    dialogTitle: ''
  };

  // 记录上次的值，滑动窗帘后，如果值没变，就不调用接口
  lastValue = 0;

  switchProp = '';
  SwitchBaseProps = null;
  currentPositionProp = '';
  CurrentPositionBaseProps = null;
  targetPositionProp = '';
  TargetPositionBaseProps = null;
  reverseProp = '';
  ReverseBaseProps = null;

  initProtocol = () => {
    Host.storage.get(PROTOCOLCACHEKEY).then((cache) => {
      if (cache) {
        return;
      }
      Host.ui.alertLegalInformationAuthorization(Protocol).then((agreed) => {
        if (agreed) {
          Host.storage.set(PROTOCOLCACHEKEY, true);
        }
      }).catch((_) => { });
    }).catch((_) => { });
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
      dialogTimeout: 300,
      dialogTitle: tip
    });
    this.timerTips && clearTimeout(this.timerTips);
    this.timerTips = setTimeout(() => {
      this.dismissTips();
    }, 300);
  }

  updateNavigationState = () => {
    this.props.navigation.setParams({
      barColor: 'white',
      hideRightButton: false// Device.isOwner ? false : true
    });
  }

  setChanging = (value) => {
    this.rafPosition && cancelAnimationFrame(this.rafPosition);
    this.refColoredBackground && this.refColoredBackground.animateTo(value);
  }

  setChanged = (value) => {
    if (!this.TargetPositionBaseProps) {
      return;
    }
    value = Math.round(value);
    // console.log(value)
    if (value === this.lastValue) {
      return;
    }
    let targetPositionProps = Object.assign({ did: DeviceID }, this.TargetPositionBaseProps, {
      value: value
    });
    this.showLoadingTips(LocalizedString.handling());
    Service.spec.setPropertiesValue([targetPositionProps]).then((_) => {
      let code = _[0].code;
      // 处理中，等推送消息
      if (code === 1) {
        return;
      }
      if (code === 0) {
        this.lastValue = value;
        this.dismissTips();
        return;
      }
      this.showFailTips(LocalizedString.failed());
    }).catch((_) => {
      this.showFailTips(LocalizedString.failed());
    });
  }

  setOpen = () => {
    if (!this.switchDef) {
      return;
    }
    let targetValue = this.switchDef['value-list'].find((v) => {
      return v.description === 'Open';
    });
    if (!targetValue) {
      return;
    }
    this.setSwitch(targetValue.value);
    this.rafPosition && cancelAnimationFrame(this.rafPosition);
    this.rafPosition = null;
  }

  setSuspend = () => {
    if (!this.switchDef) {
      return;
    }
    let targetValue = this.switchDef['value-list'].find((v) => {
      return v.description === 'Pause';
    });
    if (!targetValue) {
      return;
    }
    this.setSwitch(targetValue.value);
    this.rafPosition && cancelAnimationFrame(this.rafPosition);
    this.rafPosition = null;
  }

  setClose = () => {
    if (!this.switchDef) {
      return;
    }
    let targetValue = this.switchDef['value-list'].find((v) => {
      return v.description === 'Close';
    });
    if (!targetValue) {
      return;
    }
    this.setSwitch(targetValue.value);
    this.rafPosition && cancelAnimationFrame(this.rafPosition);
    this.rafPosition = null;
    // this.animateToPosition(0, true);
  }

  animateToPosition = (value, set) => {
    this.refColoredBackground && this.refColoredBackground.animateTo(value);
    this.refCurtain && this.refCurtain.animateTo(value);
    return;
  }

  setSwitch = (value) => {
    if (!this.SwitchBaseProps) {
      return;
    }
    let switchProps = Object.assign({ did: DeviceID }, this.SwitchBaseProps, {
      value
    });
    this.showLoadingTips(LocalizedString.handling());
    Service.spec.setPropertiesValue([switchProps]).then((_) => {
      let code = _[0].code;
      // 处理中，等推送消息
      if (code === 1) {
        return;
      }
      if (code === 0) {
        this.dismissTips();
        return;
      }
      this.showFailTips(LocalizedString.failed());
    }).catch((_) => {
      this.showFailTips(LocalizedString.failed());
    });
  }

  getCurrentPosition = () => {
    Service.spec.getPropertiesValue([Object.assign({ did: DeviceID }, this.CurrentPositionBaseProps)]).then((_) => {
      let value = _[0].value;
      if (typeof value === 'undefined' || Number.isNaN(value)) {
        return;
      }
      this.animateToPosition(value);
      this.lastValue = value;
    }).catch((_) => { });
  }

  handleReceivedMessage = (device, message) => {
    if (!message) {
      return;
    }
    this.handleReceivedPositionMessage(message);
  }

  handleReceivedPositionMessage = (message) => {
    if (!message.has(this.currentPositionProp)) {
      return;
    }
    let value = message.get(this.currentPositionProp);
    if (Array.isArray(value)) {
      value = value[0];
    }
    if (typeof value === 'undefined' || value === Math.round(this.state.value)) {
      return;
    }
    if (this.isLocked) {
      return;
    }
    this.animateToPosition(value);
  }

  lockMessage = () => {
    this.isLocked = true;
  }

  unlockMessage = () => {
    this.isLocked = false;
  }

  updateInstance = (instance) => {
    if (!instance) {
      return;
    }
    let defs = getDefinitionWithKeyFromInstance(instance, SwitchKey, CurrentPositionKey, TargetPositionKey, ReverseKey);
    let switchDef = this.switchDef = defs[SwitchKey];
    if (switchDef) {
      this.switchProp = `prop.${ switchDef.siid }.${ switchDef.piid }`;
      this.SwitchBaseProps = {
        siid: switchDef.siid,
        piid: switchDef.piid
      };
    }
    let currentPositionDef = defs[CurrentPositionKey];
    if (currentPositionDef) {
      this.currentPositionProp = `prop.${ currentPositionDef.siid }.${ currentPositionDef.piid }`;
      this.CurrentPositionBaseProps = {
        siid: currentPositionDef.siid,
        piid: currentPositionDef.piid
      };
    }
    let targetPositionDef = defs[TargetPositionKey];
    if (targetPositionDef) {
      this.targetPositionProp = `prop.${ targetPositionDef.siid }.${ targetPositionDef.piid }`;
      this.TargetPositionBaseProps = {
        siid: targetPositionDef.siid,
        piid: targetPositionDef.piid
      };
    }
    let reverseDef = defs[ReverseKey];
    if (reverseDef) {
      this.reverseProp = `prop.${ reverseDef.siid }.${ reverseDef.piid }`;
      this.ReverseBaseProps = {
        siid: reverseDef.siid,
        piid: reverseDef.piid
      };
    }
    // if(!this.ReverseBaseProps && !Device.isOwner) {
    //   this.props.navigation.setParams({
    //     hideRightButton: true
    //   });
    // }
    this.initPropsSubscription();
    this.getCurrentPosition();
  }

  initPropsSubscription = () => {
    // 状态订阅
    let props = [];
    // 开关状态不可notify，所以这里不能监听
    if (this.currentPositionProp) {
      props.push(this.currentPositionProp);
      // spec订阅接口没上，暂时用老的关键词的方式订阅
      // props.push('prop.targetPosition');
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
    getInstanceFromCache(this.updateInstance);
    getInstanceFromNet(this.updateInstance);

    this.updateNavigationState();
    Host.getPhoneScreenInfo().finally(() => {
      this.setState({
        visible: true
      });
    });

    this.firmwareChange = DeviceEventEmitter.addListener('MH_FirmwareNeedUpdateAlert', (params) => {
      if (params && params.needUpgrade) {
        this.props.navigation.setParams({
          showDot: true
        });
      }
    });

    this.refColoredBackground && this.refColoredBackground.animateTo(0);
    this.refCurtain && this.refCurtain.animateTo(0);
  }

  componentWillUnmount() {
    this.viewFocusListener && this.viewFocusListener.remove();
    this.viewAppearListener && this.viewAppearListener.remove();

    this.messageSubscription && this.messageSubscription.remove();
    this.propsSubscription && this.propsSubscription.remove();

    this.rafChanging && cancelAnimationFrame(this.rafChanging);
    this.rafPosition && cancelAnimationFrame(this.rafPosition);

    this.firmwareChange && this.firmwareChange.remove();
  }

  render() {
    let { visible, buttonOpenTitle, buttonSuspendTitle, buttonCloseTitle, showDialog, dialogTimeout, dialogTitle } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <View style={[Styles.container]}>
        <ColoredBackground ref={(r) => { this.refColoredBackground = r; }} />
        <SafeAreaView style={Styles.safearea}>
          <Navigator navigation={this.props.navigation} />
          <View style={Styles.containerInner}>
            <View style={Styles.main}>
              <Curtain ref={(r) => { this.refCurtain = r; }} onChanging={this.setChanging} onChanged={this.setChanged} ontouchstart={this.lockMessage} ontouchend={this.unlockMessage} />
            </View>
            <View style={Styles.buttons}>
              <ButtonOpen title={buttonOpenTitle} onPress={this.setOpen} />
              <ButtonSuspend title={buttonSuspendTitle} onPress={this.setSuspend} />
              <ButtonClose title={buttonCloseTitle} onPress={this.setClose} />
            </View>
          </View>
        </SafeAreaView>
        <LoadingDialog visible={showDialog} message={dialogTitle} timeout={dialogTimeout} />
      </View>
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
    width: '100%'
  },
  timerInfo: {
    position: 'absolute',
    color: '#fff',
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'MI-LANTING--GBK1-Light'
  },
  buttons: {
    width: 321,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
