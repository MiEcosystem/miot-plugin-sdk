import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import Device from '../../device/BasicDevice';
import Host from '../../Host';
import { strings as I18n } from '../../resources';
import useDeviceName from '../../hooks/useDeviceName';
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
import useDeviceIcon from '../../hooks/useDeviceIcon';
import { useGetBrandInfo } from '../brandProduced/useGetBrandInfo';
import { getLocalI18n } from '../SwitchIfttt/utils';
import {
  SubpageLayout, NavigationBar, ListCard, ListItem, SubtitleGroup, BlockButton,
  useCollapsibleTitle, ConfigContext,
} from '../hyperOSUI';
import getItems, { getAllAndDefaultOptions, itemPropTypes } from './getItems';
import featureInnerOptions, { featureOptions } from './featureOptions';
import commonInnerOptions, { commonOptions } from './commonOptions';
const featureAllAndDefault = getAllAndDefaultOptions(featureInnerOptions);
const commonAllAndDefault = getAllAndDefaultOptions(commonInnerOptions);
export const AllOptions = {
  ...featureAllAndDefault.options,
  ...commonAllAndDefault.options,
};
function DeviceEntrance({ params }) {
  const iconURL = useDeviceIcon();
  const name = useDeviceName();
  const roomInfo = useDeviceRoomInfo();
  const { brandName } = useGetBrandInfo();
  const subtitles = [
    roomInfo?.roomName,
    brandName ? getLocalI18n('common_brand_produced_by', [brandName]) : '',
  ].filter((text) => !!text);
  return (
    <ListCard>
      <ListItem
        title={name}
        subtitle={subtitles.length ? <SubtitleGroup subtitles={subtitles} /> : ''}
        leadingIcon={iconURL ? <Image style={styles.deviceIcon} source={{ uri: iconURL }} /> : undefined}
        actionType="navigate"
        onPress={() => {
          Host.ui.packageNavigate('DeviceInfoPageV2', { params });
        }}
      />
    </ListCard>
  );
}
DeviceEntrance.propTypes = itemPropTypes;
function Section({ title, innerOptions, keys, defaultOptions, params }) {
  const items = getItems(innerOptions, keys, [], params, defaultOptions)
    .filter((item) => item !== null);
  if (!items.length) {
    return null;
  }
  return (
    <ListCard title={title}>
      {items}
    </ListCard>
  );
}
Section.propTypes = {
  title: PropTypes.string,
  innerOptions: PropTypes.object,
  // 自定义项可以是字符串 key、函数、元素或配置对象
  keys: PropTypes.array,
  defaultOptions: PropTypes.arrayOf(PropTypes.string),
  params: PropTypes.object,
};
function DeleteButton({ deleteDeviceMessage }) {
  const { isOwner, model, type } = Device;
  const { permitLevel } = useDeviceRoomInfo();
  const isHomeManager = permitLevel === 9;
  const canDelete = isOwner || isHomeManager;
  const isFromCarRoom = Device.fromRoomIndex === 1 || Device.fromRoomIndex === 2;
  const isCloudDevice = Device.type === '14';
  if (!canDelete || (isFromCarRoom && !Device.isOKspace) || isCloudDevice) {
    return null;
  }
  let title = I18n.deleteDevice;
  if (type === '17') {
    const modelKey = (model || '').split('.')[1] || '';
    title = I18n[`delete${ modelKey.charAt(0).toUpperCase() }${ modelKey.slice(1) }Group`] || I18n.deleteDevice;
  }
  return (
    <View style={styles.deleteButton}>
      <BlockButton
        type="warning"
        title={title}
        onPress={() => {
          Host.ui.openDeleteDevice(deleteDeviceMessage);
        }}
      />
    </View>
  );
}
DeleteButton.propTypes = {
  deleteDeviceMessage: PropTypes.string,
};
export default function SettingsHyperOS({
  navigation,
  options,
  showDot,
  extraOptions,
  featureCustomOptions,
  deviceInfoCustomOptions,
  showDeleteButton = true,
}) {
  const title = I18n.setting;
  const { colorToken } = useContext(ConfigContext);
  const { scrollHandler, titleVisible, titleOpacity, LargeTitle } = useCollapsibleTitle({ title });
  // 平板下 useCollapsibleTitle 不提供折叠能力，LargeTitle 渲染为空且 titleVisible 恒为 false，
  // 必须退回静态标题，否则大标题与导航栏标题都不显示
  const titleProps = Host.isPad ? { titleSize: 'normal' } : {
    titleSize: 'large',
    collapseTitle: true,
    titleVisible,
    titleOpacity,
  };
  const params = {
    navigation,
    options,
    showDots: showDot,
    extraOptions,
  };
  const entranceParams = {
    options,
    customOptions: deviceInfoCustomOptions,
    showDots: showDot,
    extraOptions,
  };
  return (
    <View style={styles.root}>
      <SubpageLayout onScroll={scrollHandler}>
        <SubpageLayout.Background>
          <View style={[styles.bg, { backgroundColor: colorToken.surfacePageLow }]} />
        </SubpageLayout.Background>
        <SubpageLayout.Navigation>
          <NavigationBar
            title={title}
            {...titleProps}
            backgroundColor={colorToken.surfacePageLow}
            left={{ key: NavigationBar.ICON.BACK, onPress: () => navigation && navigation.goBack() }}
          />
        </SubpageLayout.Navigation>
        <SubpageLayout.Header>
          <LargeTitle />
        </SubpageLayout.Header>
        <SubpageLayout.Content>
          <DeviceEntrance params={entranceParams} />
          <Section
            title={I18n.featureSetting}
            innerOptions={featureInnerOptions}
            keys={[...featureOptions, ...(featureCustomOptions || [])]}
            defaultOptions={featureAllAndDefault.defaultOptions}
            params={params}
          />
          <Section
            title={I18n.commonSetting}
            innerOptions={commonInnerOptions}
            keys={commonOptions}
            defaultOptions={commonAllAndDefault.defaultOptions}
            params={params}
          />
          {showDeleteButton ? (
            <DeleteButton deleteDeviceMessage={extraOptions?.deleteDeviceMessage} />
          ) : null}
        </SubpageLayout.Content>
      </SubpageLayout>
    </View>
  );
}
SettingsHyperOS.propTypes = {
  navigation: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.string),
  showDot: PropTypes.arrayOf(PropTypes.string),
  extraOptions: PropTypes.object,
  // 自定义项可以是字符串 key、函数、元素或配置对象
  featureCustomOptions: PropTypes.array,
  deviceInfoCustomOptions: PropTypes.array,
  showDeleteButton: PropTypes.bool,
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  deviceIcon: {
    width: 46,
    height: 46,
    resizeMode: 'contain',
  },
  deleteButton: {
    // BlockButton 自带 maxWidth(296/336)控宽,此处不能再加 paddingHorizontal,
    // 否则叠上 SubpageLayout 的 12pt 外边距会把按钮压到设计宽度以下
    alignItems: 'center',
    paddingTop: 8,
  },
});