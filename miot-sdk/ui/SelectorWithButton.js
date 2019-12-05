//@native begin
import React, {Component, Fragment} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Switch from './Switch';
import CircleButton from './CircleButton';
import ContainerWithShadowAndSeparator from './ContainerWithShadowAndSeparator';
import {adjustSize} from '../utils/sizes';
import {NOOP, log, isSameArrayElements} from '../utils/fns';
import {FontLantingLight} from '../utils/fonts';
import {ColorGreen} from '../utils/colors';
export default class SelectorWithButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.oneOf([PropTypes.number, PropTypes.object]).required,
      iconSelected: PropTypes.oneOf([PropTypes.number, PropTypes.object]).required,
      title: PropTypes.string
    })),
    initSelectedIndexs: PropTypes.array,
    onSelected: PropTypes.func,
    disabled: PropTypes.bool,
    switchDisabled: PropTypes.bool,
    themeColor: PropTypes.any,
    horizontal: PropTypes.bool,
    separator: PropTypes.bool,
    sizeLevel: PropTypes.oneOf([0, 1, 2, 3, '']),
    multiple: PropTypes.bool,
    minSelected: PropTypes.number,
    maxSelected: PropTypes.number,
    showSwitch: PropTypes.bool,
    switchOn: PropTypes.bool,
    onSwitch: PropTypes.func,
    hasShadow: PropTypes.bool
  };
  static defaultProps = {
    title: '',
    items: [],
    initSelectedIndexs: [0],
    onSelected: NOOP,
    disabled: false,
    switchDisabled: false,
    themeColor: '',
    horizontal: false,
    separator: false,
    sizeLevel: '',
    multiple: false,
    minSelected: 1,
    maxSelected: Infinity,
    showSwitch: false,
    switchOn: true,
    onSwitch: log,
    hasShadow: true
  };
  state = {
    selectedIndexs: [0]
  };
  select = (index) => {
    let {disabled, switchDisabled, multiple, onSelected, minSelected, maxSelected} = this.props;
    if(disabled || switchDisabled) {
      return;
    }
    // this.setState(state => {
      let {selectedIndexs} = this.state;
      let selectedIndex = selectedIndexs.indexOf(index);
      let hasChanged = false;
      if(multiple) {
        if(selectedIndex === -1) {
          if(selectedIndexs.length < maxSelected) {
            selectedIndexs.push(index);
            hasChanged = true;
          }
        } else {
          if(selectedIndexs.length > minSelected) {
            selectedIndexs.splice(selectedIndex, 1);
            hasChanged = true;
          }
        }
      } else {
        if(selectedIndex === -1) {
          hasChanged = true;
          selectedIndexs = [index];
        }
      }
      if(hasChanged) {
        onSelected(selectedIndexs);
        // return {
        //   selectedIndexs: [...selectedIndexs]
        // };
      }
      return null;
    // });
  }
  getSelectors = () => {
    let {items, sizeLevel, themeColor, disabled, switchDisabled, horizontal, separator} = this.props;
    let {selectedIndexs} = this.state;
    let itemCount = items.length;
    sizeLevel = [0, 1, 2, 3].indexOf(sizeLevel) !== -1 ? sizeLevel : (itemCount <= 2 ? 0 : itemCount === 3 ? 1 : itemCount === 4 ? 2 : 3);
    return items.map((item, index) => {
      let selected = selectedIndexs.indexOf(index) !== -1;
      let isHorizontal = horizontal && itemCount === 2;
      let hasSeparator = isHorizontal && separator;
      let hideTitle = itemCount >= 5 || items.findIndex(item => {
        return item && item.icon;
      }) === -1;
      return (
        <Fragment key={index}>
          {hasSeparator && index > 0 ? (
            <View style={Styles.separator}></View>
          ) : null}
          <CircleButton sizeLevel={sizeLevel} horizontal={isHorizontal} themeColor={themeColor} disabled={disabled || switchDisabled} selected={selected} title={hideTitle ? '' : item.title} icon={item.icon} iconSelected={item.iconSelected} iconText={item.title || ''} onPress={() => {
            this.select(index)
          }} />
        </Fragment>
      );
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let {initSelectedIndexs: selectedIndexsProp} = nextProps;
    let {initSelectedIndexs: selectedIndexsState} = prevState;
    if(isSameArrayElements(selectedIndexsProp, selectedIndexsState)) {
      return null;
    }
    return {
      selectedIndexs: selectedIndexsProp
    };
  }
  render() {
    let {title, subtitle, items, hasShadow, showSwitch, disabled, switchOn, themeColor, onSwitch} = this.props;
    if(!items || !items.length) {
      return null;
    }
    let Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    return (
      <Wrap>
        <View style={Styles.container}>
        {title || subtitle || showSwitch ? (
          <View style={Styles.header}>
            {title || subtitle ? (
              <View style={Styles.titleContainer}>
                {title ? (
                  <Text style={Styles.title}>{title}</Text>
                ) : null}
                {title && subtitle ? (
                  <View style={Styles.titleSeparator}></View>
                ) : null}
                {subtitle ? (
                  <Text style={Styles.subtitle}>{subtitle}</Text>
                ) : null}
              </View>
            ) : null}
            {showSwitch ? (
              <Switch disabled={disabled} value={switchOn} onTintColor={themeColor || ColorGreen} onValueChange={onSwitch} />
            ) : null}
          </View>
        ) : null}
          <View style={[Styles.selectors, title || subtitle || showSwitch ? Styles.selectorWithHeader : null]}>
            {this.getSelectors()}
          </View>
        </View>
      </Wrap>
    );
  }
};
const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: adjustSize(60)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
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
    fontFamily: FontLantingLight,
    color: '#000'
  },
  titleSeparator: {
    width: 1,
    height: adjustSize(42),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: adjustSize(18)
  },
  subtitle: {
    fontSize: adjustSize(36),
    fontFamily: FontLantingLight,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  selectors: {
    paddingVertical: adjustSize(60),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  selectorWithHeader: {
    paddingTop: 0
  },
  separator: {
    width: 1,
    height: adjustSize(120),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginHorizontal: adjustSize(30)
  }
});
//@native end