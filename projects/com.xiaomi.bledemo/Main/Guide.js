import React from 'react';
import { StyleSheet, View } from 'react-native';
import CommonCell from './CommonCell';

export default class Guide extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      sceens: [
        { title: 'StandardAuth  蓝牙板 Demo', sceen: 'standardAuth' },
        { title: 'SecurityChip  蓝牙板 Demo', sceen: 'securityChip' },
        { title: 'Mesh蓝牙开发板 Demo', sceen: 'meshble' },
        { title: '非小米协议蓝牙设备 Demo', sceen: 'normalble' },
        { title: 'Android 经典蓝牙 Demo', sceen: 'classicBle' },
        { title: 'BluetoothApiUnitCaseDemo', sceen: 'BluetoothApiUnitCaseDemo' }
        // { title: '普通蓝牙设备Demo', sceen: 'normalble' }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.sceens.map((v, i) => (
            <CommonCell
              key={'idx' + i}
              title={v.title}
              onPress={() => {
                this.props.navigation.navigate(v.sceen, { title: v.title });
              }}
            />
          ))
        }
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 0,
    marginTop: 0
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
    alignSelf: 'stretch',
    marginTop: 300
  },
  testText: {
    color: '#000000cc',
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
