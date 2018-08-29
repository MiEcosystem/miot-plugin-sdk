'use strict';

import React from 'react';

import {
  PixelRatio,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('./MHLocalizableString.js').string;
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;

var customCircleOptions = [
  {
    text: LocalizedStrings.sunday,
    isSelected: false,
  },
  {
    text: LocalizedStrings.monday,
    isSelected: false,
  },
  {
    text: LocalizedStrings.tuesday,
    isSelected: false,
  },
  {
    text: LocalizedStrings.wednesday,
    isSelected: false,
  },
  {
    text: LocalizedStrings.thursday,
    isSelected: false,
  },
  {
    text: LocalizedStrings.friday,
    isSelected: false,
  },
  {
    text: LocalizedStrings.saturday,
    isSelected: false,
  },
];

import CheckBox from './checkbox';

export default class Circle extends React.Component {
  constructor(props, context) {
    super(props, context);
    props.navigation.state.params.circleOptions.forEach(circleOption => {
      circleOption.isSelected = false;
    });
    customCircleOptions.forEach(circleOption => {
      circleOption.isSelected = false;
    });
    if (props.navigation.state.params.circleExtra && Object.prototype.toString.call(props.navigation.state.params.circleExtra) === "[object Array]") {
      props.navigation.state.params.circleExtra.forEach(i => {
        customCircleOptions[i].isSelected = true;
      });
    } else {
      if (props.navigation.state.params.circleIndex !== -1) {
        props.navigation.state.params.circleOptions[props.navigation.state.params.circleIndex].isSelected = true;
      }
    }
    this.state = {
      showCustom: false,
      circleExtraSelected: props.navigation.state.params.circleExtra,
      circleIndex: props.navigation.state.params.circleIndex,
      circleOptions: props.navigation.state.params.circleOptions,
    };
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={{ flex: 1, marginTop: MHGlobalData.APP_MARGINTOP }}>
          <View style={styles.separator} />
          <ScrollView>
            <View style={[styles.separator, { marginTop: 20 }]} />
            <View style={{ backgroundColor: "#fff" }}>
              {!this.state.showCustom && this._renderCircles()}
              {this.state.showCustom && this._renderCustomCircles()}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  _setCircle(i) {
    var circleOptions = this.state.circleOptions;
    if (this.state.circleIndex !== -1) {
      circleOptions[this.state.circleIndex].isSelected = false;
    };
    circleOptions[i].isSelected = true;
    this.setState({
      circleExtraSelected: false, // 默认让自定义前面的光标去掉
      circleIndex: i,
      circleOptions: circleOptions,
    });
    console.log(this.state.circleIndex);
    this.props.navigation.state.params.setCircle(i);
  }

  _renderCircles() {
    var renderList = [];
    var circleOptions = this.state.circleOptions;
    for (let i = 0; i < circleOptions.length; i++) {
      renderList.push(
        <View>
          <TouchableHighlight
            underlayColor='#f6f6f6'
            onPress={() => this._setCircle(i)}
          >
            <View style={styles.containerMenu}>
              <Text
                style={
                  circleOptions[i].isSelected ?
                    styles.menuLabelSelected :
                    styles.menuLabel}>
                {circleOptions[i].text}
              </Text>
              {circleOptions[i].isSelected &&
                <Image
                  source={require('../../Resources/utils/selected.png')}
                  style={styles.selectImg}
                />
              }
            </View>
          </TouchableHighlight>
          <View style={styles.separator} />
        </View>
      );
    }
    renderList.push(
      <View>
        <TouchableHighlight
          underlayColor='#f6f6f6'
          onPress={() => this.setState({ showCustom: true })}
        >
          <View style={styles.containerMenu}>
            <Text
              style={
                this.state.circleExtraSelected ?
                  styles.menuLabelSelected :
                  styles.menuLabel}>
              {LocalizedStrings.custom}
            </Text>
            {this.state.circleExtraSelected &&
              <Image
                source={require('../../Resources/utils/selected.png')}
                style={styles.selectImg}
              />
            }
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
    return renderList;
  }

  _renderCustomCircles() {
    var renderList = [];
    for (let i = 0; i < customCircleOptions.length; i++) {
      renderList.push(
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableHighlight
              underlayColor='#f6f6f6'
              style={{ flex: 1 }}
              onPress={() => this._setCircleExtra(i)}
            >
              <View style={styles.containerMenu}>
                <Text style={styles.menuLabel}>{customCircleOptions[i].text}</Text>
                <CheckBox
                  isChecked={customCircleOptions[i].isSelected}
                  onClick={() => this._setCircleExtra(i)}
                />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.separator} />
        </View>
      );
    }
    return renderList;
  }

  _setCircleExtra(i) {
    customCircleOptions[i].isSelected = !customCircleOptions[i].isSelected;
    var arr = [];
    customCircleOptions.forEach((item, index) => {
      (item.isSelected) && arr.push(index);
    });
    console.log(arr);
    this.props.navigation.state.params.setCircleExtra(arr);
    this.forceUpdate();
  }

  componentWillUnmount = () => {
  };

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
