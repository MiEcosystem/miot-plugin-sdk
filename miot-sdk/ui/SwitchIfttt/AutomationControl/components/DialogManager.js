import React from 'react';
import { Text } from 'react-native';
import { ActionCustomDialog, MessageDialog } from 'mhui-rn/dist/hyperOS';
import { LoadingDialog } from "../../../Dialog";
import SwitchTypeSelectFragment from "./SwitchTypeSelectFragment";
import SwitchSensorModeTypeFragment from "./SwitchSensorModeTypeFragment";
import SwitchSensorModeFragment from "./SwitchSensorModeFragment";
import { strings as I18n } from "../../../../resources";
import { dynamicColor } from '../../../Style/DynamicColor';
/**
 * 对话框管理器组件
 * 统一管理所有对话框的显示和隐藏
 */
const DialogManager = ({
  // Message Dialog (Power Switch Confirm)
  messageVisible,
  onDismissMessage,
  onConfirmPowerOff,
  // Operation Mode Dialog
  ctrlModelDialogVisible,
  tempSwitchSensorMode,
  switchSensorModeSpec,
  onDismissCtrlModel,
  onConfirmSensorMode,
  onChangeSensorMode,
  // Switch Type Dialog
  autoDialogVisible,
  tempSwitchType,
  onDismissAutoDialog,
  onConfirmSwitchType,
  onChangeSwitchType,
  showAdvancedConfig,
  // Confirm Speed Mode Dialog
  confirmSpeedModeVisible,
  onDismissConfirmSpeedMode,
  onConfirmSpeedMode,
  // Wireless Hint Dialog (首次进入有线模式且有自动化时)
  wirelessHintDialogVisible,
  wirelessHintHasDoubleOrLong,
  onDismissWirelessHint,
  onConfirmWirelessHint,
  // To Smart Mode Confirm Dialog
  toSmartModeDialogVisible,
  onDismissToSmartMode,
  onConfirmToSmartMode,
  // To Traditional Mode Confirm Dialog
  toTraditionalModeDialogVisible,
  onDismissToTraditionalMode,
  onConfirmToTraditionalMode,
  // Scene Log Dialog (fromSceneLog scenario)
  sceneLogDialogVisible,
  sceneLogDialogType, // 'info' | 'confirm'
  sceneLogDialogTitle,
  sceneLogDialogDesc,
  onDismissSceneLog,
  onConfirmSceneLog,
  // Loading
  loadingVisible,
  loadingMessage,
}) => {
  return (
    <>
      {/* 电源开关确认弹窗 */}
      <MessageDialog
        visible={messageVisible}
        title={I18n.switch_autoCtrl_powerSwitch_confirmOff_desc}
        contentType={'none'}
        onDismiss={onDismissMessage}
        buttons={[
          {
            title: I18n.cancel,
            type: 'normal',
            callback: onDismissMessage,
          },
          {
            title: I18n.switch_listItem_value_voiceControlLoopOff,
            type: 'primary',
            colorType: 'green',
            callback: () => {
              onDismissMessage();
              onConfirmPowerOff();
            },
          },
        ]}
      />
      {/* 操作模式弹窗 */}
      {ctrlModelDialogVisible && (
        <ActionCustomDialog
          visible={ctrlModelDialogVisible}
          title={I18n.switch_listItem_title_operationMode}
          colorDepth="low"
          onDismiss={onDismissCtrlModel}
          buttons={[
            {
              title: I18n.cancel,
              type: 'normal',
              callback: onDismissCtrlModel,
            },
            {
              title: I18n.ok,
              type: 'primary',
              colorType: 'green',
              disabled: tempSwitchSensorMode === null,
              callback: () => {
                onDismissCtrlModel();
                onConfirmSensorMode();
              },
            },
          ]}
        >
          <SwitchSensorModeFragment
            switchSensorMode={tempSwitchSensorMode}
            switchSensorModeSpec={switchSensorModeSpec}
            onChange={onChangeSensorMode}
          />
        </ActionCustomDialog>
      )}
      {/* 设备类型选择弹窗 */}
      {autoDialogVisible && (
        <ActionCustomDialog
          colorDepth={'low'}
          visible={autoDialogVisible}
          title={I18n.switch_autoCtrl_selectControlDevice_title}
          onDismiss={onDismissAutoDialog}
          buttons={[
            {
              title: I18n.cancel,
              type: 'normal',
              callback: onDismissAutoDialog,
            },
            {
              title: I18n.ok,
              type: 'primary',
              colorType: 'green',
              disabled: !tempSwitchType,
              callback: () => { onConfirmSwitchType(tempSwitchType); },
            },
          ]}
        >
          <SwitchTypeSelectFragment
            selectedSwitchButtonType={tempSwitchType}
            onSwitchChange={onChangeSwitchType}
            showAdvanced={showAdvancedConfig}
          />
        </ActionCustomDialog>
      )}
      {/* 疾速模式二次确认弹窗 */}
      <MessageDialog
        visible={confirmSpeedModeVisible}
        title={I18n.switch_autoCtrl_confirmToSpeedMode_title}
        contentText={I18n.switch_autoCtrl_confirmToSpeedMode_desc}
        onDismiss={onDismissConfirmSpeedMode}
        buttons={[
          {
            title: I18n.cancel,
            type: 'normal',
            callback: onDismissConfirmSpeedMode,
          },
          {
            title: I18n.ok,
            type: 'primary',
            colorType: 'green',
            callback: onConfirmSpeedMode,
          },
        ]}
      />
      {/* 有线模式下已有自动化提示弹窗 */}
      <MessageDialog
        contentType={'none'}
        visible={!!wirelessHintDialogVisible}
        title={I18n.switch_autoCtrl_wirelessHint_title}
        onDismiss={onDismissWirelessHint}
        buttons={[
          {
            title: I18n.cancel,
            type: 'normal',
            callback: onDismissWirelessHint,
          },
          {
            title: I18n.ok,
            type: 'primary',
            colorType: 'green',
            callback: onConfirmWirelessHint,
          },
        ]}
      />
      {/* 切换到智能模式确认弹窗 */}
      <MessageDialog
        visible={!!toSmartModeDialogVisible}
        title={I18n.switch_autoCtrl_confirmToSmart_title}
        contentText={I18n.switch_autoCtrl_confirmToSmart_desc}
        onDismiss={onDismissToSmartMode}
        buttons={[
          {
            title: I18n.cancel,
            type: 'normal',
            callback: onDismissToSmartMode,
          },
          {
            title: I18n.ok,
            type: 'primary',
            colorType: 'green',
            callback: () => { onDismissToSmartMode(); onConfirmToSmartMode(); },
          },
        ]}
      />
      {/* 切换到传统模式确认弹窗 */}
      <MessageDialog
        visible={!!toTraditionalModeDialogVisible}
        title={I18n.switch_autoCtrl_confirmToTraditional_title}
        contentText={I18n.switch_autoCtrl_confirmToTraditional_desc}
        onDismiss={onDismissToTraditionalMode}
        buttons={[
          {
            title: I18n.cancel,
            type: 'normal',
            callback: onDismissToTraditionalMode,
          },
          {
            title: I18n.ok,
            type: 'primary',
            colorType: 'green',
            callback: () => { onDismissToTraditionalMode(); onConfirmToTraditionalMode(); },
          },
        ]}
      />
      {/* 自动化跳转弹窗（fromSceneLog 场景） */}
      <ActionCustomDialog
        visible={!!(sceneLogDialogVisible && sceneLogDialogType === 'info')}
        title={sceneLogDialogTitle}
        onDismiss={onDismissSceneLog}
        buttons={[
          {
            title: I18n.ok,
            type: 'primary',
            colorType: 'green',
            callback: onDismissSceneLog,
          },
        ]}
      >
        {!!sceneLogDialogDesc && (
          <Text style={modeDialogStyles.desc}>{sceneLogDialogDesc}</Text>
        )}
      </ActionCustomDialog>
      <ActionCustomDialog
        visible={!!(sceneLogDialogVisible && sceneLogDialogType === 'confirm')}
        title={sceneLogDialogTitle}
        onDismiss={onDismissSceneLog}
        buttons={[
          {
            title: I18n.cancel,
            type: 'normal',
            callback: onDismissSceneLog,
          },
          {
            title: I18n.ok,
            type: 'primary',
            colorType: 'green',
            callback: () => { onDismissSceneLog(); onConfirmSceneLog && onConfirmSceneLog(); },
          },
        ]}
      >
        {!!sceneLogDialogDesc && (
          <Text style={modeDialogStyles.desc}>{sceneLogDialogDesc}</Text>
        )}
      </ActionCustomDialog>
      {/* 加载弹窗 */}
      <LoadingDialog
        visible={loadingVisible}
        useNewTheme={true}
        message={loadingMessage ?? I18n.common_saving}
        timeout={0}
        onDismiss={() => {}}
        dialogStyle={{}}
      />
    </>
  );
};
const modeDialogStyles = {
  desc: {
    fontSize: 14,
    lineHeight: 20,
    color: dynamicColor('rgba(0,0,0,0.6)', 'rgba(255,255,255,0.6)'),
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
};
export default DialogManager;