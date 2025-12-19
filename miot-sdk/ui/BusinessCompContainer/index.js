import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { adjustSize } from '../../utils/sizes';
import Host from '../../Host';
const isIos = Platform.OS === 'ios';
export const BusinessCompContainer = ({
  backgroundComponent,
  containerStyle,
  children
}) => {
  const [height, setHeight] = useState('100%');
  const refContent = useRef(null);
  const onLayout = useCallback((e) => {
    setHeight(e.nativeEvent.layout.height);
  }, []);
  return (
    <>
     {backgroundComponent}
      <ScrollView
        ref={refContent}
        style={[Styles.container, containerStyle]}
        alwaysBounceVertical={false}
        contentContainerStyle={[Styles.contentInner, {
          minHeight: height
        }]}
        showsVerticalScrollIndicator={false}
        onLayout={onLayout}
        automaticallyAdjustContentInsets={false}
      >
        {children}
      </ScrollView>
    </>
  );
};
BusinessCompContainer.propTypes = {
  navigatorParams: PropTypes.any,
  backgroundComponent: PropTypes.node,
  containerStyle: PropTypes.any,
  contentStyle: PropTypes.any
};
const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentInner: {
    paddingBottom: isIos ? Host.safeAreaInsets.bottom : adjustSize(30)
  }
});