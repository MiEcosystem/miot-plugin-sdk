'use strict';

import React from 'react';
import { Text } from 'react-native';
import { Host } from 'miot';
import {
  switchSpecs,
  switchModeSpecs,
  switchSensorModeSpecs,
  switchClickSpecs,
  switchDoubleClickSpecs,
  switchLongPressesSpecs
} from './SwitchIftttDemo';

// 这批页面读参数的层级不一致，传错层就白屏：
//   嵌套 { params: {...} } —— AutomationControl 系列、MiotDeviceInfoPage
//   平铺 {...}            —— PackageDynamicPage、MobileCardPage、CloudStorage、FirmwareUpgrade*
const nav = (route, params) => {
  Host.ui.packageNavigate(route, params);
};

// 保存类写操作只在用户点「保存」时触发，挂载不写；scene_id 为 0 可避开已关联分支
const tagsScene = { scene_id: 0, type: 0, name: '演示场景' };
const manualScene = { scene_id: 0, scene_name: '演示手动场景' };

const autoSelectParams = {
  switchSpec: switchSpecs[0],
  switchClickSpec: switchClickSpecs[0],
  switchModeSpec: switchModeSpecs[0],
  specButtonType: null,
  tagsScene,
  device: {},
  backToSetting: true,
  existTriggerScene: false,
  switchButtonType: '',
  current: {}
};

export default [
  {
    'name': '自动化控制主页（开关改版）',
    'subtitle': 'AutomationControlPage',
    'func': () => {
      nav('AutomationControlPage', {
        params: {
          switchSpecs,
          switchSpec: switchSpecs[0],
          switchModeSpec: switchModeSpecs[0],
          switchSensorModeSpec: switchSensorModeSpecs[0],
          switchClickSpec: switchClickSpecs[0],
          switchDoubleClickSpec: switchDoubleClickSpecs[0],
          switchLongPressesSpec: switchLongPressesSpecs[0],
          specButtonType: null,
          supportAiCtrl: true,
          memberId: 0,
          fromSceneLog: false,
          showAdvancedConfig: true
        }
      });
    }
  },
  {
    'name': '自动化-选择智能灯',
    'subtitle': 'AutoSwitchLightSelectPage',
    'func': () => {
      nav('AutoSwitchLightSelectPage', { params: autoSelectParams });
    }
  },
  {
    'name': '自动化-选择开关双控设备',
    'subtitle': 'AutoSwitchMembersSelectPage',
    'func': () => {
      nav('AutoSwitchMembersSelectPage', { params: autoSelectParams });
    }
  },
  {
    'name': '自动化-选择批量控制场景',
    'subtitle': 'AutoSwitchManualSceneSelectPage',
    'func': () => {
      nav('AutoSwitchManualSceneSelectPage', { params: { ...autoSelectParams, manualScene } });
    }
  },
  {
    'name': '设备信息页（更多信息）',
    'subtitle': 'MiotDeviceInfoPage',
    'func': () => {
      nav('MiotDeviceInfoPage', { params: {} });
    }
  },
  {
    'name': '插件动态页（标题+自定义内容）',
    'subtitle': 'PackageDynamicPage',
    'func': () => {
      nav('PackageDynamicPage', {
        title: '动态页标题演示',
        content: <Text style={{ marginHorizontal: 30, marginTop: 12, fontSize: 15 }}>
          这是通过 content 参数传入的自定义内容，用于查看 PackageDynamicPage 的排版与字体。
        </Text>,
        dialogCustomKey: ''
      });
    }
  },
  {
    'name': '流量卡页面',
    'subtitle': 'MobileCardPage',
    'func': () => {
      nav('MobileCardPage', {});
    }
  },
  {
    'name': '云存储开关页',
    'subtitle': 'CloudStorage',
    'func': () => {
      // value 走 navigation.state.params.value 且无默认值，必须显式传
      nav('CloudStorage', { value: false });
    }
  },
  {
    'name': '固件自动升级页',
    'subtitle': 'FirmwareUpgradeAuto',
    'func': () => {
      nav('FirmwareUpgradeAuto', { needRenderHeader: true });
    }
  },
  {
    'name': '固件升级记录页',
    'subtitle': 'FirmwareUpgradeRecord',
    'func': () => {
      nav('FirmwareUpgradeRecord', { needRenderHeader: true });
    }
  }
];
