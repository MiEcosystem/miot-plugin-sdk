export const HOST_TYPE_IOS: "ios";
export const HOST_TYPE_ANDROID: "android";
export namespace LocationAuthStatus {
    const LocationAuthStatus_NotDetermined: number;
    const LocationAuthStatus_Restricted: number;
    const LocationAuthStatus_Denied: number;
    const LocationAuthStatus_AuthorizedAlways: number;
    const LocationAuthStatus_AuthorizedWhenInUse: number;
    const LocationAuthStatus_Authorized: number;
}
declare namespace _default {
    const getPhysicsDimension: object;
    /**
       * 获取手机wifi信息;
       * 在Android上，从Android 9开始，获取WiFi信息需要申请定位权限，因此插件在调用该接口需要先判断是否有定位权限，没有就提示用户授权；否则就拿不到WiFi信息
       * @return {Promise<object>}
       * 成功时：{BSSID:xxx, SSID:xxx}
       * 失败时：返回的是错误信息，字符串格式
       * @example
       * Host.getWifiInfo()
       * .then(res => console.log("ssid and bssid = ", res.SSID, res.BSSID))
       * .catch((error)=>{
       *   console.log(error)
       * });
       */
    function getWifiInfo(): Promise<object>;
    /**
       * 获取手机wifi信息;
       * 在Android上，从Android 9开始，获取WiFi信息需要申请定位权限，因此插件在调用该接口需要先判断是否有定位权限，没有就提示用户授权；否则就拿不到WiFi信息
       * @return {Promise<object>}
       * 成功时：{BSSID:xxx, SSID:xxx}
       * 失败时：返回的是错误信息，字符串格式
       * @example
       * Host.getWifiInfo()
       * .then(res => console.log("ssid and bssid = ", res.SSID, res.BSSID))
       * .catch((error)=>{
       *   console.log(error)
       * });
       */
    function getWifiInfo(): Promise<object>;
    /**
       * 获取APP名称
       * @return {Promise<string>}
       *
       */
    function getAppName(): Promise<string>;
    /**
       * 获取APP名称
       * @return {Promise<string>}
       *
       */
    function getAppName(): Promise<string>;
    /**
       * 获取Android手机屏幕相关信息(包括状态栏高度)
       * @since 10012
       * @returns {Promise<object>} 手机屏幕相关信息 {'viewWidth':xxx, 'viewHeight':xxx, 'viewWidthPixel':xxx, 'viewHeightPixel':xxx}
       * viewWidth和viewHeight返回的都是dp值，若想使用px值还得使用PixelRatio.getPixelSizeForLayoutSize方法转化为px值
       * 但是在Pad小窗上时由于修改了scale值，所以转换出来的px值会偏小
       * 所以10056新增两个返回值viewWidthPixel和viewHeightPixel表示当前ReactView的宽高像素值，若想使用px值建议直接使用这两个值，不必再转换dp值
       */
    function getPhoneScreenInfo(): Promise<object>;
    /**
       * 获取Android手机屏幕相关信息(包括状态栏高度)
       * @since 10012
       * @returns {Promise<object>} 手机屏幕相关信息 {'viewWidth':xxx, 'viewHeight':xxx, 'viewWidthPixel':xxx, 'viewHeightPixel':xxx}
       * viewWidth和viewHeight返回的都是dp值，若想使用px值还得使用PixelRatio.getPixelSizeForLayoutSize方法转化为px值
       * 但是在Pad小窗上时由于修改了scale值，所以转换出来的px值会偏小
       * 所以10056新增两个返回值viewWidthPixel和viewHeightPixel表示当前ReactView的宽高像素值，若想使用px值建议直接使用这两个值，不必再转换dp值
       */
    function getPhoneScreenInfo(): Promise<object>;
    /**
       * 获取当前登陆用户的服务器国家
       * @since 10010
       * @deprecated 10011 改用 Service.getServerName
       * @returns Promise<string> 返回国家编码，如:‘CN’
       */
    function getCurrentCountry(): Promise<any>;
    /**
       * 获取当前登陆用户的服务器国家
       * @since 10010
       * @deprecated 10011 改用 Service.getServerName
       * @returns Promise<string> 返回国家编码，如:‘CN’
       */
    function getCurrentCountry(): Promise<any>;
    /**
       * 获取手机运营商信息
       * 返回值中：
       * name 运营商名称-与手机语言一致
       * simOperator 运营商 国家编码(三位)+网络编码 参考 https://en.wikipedia.org/wiki/Mobile_country_code
       * countryCode 运营商国家码，ISO 3166-1 country code
       * @since 10021
       * @returns {Promise} 运营商信息 {'1':{name:'',simOperator:'',,countryCode:''},'2':{...}}
       */
    function getOperatorsInfo(): Promise<any>;
    /**
       * 获取手机运营商信息
       * 返回值中：
       * name 运营商名称-与手机语言一致
       * simOperator 运营商 国家编码(三位)+网络编码 参考 https://en.wikipedia.org/wiki/Mobile_country_code
       * countryCode 运营商国家码，ISO 3166-1 country code
       * @since 10021
       * @returns {Promise} 运营商信息 {'1':{name:'',simOperator:'',,countryCode:''},'2':{...}}
       */
    function getOperatorsInfo(): Promise<any>;
    /**
       * jx执行器
       * @typedef IExecutor
       * @since 10002
       * @property {boolean} isReady  - 是否可用
       * @property {boolean} isRunning - 是否运行中
       * @property {*} execute(method, ...args) - 执行某个函数
       * @property {} remove() - 删除
       *
       */
    /**
       * 后台执行文件, 后台最多同时运行三个线程, 超过将销毁最早创建的 executor
       * @since 10002
       * @param {*} jx - 可执行的纯 js 文件, 不使用任何高级语法, 如要使用 es6, 请自行编译通过.
       * @param {json} initialProps - 用于脚本初始化的数据, 在jx文件中为 'initialProps' 对象，使用方法参考样例 或者sampleProject中 ‘com.xiaomi.demo/Main/tutorial/JSExecutor.js’
       * @returns {Promise<IExecutor>}
       * @example
       *
       * var myexecutor = null;
       * Host.createBackgroundExecutor(require('./test.jx'), {name1:"testName"})
       *      .then(executor=>{
       *          myexecutor = executor;
       *          executor.execute("myFunc", 1,2,'a')
       *                  .then(result=>{
       *                      console.log(result);
       *                  })
       *          //支持使用initialProps或者在jx中直接使用
       *          executor.execute("myFunc2", "initialProps.name1").then(res =>{...})
       *          //支持使用obj与arr
       *          executor.execute("SomeObject.myFunc3", {"name":"hello"}, ["a1","a2"]).then(res =>{...})
       * })
       * .then(err=>{...})
       * ....
       * myexecutor&&myexecutor.remove();
       */
    function createBackgroundExecutor(jx: any, initialProps?: json): Promise<any>;
    /**
       * jx执行器
       * @typedef IExecutor
       * @since 10002
       * @property {boolean} isReady  - 是否可用
       * @property {boolean} isRunning - 是否运行中
       * @property {*} execute(method, ...args) - 执行某个函数
       * @property {} remove() - 删除
       *
       */
    /**
       * 后台执行文件, 后台最多同时运行三个线程, 超过将销毁最早创建的 executor
       * @since 10002
       * @param {*} jx - 可执行的纯 js 文件, 不使用任何高级语法, 如要使用 es6, 请自行编译通过.
       * @param {json} initialProps - 用于脚本初始化的数据, 在jx文件中为 'initialProps' 对象，使用方法参考样例 或者sampleProject中 ‘com.xiaomi.demo/Main/tutorial/JSExecutor.js’
       * @returns {Promise<IExecutor>}
       * @example
       *
       * var myexecutor = null;
       * Host.createBackgroundExecutor(require('./test.jx'), {name1:"testName"})
       *      .then(executor=>{
       *          myexecutor = executor;
       *          executor.execute("myFunc", 1,2,'a')
       *                  .then(result=>{
       *                      console.log(result);
       *                  })
       *          //支持使用initialProps或者在jx中直接使用
       *          executor.execute("myFunc2", "initialProps.name1").then(res =>{...})
       *          //支持使用obj与arr
       *          executor.execute("SomeObject.myFunc3", {"name":"hello"}, ["a1","a2"]).then(res =>{...})
       * })
       * .then(err=>{...})
       * ....
       * myexecutor&&myexecutor.remove();
       */
    function createBackgroundExecutor(jx: any, initialProps?: json): Promise<any>;
    /**
       * android 手机是否有NFC功能
       * @deprecated 从10051开始废弃，可以使用System.nfc.getNfcInfo代替
       * @since 10021
       * @return {Promise<json>}  {hasNfc:true/false}
       * @example
       * Host.phoneHasNfcForAndroid().then((result)=>{
       *   console.log(result.hasNfc);
       * }))
       */
    function phoneHasNfcForAndroid(): Promise<json>;
    /**
       * android 手机是否有NFC功能
       * @deprecated 从10051开始废弃，可以使用System.nfc.getNfcInfo代替
       * @since 10021
       * @return {Promise<json>}  {hasNfc:true/false}
       * @example
       * Host.phoneHasNfcForAndroid().then((result)=>{
       *   console.log(result.hasNfc);
       * }))
       */
    function phoneHasNfcForAndroid(): Promise<json>;
    /**
       * android 连接指定ssid得wifi，要求该wifi之前已经连接过 使用此api不需要特别权限
       * @param   ssid 需要去掉字串两端的引号。在native层会自己增加""
       * @since 10036
       * @return {Promise<JSON>}
       * @example
       * Host.connectWifiWithSsid().then((result)=>{
       *   console.log(result);
       * }))
       */
    function connectWifiWithSsid(ssid: any): Promise<JSON>;
    /**
       * android 连接指定ssid得wifi，要求该wifi之前已经连接过 使用此api不需要特别权限
       * @param   ssid 需要去掉字串两端的引号。在native层会自己增加""
       * @since 10036
       * @return {Promise<JSON>}
       * @example
       * Host.connectWifiWithSsid().then((result)=>{
       *   console.log(result);
       * }))
       */
    function connectWifiWithSsid(ssid: any): Promise<JSON>;
    /**
     * @since 10037
     * @param type 0 for mobile  1 for wifi 2 for null
     * equal to android's bindProcessToNetwork
     */
    function bindProcessToNetwork(type: any): Promise<any>;
    /**
     * @since 10037
     * @param type 0 for mobile  1 for wifi 2 for null
     * equal to android's bindProcessToNetwork
     */
    function bindProcessToNetwork(type: any): Promise<any>;
    /**
       * 页面有输入框，需要打开软键盘，页面适配软键盘
       * @since 10027  (10050 后开始支持iOS)
       * @param {boolean} shouldAdapter
       *      Android: true: 表示进行适配,建议UI用ScrollView包裹起来，当输入框在屏幕的下半部分时，只会触发ScrollView滚动; false： 整个页面滚动, demo可参考SoftKeyboardAdapterTestDemo.js
       *      iOS :  true 表示进行适配，整个页面会跟随滑动，false: 表示不进行适配，整个页面不会跟随键盘滑动，默认true   (10050 后开始支持iOS)
       * @returns {Promise<boolean>} 设置成功返回true(iOS没有实现这个接口,直接返回true)
       */
    function pageShouldAdapterSoftKeyboard(shouldAdapter: boolean): Promise<boolean>;
    /**
       * 页面有输入框，需要打开软键盘，页面适配软键盘
       * @since 10027  (10050 后开始支持iOS)
       * @param {boolean} shouldAdapter
       *      Android: true: 表示进行适配,建议UI用ScrollView包裹起来，当输入框在屏幕的下半部分时，只会触发ScrollView滚动; false： 整个页面滚动, demo可参考SoftKeyboardAdapterTestDemo.js
       *      iOS :  true 表示进行适配，整个页面会跟随滑动，false: 表示不进行适配，整个页面不会跟随键盘滑动，默认true   (10050 后开始支持iOS)
       * @returns {Promise<boolean>} 设置成功返回true(iOS没有实现这个接口,直接返回true)
       */
    function pageShouldAdapterSoftKeyboard(shouldAdapter: boolean): Promise<boolean>;
    /**
       * 检测Android系统位置服务(不同于权限)是否打开  only Android
       *  @since 10038
       * @returns {Promise<Object>}
       * 成功时：{"code":0, "data":{locationServerIsOpen: true/false}}
       * 失败时：{"code":-1, "message":"xxx" }
       */
    function checkAndroidLocationServerIsOpen(): Promise<Object>;
    /**
       * 检测Android系统位置服务(不同于权限)是否打开  only Android
       *  @since 10038
       * @returns {Promise<Object>}
       * 成功时：{"code":0, "data":{locationServerIsOpen: true/false}}
       * 失败时：{"code":-1, "message":"xxx" }
       */
    function checkAndroidLocationServerIsOpen(): Promise<Object>;
    /**
       * 获取iOS定位授权的权限状态 only iOS
       *  @since 10038
       * @returns {Promise<Object>}
       * 成功时：{LocationAuthStatus}
       * 失败时：{"message":"xxx" }
       */
    function getIOSLocationAuthorizationStatus(): Promise<Object>;
    /**
       * 获取iOS定位授权的权限状态 only iOS
       *  @since 10038
       * @returns {Promise<Object>}
       * 成功时：{LocationAuthStatus}
       * 失败时：{"message":"xxx" }
       */
    function getIOSLocationAuthorizationStatus(): Promise<Object>;
    /**
     * 跳转到其他App
     * @since 10039
     * @returns {Promise<Object>}
     * @param {string} scheme 其他App的Scheme 如 mihome://plugin
     * @param {Object} params 传给其他App的参数
     * @param {Object} passThrough 从其他App回来时原封不动带回来的参数（部分App支持）
     * 成功时：{"code":0, "data":{// 第三方app返回的数据}}
     * 失败时：{"code":-1, "message":"xxx" }
     */
    function jumpToThirdpartyApplication(scheme: string, params: Object, passThrough: Object): Promise<Object>;
    /**
     * 跳转到其他App
     * @since 10039
     * @returns {Promise<Object>}
     * @param {string} scheme 其他App的Scheme 如 mihome://plugin
     * @param {Object} params 传给其他App的参数
     * @param {Object} passThrough 从其他App回来时原封不动带回来的参数（部分App支持）
     * 成功时：{"code":0, "data":{// 第三方app返回的数据}}
     * 失败时：{"code":-1, "message":"xxx" }
     */
    function jumpToThirdpartyApplication(scheme: string, params: Object, passThrough: Object): Promise<Object>;
    /**
     * 判断是否可以跳到其他App
     * @since 10039
     * @returns {Promise<bool>}
     * @param {string/Object} param
     * 10074扩展了此API，参数param接受两种类型，string或Object
     * 若为string，那么param就是scheme，用法和原来不变
     * 若为object，其格式为:{
     *   android:'xxxxxxx', //packageName
     *   ios:'xxxxxx' //scheme
     * }
     * 这是为了解决在Android上某些APP的scheme与其他app支持的scheme格式相同的从而导致这个方法返回了true，而实际上目标APP却不存在的问题
     * 所以在Android上改为使用应用包名的方式判断APP是否存在，Object中android Key传的是packageName，而iOS依旧传scheme即可
     * @result {"code":0, "data":true/false}
     */
    function checkAbilityOfJumpToThirdpartyApplication(param: any): Promise<bool>;
    /**
     * 判断是否可以跳到其他App
     * @since 10039
     * @returns {Promise<bool>}
     * @param {string/Object} param
     * 10074扩展了此API，参数param接受两种类型，string或Object
     * 若为string，那么param就是scheme，用法和原来不变
     * 若为object，其格式为:{
     *   android:'xxxxxxx', //packageName
     *   ios:'xxxxxx' //scheme
     * }
     * 这是为了解决在Android上某些APP的scheme与其他app支持的scheme格式相同的从而导致这个方法返回了true，而实际上目标APP却不存在的问题
     * 所以在Android上改为使用应用包名的方式判断APP是否存在，Object中android Key传的是packageName，而iOS依旧传scheme即可
     * @result {"code":0, "data":true/false}
     */
    function checkAbilityOfJumpToThirdpartyApplication(param: any): Promise<bool>;
    /**
      * @since 10059
      * 多键开关状态发生变化--设备被拆分或者合并
      * @param{object}  接收到的数据 {did: xxx, splitFlag: xxx}
       *              splitFlag可取值如下：
       *              1 ：设备已拆分
       *              0 ：设备已合并
      * @example
      * Host.notifyMultikeyStateChanged(param);
    */
    function notifyMultikeyStateChanged(param?: {}): void;
    /**
      * @since 10059
      * 多键开关状态发生变化--设备被拆分或者合并
      * @param{object}  接收到的数据 {did: xxx, splitFlag: xxx}
       *              splitFlag可取值如下：
       *              1 ：设备已拆分
       *              0 ：设备已合并
      * @example
      * Host.notifyMultikeyStateChanged(param);
    */
    function notifyMultikeyStateChanged(param?: {}): void;
    /**
     * @since 10072
     * 设置Pad上的滑动策略（only Android）
     * 这个api是为了解决某些插件使用的组件总是选择消耗滑动事件但是却又不做任何事，导致出现滑动无响应的问题
     * @param params
     * params.strategy {@link PAD_SCROLL_STRATEGY}
     * AUTO：表示默认策略，SDK会根据用户滑动位置做出相应的响应。
     * 当用户滑动的位置不会消耗滑动事件时，该事件会被SDK消耗掉。
     * ALWAYS_SDK_DEAL：滑动事件总是交给SDK处理，插件将无法接受到任何滑动事件。
     * ALWAYS_PLUGIN_DEAL：滑动事件全部交给插件处理。（Scroll组件剩余的滑动距离依旧可以被SDK消费掉，因为SDK支持滑动嵌套）
     * 这个方法一经调用所有插件页面都会应用设置的策略，所以如果只是某个页面需要适配滑动策略的话，请记得在退出该页面时将滑动策略设置回进入页面时的样子
     * @example
     *  componentWillUnmount() {
     *      Host.setPadScrollDealStrategy({ strategy: PAD_SCROLL_STRATEGY.AUTO });
     *    }
     *
     * 效果可参考com.xiaomi.demo中的PadScrollDemo
     */
    function setPadScrollDealStrategy(params: any): void;
    /**
     * @since 10072
     * 设置Pad上的滑动策略（only Android）
     * 这个api是为了解决某些插件使用的组件总是选择消耗滑动事件但是却又不做任何事，导致出现滑动无响应的问题
     * @param params
     * params.strategy {@link PAD_SCROLL_STRATEGY}
     * AUTO：表示默认策略，SDK会根据用户滑动位置做出相应的响应。
     * 当用户滑动的位置不会消耗滑动事件时，该事件会被SDK消耗掉。
     * ALWAYS_SDK_DEAL：滑动事件总是交给SDK处理，插件将无法接受到任何滑动事件。
     * ALWAYS_PLUGIN_DEAL：滑动事件全部交给插件处理。（Scroll组件剩余的滑动距离依旧可以被SDK消费掉，因为SDK支持滑动嵌套）
     * 这个方法一经调用所有插件页面都会应用设置的策略，所以如果只是某个页面需要适配滑动策略的话，请记得在退出该页面时将滑动策略设置回进入页面时的样子
     * @example
     *  componentWillUnmount() {
     *      Host.setPadScrollDealStrategy({ strategy: PAD_SCROLL_STRATEGY.AUTO });
     *    }
     *
     * 效果可参考com.xiaomi.demo中的PadScrollDemo
     */
    function setPadScrollDealStrategy(params: any): void;
    /**
     * @method connectWifi
     * @since 10105
     * @description 连接wifi
     *
     * @param {string} ssid - ssid
     * @param {string} passwd - wifi密码
     * @returns {Promise}
     */
    function connectWifi(ssid: string, passwd?: string): Promise<any>;
    /**
     * @method connectWifi
     * @since 10105
     * @description 连接wifi
     *
     * @param {string} ssid - ssid
     * @param {string} passwd - wifi密码
     * @returns {Promise}
     */
    function connectWifi(ssid: string, passwd?: string): Promise<any>;
    /**
     * Q版本之后的接口：插件直接调用，然后弹出系统半窗，这个半窗会自动扫描，然后用户选择后，给插件回调
     * @since 10105
     * @param ssid
     * @param passwd
     * @returns {Promise<unknown> | Promise.Promise}
     */
    function connectWifiAfterQ(ssid: any, passwd?: string): any;
    /**
     * Q版本之后的接口：插件直接调用，然后弹出系统半窗，这个半窗会自动扫描，然后用户选择后，给插件回调
     * @since 10105
     * @param ssid
     * @param passwd
     * @returns {Promise<unknown> | Promise.Promise}
     */
    function connectWifiAfterQ(ssid: any, passwd?: string): any;
    /**
     * @since 10104
     * 调用系统剪贴板
     * @param text
     */
    function copyToClipboard(text: any): void;
    /**
     * @since 10104
     * 调用系统剪贴板
     * @param text
     */
    function copyToClipboard(text: any): void;
}
export default _default;
export namespace PAD_SCROLL_STRATEGY {
    const AUTO: number;
    const ALWAYS_SDK_DEAL: number;
    const ALWAYS_PLUGIN_DEAL: number;
}
export namespace HostEvent {
    namespace cellPhoneNetworkStateChanged {
        function forever(emitter: any): (result: any) => void;
    }
}