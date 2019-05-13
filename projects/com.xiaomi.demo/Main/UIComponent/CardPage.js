import { Images, Styles } from 'miot/resources';
import Card from 'miot/ui/Card';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const ICON_SIZE = 40;
const DEFAULT_MARGIN = 10;

export default class CardPage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    header: <TitleBar
      type="dark"
      title="卡片"
      style={{ backgroundColor: '#fff' }}
      onPressLeft={_ => navigation.goBack()}
    />
  });

  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: true,
      visible1: true,
      visible2: true,
      visible3: true,
      visible4: true,
      text: '隐藏全部'
    };
  }

  getInnerView() {
    return (
      <View style={styles.innerContainer}>
        <Image
          style={styles.innerIcon}
          source={Images.common.mihome}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text
            style={styles.innerTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {'自定义innerView的标题'}
          </Text>
          <Text
            style={styles.innersubTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {'自定义innerView的副标题'}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ width, height, alignItems: 'center' }}>
            <Card
              icon={Images.common.mihome}
              text="默认卡片，有icon，有阴影，右上角没有x"
              visible={this.state.visible1}
              showDismiss
              dismiss={_ => this.setState({ visible1: false })}
            />
            <Card
              text="没有图标，没有阴影，只有文字"
              visible={this.state.visible2}
              dismiss={_ => this.setState({ visible2: false })}
              showShadow={false}
              showDismiss
              onPress={_ => this.setState({ visible1: false })}
            />
            <Card
              icon={Images.common.mihome}
              text="自定义卡片"
              visible={this.state.visible3}
              dismiss={_ => this.setState({ visible3: false })}
              showDismiss
              onPress={_ => this.setState({ visible2: false })}
              cardStyle={{ width: width / 2, height: 75, borderRadius: 12, backgroundColor: 'pink' }}
              iconStyle={{ width: ICON_SIZE, height: ICON_SIZE }}
              textStyle={{ fontSize: 10, color: 'red' }}
            />
            <Card
              innerView={this.getInnerView()}
              visible={this.state.visible4}
              dismiss={_ => this.setState({ visible4: false })}
              showShadow={false}
              showDismiss
              onPress={_ => this.setState({ visible3: false })}
              cardStyle={{ width: 222, height: 80 }}
            />
            <Card
              text={this.state.text}
              onPress={_ => this.toggle()}
              cardStyle={{ width: 100, height: 66, backgroundColor: Styles.common.MHGreen, borderRadius: 15 }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  toggle() {
    const interval = 500;
    const visible = !this.state.visible;
    const text = visible ? '隐藏全部' : '显示全部';
    this.setState({ text, visible });
    setTimeout(_ => this.setState({ visible1: visible }), interval * 1);
    setTimeout(_ => this.setState({ visible2: visible }), interval * 2);
    setTimeout(_ => this.setState({ visible3: visible }), interval * 3);
    setTimeout(_ => this.setState({ visible4: visible }), interval * 4);
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: DEFAULT_MARGIN
  },
  innerIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: DEFAULT_MARGIN
  },
  innerTitle: {
    fontSize: 16
  },
  innersubTitle: {
    fontSize: 14,
    color: '#333'
  }
});
