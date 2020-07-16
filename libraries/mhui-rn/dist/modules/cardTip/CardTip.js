// @ts-nocheck

/* eslint-disable */
import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { adjustSize } from "../../utils/sizes";
import { Icons } from "../utils/Icons";
export default class CardTip extends PureComponent {
  state = {
    visible: true
  };
  hide = () => {
    const {
      disabled
    } = this.props;

    if (disabled) {
      return;
    }

    this.setState({
      visible: false
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps && nextProps.title && nextProps.icon ? {
      visible: true
    } : null;
  }

  render() {
    const {
      icon,
      title,
      closable,
      ...rest
    } = this.props;
    const {
      visible
    } = this.state;

    if (!visible || !icon && !title) {
      return null;
    }

    return <View style={Styles.container}>
        <CardButton icon={icon} iconStyle={Styles.icon} title={title} {...rest} />
        {closable ? <TouchableHighlight underlayColor="transparent" style={Styles.closeContainer} onPress={this.hide}>
            <Image source={Icons.close} style={Styles.close} />
          </TouchableHighlight> : null}
      </View>;
  }

}
const Styles = StyleSheet.create({
  icon: {
    width: adjustSize(120),
    height: adjustSize(120),
    resizeMode: 'contain'
  },
  closeContainer: {
    position: 'absolute',
    right: adjustSize(60),
    top: 0,
    height: '100%',
    justifyContent: 'center'
  }
});