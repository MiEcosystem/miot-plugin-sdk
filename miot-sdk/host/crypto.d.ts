/**
 * 椭圆曲线
 */
export class ECCCrypto {
    static CurveTypeSecp256r1: number;
    static CurveTypeSecp384r1: number;
    /**
     *
     * @param {number} curveType
     */
    constructor(curveType: number);
    curveType: number;
    /**
     * 生成公私钥对
     * @returns {Promise} 成功则返回public key，失败则返回 {code: -1, message: error}
     */
    generateKeyPair(): Promise<any>;
    uuid: any;
    /**
     * 生成shared secret
     * @param {String} otherPublicKey 另一方的publickey, base64 encoded string
     * @returns {Promise} 成功则返回shared secret，失败则返回 {code: -x, message: error}
     */
    generateSharedSecret(otherPublicKey: string): Promise<any>;
}
export default CryptoInstance;
declare const CryptoInstance: ICrypto;
/**
 * 加密
 * @interface
 *
 */
declare class ICrypto {
  /**
     * MD5 编码
     * @param {string} content 需要编码的字符串
     * @returns {Promise<string>} 使用md5编码后的字符串（Android返回的md5是小写字母，iOS是大写字母，插件可以做一下转换统一大小写）
     */
  encodeMD5(content: string): Promise<string>;
  /**
     * base64 编码
     * @param {string} content 需要编码的字符串
     * @returns {Promise<string>} 使用base64编码后的字符串
     */
  encodeBase64(content: string): Promise<string>;
  /**
     * base64解码
     * @param {string} content 需要解码的字符串
     * @returns {Promise<string>} 使用base64解码后的字符串
     */
  decodeBase64(content: string): Promise<string>;
  /**
     * SHA1 编码
     * @param {string} content 需要编码的字符串
     * @returns {Promise<string>} 使用SHA1编码后的字符串
     */
  encodeSHA1(content: string): Promise<string>;
  /**
     * SHA256 编码
     * @param {string} content 需要编码的字符串
     * @returns {Promise<string>} 使用SHA256编码后的字符串
     */
  encodeSHA2(content: string): Promise<string>;
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
  colorsToImageBase64(content: string, colorMStr: string, color0Str: string, color1Str: string): Promise<any>;
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
  robotCleanerMapColorsToImageBase64(content: string, colorMStr: string, color0Str: string, color1Str: string): Promise<any>;
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
     *        值得注意的是，需要传递8位深度的颜色值，其中头两位代表alpha通道，后六位代表rgb通道
     *        例如 #FFFF0000 代表红色
     *        建议值： -1 墙 #FF666666
     *                0 背景 #FFE6EAEE
     *                1 发现区域 #FFC6D8FA
     *                >=10 房间区域
     */
  pointsToImageBase64(width: int, height: int, points: string, colorsMap: string): Promise<string>;
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
  robotCleanerMapPointsToImageBase64(width: int, height: int, points: string, colorsMap: string): Promise<string>;
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
     *        值得注意的是，需要传递8位深度的颜色值，其中头两位代表alpha通道，后六位代表rgb通道
     *        例如 #FFFF0000 代表红色 #00FFFFFF 代表透明颜色
     *        建议值： -1 墙 #FF666666
     *                0 背景 #FFE6EAEE
     *                1 发现区域 #FFC6D8FA
     *                >=10 房间区域
     * @param {int} scale : 缩放比例
     */
  pointsScaleToImageBase64(width: int, height: int, points: string, colorsMap: string, scale: int): Promise<string>;
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
     *        值得注意的是，需要传递8位深度的颜色值，其中头两位代表alpha通道，后六位代表rgb通道
     *        例如 #FFFF0000 代表红色 #00FFFFFF 代表透明颜色
     *        建议值： -1 墙 #FF666666
     *                0 背景 #FFE6EAEE
     *                1 发现区域 #FFC6D8FA
     *                >=10 房间区域
     * @param {int} scale : 缩放比例
     * @returns {Promise<string>} 使用base64编码后的图片数据
     */
  robotCleanerPointsScaleToImageBase64(width: int, height: int, points: string, colorsMap: string, scale: int): Promise<string>;
  /**
     * ApiLevel: 10081
     * @since 10081
     * 针对robotCleanerPointsScaleToImageBase64接口做了性能优化 参数和之前接口相同(该方法目前只支持iOS)
     * 扫地机的地图转换
     * 根据点集合长宽以及每个点对应的颜色值生成bitmap并返回其base64字符串
     * @param {int} width : 图片宽度
     * @param {int} height : 图片高度
     * @param {string} points : 点集合字符串
     * @param {string} colorsMap : 点值与颜色之间对应关系JSON字符串
     *        值得注意的是，需要传递8位深度的颜色值，其中头两位代表alpha通道，后六位代表rgb通道
     *        例如 #FFFF0000 代表红色 #00FFFFFF 代表透明颜色
     *        建议值： -1 墙 #FF666666
     *                0 背景 #FFE6EAEE
     *                1 发现区域 #FFC6D8FA
     *                >=10 房间区域
     * @param {int} scale : 缩放比例
     * @returns {Promise<string>} 使用base64编码后的图片数据
     */
  robotCleanerPointsScaleToImageBase64V2(width: int, height: int, points: string, colorsMap: string, scale: int): Promise<string>;
  /**
     * for 追觅扫地机器人画图api
     * 扫地机地图转换，画图
     * @since 10035
     * @param {int} width : 图片宽度
     * @param {int} height : 图片高度
     * @param {string} traces: 点集合等信息
     * @returns {Promise<string>} 使用base64编码后的图片数据
     * 成功时：{"code":0, "data":"xxx" } // data 注意判断空值 返回的base64图片值不包括前缀 'data:image/png;base64'
     * 失败时：{"code":-1, "message":"points in json must has valid length" }
     *        {"code":-2, "message":"input parmas width or height must > 0" }
     *        {"code":-3, "message":"points in json must be valid array json string"}
     */
  zhuimiRobotTracesToImageBase64(width: int, height: int, traces: string): Promise<string>;
  /**
     * zhuimiRobotTracesToImageBase64方法根据厂商要求修改的第二版，为了不影响上一个API的使用，特此新开一个接口
     * 扫地机地图转换，画图
     * @since 10059
     * @param {int} width : 图片宽度
     * @param {int} height : 图片高度
     * @param {string} traces: 点集合等信息
     * @returns {Promise<string>} 使用base64编码后的图片数据
     * 成功时：{"code":0, "data":"xxx" } // data 注意判断空值 返回的base64图片值不包括前缀 'data:image/png;base64'
     * 失败时：{"code":-1, "message":"points in json must has valid length" }
     *        {"code":-2, "message":"input parmas width or height must > 0" }
     *        {"code":-3, "message":"points in json must be valid array json string"}
     */
  zhuimiRobotTracesToImageBase64V2(width: int, height: int, traces: string): Promise<string>;
  /**
     * @since 10054
     * 小黑板的路径数据转图片
     * @typedef {Object} PointObject
     * @param {<PointObject[]>} points : 路径所包含的点的数组{x:1,y:2,pressure:, state:{Int}}
     * @param {string} filename : 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt'
     * @param {string} type : 类型, image、pdf 或 video
     * @param {Object} params : 配置参数
     * @param {string} params.backgroundColor : 背景色 如 '#FFF'
     * @param {string} params.lineColor : 线条颜色 如 'blue'
     * @param {float} params.lineWidth : 线条宽度
     * @param {float} params.scale : 缩放参数
     * @param {Object} params.size : 画布大小 如 {width: 200, height:100}
     * @param {int} params.maxPressure : 最大压感
     * @param {int} params.pointsPerFrame : 帧数
     * @returns {Promise<Object>}
     *   成功时: {code:0, data: filepath} 绝对路径，可直接用于展示
     *   失败时: {
     *          code:100xx,     // 错误码，非0数字
     *          message:""      // 错误信息
     *        }
     */
  createMediaWithPoints(points: any, type: string, filename: string, params: {
        backgroundColor: string;
        lineColor: string;
        lineWidth: float;
        scale: float;
        size: any;
        maxPressure: int;
        pointsPerFrame: int;
    }): Promise<any>;
    /**
     * 杉川美化地图算法
     * @param base64Map{string} 地图数据的byte数组转成的Base64字符串
     * @param chain{Object} 一个数组
     * [
     *    {
     *       "roomID": 10,
     *       "pointCount": 93,
     *       "points": [
     *           {
     *               "x": 388,
     *               "y": 291,
     *               "value": -1
     *           }
     *       ]
     *    }
     * ]
     * @param params{Object} 配置参数
     * @param params.resolution{Double}
     * @param params.pixWidth{Int32}
     * @param params.pixHeight{Int32}
     * @param params.maxX{Double}
     * @param params.maxY{Double}
     * @param params.minX{Double}
     * @param params.minY{Double}
     */
  ijaiBeautifyMap(base64Map: string, chain: any, params: {
        resolution: Double;
        pixWidth: Int32;
        pixHeight: Int32;
        maxX: Double;
        maxY: Double;
        minX: Double;
        minY: Double;
    }): Promise<any>;
}