import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SliderWithButton } from 'miot/ui/hyperOSUI';
import { CardContainer, MiddleVariantSwitch } from 'mhui-rn/dist/hyperOS';
import { colorToken } from "mhui-rn/dist/styles/color";
import { Cold, SliderIcon } from "mhui-rn/dist/icons";

const SliderDiscreteDemo = () => {
  const [disabledLight, setLightDisabled] = useState(true);
  const [disabledFan, setFanDisabled] = useState(true);
  const [disabledSwitch, setSwitchDisabled] = useState(true);
  const [disabledDoor, setDoorDisabled] = useState(true);
  const [active, setActive] = useState(true);
  const [lightOn, setLightOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [SwitchOn, setSwitchOn] = useState(false);
  const [DoorOn, setDoorOn] = useState(false);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={styles.header}>离散滑条</Text>
      <MiddleVariantSwitch
        icon={<SliderIcon width={20} height={20}/>}
        title={'点击右侧按钮进行激活'}
        value={active}
        onValueChange={(value) => setActive(value)}
        colorType={'green'}>
      </MiddleVariantSwitch>
      <CardContainer title="无附加信息" gap={12}>
        <Text style={styles.title}>标题</Text>
        <SliderWithButton
          sliderProps={{ active }}
        />
      </CardContainer>
      <CardContainer title="3等分" gap={12}>
        <Text style={styles.title}>标题</Text>
        <SliderWithButton
          sliderProps={{
            value: 1,
            min: 0,
            max: 3,
            step: 1,
            discrete: true,
            active,
            onChange: ({ value }) => {
              console.log("onChange");
            },
            onAfterChange: (value) => {
              console.log('value', value);
            }
          }}
        />
      </CardContainer>
      <CardContainer title="4等分" gap={12}>
        <Text style={styles.title}>标题</Text>
        <SliderWithButton
          sliderProps={{
            value: 2,
            min: 0,
            max: 4,
            step: 1,
            discrete: true,
            active,
            onAfterChange: (value) => {
              console.log('value', value);
            }
          }}
        />
      </CardContainer>
      <CardContainer title="5等分" gap={12}>
        <Text style={styles.title}>标题</Text>
        <SliderWithButton
          sliderProps={{
            value: 2,
            min: 0,
            max: 5,
            step: 1,
            discrete: true,
            active,
            onAfterChange: (value) => {
              console.log('value', value);
            }
          }}
        />
      </CardContainer>
      <CardContainer title="8等分" gap={12}>
        <Text style={styles.title}>标题</Text>
        <SliderWithButton
          sliderProps={{
            value: 4,
            min: 0,
            max: 8,
            step: 1,
            discrete: true,
            active,
            onAfterChange: (value) => {
              console.log('value', value);
            }
          }}
        />
      </CardContainer>
      <CardContainer title="右侧带按钮" gap={12}>
        <View style={styles.cardInner}>
          <Text style={styles.title}>标题</Text>
          <SliderWithButton
            sliderProps={{
              value: 1,
              min: 0,
              max: 3,
              step: 1,
              disabled: disabledLight,
              active,
              discrete: true
            }}
            buttonProps={{
              icon: <SliderIcon/>,
              value: lightOn,
              onValueChange: (value) => { setLightOn(value), setLightDisabled(!value); },
              colorType: 'blue'
            }}
          />
        </View>
      </CardContainer>
      <CardContainer title="右侧带按钮" gap={12}>
        <View style={styles.cardInner}>
          <Text style={styles.title}>标题</Text>
          <SliderWithButton
            sliderProps={{
              value: 2,
              min: 0,
              max: 5,
              step: 1,
              disabled: disabledFan,
              active,
              discrete: true
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
      <CardContainer title="右侧带按钮" gap={12}>
        <View style={styles.cardInner}>
          <Text style={styles.title}>标题</Text>
          <SliderWithButton
            sliderProps={{
              value: 1,
              min: 0,
              max: 5,
              step: 1,
              disabled: disabledSwitch,
              active,
              discrete: true
            }}
            buttonProps={{
              icon: <SliderIcon/>,
              value: SwitchOn,
              onValueChange: (value) => { setSwitchOn(value), setSwitchDisabled(!value); },
              colorType: 'green'
            }}
          />
        </View>
      </CardContainer>
      <CardContainer title="右侧带按钮" gap={12}>
        <View style={styles.cardInner}>
          <Text style={styles.title}>标题</Text>
          <SliderWithButton
            sliderProps={{
              value: 5,
              min: 0,
              max: 8,
              step: 1,
              disabled: disabledDoor,
              active,
              discrete: true
            }}
            buttonProps={{
              icon: <SliderIcon/>,
              value: DoorOn,
              onValueChange: (value) => { setDoorOn(value), setDoorDisabled(!value); },
              colorType: 'yellow'
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

export default SliderDiscreteDemo;
