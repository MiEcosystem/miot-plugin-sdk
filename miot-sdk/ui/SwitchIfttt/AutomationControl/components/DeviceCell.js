import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Radio from '../../../Radio';
import { AccessibilityPropTypes, getAccessibilityConfig } from '../../../../utils/accessibility-helper';
import { referenceReport } from '../../../../decorator/ReportDecorator';
import DynamicColor, { dynamicColor } from '../../../Style/DynamicColor';
import { Fonts } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import { strings as I18n } from "../../../../resources";
import { colorToken } from 'mhui-rn/dist/hyperOS';
export default class DeviceCell extends Component {
  static propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    online: PropTypes.bool,
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
    const { icon, title, disabled, isFirst, isLast, online } = this.props;
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
              {!online && <Text numberOfLines={ 3 } style={ Styles.subTitle }>{ I18n.deviceOffline }</Text>}
            </View>
            <View style={ Styles.radioContainer }>
              <Radio
                isChecked={ checked }
                disabled={ disabled }
                changeCheck={ this.changeCheck }
                checkedBigCircleStyle={{
                  borderColorChecked: dynamicColor('#0CCE94', '#00BA7C'),
                  backgroundColorChecked: dynamicColor('#0CCE94', '#00BA7C'),
                  borderColor: dynamicColor('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.15)'),
                  backgroundColor: dynamicColor('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.15)')
                }}
                smallCircleBg={dynamicColor('#ffffff', '#FFFFFF')}
              />
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
    backgroundColor: colorToken.surfaceCardSubtle,
    minHeight: 70
  },
  containerFirst: {},
  containerLast: {},
  disabled: {
    opacity: 0.3
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 16
  },
  radioContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  icon: {
    width: 46,
    height: 46,
    margin: 5,
    resizeMode: 'contain'
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 12,
    paddingTop: 12,
    paddingBottom: 12
  },
  title: {
    ...Fonts.fontSystem16Regular,
    color: dynamicColor('#000000', '#FFFFFF'),
    lineHeight: 22
  },
  subTitle: {
    ...Fonts.fontSystem13Regular,
    color: dynamicColor('#CC9200', '#FFBF0F'),
    lineHeight: 18
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11
  }
});