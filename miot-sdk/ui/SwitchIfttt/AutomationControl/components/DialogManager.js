import React from 'react';
import { Text, Dimensions } from 'react-native';
import { AbstractDialog } from "mhui-rn";
import { LoadingDialog, MessageDialog } from "../../../Dialog";
import SwitchTypeSelectFragment from "./SwitchTypeSelectFragment";
import SwitchSensorModeTypeFragment from "./SwitchSensorModeTypeFragment";
import { strings as I18n } from "../../../../resources";
import DynamicColor, { dynamicColor } from '../../../Style/DynamicColor';
import { adjustSize } from '../../../../utils/sizes';
import { reportAutoSwitchClick, reportAutoSwitchView } from "../reportUtils";
/**
 * 对话框管理器组件
 * 统一管理所有对话框的显示和隐藏
 */
const DialogManager = ({
  // Message Dialog (Power Switch Confirm)
  messageVisible,
  dialogMessage,
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
  // Reporting
  subRef,
}) => {
  return (
    <>
      {/* 电源开关确认弹窗 */}
      <MessageDialog
        visible={messageVisible}
        useNewTheme={true}
        title={undefined}
        message={I18n.switch_autoCtrl_powerSwitch_confirmOff_desc}
        onDismiss={() => {
          onDismissMessage();
          // 保持开关开启状态
        }}
        buttons={[
          {
            ...cancelButton(() => {
              reportAutoSwitchClick({
                subRef,
                dialog_name: 'power_switch_comfrim_dialog',
                item_type: 'button',
                item_name: 'exit_button',
              });
              onDismissMessage();
            }),
            text: I18n.cancel,
          },
          confirmButton(() => {
            reportAutoSwitchClick({
              subRef,
              dialog_name: 'power_switch_comfrim_dialog',
              item_type: 'button',
              item_name: 'comfrim_button',
            });
            onDismissMessage();
            onConfirmPowerOff();
          }, { text: I18n.switch_listItem_value_voiceControlLoopOff }),
        ]}
        modalStyle={dialogCommonStyle(dynamicColor("#F7F7F7", "#242424"))}
        dialogStyle={DIALOG_STYLE_BASE}
      />
      {/* 操作模式弹窗 */}
      {ctrlModelDialogVisible && (
        <AbstractDialog
          visible={ctrlModelDialogVisible}
          title={I18n.switch_listItem_title_operationMode}
          useNewTheme={true}
          onDismiss={onDismissCtrlModel}
          buttons={[
            {
              ...cancelButton(() => {
                reportAutoSwitchView({
                  subRef,
                  dialog_name: 'controltype_select',
                  item_type: 'button',
                  item_name: 'cancel_button',
                });
                onDismissCtrlModel();
              }),
              text: I18n.cancel,
            },
            confirmButton(() => {
              reportAutoSwitchView({
                subRef,
                dialog_name: 'controltype_select',
                item_type: 'button',
                item_name: 'confirm_button',
              });
              onDismissCtrlModel();
              onConfirmSensorMode();
            }, { text: I18n.ok, disabled: tempSwitchSensorMode === null }),
          ]}
          style={dialogCommonStyle(dynamicColor("#F7F7F7", "#242424"))}
          dialogStyle={DIALOG_STYLE_BASE}
        >
          <SwitchSensorModeTypeFragment
            switchSensorMode={tempSwitchSensorMode}
            switchSensorModeSpec={switchSensorModeSpec}
            onChange={onChangeSensorMode}
          />
        </AbstractDialog>
      )}
      {/* 设备类型选择弹窗 */}
      {autoDialogVisible && (
        <AbstractDialog
          visible={autoDialogVisible}
          title={I18n.switch_autoCtrl_selectControlDevice_title}
          useNewTheme={true}
          onDismiss={onDismissAutoDialog}
          buttons={[
            { ...cancelButton(onDismissAutoDialog), text: I18n.cancel },
            confirmButton(() => { onConfirmSwitchType(tempSwitchType); }, { text: I18n.ok, disabled: !tempSwitchType }),
          ]}
          style={dialogCommonStyle(dynamicColor("#F7F7F7", "#242424"))}
          dialogStyle={DIALOG_STYLE_BASE}
        >
          <SwitchTypeSelectFragment
            selectedSwitchButtonType={tempSwitchType}
            onSwitchChange={onChangeSwitchType}
            showAdvanced={showAdvancedConfig}
          />
        </AbstractDialog>
      )}
      {/* 疾速模式二次确认弹窗 */}
      <MessageDialog
        visible={confirmSpeedModeVisible}
        useNewTheme={true}
        title={I18n.switch_autoCtrl_confirmToSpeedMode_title}
        message={I18n.switch_autoCtrl_confirmToSpeedMode_desc}
        onDismiss={onDismissConfirmSpeedMode}
        buttons={[
          { ...cancelButton(onDismissConfirmSpeedMode), text: I18n.cancel },
          confirmButton(onConfirmSpeedMode, { text: I18n.ok }),
        ]}
        modalStyle={dialogCommonStyle(dynamicColor("#F7F7F7", "#242424"))}
        dialogStyle={DIALOG_STYLE_BASE}
      />
      {/* 有线模式下已有自动化提示弹窗 */}
      <MessageDialog
        visible={!!wirelessHintDialogVisible}
        useNewTheme={true}
        message={I18n.switch_autoCtrl_wirelessHint_title}
        onDismiss={onDismissWirelessHint}
        buttons={[
          { ...cancelButton(onDismissWirelessHint), text: I18n.cancel },
          confirmButton(onConfirmWirelessHint, { text: I18n.ok }),
        ]}
        modalStyle={dialogCommonStyle(dynamicColor("#F7F7F7", "#242424"))}
        dialogStyle={DIALOG_STYLE_BASE}
      />
      {/* 切换到智能模式确认弹窗 */}
      {toSmartModeDialogVisible && (
        <AbstractDialog
          visible={toSmartModeDialogVisible}
          title={I18n.switch_autoCtrl_confirmToSmart_title}
          useNewTheme={true}
          onDismiss={onDismissToSmartMode}
          buttons={[
            { ...cancelButton(onDismissToSmartMode), text: I18n.cancel },
            confirmButton(() => { onDismissToSmartMode(); onConfirmToSmartMode(); }, { text: I18n.ok }),
          ]}
          style={dialogCommonStyle(dynamicColor("#F7F7F7", "#242424"))}
        >
          <Text style={modeDialogStyles.desc}>{I18n.switch_autoCtrl_confirmToSmart_desc}</Text>
        </AbstractDialog>
      )}
      {/* 切换到传统模式确认弹窗 */}
      {toTraditionalModeDialogVisible && (
        <AbstractDialog
          visible={toTraditionalModeDialogVisible}
          title={I18n.switch_autoCtrl_confirmToTraditional_title}
          useNewTheme={true}
          onDismiss={onDismissToTraditionalMode}
          buttons={[
            { ...cancelButton(onDismissToTraditionalMode), text: I18n.cancel },
            confirmButton(() => { onDismissToTraditionalMode(); onConfirmToTraditionalMode(); }, { text: I18n.ok }),
          ]}
          style={dialogCommonStyle(dynamicColor("#F7F7F7", "#242424"))}
        >
          <Text style={modeDialogStyles.desc}>{I18n.switch_autoCtrl_confirmToTraditional_desc}</Text>
        </AbstractDialog>
      )}
      {/* 自动化跳转弹窗（fromSceneLog 场景） */}
      {sceneLogDialogVisible && sceneLogDialogType === 'info' && (
        <AbstractDialog
          visible={sceneLogDialogVisible}
          title={sceneLogDialogTitle}
          useNewTheme={true}
          onDismiss={onDismissSceneLog}
          buttons={[
            confirmButton(onDismissSceneLog, { text: I18n.ok }),
          ]}
          style={dialogCommonStyle(dynamicColor("#F7F7F7", "#242424"))}
        >
          {!!sceneLogDialogDesc && (
            <Text style={modeDialogStyles.desc}>{sceneLogDialogDesc}</Text>
          )}
        </AbstractDialog>
      )}
      {sceneLogDialogVisible && sceneLogDialogType === 'confirm' && (
        <AbstractDialog
          visible={sceneLogDialogVisible}
          title={sceneLogDialogTitle}
          useNewTheme={true}
          onDismiss={onDismissSceneLog}
          buttons={[
            { ...cancelButton(onDismissSceneLog), text: I18n.cancel },
            confirmButton(() => { onDismissSceneLog(); onConfirmSceneLog && onConfirmSceneLog(); }, { text: I18n.ok }),
          ]}
          style={dialogCommonStyle(dynamicColor("#F7F7F7", "#242424"))}
        >
          {!!sceneLogDialogDesc && (
            <Text style={modeDialogStyles.desc}>{sceneLogDialogDesc}</Text>
          )}
        </AbstractDialog>
      )}
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
const DIALOG_STYLE_BASE = { titleStyle: { fontSize: 18 } };
const cancelButton = (callback) => ({
  text: null, // 由调用方传入
  backgroundColor: {
    bgColorNormal: dynamicColor('rgba(0,0,0,0.06)', 'rgba(255, 255, 255, 0.15)'),
  },
  titleColor: dynamicColor('rgba(0,0,0,0.8)', 'rgba(255, 255, 255, 0.7)'),
  callback,
});
const confirmButton = (callback, extra = {}) => ({
  backgroundColor: {
    bgColorNormal: dynamicColor('#0CCE94', '#00BA7C'),
  },
  titleColor: dynamicColor('#FFF', '#FFF'),
  callback,
  ...extra,
});
const DIALOG_WIDTH = Dimensions.get('window').width - 24;
const dialogCommonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  marginHorizontal: 12,
  marginBottom: 28,
  width: DIALOG_WIDTH,
  borderRadius: 20,
  overflow: 'hidden',
});
const modeDialogStyles = {
  desc: {
    fontSize: 14,
    lineHeight: 20,
    color: dynamicColor('rgba(0,0,0,0.6)', 'rgba(255,255,255,0.6)'),
    paddingHorizontal: adjustSize(48),
    paddingBottom: adjustSize(24),
  },
};
export default DialogManager;