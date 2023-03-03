import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ColorSelector } from "miot/ui";

export default class ColorSelectorDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      showIndicator: true,
      showIndicatorText: true,
      indicatorTexts: []
    };
  }

  render() {
    let { disable, showIndicator, showIndicatorText, indicatorTexts } = this.state;
    return (<View style={ { flex: 1 } }>
      <ColorSelector
        ref={(ref) => { this.colorSelector = ref; }}
        style={[Styles.colorPicker, { marginTop: 20 }]}
        type={'rgb'}
        disable={disable}
        showIndicator={showIndicator}
        showIndicatorText={showIndicatorText}
        indicatorTexts={indicatorTexts}
        onColorChange={ (data) => {
          console.log('ColorSelector onColorChange data: ', data);
        }}
        onTrackStart={ (data) => {
          console.log('ColorSelector onTrackStart data: ', data);
        }}
        onTrackEnd={ (data) => {
          console.log('ColorSelector onTrackEnd data: ', data);
        }}
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
      <TouchableOpacity style={ Styles.button } onPress={ () => {
        this.setState({
          showIndicatorText: !this.state.showIndicatorText
        });
      } }>
        <Text style={ Styles.buttonText }>{ 'showIndicatorText' }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ Styles.button } onPress={ () => {
        let texts = [String(Math.random()).slice(2, 4), String(Math.random()).slice(2, 4)];
        this.setState({
          indicatorTexts: texts
        });
      } }>
        <Text style={ Styles.buttonText }>{ 'indicatorTexts[randomInt, randomInt]' }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ Styles.button } onPress={ () => {
        if (Math.random() > 0.5) {
          this.colorSelector.setIndicatorNumberWithColors(2, ['#7BFF6E', '#D2FC53']);
        } else {
          this.colorSelector.setIndicatorNumberWithColors(1, ['#7BFF6E']);
        }
      } }>
        <Text style={ Styles.buttonText }>{ 'setIndicatorNumberWithColors' }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ Styles.button } onPress={ () => {
        if (Math.random() > 0.3) {
          this.colorSelector.setColorWithIndex('#FF2600', 0);
        } else if (Math.random() > 0.6) {
          this.colorSelector.setColorWithIndex('#7BFF6E', 0);
        } else {
          this.colorSelector.setColorWithIndex('#D2FC53', 0);
        }
      } }>
        <Text style={ Styles.buttonText }>{ 'setColorWithIndex' }</Text>
      </TouchableOpacity>
    </View>);
  }
}

const Styles = StyleSheet.create({
  colorPicker: {
    width: '100%',
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
