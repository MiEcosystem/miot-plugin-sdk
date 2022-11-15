import { useState, useEffect } from "react";
import { Device, Service } from "miot";
import { getModelType } from './useModelType';
let cacheShowDeviceService = false;
export function showDeviceService() {
  const brandId = Device.deviceConfigInfo?.brand_id;
  if (cacheShowDeviceService) {
    return Promise.resolve(true);
  }
  return new Promise((resolve, reject) => {
    getModelType().then((modelType) => {
      if (!['air-conditioner', 'television', 'washer', 'fridge', 'water-purifier', 'vacuum', 'air-purifier'].includes(modelType)) {
        cacheShowDeviceService = false;
        resolve(false);
        return;
      }
      Service.callSmartHomeAPI('/v2/product/get_product_brands', {})
        .then((res) => {
          const deviceBrandInfo = res?.brand_list?.find((item) => {
            return (item.id === brandId);
          });
          cacheShowDeviceService = deviceBrandInfo?.brand_type === 0; // 0表示米系设备
          resolve(cacheShowDeviceService);
        })
        .catch((err) => {
          cacheShowDeviceService = false;
          reject(err);
        });
    });
  });
}
export default function useDeviceService() {
  const [show, setDeviceService] = useState(false);
  useEffect(() => {
    showDeviceService().then((show) => {
      setDeviceService(show);
    }).catch(() => { });
  }, []);
  return show;
}