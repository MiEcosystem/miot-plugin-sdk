import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDeviceIftttTemplateInfo } from "./hooks/useDeviceIftttTemplateInfo";
import { Device, Service } from "../../index";
import IftttSmartSceneAdapter from "./components/IftttSmartSceneAdapter";
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
import useCurrentSelectHomeInfo from '../../hooks/useCurrentSelectHomeInfo';
import { IftttTemplateUtils } from './utils';
/**
 * 自动化推荐模板
 * @module SmartScene
 * @param props
 * @param props.device_type  模板类型
 * @returns {JSX.Element}
 * @constructor
 */
const SmartScene = (props) => {
  const {
    disabled = false,
    trackParams = {
      card_id: 10205, item_type: 'button', item_name: 'button_automation',
    },
    isWearStyle = false,
    device_type,
    showLeadingIcon = true,
    hasData = true,
  } = props || {};
  
  const templateInfo = useDeviceIftttTemplateInfo(device_type);
  const roomInfo = useDeviceRoomInfo() || {};
  const homeInfo = useCurrentSelectHomeInfo() || {};
  // 车等个人设备常不挂房间，房间级 permitLevel 取不到(为0/undefined)，优先使用家庭级权限
  const permitLevel = (homeInfo.permitLevel != null ? homeInfo.permitLevel : roomInfo.permitLevel);
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
  const shouldShow = (isHomeOwner || isHomeManager);
  useEffect(() => {
    if (shouldShow) {
      IftttTemplateUtils.report('expose', {
        ...trackParams,
      });
    }
  }, [shouldShow]);
  if (!shouldShow) {
    return null;
  }
  return (
    <IftttSmartSceneAdapter
      templateInfo={templateInfo || []}
      serverCode={serverCode}
      disabled={disabled || !(isOwner || isHomeManager || isHomeOwner)}
      isWearStyle={isWearStyle}
      trackParams={trackParams}
      showLeadingIcon={showLeadingIcon}
      hasData={hasData}
    />
  );
};
SmartScene.propTypes = {
  device_type: PropTypes.string.isRequired,
  isWearStyle: PropTypes.bool,
};
export default SmartScene;