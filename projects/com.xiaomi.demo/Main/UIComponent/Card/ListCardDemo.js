import ListCard from 'miot/ui/Card/ListCard';
import React from 'react';
import Separator from 'miot/ui/Separator';
import { Styles } from 'miot/resources';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import Logger from '../../Logger';

const { width } = Dimensions.get('window');
class GearCardDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      themeColor: true
    };
    this.props.navigation.setParams({
      title: "新版米家List卡片"
    });
    Logger.trace(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListCard
            title="最简单tab卡片"
            icon={require('../images/auto-press.jpg')}
            radiusType={ListCard.CARD_RADIUS_TYPE.TOP}
          />
          <ListCard
            title="开关卡片"
            subtitle="列表主文案超出，文案最多列表主文案超出，文案最多"
            type={ListCard.TYPE.SWITCH}
            showSeparator
            switchOption={{
              onTintColor: this.state.themeColor ? Styles.common.MHGreen : 'red',
              onSwitchValueChange: () => { this.setState((prev) => ({ themeColor: !prev.themeColor })); }
            }}
            themeColor={this.state.themeColor ? Styles.common.MHGreen : 'red'}
            radiusType={ListCard.CARD_RADIUS_TYPE.NONE}
            icon={require('../images/auto-press.jpg')}
          />
          <ListCard
            title="右侧箭头卡片"
            subtitle="列表主文案超出，文案最多"
            type={ListCard.TYPE.ARROW}
            radiusType={ListCard.CARD_RADIUS_TYPE.NONE}
            showSeparator
            icon={require('../images/auto-press.jpg')}
            titleNumberOfLines={2}
            subtitleNumberOfLines={2}
            onPress={() => { console.log('点击'); }}
          />
          <ListCard
            title="单选控制卡片状态"
            subtitle="列表主文案超出，文案最多"
            type={ListCard.TYPE.CHOICE}
            radiusType={ListCard.CARD_RADIUS_TYPE.NONE}
            showSeparator
            icon={require('../images/auto-press.jpg')}
            choiceOption={{
              checkedColor: 'red',
              onValueChange: () => console.log('单选')
            }}
          />
          <ListCard
            title="开关控制卡片icon"
            subtitle="列表主文案超出，文案最多列表主文案超"
            type={ListCard.TYPE.BUTTON}
            showSeparator
            icon={this.state.disable ? require('../images/auto-press.jpg') : null}
            radiusType={ListCard.CARD_RADIUS_TYPE.NONE}
            buttonOption={{
              title: '开关',
              onPress: () => this.setState((prev) => ({ disable: !prev.disable }))
            }}
          />
          <ListCard
            title="无控片状态"
            subtitle="列表主文案超出，文案最多"
            showSeparator
            type={ListCard.TYPE.NONE}
            value="超长Value值超长Value值超长Value值"
            radiusType={ListCard.CARD_RADIUS_TYPE.NONE}
            icon={require('../images/auto-press.jpg')}
            onPress={() => { console.log('点击'); }}
          />
          <ListCard
            title="开aaaaa关"
            icon={require('../images/auto-press.jpg')}
            type={ListCard.TYPE.ARROW}
            value="超长Value值超长Value值超长Value值超"
            radiusType={ListCard.CARD_RADIUS_TYPE.BOTTOM}
            onPress={() => { console.log('点击1'); }}
            showSeparator={false}
          />
          <Text style={{ marginVertical: 20 }}>极限状态/大字体模式/自定义样式</Text>
          <ListCard
            title="列表主文案超出，文案最多支持两行，超出用…列表主文案超出，文案最多支持两行，超出用…"
            titleNumberOfLines={2}
            showSeparator
            currentIndex={0}
            radiusType={ListCard.CARD_RADIUS_TYPE.TOP}
            type={ListCard.TYPE.ARROW}
            titleStyle={{ lineHeight: 22 }}
          />
          <ListCard
            title="自定义下划线，文案最多支持两行，超出用…列表主文案超出，文案最多支持两行，超出用…"
            subtitle="列表主文案超出，文案最多支持两行，超出用…列表主文案超出，文案最多支持两行，超出用…"
            subtitleNumberOfLines={2}
            titleNumberOfLines={2}
            type={ListCard.TYPE.SWITCH}
            showSeparator
            onTintColor={this.state.themeColor ? Styles.common.MHGreen : 'red'}
            themeColor={this.state.themeColor ? Styles.common.MHGreen : 'red'}
            radiusType={ListCard.CARD_RADIUS_TYPE.NONE}
            onSwitchValueChange={() => { this.setState((prev) => ({ themeColor: !prev.themeColor })); }}
            allowFontScaling={false}
            subtitleStyle={{ lineHeight: 18 }}
            titleStyle={{ lineHeight: 22 }}
            unlimitedHeightEnable
            separator={<Separator style={{ backgroundColor: 'red' }} />}
          />
          <ListCard
            title="列表主文案超出，文案最多支持两行，超出用…列表主文案超出，文案最多支持两行，超出用…"
            subtitle="列表主文案超出，文案最多支持两行，超出用…列表主文案超出，文案最多支持两行，超出用…"
            subtitleNumberOfLines={2}
            titleNumberOfLines={2}
            type={ListCard.TYPE.BUTTON}
            showSeparator
            disabled
            radiusType={ListCard.CARD_RADIUS_TYPE.BOTTOM}
            allowFontScaling={false}
            subtitleStyle={{ lineHeight: 18 }}
            titleStyle={{ lineHeight: 22 }}
            unlimitedHeightEnable
          />
          <ListCard
            title="开关控制卡片列表主文案超出，文案最多支持安德森两行状态"
            subtitle="开关控制卡片列表主文案超出，文案最多支持安德森两行状态"
            type={ListCard.TYPE.CHOICE}
            radiusType={ListCard.CARD_RADIUS_TYPE.NONE}
            allowFontScaling={false}
            switchValue={!this.state.disable}
            unlimitedHeightEnable
            showSeparator={false}
            titleNumberOfLines={2}
            subtitleNumberOfLines={2}
            subtitleStyle={{ lineHeight: 20, fontSize: 19 }}
            titleStyle={{ lineHeight: 24, fontSize: 21 }}
            onPress={(index) => { console.log('点击'); }}
            cardStyle={{ marginHorizontal: 20, width: width - 60 }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
    // backgroundColor: 'black'
  }
});

export default GearCardDemo;
