import React from 'react';
import { Host, Package, Device } from 'miot';
import { strings as I18n } from '../../resources';
import { formatString } from '../../resources/Strings';
import Section from './Section';
import ListItemWithSwitch from '../ListItem/ListItemWithSwitch';
import ConfiguredItems from './ConfiguredItems';
import getItems, { getAllAndDefaultOptions, itemPropTypes } from './getItems';
import useGatewayStatus, { State as GatewayStatus } from '../../hooks/useGatewayStatus';
import useMultiKeySplitInfo from '../../hooks/useMultiKeySplitInfo';
import { specPluginNames } from '../../utils/special-plugins';
const innerOptions = {
  // 按键设置
  memberSet: {
    exportKey: 'MEMBER_SET',
    isDefault: true,
    ownerOnly: true,
    modelTypes: ['switch'],
    title: I18n.memberSet,
    onPress: () => {
      const { packageName } = Package;
      const { deviceID, mac } = Device;
      if (specPluginNames.includes(packageName)) {
        Host.ui.openPowerMultikeyPage(deviceID, mac, {
          useNewSetting: true,
          done: []
        });
      } else {
        Host.ui.openPowerMultikeyPage(deviceID, mac);
      }
    }
  },
  // 多键拆分
  MultipleKeySwitch: {
    exportKey: 'MULTIPLEKEY_SWITCH',
    isDefault: true,
    ownerOnly: true,
    modelTypes: ['switch'],
    Component: () => {
      const [info, setSplit] = useMultiKeySplitInfo();
      const { count, split } = info || {};
      if (!count) {
        return null;
      }
      return (
        <ListItemWithSwitch
          key={'MultipleKeySwitch'}
          title={formatString(I18n.multipleKeyShowOnHome, count)}
          value={split}
          onValueChange={(v) => {
            setSplit(v);
          }}
          useNewType={true}
        />
      );
    }
  },
  createGroup: {
    exportKey: 'CREATE_GROUP',
    isDefault: true,
    ownerOnly: true,
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
    ownerOnly: true,
    types: ['6', '8'],
    title: I18n.btGateway,
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
const deviceTypeOptions = ['memberSet', 'createGroup', 'manageGroup', 'btGateway', 'voiceAuth', 'MultipleKeySwitch'];
// 品类固定功能
function DeviceTypeItems({ params }) {
  return getItems(innerOptions, deviceTypeOptions, ['', '', '', ({
    [GatewayStatus.IDLE]: I18n.notConnected,
    [GatewayStatus.MESH]: I18n.connected
  })[useGatewayStatus()]], params, defaultOptions);
}
DeviceTypeItems.propTypes = itemPropTypes;
export default function FeatureSettings({ children, ...params }) {
  return (
    <Section title={I18n.featureSetting}>
      <ConfiguredItems params={params} />
      {children}
      <DeviceTypeItems params={params} />
    </Section>
  );
}
FeatureSettings.propTypes = {};