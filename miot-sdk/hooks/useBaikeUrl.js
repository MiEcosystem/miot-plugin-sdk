import { useState, useEffect } from 'react';
import { Service, Device } from 'miot';
const cachedBaikeUrls = {};
function getBaikeUrl(model = Device.model) {
  if (cachedBaikeUrls[model] !== null) {
    return Promise.resolve(cachedBaikeUrls[model]);
  }
  return Service.getServerName().then(({ countryCode }) => {
    if ((countryCode || '').toLowerCase() === 'cn') {
      return fetch(`https://home.mi.com/newoperation/productBaike?model=${ model }`);
    }
    cachedBaikeUrls[model] = '';
    return Promise.reject(cachedBaikeUrls[model]);
  }).then((res) => {
    return res.json();
  }).then(({ code, data }) => {
    cachedBaikeUrls[model] = code === 0 ? data?.baikeUrl : '';
    return cachedBaikeUrls[model];
  }).catch(() => {});
}
export default function useBaikeUrl(model = Device.model) {
  const [baikeUrl, setBaikeUrl] = useState(cachedBaikeUrls[model]);
  useEffect(() => {
    getBaikeUrl(model).then((url) => {
      setBaikeUrl(url || '');
    }).catch(() => {});
  }, [model]);
  return baikeUrl;
}