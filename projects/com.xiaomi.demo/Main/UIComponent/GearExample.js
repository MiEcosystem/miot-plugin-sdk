import { Styles } from 'miot/resources';
import { DragGear, NormalGear, SlideGear } from "miot/ui/Gear";
import Separator from 'miot/ui/Separator';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Draggable from "./Draggable";
import LongPressDraggable from "./LongPressDraggable";
import Logger from '../Logger';

const { width } = Dimensions.get('screen');

export default class GearExample extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.options = Array.from({ length: 31 }, (v, i) => `${ i + 40 }aaaa`);
    this.options1 = Array.from({ length: 6 }, (v, i) => i);
    this.state = {
      selectIndex: 0,
      index: 0,
      disabled: true,
      dragGearSelectIndex: 0,
      slideGearSelectIndex: 0,
      slideGearSelectIndex1: 0,
      normalGearSelectIndex: 0
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView>
          <View style={styles.contentStyle}>
            <Text style={styles.title}>
              {'选择档位 '}
              <Text style={{ color: '#f0ac3d' }}>
                {this.state.selectIndex}
              </Text>
            </Text>
            <Text style={styles.label} allowFontScaling={true}>
              拖拽 / 点击选择档位 - 字体大小随系统变化而变化
            </Text>
            <DragGear
              options={this.options1}
              margin={0}
              selectColor={Styles.common.MHGreen}
              textStyle={{ fontSize: 16, fontFamily: 'DS-Digital' }}
              selectIndex={this.state.dragGearSelectIndex}
              onSelect={(index) => {
                this.setState({
                  dragGearSelectIndex: index,
                  selectIndex: index
                });
              }}
              containerStyle={{ backgroundColor: '#fff' }}
            />
            <Text style={styles.label} allowFontScaling={false}>
              拖拽 / 点击选择档位 - 字体大小不随系统变化而变化
            </Text>
            <DragGear
              options={this.options1}
              margin={0}
              selectColor={Styles.common.MHGreen}
              textStyle={{ fontSize: 36, fontFamily: 'DS-Digital' }}
              selectIndex={this.state.dragGearSelectIndex}
              allowFontScaling={false}
              numberOfLines={1}
              onSelect={(index) => {
                this.setState({
                  dragGearSelectIndex: index,
                  selectIndex: index
                });
              }}
              containerStyle={{ backgroundColor: '#fff' }}
            />
            <Text style={styles.label}>
              {`滑动选择档位(圆形滑块)`}
            </Text>
            <SlideGear
              options={this.options}
              value={this.state.slideGearSelectIndex}
              disabled={this.state.disabled}
              containerStyle={{
                width: width * 0.75
              }}
              leftTextColor="yellowgreen"
              rightTextColor="skyblue"
              onValueChange={(index) => {
                this.setState({
                  slideGearSelectIndex: index,
                  selectIndex: index
                });
                this.log('onValueChange: ', index);
              }}
              onSlidingComplete={(index) => {
                this.setState({
                  slideGearSelectIndex: index,
                  selectIndex: index
                });
                this.log('onSlidingComplete: ', index);
              }}
              showEndText={false}
            />
            <Text style={styles.label}>
              {`111色温滑动选择档位(圆形滑块)- 字体大小随系统变化而变化`}
            </Text>
            <SlideGear
              optionMin={3000}
              optionMax={8000}
              optionStep={1}
              value={this.state.slideGearSelectIndex1}
              disabled={this.state.disabled}
              containerStyle={{
                width: width * 0.75
              }}
              leftTextColor="#000000"
              rightTextColor="#000000"
              onValueChange={(index) => {
                this.log('onValueChange: ', index);
              }}
              onSlidingComplete={(index) => {
                this.setState({
                  slideGearSelectIndex1: index,
                  selectIndex: index
                });
                this.log('onSlidingComplete: ', index);
              }}
              contentType={SlideGear.CONTENTTYPE.COLORTEM}
            />
            <Text
              style={styles.label}
              allowFontScaling={false}
            >
              {`111色温滑动选择档位(圆形滑块)- 字体大小不随系统变化而变化`}
            </Text>
            <SlideGear
              optionMin={3000}
              optionMax={8000}
              optionStep={1}
              allowFontScaling={false}
              numberOfLines={1}
              value={this.state.slideGearSelectIndex1}
              disabled={this.state.disabled}
              containerStyle={{
                width: width * 0.75
              }}
              leftTextStyle={{
                color: '#ffffff',
                fontSize: 36
              }}
              rightTextStyle={{
                color: '#000000',
                fontSize: 36
              }}
              onValueChange={(index) => {
                this.log('onValueChange: ', index);
              }}
              onSlidingComplete={(index) => {
                this.setState({
                  slideGearSelectIndex1: index,
                  selectIndex: index
                });
                this.log('onSlidingComplete: ', index);
              }}
              contentType={SlideGear.CONTENTTYPE.COLORTEM}
            />
            <Text style={styles.label}>
              {`222颜色滑动选择档位(圆形滑块)`}
            </Text>
            <SlideGear
              optionMin={0}
              optionMax={16777215}
              optionStep={1}
              value={this.state.slideGearSelectIndex}
              disabled={this.state.disabled}
              containerStyle={{
                width: width * 0.75
              }}
              leftTextColor="yellowgreen"
              rightTextColor="skyblue"
              onValueChange={(index) => {
                this.log('onValueChange: ', index);
              }}
              onSlidingComplete={(index) => {
                this.setState({
                  slideGearSelectIndex: index,
                  selectIndex: index
                });
                this.log('onSlidingComplete: ', index);
              }}
              contentType={SlideGear.CONTENTTYPE.COLOR}
              showEndText={false}
            />
            <Text style={styles.label}>
              {`滑动选择档位(方形滑块)`}
            </Text>
            <SlideGear
              type={SlideGear.TYPE.RECTANGLE}
              options={this.options}
              showEndText={false}
              containerStyle={{ width: width * 0.75, height: 66 }}
              blockStyle={{ width: 30, backgroundColor: 'red' }}
              minimumTrackTintColor="lightpink"
              maximumTrackTintColor="skyblue"
              value={this.state.slideGearSelectIndex}
              onValueChange={(index) => {
              }}
              onSlidingComplete={(index) => {
                this.setState({
                  slideGearSelectIndex: index,
                  selectIndex: index
                });
              }}
            />
            <Text style={styles.label}>
              点击选择档位- 字体大小随系统变化而变化
            </Text>
            <NormalGear
              options={this.options1}
              margin={0}
              selectColor={Styles.common.MHGreen}
              textStyle={{ fontSize: 16, fontFamily: 'DS-Digital' }}
              maxWidth={width}
              selectIndex={this.state.normalGearSelectIndex}
              onSelect={(index) => {
                this.setState({
                  normalGearSelectIndex: index,
                  selectIndex: index
                });
              }}
              containerStyle={{ backgroundColor: '#fff' }}
            />
            <Text style={styles.label} allowFontScaling={false}>
              点击选择档位- 字体大小不随系统变化而变化
            </Text>
            <NormalGear
              options={this.options1}
              allowFontScaling={false}
              numberOfLines={1}
              margin={0}
              selectColor={Styles.common.MHGreen}
              textStyle={{ fontSize: 36, fontFamily: 'DS-Digital' }}
              maxWidth={width}
              selectIndex={this.state.normalGearSelectIndex}
              onSelect={(index) => {
                this.setState({
                  normalGearSelectIndex: index,
                  selectIndex: index
                });
              }}
              containerStyle={{ backgroundColor: '#fff' }}
            />
            <Text style={styles.label}> 👇可以直接左右拖拽👇 </Text>
            <View style={styles.demo2}>
              <Draggable />
            </View>
            <Text style={styles.label}> 👇长按后可以左右拖拽👇 </Text>
            <View style={styles.demo2}>
              <LongPressDraggable />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  callback(index) {
    this.setState({ index, selectIndex: index });
  }

  componentDidMount() {
    setTimeout((_) => this.setState({ selectIndex: 6127, index: 5, disabled: false }), 1500); // 在从服务器获取到选中值之前，先禁用滑动
  }

  log(...args) {
    console.log(...args);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentStyle: {
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FFF'
  },
  demo2: {
    position: 'relative',
    width,
    height: 100,
    alignItems: 'center'
  },
  label: {
    width: '100%',
    marginVertical: 10,
    alignSelf: 'flex-start',
    fontSize: 15,
    color: '#333'
  },
  title: {
    width,
    textAlign: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
