import Card from 'miot/ui/Card';
import IndependentCard from 'miot/ui/IndependentCard';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const radiusValue = 10;

class IndependentCardDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type='dark'
          title='独立卡片'
          style={{ backgroundColor: '#fff' }}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      value1: false,
      value2: true,
      value3: true,
      value4: true
    };
  }

  //改变卡片开关的状态
  changeValue = (value, switchKey) => {
    this.setState(() => {
      return {
        [switchKey]: !value
      };
    });
  }

  //生成卡片
  createCard = (cardProps = {}) => {
    return (
      <IndependentCard
        {...cardProps}
      />
    );
  }

  render() {
    let { value1, value2, value3, value4 } = this.state;

    return (
      <View style={styles.container}>
        <Card
          innerView={this.createCard({
            picture: require('miot/resources/images/mihome.png'),
            title1: '独立卡片',
            changeValue: this.changeValue,
            switchKey: 'value1',
            value: value1,
            onTintColor: 'black'
          })}
          onPress={() => { }}
          underlayColor='rgba(0,0,0,.05)'
          cardStyle={{ borderRadius: radiusValue }}
        />
        <Card
          innerView={this.createCard({
            picture: require('miot/resources/images/mihome.png'),
            title1: 'top card top card top card top card top card',
            title2: '副标题副标题副标题副标题副标题副标题副标题副标题副标题',
            changeValue: this.changeValue,
            value: value2,
            switchKey: 'value2',
            // radiusType: 'top'
          })}
          onPress={() => { }}
          underlayColor='rgba(0,0,0,.05)'
          cardStyle={{
            borderTopLeftRadius: radiusValue,
            borderTopRightRadius: radiusValue,
          }}
          showShadow={false}
        />
        <Card
          innerView={this.createCard({
            picture: require('miot/resources/images/mihome.png'),
            title1: '不可点击',
            title2: '副标题副标题副标题',
            value: value3,
            disabledCard: true,
            disabled: true
          })}
          showShadow={false}
          cardStyle={{ marginTop: 0, }}
        />
        <Card
          innerView={this.createCard({
            picture: require('miot/resources/images/mihome.png'),
            title1: '下方卡片',
            value: value4,
            changeValue: this.changeValue,
            switchKey: 'value4',
          })}
          cardStyle={{
            marginTop: 0,
            borderBottomLeftRadius: radiusValue,
            borderBottomRightRadius: radiusValue,
          }}
          onPress={() => { }}
          underlayColor='rgba(0,0,0,.05)'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

export default IndependentCardDemo;