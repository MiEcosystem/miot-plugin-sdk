// @ts-nocheck

/* eslint-disable */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { adjustSize } from "../utils/sizes";
import GapWrap from "./GapWrap";
export default class ContainerWithShadowAndSeparator extends Component {
  static defaultProps = {
    containerStyle: {},
    separatorStyle: {},
    horizontal: false
  };
  state = {
    width: adjustSize(1020),
    height: adjustSize(240)
  };

  getContents() {
    const {
      children,
      separatorStyle,
      horizontal
    } = this.props;

    if (!children) {
      return null;
    }

    const type = horizontal ? 'column' : 'row';
    return (Array.isArray(children) ? children : [children]).filter(child => !!child).map((child, index) => <GapWrap key={index} hasSeparator={index > 0} horizontal={horizontal} separatorStyle={separatorStyle}>
        {child}
      </GapWrap>);
  }

  onLayout = e => {
    const {
      width,
      height
    } = e.nativeEvent.layout;
    this.setState({
      width,
      height
    });
  };

  render() {
    const contents = this.getContents();
    const {
      containerStyle,
      horizontal
    } = this.props;
    const {
      width,
      height
    } = this.state;

    if (!contents) {
      return null;
    }

    return <View style={[Styles.box, {
      height: height <= 1 ? 0 : height + adjustSize(9),
      overflow: 'visible'
    }]}>
        <BoxShadow setting={{
        width,
        height,
        color: '#000',
        border: adjustSize(9),
        radius: adjustSize(30),
        opacity: 0.015,
        x: 0,
        y: adjustSize(9),
        style: {
          position: 'absolute',
          top: 0,
          left: 0
        }
      }}>
          <View style={{}} />
        </BoxShadow>
        <View style={[Styles.container, horizontal ? Styles.containerHorizontal : Styles.containerVertical, containerStyle]} onLayout={this.onLayout}>
          {contents}
        </View>
      </View>;
  }

}
const Styles = StyleSheet.create({
  box: {
    position: 'relative'
  },
  container: {
    borderRadius: adjustSize(30),
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  containerHorizontal: {
    flexDirection: 'row'
  }
});