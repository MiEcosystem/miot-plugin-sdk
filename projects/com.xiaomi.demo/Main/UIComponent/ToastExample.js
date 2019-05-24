'use strict';

import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';

/**
 * @exports
 * @author Li Yue
 * @since 
 * @description toast 提示
 * @property duration 持续时间，仅在用 api 调用时有效。数字：默认值 Toast.durations.SHORT（2000），Toast.durations.LONG（3500）
 * @property visible 可见性，仅在作为组件使用时有效。布尔：默认值 false
 * @property position 位置。数字：默认值 Toast.positions.BOTTOM（-20），Toast.positions.CENTER（0），Toast.positions.TOP（20）。负值距离屏幕底部，正值距离屏幕顶部，0定位在中间。
 * @property animation 是否有动画效果。布尔：默认值 true
 * @property shadow 是否有阴影。布尔：默认值 true
 * @property backgroundColor 背景色。字符串：默认值 null
 * @property shadowColor 阴影颜色。字符串：默认值 null
 * @property textColor 文字颜色。字符串：默认值 null
 * @property delay 显示前的延迟时间。数字：默认值 0
 * @property hideOnPress 点击是否消失。布尔：默认值 true
 * @property onShow 显示开始时的回调函数。函数：默认值 null
 * @property onShown 显示完成时的回调函数。函数：默认值 null
 * @property onHide 隐藏开始时的回调函数。函数：默认值 null
 * @property onHidden 隐藏完成时的回调函数。函数：默认值 null
 */

class ToastExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isShow: false,
      isShown: false,
      isHide: false,
      isHidden: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => {
        return { visible: true };
      });
    }, 2000);

    setTimeout(() => {
      this.setState(() => {
        return { visible: false };
      });
    }, 5000);
  }

  //显示 toast
  onShowToast = () => {
    Toast.show('点我消失', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: false,
      backgroundColor: 'yellow',
      textColor: 'black',
      onShow: () => {
        this.setState(() => {
          return { isShow: true };
        });
      },
      onShown: () => {
        this.setState(() => {
          return { isShown: true };
        });
      },
      onHide: () => {
        this.setState(() => {
          return { isHide: true };
        });
      },
      onHidden: () => {
        this.setState(() => {
          return { isHidden: true };
        });
      }
    });
  }

  render() {
    let { visible, isShow, isShown, isHide, isHidden } = this.state;
    let appearStart = isShow ? 'flex' : 'none';
    let appearEnd = isShown ? 'flex' : 'none';
    let disappearStart = isHide ? 'flex' : 'none';
    let disappearEnd = isHidden ? 'flex' : 'none';

    return (
      <View>
        <Toast
          visible={visible}
          hideOnPress={false}
        >载入成功</Toast>
        <Button
          onPress={this.onShowToast}
          title="显示toast"
          color="#841584"
          accessibilityLabel="显示toast"
        />
        <Text style={{
          display: appearStart
        }}>中间提示开始显示</Text>
        <Text style={{
          display: appearEnd
        }}>中间提示显示完成</Text>
        <Text style={{
          display: disappearStart
        }}>中间提示开始隐藏</Text>
        <Text style={{
          display: disappearEnd
        }}>中间提示隐藏完成</Text>
      </View>
    );
  }
}

export default ToastExample;