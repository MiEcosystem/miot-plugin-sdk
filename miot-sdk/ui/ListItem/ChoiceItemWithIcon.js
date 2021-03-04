import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Radio from '../Radio';
import { AccessibilityPropTypes, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
import { dynamicColor } from "../Style";
export default class ChoiceItemWithIcon extends Component {
  static propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    extraSubtitle: PropTypes.string,
    extraSubtitleStyle: PropTypes.object,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    checkedColor: PropTypes.string,
    onValueChange: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    onValueChange: () => {}
  };
  changeCheck = () => {
    this.setState((state) => {
      const checked = !state.checked;
      if (typeof this.props.onValueChange === 'function') {
        this.props.onValueChange(checked);
      }
      return {
        checked
      };
    });
  }
  constructor(props, ...rest) {
    super(props, ...rest);
    referenceReport('ChoiceItemWithIcon');
    this.state = {
      checked: props.checked
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked
    });
  }
  onAccessibilityAction = ({ nativeEvent: { actionName } }) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    if (actionName === 'activate') {
      this.changeCheck();
    }
  }
  render() {
    const { icon, title, subtitle, extraSubtitle, extraSubtitleStyle, disabled } = this.props;
    const { checked } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => {
        if (!disabled) {
          this.changeCheck();
        }
      }}>
        <View
          style={Styles.container}
          {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityLabel: this.props.accessibilityLabel,
            accessibilityHint: this.props.accessibilityHint
          })}
          accessibilityActions={[
            { name: 'activace' }
          ]}
          onAccessibilityAction={this.onAccessibilityAction}
        >
          <Image style={[Styles.icon, disabled ? Styles.disabled : null]} source={icon} />
          <View style={[Styles.text, disabled ? Styles.disabled : null]}>
            <Text style={Styles.title}>{title}</Text>
            {subtitle || extraSubtitle ? (
              <Text style={Styles.subtitles}>
                <Text style={Styles.subtitle}>{subtitle}{extraSubtitle ? ' | ' : ''}</Text>
                <Text style={[Styles.extraSubtitle, extraSubtitleStyle]}>{extraSubtitle}</Text>
              </Text>
            ) : null}
          </View>
          <Radio isChecked={checked} disabled={disabled} changeCheck={this.changeCheck} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14
  },
  disabled: {
    opacity: 0.3
  },
  icon: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    marginRight: 8
  },
  text: {
    flex: 1
  },
  title: {
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: 16,
    color: dynamicColor('#000', '#FFF'),
    lineHeight: 22
  },
  subtitles: {
    fontFamily: 'MILanPro--GB1-4',
    fontSize: 13,
    color: dynamicColor('#999', '#666'),
    lineHeight: 18
  },
  checkbox: {
    marginRight: 10,
    width: 22,
    height: 22,
    borderRadius: 11
  }
});