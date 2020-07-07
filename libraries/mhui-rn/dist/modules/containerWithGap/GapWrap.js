// @ts-nocheck

/* eslint-disable */
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
export default class GapWrap extends PureComponent {
  state = {
    shown: true
  };
  onLayout = e => {
    this.setState({
      shown: e.nativeEvent.layout.height > 0
    });
  };

  render() {
    const {
      gap,
      horizontal,
      children
    } = this.props;
    const {
      shown
    } = this.state;

    if (!children) {
      return null;
    }

    const gapSize = shown ? gap : 0;
    return <>
        <View style={horizontal ? {
        flex: 1
      } : null} onLayout={this.onLayout}>
          {children}
        </View>
        <View style={[StylesGap.gap, {
        [horizontal ? 'width' : 'height']: gapSize
      }]} />
      </>; // return (
    //   <View style={[StylesGap.container, {
    //     [horizontal ? 'marginRight' : 'marginBottom']: gapSize
    //   }, horizontal ? {
    //     flex: 1
    //   } : null]} onLayout={this.onLayout}>
    //     {children}
    //   </View>
    // );
  }

}
const StylesGap = StyleSheet.create({
  gap: {
    alignSelf: 'stretch'
  }
});