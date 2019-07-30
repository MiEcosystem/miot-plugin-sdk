import { Styles } from 'miot/resources';
import { DragGear, NormalGear, SlideGear } from "miot/ui/Gear";
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Draggable from "./Draggable";
import LongPressDraggable from "./LongPressDraggable";

const { width } = Dimensions.get('screen');

export default class GearExample extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    header: <TitleBar
      type="dark"
      title="档位组件 demo"
      style={{ backgroundColor: '#fff' }}
      onPressLeft={_ => navigation.goBack()}
    />
  });

  constructor(props, context) {
    super(props, context);
    this.options = Array.from({ length: 10 }, (v, i) => i);
    this.options1 = Array.from({ length: 6 }, (v, i) => i);
    this.state = {
      selectIndex: 0,
      index: 0,
      disabled: true,
    };
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
                {`${this.options[this.state.index]}`}
              </Text>
            </Text>
            <Text style={styles.label}>
              拖拽 / 点击选择档位
            </Text>
            <DragGear
              options={this.options1}
              // normalStyle={{ width: 35 }}
              margin={0}
              selectColor={Styles.common.MHGreen}
              textStyle={{ fontSize: 16, fontFamily: 'DS-Digital' }}
              // maxWidth={width * 0.75}
              selectIndex={this.state.selectIndex}
              onSelect={index => this.callback(index)}
              containerStyle={{ backgroundColor: '#fff' }}
            />
            <Text style={styles.label}>
              {`滑动选择档位(圆形滑块)`}
            </Text>
            <SlideGear
              options={this.options}
              value={this.state.selectIndex}
              disabled={this.state.disabled}
              containerStyle={{ width: width * 0.75 }}
              onValueChange={index => this.callback(index)}
              onSlidingComplete={index => this.callback(index)}
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
              minimumTrackTintColor='lightpink'
              maximumTrackTintColor='skyblue'
              value={this.state.selectIndex}
              onValueChange={index => this.callback(index)}
              onSlidingComplete={index => this.callback(index)}
            />
            <Text style={styles.label}>
              点击选择档位
            </Text>
            <NormalGear
              options={this.options1}
              // normalStyle={{ width: 60 }}
              margin={0}
              selectColor={Styles.common.MHGreen}
              textStyle={{ fontSize: 16, fontFamily: 'DS-Digital' }}
              maxWidth={width}
              selectIndex={this.state.selectIndex}
              onSelect={index => this.callback(index)}
              containerStyle={{ backgroundColor: '#fff' }}
            />
            <Text style={styles.label}>
              拖拽动画效果
            </Text>
            <View style={styles.demo2}>
              <Text>{'👇可以直接左右拖拽👇'}</Text>
              <Draggable />
            </View>
            <View style={styles.demo2}>
              <Text>{'👇长按后可以左右拖拽👇'}</Text>
              <LongPressDraggable />
            </View>
          </View>
        </ScrollView>
      </View >
    );
  }

  callback(index) {
    this.setState({ index });
  }

  componentDidMount() {
    setTimeout(_ => this.setState({ selectIndex: 5, index: 5, disabled: false }), 1500); // 在从服务器获取到选中值之前，先禁用滑动
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1
  },
  contentStyle: {
    alignItems: 'center',
  },
  demo1: {
    paddingVertical: 5,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  demo2: {
    position: 'relative',
    backgroundColor: 'lightpink',
    width,
    height: 100,
    alignItems: 'center',
  },
  label: {
    marginVertical: 5,
    alignSelf: 'flex-start',
    fontSize: 15
  },
  title: {
    width,
    textAlign: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});