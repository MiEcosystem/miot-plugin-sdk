// @ts-nocheck

/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { ConfigContext } from "../../components/configProvider";
import Switch from "../../components/switch/Switch";
import CircleButton from "../circleButton/CircleButton";
import ContainerWithShadowAndSeparator from "../containerWithShadowAndSeparator/ContainerWithShadowAndSeparator";
import { adjustSize } from "../utils/sizes";
import { NOOP, log } from "../utils/fns";
import { FontDefault } from "../utils/fonts";
import { ColorGreen } from "../utils/colors";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
export default class MultiButtons extends Component {
  static contextType = ConfigContext;
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.oneOf([PropTypes.number, PropTypes.object]).required,
      iconSelected: PropTypes.oneOf([PropTypes.number, PropTypes.object]).required,
      title: PropTypes.string,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    switchDisabled: PropTypes.bool,
    themeColor: PropTypes.any,
    showSwitch: PropTypes.bool,
    switchOn: PropTypes.bool,
    onSwitch: PropTypes.func,
    hasShadow: PropTypes.bool,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    title: '',
    items: [],
    onClick: NOOP,
    disabled: false,
    switchDisabled: false,
    themeColor: '',
    showSwitch: false,
    switchOn: true,
    onSwitch: log,
    hasShadow: true
  };
  state = {
    activeIndex: -1
  };
  onClick = index => {
    let {
      onClick
    } = this.props;

    if (typeof onClick === 'function') {
      onClick(index);
    }
  };

  getSizeLevel(items) {
    let itemCount = items.length;
    return itemCount <= 2 ? 0 : itemCount === 3 ? 1 : itemCount === 4 ? 2 : 3;
  }

  getSelectors = () => {
    let {
      items,
      themeColor,
      disabled,
      switchDisabled
    } = this.props;
    let itemCount = items.length;
    let sizeLevel = this.getSizeLevel(items);
    return items.map((item, index) => {
      let isHorizontal = itemCount === 2;
      let hasSeparator = isHorizontal;
      let hideTitle = itemCount >= 5 || items.findIndex(item => {
        return item && item.icon;
      }) === -1 || itemCount >= 3 && this.context.language !== 'zh';
      return <Fragment key={index}>
          {hasSeparator && index > 0 ? <View style={Styles.separator}></View> : null}
          <CircleButton sizeLevel={sizeLevel} horizontal={isHorizontal} themeColor={themeColor} disabled={disabled || switchDisabled} showHighlight={true} title={hideTitle ? '' : item.title} icon={item.icon} iconSelected={item.iconSelected} iconText={item.title || ''} onPress={() => {
          this.onClick(index);
        }} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityLabel: item.accessibilityLabel,
          accessibilityHint: item.accessibilityHint
        })} />
        </Fragment>;
    });
  };

  render() {
    let {
      title,
      items,
      hasShadow,
      showSwitch,
      disabled,
      switchOn,
      themeColor,
      onSwitch
    } = this.props;

    if (!items || !items.length) {
      return null;
    }

    let Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    let sizeLevel = this.getSizeLevel(items);
    return <Wrap>
        <View style={Styles.container}>
          {title || showSwitch ? <View style={[Styles.header, disabled ? {
          opacity: 0.3
        } : null]} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: showSwitch ? AccessibilityRoles.switch : AccessibilityPropTypes.text,
          accessibilityLabel: this.props.accessibilityLabel,
          accessibilityHint: this.props.accessibilityHint,
          accessibilityState: showSwitch ? {
            disabled,
            checked: switchOn
          } : {
            disabled
          }
        })}>
              {title ? <View style={Styles.titleContainer}>
                  <Text style={Styles.title}>{title}</Text>
                </View> : null}
              {showSwitch ? <Switch disabled={disabled} value={switchOn} onTintColor={themeColor || ColorGreen} onValueChange={onSwitch} {...getAccessibilityConfig({
            accessible: false
          })} /> : null}
            </View> : null}
          <View style={[Styles.selectors, title || showSwitch ? Styles.selectorsWithHeader : null, items.length >= 4 ? null : [Styles.selectorsPadding0, Styles.selectorsPadding1, Styles.selectorsPadding2, Styles.selectorsPadding3][sizeLevel]]}>
            {this.getSelectors()}
          </View>
        </View>
      </Wrap>;
  }

}
const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: adjustSize(60)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between' // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.15)'

  },
  titleContainer: {
    flex: 1,
    height: adjustSize(156),
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: adjustSize(42),
    fontFamily: FontDefault,
    color: '#000'
  },
  selectors: {
    paddingVertical: adjustSize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectorsWithHeader: {
    paddingTop: 0
  },
  selectorsPadding0: {
    paddingHorizontal: adjustSize(0)
  },
  selectorsPadding1: {
    paddingHorizontal: adjustSize(78)
  },
  selectorsPadding2: {
    paddingHorizontal: adjustSize(0)
  },
  selectorsPadding3: {
    paddingHorizontal: adjustSize(0)
  },
  selectorWithHeader: {
    paddingTop: 0
  },
  separator: {
    width: 1,
    height: adjustSize(120),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginHorizontal: adjustSize(60)
  }
}); // @native end