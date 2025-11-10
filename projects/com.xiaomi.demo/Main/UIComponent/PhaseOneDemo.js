'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Orientation from 'react-native-orientation';
import { AbstractDialog } from 'miot/ui/Dialog';
import { Device, Package } from "miot";
import { getString } from "../MHLocalizableString";
import NavigationBar from "miot/ui/NavigationBar";

export default class PhaseOneDemo extends Component {
  state = {
    showDialog: false,
    dialogType: null // 'normal' | 'checkbox' | 'landscape'
  };
  moreline =false;
  mainTitle1='文本类弹窗';
  mainContent='正文，单行时居中对齐。'
  checkboxText ="不在提示";
  ifbuttons = false;
  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => {
            this.ifbuttons = !this.ifbuttons;
          }
        },
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => {
            this.moreline = !this.moreline;
            if (this.moreline) {
              this.mainTitle1 = '文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗';
              this.mainContent = '正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐';
              this.checkboxText = "不在提示不在提示不在提示不在提示不在提示不在提示不在提示不在提示不在提示不在提示";
            } else {
              this.mainTitle1 = '文本类弹窗';
              this.mainContent = '正文，单行时居中对齐';
              this.checkboxText = '不在提示';
            }
          },
          accessibilityLabel: '设置',
          accessibilityHint: '进入设置'
        }]
    });
  }

  handlePress(item) {
    console.log('点击了:', item);
    if (item === '不带checkbox') {
      this.setState({ showDialog: true, dialogType: 'normal' });
    } else if (item === '带checkbox') {
      this.setState({ showDialog: true, dialogType: 'checkbox' });
    } else if (item === '横屏弹窗') {
      Orientation.lockToLandscape();

      this.orientationListener = (orientation) => {
        if (orientation === 'LANDSCAPE') {
          this.setState({ showDialog: true, dialogType: 'landscape' });
          Orientation.removeOrientationListener(this.orientationListener);
        }
      };
      Orientation.addOrientationListener(this.orientationListener);
    }
  }

  handleDismiss = () => {
    const { dialogType } = this.state;
    console.log("触发了");
    if (dialogType === 'landscape') {
      Orientation.lockToPortrait();
    }

    this.setState({ showDialog: false, dialogType: null });
  };

  renderItem(label, index) {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.item,
          index === 0 && styles.firstItem,
          index === 2 && styles.lastItem
        ]}
        onPress={() => this.handlePress(label)}
      >
        <Text style={styles.itemText}>{label}</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
    );
  }

  renderDialog() {
    const { showDialog, dialogType } = this.state;
    if (!showDialog) return null;

    return (
      <AbstractDialog
        visible={showDialog}
        showCheckbox={dialogType === 'checkbox'}
        useNewTheme={true}
        title={this.mainTitle1}
        contentText={this.mainContent}
        checkboxData={{
          checked: false,
          text: this.checkboxText
        }}
        onDismiss={this.handleDismiss}
        message={`这是一个 ${ dialogType } 示例`}
        buttons={
          this.ifbuttons ?
            [
              {
                text: '取消'
              },
              {
                text: '确定',
                onPress: () => {
                  console.log('点击确定');
                }
              }
            ] :
            [
              {
                text: '确定',

                onPress: () => {
                  console.log('点击确定');
                }
              }
            ]
        }
        style={
          dialogType === 'landscape'
            ? { alignSelf: 'center' } // 横屏模式示例
            : {}
        }
      />
    );
  }

  render() {
    const items = ['不带checkbox', '带checkbox', '横屏弹窗'];

    return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          {items.map((label, index) => this.renderItem(label, index))}
        </View>
        {this.renderDialog()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
    paddingTop: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)'
  },
  firstItem: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  lastItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  itemText: {
    fontSize: 16,
    color: '#000'
  },
  arrow: {
    fontSize: 16,
    color: '#999'
  }
});

