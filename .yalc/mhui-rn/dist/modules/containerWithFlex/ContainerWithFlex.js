// @ts-nocheck

/* eslint-disable */
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ContainerWithFlex = props => <View style={Styles.container}>
    {props.children}
  </View>;

const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default ContainerWithFlex;