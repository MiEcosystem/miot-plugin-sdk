'use strict';
import { Device } from 'miot';
import { DeviceEvent } from 'miot/Device';
import Host from 'miot/Host';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { strings, Styles } from '../../resources';
import ListItem from '../ListItem/ListItem';
import Separator from '../Separator';
import { secondAllOptions, SETTING_KEYS } from "./CommonSetting";
const { second_options } = SETTING_KEYS;
/**
 * @export
 * @author Geeook
 * @since 10004
 * @module MoreSetting
 * @description 二级菜单页面——更多设置
 * @property {array} secondOptions - 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 */
export default class MoreSetting extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type='dark'
          title={strings.more}
          style={{ backgroundColor: '#fff' }}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };
  getMoreSetting(state) {
    return {
      [secondAllOptions.SECURITY]: {
        title: strings.security,
        onPress: _ => Host.ui.openSecuritySetting()
      },
      [secondAllOptions.FEEDBACK]: {
        title: strings.feedback,
        onPress: _ => Host.ui.openFeedbackInput()
      },
      [secondAllOptions.TIMEZONE]: {
        title: strings.timezone,
        value: state.timeZone,
        onPress: _ => Host.ui.openDeviceTimeZoneSettingPage()
      },
      [secondAllOptions.ADD_TO_DESKTOP]: {
        title: strings.addToDesktop,
        onPress: _ => Host.ui.openAddToDesktopPage()
      }
    }
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      timeZone: Device.timeZone // 从未设置过时区的话，为空字符串
    }
    this.secondOptions = this.props.navigation.state.params.secondOptions || [secondAllOptions.TIMEZONE];
    this.moreSetting = this.getMoreSetting(this.state);
  }
  componentWillMount() {
    this._deviceTimeZoneChangedListener = DeviceEvent.deviceTimeZoneChanged.addListener((device) => {
      this.state.timeZone = device.timeZone;
      this.moreSetting = this.getMoreSetting(this.state);
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this._deviceTimeZoneChangedListener.remove();
  }
  render() {
    const requireKeys1 = [secondAllOptions.SECURITY, secondAllOptions.FEEDBACK];
    const requireKeys2 = [secondAllOptions.ADD_TO_DESKTOP];
    let options = this.secondOptions.filter(key => key && Object.values(second_options).includes(key)); // 去掉杂质
    options = [...new Set(options)]; // 去除重复
    const keys = [...requireKeys1, ...options, ...requireKeys2];
    const items = keys.map(key => this.moreSetting[key]).filter(item => item);
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={[styles.blank, { borderTopWidth: 0 }]} />
          {
            items.map((item, index) => {
              const showSeparator = index !== items.length - 1;
              return (
                <ListItem
                  key={item.title + index}
                  title={item.title || ''}
                  value={item.value}
                  onPress={item.onPress}
                  showSeparator={showSeparator}
                />
              )
            })
          }
          <Separator />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.common.backgroundColor,
    flex: 1,
  },
  blank: {
    height: 8,
    backgroundColor: Styles.common.backgroundColor,
    borderTopColor: Styles.common.hairlineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Styles.common.hairlineColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});