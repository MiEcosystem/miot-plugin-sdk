'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PopButton } from "miot/ui/hyperOSUI";
import theme from "miot/ui/Style/Themes/themeMiHome";

class ButtonPageViewDemo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <PopButton
          size="large"
          type="primary"
          title={ "切换多语言" }
        >
        </PopButton>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.mjColorGrayBg2
  },
  header: {
    fontSize: 24,
    color: '#000',
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  sectionContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 5
  },
  sectionTitle: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)'
  },
  itemText: {
    fontSize: 16,
    color: '#000'
  },
  arrow: {
    fontSize: 16,
    color: '#999'
  }
});

export default ButtonPageViewDemo;
