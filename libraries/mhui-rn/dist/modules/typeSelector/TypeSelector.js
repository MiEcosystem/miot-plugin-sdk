// @ts-nocheck

/* eslint-disable */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { adjustSize } from "../utils/sizes";
import { NOOP } from "../utils/fns";
export default class TypeSelector extends Component {
  static defaultProps = {
    disabled: false,
    items: [],
    selectedIndex: 0,
    invisible: false,
    onSelect: NOOP
  };
  onPress = index => {
    const {
      disabled,
      onSelect
    } = this.props;

    if (disabled) {
      return;
    }

    onSelect(index);
  };

  getItems() {
    const {
      items,
      selectedIndex,
      disabled
    } = this.props;
    return items.map((item, index) => <TouchableOpacity disabled={disabled} key={index} style={[Styles.btnWrap, index === 0 ? Styles.btnWrapFirst : null, index === selectedIndex ? Styles.btnWrapSelected : null]} onPress={() => {
      this.onPress(index);
    }}>
        <Image style={Styles.btn} source={item} />
      </TouchableOpacity>);
  }

  render() {
    const {
      invisible
    } = this.props;
    const items = this.getItems();
    return <View style={[Styles.container, {
      opacity: invisible ? 0 : 1
    }]}>
        {items}
      </View>;
  }

}
const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnWrap: {
    width: adjustSize(150),
    height: adjustSize(150),
    marginLeft: adjustSize(165),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  btnWrapFirst: {
    marginLeft: 0
  },
  btnWrapSelected: {
    borderWidth: adjustSize(3),
    borderColor: '#fff',
    borderRadius: adjustSize(75)
  },
  btn: {
    width: adjustSize(120),
    height: adjustSize(120),
    resizeMode: 'contain'
  }
});