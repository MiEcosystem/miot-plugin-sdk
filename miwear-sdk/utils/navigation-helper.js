// 防止连续点击导致的页面多次跳转
let lastNavigationTime = undefined;
export const jumpToPage = (navigation, page, params, interval = 1000) => {
  // 上次点击时间与本次点击时间差在1000毫秒内 该事件被拦截
  if (lastNavigationTime + interval >= Date.now()) {
    return;
  }
  lastNavigationTime = Date.now();
  if (navigation) {
    navigation.navigate(page, params);
  }
};