// @native start
import {getType} from './fns';
// 根据参数列表和模版，返回满足参数的值
export default function getTemplateValue(values = [], template) {
  if(getType(template) !== 'Array') {
    return template;
  }
  let [defaultValue, ...rest] = template;
  let ret = defaultValue;
  for(let i = 0, l = rest.length; i < l; i++) {
    let [r, ...rs] = rest[i] || [];
    let notFitIndex = rs.findIndex(([index, result]) => {
      return values[index] !== result;
    });
    if(notFitIndex === -1 && rs.length !== 0) {
      ret = r;
      break;
    }
  }
  return ret;
}
// @native end