'use strict';

import { ListItem, ListItemWithSlider, ListItemWithSwitch } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Dimensions, ScrollView, View, Text } from 'react-native';

const { width } = Dimensions.get('window');

export default class AdaptedFontListDemo extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type="dark"
          title="列表项"
          style={{ backgroundColor: '#fff' }}
          onPressLeft={() => navigation.goBack()}
        />
    };
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <Separator />
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ height: 20 }}></View>
            <ListItem
              title="只有标题"
              titleStyle={{ fontSize: 30, paddingTop: 10, marginBottom: 10 }}
              dotStyle={{ marginTop: 8, width: 10, height: 10 }}
              showDot={true}
              onPress={() => console.log(0)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
            />
            <ListItem
              title="只有标题，隐藏了红点，且设置了多行显示"
              titleStyle={{ fontSize: 30, paddingTop: 10, marginBottom: 10 }}
              showDot={false}
              onPress={() => console.log(0)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
            />
            <ListItem
              titleStyle={{ fontSize: 30, paddingTop: 10, marginBottom: 10 }}
              title="不显示底部分割线"
              showSeparator={false}
              unlimitedHeightEnable={true}
            />
            <ListItem
              titleStyle={{ fontSize: 30, paddingTop: 10, marginBottom: 10 }}
              title="不显示右侧箭头"
              hideArrow={true}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>只设置title</Text>
            <ListItem
              title="设置titleNumberOfLines为1，没有隐藏红点"
              titleStyle={{ fontSize: 28, paddingTop: 10, marginBottom: 10 }}
              dotStyle={{ marginTop: 8 }}
              showDot={true}
              onPress={() => console.log(0)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={1}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>设置titleNumberOfLines为1，没有隐藏红点</Text>
            <ListItem
              title="带右侧文案"
              value="米家"
              dotStyle={{ marginTop: 8 }}
              titleStyle={{ fontSize: 28, paddingTop: 10, marginBottom: 10 }}
              valueStyle={{ fontSize: 20 }}
              showDot={true}
              onPress={() => console.log(1)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
            />
            <ListItem
              title="标题加右侧文案"
              value="小米米家智能墙壁开关(单火线单键版)"
              dotStyle={{ marginTop: 8 }}
              titleStyle={{ fontSize: 28, paddingTop: 10, marginBottom: 10 }}
              valueStyle={{ fontSize: 20 }}
              showDot={true}
              onPress={() => console.log(1)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              valueNumberOfLines={0}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>标题加右侧文案</Text>
            <ListItem
              title="标题加右侧文案"
              value="小米米家智能墙壁开关(单火线单键版)"
              dotStyle={{ marginTop: 8 }}
              titleStyle={{ fontSize: 28, paddingTop: 10, marginBottom: 10 }}
              valueStyle={{ fontSize: 20 }}
              showDot={true}
              onPress={() => console.log(1)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              valueNumberOfLines={1}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>限制右侧文案最大行数</Text>
            <ListItem
              title="标题加副标题"
              subtitle="这是用来测试副标题的文案"
              dotStyle={{ marginTop: 8 }}
              titleStyle={{ fontSize: 28, paddingTop: 5, marginBottom: 5 }}
              subtitleStyle={{ fontSize: 23 }}
              showDot={true}
              onPress={() => console.log(2)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={0}
              valueNumberOfLines={1}
            />
            <ListItem
              title="标题加副标题加右侧文案"
              subtitle="这是用来测试副标题的文案"
              showDot={true}
              value="米家"
              dotStyle={{ marginTop: 8 }}
              titleStyle={{ fontSize: 28, paddingTop: 5, marginBottom: 5 }}
              subtitleStyle={{ fontSize: 23 }}
              valueStyle={{ fontSize: 20 }}
              onPress={() => console.log(3)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={0}
              valueNumberOfLines={0}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>标题加副标题</Text>
            <ListItem
              title="标题加副标题加右侧文案"
              subtitle="只显示一行副标题的文案，这是用来测试副标题的文案"
              showDot={true}
              value="米家"
              dotStyle={{ marginTop: 8 }}
              titleStyle={{ fontSize: 28, paddingTop: 5, marginBottom: 5 }}
              subtitleStyle={{ fontSize: 23 }}
              valueStyle={{ fontSize: 20 }}
              onPress={() => console.log(3)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={1}
              valueNumberOfLines={0}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>限制副标题的最大显示行数</Text>
            <ListItem
              title="自定义宽度的ListItem"
              subtitle="副标题文案"
              showDot={true}
              value="这是一段测试右侧文案"
              containerStyle={{ width: width * 0.8, backgroundColor: 'lightblue' }}
              titleStyle={{ fontSize: 25, color: 'red' }}
              subtitleStyle={{ fontSize: 22, color: 'green' }}
              valueStyle={{ fontSize: 20, color: 'yellow' }}
              onPress={() => console.log(4)}
              separator={<Separator />}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={0}
              valueNumberOfLines={0}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>自定义宽度ListItem</Text>
            <ListItemWithSlider
              title="被禁用的滑动条列表项"
              titleStyle={{ fontSize: 27 }}
              valueStyle={{ fontSize: 20 }}
              disabled={true}
              onSlidingComplete={(value) => console.log(value)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
            />
            <ListItemWithSlider
              title="标题文字长度测试"
              sliderProps={{ minimumValue: 25, maximumValue: 75, value: 60 }}
              sliderStyle={{
                minimumTrackTintColor: "red",
                maximumTrackTintColor: "#fff",
                style: { width: width * 0.5, alignSelf: 'center' },
                trackStyle: { height: 4, borderRadius: 2 },
                thumbStyle: { width: 30, height: 30, borderRadius: 15 }
              }}
              containerStyle={{ width: width * 0.8, backgroundColor: 'lightblue' }}
              titleStyle={{ fontSize: 30, color: 'red' }}
              valueStyle={{ fontSize: 20, color: 'yellow' }}
              showWithPercent={false}
              onSlidingComplete={(value) => console.log('onSlidingComplete: ', value)}
              onValueChange={(value) => console.log('onValueChange: ', value)}
              separator={<Separator />}
              allowFontScaling={false}
              titleNumberOfLines={1}
              unlimitedHeightEnable={true}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>带滑块的ListItem</Text>
            <ListItemWithSwitch
              title="标题文字"
              titleStyle={{ fontSize: 27 }}
              onValueChange={(value) => console.log(value)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
            />
            <ListItemWithSwitch
              title="标题文字长度设置，不限制最大行数限制"
              titleStyle={{ fontSize: 27 }}
              onValueChange={(value) => console.log(value)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
            />
            <ListItemWithSwitch
              title="标题文字长度设置，限制最大行数限制"
              titleStyle={{ fontSize: 27 }}
              onValueChange={(value) => console.log(value)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={1}
            />
            <ListItemWithSwitch
              title="标题文字"
              value={true}
              disabled={true}
              subtitle="副标题文字长度测试，不设置最大行数限制"
              titleStyle={{ fontSize: 27 }}
              subtitleStyle={{ fontSize: 20 }}
              onValueChange={(value) => console.log(value)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={0}
            />
            <ListItemWithSwitch
              title="标题文字"
              value={true}
              disabled={false}
              subtitle="副标题文字长度测试，设置最大行数限制"
              titleStyle={{ fontSize: 27 }}
              subtitleStyle={{ fontSize: 20 }}
              onValueChange={(value) => console.log(value)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={1}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>带switch只有标题ListItem</Text>
            <ListItemWithSwitch
              title="标题文字"
              disabled={false}
              value={false}
              valueText="23:00-次日4:00"
              titleStyle={{ fontSize: 27 }}
              subtitleStyle={{ fontSize: 20 }}
              valueTextStyle={{ fontSize: 20 }}
              onPress={() => console.log('do what u want to do')}
              onValueChange={(value) => console.log(value)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={1}
              valueNumberOfLines={0}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>带switch带有右侧说明文字的ListItem</Text>
            <ListItemWithSwitch
              title="标题文字并设置最大行数控制"
              valueText="value设置最大行数"
              subtitle="副标题文字设置最大行数显示"
              titleStyle={{ fontSize: 27 }}
              subtitleStyle={{ fontSize: 20 }}
              valueTextStyle={{ fontSize: 20 }}
              onPress={() => console.log('do what u want to do')}
              onValueChange={(value) => console.log(value)}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={1}
              subtitleNumberOfLines={1}
              valueNumberOfLines={1}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }} allowFontScaling={false}>全部设置最大显示行数为1</Text>
            <ListItemWithSwitch
              title="标题文字不设置最大行数控制"
              valueText="value不设置最大行数"
              subtitle="副标题文字不设置最大行数显示"
              onPress={() => console.log('do what u want to do')}
              onValueChange={(value) => console.log(value)}
              containerStyle={{ width: width * 0.8, height: 90, backgroundColor: 'lightblue' }}
              titleStyle={{ fontSize: 24, color: 'red' }}
              subtitleStyle={{ fontSize: 17, color: 'green' }}
              valueTextStyle={{ fontSize: 17, color: 'yellow' }}
              separator={<Separator />}
              allowFontScaling={false}
              unlimitedHeightEnable={true}
              titleNumberOfLines={0}
              subtitleNumberOfLines={0}
              valueNumberOfLines={0}
            />
            <Text style={{ marginTop: 10, marginBottom: 40, fontSize: 16 }} allowFontScaling={false}>自定义宽度的带Switch的ListItem</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
