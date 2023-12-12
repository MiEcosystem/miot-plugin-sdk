import { ContainerWithGap } from 'miot/ui';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Logger from '../../Logger';
import SliderWithHeader from 'miot/ui/SliderWithHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function SliderWithHeaderDemo() {
  const [currentValue, setCurrentValue] = useState(20);
  const [endValue, setEndValue] = useState(40);  
  return (
    <View style={styles.container}>
      <ContainerWithGap gap={12} containerStyle={{
        width: '100%',
        paddingHorizontal: 12
      }}>
        <SliderWithHeader
          containerStyle={{
            height: 60
          }}
          title="滑动过程回调"
          subtitle={`当前值${ currentValue }`}
          onSlidingChange={(v) => {
            console.log('onSlidingChange--v---', v);
            setCurrentValue(v);
          }}
          initValue={20}
          min={0}
          max={100}
          step={1}
        />
        <SliderWithHeader
          title="滑动结束后回调"
          subtitle={`结束值${ endValue }`}
          onSlidingComplete={(v) => {
            console.log('onSlidingChange--v---', v);
            setEndValue(v);
          }}
          initValue={40}
          min={0}
          max={100}
          step={1}
        />
      </ContainerWithGap>
    </View>
  );
  
}


