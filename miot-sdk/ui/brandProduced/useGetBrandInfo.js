import React, { useEffect, useState, useMemo } from 'react';
import { Service, Device } from 'miot';
export function useGetBrandInfo() {
  
  const [brandId, setBrandId] = useState();
  const [brandName, setBrandName] = useState('');
  useEffect(() => {
    Promise.all([
      Service.smarthome.getBrandInfos([Device.deviceConfigInfo.brand_id]),
      Service.getServerName()
    ]).then((res) => {
      const [brandRes, serverRes] = res;
      if (serverRes?.serverCode === 'cn' && brandRes?.brand_infos?.[`${ Device.deviceConfigInfo.brand_id }`]) {
        setBrandId(Device.deviceConfigInfo.brand_id);
        setBrandName(brandRes?.brand_infos?.[`${ Device.deviceConfigInfo.brand_id }`]?.brand_name);
      }
    });
  }, []);
  return useMemo(() => ({
    brandId,
    brandName
  }), [brandId, brandName]);
 
}