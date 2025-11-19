export function resetClassVariables(): void;
export namespace AllOptions {
    const PLUGIN_VERSION: string;
    const CHECK_UPGRADE: string;
    const SECURITY: string;
    const FEEDBACK: string;
    const ADD_TO_DESKTOP: string;
    const NETWORK_INFO: string;
    const USER_AGREEMENT: string;
    const PRIVACY_POLICY: string;
    const FREQ_DEVICE: string;
    const DEFAULT_PLUGIN: string;
    const DEVICE_CALL: string;
    const CLOUD_STORAGE: string;
    const AUTO_UPGRADE: string;
    const TIMEZONE: string;
    const USER_EXPERIENCE_PROGRAM: string;
    const FREQ_CAMERA: string;
    const NAME: string;
    const LOCATION: string;
    const HELP: string;
    const MORE: string;
    const LEGAL_INFO: string;
    const MEMBER_SET: string;
    const CHANGE_ICON: string;
    const SHARE: string;
    const BTGATEWAY: string;
    const VOICE_AUTH: string;
    const IFTTT: string;
    const FIRMWARE_UPGRADE: string;
    const CREATE_GROUP: string;
    const MANAGE_GROUP: string;
    const PRODUCT_BAIKE: string;
    const STAND_PLUGIN: string;
    const MULTIPLEKEY_SPLIT: string;
    const DEVICE_SERVICE: string;
}
export namespace SETTING_KEYS {
    export { AllOptions as first_options };
    export { AllOptions as second_options };
}
/**
 * 20190708 / SDK_10023
 * 所有设置项顺序固定
 * 权重值越大，排序越靠后，为了可扩展性，权重不能依次递增+1
 */
export const AllOptionsWeight: {
    [x: string]: number;
};
/**
 * ItemStyle - 10040新增 可参考 ListItem组件的部分样式
 * @typedef {Object} ItemStyle
 * @property {style} titleStyle - 标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} valueStyle - 右侧文案的自定义样式
 * @property {bool} dotStyle - 10040新增 title右上角红点的style  建议设置宽高为8，以免图片失真
 * @property {number} titleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 10040新增 设置subtitle字体显示的最大行数 默认为2
 * @property {number} valueNumberOfLines - 10040新增 设置value字体显示的最大行数 默认为2
 * @property {number} valueMaxWidth - 10051新增 设置value文案的最大宽度 默认为有箭头时30%，无箭头时35%
 * @property {bool} useNewType - 10045新增 是否使用新样式 10045以后*!必须!*使用新样式
 */
/**
 * moreSettingPageStyle - 10040新增 二级页面 更多设置 页面的样式
 * @typedef {Object} moreSettingPageStyle
 * @property {style} navigationBarStyle - 标题的自定义样式 -可参考 NavigationBar 样式
 * @property {style} itemStyle - 列表中 item样式
 * @property {style} - 10053新增 containerStyle - 标题栏下方内容的样式
 */
/**
 *
 * - 10040新增
 * @typedef {Object} CommonSettingStyle
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {style} titleStyle - 10040新增 CommonSetting中 "通用设置" 字体的样式
 * @property {ItemStyle} itemStyle - 10040新增 CommonSetting中 列表item 的样式
 * @property {object} deleteTextStyle - 10040新增 CommonSetting中 "删除设备" 字体的样式
 * @property {object} moreSettingPageStyle - 10040新增 CommonSetting中 二级页面 更多设置 页面的样式
 * @property {object} titleContainer - 10053新增 CommonSetting中 "通用设置" 所在item的样式
 * @property {object} bottomContainer - 10053新增 CommonSetting中 "删除设备" 所在item的样式
 */
/**
 * @export public
 * @doc_name 通用设置
 * @doc_index 3
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module CommonSetting
 * @description 米家通用设置项
 * @property {array} firstOptions - 一级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项，其中产品百科的配置请参考: https://iot.mi.com/new/doc/direct-access/productcenter/advance-configure#%E9%85%8D%E7%BD%AE%E2%80%9C%E4%BA%A7%E5%93%81%E7%99%BE%E7%A7%91%E2%80%9D
 * @property {array} secondOptions - 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 * @property {array} showDot - 定义哪些列表项需要显示小红点。为了便于扩展每个列表项都可以显示小红点，默认全部**不显示**，需要显示传入该列表项的key即可。
 * @property {CommonSettingStyle} commonSettingStyle - - 10040新增 CommonSetting 中有关字体样式相关设置
 * @property {object} extraOptions - 其他特殊配置项
 * ```js
 * // extraOptions
 * extraOptions: {
 *   showUpgrade: bool // 「固件升级」是否跳转原生固件升级页面。默认值true。一般来说，wifi设备跳转原生固件升级页面，蓝牙设备（传入bleOtaAuthType除外）不跳转原生固件升级页面
 *   upgradePageKey: string // 「固件升级」如果不跳转原生固件升级页面，请传入想跳转页面的key(定义在 index.js 的 RootStack 中)
 *   licenseUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明，SDK_10023 开始废弃
 *   policyUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明，SDK_10023 开始废弃
 *   deleteDeviceMessage: string // 删除设备的弹窗中自定义提示文案，见 miot/Host.ui.openDeleteDevice 的传参说明
 *   ZXhjbHVkZVJlcXVpcmVkT3B0aW9ucw==: [] // %E5%A6%82%E6%9E%9C%E6%83%B3%E8%A6%81%E5%B1%8F%E8%94%BD%E5%BF%85%E9%80%89%E9%A1%B9%EF%BC%8C%E5%9C%A8%E8%BF%99%E9%87%8C%E4%BC%A0%E5%85%A5%20key%20%E5%8D%B3%E5%8F%AF%EF%BC%8C%E4%B8%80%E7%BA%A7%20or%20%E4%BA%8C%E7%BA%A7%E8%8F%9C%E5%8D%95%E7%9A%84%20key%20%E9%83%BD%E5%8F%AF%E4%BB%A5%E3%80%82%E7%89%B9%E6%AE%8A%E9%9C%80%E8%A6%81%EF%BC%8C%E8%B0%A8%E6%85%8E%E4%BD%BF%E7%94%A8
 *   option: object // 见 miot/Host.ui.previewLegalInformationAuthorization 的传参说明
 *   syncDevice: bool // 插件端设置时区后是否需要后台同步到设备端, 见 miot/Host.ui.openDeviceTimeZoneSettingPage 的传参说明
 *   networkInfoConfig: number // 「更多设置」页面是否显示「网络信息」设置项。0：不显示；1：显示；-1：米家默认配置（蓝牙设备不显示，Wi-Fi设备显示）
 *   bleOtaAuthType: number // 打开通用的蓝牙固件OTA的原生页面。指定设备的协议类型 0: 普通小米蓝牙协议设备(新接入设备已废弃该类型)，1: 安全芯片小米蓝牙设备（比如锁类产品） 4: Standard Auth 标准蓝牙认证协议(通常2019.10.1之后上线的新蓝牙设备) 5: Mesh 设备
 *   10059新增
 *   preOperations: object { AllOptions.SHARE: function, AllOptions.FIRMWARE_UPGRADE: function, AllOptions.CREATE_GROUP: function, AllOptions.MANAGE_GROUP: function  } // 打开分享、ota、创建组、编辑组页面的前置操作，只会在resolve中执行打开页面
 * }
 * ```
 * @property {object} navigation - 必须传入当前插件的路由，即 `this.props.navigation`，否则无法跳转二级页面
 * **注意：**
 * **1. 如果需要显示「更多设置」「固件升级」的二级菜单页面，需要从 miot/ui/CommonSetting 中导出 MoreSetting 和 FirmwareUpgrade 页面，**
 *    **并放在项目入口文件index.js的RootStack中。**
 * ```js
 * // index.js snippet
 * import { FirmwareUpgrade, MoreSetting } from "miot/ui/CommonSetting";
 * ...
 * const RootStack = createStackNavigator(
 * {
 *     Setting, // 设置页
 *     MoreSetting, // 二级菜单——更多设置
 *     FirmwareUpgrade, // 二级菜单——固件升级
 * }
 * ...
 * )
 * ```
 * **2. 必须传入当前插件的路由，即 `this.props.navigation`，否则无法跳转二级页面**
 * ```js
 * <CommonSetting
 *   navigation={this.props.navigation}
 * />
 * ```
 * @see com.xiaomi.demo->教程->插件通用设置项
 */
export default class CommonSetting extends React.Component<any, any, any> {
    static propTypes: {
        firstOptions: PropTypes.Requireable<any[]>;
        secondOptions: PropTypes.Requireable<any[]>;
        showDot: PropTypes.Requireable<any[]>;
        extraOptions: PropTypes.Requireable<object>;
        navigation: PropTypes.Validator<object>;
        commonSettingStyle: PropTypes.Requireable<object>;
        accessible: PropTypes.Requireable<boolean>;
        firstCustomOptions: PropTypes.Requireable<any[]>;
        secondCustomOptions: PropTypes.Requireable<any[]>;
        specificSetting: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        firstOptions: string[];
        secondOptions: string[];
        showDot: never[];
        extraOptions: {};
    };
    constructor(props: any, context: any);
    getCommonSetting(state: any): {
        [x: string]: {
            title: string;
            value: any;
            onPress: () => any;
            _itemType?: undefined;
            onValueChange?: undefined;
        } | {
            title: any;
            onPress: () => void;
            value?: undefined;
            _itemType?: undefined;
            onValueChange?: undefined;
        } | {
            _itemType: string;
            title: any;
            value: any;
            onValueChange: (value: any) => void;
            onPress?: undefined;
        };
    };
    commonSetting: {
        [x: string]: {
            title: string;
            value: any;
            onPress: () => any;
            _itemType?: undefined;
            onValueChange?: undefined;
        } | {
            title: any;
            onPress: () => void;
            value?: undefined;
            _itemType?: undefined;
            onValueChange?: undefined;
        } | {
            _itemType: string;
            title: any;
            value: any;
            onValueChange: (value: any) => void;
            onPress?: undefined;
        };
    };
    /**
     * @description 点击「法律信息」，传入用户协议和隐私政策的文件地址
     */
    /**
     * @description 点击「固件升级」，选择性跳转
     */
    chooseFirmwareUpgrade(): void;
    /**
     * 创建组设备
     */
    createGroup(): void;
    /**
     * 管理组设备
     */
    manageGroup(): void;
    /**
     * @description 从 this.state.showDot 移除某key，从而隐藏小红点
     * @param {string} key
     */
    removeKeyFromShowDot(key: string): void;
    /**
     * @description 打开二级菜单
     * @param {string} page index.js的RootStack中页面定义的key
     */
    openSubPage(page: string, params?: {
        networkInfoConfig: any;
        syncDevice: any;
        secondOptions: any[];
        excludeRequiredOptions: any;
        extraOptions: any;
        secondCustomOptions: any;
    }): void;
    /**
     * @description 弹出「删除设备」弹窗
     */
    openDeleteDevice(): void;
    needUpgradeListener: any;
    fetchHighTextContrastState(): void;
    getCloudStorage(): void;
    _updateFreqFlag(): void;
    _onDialogDismiss(): void;
    _isBelongToCarRoom(): void;
    _getCommonSettingStyle(): {
        allowFontScaling: boolean;
        unlimitedHeightEnable: boolean;
        titleContainer: {};
        titleStyle: {};
        itemStyle: {
            allowFontScaling: boolean;
            unlimitedHeightEnable: boolean;
            titleStyle: null;
            subtitleStyle: null;
            valueStyle: null;
            dotStyle: null;
            titleNumberOfLines: number;
            subtitleNumberOfLines: number;
            valueNumberOfLines: number;
            useNewType: boolean;
        };
        bottomContainer: {};
        deleteTextStyle: {};
    };
    _deviceNameChangedListener: any;
    _packageGobackFromNativeListerner: any;
    listenerFocus: any;
}
/**
 * ItemStyle - 10040新增 可参考 ListItem组件的部分样式
 */
export type ItemStyle = {
    /**
     * - 标题的自定义样式
     */
    titleStyle: style;
    /**
     * - 副标题的自定义样式
     */
    subtitleStyle: style;
    /**
     * - 右侧文案的自定义样式
     */
    valueStyle: style;
    /**
     * - 10040新增 title右上角红点的style  建议设置宽高为8，以免图片失真
     */
    dotStyle: bool;
    /**
     * - 10040新增 设置title字体显示的最大行数 默认为1
     */
    titleNumberOfLines: number;
    /**
     * - 10040新增 设置subtitle字体显示的最大行数 默认为2
     */
    subtitleNumberOfLines: number;
    /**
     * - 10040新增 设置value字体显示的最大行数 默认为2
     */
    valueNumberOfLines: number;
    /**
     * - 10051新增 设置value文案的最大宽度 默认为有箭头时30%，无箭头时35%
     */
    valueMaxWidth: number;
    /**
     * - 10045新增 是否使用新样式 10045以后*!必须!*使用新样式
     */
    useNewType: bool;
};
/**
 * moreSettingPageStyle - 10040新增 二级页面 更多设置 页面的样式
 */
export type moreSettingPageStyle = {
    /**
     * - 标题的自定义样式 -可参考 NavigationBar 样式
     */
    navigationBarStyle: style;
    /**
     * - 列表中 item样式
     */
    itemStyle: style;
    /**
     * - 10053新增 containerStyle - 标题栏下方内容的样式
     */
    "": style;
};
/**
 *
 * - 10040新增
 */
export type CommonSettingStyle = {
    /**
     * - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
     */
    allowFontScaling: bool;
    /**
     * - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
     */
    unlimitedHeightEnable: bool;
    /**
     * - 10040新增 CommonSetting中 "通用设置" 字体的样式
     */
    titleStyle: style;
    /**
     * - 10040新增 CommonSetting中 列表item 的样式
     */
    itemStyle: ItemStyle;
    /**
     * - 10040新增 CommonSetting中 "删除设备" 字体的样式
     */
    deleteTextStyle: object;
    /**
     * - 10040新增 CommonSetting中 二级页面 更多设置 页面的样式
     */
    moreSettingPageStyle: object;
    /**
     * - 10053新增 CommonSetting中 "通用设置" 所在item的样式
     */
    titleContainer: object;
    /**
     * - 10053新增 CommonSetting中 "删除设备" 所在item的样式
     */
    bottomContainer: object;
};
export namespace firstAllOptions { }
export namespace secondAllOptions { }
import React from "react";