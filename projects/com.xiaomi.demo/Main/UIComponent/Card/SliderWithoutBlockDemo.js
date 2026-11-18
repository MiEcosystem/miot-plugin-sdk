import { ContainerWithGap } from 'miot/ui';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SliderWithoutBlock } from 'mhui-rn/dist/modules/sliderWithoutBlock';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function SliderWithoutBlockDemo() {
  const [currentValue, setCurrentValue] = useState(20);
  const [endValue, setEndValue] = useState(40);
  return (
    <View style={styles.container}>
      <ContainerWithGap gap={12} containerStyle={{
        width: '100%',
        paddingHorizontal: 12
      }}>
        <SliderWithoutBlock
          title="可配图滑块"
          subtitle={`当前值${ currentValue }`}
          onSlidingChange={(v) => {
            console.log('onSlidingChange--v---', v);
            setCurrentValue(v);
          }}
          themeColor={'#FFBC39'}
          contentType={'num'}
          showEndText={false}
          showEndImage={true}
          leftEndImage={require('../images/brightness-low.png')}
          rightEndImage={require('../images/brightness-high.png')}
          leftEndHighlightImage={require('../images/brightness-low-h.png')}
          rightEndHighlightImage={require('../images/brightness-high-h.png')}
          leftEndDisImage={require('../images/brightness-low-d.png')}
          rightEndDisImage={require('../images/brightness-high-d.png')}
          initValue={20}
          min={0}
          max={100}
          step={1}
        />
        <SliderWithoutBlock
          title="可配图滑块"
          subtitle={`结束滑动${ endValue }`}
          onSlidingComplete={(v) => {
            console.log('onSlidingChange--v---', v);
            setEndValue(v);
          }}
          contentType={'num'}
          showEndImage={true}
          showEndText={false}
          leftEndImage={require('../images/brightness-low.png')}
          rightEndImage={require('../images/brightness-high.png')}
          leftEndHighlightImage={require('../images/brightness-low-h.png')}
          rightEndHighlightImage={require('../images/brightness-high-h.png')}
          leftEndDisImage={require('../images/brightness-low-d.png')}
          rightEndDisImage={require('../images/brightness-high-d.png')}
          initValue={40}
          min={0}
          max={100}
          step={1}
        />
      </ContainerWithGap>
    </View>
  );

}


