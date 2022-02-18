import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Service from 'miot/Service';
import { Device, SceneType } from "miot";
import Logger from '../Logger';

export default class MHSceneDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <ScrollView style={{ width: '90%' }} showsVerticalScrollIndicator={false}>
          {
            [
              {
                title: '以下为跳转到米家APP提供的UI',
                items: [
                  [() => { Service.scene.openIftttAutoPage(); }, '打开添加智能的页面(米家APP实现)'],
                  [this._openTimerSettingPageWithOptions, '打开定时页面'],
                  [this._openCountDownPage, '打开倒计时页面']
                ]
              },
              {
                title: '以下为非UI的API，存网络请求',
                items: [
                  [this._loadAutomaticScenes, '加载此设备所有的自动场景'],
                  [this._loadAutomaticScenesV2, '加载此设备所有的自动场景V2'],
                  [this._loadTplScenesV2, '加载此设备相关的模板场景v2'],
                  [this._loadTimerScenes, '加载此设备所有的定时场景'],
                  [this._loadScenesHistoryForDevice, '加载设备的智能日志信息'],
                  [this._createTimerScene, '创建定时场景'],
                  [this._saveTimerScene, '保存定时场景（修改后的）'],
                  [this._reloadTimerScene, '刷新场景（修改后的）'],
                  [this._startTimerScene, '启动场景'],
                  [this._removeTimerScene, '删除场景'],
                  [this._removeErrorTimerScene, '删除场景（报错）']
                ]
              },
              {
                title: '部分工具类API',
                items: [
                  [(e) => {
                    let params = {
                      hour: 12,
                      minute: 30,
                      repeatType: 0, // 0: 执行一次  1: 每天  2 :中国大陆法定工作日  3：中国大陆法定节假日  4: 自定义
                      weekday: [true, true, false, false, true, true, true], // 只有repeatType为4的时候才有效
                      on_filter: '' // 中国大陆法定工作日填cn_workday  中国大陆法定节假日填 cn_freeday 其他type不填
                    };
                    Service.scene.convertDateToCron(params)
                      .then((res) => {
                        console.log(JSON.stringify(res));
                        alert(JSON.stringify(res));
                      })
                      .catch((error) => {
                        console.log(JSON.stringify(error));
                        alert(JSON.stringify(error));
                      });
                  }, '将时和分转化为cron表达式'],
                  [
                    (e) => {
                      let params = {
                        'cron': '57 30 12 5 2 * 2020',
                        'on_filter': '', // 中国大陆法定工作日填cn_workday  中国大陆法定节假日填 cn_freeday 其他type不填
                        'off_filter': ''
                      };
                      Service.scene.convertCronToDate(params)
                        .then((res) => {
                          console.log(JSON.stringify(res));
                          alert(JSON.stringify(res));
                        })
                        .catch((error) => {
                          console.log(JSON.stringify(error));
                          alert(JSON.stringify(error));
                        });
                    },
                    '将cron表达式转化为时和分']
                ]
              }
            ].map((section, index) => {
              return (
                <View style={{ marginTop: 15 }} key={index}>
                  <Text style={[styles.buttonText, { alignSelf: 'flex-start' }]} >{section.title}</Text>
                  {
                    section.items.map((item, index) => {
                      return (
                        <TouchableOpacity key={index} style={styles.button} onPress={() => {
                          item[0].bind(this)();
                          Logger.trace(this, item[0], { action: item[1] });
                        }}>
                          <Text style={styles.buttonText}>{item[1]}</Text>
                        </TouchableOpacity>
                      );
                    })
                  }
                </View>
              );
            })
          }
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
      showPeriodTimerType: false
    };
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
    };
    Service.scene.openCountDownPage(true, params);
  }

  _loadTimerScenes() {
    Service.scene.loadScenes(Device.deviceID, SceneType.Timer).then((scenes) => {
      alert(JSON.stringify(scenes));
      this.scene = scenes[0];
    });
  }

  _loadAutomaticScenes() {
    // 如下方式 等价于 Service.scene.loadAutomaticScenes(Device.deviceID)
    Service.scene.loadScenes(Device.deviceID, SceneType.Automatic).then((scenes) => {
      console.log('scenes', scenes);
      if (scenes && scenes.length > 0) {
        let scene = {
          sceneID: scenes[0].sceneID,
          createTime: scenes[0].createTime,
          status: scenes[0].status,
          name: scenes[0].name,
          type: scenes[0].type
        };
        alert(JSON.stringify(scene));
      } else {
        alert("该设备没有自动场景");
      }
    }).catch((error) => {
      console.log('error', error);
    });
  }

  _loadAutomaticScenesV2() {
    Device.getRoomInfoForCurrentHome().then((info) => {
      console.log("Info", info);
      const homeID = info.data.homeId;
      Service.sceneV2.loadSceneList(homeID, Device.deviceID).then((res) => {
        console.log(res);
        alert(JSON.stringify(res));
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  _loadTplScenesV2() {
    Device.getRoomInfoForCurrentHome().then((info) => {
      console.log("Info", info);
      const homeID = info.data.homeId;
      Service.sceneV2.loadTplSceneList(homeID, Device.deviceID).then((res) => {
        console.log(res);
        alert(JSON.stringify(res));
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  _loadScenesHistoryForDevice() {
    Service.scene.loadScenesHistoryForDevice(Device.deviceID).then((res) => {
      alert(JSON.stringify(res));
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  _createTimerScene() {
    let params = { "identify": "identify_1", "setting": { "off_filter": "", "enable_timer": true, "enable_timer_on": true, "timer_type": "0", "on_time": "0 50 11 5 1 * 2020", "off_method": "power_off", "on_param": "on", "on_method": "power_on", "on_filter": "", "off_time": "0 40 10 5 1 * 2020", "off_param": "off", "enable_timer_off": false }, "name": "自定义场景名称" };
    this.scene = Service.scene.createTimerScene(Device.deviceID, params);
    alert(JSON.stringify(this.scene));
  }

  _saveTimerScene() {
    if (!this.scene) {
      alert("scene还没赋值，请确保‘加载此设备所有的定时场景有数据’");
      return;
    }
    this.scene.identify = "newIdentify";
    this.scene.name = "newName";
    this.scene.save();
  }

  _reloadTimerScene() {
    if (!this.scene) {
      alert("scene还没赋值，请确保‘加载此设备所有的定时场景有数据’");
      return;
    }
    this.scene.reload().then((res) => {
      alert(JSON.stringify(res));
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  _startTimerScene() {
    if (!this.scene) {
      alert("scene还没赋值，请确保‘加载此设备所有的定时场景有数据’");
      return;
    }
    this.scene.start().then((res) => {
      alert(JSON.stringify(res));
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  _removeTimerScene() {
    if (!this.scene || !this.scene.remove) {
      alert("scene还没赋值，请确保‘加载此设备所有的定时场景有数据’");
      return;
    }
    this.scene.remove().then((res) => {
      alert(JSON.stringify(res));
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  _removeErrorTimerScene() {
    if (!this.scene || !this.scene.remove) {
      alert("scene还没赋值，请确保‘加载此设备所有的定时场景有数据’");
      return;
    }
    this.scene.remove().then((res) => {
      alert(JSON.stringify(res));
    }).catch((err) => {
      alert(`error${ JSON.stringify(err) }`);
    });
  }
}

const styles = StyleSheet.create({
  button: {
    color: '#000',
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  buttonText: {
    alignSelf: 'center',
    color: '#555',
    fontSize: 14,
    padding: 5
  }
});
