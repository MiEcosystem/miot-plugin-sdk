import React, { useState } from 'react';
import { View, Image, TouchableOpacity,ScrollView } from 'react-native';
import { Drawer, Buttons } from 'miot/ui/hyperOSUI';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const dogImage = require('../../../../Resources/Images/dog.png');
const catImage = require('../../../../Resources/Images/cat.png');

const FixedDrawerDemo = () => {
  const [visible, setVisible] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [longTitle, setLongTitle] = useState(false);
  const [showCat, setShowCat] = useState(false);

  const titleText = longTitle ? '大标题大标题大标题大标题大标题大标题大标题' : '大标题';
  const subtitleText = longTitle ? '副标题副标题副标题副标题副标题副标题副标题' : '副标题';

  const outerButtons = [
    { title: '满屏', onPress: () => setVisible(true) },
    { title: '70%', onPress: () => setVisible(true) },
  ];

  const innerButtons = [
    {
      title: showSubtitle ? '仅主标题' : '主副标题',
      onPress: () => setShowSubtitle(!showSubtitle),
    },
    {
      title: longTitle ? '短标题' : '长标题',
      onPress: () => setLongTitle(!longTitle),
    },
  ];

  return (
    <View style={styles.container}>
      <Buttons buttons={outerButtons} />

      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        title={titleText}
        subtitle={showSubtitle ? subtitleText : ''}
        type="fixed"
        level={showCat ? 1 : 0}
        onLeftPress={() => {
          if (showCat) {
            setShowCat(false);
          } else {
            setVisible(false);
          }
        }}
      >
        <ScrollView style={styles.drawerContent}>
          <TouchableOpacity
            onPress={() => setShowCat(!showCat)}
            activeOpacity={0.8}
            style={{paddingTop:12}}
          >
            <Image
              source={showCat ? catImage : dogImage}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </ScrollView>
        <Buttons buttons={innerButtons} />
      </Drawer>
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorToken.mj_color_gray_bg_2,
  },
  drawerContent: {
    flexShrink: 1,
    paddingHorizontal: 24,
  },
  image: {
    width: '100%',
    height: 192,
    borderRadius: 12,
  },
});

export default FixedDrawerDemo;
