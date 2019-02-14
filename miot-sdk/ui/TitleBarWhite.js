/**
 * @export
 * @module miot/ui/TitleBarWhite
 * @description 白色标题栏
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
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import ImageButton from "./ImageButton";
import { SafeAreaView } from "react-navigation";
import { RkButton } from "react-native-ui-kitten";
const { width, height } = Dimensions.get("window");
const titleHeight = 44;
const imgHeight = 28;
export default class TitleBarWhite extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    StatusBar.setBarStyle("light-content");
    if(Platform.OS == 'android'){
        StatusBar.setTranslucent(true);
    }
    let leftWidth=this.props.leftTextStyle?this.props.leftTextStyle.width:0;
    let rightWidth=this.props.rightTextStyle?this.props.rightTextStyle.width:0;
    return (
      <SafeAreaView style={[styles.titleBarContainer, this.props.style]}>
        {this.props.leftText
          ? <RkButton onPress={this.props.onPressLeft}
                    contentStyle={[styles.leftRightText, this.props.leftTextStyle]}
                    style={[styles.leftRightText, { height: this.props.onPressLeft ? titleHeight : 0, width:leftWidth?leftWidth:imgHeight+14*2 }]}>{this.props.leftText}</RkButton>
          : <ImageButton onPress={this.props.onPressLeft}
                         style={[styles.img, { height: this.props.onPressLeft ? imgHeight : 0 }]}
                         source={require("../resources/title/std_tittlebar_main_device_back_white_normal.png")}
                         highlightedSource={require("../resources/title/std_tittlebar_main_device_back_white_press.png")}/>
        }
        <ImageButton onPress={this.props.onPressLeft2}
                     style={[styles.img, {
                       marginLeft: 0,
                       height: this.props.onPressLeft2 ? imgHeight : 0
                     }]}
                     source={require("../resources/title/std_titlebar_setting_back_normal.png")}
                     highlightedSource={require("../resources/title/std_titlebar__setting_back_press.png")}/>
        <View style={[styles.textContainer]}>
          <Text
            style={[styles.titleText]}
            onPress={this.props.onPressTitle}>{this.props.title}</Text>
          {
            this.props.subTitle && <Text
              style={[styles.subtitleText]}
              onPress={this.props.onPressTitle}>{this.props.subTitle}</Text>
          }
        </View>
        <ImageButton onPress={this.props.onPressRight2}
                     style={[styles.img, {
                       marginRight: 0,
                       height: this.props.onPressRight2 ? imgHeight : 0
                     }]}
                     source={require("../resources/title/std_tittlebar_main_device_share_white_normal.png")}
                     highlightedSource={require("../resources/title/std_tittlebar_main_device_share_white_press.png")}/>
        {this.props.rightText
          ? <RkButton onPress={this.props.onPressRight}
                    contentStyle={[styles.leftRightText, this.props.rightTextStyle]}
                    style={[styles.leftRightText, { height: this.props.onPressRight ? titleHeight : 0, width:rightWidth?rightWidth:imgHeight+14*2 }]}>{this.props.rightText}</RkButton>
          : <ImageButton onPress={this.props.onPressRight}
                         style={[styles.img, { height: this.props.onPressRight ? imgHeight : 0 }]}
                         source={require("../resources/title/std_tittlebar_main_device_more_white_normal.png")}
                         highlightedSource={require("../resources/title/std_tittlebar_main_device_more_white_press.png")}/>
        }
        {
          this.props.showDot &&
          <Image style={styles.dot}
                 source={require("../resources/title/std_tittlebar_main_device_massage_point.png")}/>
        }
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  titleBarContainer: {
    flexDirection: "row",
    width: width,
    alignItems: "flex-end",
    height:  StatusBar.currentHeight + titleHeight,
  },
  textContainer: {
    height: titleHeight,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  titleText: {
    color: "#ffffffcc",
    fontSize: 15,
    textAlignVertical: "center",
    textAlign: "center"
  },
  subtitleText: {
    color: "#ffffff88",
    fontSize: 12,
    textAlignVertical: "center",
    textAlign: "center"
  },
  leftRightText: {
    flexDirection: 'column',
    backgroundColor:'#0000',
    color: '#ffffff88',
    fontSize: 14,
    alignItems:'center',
    justifyContent:'center',
    textAlignVertical: "center",
    textAlign: "center"
  },
  img: {
    width: imgHeight,
    height: imgHeight,
    resizeMode: "contain",
    marginLeft: 14,
    marginTop: (titleHeight - 28) / 2,
    marginBottom: (titleHeight - 28) / 2,
    marginRight: 14
  },
  dot: {
    position: "absolute",
    width: 10,
    height: 10,
    resizeMode: "contain",
    right: 14,
    top: StatusBar.currentHeight + (titleHeight - 28) / 2
  }
});