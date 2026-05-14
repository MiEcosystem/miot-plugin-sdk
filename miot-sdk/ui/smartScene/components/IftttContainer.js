import React, { useEffect } from 'react';
import { View, Text, Dimensions } from "react-native";
import { ContainerWithGap, dynamicColor } from "miot/ui/index";
import IftttItem from "./IftttItem";
import Host from "../../../Host";
import { Device } from "../../../index";
import DynamicColor from "../../Style/DynamicColor";
import { strings as I18n } from 'miot/resources';
import { getLocalI18n } from '../../SwitchIfttt/utils';
import useDeviceRoomInfo from '../../../hooks/useDeviceRoomInfo';
import { IftttTemplateUtils } from '../utils';
/**
 * @description 自定义万字显示
 * @author guhao
 * @date 29/01/2024
 * @export
 * @param {string} value
 * @param {string} type floor: 向下取整  ceil: 向上取整
 * @returns {string} 中文：xxx万 其他语种 123,99,3
 */
export function toBigNumberString(value, type = 'floor') {
  if (value) {
    const stringValue = String(value);
    if (Host.locale.language === 'zh') {
      if (stringValue.length > 4) {
        return `${ type === 'floor' ? Math.floor(Number(value) / 10000) : Math.ceil(Number(value) / 10000) }万`;
      }
      return value;
    } else {
      if (stringValue.length > 3) {
        const sliceArray = [];
        for (let index = stringValue.length; index > 0; index -= 3) {
          sliceArray.push(stringValue.substring(index - 3, index));
        }
        return sliceArray.reverse().join(',');
      }
      return value;
    }
  }
  return value;
}
const IftttContainer = (props) => {
  const { templateInfo = [], disabled = false } = props;
  const [lines, setLines] = React.useState(1);
  return (
    <>
      <ContainerWithGap
        horizontal={true}
        containerStyle={{
          marginHorizontal: 16,
          marginBottom: 20,
          alignItems: 'stretch'
        }}
        gap={12}
      >
        {templateInfo.map((item, i) => {
          const {
            open_quantity,
            can_open,
            trigger_icon_list = [],
            action_icon_list = [],
            name,
            openStatus,
            template_id,
            scene_id,
            template_type
          } = item || {};
          const title = name || '';
          const subtitle = openStatus ? I18n['scene_active_done'] : can_open ? I18n['scene_can_turnOn'] : '';
          const subTitleValue = open_quantity ? toBigNumberString(open_quantity) : 0;
          const subtitleStyle = !openStatus && can_open ? {
            color: dynamicColor('#00B884', '#00B380')
          } : {};
          const subtitleSubscript = openStatus || can_open ? ` | ${ getLocalI18n('scene_active_people', [subTitleValue]) }` : getLocalI18n('scene_active_people', [subTitleValue]);
          const trackParams = {
            ...(props.trackParams || {}),
            item_name: "recommendation_template",
            template_id: template_id
          };
          return (
            <IftttItem
              key={i}
              title={title}
              subtitle={subtitle}
              subtitleStyle={subtitleStyle}
              subtitleSubscript={subtitleSubscript}
              triggerIcons={
                trigger_icon_list
              }
              disabled={disabled}
              actionIcons={
                (action_icon_list || []).slice(0, (Dimensions.get('window').width > 380 || templateInfo?.length === 2) ? 2 : 1)
              }
              lines={lines}
              setLines={setLines}
              onPress={() => {
                IftttTemplateUtils.report('click', trackParams);
                const params = {
                  tempID: template_id,
                  did: Device.deviceID,
                  real_did: Device.deviceID,
                  edit_from: 17,
                  template_type: template_type,
                  template_name: title
                };
                if (scene_id) params.scene_id = scene_id;
                Host.ui.openTemplateScenePage(params);
              }}
              trackParams={trackParams}
            />
          );
        })}
      </ContainerWithGap>
    </>
  );
};
export default IftttContainer;