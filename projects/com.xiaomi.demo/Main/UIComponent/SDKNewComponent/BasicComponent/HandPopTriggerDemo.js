/* eslint-disable */
// @ts-nocheck
'use strict';

import React, { Component, createRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  InteractionManager,
} from 'react-native';
import NavigationBar from 'miot/ui/NavigationBar';
import { NearHandDialog } from 'miot/ui/hyperOSUI';
import fonts from 'miot/utils/fonts';
import {colorToken} from "mhui-rn/dist/styles/color";
import {dynamicStyleSheet} from "miot/ui";

const homes = [
  { id: '1', title: '乔纳斯', disabled: true },
  { id: '2', title: '榕树湾' },
  { id: '3', title: '上林溪' },
];
const longHomes = [
  { id: '1', title: '乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯', disabled: true },
  { id: '2', title: '榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾' },
  { id: '3', title: '上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪' },
  { id: '4', title: '乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯', disabled: true },
  { id: '5', title: '榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾' },
  { id: '6', title: '上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪' },
  { id: '7', title: '乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯乔纳斯', disabled: true },
  { id: '8', title: '榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾榕树湾' },
  { id: '9', title: '上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪上林溪' },
];
const { width: SCREEN_WIDTH } = Dimensions.get('window');

class HandPopTriggerDemo extends Component {
  constructor(props) {
    super(props);
    this.dialogRef = createRef();
    this.state = {
      showLongText: false,
      scales: {}, // 缓存 Animated.Value
      selectedId: "3"
    };

    this.props.navigation?.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => this.toggleTextMode(),
          accessibilityLabel: '切换文本',
          accessibilityHint: '切换为长文本或短文本',
        },
      ],
    });
  }

  toggleTextMode() {
    this.setState((prev) => ({ showLongText: !prev.showLongText }));
  }

  handlePress = (index: number, ref: any) => {
    if (!ref) return;
    InteractionManager.runAfterInteractions(() => {
      this.dialogRef.current?.showFrom(ref);
    });
};

  handleHide = (ref: any) => {
    if (!ref) return;
    InteractionManager.runAfterInteractions(() => {
      this.dialogRef.current?.hideFrom(ref);
    });
  };

  renderItem = ({ item, index }: { item: any; index: number }) => {
    if (!this.state.scales[index]) {
      this.state.scales[index] = new Animated.Value(1);
    }
    const scale = this.state.scales[index];
    const itemWidth = SCREEN_WIDTH / 5 - 16;

    const handlePressIn = () => {
      Animated.spring(scale, { toValue: 0.95, friction: 3, useNativeDriver: true }).start();
    };
    const handlePressOut = () => {
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    };

    return (
      <Animated.View style={[styles.itemWrapper, { transform: [{ scale }], width: itemWidth }]} ref={(r) => (this[`ref_${index}`] = r)}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.item}
          onPress={() => this.handlePress(index, this[`ref_${index}`])}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.text}>{`位置${index + 1}`}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render() {
    const { showLongText } = this.state;
    const data = Array.from({ length: 100 }).map((_, i) => ({
      id: `${i + 1}`,
      title: `位置${i + 1}`,
    }));

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={5}
          columnWrapperStyle={styles.grid}
          renderItem={this.renderItem}
          contentContainerStyle={{ padding: 8 }}
        />

        <NearHandDialog
          ref={this.dialogRef}
          data={showLongText ? homes : longHomes}
          selectedId={this.state.selectedId}
          colorType={"blue"}
          showTitleText={true}
          showSubtitleText={false}
          showIcon={false}
          selectable={true}
          onSelect={(item) => {
            console.log('选中：', item);
            this.setState({ selectedId: item.id });
            this.dialogRef.current?.hideFrom();
          }
          }
        />
      </View>
    );
  }
}

const styles = dynamicStyleSheet({
  container: { flex: 1, backgroundColor: colorToken.mj_color_gray_bg_2 },
  grid: { justifyContent: 'flex-start', marginBottom: 8 },
  itemWrapper: { margin: 4 },
  item: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
    shadowColor: colorToken.mjcard_color_blue_3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    backgroundColor: colorToken.mj_color_gray_card_1,
  },
  text: { color: colorToken.mjcard_color_blue_2, textAlign: 'center', ...fonts.mjTextCustom14M },
});
export default HandPopTriggerDemo;
