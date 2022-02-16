import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ColorPicker } from "miot/ui/ColorPicker";

export default class ColorPickerDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      showIndicator: true
    };
  }


  render() {
    return (<View style={ { flex: 1 } }>
      <ColorPicker
        disable={ this.state.disable }
        showIndicator={this.state.showIndicator}
        type="color"
        style={ Styles.colorPicker }
        onInit={ () => {
          console.log('ColorPicker', 'onInit');
        } }
        onColorChange={ (color, trackType, position) => {
          console.log('ColorPicker', 'onColorChange color = ', color, ' trackType = ', trackType);
        } }
        onColorChangeStart={ (color) => {
          console.log('ColorPicker', 'onColorChangeStart color = ', color);
        } }
      />
      <ColorPicker
        disable={ this.state.disable }
        showIndicator={this.state.showIndicator}
        type="white"
        style={ [Styles.colorPicker, { marginTop: 20 }] }
        onInit={ () => {
          console.log('WhiteColorPicker', 'onInit');
        } }
        onColorChange={ (color, trackType, position) => {
          console.log('WhiteColorPicker', 'onColorChange color = ', color, ' trackType = ', trackType, ' position = ', position);
        } }
        onColorChangeStart={ (color) => {
          console.log('WhiteColorPicker', 'onColorChangeStart color = ', color);
        } }
      />
      <TouchableOpacity style={ Styles.button } onPress={ () => {
        this.setState({
          disable: !this.state.disable
        });
      } }>
        <Text style={ Styles.buttonText }>{ 'disable' }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ Styles.button } onPress={ () => {
        this.setState({
          showIndicator: !this.state.showIndicator
        });
      } }>
        <Text style={ Styles.buttonText }>{ 'showIndicator' }</Text>
      </TouchableOpacity>
    </View>);
  }
}

const Styles = StyleSheet.create({
  colorPicker: {
    height: 200
  },
  button: {
    color: '#000',
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    alignSelf: 'center',
    color: '#555',
    fontSize: 14,
    padding: 5
  }
});
