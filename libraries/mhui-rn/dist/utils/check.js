import { NativeModules, Platform } from 'react-native';
const {
  MIOTPackage
} = NativeModules;
export const isMiHome = !!MIOTPackage;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';