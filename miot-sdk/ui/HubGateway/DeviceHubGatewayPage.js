'use strict';
import Host from 'miot/Host';
import CardButton from 'miot/ui/CardButton';
import TitleBar from 'miot/ui/TitleBar';
import { ContainerWithGap } from 'miot/ui';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { strings, Styles } from '../../resources';
import { ListItem, ListItemWithSwitch } from '../ListItem';
import Separator from '../Separator';
import { dynamicStyleSheet } from '../Style/DynamicStyleSheet';
import DynamicColor from '../Style/DynamicColor';
import { getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
/**
 * @export
 * @author lipeng
 * @since 10085
 * @module HubGatewayMainPage
 * @description 中枢网关功能主页面
 * @property {array} secondOptions -
 */
export default class DeviceHubGatewayPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type="dark"
          title={'中枢功能'}
          style={{ backgroundColor: '#F5F5F5' }}
          onPressLeft={() => navigation.goBack()}
        />
    };
  };
  constructor(props, context) {
    super(props, context);
    referenceReport('DeviceHubGatewayPage');
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{
          width: '100%'
        }} contentContainerStyle={{
          width: '100%',
          alignItems: 'center'
        }}>
          <ContainerWithGap gap={12} containerStyle={{
            width: '100%',
            paddingHorizontal: 12,
            paddingVertical: 12
          }}>
            <CardButton
              title="自动化极客版"
              subtitle="中枢功能内容待开发"
              rightArrow={true}
            />
            <CardButton
              title="使用帮助"
              icon={require('../../resources/images/blank_page_icon.png')}
              rightArrow={true}
            />
            <CardButton
              title="中枢固件升级"
              icon={require('../../resources/images/blank_page_icon.png')}
              rightArrow={true}
            />
          </ContainerWithGap>
        </ScrollView>
      </View>
    );
  }
}
const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  textStyle: {
    width: 300,
    fontSize: 20,
    backgroundColor: 'red',
    textAlign: 'center',
    alignItems: 'center'
  }
});