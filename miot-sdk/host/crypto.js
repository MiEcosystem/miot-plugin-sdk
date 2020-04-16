/**
 * @export public
 * @doc_name 加密模块
 * @doc_index 3
 * @doc_directory host
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
import tr from "../resources/strings/tr";
import { report } from "../decorator/ReportDecorator";
/**
 * 加密
 * @interface
 *
 */
class ICrypto {
  /**
   * MD5 编码
   * @param {string} content 需要编码的字符串
   * @returns {Promise<string>} 使用md5编码后的字符串
   */
  @report
  encodeMD5(content) {
     return Promise.resolve('');
  }
  /** 
   * base64 编码
   * @param {string} content 需要编码的字符串
   * @returns {Promise<string>} 使用base64编码后的字符串
   */
  @report
  encodeBase64(content) {
     return Promise.resolve('');
  }
  /**
   * base64解码
   * @param {string} content 需要解码的字符串
   * @returns {Promise<string>} 使用base64解码后的字符串
   */
  @report
  decodeBase64(content) {
     return Promise.resolve('');
  }
  /**
   * SHA1 编码
   * @param {string} content 需要编码的字符串
   * @returns {Promise<string>} 使用SHA1编码后的字符串
   */
  @report
  encodeSHA1(content) {
     return Promise.resolve('');
  }
  /**
   * SHA256 编码
   * @param {string} content 需要编码的字符串
   * @returns {Promise<string>} 使用SHA256编码后的字符串
   */
  @report
  encodeSHA2(content) {
     return Promise.resolve('');
  }
  /**
    * @deprecated
    * @description 该接口从10032开始废弃，建议使用{@see robotCleanerMapColorsToImageBase64 }代替
    *  api_level 10001
    * 扫地机的地图转换, base64文件内容转成图片
    * @since 10001
    * @param {string} content 地图文件
    * @param {string} colorMStr 墙色值
    * @param {string} color0Str 背景色值
    * @param {string} color1Str 已发现区域色值
    * @returns {Promise<any>} 使用base64编码后的图片数据(Android是string类型)
  */
  @report
  colorsToImageBase64(content, colorMStr, color0Str, color1Str) {
     return Promise.resolve('');
  }
  /**
    *  api_level 10032
    * 扫地机的地图转换, base64文件内容转成图片
    * @since 10032
    * @param {string} content 地图文件,使用base64编码,编码前地图文件是byte数组
    * @param {string} colorMStr 墙色值
    * @param {string} color0Str 背景色值
    * @param {string} color1Str 已发现区域色值
    * @returns {Promise<any>} 使用base64编码后的图片数据(Android是string类型)
  */
  @report
  robotCleanerMapColorsToImageBase64(content, colorMStr, color0Str, color1Str) {
     return Promise.resolve('');
  }
  /**
   * @deprecated
   * @description 该接口从10032开始废弃，建议使用{@see robotCleanerMapPointsToImageBase64 }代替
   * ApiLevel: 10020
   * @since 10020
   * 2019.05.16  针对第三方要求新增的接口
   * 扫地机的地图转换
   * 根据点集合长宽以及每个点对应的颜色值生成bitmap并返回其base64字符串
   * @param {int} width : 图片宽度
   * @param {int} height : 图片高度
   * @param {string} points : 点集合字符串
   * @param {string} colorsMap : 点值与颜色之间对应关系JSON字符串
   * -1 墙 #666666
   * 0 背景 #E6EAEE
   * 1 发现区域 #C6D8FA
   * >=10 房间区域
   */
  @report
  pointsToImageBase64(width, height, points, colorsMap) {
     return Promise.resolve('');
  }
  /**
   * ApiLevel: 10032
   * @since 10032
   * 2019.05.16  针对第三方要求新增的接口
   * 扫地机的地图转换
   * 根据点集合长宽以及每个点对应的颜色值生成bitmap并返回其base64字符串
   * @param {int} width : 图片宽度
   * @param {int} height : 图片高度
   * @param {string} points : 点集合字符串，如 ‘1,2,3,4,5,6,7’
   * @param {string} colorsMap : 点值与颜色之间对应关系JSON字符串 
   *        值得注意的是，需要传递8位深度的颜色值，其中头两位代表alpha通道，后六位代表rgb通道
   *        例如 #FFFF0000 代表红色
   *        建议值： -1 墙 #FF666666
   *                0 背景 #FFE6EAEE
   *                1 发现区域 #FFC6D8FA
   *                >=10 房间区域
   * @returns {Promise<string>} 使用base64编码后的图片数据
   */
  @report
  robotCleanerMapPointsToImageBase64(width, height, points, colorsMap) {
     return Promise.resolve('');
  }
  /**
   * @deprecated
   * @description 该接口从10032开始废弃，建议使用{@see robotCleanerPointsScaleToImageBase64 }代替
   * ApiLevel: 10023
   * @since 10023
   * 2019.05.16  针对第三方要求新增的接口
   * 扫地机的地图转换
   * 根据点集合长宽以及每个点对应的颜色值生成bitmap并返回其base64字符串
   * @param {int} width : 图片宽度
   * @param {int} height : 图片高度
   * @param {string} points : 点集合字符串
   * @param {string} colorsMap : 点值与颜色之间对应关系JSON字符串
   * @param {int} scale : 缩放比例
   * -1 墙 #666666
   * 0 背景 #E6EAEE
   * 1 发现区域 #C6D8FA
   * >=10 房间区域
   */
  @report
  pointsScaleToImageBase64(width, height, points, colorsMap, scale) {
     return Promise.resolve('');
  }
  /**
 * ApiLevel: 10032
 * @since 10032
 * 2019.05.16  针对第三方要求新增的接口
 * 扫地机的地图转换
 * 根据点集合长宽以及每个点对应的颜色值生成bitmap并返回其base64字符串
 * @param {int} width : 图片宽度
 * @param {int} height : 图片高度
 * @param {string} points : 点集合字符串
 * @param {string} colorsMap : 点值与颜色之间对应关系JSON字符串
 * @param {int} scale : 缩放比例
 * -1 墙 #666666
 * 0 背景 #E6EAEE
 * 1 发现区域 #C6D8FA
 * >=10 房间区域
 * @returns {Promise<string>} 使用base64编码后的图片数据
 */
  @report
  robotCleanerPointsScaleToImageBase64(width, height, points, colorsMap, scale) {
     return Promise.resolve('');
  }
}
const CryptoInstance = new ICrypto();
export default CryptoInstance;