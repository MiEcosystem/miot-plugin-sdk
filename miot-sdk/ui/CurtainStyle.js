import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import Radio from './Radio';
import { adjustSize } from '../utils/sizes';
import { FontDefault } from '../utils/fonts';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../utils/accessibility-helper';
export default class CurtainStyle extends Component {
  static propTypes = {
    icons: PropTypes.array,
    titles: PropTypes.arrayOf(PropTypes.string),
    ids: PropTypes.array,
    checkedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabels: PropTypes.arrayOf(AccessibilityPropTypes.accessibilityLabel),
    accessibilityHints: PropTypes.arrayOf(AccessibilityPropTypes.accessibilityHint)
  };
  onAccessibilityAction = ({ nativeEvent: { actionName } }, id) => {
    switch (actionName) {
      case 'activate':
        this.onCheckChange(id);
        break;
    }
  }
  getItems() {
    let { icons = [], titles = [], ids = [], checkedId, disabled, accessibilityLabels = [], accessibilityHints = [] } = this.props;
    return titles.map((_, index) => {
      let title = titles[index];
      let icon = icons[index];
      let id = ids[index];
      return (title && icon ? (
        <View key={index} style={Styles.item} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.checkbox,
          accessibilityLabel: accessibilityLabels[index],
          accessibilityHint: accessibilityHints[index],
          accessibilityState: {
            selected: checkedId === id,
            checked: checkedId === id,
            disabled
          }
        })} accessibilityActions={[
          { name: 'activate' }
        ]} onAccessibilityAction={(e) => {
          this.onAccessibilityAction(e, id);
        }}>
          <Image style={Styles.icon} source={icon} />
          <Text style={Styles.title}>{title}</Text>
          <Radio id={Number(id)} disabled={disabled} isChecked={checkedId === id} changeCheck={this.onCheckChange} bigCircleStyle={{
            width: adjustSize(60),
            height: adjustSize(60),
            borderWidth: adjustSize(12)
          }} checkedBigCircleStyle={{
            borderColor: '#f0f0f0',
            borderColorChecked: '#32BAC0'
          }} smallCircleBg="#fff" />
        </View>
      ) : null);
    });
  }
  onCheckChange = (id) => {
    let { onValueChange } = this.props;
    if (typeof onValueChange === 'function') {
      onValueChange(id);
    }
  }
  render() {
    let items = this.getItems();
    return (
      <View style={Styles.container}>
        {items}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
  },
  item: {
    marginTop: adjustSize(30),
    marginHorizontal: adjustSize(30),
    paddingLeft: adjustSize(57),
    paddingRight: adjustSize(60),
    paddingVertical: adjustSize(54),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  icon: {
    width: adjustSize(312),
    height: adjustSize(306),
    resizeMode: 'contain',
    marginRight: adjustSize(57)
  },
  title: {
    fontFamily: FontDefault,
    fontSize: adjustSize(45),
    color: '#000',
    flex: 1
  }
});