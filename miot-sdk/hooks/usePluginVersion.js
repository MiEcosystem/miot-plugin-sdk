import { useState, useEffect } from 'react';
import { Package, Device } from 'miot';
import { fetchPluginInfos } from '../utils/plugin-info';
export default function usePluginVersion(models = [Device.model], specifiedModel = '') {
  const { version } = Package;
  const [pluginVersion, setPluginVersion] = useState(version);
  useEffect(() => {
    fetchPluginInfos(models, specifiedModel ? [{ model: specifiedModel, version }] : []).then((plugins) => {
      const mergeVersion = (plugins || []).map((plugin) => {
        const { version: pluginVersion = '0', status = '0' } = plugin || {};
        return `${ pluginVersion }.${ status }`;
      }).join('-');
      setPluginVersion(mergeVersion);
      
    }).catch(() => {});
  }, []);
  return pluginVersion;
}