import { ColorPicker } from 'miot/ui';
import React from 'react';
import { View, ScrollView } from 'react-native';
import Logger from '../Logger';

export default class ColorPickerDemo extends React.Component {

  constructor(props) {
    super(props);
    Logger.trace(this);
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <ScrollView style={{ width: '100%' }}>
          <ColorPicker
            style={{ width: "80%", height: 300 }}
            type={'color'}
            onInit={(value) => {
              console.log('color: on init', value);
            }}
            onColorChangeStart={(value) => {
              console.log('color: on onColorChangeStart', value);
            }}
            onColorChange={(value) => {
              console.log('color: on onColorChange', value);
            }}
          />
          <View style={{ height: 50 }}></View>

          <ColorPicker
            style={{ width: "80%", height: 300 }}
            type={'white'}
            onInit={(value) => {
              console.log('color: on init', value);
            }}
            onColorChangeStart={(value) => {
              console.log('color: on onColorChangeStart', value);
            }}
            onColorChange={(value) => {
              console.log('color: on onColorChange', value);
            }}
          />

        </ScrollView>
      </View>
    );
  }
}