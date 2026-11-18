'use strict';

import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import NavigationBar from 'miot/ui/NavigationBar';
import { CardContainer, SegmentedControls, colorToken, ContainerWithGap } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const options = [
  { label: '选项一', value: 'one' },
  { label: '选项二', value: 'two' },
  { label: '选项三', value: 'three' },
];

const SegmentedControlsDemo = ({ navigation }) => {
  const [outerValue, setOuterValue] = useState('one');
  const [innerValue, setInnerValue] = useState('two');

  useEffect(() => {
    navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => navigation.navigate('SegmentedControlsConfigDemo', { title: 'SegmentedControls 配置调试' }),
        },
      ],
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ContainerWithGap outerMargin={12}>
        <Text style={styles.label}>Outer</Text>
        <SegmentedControls options={options} activeValue={outerValue} onChange={setOuterValue} />
        <View style={styles.innerSection}>
          <CardContainer title="Inner">
            <SegmentedControls type="inner" options={options} activeValue={innerValue} onChange={setInnerValue} />
          </CardContainer>
        </View>
      </ContainerWithGap>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: { flex: 1, backgroundColor: colorToken.surfacePageLow },
  content: { paddingTop: 20, paddingBottom: 32 },
  label: { marginHorizontal: 16, marginBottom: 8, color: colorToken.contentSecondaryNormal, fontSize: 14 },
  innerSection: { marginTop: 24 },
});

export default SegmentedControlsDemo;
