import React, { useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import { Fonts, colorToken, TouchableView } from 'mhui-rn/dist/hyperOS';
import { Host } from 'miot';
import { getLocalI18n } from '../SwitchIfttt/utils';
import { dynamicStyleSheet } from '../Style';
export function BrandComponent(props) {
  const { brandId, brandName } = props;
  const onHandlePress = useCallback(() => {
    if (!brandId) return;
    Host.ui.openWebPage(`https://home.mi.com/webapp/product/brand/index.html?id=${ brandId }&fullscreen=1`);
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
    paddingVertical: 28
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colorToken.mj_color_gray_card_3,
    borderRadius: 18,
    height: 36,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  text: {
    lineHeight: 17,
    color: colorToken.mj_color_gray_text_5,
    ...Fonts.mj_text_custom_13_M
  }
});