import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { AccessibilityPropTypes } from '../../utils/accessibility-helper';
// import { referenceReport } from '../../decorator/ReportDecorator';
import DynamicColor, { dynamicColor } from '../Style/DynamicColor';
import { FontMiSansWRegular } from '../../utils/fonts';
import { adjustSize } from '../../utils/sizes';
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
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    onValueChange: () => {}
  };
  changeCheck = (select, item) => {
    this.setState(() => {
      if (typeof this.props.onValueChange === 'function') {
        this.props.onValueChange(select, item);
      }
      return {
        selectedItem: select ? item : {}
      };
    });
  }
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      selectedItem: props.selectedItem
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      selectedItem: nextProps.selectedItem
    });
  }
  renderDeviceItems = () => {
    const { items } = this.props;
    const { selectedItem } = this.state;
    let index = 0;
    let groupItems = [];
    while (index < items.length) {
      groupItems.push(items.slice(index, index += 2));
    }
    return (
      <View>
        {
          groupItems.map((group, index1) => {
            return <View key={index1} style={Styles.sectionContainer}>
              {group.map((item, itemIndex) => {
                return <DeviceCell
                  key={`${ item.did }${ itemIndex }`}
                  title={item.deviceName}
                  icon={{ uri: item.iconUrl }}
                  checked={item.did === selectedItem?.did && item.memberId === selectedItem?.memberId}
                  onValueChange={(selected) => {
                    this.changeCheck(selected, item);
                  }}
                >
                </DeviceCell>;
              })}
              {
                /* 为使最后一行从左向右排，且与上行对齐，需要补齐空缺位置但不显示 */
                group.length % 2 !== 0 ? <View style={{
                  opacity: 0,
                  flex: 1
                }} key={index1}>
                  <DeviceCell
                    key={`empty${ index1 }`}
                    title={''}
                    icon={''}
                    checked={false}
                  >
                  </DeviceCell>
                </View> : null
              }
            </View>;
          })
        }
      </View>
    );
  }
  render() {
    const { title, disabled } = this.props;
    return (
      <View style={[Styles.container, disabled ? Styles.disabled : null]}>
        <View style={Styles.sectionHeader}>
          <Text style={Styles.title}>{title}</Text>
        </View>
        {this.renderDeviceItems()}
      </View>
    );
  }
}
const Styles = dynamicStyleSheet({
  container: {
    flexDirection: 'column',
    paddingBottom: adjustSize(36),
    borderRadius: adjustSize(36),
    marginHorizontal: adjustSize(30),
    backgroundColor: new DynamicColor('#F7F7F7', '#000')
  },
  sectionContainer: {
    marginTop: adjustSize(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  disabled: {
    opacity: 0.3
  },
  sectionHeader: {
    height: adjustSize(150),
    paddingHorizontal: adjustSize(42),
    justifyContent: 'center'
  },
  title: {
    fontFamily: FontMiSansWRegular,
    fontSize: 18,
    color: dynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)'),
    lineHeight: 28
  }
});