# Demo 项目文档

## 项目概述

`com.xiaomi.demo` 是米家 React Native SDK 的演示项目，用于展示 mhui-rn（HyperOS 设计系统）组件库的全部组件能力。基于 React Navigation v2 栈导航。

## 导航结构

```
Home (MainPage)
  └─ UI能力 → SdkComponentDemo
       ├─ token → BasicDemo
       │    ├─ color → ColorDemo
       │    ├─ font → FontsDemo
       │    ├─ radius → RadiusDemo
       │    └─ spacing → SpacingDemo
       ├─ BaseComponents → BasicComponentDemo
       │    ├─ 常规组件
       │    │    ├─ ListItem → ListItemDemo → (NavigationBar More) → ListItemConfigDemo
       │    │    ├─ ListItemWithWidget → ListItemWithWidgetDemo
       │    │    ├─ ListCard → ListGroupDemo
       │    │    ├─ Switch → NewSwitchDemo
       │    │    ├─ BlockButton → BlockButtonDemo
       │    │    ├─ ButtonGroup → ButtonGroupDemo
       │    │    ├─ Slider → SliderDemo
       │    │    │    ├─ 无极滑条 → SliderContinuousDemo
       │    │    │    └─ 离散滑条 → SliderDiscreteDemo
       │    │    ├─ ToggleButton → ToggleButtonDemo
       │    │    ├─ InformationArea → InformationDemo → InformationDataDemo
       │    │    └─ Atomic → AtomicDemo
       │    ├─ 弹出类组件
       │    │    ├─ MessageDialog → MessageDialogDemo
       │    │    ├─ ActionCustomDialog → ActionCustomDialogDemo
       │    │    ├─ CommonDialog → DialogDemo
       │    │    ├─ LoadingToast → LoadingToastDemo
       │    │    ├─ PopMenus → PopMenusDemo
       │    │    ├─ 近手弹窗 → HandPopDemo
       │    │    ├─ Toast → ToastDemo
       │    │    └─ Drawer → DrawerDemo
       │    │         ├─ 固定高度 → FixedDrawerDemo
       │    │         └─ 弹性高度 → ElasticDrawerDemo
       │    └─ 容器组件
       │         └─ ListCard → ListGroupDemo
       ├─ IoTComponents → IotComponentDemo
       │    ├─ 常规组件
       │    │    ├─ CardHeader → TitleContainerDemo
       │    │    ├─ LargeListEntrance → LargeEntranceDemo
       │    │    ├─ SmallGridEntrance → SmallEntranceDemo
       │    │    ├─ LargeListToggle → LargeVariantSwitchDemo
       │    │    ├─ MediumListToggle → MiddleVariantSwitchDemo
       │    │    ├─ SmallGridToggle → SmallVariantSwitchDemo
       │    │    ├─ ParamStepper → StepperDemo
       │    │    ├─ ActionBlock → ActionBlockDemo
       │    │    └─ LargeTriggerSelect → FlatSelectDemo
       │    └─ 容器组件
       │         ├─ CardContainer → CardContainerDemo
       │         ├─ ContainerWithGap → GroupContainerDemo
       │         ├─ SmallGridContainer → ContainerDemo
       │         └─ Divider → SeparatorDemo
       ├─ FeatureComponents → FeatureComponentDemo
       └─ PageLayout → PageLayoutDemo
```

## 目录结构

```
Main/
├── index.js                  # 路由注册（createStackNavigator）
├── MainPage.js               # 应用首页
├── UIComponent/
│   ├── SdkComponentDemo.js   # SDK 组件入口页（5 大分类）
│   └── SDKNewComponent/
│       ├── adaptiveThemeComponent.js  # 暗色模式 HOC
│       ├── BasicComponent/            # 基础组件 Demo
│       │   ├── BasicComponentDemo.js  # 基础组件入口页
│       │   ├── BasicDemo.js           # Token 入口页
│       │   ├── FeatureComponentDemo.js
│       │   ├── PageLayoutDemo.js
│       │   ├── ColorDemo.js           # 颜色 Token 展示
│       │   ├── FontsDemo.js           # 字体 Token 展示
│       │   ├── RadiusDemo.js          # 圆角 Token 展示
│       │   ├── SpacingDemo.js         # 间距 Token 展示
│       │   ├── ListItemDemo.js        # ListItem 用例画廊
│       │   ├── ListItemConfigDemo.js  # ListItem TestComponent 调试
│       │   ├── ListItemWithWidgetDemo.js
│       │   ├── ListGroupDemo.js       # ListCard 演示
│       │   ├── SwitchDemo.js
│       │   ├── BlockButtonDemo.js
│       │   ├── ButtonGroupDemo.js
│       │   ├── ButtonDemo.js / ButtonColorDemo.js / ButtonCustomDemo.js / ButtonPageViewDemo.js
│       │   ├── SliderDemo.js / SliderContinuousDemo.js / SliderDiscreteDemo.js
│       │   ├── ToggleButtonDemo.js
│       │   ├── InformationAreaDemo.js / InformationDemo.js / InformationDataDemo.js
│       │   ├── AtomicDemo.js          # Switch / Checkbox / ChoiceItem 小组件
│       │   ├── DialogDemo.js / MessageDialogDemo.js / ActionCustomDialogDemo.js
│       │   ├── LoadingDemo.js / LoadingToastDemo.js
│       │   ├── PopMenusDemo.js
│       │   ├── ToastDemo.js
│       │   ├── DrawerDemo.js / FixedDrawerDemo.js / ElasticDrawerDemo.js
│       │   ├── HandPopDemo.js / HandPopClickDemo.js / HandPopCustomDemo.js / HandPopTriggerDemo.js
│       │   ├── SeparatorDemo.js
│       │   ├── CabinetAirConditioner.js / PanResponderDemo.js
│       │   └── *ConfigDemo.js         # TestComponent 配置调试页（部分未注册路由）
│       ├── IotComponent/              # IoT 组件 Demo
│       │   ├── IotComponentDemo.js    # IoT 组件入口页
│       │   ├── TitleContainerDemo.js  # CardHeader
│       │   ├── LargeEntranceDemo.js / SmallEntranceDemo.js
│       │   ├── LargeVariantSwitchDemo.js / MiddleVariantSwitchDemo.js / SmallVariantSwitchDemo.js
│       │   ├── StepperDemo.js
│       │   ├── ActionBlockDemo.js
│       │   ├── FlatSelectDemo.js / LargeFlatOptionDemo.js / SmallFlatOptionDemo.js
│       │   ├── CardContainerDemo.js / GroupContainerDemo.js / ContainerDemo.js
│       │   ├── VariantSwitchDemo.js / ControlerDemo.js / EntryDemo.js / StructureDemo.js
│       │   └── *ConfigDemo.js         # TestComponent 配置调试页（未注册路由）
│       └── Example/                   # 示例代码
```

## Demo 页面模式

### 1. 用例画廊模式

按 Figma 设计稿中的「状态列表」结构组织，分为：
- **单配置全覆盖**：逐一切换每个 prop 的所有取值
- **依赖配置全覆盖**：测试有前置依赖的 prop 组合
- **关键联合覆盖**：测试重要的多 prop 组合（禁用态、超长文本、冲突场景等）

每个分组用 `Group` 组件包裹（灰色标题 + 白色卡片），卡片内连续排列多个组件实例。

示例：`ListItemDemo.js`

### 2. TestComponent 配置调试模式

使用 `TestComponent` 组件实现交互式 Props 调试：
- 顶部预览区实时渲染组件
- 下方按 category 分组的参数编辑器（content / state / interaction / resource / render）
- 支持 `linkTo` 实现回调联动（如 onChange → checked）
- 支持 `passOptions` 提供预设值切换

从用例画廊页的 NavigationBar 右上角 More 按钮进入。

示例：`ListItemConfigDemo.js`

### 3. 导航列表模式

使用 `ListCard` + `ListItem` 组件构建导航菜单，点击跳转到子页面。

示例：`BasicComponentDemo.js`、`IotComponentDemo.js`

## 组件名映射

当前组件库导出名与 Demo 文件中路由名的对应关系：

| 组件库导出名 | Demo 路由名 | Demo 文件 |
|-------------|------------|----------|
| ListItem | ListItemDemo | BasicComponent/ListItemDemo.js |
| ListItemWithWidget | ListItemWithWidgetDemo | BasicComponent/ListItemWithWidgetDemo.js |
| ListCard | ListGroupDemo | BasicComponent/ListGroupDemo.js |
| Switch | NewSwitchDemo | BasicComponent/SwitchDemo.js |
| BlockButton | BlockButtonDemo | BasicComponent/BlockButtonDemo.js |
| ButtonGroup | ButtonGroupDemo | BasicComponent/ButtonGroupDemo.js |
| Slider / SliderWithToggle | SliderDemo | BasicComponent/SliderDemo.js |
| ToggleButton | ToggleButtonDemo | BasicComponent/ToggleButtonDemo.js |
| InformationArea | InformationDemo | BasicComponent/InformationDemo.js |
| CommonDialog | DialogDemo | BasicComponent/DialogDemo.js |
| MessageDialog | MessageDialogDemo | BasicComponent/MessageDialogDemo.js |
| ActionCustomDialog | ActionCustomDialogDemo | BasicComponent/ActionCustomDialogDemo.js |
| LoadingToast | LoadingToastDemo | BasicComponent/LoadingToastDemo.js |
| PopMenus | PopMenusDemo | BasicComponent/PopMenusDemo.js |
| Drawer | DrawerDemo | BasicComponent/DrawerDemo.js |
| CardHeader | TitleContainerDemo | IotComponent/TitleContainerDemo.js |
| LargeListEntrance | LargeEntranceDemo | IotComponent/LargeEntranceDemo.js |
| SmallGridEntrance | SmallEntranceDemo | IotComponent/SmallEntranceDemo.js |
| LargeListToggle | LargeVariantSwitchDemo | IotComponent/LargeVariantSwitchDemo.js |
| MediumListToggle | MiddleVariantSwitchDemo | IotComponent/MiddleVariantSwitchDemo.js |
| SmallGridToggle | SmallVariantSwitchDemo | IotComponent/SmallVariantSwitchDemo.js |
| ParamStepper | StepperDemo | IotComponent/StepperDemo.js |
| ActionBlock | ActionBlockDemo | IotComponent/ActionBlockDemo.js |
| LargeTriggerSelect | FlatSelectDemo | IotComponent/FlatSelectDemo.js |
| CardContainer | CardContainerDemo | IotComponent/CardContainerDemo.js |
| ContainerWithGap | GroupContainerDemo | IotComponent/GroupContainerDemo.js |
| SmallGridContainer | ContainerDemo | IotComponent/ContainerDemo.js |
| Divider | SeparatorDemo | BasicComponent/SeparatorDemo.js |

## 未注册路由的 ConfigDemo 文件

以下 `*ConfigDemo.js` 文件存在但未在 `index.js` 中注册路由（需要注册后才能通过导航访问）：

**BasicComponent:**
`BlockButtonConfigDemo`, `ButtonGroupConfigDemo`, `SwitchConfigDemo`, `CheckboxConfigDemo`, `ToastConfigDemo`, `DividerConfigDemo`, `SliderConfigDemo`, `SliderWithToggleConfigDemo`, `ActionCustomDialogConfigDemo`, `ListItemWithWidgetConfigDemo`

**IotComponent:**
`LargeListEntranceConfigDemo`, `SmallGridEntranceConfigDemo`, `ParamStepperConfigDemo`, `CardContainerConfigDemo`, `ContainerWithGapConfigDemo`, `SmallGridContainerConfigDemo`, `LargeListToggleConfigDemo`, `MediumListToggleConfigDemo`, `SmallGridToggleConfigDemo`, `CircularButtonConfigDemo`, `CardHeaderConfigDemo`

## 样式规范

- 页面背景：`colorToken.surfacePageLow`
- 卡片背景：`colorToken.surfaceCardPrimary`
- 卡片圆角：16px
- 页面 padding：`paddingHorizontal: 12, paddingTop: 12, paddingBottom: 28`
- Section 标题：`fontSize: 16, fontWeight: '500', color: contentPrimaryNormal`
- Group 标题：`fontSize: 12, color: accentOsFill`
- 色系仅支持：`green`, `blue`, `wathet`, `purple`, `white`, `orange`（无 red/yellow）
