import React, { useState, useEffect } from 'react';
import { Clipboard } from 'react-native';
import Device from '../../device/BasicDevice';
import Host from '../../Host';
import Spec from '../../service/spec';
import { strings as I18n } from '../../resources';
import useDeviceName from '../../hooks/useDeviceName';
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
import useBaikeUrl from '../../hooks/useBaikeUrl';
import useWifiStatus from '../../hooks/useWifiStatus';
import useBleConnection, { State as BleConnectionStatus } from '../../hooks/useBleConnection';
import useGatewayStatus, { State as GatewayStatus } from '../../hooks/useGatewayStatus';
import useMemberSetInfo from '../../hooks/useMemberSetInfo';
import useThrottledPress from '../../hooks/useThrottledPress';
import useCariotDevice from '../../hooks/useCariotDevice';
import useModelType from '../../hooks/useModelType';
import { MIOTEventEmitter } from '../../native';
import specifyComponent from '../../utils/specify-component';
import { ListItem, MessageDialog, showToast } from '../hyperOSUI';
import { delegatePress } from './getItems';
const IconModelType = {
  'outlet': 2,
  'light': 1,
};
const innerOptions = {
  name: {
    exportKey: 'NAME',
    isDefault: true,
    ownerOnly: false,
    homeManagerAllowed: true,
    Component: () => {
      const showEditName = !useMemberSetInfo().isSingleSwitch;
      const deviceName = useDeviceName();
      const { permitLevel } = useDeviceRoomInfo();
      const isHomeManager = permitLevel === 9;
      const { isOwner } = Device;
      const disabled = !isOwner && !isHomeManager;
      const onPress = useThrottledPress(() => {
        Host.ui.openChangeDeviceName();
      });
      if (!showEditName) {
        return null;
      }
      return (
        <ListItem
          key={'name'}
          title={I18n.name}
          value={deviceName}
          actionType={Device.isWearableDevice ? 'none' : 'navigate'}
          onPress={Device.isWearableDevice || disabled ? undefined : onPress}
          disabled={disabled}
        />
      );
    },
  },
  changeIcon: {
    exportKey: 'CHANGE_ICON',
    ownerOnly: true,
    homeManagerAllowed: true,
    isDefault: true,
    modelTypes: [
      'outlet',
      'light',
    ],
    Component: () => {
      const modelType = useModelType();
      const isLightGroup = [
        'mijia.light.group1',
        'mijia.light.group2',
        'mijia.light.group3',
        'mijia.light.group4',
        'mijia.light.group5',
      ].includes(Device.model);
      const onPress = () => {
        Host.ui.openChangeDeviceIconDialog({ plugin_type: IconModelType[modelType] })
          .then((res) => {
            if (res && res.data) {
              const { subclass_id, proxy_category_icon } = res.data;
              MIOTEventEmitter.emit("deviceIconChanged", {
                did: Device.deviceID,
                subclass_id,
                proxy_category_icon,
              });
            }
          });
      };
      if (modelType === 'light' && !isLightGroup) {
        return null;
      }
      return (
        <ListItem
          key={'changeIcon'}
          title={I18n.changeIcon}
          value=""
          onPress={onPress}
          actionType="navigate"
        />
      );
    },
  },
  location: {
    exportKey: 'LOCATION',
    isDefault: true,
    ownerOnly: false,
    homeManagerAllowed: true,
    Component: () => {
      const roomInfo = useDeviceRoomInfo();
      const { isOwner, isShared } = Device;
      const showLocation = !useMemberSetInfo().isSingleSwitch && !isShared;
      const isCariotDevice = useCariotDevice();
      if (!showLocation) {
        return null;
      }
      const pressable = !isCariotDevice && isOwner;
      return (
        <ListItem
          key={'location'}
          title={I18n.room}
          value={roomInfo?.roomName || ''}
          actionType={pressable ? 'navigate' : 'none'}
          onPress={pressable ? () => {
            Host.ui.openRoomManagementPage();
          } : undefined}
        />
      );
    },
  },
  productBaike: {
    exportKey: 'PRODUCT_BAIKE',
    isDefault: true,
    Component: () => {
      const baikeUrl = useBaikeUrl();
      if (!baikeUrl) {
        return null;
      }
      return (
        <ListItem
          key={'productBaike'}
          title={I18n.productBaike}
          actionType="navigate"
          onPress={() => {
            Host.ui.openProductBaikeWebPage(baikeUrl);
          }}
        />
      );
    },
  },
  deviceNet: {
    exportKey: 'DEVICE_NET',
    isDefault: true,
    Component: () => {
      const { type, DEVICE_TYPE } = Device;
      const isWifiConnected = useWifiStatus();
      const bleConnection = useBleConnection();
      const gatewayStatus = useGatewayStatus();
      const isBleConnected = bleConnection === BleConnectionStatus.CONNECTED;
      const isGatewayConnected = gatewayStatus !== GatewayStatus.IDLE;
      const isNetDevice = [
        DEVICE_TYPE.WIFI_SINGLE_MODEL_DEVICE,
        DEVICE_TYPE.DUAL_MODEL_DEVICE,
        DEVICE_TYPE.NETWORK_CABLE_DEVICE,
      ].includes(type);
      const isBleType = [
        DEVICE_TYPE.BLUETOOTH_SINGLE_MODEL_DEVICE,
        DEVICE_TYPE.DUAL_MODEL_DEVICE,
        DEVICE_TYPE.BLE_MESH_DEVICE,
      ].includes(type);
      let value = '';
      if (isBleType && isBleConnected) {
        value = I18n.bleConnected;
      } else if (isBleType && isGatewayConnected) {
        value = I18n.connected;
      } else if (type !== DEVICE_TYPE.BLUETOOTH_SINGLE_MODEL_DEVICE && isWifiConnected) {
        value = I18n.connected;
      } else {
        value = I18n.deviceOffline;
      }
      return (
        <ListItem
          key={'deviceNet'}
          title={I18n.deviceNet}
          value={value}
          actionType={isNetDevice ? 'navigate' : 'none'}
          onPress={isNetDevice ? () => {
            Host.ui.openDeviceNetworkInfoPage();
          } : undefined}
        />
      );
    },
  },
  legalInfo: {
    exportKey: 'LEGAL_INFO',
    isDefault: true,
    ownerOnly: false,
    notTypes: ['5', '14', '15', '17'],
    Component: (params) => {
      const [tipVisible, setTipVisible] = useState(false);
      const { isOwner } = Device;
      function dismissTip() {
        setTipVisible(false);
      }
      return (
        <React.Fragment key={'legalInfo'}>
          <ListItem
            title={I18n.legalInfo}
            actionType="navigate"
            onPress={delegatePress(({ extraOptions }) => {
              if (!isOwner) {
                return;
              }
              const { option, policyUrl, licenseUrl } = extraOptions || {};
              Host.ui.previewLegalInformationAuthorizationV2(option || {
                privacyURL: policyUrl || '',
                agreementURL: licenseUrl || '',
              }).then((ok) => {
                if (!ok) {
                  return Promise.reject();
                }
              }).catch(() => {
                setTipVisible(true);
              });
            }, params, 'legalInfo')}
            disabled={!isOwner}
          />
          {tipVisible ? (
            <MessageDialog
              visible={tipVisible}
              contentText={I18n.no_privacy_tip_content}
              buttons={[{
                title: I18n.cancel,
                callback: dismissTip,
              }]}
              onDismiss={dismissTip}
            />
          ) : null}
        </React.Fragment>
      );
    },
  },
  pluginVersion: {
    exportKey: 'PLUGIN_VERSION',
    isDefault: true,
    title: () => I18n.pluginVersion,
  },
  timezone: {
    exportKey: 'TIMEZONE',
    isDefault: true,
    title: () => I18n.timezone,
    onPress: ({ syncDevice = false }) => {
      Host.ui.openDeviceTimeZoneSettingPage({
        sync_device: !!syncDevice,
      });
    },
  },
  deviceId: {
    exportKey: 'DEVICE_ID',
    isDefault: true,
    Component: () => {
      const deviceId = Device.deviceID;
      if (deviceId === undefined || deviceId === null) {
        return null;
      }
      return (
        <ListItem
          key={'deviceId'}
          title={I18n.deviceDid}
          value={String(deviceId)}
          actionType="none"
          onPress={() => {}}
          onLongPress={() => {
            Clipboard.setString(String(deviceId));
            showToast(I18n.clipboardy);
          }}
        />
      );
    },
  },
  deviceSN: {
    exportKey: 'DEVICE_SN',
    isDefault: true,
    Component: () => {
      const [spec, setSpec] = useState(null);
      useEffect(() => {
        Spec.getSpecByKey(Device.deviceID, { skey: 'device-information', pkey: 'serial-no' }).then((res) => {
          const targetSpec = res?.length ? res[res.length - 1] : null;
          if (targetSpec && targetSpec.siid && targetSpec.piid) {
            setSpec(targetSpec);
          }
        }).catch(() => { });
      }, []);
      const TargetComponent = specifyComponent(ListItem, {
        handle() {
          const [sn] = this.values;
          this.setState({
            title: I18n.deviceSN,
            value: [undefined, null].includes(sn) ? '' : String(sn),
            actionType: 'none',
            hidden: sn === undefined || sn === null,
            onPress: () => {},
            onLongPress: () => {
              Clipboard.setString(String(sn));
              showToast(I18n.clipboardy);
            },
          });
        },
      });
      if (!spec) {
        return null;
      }
      return (
        <TargetComponent key={'deviceSN'} specs={[{ siid: spec.siid, piid: spec.piid }]} />
      );
    },
  },
  mcuVersion: {
    exportKey: 'MCU_VERSION',
    isDefault: true,
    needValue: true,
    title: () => I18n.mcuVersion,
  },
  sdkVersion: {
    exportKey: 'SDK_VERSION',
    isDefault: true,
    needValue: true,
    title: () => I18n.sdkVersion,
  },
};
export default innerOptions;
export const basicOptions = ['name', 'changeIcon', 'location', 'productBaike'];
export const netOptions = ['deviceNet'];
export const versionOptions = ['pluginVersion', 'timezone'];
export const hardwareOptions = ['deviceId', 'deviceSN', 'mcuVersion', 'sdkVersion'];
export const restOptions = ['legalInfo'];