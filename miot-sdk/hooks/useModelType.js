import { useState, useEffect } from 'react';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
const modelTypes = {};
export function getModelType(did, model) {
  did = did || Device.deviceID;
  model = model || Device.model;
  if (modelTypes[model]) {
    return Promise.resolve(modelTypes[model]);
  }
  return Service.spec.getSpecString(did).then((instance) => {
    const parsedInstance = typeof instance === 'string' ? JSON.parse(instance) : instance;
    if (!parsedInstance || !parsedInstance.type) {
      return Promise.reject();
    }
    const modelType = parsedInstance.type.split(':')[3];
    modelTypes[model] = modelType;
    return modelType || '';
  }).catch(() => {
    const modelType = (model || '').split('.')[1];
    modelTypes[model] = modelType;
    return modelType || '';
  });
}
export default function useModelType({
  did = Device.deviceID,
  model = Device.model
} = {
  did: Device.deviceID,
  model: Device.model
}) {
  const [modelType, setModelType] = useState(modelTypes[model] || (model || '').split('.')[1]);
  useEffect(() => {
    getModelType(did, model).then((modelType) => {
      setModelType(modelType);
    }).catch(() => {});
  }, [did, model]);
  return modelType;
}