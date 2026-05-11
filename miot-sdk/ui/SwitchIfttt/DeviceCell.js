import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Radio from '../Radio';
import { AccessibilityPropTypes, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
import DynamicColor, { dynamicColor } from '../Style/DynamicColor';
import { FontMiSansWRegular } from '../../utils/fonts';
import { adjustSize } from '../../utils/sizes';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
export default class DeviceCell extends Component {
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
    referenceReport('DeviceCell');
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
    const { icon, title, disabled } = this.props;
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
          <View style={Styles.iconContainer}>
            {icon ? <Image style={[Styles.icon, disabled ? Styles.disabled : null]} source={icon} /> : null}
            <View style={Styles.radioContainer}>
              <Radio isChecked={checked} disabled={disabled} changeCheck={this.changeCheck} />
            </View>
          </View>
          <View style={[Styles.text, disabled ? Styles.disabled : null]}>
            <Text style={Styles.title}>{title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const Styles = dynamicStyleSheet({
  container: {
    width: adjustSize(495),
    flexDirection: 'column',
    paddingBottom: adjustSize(36),
    borderRadius: adjustSize(48),
    backgroundColor: new DynamicColor('#FFF', '#1A1A1A')
  },
  disabled: {
    opacity: 0.3
  },
  iconContainer: {
    height: adjustSize(204),
    width: '100%',
    flexDirection: 'row'
  },
  radioContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: adjustSize(36),
    marginRight: adjustSize(36)
  },
  icon: {
    marginLeft: adjustSize(24),
    marginTop: adjustSize(12),
    width: adjustSize(204),
    height: adjustSize(204),
    resizeMode: 'contain'
  },
  text: {
    flex: 1
  },
  title: {
    marginHorizontal: adjustSize(48),
    fontFamily: FontMiSansWRegular,
    fontSize: 13,
    color: dynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)'),
    lineHeight: 23
  },
  checkbox: {
    width: adjustSize(66),
    height: adjustSize(66),
    borderRadius: adjustSize(33)
  }
});