import { 
  useEffect,
  useRef
} from 'react';
import deepEqual from '../utils/deepEqual';
const useDeepCompareEffect = (
  effect,
  deps
) => {
  
  const ref = useRef(undefined);
  if (!ref.current || !deepEqual(deps, ref.current)) {
    ref.current = deps;
  }
  useEffect(effect, ref.current);
};
export default useDeepCompareEffect;