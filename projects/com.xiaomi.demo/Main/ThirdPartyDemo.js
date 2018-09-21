'use strict';

import React from 'react';
import {
   View, Text,AppRegistry,Button,
   TouchableHighlight,
   TouchableOpacity,
   Platform,
   Dimensions,
   Animated,
   StyleSheet,
   PixelRatio,
   StatusBar,
   Image,
   TextInput,
   WebView,
   DeviceEventEmitter,
   FlatList,
} from 'react-native';

import { TitleBarBlack } from 'miot/ui';
import ListItem from './ListItem';

const DemoInfo = [
  {id: 'SQLiteDemo',title:"sqlite",key:"0"},
  {id: 'ParticleDemo',title:"粒子系统，模拟雪花和火焰等 (iOS 特有的)",key:"1"},
  {id: 'OrientationDemo',title:"设备方向",key:"2"},
  {id: 'AddressBookDemo',title:"获取通信录",key:"3"},
  {id: 'WebViewBridageDemo',title:"webview 和react-native双向通信",key:"4"},
  {id: 'SVGDemo',title:"SVG:shape",key:"5"},
  {id: 'PressExample',title:"SVG:PressExample",key:"6"},
  {id: 'HoverExample',title:"SVG:HoverExample",key:"7"},
  {id: 'GroupExample',title:"SVG:group",key:"8"},
  {id: 'LegendsView',title:"绘图表LegendsView",key:"9"},
  {id: 'AxisView',title:"绘图表：坐标轴 ",key:"10"},
  {id: 'ContainersView',title:"绘图表ContainersView ",key:"11"},
  {id: 'CreateContainerView',title:"绘图表CreateContainerView ",key:"12"},
  {id: 'ErrorsTooltipsView',title:"绘图表ErrorsTooltipsView ",key:"13"},
  {id: 'AreaView',title:"绘图表AreaView ",key:"14"},
  {id: 'PieView',title:"绘图表PieView ",key:"15"},
  {id: 'BarView',title:"绘图表BarView ",key:"16"},
  {id: 'ChartView',title:"绘图表ChartView ",key:"17"},
  {id: 'LineView',title:"绘图表LineView ",key:"18"},
  {id: 'ScatterView',title:"绘图表ScatterView ",key:"19"},
  {id: 'BoxPlotView',title:"绘图表BoxPlotView ",key:"20"},

  {id: 'GLSimple',title:"gl 的简单demo",key:"21"},
  {id: 'GLHearts',title:"gl GLHearts",key:"211"},
  {id: 'GLAnimated',title:"gl GLAnimated",key:"212"},
  {id: 'GLParticles',title:"gl GLParticles",key:"213"},
  {id: 'GLOrientation',title:"gl GLOrientation",key:"214"},

  {id: 'ARTSVGDemo',title:"ARTSVGDemo",key:"22"},
  {id: 'ARTRectDemo',title:"ARTRectDemo",key:"23"},
  {id: 'ARTCircleDemo',title:"ARTCircleDemo",key:"24"},
  {id: 'ARTEllipseDemo',title:"ARTEllipseDemo",key:"25"},
  {id: 'ARTLineDemo',title:"ARTLineDemo",key:"26"},
  {id: 'ARTTextDemo',title:"ARTTextDemo",key:"27"},
  {id: 'ARTGroupDemo',title:"ARTGroupDemo",key:"28"},
  {id: 'ARTGradientDemo',title:"ARTGradientDemo",key:"29"},
  {id: 'ARTPatternDemo',title:"ARTPatternDemo",key:"30"},
  {id: 'AnimFadeInOutDemo',title:"AnimFadeInOutDemo",key:"31"},
  {id: 'AnimTransformDemo',title:"AnimTransformDemo",key:"32"},
  {id: 'AnimTranslationDemo',title:"AnimTranslationDemo",key:"33"},
  {id: 'AnimEffectsDemo',title:"AnimEffectsDemo",key:"34"},
  {id: 'AnimEventsDemo',title:"AnimEventsDemo",key:"35"},
  {id: 'LayoutAnimationDemo',title:"LayoutAnimationDemo",key:"36"},
  {id: 'AnimCustomCompDemo',title:"AnimCustomCompDemo",key:"37"},
  {id: 'ImagePickerDemo',title:"图片选择",key:"38"},
  {id: 'videoDemo',title:"videoDemo",key:"39"},
  {id: 'CircularSliderDemo',title:"米家自定义，圆形滑动条(iOS转有)",key:"40"},
  {id: 'mhMapDemo',title:"米家桥接(地图)",key:"41"},
  {id: 'audioDemo',title:"米家桥接(audio)",key:"42"},
  {id: 'DialogTest',title:"dialog测试",key:"43"},
]

export default class ThirdPartyDemo  extends React.Component{
  static navigationOptions = ({ navigation }) => {

    return {
      header:<TitleBarBlack title={"第三方库Demo"} style={{backgroundColor:'#fff'}}
                            onPressLeft={()=>{ navigation.goBack();}}/>,
    };
  };

  state = {selected: (new Map(): Map<string, boolean>)};

  _onPressItem = (id: string,title: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
    this.props.navigation.navigate(id)
  };

  _renderItem = ({item}) => (
    <ListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render(){
    return (
      <View style={styles.container} >
      <FlatList
        data={DemoInfo}
        renderItem={this._renderItem}
      />
      </View>
    );
  }

};

var styles = StyleSheet.create({
  container: {
      flexDirection:'row',
      borderTopColor:'#f1f1f1',
      borderTopWidth:1,
      flex:1,
  },
});





