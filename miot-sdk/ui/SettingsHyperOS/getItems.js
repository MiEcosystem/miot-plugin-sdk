import React, { isValidElement, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Device from '../../device/BasicDevice';
import { ListItem, ListItemWithWidget } from '../hyperOSUI';
import useModelType from '../../hooks/useModelType';
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
import tryTrackCommonSetting from '../../utils/track-sdk';
export const clickedItems = [];
export function useClicked(key) {
  const [clicked, setClicked] = useState(clickedItems.includes(key));
  function click() {
    // 无 key 的自定义项只用组件内部状态，否则 undefined 会进共享数组、连带压掉其他无 key 项的红点
    if (key && !clickedItems.includes(key)) {
      clickedItems.push(key);
    }
    setClicked(true);
  }
  return [clicked, click];
}
// switch / button 由 ListItemWithWidget 承载，其余走 ListItem
const widgetActionTypes = ['switch', 'button'];
// 红点消失依赖 useClicked 触发重渲染，因此每个列表项必须是独立组件：
// 直接读 clickedItems 只会在下一次无关渲染时才生效
function OptionItem({ optionKey, badge, onPress, params, disabled, actionType, ...rest }) {
  const [clicked, click] = useClicked(optionKey);
  if (widgetActionTypes.includes(actionType)) {
    return (
      <ListItemWithWidget
        {...rest}
        widgetType={actionType}
        disabled={disabled}
        // onChange 需要拿到开关新值、button 的句柄在 buttonOption 里，
        // 都不能过 delegatePress（它会丢掉实参）；顶层 onPress 只决定整行是否可点
        onPress={onPress ? delegatePress(onPress, params, optionKey, click) : undefined}
      />
    );
  }
  return (
    <ListItem
      {...rest}
      actionType={actionType}
      disabled={disabled}
      badge={!!badge && !clicked}
      onPress={disabled ? undefined : delegatePress(onPress, params, optionKey, click)}
    />
  );
}
OptionItem.propTypes = {
  optionKey: PropTypes.string,
  badge: PropTypes.bool,
  onPress: PropTypes.func,
  params: PropTypes.object,
  disabled: PropTypes.bool,
  actionType: PropTypes.string,
};
export default function getItems(innerOptions, keys, values, params, defaultOptions) {
  const {
    options,
    showDots = [],
    extraOptions,
  } = params;
  const { type, isOwner } = Device;
  const { permitLevel } = useDeviceRoomInfo();
  const isHomeManager = permitLevel === 9;
  const { excludeRequiredOptions = [] } = extraOptions || {};
  const modelType = useModelType();
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
      // 埋点与红点去重都需要稳定标识，title 是本地化文案不能用；
      // 未传 id 时按 track-sdk 对无 key 项的约定不上报
      const { id, ...itemProps } = key;
      return (
        <OptionItem
          key={id || key.title}
          optionKey={id}
          params={params}
          {...itemProps}
        />
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
      onPress,
    } = innerOptions[key];
    const value = values[index];
    if (
      (!mergedOptions.includes(key)) ||
      excludeRequiredOptions.includes(key) ||
      (types && !types.includes(type)) ||
      (notTypes && notTypes.includes(type)) ||
      (modelTypes && !modelTypes.includes(modelType)) ||
      (notModelTypes && notModelTypes.includes(modelType)) ||
      (ownerOnly && !(isOwner || isHomeManager && homeManagerAllowed)) ||
      (needValue && [undefined, null, ''].includes(value)) ||
      (validator instanceof Function && !validator({ modelType }))
    ) {
      return null;
    }
    if (Component instanceof Function) {
      tryTrackCommonSetting(String(key), 'expose');
      return (
        <Component key={String(key)} {...params} />
      );
    }
    if (!title) {
      return null;
    }
    tryTrackCommonSetting(String(key), 'expose');
    const isCreateGroup = key === 'createGroup';
    if (isCreateGroup && createGroupResult && createGroupResult.code === 0 && createGroupResult.data === true) {
      return null;
    }
    return (
      <OptionItem
        key={String(key)}
        optionKey={String(key)}
        params={params}
        title={title instanceof Function ? title({
          modelType,
        }) : title}
        value={String([undefined, null].includes(value) ? '' : value)}
        onPress={onPress}
        badge={showDots.includes(key)}
        actionType={onPress ? 'navigate' : 'none'}
        disabled={isCreateGroup && !isOwner && !isHomeManager}
      />
    );
  });
}
export function delegatePress(cb, params, key, click) {
  return () => {
    // String(undefined) 会绕过 track-sdk 对无 key 项的不上报判断，上报出 'undefined'
    if (key) {
      tryTrackCommonSetting(String(key), 'click');
    }
    const preOperation = params?.extraOptions?.preOperations?.[key];
    // click 来自 useClicked，自身会写 clickedItems；无 key 的自定义项也要靠它消红点
    if (click instanceof Function) {
      click(key);
    } else if (key && !clickedItems.includes(key)) {
      clickedItems.push(key);
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
  params: PropTypes.object,
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
    defaultOptions,
  };
}