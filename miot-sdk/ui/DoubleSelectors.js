import React, { Component, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import SelectorWithButton from './SelectorWithButton';
import ContainerWithShadowAndSeparator from './ContainerWithShadowAndSeparator';
import { adjustSize } from 'miot/utils/sizes';
/**
  * @deprecated
  */
export default class DoubleSelectors extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    disabled: PropTypes.bool,
    secondShow: PropTypes.bool,
    secondDisabled: PropTypes.bool,
    themeColor: PropTypes.any,
    first: PropTypes.shape({
      ...SelectorWithButton.propTypes
    }),
    second: PropTypes.shape({
      ...SelectorWithButton.propTypes
    }),
    hasShadow: PropTypes.bool
  };
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
    let {
      title, subtitle, themeColor, disabled, secondShow, secondDisabled, first, second, hasShadow
    } = this.props;
    let Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    return (
      <Wrap separatorStyle={Styles.separator}>
        <SelectorWithButton hasShadow={false} themeColor={themeColor} title={title} subtitle={subtitle} disabled={disabled} {...first} />
        {secondShow ? (
          <SelectorWithButton hasShadow={false} themeColor={themeColor} disabled={secondDisabled || disabled} {...second} />
        ) : null}
      </Wrap>
    );
  }
}
const Styles = StyleSheet.create({
  separator: {
    marginHorizontal: adjustSize(60)
  }
});