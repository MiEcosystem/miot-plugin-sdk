import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default class CommonCell extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOn: false
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>
          { /*左边*/}
          <Text style={{ marginLeft: 8, fontFamily:'normal' }}>{this.props.title}</Text>
          { /*右边*/}
          {this.renderRightView()}
        </View>
      </TouchableOpacity>
    );
  }
  // cell右边显示的内容
  renderRightView() {
    // 判断
    if (this.props.isSwitch) {
      return (
        <Switch value={this.state.isOn == true} onValueChange={() => { this.setState({ isOn: !this.state.isOn }) }} style={{ marginRight: 8 }} />
      )
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* {this.rightTitle()} */}
          {/* <Image source={require('./../Source/common_arrow_right.png')} style={{ width: 8, height: 13, marginRight: 8 }} /> */}
        </View>
      )
    }
  }
  rightTitle() {
    if (this.props.rightTitle.length > 0) {
      return (
        <Text style={{ color: 'gray' }}>{this.props.rightTitle}</Text>
      )
    }
  }

};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: 'white',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    //设置主轴的对其方式
    justifyContent: 'space-between',
    //垂直居中
    alignItems: 'center'
  }
})
