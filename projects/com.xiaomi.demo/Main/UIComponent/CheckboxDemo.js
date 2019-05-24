import Checkbox from 'miot/ui/Checkbox';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default class CheckboxDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type='dark'
          title='复选框 demo'
          style={{ backgroundColor: '#fff' }}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      checked1: true,
      checked2: false,
      checked3: true,
      checked4: false,
      checked5: true,
    }
  }

  render() {
    const list = [
      {
        style: { width: 20, height: 20 },
        checked: this.state.checked1,
        onValueChange: checked => this.setState({ checked1: checked })
      },
      {
        style: { width: 40, height: 40, borderRadius: 20 },
        checked: this.state.checked2,
        checkedColor: 'skyblue',
        onValueChange: checked => this.setState({ checked2: checked })
      },
      {
        style: { width: 60, height: 60 },
        checked: this.state.checked3,
        checkedColor: 'lightgreen',
        onValueChange: checked => this.setState({ checked3: checked })
      },
      {
        style: { width: 80, height: 80, borderRadius: 40 },
        checked: this.state.checked4,
        checkedColor: 'lightpink',
        onValueChange: checked => this.setState({ checked4: checked })
      },
      {
        style: { width: 100, height: 100 },
        checked: this.state.checked5,
        checkedColor: 'lightblue',
        onValueChange: checked => this.setState({ checked5: checked })
      }
    ]
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Separator />
        <ScrollView>
          <View style={{ flex: 1, padding: 10 }}>
            <View style={styles.container}>
              {list.map(item => <Checkbox key={item.checkedColor} {...item} />)}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  }
})