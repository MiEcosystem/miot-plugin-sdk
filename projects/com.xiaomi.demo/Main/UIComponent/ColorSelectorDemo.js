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
      showBorder: true,
      showWhite: true,
      indicatorTexts: []
    };
  }

  render() {
    let { disable, showIndicator, indicatorRadius, allowIndicatorOverlap, showIndicatorText, indicatorTexts, showBorder: showBorder, showWhite } = this.state;
    return (<View style={ { flex: 1 } }>
      <ColorSelector
        ref={(ref) => { this.colorSelector = ref; }}
        style={[Styles.colorPicker, { marginTop: 20 }]}
        type={'rgb'}
        disable={disable}
        showIndicator={showIndicator}
        indicatorRadius={indicatorRadius}
        allowIndicatorOverlap={allowIndicatorOverlap}
        showIndicatorText={showIndicatorText}
        showBorder={showBorder}
        showWhite={showWhite}
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
        this.setState({
          showBorder: !this.state.showBorder
        });
      } }>
        <Text style={ Styles.buttonText }>{ 'showBorder' }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ Styles.button } onPress={ () => {
        this.setState({
          showWhite: !this.state.showWhite
        });
      } }>
        <Text style={ Styles.buttonText }>{ 'showWhite' }</Text>
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
      <TouchableOpacity style={ Styles.button } onPress={ () => {
        let radius = 10;
        if (Math.random() > 0.3) {
          radius = 20;
        } else if (Math.random() > 0.6) {
          radius = 30;
        } else {
          radius = 40;
        }
        this.setState({
          indicatorRadius: radius
        });
      } }>
        <Text style={ Styles.buttonText }>{ 'setIndicatorRadius random 10 / 20 / 30 / 40' }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ Styles.button } onPress={ () => {
        this.setState({
          allowIndicatorOverlap: !allowIndicatorOverlap
        });
      } }>
        <Text style={ Styles.buttonText }>{ `是否允许指示器滑动重叠：${ allowIndicatorOverlap ? '允许重叠' : '不允许重叠' }`}</Text>
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
