import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Radio from '../../../Radio';
import { AccessibilityPropTypes, getAccessibilityConfig } from '../../../../utils/accessibility-helper';
import { referenceReport } from '../../../../decorator/ReportDecorator';
import DynamicColor, { dynamicColor } from '../../../Style/DynamicColor';
import { FontMiSansWRegular } from '../../../../utils/fonts';
import { adjustSize } from '../../../../utils/sizes';
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
    onValueChange: () => {
    }
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
  };
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
  };
  render() {
    const { icon, title, disabled, isFirst, isLast } = this.props;
    const { checked } = this.state;
    return (
      <TouchableWithoutFeedback onPress={ () => {
        if (!disabled) {
          this.changeCheck();
        }
      } }>
        <View
          style={ [Styles.container,
            isFirst ? Styles.containerFirst : null,
            isLast ? Styles.containerLast : null
          ] }
          { ...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityLabel: this.props.accessibilityLabel,
            accessibilityHint: this.props.accessibilityHint
          }) }
          accessibilityActions={ [
            { name: 'activace' }
          ] }
          onAccessibilityAction={ this.onAccessibilityAction }
        >
          <View style={ Styles.iconContainer }>
            { icon ? <Image style={ [Styles.icon, disabled ? Styles.disabled : null] } source={ icon }/> : null }
            <View style={ [Styles.text, disabled ? Styles.disabled : null] }>
              <Text numberOfLines={ 3 } style={ Styles.title }>{ title }</Text>
            </View>
            <View style={ Styles.radioContainer }>
              <Radio isChecked={ checked } disabled={ disabled } changeCheck={ this.changeCheck }/>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const Styles = dynamicStyleSheet({
  container: {
    width: "100%",
    flexDirection: 'column',
    padding: 7,
    backgroundColor: new DynamicColor('#FFF', '#1A1A1A')
  },
  containerFirst: {
    borderTopLeftRadius: adjustSize(16),
    borderTopRightRadius: adjustSize(16)
  },
  containerLast: {
    borderBottomLeftRadius: adjustSize(16),
    borderBottomRightRadius: adjustSize(16)
  },
  disabled: {
    opacity: 0.3
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  radioContainer: {
    width: 52,
    alignItems: 'flex-end',
    marginTop: adjustSize(36),
    marginRight: adjustSize(36)
  },
  icon: {
    width: 56,
    height: 56,
    resizeMode: 'contain'
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 12
  },
  title: {
    fontFamily: FontMiSansWRegular,
    fontSize: 14,
    color: dynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)'),
    lineHeight: 32
  },
  checkbox: {
    width: adjustSize(66),
    height: adjustSize(66),
    borderRadius: adjustSize(33)
  }
});