'use strict';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ToastView, colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

const ToastConfigDemo = () => {
  const [visible, setVisible] = useState(false);
  const [animation, setAnimation] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setAnimation(false);
            setVisible(true);
            setTimeout(() => setVisible(false), 2000);
          }}
        >
          <Text style={styles.buttonText}>显示 Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setAnimation(true);
            setVisible(true);
            setTimeout(() => setVisible(false), 3000);
          }}
        >
          <Text style={styles.buttonText}>显示 Loading Toast</Text>
        </TouchableOpacity>
      </View>
      <ToastView visible={visible} text="这是一条提示消息" animation={animation} />
    </View>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  button: {
    marginHorizontal: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colorToken.fillSecondary,
    borderRadius: 12,
  },
  buttonText: {
    color: colorToken.contentPrimaryNormal,
    fontSize: 14,
  },
});

export default ToastConfigDemo;
