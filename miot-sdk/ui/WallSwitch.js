import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { adjustSize } from '../utils/sizes';
// import { FontDefault } from '../utils/fonts';
import { log } from '../utils/fns';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../utils/accessibility-helper';
const SwitchBgColorsOn = ["#fff", "#f1f1f2"];
const SwitchBgColorsOff = ["#f1f1f2", "#fff"];
const MarginTops = [0, adjustSize(240), adjustSize(180), adjustSize(105), adjustSize(90)];
const Heights = [0, adjustSize(990), adjustSize(852), adjustSize(720), adjustSize(516)];
export default class WallSwitch extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      isOn: PropTypes.bool,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    onSwitch: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible
  };
  static defaultProps = {
    items: [],
    onSwitch: log
  };
  switch = (index) => {
    let { onSwitch } = this.props;
    if (typeof onSwitch === 'function') {
      onSwitch(index);
    }
  }
  getItems = (items) => {
    let length = items.length;
    return items.map((item, index) => {
      let isFirst = index === 0;
      let isLast = index === length - 1;
      let isOn = item.isOn;
      return (
        <LinearGradient key={index} style={[Styles.item, isOn ? Styles.itemOn : Styles.itemOff, isFirst ? Styles.itemFirst : null, isLast ? Styles.itemLast : null]} colors={isOn ? SwitchBgColorsOn : SwitchBgColorsOff} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityLabel: item.accessibilityLabel,
          accessibilityHint: item.accessibilityHint,
          accessibilityState: {
            selected: isOn,
            checked: isOn
          }
        })}>
          <TouchableOpacity style={{ width: '100%', height: '100%' }} activeOpacity={0.8} onPress={() => {
            this.switch(index);
          }} {...getAccessibilityConfig({
            accessible: false
          })}>
            <View style={Styles.upper}>
              <View style={[Styles.indicator, isOn ? Styles.indicatorOn : Styles.indicatorOff]}></View>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      );
    });
  }
  render() {
    let { items } = this.props;
    if (!items || !items.length) {
      return null;
    }
    let length = items.length;
    return (
      <View style={[Styles.container, {
        height: Heights[length],
        marginTop: MarginTops[length]
      }]}>
        {this.getItems(items)}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    marginHorizontal: adjustSize(30),
    flexDirection: 'row',
    backgroundColor: '#CDCED0',
    borderRadius: adjustSize(30),
    borderWidth: adjustSize(6),
    borderColor: '#CDCED0',
    overflow: 'hidden'
  },
  item: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginHorizontal: adjustSize(3),
    alignItems: 'center'
  },
  itemOn: {
    marginTop: adjustSize(30),
    paddingTop: adjustSize(90),
    marginBottom: 0,
    paddingBottom: adjustSize(60)
  },
  itemOff: {
    marginTop: 0,
    paddingTop: adjustSize(120),
    marginBottom: adjustSize(30),
    paddingBottom: adjustSize(30)
  },
  itemFirst: {
    borderTopLeftRadius: adjustSize(30),
    borderBottomLeftRadius: adjustSize(30),
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1
  },
  itemLast: {
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1,
    borderTopRightRadius: adjustSize(30),
    borderBottomRightRadius: adjustSize(30)
  },
  upper: {
    flex: 1,
    marginTop: adjustSize(30),
    alignItems: 'center'
  },
  indicator: {
    width: adjustSize(84),
    height: adjustSize(6),
    marginTop: adjustSize(60)
  },
  indicatorOn: {
    backgroundColor: '#3CB3F7'
  },
  indicatorOff: {
    backgroundColor: '#A2AFC1'
  }
  // lower: {
  //   marginHorizontal: adjustSize(82),
  //   alignItems: 'center',
  //   marginBottom: adjustSize(69)
  // },
  // nameContainer: {
  //   height: adjustSize(84)
  // },
  // name: {
  //   fontFamily: FontDefault,
  //   fontSize: adjustSize(33),
  //   lineHeight: adjustSize(42),
  //   textAlign: 'center',
  //   color: '#000',
  //   opacity: 0.6
  // }
});