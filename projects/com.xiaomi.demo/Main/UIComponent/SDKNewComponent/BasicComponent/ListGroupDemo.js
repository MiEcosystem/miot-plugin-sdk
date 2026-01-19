'use strict';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ListGroup } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { colorToken } from 'miot/ui/hyperOSUI';

const sourceGroup1data1 = [
  {
    key: 1,
    type: 'switch',
    title: '列表主文字',
    hideArrow: true,
    onPress: () => console.log(4)
  },
  {
    key: 2,
    title: '列表主文字',
    hideArrow: true,
    onPress: () => console.log(4)
  },
  {
    key: 3,
    title: '列表主文字',
    hideArrow: false,
    onPress: () => console.log(4)
  }
];
const sourceGroup2data1 = [
  {
    key: 1,
    type: 'switch',
    title: '列表主文字',
    hideArrow: true,
    
    onPress: () => console.log(4)
  },
  {
    key: 2,
    title: '列表主文字',
    hideArrow: true,
    type: 'switch',
    onPress: () => console.log(4)
  },
  {
    key: 3,
    title: '列表主文字',
    hideArrow: false,
    type: 'switch',
    onPress: () => console.log(4)
  }
];

const sourceGroup1data2 = [
  {
    key: 1,
    title: '列表主文字',
    hideArrow: true,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  },
  {
    key: 2,
    title: '列表主文字',
    hideArrow: true,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  },
  {
    key: 3,
    title: '列表主文字',
    hideArrow: false,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  }
];
const sourceGroup2data2 = [
  {
    key: 1,
    title: '列表主文字',
    hideArrow: true,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  },
  {
    key: 2,
    title: '列表主文字',
    hideArrow: true,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  },
  {
    key: 3,
    title: '列表主文字',
    hideArrow: false,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  }
];

const sourceGroup1data3 = [
  {
    key: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    onPress: () => console.log(4)
  },
  {
    key: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    type: 'switch',
    onPress: () => console.log(4)
  },
  {
    key: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: false,
    type: 'switch',
    onPress: () => console.log(4)
  }
];

const sourceGroup2data3 = [
  {
    key: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    onPress: () => console.log(4)
  },
  {
    key: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    type: 'switch',
    onPress: () => console.log(4)
  },
  {
    key: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: false,
    type: 'switch',
    onPress: () => console.log(4)
  }
];

const sourceGroup1data4 = [
  {
    key: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  },
  {
    key: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  },
  {
    key: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: false,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  }
];

const sourceGroup2data4 = [
  {
    key: 1,
    type: 'switch',
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  },
  {
    key: 2,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: true,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  },
  {
    key: 3,
    title: '列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字列表主文字',
    subtitle: '列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字列表副文字',
    hideArrow: false,
    type: 'switch',
    onPress: () => console.log(4),
    leftIconSource: require('../../images/group.png')
  }
];
const ListGroupDemo = () => {

  const [state, setState] = useState({
    dataSource1: [],
    dataSource2: []
  });

  const onValueChange = (val) => {
    setState((c) => ({
      dataSource1: c.dataSource1.map((item) => ({ ...item, value: val })),
      dataSource2: c.dataSource2.map((item) => ({ ...item, value: val }))
    }));
  };

  const transformData = (type) => {
    let data1 = [];
    let data2 = [];
    switch (type) {
      case 1:
        data1 = sourceGroup1data1;
        data2 = sourceGroup2data1;
        break;
      case 2:
        data1 = sourceGroup1data2;
        data2 = sourceGroup2data2;
        break;
      case 3:
        data1 = sourceGroup1data3;
        data2 = sourceGroup2data3;
        break;
      case 4:
        data1 = sourceGroup1data4;
        data2 = sourceGroup2data4;
        break;
      default:
        data1 = sourceGroup1data1;
        data2 = sourceGroup2data1;
    }
    setState({
      dataSource1: data1.map((item) => ({ ...item, value: false, onValueChange })),
      dataSource2: data2.map((item) => ({ ...item, value: false, onValueChange }))
    });
  };

  useEffect(() => {
    transformData(1);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>基础样式</Text>
        <Text style={styles.button} onPress={() => {
          transformData(1);
        }}>重置</Text>
        <Text style={styles.button} onPress={() => {
          transformData(2);
        }}>切换图标</Text>
        <Text style={styles.button} onPress={() => {
          transformData(3);
        }}>切换长标题</Text>
        <Text style={styles.button} onPress={() => {
          transformData(4);
        }}>切换图标长标题</Text>
        <ListGroup 
          title="分组标题"
          type="widget"
          disabled={false}
          bottomPosition="inner"
          bottomTips="自动亮度下，移动滑动条微调亮度，调整后的屏幕亮度仍会随周围环境的亮度变化而变化"
          dataSource={state.dataSource1} />
        <View style={{ marginTop: 12 }}>
          <ListGroup
            title="分组标题" 
            type="widget" 
            disabled={true} 
            bottomPosition="outer" 
            bottomTips="自动亮度下，移动滑动条微调亮度，调整后的屏幕亮度仍会随周围环境的亮度变化而变化"
            dataSource={state.dataSource2} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    paddingTop: 30,
    backgroundColor: colorToken.mj_color_gray_bg_2,
    minHeight: '100%'
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_1,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  button: {
    fontSize: 14,
    color: colorToken.mj_color_gray_text_1,
    paddingHorizontal: 15,
    lineHeight: 24
  }
});

export default ListGroupDemo;
