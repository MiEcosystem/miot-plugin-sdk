import React, { Fragment, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Entrance } from '../../Entrance';
import Host from '../../Host';
import Service from '../../Service';
import Device from '../../device/BasicDevice';
import { strings as I18n } from '../../resources';
import { getModelType } from '../../hooks/useModelType';
import useSpecPluginInfo from '../../hooks/useSpecPluginInfo';
import useCanUpgrade from '../../hooks/useCanUpgrade';
import useFreqCameraInfo from '../../hooks/useFreqCameraInfo';
import useFreqDeviceInfo from '../../hooks/useFreqDeviceInfo';
import useUsedOnMiHome, { switchUsedOnMiHome } from '../../hooks/useUsedOnMiHome';
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
import useCariotDevice from '../../hooks/useCariotDevice';
import { showDeviceService } from '../../hooks/useDeviceService';
import AutoOTAABTestHelper from '../../utils/autoota_abtest_helper';
import {
  ListItem, ListItemWithWidget, ActionCustomDialog, SelectList,
} from '../hyperOSUI';
import { delegatePress, useClicked } from './getItems';
const innerOptions = {
  deviceService: {
    exportKey: 'DEVICE_SERVICE',
    ownerOnly: true,
    isDefault: true,
    Component: (params) => {
      const { showDots = [] } = params;
      const [show, setDeviceService] = useState(false);
      const [sn, setSN] = useState('');
      const [clicked, click] = useClicked('deviceService');
      useEffect(() => {
        Service.getServerName().then(({ countryCode }) => {
          if ((countryCode || '').toLowerCase() !== 'cn') {
            return;
          }
          showDeviceService().then((show) => {
            setDeviceService(show);
          }).catch((err) => {
            Service.smarthome.reportLog(Device.model, `showDeviceService error: ${ err }`);
          });
        }).catch(() => {});
      }, []);
      useEffect(() => {
        Service.spec.getSpecByKey(Device.deviceID, { skey: 'device-information', pkey: 'serial-no' })
          .then((res) => {
            const target = res && res.length ? res[res.length - 1] : null;
            if (!target || !target.siid || !target.piid) {
              return;
            }
            return Service.spec.getPropertiesValue([{ did: Device.deviceID, siid: target.siid, piid: target.piid }])
              .then((vs) => {
                const v = vs && vs[0];
                if (v && v.code === 0 && v.value != null) {
                  setSN(String(v.value));
                }
              });
          })
          .catch(() => {});
      }, []);
      if (!show) {
        return null;
      }
      return (
        <ListItem
          key={'deviceService'}
          title={I18n.deviceService}
          actionType="navigate"
          badge={showDots.includes('deviceService') && !clicked}
          onPress={() => {
            click();
            Host.ui.openDeviceServicePage({ did: Device.deviceID, sn: sn || '' });
          }}
        />
      );
    },
  },
  share: {
    exportKey: 'SHARE',
    ownerOnly: true,
    homeManagerAllowed: true,
    title: I18n.share,
    notTypes: ['3', '22'],
    validator: () => {
      return Device.deviceConfigInfo?.permission_control !== 3;
    },
    Component: (params) => {
      const { showDots = [] } = params;
      const isCariotDevice = useCariotDevice();
      const [clicked, click] = useClicked('share');
      useEffect(() => {
        const shareParams = { 'did': Device.deviceID, 'device_model': Device.model,
          'mac': Device.mac, 'item_type': 'button', 'item_name': 'share_device_link_button' };
        if (Platform.OS === 'ios') {
          Service.smarthome.recordEvent("expose", 'plugin_homepage', 'plugin_setting', null, null, shareParams);
        } else {
          Service.smarthome.reportEventRefChannel("expose", shareParams);
        }
      }, []);
      if (isCariotDevice) {
        return null;
      }
      return (
        <ListItem
          key={'share'}
          title={I18n.share}
          actionType="navigate"
          badge={showDots.includes('share') && !clicked}
          onPress={delegatePress(() => {
            const shareParams = { 'did': Device.deviceID, 'device_model': Device.model,
              'mac': Device.mac, 'item_type': 'button', 'item_name': 'share_device_link_button' };
            if (Platform.OS === 'ios') {
              Service.smarthome.recordEvent("click", 'plugin_homepage', 'plugin_setting', null, null, shareParams);
            } else {
              Service.smarthome.reportEventRefChannel("click", shareParams);
            }
            Host.ui.openShareDevicePage();
          }, params, 'share', click)}
        />
      );
    },
  },
  ifttt: {
    exportKey: 'IFTTT',
    ownerOnly: true,
    homeManagerAllowed: true,
    title: () => I18n.ifttt,
    onPress: () => {
      Service.scene.openIftttAutoPage();
    },
  },
  firmwareUpgrade: {
    exportKey: 'FIRMWARE_UPGRADE',
    ownerOnly: true,
    homeManagerAllowed: true,
    Component: (params) => {
      const { showDots = [] } = params;
      const canUpgrade = useCanUpgrade();
      const [clicked, click] = useClicked('firmwareUpgrade');
      useEffect(() => {
        const trackParams = { 'ota_origin': 2, 'ota_type': 3, 'did': Device.deviceID,
          'device_model': Device.model, 'mac': Device.mac, 'item_type': 'button', 'item_name': 'firmware_updates_link_button' };
        if (Platform.OS === 'ios') {
          Service.smarthome.recordEvent("expose", 'plugin_homepage', 'plugin_setting', null, null, trackParams);
        } else {
          Service.smarthome.reportEventRefChannel("expose", trackParams);
        }
      }, []);
      if (Device.sc_type === 28) {
        return null;
      }
      return (
        <ListItem
          key={'firmwareUpgrade'}
          title={I18n.firmwareUpgrade}
          badge={(canUpgrade || showDots.includes('firmwareUpgrade')) && !clicked}
          actionType="navigate"
          onPress={delegatePress(({ navigation, extraOptions = {} }) => {
            const trackParams = { 'ota_origin': 2, 'ota_type': 3, 'did': Device.deviceID,
              'device_model': Device.model, 'mac': Device.mac, 'item_type': 'button', 'item_name': 'firmware_updates_link_button' };
            if (Platform.OS === 'ios') {
              Service.smarthome.recordEvent("click", 'plugin_homepage', 'plugin_setting', null, null, trackParams);
            } else {
              Service.smarthome.reportEventRefChannel("click", trackParams);
            }
            const { type, model } = Device;
            const { showUpgrade, upgradePageKey, bleOtaAuthType } = extraOptions || {};
            if (navigation && showUpgrade === false && upgradePageKey) {
              navigation.navigate(upgradePageKey, {});
              return;
            }
            if (showUpgrade === false) {
              return;
            }
            getModelType().then((modelType) => {
              if (['16'].includes(type)) {
                Host.ui.openBleMeshDeviceUpgradePage();
                return;
              }
              if (['17'].includes(type) && ['light'].includes(modelType)) {
                Host.ui.openLightGroupUpgradePage();
                return;
              }
              if (AutoOTAABTestHelper.autootaSupported(type, model)) {
                Host.ui.openDeviceUpgradePage(0);
                return;
              }
              if (['6', '8', '16'].includes(type) && [0, 1, 4, 5].includes(bleOtaAuthType)) {
                Host.ui.openBleCommonDeviceUpgradePage({ auth_type: bleOtaAuthType });
                return;
              }
              Host.ui.openDeviceUpgradePage(1);
            }).catch(() => {});
          }, params, 'firmwareUpgrade', click)}
        />
      );
    },
  },
  help: {
    exportKey: 'HELP',
    isDefault: true,
    title: () => I18n.helpAndFeedback,
    onPress: () => {
      Host.ui.openHelpPage();
    },
  },
  security: {
    exportKey: 'SECURITY',
    isDefault: true,
    ownerOnly: true,
    title: () => I18n.security,
    onPress: () => {
      Host.ui.openSecuritySetting();
    },
  },
  addToDesktop: {
    exportKey: 'ADD_TO_DESKTOP',
    isDefault: true,
    title: () => I18n.addToDesktop,
    onPress: () => {
      Host.ui.openAddToDesktopPage();
    },
  },
  usedOnMiHome: {
    exportKey: 'USED_ON_MI_HOME',
    title: I18n.usedOnMiHome,
    isDefault: true,
    ownerOnly: true,
    homeManagerAllowed: true,
    Component: () => {
      const [isOpen, setIsOpen] = useUsedOnMiHome();
      const isCloudDevice = Device.type === '14';
      if (!isCloudDevice) {
        return null;
      }
      return (
        <ListItemWithWidget
          key={'usedOnMiHome'}
          widgetType="switch"
          title={I18n.usedOnMiHome}
          checked={!!isOpen}
          onChange={(value) => {
            setIsOpen(value);
            switchUsedOnMiHome(value).then(() => {
              Host.ui.showToast(I18n.operation_success);
            }).catch((error) => {
              Host.ui.showToast(error);
              setIsOpen(!value);
            });
          }}
        />
      );
    },
  },
  freqDevice: {
    exportKey: 'FREQ_DEVICE',
    title: I18n.favoriteDevices,
    isDefault: true,
    ownerOnly: false,
    homeManagerAllowed: true,
    Component: () => {
      const [info, setInfo] = useFreqDeviceInfo();
      const isCariotDevice = useCariotDevice();
      const { permitLevel } = useDeviceRoomInfo();
      const isHomeManager = permitLevel === 9;
      const { isOwner } = Device;
      const disabled = !isOwner && !isHomeManager;
      useEffect(() => {
        getModelType().then((modelType) => {
          const isCamera = ['camera'].indexOf(modelType) !== -1 && ['mxiang.'].indexOf(Device.model) === -1;
          if (isCamera) {
            Service.smarthome.reportEvent('expose', { tip: '6.109.1.1.28404', switch_toggle_string: info ? "1" : "0" });
          }
        }).catch(() => {});
      }, []);
      if (isCariotDevice) {
        return null;
      }
      return (
        <ListItemWithWidget
          key={'freqDevice'}
          widgetType="switch"
          title={I18n.favoriteDevices}
          checked={!!info}
          disabled={disabled}
          onChange={(value) => {
            Device.setCommonUseDeviceSwitch({
              switchStatus: value ? "1" : "0",
            }).then(() => {
              setInfo(value);
            }).catch(() => {
              setInfo(value);
              setInfo(!value);
            });
            getModelType().then((modelType) => {
              const isCamera = ['camera'].indexOf(modelType) !== -1 && ['mxiang.'].indexOf(Device.model) === -1;
              if (isCamera) {
                Service.smarthome.reportEvent('click', { tip: '6.109.1.1.28405', switch_toggle_string: value ? "1" : "0" });
              }
            }).catch(() => {});
          }}
        />
      );
    },
  },
  freqCamera: {
    exportKey: 'FREQ_CAMERA',
    isDefault: true,
    modelTypes: ['camera'],
    validator: () => {
      return !['mxiang'].includes(Device.model.split('.')[0]);
    },
    Component: (params) => {
      const { showDots = [] } = params;
      const [info, clear] = useFreqCameraInfo();
      const [clicked, click] = useClicked('freqCamera');
      const { isFreqDevice, canUpgrade } = info || {};
      return (
        <ListItem
          key={'freqCamera'}
          title={I18n.favoriteCamera}
          value={isFreqDevice ? I18n.open : I18n.close}
          badge={(canUpgrade || showDots.includes('freqCamera')) && !clicked}
          actionType="navigate"
          onPress={delegatePress(() => {
            clear();
            Host.ui.openCommonDeviceSettingPage(1);
          }, params, 'freqCamera', click)}
        />
      );
    },
  },
  defaultPlugin: {
    exportKey: 'DEFAULT_PLUGIN',
    isDefault: true,
    ownerOnly: true,
    Component: (params) => {
      const { showDots = [] } = params;
      const [tipVisible, setTipVisible] = useState(false);
      const [specPluginInfo, setDefaultPluginType] = useSpecPluginInfo();
      const { hasSpecPlugin, defaultPluginType } = specPluginInfo || {};
      const [selected, setSelected] = useState(defaultPluginType);
      const [clicked, click] = useClicked('defaultPlugin');
      const choices = [{
        value: 0,
        title: I18n.stdPluginTitle,
        subtitle: I18n.stdPluginSubTitle,
      }, {
        value: 1,
        title: I18n.thirdPluginTitle,
      }];
      function dismissTip() {
        setTipVisible(false);
      }
      useEffect(() => {
        Service.smarthome.reportEvent('expose', { tip: '6.18.1.1.15487' });
      }, []);
      if (!hasSpecPlugin) {
        return null;
      }
      return (
        <Fragment key={'defaultPlugin'}>
          <ListItem
            title={I18n.defaultPlugin}
            value={choices[defaultPluginType]?.title}
            actionType="navigate"
            badge={showDots.includes('defaultPlugin') && !clicked}
            onPress={delegatePress(() => {
              setSelected(defaultPluginType);
              setTipVisible(true);
            }, params, 'defaultPlugin', click)}
          />
          {tipVisible ? (
            <ActionCustomDialog
              visible={tipVisible}
              title={I18n.selectDefaultHP}
              buttons={[{
                title: I18n.cancel,
                callback: dismissTip,
              }, {
                title: I18n.ok,
                type: 'primary',
                callback: () => {
                  dismissTip();
                  if (selected === defaultPluginType) {
                    return;
                  }
                  setDefaultPluginType(selected);
                  Service.smarthome.reportEvent('click', { plugin_form: selected, tip: '6.18.1.1.15488' });
                  setTimeout(() => {
                    Host.ui.openPluginPage(Device.deviceID, Entrance.Main, {
                      dismiss_current_plug: true,
                      open_plugin_source: 2,
                    });
                  }, 300);
                },
              }]}
              onDismiss={dismissTip}
            >
              <SelectList
                options={choices}
                value={selected}
                onChange={(value) => {
                  setSelected(value);
                }}
              />
            </ActionCustomDialog>
          ) : null}
        </Fragment>
      );
    },
  },
  deviceCall: {
    exportKey: 'DEVICE_CALL',
    isDefault: true,
    ownerOnly: true,
    modelTypes: ['light'],
    validator: () => (['philips.light.flat'].includes(Device.model)),
    title: () => I18n.deviceCall,
    onPress: () => {
      Host.ui.openDeviceCallSettingPage(Device.deviceID);
    },
  },
  pairMode: {
    exportKey: 'PAIR_MODE',
    isDefault: true,
    ownerOnly: true,
    validator: () => {
      return Device.deviceID.indexOf('M.') === 0;
    },
    title: () => I18n.pairMode,
    onPress: () => {
      Host.ui.openMatterConnectPage(Device.deviceID);
    },
  },
};
export default innerOptions;
export const commonOptions = ['deviceCall', 'deviceService', 'share', 'ifttt', 'firmwareUpgrade', 'help', 'security', 'addToDesktop', 'usedOnMiHome', 'freqDevice', 'freqCamera', 'defaultPlugin', 'pairMode'];