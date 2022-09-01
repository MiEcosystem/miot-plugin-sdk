import { useState, useEffect } from "react";
import { Device, Service } from "miot";
import { getModelType } from './useModelType';
const cacheShowDeviceService = {};
export function showDeviceService(brandId = Device.deviceConfigInfo?.brand_id, model = Device.model) {
  if (cacheShowDeviceService[model] !== undefined) {
    return Promise.resolve(cacheShowDeviceService[model]);
  }
  return new Promise((resolve, reject) => {
    getModelType().then((modelType) => {
      if (!['air-conditioner', 'television', 'washer', 'fridge', 'lock', 'water-purifier', 'vacuum', 'air-purifier'].includes(modelType)) {
        cacheShowDeviceService[model] = false;
        resolve(cacheShowDeviceService[model]);
        return;
      }
      Service.callSmartHomeAPI('/v2/product/get_product_brands', {})
        .then((res) => {
          const deviceBrandInfo = res?.brand_list?.find((item) => {
            return (item.id === brandId);
          });
          cacheShowDeviceService[model] = deviceBrandInfo?.brand_type === 0; // 0表示米系设备
          resolve(cacheShowDeviceService[model]);
        })
        .catch((err) => {
          cacheShowDeviceService[model] = false;
          reject(err);
          console.log(err);
        });
    });
  });
}
export default function useDeviceService(brandId = Device.deviceConfigInfo?.brand_id, model = Device.model) {
  const defaultInfo = false;
  const [deviceServiceInfo, setDeviceService] = useState(cacheShowDeviceService[model] || defaultInfo);
  useEffect(() => {
    showDeviceService(brandId, model).then((show) => {
      setDeviceService(show);
    }).catch(() => { });
  }, [model]);
  return deviceServiceInfo;
}