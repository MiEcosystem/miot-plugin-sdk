/**
 * @export public
 * @doc_name 原生_加密模块
 * @doc_index 11
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
   * SHA256 编码
   * @param {*} content 需要编码的字符串
   * @returns {Promise<string>}
   */
  encodeSHA2(content) {
     return Promise.resolve('');
  },
  /**
   *  api_level 10001
    * 扫地机的地图转换, base64文件内容转成图片
    * @since 10001
    * @param content 地图文件
    * @param colorMStr 墙色值
    * @param color0Str 背景色值
    * @param color1Str 已发现区域色值
    * @returns {Promise<any>}
  */
  colorsToImageBase64(content, colorMStr, color0Str, color1Str) {
     return Promise.resolve('');
  },
  /**
   * ApiLevel: 10020
   * @since 10020
   * 2019.05.16  针对第三方要求新增的接口
   * 扫地机的地图转换
   * 根据点集合长宽以及每个点对应的颜色值生成bitmap并返回其base64字符串
   * @param width : 图片宽度
   * @param height : 图片高度
   * @param points : 点集合字符串
   * @param colorsMap : 点值与颜色之间对应关系JSON字符串
   * -1 墙 #666666
   * 0 背景 #E6EAEE
   * 1 发现区域 #C6D8FA
   * >=10 房间区域
   */
  pointsToImageBase64(width, height, points, colorsMap) {
     return Promise.resolve('');
  },
};