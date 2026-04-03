import Host from 'miot/Host';
import { SWITCH_DEVICE_TYPE } from "../../Const";
/**
 * 导航逻辑 Hook
 * 封装页面跳转逻辑
 */
export const useNavigation = (props) => {
  const {
    switchSpec,
    switchClickSpec,
    relatedDevice,
    currentTagsScene,
    specButtonType,
    existTriggerScene,
    switchModeSpec,
    switchButtonType,
    switchTypeRef,
    relatedManualScene
  } = props;
  // 跳转智能灯选择页面
  const goSwitchLightSelectPage = () => {
    Host.ui.packageNavigate('AutoSwitchLightSelectPage', {
      params: {
        switchSpec,
        switchClickSpec,
        device: relatedDevice,
        tagsScene: currentTagsScene,
        backToSetting: true,
        specButtonType,
        existTriggerScene,
        switchModeSpec,
        switchButtonType,
        current: switchTypeRef.current || {}
      }
    });
  };
  // 跳转成员选择页面
  const goSwitchMembersSelectPage = () => {
    Host.ui.packageNavigate('AutoSwitchMembersSelectPage', {
      params: {
        switchSpec,
        switchClickSpec,
        device: relatedDevice,
        tagsScene: currentTagsScene,
        backToSetting: true,
        specButtonType,
        existTriggerScene,
        switchModeSpec,
        switchButtonType,
        current: switchTypeRef.current || {}
      }
    });
  };
  // 打开设备场景编辑页面
  const onOpenDeviceSceneEditPage = (type) => {
    const targetType = type ?? switchButtonType;
    if (targetType === SWITCH_DEVICE_TYPE.SMART_LIGHT) {
      goSwitchLightSelectPage();
    } else {
      goSwitchMembersSelectPage();
    }
  };
  // 打开手动场景选择页面
  // isTypeChange: 是否从其他控制类型切换过来（true 时清空已选的手动场景，但保留 tagsScene.scene_id 供 Edit 接口复用）
  const onOpenManualSceneSelectPage = (isTypeChange = false) => {
    Host.ui.packageNavigate('AutoSwitchManualSceneSelectPage', {
      params: {
        switchSpec,
        switchClickSpec,
        specButtonType,
        manualScene: isTypeChange ? {} : relatedManualScene,
        tagsScene: currentTagsScene,
        backToSetting: true,
        existTriggerScene,
        switchModeSpec,
        switchButtonType,
        current: switchTypeRef.current || {}
      }
    });
  };
  return {
    goSwitchLightSelectPage,
    goSwitchMembersSelectPage,
    onOpenDeviceSceneEditPage,
    onOpenManualSceneSelectPage
  };
};