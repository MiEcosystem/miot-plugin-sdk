/**
 *
 * @param {number} length
 * @param {bool} zeroPrefix 是否前补0
 * @param {bool} fromZero 是否从0开始
 */
function constructArray(length, zeroPrefix = true, fromZero = false) {
  const maxLength = (length - (fromZero ? 1 : 0)).toString().length;
  return Array.from({
    length
  }, (v, i) => ((zeroPrefix ? '0000000000000' : '') + (i + (fromZero ? 0 : 1))).slice(-maxLength));
}
/**
 * 是否是闰年
 * @param {number} y
 */


function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 && year % 3200 !== 0;
}
/**
   * 比较`Date`时间数组的时间前后 ['2017','06','01'] > ['2017','05','31']
   * @param {array} arrA
   * @param {array} arrB
   */


function compareDateArray(arrA, arrB) {
  return Number(arrA.join('')) - Number(arrB.join(''));
}

export { constructArray, isLeapYear, compareDateArray };