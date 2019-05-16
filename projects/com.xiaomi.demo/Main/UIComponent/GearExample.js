import { Styles } from 'miot/resources';
import { DragGear, NormalGear } from 'miot/ui/Gear';
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
    this.state = {
      selectIndex: 2,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView>
          <View style={styles.contentStyle}>
            <DragGear
              options={['off', '1', '2', '3', '4', '5']}
              // normalStyle={{ width: 35 }}
              // margin={20}
              selectColor={Styles.common.MHGreen}
              textStyle={{ fontSize: 16, fontFamily: 'DS-Digital' }}
              maxWidth={width}
              selectIndex={this.state.selectIndex}
              onSelect={index => console.log(`select${index}`)}
              containerStyle={{ backgroundColor: '#fff' }}
            />
            <NormalGear
              options={['off', '1', '2', '3', '4', '5']}
              // normalStyle={{ width: 60 }}
              // margin={25}
              selectColor={Styles.common.MHGreen}
              textStyle={{ fontSize: 16, fontFamily: 'DS-Digital' }}
              maxWidth={width}
              selectIndex={this.state.selectIndex}
              onSelect={index => console.log(`select${index}`)}
              containerStyle={{ backgroundColor: '#fff' }}
            />
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
      </View>
    );
  }

  componentDidMount() {
    setTimeout(_ => this.setState({ selectIndex: 4 }), 500);
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
    paddingVertical: 10,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  demo2: {
    position: 'relative',
    backgroundColor: 'lightpink',
    width,
    height: 120,
    alignItems: 'center',
  }
});