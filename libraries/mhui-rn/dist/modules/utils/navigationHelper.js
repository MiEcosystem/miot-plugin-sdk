// @ts-nocheck

/* eslint-disable */
let CachedNavigations = [];
export function setNavigation(navigation) {
  CachedNavigations.push(navigation);
}
export function getNavigation() {
  return CachedNavigations[CachedNavigations.length - 1];
}
export function wrapBackWithViewName(RouterStack) {
  const defaultGetStateForAction = RouterStack.router.getStateForAction;

  RouterStack.router.getStateForAction = (action, state) => {
    // goBack返回指定页面
    if (state && action.type === 'Navigation/BACK' && action.key) {
      const backRoute = state.routes.find(route => route.routeName === action.key);

      if (backRoute) {
        const backRouteIndex = state.routes.indexOf(backRoute);
        const purposeState = { ...state,
          routes: state.routes.slice(0, backRouteIndex + 1),
          index: backRouteIndex
        };
        CachedNavigations = CachedNavigations.slice(0, backRouteIndex + 1);
        return purposeState;
      }
    }

    if (action.type === 'Navigation/COMPLETE_TRANSITION' && state) {
      setTimeout(() => {
        CachedNavigations = CachedNavigations.slice(0, state.index + 1);
      });
    }

    return defaultGetStateForAction(action, state);
  };

  return RouterStack;
}