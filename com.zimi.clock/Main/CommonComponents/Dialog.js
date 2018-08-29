'use strict';

import React from 'react';

import {
  PixelRatio,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const ratioW = (screenWidth / (698 + 2 * 26));
const ratioH = (screenHeight / (1374 + 110));
const maxWidth = screenWidth - 164 * 2 * ratioW;


function Timestamp(props) {
  return (
    <View style={styles.timestamp}>
      <View style={styles.separator} />
      <Text style={styles.timeFont}>{props.time}</Text>
      <View style={styles.separator} />
    </View>
  );
}

export class ChatRightDialog extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.text.length > 13 ? { width: maxWidth } : {};
  }
  render() {
    var bubbleRight = this.props.bubbleRight ? Object.assign(styles.bubbleRight, this.props.bubbleRight) : styles.bubbleRight;
    var textRight = this.props.textRight ? Object.assign(styles.textRight, this.props.textRight) : styles.textRight;
    return (
      <View>
        {this.props.showTime && <Timestamp time={this.props.time} />}
        <View style={{ alignItems: 'flex-end', marginTop: 50 * ratioW }}>
          <View style={{ flexDirection: "row", marginRight: 28 * ratioW }}>
            <View>
              <View style={[styles.bubbleBase, bubbleRight]}>
                <Text numberOfLines={10} style={[styles.textBase, textRight, this.width]}>{this.props.text}</Text>
              </View>
              <Image
                source={this.props.imageRightUri}
                style={[styles.imageBase, styles.imageRight]}
              />
            </View>
            <Image
              source={{ uri: this.props.avatarRightUri }}
              style={[styles.avatarBase, styles.avatarRight]}
            />
          </View>
          {/* <View style={[styles.btn, { marginRight: 134 * ratioW }]}>
            <Text style={[styles.btnText]}>听错了</Text>
          </View> */}
        </View>
      </View>
    )
  }
}

export class ChatLeftDialog extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.text.length > 13 ? { width: maxWidth } : {};
  }
  render() {
    var bubbleLeft = this.props.bubbleLeft ? Object.assign(styles.bubbleLeft, this.props.bubbleLeft) : styles.bubbleLeft;
    var textLeft = this.props.textLeft ? Object.assign(styles.textLeft, this.props.textLeft) : styles.textLeft;
    return (
      <View style={{ alignItems: 'flex-start', marginTop: 50 * ratioW }}>
        <View style={{ flexDirection: "row", marginLeft: 28 * ratioW }}>
          <View style={[styles.avatarBase, styles.avatarLeft]}>
            <Image
              // resizeMode="center"
              source={this.props.avatarLeftUri}
              style={styles.avatar}
            />
          </View>
          <View>
            <View style={[styles.bubbleBase, bubbleLeft]}>
              <Text numberOfLines={10} style={[styles.textBase, textLeft, this.width]}>{this.props.text}</Text>
            </View>
            <Image
              source={this.props.imageLeftUri}
              style={[styles.imageBase, styles.imageLeft]}
            />
          </View>
        </View>
        {/* <View style={[styles.btn, { marginLeft: 134 * ratioW }]}>
          <Text style={[styles.btnText]}>理解错了</Text>
        </View> */}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  bubbleBase: {
    paddingVertical: 26 * ratioW,
    paddingHorizontal: 32 * ratioW,
    borderWidth: 1 * ratioW,
    borderRadius: 18 * ratioW,
    alignItems: "center",
    justifyContent: "center",
  },
  textBase: {
    fontFamily:'MI-LANTING--GBK1-Light',
    fontSize: 30 * ratioW,
  },
  imageBase: {
    width: 12 * ratioW,
    height: 18 * ratioW,
    position: "absolute",
    top: 36 * ratioW,
  },
  avatar: {
    width: 42 / 1.414,
    height: 42 / 1.414,
  },
  avatarBase: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderColor: "#dfdfdf",
    borderWidth: 1 / PixelRatio.get(),
    alignItems: "center",
    justifyContent: "center"
  },
  bubbleRight: {
    backgroundColor: "#4ebba3",
    borderColor: "#4ebba3",
  },
  textRight: {
    color: "#fff",
  },
  imageRight: {
    right: -12 * ratioW,
  },
  avatarRight: {
    marginLeft: 22 * ratioW,
  },
  bubbleLeft: {
    backgroundColor: "#fff",
    borderColor: "rgba(0,0,0,0.3)",
  },
  textLeft: {
    color: "#000",
  },
  imageLeft: {
    left: -11 * ratioW,
  },
  avatarLeft: {
    marginRight: 22 * ratioW,
  },
  btn: {
    height: 44 * ratioW,
    marginTop: 22 * ratioW,
    paddingVertical: 10 * ratioW,
    paddingHorizontal: 15 * ratioW,
    borderWidth: 1 * ratioW,
    borderRadius: 9 * ratioW,
    borderColor: "rgba(0,0,0, 0.3)",
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 20 * ratioW,
    color: "#7d7d7d",
  },
  timestamp: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 44 * ratioW,
    marginBottom: 36 * ratioW,
  },
  separator: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    height: 1 / PixelRatio.get(),
    marginHorizontal: 28 * ratioW,
  },
  timeFont: {
    marginHorizontal: 4 * ratioW,
    fontSize: 20 * ratioW,
    color: "rgba(0,0,0,0.4)",
  },
});
