import { DeviceEventEmitter } from "react-native";
import EcoBlueTooth, { EcoBlePacketScaleDataID, EcoBlePacketType } from "./EcoBlueTooth";
export const ScaleBusCode = {
  COMMON: 0,
  INFANT: 1,
  BALANCE: 2,
  WEIGHT: 3
};
export const ScaleBusEvent = {
  WEIGHT_PROCEDURE_DATA_UPDATE: 'weightData',
  BODY_COMPOSITION_DATA_UPDATE: 'bodyComposition',
  CHILD_USER_DATA_UPDATE: 'userIno',
  SCALE_INFANT_DATA_UPDATE: 'babyResData',
  SCALE_BALANCE_DATA_UPDATE: 'balanceData'
};
const BusEmitter = {
  addListener(name, callback) {
    DeviceEventEmitter.addListener(name, callback);
  },
  emit(name, ...args) {
    DeviceEventEmitter.emit(name, ...args);
  },
  remove(name) {
    DeviceEventEmitter.removeAllListeners(name);
  }
};
export const onBusEvent = {};
export const EcoScaleBus = {
  useScaleFunc(busCode, callback) {
    console.log('useScaleFunc busCode >>>> ', busCode);
    const modeData = {
      "workMode": busCode
    };
    EcoBlueTooth.sendPacket(EcoBlePacketScaleDataID.changeMode, EcoBlePacketType.ScaleData, modeData).then((res) => {
      console.log('changeMode invoked res >>>> ', res);
      callback && callback(res);
    }).catch((error) => {
      console.log("error", error);
      callback && callback(error);
    });
  },
  registerBusEventListener(busEvent, callback) {
    console.log('registerBusListener busEvent >>>> ', busEvent);
    if (!onBusEvent[busEvent]) {
      onBusEvent[busEvent] = [];
    }
    onBusEvent[busEvent].push(callback);
    BusEmitter.addListener(busEvent, (info) => {
      console.log('registerBusListener info >>>> ', info);
      onBusEvent[busEvent].forEach((callback) => {
        callback(info);
      });
    });
  },
  unregisterBusEventListener(busEvent) {
    console.log('unregisterBusListener busEvent >>>> ', busEvent);
    if (!onBusEvent[busEvent]) {
      return;
    }
    onBusEvent[busEvent] = [];
    BusEmitter.remove(busEvent);
  },
  removeAllBusEventListener() {
    console.log('removeAllBusEventListener >>>> ', onBusEvent);
    Object.keys(onBusEvent).forEach((busEvent) => {
      EcoScaleBus.unregisterBusEventListener(busEvent);
    });
  }
};