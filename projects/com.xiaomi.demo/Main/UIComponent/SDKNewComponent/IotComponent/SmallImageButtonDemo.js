'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { CardContainer, colorToken, Fonts, SmallGridContainer, SmallImageButton } from 'miot/ui/hyperOSUI';
import { SliderIcon, Cold } from 'mhui-rn/dist/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const SmallImageButtonDemo = ({ navigation }) => {
  const [lightOn, setLightOn] = useState(false);
  const [acOn, setAcOn] = useState(true);
  const [fanOn, setFanOn] = useState(false);
  const [curtainOn, setCurtainOn] = useState(true);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('IotSmallImageButtonConfigDemo', { title: 'SmallImageButton 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>图片按钮（小）</Text>

      <Text style={styles.sectionTitle}>button 模式（纯入口）</Text>
      <CardContainer>
        <SmallGridContainer>
          <SmallImageButton
            title="灯光"
            actionType="button"
            custom={(pressed) => <SliderIcon fill={pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal} />}
          />
          <SmallImageButton
            title="空调"
            actionType="button"
            custom={(pressed) => <Cold fill={pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal} />}
          />
          <SmallImageButton
            title="窗帘"
            actionType="button"
            custom={(pressed) => <SliderIcon fill={pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal} />}
          />
          <SmallImageButton
            title="加湿器"
            actionType="button"
            custom={(pressed) => <Cold fill={pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal} />}
          />
        </SmallGridContainer>
      </CardContainer>

      <Text style={styles.sectionTitle}>toggle 模式（二态开关）</Text>
      <CardContainer>
        <SmallGridContainer>
          <SmallImageButton
            title="灯光"
            actionType="toggle"
            active={lightOn}
            colorType="green"
            custom={(pressed) => (
              <SliderIcon fill={
                lightOn
                  ? (pressed ? colorToken.accentGreenLow : colorToken.accentGreenContent)
                  : (pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal)
              } />
            )}
            onPress={() => setLightOn(!lightOn)}
          />
          <SmallImageButton
            title="空调"
            actionType="toggle"
            active={acOn}
            colorType="blue"
            custom={(pressed) => (
              <Cold fill={
                acOn
                  ? (pressed ? colorToken.accentBlueLow : colorToken.accentBlueContent)
                  : (pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal)
              } />
            )}
            onPress={() => setAcOn(!acOn)}
          />
          <SmallImageButton
            title="风扇"
            actionType="toggle"
            active={fanOn}
            colorType="orange"
            custom={(pressed) => (
              <SliderIcon fill={
                fanOn
                  ? (pressed ? colorToken.accentOrangeLow : colorToken.accentOrangeContent)
                  : (pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal)
              } />
            )}
            onPress={() => setFanOn(!fanOn)}
          />
          <SmallImageButton
            title="窗帘"
            actionType="toggle"
            active={curtainOn}
            colorType="wathet"
            custom={(pressed) => (
              <Cold fill={
                curtainOn
                  ? (pressed ? colorToken.accentWathetLow : colorToken.accentWathetContent)
                  : (pressed ? colorToken.contentSecondaryPress : colorToken.contentSecondaryNormal)
              } />
            )}
            onPress={() => setCurtainOn(!curtainOn)}
          />
        </SmallGridContainer>
      </CardContainer>

      <Text style={styles.sectionTitle}>禁用态</Text>
      <CardContainer>
        <SmallGridContainer>
          <SmallImageButton
            title="扫地机"
            actionType="toggle"
            active={false}
            disabled
            custom={<SliderIcon fill={colorToken.contentDisabledPrimary} />}
          />
          <SmallImageButton
            title="净化器"
            actionType="toggle"
            active
            disabled
            colorType="purple"
            custom={<Cold fill={colorToken.contentDisabledPrimary} />}
          />
          <SmallImageButton
            title="热水器"
            actionType="button"
            disabled
            custom={<SliderIcon fill={colorToken.contentDisabledPrimary} />}
          />
        </SmallGridContainer>
      </CardContainer>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  header: {
    paddingHorizontal: 15,
    marginBottom: 10,
    ...Fonts.fontSystem24Medium,
    color: colorToken.contentSecondaryNormal,
  },
  sectionTitle: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.fontSystem13Regular,
  },
});

export default SmallImageButtonDemo;
