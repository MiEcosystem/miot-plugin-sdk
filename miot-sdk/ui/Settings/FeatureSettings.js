import React from 'react';
import { Host, Package, Device } from 'miot';
import { strings as I18n } from '../../resources';
import { formatString } from '../../resources/Strings';
import Section from './Section';
import ListItemWithSwitch from '../ListItem/ListItemWithSwitch';
import ConfiguredItems from './ConfiguredItems';
import getItems, { getAllAndDefaultOptions, itemPropTypes } from './getItems';
import useMultiKeySplitInfo from '../../hooks/useMultiKeySplitInfo';
import useMemberSetInfo from '../../hooks/useMemberSetInfo';
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
import ListItem from '../ListItem/ListItem';
import { reportSettingClick } from "./reportSettingPageUtils";
const innerOptions = {
  // 按键设置
  memberSet: {
    exportKey: 'MEMBER_SET',
    isDefault: true,
    ownerOnly: false,
    homeManagerAllowed: true,
    modelTypes: [
      'switch',
      'relay',
      'control-panel',
      'controller'
    ],
    Component: () => {
      // bool值，决定是否显示 按键设置, 10074单键开关也需要展示按键设置
      const { showMemberSetKey, isSingleSwitch } = useMemberSetInfo();
      const { permitLevel } = useDeviceRoomInfo();
      const isHomeManager = permitLevel === 9;
      const { isOwner } = Device;
      const disabled = !isOwner && !isHomeManager;
      console.log('MEMBER_SET', disabled, isHomeManager, isOwner);
      const onPress = () => {
        const { deviceID, mac } = Device;
        Host.ui.openPowerMultikeyPage(deviceID, mac);
      };
      return (showMemberSetKey || isSingleSwitch) ? (
        <ListItem
          key={'memberSet'}
          title={I18n.memberSet}
          value=""
          onPress={onPress}
          useNewType={true}
          hideArrow={false}
          disabled={disabled}
        />
      ) : null;
    }
  },
  // 多键拆分
  multipleKeySplit: {
    exportKey: 'MULTIPLEKEY_SPLIT',
    isDefault: true,
    ownerOnly: false,
    homeManagerAllowed: true,
    modelTypes: [
      'switch',
      'relay',
      'control-panel',
      'controller'
    ],
    Component: () => {
      const [info, setSplit] = useMultiKeySplitInfo();
      const { count, split } = info || {};
      const { permitLevel } = useDeviceRoomInfo();
      const isHomeManager = permitLevel === 9;
      const { isOwner } = Device;
      const disabled = !isOwner && !isHomeManager;
      if (!count || count <= 1) {
        return null;
      }
      return (
        <ListItemWithSwitch
          key={'multipleKeySplit'}
          title={formatString(I18n.multipleKeyShowOnHome, count)}
          value={split}
          onValueChange={(v) => {
            reportSettingClick({
              card_name: 'function_setting',
              item_type: 'button',
              item_name: 'homepage_display_form',
              item_content: v ? 'on' : 'off'
            });
            setSplit(v);
          }}
          useNewType={true}
          disabled={disabled}
        />
      );
    }
  },
  createGroup: {
    exportKey: 'CREATE_GROUP',
    isDefault: true,
    ownerOnly: false,
    homeManagerAllowed: true,
    notTypes: ['6', '17'],
    modelTypes: ['light'],
    title: ({ modelType = '' }) => {
      if (!modelType) {
        return '';
      }
      return I18n[`create${ modelType[0].toUpperCase() }${ modelType.slice(1) }Group`];
    },
    onPress: () => {
      Host.ui.openMeshDeviceGroupPage('add', Device.deviceID, 2);
    }
  },
  manageGroup: {
    exportKey: 'MANAGE_GROUP',
    isDefault: true,
    ownerOnly: true,
    types: ['17'],
    modelTypes: ['light'],
    title: ({ modelType = '' }) => {
      return I18n[`manage${ modelType[0].toUpperCase() }${ modelType.slice(1) }Group`];
    },
    onPress: () => {
      Host.ui.openMeshDeviceGroupPage('edit', Device.deviceID, 2);
    }
  },
  btGateway: {
    exportKey: 'BTGATEWAY',
    isDefault: true,
    ownerOnly: true,
    validator: () => {
      // 0：不支持，1：支持 2：白名单
      return Device.deviceConfigInfo?.bt_gateway !== 0 && Device.deviceConfigInfo?.mesh_gateway !== 1;
    },
    title: I18n.btGateway,
    onPress: () => {
      Host.ui.openBtGatewayPage();
    }
  },
  bleMeshGateway: {
    exportKey: 'BTMESHGATEWAY',
    isDefault: true,
    ownerOnly: true,
    validator: () => {
      return Device.deviceConfigInfo?.mesh_gateway === 1;
    },
    title: I18n.bleMeshGateway,
    onPress: () => {
      Host.ui.openBtGatewayPage();
    }
  },
  voiceAuth: {
    exportKey: 'VOICE_AUTH',
    ownerOnly: true,
    validator: () => !!Device.isVoiceDevice,
    title: I18n.voiceAuth,
    onPress: () => {
      Host.ui.openVoiceCtrlDeviceAuthPage();
    }
  }
};
const AllAndDefaultOptions = getAllAndDefaultOptions(innerOptions);
export const options = AllAndDefaultOptions.options;
const defaultOptions = AllAndDefaultOptions.defaultOptions;
const deviceTypeOptions = ['memberSet', 'createGroup', 'manageGroup', 'btGateway', 'bleMeshGateway', 'voiceAuth', 'multipleKeySplit'];
// 品类固定功能
function DeviceTypeItems({ params }) {
  return getItems(innerOptions, deviceTypeOptions, ['', '', '', '', ''], params, defaultOptions);
}
DeviceTypeItems.propTypes = itemPropTypes;
export default function FeatureSettings({ children, ...params }) {
  const { extraOptions } = params;
  const hideHeaderBasicInfo = extraOptions?.hideHeaderBasicInfo;
  return (
    <Section title={I18n.featureSetting} showSeparator={!hideHeaderBasicInfo}>
      <ConfiguredItems params={params} />
      {children}
      <DeviceTypeItems params={params} />
    </Section>
  );
}
FeatureSettings.propTypes = {};