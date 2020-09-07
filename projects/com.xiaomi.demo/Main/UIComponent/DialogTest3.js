import { Component } from 'react';

import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ColorPicker } from 'miot/ui/ColorPicker';

function DialogTest3() {
  const colorPicker = useRef(null);
  return (
    <ColorPicker
      ref={colorPicker}
      type="white"
      style={styles.colorPicker}
      onInit={() => {
        console.log('color picker initialized');
          colorPicker.current?.setColor('#f2e3b7');
      }}
      onColorChange={(color) => {
        if (__DEV__ && console.warn) {
          console.warn('color:', color);
        }
      }}
    />
  );
}

DialogTest3.defaultProps = {
};

DialogTest3.propTypes = {
};

export default DialogTest3;


const styles = StyleSheet.create({
  appbar: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15
  },
  appbarTitle: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold'
  },
  colorPicker: {
    aspectRatio: 1
  },
  brightnessRoot: {
    height: 60,
    marginTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  brightnessIcon: {
    height: '50%',
    aspectRatio: 1
  },
  brightnessSlider: {
    flex: 1,
    marginHorizontal: 15
  },
  brightnessValue: {
    width: 40,
    fontSize: 20,
    color: '#606060',
    textAlign: 'center'
  }
});