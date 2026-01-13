'use strict';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IotListItem, IotListItemWithWidget } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { colorToken } from 'miot/ui/hyperOSUI';
import { Circle } from 'miot/ui/icons';

// const source1Data1 = [
//   {
//     index: 1,
//     type: 'switch',
//     title: '标题',
//     hideRightIcon: true,
//     showDot: false,
//     leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
//     onPress: () => console.log(4)
//   }
// ];

const source1Data2 = [
  {
    index: 1,
    title: '标题',
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  },
  {
    index: 2,
    title: '标题',
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  },
  {
    index: 3,
    title: '标题',
    subtitle: '列表副文字',
    value: '状态',
    showDot: true,
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  },
  {
    index: 4,
    title: '标题',
    subtitle: '列表副文字',
    hideRightIcon: false,
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  },
  {
    index: 5,
    title: '标题',
    subtitle: '列表副文字',
    hideRightIcon: false,
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  }
];

const source1Data3 = [
  {
    index: 1,
    title: '标题',
    showDot: false,
    onPress: () => console.log(4)
  },
  {
    title: '标题',
    showDot: false,
    onPress: () => console.log(4)
  },
  {
   
    index: 3,
    title: '标题',
    subtitle: '标题副文字',
    showDot: false,
    onPress: () => console.log(4)
  },
  {
   
    index: 4,
    title: '标题',
    subtitle: '标题副文字',
    showDot: false,
    onPress: () => console.log(4)
  }
];

// const source2Data1 = [
//   {
//     index: 1,
//     type: 'switch',
//     title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
//     hideRightIcon: true,
//     showDot: false,
//     leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
//     onPress: () => console.log(4)
//   }
// ];

const source2Data2 = [
  {
    index: 1,
    title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  },
  {
    index: 2,
    title: '标题',
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  },
  {
    index: 3,
    title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    value: '状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态状态',
    showDot: true,
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  },
  {
    index: 4,
    title: '标题',
    subtitle: '列表副文字',
    hideRightIcon: false,
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  },
  {
    index: 5,
    title: '标题',
    subtitle: '列表副文字',
    hideRightIcon: false,
    leftIcon: <Circle fill={colorToken.mj_color_gray_icon_1} />,
    onPress: () => console.log(4)
  }
];

const source2Data3 = [
  {
    index: 1,
    title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
    showDot: false,
    onPress: () => console.log(4)
  },
  {
    title: '标题',
    showDot: false,
    onPress: () => console.log(4)
  },
  {
   
    index: 3,
    title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    showDot: false,
    onPress: () => console.log(4)
  },
  {
   
    index: 4,
    title: '标题',
    subtitle: '标题副文字',
    showDot: false,
    onPress: () => console.log(4)
  }
];

const EntryLDemo = () => {

  const [state, setState] = useState({
    // sourceData1: source1Data1,
    sourceData2: source1Data2,
    sourceData3: source1Data3,
    disabled: false,
    switchValue: false
  });

  const transformData = (type) => {
    let data = [];
    switch (type) {
      case 1:
        data = {
          // sourceData1: source1Data1,
          sourceData2: source1Data2,
          sourceData3: source1Data3
        };
        break;
      case 2:
        data = {
          // sourceData1: source2Data1,
          sourceData2: source2Data2,
          sourceData3: source2Data3
        };
        break;
      default:
        data = {
          // sourceData1: source1Data1,
          sourceData2: source1Data2,
          sourceData3: source1Data3
        };
    }
    setState((item) => ({
      ...item,
      ...data
    }));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>L</Text>
        <Text style={styles.button} onPress={() => {
          transformData(1);
        }}>重置</Text>
        <Text style={styles.button} onPress={() => {
          transformData(2);
        }}>长标题</Text>
        <Text style={styles.button} onPress={() => {
          setState((item) => ({
            ...item,
            disabled: !state.disabled
          }));
        }}>切换禁用态</Text>
        <Text style={styles.title}>带图标</Text>
        <View style={styles.data}>
          {/* {state.sourceData1.map((item, index) => {
            return <IotListItemWithWidget key={index} {...item} disabled={state.disabled} value={state.switchValue} onValueChange={(val) => {
              setState((item) => ({
                ...item,
                switchValue: val
              }));
            }}/>;
          })} */}
          {state.sourceData2.map((item, index) => {
            return <IotListItem key={index} {...item} disabled={state.disabled}/>;
          })}
        </View>
        <View style={{ height: 10 }}/>
        <Text style={styles.title}>不带图标</Text>
        <View style={styles.data}>
          {state.sourceData3.map((item, index) => {
            return <IotListItem key={index} {...item} disabled={state.disabled}/>;
          })}
          {/* {
            state.sourceData.map((item, index) => {
              if (item.componentType === 1) {
                return <ListItem key={index} {...item} disabled={state.disabled}/>;
              } 
              return <ListItemWithWidget key={index} {...item} disabled={state.disabled} value={state.switchValue} onValueChange={(val) => {
                setState((item) => ({
                  ...item,
                  switchValue: val
                }));
              }}/>;
            })
          } */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_1,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 16,
    paddingTop: 12
  },
  title: {
    color: colorToken.mjcard_color_miui_1,
    paddingHorizontal: 16,
    paddingVertical: 6
  },
  button: {
    fontSize: 14,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 15,
    lineHeight: 24
  },
  data: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  caseContainer: {
    marginBottom: 12
  }
});

export default EntryLDemo;
