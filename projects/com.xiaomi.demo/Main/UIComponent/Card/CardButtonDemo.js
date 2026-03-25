import CardButton from 'miot/ui/CardButton';
import { ContainerWithGap } from 'miot/ui';
import React from 'react';
import { Styles } from 'miot/resources';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import Logger from '../../Logger';

const { width } = Dimensions.get('window');
class CardButtonDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      themeColor: true
    };
    this.props.navigation.setParams({
      title: "标准米家卡片"
    });
    Logger.trace(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{
          width: '100%'
        }} contentContainerStyle={{
          width: '100%',
          alignItems: 'center'
        }}>
          <ContainerWithGap gap={12} containerStyle={{
            width: '100%',
            paddingHorizontal: 12
          }}>
            <CardButton
              title="主副标题"
              subtitle="我是萌萌的副标题"
              rightArrow={true}
            />
            <CardButton
              title="主副标题+右侧value"
              subtitle="我是萌萌的副标题"
              rightText={'右侧的value'}
              icon={require('../images/auto-press.jpg')}
              rightArrow={true}
            />
            <CardButton
              title="开关卡片"
              subtitle="开关的副标题"
              icon={require('../images/auto-press.jpg')}
              onSwitch={(value) => {

              }}
              switchOn={true}
              themeColor={this.state.themeColor ? Styles.common.MHGreen : 'red'}
            />
            <CardButton
              title="旋转图标卡片"
              subtitle="蓝牙连接中"
              iconRotating={true}
              icon={require('../images/loading.png')}
              iconStyle={{
                width: 30,
                height: 30,
                resizeMode: 'cover'
              }}
              themeColor={'rgba(255, 153, 0, 0.1)'}
              titleNumberOfLines={2}
              subtitleNumberOfLines={2}
              onPress={() => { console.log('点击'); }}
              rightArrow={true}
            />
            <CardButton
              title="单选控制卡片状态"
              subtitle="单选副标题"
              checked={true}
              onSingleSelect={(value) => {
                console.log('onSingleSelect---value', value);
              }}
              icon={require('../images/auto-press.jpg')}
            />
            <CardButton
              title="多选卡片"
              subtitle="副标题"
              checked={true}
              onMultipleSelect={(value) => {
                console.log('onMultipleSelect---value', value);
              }}
              icon={require('../images/auto-press.jpg')}
            />
          </ContainerWithGap>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // padding: 10
    // backgroundColor: 'black'
  }
});

export default CardButtonDemo;
