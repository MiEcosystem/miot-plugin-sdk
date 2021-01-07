import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import AbstractDialog from './AbstractDialog';
import ChoiceItemWithIcon from '../ListItem/ChoiceItemWithIcon';
import { AccessibilityPropTypes, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
/**
 * @description 类型
 * @enum {string}
 */
const TYPE = {
  /**
   * 单选
   */
  SINGLE: 'single',
  /**
   * 多选
   */
  MULTIPLE: 'multiple'
};
Object.freeze(TYPE);
export default class ChoiceDialogWithIcon extends Component {
  static propTypes = {
    animationType: PropTypes.string,
    type: PropTypes.oneOf([TYPE.SINGLE, TYPE.MULTIPLE]),
    maxSelected: PropTypes.number,
    visible: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape(ChoiceItemWithIcon.propTypes)),
    extraSubtitleStyle: PropTypes.object,
    selectedIndexArray: PropTypes.arrayOf(PropTypes.number),
    buttons: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.any,
      callback: PropTypes.func,
      backgroundColor: PropTypes.shape({
        bgColorNormal: PropTypes.string,
        bgColorPressed: PropTypes.string
      }),
      titleColor: PropTypes.string
    })),
    title: PropTypes.string,
    dialogStyle: PropTypes.object,
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible
  };
  static defaultProps = {
    type: TYPE.SINGLE,
    maxSelected: 1,
    options: [],
    selectedIndexArray: []
  };
  static TYPE = TYPE;
  UNSAFE_componentWillReceiveProps(newProps) {
    const selectedArray = Array.from({
      length: newProps.options.length
    }, (v, i) => newProps.selectedIndexArray.includes(i));
    this.setState({
      selectedArray
    });
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('ChoiceDialogWithIcon');
    this.state = {
      selectedArray: Array.from({
        length: props.options.length
      }, (v, i) => props.selectedIndexArray.includes(i))
    };
  }
  render() {
    if (!this.props.visible) {
      return null;
    }
    const { buttons = [] } = this.props;
    const copyButtons = buttons.map((button, index) => {
      return {
        ...button,
        callback: index === buttons.length - 1 ? () => {
          const callbackOrigin = button.callback;
          const selectedIndexArray = [];
          for (let i = 0; i < this.state.selectedArray.length; i++) {
            const item = this.state.selectedArray[i];
            if (item) {
              selectedIndexArray.push(i);
            }
          }
          callbackOrigin(selectedIndexArray);
        } : button.callback
      };
    });
    return (
      <AbstractDialog animationType={this.props.animationType} visible={this.props.visible} title={this.props.title} dialogStyle={this.props.dialogStyle} showButton={true} buttons={copyButtons} useNewTheme onDismiss={() => this.props.onDismiss()} {...getAccessibilityConfig({
        accessibilityLabel: this.props.accessible
      })}>
        <ScrollView style={Styles.container}>
          <View style={Styles.choices}>
            {this.props.options.map((option, index) => {
              return (
                <ChoiceItemWithIcon
                  key={(option.title || '') + index}
                  icon={option.icon}
                  title={option.title}
                  subtitle={option.subtitle}
                  extraSubtitle={option.extraSubtitle}
                  extraSubtitleStyle={option.extraSubtitleStyle || this.props.extraSubtitleStyle}
                  checked={this.state.selectedArray[index]}
                  disabled={option.disabled}
                  onValueChange={(checked) => {
                    this.onValueChange(checked, index);
                  }}
                  {...getAccessibilityConfig({
                    accessible: this.props.accessible,
                    accessibilityLabel: option.accessibilityLabel,
                    accessibilityHint: option.accessibilityHint
                  })}
                />
              );
            })}
          </View>
        </ScrollView>
      </AbstractDialog>
    );
  }
  onValueChange(checked, index) {
    const { type, options } = this.props;
    const { selectedArray } = this.state;
    const newSelectedArray = [...selectedArray];
    if (type === TYPE.MULTIPLE || (type === TYPE.SINGLE && !checked)) {
      newSelectedArray[index] = checked;
    } else {
      newSelectedArray.forEach((selected, i) => {
        if (options[i].disabled) {
          return;
        }
        newSelectedArray[i] = i === index;
      });
    }
    this.setState({
      selectedArray: newSelectedArray
    });
  }
}
const Styles = StyleSheet.create({
  container: {
    maxHeight: Dimensions.get('window').height - 250
  },
  choices: {
    marginLeft: 26,
    marginRight: 20,
    paddingBottom: 16
  }
});