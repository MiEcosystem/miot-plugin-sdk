// @ts-nocheck

/* eslint-disable */
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
export default class Gap extends PureComponent {
  render() {
    const {
      height
    } = this.props;
    return <View style={[Styles.container, {
      height
    }]} />;
  }

}
const Styles = StyleSheet.create({});