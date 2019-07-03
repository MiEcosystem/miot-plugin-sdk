import AbstractDialog from "./AbstractDialog";
import LoadingDialog from "./LoadingDialog";
import ProgressDialog from "./ProgressDialog";
import MessageDialog from "./MessageDialog";
import InputDialog from "./InputDialog";
import PinCodeDialog from "./PinCodeDialog";
import ShareDialog from "./ShareDialog";
import ActionSheet from "./ActionSheet";
import ChoiceDialog from "./ChoiceDialog";
export {
  /**
   * 通用弹窗容器，包括头部标题和底部按钮，内容自定义
   */
  AbstractDialog,
  /**
   * 加载弹窗，显示加载旋转动画和提示信息
   */
  LoadingDialog,
  /**
   * 进度条弹窗，显示进度条和提示信息
   */
  ProgressDialog,
  /**
   * 消息弹窗，用于提示用户
   */
  MessageDialog,
  /**
   * 输入弹窗，提示用户录入信息并记录
   */
  InputDialog,
  /**
   * 密码/验证码弹窗，用于输入密码/验证码
   */
  PinCodeDialog,
  /**
  * 分享弹窗，弹窗让用户指定分享渠道
  */
  ShareDialog,
  /**
   * 选项弹窗，无选择态，点击后弹窗消失
   */
  ActionSheet,
  /**
   * 选项弹窗，有选择态，可以定义是单选还是多选
   */
  ChoiceDialog
};