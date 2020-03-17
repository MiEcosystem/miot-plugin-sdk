import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {adjustSize} from '../utils/sizes';
export default class ImageHeader extends Component {
  static propTypes = {
    icon: PropTypes.any,
    iconStyle: PropTypes.any,
    containerStyle: PropTypes.any
  };
  render() {
    let {icon, iconStyle, containerStyle} = this.props;
    if(!icon) {
      return null;
    }
    return (
      <View style={[Styles.container, containerStyle]}>
        <Image style={[Styles.icon, iconStyle]} source={icon} />
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    paddingTop: adjustSize(210),
    paddingBottom: adjustSize(63),
    alignSelf: 'center',
    alignItems: 'center'
  },
  icon: {
    width: adjustSize(540),
    height: adjustSize(540)
  }
});