import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, ScrollView, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { Device } from 'miot';
import NavigationBar from './NavigationBar';
import MessageDialog from './Dialog/MessageDialog';
import LoadingDialog from './Dialog/LoadingDialog';
import { FontDefault } from '../utils/fonts';
import { strings as I18n } from '../resources/';
import { Styles as styles } from 'miot/resources';
const STATUS = {
  SEARCHING: 0,
  SEARCH_EMPTY: 1,
  LIST: 2
};
Object.freeze(STATUS);
export default class BraceletInterconnection extends React.Component {
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
          title={navigation.getParam('title' || I18n.linkDeviceBracelet)}
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      loadingVisiable: false,
      loadingMessage: '',
      dialogVisiable: false,
      dialogMessage: '',
      dialogConfirm: null,
      toastVisiable: false,
      toastMessage: null,
      datasources: [],
      linked: false
    };
    this.rotateValue = new Animated.Value(0);
    this.rotateData = this.rotateValue.interpolate({
      inputRange: [0, 10],
      outputRange: ['0deg', '3600deg']
    });
  }
  componentDidMount() {
    this._searchBracelet();
  }
  render() {
    const { status } = this.state;
    return (
      <View style={Styles.container}>
        {
          status === STATUS.SEARCHING ?
            <Search
              icon={require('../resources/images/bracelet_gray.png')}
              iconBack={require('../resources/images/loading_circle.png')}
              title={I18n.scanDeviceBracelet}
              messages={[I18n.scanDeviceBraceletTip]}
              rotate={this.rotateData}
            // onPress={null}
            /> :
            (
              status === STATUS.SEARCH_EMPTY ?
                <Search
                  icon={require('../resources/images/bracelet_red.png')}
                  iconBack={require('../resources/images/circle_red.png')}
                  title={I18n.scanDeviceBraceletEmptyTitle}
                  messages={[I18n.scanDeviceBraceletEmptyTip1, I18n.scanDeviceBraceletEmptyTip2]}
                  // rotate={this.rotateData}
                  onPress={() => { this._searchBracelet(); }}
                /> :
                (
                  status === STATUS.LIST ?
                    <List items={this.state.datasources} handle={(mac, linked) => {
                      linked ? this._alertRemoveConnection(mac) : this._alertAddConnection(mac);
                    }}
                    headerMessage={this.state.linked ? I18n.linkedDeviceBraceletHeaderTip : I18n.availableLinkDeviceBraceletHeaderTip}
                    footerMessage={this.state.linked ? I18n.linkedDeviceBraceletFooterTip : I18n.availableLinkDeviceBraceletFooterTip}
                    /> : null
                )
            )
        }
        <MessageDialog messageStyle={{ textAlign: 'center' }}
          visible={this.state.dialogVisiable}
          message={this.state.dialogMessage}
          onDismiss={() => { this.setState({ dialogVisiable: false }); }}
          buttons={[
            { text: I18n.cancel, callback: () => { this.setState({ dialogVisiable: false }); } },
            { text: I18n.ok, callback: this.state.dialogConfirm }
          ]}
        />
        <LoadingDialog
          visible={this.state.loadingVisiable}
          message={I18n.linking}
        />
        <Toast visible={this.state.toastVisiable === true} message={this.state.toastMessage} />
      </View>
    );
  }
  _searchBracelet(time = 10 * 1000) {
    this.setState({
      status: STATUS.SEARCHING
    });
    Promise.all([
      this._scanBracelet(time),
      this._getBrecelet(time)
    ]).then((res) => {
      const mac = this.props.navigation.getParam('mac', '');
      let items = [];
      let filteredItems = [];
      if (res.length == 2 && res[0].code == 0 && res[1].code == 0 && res[1].result.length > 0) {
        items = res[1].result.map((item) => {
          item.linked = item.mac == mac;
          item.name = item.mac;
          return item;
        });
        filteredItems = items.filter((item) => item.linked);
      }
      if (mac.length > 0) {
        this.setState({
          status: filteredItems.length > 0 ? STATUS.LIST : STATUS.SEARCH_EMPTY,
          datasources: filteredItems,
          linked: filteredItems.length > 0
        });
      } else {
        this.setState({
          status: items.length > 0 ? STATUS.LIST : STATUS.SEARCH_EMPTY,
          datasources: items,
          linked: false
        });
      }
    }).catch((err) => {
      this.setState({
        status: STATUS.SEARCH_EMPTY,
        datasources: []
      });
    });
  }
  _scanBracelet(time) {
    this.__rotate(time);
    return new Promise((resolve, reject) => {
      Device.getDeviceWifi().callMethod('miIO.bleStartSearchBand', [
        time
      ]).then((res) => {
        resolve(res);
      }).catch((err) => {
        console.log('扫描失败:', JSON.stringify(err));
        reject(err);
      });
    });
  }
  _getBrecelet(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Device.getDeviceWifi().callMethod('miIO.bleGetNearbyBandList', []).then((res) => {
          resolve(res);
        }).catch((err) => {
          console.log('获取失败:', JSON.stringify(err));
          reject(err);
        });
      }, time);
    });
  }
  __rotate(duration) {
    this.rotateValue.setValue(0);
    Animated.timing(this.rotateValue, {
      toValue: duration / 1000,
      duration: duration,
      easing: Easing.linear
    }).start();
  }
  _alertRemoveConnection(mac) {
    this.setState({
      dialogVisiable: true,
      dialogMessage: I18n.removeLinkConfirm,
      dialogConfirm: () => { this.__removeConnection(mac); }
    });
  }
  __removeConnection(mac) {
    this.setState({
      dialogVisiable: false
      // loadingVisiable: true
    });
    let onDisconnect = this.props.navigation.getParam('onDisconnect', null);
    onDisconnect ? onDisconnect(mac, (res) => {
      // this.setState({ loadingVisiable: false });
      if (res) {
        this.props.navigation.setParams({ mac: '' });
        this._searchBracelet(5 * 1000);
      } else {
        this._showToast(I18n.removeLinkFail);
      }
    }) : console.log(
      `
      请配置 navigation.props.onDisconnect, 例如 
      onDisconnect:{mac, callback}=>{
        // do something
        callback(true)
      }
      当前为：${ onDisconnect }`
    );
  }
  _alertAddConnection(mac) {
    this.setState({
      dialogVisiable: true,
      dialogMessage: I18n.linkConfirm,
      dialogConfirm: () => { this.__addConnection(mac); }
    });
  }
  __addConnection(mac) {
    this.setState({
      dialogVisiable: false,
      loadingVisiable: true
    });
    let onConnect = this.props.navigation.getParam('onConnect', null);
    onConnect ? onConnect(mac, (res) => {
      this.setState({ loadingVisiable: false });
      if (res) {
        this.props.navigation.setParams({ mac: mac });
        this._searchBracelet(5 * 1000);
      } else {
        this._showToast(I18n.linkFail);
      }
    }) : console.log(
      `
      请配置 navigation.props.onConnect, 例如 
      onConnect:{mac, callback}=>{
        // do something
        callback(true)
      }
      当前为：${ onConnect }`
    );
  }
  _showToast(message, duration = 1000) {
    console.log(message, duration);
    this.setState(() => {
      const toastMessage = message;
      const toastVisiable = true;
      return {
        toastMessage,
        toastVisiable
      };
    });
    setTimeout(() => {
      this.setState(() => {
        const toastMessage = null;
        const toastVisiable = false;
        return {
          toastMessage,
          toastVisiable
        };
      });
    }, duration);
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styles.common.backgroundColor
  },
  title: {
    fontFamily: FontDefault,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  },
  detail: {
    fontFamily: FontDefault,
    fontSize: 12,
    color: '#999'
  }
});
function Search({ icon, iconBack, title, messages, rotate, onPress }) {
  return (
    <TouchableOpacity style={{ width: '100%', height: '100%', paddingHorizontal: 27, alignItems: 'center', backgroundColor: '#fff' }}
      onPress={onPress}>
      <View style={{ width: 96, height: 96, marginTop: 80, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.Image source={iconBack} style={{ transform: [{ rotate: rotate }], width: '100%', height: '100%' }}></Animated.Image>
        <Image source={icon} style={{ position: 'absolute', width: 62, height: 62 }}></Image>
      </View>
      <Text style={[Styles.title, { marginTop: 36 }]}>
        {title}
      </Text>
      <View style={{ width: '100%', height: 20 }}></View>
      {
        messages.map((message, index) => {
          return (
            <Text key={String(index)} style={[Styles.detail, { textAlign: 'center' }]}>
              {message}
            </Text>
          );
        })
      }
    </TouchableOpacity>
  );
}
Search.propTypes = {
  icon: PropTypes.node,
  iconBack: PropTypes.node,
  title: PropTypes.string,
  message: PropTypes.arrayOf(PropTypes.string),
  rotate: PropTypes.any,
  onPress: PropTypes.func
};
Search.defaultProps = {
  icon: null,
  iconBack: null,
  title: '',
  message: [],
  rotate: '0deg',
  onPress: null
};
function List({ items, handle, headerMessage, footerMessage }) {
  return (
    <ScrollView style={{ paddingHorizontal: 27, width: '100%' }}>
      {
        headerMessage ? <View style={{ marginTop: 16, marginBottom: 10 }}><Text style={Styles.detail}>{headerMessage}</Text></View> : null
      }
      {
        items.map((item, index) => {
          return (
            <View key={String(index)} style={{ width: '100%', height: 54, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={Styles.title}>{item.name}</Text>
              <TouchableOpacity style={{ width: 80, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EAF8F8' }}
                onPress={() => {
                  handle && handle(item.mac, item.linked);
                }}>
                <Text style={[Styles.title, { color: '#48C2C7' }]}>{item.linked ? I18n.removeLink : I18n.link}</Text>
              </TouchableOpacity>
            </View>
          );
        })
      }
      {
        headerMessage ? <View style={{ marginTop: 10 }}><Text style={Styles.detail}>{footerMessage}</Text></View> : null
      }
    </ScrollView>
  );
}
List.propTypes = {
  items: PropTypes.array,
  handle: PropTypes.func,
  headerMessage: PropTypes.string,
  footerMessage: PropTypes.string
};
List.defaultProps = {
  items: [],
  handle: null,
  headerMessage: null,
  footerMessage: null
};
function Toast({ visible, message }) {
  if (!visible || !message) {
    return null;
  }
  return (
    <View style={{
      position: 'absolute', bottom: 86, maxWidth: 200, flexShrink: 1, alignSelf: 'center',
      paddingVertical: 9, paddingHorizontal: 15,
      backgroundColor: '#fffE', borderRadius: 12, borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 0.5,
      shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 17 }
    }}>
      <Text style={{ flexWrap: 'wrap', fontFamily: FontDefault, fontSize: 16, color: '#4C4C4C', textAlign: 'center' }}>{message}</Text>
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