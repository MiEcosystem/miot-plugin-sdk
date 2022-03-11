'use strict';

import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem } from 'miot/ui/ListItem';

const DemoInfo = [
  { id: 'SQLiteDemo', title: "sqlite", key: "0" },
  { id: 'ParticleDemo', title: "粒子系统，模拟雪花和火焰等 (iOS 特有的)", key: "1" },
  { id: 'OrientationDemo', title: "设备方向", key: "2" },
  { id: 'WebViewBridageDemo', title: "webview 和react-native双向通信", key: "4" },
  { id: 'SVGDemo', title: "SVG:shape", key: "5" },
  { id: 'PressExample', title: "SVG:PressExample", key: "6" },
  { id: 'AnimatedSVGDemo', title: "SVG 动画", key: "3" },
  { id: 'HoverExample', title: "SVG:HoverExample", key: "7" },
  { id: 'GroupExample', title: "SVG:group", key: "8" },
  { id: 'LegendsView', title: "绘图表LegendsView", key: "9" },
  { id: 'AxisView', title: "绘图表：坐标轴 ", key: "10" },
  { id: 'ContainersView', title: "绘图表ContainersView ", key: "11" },
  { id: 'CreateContainerView', title: "绘图表CreateContainerView ", key: "12" },
  { id: 'ErrorsTooltipsView', title: "绘图表ErrorsTooltipsView ", key: "13" },
  { id: 'AreaView', title: "绘图表AreaView ", key: "14" },
  { id: 'PieView', title: "绘图表PieView ", key: "15" },
  { id: 'BarView', title: "绘图表BarView ", key: "16" },
  { id: 'ChartView', title: "绘图表ChartView ", key: "17" },
  { id: 'LineView', title: "绘图表LineView ", key: "18" },
  { id: 'ScatterView', title: "绘图表ScatterView ", key: "19" },
  { id: 'BoxPlotView', title: "绘图表BoxPlotView ", key: "20" },

  { id: 'GLSimple', title: "gl 的简单demo", key: "21" },
  // { id: 'GLTests', title: "openGL Tests", key: "45" },
  { id: 'GLHearts', title: "gl GLHearts", key: "211" },
  { id: 'GLAnimated', title: "gl GLAnimated", key: "212" },
  { id: 'GLParticles', title: "gl GLParticles", key: "213" },
  { id: 'GLOrientation', title: "gl GLOrientation", key: "214" },

  { id: 'ARTSVGDemo', title: "ARTSVGDemo", key: "22" },
  { id: 'ARTRectDemo', title: "ARTRectDemo", key: "23" },
  { id: 'ARTCircleDemo', title: "ARTCircleDemo", key: "24" },
  { id: 'ARTEllipseDemo', title: "ARTEllipseDemo", key: "25" },
  { id: 'ARTLineDemo', title: "ARTLineDemo", key: "26" },
  { id: 'ARTTextDemo', title: "ARTTextDemo", key: "27" },
  { id: 'ARTGroupDemo', title: "ARTGroupDemo", key: "28" },
  { id: 'ARTGradientDemo', title: "ARTGradientDemo", key: "29" },
  { id: 'ARTPatternDemo', title: "ARTPatternDemo", key: "30" },
  { id: 'AnimFadeInOutDemo', title: "AnimFadeInOutDemo", key: "31" },
  { id: 'AnimTransformDemo', title: "AnimTransformDemo", key: "32" },
  { id: 'AnimTranslationDemo', title: "AnimTranslationDemo", key: "33" },
  { id: 'AnimEffectsDemo', title: "AnimEffectsDemo", key: "34" },
  { id: 'AnimEventsDemo', title: "AnimEventsDemo", key: "35" },
  { id: 'LayoutAnimationDemo', title: "LayoutAnimationDemo", key: "36" },
  { id: 'AnimCustomCompDemo', title: "AnimCustomCompDemo", key: "37" },
  { id: 'ImagePickerDemo', title: "图片选择", key: "38" },
  { id: 'videoDemo', title: "videoDemo", key: "39" },
  { id: 'CircularSliderDemo', title: "米家自定义，圆形滑动条(iOS转有)", key: "40" },
  { id: 'mhMapDemo', title: "米家桥接(地图)", key: "41" },
  { id: 'audioDemo', title: "米家桥接(audio)", key: "42" },
  { id: 'DialogTest', title: "dialog测试", key: "43" },
  { id: 'ReactNativeCameraDemo', title: "ReactNativeCameraDemo测试", key: "44" },
  { id: 'LinearGradientDemo', title: "LinearGradientDemo测试", key: "45" },
  { id: 'ReactNativeBlurDemo', title: "ReactNativeBlurDemo测试", key: "46" },
  { id: 'FadeSlideDemo', title: "FadeSlideDemo", key: "47" },
  { id: 'PdfViewerDemo', title: "PdfDemo", key: "48" },
  { id: 'HoughCirclesDemo', title: "HoughCircles", key: "49" },
  { id: 'HoughCircles2Demo', title: "HoughCircles2Demo", key: "50" },
  { id: 'CvImageManipulationsDemo', title: "CvImageManipulationsDemo", key: "51" },
  { id: 'CvCameraPreviewDemo', title: "CvCameraPreviewDemo", key: "52" },
  { id: 'CvFaceDetectionDemo', title: "CvFaceDetectionDemo", key: "53" },
  { id: 'CvFaceLandmarksDemo', title: "CvFaceLandmarksDemo", key: "54" },
  { id: 'videoThumbnailDemo', title: "videoThumbnailDemo", key: "55" }
  // { id: 'ImageFilterDemo', title: "ImageFilterDemo", key: "55" }
];

export default class ThirdPartyDemo extends React.Component {

  state = { selected: (new Map(): Map<string, boolean>) };

  _onPressItem = (id: string, title: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
    this.props.navigation.navigate(id, { 'title': title });
  };

  _renderItem = ({ item }) => (
    <ListItem
      key={item.id}
      onPress={(_) => {
        this._onPressItem(item.id, item.title);
      }}
      title={item.title}
    />
  );

  render() {
    return (
      <View style={styles.container} >
        <FlatList
          data={DemoInfo}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: 1,
    flex: 1
  }
});
