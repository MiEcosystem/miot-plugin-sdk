import React, { Children } from 'react';
import { 
  View,
  Image,
  Text,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import DynamicColor, { dynamicColor } from '../Style/DynamicColor';
// import { Styles as CommonStyle } from '../../resources';
import { adjustSize } from '../../utils/sizes';
import { FontMiSansWLight } from '../../utils/fonts';
import native, { isIOS } from '../../native';
const BigTitleGap = adjustSize(30);
export default function ScrollViewWithHeader({ 
  bigIcon,
  bigTitle,
  subtitle,
  bigGapStyle,
  type,
  children,
  contentStyle,
  containerStyle
}) {
  const filteredChildren = Children.toArray(children).filter((child) => !!child);
  const onLayoutBigNavigation = () => {
    // const { layout } = e.nativeEvent;
    // const { eventKey } = this.props;
    // adjustSize(30): bigTitle 的lineHight - fontSize
    // DeviceEventEmitter.emit(`${ eventKey }${ APP_BIGTITLEBAR_ONLAYOUT }`, { bigTitleBarHeight: layout.height - BigTitleGap - adjustSize(30) });
  };
  const isDarkType = type === 'dark';
  const bigTitleColor = isDarkType ? dynamicColor('rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)') : dynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)');
  const bigSubTitleColor = isDarkType ? dynamicColor('rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.6)') : dynamicColor('rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0.6)');
  return (
    <ScrollView style={[styles.container, containerStyle]} contentContainerStyle={[styles.contentInner, contentStyle]}>
      <View
        style={styles.bigTitleContainer}
        onLayout={onLayoutBigNavigation}
      >
        {bigIcon ?
          <Image
            source={bigIcon}
            style={styles.imageStyle}
            resizeMode="contain"
          /> :
          null
        }
        <Text
          numberOfLines={2}
          style={[styles.bigTitleText, { color: bigTitleColor }]}
        >
          {bigTitle}
        </Text>
        {subtitle ? <Text
          numberOfLines={2}
          style={[styles.bigSubtitleText, { color: bigSubTitleColor }]}
        >
          {subtitle}
        </Text> :
          null
        }
        <View
          style={[styles.bigTitleGap, bigGapStyle]}
        >
        </View>
      </View>
      {filteredChildren}
    </ScrollView>
  );
}
ScrollViewWithHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  bigIcon: PropTypes.any,
  bigTitle: PropTypes.string,
  subtitle: PropTypes.string,
  bigGapStyle: PropTypes.object,
  type: PropTypes.string,
  contentStyle: PropTypes.object,
  containerStyle: PropTypes.object
};
const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicColor('#FFF', '#000')
  },
  contentInner: {
    paddingBottom: isIOS && native.MIOTHost.isIphoneXSeries ? 34 : adjustSize(30)
  },
  bigSubtitleText: {
    lineHeight: 20,
    fontSize: 14,
    marginHorizontal: adjustSize(84),
    textAlign: 'left',
    fontFamily: FontMiSansWLight
  },
  bigTitleText: {
    lineHeight: 40,
    fontSize: 30,
    marginHorizontal: adjustSize(75),
    textAlign: 'left',
    fontFamily: FontMiSansWLight
  },
  imageStyle: {
    width: adjustSize(360),
    height: adjustSize(360),
    alignItems: 'center',
    marginLeft: adjustSize(30)
  },
  bigTitleContainer: {
    paddingTop: adjustSize(24),
    flexDirection: 'column'
  },
  bigTitleGap: {
    height: BigTitleGap
  }
});