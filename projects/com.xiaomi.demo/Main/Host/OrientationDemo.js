import React from 'react';
import { Platform, Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Orientation from 'react-native-orientation';
import Logger from '../Logger';

export default class OrientationDemo extends React.Component {

  componentWillMount() {
    const init = Orientation.getInitialOrientation();
    this.setState({
      init,
      orientation: init,
      specificOrientation: init
    });
    Logger.trace(this);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._updateOrientation);
    Orientation.addSpecificOrientationListener(this._updateSpecificOrientation);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._updateOrientation);
    Orientation.removeSpecificOrientationListener(this._updateSpecificOrientation);
  }

  _getOrientation() {
    Orientation.getOrientation((err, orientation) => {
      Alert.alert(`Orientation is ${ orientation }`);
    });
  }

  _getSpecificOrientation() {

    if (Platform.OS.toLowerCase() != 'ios') {
      Alert.alert('not supported');
      return;
    }
    Orientation.getSpecificOrientation((err, orientation) => {
      Alert.alert(`Specific orientation is ${ orientation }`);
    });
  }

  _updateOrientation = (orientation) => this.setState({ orientation });
  _updateSpecificOrientation = (specificOrientation) => this.setState({ specificOrientation });

  render() {
    const { init, orientation, specificOrientation } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={{ marginTop: 10, width: '100%' }} showsHorizontalScrollIndicator={false}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            {
              [
                `Initial Orientation: ${ init }`,
                `Current Orientation: ${ orientation }`,
                `Specific Orientation: ${ specificOrientation }`
              ].map((item, index) => {
                return (
                  <Text key={index} style={styles.instructions}>
                    {item}
                  </Text>
                );
              })
            }
            {
              [
                [Orientation.unlockAllOrientations, 'Unlock All Orientations'],
                [Orientation.lockToPortrait, 'Lock To Portrait'],
                [Orientation.lockToLandscapeLeft, 'Lock To Left'],
                [Orientation.lockToLandscape, 'Lock To Landscape'],
                [Orientation.lockToLandscapeRight, 'Lock To Right'],
                [Orientation.unlockAllOrientations, 'Unlock All Orientations'],
                [this._getOrientation, 'Get Orientation'],
                [this._getSpecificOrientation, 'Get Specific Orientation']
              ].map((item, index) => {
                return (
                  <TouchableOpacity key={index} style={styles.button} onPress={() => {
                    item[0].bind(this)();
                    Logger.trace(this, item[0], { action: item[1] });
                  }} >
                    <Text style={styles.buttonText}>{item[1]}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  button: {
    color: '#000',
    width: '90%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#555',
    fontSize: 18,
    padding: 5
  }
});
