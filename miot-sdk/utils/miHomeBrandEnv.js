import Service from "../Service";
export const MI_HOME_BRAND_ENV = {
  RELEASE: 'release',
  ST: 'st',
  PV: 'pv',
  P1: 'p1',
  AT: 'at',
};
const currentMiHomeBrandEnv = Service.getDevSerEnv() || MI_HOME_BRAND_ENV.RELEASE;
function resolveMiHomeBrandDomain(env) {
  switch (env) {
    case MI_HOME_BRAND_ENV.AT:
      return 'at.home.mi.com';
    case MI_HOME_BRAND_ENV.PV:
      return 'preview.home.mi.com';
    case MI_HOME_BRAND_ENV.RELEASE:
    case MI_HOME_BRAND_ENV.ST:
    case MI_HOME_BRAND_ENV.P1:
    default:
      return 'home.mi.com';
  }
}
export const miHomeBrandCurrentEnv = currentMiHomeBrandEnv;
export const miHomeBrandDomain = resolveMiHomeBrandDomain(currentMiHomeBrandEnv);
export const miHomeUrl = `https://${ miHomeBrandDomain }`;
export default {
  MI_HOME_BRAND_ENV,
  miHomeBrandCurrentEnv,
  miHomeBrandDomain,
  miHomeUrl,
};