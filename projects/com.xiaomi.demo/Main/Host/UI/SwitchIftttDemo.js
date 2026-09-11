'use strict';

import { Host } from 'miot';

// siid 取 92~97 而非真实开关的 2~7：这些页面挂载时会向 switchModeSpec.siid/piid
// 写属性（SwitchButtonSettingPage.js:246）、写 deviceSetting（SwitchButtonSelectPage.js:105），
// 高位 siid 在真机上不存在，写请求会被服务端拒绝，避免误改 demo 绑定设备的真实配置。
const KEYS = [
  { siid: 92, sensorSiid: 95, description: 'Left Switch Service', sensorDescription: 'Left Switch Sensor', i18n: '左键' },
  { siid: 93, sensorSiid: 96, description: 'Middle Switch Service', sensorDescription: 'Middle Switch Sensor', i18n: '中键' },
  { siid: 94, sensorSiid: 97, description: 'Right Switch Service', sensorDescription: 'Right Switch Sensor', i18n: '右键' }
];

export const switchSpecs = KEYS.map(({ siid, description, i18n }) => {
  return { siid, piid: 1, description, i18n };
});

// Wireless 故意设为 null：页面内 switchMode 初始态就是 null，使
// `switchMode === switchModeSpec.prop['Wireless']` 成立，从而让「小爱语控」
// 「操作模式」两行渲染出来（否则需真机已转无线才可见）。
export const switchModeSpecs = KEYS.map(({ siid, description }) => {
  return { siid, piid: 2, description, prop: { 'Wireless': null, 'Wired And Wireless': 0 } };
});

const buildEventSpecs = (eiid, prefix) => {
  return KEYS.map(({ sensorSiid, sensorDescription, i18n }) => {
    return { siid: sensorSiid, eiid, description: sensorDescription, i18n: `${ prefix }${ i18n }` };
  });
};

export const switchClickSpecs = buildEventSpecs(1, '单击');
export const switchDoubleClickSpecs = buildEventSpecs(2, '双击');
export const switchLongPressesSpecs = buildEventSpecs(3, '长按');

export const switchSensorModeSpecs = KEYS.map(({ sensorSiid, sensorDescription }) => {
  return {
    siid: sensorSiid,
    piid: 1,
    description: sensorDescription,
    prop: { 'Quick Single Click': 0, 'Multiple Click': 1 },
    speedModeSelectMsg: '当前设备设置了「双击」或「长按」的自动化。疾速模式下，相关自动化将无法响应',
    multipleClickSubtitle: '若该设备需要设置「双击」或「长按」的自动化，请选择此项'
  };
});

// scene_id 为 0（falsy）可避开「已关联场景」分支，也避免任何真实场景被改动
const tagsScene = { scene_id: 0, type: 0, name: '演示场景' };
const manualScene = { scene_id: 0, scene_name: '演示手动场景' };

const navigate = (route, params) => {
  Host.ui.packageNavigate(route, { params });
};

export default [
  {
    'name': '开关面板-控制设备列表（多键）',
    'subtitle': 'SwitchButtonSelectPage',
    'func': () => {
      navigate('SwitchButtonSelectPage', {
        switchSpecs,
        switchModeSpecs,
        switchSensorModeSpecs,
        switchClickSpecs,
        switchDoubleClickSpecs,
        switchLongPressesSpecs,
        specButtonType: null,
        supportAiCtrl: true
      });
    }
  },
  {
    'name': '开关面板-单个按键设置',
    'subtitle': 'SwitchButtonSettingPage',
    'func': () => {
      navigate('SwitchButtonSettingPage', {
        switchSpecs,
        switchSpec: switchSpecs[0],
        switchModeSpec: switchModeSpecs[0],
        switchSensorModeSpec: switchSensorModeSpecs[0],
        switchClickSpec: switchClickSpecs[0],
        switchDoubleClickSpec: switchDoubleClickSpecs[0],
        switchLongPressesSpec: switchLongPressesSpecs[0],
        specButtonType: null,
        supportAiCtrl: true,
        memberId: 0
      });
    }
  },
  {
    'name': '开关面板-选择控制类型',
    'subtitle': 'SwitchTypeSelectPage',
    'func': () => {
      navigate('SwitchTypeSelectPage', {
        switchSpecs,
        switchSpec: switchSpecs[0],
        switchModeSpec: switchModeSpecs[0],
        switchClickSpec: switchClickSpecs[0],
        specButtonType: null,
        device: {},
        tagsScene,
        manualScene,
        selectedSwitchButtonType: '',
        memberId: 0
      });
    }
  },
  {
    'name': '开关面板-操作模式（疾速/标准）',
    'subtitle': 'SwitchSensorModeSettingPage',
    'func': () => {
      navigate('SwitchSensorModeSettingPage', {
        switchSpec: switchSpecs[0],
        switchSensorModeSpec: switchSensorModeSpecs[0],
        switchDoubleClickSpec: switchDoubleClickSpecs[0],
        switchLongPressesSpec: switchLongPressesSpecs[0],
        specButtonType: null
      });
    }
  },
  {
    'name': '开关面板-小爱语控设置',
    'subtitle': 'SwitchVoiceControlSettingPage',
    'func': () => {
      navigate('SwitchVoiceControlSettingPage', { memberId: 0, aiCtrlStatus: 1 });
    }
  },
  {
    'name': '开关面板-选择智能灯',
    'subtitle': 'SwitchLightSelectPage',
    'func': () => {
      navigate('SwitchLightSelectPage', {
        switchSpec: switchSpecs[0],
        switchClickSpec: switchClickSpecs[0],
        specButtonType: null,
        tagsScene,
        device: {},
        backToSetting: true,
        existTriggerScene: false
      });
    }
  },
  {
    'name': '开关面板-选择开关双控设备',
    'subtitle': 'SwitchMembersSelectPage',
    'func': () => {
      navigate('SwitchMembersSelectPage', {
        switchSpec: switchSpecs[0],
        switchClickSpec: switchClickSpecs[0],
        specButtonType: null,
        tagsScene,
        device: {},
        backToSetting: true,
        existTriggerScene: false
      });
    }
  },
  {
    'name': '开关面板-选择批量控制场景',
    'subtitle': 'SwitchManualSceneSelectPage',
    'func': () => {
      navigate('SwitchManualSceneSelectPage', {
        switchSpec: switchSpecs[0],
        switchClickSpec: switchClickSpecs[0],
        specButtonType: null,
        tagsScene,
        manualScene,
        backToSetting: true,
        existTriggerScene: false
      });
    }
  },
  {
    'name': '开关面板-场景更多（执行方式/删除）',
    'subtitle': 'SwitchSceneDeletePage',
    'func': () => {
      navigate('SwitchSceneDeletePage', { tagsScene });
    }
  }
];
