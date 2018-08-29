'use strict';

import React from 'react';

import {
  ScrollView,
  StatusBar,
  Modal,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

import { MessageDialog } from "miot/ui";
import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString').string;
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const ratioW = (screenWidth / (698 + 2 * 26));
const homeTextDefault = LocalizedStrings.homePlaceholder;
const workTextDefault = LocalizedStrings.workPlaceholder;
import { TitleBarBlack } from "miot/ui";
import MyButton from "../CommonComponents/MyButton";
import AddHeader from "../CommonComponents/AddHeader";
import { Device, Service } from "miot";

var plates = [
  "京", "津", "沪", "渝", "冀", "青",
  "晋", "辽", "吉", "黑", "苏", "桂",
  "浙", "皖", "闽", "赣", "鲁", "蒙",
  "豫", "鄂", "湘", "粤", "琼", "藏",
  "川", "贵", "云", "陕", "甘", "宁",
  "新",
]

var travelPreferences = [
  {
    text: LocalizedStrings.car,
    isSelected: true,
  },
  {
    text: LocalizedStrings.walk,
    isSelected: false,
  },
  {
    text: LocalizedStrings.bus,
    isSelected: false,
  },
  {
    text: LocalizedStrings.bike,
    isSelected: false,
  },
]

export default class TravelSetting extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showSpeakerLocation: false,
      showTravelPreferences: false,
      showTimePicker: false,
      showLicensePlate: false,
      showPlates: false,
      visMessage: false,
      message: "",
      plate: "京",
      plateNum: "A88888",
      arriveTime: new Date(),

      // 接口变化，用于存储地址的经纬度
      home: {},
      work: {},

      homeText: homeTextDefault,
      workText: workTextDefault,
      travelPreferencesText: LocalizedStrings.travelPlaceholder,
      licensePlateText: LocalizedStrings.licensePlatePlaceholder,
      arriveTimeText: LocalizedStrings.arriveTimePlaceholder,

      disabled: false,
    };
  }

  render() {
    let home = this._renderMenuRow("home");
    let work = this._renderMenuRow("work");
    let travelPreferences = this._renderMenuRow("travelPreferences");
    let licensePlate = this._renderMenuRow("licensePlate");
    let speakerLocation = this._renderMenuRow("speakerLocation");
    return (
      <View style={{ width: screenWidth, height: screenHeight, backgroundColor: "#f2f2f2" }}>
        <MessageDialog message={this.state.message}
          confirm={'确认'}
          onConfirm={(e) => {
            console.log('onConfirm', e);
          }}
          onDismiss={() => {
            this.setState({ visMessage: false });
          }}
          visible={this.state.visMessage} />
        <TitleBarBlack
          title={LocalizedStrings.travel} style={{ backgroundColor: '#fff' }}
          onPressLeft={() => { this.props.navigation.goBack() }}
          rightText={LocalizedStrings.save}
          leftText={LocalizedStrings.cancel}
          onPressRight={() => {
            this._save();
          }}
        />
        <View style={{ flex: 1, marginTop: MHGlobalData.APP_MARGINTOP }}>
          <StatusBar barStyle='default' />
          <View style={[styles.separator, { backgroundColor: "#dfdfdf" }]}></View>
          <ScrollView>
            <View style={{ backgroundColor: "#fff" }}>
              {home}
              {work}
              {travelPreferences}
              {this.state.travelPreferencesText === LocalizedStrings.car && licensePlate}
              {speakerLocation}
              <View style={[styles.separator, { backgroundColor: "#dfdfdf" }]}></View>
            </View>
            <Text style={styles.tip}>{LocalizedStrings.addressTip}</Text>
          </ScrollView>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.showTravelPreferences}
          >
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ showTravelPreferences: false })}>
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                <View style={[styles.innerModalView]}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>{LocalizedStrings.travelPreference}</Text>
                  </View>
                  <View style={styles.modalSeparator} />
                  {this._renderTravelPreferences()}
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.showLicensePlate}
          >
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.setState({ showLicensePlate: false })}>
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                <TouchableWithoutFeedback>
                  <View style={[styles.innerModalView]}>
                    <View style={styles.modalTitleContainer}>
                      <Text style={styles.modalTitle}>{LocalizedStrings.licensePlateModalTitle1}</Text>
                    </View>
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalContent}>{LocalizedStrings.licensePlateModalTitle2}</Text>
                    </View>
                    <View style={styles.modalTextInput}>
                      <TouchableHighlight
                        underlayColor='rgba(200,200,200,0.3)'
                        onPress={() => this.setState({ showPlates: !this.state.showPlates })}
                      >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Text style={{ fontSize: 15, marginLeft: 15, marginRight: 4, }}>
                            {this.state.plate}
                          </Text>
                          <Image
                            source={this.state.showPlates ? require('../../Resources/utils/andriod_icon_上_normal.png') : require('../../Resources/utils/andriod_icon_下拉_normal.png')}
                            style={styles.arrowStyle}
                          />
                        </View>
                      </TouchableHighlight>
                      <View style={[styles.separatorCol, { marginLeft: 12, alignSelf: "center", height: 40 }]}></View>
                      <TextInput
                        style={styles.plateNum}
                        onChangeText={(text) => this.setState({ plateNum: text })}
                        defaultValue={this.state.plateNum}
                        placeholder={LocalizedStrings.enterLicensePlate}
                        selectTextOnFocus={true}
                        clearButtonMode="while-editing"
                      />
                    </View>
                    {this.state.showPlates && this._renderPlates()}
                    <View style={styles.modalSeparator} />
                    <View style={{ flexDirection: "row" }}>
                      <MyButton
                        title={LocalizedStrings.cancel}
                        style={[styles.myButton, { width: screenWidth / 2 - 20 }]}
                        fontStyle={{ color: "#000", fontSize: 14 }}
                        onClick={() => this.setState({ showLicensePlate: false })}
                      />
                      <View style={styles.separatorCol} />
                      <MyButton
                        title={LocalizedStrings.ok}
                        style={[styles.myButton, { width: screenWidth / 2 - 20 }]}
                        fontStyle={{ color: "#00BC9C", fontSize: 14 }}
                        onClick={() => this._savelicensePlateText()}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.showSpeakerLocation}
          >
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.setState({ showSpeakerLocation: false })}>
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                <TouchableWithoutFeedback>
                  <View style={styles.innerModalView}>
                    <View style={styles.modalTitleContainer}>
                      <Text style={styles.modalTitle}>{LocalizedStrings.clockPlace}</Text>
                    </View>
                    <View style={styles.modalSeparator} />
                    <TouchableHighlight
                      underlayColor='rgba(200,200,200,0.3)'
                      onPress={() => this._setSpeakerLocation("HOME")}
                    >
                      <View style={styles.modalScrollViewItem}>
                        <Text
                          style={this.state.speakerLocation === "HOME" ?
                            styles.modalScrollViewItemTextSelected :
                            styles.modalScrollViewItemTextNormal
                          }
                        >
                          {LocalizedStrings.home}
                        </Text>
                        {this.state.speakerLocation === "HOME" &&
                          <Image
                            source={require('../../Resources/utils/selected.png')}
                            style={styles.selectImg}
                          />
                        }
                      </View>
                    </TouchableHighlight>
                    <View style={styles.modalSeparator} />
                    <TouchableHighlight
                      underlayColor='rgba(200,200,200,0.3)'
                      onPress={() => this._setSpeakerLocation("COMPANY")}
                    >
                      <View style={styles.modalScrollViewItem}>
                        <Text
                          style={this.state.speakerLocation === "COMPANY" ?
                            styles.modalScrollViewItemTextSelected :
                            styles.modalScrollViewItemTextNormal
                          }
                        >
                          {LocalizedStrings.work}
                        </Text>
                        {this.state.speakerLocation === "COMPANY" &&
                          <Image
                            source={require('../../Resources/utils/selected.png')}
                            style={styles.selectImg}
                          />
                        }
                      </View>
                    </TouchableHighlight>
                    <View style={styles.modalSeparator} />
                    <MyButton
                      title={LocalizedStrings.cancel}
                      style={styles.myButton}
                      fontStyle={{ color: "#000", fontSize: 14 }}
                      onClick={() => this.setState({ showSpeakerLocation: false })}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    );
  }

  _setSpeakerLocation(speakerLocation) {
    if (speakerLocation === "HOME") {
      if (this.state.homeText === homeTextDefault) {
        this.setState({ showSpeakerLocation: false, visMessage: true, message: LocalizedStrings.homeNone });
        // MHPluginSDK.showFailTips(LocalizedStrings.homeNone);
      } else {
        this.setState({
          speakerLocation: speakerLocation,
          speakerLocationText: LocalizedStrings.home,
          showSpeakerLocation: false,
        });
      }
    } else {
      if (this.state.workText === workTextDefault) {
        this.setState({ showSpeakerLocation: false, visMessage: true, message: LocalizedStrings.workNone });
        // MHPluginSDK.showFailTips(LocalizedStrings.workNone);
      } else {
        this.setState({
          speakerLocation: speakerLocation,
          speakerLocationText: LocalizedStrings.work,
          showSpeakerLocation: false,
        });
      }
    }
  }

  _cancel() {
    this.props.navigation.goBack();
  }

  componentWillMount() {
  }

  _savelicensePlateText() {
    // 兼容特斯拉是6位
    const regExp = /^[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/;
    if (!regExp.test(this.state.plateNum)) {
      // AlertIOS.alert(
      //   LocalizedStrings.prompt,
      //   LocalizedStrings.illegalLicensePlate,
      // );
      return;
    }
    this.setState({
      showLicensePlate: false,
      licensePlateText: this.state.plate + this.state.plateNum
    });
  }

  _renderPlates() {
    var length = plates.length;
    var plateList = [];

    for (let i = 0; i < length; i++) {
      plateList.push(
        <TouchableHighlight
          underlayColor='#fff'
          onPress={() => this._setPlate(i)}
        >
          <View
            style={[
              styles.plate,
              this.state.plate === plates[i] ? styles.plateSelect : styles.plateNormal
            ]}
          >
            <Text style={styles.plateText}>{plates[i]}</Text>
          </View>
        </TouchableHighlight>
      )
    }
    return (
      <View style={{ marginBottom: 17, width: 288, flexDirection: "row", flexWrap: "wrap" }}>
        {plateList}
      </View>
    );
  }

  _setPlate(i) {
    this.setState({
      plate: plates[i],
      showPlates: false,
    });
  }

  _renderTravelPreferences() {
    var length = travelPreferences.length;
    var travelList = [];

    for (let i = 0; i < length; i++) {
      var isSelected = this.state.travelPreferencesText === travelPreferences[i].text;
      travelList.push(
        <View>
          <TouchableHighlight
            underlayColor='rgba(200,200,200,0.3)'
            onPress={() => this._setTravelPreferences(i)}
          >
            <View style={styles.modalScrollViewItem}>
              <Text
                style={isSelected ?
                  styles.modalScrollViewItemTextSelected :
                  styles.modalScrollViewItemTextNormal}
              >
                {travelPreferences[i].text}
              </Text>
              {isSelected &&
                <Image
                  source={require('../../Resources/utils/selected.png')}
                  style={styles.selectImg}
                />
              }
            </View>
          </TouchableHighlight>
          {i !== length - 1 &&
            <View style={styles.modalSeparator} />
          }
        </View>
      );
    }
    return travelList;
  }

  _setTravelPreferences(i) {
    this.setState({
      travelPreferencesText: travelPreferences[i].text,
      showTravelPreferences: false,
    });
  }

  _save() {
    let licenseNumber = this.state.travelPreferencesText === LocalizedStrings.car ?
      [{ "plateNumber": this.state.licensePlateText, "isNewEnergy": false }] :
      [];
    var api = "/v2/api/aivs";
    var data = {
      "path": "/api/aivs/device-events",
      "params": {
        // "user_id": Number(MHPluginSDK.userId),
        "client_id": "257885859209021440",
        // "device_id": MHPluginSDK.deviceId,
        "did": Device.deviceID,
      },
      "header": {
        "name": "Travelinfo.UserInfoStore"
      },
      "env": 1,
      "payload": {
        "speakerLocation": this.state.speakerLocation,
        "userAddress": [
          this.state.home,
          this.state.work,
        ],
        "travelPreference": [this.state.travelPreferencesText],
        "licenseNumber": licenseNumber,
        "arrivalTime": ""
      },
      "req_method": "POST",
      "req_header": {
        "Content-Type": [
          "application/json"
        ]
      }
    }
    console.log(JSON.stringify(data));
    Service.smarthome.getAiServiceProxy(data).then((response) => {
      console.log(response);
      if (response.resp_code === 200) {
        // AlertIOS.alert(
        //   LocalizedStrings.prompt,
        //   LocalizedStrings.setTravelInfoSuccess,
        // )
        this.props.navigation.goBack();
      }
    });
  }

  _openAddressPage(key, title) {
    this.props.navigation.navigate(
      'Address',
      {
        title: title,
        address: this.state[key],
        name: key === "home" ? "HOME" : "COMPANY",
        saveAddress: (address) => this._saveAddress(key, address),
      },
    );
  }

  _saveAddress(key, address) {
    var addressText = address.city + address.district + address.address;
    if (key === "home") {
      this.setState({
        homeText: addressText,
        home: address
      });
    } else {
      this.setState({
        workText: addressText,
        work: address
      });
    }
  }

  _openTravelModal() {
    this.setState({ showTravelPreferences: true });
  }

  _openLicenseModal() {
    this.setState({ showLicensePlate: true });
  }

  _openTimePicker() {
    this.setState({ showTimePicker: true });
  }

  _renderMenuRow(key) {
    let fun, title = "";
    switch (key) {
      case "home":
        title = LocalizedStrings.home;
        fun = () => this._openAddressPage(key, title);
        break;
      case "work":
        title = LocalizedStrings.work;
        fun = () => this._openAddressPage(key, title);
        break;
      case "travelPreferences":
        title = LocalizedStrings.travelPreference;
        fun = () => this._openTravelModal();
        break;
      case "licensePlate":
        title = LocalizedStrings.licensePlate;
        fun = () => this._openLicenseModal();
        break;
      case "arriveTime":
        title = LocalizedStrings.arriveTime;
        fun = () => this._openTimePicker();
        break;
      case "speakerLocation":
        title = LocalizedStrings.clockPlace;
        fun = () => this.setState({ showSpeakerLocation: true });
        break;
    }

    return (
      <View>
        {key !== "home" &&
          <View style={[styles.separator, { marginHorizontal: 40 * ratioW }]}></View>
        }
        <TouchableHighlight
          underlayColor='#f2f2f2'
          onPress={fun}
        >
          <View style={{ alignItems: "center", flexDirection: "row", height: 70, marginHorizontal: 40 * ratioW }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuTitle}>{title}</Text>
              <Text style={styles.menuSubTitle}>{this.state[key + "Text"]}</Text>
            </View>
            <Image
              source={require('../../Resources/common/clock_home_icon_forward_normal.png')}
              style={styles.rightArrow}
            />
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  componentDidMount() {
    var api = "/v2/api/aivs";
    var data = {
      "path": "/api/aivs/device-events",
      "params": {
        "client_id": "257885859209021440",
        "did": Device.deviceID,
      },
      "header": {
        "name": "Travelinfo.UserInfoLoad"
      },
      "env": 1,
      "payload": {},
      "req_method": "POST",
      "req_header": {
        "Content-Type": [
          "application/json"
        ]
      }
    }
    console.log(data);
    Service.smarthome.getAiServiceProxy(data).then((response) => {
      console.log(response);
      if (response.resp_code === 200) {
        var result = response.ret;
        if (result.licenseNumber.length > 0) {
          var licensePlateText = "";
          if (typeof result.licenseNumber[0] === "string") {
            licensePlateText = result.licenseNumber[0];
          } else {
            licensePlateText = result.licenseNumber[0].plateNumber;
          }
          this.setState({
            licensePlateText: licensePlateText,
            plate: licensePlateText.slice(0, 1),
            plateNum: licensePlateText.slice(1),
          });
        }
        var home = result.userAddress[0];
        var work = result.userAddress[1];
        var homeText = home.city + home.district + home.address;
        var workText = work.city + work.district + work.address;
        this.setState({
          home: home,
          work: work,
          homeText: homeText,
          workText: workText,
          travelPreferencesText: result.travelPreference[0],
          speakerLocation: result.speakerLocation,
          speakerLocationText: result.speakerLocation === "HOME" ? LocalizedStrings.home : LocalizedStrings.work,
          // arriveTimeText: result.arrivalTime,
        });
      }
    });
  }
}

var styles = StyleSheet.create({
  rightArrow: {
    width: 20,
    height: 20,
  },
  tip: {
    marginLeft: 36 * ratioW,
    marginVertical: 20 * ratioW,
    fontSize: 13,
    color: "rgba(0, 0, 0, 0.35)",
  },
  separator: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: "#e5e5e5",
  },
  blank: {
    borderColor: "#dfdfdf",
    backgroundColor: "#f2f2f2",
    width: screenWidth,
    height: 22 * ratioW,
    borderTopWidth: 1 * ratioW,
    borderBottomWidth: 1 * ratioW,
  },
  menuTitle: {
    paddingBottom: 10 * ratioW,
    fontSize: 16,
  },
  menuSubTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)',
  },
  menuLabel: {
    marginLeft: 20 * ratioW,
    fontSize: 16,
  },
  selectImg: {
    width: 20,
    height: 20,
  },
  bottomBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dfdfdf",
    borderRadius: 30,
    width: 160,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  innerModalView: {
    width: screenWidth - 40,
    marginHorizontal: 20,
    position: "absolute",
    bottom: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
  },
  modalTitleContainer: {
    alignSelf: "stretch",
    height: 66,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 15,
    color: "#000",
  },
  modalContainer: {
    marginHorizontal: 42,
    flex: 1
  },
  modalContent: {
    fontSize: 15,
    color: "#666",
  },
  modalSeparator: {
    alignSelf: "stretch",
    height: 1 / PixelRatio.get(),
    backgroundColor: "#e5e5e5"
  },
  modalScrollViewItem: {
    width: screenWidth - 40,
    height: 48,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 14,
  },
  modalTextInput: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: 'stretch',
    height: 40,
    borderColor: '#dfdfdf',
    borderWidth: 1 / PixelRatio.get(),
  },
  plateNum: {
    fontSize: 15,
    marginLeft: 30,
    flex: 1,
    height: 40,
  },
  modalScrollViewItemTextNormal: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  modalScrollViewItemTextSelected: {
    flex: 1,
    fontSize: 15,
    color: '#00BC9C',
  },
  containerMenu: {
    width: screenWidth - 20 * ratioW,
    height: 100 * ratioW,
    alignItems: "center",
    flexDirection: "row",
  },
  myButton: {
    // width: screenWidth / 2 - 20, // double buttons
    flex: 1,
    height: 50,
    alignSelf: 'stretch',
    alignItems: "center",
    justifyContent: "center",
  },
  arrowStyle: {
    width: 24 * ratioW,
    height: 12 * ratioW,
  },
  separatorCol: {
    width: 1 / PixelRatio.get(),
    alignSelf: "stretch",
    backgroundColor: "#e5e5e5",
  },
  travelMenu: {
    height: 100 * ratioW,
    alignItems: "center",
    flexDirection: "row",
    width: screenWidth - 20 * ratioW,
  },
  travelTitle: {
    marginLeft: 20 * ratioW,
    fontSize: 16,
  },
  plate: {
    margin: 8 * ratioW,
    width: 80 * ratioW,
    height: 72 * ratioW,
    borderWidth: 2 * ratioW,
    borderColor: "#e6e6e6",
    borderRadius: 4 * ratioW,
    justifyContent: "center",
    alignItems: "center",
  },
  plateNormal: {
    backgroundColor: "#fff",
  },
  plateSelect: {
    backgroundColor: "#e6e6e6",
  },
  plateText: {
    fontSize: 16,
  },
});
