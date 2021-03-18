import GearCard from 'miot/ui/Card/GearCard';
import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Logger from '../../Logger';

class GearCardDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      arr: Array.from({ length: 3 }, (v, i) => `${ i + 1 }挡`)
    };
    this.props.navigation.setParams({
      title: "滑动档位卡片"
    });
    Logger.trace(this);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <GearCard
            title="最简单tab卡片"
            subtitle="as输输入输输入dqwe"
            showSwitch={true}
            titleNumberOfLines={3}
            currentIndex={0}
            disabledGear={this.state.disable}
            switchValue={!this.state.disable}
            onSwitchValueChange={(prev) => { this.setState({ disable: !prev }); }}
            options={Array.from({ length: 5 }, (v, i) => `${ i + 1 }挡`)}
          >
          </GearCard>
          <GearCard
            title="最简单tab卡片"
            currentIndex={1}
            options={Array.from({ length: 4 }, (v, i) => `${ i + 1 }挡`)}
          >
          </GearCard>
          <GearCard
            title="开关控制卡片状态"
            subtitle="as输输入输输入输输dqwe"
            showSwitch={true}
            currentIndex={2}
            titleNumberOfLines={2}
            subtitleNumberOfLines={2}
            onSwitchValueChange={() => { this.setState({ arr: Array.from({ length: 4 }, (v, i) => `${ i + 1 }挡`) }); }}
            options={this.state.arr}
            onPress={(index) => { console.log('点击', index); }}
          >
          </GearCard>
          <GearCard
            title="最简单简单请上哈哈是的"
            subtitle="as输输输入输输dqwe"
            showSwitch={true}
            allowFontScaling={false}
            currentIndex={2}
            cardType={GearCard.CARD_TYPE.DOT}
            titleNumberOfLines={1}
            subtitleNumberOfLines={1}
            options={Array.from({ length: 9 }, (v, i) => i + 1)}
            onPress={(index) => { console.log('点击', index); }}
          ></GearCard>
          <GearCard
            currentIndex={0}
            disabledGear
            options={Array.from({ length: 2 }, (v, i) => `${ i + 1 }挡`)}
          />
          <GearCard
            title="最简单简单gear卡片"
            subtitle="as输输入输输入dqwe"
            cardType={GearCard.CARD_TYPE.SLIDER}
            onSliderValueChange={(value) => console.log(value)}
            onSlidingComplete={() => console.log('完成')}
            showSwitch={true}
            sliderProps={{
              value: 10,
              optionStep: 5,
              showDots: 0.25
            }}
            options={Array.from({ length: 40 }, (v, i) => i * 5)}
          />
          <Text style={{ marginTop: 20 }}>大字体模式</Text>
          <GearCard
            title="最简单最弹窗asd"
            subtitle="as输输入输输入dqwe"
            showSwitch={true}
            currentIndex={0}
            unlimitedHeightEnable
            titleNumberOfLines={2}
            allowFontScaling={false}
            options={Array.from({ length: 5 }, (v, i) => `${ i + 1 }挡`)}
            subtitleStyle={styles.cardSubTitleStyle}
            titleStyle={styles.cardTitleStyle}
            gearTextStyle={styles.cardSubTitleStyle}
            style={{ marginBottom: 10 }}
          />

          <GearCard
            title="我是可滑动的Tab类型选项"
            subtitle="as输输入输输入dqwe"
            showSwitch={true}
            currentIndex={0}
            unlimitedHeightEnable
            onValueChange={(v) => console.log('vvv:', v)}
            cardType={GearCard.CARD_TYPE.TAB}
            titleNumberOfLines={2}
            allowFontScaling={false}

            options={Array.from({ length: 10 }, (v, i) => `${ i + 1 }挡`)}
            cardStyle={{ marginBottom: 10 }}
          />
          <GearCard
            title="我是可滑动的DOT类型选项"
            subtitle="as输输入输输入dqwe"
            showSwitch={true}
            currentIndex={0}
            unlimitedHeightEnable
            cardType={GearCard.CARD_TYPE.DOT}
            titleNumberOfLines={2}
            allowFontScaling={false}
            options={Array.from({ length: 10 }, (v, i) => `${ i + 1 }挡`)}
            cardStyle={{ marginBottom: 10 }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  cardTitleStyle: {
    fontSize: 28,
    color: '#333'
  },
  cardSubTitleStyle: {
    fontSize: 23,
    color: '#666'
  }
});

export default GearCardDemo;
