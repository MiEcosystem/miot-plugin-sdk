import React, {Component, PureComponent, Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
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
    let {hasSeparator, horizontal, children} = this.props;
    let {shown} = this.state;
    if(!children) {
      return null;
    }
    return (
      <View onLayout={this.onLayout}>
        {hasSeparator && shown ? (
          <Separator style={{height: adjustSize(3)}} />
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
        <GapWrap key={index} hasSeparator={index > 0} horizontal={horizontal}>
          {child}
        </GapWrap>
      );
    });
  }
  render() {
    let contents = this.getContents();
    let {containerStyle, horizontal} = this.props;
    if(!contents) {
      return null;
    }
    return (
      <View style={[Styles.container, horizontal ? Styles.containerHorizontal : Styles.containerVertical, containerStyle]}>
        {contents}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    borderRadius: adjustSize(30),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: adjustSize(9)
    },
    elevation: adjustSize(3)
  },
  containerHorizontal: {
    flexDirection: 'row'
  }
});