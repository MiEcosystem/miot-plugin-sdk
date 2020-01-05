import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView
} from 'react-native';
import {Bluetooth, BluetoothEvent, Device, Host} from "miot";


const ServiceUUID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const WCharacteristicUUID = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';
const RCharacteristicUUID = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

/**
 * 蓝牙模块 api 用例测试
 *
 */
export default class BluetoothApiUnitCaseDemo extends React.Component{

  constructor(props){
    super(props);

    this._initData();
  }

  _initData(){
    this.bleListenrs = [];
    this.peripheralUUIDIOS = '';
    this.bleDevice = null;

    this.txtShowInfoIndex = 0;
    this.state={
      txtShowInfo:''
    }
  }

  componentWillMount() {

    this.fontFamily = {};
    if (Platform.OS === 'android') {
      // 如果不设置英文字体，那么外文字符串将显示不全（Android）
      this.fontFamily = {fontFamily: 'Kmedium'}
    }

    this._bleBindListenrs();
  }

  _bleBindListenrs(){

    // 手机蓝牙开关状态变更事件
    this.bleListenrs['bluetoothStatusChanged'] = BluetoothEvent.bluetoothStatusChanged.addListener((isEnabled)=>{
      this._logInfo('手机蓝牙开关状态变更事件 bluetoothStatusChanged  isEnabled', isEnabled);
      this._updateState('手机蓝牙开关状态变更事件 bluetoothStatusChanged  isEnabled = '+isEnabled);
    });

    // 蓝牙设备扫描发现事件
    this.bleListenrs['bluetoothDeviceDiscovered'] = BluetoothEvent.bluetoothDeviceDiscovered.addListener((bluetoohData)=>{

      if(bluetoohData){
        let deviceMac = Device.mac.replace(new RegExp(':', 'g'), '');
        let searchDeviceMac = this._getBleDeviceMac(bluetoohData);
        if(searchDeviceMac.toUpperCase() === deviceMac.toUpperCase()){
          // 已发现设备，停止扫描
          this.peripheralUUIDIOS = bluetoohData.uuid;
          this._logInfo('蓝牙设备扫描发现事件 bluetoothDeviceDiscovered：uuid is ' + bluetoohData.uuid)
          this._updateState('蓝牙设备扫描发现事件 bluetoothDeviceDiscovered：uuid is ' + bluetoohData.uuid);

          this._stopScan();
          this._connec();
        }
      }
    });

    // 蓝牙设备扫描发现失败事件
    this.bleListenrs['bluetoothDeviceDiscoverFailed'] = BluetoothEvent.bluetoothDeviceDiscoverFailed.addListener((error)=>{
      this._logInfo('蓝牙设备扫描发现失败事件 bluetoothDeviceDiscoverFailed', error)
      this._updateState('蓝牙设备扫描发现失败事件 bluetoothDeviceDiscoverFailed error is ' +JSON.stringify(error));
    });

    // 蓝牙连接状态改变的事件
    this.bleListenrs['bluetoothConnectionStatusChanged'] = BluetoothEvent.bluetoothConnectionStatusChanged.addListener((bluetooth, isConnected)=>{
      this._logInfo('蓝牙连接状态改变的事件 bluetoothConnectionStatusChanged', bluetooth, isConnected);
    });

    // 蓝牙服务发现事件
    this.bleListenrs['bluetoothSeviceDiscovered'] = BluetoothEvent.bluetoothSeviceDiscovered.addListener((bluetooth, services)=>{
      this._logInfo('蓝牙服务发现事件-成功 bluetoothSeviceDiscovered', bluetooth, services)

      if(services){
        services.forEach((service)=>{
          if(service.UUID.toUpperCase() == ServiceUUID){
            // 通过服务发现对应的特征值
            this._logInfo('发现服务 '+ServiceUUID+'  开始startDiscoverCharacteristics...');
            this._updateState('发现服务 '+ServiceUUID+'  开始startDiscoverCharacteristics...');
            this.bleDevice.getService(ServiceUUID).startDiscoverCharacteristics(WCharacteristicUUID, RCharacteristicUUID);
          }
        });
      }
    });

    // 蓝牙服务发现失败事件
    this.bleListenrs['bluetoothSeviceDiscoverFailed'] = BluetoothEvent.bluetoothSeviceDiscoverFailed.addListener((bluetooth, error)=>{
      this._logInfo('蓝牙服务发现失败事件 bluetoothSeviceDiscoverFailed', bluetooth, error);
      this._updateState('蓝牙服务发现失败事件 bluetoothSeviceDiscoverFailed error is ' +JSON.stringify(error));
    });

    // 蓝牙特征发现事件-成功
    this.bleListenrs['bluetoothCharacteristicDiscovered'] = BluetoothEvent.bluetoothCharacteristicDiscovered.addListener((bluetooth, service, characters)=>{
      this._logInfo('蓝牙特征发现事件-成功 bluetoothCharacteristicDiscovered', service, characters);


      if (service.UUID.toUpperCase() == ServiceUUID) {
        characters.forEach((character)=>{
          if(character.UUID.toUpperCase() == RCharacteristicUUID){
            // 对对应的特征值进行监听
            this._logInfo('发现特征值 '+RCharacteristicUUID+'  开始setNotify...')
            this._updateState('发现特征值 '+RCharacteristicUUID+'  开始setNotify...');
            this.bleDevice.getService(ServiceUUID).getCharacteristic(RCharacteristicUUID).setNotify(true)
              .then((ble)=>{
                this._logInfo('特征值 '+RCharacteristicUUID+'  开始setNotify 成功...')
                this._updateState('特征值 '+RCharacteristicUUID+'  开始setNotify  成功...');
              })
              .catch((error)=>{
                let info = '特征值 '+RCharacteristicUUID+'  开始setNotify error...'+JSON.stringify(error);
                this._logInfo(info);
                this._updateState(info);
              });
          }

          if (character.UUID.toUpperCase() == WCharacteristicUUID){
            let value = '123123';
            this._logInfo('发现特征值 '+WCharacteristicUUID+'  开始 write data '+value)
            this._updateState('发现特征值 '+WCharacteristicUUID+'  开始 write data '+value);
            this.bleDevice.getService(ServiceUUID).getCharacteristic(WCharacteristicUUID).writeWithoutResponse(value)
          }
        });
      }

    });

    // 蓝牙特征发现事件-失败
    this.bleListenrs['bluetoothCharacteristicDiscoverFailed'] = BluetoothEvent.bluetoothCharacteristicDiscoverFailed.addListener((bluetooth, service, error)=>{
      this._logInfo('蓝牙特征发现事件-失败 bluetoothSeviceDiscoverFailed', service, error)
    });

    // 蓝牙特征值变更事件
    this.bleListenrs['bluetoothCharacteristicValueChanged'] = BluetoothEvent.bluetoothCharacteristicValueChanged.addListener((bluetooth, service, character, value)=>{
      this._logInfo('蓝牙特征值变更事件 bluetoothCharacteristicValueChanged', character, value)
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._checkBluetoothIsEnabled();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第一步-检查手机蓝牙是否打开</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._startScan();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第二步-开始蓝牙扫描</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._connec();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第三步-开始蓝牙连接</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._startDiscoverServices();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第四步-开始发现服务</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._startDiscoverCharacteristics();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第五步-开始发现特征值</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={(e) => {
              this._write();
            }}
          >
            <Text style={[styles.textStyle, this.fontFamily]}>第六步-开始写特征值</Text>
          </TouchableOpacity>

          <Text style={[{marginLeft: 10, color: '#666666'}, this.fontFamily]}>{this.state.txtShowInfo}</Text>
        </ScrollView>

      </View>
    );
  }

  componentWillUnmount() {
    this._stopScan();
    this._disConnec();
  }

  //  判断手机蓝牙是否打开
  _checkBluetoothIsEnabled(){
    Bluetooth.checkBluetoothIsEnabled().then((enable)=>{
      this._logInfo('checkBluetoothIsEnabled  enable='+enable)
      this._updateState('checkBluetoothIsEnabled  enable='+enable)
      if(!enable){
        if(Host.isAndroid){
          Bluetooth.enableBluetoothForAndroid(true)
          // Host.ui.openPhoneBluSettingPage();
        }else{
          Host.ui.showBLESwitchGuide();
        }
      }
    }).catch((error)=>{
      this._logInfo('checkBluetoothIsEnabled error ', error)
    })
  }

  _startScan(){
    this._logInfo('startScan');

    this.setState({
      txtShowInfo: ''
    });
    this._updateState('startScan');
    Bluetooth.startScan(30000);
  }

  _stopScan(){
    this._logInfo('stopScan')
    this._updateState('stopScan');
    Bluetooth.stopScan();
  }

  _connec(){

    if(!this.bleDevice){

      this.bleDevice = Device.getBluetoothLE(this.peripheralUUIDIOS);
      // 也可以如下方式创建蓝牙
      // let macOrPeripheralID = Host.isAndroid?Device.mac:this.peripheralUUIDIOS;
      // this.bleDevice = Bluetooth.createBluetoothLE(macOrPeripheralID);

    }

    this._logInfo('ble will connect...', this.bleDevice)
    this._updateState('ble will connect...')
    /**
     * Android调用connect方法，接下来会自动执行 bluetoothSeviceDiscovered   bluetoothCharacteristicDiscovered
     */
    this.bleDevice.connect(0, {timeout: 30000, forceReconnect: true}).then((blueData)=>{
      // 这里的blueData是原生传递过来的数据(包括service信息等)，并不是当前蓝牙设备对象
      this._logInfo('ble connect success ', blueData);
      this._updateState('ble connect success ...')
      if(Host.isIOS){
        this.bleDevice.startDiscoverServices(ServiceUUID);
      }

    }).catch((error)=>{
      this._logInfo('ble connect error ', error)
      this._updateState('ble connect error:  '+JSON.stringify(error))
    })
  }

  _disConnec(){
    if(this.bleDevice){
      this._logInfo('ble will disconnect...')

      if(Host.isIOS){
        Bluetooth.retrievePeripheralsWithServicesForIOS(ServiceUUID).then((res)=>{
          this.bleDevice.disconnect();
        }).catch((error)=>{
          this.bleDevice.disconnect();
        })
      }else{
        this.bleDevice.disconnect();
      }

    }
  }

  _startDiscoverServices(){
    if(this.bleDevice){
      this._updateState('开始发现服务 startDiscoverServices  '+ServiceUUID);
      this.bleDevice.startDiscoverServices(ServiceUUID);
    }
  }

  _startDiscoverCharacteristics(){
    if(this.bleDevice && this.bleDevice.getService(ServiceUUID)){
      this.bleDevice.getService(ServiceUUID).startDiscoverCharacteristics(WCharacteristicUUID, RCharacteristicUUID);
    }
  }

  _write(){
    let value = '123123';
    this._updateState('开始向特征值 '+WCharacteristicUUID+'  write data '+value);
    this._logInfo('开始向特征值 '+WCharacteristicUUID+'  write data '+value);
    this.bleDevice.getService(ServiceUUID).getCharacteristic(WCharacteristicUUID).write(value)
      .then((ble)=>{
        this._updateState('特征值 '+WCharacteristicUUID+' 写数据成功...');
        this._logInfo('特征值 '+WCharacteristicUUID+' 写数据成功...');
      })
      .catch((error)=>{
        this._updateState('写数据失败...'+JSON.stringify(error))
        this._logInfo('写数据失败...'+JSON.stringify(error));
      })
  }



  _getBleDeviceMac(bluetoohData){

    if(Host.isAndroid &&
      bluetoohData.address &&
      bluetoohData.address.length > 0){
      return bluetoohData.address.replace(new RegExp(':', 'g'), '');
    }else{

      if(bluetoohData.advertisementData &&
        bluetoohData.advertisementData.kCBAdvDataManufacturerData){

        let data = bluetoohData.advertisementData.kCBAdvDataManufacturerData;
        return data.substr(data.length - 12, 12);

      }else if(bluetoohData.advertisementData &&
        bluetoohData.advertisementData.kCBAdvDataServiceData &&
        bluetoohData.advertisementData.kCBAdvDataServiceData.FE95){

        let fe95Data = bluetoohData.advertisementData.kCBAdvDataServiceData.FE95;
        let reverseMac = fe95Data.substr(10, 12);
        let mac = BlueHelpDealData.reverseMac(reverseMac);
        return mac;

      }

    }

    return '';

  }

  _logInfo(...messages){
    console.log(...messages)
    console.log('----------------------------------------------\n')
  }

  _updateState(txtInfo){
    this.txtShowInfoIndex++;
    let info = this.state.txtShowInfo + this.txtShowInfoIndex+'、'+txtInfo+'\n';
    this.setState({
      txtShowInfo: info
    })
  }

}

const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#ffffff',
    fontSize: 14,
  }
});