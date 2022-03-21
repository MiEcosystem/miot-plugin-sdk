import React, { Fragment, useState, useEffect } from 'react';
import { Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Service, Package, Device } from 'miot';
import { strings as I18n } from '../../resources';
import { ListItem, ListItemWithSwitch, ListItemWithSlider } from '../ListItem';
import { dynamicStyleSheet } from '../Style/DynamicStyleSheet';
import DynamicColor from '../Style/DynamicColor';
import specifyComponent from '../../utils/specify-component';
import { getI18nForSpecs } from '../../utils/get-instance-i18n';
import { adjustSize } from '../../utils/sizes';
import { FontDefault } from '../../utils/fonts';
import { showError, showSelector } from '../../utils/dialog-manager';
import { setProps } from '../../utils/data-manager';
function goDynamicPage({ dialogCustomKey, title, items }) {
  Package.navigate('PackageDynamicPage', {
    title,
    dialogCustomKey,
    content: (
      <Fragment>
        {items.map((item, index) => {
          return (
            <SpecItem key={index} {...item} dialogCustomKey={dialogCustomKey} />
          );
        })}
      </Fragment>
    )
  });
}
export default function SpecItem({
  dialogCustomKey,
  siid,
  piid,
  title,
  subtitle,
  image,
  selectorSubtitles = [],
  items
}) {
  const [specInfo, setSpecInfo] = useState({});
  useEffect(() => {
    if (siid && piid) {
      Service.spec.getSpecByIid(Device.deviceID, { siid, piid }).then((spec) => {
        if (!spec) { return; }
        const vl = spec['value-list'];
        if (!vl || !vl.length) {
          setSpecInfo({
            ...specInfo,
            prop: spec
          });
        }
        getI18nForSpecs(vl.map((v, index) => {
          return {
            siid,
            piid,
            viid: index
          };
        })).then((i18ns) => {
          setSpecInfo({
            ...specInfo,
            prop: spec,
            i18nVl: i18ns
          });
        }).catch(() => {});
      }).catch(() => {});
    }
  }, [siid, piid]);
  const { prop, i18nVl } = specInfo || {};
  const hasSubPage = (items?.length || 0) > 0;
  // 配置了spec, 却拉不到功能定义，则无效，不展示
  if (siid && !prop) {
    return null;
  }
  // image
  const domImage = image ? (
    <Image style={Styles.image} source={{ uri: image }} />
  ) : null;
  // 如果有image, 则subtitle 表示该image 的描述
  const domText = image && subtitle ? (
    <Text style={Styles.text}>{subtitle}</Text>
  ) : null;
  const format = prop?.format;
  const vr = prop?.['value-range'];
  const vl = prop?.['value-list'];
  const TargetComponent = specifyComponent((format === 'bool' && !hasSubPage) ? ListItemWithSwitch : (vr && !hasSubPage) ? ListItemWithSlider : ListItem, {
    handle() {
      const currentValue = this.values[0];
      const newState = {
        disabled: !Device.isOnline,
        useNewType: true,
        title,
        subtitle: image ? '' : subtitle
      };
      if (format === 'bool' && !hasSubPage) {
        // ListItemWithSwitch
        newState.value = !!currentValue;
        newState.onValueChange = (v) => {
          setProps([{ siid, piid, value: v }]).catch(() => {
            showError({}, dialogCustomKey);
          });
        };
      } else if (vr && !hasSubPage) {
        // ListItemWithSlider
        newState.subtitle = '';
        newState.sliderProps = {
          minimumValue: vr[0],
          maximumValue: vr[1],
          value: currentValue || 0
        };
        newState.onSlidingComplete = (v) => {
          setProps([{ siid, piid, value: v }]).catch(() => {
            showError({}, dialogCustomKey);
          });
        };
      } else {
        // ListItem
        // value
        if (format === 'bool') {
          newState.value = currentValue ? I18n.open : I18n.close;
        } else if (vl) {
          newState.value = (i18nVl || [])[vl.findIndex(({ value }) => value === currentValue)];
        } else if (vr) {
          newState.value = [undefined, null].includes(currentValue) ? '' : currentValue;
        }
        // onPress
        if (hasSubPage) {
          newState.onPress = () => {
            goDynamicPage({ dialogCustomKey, title, items });
          };
        } else if (vl) {
          newState.onPress = () => {
            if (!i18nVl || !i18nVl.length) { return; }
            showSelector({
              options: vl.map((v, index) => {
                return {
                  title: i18nVl[index] || '',
                  subtitle: selectorSubtitles[index] || ''
                };
              }),
              selectedIndexs: [vl.findIndex(({ value }) => value === this.values[0])],
              onSelect: (vs) => {
                setProps([{ siid, piid, value: vl[vs[0]].value }]).catch(() => {
                  showError({}, dialogCustomKey);
                });
              }
            }, dialogCustomKey);
          };
        }
        // hideArrow
        newState.hideArrow = !hasSubPage && !vl;
      }
      this.setState(newState);
    }
  });
  const domListItem = !title ? null : (
    <TargetComponent specs={siid ? [{ siid, piid }] : []} />
  );
  return (
    <Fragment>
      { domImage }
      { domText }
      { domListItem }
    </Fragment>
  );
}
SpecItem.propTypes = {
  dialogCustomKey: PropTypes.string,
  siid: PropTypes.number,
  piid: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  selectorSubtitles: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.array
};
const Styles = dynamicStyleSheet({
  text: {
    fontFamily: FontDefault,
    fontSize: 12,
    lineHeight: 18,
    color: new DynamicColor('#999', '#999'),
    marginTop: adjustSize(60),
    marginHorizontal: adjustSize(81)
  },
  image: {
    width: adjustSize(918),
    height: adjustSize(474),
    resizeMode: 'contain',
    marginTop: adjustSize(36),
    alignSelf: 'center',
    borderRadius: adjustSize(36)
  }
});