import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardButton } from 'miot/ui';
import CommonCell from './CommonCell';

export default class Guide extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      sceens: [
        {
          title: 'StandardAuth蓝牙板', sceen: 'standardAuth', type: 4, icon: require('../Resources/icon_standard.png')
        },
        {
          title: 'SecurityChip蓝牙板', sceen: 'securityChip', type: 1, icon: require('../Resources/icon_security.png')
        },
        {
          title: 'Mesh蓝牙开发板', sceen: 'meshble', type: 5, icon: require('../Resources/icon_mesh.png')
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.sceens.map((v, i) => (
            <CardButton
              key={'idx' + i}
              iconContainerStyle={{ backgroundColor: 'red' }}
              title={v.title}
              icon={v.icon}
              onPress={() => {
                this.props.navigation.navigate(v.sceen, { title: v.title, sc_type: v.type });
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
