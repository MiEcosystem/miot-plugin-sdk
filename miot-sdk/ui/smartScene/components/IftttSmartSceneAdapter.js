import React, { useContext, useMemo } from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ConfigContext } from 'miot/ui/hyperOSUI';
import { strings as I18n } from 'miot/resources';
import IftttSceneCard from './IftttSceneCard';
import { toBigNumberString } from './IftttContainer';
import Images, { getImage } from '../images';
import { getLocalI18n } from '../../SwitchIfttt/utils';
import { Device, Host, Service } from '../../../index';
import { IftttTemplateUtils } from '../utils';
const HEADER_ICON_SIZE = 24;
const SCENE_ICON_SIZE = 36;
const DEFAULT_HEADER_ICON_INNER = 20;
const DefaultHeaderIcon = () => {
  const { colorToken } = useContext(ConfigContext);
  return (
    <View style={styles.defaultHeaderIcon}>
      <Svg
        width={DEFAULT_HEADER_ICON_INNER}
        height={DEFAULT_HEADER_ICON_INNER}
        viewBox="0 0 15.8333 17.0618"
        fill="none"
      >
        <Path
          d="M6.74723 0.290359C7.47877 -0.0967859 8.35457 -0.0967868 9.0861 0.290359L14.5028 3.1582C15.3211 3.59148 15.8333 4.44169 15.8333 5.36768V11.6942C15.8333 12.6201 15.3211 13.4704 14.5028 13.9037L9.0861 16.7715C8.3546 17.1586 7.47874 17.1586 6.74723 16.7715L1.33057 13.9037C0.563321 13.4975 0.0649435 12.7247 0.00569662 11.8667L0 11.6942V5.36768C1.88157e-05 4.44169 0.512206 3.59148 1.33057 3.1582L6.74723 0.290359ZM8.30648 1.76334C8.06267 1.63434 7.77067 1.63434 7.52686 1.76334L2.11019 4.63119C1.83744 4.77561 1.66669 5.05904 1.66667 5.36768V11.6942L1.6748 11.8081C1.71114 12.0712 1.87143 12.3043 2.11019 12.4307L7.52686 15.2985C7.77063 15.4275 8.0627 15.4275 8.30648 15.2985L13.7231 12.4307C13.9959 12.2863 14.1666 12.0028 14.1667 11.6942V5.36768C14.1666 5.05904 13.9959 4.77561 13.7231 4.63119L8.30648 1.76334ZM9.95443 6.1709C10.3374 5.91561 10.8547 6.01908 11.11 6.40202C11.3653 6.78496 11.2618 7.30234 10.8789 7.55762L8.75 8.9769V11.0309C8.74995 11.4911 8.37687 11.8643 7.91667 11.8643C7.45646 11.8643 7.08339 11.4911 7.08333 11.0309V8.9769L4.95443 7.55762C4.57151 7.30234 4.46807 6.78496 4.72331 6.40202C4.9786 6.01908 5.49597 5.91561 5.87891 6.1709L7.91667 7.52914L9.95443 6.1709Z"
          fill={colorToken.contentPrimaryNormal}
        />
      </Svg>
    </View>
  );
};
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
    hasData = true,
  } = props;
  const items = useMemo(() => templateInfo.map(buildSceneItem), [templateInfo]);
  hasData = hasData && templateInfo.length === 2 && serverCode === 'cn';
  let headerIcon;
  if (titleIcon) {
    headerIcon = titleIcon;
  } else {
    headerIcon = <DefaultHeaderIcon/>;
  }
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
  defaultHeaderIcon: {
    width: HEADER_ICON_SIZE,
    height: HEADER_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sceneIcon: {
    width: SCENE_ICON_SIZE,
    height: SCENE_ICON_SIZE,
    resizeMode: 'contain',
  },
});
export default IftttSmartSceneAdapter;