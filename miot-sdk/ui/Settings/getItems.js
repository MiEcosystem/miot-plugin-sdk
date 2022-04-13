import React, { isValidElement, useState } from 'react';
import PropTypes from 'prop-types';
import { Device } from 'miot';
import ListItem from '../ListItem/ListItem';
import useModelType from '../../hooks/useModelType';
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
  const { excludeRequiredOptions = [] } = extraOptions || {};
  const modelType = useModelType();
  // 最终配置的项，包括调用方传入的项，和默认项
  const mergedOptions = [...(new Set([...(options || []), ...(defaultOptions || [])]))];
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
      types,
      notTypes,
      ownerOnly,
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
      (!isOwner && ownerOnly) ||
      // 自定义判断
      (validator instanceof Function && !validator({ modelType }))
    ) {
      return null;
    }
    if (Component instanceof Function) {
      // return Component(params);
      return (
        <Component key={String(key)} {...params} />
      );
    }
    if (!title) {
      return null;
    }
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
  });
}
export function delegatePress(cb, params, key, click) {
  return () => {
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