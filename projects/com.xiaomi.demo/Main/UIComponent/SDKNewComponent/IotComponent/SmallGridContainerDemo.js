'use strict';

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SmallGridContainer, SmallGridEntrance, SmallGridToggle, colorToken, Fonts, CardContainer, showToast } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';
import { Circle } from 'miot/ui/icons';
import NavigationBar from 'miot/ui/NavigationBar';

const icon = <Circle fill={colorToken.contentPrimaryNormal} />;
const onPress = () => showToast('onPress');

const SmallGridContainerDemo = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    navigation.setParams({
      right: [{ key: NavigationBar.ICON.MORE, onPress: () => navigation.navigate('SmallGridContainerConfigDemo', { title: 'SmallGridContainer 配置调试' }) }],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>SmallGridContainer</Text>

      <Text style={styles.button} onPress={() => setDisabled(!disabled)}>
        {disabled ? '启用' : '禁用'}
      </Text>

      <Text style={styles.sectionTitle}>2列 Entrance</Text>
      <CardContainer>
        <SmallGridContainer maxColumns={2}>
          <SmallGridEntrance title="灯光" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="空调" icon={icon} onPress={onPress} disabled={disabled} />
        </SmallGridContainer>
      </CardContainer>

      <Text style={styles.sectionTitle}>3列 Entrance</Text>
      <CardContainer>
        <SmallGridContainer maxColumns={3}>
          <SmallGridEntrance title="灯光" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="空调" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="窗帘" icon={icon} onPress={onPress} disabled={disabled} />
        </SmallGridContainer>
      </CardContainer>

      <Text style={styles.sectionTitle}>4列 Entrance</Text>
      <CardContainer>
        <SmallGridContainer maxColumns={4}>
          <SmallGridEntrance title="灯光" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="空调" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="窗帘" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="扫地机" icon={icon} onPress={onPress} disabled={disabled} />
        </SmallGridContainer>
      </CardContainer>

      <Text style={styles.sectionTitle}>4列 5个（自动换行）</Text>
      <CardContainer>
        <SmallGridContainer maxColumns={4}>
          <SmallGridEntrance title="灯光" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="空调" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="窗帘" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="扫地机" icon={icon} onPress={onPress} disabled={disabled} />
          <SmallGridEntrance title="加湿器" icon={icon} onPress={onPress} disabled={disabled} />
        </SmallGridContainer>
      </CardContainer>

      <Text style={styles.sectionTitle}>4列 Toggle</Text>
      <CardContainer>
        <SmallGridContainer maxColumns={4}>
          <SmallGridToggle title="灯光" icon={icon} checked={checked} onChange={setChecked} disabled={disabled} />
          <SmallGridToggle title="空调" icon={icon} checked={false} onChange={() => {}} disabled={disabled} />
          <SmallGridToggle title="窗帘" icon={icon} checked={false} onChange={() => {}} disabled={disabled} />
          <SmallGridToggle title="扫地机" icon={icon} checked={false} onChange={() => {}} disabled={disabled} />
        </SmallGridContainer>
      </CardContainer>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
    paddingHorizontal: 12,
  },
  header: {
    fontSize: 24,
    color: colorToken.contentPrimaryNormal,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    color: colorToken.accentOsFill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 12,
    ...Fonts.fontSystem13Regular,
  },
  button: {
    fontSize: 14,
    color: colorToken.accentBlueFill,
    paddingHorizontal: 15,
    lineHeight: 24,
  },
});

export default SmallGridContainerDemo;
