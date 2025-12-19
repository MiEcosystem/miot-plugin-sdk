import React, { useCallback, useContext, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { IotListItem, ConfigContext } from 'miot/ui/hyperOSUI';
import { CarInUsed } from 'miot/ui/icons';
import { Service } from 'miot';
import { strings } from '../../resources';
export function SmartSceneCard() {
  const { colorToken } = useContext(ConfigContext);
  const toSmartScene = useCallback(() => {
    Service.scene.openIftttAutoPage();
  }, []);
  const title = useMemo(() => {
    return strings.smart_scene;
  }, []);
  return (
    <View style={styles.container}>
      <IotListItem leftIcon={<CarInUsed fill={colorToken.mj_color_gray_icon_1}/>} title={title} onPress={toSmartScene}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden'
  }
});