'use strict';
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform
} from 'react-native';

import { Styles } from 'miot/resources';
import { CommonSetting, SETTING_KEYS } from "miot/ui/CommonSetting";
import Separator from 'miot/ui/Separator';

import Navigator from '../modules/navigator';
import Protocol from '../modules/protocol';

import { LoadingDialog } from 'miot/ui';

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
      showDialog: false,
      dialogTimeout: 0,
      dialogTitle: ''
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      hideRightButton: true
    });
  }

  componentWillUnmount() {
  }

  render() {
    let { showDialog, dialogTimeout, dialogTitle } = this.state;
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
