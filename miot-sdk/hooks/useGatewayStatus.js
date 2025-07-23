import { useState, useEffect } from 'react';
import Device, { DeviceEvent } from 'miot/device/BasicDevice';
import Bluetooth from 'miot/device/bluetooth';
export const State = {
  IDLE: 0,
  BT: 1,
  MESH: 2
};
export default function useGatewayStatus() {
  const [status, setStatus] = useState(State.IDLE);
  function updateStatus() {
    isConnected().then((connected) => {
      setStatus(getStatus(connected));
    }).catch(() => {});
  }
  useEffect(() => {
    updateStatus();
    const listener = DeviceEvent.deviceStatusChanged.addListener(() => {
      updateStatus();
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return status;
}
function getStatus(connected) {
  const type = Device.type;
  if (!connected) {
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