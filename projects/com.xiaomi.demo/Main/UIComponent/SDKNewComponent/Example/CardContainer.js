import React, { memo, useContext } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { ConfigContext } from 'miot/ui/hyperOSUI';
export const CardContainer = memo((props) => {
  const { colorToken } = useContext(ConfigContext);

  return (
    <View style={[styles.container, { backgroundColor: colorToken.mj_color_gray_card_1 }, props.style]}>
      {props.children}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden'
  }
});
