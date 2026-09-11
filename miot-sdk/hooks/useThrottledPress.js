import { useRef, useCallback } from 'react';
/**
 * 防重复点击 hook，适用于打开原生弹框、跳转页面等不可重入操作。
 * @param {Function} fn - 点击回调
 * @param {number} [delay=1000] - 节流间隔（ms）
 * @returns {Function} 包装后的 onPress
 */
export default function useThrottledPress(fn, delay = 1000) {
  const lockRef = useRef(false);
  return useCallback((...args) => {
    if (lockRef.current) {
      return;
    }
    lockRef.current = true;
    fn?.(...args);
    setTimeout(() => {
      lockRef.current = false;
    }, delay);
  }, [fn, delay]);
}