/* eslint-disable */
// @ts-nocheck
'use strict';

import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Theme from 'miot/ui/Style/Themes/themeMiHome';
import Fonts from 'miot/utils/fonts';
import DarkMode from 'miot/darkmode';
import Checkable from 'miot/ui/Checkbox/Checkable';

const ExampleIcon = () => {
  let darkMode = DarkMode.getColorScheme();
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.49998 5.09998C5.45063 5.09998 4.59998 5.95063 4.59998 6.99998V11.5C4.59998 12.5493 5.45063 13.4 6.49998 13.4H21.5C22.5493 13.4 23.4 12.5493 23.4 11.5V6.99998C23.4 5.95063 22.5493 5.09998 21.5 5.09998H6.49998ZM6.39998 6.99998C6.39998 6.94475 6.44475 6.89998 6.49998 6.89998H21.5C21.5552 6.89998 21.6 6.94475 21.6 6.99998V11.5C21.6 11.5552 21.5552 11.6 21.5 11.6H6.49998C6.44475 11.6 6.39998 11.5552 6.39998 11.5V6.99998ZM8.87498 8.59998C8.51599 8.59998 8.22498 8.89099 8.22498 9.24998C8.22498 9.60896 8.51599 9.89998 8.87498 9.89998H11.875C12.234 9.89998 12.525 9.60896 12.525 9.24998C12.525 8.89099 12.234 8.59998 11.875 8.59998H8.87498ZM8.22498 18.75C8.22498 18.391 8.51599 18.1 8.87498 18.1H11.875C12.234 18.1 12.525 18.391 12.525 18.75C12.525 19.109 12.234 19.4 11.875 19.4H8.87498C8.51599 19.4 8.22498 19.109 8.22498 18.75ZM6.49998 14.6C5.45063 14.6 4.59998 15.4506 4.59998 16.5V21C4.59998 22.0493 5.45063 22.9 6.49998 22.9H21.5C22.5493 22.9 23.4 22.0493 23.4 21V16.5C23.4 15.4506 22.5493 14.6 21.5 14.6H6.49998ZM6.39998 16.5C6.39998 16.4447 6.44475 16.4 6.49998 16.4H21.5C21.5552 16.4 21.6 16.4447 21.6 16.5V21C21.6 21.0552 21.5552 21.1 21.5 21.1H6.49998C6.44475 21.1 6.39998 21.0552 6.39998 21V16.5Z"
        fill={darkMode === 'night' ? '#fff' : '#000'}
      />
    </Svg>
  );
};

const Item = ({ item, selectable, disabled, onPress, isFirst, isLast,showIcon}) => {
  const [pressed, setPressed] = useState(false);

  let borderRadiusStyle = {};
    if (isFirst && isLast) borderRadiusStyle = { borderRadius: 20 };
    else if (isFirst)
      borderRadiusStyle = { borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 ,paddingTop:20};
    else if (isLast)
      borderRadiusStyle = { borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 0, borderTopRightRadius: 0 ,paddingBottom:20};
    else borderRadiusStyle = { borderRadius: 0 };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={1}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View
        style={[
          styles.item,
          disabled && styles.disabled,
          item.Pressed&&styles.pressed,
          item.selected&&selectable ? { backgroundColor: Theme.mjColorFunctionBrandfillSecondaryNormal } : null,
          borderRadiusStyle,
        ]}
      >
        {/* 蒙层包裹整个内容，圆角随选中状态 */}
        {(pressed && !disabled || item.isPressed )&& <View style={[styles.pressOverlay,{backgroundColor:
            DarkMode.getColorScheme() === 'light'
          ? 'rgba(0,0,0,0.08)'
          : 'rgba(255,255,255,0.08)'} ,borderRadiusStyle]} />}

        {showIcon&&<View style={{ width: 26, height: 26 ,marginRight:12}}>
          <ExampleIcon />
        </View>}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              item.subtitle ? { ...Fonts.mjTextHeadline2M } : null,
              item.selected&&selectable ? { color: Theme.mjColorFunctionBrandtextNormal } : null,
            ]}
            numberOfLines={3}
          >
            {item.title}
          </Text>
          {item.subtitle && (
            <Text
              style={[
                styles.subtitle,
                item.selected&&selectable ? { color: Theme.mjColorFunctionBrandtextNormal } : null,
              ]}
              numberOfLines={3}
            >
              {item.subtitle}
            </Text>
          )}
        </View>
        {selectable&& item.selected && (
          <View style={styles.checkWrapper}>
            {item.selected && <Checkable size={24} visible={true} color={'#00BA7CFF'} />}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const HandPopClickDemo = ({ navigation }) => {
  const [group1, setGroup1] = useState([
    { title: '菜单入口', selectable: false,isPressed: true,showIcon: true },
    { title: '菜单入口', selectable: false,showIcon: true },
    { title: '菜单入口', selectable: false, disabled: true,showIcon: true },
  ]);
  const [group2, setGroup2] = useState([
    { title: '乔纳斯的家乔纳斯的家乔纳斯的家乔纳斯的家乔纳斯的家乔纳斯的家乔纳斯的家',subtitle:'默认家庭默认家庭默认家庭默认家庭默认家庭默认家庭默认家庭默认家庭默认家庭' ,selectable:true },
    { title: '橡树湾',subtitle: '共享家庭', selectable:true },
    { title: '上林溪',subtitle: '共享家庭' ,selectable:true },
  ]);
  const [group3, setGroup3] = useState([
    { title: '正常图标', selected: false,showIcon: true },
    { title: '按压图标', selected: false,isPressed: false,Pressed: true,showIcon: true },
    { title: '禁用图标', selected: false, disabled: true ,showIcon: true},
  ]);

  const handlePress = (groupIndex, index) => {
    const updateGroup = (group) => group.map((item, i) => ({ ...item, selected: i === index }));
    if (groupIndex === 1) setGroup1(updateGroup(group1));
    else if (groupIndex === 2) setGroup2(updateGroup(group2));
    else if (groupIndex === 3) setGroup3(updateGroup(group3));

    if (navigation) navigation.navigate(`菜单入口${groupIndex}-${index + 1}`);
    else console.log('点击了:', `菜单入口${groupIndex}-${index + 1}`);
  };

  const renderGroup = (group, groupIndex,CardWidth) => (
    <View style={[styles.card, {width: CardWidth}]}>
      {group.map((item, index) => (
        <Item
          key={index}
          item={item}
          selectable={item.selectable}
          showIcon={item.showIcon}
          disabled={item.disabled}
          onPress={() => handlePress(groupIndex, index)}
          isFirst={index === 0}
          isLast={index === group.length - 1}
          isPress={true}
        />
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>点击样式</Text>
      {renderGroup(group1, 1, )}
      {renderGroup(group2, 2, 200)}
      {renderGroup(group3, 3,)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: 30,
  },
  header: {
    fontSize: 22,
    color: Theme.mjColorGrayTab,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Theme.mjColorGrayPopover,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    minWidth: 200,
    maxWidth:288,
    alignSelf: 'flex-start'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexShrink: 0,
    overflow: 'hidden', // 必须保证蒙层圆角生效
  },
  textContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
  },
  title: {
    ...Fonts.mjTextSubtitle1M,
    color: Theme.mjColorGrayText1,
  },
  subtitle: {
    ...Fonts.mjTextBody2R,
    color: Theme.mjColorGrayText4,
  },
  disabled: {
    opacity: 0.3,
  },
  pressed: {
    opacity: 0.5,
  },
  checkWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:12
  },
  pressOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});

export default HandPopClickDemo;
