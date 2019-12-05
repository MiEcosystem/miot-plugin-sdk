//@native begin
// 跨view的数据，类似global，用于页面数据共享
const data = new Map();
export default {
  get(key) {
    if(key === undefined) {
      return undefined;
    }
    return data.get(key);
  },
  set(key, value) {
    if(key === undefined) {
      return;
    }
    data.set(key, value);
  }
};
//@native end