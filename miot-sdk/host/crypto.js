/**
 * @export public
 * @doc_name 原生_加密模块
 * @doc_index 9
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
   * @param {string} content 需要编码的字符串
   * @returns {Promise<string>}
   */
  encodeMD5(content) {
     return Promise.resolve('');
  },
  /** 
   * base64 编码
   * @param {string} content 需要编码的字符串
   * @returns {Promise<string>}
   */
  encodeBase64(content) {
     return Promise.resolve('');
  },
  /**
   * base64解码
   * @param {string} content 需要解码的字符串
   * @returns {Promise<string>}
   */
  decodeBase64(content) {
     return Promise.resolve('');
  },
  /**
   * SHA1 编码
   * @param {string} content 需要编码的字符串
   * @returns {Promise<string>}
   */
  encodeSHA1(content) {
     return Promise.resolve('');
  },
  /**
<<<<<<< HEAD
   * SHA256 编码
   * @param {*} content
=======
   * SHA2 编码
   * @param {*} content 需要编码的字符串
   * @returns {Promise<string>}
>>>>>>> add docks
   */
  encodeSHA2(content) {
     return Promise.resolve('');
  },
  /**
   *  api_level 10001
    * 扫地机的地图转换, base64文件内容转成图片
    * @param content 地图文件
    * @param colorMStr 墙色值
    * @param color0Str 背景色值
    * @param color1Str 已发现区域色值
    * @returns {Promise<any>}
  */
  colorsToImageBase64(content, colorMStr, color0Str, color1Str) {
     return Promise.resolve('');
  },
};