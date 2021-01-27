import Separator from 'miot/ui/Separator';
import Switch from 'miot/ui/Switch';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Logger from '../Logger';

export default class SwitchDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: true,
      disabled: true
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}>

          <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: 200 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Switch value={this.state.value} onValueChange={(newValue) => {
                if (newValue === true) {
                  this.setState({
                    value: false
                  });
                }
              }} />
              <Text>我可以被关，但我是不会开的。。。</Text>
            </View>
            <Switch
              style={{ width: 50, height: 25 }}
              onTintColor="skyblue"
              tintColor="lightpink"
              value={this.state.value}
              disabled={this.state.disabled}
              onValueChange={(value) => console.log(value)}
            />
            <Switch
              style={{ width: 80, height: 40 }}
              onTintColor="lightblue"
              tintColor="lightpink"
              value={this.state.value}
              disabled={true}
              onValueChange={(value) => console.log(value)}
            />
            <Switch
              style={{ width: 120, height: 60 }}
              onTintColor="powderblue"
              tintColor="lightpink"
              value={this.state.value}
              disabled={this.state.disabled}
              onValueChange={(value) => console.log(value)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    setTimeout((_) => this.setState({
      disabled: false,
      value: false
    }), 2000);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});