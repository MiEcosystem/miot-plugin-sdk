import { Images } from 'miot/resources';
import Card from 'miot/ui/Card';
import MHCard from 'miot/ui/Card/MHCard';
import ModeCard from 'miot/ui/Card/ModeCard';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const ICON_SIZE = 40;
const DEFAULT_MARGIN = 10;

export default class AdaptedFontCardDemo extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    header: <TitleBar
      type="dark"
      title="卡片 大字体模式"
      style={{ backgroundColor: '#fff', fontSize: 40 }}
      onPressLeft={() => navigation.goBack()}
    />
  });

  constructor(props, context) {
    super(props, context);
    this.modelCardSource = [
      {
        description: '自动',
        icon: {
          normal: require('../images/auto.jpg'),
          press: require('../images/auto-press.jpg'),
          active: require('../images/auto-active.jpg'),
          activeDisabled: require('../images/auto-activeDisabled.jpg')
        },
        isDisabled: false,
        isActive: false,
        isPressing: false
      },
      {
        description: '睡眠',
        icon: {
          normal: require('../images/sleep.jpg'),
          press: require('../images/sleep-press.jpg'),
          active: require('../images/sleep-active.jpg'),
          activeDisabled: require('../images/sleep-activeDisabled.jpg')
        },
        isDisabled: false,
        isActive: true,
        isPressing: false
      },
      {
        description: '我的最爱',
        icon: {
          normal: require('../images/love.jpg'),
          press: require('../images/love-press.jpg'),
          active: require('../images/love-active.jpg'),
          activeDisabled: require('../images/love-activeDisabled.jpg')
        },
        isDisabled: false,
        isActive: false,
        isPressing: false
      }
    ];
    this.state = {
    };
  }

  getInnerView() {
    return (
      <View style={styles.innerContainer}>
        <Image
          style={styles.innerIcon}
          source={Images.common.mihome}
          resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 25, color: '#333' }}
            numberOfLines={2}
            allowFontScaling={false}
            ellipsizeMode="tail">{'自定义innerView的标题'}</Text>
          <Text
            style={{ fontSize: 23, color: '#666' }}
            numberOfLines={2}
            allowFontScaling={false}
            ellipsizeMode="tail" >{'自定义innerView的副标题'}
          </Text>
        </View>
      </View >
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Separator style={{ height: 0.75 }} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }} allowFontScaling={false}>简单Card</Text>
            <Card
              icon={Images.common.mihome}
              text="默认卡片有icon/文字/蓝色阴影，没有圆角/右上角x"
              textStyle={styles.cardTitleStyle}
              cardStyle={{ marginBottom: 20, paddingVertical: 20 }}
              shadowColor="#4287f5"
              shadowOpacity={0.5}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              numberOfLines={0}
            />
            <Text style={{ fontSize: 14 }} allowFontScaling={false}>设置unlimitedHeightEnable为true</Text>
            <Card
              icon={Images.common.mihome}
              text="默认卡片有icon/文字/蓝色阴影/，没有圆角/右上角x"
              textStyle={styles.cardTitleStyle}
              cardStyle={{ marginBottom: 20, paddingVertical: 20 }}
              shadowColor="#4287f5"
              shadowOpacity={0.5}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              numberOfLines={2}
            />
            <Text style={{ fontSize: 14 }} allowFontScaling={false}>设置numberOfLines</Text>
            <Card
              text="没有图标，没有阴影，只有文字"
              textStyle={styles.cardTitleStyle}
              cardStyle={{ paddingHorizontal: 5, paddingVertical: 10 }}
              showShadow={false}
              showDismiss={true}
              underlayColor="#000"
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              numberOfLines={2}
            />
            <Text style={{ fontSize: 14, marginTop: 10 }} allowFontScaling={false}>只有文字</Text>
            <Card
              icon={Images.common.mihome}
              text="自定义卡片Text"
              cardStyle={{ width: width / 3 * 2, borderRadius: 12, backgroundColor: 'pink', paddingVertical: 10 }}
              iconStyle={{ width: ICON_SIZE, height: ICON_SIZE }}
              textStyle={{ fontSize: 30, color: 'red' }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              numberOfLines={0}
            />
            <Text style={{ fontSize: 14, marginTop: 10 }} allowFontScaling={false}>自定义卡片</Text>
            <Card
              innerView={this.getInnerView()}
              dismiss={() => this.setState({ visible4: false })}
              showShadow={false}
              showDismiss={false}
              onPress={() => this.setState({ visible3: false })}
              cardStyle={{ width: 300, paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
            />
            <Text style={{ fontSize: 14, marginTop: 10 }} allowFontScaling={false}>自定义innerView</Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }} allowFontScaling={false}>复杂Card</Text>
            <MHCard
              title="定时"
              titleStyle={styles.cardTitleStyle}
              hideArrow={true}
              cardType={MHCard.CARD_TYPE.NORMAL}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.TOP}
              onPress={() => console.log('onPress')}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              showShadow={false}
              titleNumberOfLines={0}
            />
            <Separator style={{ height: 0.75 }} />
            <MHCard
              title="定时设置多行文字"
              titleStyle={styles.cardTitleStyle}
              hideArrow={false}
              cardType={MHCard.CARD_TYPE.NORMAL}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.NONE}
              disabled={false}
              onPress={() => console.log('onPress')}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
            />
            <Separator style={{ height: 0.75 }} />
            <MHCard
              title="定时设置多行文字"
              titleStyle={styles.cardTitleStyle}
              hideArrow={true}
              cardType={MHCard.CARD_TYPE.NORMAL}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.BOTTOM}
              disabled={true}
              onPress={() => console.log('onPress')}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
            />
            <Text style={{ fontSize: 14, marginTop: 10 }} allowFontScaling={false}>单行title复杂卡片样式</Text>
            <MHCard
              title="滤芯购买"
              titleStyle={styles.cardTitleStyle}
              subtitle="约可用27天"
              subtitleStyle={styles.cardSubTitleStyle}
              rightText="20%"
              rightTextStyle={styles.cardRightTextStyle}
              marginTop={15}
              cardType={MHCard.CARD_TYPE.NORMAL}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.TOP}
              onPress={() => console.log('onPress')}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={0}
              rightTextNumberOfLines={0}
            />
            <Separator style={{ height: 0.75 }} />
            <MHCard
              title="请更换滤芯"
              titleStyle={styles.cardTitleStyle}
              subtitle="只剩下不到7天可用"
              subtitleStyle={styles.cardSubTitleStyle}
              rightText="去商城购买滤芯"
              rightTextStyle={styles.cardRightTextStyle}
              cardType={MHCard.CARD_TYPE.NORMAL}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.NONE}
              onPress={() => console.log('onPress')}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={0}
              rightTextNumberOfLines={3}
            />
            <Separator style={{ height: 0.75 }} />
            <MHCard
              title="请更换滤芯"
              titleStyle={styles.cardTitleStyle}
              subtitle="只剩下不到7天可用"
              subtitleStyle={styles.cardSubTitleStyle}
              rightText="去商城购买滤芯"
              rightTextStyle={styles.cardRightTextStyle}
              cardType={MHCard.CARD_TYPE.NORMAL}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.BOTTOM}
              onPress={() => console.log('onPress')}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={1}
              subtitleNumberOfLines={1}
              rightTextNumberOfLines={2}
            />
            <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 20 }} allowFontScaling={false}>左右结构多行复杂卡片样式</Text>
            <MHCard
              title="运行异常提醒"
              titleStyle={styles.cardTitleStyle}
              subtitle="当设备运行异常时，将通知提醒您"
              subtitleStyle={styles.cardSubTitleStyle}
              switchValue={this.state.value}
              onTintColor="#67b688"
              onValueChange={(value) => console.log(value)}
              cardType={MHCard.CARD_TYPE.SWITCH}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.TOP}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
            />
            <Separator style={{ height: 0.75 }} />
            <MHCard
              title="运行异常提醒"
              titleStyle={styles.cardTitleStyle}
              subtitle="当设备运行异常时，将通知提醒您"
              subtitleStyle={styles.cardSubTitleStyle}
              switchValue={this.state.value}
              onTintColor="#67b688"
              onValueChange={(value) => console.log(value)}
              cardType={MHCard.CARD_TYPE.SWITCH}
              showShadow={true}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.BOTTOM}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={1}
              subtitleNumberOfLines={2}
            />
            <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 20 }} allowFontScaling={false}>switch多行复杂卡片样式</Text>
            <Separator style={{ height: 0.75 }} />
            <MHCard
              title="警报器提示音"
              titleStyle={styles.cardTitleStyle}
              onValueChange={(value) => console.log(value)}
              switchValue={this.state.value}
              onTintColor="#67b688"
              cardType={MHCard.CARD_TYPE.SWITCH}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.NONE}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
            />
            <Separator style={{ height: 0.75 }} />
            <MHCard
              title="警报器提示音"
              titleStyle={styles.cardTitleStyle}
              disabled={true}
              onValueChange={(value) => console.log(value)}
              switchValue={this.state.value}
              onTintColor="#67b688"
              cardType={MHCard.CARD_TYPE.SWITCH}
              cardRadiusType={MHCard.CARD_RADIUS_TYPE.NONE}
              style={{ paddingVertical: 10 }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
            />
            <Separator style={{ height: 0.75 }} />
            <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 20 }} allowFontScaling={false}>switch单行复杂卡片样式</Text>
            <ModeCard
              modes={this.modelCardSource}
              showShadow={false}
              modeCardStyle={{
                marginTop: 20
              }}
              descriptionStyle={{
                fontSize: 18,
                color: '#333'
              }}
              activeDescriptionStyle={{
                fontSize: 20,
                color: 'blue'
              }}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              numberOfLines={0}
            />
            <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }} allowFontScaling={false}>模式卡片样式</Text>
            <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 20 }} allowFontScaling={false}>(模式卡片只有数量小于5个的时候才显示底部文字)</Text>
          </View>
        </ScrollView>
      </View >
    );
  }

  componentDidMount() {
    setTimeout(() => this.setState({ value: true }), 1000);
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
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
  cardTitleStyle: {
    fontSize: 28,
    color: '#333'
  },
  cardSubTitleStyle: {
    fontSize: 23,
    color: '#666'
  },
  cardRightTextStyle: {
    fontSize: 22,
    color: '#333'
  }
});
