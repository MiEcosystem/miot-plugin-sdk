'use strict';
import React, { Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform
} from 'react-native';

import { strings, Styles } from 'miot/resources';
import { CommonSetting, SETTING_KEYS } from "miot/ui/CommonSetting";
import { ListItemWithSwitch } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';

import Navigator from '../modules/navigator';
import Protocol from '../modules/protocol';

import { Host, Device, DeviceEvent, Service } from "miot";
import { LoadingDialog } from 'miot/ui';
import { RkSwitch } from 'react-native-ui-kitten';

import { LocalizedString, REVERSECACHEKEY, ReverseKey, DeviceID, getInstanceFromCache, getInstanceFromNet, getDefinitionWithKeyFromInstance } from '../modules/consts';

const isIos = Platform.OS === 'ios';
const { first_options, second_options } = SETTING_KEYS;

export default class Setting extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Navigator navigation={navigation} />
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      motorReverse: false,
      supportReverse: false,
      showDialog: false,
      dialogTimeout: 0,
      dialogTitle: ''
    };
  }

  reverseProp = '';
  ReverseBaseProps = null;

  updateInstance = (instance) => {
    // console.log(instance)
    if (!instance) {
      return;
    }
    let defs = getDefinitionWithKeyFromInstance(instance, ReverseKey);
    let reverseDef = defs[ReverseKey];
    if (reverseDef) {
      this.reverseProp = `prop.${ reverseDef.siid }.${ reverseDef.piid }`;
      this.ReverseBaseProps = {
        siid: reverseDef.siid,
        piid: reverseDef.piid
      };
    }
    this.initPropsSubscription();
    this.getMotorReverse();

    if (reverseDef) {
      this.setState({
        supportReverse: true
      });
    }
  }

  initPropsSubscription = () => {
    // 状态订阅
    let props = [];
    if (this.reverseProp) {
      props.push(this.reverseProp);
    }
    if (!props.length) {
      return;
    }
    this.messageSubscription = DeviceEvent.deviceReceivedMessages.addListener(this.handleReceivedMessage);
    Device.getDeviceWifi().subscribeMessages(...props).then((subscription) => {
      this.propsSubscription = subscription;
    }).catch((err) => {
    });
  }

  getMotorReverse = () => {
    if (!this.ReverseBaseProps) {
      return;
    }
    Host.storage.get(REVERSECACHEKEY).then((value) => {
      // console.log(value);
      if (typeof value === 'undefined') {
        value = false;
      } else if (value === '') {
        value = false;
      } else if (typeof value === 'string') {
        value = JSON.parse(value);
      }
      this.setState({
        motorReverse: !!value
      });
    }).catch((_) => { });
    Service.spec.getPropertiesValue([Object.assign({ did: DeviceID }, this.ReverseBaseProps)]).then((_) => {
      let value = _[0].value;
      this.setState({
        motorReverse: value
      });
      Host.storage.set(REVERSECACHEKEY, value, {
        // 缓存30天
        expire: 3600 * 24 * 30
      });
    }).catch((_) => { });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      hideRightButton: true
    });

    // 获取设备实例
    getInstanceFromCache(this.updateInstance);
  }

  componentWillUnmount() {
    this.messageSubscription && this.messageSubscription.remove();
    this.propsSubscription && this.propsSubscription.remove();
  }

  render() {
    let { motorReverse, supportReverse, showDialog, dialogTimeout, dialogTitle } = this.state;
    // 显示部分一级菜单项
    const firstOptions = [
      first_options.SHARE,
      first_options.IFTTT,
      first_options.FIRMWARE_UPGRADE
    ];
    // 显示部分二级菜单项
    const secondOptions = [
      second_options.TIMEZONE
    ];
    // 显示固件升级二级菜单
    const extraOptions = {
      option: Protocol,
      showUpgrade: true
    };

    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          {supportReverse ? (
            <Fragment>
              <View style={[styles.blank, { borderTopWidth: 0 }]} />
              <View style={styles.featureSetting}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{strings.featureSetting}</Text>
                </View>
                <Separator style={{ marginLeft: Styles.common.padding }} />
                <ListItemWithSwitch
                  title={LocalizedString.motorReverse()}
                  value={motorReverse}
                  onValueChange={this.setMotorReverse}
                />
              </View>
            </Fragment>
          ) : null}

          <View style={styles.blank} />
          <CommonSetting
            navigation={this.props.navigation}
            firstOptions={firstOptions}
            showDot={this.state.showDot}
            secondOptions={secondOptions}
            extraOptions={extraOptions}
          />
          <View style={{ height: 20 }} />
        </ScrollView>
        <LoadingDialog visible={showDialog} message={dialogTitle} timeout={dialogTimeout} />
      </View>
    );
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

  setMotorReverse = (value) => {
    if (!this.ReverseBaseProps) {
      return;
    }
    let reverseProps = Object.assign({ did: Device.deviceID }, this.ReverseBaseProps, {
      value
    });
    this.showLoadingTips(LocalizedString.handling());
    Service.spec.setPropertiesValue([reverseProps]).then((_) => {
      let code = _[0].code;
      if (code === 1) {
        return;
      }
      if (code === 0) {
        this.setState({
          motorReverse: value
        });
        this.dismissTips();
        return;
      }
      this.showFailTips(LocalizedString.failed());
    }).catch((_) => {
      this.showFailTips(LocalizedString.failed());
    });
  }

  handleReceivedMessage = (device, message) => {
    // console.log(message);
    if (!message) {
      return;
    }
    this.handleReceivedMotorReverseMessage(message);
  }

  handleReceivedMotorReverseMessage = (message) => {
    if (!message.has(this.reverseProp)) {
      return;
    }
    let value = message.get(this.reverseProp);
    if (Array.isArray(value)) {
      value = value[0];
    }
    if (typeof value === 'undefined') {
      return;
    }
    this.setState({
      motorReverse: value
    });
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.common.backgroundColor,
    flex: 1
  },
  featureSetting: {
    backgroundColor: '#fff'
  },
  blank: {
    height: 8,
    backgroundColor: Styles.common.backgroundColor,
    borderTopColor: Styles.common.hairlineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Styles.common.hairlineColor,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  titleContainer: {
    height: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: Styles.common.padding
  },
  title: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 14
  }
});
