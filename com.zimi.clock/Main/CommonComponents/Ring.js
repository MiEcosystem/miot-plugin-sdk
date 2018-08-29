'use strict';

import React from 'react';

import {
  ScrollView,
  PixelRatio,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';

import MHGlobalData from '../CommonComponents/MHGlobalData';
var LoclizedStrings = require('./MHLocalizableString.js').string;
var MHAudio = require('NativeModules').MHAudio;
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;

export default class Ring extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ringIndex: this.props.navigation.state.params.ringIndex,
    };
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={{ flex: 1, marginTop: MHGlobalData.APP_MARGINTOP }}>
          <View style={[styles.separator]} />
          <ScrollView>
            <View style={[styles.separator, { marginTop: 20 }]} />
            <View style={{ backgroundColor: "#fff" }}>
              {this._renderRingList()}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  _setRing(i) {
    var path = this.props.navigation.state.params.ringOptions[i].url;
    MHAudio.startPlay(path, {}, (isSuccess, response) => {
      console.log(response);
    });
    this.setState({
      ringIndex: i,
    });
    console.log(this.state);
    this.props.navigation.state.params.setRing(i);
  }

  _renderRingList() {
    var ringOptions = this.props.navigation.state.params.ringOptions;
    if (!ringOptions.length) {
      return <View />
    }
    ringOptions.forEach(item => item.isSelected = false);
    ringOptions[this.state.ringIndex].isSelected = true;
    var renderList = [];
    for (let i = 0; i < ringOptions.length; i++) {
      renderList.push(
        <View>
          <TouchableHighlight
            underlayColor='#f6f6f6'
            onPress={() => this._setRing(i)}
          >
            <View style={styles.containerMenu}>
              <Text
                style={
                  ringOptions[i].isSelected ?
                    styles.menuLabelSelected :
                    styles.menuLabel}>
                {ringOptions[i].title}
              </Text>
              {ringOptions[i].isSelected &&
                <Image
                  source={require('../../Resources/utils/selected.png')}
                  style={styles.selectImg}
                />
              }
            </View>
          </TouchableHighlight>
          <View style={styles.separator} />
        </View >
      );
    }
    return renderList;
  }

  componentWillUnmount() {
    MHAudio.stopPlay(() => { });
  }

}

var styles = StyleSheet.create({
  pageContainer: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "#f6f6f6",
  },
  selectImg: {
    marginRight: 15,
    width: 20,
    height: 20,
  },
  separator: {
    alignSelf: "stretch",
    height: 1 / PixelRatio.get(),
    backgroundColor: '#dfdfdf',
  },
  containerMenu: {
    height: 100 * ratioW,
    alignItems: "center",
    flexDirection: "row",
  },
  menuLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    color: '#000',
  },
  menuLabelSelected: {
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    color: '#00BC9C',
  },
});
