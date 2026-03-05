import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Drawer, Buttons, IphoneXSeries, SafeAreaInsets } from 'miot/ui/hyperOSUI';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';
const dogImage = require('../../../../Resources/Images/dog.png');
const catImage = require('../../../../Resources/Images/cat.png');
const ElasticDrawerDemo = () => {
  const [visible, setVisible] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [longTitle, setLongTitle] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [safeBottom, setSafeBottom] = useState(0);
  const [buttonsBottom, setButtonsBottom] = useState(28);

  useEffect(() => {
    SafeAreaInsets.then(res => {
      const navHeight = res?.bottom || 0;
      setSafeBottom(IphoneXSeries ? navHeight : 0);
      setButtonsBottom(IphoneXSeries ? navHeight + 28 : 28);
    });
  }, []);

  const buttonsPadding = 58 + buttonsBottom;

  const titleText = longTitle ? '大标题大标题大标题大标题大标题大标题大标题' : '大标题';
  const subtitleText = longTitle ? '副标题副标题副标题副标题副标题副标题副标题' : '副标题';

  const outerButtons = [
    { title: '满屏', onPress: () => { setFullScreen(true); setVisible(true); } },
    { title: '70%', onPress: () => { setFullScreen(false); setVisible(true); } },
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
        onClose={() => { setVisible(false); setShowCat(false); }}
        title={titleText}
        subtitle={showSubtitle ? subtitleText : ''}
        type="elastic"
        level={showCat ? 1 : 0}
        onLeftPress={() => {
          if (showCat) {
            setShowCat(false);
          } else {
            setVisible(false);
          }
        }}
      >
        {fullScreen ? (
          <ScrollView
            style={[styles.drawerContent, {marginBottom: showCat ? safeBottom + 28 : buttonsPadding}]}
          >
            <TouchableOpacity
              onPress={() => setShowCat(true)}
              activeOpacity={0.8}
              style={{paddingTop:12}}
            >
              <Image source={dogImage} style={styles.image} resizeMode="cover" />
            </TouchableOpacity>
            {[...Array(5)].map((_, i) => (
              <Image key={i} source={catImage} style={[styles.image, {marginTop: 12}]} resizeMode="cover" />
            ))}
            {showCat && (
              <Image source={catImage} style={[styles.image, {marginTop: 12}]} resizeMode="cover" />
            )}
          </ScrollView>
        ) : (
          <View style={[styles.drawerContent, {paddingBottom: showCat ? safeBottom + 28 : buttonsPadding}]}>
            <TouchableOpacity
              onPress={() => setShowCat(true)}
              activeOpacity={0.8}
              style={{paddingTop:12}}
            >
              <Image source={dogImage} style={styles.image} resizeMode="cover" />
            </TouchableOpacity>
            {showCat && (
              <Image source={catImage} style={[styles.image, {marginTop: 12}]} resizeMode="cover" />
            )}
          </View>
        )}
        {!showCat && <Buttons buttons={innerButtons} />}
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
    paddingHorizontal: 24,
  },
  image: {
    width: '100%',
    height: 192,
    borderRadius: 12,
  },
});

export default ElasticDrawerDemo;
