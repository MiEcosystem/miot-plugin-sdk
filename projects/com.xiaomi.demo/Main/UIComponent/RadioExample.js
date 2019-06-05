import Radio from 'miot/ui/Radio';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class RadioExample extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type='dark'
          title='单选按钮'
          style={{ backgroundColor: '#fff' }}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      allRadios: {
        sex: [
          {
            id: 0,
            isChecked: true,
            value: '男'
          },
          {
            id: 1,
            isChecked: false,
            value: '女'
          }
        ],
        age: [
          {
            id: 2,
            isChecked: false,
            value: '0--10'
          },
          {
            id: 3,
            isChecked: false,
            value: '11--20'
          },
          {
            id: 4,
            isChecked: false,
            value: '21--30'
          },
          {
            id: 5,
            isChecked: false,
            value: '101--110',
            disabled: true
          }
        ],
        country: [
          {
            id: 6,
            isChecked: true,
            value: '中国',
            disabled: true
          },
          {
            id: 7,
            isChecked: false,
            value: '美国',
            disabled: true
          }
        ]
      }
    };
  }

  //改变某个按钮的选中状态
  changeOne = (id) => {
    let { allRadios } = this.state;

    for (let field in allRadios) {
      let opt = allRadios[field].find(option => id === option.id);

      if (opt) {
        //找到了这一项
        if (opt.isChecked) {
          //该项已选中
          return;
        }

        allRadios[field].forEach(option => {
          option.isChecked = false;
        });

        opt.isChecked = true;

        this.setState(state => {
          return { allRadios: state.allRadios };
        });
      }
    }
  }

  render() {
    let { allRadios } = this.state;
    let { sex, age, country } = allRadios;

    let viewSex = sex.map(option => {
      return (
        <View
          style={styles.option}
          key={option.id}
        >
          <Radio
            isChecked={option.isChecked}
            changeCheck={this.changeOne}
            id={option.id}
            bigCircleStyle={{
              borderWidth: 2,
              width: 30,
              height: 30,
              borderRadius: 15
            }}
          />
          <Text style={styles.text}>{option.value}</Text>
        </View>
      );
    });

    let viewAge = age.map(option => {
      return (
        <View
          style={styles.option}
          key={option.id}
        >
          <Radio
            isChecked={option.isChecked}
            changeCheck={this.changeOne}
            id={option.id}
            bigCircleStyle={{
              borderWidth: 4,
              width: 40,
              height: 40,
              borderRadius: 20
            }}
            checkedBigCircleStyle={{
              borderColorChecked: '#00C',
              backgroundColorChecked: '#33F',
              borderColor: '#666',
              backgroundColor: '#999'
            }}
            disabled={option.disabled}
          />
          <Text style={styles.text}>{option.value}</Text>
        </View>
      );
    });

    let viewCountry = country.map(option => {
      return (
        <View
          style={styles.option}
          key={option.id}
        >
          <Radio
            isChecked={option.isChecked}
            changeCheck={this.changeOne}
            id={option.id}
            bigCircleStyle={{
              borderWidth: 2,
              width: 30,
              height: 30,
              borderRadius: 15
            }}
            checkedBigCircleStyle={{
              borderColorChecked: '#00C',
              backgroundColorChecked: '#33F',
              borderColor: '#666',
              backgroundColor: '#999'
            }}
            disabled={option.disabled}
          />
          <Text style={styles.text}>{option.value}</Text>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <Text style={styles.field}>选择性别：</Text>
        {viewSex}
        <Separator />
        <Text style={styles.field}>选择年龄段：</Text>
        {viewAge}
        <Text style={styles.field}>选择国家：</Text>
        {viewCountry}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
  },
  option: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 10
  },
  field: { paddingTop: 10 }
});