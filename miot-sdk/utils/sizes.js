//@native begin
import {Dimensions} from 'react-native';
import Host from '../Host';
import {NOOP} from './fns';
let {width, height} = Dimensions.get('window');
if(Host.isAndroid) {
  Host.getPhoneScreenInfo().then(res => {
    width = res.viewWidth;
    height = res.viewHeight;
  }).catch(NOOP);
}
export const window = {
  get width() {return width;},
  get height() {return height;}
};
// UI尺寸适配
// 3X图
export function adjustSize(n) {
  return n / 1080 * window.width;
}
//@native end