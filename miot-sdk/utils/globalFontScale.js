import { Text, TextInput } from "react-native";
import NavigationBar from "../ui/NavigationBar";
import TitleBar from "../ui/TitleBar";
import { 
  AbstractDialog, ActionSheet, ChoiceDialog, InputDialog, LoadingDialog, MessageDialog, PinCodeDialog, ProgressDialog, ShareDialog 
} from "../ui/Dialog";
import Card, { GearCard, ListCard } from "../ui/Card";
import MHCard from "../ui/Card/MHCard";
import ModeCard from "../ui/Card/ModeCard";
import CardBase from "../ui/Card/CardBase";
import { NormalGear, DragGear, SlideGear } from "../ui/Gear";
import Clickable from "../ui/Gear/Clickable";
import { ListItem, ListItemWithSlider, ListItemWithSwitch } from "../ui/ListItem";
import ChoiceItem from "../ui/ListItem/ChoiceItem";
import MHDatePicker from "../ui/MHDatePicker";
import StringSpinner from "../ui/StringSpinner";
import PopButton from "mhui-rn/dist/components/popButton/PopButton";
const setGlobalFontScale = () => {
  const components = [
    Text, TextInput, NavigationBar, ListItem, ListItemWithSlider, ListItemWithSwitch, 
    Card, MHCard, ModeCard, DragGear, NormalGear, SlideGear, ChoiceItem,  
    TitleBar, CardBase, Clickable, PopButton, GearCard, ListCard
  ];
  const dialogs = [AbstractDialog, ActionSheet, ChoiceDialog, InputDialog, LoadingDialog, MessageDialog, PinCodeDialog, ProgressDialog, ShareDialog];
  // allowFontScaling 属性未被嵌套
  components.forEach((component) => {
    component.defaultProps = Object.assign({}, component.defaultProps, { allowFontScaling: false });
  });
  // allowFontScaling 属性被嵌套到dialogStyle中
  // dialog 中的buttons 也具有allowFontScaling 属性，但buttons 默认为null，且为数组形式，强行加入默认值不妥
  dialogs.forEach((dialog) => {
    dialog.defaultProps.dialogStyle = Object.assign({}, dialog.defaultProps.dialogStyle, { allowFontScaling: false });
  });
  // allowFontScaling 属性被嵌套到datePickerStyle
  MHDatePicker.defaultProps.datePickerStyle = Object.assign({}, MHDatePicker.defaultProps.datePickerStyle, { allowFontScaling: false });
  // allowFontScaling 属性被嵌套到pickerInnerStyle，但是组件本身并未默认设置pickerInnerStyle
  StringSpinner.defaultProps = Object.assign({}, StringSpinner.defaultProps, { pickerInnerStyle: { allowFontScaling: false } });
  // SDK 中CommonSetting 页无法通过同种方式设置，需要单独修改allowFontScaling 为false
};
export default setGlobalFontScale;