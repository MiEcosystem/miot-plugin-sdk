import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar';
import MessageDialog from './Dialog/MessageDialog';
import LoadingDialog from './Dialog/LoadingDialog';
import { getSupportedDevicesWithLinkage, scan, addLinkage, removeLinkage } from '../device/interconnection';
import { adjustSize } from '../utils/sizes';
import { FontDefault } from '../utils/fonts';
import { strings as I18n } from '../resources/';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../utils/accessibility-helper';
export default class BTInterconnection extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <NavigationBar
          backgroundColor="#ffffff"
          type={NavigationBar.TYPE.LIGHT}
          left={[{
            key: NavigationBar.ICON.BACK,
            onPress: () => navigation.goBack()
          }]}
          title={navigation.getParam('title' || I18n.linkDevice)}
        />
      )
    };
  };
  navigationProps = {
    // 类别，比如sensor_ht 表示温湿度传感器，具体值可咨询米家相关产品
    category: '',
    // 是否要求同一个房间
    sameRoom: true,
    // rssi 阈值
    minRssi: -127,
    // 无障碍
    accessible: true,
    addAccessibilityHint: '',
    removeAccessibilityHint: ''
  };
  state = {
    // 0 - 初始化
    // 1 - 已拉取设备列表
    // 2 - 关联或解除关联确认弹窗
    // 3 - 扫描并关联中
    // 4 - 关联或解除关联失败
    status: 0,
    linkedIndex: -1,
    devices: [],
    message: ''
  };
  dialogButtons = [{
    text: I18n.cancel,
    callback: () => {
      this.setState({
        status: 1
      });
    }
  }, {
    text: I18n.ok,
    callback: () => {
      const { onConfirm } = this.state;
      if (typeof onConfirm === 'function') {
        onConfirm();
      }
    }
  }];
  timerToast = null;
  showToast = (message) => {
    this.setState({
      status: 4,
      message: message
    });
    this.timerToast && clearTimeout(this.timerToast);
    this.timerToast = setTimeout(() => {
      this.setState({
        status: 1,
        message: ''
      });
    }, 3e3);
  }
  scanListener = null;
  onDismiss = () => {
    this.setState({
      status: 1,
      message: ''
    });
  }
  getSupportedDevicesWithLinkage = () => {
    const { category, sameRoom } = this.navigationProps;
    getSupportedDevicesWithLinkage(category, sameRoom).then((devices) => {
      const linkedIndex = devices.findIndex((device) => {
        return device.linked;
      });
      this.setState({
        status: 1,
        linkedIndex,
        devices: devices
      });
    }).catch(() => {
      this.setState({
        status: 1,
        linkedIndex: -1,
        devices: []
      });
    });
  }
  tryToggleLinkage = (mac, pdid, linked) => {
    if (linked) {
      this.tryRemoveLinkage(mac);
      return;
    }
    this.tryAddLinkage(mac, pdid);
  }
  tryRemoveLinkage = (mac) => {
    this.setState({
      status: 2,
      message: I18n.removeLinkConfirm,
      onConfirm: () => {
        this.removeLinkage(mac);
      }
    });
  }
  removeLinkage = (mac) => {
    removeLinkage(mac).then(() => {
      this.setState(({ devices }) => {
        const linkedIndex = devices.findIndex(({ mac: rmac }) => {
          return mac === rmac;
        });
        return {
          status: 1,
          linkedIndex: -1,
          devices: [...devices.slice(0, linkedIndex), {
            ...devices[linkedIndex],
            linked: false
          }, ...devices.slice(linkedIndex + 1)],
          message: ''
        };
      });
    }).catch(() => {
      this.showToast(I18n.removeLinkFail);
    });
  }
  tryAddLinkage = (mac, pdid) => {
    const { category, sameRoom, minRssi } = this.navigationProps;
    this.setState({
      status: 2,
      message: I18n.linkConfirm,
      onConfirm: () => {
        this.setState({
          status: 3,
          message: I18n.linking,
          timeout: 6e4
        }, () => {
          this.addLinkage(mac, true);
        });
      }
    }, () => {
      this.scanListener && this.scanListener.remove();
      this.scanListener = scan({
        list: [{ mac, pdid }],
        category, sameRoom
      }, (devices) => {
        this.addLinkage(mac, false, devices && devices[0] ? devices[0].rssi : minRssi);
      }, () => {
        this.addLinkage(mac, false, minRssi);
      });
    });
  }
  addLinkageCache = {};
  addLinkage = (mac, clicked, rssi) => {
    const { minRssi } = this.navigationProps;
    let cache = this.addLinkageCache[mac];
    if (!cache) {
      cache = this.addLinkageCache[mac] = {
        clicked,
        rssi,
        hasRssi: !isNaN(rssi) && isFinite(rssi)
      };
      return;
    }
    if (clicked) {
      cache.clicked = true;
    }
    if (!isNaN(rssi) && isFinite(rssi)) {
      cache.rssi = parseInt(rssi);
      cache.hasRssi = true;
    }
    // 未点击或未获取rssi 时不处理
    if (!cache.clicked || !cache.hasRssi) {
      return;
    }
    // rssi 超过范围则报错
    if (cache.rssi - minRssi <= 0) {
      this.showToast(I18n.linkFail);
      this.addLinkageCache[mac] = null;
      return;
    }
    this.addLinkageCache[mac] = null;
    addLinkage(mac).then(() => {
      this.setState(({ devices }) => {
        const linkedIndex = devices.findIndex(({ mac: rmac }) => {
          return mac === rmac;
        });
        return {
          status: 1,
          linkedIndex,
          devices: [...devices.slice(0, linkedIndex), {
            ...devices[linkedIndex],
            linked: true
          }, ...devices.slice(linkedIndex + 1)]
        };
      });
    }).catch(() => {
      this.showToast(I18n.linkFain);
    });
  }
  componentDidMount() {
    const navigation = this.props.navigation;
    const category = navigation.getParam('category', '');
    const sameRoom = navigation.getParam('sameRoom', true);
    const minRssi = navigation.getParam('minRssi', -127);
    const accessible = navigation.getParam('accessible', true);
    const addAccessibilityHint = navigation.getParam('addAccessibilityHint', '');
    const removeAccessibilityHint = navigation.getParam('removeAccessibilityHint', '');
    this.navigationProps = {
      category, sameRoom, minRssi, accessible, addAccessibilityHint, removeAccessibilityHint
    };
    this.getSupportedDevicesWithLinkage();
  }
  componentWillUnmount() {
    this.scanListener && this.scanListener.remove();
    this.scanListener = null;
    this.timerToast && clearTimeout(this.timerToast);
    this.timerToast = null;
  }
  render() {
    const { status, linkedIndex, devices, message, timeout } = this.state;
    const { accessible, addAccessibilityHint, removeAccessibilityHint } = this.navigationProps;
    return (
      <ScrollView style={Styles.container}>
        {!status ? null : !devices.length ? (
          <Empty accessibility={{
            accessible
          }} />
        ) : (
          <List devices={linkedIndex !== -1 ? [devices[linkedIndex]] : devices} tryToggleLinkage={this.tryToggleLinkage} title={I18n.supportedLinkageDevices} tip={linkedIndex !== -1 ? I18n.linkageRemoveTip : I18n.linkageDistanceTip} accessibility={
            accessible,
            addAccessibilityHint,
            removeAccessibilityHint
          } />
        )}
        <MessageDialog messageStyle={{
          textAlign: 'center'
        }} visible={status === 2} message={message} onDismiss={this.onDismiss} buttons={this.dialogButtons} />
        <LoadingDialog visible={status === 3} message={message} onDismiss={this.onDismiss} timeout={timeout} />
        <Toast visible={status === 4} message={message} />
      </ScrollView>
    );
  }
}
function Toast({ visible, message }) {
  if (!visible || !message) {
    return null;
  }
  return (
    <View style={Styles.toastContainer}>
      <Text style={Styles.toastText}>{message}</Text>
    </View>
  );
}
Toast.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string
};
Toast.defaultProps = {
  visible: false,
  message: ''
};
// 无可关联设备，且无已关联设备
function Empty({ accessibility: { accessible } }) {
  return (
    <View style={Styles.emptyContainer}>
      <View style={Styles.emptyIconContainer}>
        <View style={[Styles.emptyIconSub, Styles.emptyIconSub1]}></View>
        <View style={[Styles.emptyIconSub, Styles.emptyIconSub2]}></View>
      </View>
      <View style={Styles.emptyTitleContainer} {...getAccessibilityConfig({
        accessible
      })}>
        <Text style={Styles.emptyTitle}>{I18n.noSuppurtedLinkageDevice}</Text>
      </View>
      <View style={Styles.emptyIntroContainer} {...getAccessibilityConfig({
        accessible
      })}>
        <Text style={Styles.emptyIntro}>{I18n.noSuppurtedLinkageTip}</Text>
      </View>
    </View>
  );
}
Empty.propTypes = {
  accessibility: {
    accessible: AccessibilityPropTypes.accessible
  }
};
// 有可关联设备，或已关联
function List({ title, tip, devices, tryToggleLinkage, accessibility }) {
  const listItems = getListItems(devices, tryToggleLinkage, accessibility);
  return (
    <View style={Styles.listContainer}>
      {title ? (
        <View style={Styles.listTitleContainer} {...getAccessibilityConfig({
          accessible: accessibility.accessible,
          accessibilityRole: AccessibilityRoles.text
        })}>
          <Text style={[Styles.listTitle, Styles.listTitleColor]}>{title}</Text>
        </View>
      ) : null}
      <View style={Styles.listItemsContainer}>
        {listItems}
      </View>
      {tip ? (
        <View style={Styles.listTitleContainer} {...getAccessibilityConfig({
          accessible: accessibility.accessible,
          accessibilityRole: AccessibilityRoles.text
        })}>
          <Text style={Styles.listTitle}>{tip}</Text>
        </View>
      ) : null}
    </View>
  );
}
List.propTypes = {
  title: PropTypes.string,
  tip: PropTypes.string,
  devices: PropTypes.arrayOf(PropTypes.shape({
    mac: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
    roomName: PropTypes.string,
    linked: PropTypes.bool
  })),
  tryToggleLinkage: PropTypes.func,
  accessibility: PropTypes.shape({
    accessible: AccessibilityPropTypes.accessible,
    addAccessibilityHint: AccessibilityPropTypes.accessibilityHint,
    removeAccessibilityHint: AccessibilityPropTypes.accessibilityHint
  })
};
function getListItems(devices, tryToggleLinkage, { accessible, addAccessibilityHint, removeAccessibilityHint }) {
  return devices.map(({ mac, roomName, linked, pdid, device: {
    iconURL, deviceIconReal, name
  } }) => {
    const icon = iconURL || deviceIconReal;
    return (
      <View key={mac} style={Styles.item}>
        {icon ? (
          <Image style={Styles.itemIcon} source={{
            uri: icon
          }} />
        ) : null}
        <View style={Styles.itemTextContainer} {...getAccessibilityConfig({
          accessible,
          accessibilityRole: AccessibilityRoles.text
        })}>
          <Text style={Styles.itemName} numberOfLines={1}>{name || mac}</Text>
          <Text style={Styles.itemRoom} numberOfLines={1}>{roomName}</Text>
        </View>
        <TouchableOpacity style={Styles.itemBtn} activeOpacity={0.8} onPress={() => {
          tryToggleLinkage(mac, pdid, linked);
        }} {...getAccessibilityConfig({
          accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityHint: linked ? removeAccessibilityHint : addAccessibilityHint
        })}>
          <Text style={Styles.itemBtnText}>{linked ? I18n.removeLink : I18n.link}</Text>
        </TouchableOpacity>
      </View>
    );
  });
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  emptyContainer: {
    flex: 1,
    marginTop: adjustSize(345)
  },
  emptyIconContainer: {
    alignSelf: 'center',
    width: adjustSize(288),
    height: adjustSize(288),
    borderWidth: adjustSize(6),
    borderColor: '#F55F54',
    borderRadius: adjustSize(144),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: adjustSize(108)
  },
  emptyIconSub: {
    width: adjustSize(105),
    height: adjustSize(12),
    backgroundColor: '#F55F54',
    borderRadius: adjustSize(6),
    position: 'absolute'
  },
  emptyIconSub1: {
    transform: [{
      rotate: '45deg'
    }]
  },
  emptyIconSub2: {
    transform: [{
      rotate: '-45deg'
    }]
  },
  emptyTitleContainer: {
    marginBottom: adjustSize(48),
    marginHorizontal: adjustSize(135)
  },
  emptyTitle: {
    fontFamily: FontDefault,
    fontSize: adjustSize(48),
    lineHeight: adjustSize(66),
    textAlign: 'center',
    color: '#000'
  },
  emptyIntroContainer: {
    marginHorizontal: adjustSize(135)
  },
  emptyIntro: {
    fontFamily: FontDefault,
    fontSize: adjustSize(39),
    lineHeight: adjustSize(66),
    textAlign: 'center',
    color: '#999'
  },
  listContainer: {
    flex: 1,
    marginTop: adjustSize(24)
  },
  listTitleContainer: {
    paddingVertical: adjustSize(54),
    paddingHorizontal: adjustSize(81)
  },
  listTitle: {
    fontFamily: FontDefault,
    fontSize: adjustSize(36),
    lineHeight: adjustSize(48),
    color: '#999'
  },
  listTitleColor: {
    color: '#8C93B0'
  },
  listItemsContainer: {
    paddingLeft: adjustSize(60),
    paddingRight: adjustSize(81)
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: adjustSize(216)
  },
  itemIcon: {
    width: adjustSize(168),
    height: adjustSize(168),
    marginRight: adjustSize(27),
    resizeMode: 'contain'
  },
  itemTextContainer: {
    flex: 1
  },
  itemName: {
    fontFamily: FontDefault,
    fontSize: adjustSize(48),
    color: '#000',
    lineHeight: adjustSize(66)
  },
  itemRoom: {
    fontFamily: FontDefault,
    fontSize: adjustSize(39),
    color: '#999',
    lineHeight: adjustSize(54)
  },
  itemBtn: {
    width: adjustSize(240),
    height: adjustSize(102),
    backgroundColor: 'rgba(50,186,192,0.1)',
    borderRadius: adjustSize(51),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: adjustSize(30)
  },
  itemBtnText: {
    fontFamily: FontDefault,
    fontSize: adjustSize(42),
    color: '#32BAC0',
    textAlign: 'center'
  },
  toastContainer: {
    position: 'absolute',
    bottom: adjustSize(258),
    maxWidth: adjustSize(900),
    alignSelf: 'center',
    paddingHorizontal: adjustSize(45),
    paddingVertical: adjustSize(27),
    borderRadius: adjustSize(36),
    borderWidth: adjustSize(1.5),
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: adjustSize(39),
      height: adjustSize(81)
    }
  },
  toastText: {
    fontFamily: FontDefault,
    fontSize: adjustSize(48),
    color: '#4C4C4C',
    textAlign: 'center'
  }
});