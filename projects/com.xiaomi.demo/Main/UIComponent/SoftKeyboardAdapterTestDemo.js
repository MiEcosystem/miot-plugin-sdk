import React from 'react';

import {
  View,
  Text, TextInput, ScrollView, Platform
} from 'react-native';

import TitleBar from "miot/ui/TitleBar";
import Radio from 'miot/ui/Radio';
import {Host} from "miot";

export default class SoftKeyboardAdapterTestDemo extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      header:
        <TitleBar
          type='dark'
          title='输入法软键盘弹出适配测试'
          style={{backgroundColor: '#fff'}}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };

  constructor(props){
    super(props);

    this.state = {
      isStyle1Checked : true,
    };
  }

  componentWillMount() {
    // 默认为false， 当弹起软键盘，整个页面会移动
    // Host.pageShouldAdapterSoftKeyboard(false).then((res)=>{
    //   console.log("res", res)
    // }).catch((error)=>{
    //   console.log("error", error)
    // })

  }

  render() {

    // 如果不设置英文字体，那么外文字符串将显示不全（Android）
    let fontFamily = {};
    if (Platform.OS === 'android') fontFamily = { fontFamily: 'KMedium' }

    return (
      <View style={{flex:1, backgroundColor: '#eeeeee'}}>
        <View style={{height:50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:20}}>
          <Radio
            isChecked={this.state.isStyle1Checked}
            changeCheck={this.styleChecked}
            id={1}
            bigCircleStyle={{
              borderWidth: 2,
              width: 30,
              height: 30,
              borderRadius: 15
            }}
          />
          <Text style={[{color:'#333333'}, fontFamily]}>测试style-1</Text>
          <Radio
            style={{marginLeft: 20}}
            isChecked={!this.state.isStyle1Checked}
            changeCheck={this.styleChecked}
            id={2}
            bigCircleStyle={{
              borderWidth: 2,
              width: 30,
              height: 30,
              borderRadius: 15
            }}
          />
          <Text style={[{color:'#333333'}, fontFamily]}>测试style-2</Text>
        </View>
        {this.state.isStyle1Checked?this._renderStyle1():this._renderStyle2()}
      </View>
    )
  }

  _renderStyle1(){
    return(
      <View>
        <Text>软键盘弹窗适配测试1-该风格会导致整个界面上移</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <View style={{height:200, backgroundColor:'#abcaaa'}} />
        <View style={{height:200, backgroundColor:'#c13aaa'}} />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
      </View>
    );
  }

  _renderStyle2(){
    return(
      <View style={{flex:1}}>
        <Text>软键盘弹窗适配测试1-该风格只会滑动ScrollView部分</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <ScrollView style={{flex:1}}>
          <View>
            <View style={{height:200, backgroundColor:'#abcaaa'}} />
            <View style={{height:200, backgroundColor:'#c13aaa'}} />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            />
          </View>

        </ScrollView>
      </View>
    );
  }

  styleChecked = (id)=>{

    if(id === 1){
      Host.pageShouldAdapterSoftKeyboard(false).then((res)=>{
        console.log("res", res)
        this.setState({
          isStyle1Checked : true,
        })
      }).catch((error)=>{
        console.log("error", error)
      })

    }else{
      Host.pageShouldAdapterSoftKeyboard(true).then((res)=>{
        console.log("res", res)
        this.setState({
          isStyle1Checked : false,
        })
      }).catch((error)=>{
        console.log("error", error)
      })

    }

  }


}

