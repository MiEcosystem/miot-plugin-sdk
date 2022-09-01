import { useState, useEffect } from 'react';
import { Package, Device } from 'miot';
import { fetchPluginInfos } from '../utils/plugin-info';
export default function usePluginVersion(models = [Device.model]) {
  const { version } = Package;
  const [pluginVersion, setPluginVersion] = useState(version);
  useEffect(() => {
    fetchPluginInfos(models).then((plugins) => {
      const mergeVersion = (plugins || []).map((plugin) => {
        const { plugin_version = '0', status = '0' } = plugin || {};
        return `${ plugin_version }.${ status }`;
      }).join('-');
      setPluginVersion(mergeVersion);
      
    }).catch(() => {});
  }, []);
  return pluginVersion;
}