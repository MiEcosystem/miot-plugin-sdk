import native from './ecoNative';
/**
 * Eco的接口服务
 * 
*/
export default class ECOService {
  static callOtaSeivice(url, did, params, method) {
    return new Promise((resolve, reject) => {
      native.ECOService.callApi(url, did, params, method, (isSuccess, response) => {
        console.log("suc", isSuccess);
        if (isSuccess && response) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }
}