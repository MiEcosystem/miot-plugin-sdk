/**
* react-native-check-box
* Checkbox component for react native, it works on iOS and Android
* https://github.com/crazycodeboy/react-native-check-box
* Email:crazycodeboy@gmail.com
* Blog:http://jiapenghui.com
* @flow
*/

import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types';


export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.isChecked,
      widthAnim: new Animated.Value(0),
    }
  }

  static propTypes = {
    ...View.propTypes,
    leftText: PropTypes.string,
    leftTextView: PropTypes.element,
    rightText: PropTypes.string,
    leftTextStyle: Text.propTypes.style,
    rightTextView: PropTypes.element,
    rightTextStyle: Text.propTypes.style,
    checkedImage: PropTypes.element,
    unCheckedImage: PropTypes.element,
    onClick: PropTypes.func.isRequired,
    isChecked: PropTypes.bool,
  }
  static defaultProps = {
    isChecked: false,
    leftTextStyle: {},
    rightTextStyle: {}
  }

  componentDidMount() {
    Animated.timing(
      this.state.widthAnim,
      {
        toValue: 32,
        duration: 150,
      }
    ).start();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isChecked: nextProps.isChecked });
  }

  _renderLeft() {
    if (this.props.leftTextView) return this.props.leftTextView;
    if (!this.props.leftText) return null;
    return (
      <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
    )
  }
  _renderRight() {
    if (this.props.rightTextView) return this.props.rightTextView;
    if (!this.props.rightText) return null;
    return (
      <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
    )
  }

  _renderImage() {
    if (this.state.isChecked) {
      return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage();
    } else {
      return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage();
    }
  }

  genCheckedImage() {
    var source = this.state.isChecked ? require('../../Resources/list_icon_selected_01.png') : require('../../Resources/list_icon_selected_02.png');

    return (
      <Image style={{ width: 20, height: 20 }} source={source} />
    )
  }

  onClick() {
    this.setState({
      isChecked: !this.state.isChecked
    })
    this.props.onClick();
  }

  render() {
    return (
      <Animated.View style={{ width: this.state.widthAnim }}>
        <TouchableHighlight
          style={this.props.style}
          onPress={() => this.onClick()}
          underlayColor='transparent'
        // hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
        >
          <View
            style={styles.container}>
            {/* {this._renderLeft()} */}
            {this._renderImage()}
            {/* {this._renderRight()} */}
          </View>
        </TouchableHighlight>
      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftText: {
    flex: 1,
  },
  rightText: {
    flex: 1,
    marginLeft: 10
  }
})
