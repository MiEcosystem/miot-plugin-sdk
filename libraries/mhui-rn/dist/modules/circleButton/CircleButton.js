// @ts-nocheck

/* eslint-disable */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { Styles } from "./styles";
import { ColorGreen } from "../utils/colors";
export default class CircleButton extends Component {
  static defaultProps = {
    sizeLevel: 0,
    themeColor: '',
    offColor: '',
    disabled: false,
    showHighlight: false,
    selected: false,
    horizontal: false,
    onPress: () => {},
    title: '',
    icon: null,
    iconSelected: null,
    iconText: ''
  };
  state = {
    isPressing: false
  };
  onPress = () => {
    const {
      disabled,
      onPress
    } = this.props;

    if (disabled) {
      return;
    }

    onPress();
  };
  onPressIn = () => {
    const {
      showHighlight
    } = this.props;

    if (showHighlight) {
      this.setState({
        isPressing: true
      });
    }
  };
  onPressOut = () => {
    this.setState({
      isPressing: false
    });
  };

  render() {
    let {
      sizeLevel,
      selected,
      title,
      icon,
      iconSelected,
      iconText,
      themeColor,
      disabled,
      horizontal,
      offColor
    } = this.props;
    const {
      isPressing
    } = this.state;
    const containerSizeStyle = Styles[['container0', 'container1', 'container2', 'container3'][sizeLevel || 0]] || Styles.container0;
    const iconContainerSizeStyle = Styles[['iconContainer0', 'iconContainer1', 'iconContainer2', 'iconContainer3'][sizeLevel || 0]] || Styles.iconContainer0;
    selected = selected || isPressing;
    return <View style={StyleSheet.flatten([Styles.container, containerSizeStyle, horizontal ? Styles.containerHorizontal : null, disabled ? {
      opacity: 0.3
    } : null])}>
        <TouchableOpacity disabled={disabled} style={StyleSheet.flatten([Styles.iconContainer, iconContainerSizeStyle, selected ? {
        backgroundColor: themeColor || ColorGreen,
        borderColor: themeColor || ColorGreen
      } : offColor ? {
        backgroundColor: offColor,
        borderColor: offColor
      } : null, disabled ? Styles.iconContainerDisabled : null, disabled && selected ? Styles.iconContainerDisabledSelected : null])} activeOpacity={1} onPress={this.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
          {icon ? <Image style={StyleSheet.flatten([Styles.icon])} source={selected && !disabled ? iconSelected || iconSelected : icon} /> : <Text style={[Styles.iconText, selected && !disabled ? Styles.iconTextSelected : null]}>{iconText}</Text>}
        </TouchableOpacity>
        {title ? <Text style={StyleSheet.flatten([Styles.title, selected ? {
        color: themeColor || ColorGreen
      } : null, disabled ? Styles.titleDisabled : null, horizontal ? Styles.titleHorizontal : null])} numberOfLines={horizontal ? 2 : 1}>
            {title}

          </Text> : null}
      </View>;
  }

}