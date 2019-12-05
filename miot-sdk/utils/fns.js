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
// 补齐两位
export function fixNum(n) {
  return  ('00' + n).slice(-2);
}
//@native end