
import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView
} from 'react-native';
import Service from 'miot/Service';
import {Device, SceneType} from "miot";

export default class MHSceneDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };

  }

  componentWillMount() {

    this.fontFamily = {};
    if (Platform.OS === 'android') {
      // 如果不设置英文字体，那么外文字符串将显示不全（Android）
      this.fontFamily = { fontFamily: 'Kmedium' }
    }
  }

  render() {

    return (
      <View style={{flex:1}}>
        <ScrollView>
          <Text style={[{fontSize: 14, color: '#666666', marginLeft: 20, marginTop: 10}, this.fontFamily]}>以下为跳转到米家APP提供的UI</Text>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              Service.scene.openIftttAutoPage();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>打开添加智能的页面(米家APP实现)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._openTimerSettingPageWithOptions();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>打开定时页面</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._openCountDownPage();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>打开倒计时页面</Text>
          </TouchableOpacity>

          <Text style={[{fontSize: 14, color: '#666666', marginLeft: 20, marginTop: 10}, this.fontFamily]}>以下为非UI的API，存网络请求</Text>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._loadAutomaticScenes();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>加载此设备所有的自动场景</Text>
          </TouchableOpacity>

        </ScrollView>

      </View>
    );
  }


  _openTimerSettingPageWithOptions(){
    let params = {
      onMethod: "power_on",
      onParam: "on",
      offMethod: "power_off",
      offParam: "off",
      timerTitle: "这是一个自定义标题",
      displayName: "自定义场景名称",
      identify: "identify_1",
      onTimerTips: '',
      offTimerTips: '定时列表页面、设置时间页面 关闭时间副标题（默认：关闭时间）',
      listTimerTips: '定时列表页面 定时时间段副标题（默认：开启时段）',
      bothTimerMustBeSet: false,
      showOnTimerType: true,
      showOffTimerType: false,
      showPeriodTimerType: false,
    }
    Service.scene.openTimerSettingPageWithOptions(params);
  }

  _openCountDownPage(){
    let params = {
      onMethod: "power_on",
      offMethod: 'power_off',
      onParam: 'on',
      offParam: 'off',
      identify: "custom",
      displayName: '自定义名称'
    }
    Service.scene.openCountDownPage(true, params);
  }

  _loadAutomaticScenes(){

    // 如下方式 等价于 Service.scene.loadAutomaticScenes(Device.deviceID)

    Service.scene.loadScenes(Device.deviceID, SceneType.Automatic).then((scenes)=>{
      console.log('scenes', scenes)
      if(scenes && scenes.length > 0){
        let scene = {
          sceneID: scenes[0].sceneID,
          createTime:scenes[0].createTime,
          status: scenes[0].status,
          name: scenes[0].name,
          type: scenes[0].type,
        }
        alert(JSON.stringify(scene))
      }else{
        alert("该设备没有自动场景")
      }
    }).catch((error)=>{
      console.log('error', error)
    })
  }

}

const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle:{
    color:'#ffffff',
    fontSize:14,
  }
});
