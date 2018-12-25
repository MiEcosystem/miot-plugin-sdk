/**
 * @export
 * @module miot/host/crypto
 * @description 
 * 加密模块
 * @example
 * import {Host} from 'miot'
 * ...
 * const str = '123'
 * //async
 * let md5 = await Host.crypto.endoceMD5(str)
 * 
 * //normal
 * Host.crypto.encodeMD5(str).then(res => {//md5 value is res})
 * ...
 */
export default {
  /**
   * MD5 编码
   * @param {string} content
   * @returns {Promise<string>}
   */
  encodeMD5(content) {
     return Promise.resolve('');
  },
  /** 
   * base64 编码
   * @param {string} content
   * @returns {Promise<string>}
   */
  encodeBase64(content) {
     return Promise.resolve('');
  },
  /**
   * base64解码
   * @param {string} content
   * @returns {Promise<string>}
   */
  decodeBase64(content) {
     return Promise.resolve('');
  },
  /**
   * SHA1 编码
   * @param {string} content
   * @returns {Promise<string>}
   */
  encodeSHA1(content) {
     return Promise.resolve('');
  },
  /**
   * SHA2 编码
   * @param {*} content
   */
  encodeSHA2(content) {
     return Promise.resolve('');
  },
};