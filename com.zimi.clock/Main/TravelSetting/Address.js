'use strict';

import React from 'react';

import {
  TouchableWithoutFeedback,
  PixelRatio,
  ScrollView,
  Modal,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  TextInput,
} from 'react-native';
import { Device, Service } from "miot";
var debounce = function (action, idle) {
  var last;
  return function () {
    var ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function () {
      action.apply(ctx, args)
    }, idle)
  }
}

import MHGlobalData from '../CommonComponents/MHGlobalData';
var LocalizedStrings = require('../CommonComponents/MHLocalizableString').string;
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const ratioW = (screenWidth / (698 + 2 * 26));
const cityObj = require("../Utils/City");

export default class Address extends React.Component {
  constructor(props, context) {
    super(props, context);
    var city = props.navigation.state.params.address.city ? props.navigation.state.params.address.city : LocalizedStrings.beijing;
    var address = (props.navigation.state.params.address.district ? props.navigation.state.params.address.district : "") +
      (props.navigation.state.params.address.address ? props.navigation.state.params.address.address : "");
    this.state = {
      showLocation: false,
      showProvince: true,
      showCandidate: false,
      candidates: [],
      city: city,
      address: address,
    };
    // 对于搜索而言，debounce的timeout时间一般在50ms左右。
    this._getCandidatesDebounce = debounce(this._getCandidates, 50).bind(this);
  }

  render() {
    return (
      <View style={{ width: screenWidth, height: screenHeight, backgroundColor: "#f2f2f2" }}>
        <View style={{ flex: 1, marginTop: MHGlobalData.APP_MARGINTOP }}>
          <View style={styles.plateInput}>
            <TouchableHighlight
              underlayColor='rgba(200,200,200,0.3)'
              onPress={() => this.setState({ showLocation: !this.state.showLocation })}
            >
              <View style={{ flexDirection: "row", alignItems: "center", height: 50 }}>
                <Text style={{ fontSize: 32 * ratioW, marginLeft: 30 * ratioW, marginRight: 8 * ratioW }}>
                  {this.state.city}
                </Text>
                <Image
                  source={this.state.showLocation ? require('../../Resources/utils/andriod_icon_上_normal.png') : require('../../Resources/utils/andriod_icon_下拉_normal.png')}
                  style={styles.arrowStyle}
                />
              </View>
            </TouchableHighlight>
            <View style={[styles.separatorCol, { marginLeft: 24 * ratioW, alignSelf: "center", height: 20 }]}></View>
            <TextInput
              style={styles.address}
              onChangeText={this._getCandidatesDebounce}
              defaultValue={this.state.address}
              placeholder={LocalizedStrings.enterAddress}
              selectTextOnFocus={true}
              clearButtonMode="while-editing"
            />
          </View>
          {this.state.showCandidate && this._renderCandidates()}
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.showLocation}
          >
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => this.setState({ showLocation: false })}>
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                <TouchableWithoutFeedback>
                  <View style={styles.innerModalView}>
                    <View style={styles.modalTitleContainer}>
                      <Text style={styles.modalTitle}>
                        {this.state.showProvince ? LocalizedStrings.province : LocalizedStrings.city}
                      </Text>
                    </View>
                    <View style={styles.modalSeparator} />
                    <ScrollView style={styles.modalScrollView}>
                      {this.state.showProvince ? this._renderProvinces() : this._renderCitys()}
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    );
  }

  _getCandidates(text) {
    if (text.length > 0) {
      // 查询推荐地址列表
      var api = "/v2/api/aivs";
      var data = {
        "path": "/api/aivs/device-events",
        "params": {
          "client_id": "257885859209021440",
          "did": Device.deviceID,
        },
        "header": {
          "name": "Travelinfo.PoiAddressLoad"
        },
        "env": 1,
        "payload": {
          "place": text,
          "region": this.state.city,
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
        if (response.ret.length > 0) {
          this.setState({ candidates: response.ret, showCandidate: true });
        }
      });
      this.setState({ address: text });
    } else {
      this.setState({ showCandidate: false });
    }
  }

  _saveAddress(address) {
    // 为了保存时候直接使用，服务端返回的数据结构不统一
    address.address = address.name;
    address.name = this.props.navigation.state.params.name;
    this.setState({
      address: address.district + address.address,
      showCandidate: false
    });
    console.log("选取的地址是：", address);
    this.props.navigation.state.params.saveAddress(address);
    this.props.navigation.goBack();
  }

  _renderCandidates() {
    var candidates = this.state.candidates;
    var length = candidates.length;
    var candidatesList = [];

    for (let i = 0; i < length; i++) {
      candidatesList.push(
        <View style={{ backgroundColor: "#fff" }}>
          {!!i &&
            <View style={[styles.modalSeparator, { marginHorizontal: 40 * ratioW }]}></View>
          }
          <TouchableHighlight
            underlayColor='#f2f2f2'
            onPress={() => this._saveAddress(candidates[i])}
          >
            <View style={{ justifyContent: "center", height: 120 * ratioW, paddingHorizontal: 40 * ratioW }}>
              <Text style={styles.menuTitle}>{candidates[i].name}</Text>
              <Text style={styles.menuSubTitle}>{candidates[i].city + candidates[i].district}</Text>
            </View>
          </TouchableHighlight>
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={styles.modalSeparator}></View>
        {candidatesList}
        <View style={styles.modalSeparator}></View>
      </ScrollView>
    )
  }

  _renderProvinces() {
    var provinceList = [];
    for (let province in cityObj) {
      provinceList.push(
        <View>
          <TouchableHighlight
            underlayColor='#f2f2f2'
            onPress={() => this.setState({
              province: province,
              city: province,
              showProvince: false
            })}
          >
            <View style={styles.modalScrollViewItem}>
              <Text style={styles.modalScrollViewItemTextNormal}>{province}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.modalSeparator} />
        </View>
      );
    }
    return provinceList;
  }


  _renderCitys() {
    var citys = cityObj[this.state.province].child;
    var length = citys.length;
    var cityList = [];

    for (let i = 0; i < length; i++) {
      cityList.push(
        <View>
          <TouchableHighlight
            underlayColor='#f2f2f2'
            onPress={() => this.setState({
              city: citys[i].name,
              showLocation: false, showProvince: true
            })}
          >
            <View style={styles.modalScrollViewItem}>
              <Text style={styles.modalScrollViewItemTextNormal}>{citys[i].name}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.modalSeparator} />
        </View>
      );
    }
    return cityList;
  }

  componentWillUnmount() {
    // this.props.setIsNavigationBarHidden();
  }

}

var styles = StyleSheet.create({
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
  modalSeparator: {
    alignSelf: "stretch",
    height: 1 / PixelRatio.get(),
    backgroundColor: "#e5e5e5"
  },
  modalScrollView: {
    width: screenWidth - 40,
    height: screenHeight / 2,
  },
  modalScrollViewItem: {
    flex: 1,
    height: 48,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 14,
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
  title: {
    marginLeft: 20 * ratioW,
    fontSize: 32 * ratioW,
  },
  menuTitle: {
    paddingBottom: 10 * ratioW,
    fontSize: 34 * ratioW,
  },
  menuSubTitle: {
    fontSize: 26 * ratioW,
    color: 'rgba(0,0,0,0.4)',
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
  plateInput: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    width: screenWidth,
    height: 50,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: "#e5e5e5",
    justifyContent: "center",
    marginBottom: 16 * ratioW,
  },
  address: {
    fontSize: 30 * ratioW,
    marginLeft: 30 * ratioW,
    flex: 1,
    height: 50,
  }
});
