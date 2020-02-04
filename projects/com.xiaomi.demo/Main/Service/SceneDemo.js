
import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView
} from 'react-native';
import Service from 'miot/Service';
import { Device, SceneType } from "miot";

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
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text style={[{ fontSize: 14, color: '#666666', marginLeft: 20, marginTop: 10 }, this.fontFamily]}>以下为跳转到米家APP提供的UI</Text>
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

          <Text style={[{ fontSize: 14, color: '#666666', marginLeft: 20, marginTop: 10 }, this.fontFamily]}>以下为非UI的API，存网络请求</Text>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._loadAutomaticScenes();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>加载此设备所有的自动场景</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._loadTimerScenes();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>加载此设备所有的定时场景</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._loadScenesHistoryForDevice();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>加载设备的智能日志信息</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._createTimerScene();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>创建定时场景</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._saveTimerScene();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>保存定时场景（修改后的）</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._reloadTimerScene();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>刷新场景（修改后的）</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._startTimerScene();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>启动场景</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._removeTimerScene();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>删除场景</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._removeErrorTimerScene();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>删除场景（报错）</Text>
          </TouchableOpacity>

          <Text style={[{ fontSize: 14, color: '#666666', marginLeft: 20, marginTop: 10 }, this.fontFamily]}>部分工具类API</Text>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              let params = {
                hour: 12,
                minute: 30,
                repeatType: 0,  // 0: 执行一次  1: 每天  2 :中国大陆法定工作日  3：中国大陆法定节假日  4: 自定义
                weekday: [true, true, false, false, true, true, true,],   // 只有repeatType为4的时候才有效
                on_filter: '', // 中国大陆法定工作日填cn_workday  中国大陆法定节假日填 cn_freeday 其他type不填
              }
              Service.scene.convertDateToCron(params)
                .then((res) => {
                  console.log(JSON.stringify(res));
                  alert(JSON.stringify(res))
                })
                .catch((error) => {
                  console.log(JSON.stringify(error));
                  alert(JSON.stringify(error))
                })
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>将时和分转化为cron表达式</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              let params = {
                'cron': '57 30 12 5 2 * 2020',
                'on_filter': '',    // 中国大陆法定工作日填cn_workday  中国大陆法定节假日填 cn_freeday 其他type不填
                'off_filter': ''
              }
              Service.scene.convertCronToDate(params)
                .then((res) => {
                  console.log(JSON.stringify(res));
                  alert(JSON.stringify(res))
                })
                .catch((error) => {
                  console.log(JSON.stringify(error));
                  alert(JSON.stringify(error))
                })
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>将cron表达式转化为时和分</Text>
          </TouchableOpacity>

        </ScrollView>

      </View >
    );
  }


  _openTimerSettingPageWithOptions() {
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

  _openCountDownPage() {
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
  _loadTimerScenes() {
    Service.scene.loadScenes(Device.deviceID, SceneType.Timer).then(scenes => {
      alert(JSON.stringify(scenes));
      this.scene = scenes[0];
    });
  }
  _loadAutomaticScenes() {

    // 如下方式 等价于 Service.scene.loadAutomaticScenes(Device.deviceID)

    Service.scene.loadScenes(Device.deviceID, SceneType.Automatic).then((scenes) => {
      console.log('scenes', scenes)
      if (scenes && scenes.length > 0) {
        let scene = {
          sceneID: scenes[0].sceneID,
          createTime: scenes[0].createTime,
          status: scenes[0].status,
          name: scenes[0].name,
          type: scenes[0].type,
        }
        alert(JSON.stringify(scene))
      } else {
        alert("该设备没有自动场景")
      }
    }).catch((error) => {
      console.log('error', error)
    })
  }

  _loadScenesHistoryForDevice() {
    Service.scene.loadScenesHistoryForDevice(Device.deviceID).then((res) => {
      alert(JSON.stringify(res));
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }
  _createTimerScene() {
    let params = { "identify": "identify_1", "setting": { "off_filter": "", "enable_timer": true, "enable_timer_on": true, "timer_type": "0", "on_time": "0 50 11 5 1 * 2020", "off_method": "power_off", "on_param": "on", "on_method": "power_on", "on_filter": "", "off_time": "0 40 10 5 1 * 2020", "off_param": "off", "enable_timer_off": false }, "name": "自定义场景名称" };
    this.scene = Service.scene.createTimerScene(Device.deviceID, params);
    alert(JSON.stringify(this.scene));
  }
  _saveTimerScene() {
    this.scene.identify = "newIdentify";
    this.scene.name = "newName";
    this.scene.save();
  }
  _reloadTimerScene() {
    this.scene.reload().then(res => {
      alert(JSON.stringify(res));
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }
  _startTimerScene() {
    this.scene.start().then(res => {
      alert(JSON.stringify(res));
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }
  _removeTimerScene() {
    if (!this.scene || !this.scene.remove) {
      alert("scene还没赋值，请确保‘加载此设备所有的定时场景有数据’");
      return;
    }
    this.scene.remove().then(res => {
      alert(JSON.stringify(res));
    }).catch(err => {
      alert(JSON.stringify(err));
    });
  }
  _removeErrorTimerScene() {
    if (!this.scene || !this.scene.remove) {
      alert("scene还没赋值，请确保‘加载此设备所有的定时场景有数据’");
      return;
    }
    this.scene.remove().then(res => {
      alert(JSON.stringify(res));
    }).catch(err => {
      alert("error" + JSON.stringify(err));
    });
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
  textStyle: {
    color: '#ffffff',
    fontSize: 14,
  }
});
