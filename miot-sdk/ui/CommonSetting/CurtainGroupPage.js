import React, { Component, Fragment } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';
import Device from '../../device/BasicDevice';
import Host from '../../Host';
import Service from '../../Service';
import NavigationBar from '../NavigationBar';
import ChoiceDialogWithIcon from '../Dialog/ChoiceDialogWithIcon';
import LoadingDialog from '../Dialog/LoadingDialog';
import MessageDialog from '../Dialog/MessageDialog';
import I18n from '../../resources/Strings';
import { adjustSize } from '../../utils/sizes';
import { dynamicStyleSheet } from '../Style/DynamicStyleSheet';
import DynamicColor from '../Style/DynamicColor';
import { DarkMode } from "../../index";
import SmartHomeInstance from '../../service/smarthome';
const SourceCurtainLeft = require('../../resources/images/curtain-left.png');
const SourceCurtainLeftDark = require('../../resources/images/curtain-left-dark.png');
const SourceCurtainRight = require('../../resources/images/curtain-right.png');
const SourceCurtainRightDark = require('../../resources/images/curtain-right-dark.png');
const SourceAdd = require('../../resources/images/add.png');
const SourceAddDark = require('../../resources/images/add-dark.png');
const SourceSwap = require('../../resources/images/refresh.png');
const SourceSwapDark = require('../../resources/images/refresh-dark.png');
export default class CurtainGroupPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <NavigationBar
          type={NavigationBar.TYPE.LIGHT}
          title={I18n.createCurtainGroup}
          style={{}}
          left={[{
            key: NavigationBar.ICON.BACK,
            onPress: () => {
              navigation.goBack();
            }
          }]}
        />
    };
  };
  state = {
    leftDid: '',
    leftName: '',
    rightDid: '',
    rightName: '',
    selectedSide: '',
    choices: [],
    // 0:不显示, 1:loading, 2: error
    layerType: 0
  };
  checkLoop;
  devicestatus;
  colorScheme = DarkMode.getColorScheme() || 'light';
  selectLeft = () => {
    this.setState({
      selectedSide: 'left'
    });
  }
  selectRight = () => {
    this.setState({
      selectedSide: 'right'
    });
  }
  swap = () => {
    const { leftName, rightName } = this.state;
    if (!leftName && !rightName) {
      return;
    }
    this.setState((state) => {
      return {
        leftDid: state.rightDid,
        leftName: state.rightName,
        rightDid: state.leftDid,
        rightName: state.leftName
      };
    });
  }
  actLeft = () => {
    this.act(this.state.leftDid);
  }
  actRight = () => {
    this.act(this.state.rightDid);
  }
  act = (did) => {
    console.log('act', did);
    Service.spec.getSpecByKey(did, { skey: 'identify', akey: 'identify' }).then((res) => {
      const { siid, aiid } = res[res.length - 1] || {};
      if (!siid || !aiid) {
        this.showError();
        return;
      }
      Service.spec.doAction({
        did,
        siid,
        aiid,
        in: []
      }).then((res) => {
        if (!res || res.code < 0) {
          this.showError();
          console.log('act:doAction:fail', res);
          return;
        }
        console.log('act:doAction:success', res);
      }).catch((e) => {
        this.showError();
        console.log('act:doAction:fail', e);
      });
    }).catch((e) => {
      this.showError();
      console.log('act:getSpecByKey:fail', e);
    });
  }
  create = () => {
    const { leftDid, rightDid } = this.state;
    const tags = {
      [leftDid]: "left",
      [rightDid]: "right"
    };
    Service.smarthome.createGroupDevice(I18n.curtain, [leftDid, rightDid], tags)
      .then((res) => {
        if (res && res.group_did) {
          console.log('createGroupDevice:success', res);
          this.checkLoop && clearInterval(this.checkLoop);
          this.checkLoop = setInterval(() => {
            SmartHomeInstance.getVirtualGroupSubDevices(res.group_did).then((res) => {
              this.devicestatus = true;
              for (let key of Object.keys(res[0].member_ship)) {
                if (res[0].member_ship[key] != '1') {
                  this.devicestatus = false;
                }
              }
              if (res[0].status == '1' && this.devicestatus) {
                Host.ui.openCurtainGroupNamePage(res[0].group_did, leftDid, rightDid);
                clearInterval(this.checkLoop);
              }
            }).catch((err) => {
              console.log('err', err);
            });
          }, 500);
          setTimeout(() => {
            this.checkLoop && clearInterval(this.checkLoop);
            this.showError();
          }, 500 * 20);
          return;
        }
        this.showError();
        console.log('createGroupDevice:fail', res);
      }).catch((e) => {
        this.showError();
        console.log('createGroupDevice:fail', e);
      });
  }
  cancel = () => {
    this.setState({
      selectedSide: '',
      layerType: 0
    });
  }
  showError = () => {
    this.setState({
      layerType: 2
    });
  }
  select = (selectedIndexs) => {
    this.setState(({ leftDid, rightDid, selectedSide, choices }) => {
      // todo: 计算出leftDid, rightDid 等数据
      const selectedLeftIndex = leftDid ? choices.findIndex(({ did }) => {
        return did === leftDid;
      }) : -1;
      const selectedRightIndex = rightDid ? choices.findIndex(({ did }) => {
        return did === rightDid;
      }) : -1;
      if (selectedSide === 'left') {
        const leftIndexs = selectedIndexs.filter((index) => {
          return index !== selectedRightIndex;
        });
        const leftIndex = leftIndexs.length > 0 ? leftIndexs[0] : -1;
        if (leftIndex >= 0) {
          return {
            selectedSide: '',
            leftDid: choices[leftIndex].did,
            leftName: choices[leftIndex].name
          };
        }
        return {
          selectedSide: '',
          leftDid: '',
          leftName: ''
        };
      }
      if (selectedSide === 'right') {
        const rightIndexs = selectedIndexs.filter((index) => {
          return index !== selectedLeftIndex;
        });
        const rightIndex = rightIndexs.length > 0 ? rightIndexs[0] : -1;
        if (rightIndex >= 0) {
          return {
            selectedSide: '',
            rightDid: choices[rightIndex].did,
            rightName: choices[rightIndex].name
          };
        }
        return {
          selectedSide: '',
          rightDid: '',
          rightName: ''
        };
      }
      return {
        selectedSide: ''
      };
    });
  }
  getChoices = () => {
    Host.ui.getDevicesWithModel(Device.model, true).then((res) => {
      console.log('getDevicesWithModel:success', res);
      const choices = [];
      let count = 0;
      let filtered = res.filter(({ isGrouped }) => {
        return !isGrouped;
      });
      let total = filtered.length;
      filtered.forEach((device) => {
        const { did } = device;
        Device.getRoomInfoForCurrentHome(did).then(({ code, data }) => {
          console.log('getRoomInfoForCurrentHome:success', code, data, device);
          if (code === 0) {
            choices.push({
              ...device,
              roomInfo: data
            });
          }
          count += 1;
          this.tryInitChoices(choices, count, total);
        }).catch((e) => {
          console.log('getRoomInfoForCurrentHome:fail', e, device);
          count += 1;
          this.tryInitChoices(choices, count, total);
        });
      });
    }).catch((e) => {
      this.showError();
      console.log('getDevicesWithModel:fail', e);
    });
  }
  tryInitChoices = (choices, count, total) => {
    if (count === total) {
      this.setState({
        choices
      });
    }
  }
  componentDidMount() {
    this.getChoices();
  }
  render() {
    const { leftDid, rightDid, leftName, rightName, selectedSide, choices, layerType } = this.state;
    const options = choices.map(({ deviceIconReal, name, isOnline, isGrouped, did, roomInfo: { roomName } }) => {
      return {
        icon: { uri: deviceIconReal },
        title: name,
        subtitle: `${ roomName }${ !isOnline ? ` | ${ I18n.offline }` : '' }`,
        extraSubtitle: did === Device.deviceID ? I18n.currentDevice : '',
        disabled: !isOnline || isGrouped || (selectedSide === 'left' && did === rightDid) || (selectedSide === 'right' && did === leftDid)
      };
    });
    const createDisabled = !leftDid || !rightDid;
    const selectedIndexArray = [];
    const selectedLeftIndex = leftDid ? choices.findIndex(({ did }) => {
      return did === leftDid;
    }) : -1;
    const selectedRightIndex = rightDid ? choices.findIndex(({ did }) => {
      return did === rightDid;
    }) : -1;
    if (selectedLeftIndex >= 0) {
      selectedIndexArray.push(selectedLeftIndex);
    }
    if (selectedRightIndex >= 0) {
      selectedIndexArray.push(selectedRightIndex);
    }
    return (
      <ScrollView style={Styles.container} contentContainerStyle={Styles.content} showsVerticalScrollIndicator={false}>
        <Text style={Styles.tip}>{I18n.createCurtainGroupTip}</Text>
        <View style={Styles.curtains}>
          <View style={Styles.curtain}>
            <TouchableOpacity style={[Styles.curtainIcon, selectedSide === 'left' ? Styles.curtainIconSelected : null]} activeOpacity={0.8} onPress={this.selectLeft}>
              <View style={Styles.curtainIconInner}>
                {leftDid ? (
                  <Image style={Styles.curtainImg} source={this.colorScheme === 'light' ? SourceCurtainLeft : SourceCurtainLeftDark} />
                ) : (
                  <Image style={Styles.add} source={this.colorScheme === 'light' ? SourceAdd : SourceAddDark} />
                )}
              </View>
            </TouchableOpacity>
            {leftDid ? (
              <Fragment>
                <Text style={Styles.curtainName} numberOfLines={1}>{leftName}</Text>
                <TouchableOpacity style={Styles.curtainAction} activeOpacity={0.8} onPress={this.actLeft}>
                  <Text style={Styles.curtainActionText}>{I18n.act}</Text>
                </TouchableOpacity>
              </Fragment>
            ) : null}
          </View>
          <TouchableOpacity style={Styles.swapWrap} activeOpacity={0.8} onPress={this.swap}>
            <Image style={Styles.swap} source={this.colorScheme === 'light' ? SourceSwap : SourceSwapDark} />
          </TouchableOpacity>
          <View style={Styles.curtain}>
            <TouchableOpacity style={[Styles.curtainIcon, selectedSide === 'right' ? Styles.curtainIconSelected : null]} activeOpacity={0.8} onPress={this.selectRight}>
              <View style={Styles.curtainIconInner}>
                {rightDid ? (
                  <Image style={Styles.curtainImg} source={this.colorScheme === 'light' ? SourceCurtainRight : SourceCurtainRightDark} />
                ) : (
                  <Image style={Styles.add} source={this.colorScheme === 'light' ? SourceAdd : SourceAddDark} />
                )}
              </View>
            </TouchableOpacity>
            {rightDid ? (
              <Fragment>
                <Text style={Styles.curtainName} numberOfLines={1}>{rightName}</Text>
                <TouchableOpacity style={Styles.curtainAction} activeOpacity={0.8} onPress={this.actRight}>
                  <Text style={Styles.curtainActionText}>{I18n.act}</Text>
                </TouchableOpacity>
              </Fragment>
            ) : null}
          </View>
        </View>
        <View style={Styles.btns}>
          <TouchableOpacity style={[Styles.btn, createDisabled ? Styles.btnDisabled : null]} activeOpacity={0.8} disabled={createDisabled} onPress={this.create}>
            <Text style={Styles.btnText}>{I18n.create}</Text>
          </TouchableOpacity>
        </View>
        <ChoiceDialogWithIcon
          type={ChoiceDialogWithIcon.TYPE.SINGLE}
          visible={options.length >= 2 && !!selectedSide}
          options={options}
          selectedIndexArray={selectedIndexArray}
          title={I18n.chooseCurtainGroupTitle}
          extraSubtitleStyle={Styles.extraSubtitle}
          buttons={[{
            text: I18n.cancel,
            callback: this.cancel
          }, {
            text: I18n.ok,
            callback: this.select
          }]}
          onDismiss={this.cancel}
        />
        {(options.length < 2 && selectedSide) ? (<MessageDialog
          visible={true}
          message={I18n.noCurtainGroupTip}
          buttons={[{
            text: I18n.ok,
            callback: this.cancel
          }]}
        />) : null}
        {layerType === 2 ? (<LoadingDialog
          visible={true}
          message={I18n.error}
          timeout={3000}
          onDismiss={this.cancel}
        />) : null}
      </ScrollView>
    );
  }
}
const Styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicColor('#FFFFFF', '#000000')
  },
  content: {
    flex: 1,
    backgroundColor: new DynamicColor('#FFFFFF', '#000000')
  },
  tip: {
    marginHorizontal: adjustSize(81),
    marginTop: adjustSize(81),
    paddingTop: adjustSize(30),
    paddingBottom: adjustSize(54),
    fontFamily: 'MILanPro--GB1-4',
    fontSize: adjustSize(36),
    lineHeight: adjustSize(48),
    color: new DynamicColor('#999', '#666')
  },
  curtains: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: adjustSize(52),
    paddingTop: adjustSize(39)
  },
  curtain: {
    width: adjustSize(450) - 3,
    alignItems: 'center'
  },
  curtainIcon: {
    width: '100%',
    height: adjustSize(354),
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: adjustSize(48),
    justifyContent: 'center',
    alignItems: 'center'
  },
  curtainIconSelected: {
    borderColor: new DynamicColor('#32BAC0', '#25A9AF')
  },
  curtainIconInner: {
    width: adjustSize(426),
    height: adjustSize(330),
    borderRadius: adjustSize(36),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: new DynamicColor('#F7F7F7', '#1A1A1A')
  },
  curtainImg: {
    width: adjustSize(378),
    height: adjustSize(312),
    resizeMode: 'contain'
  },
  curtainImgRight: {
    transform: [
      { scaleX: -1 }
    ]
  },
  curtainName: {
    marginTop: adjustSize(36),
    fontFamily: 'MILanPro--GB1-4',
    fontSize: adjustSize(42),
    lineHeight: adjustSize(57),
    color: new DynamicColor('#000', '#FFF')
  },
  curtainAction: {
    minWidth: adjustSize(240),
    height: adjustSize(102),
    paddingHorizontal: adjustSize(30),
    borderRadius: adjustSize(51),
    marginTop: adjustSize(30),
    backgroundColor: new DynamicColor('rgba(50,186,192,0.10)', 'rgba(37,169,175,0.30)'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  curtainActionText: {
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: adjustSize(39),
    lineHeight: adjustSize(54),
    color: new DynamicColor('#32BAC0', '#25A9AF')
  },
  add: {
    width: adjustSize(48),
    height: adjustSize(48),
    resizeMode: 'contain'
  },
  swapWrap: {
    width: adjustSize(75),
    height: adjustSize(75),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: adjustSize(135)
  },
  swap: {
    width: adjustSize(48),
    height: adjustSize(48),
    resizeMode: 'contain'
  },
  btns: {
    marginHorizontal: adjustSize(81),
    marginBottom: adjustSize(81),
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    height: adjustSize(138),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: adjustSize(69),
    backgroundColor: new DynamicColor('#32BAC0', '#25A9AF')
  },
  btnDisabled: {
    opacity: 0.3
  },
  btnText: {
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: adjustSize(48),
    lineHeight: adjustSize(66),
    color: '#fff',
    textAlign: 'center'
  },
  extraSubtitle: {
    color: new DynamicColor('#32BAC0', '#25A9AF')
  }
});