import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Fonts } from 'mhui-rn/dist/hyperOS';
import { dynamicColor } from '../Style/DynamicColor';
import { Host, Service, Device } from 'miot';
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
  if (!brandName) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onHandlePress}>
        <Text style={styles.text}>
          {brandName}出品
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
    backgroundColor: dynamicColor('rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.12)'),
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
    color: dynamicColor('rgba(0, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.3)'),
    ...Fonts.FontTextMedium
  }
});