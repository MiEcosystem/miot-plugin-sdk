import { useState, useEffect } from 'react';
import { Device, DeviceEvent, Bluetooth } from 'miot';
export const State = {
  IDLE: 0,
  BT: 1,
  MESH: 2
};
export default function useGatewayStatus() {
  const [status, setStatus] = useState(State.IDLE);
  useEffect(() => {
    const listener = DeviceEvent.deviceStatusChanged.addListener(() => {
      isConnected.then((connected) => {
        setStatus(getStatus(connected));
      }).catch(() => {});
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return status;
}
function getStatus() {
  const type = Device.type;
  if (!isConnected) {
    return State.IDLE;
  }
  if (['16'].includes(type)) {
    return State.MESH;
  }
  if (['6', '8'].includes(type)) {
    return State.BT;
  }
  return State.IDLE;
}
function isConnected() {
  const { isOwner, isOnline, mac } = Device;
  if (!isOwner) {
    return Promise.resolve(isOnline);
  }
  return Bluetooth.isBleOrMeshGatewayConnected(mac, true).then((gatewayStatus) => {
    const gatewayConnected = gatewayStatus?.code === 0 && gatewayStatus?.data?.connected;
    return !!gatewayConnected;
  }).catch(() => {
    return false;
  });
}