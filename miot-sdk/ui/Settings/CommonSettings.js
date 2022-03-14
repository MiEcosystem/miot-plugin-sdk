import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Host, Service, Device, Entrance } from 'miot';
import { strings as I18n } from '../../resources';
import Section from './Section';
import ListItem from '../ListItem/ListItem';
import ChoiceDialog from '../Dialog/ChoiceDialog';
import getItems, { getAllAndDefaultOptions, delegatePress, clickedItems } from './getItems';
import { getModelType } from '../../hooks/useModelType';
import useSpecPluginInfo from '../../hooks/useSpecPluginInfo';
import useCanUpgrade from '../../hooks/useCanUpgrade';
import useFreqCameraInfo from '../../hooks/useFreqCameraInfo';
import useFreqDeviceInfo from '../../hooks/useFreqDeviceInfo';
import AutoOTAABTestHelper from '../../utils/autoota_abtest_helper';
const innerOptions = {
  share: {
    exportKey: 'SHARE',
    ownerOnly: true,
    title: I18n.share,
    onPress: () => {
      Host.ui.openShareDevicePage();
    }
  },
  ifttt: {
    exportKey: 'IFTTT',
    ownerOnly: true,
    title: I18n.ifttt,
    onPress: () => {
      Service.scene.openIftttAutoPage();
    }
  },
  firmwareUpgrade: {
    exportKey: 'FIRMWARE_UPGRADE',
    ownerOnly: true,
    Component: (params) => {
      const canUpgrade = useCanUpgrade();
      return (
        <ListItem
          key={'firmwareUpgrade'}
          title={I18n.firmwareUpgrade}
          showDot={canUpgrade && !clickedItems.includes('firmwareUpgrade')}
          onPress={delegatePress(({ navigation, extraOptions = {} }) => {
            const { type, model } = Device;
            const { showUpgrade, upgradePageKey, bleOtaAuthType } = extraOptions;
            // showUpgrade 未设置，则当做true，可以简化配置
            // showUpgrade 为false, 则明确使用自定义页面
            // 有navigation, 使用自定义页面，且配置了自定义页面，才能跳过去
            if (navigation && showUpgrade === false && upgradePageKey) {
              navigation.navigate(upgradePageKey, {});
              return;
            }
            // 参数不够，则不处理
            if (showUpgrade === false) {
              return;
            }
            getModelType().then((modelType) => {
              // mesh
              if (['16'].includes(type)) {
                Host.ui.openBleMeshDeviceUpgradePage();
                return;
              }
              // 灯组
              if (['17'].includes(type) && ['light'].includes(modelType)) {
                Host.ui.openLightGroupUpgradePage();
                return;
              }
              // 自动升级ab test
              if (AutoOTAABTestHelper.autootaSupported(type, model)) {
                Host.ui.openDeviceUpgradePage(0);
                return;
              }
              // 蓝牙
              if (['6', '8', '16'].includes(type) && [0, 1, 4, 5].includes(bleOtaAuthType)) {
                Host.ui.openBleCommonDeviceUpgradePage({ auth_type: bleOtaAuthType });
                return;
              }
              // 缺省情况
              Host.ui.openDeviceUpgradePage(1);
            }).catch(() => {});
          }, params, 'firmwareUpgrade')}
          useNewType={true}
          hideArrow={false}
        />
      );
    }
  },
  help: {
    exportKey: 'HELP',
    isDefault: true,
    title: I18n.helpAndFeedback,
    onPress: () => {
      Host.ui.openHelpPage();
    }
  },
  security: {
    exportKey: 'SECURITY',
    isDefault: true,
    ownerOnly: true,
    title: I18n.security,
    onPress: () => {
      Host.ui.openSecuritySetting();
    }
  },
  addToDesktop: {
    exportKey: 'ADD_TO_DESKTOP',
    isDefault: true,
    title: I18n.addToDesktop,
    onPress: () => {
      Host.ui.openAddToDesktopPage();
    }
  },
  freqDevice: {
    exportKey: 'FREQ_DEVICE',
    title: I18n.favoriteDevices,
    isDefault: true,
    ownerOnly: true,
    onPress: () => {
      Host.ui.openCommonDeviceSettingPage(0);
    }
  },
  freqCamera: {
    exportKey: 'FREQ_CAMERA',
    isDefault: true,
    modelTypes: ['camera'],
    validator: () => {
      return !['mxiang'].includes(Device.model.split('.')[0]);
    },
    Component: (params) => {
      const [info, clear] = useFreqCameraInfo();
      const { isFreqDevice, canUpgrade } = info || {};
      if (!isFreqDevice) {
        return null;
      }
      return (
        <ListItem
          key={'freqCamera'}
          title={I18n.favoriteCamera}
          value={canUpgrade ? I18n.open : I18n.close}
          showDot={canUpgrade && !clickedItems.includes('firmwareUpgrade')}
          onPress={delegatePress(() => {
            clear();
            Host.ui.openCommonDeviceSettingPage(1);
          }, params, 'freqCamera')}
          useNewType={true}
          hideArrow={false}
        />
      );
    }
  },
  default_plugin: {
    exportKey: 'DEFAULT_PLUGIN',
    isDefault: true,
    ownerOnly: true,
    Component: (params) => {
      const [tipVisible, setTipVisible] = useState(false);
      const [specPluginInfo, setDefaultPluginType] = useSpecPluginInfo();
      const { hasSpecPlugin, defaultPluginType } = specPluginInfo || {};
      const choices = [{
        title: I18n.stdPluginTitle,
        subtitle: I18n.stdPluginSubTitle
      }, {
        title: I18n.thirdPluginTitle
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
        <Fragment key={'default_plugin'}>
          <ListItem
            title={I18n.defaultPlugin}
            value={choices[defaultPluginType]?.title}
            onPress={delegatePress(() => {
              setTipVisible(true);
            }, params, 'default_plugin')}
            useNewType={true}
            hideArrow={false}
          />
          {tipVisible ? (
            <ChoiceDialog
              visible={tipVisible}
              title={I18n.selectDefaultHP}
              useNewType={true}
              dialogStyle={{
                allowFontScaling: true,
                unlimitedHeightEnable: false,
                titleStyle: {
                  fontSize: 18
                }
              }}
              buttons={[{
                text: I18n.cancel
              }, {
                text: I18n.ok,
                callback: (res) => {
                  dismissTip();
                  const newPluginType = res?.[0];
                  if (newPluginType === defaultPluginType) {
                    return;
                  }
                  setDefaultPluginType(newPluginType);
                  Service.smarthome.reportEvent('click', { plugin_form: newPluginType, tip: '6.18.1.1.15488' });
                  setTimeout(() => {
                    Host.ui.openPluginPage(Device.deviceID, Entrance.Main, {
                      dismiss_current_plug: true,
                      open_plugin_source: 2
                    });
                  }, 300);
                }
              }]}
              options={choices}
              selectedIndexArray={[defaultPluginType]}
              onDismiss={dismissTip}
            />
          ) : null}
        </Fragment>
      );
    }
  }
};
const AllAndDefaultOptions = getAllAndDefaultOptions(innerOptions);
export const options = AllAndDefaultOptions.options;
const defaultOptions = AllAndDefaultOptions.defaultOptions;
const commonOptions = ['share', 'ifttt', 'firmwareUpgrade', 'help', 'security', 'addToDesktop', 'freqDevice', 'freqCamera', 'default_plugin'];
export default function CommonSettings(params) {
  const { customOptions } = params;
  return (
    <Section title={I18n.commonSetting}>
      {getItems(innerOptions, commonOptions, ['', '', '', '', '', '', useFreqDeviceInfo() ? I18n.open : I18n.close], params, defaultOptions)}
      {getItems(innerOptions, customOptions || [], [], params, defaultOptions)}
    </Section>
  );
}
CommonSettings.propTypes = {
  navigation: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.string),
  customOptions: PropTypes.array,
  showDots: PropTypes.arrayOf(PropTypes.string),
  extraOptions: PropTypes.object
};