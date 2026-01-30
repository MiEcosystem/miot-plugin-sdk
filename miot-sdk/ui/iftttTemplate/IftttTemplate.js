import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDeviceIftttTemplateInfo } from "./hooks/useDeviceIftttTemplateInfo";
import { CardButton, ContainerWithShadowAndSeparator, dynamicColor } from 'miot/ui';
import Images, { getImage } from './images';
import { Device, Service } from "../../index";
import IftttContainer from "./components/IftttContainer";
import { strings as I18n } from 'miot/resources';
import { getLocalI18n } from '../SwitchIfttt/utils';
import { View } from 'react-native';
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
import { IftttTemplateUtils } from './utils';
import { TitleBar } from 'mhui-rn';
/**
 * 自动化推荐模板
 * @module IftttTemplate
 * @param props
 * @param props.device_type  模板类型
 * @returns {JSX.Element}
 * @constructor
 */
const IftttTemplate = (props) => {
  const {
    withCard = true,
    withTitleBar = true,
    showSubtitle = true,
    hasShadow = false,
    disabled = false,
    trackParams = {
      card_id: 10205, item_type: 'button', item_name: 'button_automation'
    },
    isWearStyle = false,
    device_type,
    wrapContainerStyle = {},
    separatorStyle = {},
    titleThemesColor = 'transparent',
    titleIcon = "",
    TitleBar = null
  } = props || {};
  const templateInfo = useDeviceIftttTemplateInfo(device_type);
  const { permitLevel } = useDeviceRoomInfo();
  const [isHomeManager, setIsHomeManager] = useState(false);
  const [isHomeOwner, setIsHomeOwner] = useState(false);
  const [serverCode, setServerCode] = useState('');
  useEffect(() => {
    setIsHomeManager(permitLevel === 9);
    setIsHomeOwner(permitLevel === 10);
  }, [permitLevel]);
  useEffect(() => {
    Service.getServerName().then((res) => {
      setServerCode(res?.serverCode || '');
    }).catch(() => {});
  }, []);
  const { isOwner } = Device;
  const shouldShow = (isHomeOwner || isHomeManager) && serverCode === 'cn';
  useEffect(() => {
    if (shouldShow) {
      IftttTemplateUtils.report('expose', {
        ...trackParams
      });
    }
  }, [shouldShow]);
  if (!shouldShow) {
    return null;
  }
  return (
    <LayoutView
      withCard={withCard}
      isWearStyle={isWearStyle}
      wrapContainerStyle={wrapContainerStyle}
      separatorStyle={separatorStyle}
    >
      <View>
        {withTitleBar &&
          (TitleBar ||
            <CardButton
              title={I18n["ifttt"]}
              subtitle={showSubtitle ? getLocalI18n("scene_upgrade_subtitle") : ""}
              icon={titleIcon ? titleIcon : isWearStyle ? getImage("wear-scene") : getImage("ifttt-h")}
              themeColor={titleThemesColor}
              rightArrow={true}
              underlayColor={"transparent"}
              onPress={() => {
                IftttTemplateUtils.report('click', {
                  ...trackParams
                });
                Service.scene.openIftttAutoPage();
              }}
              disabled={disabled || !(isOwner || isHomeManager)}
              hasShadow={false}
            />)}
        {(templateInfo?.length === 2) && <IftttContainer
          disabled={disabled || !(isOwner || isHomeManager)}
          trackParams={trackParams}
          templateInfo={templateInfo}
          hasShadow={hasShadow}
        />}
      </View>
    </LayoutView>
  );
};
const LayoutView = (
  {
    withCard = true,
    isWearStyle = false,
    wrapContainerStyle = {},
    separatorStyle = {},
    children
  }) => {
  if (withCard) {
    return (
      <ContainerWithShadowAndSeparator
        separatorStyle={{
          backgroundColor: dynamicColor('rgba(0, 0, 0, 0.15)', 'rgba(255, 255, 255, 0.15)'),
          ...separatorStyle
        }}
        containerStyle={{
          backgroundColor: dynamicColor('#fff', '#242424'),
          borderRadius: isWearStyle ? 24 : 12,
          ...wrapContainerStyle
        }}
      >
        {children}
      </ContainerWithShadowAndSeparator>
    );
  } else {
    return (children);
  }
};
IftttTemplate.propTypes = {
  device_type: PropTypes.string.isRequired,
  isWearStyle: PropTypes.bool,
  withCard: PropTypes.bool,
  withTitleBar: PropTypes.bool,
  wrapContainerStyle: PropTypes.object,
  separatorStyle: PropTypes.object
};
export default IftttTemplate;