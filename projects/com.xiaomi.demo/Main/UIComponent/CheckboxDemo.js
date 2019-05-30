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
      checked: false,
    }
  }

  componentDidMount() {
    setTimeout(_ => this.setState({ checked: true }), 1000);
  }

  render() {
    console.log('render Demo');
    const list = [
      {
        style: { width: 20, height: 20 },
        checked: this.state.checked,
        onValueChange: checked => console.log(checked)
      },
      {
        style: { width: 40, height: 40, borderRadius: 20 },
        checked: this.state.checked,
        checkedColor: 'skyblue',
        onValueChange: checked => console.log(checked)
      },
      {
        style: { width: 60, height: 60 },
        checked: this.state.checked,
        checkedColor: 'lightgreen',
        onValueChange: checked => console.log(checked)
      },
      {
        style: { width: 80, height: 80, borderRadius: 40 },
        checked: this.state.checked,
        checkedColor: 'lightpink',
        onValueChange: checked => console.log(checked)
      },
      {
        style: { width: 100, height: 100 },
        checked: this.state.checked,
        checkedColor: 'lightblue',
        onValueChange: checked => console.log(checked)
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