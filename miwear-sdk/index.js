import HostInstance from './host/Host';
import EcoHostInstance from './eco/EcoHost';
import EcoRootDevice from './eco/device/BasicDevice';
import DataCenterInstance from './MIWDataCenter';
export const Host = HostInstance;
export const EcoHost = EcoHostInstance;
export const EcoDevice = EcoRootDevice;
export const DataCenter = DataCenterInstance;
export default {
  Host,
  EcoHost,
  EcoDevice,
  DataCenter,
};