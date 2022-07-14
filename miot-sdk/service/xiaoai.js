     return Promise.resolve(null);
  }
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
  loginQQMusic(params = {}) {
     return Promise.resolve(null);
  }
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
  unbindQQMusicAccount(params = {}) {
     return Promise.resolve(null);
  }
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
  fetchQQMusicAccountInfo(params = {}) {
     return Promise.resolve(null);
  }
}
const IXiaoaiInstance = new IXiaoai();
export default IXiaoaiInstance;