//@native begin
import Resources, {Language} from '../resources';
const LANGUAGE = Resources.getLanguage();
// 空函数
export function NOOP() {}
// 打印参数
export function log(...args) {
  console.log(...args);
}
// 判断两个数组的元素相同
export function isSameArrayElements(a, b) {
  if(a === b) {
    return true;
  }
  if((!a && b) || (a && !b)) {
    return false;
  }
  if(a && b && a.length !== b.length) {
    return false;
  }
  for(let i = 0, l = a.length; i < l; i++) {
    let item = a[i];
    if(b.find(n => {
      return n === item;
    }) === undefined) {
      return false;
    }
  }
  return true;
}
// 获取数据类型
export function getType(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}
// 利用多语言模版进行字符串求值
// 不分语种
// export function getStringGenerator(template) {
//   let i18n = (Resources.createI18n({
//     [LANGUAGE]: {
//       text: template
//     }
//   }, LANGUAGE) || {}).strings;
//   return i18n.text;
// }
const StringGeneratorTypes = {
  normal: 'StringGeneratorTypes:normal',
  oneByOne: 'StringGeneratorTypes:oneByOne',
  compare: 'StringGeneratorTypes:compare'
};
function formatStringRet(template) {
  return function(...args) {
    let ret = template;
    args.forEach((a, index) => {
      ret = ret.replace(new RegExp('\\{' + (index + 1) + '\\}', 'g'), a);
    });
    return ret;
  }
}
function formatArrayRet(template, witch = 0) {
  let [first, ...rest] = template;
  if(!!witch) {
    return formatArrayNormal(template, witch);
  }
  switch(first) {
    case StringGeneratorTypes.oneByOne:
      return formatArrayOnebyOne(rest);
    case StringGeneratorTypes.compare:
      return formatArrayCompare(rest);
    case StringGeneratorTypes.normal:
    default:
      return formatArrayNormal(template, witch);
  }
}
function formatArrayNormal(template, witch = 0) {
  return function(...args) {
    let target = args[witch];
    for(let i = 1, l = template.length; i < l; i++) {
      let t = template[i];
      let type = getType(t);
      if(type !== 'Array') {
        return getStringGenerator([template[0], [target, t]], witch + 1)(...args);
      }
      if(type === 'Array' && target === t[0]) {
        let ttype = getType(t[1]);
        return getStringGenerator(
          ttype === 'Array' ? [template[0], ...t.slice(1)] : t[1],
          witch + 1
        )(...args);
      }
    }
    return getStringGenerator(template[0])(...args);
  }
}
function formatArrayOnebyOne(template) {
  return function(...values) {
    return getTemplateValueOneByOne(values, template);
  }
}
function formatArrayCompare(template) {
  return function(...values) {
    return getTemplateValueCompare(values, template);
  }
}
export function getStringGenerator(template, witch = 0) {
  if(!template) {
    return function() {return ''};
  }
  let type = getType(template);
  switch(type) {
    case 'String':
      return formatStringRet(template);
    case 'Array':
      return formatArrayRet(template, witch);
    case 'Function':
      return template;
    default:
      return function() {return ''};
  }
}
// console.log('getStringGeneratorTest', getStringGenerator('{1}---{2}')(3, 'oooooooo') === '3---oooooooo');
// console.log('getStringGeneratorTest', getStringGenerator(['{1}---{2}', [5, '{2}']])(3, 'oooooooo') === '3---oooooooo');
// console.log('getStringGeneratorTest', getStringGenerator(['{1}---{2}', [5, '{2}']])(5, 'oooooooo') === 'oooooooo');
// console.log('getStringGeneratorTest', getStringGenerator(['{1}---{2}', [5, [7, '-{1}--{2}']]])(5, 7) === '-5--7');
// console.log('getStringGeneratorTest', getStringGenerator(['{1}---{2}', [5, [7, [9, '-{2}-{1}']]]])(5, 7, 9) === '-7-5');
// console.log('getStringGeneratorTest', getStringGenerator(['{1}---{2}', [5, [7, [9, [true, 'true in 4'], [false, 'false in 4']]]]])(5, 7, 9, true) === 'true in 4');
// console.log('getStringGeneratorTest', getStringGenerator(['{1}---{2}', [5, [7, [9, [true, 'true in 4'], [false, 'false in 4']]]]])(5, 7, 9, false) === 'false in 4');
// console.log('getStringGeneratorTest', getStringGenerator(['{1}---{2}', [5, [7, [9, [true, 'true in 4'], [false, 'false in 4 with {2}-{3}']]]]])(5, 7, 9, false) === 'false in 4 with 7-9');
// 根据参数列表和模版，返回满足参数的值
// template格式为result 或[defaultValue, [result0, [indexX, valueX], [indexY, [valueY1, valueY2, ...]], ...], ...]
export function getTemplateValueOneByOne(values = [], template) {
  if(getType(template) !== 'Array') {
    return template;
  }
  let [defaultValue, ...rest] = template;
  let ret = defaultValue;
  for(let i = 0, l = rest.length; i < l; i++) {
    let [r, ...rs] = rest[i] || [];
    let notFitIndex = rs.findIndex(([index, result]) => {
      let v = values[index];
      let typeResult = getType(result);
      // 未定义时。抹平JSON把undefined转成null的情况
      if((v === undefined || v === null) && (result === undefined || result === null)) {
        return false;
      }
      // 为数组时，等于其中一个值即可
      if(typeResult === 'Array') {
        return result.findIndex(res => {
          return v === res || ((v === undefined || v === null) && (result === undefined || result === null));
        }) === -1;
      }
      return v !== result;
    });
    if(notFitIndex === -1 && rs.length !== 0) {
      ret = r;
      break;
    }
  }
  return ret;
}
// 根据参数列表和模版，进行对比，返回值
// template格式为result 或[defaultValue, [result0, [[indexX1, indexY1], [defaultValueX1, defaultValueY1], flag1], [[indexX2, indexY2], [defaultValueX2, defaultValueY2], flag2]]]
// flag取值为lt, lte, e, gte, gt
export function getTemplateValueCompare(values = [], template) {
  if(getType(template) !== 'Array') {
    return template;
  }
  let [defaultValue, ...rest] = template;
  let ret = defaultValue;
  for(let i = 0, l = rest.length; i < l; i++) {
    let [r, ...rs] = rest[i] || [];
    let notFitIndex = rs.findIndex(([[index1, index2], [defaultValue1 = undefined, defaultValue2 = undefined], flag = 'e']) => {
      let v1 = values[index1];
      if(v1 === undefined || v1 === null || v1 === '') {
        v1 = defaultValue1;
      }
      let v2 = values[index2];
      if(v2 === undefined || v2 === null || v2 === '') {
        v2 = defaultValue2;
      }
      if(v1 === undefined || v1 === null || v2 === undefined || v2 === null) {
        return true;
      }
      if(['lt', 'lte', 'e', 'gte', 'gt'].indexOf(flag) === -1) {
        flag = 'e';
      }
      return !(
        (flag === 'lt' && v1 < v2)
        || (flag === 'lte' && v1 <= v2)
        || (flag === 'e' && v1 === v2)
        || (flag === 'gte' && v1 >= v2)
        || (flag === 'gt' && v1 > v2)
      );
    });
    if(notFitIndex === -1 && rs.length !== 0) {
      ret = r;
      break;
    }
  }
  return ret;
}
// 补齐两位
export function fixNum(n) {
  return  ('00' + n).slice(-2);
}
//@native end