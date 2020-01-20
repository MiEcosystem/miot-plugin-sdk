//@native begin
export const ColorGreen = '#00B7A2';
export const ColorOrange = '#FFA943';
export const ColorRed = '#FC675F';
// 十六进制格式的颜色补齐为#rrggbb的格式
export function fixHex(hex) {
  hex = hex.replace(/[^0-9a-fA-F]/, '').split('');
  let length = hex.length;
  if(length < 6) {
    hex = [hex[0] || 0, hex[0] || 0, hex[1] || 0, hex[1] || 0, hex[2] || 0, hex[2] || 0];
  }
  hex = '#' + hex.slice(0, 6).join('');
  return hex.toUpperCase();
}
// 十六进制格式的颜色，获取其十进制色值
export function transformHexToDigtal(hex) {
  hex = fixHex(hex).slice(1);
  return parseInt(hex, 16);
}
// 十进制色值，获取其十六进制格式
export function transformDigtalToHex(digtal) {
  return ('#' + ('000000' + digtal.toString(16)).slice(-6)).toUpperCase();
}
// 十六进制颜色值分离出r,g,b的十进制值
function splitRgb(color) {
  color = fixHex(color);
  let [_1, r1, r2, g1, g2, b1, b2] = color.split('');
  let r = parseInt(r1 + r2, 16);
  let g = parseInt(g1 + g2, 16);
  let b = parseInt(b1 + b2, 16);
  return {
    r, g, b
  };
}
// 给定一套渐变色关键点，获取两个方法
// 1.getColorFromPercent:根据百分比位置获取对应颜色
// 2.getPercentFromColor:根据颜色获取对应百分比位置
// range = {
//   '0.00': '#f00',
//   '0.23': '#0f0',
//   '1.00': '#00f'
// }
export function colorGetterforRange(range) {
  let colors = formatColors(range);
  function formatColors(range) {
    let colors = [];
    for(let k in range) {
      if(range.hasOwnProperty(k)) {
        let p = parseFloat(k);
        let c = fixHex(range[k]);
        if(typeof p === 'number' && p >= 0 && p <= 1) {
          colors.push([p, c]);
        }
      }
    }
    colors.sort((a, b) => {
      return a[0] > b[0] ? 1 : -1;
    });
    if(colors.length < 1) {
      colors = [[0, '#000000'], [1, '#ffffff']];
    }
    if(colors[0][0] > 0) {
      colors[0] = [0, colors[0][1]];
    }
    if(colors[colors.length - 1][0] < 1) {
      colors[colors.length - 1] = [1, colors[colors.length - 1][1]];
    }
    return colors;
  }
  function getColorFromPercent(p) {
    p = Math.max(0, Math.min(1, p / 100));
    let s1 = null, s2 = null;
    for(let i = 1, l = colors.length; i < l; i++) {
      let c = colors[i];
      let cp = colors[i - 1];
      if(cp[0] <= p && c[0] >= p) {
        s1 = cp;
        s2 = c;
        break;
      }
    }
    if(s1[0] >= s2[0]) {
      return s1[1];
    }
    let p0 = ((p - s1[0]) / (s2[0] - s1[0]));
    let {r: r1, g: g1, b: b1} = splitRgb(s1[1]);
    let {r: r2, g: g2, b: b2} = splitRgb(s2[1]);
    let r = parseInt(p0 * r2 + (1 - p0) * r1, 10);
    let g = parseInt(p0 * g2 + (1 - p0) * g1, 10);
    let b = parseInt(p0 * b2 + (1 - p0) * b1, 10);
    return '#' + ('00' + r.toString(16)).slice(-2) + ('00' + g.toString(16)).slice(-2) + ('00' + b.toString(16)).slice(-2);
  }
  function getPercentFromColor(color) {
    let {r, g, b} = splitRgb(color);
    for(let i = 0, l = 1000; i < l; i++) {
      let c = getColorFromPercent(i / 10);
      let {r: rc, g: gc, b: bc} = splitRgb(c);
      if(Math.abs(r - rc) <= 5 && Math.abs(g - gc) <= 5 && Math.abs(b - bc) <= 5) {
        return i / 10;
      }
    }
    return 50;
  }
  return {
    getColorFromPercent,
    getPercentFromColor
  };
}
//@native end