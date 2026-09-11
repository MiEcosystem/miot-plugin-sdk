'use strict';

import React, { useCallback, useEffect } from 'react';
import { Alert, ScrollView, Text } from 'react-native';
import { Description, colorToken, Fonts } from 'miot/ui/hyperOSUI';
import NavigationBar from 'miot/ui/NavigationBar';
import { dynamicStyleSheet } from 'miot/ui';

const DescriptionDemo = ({ navigation }) => {

  useEffect(() => {
    navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => navigation.navigate('DescriptionConfigDemo', { title: 'Description 配置调试' }),
        },
      ],
    });
  }, []);

  const handlePrivacyPress = useCallback(() => {
    Alert.alert('提示', '点击了隐私政策');
  }, []);

  const handleAgreementPress = useCallback(() => {
    Alert.alert('提示', '点击了用户协议');
  }, []);

  const handleFirstTest = useCallback(() => {
    Alert.alert('提示', '第一个测试');
  }, []);

  const handleSecondTest = useCallback(() => {
    Alert.alert('提示', '第二个测试');
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.sectionTitle}>单行描述：默认居中</Text>
      <Description desc="固件版本会定期自动更新" />

      <Text style={styles.sectionTitle}>多行描述：不居中</Text>
      <Description
        desc="这是一段较长的描述文本，用于展示多行内容。超过一行后文本会使用系统自然对齐方式，并保留描述文本的间距和颜色样式。"
      />

      <Text style={styles.sectionTitle}>高亮文案（可按压）</Text>
      <Description
        desc="开启后将自动更新，详情请查看[1隐私政策]和[2用户协议]"
        highlights={[
          { onPress: handlePrivacyPress },
          { onPress: handleAgreementPress },
        ]}
        bracketType="[]"
      />

      <Text style={styles.sectionTitle}>高亮文案：蓝色主题</Text>
      <Description
        desc="开启后将自动更新，详情请查看[1隐私政策]和[2用户协议]"
        highlights={[
          { onPress: handlePrivacyPress },
          { onPress: handleAgreementPress },
        ]}
        bracketType="[]"
        colorType="blue"
      />

      <Text style={styles.sectionTitle}>禁用态</Text>
      <Description
        desc="开启后将自动更新，详情请查看[1隐私政策]和[2用户协议]"
        highlights={[
          { onPress: handlePrivacyPress },
          { onPress: handleAgreementPress },
        ]}
        bracketType="[]"
        disabled
      />

      <Text style={styles.sectionTitle}>相同文案不同按压</Text>
      <Description
        desc="[1测试]一下能力，[2测试]一下整体功能"
        highlights={[
          { onPress: handleFirstTest },
          { onPress: handleSecondTest },
        ]}
        bracketType="[]"
      />

      <Text style={styles.sectionTitle}>ListCard footer 兼容场景</Text>
      <Text style={styles.note}>ListCard.footer 内部使用 Description 渲染，已有 footer 调用方式无需修改。</Text>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    ...Fonts.fontSystem13Regular,
    color: colorToken.contentTertiaryNormal,
    marginTop: 20,
    marginBottom: 8,
  },
  note: {
    ...Fonts.fontSystem13Regular,
    color: colorToken.contentTertiaryNormal,
  },
});

export default DescriptionDemo;
