'use strict';

import React from 'react';


import {
  StyleSheet,
  Text,
  ListView,
  View,
  Image,
  TouchableHighlight,
  Component,
  StatusBar,
  PixelRatio,
  ActionSheetIOS,
} from 'react-native';

import { TitleBarBlack } from 'miot/ui';

export default class UIDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {

    return {
      header: <TitleBarBlack title={navigation.state.params.title} style={{ backgroundColor: '#fff' }}
        onPressLeft={() => {
          navigation.goBack();
        }} />,
    };
  };

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(
        [
          'UIKitHome',
          'RefreshListView',
          'swiperDynamic',
          'swiperLoadMinimal',
          // 'PhotoView',
          'swiperPhone',
          'swiperSwiper',
          'swiperNumber',
          'ProgressDemo',
          'DialogTest',
          'ImageCapInsetDemo',
        ]),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.list} dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#838383' onPress={() => this._pressRow(rowData)}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{rowData}</Text>
            <Image style={styles.subArrow} source={require('../Resources/sub_arrow.png')} />
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowData) {
    console.log('row' + rowData + 'clicked!');
    this.props.navigation.navigate(rowData, { title: rowData });
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 0,
    marginTop: 0,
  },

  rowContainer: {
    height: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1,
  },
  list: {
    alignSelf: 'stretch',
  },

  title: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1,
  },
  subArrow: {
    width: 7,
    height: 14,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#e5e5e5',
    marginLeft: 20,
  },
});

