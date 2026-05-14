import React, { useMemo } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { strings as I18n } from 'miot/resources';
import IftttSceneCard from './IftttSceneCard';
import { toBigNumberString } from './IftttContainer';
import Images, { getImage } from '../images';
import { getLocalI18n } from '../../SwitchIfttt/utils';
import { Device, Host, Service } from '../../../index';
import { IftttTemplateUtils } from '../utils';
const HEADER_ICON_SIZE = 24;
const SCENE_ICON_SIZE = 36;
/**
 * 把单条 templateInfo 适配成 IftttSceneCard 期望的 SmartSceneItem
 */
function buildSceneItem(item) {
  const {
    open_quantity,
    can_open,
    trigger_icon_list = [],
    action_icon_list = [],
    name,
    openStatus,
  } = item || {};
  const openQuantityValue = open_quantity ? toBigNumberString(open_quantity) : 0;
  const status = openStatus
    ? I18n['scene_active_done']
    : (can_open ? I18n['scene_can_turnOn'] : '');
  const statusTone = openStatus ? 'active' : (can_open ? 'canOpen' : 'normal');
  const usage = getLocalI18n('scene_active_people', [openQuantityValue]);
  const triggerIcons = trigger_icon_list && trigger_icon_list.length
    ? trigger_icon_list.map((uri, idx) => (
      <Image key={`trigger-${ idx }`} style={styles.sceneIcon} source={{ uri }}/>
    ))
    : [<Image key="trigger-fallback" style={styles.sceneIcon} source={Images['mi-log']}/>];
  const actionIconUris = (action_icon_list || []).slice(
    0,
    Dimensions.get('window').width > 380 ? 2 : 1
  );
  const actionIcons = actionIconUris.length
    ? actionIconUris.map((uri, idx) => (
      <Image key={`action-${ idx }`} style={styles.sceneIcon} source={{ uri }}/>
    ))
    : [<Image key="action-fallback" style={styles.sceneIcon} source={Images['mi-log']}/>];
  return {
    title: name || '',
    status,
    statusTone,
    usage,
    triggerIcons,
    actionIcons,
  };
}
const IftttSmartSceneAdapter = (props) => {
  let {
    templateInfo = [],
    serverCode = '',
    disabled = false,
    isWearStyle = false,
    trackParams = {},
    titleIcon,
    showLeadingIcon = true,
    hasData=true
  } = props;
  const items = useMemo(() => templateInfo.map(buildSceneItem), [templateInfo]);
  hasData = hasData && templateInfo.length === 2 && serverCode === 'cn';
  const headerIconSource = titleIcon
    || (isWearStyle ? getImage('wear-scene') : getImage('ifttt-h'));
  const headerIcon = titleIcon || <Image style={styles.headerIcon} source={headerIconSource}/>;
  const onPressHeader = () => {
    IftttTemplateUtils.report('click', { ...trackParams });
    Service.scene.openIftttAutoPage();
  };
  const onPressItem = (_item, index) => {
    const raw = templateInfo[index] || {};
    const itemTrackParams = {
      ...trackParams,
      item_name: 'recommendation_template',
      template_id: raw.template_id,
    };
    IftttTemplateUtils.report('click', itemTrackParams);
    const params = {
      tempID: raw.template_id,
      did: Device.deviceID,
      real_did: Device.deviceID,
      edit_from: 17,
      template_type: raw.template_type,
      template_name: raw.name,
    };
    if (raw.scene_id) params.scene_id = raw.scene_id;
    Host.ui.openTemplateScenePage(params);
  };
  return (
    <IftttSceneCard
      title={I18n['ifttt']}
      showLeadingIcon={showLeadingIcon}
      headerIcon={headerIcon}
      disabled={disabled}
      wear={isWearStyle}
      hasData={hasData}
      items={items}
      onPressHeader={onPressHeader}
      onPressItem={onPressItem}
    />
  );
};
const styles = StyleSheet.create({
  headerIcon: {
    width: HEADER_ICON_SIZE,
    height: HEADER_ICON_SIZE,
    resizeMode: 'contain',
  },
  sceneIcon: {
    width: SCENE_ICON_SIZE,
    height: SCENE_ICON_SIZE,
    resizeMode: 'contain',
  },
});
export default IftttSmartSceneAdapter;