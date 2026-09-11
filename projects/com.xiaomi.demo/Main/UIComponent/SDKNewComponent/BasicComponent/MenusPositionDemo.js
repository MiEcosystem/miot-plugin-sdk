/* eslint-disable */
// @ts-nocheck
'use strict';

import React, { Component, createRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  InteractionManager,
} from 'react-native';
import NavigationBar from 'miot/ui/NavigationBar';
import { Menus, colorToken } from 'miot/ui/hyperOSUI';
import fonts from 'miot/utils/fonts';
import { dynamicStyleSheet } from 'miot/ui';

const shortItems = [
  { id: 1, title: '编辑', actionType: 'button' },
  { id: 2, title: '复制', actionType: 'button' },
  { id: 3, title: '删除', actionType: 'button', disabled: true },
];
const longItems = [
  { id: 1, title: '编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑编辑', actionType: 'button' },
  { id: 2, title: '复制复制复制复制复制复制复制复制复制复制复制复制复制复制复制复制复制', actionType: 'button' },
  { id: 3, title: '删除删除删除删除删除删除删除删除删除删除删除删除删除删除删除删除删除', actionType: 'button', disabled: true },
  { id: 4, title: '分享分享分享分享分享分享分享分享分享分享分享分享分享分享分享分享分享', actionType: 'button' },
  { id: 5, title: '收藏收藏收藏收藏收藏收藏收藏收藏收藏收藏收藏收藏收藏收藏收藏收藏收藏', actionType: 'toggle' },
  { id: 6, title: '置顶置顶置顶置顶置顶置顶置顶置顶置顶置顶置顶置顶置顶置顶置顶置顶置顶', actionType: 'button' },
  { id: 7, title: '归档归档归档归档归档归档归档归档归档归档归档归档归档归档归档归档归档', actionType: 'button' },
  { id: 8, title: '导出导出导出导出导出导出导出导出导出导出导出导出导出导出导出导出导出', actionType: 'button' },
  { id: 9, title: '更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多', actionType: 'button' },
];
const { width: SCREEN_WIDTH } = Dimensions.get('window');

class MenusPositionDemo extends Component {
  constructor(props) {
    super(props);
    this.dialogRef = createRef();
    this.state = {
      showLongText: false,
      scales: {},
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

  handlePress = (index, ref) => {
    if (!ref) return;
    InteractionManager.runAfterInteractions(() => {
      this.dialogRef.current?.showFrom(ref);
    });
  };

  renderItem = ({ index }) => {
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
      <Animated.View style={[styles.itemWrapper, { transform: [{ scale }], width: itemWidth }]} ref={(r) => (this[`ref_${ index }`] = r)}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.item}
          onPress={() => this.handlePress(index, this[`ref_${ index }`])}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.text}>{`位置${ index + 1 }`}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render() {
    const { showLongText } = this.state;
    const data = Array.from({ length: 100 }).map((_, i) => ({
      id: `${ i + 1 }`,
      title: `位置${ i + 1 }`,
    }));

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={5}
          columnWrapperStyle={styles.grid}
          renderItem={this.renderItem}
          contentContainerStyle={{ padding: 8, paddingBottom: 40 }}
        />

        <Menus
          ref={this.dialogRef}
          data={showLongText ? longItems : shortItems}
          colorType={'blue'}
          onPress={(item) => console.log('button:', item.title)}
          onToggle={(item, selected) => console.log('toggle:', item.title, selected)}
          onSelect={(item) => console.log('select:', item.title)}
          onDismiss={() => console.log('菜单关闭')}
        />
      </View>
    );
  }
}

const styles = dynamicStyleSheet({
  container: { flex: 1, backgroundColor: colorToken.surfacePageLow },
  grid: { justifyContent: 'flex-start', marginBottom: 8 },
  itemWrapper: { margin: 4 },
  item: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
    shadowColor: colorToken.accentBlueLow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    backgroundColor: colorToken.surfaceCardPrimary,
  },
  text: { color: colorToken.accentBlueContent, textAlign: 'center', ...fonts.mjTextCustom14M },
});

export default MenusPositionDemo;
