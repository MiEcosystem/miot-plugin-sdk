import { useState, useEffect } from 'react';
import Device from 'miot/device/BasicDevice';
import { BluetoothEvent } from 'miot/device/bluetooth/BluetoothDevice';
export const State = {
  NOTSUPPORT: -1,
  IDLE: 0,
  CONNECTING: 1,
  CONNECTED: 2
};
// let lastValue = _getState();
let lastValue = State.IDLE;
export default function useBleConnection() {
  const [state, setState] = useState(getValue());
  useEffect(() => {
    const listener = addListener((v) => {
      setState(v);
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return state;
}
export function getValue() {
  const newValue = _getState();
  lastValue = newValue;
  return lastValue;
}
export function addListener(cb) {
  return BluetoothEvent.bluetoothConnectionStatusChanged.addListener((bt) => {
    const newValue = _getState(bt);
    if (newValue !== lastValue) {
      lastValue = newValue;
      cb(lastValue);
    }
  });
}
function _getState(bt) {
  if (!_check()) {
    return State.NOTSUPPORT;
  }
  const { isConnected, isConnecting } = bt || Device.getBluetoothLE() || {};
  return isConnected ? State.CONNECTED : isConnecting ? State.CONNECTING : State.IDLE;
}
function _check() {
  const { DEVICE_TYPE, type } = Device;
  return [
    DEVICE_TYPE.BLUETOOTH_SINGLE_MODEL_DEVICE,
    DEVICE_TYPE.DUAL_MODEL_DEVICE,
    DEVICE_TYPE.BLE_MESH_DEVICE
  ].includes(type);
}