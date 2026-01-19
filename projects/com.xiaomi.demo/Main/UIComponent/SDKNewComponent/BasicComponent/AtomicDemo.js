import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { Switch, Checkbox, ChoiceItem, JestComponent } from 'miot/ui/hyperOSUI';
import { colorToken } from 'mhui-rn/dist/styles/color';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from "miot/ui/NavigationBar";

const colors = ['green', 'blue', 'yellow', 'orange', 'wathet', 'purple', 'red'];
const alert = Alert.alert;

const propConfigs1 = [
  { name: 'value', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'needVibrate', type: 'boolean', defaultValue: true },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'red', 'blue', 'wathet', 'purple', 'white', 'orange', 'yellow'],
    defaultValue: 'green'
  },
  { name: 'onValueChange', type: 'pass', passDescription: '开关变化回调', defaultValue: () => alert('开关变化回调') },
  { name: 'onDisabledValueChange', type: 'pass', passDescription: '禁用状态变化回调', defaultValue: () => alert('禁用状态变化回调') }
];

const propConfigs2 = [
  { name: 'checked', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'label', type: 'string', defaultValue: '选项' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'red', 'blue', 'wathet', 'purple', 'white', 'orange', 'yellow'],
    defaultValue: 'green'
  },
  { name: 'onValueChange', type: 'pass', passDescription: '选中状态变化回调', defaultValue: () => alert('选中状态变化回调') },
  { name: 'accessible', type: 'boolean', defaultValue: true },
  { name: 'accessibilityLabel', type: 'string', defaultValue: '复选框' },
  { name: 'accessibilityHint', type: 'string' }
];

const propConfigs3 = [
  { name: 'choosed', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'type', type: 'enum', enumOptions: ['1', '2'], defaultValue: '1' },
  { name: 'label', type: 'string', defaultValue: '选项' },
  {
    name: 'colorType',
    type: 'enum',
    enumOptions: ['green', 'red', 'blue', 'wathet', 'purple', 'white', 'orange', 'yellow'],
    defaultValue: 'green'
  },
  { name: 'onValueChange', type: 'pass', passDescription: '选中状态变化回调', defaultValue: () => alert('选中状态变化回调') }
];

const AtomicDemo = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);

  // 独立状态数组
  const [valueSwitch, setValueSwitch] = useState(colors.map(() => false));
  const [valueCheckbox, setValueCheckbox] = useState(colors.map(() => false));
  const [valueChoice1, setValueChoice1] = useState(colors.map(() => false));
  const [valueChoice2, setValueChoice2] = useState(colors.map(() => false));

  useEffect(() => {
    navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => setDisabled(prev => !prev)
        }
      ]
    });
  }, []);

  const renderSwitch = () =>
    colors.map((color, index) => (
      <View key={color} style={{ marginTop: index === 0 ? 0 : 52 }}>
        <Switch
          colorType={color}
          value={valueSwitch[index]}
          disabled={disabled}
          onValueChange={() => {
            const newValues = [...valueSwitch];
            newValues[index] = !newValues[index];
            setValueSwitch(newValues);
          }}
        />
      </View>
    ));

  const renderCheckBox = () =>
    colors.map((color, index) => (
      <View key={color} style={{ marginTop: index === 0 ? 0 : 56 }}>
        <Checkbox
          colorType={color}
          checked={valueCheckbox[index]}
          disabled={disabled}
          onValueChange={() => {
            const newValues = [...valueCheckbox];
            newValues[index] = !newValues[index];
            setValueCheckbox(newValues);
          }}
        />
      </View>
    ));

  const renderChoiceItem1 = () =>
    colors.map((color, index) => (
      <View key={color} style={{ marginTop: index === 0 ? 0 : 56 }}>
        <ChoiceItem
          colorType={color}
          choosed={valueChoice1[index]}
          disabled={disabled}
          type={1}
          onValueChange={() => {
            const newValues = [...valueChoice1];
            newValues[index] = !newValues[index];
            setValueChoice1(newValues);
          }}
        />
      </View>
    ));

  const renderChoiceItem2 = () =>
    colors.map((color, index) => (
      <View key={color} style={{ marginTop: index === 0 ? 0 : 56 }}>
        <ChoiceItem
          colorType={color}
          choosed={valueChoice2[index]}
          disabled={disabled}
          type={2}
          onValueChange={() => {
            const newValues = [...valueChoice2];
            newValues[index] = !newValues[index];
            setValueChoice2(newValues);
          }}
        />
      </View>
    ));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.component}>
        <View style={styles.column}>{renderSwitch()}</View>
        <View style={styles.column}>{renderCheckBox()}</View>
        <View style={styles.column}>{renderChoiceItem1()}</View>
        <View style={styles.column}>{renderChoiceItem2()}</View>
      </View>

      <Text style={styles.header}>Switch - 开关组件</Text>
      <JestComponent component={Switch} propConfigs={propConfigs1} />

      <Text style={styles.header}>Checkbox - 复选框</Text>
      <JestComponent component={Checkbox} propConfigs={propConfigs2} />

      <Text style={styles.header}>ChoiceItem - 单选</Text>
      <JestComponent component={ChoiceItem} propConfigs={propConfigs3} />
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2,
  },
  component: {
    flexDirection: 'row',
    paddingHorizontal: 27
  },
  header: {
    fontSize: 24,
    color: colorToken.mj_color_gray_text_1,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  column: {
    marginRight: 27
  }
});

export default AtomicDemo;
