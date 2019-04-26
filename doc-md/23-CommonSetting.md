## Modules

<dl>
<dt><a href="#module_CommonSetting">CommonSetting</a></dt>
<dd><p>米家通用设置项</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#firstSharedOptions">firstSharedOptions</a></dt>
<dd><p>分享设备的设置项
0: 不显示
1: 显示</p>
</dd>
</dl>

<a name="module_CommonSetting"></a>

## CommonSetting
米家通用设置项

**Export**: public  
**Doc_name**: CommonSetting  
**Doc_index**: 23  
**See**: com.xiaomi.demo->教程->插件通用设置项  
**Since**: 10004  
**Author**: Geeook  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| firstOptions | <code>array</code> | 一级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项 |
| secondOptions | <code>array</code> | 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项 |
| extraOptions | <code>object</code> | 其他特殊配置项 ```js // extraOptions extraOptions: {   showUpgrade: bool // 固件升级是否显示二级菜单。默认值true   licenseUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明   policyUrl: 资源id, // 见 miot/Host.ui.privacyAndProtocolReview 的传参说明   deleteDeviceMessage: string // 删除设备的弹窗中自定义提示文案，见 miot/Host.ui.openDeleteDevice 的传参说明 } ``` |
| navigation | <code>object</code> | 必须传入当前插件的路由，即 `this.props.navigation`，否则无法跳转二级页面 **注意：** **1. 如果需要显示「更多设置」「固件升级」的二级菜单页面，需要从 miot/ui/CommonSetting 中导出 MoreSetting 和 FirmwareUpgrade 页面，**    **并放在项目入口文件index.js的RootStack中。** ```js // index.js snippet import { FirmwareUpgrade, MoreSetting } from "miot/ui/CommonSetting"; ... const RootStack = createStackNavigator( {     Setting, // 设置页     MoreSetting, // 二级菜单——更多设置     FirmwareUpgrade, // 二级菜单——固件升级 } ... ) ``` **2. 必须传入当前插件的路由，即 `this.props.navigation`，否则无法跳转二级页面** ```js <CommonSetting   navigation={this.props.navigation} /> ``` |


* [CommonSetting](#module_CommonSetting)
    * [.privacyAndProtocolReview()](#module_CommonSetting+privacyAndProtocolReview)
    * [.chooseFirmwareUpgrade()](#module_CommonSetting+chooseFirmwareUpgrade)
    * [.openSubPage(page)](#module_CommonSetting+openSubPage)
    * [.openDeleteDevice()](#module_CommonSetting+openDeleteDevice)

<a name="module_CommonSetting+privacyAndProtocolReview"></a>

### commonSetting.privacyAndProtocolReview()
点击「法律信息」，传入用户协议和隐私政策的文件地址

**Kind**: instance method of [<code>CommonSetting</code>](#module_CommonSetting)  
<a name="module_CommonSetting+chooseFirmwareUpgrade"></a>

### commonSetting.chooseFirmwareUpgrade()
点击「固件升级」，选择性跳转

**Kind**: instance method of [<code>CommonSetting</code>](#module_CommonSetting)  
<a name="module_CommonSetting+openSubPage"></a>

### commonSetting.openSubPage(page)
打开二级菜单

**Kind**: instance method of [<code>CommonSetting</code>](#module_CommonSetting)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>string</code> | index.js的RootStack中页面定义的key |

<a name="module_CommonSetting+openDeleteDevice"></a>

### commonSetting.openDeleteDevice()
弹出「删除设备」弹窗

**Kind**: instance method of [<code>CommonSetting</code>](#module_CommonSetting)  
<a name="firstSharedOptions"></a>

## firstSharedOptions
分享设备的设置项
0: 不显示
1: 显示

**Kind**: global constant  
