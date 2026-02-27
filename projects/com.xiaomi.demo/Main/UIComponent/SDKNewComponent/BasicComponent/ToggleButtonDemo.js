'use strict';
import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { colorToken } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";
import { ToggleButton } from "miot/ui/hyperOSUI";
import { NearHandDialog } from "miot/ui/hyperOSUI";
import { Cold } from "mhui-rn/dist/icons";

const ToggleButtonDemo = () => {
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const dialogRef = useRef(null);
  const handlePress1 = () => {
  dialogRef.current?.showFrom(button1Ref.current?.ref);
  };

  const handlePress2 = () => {
   dialogRef.current?.showFrom(button2Ref.current?.ref);
  };

  const dialogData = [
    {
      id: '1',
      title: '制冷模式',
      subtitle: '快速降低室内温度',
      onPressItem: () => console.log('选择了制冷模式')
    },
    {
      id: '2',
      title: '节能模式',
      subtitle: '平衡制冷效果与能耗',
      onPressItem: () => console.log('选择了节能模式')
    },
    {
      id: '3',
      title: '静音模式',
      subtitle: '降低运行噪音',
      onPressItem: () => console.log('选择了静音模式')
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ToggleButton
        ref={button1Ref}
        data={{ icon: <Cold width={16} height={16} />, title: "降温降温降温降温降温降温降温降温" }}
        onPress={handlePress1}
      />
      <View style={{ marginTop: 10 }}></View>
      <ToggleButton
        ref={button2Ref}
        data={{ icon: <Cold width={16} height={16} />, title: "降温" }}
        onPress={handlePress2}
      />
      <NearHandDialog
        ref={dialogRef}
        data={dialogData}
        onDismiss={() => console.log('对话框已关闭')}
      />
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    padding: 20,
    backgroundColor: colorToken.mj_color_gray_bg_2
  }
});

export default ToggleButtonDemo;
