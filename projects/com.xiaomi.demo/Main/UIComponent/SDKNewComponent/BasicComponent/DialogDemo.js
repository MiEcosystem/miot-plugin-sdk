'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Orientation from 'react-native-orientation';
import { CommonDialog, ListGroup } from 'miot/ui/hyperOSUI';
import NavigationBar from "miot/ui/NavigationBar";
import { colorToken } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";

class DialogDemo extends Component {
  state = {
    showDialog: false,
    dialogType: null, // 'normal' | 'checkbox' | 'landscape'
    checkboxChecked: false
  };

  moreline = false;
  mainTitle1 = '文本类弹窗';
  mainContent = '正文，单行时居中对齐。';
  checkboxText = '不在提示';
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
              this.mainTitle1 = '文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗文本类弹窗';
              this.mainContent = '正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文单行时居中对齐正文正文，单行时居中对齐。正文，单行时居中对齐。正文，单行时居中对齐正文正文，单行时居中对齐。正文，单行时居中对齐正文正文，单行时居中对齐正文正文，单行时居中对齐正文';
              this.checkboxText = '不在提示不在提示不在提示不在提示不在提示不在提示不在提示不在提示不在提示不在提示不在提示不在提示';
            } else {
              this.mainTitle1 = '文本类弹窗';
              this.mainContent = '正文，单行时居中对齐';
              this.checkboxText = '不在提示';
            }
          }
        }
      ]
    });
  }

  handlePress(item) {
    if (item === '不带checkbox') {
      this.setState({ showDialog: true, dialogType: 'normal' });
    } else if (item === '带checkbox') {
      this.setState({ showDialog: true, dialogType: 'checkbox' });
    } else if (item === '横屏弹窗') {
      Orientation.lockToLandscape();

      // 清理旧 listener
      this.orientationListener && Orientation.removeOrientationListener(this.orientationListener);

      this.orientationListener = (orientation) => {
        if (orientation === 'LANDSCAPE') {
          // 延迟设置 showDialog，确保 AbstractDialog 渲染稳定
          setTimeout(() => {
            this.setState({ showDialog: true, dialogType: 'landscape' });
          }, 50);
          Orientation.removeOrientationListener(this.orientationListener);
          this.orientationListener = null;
        }
      };

      Orientation.addOrientationListener(this.orientationListener);
    }
  }

  handleDismiss = () => {
    const { dialogType } = this.state;
    console.log("触发了 onDismiss");

    // 先关闭弹窗
    this.setState({
      showDialog: false,
      dialogType: null
    });

    // 横屏弹窗需要恢复竖屏
    if (dialogType === 'landscape') {
      setTimeout(() => {
        Orientation.lockToPortrait();
      }, 50);
    }
  };

  getButtons() {
    if (this.ifbuttons) {
      return [
        {
          title: '取消',
          onPress: () => {
            console.log('点击取消');
          }
        },
        {
          title: '确定',
          onPress: () => {
            console.log('点击确定');
          }
        }
      ];
    }

    return [
      {
        title: '确定',
        onPress: () => {
          console.log('点击确定');
        }
      }
    ];
  }

  renderItem(item) {
    return (
      <ListGroup
        dataSource={item.map((label, index) => ({
          title: label,
          key: String(index),
          onPress: () => this.handlePress(label)
        }))}
      />
    );
  }


  renderDialog() {
    const { showDialog, dialogType } = this.state;
    if (!showDialog) return null;

    return (
      <CommonDialog
        visible={showDialog}
        showCheckbox={dialogType === 'checkbox'}
        useNewTheme={true}
        title={this.mainTitle1}
        contentText={this.mainContent}
        onCheckboxChange={(checked) => {
          console.log('checkbox状态变化:', checked);
          this.setState({ checkboxChecked: checked });
        }}
        checkboxData={{
          checked: false,
          text: this.checkboxText
        }}
        onDismiss={this.handleDismiss}
        message={`这是一个 ${ dialogType } 示例`}
        buttons={this.getButtons()}
      />
    );
  }
  render() {
    const items = ['不带checkbox', '带checkbox', '横屏弹窗'];

    return (
      <ScrollView style={styles.container}>
        {this.renderItem(items)}
        {this.renderDialog()}
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.mj_color_gray_bg_2,
    paddingTop: 20
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: colorToken.mj_color_gray_card_1
  }
});
export default DialogDemo;
