import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SliderWithButton } from 'miot/ui/hyperOSUI';
import { CardContainer, MiddleVariantSwitch } from 'mhui-rn/dist/hyperOS';
import { colorToken } from "mhui-rn/dist/styles/color";
import { ChooseIcon, Cold, RightIcon, SliderIcon } from "mhui-rn/dist/icons";

const SliderContinuousDemo = () => {
  const [disabledLight, setLightDisabled] = useState(false);
  const [disabledFan, setFanDisabled] = useState(false);
  const [active, setActive] = useState(true);
  const [percentValue, setPercentValue] = useState(41);
  const [lightOn, setLightOn] = useState(true);
  const [fanOn, setFanOn] = useState(true);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={styles.header}>无极滑条</Text>
      <MiddleVariantSwitch
        icon={<SliderIcon width={20} height={20}/>}
        title={'点击右侧按钮进行激活'}
        value={active}
        onValueChange={(value) => setActive(value)}
        colorType={'orange'}
      >
      </MiddleVariantSwitch>
      <CardContainer title="无附加信息" gap={12}>
        <Text style={styles.title}>标题</Text>
        <SliderWithButton
          sliderProps={{
            value: 2,
            min: 1,
            max: 20,
            showMarkLabel: true,
            active,
            onAfterChange: (value) => {
              console.log('value', value);
            }
          }}
        />
      </CardContainer>

      <CardContainer title="自填" gap={12}>
        <Text style={styles.title}>标题 | {percentValue}% </Text>
        <SliderWithButton
          sliderProps={
            {
              value: percentValue,
              min: 0,
              max: 100,
              mark: [0, 41, 63, 100],
              showMarkLabel: true,
              active,
              onChange: (value) => {
                setPercentValue(value);
                console.log('实时value', value);
              },
              onAfterChange: (value) => {
                console.log('value', value);
              }
            }}
        />
      </CardContainer>
      <CardContainer title={'自填'} gap={12}>
        <Text style={styles.title}>标题</Text>
        <SliderWithButton
          sliderProps={{
            value: 20,
            min: 0,
            max: 100,
            mark: [0, 100],
            showMarkLabel: true,
            active,
            onAfterChange: (value) => { console.log('value', value); }
          }}
        />
      </CardContainer>
      <CardContainer title="右侧带按钮" gap={12}>
        <View style={styles.cardInner}>
          <Text style={styles.title}>标题</Text>
          <SliderWithButton
            sliderProps={{
              value: 20,
              min: 0,
              max: 100,
              disabled: disabledLight,
              active
            }}
            buttonProps={{
              icon: <SliderIcon/>,
              value: lightOn,
              onValueChange: (value) => { setLightOn(value), setLightDisabled(!value); },
              colorType: 'yellow'
            }}
          />
        </View>
      </CardContainer>
      <CardContainer title="右侧带按钮" gap={12}>
        <View style={styles.cardInner}>
          <Text style={styles.title}>标题</Text>
          <SliderWithButton
            sliderProps={{
              disabled: disabledFan,
              active
            }}
            buttonProps={{
              icon: <SliderIcon/>,
              value: fanOn,
              onValueChange: (value) => { setFanOn(value), setFanDisabled(!value); },
              colorType: 'orange'
            }}
          />
        </View>
      </CardContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: colorToken?.mj_color_gray_text_1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_2,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  }
});

export default SliderContinuousDemo;
