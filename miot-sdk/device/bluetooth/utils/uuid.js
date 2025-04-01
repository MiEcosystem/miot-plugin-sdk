import { isIOS } from '../../../native';
export const getBluetoothUUID128 = (id) => {
  if (!id || id == '') return null;
  id = id.toUpperCase();
  if (id.length > 8) return id;
  switch (id.length) {
    case 2: id = `000000${ id }`; break;
    case 4: id = `0000${ id }`; break;
    case 6: id = `00${ id }`; break;
    case 8: break;
    default:
      return null;
  }
  return `${ id }-0000-1000-8000-00805F9B34FB`;
};