/* eslint-disable */
// @ts-nocheck
'use strict';

import React, { Component, createRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import NavigationBar  from "miot/ui/NavigationBar";
import { NearHandDialog } from 'miot/ui/Dialog';
import fonts from 'miot/utils/fonts';

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

export default class HandPopTriggerDemo extends Component {
  constructor(props) {
    super(props);
    this.dialogRef = createRef();
    this.state = {
      showLongText: false,
    };

    // 设置顶部导航栏右上角按钮
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
    this.setState((prev) => ({
      showLongText: !prev.showLongText,
    }));
  }

  handlePress(index) {
    const ref = this[`ref_${index}`];
    if (ref) {
      this.dialogRef.current?.showFrom(ref);
    }
  }

  renderItem(index) {
    if (!this[`scale_${index}`]) this[`scale_${index}`] = new Animated.Value(1);
    const scale = this[`scale_${index}`];
    const { showLongText } = this.state;
    const itemWidth = SCREEN_WIDTH / 5 - 16;

    const handlePressIn = () =>
      Animated.spring(scale, { toValue: 0.95, friction: 3, useNativeDriver: true }).start();
    const handlePressOut = () =>
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

    return (
      <Animated.View
        key={index}
        style={[styles.itemWrapper, { transform: [{ scale }], width: itemWidth }]}
        ref={(r) => (this[`ref_${index}`] = r)}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.item}
          onPress={() => this.handlePress(index)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.text}>
            {`位置${index}`}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  render() {
    const { showLongText } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.grid}>
            {Array.from({ length: 100 }).map((_, i) => this.renderItem(i + 1))}
          </View>
        </ScrollView>

        <NearHandDialog
          ref={this.dialogRef}
          data={showLongText?homes:longHomes}
          selectedId={'1'}
          showTitletext={true}
          showSubtitletext={false}
          showIcon={false}
          selectable={true}
          onSelect={(item) => console.log('选中：', item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  scroll: {
    padding: 8,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemWrapper: {
    margin: 4,
  },
  item: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
    shadowColor: '#1E88E5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    backgroundColor: '#fff',
  },
  text: {
    color: '#1E88E5',
    textAlign: 'center',
    ...fonts.mjTextCustom14M,
  },
});
