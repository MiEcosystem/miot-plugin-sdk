import React, { useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import { Fonts, colorToken, TouchableView } from 'mhui-rn/dist/hyperOS';
import { Host } from 'miot';
import { getLocalI18n } from '../SwitchIfttt/utils';
import { dynamicStyleSheet } from '../Style';
import { miHomeUrl } from '../../utils/miHomeBrandEnv';
export function BrandComponent(props) {
  const { brandId, brandName } = props;
  const onHandlePress = useCallback(() => {
    if (!brandId) return;
    Host.ui.openWebPage(`${ miHomeUrl }/webapp/product/brand/index.html?id=${ brandId }&fullscreen=1`);
  }, [brandId]);
  const brandString = useMemo(() => {
    return getLocalI18n('common_brand_produced_by', [brandName]);
  }, [brandName]);
  if (!brandName) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TouchableView viewStyle={styles.button} onPress={onHandlePress}>
        <Text style={styles.text}>
          {brandString}
        </Text>
      </TouchableView>
    </View>);
}
const styles = dynamicStyleSheet({
  container: {
    paddingVertical: 28,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colorToken.surfaceCardSubtle,
    borderRadius: 18,
    height: 36,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    lineHeight: 16,
    color: colorToken.contentQuaternaryNormal,
    ...Fonts.fontSystem12Medium,
  },
});