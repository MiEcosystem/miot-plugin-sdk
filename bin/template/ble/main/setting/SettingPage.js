import React from 'react';
import { Service, Device } from 'miot';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { CommonSetting, SETTING_KEYS } from "miot/ui/CommonSetting";
import Separator from 'miot/ui/Separator';
import { strings as SdkStrings, Styles as SdkStyles } from "miot/resources";
import { ListItem } from "miot/ui/ListItem";
import PluginStrings from '../../resources/strings';

export default class SettingPage extends React.Component {

  constructor(props) {
    super(props);
  }

  initCommonSettingParams() {
    this.commonSettingParams = {
      firstOptions: [
        SETTING_KEYS.first_options.SHARE,
        SETTING_KEYS.first_options.IFTTT,
        SETTING_KEYS.first_options.FIRMWARE_UPGRADE,
        SETTING_KEYS.first_options.MORE
      ],
      secondOptions: [
        SETTING_KEYS.second_options.TIMEZONE,
        SETTING_KEYS.second_options.SECURITY
      ],
      extraOptions: {
        option: "",
        showUpgrade: true, // 跳转到 sdk 提供的固件升级页面
        bleOtaAuthType: 1 // 蓝牙设备类型, 有哪些取值可以参考CommonSetting 注释
      }
    };
  }

  UNSAFE_componentWillMount() {
    this.initCommonSettingParams();
  }

  render() {

    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >

          <View style={{ backgroundColor: '#ffffff', height: 32, justifyContent: 'center', paddingLeft: SdkStyles.common.padding }}>
            <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', lineHeight: 14 }}>{SdkStrings.featureSetting}</Text>
          </View>

          <View style={{ backgroundColor: '#ffffff' }}>
            <Separator style={{ marginLeft: SdkStyles.common.padding }} />
          </View>

          <ListItem
            title={PluginStrings.selfDefineScene}
            onPress={() => {
              this.props.navigation.navigate('ScenePage', { title: PluginStrings.selfDefineScene });
            }}
          />
          <ListItem
            title={PluginStrings.timeSetting}
            onPress={() => {
              this.openTimerSettingPageWithOptions();
            }}
          />
          <ListItem
            title={PluginStrings.countDownTime}
            onPress={() => {
              this.openCountDownPage();
            }}
          />
          <View style={{ height: 8 }}/>

          <CommonSetting
            navigation={this.props.navigation}
            firstOptions={this.commonSettingParams.firstOptions}
            secondOptions={this.commonSettingParams.secondOptions}
            extraOptions={this.commonSettingParams.extraOptions}
          />
        </ScrollView>

      </View>
    );
  }

  /**
   * 这里的示例使用在profile设备，如果是spec设备
   * onMethod,offParam应该为set_properties
   * onParam,offParam应该为[{did:xxx,siid:x,piid:x,value:xx}]，就是Service.spec.setPropertiesValue方法的传参
   */
  openTimerSettingPageWithOptions() {
    let params = {
      onMethod: "power_on", // set_properties
      onParam: "on", // [{did:Device.deviceID, siid:3, piid:2, value:true}]
      offMethod: "power_off", // // set_properties
      offParam: "off", // [{did:Device.deviceID, siid:3, piid:2, value:false}]
      timerTitle: "这是一个自定义标题",
      displayName: "自定义场景名称",
      identify: "identify_1",
      onTimerTips: '',
      offTimerTips: '定时列表页面、设置时间页面 关闭时间副标题（默认：关闭时间）',
      listTimerTips: '定时列表页面 定时时间段副标题（默认：开启时段）',
      bothTimerMustBeSet: false,
      showOnTimerType: true,
      showOffTimerType: false,
      showPeriodTimerType: false
    };
    Service.scene.openTimerSettingPageWithOptions(params);
  }

  openCountDownPage() {
    let params = {
      onMethod: "power_on",
      offMethod: 'power_off',
      onParam: 'on',
      offParam: 'off',
      identify: "custom",
      displayName: '自定义名称'
    };
    Service.scene.openCountDownPage(true, params);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SdkStyles.common.backgroundColor,
    flex: 1
  }
});

