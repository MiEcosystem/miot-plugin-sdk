/**
 * @export
 * @module miot/ui/TitleBar
 * @author Geeook
 * @description 新版导航栏，可以尝试使用
 * @property type 导航栏类型 options: ["dark", "light"(default)]
 * @property style 导航栏整体的样式
 * @property leftText 左侧文字
 * @property onPressLeft 左侧第一个按钮的点击事件，设置该属性将显示默认的「返回」按钮，否则不显示
 * @property onPressLeft2 左侧第二个按钮的点击事件，设置 leftText 则显示设置的文字，否则显示默认的「关闭」按钮。
 * @property rightText 右侧文字
 * @property onPressRight 右侧第一个按钮的点击事件，设置该属性将显示默认的「分享」按钮，否则不显示。
 * @property onPressRight2 右侧第二个按钮的点击事件，设置 rightText 则显示设置的文字，否则显示默认的「更多」按钮。
 * @property title 中间的标题文字
 * @property subTitle  中间的副标题文字
 * @property onPressTitle 点击标题 / 副标题的事件
 * @property showDot 是否显示右侧「更多」按钮的小红点
 * @property flex 标题部分占导航栏的占比，默认1: 1.5: 1
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import ImageButton from './ImageButton';
import { SafeAreaView } from 'react-navigation';
const { width } = Dimensions.get('window');
const titleHeight = 48;
const imgHeight = 28;
const marginBetWeenImgs = (titleHeight - imgHeight) / 2;
const marginBetWeenImgText = 3;
export default class TitleBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let dark = this.props.type === 'dark';
    dark ? StatusBar.setBarStyle('light-content') : StatusBar.setBarStyle('default');
    return (
      <SafeAreaView style={[styles.titleBarContainer, this.props.style, dark ? { backgroundColor: '#333' } : {}]}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: marginBetWeenImgs }}>
          {this.props.onPressLeft &&
            <ImageButton
              onPress={this.props.onPressLeft}
              style={[styles.img]}
              source={
                dark ?
                  require('../resources/title/back_white_normal.png') :
                  require('../resources/title/back_normal.png')
              }
              highlightedSource={
                dark ?
                  require('../resources/title/back_white_press.png') :
                  require('../resources/title/back_press.png')
              }
            />
          }
          {this.props.leftText ?
            <Text
              style={[
                styles.leftRightText,
                this.props.onPressLeft ? { marginLeft: marginBetWeenImgText } : {},
                dark ? { color: '#fff' } : {}
              ]}
              onPress={this.props.onPressLeft2 || this.props.onPressLeft || (_ => { console.warn('no callback for leftText!') })}
            >
              {this.props.leftText}
            </Text> :
            (this.props.onPressLeft2 &&
              <ImageButton
                onPress={this.props.onPressLeft2}
                style={[styles.img, { marginLeft: marginBetWeenImgs, }]}
                source={
                  dark ?
                    require('../resources/title/close_white_normal.png') :
                    require('../resources/title/close_normal.png')
                }
                highlightedSource={
                  dark ?
                    require('../resources/title/close_white_press.png') :
                    require('../resources/title/close_press.png')
                }
              />
            )
          }
        </View>
        <View style={{ flex: this.props.flex || 1.5, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={[styles.titleText, dark ? { color: '#fff' } : {}]}
            onPress={this.props.onPressTitle}>
            {this.props.title}
          </Text>
          {this.props.subTitle &&
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={[styles.subtitleText, dark ? { color: '#fff' } : {}]}
              onPress={this.props.onPressTitle}>
              {this.props.subTitle}
            </Text>
          }
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: marginBetWeenImgs }}>
          <View style={{ flex: 1 }} />
          {this.props.onPressRight &&
            <ImageButton
              onPress={this.props.onPressRight}
              style={[styles.img]}
              source={
                dark ?
                  require('../resources/title/share_white_normal.png') :
                  require('../resources/title/share_normal.png')
              }
              highlightedSource={
                dark ?
                  require('../resources/title/share_white_press.png') :
                  require('../resources/title/share_press.png')
              }
            />
          }
          {this.props.rightText ?
            <Text
              style={[
                styles.leftRightText,
                { marginLeft: marginBetWeenImgText },
                dark ? { color: '#fff' } : {}
              ]}
              onPress={this.props.onPressRight2 || this.props.onPressRight || (_ => { console.warn('no callback for rightText!') })}
            >
              {this.props.rightText}
            </Text> :
            (this.props.onPressRight2 &&
              <View style={[styles.img, { marginLeft: marginBetWeenImgs }]}>
                <ImageButton
                  onPress={this.props.onPressRight2}
                  style={[styles.img]}
                  source={
                    dark ?
                      require('../resources/title/more_white_normal.png') :
                      require('../resources/title/more_normal.png')
                  }
                  highlightedSource={
                    dark ?
                      require('../resources/title/more_white_press.png') :
                      require('../resources/title/more_press.png')
                  }
                />
                {this.props.showDot &&
                  <Image
                    style={styles.dot}
                    source={require('../resources/title/dot.png')}
                  />
                }
              </View>
            )
          }
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  titleBarContainer: {
    width: width,
    height: titleHeight,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 17,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  subtitleText: {
    marginTop: 3,
    color: '#666',
    fontSize: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  leftRightText: {
    color: '#666',
    fontSize: 14,
    textAlignVertical: "center",
    textAlign: "center"
  },
  img: {
    width: imgHeight,
    height: imgHeight,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    resizeMode: 'contain',
    right: 0,
  },
});