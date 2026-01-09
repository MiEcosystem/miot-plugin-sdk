import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Fonts, colorToken } from 'mhui-rn/dist/hyperOS';
import { Host, Service, Device } from 'miot';
import { getLocalI18n } from '../SwitchIfttt/utils';
import { dynamicStyleSheet } from '../Style';
export function BrandProduced() {
  const [brandId, setBrandId] = useState();
  const [brandName, setBrandName] = useState('');
  useEffect(() => {
    Promise.all([
      Service.smarthome.getBrandInfos([Device.deviceConfigInfo.brand_id]),
      Service.getServerName()
    ]).then((res) => {
      const [brandRes, serverRes] = res;
      if (serverRes?.serverCode === 'cn' && brandRes?.brand_infos?.[`${ Device.deviceConfigInfo.brand_id }`]) {
        setBrandId(Device.deviceConfigInfo.brand_id);
        setBrandName(brandRes?.brand_infos?.[`${ Device.deviceConfigInfo.brand_id }`]?.brand_name);
      }
    });
  }, []);
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
      <TouchableOpacity style={styles.button} onPress={onHandlePress}>
        <Text style={styles.text}>
          {brandString}
        </Text>
      </TouchableOpacity>
    </View>);
}
const styles = dynamicStyleSheet({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 28,
    minHeight: 92
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colorToken.mj_color_gray_card_3,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  text: {
    fontSize: 13,
    lineHeight: 17,
    color: colorToken.mj_color_gray_text_5,
    ...Fonts.FontTextMedium
  }
});