import { Styles } from 'miot/resources';
import Separator from 'miot/ui/Separator';
import Switch from 'miot/ui/Switch';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default class SwitchDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type='dark'
          title={'开关demo'}
          style={{ backgroundColor: '#fff' }}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: true,
      disabled: true,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 200 }}>
            <Switch
              style={{ width: 50, height: 25 }}
              onTintColor='skyblue'
              tintColor='lightpink'
              value={this.state.value}
              disabled={this.state.disabled}
              onValueChange={value => console.log(value)}
            />
            <Switch
              style={{ width: 80, height: 40 }}
              onTintColor='lightblue'
              tintColor='lightpink'
              value={this.state.value}
              disabled={true}
              onValueChange={value => console.log(value)}
            />
            <Switch
              style={{ width: 120, height: 60 }}
              onTintColor='powderblue'
              tintColor='lightpink'
              value={this.state.value}
              disabled={this.state.disabled}
              onValueChange={value => console.log(value)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    setTimeout(_ => this.setState({
      disabled: false,
      value: false
    }), 2000);
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.common.backgroundColor,
    flex: 1,
  },
});