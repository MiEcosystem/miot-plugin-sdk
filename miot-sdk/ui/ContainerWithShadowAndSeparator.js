import React, {Component, PureComponent, Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {BoxShadow} from 'react-native-shadow';
import Separator from './Separator';
import {adjustSize} from '../utils/sizes';
class GapWrap extends Component {
  state = {
    shown: true
  };
  onLayout = (e) => {
    this.setState({
      shown: e.nativeEvent.layout.height > adjustSize(3.1)
    });
  }
  render() {
    let {hasSeparator, horizontal, separatorStyle, children} = this.props;
    let {shown} = this.state;
    if(!children) {
      return null;
    }
    return (
      <View onLayout={this.onLayout}>
        {hasSeparator && shown ? (
          <Separator style={[{height: Math.min(adjustSize(3), 1), opacity: 0.35, marginHorizontal: adjustSize(60)}, separatorStyle]} />
        ) : null}
        {children}
      </View>
    );
  }
}
export default class ContainerWithShadowAndSeparator extends Component {
  static propTypes = {
    containerStyle: PropTypes.any,
    separatorStyle: PropTypes.any,
    horizontal: PropTypes.bool
  };
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
    let {children, separatorStyle, horizontal} = this.props;
    if(!children) {
      return null;
    }
    let type = horizontal ? 'column' : 'row';
    return (Array.isArray(children) ? children : [children]).filter(child => {
      return !!child;
    }).map((child, index) => {
      return (
        <GapWrap key={index} hasSeparator={index > 0} horizontal={horizontal} separatorStyle={separatorStyle}>
          {child}
        </GapWrap>
      );
    });
  }
  onLayout = (e) => {
    let {width, height} = e.nativeEvent.layout;
    this.setState({
      width,
      height
    });
  }
  render() {
    let contents = this.getContents();
    let {containerStyle, horizontal} = this.props;
    let {width, height} = this.state;
    if(!contents) {
      return null;
    }
    return (
      <View style={[Styles.box, {
        height: height <=1 ? 0 : height + adjustSize(9),
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
          <View style={{}}></View>
        </BoxShadow>
        <View style={[Styles.container, horizontal ? Styles.containerHorizontal : Styles.containerVertical, containerStyle]} onLayout={this.onLayout}>
          {contents}
        </View>
      </View>
    );
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