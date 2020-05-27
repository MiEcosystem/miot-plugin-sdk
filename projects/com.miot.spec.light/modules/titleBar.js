/**
 * @export
 * @module miot/ui/TitleBar
 * @description 新版导航栏，可以尝试使用
 * @property type 导航栏类型 options: ["dark", "light"(default)]
 * @property style 导航栏整体的样式
 * @property leftTextStyle 左侧文字样式，和 leftText 一起使用，不设置使用米家默认值
 * @property leftText 左侧文字
 * @property onPressLeft 左侧点击事件，设置了才显示左侧文字或图片，如果设置了leftText则显示设置的文字，否则显示默认的返回按钮。
 * @property onPressLeft2 左侧的第二个点击事件，设置了才显示默认的关闭按钮，
 * @property rightTextStyle 右侧文字样式，和 rightText 一起使用，不设置使用米家默认值
 * @property rightText 右侧文字
 * @property onPressRight 右侧点击事件，设置了才显示右侧文字或图片，如果设置了 rightText 则显示设置的文字，否则显示默认的更多按钮。
 * @property onPressRight2 右侧的第二个点击事件，设置了才显示默认的分享按钮
 * @property title 中间的标题
 * @property subTitle  中间的子标题
 * @property onPressTitle 点击标题的事件
 * @property showDot 是否显示右侧更多按钮的空点
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';

import ImageButton from 'miot/ui/ImageButton';
import { SafeAreaView } from 'react-navigation';
import { RkButton } from "react-native-ui-kitten";

const PropTypes = require('prop-types');
const { width, height } = Dimensions.get('window');
const titleHeight = 44;
const imgHeight = 28;
export default class TitleBar extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['dark', 'light'])
  }

  static defaultProps = {
    type: 'light'
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    this.isDarkStyle = this.props.type === 'dark';
    this.isDarkStyle ? StatusBar.setBarStyle('dark-content') : StatusBar.setBarStyle('light-content');
    if (Platform.OS == 'android') {
      StatusBar.setTranslucent(true);
    }

    let leftWidth = this.props.leftTextStyle ? this.props.leftTextStyle.width : 0;
    let rightWidth = this.props.rightTextStyle ? this.props.rightTextStyle.width : 0;

    let titleTextStyle = this.isDarkStyle ? styles.blackTitleText : styles.whiteTitleText;
    let subtitleTextStyle = this.isDarkStyle ? styles.blackSubtitleText : styles.whiteSubtitleText;
    let leftRightTextStyle = this.isDarkStyle ? styles.blackLeftRightText : styles.whiteLeftRightText;

    let imgBack = this.isDarkStyle ? require('miot/resources/title/std_tittlebar_main_device_back_normal.png') : require('miot/resources/title/std_tittlebar_main_device_back_white_normal.png');
    let imgBackPress = this.isDarkStyle ? require('miot/resources/title/std_tittlebar_main_device_back_press.png') : require('miot/resources/title/std_tittlebar_main_device_back_white_press.png');

    let imgMore = this.isDarkStyle ? require('miot/resources/title/std_tittlebar_main_device_more_normal.png') : require('miot/resources/title/std_tittlebar_main_device_more_white_normal.png');
    let imgMorePress = this.isDarkStyle ? require('miot/resources/title/std_tittlebar_main_device_more_press.png') : require('miot/resources/title/std_tittlebar_main_device_more_white_press.png');


    return (
      <SafeAreaView style={[styles.titleBarContainer, this.props.style]}>
        {this.props.leftText
          ? <RkButton onPress={this.props.onPressLeft}
            contentStyle={[leftRightTextStyle, this.props.leftTextStyle]}
            style={[leftRightTextStyle, {
              height: this.props.onPressLeft ? titleHeight : 0,
              width: leftWidth ? leftWidth : imgHeight + 14 * 2
            }]}>{this.props.leftText}</RkButton>
          : <ImageButton onPress={this.props.onPressLeft}
            style={[styles.img, { height: this.props.onPressLeft ? imgHeight : 0 }]}
            source={imgBack}
            highlightedSource={imgBackPress} />
        }
        {this.props.onPressLeft2 ? (
          <ImageButton onPress={this.props.onPressLeft2}
            style={[styles.img, {
              marginLeft: 0,
              height: this.props.onPressLeft2 ? imgHeight : 0
            }]}
            source={require('miot/resources/title/std_tittlebar_main_device_back2_normal.png')}
            highlightedSource={require('miot/resources/title/std_tittlebar_main_device_back2_press.png')} />
        ) : null}
        <View style={[styles.textContainer]}>
          <Text
            numberOfLines={1}
            style={[titleTextStyle]}
            onPress={this.props.onPressTitle}>{this.props.title}</Text>
          {
            this.props.subTitle ? <Text
              numberOfLines={1}
              style={[subtitleTextStyle]}
              onPress={this.props.onPressTitle}>{this.props.subTitle}</Text> : <View />
          }
        </View>
        {this.props.onPressRight2 ? (
          <ImageButton onPress={this.props.onPressRight2}
            style={[styles.img, {
              marginRight: 0,
              height: this.props.onPressRight2 ? imgHeight : 0
            }]}
            source={require('miot/resources/title/std_tittlebar_main_device_share_normal.png')}
            highlightedSource={require('miot/resources/title/std_tittlebar_main_device_share_press.png')} />
        ) : null}
        {this.props.rightText
          ? <RkButton onPress={this.props.onPressRight}
            contentStyle={[leftRightTextStyle, this.props.rightTextStyle]}
            style={[leftRightTextStyle, {
              height: this.props.onPressRight ? titleHeight : 0,
              width: rightWidth ? rightWidth : imgHeight + 14 * 2
            }]}>{this.props.rightText}</RkButton>
          : <ImageButton onPress={this.props.onPressRight}
            style={[styles.img, { height: this.props.onPressRight ? imgHeight : 0 }]}
            source={imgMore}
            highlightedSource={imgMorePress} />
        }
        {
          this.props.showDot &&
          <Image style={styles.dot}
            source={require('miot/resources/title/std_tittlebar_main_device_massage_point.png')} />
        }
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  titleBarContainer: {
    flexDirection: 'row',
    width: width,
    alignItems: 'flex-end',
    height: StatusBar.currentHeight + titleHeight
  },
  textContainer: {
    height: titleHeight,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  blackTitleText: {
    color: '#000000cc',
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  whiteTitleText: {
    color: "#ffffffcc",
    fontSize: 15,
    textAlignVertical: "center",
    textAlign: "center"
  },
  blackSubtitleText: {
    color: '#00000088',
    fontSize: 12,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  whiteSubtitleText: {
    color: "#ffffff88",
    fontSize: 12,
    textAlignVertical: "center",
    textAlign: "center"
  },
  blackLeftRightText: {
    flexDirection: 'column',
    backgroundColor: '#0000',
    color: '#00000088',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: "center",
    textAlign: "center"
  },
  whiteLeftRightText: {
    flexDirection: 'column',
    backgroundColor: '#0000',
    color: '#ffffff88',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: "center",
    textAlign: "center"
  },
  img: {
    width: imgHeight,
    height: imgHeight,
    resizeMode: 'contain',
    marginLeft: 14,
    marginTop: (titleHeight - 28) / 2,
    marginBottom: (titleHeight - 28) / 2,
    marginRight: 14
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    resizeMode: 'contain',
    right: 14,
    top: StatusBar.currentHeight + (titleHeight - 28) / 2
  }
});
