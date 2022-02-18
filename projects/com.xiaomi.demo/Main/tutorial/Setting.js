'use strict';

import { DeviceEvent, Service } from "miot";
import { strings, Styles } from 'miot/resources';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import DynamicColor from 'miot/ui/Style/DynamicColor';
import { CommonSetting, SETTING_KEYS } from "miot/ui/CommonSetting";
import { ListItem, ListItemWithSlider, ListItemWithSwitch } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Logger from '../Logger';
import { ToastView } from "mhui-rn/dist/components/toast";
import { AbstractDialog } from 'miot/ui/Dialog';
import ImageHeader from 'miot/ui/ImageHeader';
import { adjustSize } from 'miot/utils/sizes';
import { dynamicColor } from 'miot/ui/Style/DynamicColor';
import miotI18n from 'miot/resources/Strings';

const { first_options, second_options } = SETTING_KEYS;

export default class Setting extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.props.navigation.setParams({
      title: strings.setting
    });
    this.state = {
      sliderValue: 25,
      switchValue: false,
      showDot: [],
      toastVisible: false,
      toastText: "",
      otaAbstractDialogVisible: false
    };
    Logger.trace(this);
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.showToast('didFocus', 1000);
      }
    );
    this.didBlurListener = this.props.navigation.addListener(
      'didBlur',
      () => {
        this.showToast('didBlur', 1000);
      }
    );
    this.pinstateChangeListener = DeviceEvent.pinCodeSwitchChanged.addListener((device, switchStatus) => {
      this.showToast(`pinCodeSwitch: ${ switchStatus.isSetPinCode }`, 4000);
    });
  }

  showToast=(text, time) => {
    this.setState({
      toastVisible: true,
      toastText: text
    });
    setTimeout(() => {
      this.setState(() => {
        return { toastVisible: false };
      });
    }, time);
  }

  gotoSecretPage() {
    this.props.navigation.navigate('ServiceDemo', { title: '接口服务(Service)' });
  }
  showOtaAbstractDialog(params) {
    const { otaAbstractDialogVisible, ...rest } = params;
    this.setState({ otaAbstractDialogVisible, abstractDialogParams: rest });
  }

  preOperationFunc = () => {
    return new Promise((resolve) => {
      const params = {
        otaAbstractDialogVisible: true,
        onDismiss: () => {
          this.setState({ otaAbstractDialogVisible: false });
        },
        buttons: [{
          text: miotI18n.ok,
          callback: () => {
            this.setState({ otaAbstractDialogVisible: false });
            resolve();
          }
        }]
      };
      this.showOtaAbstractDialog(params);
    });
  }

  render() {
    // 显示部分一级菜单项
    const firstOptions = [
      first_options.FIRMWARE_UPGRADE,
      first_options.VOICE_AUTH,
      first_options.SHARE,
      first_options.BTGATEWAY,
      first_options.IFTTT,
      first_options.MEMBER_SET,
      first_options.BTGATEWAY
    ];
    // 显示部分二级菜单项
    const secondOptions = [
      // second_options.AUTO_UPGRADE,
      second_options.TIMEZONE
    ];
    // 显示固件升级二级菜单
    const extraOptions = {
      showUpgrade: true,
      // upgradePageKey: 'FirmwareUpgrade',
      // licenseUrl: require('../resources/html/license_zh.html'),
      // policyUrl: require('../resources/html/privacy_zh.html'),
      deleteDeviceMessage: 'test',
      excludeRequiredOptions: [],
      option: {
        privacyURL: require('../../Resources/raw/privacy_zh.html'),
        agreementURL: require('../../Resources/raw/license_zh.html'),
        // privacyURLForChildren: require('../../Resources/raw/privacy_zh.html'),   //如果有儿童信息保护规则的话需要传入此参数
        // privacyURLForWatch: require('../../Resources/raw/privacy_zh.html'),       //如果有手表隐私政策的话需要传入此参数
        experiencePlanURL: '',
        hideAgreement: true
      },
      syncDevice: true,
      // networkInfoConfig: -1,
      bleOtaAuthType: 5,
      preOperations: {
        [`${ first_options.FIRMWARE_UPGRADE }`]: this.preOperationFunc,
        [`${ first_options.SHARE }`]: this.preOperationFunc
      }
    };
    // 字体适配测试的extraOptions
    const fontExtraOptions = {
      showUpgrade: true,
      // upgradePageKey: 'FirmwareUpgrade',
      // licenseUrl: require('../resources/html/license_zh.html'),
      // policyUrl: require('../resources/html/privacy_zh.html'),
      deleteDeviceMessage: 'test',
      excludeRequiredOptions: [],
      option: {
        privacyURL: require('../../Resources/raw/privacy_zh.html'),
        agreementURL: require('../../Resources/raw/license_zh.html'),
        experiencePlanURL: '',
        hideAgreement: true
      },
      syncDevice: true,
      // networkInfoConfig: -1,
      bleOtaAuthType: 5
    };

    const firstCustomOption = [{
      title: '设置页自定义页面 - 可以跳转自定义设置页',
      weight: 5,
      onPress: () => {
        Service.scene.openIftttAutoPage();
      },
      showDot: true
    }];

    const secondCustomOption = [{
      title: '更多设置页自定义页面 - 可以跳转自定义设置页',
      hideArrow: true,
      onPress: () => {
        this.gotoSecretPage();
      },
      // 权重可自己调节，以便确定此项停留在设置页的位置，支持小数
      weight: 13
    }];
    const { otaAbstractDialogVisible, abstractDialogParams = {} } = this.state;

    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={[styles.blank, { borderTopWidth: 0 }]} />
          <View style={styles.featureSetting}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{strings.featureSetting}</Text>
            </View>
            <Separator style={{ marginLeft: Styles.common.padding }} />
            <ToastView
              visible={this.state.toastVisible}
              hideOnPress={true}
              animation={false}
              position={-86}
              containerStyle={{ display: 'flex', flexDirection: 'row' }}
              text={this.state.toastText}
            />
            <ListItem
              title="这是"
              showDot={true}
              onPress={() => console.log(0)}
            />
            <ListItemWithSwitch
              title="三个"
              value={this.state.switchValue}
              onValueChange={(value) => this.onValueChange(value)}
            />
            <ListItemWithSlider
              title="测试"
              showWithPercent={false}
              unit={'cal'}
              sliderProps={{ value: this.state.sliderValue }}
              onSlidingComplete={(value) => this.onSlidingComplete(value)}
              onValueChange={(value) => console.log(value)}
              showSeparator={false}
            />
          </View>
          <View style={styles.blank} />
          <CommonSetting
            navigation={this.props.navigation}
            firstOptions={firstOptions}
            showDot={this.state.showDot}
            secondOptions={secondOptions}
            extraOptions={extraOptions}
            firstCustomOptions={firstCustomOption}
            secondCustomOptions={secondCustomOption}
            commonSettingStyle={{
              itemStyle: {
                valueMaxWidth: '50%'
              }
            }}
          />
          <View style={{ height: 20 }} />

          <Text
            style={{ fontSize: 16, color: '#ab1231', marginLeft: 20, marginBottom: 10 }}
            allowFontScaling={false}
          >
            CommonSetting-大字体适配测试-字体大小固定，不会随系统字体大小改变而改变
          </Text>
          <CommonSetting
            navigation={this.props.navigation}
            firstOptions={firstOptions}
            showDot={this.state.showDot}
            secondOptions={secondOptions}
            extraOptions={fontExtraOptions}
            commonSettingStyle={{
              allowFontScaling: false,
              unlimitedHeightEnable: true,
              titleStyle: {
                fontSize: 20,
                lineHeight: 22
              },
              itemStyle: this._getItemStyle(),
              moreSettingPageStyle: {
                itemStyle: this._getItemStyle(),
                navigationBarStyle: this._getNavigationBarStyle()
              }
              ,
              deleteTextStyle: {
                fontSize: 26,
                lineHeight: 30
              }
            }}
          />
        </ScrollView>
        <AbstractDialog
          useNewTheme={true}
          title={'前置自定义操作dialog'}
          subtitle={'前置自定义操作dialog详细说明'}
          visible={otaAbstractDialogVisible}
          showSubtitle={true}
          canDismiss={true}
          dialogStyle={{
            titleStyle: {
              marginTop: adjustSize(27 * 3),
              fontSize: adjustSize(48),
              lineHeight: adjustSize(66),
              letterSpacing: 0,
              textAlign: 'center',
              fontWeight: 'bold',
              color: dynamicColor('#000', '#fff')
            },
            subTitleStyle: {
              marginTop: adjustSize(19 * 3),
              marginHorizontal: adjustSize(27 * 3),
              fontSize: adjustSize(16 * 3),
              lineHeight: adjustSize(21 * 3),
              color: dynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)')
            }
          }}
          {...abstractDialogParams}>
          <ImageHeader
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            icon={require('../../Resources/hello_raise.jpg')}
            iconStyle={{ height: adjustSize(165 * 3), width: adjustSize(152 * 3) }}
          />
        </AbstractDialog>
      </View>
    );
  }

  _getItemStyle() {
    return {
      allowFontScaling: false,
      unlimitedHeightEnable: true,
      titleStyle: {
        fontSize: 28,
        lineHeight: 32,
        marginTop: 10,
        marginBottom: 10
      },
      subtitleStyle: {
        fontSize: 24,
        lineHeight: 36
      },
      valueStyle: {
        fontSize: 22,
        lineHeight: 26
      },
      dotStyle: null,

      subtitleNumberOfLines: 2,
      valueNumberOfLines: 1
    };
  }

  _getNavigationBarStyle() {
    return {
      allowFontScaling: false,
      titleNumberOfLines: 1,
      subtitleNumberOfLines: 1,
      titleStyle: { fontSize: 28 },
      subtitleStyle: { fontSize: 22 }
    };
  }

  onValueChange(value) {
    console.log(value);
  }

  onSlidingComplete(value) {
    console.log(value);
  }

  componentDidMount() {
    // TODO: 拉取功能设置项里面的初始值，比如开关状态，slider的value
    this.setState({
      switchValue: true,
      sliderValue: 75,
      showDot: [
        // 固件升级显示小红点是自动的，依据 Device.needUpgrade, 开发者无需配置
        // first_options.FIRMWARE_UPGRADE
      ]
    });
  }

  componentWillUnmount(): void {
    this.didBlurListener && this.didBlurListener.remove();
    this.didFocusListener && this.didFocusListener.remove();
    this.pinstateChangeListener && this.pinstateChangeListener.remove();
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: Styles.common.backgroundColor,
    flex: 1
  },
  featureSetting: {
    backgroundColor: new DynamicColor('#fff', '#000')
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
    backgroundColor: new DynamicColor('#fff', '#000'),
    justifyContent: 'center',
    paddingLeft: Styles.common.padding
  },
  title: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 14
  }
});
