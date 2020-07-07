// @ts-nocheck

/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { adjustSize } from "../utils/sizes";
import SelectorWithButton from "../selectorWithButton";
import ContainerWithShadowAndSeparator from "../containerWithShadowAndSeparator";
export default class DoubleSelectors extends Component {
  static defaultProps = {
    title: '',
    subtitle: '',
    disabled: false,
    secondShow: true,
    secondDisabled: true,
    first: {
      items: []
    },
    second: {
      items: []
    },
    hasShadow: true
  };

  render() {
    const {
      title,
      subtitle,
      themeColor,
      disabled,
      secondShow,
      secondDisabled,
      first,
      second,
      hasShadow
    } = this.props;
    const Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    return <Wrap separatorStyle={Styles.separator}>
        <SelectorWithButton hasShadow={false} themeColor={themeColor} title={title} subtitle={subtitle} disabled={disabled} {...first} />
        {secondShow ? <SelectorWithButton hasShadow={false} themeColor={themeColor} disabled={secondDisabled || disabled} {...second} /> : null}
      </Wrap>;
  }

}
const Styles = StyleSheet.create({
  separator: {
    marginHorizontal: adjustSize(60)
  }
});