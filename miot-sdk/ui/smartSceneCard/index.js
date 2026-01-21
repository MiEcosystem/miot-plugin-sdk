import React, { useCallback, useContext, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { IotListItem, ConfigContext } from 'miot/ui/hyperOSUI';
import { SmartScene } from 'miot/ui/icons';
import { Service } from 'miot';
import { strings } from '../../resources';
export function SmartSceneCard() {
  const { colorToken } = useContext(ConfigContext);
  const toSmartScene = useCallback(() => {
    Service.scene.openIftttAutoPage();
  }, []);
  const title = useMemo(() => {
    return strings.ifttt;
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: colorToken.mj_color_gray_card_1 }]}>
      <IotListItem leftIconSource={<SmartScene fill={colorToken.mj_color_gray_icon_1}/>} leftIconType="svg" leftIconSize="small" title={title} onPress={toSmartScene}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden'
  }
});