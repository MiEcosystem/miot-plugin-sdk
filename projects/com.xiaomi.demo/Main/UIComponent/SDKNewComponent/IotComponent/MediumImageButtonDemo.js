'use strict';

import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { CardContainer, colorToken, ContainerWithGap, Fonts, MediumImageButton } from 'miot/ui/hyperOSUI';
import { SliderIcon, Cold } from 'mhui-rn/dist/icons';
import NavigationBar from 'miot/ui/NavigationBar';
import { ConfigContext } from 'mhui-rn/dist/components/configProvider';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const noop = () => {};

const MediumImageButtonDemo = ({ navigation }) => {
  

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('IotMediumImageButtonConfigDemo', { title: 'MediumImageButton 配置调试' }) }],
    });
  }, []);

  const [ac, setAc] = React.useState(true);
  const [heater, setHeater] = React.useState(false);
  const [light, setLight] = React.useState(true);
  const [fan, setFan] = React.useState(false);
  const { colorToken } = useContext(ConfigContext);

  function getIconColor({ active, disabled, colorType }) {
    if (disabled) return colorToken.contentDisabledPrimary;
    if (!active) return colorToken.contentSecondaryNormal;
    const map = {
      blue: colorToken.accentBlueContent,
      orange: colorToken.accentOrangeContent,
      green: colorToken.accentGreenContent,
      wathet: colorToken.accentWathetContent,
      purple: colorToken.accentPurpleContent,
    };
    return map[colorType] || colorToken.accentGreenContent;
  }

  const IconAc = ({ color }) => (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Rect x={4} y={10} width={24} height={12} rx={4} fill={color} opacity={0.2}/>
      <Rect x={4} y={10} width={24} height={12} rx={4} stroke={color} strokeWidth={1.5}/>
      <Rect x={8} y={14} width={16} height={4} rx={2} fill={color}/>
      <Path d="M10 22 Q16 28 22 22" stroke={color} strokeWidth={1.5} fill="none"/>
    </Svg>
  );
  const IconHeater = ({ color }) => (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Path d="M10 24 Q10 16 16 16 Q22 16 22 8" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round"/>
      <Path d="M14 24 Q14 18 16 18 Q18 18 18 12" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.6}/>
      <Path d="M18 24 Q18 20 22 20 Q22 14 20 12" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.4}/>
    </Svg>
  );
  const IconLight = ({ color }) => (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Circle cx={16} cy={13} r={6} fill={color} opacity={0.3}/>
      <Circle cx={16} cy={13} r={4} fill={color}/>
      <Path d="M16 4 L16 7M16 19 L16 22M8 13 L5 13M27 13 L24 13M10.3 7.3 L12.4 9.4M21.6 16.6 L19.5 18.7M10.3 18.7 L12.4 16.6M21.6 9.4 L19.5 7.3" stroke={color} strokeWidth={1.5} strokeLinecap="round"/>
      <Rect x={13} y={21} width={6} height={3} rx={1} fill={color} opacity={0.6}/>
    </Svg>
  );
  const IconFan = ({ color }) => (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Circle cx={16} cy={16} r={2.5} fill={color}/>
      <Path d="M16 13.5 Q16 8 20 8 Q20 14 16 13.5Z" fill={color} opacity={0.8}/>
      <Path d="M18.2 17.2 Q22.5 20 21 24 Q16 21.5 18.2 17.2Z" fill={color} opacity={0.8}/>
      <Path d="M13.8 17.2 Q9.5 20 11 24 Q16 21.5 13.8 17.2Z" fill={color} opacity={0.6}/>
    </Svg>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ContainerWithGap viewStyle={{ flex: 1, paddingHorizontal: 12, paddingTop: 20 }} gap={8}>
        <Text style={{ fontSize: 13, color: '#888', paddingHorizontal: 4 }}>两列布局（带图标）</Text>
        <ContainerWithGap horizontal span={2} gap={8}>
          <CardContainer viewStyle={{ flex: 1 }}>
            <MediumImageButton
              title="空调"
              subtitle={ac ? '制冷 · 26°C' : '已关闭'}
              actionType="toggle"
              active={ac}
              colorType="blue"
              leadingIcon={<IconAc color={getIconColor({ active: ac, disabled: false, colorType: 'blue' })} />}
              onPress={() => setAc(v => !v)}
            />
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <MediumImageButton
              title="热水器"
              subtitle={heater ? '55°C 加热中' : '已关闭'}
              actionType="toggle"
              active={heater}
              colorType="orange"
              leadingIcon={<IconHeater color={getIconColor({ active: heater, disabled: false, colorType: 'orange' })} />}
              onPress={() => setHeater(v => !v)}
            />
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <MediumImageButton
              title="灯光"
              subtitle={light ? '已开启' : '已关闭'}
              actionType="toggle"
              active={light}
              colorType="green"
              leadingIcon={<IconLight color={getIconColor({ active: light, disabled: false, colorType: 'green' })} />}
              onPress={() => setLight(v => !v)}
            />
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1 }}>
            <MediumImageButton
              title="风扇"
              subtitle={fan ? '自然风' : '已关闭'}
              actionType="toggle"
              active={fan}
              colorType="wathet"
              leadingIcon={<IconFan color={getIconColor({ active: fan, disabled: false, colorType: 'wathet' })} />}
              onPress={() => setFan(v => !v)}
            />
          </CardContainer>
        </ContainerWithGap>

        <Text style={{ fontSize: 13, color: '#888', paddingHorizontal: 4 }}>单列布局（一行）</Text>
        <CardContainer>
          <MediumImageButton
            title="空调"
            subtitle={ac ? '制冷 · 26°C' : '已关闭'}
            actionType="toggle"
            active={ac}
            colorType="blue"
            leadingIcon={<IconAc color={getIconColor({ active: ac, disabled: false, colorType: 'blue' })} />}
            onPress={() => setAc(v => !v)}
          />
        </CardContainer>
        <CardContainer>
          <MediumImageButton
            title="热水器"
            subtitle={heater ? '55°C 加热中' : '已关闭'}
            actionType="toggle"
            active={heater}
            colorType="orange"
            leadingIcon={<IconHeater color={getIconColor({ active: heater, disabled: false, colorType: 'orange' })} />}
            onPress={() => setHeater(v => !v)}
          />
        </CardContainer>

        <Text style={{ fontSize: 13, color: '#888', paddingHorizontal: 4 }}>禁用状态</Text>
        <ContainerWithGap horizontal span={2} gap={8}>
          <CardContainer viewStyle={{ flex: 1, minHeight: 68 }}>
            <MediumImageButton
              title="禁用入口"
              subtitle="不可交互"
              leadingIcon={<IconFan color={getIconColor({ active: false, disabled: true, colorType: 'wathet' })} />}
              disabled
              onPress={() => {}}
            />
          </CardContainer>
          <CardContainer viewStyle={{ flex: 1, minHeight: 68 }}>
            <MediumImageButton
              title="禁用开关"
              subtitle="已激活"
              actionType="toggle"
              active
              disabled
              colorType="green"
              leadingIcon={<IconLight color={getIconColor({ active: true, disabled: true, colorType: 'green' })} />}
              onPress={() => {}}
            />
          </CardContainer>
        </ContainerWithGap>

      </ContainerWithGap>
    </View>
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
  containerWrap: {
    paddingHorizontal: 12,
  },
});

export default MediumImageButtonDemo;
