import Radio from 'miot/ui/Radio';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class RadioExample extends React.Component {

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

  // 改变某个按钮的选中状态
  changeOne = (id) => {
    let { allRadios } = this.state;
    for (let field in allRadios) {
      let opt = allRadios[field].find((option) => id === option.id);
      if (opt) {
        // 找到了这一项
        if (opt.isChecked) {
          // 该项已选中
          return;
        }
        allRadios[field].forEach((option) => {
          option.isChecked = false;
        });
        opt.isChecked = true;
        this.setState((state) => {
          return { allRadios: state.allRadios };
        });
      }
    }
  }

  render() {
    let { allRadios } = this.state;
    let { sex, age, country } = allRadios;
    let viewSex = sex.map((option) => {
      return (
        <View
          style={styles.option}
          key={option.id}
        >
          <Radio
            isChecked={option.isChecked}
            changeCheck={this.changeOne}
            id={option.id}
            accessible={false}
            bigCircleStyle={{
              // borderWidth: 1,
              width: 32,
              height: 32,
              borderRadius: 16
            }}
            // smallCircleBg="#000"
          />
          <Text style={styles.text}>{option.value}</Text>
        </View>
      );
    });

    let viewAge = age.map((option) => {
      return (
        <View
          style={styles.option}
          key={option.id}
        >
          <Radio
            isChecked={option.isChecked}
            changeCheck={this.changeOne}
            id={option.id}
            label={option.value}
            // bigCircleStyle={{
            //   borderWidth: 4,
            //   width: 30,
            //   height: 30,
            //   borderRadius: 15
            // }}
            // checkedBigCircleStyle={{
            //   borderColorChecked: '#00C',
            //   backgroundColorChecked: '#33F',
            //   borderColor: '#666',
            //   backgroundColor: '#999'
            // }}
            disabled={option.disabled}
          />
          <Text style={styles.text}>{option.value}</Text>
        </View>
      );
    });

    let viewCountry = country.map((option) => {
      return (
        <View
          style={styles.option}
          key={option.id}
        >
          <Radio
            isChecked={option.isChecked}
            changeCheck={this.changeOne}
            id={option.id}
            accessibilityLabel={option.value}
            accessibilityHint="点击修改选中状态"
            // bigCircleStyle={{
            //   borderWidth: 2,
            //   width: 30,
            //   height: 30,
            //   borderRadius: 15
            // }}
            // checkedBigCircleStyle={{
            //   borderColorChecked: '#00C',
            //   backgroundColorChecked: '#33F',
            //   borderColor: '#666',
            //   backgroundColor: '#999'
            // }}
            disabled={option.disabled}
          />
          <Text style={styles.text}>{option.value}</Text>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
          {
            [
              ['选择性别：', viewSex],
              ['选择年龄段：', viewAge],
              ['选择国家：', viewCountry]
            ].map((item, index) => {
              return (
                <View key={index} style={{ backgroundColor: '#FFF', paddingHorizontal: 15, borderTopColor: '#0003', borderTopWidth: 0.5 }}>
                  <Text style={styles.field}>{item[0]}</Text>
                  {item[1]}
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 0
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
