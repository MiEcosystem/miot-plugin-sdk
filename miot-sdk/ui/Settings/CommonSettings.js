import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Entrance } from 'miot/Entrance';
import Host from 'miot/Host';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import { strings as I18n } from '../../resources';
import Section from './Section';
import ListItem from '../ListItem/ListItem';
import ChoiceDialog from '../Dialog/ChoiceDialog';
import getItems, { getAllAndDefaultOptions, delegatePress, useClicked } from './getItems';
import { getModelType } from '../../hooks/useModelType';
import useSpecPluginInfo from '../../hooks/useSpecPluginInfo';
import useCanUpgrade from '../../hooks/useCanUpgrade';
import useFreqCameraInfo from '../../hooks/useFreqCameraInfo';
import useFreqDeviceInfo from '../../hooks/useFreqDeviceInfo';
import AutoOTAABTestHelper from '../../utils/autoota_abtest_helper';
import { showDeviceService } from "../../hooks/useDeviceService";
import useCariotDevice from "../../hooks/useCariotDevice";
import { ListItemWithSwitch } from 'mhui-rn';
let getInnerOptions = () => {
  return {
    deviceService: {
      exportKey: 'DEVICE_SERVICE',
      ownerOnly: true,
      isDefault: true,
      Component: () => {
        const [show, setDeviceService] = useState(false);
        let countryCode = '';
        function getCountryCode() {
          return new Promise((resolve, reject) => {
            if (countryCode) {
              resolve(countryCode);
              return;
            }
            Service.getServerName().then(({ countryCode: mCountryCode }) => {
              countryCode = (mCountryCode || '').toLowerCase();
              resolve(countryCode);
            }).catch(reject);
          });
        }
        useEffect(() => {
          getCountryCode().then((countryCode) => {
            if (countryCode === 'cn') {
              showDeviceService().then((show) => {
                setDeviceService(show);
              }).catch((err) => {
                Service.smarthome.reportLog(Device.model, `showDeviceService error: ${ err }`);
              });
            }
          });
        }, []);
        return show ? (
          <ListItem
            key={ 'deviceService' }
            title={ I18n.deviceService }
            onPress={ () => {
              Host.ui.openDeviceServicePage({ did: Device.deviceID });
            } }
            useNewType={ true }
            hideArrow={ false }
            showSeparator={ false }
          />
        ) : null;
      }
    },
    share: {
      exportKey: 'SHARE',
      ownerOnly: true,
      homeManagerAllowed: true,
      title: I18n.share,
      notTypes: ['3', '22'],
      Component: () => {
        const isCariotDevice = useCariotDevice();
        return isCariotDevice ? null : (
          <ListItem
            key={ 'share' }
            title={ I18n.share }
            onPress={ () => {
              Host.ui.openShareDevicePage();
            } }
            useNewType={ true }
            hideArrow={ false }
            showSeparator={ false }
          />
        );
      },
      validator: () => {
        // 0：用户可选共享权限 1：用户不可选共享权限 2：白名单 3：不支持共享
        return Device.deviceConfigInfo?.permission_control !== 3;
      }
    },
    ifttt: {
      exportKey: 'IFTTT',
      ownerOnly: true,
      homeManagerAllowed: true,
      title: I18n.ifttt,
      onPress: () => {
        Service.scene.openIftttAutoPage();
      }
    },
    firmwareUpgrade: {
      exportKey: 'FIRMWARE_UPGRADE',
      ownerOnly: true,
      homeManagerAllowed: true,
      Component: (params) => {
        const canUpgrade = useCanUpgrade();
        const [clicked, click] = useClicked('firmwareUpgrade');
        return (
          <ListItem
            key={'firmwareUpgrade'}
            title={I18n.firmwareUpgrade}
            showDot={canUpgrade && !clicked}
            onPress={delegatePress(({ navigation, extraOptions = {} }) => {
              const { type, model } = Device;
              const { showUpgrade, upgradePageKey, bleOtaAuthType } = extraOptions || {};
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
                // Mesh
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
            }, params, 'firmwareUpgrade', click)}
            useNewType={true}
            hideArrow={false}
            showSeparator={ false }
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
      homeManagerAllowed: true,
      Component: (params) => {
        const [info, setInfo] = useFreqDeviceInfo();
        const isCariotDevice = useCariotDevice();
        useEffect(() => {
          getModelType().then((modelType) => {
            //  摄像机首页显示开关曝光打点
            let isCamera = ['camera'].indexOf(modelType) !== -1 && ['mxiang.'].indexOf(Device.model) == -1;
            if (isCamera) {
              Service.smarthome.reportEvent('expose', { tip: '6.109.1.1.28404', switch_toggle_string: info ? "1" : "0" });
            }
          }).catch(() => {});
        }, []);
        return (
          isCariotDevice ? null :
            <ListItemWithSwitch
              key={'FREQ_DEVICE'}
              title={I18n.favoriteDevices}
              titleNumberOfLines={3}
              value={!!info}
              showSeparator={ false }
              onTintColor={params.extraOptions?.themeColor || undefined}
              onValueChange={(vaule) => {
                Device.setCommonUseDeviceSwitch(
                  {
                    switchStatus: vaule ? "1" : "0"
                  }
                ).then(() => {
                  setInfo(vaule);
                }).catch(() => {
                  setInfo(vaule);// 不调用这行代码的话，info值未变，下面的setInfo不会触发render
                  setInfo(!vaule);
                });
                getModelType().then((modelType) => {
                // 摄像机首页显示开关点击打点
                  let isCamera = ['camera'].indexOf(modelType) !== -1 && ['mxiang.'].indexOf(Device.model) == -1;
                  if (isCamera) {
                    Service.smarthome.reportEvent('click', { tip: '6.109.1.1.28405', switch_toggle_string: vaule ? "1" : "0" });
                  }
                }).catch(() => {});
              }}
            />
        );
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
        const [clicked, click] = useClicked('freqCamera');
        const { isFreqDevice, canUpgrade } = info || {};
        return (
          <ListItem
            key={'freqCamera'}
            title={I18n.favoriteCamera}
            value={isFreqDevice ? I18n.open : I18n.close}
            showDot={canUpgrade && !clicked}
            onPress={delegatePress(() => {
              clear();
              Host.ui.openCommonDeviceSettingPage(1);
            }, params, 'freqCamera', click)}
            useNewType={true}
            hideArrow={false}
            showSeparator={ false }
          />
        );
      }
    },
    defaultPlugin: {
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
          <Fragment key={'defaultPlugin'}>
            <ListItem
              title={I18n.defaultPlugin}
              value={choices[defaultPluginType]?.title}
              onPress={delegatePress(() => {
                setTipVisible(true);
              }, params, 'defaultPlugin')}
              useNewType={true}
              hideArrow={false}
              showSeparator={ false }
            />
            {tipVisible ? (
              <ChoiceDialog
                visible={tipVisible}
                title={I18n.selectDefaultHP}
                useNewType={true}
                dialogStyle={{
                  allowFontScaling: true,
                  unlimitedHeightEnable: true,
                  titleStyle: {
                    fontSize: 18
                  },
                  itemSubtitleNumberOfLines: 0,
                  itemSubtitleStyle: {
                    marginRight: 10
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
    },
    deviceCall: {
      exportKey: "DEVICE_CALL",
      isDefault: true,
      ownerOnly: true,
      modelTypes: ["light"],
      validator: () => (["philips.light.flat"].includes(Device.model)),
      Component: (params) => {
        return (
          <ListItem
            key={"deviceCall"}
            title={I18n.deviceCall}
            onPress={() => {
              Host.ui.openDeviceCallSettingPage(Device.deviceID);
            }}
            useNewType={true}
            hideArrow={false}
            showSeparator={ false }
          />
        );
      }
    },
    pairMode: { // 配对模式，只有Matter子设备才会显示这一项
      exportKey: 'PAIR_MODE',
      isDefault: true,
      ownerOnly: true,
      validator: () => {
        let isMatter = Device.deviceID.indexOf('M.') === 0 ? true : false; // 所有Matter子设备的id格式均为 "M." + "device_id"，id不为此格式的则不是。
        return isMatter;
      },
      Component: (params) => {
        return (
          <ListItem
            key={"pairMode"}
            title={I18n.pairMode}
            onPress={ () => Host.ui.openMatterConnectPage(Device.deviceID) } 
            useNewType={true}
            hideArrow={false}
            showSeparator={ false }
          />
        );
      }
    }
    // pairMode: { // 配对模式，只有Matter子设备才会显示这一项
    //   exportKey: 'PAIR_MODE',
    //   isDefault: true,
    //   ownerOnly: true,
    //   validator: () => {
    //     let isMatter = Device.deviceID.indexOf('M.') === 0 ? true : false; // 所有Matter子设备的id格式均为 "M." + "device_id"，id不为此格式的则不是。
    //     return isMatter;
    //   },
    //   Component: (params) => {
    //     return (
    //       <ListItem
    //         key={"pairMode"}
    //         title={"配对模式"}
    //         onPress={ () => Host.ui.openMatterConnectPage(Device.deviceID) } 
    //         useNewType={true}
    //         hideArrow={false}
    //       />
    //     );
    //   }
    // }
  };
};
let innerOptions = getInnerOptions();
export const initCommonSettingsInnerOptions = () => {
  innerOptions = getInnerOptions();
};
const AllAndDefaultOptions = getAllAndDefaultOptions(innerOptions);
export const options = AllAndDefaultOptions.options;
const defaultOptions = AllAndDefaultOptions.defaultOptions;
const commonOptions = ['deviceCall', 'deviceService', 'share', 'ifttt', 'firmwareUpgrade', 'help', 'security', 'addToDesktop', 'freqDevice', 'freqCamera', 'defaultPlugin', 'pairMode'];
export default function CommonSettings(params) {
  const { customOptions } = params;
  return (
    <Section title={I18n.commonSetting}>
      {getItems(innerOptions, commonOptions, ['', '', '', '', '', '', '', '', useFreqDeviceInfo() ? I18n.open : I18n.close], params, defaultOptions)}
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