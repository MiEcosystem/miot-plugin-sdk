'use strict';
import Host from 'miot/Host';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { strings, Styles } from '../../resources';
import { ListItem, ListItemWithSwitch } from '../ListItem';
import Separator from '../Separator';
import { secondAllOptions, SETTING_KEYS } from "./CommonSetting";
const { second_options } = SETTING_KEYS;
const ListItemType = {
  LIST_ITEM: 'ListItem',
  LIST_ITEM_WITH_SWITCH: 'ListItemWithSwitch',
  LIST_ITEM_WITH_SLIDER: 'ListItemWithSlider',
}
/**
 * @export
 * @author Geeook
 * @since 10004
 * @module FirmwareUpgrade
 * @description 二级菜单页面——固件升级
 * @property {array} secondOptions - 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 */
export default class FirmwareUpgrade extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type='dark'
          title={strings.firmwareUpgrade}
          style={{ backgroundColor: '#fff' }}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };
  firmwareSetting = {
    [secondAllOptions.AUTO_UPGRADE]: {
      type: ListItemType.LIST_ITEM_WITH_SWITCH,
      title: strings.autoUpgrade,
      value: true,
      onValueChange: _ => console.warn('固件自动升级接口暂不支持')
    },
    [secondAllOptions.CHECK_UPGRADE]: {
      type: ListItemType.LIST_ITEM,
      title: strings.checkUpgrade,
      onPress: _ => Host.ui.openDeviceUpgradePage()
    },
  }
  constructor(props, context) {
    super(props, context);
    this.secondOptions = this.props.navigation.state.params.secondOptions || [secondAllOptions.AUTO_UPGRADE];
  }
  renderList(items) {
    return items.map((item, index) => {
      const showSeparator = index !== items.length - 1;
      switch (item.type) {
        case ListItemType.LIST_ITEM:
          return (
            <ListItem
              key={item.title + index}
              title={item.title || ''}
              value={item.value}
              onPress={item.onPress}
              showSeparator={showSeparator}
            />
          )
        case ListItemType.LIST_ITEM_WITH_SWITCH:
          return (
            <ListItemWithSwitch
              key={item.title + index}
              title={item.title || ''}
              value={item.value}
              onValueChange={item.onValueChange}
              showSeparator={showSeparator}
            />
          )
      }
    })
  }
  render() {
    const requireKeys2 = [secondAllOptions.CHECK_UPGRADE];
    let options = this.secondOptions.filter(key => key && Object.values(second_options).includes(key)); // 去掉杂质
    options = [...new Set(options)]; // 去除重复
    const keys = [...options, ...requireKeys2];
    const items = keys.map(key => this.firmwareSetting[key]).filter(item => item);
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={[styles.blank, { borderTopWidth: 0 }]} />
          {this.renderList(items)}
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