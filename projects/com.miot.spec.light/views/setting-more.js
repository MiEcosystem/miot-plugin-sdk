'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  SectionList,
  View,
  TouchableHighlight
} from 'react-native';

import { SafeAreaView } from 'react-navigation';
import Navigator from '../modules/navigator';
// import Protocol from '../modules/protocol';

import { Host, Device, DeviceEvent, Service } from "miot";

import { LocalizedString } from '../modules/consts';

export default class Setting extends React.Component {

  constructor(props) {
    super(props);
    this._createMenuData();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      hideRightButton: true,
      title: LocalizedString.setting()
    });
  }

  componentWillUnmount() {
  }

  _createMenuData() {
    let featureMenuData = [];
    let commonMenuData = [];
    let resetMenuData = [];

    if (Device.isOwner) {
      commonMenuData.push({
        name: LocalizedString.security(),
        func: () => {
          Host.ui.openSecuritySetting();
        }
      });
    }

    commonMenuData.push({
      name: LocalizedString.feedback(),
      func: () => {
        Host.ui.openFeedbackInput();
      }
    });

    if (Device.isOwner) {
      commonMenuData.push({
        name: LocalizedString.deviceTimezone(),
        func: () => {
          Host.ui.openDeviceTimeZoneSettingPage();
        }
      });
    }
    commonMenuData.push({
      name: LocalizedString.addToDesktop(),
      func: () => {
        Host.ui.openAddToDesktopPage();
      }
    });

    this._menuData = [{
      title: LocalizedString.commonSetting(),
      data: commonMenuData
    }];
    this._menuDataCount = featureMenuData.length + 1 + commonMenuData.length + 5;
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safearea}>
          <Navigator navigation={this.props.navigation} />
          <View style={styles.containerInner}>
            <SectionList
              style={styles.list}
              stickySectionHeadersEnabled={false}
              initialNumToRender={this._menuDataCount}
              renderSectionHeader={this._renderSectionHeader}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              sections={this._menuData}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  _renderSectionHeader = ({ section: { title } }) => {
    return (
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      </View>
    );
  }

  _renderRow = ({ item, index, section }) => {
    if (!item.name) {
      return null;
    }
    return (
      <View style={{ backgroundColor: '#fff' }}>
        {index === 0 ? null : <View style={styles.separator}></View>}
        <TouchableHighlight underlayColor={'#ddd'} onPress={item.switchKey ? null : item.func}>
          <View style={{ marginHorizontal: 20 }}>
            {section.title ? (
              <React.Fragment>
                <View style={styles.rowContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  {item.subtitle ? (<Text style={styles.subtitle}>{item.subtitle}</Text>) : null}
                </View>
              </React.Fragment>
            ) : (
              <View style={styles.rowContainer}>
                <Text style={styles.reset}>{item.name}</Text>
              </View>
            )}
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _renderRowSeperator = () => {
    return (
      <View style={styles.separator}></View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(235,235,236)'
  },
  safearea: {
    flex: 1,
    width: '100%'
  },
  containerInner: {
    flex: 1,
    width: '100%'
  },

  rowContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  sectionHeader: {
    height: 30,
    backgroundColor: 'rgb(235,235,236)',
    justifyContent: 'center',
    // padding:10,
    paddingLeft: 10
  },
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: 'MI-LANTING--GBK1-Light'
  },
  list: {
  },

  title: {
    fontSize: 16,
    flex: 2,
    fontFamily: 'MI-LANTING--GBK1-Light'
  },
  reset: {
    fontSize: 16,
    flex: 1,
    color: 'rgb(251,0,0)',
    textAlign: 'center',
    fontFamily: 'MI-LANTING--GBK1-Light'
  },
  subtitle: {
    fontSize: 14,
    flex: 1,
    color: 'rgb(138,138,138)',
    textAlign: "right",
    marginRight: 5,
    fontFamily: 'MI-LANTING--GBK1-Light'
  },
  subArrow: {
    width: 6.5,
    height: 13
  },
  separator: {
    height: 0.75,
    backgroundColor: '#dddddd',
    marginLeft: 20,
    marginRight: 20
  }
});
