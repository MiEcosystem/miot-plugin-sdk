/**
 * @since 10070
 * @doc_name 小爱
 * @description 提供给小爱使用的相关API
 */
import native from '../native/index';
/**
 * @export
 */
export declare class IXiaoai {
  /**
   * @param params 透传
   * @since 10070
   * @returns Promise
   */
  showQQMusicAuthAlert(params?: object): Promise<object>
  /**
   * @since 10072
   * 获取QQ音乐绑定信息
   * @param {jsonObject} params 传递的jsonObject对象参数
   * @example
   * let params={
   *  clientId: xx, ||设备在小米账号平台注册的id
   *  aiAppId: xx,  ||小爱开放平台 appId
   *  deviceId: xx  ||对应的设备id
   * }
   * service.xiaoai.fetchQQMusicBindInfo(params);
   *  * @returns {object} 成功时，返回：
   * { code: 0,
   *    data: {
   *     state: xx,
   *     qqMusicOpenId: xx,
   *     authStr: xx
   *    }
   * }
   * 当 state = binded, qqMusicOpenId 会有值, authStr 无值
   * 当 state = unbinded 时， qqMusicOpenId 无值, authStr 有值，可用于唤醒QQ音乐客户端
   * 失败时，返回：透传
   * { code: xx, message: 'xx' }
   */
  fetchQQMusicBindInfo(params?: object): Promise<object>;
  /**
   * @since 10072
   * 绑定且登录QQ音乐
   * @param {jsonObject} params 传递的jsonObject对象参数
   * @example
   * let params={
   *  clientId: xx,
   *  aiAppId: xx,
   *  deviceId: xx
   * packageName': xx 设备方的包名
   *  title: xx  //QQ音乐登录弹框顶部标题 为了标识给XX设备授权服务 传对应的设备名
   * }
   * service.xiaoai.loginQQMusic(params);
   *  * @returns {object} 成功时，返回：
   * { code: 0,
   *    data: {
   *     code: xx,
   *     msg: xx
   *    }
   * }
   * 当 code = 0, 绑定成功 非0表示失败
   * 失败时，返回：透传
   * { code: xx, message: 'xx' }
   */
  loginQQMusic(params ?: object): Promise<object>;
  /**
   * @since 10072
   * 解绑QQ音乐
   * @param {jsonObject} params 传递的jsonObject对象参数
   * @example
   * let params={
   *  clientId: xx,
   *  aiAppId: xx,
   *  deviceId: xx
   * }
   * service.xiaoai.unbindQQMusicAccount(params);
   *  * @returns {object} 成功时，返回：
   * { code: 0,
   *    data: {
   *     code: xx,
   *     msg: xx
   *    }
   * }
   * 当 code = 0, 绑定成功 非0表示失败
   * 失败时，返回：透传
   * { code: xx, message: 'xx' }
   */
  unbindQQMusicAccount(params?: object): Promise<object>;
  /**
   * @since 10072
   * 获取QQ音乐账号信息 包括昵称 头像等
   * @param {jsonObject} params 传递的jsonObject对象参数
   * @example
   * let params={
   *  aiAppId: xx,
   *  deviceId: xx
   * }
   * service.xiaoai.fetchQQMusicAccountInfo(params);
   *  * @returns {object} 成功时，返回：
   * { code: 0,
   *    data: {
   *     headImageUrl: xx,
   *     nickname: xx,
   *    }
   * }
   * 失败时，返回：透传
   * { code: xx, message: 'xx' }
   */
  fetchQQMusicAccountInfo(params?: object): Promise<object>;
  /**
   * @since 10074
   * 小爱服务端请求服务(非音箱)(http://passport.d.xiaomi.net/doc/oauth/oauth-v2-api.html 授权码模式鉴权 会弹出授权确认框)
   * @param {jsonObject} params 传递的jsonObject对象参数
   * @example
   * let params={
   *  clientId: xx,           ||设备在小爱开放平台注册的id 必填
   *  redirectUrl: xx,        ||设备在小爱开放平台注册的回调地址 必填
   *  clientSecret: xx,       ||设置在小爱开放平台生成的app_secret 必填
   *  requestUrl: xx,         ||请求的接口路径(完整的接口路径包括host和path 例如https://xx/xx) 必填
   *  requestType: xx,        ||请求方式 get/post/put/delete 不传默认为get方式
   *  requestParams: xx       ||请求接口对应的参数 (jsonObject)
   *  contentType: xx         ||contentType put和post方法默认是以表单方式提交参数，即Content-Type为application/x-www-form-urlencoded，如果想以application/json的方式，请传入'json'
   * }
   * service.xiaoai.callXiaoaiServiceAPI(params);
   *  * @returns {object} 成功时，返回：
   * { code: 0,
   *    data: {
   *      url: "https://... " //接口返回的透传数据
   *    }
   * }
   * 失败时，返回：透传
   * { code: xx, message: 'xx' }
   */
  callXiaoaiServiceAPI(params?: object): Promise<object>;
  /**
   * @since 10105
   * 设置小爱认证信息（预留方法，10105暂不需要）
   * @see {@link callXiaoaiTTS }
   * @param params 传递的jsonObject对象参数
   * @example
   * let params={
   *  clientId: xx,
   *  signSecret: xx,
   *  ApiKeyName: xx,
   *  ApiKey: xx,
   *  CertMD5: xx,
   *  CertSHA256: xx,
   * }
   * @returns
   *    成功时：
   *    { code: 0}
   *    失败时：
   *    { code: xx, message: 'xx' }
   */
  setXiaoaiTTSAuth(params?: object): Promise<object>;
  /**
   * @since 10105
   * 调用小爱SDK，将文本转为语音MP3文件。
   * @param params 传递的jsonObject对象参数
   * @example
   * let params={
   *  text: xx,           || 需要转成MP3的文字 必填
   *  role: xx,           || male，female 选填
   *  clientId: xx,       || 小爱鉴权（预留字段，10105暂不需要） @see {@link setXiaoaiTTSAuth }
   * }
   * @returns
   *    成功时：
   *    { code: 0, data: {
   *      // 返回的mp3文件下载地址 https:// ...
   *    }}
   *    失败时：
   *    { code: xx, message: 'xx' }
   */
  callXiaoaiTTS(params?: object): Promise<object>;
}
declare const IXiaoaiInstance: IXiaoai;
export default IXiaoaiInstance;