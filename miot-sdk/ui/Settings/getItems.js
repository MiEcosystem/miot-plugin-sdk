import React, { isValidElement, useState } from 'react';
import PropTypes from 'prop-types';
import Device from '../../device/BasicDevice';
import ListItem from '../ListItem/ListItem';
import useModelType from '../../hooks/useModelType';
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
import tryTrackCommonSetting from "../../utils/track-sdk";
import { useEffect } from 'react';
export const clickedItems = [];
export function useClicked(key) {
  const [clicked, setClicked] = useState(clickedItems.includes(key));
  function click() {
    if (!clickedItems.includes(key)) {
      clickedItems.push(key);
    }
    setClicked(true);
  }
  return [clicked, click];
}
export default function getItems(innerOptions, keys, values, params, defaultOptions) {
  const {
    options,
    showDots = [],
    extraOptions
  } = params;
  const { type, isOwner } = Device;
  const { permitLevel } = useDeviceRoomInfo();
  const isHomeManager = permitLevel === 9;
  const { excludeRequiredOptions = [] } = extraOptions || {};
  const modelType = useModelType();
  // 最终配置的项，包括调用方传入的项，和默认项
  const mergedOptions = [...(new Set([...(options || []), ...(defaultOptions || [])]))];
  const [createGroupResult, setCreateGroupResult] = useState(null);
  useEffect(() => {
    const fetchCreateGroupData = async() => {
      try {
        const result = await Device.isBelongToCarRoom(Device.deviceID);
        setCreateGroupResult(result);
      } catch (error) {
        console.error('获取 createGroup 数据时出错:', error);
      }
    };
    // 只在组件第一次挂载时执行一次
    fetchCreateGroupData();
  }, []);
  return keys.map((key, index) => {
    if (key instanceof Function) {
      return key(params);
    }
    if (isValidElement(key)) {
      return key;
    }
    if (key instanceof Object && key.title) {
      return (
        <ListItem key={key.title} {...key } useNewType={true} />
      );
    }
    const option = innerOptions[key];
    if (!option) {
      return null;
    }
    const {
      Component,
      needValue,
      types,
      notTypes,
      ownerOnly,
      homeManagerAllowed,
      modelTypes,
      notModelTypes,
      validator,
      title,
      onPress
    } = innerOptions[key];
    const value = values[index];
    if (
      // 未配置
      (!mergedOptions.includes(key)) ||
      // 指定排除
      excludeRequiredOptions.includes(key) ||
      // 设备类型匹配
      (types && !types.includes(type)) ||
      // 设备类型排除
      (notTypes && notTypes.includes(type)) ||
      // model 类型匹配
      (modelTypes && !modelTypes.includes(modelType)) ||
      // model 类型排除
      (notModelTypes && notModelTypes.includes(modelType)) ||
      // 不可共享
      (ownerOnly && !(isOwner || isHomeManager && homeManagerAllowed)) ||
      // 无值
      (needValue && [undefined, null, ''].includes(value)) ||
      // 自定义判断
      (validator instanceof Function && !validator({ modelType }))
    ) {
      return null;
    }
    if (Component instanceof Function) {
      // return Component(params);
      tryTrackCommonSetting(String(key), 'expose');
      return (
        <Component key={String(key)} {...params} />
      );
    }
    if (!title) {
      return null;
    }
    tryTrackCommonSetting(String(key), 'expose');
    if (key === 'createGroup') {
      // 车机隐藏创建灯组：code:0 表示成功，data:true表示车机，data:false表示非车机
      if (createGroupResult && createGroupResult.code === 0 && createGroupResult.data === true) {
        return null;
      } else {
        return (
          <ListItem
            key={String(key)}
            title={title instanceof Function ? title({
              modelType
            }) : title}
            value={String([undefined, null].includes(value) ? '' : value)}
            onPress={delegatePress(onPress, params, key)}
            showDot={showDots.includes(key) && !clickedItems.includes(key)}
            useNewType={true}
            hideArrow={!onPress}
          />
        );
      }
    } else {
      return (
        <ListItem
          key={String(key)}
          title={title instanceof Function ? title({
            modelType
          }) : title}
          value={String([undefined, null].includes(value) ? '' : value)}
          onPress={delegatePress(onPress, params, key)}
          showDot={showDots.includes(key) && !clickedItems.includes(key)}
          useNewType={true}
          hideArrow={!onPress}
        />
      );
    }
  });
}
export function delegatePress(cb, params, key, click) {
  return () => {
    tryTrackCommonSetting(String(key), 'click');
    const preOperation = params?.extraOptions?.preOperations?.[key];
    if (key && !clickedItems.includes(key)) {
      clickedItems.push(key);
      if (click instanceof Function) {
        click(key);
      }
    }
    if (cb instanceof Function) {
      if (preOperation instanceof Function) {
        preOperation().then(() => {
          cb(params || {});
        }).catch(() => {});
        return;
      }
      cb(params || {});
    }
  };
}
export const itemPropTypes = {
  params: PropTypes.object
};
export function getAllAndDefaultOptions(innerOptions) {
  const options = {};
  const defaultOptions = [];
  Object.entries(innerOptions || {}).forEach(([key, { exportKey, isDefault }]) => {
    if (!exportKey) {
      return;
    }
    options[exportKey] = key;
    if (isDefault && !defaultOptions.includes(key)) {
      defaultOptions.push(key);
    }
  });
  return {
    options,
    defaultOptions
  };
}