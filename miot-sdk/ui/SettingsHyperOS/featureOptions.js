import React from 'react';
import Device from '../../device/BasicDevice';
import Host from '../../Host';
import { strings as I18n } from '../../resources';
import { formatString } from '../../resources/Strings';
import useMultiKeySplitInfo from '../../hooks/useMultiKeySplitInfo';
import useMemberSetInfo from '../../hooks/useMemberSetInfo';
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
import { ListItem, ListItemWithWidget } from '../hyperOSUI';
import { useClicked } from './getItems';
const innerOptions = {
  memberSet: {
    exportKey: 'MEMBER_SET',
    isDefault: true,
    ownerOnly: false,
    homeManagerAllowed: true,
    modelTypes: [
      'switch',
      'relay',
      'control-panel',
      'controller',
    ],
    Component: (params) => {
      const { showDots = [] } = params;
      const { showMemberSetKey, isSingleSwitch } = useMemberSetInfo();
      const { permitLevel } = useDeviceRoomInfo();
      const isHomeManager = permitLevel === 9;
      const { isOwner } = Device;
      const disabled = !isOwner && !isHomeManager;
      const [clicked, click] = useClicked('memberSet');
      if (!showMemberSetKey && !isSingleSwitch) {
        return null;
      }
      return (
        <ListItem
          key={'memberSet'}
          title={I18n.memberSet}
          actionType="navigate"
          badge={showDots.includes('memberSet') && !clicked}
          onPress={disabled ? undefined : () => {
            click();
            const { deviceID, mac } = Device;
            Host.ui.openPowerMultikeyPage(deviceID, mac);
          }}
          disabled={disabled}
        />
      );
    },
  },
  multipleKeySplit: {
    exportKey: 'MULTIPLEKEY_SPLIT',
    isDefault: true,
    ownerOnly: false,
    homeManagerAllowed: true,
    modelTypes: [
      'switch',
      'relay',
      'control-panel',
      'controller',
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
        <ListItemWithWidget
          key={'multipleKeySplit'}
          widgetType="switch"
          title={formatString(I18n.multipleKeyShowOnHome, count)}
          checked={!!split}
          disabled={disabled}
          onChange={(v) => {
            setSplit(v);
          }}
        />
      );
    },
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
    },
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
    },
  },
  btGateway: {
    exportKey: 'BTGATEWAY',
    isDefault: true,
    ownerOnly: true,
    validator: () => {
      return Device.deviceConfigInfo?.bt_gateway !== 0 && Device.deviceConfigInfo?.mesh_gateway !== 1;
    },
    title: () => I18n.btGateway,
    onPress: () => {
      Host.ui.openBtGatewayPage();
    },
  },
  bleMeshGateway: {
    exportKey: 'BTMESHGATEWAY',
    isDefault: true,
    ownerOnly: true,
    validator: () => {
      return Device.deviceConfigInfo?.mesh_gateway === 1;
    },
    title: () => I18n.bleMeshGateway,
    onPress: () => {
      Host.ui.openBtGatewayPage();
    },
  },
  voiceAuth: {
    exportKey: 'VOICE_AUTH',
    ownerOnly: true,
    validator: () => !!Device.isVoiceDevice,
    title: () => I18n.voiceAuth,
    onPress: () => {
      Host.ui.openVoiceCtrlDeviceAuthPage();
    },
  },
};
export default innerOptions;
export const featureOptions = ['memberSet', 'createGroup', 'manageGroup', 'btGateway', 'bleMeshGateway', 'voiceAuth', 'multipleKeySplit'];