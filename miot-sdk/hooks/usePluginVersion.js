import { useState, useEffect } from 'react';
import Device from 'miot/device/BasicDevice';
import native from 'miot/native';
import { fetchPluginInfos } from '../utils/plugin-info';
export default function usePluginVersion(models = [Device.model], specifiedModel = '') {
  const { version } = native.MIOTPackage;
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