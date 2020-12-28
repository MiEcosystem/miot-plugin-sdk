class CustomSetting extends Component {
  static propTypes = {
    // 标题，默认为“功能设置”
    title: PropTypes.string,
    // 列表项
    options: PropTypes.arrayOf(PropTypes.shape({
      // 所用组件，可为自定义组件或者ListItem 里的组件标识，List  里的组件标识包括ListItem, ListItemWithSlider, ListItemWithSwitch 等
      component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      // 该组件所需属性，比如如果是ListItemWithSwitch，则为ListItemWithSwitch 所需的title, value 等属性
      props: PropTypes.object
    })),
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel
  };
}
export default class CommonSettingPage extends Component {
  static propTypes = {
    // navigation
    navigation: PropTypes.object.isRequired,
    // CommonSetting 需要的属性，navigation 不需要
    commonSetting: restCommonSettingPropTypes,
    // CustomSetting 需要的属性
    customSetting: CustomSetting.propTypes
  };
}