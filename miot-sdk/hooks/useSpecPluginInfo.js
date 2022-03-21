import { useState, useEffect } from 'react';
import { Service } from 'miot';
let specPluginInfo = {
  hasSpecPlugin: false,
  defaultPluginType: 1
};
export default function useSpecPluginInfo() {
  const [info, setInfo] = useState(specPluginInfo);
  function setDefaultPluginType(type) {
    Service.smarthome.setHomepageSettings({ homepage_type: type });
    specPluginInfo = {
      ...specPluginInfo,
      defaultPluginType: type
    };
    setInfo(specPluginInfo);
  }
  useEffect(() => {
    Service.smarthome.getHomepageSettings().then((res) => {
      if (res && res.data) {
        specPluginInfo = {
          hasSpecPlugin: res.data.standardized,
          defaultPluginType: res.data.homepage_type
        };
        setInfo(specPluginInfo);
      }
    }).catch(() => {});
  }, []);
  return [info, setDefaultPluginType];
}