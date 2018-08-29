'use strict';

import React from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  ListView,
  View,
  AlertIOS,
  Slider,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  DeviceEventEmitter,
  PixelRatio,
} from 'react-native';
import { DeviceEvent, Device, Host } from "miot";
import { LoadingDialog } from "miot/ui";
import { RkSwitch } from 'react-native-ui-kitten';
import MHGlobalData from "./CommonComponents/MHGlobalData";
var LocalizedStrings = require('./CommonComponents/MHLocalizableString.js').string;

var setRingTimer = null;
var setLightTimer = null;
var setTimeTimer = null;
var ringOptions = [];

export default class MHSetting extends React.Component {
  constructor(props) {
    super(props);
    this.ringText = '动态铃声';
    this.volume = 50;
    this.light = true;
    this.time = true;
    this._createSectionData();
    this.state = {
      showLoading: false,
      sections: this.sections
    };
  }

  // 开关
  renderItemWithSwitch({ item, index, section }) {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View key={index} style={styles.rowContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <RkSwitch
            onTintColor="#5cbd56"
            value={item.value}
            onValueChange={item.func}
          />
        </View>
        <View style={styles.separator} />
      </View>
    )
  }

  // 滑动条
  renderItemWithSlider({ item, index, section }) {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View key={index} style={styles.rowContainer}>
          <Text style={[styles.title, { flex: 0 }]}>{item.title}</Text>
          <Slider
            style={{ flex: 1, marginLeft: 8 }}
            maximumValue={100}
            minimumValue={1}
            step={2}
            minimumTrackTintColor="#00bc9c"
            maximumTrackTintColor="#d9d9d9"
            value={item.value}
            onSlidingComplete={item.func}
          />
          <Text style={styles.volume}>{item.subTitle}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    )
  }

  // 普通
  renderItem({ item, index, section }) {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableHighlight
          key={index}
          underlayColor="rgb(235,235,236)"
          onPress={item.func}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.subtitle}>{item.subTitle ? item.subTitle : ''}</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    )
  }

  renderSectionHeader({ section: { title } }) {
    if (title) {
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      );
    }
  }

  ListFooterComponent() {
    return (
      <TouchableHighlight
        underlayColor='rgb(235,235,236)'
        style={{ marginVertical: 20 }}
        onPress={() => Host.ui.openDeleteDevice()}
        onLongPress={() => alert("插件版本号" + MHGlobalData.pluginVersion)}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.reset}>{LocalizedStrings.resetDevice}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  componentWillMount() {
    this._ringOptionsLoadedListener = DeviceEventEmitter.addListener("ringOptionsLoaded", (event) => {
      this._getRing();
    });
  }

  _loadRingOptionFail() {
    this.setState({ showLoading: false });
    // MHPluginSDK.dismissTips();
    ringOptions = [];
  }

  componentDidMount() {
    console.log("MHGlobalData", MHGlobalData);
    if (!MHGlobalData.ring) {
      this.setState({ showLoading: true });
      // MHPluginSDK.showLoadingTips(LocalizedStrings.loadingRingOptions);
      setTimeout(() => this._loadRingOptionFail(), 8000);
    } else {
      this._getRing();
    }
    this._getLightState();
    this._getHourlySystem();
    this._getVolume();
  }

  componentDidUnMount() {
    this._deviceNameChangedListener.remove();
    this._ringOptionsLoadedListener.remove();
  }

  _createSectionData() {
    // 所有的列表项数据，按照顺序排列
    var travelSetting = {
      title: LocalizedStrings.travelSetting,
      func: () => {
        this.props.navigation.navigate('TravelSetting');
      }
    };
    var defaultRing = {
      title: LocalizedStrings.defaultRing,
      subTitle: this.ringText,
      func: () => {
        this._openRing();
      }
    };
    var light = {
      title: LocalizedStrings.lightOnTop,
      value: this.light,
      func: () => {
        this._toggleLight();
      }
    };
    var time = {
      title: LocalizedStrings.timeSystem,
      value: this.time,
      func: () => {
        this._toggleTime();
      }
    };
    var volume = {
      title: LocalizedStrings.volume,
      subTitle: this.volume,
      value: this.volume,
      func: (volume) => {
        this._setVolume(volume);
      }
    };
    var deviceName = {
      title: LocalizedStrings.deviceName,
      subTitle: MHGlobalData.deviceName,
      func: () => {
        Host.ui.openChangeDeviceName();
      }
    };
    var locationManagement = {
      title: LocalizedStrings.locationManagement,
      func: () => {
        Host.ui.openRoomManagementPage();
      }
    };
    var shareDevice = {
      title: LocalizedStrings.shareDevice,
      func: () => {
        Host.ui.openShareDevicePage();
      }
    };
    var firmwareUpgrate = {
      title: LocalizedStrings.firmwareUpgrate,
      func: () => {
        Host.ui.openDeviceUpgradePage();
      }
    };
    var moreSetting = {
      title: LocalizedStrings.moreSetting,
      func: () => {
        Host.ui.openNewMorePage();
      }
    };
    var addToDesktop = {
      title: LocalizedStrings.addToDesktop,
      func: () => {
        Host.ui.openAddToDesktopPage();
      }
    };
    var bluetoothGateway = {
      title: LocalizedStrings.bluetoothGateway,
      func: () => {
        Host.ui.openBtGatewayPage();
      }
    };
    var licenseAndPolicy = {
      title: LocalizedStrings.licenseAndPolicy,
      func: () => {
        // const licenseURL = '';
        // const policyURL = '';
        Host.ui.privacyAndProtocolReview(LocalizedStrings.license,
          require('../Resources/raw/license_en.html'),
          // licenseURL,
          LocalizedStrings.policy,
          // policyURL);
          require('../Resources/raw/privacy_en.html'));
      }
    };

    this.sections = [
      {
        title: LocalizedStrings.featureSetting,
        data: [
          travelSetting,
          defaultRing
        ]
      },
      {
        title: "",
        data: [
          light,
          time
        ],
        renderItem: this.renderItemWithSwitch
      },
      {
        title: "",
        data: [
          volume
        ],
        renderItem: this.renderItemWithSlider
      },
      {
        title: LocalizedStrings.commonSetting,
        data: [
          deviceName,
          locationManagement,
          shareDevice,
          firmwareUpgrate,
          moreSetting,
          addToDesktop,
          bluetoothGateway,
          licenseAndPolicy,
        ]
      }
    ]
  }

  render() {
    return (
      <View>
        <LoadingDialog
          message={LocalizedStrings.loadingRingOptions}
          onDismiss={() => {
            console.log('onDismiss');
            this.setState({ showLoading: false });
          }}
          visible={this.state.showLoading} />
        <SectionList
          renderItem={this.renderItem}
          sections={this.sections}
          renderSectionHeader={this.renderSectionHeader}
          ListFooterComponent={this.ListFooterComponent}
          stickySectionHeadersEnabled={false}
        />
      </View>
    );
  }

  _openRing() {
    this.props.navigation.navigate(
      'Ring',
      {
        ringIndex: this.state.ringIndex ? this.state.ringIndex : 0, // 防止crash
        ringOptions: ringOptions ? ringOptions : [], // 防止crash
        setRing: (ringIndex) => this._setDefaultRingtone(ringIndex),
      }
    );
  }

  _getRing() {
    ringOptions = MHGlobalData.ring.alarm;
    Device.callMethod("get_ring", { "type": "alarm" }).then((json) => {
      console.log("获取默认铃声", json);
      var ringIndex = ringOptions.findIndex(item => item.name === json.result[0].ringtone);
      ringIndex = ringIndex === -1 ? 0 : ringIndex;
      this.ringText = ringOptions[ringIndex].title;
      this._createSectionData();
      this.setState({
        ringIndex: ringIndex,
        sections: this.sections,
      });
      MHGlobalData.ringIndex = ringIndex;// 保存在全局中，新建闹钟时使用
    }).catch((json) => {
      this.setState({
        ringIndex: 0,
        ringText: ringOptions[0].title,
      });
      MHGlobalData.ringIndex = 0;
    });
  }

  _getLightState() {
    Device.callMethod("get_enabled_key_light", []).then((json) => {
      console.log("获取指示灯状态", json);
      this.light = json.result.length > 0 ? true : false;
      this._createSectionData();
      this.setState({ sections: this.sections });
    }).catch((json) => {
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.fetchLightStatusFailure,
      )
    });
  }

  _getHourlySystem() {
    Device.callMethod("get_hourly_system", []).then((json) => {
      console.log("获取小时制", json);
      this.time = json.result[0] === 12 ? false : true;
      this._createSectionData();
      this.setState({ sections: this.sections });
    }).catch((json) => {
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.fetchTimeSystemFailure,
      )
    });
  }

  _getVolume() {
    Device.callMethod("get_volume", []).then((json) => {
      console.log("获取音量", json);
      this.volume = json.result[0];
      this._createSectionData();
      this.setState({ sections: this.sections });
    }).catch((json) => {
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.fetchVolumeFailure,
      )
    });
  }

  _toggleLight() {
    clearTimeout(setLightTimer);
    setLightTimer = null;
    var lightStatus = this.light;
    this.light = !lightStatus;
    this._createSectionData();
    this.setState({ sections: this.sections });
    let foo = () => {
      let method = lightStatus ? "disable_key_light" : "enable_key_light";
      Device.callMethod(method, []).then((json) => {
        console.log("更新指示灯状态", json);
      }).catch((json) => {
        this.light = lightStatus;
        this._createSectionData();
        this.setState({ sections: this.sections });
        AlertIOS.alert(
          LocalizedStrings.prompt,
          LocalizedStrings.updateLightStatusFailure,
        )
      });
    }
    setLightTimer = setTimeout(foo, 1000);
  }

  _toggleTime() {
    clearTimeout(setTimeTimer);
    setTimeTimer = null;
    var status = this.time;
    this.time = !status;
    this._createSectionData();
    this.setState({ sections: this.sections });
    let foo = () => {
      var params = [this.time ? 24 : 12];
      Device.callMethod("set_hourly_system", params).then((json) => {
        console.log("更新小时制", json);
      }).catch((json) => {
        this.time = status;
        this._createSectionData();
        this.setState({ sections: this.sections });
        AlertIOS.alert(
          LocalizedStrings.prompt,
          LocalizedStrings.updateTimeSystemFailure,
        )
      });
    }
    setTimeTimer = setTimeout(foo, 1000);
  }

  _setVolume(volume) {
    this.volume = volume;
    this._createSectionData();
    this.setState({ sections: this.sections });
    Device.callMethod("set_volume", [volume]).then((json) => {
      console.log("更新音量", json);
    }).catch((json) => {
      AlertIOS.alert(
        LocalizedStrings.prompt,
        LocalizedStrings.updateVolumeFailure,
      )
    });
  }

  _setDefaultRingtone(ringIndex) {
    clearTimeout(setRingTimer);
    setRingTimer = null;
    var params = {
      "type": "alarm",
      "ringtone": ringOptions[ringIndex].name,
      "smart_clock": ringOptions[ringIndex].sc ? 1 : 0,
    }
    let foo = () => {
      Device.callMethod("set_ring", params).then((json) => {
        console.log("设置默认铃声", json);
        this.ringText = ringOptions[ringIndex].title;
        this._createSectionData();
        this.setState({
          ringIndex: ringIndex,
          sections: this.sections,
        });
        MHGlobalData.ringIndex = ringIndex;// 保存在全局中，新建闹钟时使用
      }).catch((json) => {
        AlertIOS.alert(
          LocalizedStrings.prompt,
          LocalizedStrings.updateDefaultRingFailure,
        )
      });
    }
    setRingTimer = setTimeout(foo, 1000);
  }
};

var styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    height: 50,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    height: 30,
    backgroundColor: 'rgb(235,235,236)',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  reset: {
    fontSize: 16,
    flex: 1,
    color: 'rgb(251,0,0)',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    flex: 1,
    color: 'rgb(138,138,138)',
    textAlign: "right",
  },
  volume: {
    fontSize: 17,
    marginLeft: 19,
    color: '#00bc9c',
  },
  separator: {
    height: 1,
    backgroundColor: '#dfdfdf',
    marginLeft: 20,
  }
});