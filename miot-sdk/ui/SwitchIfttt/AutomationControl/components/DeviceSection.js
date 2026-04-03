import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { AccessibilityPropTypes } from '../../../../utils/accessibility-helper';
// import { referenceReport } from '../../decorator/ReportDecorator';
import DynamicColor, { dynamicColor } from '../../../Style/DynamicColor';
import { FontMiSansWRegular } from '../../../../utils/fonts';
import { adjustSize } from '../../../../utils/sizes';
import DeviceCell from './DeviceCell';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
export default class DeviceSection extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    items: PropTypes.array,
    selectedItem: PropTypes.object,
    disabled: PropTypes.bool,
    checkedColor: PropTypes.string,
    onValueChange: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint,
  };
  static defaultProps = {
    onValueChange: () => {
    },
  };
  changeCheck = (select, item) => {
    this.setState(() => {
      if (typeof this.props.onValueChange === 'function') {
        this.props.onValueChange(select, item);
      }
      return {
        selectedItem: select ? item : {},
      };
    });
  };
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      selectedItem: props.selectedItem,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      selectedItem: nextProps.selectedItem,
    });
  }
  renderDeviceItems = () => {
    const { items } = this.props;
    const { selectedItem } = this.state;
    return (
      <View>
        {
          items.map((item, index1) => {
            return (
              <View key={ index1 } style={ Styles.sectionContainer }>
                <DeviceCell
                  isFirst={ index1 === 0 }
                  isLast={ index1 === items.length - 1 }
                  key={ `${ item.did }${ index1 }` }
                  title={ item.deviceName }
                  online={ item.isOnline }
                  icon={ { uri: item.iconUrl } }
                  checked={ item.did === selectedItem?.did && item.memberId === selectedItem?.memberId }
                  onValueChange={ (selected) => {
                    this.changeCheck(selected, item);
                  } }
                >
                </DeviceCell>
              </View>
            );
          })
        }
      </View>
    );
  };
  render() {
    const { title, disabled } = this.props;
    return (
      <View style={ disabled ? Styles.disabled : null }>
        <View style={ Styles.sectionHeader }>
          <Text style={ Styles.title }>{ title }</Text>
        </View>
        <View style={ Styles.card }>
          { this.renderDeviceItems() }
        </View>
      </View>
    );
  }
}
const Styles = dynamicStyleSheet({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: new DynamicColor('#FFFFFF', 'rgba(255, 255, 255, 0.12)'),
  },
  sectionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  disabled: {
    opacity: 0.3,
  },
  sectionHeader: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 16,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FontMiSansWRegular,
    fontSize: 14,
    color: dynamicColor('#8C9DB0', '#92A1B4'),
    lineHeight: 20,
  },
});