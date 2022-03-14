import React from 'react';
import { ScrollView, Text } from 'react-native';
import native, { isIOS } from '../../native';
import { dynamicStyleSheet } from '../Style/DynamicStyleSheet';
import DynamicColor from '../Style/DynamicColor';
import { adjustSize } from '../../utils/sizes';
import { FontDefault } from '../../utils/fonts';
import NavigationBar from '../NavigationBar';
import { DialogComponent } from '../../utils/dialog-manager';
export default function DynamicPage({ navigation }) {
  const title = navigation.getParam('title', '');
  const content = navigation.getParam('content', '');
  const dialogCustomKey = navigation.getParam('dialogCustomKey', '');
  return (
    <ScrollView style={Styles.container} contentContainerStyle={Styles.contentInner}>
      <Text style={Styles.pageTitle}>{title}</Text>
      {content}
      <DialogComponent customKey={dialogCustomKey} />
    </ScrollView>
  );
}
DynamicPage.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <NavigationBar
        type={NavigationBar.TYPE.LIGHT}
        title={''}
        left={[{
          key: NavigationBar.ICON.BACK,
          onPress: () => {
            navigation.goBack();
          }
        }]}
      />
    )
  };
};
const Styles = dynamicStyleSheet({
  container: {
    backgroundColor: new DynamicColor('#fff', '#000')
  },
  contentInner: {
    paddingBottom: isIOS && native.MIOTHost.isIphoneXSeries ? 34 : adjustSize(30)
  },
  flex: {
    flex: 1
  },
  pageTitle: {
    fontFamily: FontDefault,
    fontSize: 30,
    lineHeight: 40,
    marginHorizontal: adjustSize(75),
    color: new DynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)')
  }
});