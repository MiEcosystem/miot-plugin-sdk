

import { Host, Device } from 'miot';
import { strings, Styles } from 'miot/resources';
import { CommonSetting, SETTING_KEYS } from 'miot/ui/CommonSetting';
import { ListItem, ListItemWithSlider, ListItemWithSwitch } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import {
  ScrollView, StyleSheet, Text, View
} from 'react-native';

export default class Setting extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    header:
  <TitleBar
    type="dark"
    title={strings.setting}
    style={{ backgroundColor: '#fff' }}
    onPressLeft={_ => navigation.goBack()}
  />
  });

  constructor(props, context) {
    super(props, context);
    this.state = {
      sliderValue: 25,
      switchValue: false
    };
  }

  editOrCreateLightGroup() {
    Host.ui.openAddDeviceGroupPage();
  }

  render() {
    const { first_options, second_options } = SETTING_KEYS;
    // 显示部分一级菜单项
    const firstOptions = [
      first_options.SHARE,
      first_options.IFTTT,
      first_options.VOICE_AUTH,
      first_options.FIRMWARE_UPGRADE
    ];
    // 显示部分二级菜单项
    const secondOptions = [
      // second_options.AUTO_UPGRADE,
      // second_options.TIMEZONE,
    ];
    // 显示固件升级二级菜单
    const extraOptions = {
      showUpgrade: true,
      // upgradePageKey: 'FirmwareUpgrade',
      // licenseUrl: require('../resources/html/license_zh.html'),
      // policyUrl: require('../resources/html/privacy_zh.html'),
      deleteDeviceMessage: '真的要删除？你不再考虑考虑？'
    };
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.blank, { borderTopWidth: 0 }]} />
          <View style={styles.featureSetting}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{strings.featureSetting}</Text>
            </View>
            <Separator style={{ marginLeft: Styles.common.padding }} />
            <ListItem
              title="创建/编辑灯组"
              onPress={_ => this.editOrCreateLightGroup()}
            />
            <ListItemWithSwitch
              title="三个"
              value={this.state.switchValue}
              onValueChange={value => this.onValueChange(value)}
            />
            <ListItemWithSlider
              title="测试"
              sliderProps={{ value: this.state.sliderValue }}
              onSlidingComplete={value => this.onSlidingComplete(value)}
              showSeparator={false}
            />
          </View>
          <View style={styles.blank} />
          <CommonSetting
            navigation={this.props.navigation}
            firstOptions={firstOptions}
            // secondOptions={secondOptions}
            extraOptions={extraOptions}
          />
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    );
  }

  onValueChange(value) {
    console.log(value);
  }

  onSlidingComplete(value) {
    console.log(value);
  }

  componentDidMount() {
    // TODO: 拉取功能设置项里面的初始值，比如开关状态，slider的value
    setTimeout(_ => this.setState({ switchValue: true, sliderValue: 75 }), 1000);
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.common.backgroundColor,
    flex: 1
  },
  featureSetting: { backgroundColor: '#fff' },
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
