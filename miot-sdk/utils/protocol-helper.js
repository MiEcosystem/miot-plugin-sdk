import Device from "../device/BasicDevice";
import Service from "../Service";
import native from "../native";
let resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
export default class ProtocolManager {
  static _legalInfoAuthHasShowed = false;
  static _UniUrl = 'https://home.mi.com/miot/activity/privacy/index.html';
  static getLegalAuthInfoProtocol() {
    return new Promise((resolve, reject) => {
      let { model } = Device;
      let plugin_id = native.MIOTPackage.pluginID;
      let plugin_version = native.MIOTPackage.version;
      let language = native.language;
      Service.getServerName().then(({ countryCode: country }) => {
        let baseParams = {
          model,
          plugin_id,
          plugin_version,
          country,
          language
        };
        let params = [1, 2, 3].map(type_int => {
          return {
            ...baseParams,
            type_int
          };
        });
        Promise.all(params.map(p => {
          return Service.smarthome.getProtocolUrls(p);
        })).then(([privacy, agreement, experiencePlan]) => {
          privacyURL = privacy.html_url ? this._resolveUniUrlV2(this._UniUrl, params[0]) : '';
          agreementURL = agreement.html_url ? this._resolveUniUrlV2(this._UniUrl, params[1]) : '';
          experiencePlanURL = experiencePlan.html_url ? this._resolveUniUrlV2(this._UniUrl, params[2]) : '';
          resolve({
            privacyURL: privacyURL,
            agreementURL: agreementURL,
            hideAgreement: !agreementURL,
            experiencePlanURL: experiencePlanURL,
            hideUserExperiencePlan: !experiencePlanURL
          });
        }).catch(reject);
      }).catch(reject);
    });
  }
  static setLegalInfoAuthHasShowed(showed) {
    this._legalInfoAuthHasShowed = showed;
  }
  static getLegalInfoAuthHasShowed() {
    console.log('legalInfoAuthHasShowed :', this._legalInfoAuthHasShowed);
    return this._legalInfoAuthHasShowed;
  }
  static _resolveUniParamsV2(params) {
    let ret = [];
    for (let k in params) {
      if (params.hasOwnProperty(k)) {
        ret.push(`${k}=${params[k]}`);
      }
    }
    return ret.join('&');
  }
  static _resolveUniUrlV2(url, params) {
    if (!url) {
      return '';
    }
    return url + (url.indexOf('?') > -1 ? '&' : '?') + this._resolveUniParamsV2(params);
  }
  static resolveUrl(rawUrl) {
    let newUrl = resolveAssetSource(rawUrl);
    console.log('解析后的URL', newUrl);
    if (newUrl && (newUrl.uri || Array.isArray(newUrl))) {
      if (typeof newUrl.uri === 'string') {
        if (native.isAndroid) {
          return [{ uri: newUrl.uri }];
        } else {
          return newUrl.uri;
        }
      }
    }
  }
  static resolveUrlWithLink(url) {
    if (typeof url === 'string' && (/https?\:\/\//i).test(url)) {
      return native.isAndroid ? [{ uri: url }] : url;
    }
    return this.resolveUrl(url);
  }
}