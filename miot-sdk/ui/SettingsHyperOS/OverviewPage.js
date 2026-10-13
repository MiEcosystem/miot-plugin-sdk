import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import Device from '../../device/BasicDevice';
import native from '../../native';
import { strings as I18n } from '../../resources';
import useDeviceIcon from '../../hooks/useDeviceIcon';
import usePluginVersion from '../../hooks/usePluginVersion';
import useTimezone from '../../hooks/useTimezone';
import useHardwareVersion from '../../hooks/useHardwareVersion';
import { specPluginNamesModels } from '../../utils/special-plugins';
import {
  SubpageLayout, NavigationBar, ListCard, ConfigContext,
} from '../hyperOSUI';
import getItems from './getItems';
import innerOptions, {
  basicOptions, netOptions, versionOptions, hardwareOptions, restOptions,
} from './overviewOptions';
const defaultOptions = basicOptions.concat(netOptions, versionOptions, hardwareOptions, restOptions);
function Card({ keys, values, params }) {
  const items = getItems(innerOptions, keys, values, params, defaultOptions)
    .filter((item) => item !== null);
  if (!items.length) {
    return null;
  }
  return (
    <ListCard>
      {items}
    </ListCard>
  );
}
Card.propTypes = {
  // 自定义项可以是字符串 key、函数、元素或配置对象
  keys: PropTypes.array,
  values: PropTypes.array,
  params: PropTypes.object,
};
function DeviceHeader() {
  const iconURL = useDeviceIcon();
  return (
    <View style={styles.header}>
      {iconURL ? (
        <Image style={styles.icon} source={{ uri: iconURL }} />
      ) : null}
    </View>
  );
}
export default function OverviewPage({ navigation }) {
  const rawParams = navigation.getParam('params', {});
  const params = { ...rawParams, navigation };
  const specifiedModel = specPluginNamesModels[native.MIOTPackage.packageName] || '';
  const pluginVersion = usePluginVersion([Device.model], specifiedModel);
  const timezone = useTimezone();
  const hardwareVersion = useHardwareVersion();
  const { colorToken } = useContext(ConfigContext);
  return (
    <View style={styles.root}>
      <SubpageLayout>
        <SubpageLayout.Background>
          <View style={[styles.bg, { backgroundColor: colorToken.surfacePageLow }]} />
        </SubpageLayout.Background>
        <SubpageLayout.Navigation>
          <NavigationBar
            title={I18n.moreDeviceInfo}
            backgroundColor={colorToken.surfacePageLow}
            left={{ key: NavigationBar.ICON.BACK, onPress: () => navigation.goBack() }}
          />
        </SubpageLayout.Navigation>
        <SubpageLayout.Header>
          <DeviceHeader />
        </SubpageLayout.Header>
        <SubpageLayout.Content>
          <Card keys={basicOptions} values={[]} params={params} />
          <Card keys={netOptions} values={[]} params={params} />
          <Card keys={versionOptions} values={[pluginVersion, timezone]} params={params} />
          <Card
            keys={hardwareOptions}
            values={[undefined, undefined, hardwareVersion?.mcu, hardwareVersion?.sdk]}
            params={params}
          />
          <Card keys={params.customOptions || []} values={[]} params={params} />
          <Card keys={restOptions} values={[]} params={params} />
        </SubpageLayout.Content>
      </SubpageLayout>
    </View>
  );
}
OverviewPage.propTypes = {};
// 页面自绘 NavigationBar，声明 header: null 避免插件自建 navigator 再叠一层导航栏
OverviewPage.navigationOptions = { header: null };
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  icon: {
    width: 84,
    height: 84,
  },
});