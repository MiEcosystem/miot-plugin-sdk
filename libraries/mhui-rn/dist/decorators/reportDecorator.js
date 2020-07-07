import { NativeModules } from 'react-native';
const {
  MIOTPackage
} = NativeModules;

function _doReport(moduleName, methodName, success, cost, errcode = 200404) {
  if (!MIOTPackage) {
    return;
  }

  const reportInfo = {
    module: moduleName,
    method: methodName,
    success,
    cost,
    tip: '6.0.0.0.114',
    errcode
  };
  MIOTPackage.apiReport(reportInfo);
}

export const referenceReport = (moduleName, methodName = 'constructor') => {
  if (__DEV__ === false) {
    _doReport(moduleName, methodName, true, 0);
  }
};
/* eslint-disable */
// @ts-ignore

export function withReport(target, moduleName) {
  if (MIOTPackage) {
    return new Proxy(target, {
      construct(target, args) {
        referenceReport(moduleName);
        return new target(...args);
      }

    });
  } else {
    return target;
  }
}